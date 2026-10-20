// Shared content resolution for Toza v2.
//
// Used by scripts/check-content.mjs (validation + parity) and by the Eleventy
// global data file src/_data/content.mjs (templates). One implementation of the
// token grammar, the shared-block merge and the Markdown rules, so the check and
// the renderer cannot disagree.
//
//   loadSources({ root, lang })            read model, facts, contact, i18n, _shared.yaml
//   createResolver(src, { err, usedShared }) token resolver + ref merge
//   readPages(src, err)                    parse src/content/<lang>/*.md front matter
//   buildPages(src, pages, { err })        fully resolved pages for templates
//   loadContent({ root })                  { <lang>: { lang, pages: { <page>: {...} } } }
//
// Token grammar (documented in content/CONTENT-MODEL.md §4):
//   {price:key} {fact:path} {factword:path} {Factword:path} {shared:path} {ui:path}
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import yaml from "js-yaml";
import MarkdownIt from "markdown-it";

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");

// ---------- text helpers ----------
export const get = (obj, path) => path.split(".").reduce((o, k) => (o == null ? undefined : o[k]), obj);
export const norm = (s) => String(s).replace(/[\u00a0\u2009\u202f]/g, " ").replace(/\s+/g, " ").trim();
export const NUMWORDS = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve"];
// Identical to the `ils` filter in .eleventy.js.
export const formatPrice = (n) => "₪" + Number(n).toLocaleString("en-US");

export const md = new MarkdownIt({ html: false, linkify: false, typographer: false });

// Markdown -> reader-visible units. full = one per paragraph / list item / cell;
// runs = the same split additionally at link boundaries (for fragment matching).
export function mdUnits(src) {
  const full = [], runs = [];
  for (const t of md.parse(src, {})) {
    if (t.type !== "inline") continue;
    let f = "", r = "";
    for (const c of t.children) {
      if (c.type === "text" || c.type === "code_inline") { f += c.content; r += c.content; }
      else if (c.type === "softbreak" || c.type === "hardbreak") { f += " "; r += " "; }
      else if (c.type === "link_open" || c.type === "link_close") { runs.push(r); r = ""; }
    }
    full.push(f); runs.push(r);
  }
  return { full: full.map(norm).filter(Boolean), runs: runs.map(norm).filter(Boolean) };
}
export const plainLength = (kind, resolved) => (kind === "md" ? mdUnits(resolved).full.join(" ").length : norm(resolved).length);

// ---------- sources ----------
export function loadSources({ root = ROOT, lang = "en" } = {}) {
  const read = (rel) => readFileSync(join(root, rel), "utf8");
  const contentDir = `src/content/${lang}`;
  return {
    root,
    lang,
    contentDir,
    model: JSON.parse(read("content/content-model.json")),
    facts: JSON.parse(read("src/_data/facts.json")),
    contact: JSON.parse(read("src/_data/contact.json")),
    i18n: JSON.parse(read(`src/_data/i18n/${lang}.json`)),
    shared: yaml.load(read(`${contentDir}/_shared.yaml`)),
  };
}

// ---------- tokens + refs ----------
// {fact:path} digits · {factword:path} English number word · {Factword:path} the same, capitalised
// (sentence start). `*N` multiplies the fact first (e.g. {factword:devicesPerPerson*2}).
const TOKEN = /\{(price|fact|factword|Factword|shared|ui):([A-Za-z0-9_.]+)(?:\*(\d+))?(?:\|(capfirst))?\}/g;

const throwing = (where, msg) => { throw new Error(`${where}: ${msg}`); };

export function createResolver(src, { err = throwing, usedShared = new Set() } = {}) {
  const { facts, i18n, shared, lang } = src;

  function resolve(str, where, depth = 0) {
    if (str == null) return "";
    if (Array.isArray(str)) return str.map((s) => resolve(s, where, depth)).join(" ");
    if (typeof str !== "string") return String(str);
    if (depth > 6) { err(where, "token recursion too deep"); return str; }
    const out = str.replace(TOKEN, (m, ns, path, mul, filter) => {
      let v;
      if (ns === "price") {
        v = facts.prices[path];
        if (typeof v !== "number") { err(where, `unknown price key ${m}`); return m; }
        v = formatPrice(v);
      } else if (ns === "fact" || ns === "factword" || ns === "Factword") {
        v = get(facts, path);
        if (v === undefined || v === null || typeof v === "object" || (ns !== "fact" && !Number.isInteger(v))) { err(where, `unknown fact ${m}`); return m; }
        if (ns !== "fact" && lang !== "en") { err(where, `${m}: number words are English-only (V-034); use {fact:${path}} in ${lang} content`); return m; }
        if (mul) v = Number(v) * Number(mul);
        if (ns !== "fact") {
          v = NUMWORDS[Number(v)] ?? String(v);
          if (ns === "Factword") v = v.charAt(0).toUpperCase() + v.slice(1);
        }
      } else if (ns === "shared") {
        v = get(shared, path);
        if (v === undefined || (typeof v === "object" && !Array.isArray(v))) { err(where, `unknown shared string ${m}`); return m; }
        usedShared.add(path);
        v = resolve(v, where, depth + 1);
      } else if (ns === "ui") {
        v = get(i18n, path);
        if (typeof v !== "string") { err(where, `unknown ui string ${m}`); return m; }
      }
      v = String(v);
      if (filter === "capfirst") v = v.charAt(0).toUpperCase() + v.slice(1);
      return v;
    });
    if (/\{[A-Za-z]+:[^}]*\}/.test(out)) err(where, `unresolved token in "${out}"`);
    return out;
  }

  // `ref: name` merges the shared block of that name under the block's own fields.
  function mergeRef(block, where, expectType) {
    if (!block || typeof block !== "object") return block;
    if (!block.ref) return block;
    const base = shared.blocks?.[block.ref];
    if (!base) { err(where, `unknown shared block ref "${block.ref}"`); return block; }
    const { ref, ...local } = block;
    const merged = { ...structuredClone(base), ...local };
    if (expectType && merged.type && merged.type !== expectType) err(where, `ref "${ref}" is a ${merged.type}, expected ${expectType}`);
    if (local.type && base.type !== local.type) err(where, `ref "${ref}" is a ${base.type}, block says ${local.type}`);
    return merged;
  }

  return { resolve, mergeRef, usedShared };
}

// ---------- page files ----------
export function parsePage(file, raw, err = throwing) {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) { err(file, "missing YAML front matter"); return null; }
  let data;
  try { data = yaml.load(m[1]); } catch (e) { err(file, "YAML: " + e.message); return null; }
  if (m[2].trim()) err(file, "body after front matter is not used; put copy in blocks");
  return { file, raw, data };
}

export function readPages(src, err = throwing) {
  const files = readdirSync(join(src.root, src.contentDir)).filter((f) => f.endsWith(".md")).sort();
  return files
    .map((f) => parsePage(`${src.contentDir}/${f}`, readFileSync(join(src.root, src.contentDir, f), "utf8"), err))
    .filter(Boolean);
}

// ---------- resolved content for templates ----------
// Every string is final text. See src/_includes/blocks/README.md for the shapes.
//
//   text        -> string
//   md          -> { md, text, html }   md = resolved source, text = reader-visible text
//                                       (check-content's plainLength basis), html = rendered
//   action      -> { key, label, href, external, aria? }       (contact.json + i18n buttons)
//   price_key   -> sibling fields price (display string, price_format applied) and price_value
//   link        -> { label, href, kind, external, aria? }      (action resolved to href)
//   hero.byline -> { variant, name, tagline } (absent for "none"; About only, V-045)
//   hero.promise -> string, Toza's promise line from _shared.yaml `promise` (absent unless true)
//   price-strip.stage_names -> [{ key, name }] (absent when false)
export function buildPages(src, pages, { err = throwing } = {}) {
  const { model, contact, i18n, facts } = src;
  const R = createResolver(src, { err });
  const buttons = i18n.buttons || {};
  const out = {};

  function contactAction(key, where, variant) {
    const c = contact[key];
    if (!c) { err(where, `unknown action "${key}" (contact.json)`); return { key }; }
    // cta-hero.njk shows the short Signal label; cta-full.njk (contact block) the long one.
    const label = variant === "hero" && key === "signal" ? buttons.signalShort : (buttons[key] ?? c.label);
    const o = { key, label, href: c.url, external: true };
    if (key === "profile") o.aria = i18n.ui?.newTab;
    return o;
  }

  function field(spec, value, where, ctx) {
    if (value === undefined || value === null) return undefined;
    switch (spec.kind) {
      case "text": return R.resolve(value, where);
      case "md": {
        const res = R.resolve(value, where);
        return { md: res, text: mdUnits(res).full.join(" "), html: md.render(res) };
      }
      case "bool": case "enum": case "id": case "stage_key": case "price_key": case "href": return value;
      case "action": return contactAction(value, where, ctx.variant);
      case "labels": return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, R.resolve(v, `${where}.${k}`)]));
      case "list": return value.map((v, i) => field(spec.of, v, `${where}[${i}]`, ctx));
      case "object": return object(model.types[spec.type], value, where, spec.type, ctx);
      case "block": return block(R.mergeRef(value, where, spec.block), where, ctx);
      default: err(where, `model error: unknown kind ${spec.kind}`); return undefined;
    }
  }

  function fields(defs, obj, where, ctx, o = {}) {
    for (const [f, spec] of Object.entries(defs)) {
      const v = field(spec, obj[f], `${where}.${f}`, ctx);
      if (v !== undefined) o[f] = v;
    }
    return o;
  }

  function withPrice(o, obj, where) {
    if (obj.price_key && facts.prices[obj.price_key] !== undefined) {
      const amount = formatPrice(facts.prices[obj.price_key]);
      o.price = obj.price_format ? R.resolve(obj.price_format.replace("{amount}", amount), where) : amount;
      o.price_value = facts.prices[obj.price_key];
      delete o.price_format;
    }
    return o;
  }

  function object(defs, obj, where, typeName, ctx) {
    const o = withPrice(fields(defs, obj, where, ctx), obj, where);
    if (typeName === "link") {
      const link = { label: o.label, kind: o.kind || "plain" };
      if (obj.action) {
        const a = contactAction(obj.action, where, "link");
        link.href = a.href; link.external = true; if (a.aria) link.aria = a.aria;
      } else {
        link.href = o.href;
        link.external = /^https:\/\//.test(o.href || "");
      }
      if (link.kind === "external" && !link.aria) link.aria = i18n.ui?.newTab;
      return link;
    }
    return o;
  }

  function block(b, where, ctx) {
    const def = model.blocks[b.type];
    if (!def) { err(where, `unknown block type "${b.type}"`); return b; }
    const o = { type: b.type };
    if (b.id !== undefined) o.id = b.id;
    if (b.layout !== undefined) { if (b.layout !== "box") err(where, `unknown layout "${b.layout}"`); else o.layout = b.layout; }
    const variant = b.type === "hero" ? "hero" : "full";
    fields(def.fields, b, where, { ...ctx, variant }, o);
    withPrice(o, b, where);
    // Copy the renderer adds from shared data (mirrors check-content implicitStrings).
    if (b.type === "hero") {
      if (b.byline && b.byline !== "none") {
        o.byline = {
          variant: b.byline,
          name: R.resolve("{shared:person.name}", where),
          tagline: R.resolve(b.byline === "full" ? "{shared:person.tagline}" : "{shared:person.tagline_short}", where),
        };
      } else delete o.byline;
      if (b.promise) o.promise = R.resolve("{shared:promise}", where);
      else delete o.promise;
    }
    if (b.type === "price-strip") {
      if (b.stage_names) o.stage_names = ["assess", "harden", "verify"].map((key) => ({ key, name: R.resolve(`{shared:stages.names.${key}}`, where) }));
      else delete o.stage_names;
    }
    return o;
  }

  for (const p of pages) {
    const d = p.data;
    const where = p.file;
    const page = {
      page: d.page,
      title: R.resolve(d.title, `${where}:title`),
      description: R.resolve(d.description, `${where}:description`),
      permalink: d.permalink,
      lang: d.lang,
      dir: d.dir,
    };
    if (d.labels) page.labels = field(model.page.labels, d.labels, `${where}:labels`, {});
    page.blocks = (d.blocks || []).map((b, i) => {
      const w = `${where}:blocks[${i}]${b?.type ? "(" + b.type + ")" : ""}`;
      return block(R.mergeRef(b, w), w, {});
    });
    out[d.page] = page;
  }
  return out;
}

// All languages that have src/content/<lang>/_shared.yaml and src/_data/i18n/<lang>.json.
export function loadContent({ root = ROOT } = {}) {
  const errors = [];
  const err = (where, msg) => errors.push(`${where}: ${msg}`);
  const out = {};
  const base = join(root, "src/content");
  for (const lang of readdirSync(base, { withFileTypes: true }).filter((e) => e.isDirectory()).map((e) => e.name).sort()) {
    if (!existsSync(join(base, lang, "_shared.yaml")) || !existsSync(join(root, `src/_data/i18n/${lang}.json`))) continue;
    const src = loadSources({ root, lang });
    out[lang] = { lang, pages: buildPages(src, readPages(src, err), { err }) };
  }
  if (errors.length) throw new Error(`content: ${errors.length} problem(s)\n  ${errors.join("\n  ")}\nRun npm run check:content for details.`);
  return out;
}
