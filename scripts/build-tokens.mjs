// Generate styles/tokens.css (a Tailwind v4 @theme block) from tokens/tokens.json (W3C DTCG).
//   node scripts/build-tokens.mjs          write styles/tokens.css
//   node scripts/build-tokens.mjs --check  exit 1 if styles/tokens.css is stale
// No dependencies. The same functions are used by scripts/check-tokens.mjs.
//
// Naming: CSS variable = "--" + path joined with "-" ("DEFAULT" leaf drops its suffix).
// A group extension com.toza.css.prefix replaces the group's own path (used for the Flowbite
// remaps, whose names Flowbite fixes). com.toza.css.emit = false keeps a token out of the CSS.
// Aliases "{a.b}" become var(--a-b). Typography composites emit --type-<name>-<member>.
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
export const TOKENS_JSON = join(ROOT, "tokens/tokens.json");
export const TOKENS_CSS = join(ROOT, "styles/tokens.css");

const EXT = "com.toza.css";
const GENERIC_FAMILIES = new Set(["serif", "sans-serif", "monospace", "cursive", "fantasy", "system-ui", "ui-serif", "ui-sans-serif", "ui-monospace", "ui-rounded"]);
const kebab = (s) => s.replace(/[A-Z]/g, (c) => "-" + c.toLowerCase());

// Walk the DTCG tree. Inherits $type and com.toza.css extension keys down the groups.
export function flatten(tree) {
  const tokens = [];
  const walk = (node, path, type, ext, prefix) => {
    for (const [key, child] of Object.entries(node)) {
      if (key.startsWith("$")) continue;
      if (!child || typeof child !== "object") throw new Error(`tokens: ${[...path, key].join(".")} is not a token or group`);
      const childType = child.$type ?? type;
      const childExt = { ...ext, ...(child.$extensions?.[EXT] || {}) };
      const p = [...path, key];
      if ("$value" in child) {
        tokens.push({
          path: p,
          dotted: p.join("."),
          type: childType,
          value: child.$value,
          description: child.$description,
          ext: childExt,
          prefix,
        });
      } else {
        const groupPrefix = childExt.prefix && !prefix ? { css: childExt.prefix, depth: p.length } : prefix;
        walk(child, p, childType, childExt, groupPrefix);
      }
    }
  };
  walk(tree, [], undefined, {}, null);
  return tokens;
}

export function cssName(t) {
  const parts = t.prefix ? t.path.slice(t.prefix.depth) : t.path;
  const joined = parts.filter((k, i) => !(k === "DEFAULT" && i === parts.length - 1)).join("-");
  return t.prefix ? t.prefix.css + joined : "--" + joined;
}

const quoteFamily = (name, quoted) => (GENERIC_FAMILIES.has(name) || !quoted.has(name) ? name : `"${name}"`);

export function buildModel(tree) {
  const tokens = flatten(tree);
  const byPath = new Map(tokens.map((t) => [t.dotted, t]));
  const errors = [];
  const names = new Map();

  const aliasTo = (str, from) => {
    const t = byPath.get(str);
    if (!t) { errors.push(`${from}: alias {${str}} does not exist`); return "var(--missing)"; }
    if (t.ext.emit === false) errors.push(`${from}: alias {${str}} points at a token that is not emitted`);
    if (t.type === "typography" || t.type === "shadow") errors.push(`${from}: alias {${str}} points at a composite token`);
    return `var(${cssName(t)})`;
  };
  const sub = (v, from) => (typeof v === "string" ? v.replace(/\{([^}]+)\}/g, (_, p) => aliasTo(p, from)) : String(v));

  const decls = [];
  const add = (name, value, description, from) => {
    if (names.has(name)) errors.push(`${from}: CSS variable ${name} is also produced by ${names.get(name)}`);
    names.set(name, from);
    decls.push({ name, value, description });
  };

  for (const t of tokens) {
    if (t.ext.emit === false) continue;
    const from = t.dotted;
    const name = cssName(t);
    if (!t.type) errors.push(`${from}: no $type (set it on the token or an ancestor group)`);
    switch (t.type) {
      case "fontFamily": {
        const quoted = new Set(t.ext.quoted || []);
        const list = Array.isArray(t.value) ? t.value : [t.value];
        add(name, list.map((n) => quoteFamily(String(n), quoted)).join(", "), t.description, from);
        break;
      }
      case "typography": {
        const members = Object.entries(t.value);
        for (const [m, v] of members) add(`${name}-${kebab(m)}`, sub(v, from), m === members[0][0] ? t.description : undefined, from);
        if (t.ext.fontFeatureSettings) add(`${name}-font-feature-settings`, t.ext.fontFeatureSettings, undefined, from);
        break;
      }
      case "shadow": {
        const layers = Array.isArray(t.value) ? t.value : [t.value];
        const css = layers.map((l) => [l.inset ? "inset" : null, l.offsetX, l.offsetY, l.blur, l.spread, sub(l.color, from)].filter((x) => x != null).join(" ")).join(", ");
        add(name, css, t.description, from);
        break;
      }
      case "color": case "dimension": case "number": case "fontWeight": case "duration":
        add(name, sub(t.value, from), t.description, from);
        break;
      default:
        errors.push(`${from}: unsupported $type "${t.type}"`);
    }
  }

  // Alias cycles and dangling aliases inside non-emitted tokens.
  for (const t of tokens) {
    const seen = new Set();
    let cur = t;
    while (typeof cur?.value === "string" && /^\{[^}]+\}$/.test(cur.value)) {
      if (seen.has(cur.dotted)) { errors.push(`${t.dotted}: alias cycle`); break; }
      seen.add(cur.dotted);
      cur = byPath.get(cur.value.slice(1, -1));
    }
  }
  return { tokens, decls, errors };
}

export function generateCss(tree) {
  const { decls, errors } = buildModel(tree);
  if (errors.length) throw new Error("tokens.json:\n  " + [...new Set(errors)].join("\n  "));
  const lines = decls.map((d) => `  ${d.name}: ${d.value};${d.description ? `  /* ${d.description.replace(/\*\//g, "* /")} */` : ""}`);
  return `/* GENERATED by scripts/build-tokens.mjs from tokens/tokens.json. Do not edit; change the tokens and run npm run build:css. */
@theme {
${lines.join("\n")}
}
`;
}

export const readTokens = () => JSON.parse(readFileSync(TOKENS_JSON, "utf8"));

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) {
  const css = generateCss(readTokens());
  if (process.argv.includes("--check")) {
    let current = "";
    try { current = readFileSync(TOKENS_CSS, "utf8"); } catch {}
    if (current !== css) { console.error("FAIL: styles/tokens.css is stale; run npm run build:css"); process.exit(1); }
    console.log("tokens.css is up to date");
  } else {
    writeFileSync(TOKENS_CSS, css);
    console.log(`tokens: wrote styles/tokens.css (${css.split("\n").filter((l) => l.startsWith("  --")).length} variables)`);
  }
}
