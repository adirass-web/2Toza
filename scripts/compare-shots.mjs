// Screenshots + axe for the library comparison. Usage: node scripts/compare-shots.mjs <out-dir>
// Serves _site on a local port (no external requests). Needs Playwright + Chromium (PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers).
import { createServer } from "node:http";
import { readFileSync, existsSync, statSync, mkdirSync, writeFileSync } from "node:fs";
import { join, extname } from "node:path";
import { chromium } from "playwright-core";
import AxeBuilder from "@axe-core/playwright";

const out = process.argv[2] || "design/compare/out";
mkdirSync(out, { recursive: true });
const types = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".svg": "image/svg+xml", ".webp": "image/webp", ".woff2": "font/woff2" };
const server = createServer((req, res) => {
  let p = decodeURIComponent(req.url.split("?")[0]);
  let f = join("_site", p);
  if (existsSync(f) && statSync(f).isDirectory()) f = join(f, "index.html");
  if (!existsSync(f)) { res.writeHead(404); return res.end("nf"); }
  res.writeHead(200, { "content-type": types[extname(f)] || "application/octet-stream" });
  res.end(readFileSync(f));
}).listen(0);
const port = server.address().port;
const pages = { home: "/en/", separation: "/en/separation-divorce/", pricing: "/en/pricing/" };
const sizes = { 390: 844, 1440: 900 };
const browser = await chromium.launch();
const axe = {};
for (const rtl of [false, true]) for (const [w, h] of Object.entries(sizes)) {
  const ctx = await browser.newContext({ viewport: { width: +w, height: h } });
  for (const [name, path] of Object.entries(pages)) {
    const page = await ctx.newPage();
    const external = [];
    page.on("request", (r) => { if (!r.url().startsWith(`http://localhost:${port}`) && !r.url().startsWith("data:")) external.push(r.url()); });
    await page.goto(`http://localhost:${port}${path}`, { waitUntil: "networkidle" });
    if (rtl) await page.evaluate(() => { document.documentElement.dir = "rtl"; });
    await page.waitForTimeout(150);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    await page.screenshot({ path: join(out, `${rtl ? "rtl-" : ""}${name}-${w}.png`), fullPage: true });
    if (overflow > 0) console.log(`OVERFLOW ${rtl ? "rtl " : ""}${name} ${w}: ${overflow}px`);
    if (external.length) console.log("EXTERNAL REQUESTS", external);
    if (!rtl) {
      const r = await new AxeBuilder({ page }).analyze();
      axe[`${name}@${w}`] = r.violations.map((v) => ({ id: v.id, impact: v.impact, nodes: v.nodes.length, sample: v.nodes[0]?.html.slice(0, 140), target: v.nodes[0]?.target.join(" ") }));
    }
    await page.close();
  }
  await ctx.close();
}
await browser.close(); server.close();
writeFileSync(join(out, "axe.json"), JSON.stringify(axe, null, 2));
for (const [k, v] of Object.entries(axe)) console.log(k, v.length ? JSON.stringify(v.map((x) => `${x.id}(${x.impact}) x${x.nodes}`)) : "no violations");
