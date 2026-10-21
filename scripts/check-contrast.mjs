// Contrast gate (build/g): WCAG 2.2 AA pairs resolved from styles/tokens.css, light and dark theme.
// FAIL when a text pair is under 4.5:1, or a non-text pair (focus, accent rule) under 3:1.
// Usage: node scripts/check-contrast.mjs
import { readFileSync } from "node:fs";

const css = readFileSync("styles/tokens.css", "utf8");
const decls = (block) => Object.fromEntries([...block.matchAll(/--([\w-]+):\s*([^;]+);/g)].map((m) => [m[1], m[2].trim()]));
const theme = css.match(/@theme\b[^{]*\{([\s\S]*?)\n\}/)?.[1] ?? "";
const dark = css.match(/:root\[data-theme="dark"\]\s*\{([\s\S]*?)\n\}/)?.[1] ?? "";
const light = decls(theme), over = decls(dark);

function resolve(vars, v, depth = 0) {
  if (depth > 10) throw new Error("alias cycle " + v);
  const m = v.match(/^var\(--([\w-]+)\)$/);
  return m ? resolve(vars, vars[m[1]], depth + 1) : v;
}
function rgba(s) {
  let m = s.match(/^#([0-9a-f]{6})$/i);
  if (m) return [0, 2, 4].map((i) => parseInt(m[1].slice(i, i + 2), 16)).concat(1);
  m = s.match(/^#([0-9a-f]{3})$/i);
  if (m) return [...m[1]].map((c) => parseInt(c + c, 16)).concat(1);
  m = s.match(/^rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)(?:\s*[/,]\s*([\d.]+))?\s*\)$/);
  if (m) return [+m[1], +m[2], +m[3], m[4] === undefined ? 1 : +m[4]];
  throw new Error("cannot parse colour " + s);
}
const lum = ([r, g, b]) => { const f = (c) => { c /= 255; return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
const over_ = (fg, bg) => fg.slice(0, 3).map((c, i) => c * fg[3] + bg[i] * (1 - fg[3]));
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };

// [foreground, background, minimum, note]
const T = 4.5, N = 3;
const PAIRS = [
  ["text", "paper", T], ["text", "paper-deep", T], ["text", "doc-paper", T], ["text", "sand", T],
  ["heading", "paper", T], ["heading", "paper-deep", T],
  ["text-muted", "paper", T], ["text-muted", "paper-deep", T], ["text-muted", "doc-paper", T],
  ["accent", "paper", N], ["accent", "paper-deep", N],
  ["on-action", "action", T], ["on-action", "action-hover", T],
  ["on-action-inverse", "action-inverse", T],
  ["on-dark-text", "surface-inverse", T], ["on-dark-text-muted", "surface-inverse", T],
  ["accent-on-dark", "surface-inverse", N],
  ["focus-color", "paper", N], ["focus-color", "paper-deep", N], ["focus-color-on-dark", "surface-inverse", N],
  ["on-mint", "mint", T],
];
let failed = 0;
for (const name of ["light", "dark"]) {
  const vars = name === "dark" ? { ...light, ...over } : light;
  const get = (k) => { const v = vars[`color-${k}`] ?? vars[k]; if (v === undefined) throw new Error(`token not found: ${k}`); return rgba(resolve(vars, v)); };
  const rows = [];
  for (const [f, b, min] of PAIRS) {
    let fg, bg;
    try { bg = get(b); fg = get(f); } catch (e) { if (/not found/.test(e.message)) continue; throw e; }
    const r = ratio(over_(fg, bg), bg);
    const ok = r >= min;
    if (!ok) { failed++; console.error(`FAIL [${name}] ${f} on ${b}: ${r.toFixed(2)}:1 < ${min}:1`); }
    rows.push(`${f}/${b} ${r.toFixed(1)}`);
  }
  console.log(`contrast ${name}: ${rows.length} pairs checked; min ${Math.min(...rows.map((x) => +x.split(" ")[1])).toFixed(1)}:1`);
}
if (failed) process.exit(1);
console.log("check:contrast OK");
