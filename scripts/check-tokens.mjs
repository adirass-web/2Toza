// Token check for Toza v2.
//   FAIL: tokens/tokens.json is not valid (unknown alias, missing $type, duplicate CSS name,
//         cycle), styles/tokens.css is stale vs tokens.json, or styles/main.css still declares
//         its own @theme / does not import tokens.css.
//   FAIL: colour literals (hex, rgb(), rgba()) in src/**/*.njk and styles/main.css (build/g: zero debt).
// Usage: node scripts/check-tokens.mjs
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { walk } from "./util.mjs";
import { buildModel, generateCss, readTokens, TOKENS_CSS } from "./build-tokens.mjs";

let failed = false;
const fail = (m) => { console.error("FAIL: " + m); failed = true; };

// 1) tokens.json is valid
let tree;
try { tree = readTokens(); } catch (e) { fail(`tokens/tokens.json: ${e.message}`); process.exit(1); }
const { decls, errors } = buildModel(tree);
for (const e of new Set(errors)) fail(`tokens/tokens.json: ${e}`);

// 2) tokens.css is current
if (!errors.length) {
  let current = null;
  try { current = readFileSync(TOKENS_CSS, "utf8"); } catch {}
  if (current === null) fail("styles/tokens.css is missing; run npm run build:css");
  else if (current !== generateCss(tree)) fail("styles/tokens.css is stale vs tokens/tokens.json; run npm run build:css");
}

// 3) main.css takes its theme from tokens.css
const mainCss = readFileSync("styles/main.css", "utf8").replace(/\/\*[\s\S]*?\*\//g, "");
if (/@theme\b/.test(mainCss)) fail("styles/main.css declares @theme; move the variables into tokens/tokens.json");
if (!/@import\s+["']\.\/tokens\.css["']/.test(mainCss)) fail('styles/main.css must @import "./tokens.css"');

// 4) colour literals outside tokens (fail)
const HEX = /(?<![&\w])#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{4}|[0-9a-fA-F]{3})\b/g;
const FUNC = /\brgba?\(/gi;
function countLiterals(text) {
  let n = 0;
  for (const m of text.matchAll(HEX)) if (!/href=["']$/.test(text.slice(Math.max(0, m.index - 6), m.index))) n++;
  return n + (text.match(FUNC) || []).length;
}
const strip = {
  css: (s) => s.replace(/\/\*[\s\S]*?\*\//g, ""),
  njk: (s) => s.replace(/\{#[\s\S]*?#\}/g, ""),
};
const files = [...walk("src", ".njk").sort().map((f) => [f, "njk"]), ["styles/main.css", "css"]];
const debt = files.map(([f, kind]) => [f.replace(/\\/g, "/"), countLiterals(strip[kind](readFileSync(f, "utf8")))]).filter(([, n]) => n > 0);


console.log(`tokens: ${decls.length} CSS variables from tokens/tokens.json${failed ? "" : ", styles/tokens.css up to date"}`);
for (const [f, n] of debt) fail(`${f}: ${n} colour literal(s) outside tokens`);
if (failed) process.exit(1);
console.log("check:tokens OK");
