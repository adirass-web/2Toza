// CSS/markup lint (RTL-safe, token-only, no overrides).
//   FAIL: physical CSS properties (left/right, margin-left, padding-right, text-align:left, float:left,
//         border-left-*, border-top-left-radius ...) in styles/custom.css and styles/main.css;
//         Tailwind physical utilities (ml-, mr-, pl-, pr-, left-, right-, text-left, text-right, border-l/r,
//         rounded-l/r, float-left/right) in src/**/*.njk and src/**/*.md;
//         `!important` outside a prefers-reduced-motion block; raw colour literals in those files.
//   Allowed: the generated styles/tokens.css and files under node_modules.
// Exceptions: add `/* lint-allow: physical */` on the same line (e.g. a JS-driven transform).
import { readFileSync } from "node:fs";
import { readdirSync, statSync } from "node:fs";
import { join } from "node:path";
const walk = (d) => readdirSync(d).flatMap((n) => { const p = join(d, n); return statSync(p).isDirectory() ? walk(p) : [p]; });
let bad = 0;
const fail = (f, i, m) => { console.error(`FAIL ${f}:${i + 1}: ${m}`); bad++; };
const strip = (s) => s.replace(/\/\*(?!\s*lint-allow)[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "));
const PHYS = /(?<![\w-])(?:margin|padding)-(?:left|right)\b|(?<![\w-])(?:left|right)\s*:|text-align\s*:\s*(?:left|right)|float\s*:\s*(?:left|right)|border-(?:left|right)(?:-[a-z]+)?\s*:|border-(?:top|bottom)-(?:left|right)-radius|(?<![\w-])(?:scroll-margin|scroll-padding)-(?:left|right)\b/;
const HEX = /(?<![&\w])#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{4}|[0-9a-fA-F]{3})\b/;
const TW = /(?:^|[\s"'`])(?:[a-z0-9:-]+:)?-?(?:ml|mr|pl|pr|left|right|inset-l|inset-r)-(?:\d|\[|px|auto|full|1\/|[a-z]+-\d)|(?:^|[\s"'`])(?:[a-z0-9:-]+:)?(?:text-left|text-right|float-left|float-right|border-l(?:-\d)?|border-r(?:-\d)?|rounded-[lr](?:-|\b)|rounded-t[lr]\b|rounded-b[lr]\b)(?=[\s"'`]|$)/;
for (const f of ["styles/custom.css", "styles/main.css"]) {
  const lines = strip(readFileSync(f, "utf8")).split("\n");
  let reduced = 0, depth = 0;
  lines.forEach((l, i) => {
    if (/lint-allow/.test(readFileSync(f, "utf8").split("\n")[i])) return;
    if (/@media[^{]*prefers-reduced-motion/.test(l)) reduced = depth + 1;
    depth += (l.match(/{/g) || []).length - (l.match(/}/g) || []).length;
    if (reduced && depth < reduced) reduced = 0;
    if (PHYS.test(l)) fail(f, i, `physical property: ${l.trim().slice(0, 80)}`);
    if (/!important/.test(l) && !reduced) fail(f, i, `!important outside reduced-motion: ${l.trim().slice(0, 80)}`);
    if (HEX.test(l) || /\brgba?\(/i.test(l)) fail(f, i, `colour literal (use a token): ${l.trim().slice(0, 80)}`);
  });
}
for (const f of walk("src").filter((p) => /\.(njk|md|html)$/.test(p))) {
  readFileSync(f, "utf8").split("\n").forEach((l, i) => {
    if (/lint-allow/.test(l)) return;
    if (TW.test(l)) fail(f, i, `physical Tailwind utility: ${l.trim().slice(0, 80)}`);
    if (/style="[^"]*(?:margin|padding)-(?:left|right)|style="[^"]*(?:^|;|\s)(?:left|right)\s*:/.test(l)) fail(f, i, "physical inline style");
  });
}
console.log(bad ? `lint: ${bad} problem(s)` : "lint OK: no physical properties, no overrides, no colour literals");
process.exit(bad ? 1 : 0);
