// Every built page carries meta robots noindex; headers and robots.txt block indexing.
import { readText, walk, fail } from "./util.mjs";

let pages = 0;
for (const file of walk("_site")) {
  pages++;
  if (!/<meta name="robots" content="[^"]*noindex/i.test(readText(file))) fail(`${file}: missing meta robots noindex`);
}
if (!/X-Robots-Tag:\s*noindex/i.test(readText("_site/_headers"))) fail("_headers: missing X-Robots-Tag noindex");
if (!/Disallow:\s*\//.test(readText("_site/robots.txt"))) fail("robots.txt: must disallow all");
if (!process.exitCode) console.log(`noindex OK: ${pages} pages`);
