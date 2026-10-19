// Copy-parity check (spec §3): every visible string on every board must appear verbatim
// in the frozen copy (copy/strings.json). Elements marked data-copy-exempt (wordmark,
// Japanese meaning line, photo-placeholder notes) are skipped and listed for review.
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { collect } from "./lib.mjs";

const { pages, sourceCommit } = JSON.parse(readFileSync("copy/strings.json", "utf8"));
const corpus = Object.values(pages).flat();
const found = (t) => corpus.some((s) => s.includes(t));

const files = [];
const walk = (d) => { for (const f of readdirSync(d)) { const p = join(d, f); statSync(p).isDirectory() ? walk(p) : f.endsWith(".html") && files.push(p); } };
walk("site");

let fail = 0;
for (const f of files.sort()) {
  if (f.endsWith("site/index.html")) continue; // comparison page: presenter text, not site copy
  const { nodes, attrs } = collect(readFileSync(f, "utf8"));
  const exempt = new Set(), missing = [];
  for (const n of [...nodes, ...attrs]) (n.exempt ? exempt.add(n.text) : !found(n.text) && missing.push(n.text));
  console.log(`${f}: ${missing.length ? "FAIL" : "ok"} (${exempt.size} exempt)`);
  for (const m of missing) console.log(`   not in copy @${sourceCommit}: "${m}"`);
  for (const e of exempt) console.log(`   exempt: "${e}"`);
  fail += missing.length;
}
if (fail) { console.error(`${fail} string(s) not found in the frozen copy.`); process.exit(1); }
console.log("copy parity: pass");
