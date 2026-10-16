// Dev check for the floating contact buttons (needs _site built): screenshots into design/compare/float/, axe on all
// pages, keyboard focus-not-obscured test on the FAQ, overflow, print. Run: node scripts/float-check.mjs
import { createServer } from "node:http";
import { readFileSync, existsSync, mkdirSync, writeFileSync, statSync } from "node:fs";
import { join, extname } from "node:path";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "/opt/npm-tools/node_modules/playwright");
const axeSource = readFileSync(require.resolve("axe-core/axe.min.js"), "utf8");
const out = join("design", "compare", "float");
mkdirSync(out, { recursive: true });
const TYPES = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".svg": "image/svg+xml", ".webp": "image/webp", ".woff2": "font/woff2", ".png": "image/png" };
const server = createServer((req, res) => {
  let f = join("_site", decodeURIComponent(req.url.split("?")[0]));
  if (existsSync(f) && statSync(f).isDirectory()) f = join(f, "index.html");
  if (!existsSync(f)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { "content-type": TYPES[extname(f)] || "application/octet-stream" }); res.end(readFileSync(f));
}).listen(0);
const base = `http://127.0.0.1:${server.address().port}`;
const names = ["", "separation-divorce", "business-dispute", "inheritance-conflict", "they-know-something", "attorneys", "how-it-works", "about", "faq", "conditions", "pricing"];
const M = { width: 390, height: 844 }, D = { width: 1440, height: 900 };
const browser = await chromium.launch();
const rep = { axe: {}, overflow: [], shots: {}, focus: {}, print: {}, noJs: null };
const shown = (p) => p.evaluate(() => { const f = document.querySelector("[data-float]"); const s = getComputedStyle(f); return { visible: s.visibility !== "hidden" && s.opacity !== "0", box: (() => { const r = f.firstElementChild.getBoundingClientRect(); return { x: r.x, y: r.y, w: r.width, h: r.height, vw: innerWidth, vh: innerHeight }; })() }; });
const settle = (p) => p.waitForTimeout(400);
async function open(vp, path, rtl) {
  const p = await browser.newPage({ viewport: vp });
  await p.goto(base + path, { waitUntil: "networkidle" });
  if (rtl) await p.evaluate(() => { document.documentElement.dir = "rtl"; });
  await p.evaluate(() => document.fonts.ready);
  return p;
}
const shot = async (p, name) => { await settle(p); await p.screenshot({ path: join(out, name + ".png") }); rep.shots[name] = await shown(p); };
// Screenshots
{
  let p = await open(D, "/en/"); await shot(p, "home-1440-hero"); await p.close();
  for (const [vp, k] of [[D, "1440"], [M, "390"]]) {
    for (const rtl of [false, true]) {
      if (!rtl && k === "390") continue;
      p = await open(vp, "/en/", rtl);
      await p.evaluate(() => { document.documentElement.style.scrollBehavior = "auto"; scrollTo(0, document.documentElement.scrollHeight * 0.4); });
      await shot(p, `home-${k}-mid${rtl ? "-rtl" : ""}`); await p.close();
    }
  }
  p = await open(D, "/en/");
  await p.evaluate(() => document.querySelector("[data-contact]").scrollIntoView({ block: "center", behavior: "instant" }));
  await shot(p, "home-1440-contact"); await p.close();
  p = await open(M, "/en/faq/");
  await p.evaluate(() => { document.documentElement.style.scrollBehavior = "auto"; scrollTo(0, 900); }); await shot(p, "faq-390-mid"); await p.close();
}
// axe (buttons shown: scrolled past the hero) + overflow, both sizes
for (const n of names) {
  const path = `/en/${n ? n + "/" : ""}`;
  for (const [vp, k] of [[D, "d"], [M, "m"]]) {
    const p = await open(vp, path);
    await p.evaluate(() => scrollTo(0, 700)); await settle(p);
    const o = await p.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    if (o > 0) rep.overflow.push(`${n || "home"} ${k}: ${o}px`);
    await p.addScriptTag({ content: axeSource });
    const r = await p.evaluate(() => axe.run(document, { runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"] } }));
    rep.axe[`${n || "home"} ${k}`] = r.violations.map((v) => `${v.id} x${v.nodes.length} ${v.nodes.map((x) => x.html.slice(0, 90) + ' ' + (x.any[0]?.message || '')).join(' | ')}`);
    await p.close();
  }
}
// Focus obscured: Tab through the FAQ, compare each focused element's rect with the button group (and its tap size).
for (const [vp, k] of [[M, "390"], [D, "1440"]]) {
  const p = await open(vp, "/en/faq/");
  await p.evaluate(() => scrollTo(0, 600)); await settle(p);
  const n = await p.evaluate(() => document.querySelectorAll("a[href],button,summary,[tabindex]").length);
  let tabs = 0, covered = [], sizes = new Set();
  await p.evaluate(() => { document.activeElement.blur(); scrollTo(0, 0); });
  for (let i = 0; i < n + 2; i++) {
    await p.keyboard.press("Tab"); tabs++;
    await p.waitForTimeout(60);
    const r = await p.evaluate(() => {
      const a = document.activeElement, f = document.querySelector("[data-float]"), g = f.firstElementChild, s = getComputedStyle(f);
      if (!a || a === document.body || f.contains(a)) return { skip: true, inFloat: f.contains(a) };
      const e = a.getBoundingClientRect(), b = g.getBoundingClientRect();
      const live = s.visibility !== "hidden" && s.opacity !== "0";
      const hit = live && e.left < b.right && e.right > b.left && e.top < b.bottom && e.bottom > b.top;
      return { hit, live, text: (a.textContent || a.getAttribute("aria-label") || a.tagName).trim().slice(0, 30), top: e.top, vh: innerHeight };
    });
    if (r.hit) covered.push(r.text);
  }
  const tap = await p.evaluate(() => [...document.querySelectorAll("[data-float] a")].map((a) => { const r = a.getBoundingClientRect(); return `${Math.round(r.width)}x${Math.round(r.height)}`; }));
  rep.focus[k] = { tabs, covered, tap };
  await p.close();
}
// Print: conditions
{
  const p = await open(D, "/en/conditions/"); await p.emulateMedia({ media: "print" });
  rep.print.floatDisplay = await p.evaluate(() => getComputedStyle(document.querySelector("[data-float]")).display);
  await p.pdf({ path: join(out, "conditions-print.pdf"), format: "A4" }); await p.close();
}
// No JS: buttons visible and focusable
{
  const ctx = await browser.newContext({ javaScriptEnabled: false, viewport: D }); const p = await ctx.newPage();
  await p.goto(base + "/en/");
  rep.noJs = await p.evaluate?.call ? await p.locator("[data-float] a").first().isVisible() : null;
  await ctx.close();
}
await browser.close(); server.close();
writeFileSync(join(out, "run.json"), JSON.stringify(rep, null, 1));
console.log(JSON.stringify(rep, null, 1));
