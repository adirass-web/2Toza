// Compare element ids of two built sites (dev tooling).  node scripts/check-anchors.mjs <oldSite> <newSite>
// Prints ids present in the old build and missing from the new one, per page, and marks which of them any page links to (#id or /path/#id).
import { readdirSync, readFileSync, statSync, existsSync } from "node:fs";
import { join } from "node:path";
const [a, b] = process.argv.slice(2);
const files = (d, base = d) => readdirSync(d).flatMap((f) => { const p = join(d, f); return statSync(p).isDirectory() ? files(p, base) : p.endsWith(".html") ? [p.slice(base.length)] : []; });
const ids = (h) => new Set([...h.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
const linked = new Set();
for (const f of files(a)) for (const m of readFileSync(join(a, f), "utf8").matchAll(/href="([^"]*)#([^"]+)"/g)) linked.add(m[2]);
let missing = 0, missingLinked = 0;
for (const f of files(a)) {
  const o = ids(readFileSync(join(a, f), "utf8"));
  const n = existsSync(join(b, f)) ? ids(readFileSync(join(b, f), "utf8")) : new Set();
  const miss = [...o].filter((i) => !n.has(i));
  missing += miss.length;
  const ml = miss.filter((i) => linked.has(i));
  missingLinked += ml.length;
  console.log(`${f}: ${o.size} old ids, ${miss.length} missing${miss.length ? " [" + miss.map((i) => i + (linked.has(i) ? "*" : "")).join(", ") + "]" : ""}`);
}
console.log(`missing total ${missing}; of which linked anchors (*) ${missingLinked}`);
