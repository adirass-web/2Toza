// Export the resolved copy of the current site into copy/strings.json.
// Usage: node scripts/export-copy.mjs <path-to-built-_site> <source-commit>
// Run against a build of adirass-web/2toza main at the freeze commit. Never edit strings.json by hand.
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { collect } from "./lib.mjs";

const [site, commit] = process.argv.slice(2);
if (!site || !commit) { console.error("usage: export-copy.mjs <_site> <commit>"); process.exit(2); }

const files = [];
const walk = (d) => { for (const f of readdirSync(d)) { const p = join(d, f); statSync(p).isDirectory() ? walk(p) : f.endsWith(".html") && files.push(p); } };
walk(join(site, "en"));

const pages = {};
for (const f of files.sort()) {
  const { elements, attrs } = collect(readFileSync(f, "utf8"));
  const set = [...new Set([...elements, ...attrs.map((a) => a.text)])];
  pages["/" + relative(site, f).replace(/index\.html$/, "")] = set;
}
writeFileSync("copy/strings.json", JSON.stringify({ sourceRepo: "adirass-web/2toza", sourceCommit: commit, pages }, null, 1) + "\n");
console.log(`exported ${Object.keys(pages).length} pages from ${commit}`);
