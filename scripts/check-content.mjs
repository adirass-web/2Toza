// Content check for Toza v2.
//   (a) Model: every src/content/<lang>/*.md and _shared.yaml validates against
//       content/content-model.json (block types, required fields, kinds, max
//       lengths on resolved text, tokens resolvable, no typed prices).
//   (b) Parity: the visible text of the built pages (_site) and the content
//       files contain the same copy, sentence by sentence (whitespace
//       normalised). Reports HTML copy missing from content, and content copy
//       missing from HTML.
//   (c) Drift guard (transition): editorial strings still held in
//       src/_data/i18n/en.json must equal a string in _shared.yaml.
// Usage: node scripts/check-content.mjs [--lengths] [--verbose]
// Run after `npm run build` (npm run check:content does both).
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import yaml from "js-yaml";
import MarkdownIt from "markdown-it";
import { Parser } from "htmlparser2";
import { walk } from "./util.mjs";

const ARGS = new Set(process.argv.slice(2));
const LANG = "en";
const CONTENT_DIR = `src/content/${LANG}`;
const SITE = "_site";

const model = JSON.parse(readFileSync("content/content-model.json", "utf8"));
const facts = JSON.parse(readFileSync("src/_data/facts.json", "utf8"));
const contact = JSON.parse(readFileSync("src/_data/contact.json", "utf8"));
const i18n = JSON.parse(readFileSync(`src/_data/i18n/${LANG}.json`, "utf8"));
const shared = yaml.load(readFileSync(join(CONTENT_DIR, "_shared.yaml"), "utf8"));
const md = new MarkdownIt({ html: false, linkify: false, typographer: false });

// i18n namespaces that are UI chrome (stay in i18n) vs editorial (moved to _shared.yaml).
const UI_NAMESPACES = ["ui", "nav", "footer", "buttons"];
const EDITORIAL_NAMESPACES = ["person", "credential", "contact", "price", "stages", "specimen"];

const errors = [];
const warnings = [];
const notes = [];
const err = (where, msg) => errors.push(`${where}: ${msg}`);
const warn = (where, msg) => warnings.push(`${where}: ${msg}`);

// ---------- helpers ----------
const get = (obj, path) => path.split(".").reduce((o, k) => (o == null ? undefined : o[k]), obj);
const norm = (s) => String(s).replace(/[   ]/g, " ").replace(/\s+/g, " ").trim();
const squash = (s) => String(s).replace(/\s+/g, "");
const hasWords = (s) => /[A-Za-z֐-׿]/.test(s) || s.includes("₪");
const NUMWORDS = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve"];
const formatPrice = (n) => "₪" + Number(n).toLocaleString("en-US");
const usedShared = new Set();

// ---------- tokens ----------
// {fact:path} digits · {factword:path} English number word · {Factword:path} the same, capitalised
// (sentence start). `*N` multiplies the fact first (e.g. {factword:devicesPerPerson*2}).
const TOKEN = /\{(price|fact|factword|Factword|shared|ui):([A-Za-z0-9_.]+)(?:\*(\d+))?(?:\|(capfirst))?\}/g;
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
      if (ns !== "fact" && LANG !== "en") { err(where, `${m}: number words are English-only (V-034); use {fact:${path}} in ${LANG} content`); return m; }
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

// Markdown -> reader-visible units. full = one per paragraph / list item / cell;
// runs = the same split additionally at link boundaries (for fragment matching).
function mdUnits(src) {
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
const plainLength = (kind, resolved) => (kind === "md" ? mdUnits(resolved).full.join(" ").length : norm(resolved).length);

// Sentence segmentation shared by both sides of the parity check.
function sentences(s) {
  s = norm(s).replace(/\b(Dr|Mr|Mrs|Ms|St|vs|e\.g|i\.e)\. /g, "$1.\u0000");
  return s
    .split(/(?<=[.!?]["”’)]?) (?=["“(]?[A-Z0-9₪֐-׿])| · /)
    .map((x) => x.replace(/\u0000/g, " ").trim())
    .filter(Boolean);
}

// ---------- load pages ----------
function loadPage(file) {
  const raw = readFileSync(file, "utf8");
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) { err(file, "missing YAML front matter"); return null; }
  let data;
  try { data = yaml.load(m[1]); } catch (e) { err(file, "YAML: " + e.message); return null; }
  if (m[2].trim()) err(file, "body after front matter is not used; put copy in blocks");
  return { file, raw, data };
}
const pageFiles = readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".md")).sort();
const pages = pageFiles.map((f) => loadPage(join(CONTENT_DIR, f))).filter(Boolean);
const permalinks = new Set(pages.map((p) => p.data.permalink));
const pathTargets = new Set([...permalinks].map((p) => p.replace(/index\.html$/, "")));

// ---------- typed-price guard (raw text) ----------
const priceNumbers = new Set(Object.values(facts.prices).flatMap((n) => [String(n), n.toLocaleString("en-US")]));
function scanRaw(label, raw) {
  const body = raw.split("\n").filter((l) => !/^\s*#/.test(l)).join("\n");
  if (body.includes("₪")) err(label, "contains a typed ₪ amount; use price_key or {price:key}");
  for (const m of body.matchAll(/(?<![\w.:{])\d{1,3}(?:,\d{3})+(?![\w,])|(?<![\w.:{])\d{4,}(?![\w])/g))
    if (priceNumbers.has(m[0])) err(label, `typed price number ${m[0]}; use price_key or {price:key}`);
}
scanRaw(`${CONTENT_DIR}/_shared.yaml`, readFileSync(join(CONTENT_DIR, "_shared.yaml"), "utf8"));
for (const p of pages) scanRaw(p.file, p.raw);

// ---------- literal facts (warning) ----------
// A number typed next to "days" / "keys" / "devices" / "months" that equals a facts.json value
// should be a token. Warning only: the same number can mean something else ("30 days before
// the term ends").
const FACT_UNITS = [
  { unit: "days", key: "questionLineDays" },
  { unit: "days", key: "credit.windowDays" },
  { unit: "keys", key: "securityKeys.personalShield" },
  { unit: "keys", key: "securityKeys.shieldForTwo" },
  { unit: "keys", key: "securityKeys.innerCircle" },
  { unit: "devices", key: "devicesPerPerson" },
  { unit: "months", key: "annualCare.joinWindowMonths" },
];
const LITERAL = new RegExp(`(?<![\\w.:{])(\\d+|${NUMWORDS.slice(1).join("|")})(?:-| )(days?|(?:security )?keys?|devices?|months?)(?![\\w])`, "gi");
function scanLiteralFacts(label, raw) {
  raw.split("\n").forEach((line, i) => {
    if (/^\s*#/.test(line)) return;
    for (const m of line.matchAll(LITERAL)) {
      const n = /^\d+$/.test(m[1]) ? Number(m[1]) : NUMWORDS.indexOf(m[1].toLowerCase());
      const unit = m[2].toLowerCase().replace(/^security /, "").replace(/s$/, "") + "s";
      const hits = FACT_UNITS.filter((f) => f.unit === unit && get(facts, f.key) === n);
      if (!hits.length) continue;
      const suggest = hits.map((h) => (/^\d/.test(m[1]) ? `{fact:${h.key}}` : `{${m[1][0] === m[1][0].toUpperCase() ? "Factword" : "factword"}:${h.key}}`)).join(" or ");
      warn(`${label}:${i + 1}`, `literal "${m[0]}" equals a facts.json value; use ${suggest}`);
    }
  });
}
scanLiteralFacts(`${CONTENT_DIR}/_shared.yaml`, readFileSync(join(CONTENT_DIR, "_shared.yaml"), "utf8"));
for (const p of pages) scanLiteralFacts(p.file, p.raw);

// ---------- repeated sentences (V-036) ----------
// A sentence of 6+ words typed on two or more pages (or on a page and in _shared.yaml) must live
// once in _shared.yaml and be referenced with {shared:...}. Compared on the raw text, so a token
// that references a shared sentence is not a repeat.
function rawSentences(value, acc = []) {
  if (typeof value === "string") {
    for (const para of value.split(/\n\s*\n|\n- /)) {
      norm(para).replace(/\b(Dr|Mr|Mrs|Ms)\. /g, "$1.\u0000").split(/(?<=[.!?]) (?=[A-Z{"])/)
        .map((x) => x.replace(/\u0000/g, " ").trim())
        .filter((x) => x.split(" ").length >= 6).forEach((x) => acc.push(x));
    }
  } else if (Array.isArray(value)) value.forEach((v) => rawSentences(v, acc));
  else if (value && typeof value === "object") Object.values(value).forEach((v) => rawSentences(v, acc));
  return acc;
}
{
  const seen = new Map(); // sentence -> Set of places
  const add = (place, data) => { for (const s of new Set(rawSentences(data))) { if (!seen.has(s)) seen.set(s, new Set()); seen.get(s).add(place); } };
  for (const p of pages) add(`${p.data.page}.md`, p.data);
  add("_shared.yaml", shared);
  for (const [s, where] of seen) if (where.size > 1)
    err("repeated sentence", `"${s}" is typed in ${[...where].join(", ")}; keep it once in _shared.yaml under common: and use {shared:common.…}`);
}

// ---------- model validation + string collection ----------
const lengths = new Map(); // "type.field" -> max observed
const blockCounts = new Map();
function observe(key, n) { lengths.set(key, Math.max(lengths.get(key) || 0, n)); }

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

// collector: { strings: [{kind, text, where}], prices: [string] }
function checkField(spec, value, where, key, col) {
  const k = spec.kind;
  if (value === undefined || value === null) { if (spec.required) err(where, `missing required field`); return; }
  switch (k) {
    case "text":
    case "md": {
      if (typeof value !== "string" && !(Array.isArray(value) && value.every((v) => typeof v === "string"))) { err(where, `expected ${k}`); return; }
      const res = resolve(value, where);
      if (k === "text") {
        if (/\n/.test(res)) err(where, "plain text field contains a line break; use a Markdown field");
        if (/\]\(|\*\*|^#/.test(res)) err(where, "plain text field contains Markdown syntax");
      }
      if (spec.must_contain && !String(value).includes(spec.must_contain)) err(where, `must contain ${spec.must_contain}`);
      const len = plainLength(k, res);
      observe(key, len);
      if (spec.max && len > spec.max) err(where, `${len} chars exceeds max ${spec.max}`);
      if (!spec.must_contain) col.strings.push({ kind: k, text: res, where });
      return;
    }
    case "bool": if (typeof value !== "boolean") err(where, "expected true/false"); return;
    case "enum": if (!spec.values.includes(value)) err(where, `"${value}" not one of ${spec.values.join(", ")}`); return;
    case "id": if (!/^[a-z0-9][a-z0-9-]*$/.test(String(value))) err(where, `bad id "${value}"`); return;
    case "stage_key": if (!["assess", "harden", "verify"].includes(value)) err(where, `bad stage key "${value}"`); return;
    case "action": if (!contact[value]) err(where, `unknown action "${value}" (contact.json)`); return;
    case "price_key": if (typeof facts.prices[value] !== "number") err(where, `unknown price_key "${value}"`); return;
    case "href": {
      const v = String(value);
      if (v.startsWith("/")) {
        const path = v.split("#")[0];
        if (!permalinks.has(v) && !pathTargets.has(path)) err(where, `internal link ${v} has no content page`);
      } else if (!v.startsWith("#") && !v.startsWith("https://")) err(where, `bad href "${v}"`);
      return;
    }
    case "labels":
      if (typeof value !== "object") { err(where, "expected a map"); return; }
      for (const [lk, lv] of Object.entries(value)) checkField({ kind: "text", max: spec.max }, lv, `${where}.${lk}`, key, col);
      return;
    case "list": {
      if (!Array.isArray(value)) { err(where, "expected a list"); return; }
      if (spec.min_items && value.length < spec.min_items) err(where, `needs at least ${spec.min_items} items`);
      if (spec.max_items && value.length > spec.max_items) err(where, `allows at most ${spec.max_items} items`);
      value.forEach((v, i) => checkField(spec.of, v, `${where}[${i}]`, key, col));
      return;
    }
    case "object": checkObject(model.types[spec.type], value, where, spec.type, col); return;
    case "block": checkBlock(mergeRef(value, where, spec.block), where, spec.block, col); return;
    default: err(where, `model error: unknown kind ${k}`);
  }
}

function checkObject(fields, obj, where, typeName, col) {
  if (!obj || typeof obj !== "object" || Array.isArray(obj)) { err(where, `expected ${typeName} object`); return; }
  for (const f of Object.keys(obj)) if (!fields[f]) err(`${where}.${f}`, `field not in model for ${typeName}`);
  for (const [f, spec] of Object.entries(fields)) checkField(spec, obj[f], `${where}.${f}`, `${typeName}.${f}`, col);
  if (typeName === "link") {
    if (!obj.href === !obj.action) err(where, "link needs exactly one of href / action");
  }
  collectPrice(obj, col, where);
}

function collectPrice(obj, col, where) {
  if (obj.price_key && facts.prices[obj.price_key] !== undefined) {
    const amount = formatPrice(facts.prices[obj.price_key]);
    col.prices.push(obj.price_format ? resolve(obj.price_format.replace("{amount}", amount), where) : amount);
  }
}

function implicitStrings(block, col, where) {
  // Copy the renderer adds from shared data rather than from the block itself.
  if (block.type === "hero" && block.byline && block.byline !== "none") {
    col.strings.push({ kind: "text", text: resolve("{shared:person.name}", where), where: where + ".byline" });
    col.strings.push({ kind: "text", text: resolve(block.byline === "full" ? "{shared:person.tagline}" : "{shared:person.tagline_short}", where), where: where + ".byline" });
  }
  if (block.type === "price-strip" && block.stage_names)
    for (const k of ["assess", "harden", "verify"]) col.strings.push({ kind: "text", text: resolve(`{shared:stages.names.${k}}`, where), where: where + ".stage_names" });
}

function checkBlock(block, where, expectType, col, count = "nested") {
  if (!block || typeof block !== "object") { err(where, "expected a block"); return; }
  const type = block.type || expectType;
  const def = model.blocks[type];
  if (!def) { err(where, `unknown block type "${block.type}"`); return; }
  if (expectType && type !== expectType) err(where, `expected ${expectType}, got ${type}`);
  if (count) { const k = count === "nested" ? `${type} (nested)` : type; blockCounts.set(k, (blockCounts.get(k) || 0) + 1); }
  const { type: _t, id, ref: _r, ...rest } = block;
  if (id !== undefined) checkField({ kind: "id" }, id, `${where}.id`, `${type}.id`, col);
  if (model.required_ids.includes(type) && !id) err(where, `${type} needs an id (anchor)`);
  for (const f of Object.keys(rest)) if (!def.fields[f]) err(`${where}.${f}`, `field not in model for ${type}`);
  for (const [f, spec] of Object.entries(def.fields)) checkField(spec, block[f], `${where}.${f}`, `${type}.${f}`, col);
  collectPrice(block, col, where);
  implicitStrings(block, col, where);
}

const pageCollections = new Map();
for (const p of pages) {
  const col = { strings: [], prices: [] };
  const d = p.data;
  const where = p.file;
  for (const f of Object.keys(d)) if (!model.page[f]) err(`${where}:${f}`, "front-matter field not in model");
  for (const [f, spec] of Object.entries(model.page)) {
    if (f === "blocks") continue;
    checkField(spec, d[f], `${where}:${f}`, `page.${f}`, f === "title" || f === "description" ? { strings: [], prices: [] } : col);
  }
  if (d.lang && i18n.lang !== d.lang) err(where, `lang ${d.lang} does not match i18n ${i18n.lang}`);
  if (d.dir && i18n.dir !== d.dir) err(where, `dir ${d.dir} does not match i18n ${i18n.dir}`);
  if (!Array.isArray(d.blocks) || !d.blocks.length) err(where, "blocks: required, non-empty list");
  (d.blocks || []).forEach((b, i) => {
    const w = `${where}:blocks[${i}]${b?.type ? "(" + b.type + ")" : ""}`;
    checkBlock(mergeRef(b, w), w, null, col, "page");
  });
  pageCollections.set(p.data.permalink, { page: p, col, title: resolve(d.title, where), description: resolve(d.description, where) });
}

// Shared blocks validated on their own too (even if unused).
for (const [name, b] of Object.entries(shared.blocks || {})) checkBlock(b, `_shared.yaml:blocks.${name}`, null, { strings: [], prices: [] }, null);

// ---------- HTML extraction ----------
const INLINE = new Set(["a", "span", "em", "strong", "b", "i", "small", "abbr", "code", "sup", "sub", "time", "mark", "s", "u", "q", "cite", "label"]);
const SKIP = new Set(["script", "style", "template", "noscript"]);
const ATTRS = ["alt", "aria-label", "data-open", "data-closed", "title", "placeholder"];
function extract(html) {
  const out = { title: "", description: "", nodes: [], blocks: [], attrs: [] };
  let skip = 0, inTitle = false, inBody = false, buf = "", node = "";
  // htmlparser2 splits a text node at entities; join adjacent text callbacks.
  const endNode = () => { if (norm(node)) out.nodes.push(norm(node)); node = ""; };
  const flush = () => { endNode(); if (norm(buf)) out.blocks.push(norm(buf)); buf = ""; };
  const p = new Parser({
    onopentag(name, a) {
      endNode();
      if (name === "body") inBody = true;
      if (name === "title") inTitle = true;
      if (name === "meta" && a.name === "description") out.description = a.content || "";
      if (SKIP.has(name)) skip++;
      if (!inBody || skip) return;
      for (const k of ATTRS) if (a[k] && norm(a[k])) out.attrs.push(norm(a[k]));
      if (name === "br") buf += " ";
      else if (!INLINE.has(name)) flush();
    },
    ontext(t) {
      if (inTitle) { out.title += t; return; }
      if (!inBody || skip) return;
      node += t;
      buf += t;
    },
    onclosetag(name) {
      endNode();
      if (name === "title") inTitle = false;
      if (SKIP.has(name)) { skip--; return; }
      if (inBody && !skip && !INLINE.has(name)) flush();
    },
  }, { decodeEntities: true });
  p.write(html); p.end(); flush();
  out.title = norm(out.title); out.description = norm(out.description);
  return out;
}

// ---------- parity ----------
function flattenStrings(obj, acc = []) {
  if (typeof obj === "string") acc.push(obj);
  else if (Array.isArray(obj)) obj.forEach((v) => flattenStrings(v, acc));
  else if (obj && typeof obj === "object") Object.values(obj).forEach((v) => flattenStrings(v, acc));
  return acc;
}
const uiStrings = UI_NAMESPACES.flatMap((ns) => flattenStrings(i18n[ns]));

function unitsOf(col) {
  const full = [], runs = [];
  for (const s of col.strings) {
    if (s.kind === "md") { const u = mdUnits(s.text); full.push(...u.full); runs.push(...u.runs); }
    else { full.push(norm(s.text)); runs.push(norm(s.text)); }
  }
  full.push(...col.prices); runs.push(...col.prices);
  return { full, runs };
}

function boundedIncludes(hay, needle) {
  let i = hay.indexOf(needle);
  while (i !== -1) {
    const b = hay[i - 1], a = hay[i + needle.length];
    if (!(b && /[\p{L}\p{N}]/u.test(b)) && !(a && /[\p{L}\p{N}]/u.test(a))) return true;
    i = hay.indexOf(needle, i + 1);
  }
  return false;
}

if (!existsSync(SITE)) { console.error(`FAIL: ${SITE}/ not found — run npm run build first`); process.exit(1); }
const builtPages = walk(join(SITE, LANG)).sort();
let totals = { htmlUnits: 0, htmlExact: 0, htmlFragment: 0, htmlMissing: 0, contentUnits: 0, contentFound: 0, contentSpacing: 0, contentMissing: 0, attrUnits: 0, attrMissing: 0 };
const report = [];

for (const file of builtPages) {
  const permalink = "/" + file.slice(SITE.length + 1).replace(/\\/g, "/");
  const entry = pageCollections.get(permalink);
  if (!entry) { err(file, `built page has no content file (permalink ${permalink})`); continue; }
  const html = extract(readFileSync(file, "utf8"));
  const { full, runs } = unitsOf(entry.col);
  const pageLabels = flattenStrings(entry.page.data.labels || {});
  const corpusUnits = [...full, ...runs, ...uiStrings, ...pageLabels].flatMap(sentences);
  const corpusSet = new Set(corpusUnits);
  const corpusText = [...full, ...runs, ...uiStrings, ...pageLabels].map(norm).join(" \u0001 ");
  const missingHtml = [], missingContent = [], spacing = [];

  // meta
  if (html.title !== norm(entry.title)) err(file, `<title> "${html.title}" ≠ content title "${entry.title}"`);
  if (html.description !== norm(entry.description)) err(file, `meta description differs from content description`);

  // (1) HTML -> content
  for (const node of html.nodes) for (const u of sentences(node)) {
    if (!hasWords(u)) continue;
    totals.htmlUnits++;
    if (corpusSet.has(u)) totals.htmlExact++;
    else if (boundedIncludes(corpusText, u)) { totals.htmlFragment++; if (ARGS.has("--verbose")) notes.push(`${file}: fragment of a longer content string: "${u}"`); }
    else { totals.htmlMissing++; missingHtml.push(u); }
  }
  for (const a of html.attrs) for (const u of sentences(a)) {
    if (!hasWords(u)) continue;
    totals.attrUnits++;
    if (!corpusSet.has(u) && !boundedIncludes(corpusText, u)) { totals.attrMissing++; missingHtml.push(`[attribute] ${u}`); }
  }

  // (2) content -> HTML
  const pageText = [...html.blocks, ...html.attrs].join(" \u0001 ");
  const pageSquash = squash(pageText);
  for (const unit of [...full, ...pageLabels]) for (const u of sentences(unit)) {
    if (!hasWords(u)) continue;
    totals.contentUnits++;
    if (pageText.includes(u)) totals.contentFound++;
    else if (pageSquash.includes(squash(u))) { totals.contentSpacing++; spacing.push(u); }
    else { totals.contentMissing++; missingContent.push(u); }
  }

  for (const u of missingHtml) err(file, `HTML copy not in content files: "${u}"`);
  for (const u of missingContent) err(entry.page.file, `content copy not in built HTML: "${u}"`);
  for (const u of spacing) notes.push(`${file}: matches only ignoring spaces (separate visual elements): "${u}"`);
  report.push({ page: entry.page.data.page, blocks: entry.page.data.blocks.length, missingHtml: missingHtml.length, missingContent: missingContent.length });
}
for (const [permalink, e] of pageCollections) {
  if (!builtPages.some((f) => "/" + f.slice(SITE.length + 1) === permalink)) err(e.page.file, `no built page at ${permalink}`);
}

// ---------- drift guard: i18n editorial strings must exist in _shared.yaml ----------
const sharedResolved = flattenStrings(shared).map((s) => norm(resolve(s, "_shared.yaml")));
const sharedSet = new Set(sharedResolved);
let driftChecked = 0;
for (const ns of EDITORIAL_NAMESPACES) {
  const walkNs = (obj, path) => {
    if (typeof obj === "string") {
      driftChecked++;
      const s = norm(obj);
      if (/\{\w+\}/.test(s)) {
        const re = new RegExp("^" + s.split(/\{\w+\}/).map((x) => x.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join(".+?") + "$");
        if (!sharedResolved.some((x) => re.test(x))) err("i18n drift", `${path} "${s}" has no equal in _shared.yaml`);
      } else if (!sharedSet.has(s)) err("i18n drift", `${path} "${s}" has no equal in _shared.yaml`);
    } else if (Array.isArray(obj)) {
      // arrays such as stages.recordDate are compared joined, and item by item
      const joined = norm(obj.join(" "));
      if (obj.every((x) => typeof x === "string") && sharedSet.has(joined)) { driftChecked++; return; }
      obj.forEach((v, i) => walkNs(v, `${path}[${i}]`));
    } else if (obj && typeof obj === "object") for (const [k, v] of Object.entries(obj)) walkNs(v, `${path}.${k}`);
  };
  walkNs(i18n[ns], ns);
}

// unused shared strings (info)
const sharedLeaves = [];
const leafWalk = (obj, path) => {
  if (path === "blocks") return;
  if (typeof obj === "string" || Array.isArray(obj)) sharedLeaves.push(path);
  else if (obj && typeof obj === "object") for (const [k, v] of Object.entries(obj)) leafWalk(v, path ? `${path}.${k}` : k);
};
leafWalk(shared, "");
const unused = sharedLeaves.filter((p) => ![...usedShared].some((u) => u === p || u.startsWith(p + ".")));
for (const u of unused) notes.push(`_shared.yaml: ${u} is not used by any page`);

// ---------- output ----------
if (ARGS.has("--lengths")) {
  console.log("\nObserved max length (resolved characters) vs model limit:");
  const limitOf = (key) => {
    const [t, f] = key.split(".");
    const spec = model.blocks[t]?.fields[f] || model.types[t]?.[f] || (t === "page" ? model.page[f] : null);
    return spec ? (spec.max ?? spec.of?.max ?? "") : "";
  };
  for (const [k, v] of [...lengths].sort()) console.log(`  ${k.padEnd(34)} ${String(v).padStart(4)}  max ${limitOf(k)}`);
}
console.log("\nBlocks: " + [...blockCounts].sort((a, b) => b[1] - a[1]).map(([t, n]) => `${t} ${n}`).join(", "));
console.log(`Pages: ${pages.length} content files, ${builtPages.length} built pages under /${LANG}/`);
console.log(`HTML → content: ${totals.htmlUnits} text units (${totals.htmlExact} exact, ${totals.htmlFragment} fragment-of), ${totals.htmlMissing} missing; ${totals.attrUnits} attribute units, ${totals.attrMissing} missing`);
console.log(`Content → HTML: ${totals.contentUnits} sentences, ${totals.contentFound} found, ${totals.contentSpacing} found ignoring spaces, ${totals.contentMissing} missing`);
console.log(`Drift guard: ${driftChecked} editorial i18n strings checked against _shared.yaml`);
if (ARGS.has("--verbose") || errors.length === 0) for (const n of notes) console.log("note: " + n);
console.log(`Literal-fact warnings: ${warnings.length}`);
for (const w of warnings) console.log("warn: " + w);
for (const e of errors) console.error("FAIL: " + e);
if (errors.length) { console.error(`\ncheck:content FAILED with ${errors.length} problem(s)`); process.exit(1); }
const pct = totals.htmlUnits ? (((totals.htmlUnits - totals.htmlMissing) / totals.htmlUnits) * 100).toFixed(1) : "0";
console.log(`\ncheck:content OK — parity ${pct}% both ways, model valid.`);
