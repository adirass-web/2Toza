// Link gate: every internal link and #anchor in the built site resolves.
//   node scripts/check-links.mjs [siteDir]   (default _site; run after npm run build)
// Checks href on <a>; skips external, mailto:, tel:, javascript:. Resolves /path/, /path/index.html, #id.
import { readdirSync, readFileSync, statSync, existsSync } from "node:fs";
import { join, posix } from "node:path";
const dir = process.argv[2] || "_site";
const files = (d) => readdirSync(d).flatMap((n) => { const p = join(d, n); return statSync(p).isDirectory() ? files(p) : p.endsWith(".html") ? [p] : []; });
const route = (f) => "/" + f.slice(dir.length + 1).replace(/\\/g, "/").replace(/index\.html$/, "");
const html = new Map(files(dir).map((f) => [route(f), readFileSync(f, "utf8")]));
const ids = new Map([...html].map(([r, h]) => [r, new Set([...h.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]))]));
let bad = 0, n = 0;
for (const [r, h] of html) {
  for (const m of h.matchAll(/<a\s[^>]*?href="([^"]*)"/g)) {
    const href = m[1].replace(/&amp;/g, "&");
    if (!href || /^(https?:|mailto:|tel:|javascript:|\/\/)/i.test(href)) continue;
    n++;
    const [p0, hash] = href.split("#");
    const target = p0 === "" ? r : posix.normalize(p0.startsWith("/") ? p0 : posix.join(r, p0));
    const key = html.has(target) ? target : html.has(target.replace(/\/?$/, "/")) ? target.replace(/\/?$/, "/") : null;
    const asset = !key && existsSync(join(dir, target)) && statSync(join(dir, target)).isFile();
    if (!key && !asset) { console.error(`FAIL ${r}: ${href} -> no such page`); bad++; continue; }
    if (hash && key && !ids.get(key).has(decodeURIComponent(hash))) { console.error(`FAIL ${r}: ${href} -> no id "${hash}" on ${key}`); bad++; }
  }
}
console.log(bad ? `links: ${bad} broken of ${n} internal links` : `links OK: ${n} internal links in ${html.size} pages`);
process.exit(bad ? 1 : 0);
