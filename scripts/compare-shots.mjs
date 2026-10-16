// Screenshots, axe run and overflow check for a library build (dev tooling; needs _site built).
//   node scripts/compare-shots.mjs <lib>      writes design/compare/<lib>/*.png and axe.json
// Uses the preinstalled Playwright (PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers) and axe-core from node_modules.
import { createServer } from "node:http";
import { readFileSync, existsSync, mkdirSync, writeFileSync, statSync } from "node:fs";
import { join, extname } from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "/opt/npm-tools/node_modules/playwright");
const lib = process.argv[2] || "lib";
const out = join("design", "compare", lib);
mkdirSync(out, { recursive: true });
const axeSource = readFileSync(require.resolve("axe-core/axe.min.js"), "utf8");

const TYPES = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".svg": "image/svg+xml", ".webp": "image/webp", ".woff2": "font/woff2", ".png": "image/png" };
const server = createServer((req, res) => {
  let p = decodeURIComponent(req.url.split("?")[0]);
  let f = join("_site", p);
  if (existsSync(f) && statSync(f).isDirectory()) f = join(f, "index.html");
  if (!existsSync(f)) { res.writeHead(404); res.end("not found"); return; }
  res.writeHead(200, { "content-type": TYPES[extname(f)] || "application/octet-stream" });
  res.end(readFileSync(f));
}).listen(0);
const base = `http://127.0.0.1:${server.address().port}`;

const pages = { home: "/en/", "separation-divorce": "/en/separation-divorce/", pricing: "/en/pricing/" };
const sizes = { m: { width: 390, height: 844 }, d: { width: 1440, height: 900 } };
const browser = await chromium.launch();
const report = { axe: {}, overflow: [], externalRequests: [], consoleErrors: [] };
for (const [name, path] of Object.entries(pages)) {
  for (const [sk, vp] of Object.entries(sizes)) {
    for (const dir of ["ltr", "rtl"]) {
      const page = await browser.newPage({ viewport: vp });
      page.on("request", (r) => { if (!r.url().startsWith(base) && !r.url().startsWith("data:")) report.externalRequests.push(r.url()); });
      page.on("console", (m) => { if (m.type() === "error") report.consoleErrors.push(`${name}: ${m.text()}`); });
      await page.goto(base + path, { waitUntil: "networkidle" });
      if (dir === "rtl") await page.evaluate(() => { document.documentElement.dir = "rtl"; });
      await page.evaluate(() => document.fonts.ready);
      const over = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      if (over > 0) report.overflow.push(`${name} ${sk} ${dir}: ${over}px`);
      await page.screenshot({ path: join(out, `${name}-${sk}${dir === "rtl" ? "-rtl" : ""}.png`), fullPage: true });
      if (dir === "ltr" && sk === "d") {
        await page.addScriptTag({ content: axeSource });
        const r = await page.evaluate(() => axe.run(document, { runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"] } }));
        report.axe[name] = r.violations.map((v) => ({ id: v.id, impact: v.impact, nodes: v.nodes.length, sample: v.nodes[0]?.target?.join(" ") }));
      }
      await page.close();
    }
  }
}
// Phone menu: open the collapse, screenshot.
{
  const page = await browser.newPage({ viewport: sizes.m });
  await page.goto(base + "/en/", { waitUntil: "networkidle" });
  await page.click("[data-collapse-toggle]");
  await page.screenshot({ path: join(out, "home-m-menu-open.png") });
  report.menuExpanded = await page.getAttribute("[data-collapse-toggle]", "aria-expanded");
  await page.close();
}
await browser.close(); server.close();
writeFileSync(join(out, "run.json"), JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
