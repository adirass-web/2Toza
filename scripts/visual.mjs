// Visual regression: compares the built _site against approved screenshots in tests/visual/baseline.
//   node scripts/visual.mjs            compare (exit 1 on any unapproved visual change)
//   node scripts/visual.mjs --update   approve: rewrite baselines (a human decision), lists what changed
// Needs _site built. Uses the preinstalled Playwright (chromium from PLAYWRIGHT_BROWSERS_PATH).
// Diff: pixelmatch + pngjs (both MIT) so we get a per-pixel count and a readable diff image.
import { createServer } from "node:http";
import { readFileSync, existsSync, mkdirSync, writeFileSync, statSync, readdirSync, rmSync } from "node:fs";
import { join, extname } from "node:path";
import { createRequire } from "node:module";
import pixelmatch from "pixelmatch";
import { PNG } from "pngjs";

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "/opt/npm-tools/node_modules/playwright");
const UPDATE = process.argv.includes("--update");
const MAX_PCT = 0.05;       // failure budget: % of pixels differing
const THRESHOLD = 0.1;      // pixelmatch colour tolerance (anti-aliasing)
const MAX_H = Number(process.env.VISUAL_MAX_HEIGHT || 0); // optional cap for very long full-page captures (0 = none)
const DIR = "tests/visual", BASE = join(DIR, "baseline"), CUR = join(DIR, "current"), DIFF = join(DIR, "diff");
for (const d of [BASE, CUR]) mkdirSync(d, { recursive: true });
rmSync(DIFF, { recursive: true, force: true }); rmSync(CUR, { recursive: true, force: true });
mkdirSync(DIFF, { recursive: true }); mkdirSync(CUR, { recursive: true });

const TYPES = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".svg": "image/svg+xml", ".webp": "image/webp", ".woff2": "font/woff2", ".png": "image/png", ".json": "application/json" };
const server = createServer((req, res) => {
  let f = join("_site", decodeURIComponent(req.url.split("?")[0]));
  if (existsSync(f) && statSync(f).isDirectory()) f = join(f, "index.html");
  if (!existsSync(f)) { res.writeHead(404); res.end("not found"); return; }
  res.writeHead(200, { "content-type": TYPES[extname(f)] || "application/octet-stream" });
  res.end(readFileSync(f));
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const base = `http://127.0.0.1:${server.address().port}`;

const PAGES = { home: "/en/" };
for (const n of ["separation-divorce", "business-dispute", "inheritance-conflict", "they-know-something", "attorneys", "how-it-works", "about", "faq", "conditions", "pricing"]) PAGES[n] = `/en/${n}/`;
const RTL = ["home", "faq", "conditions", "pricing"];
const W = { 390: 844, 1440: 900 };

// job: { page, state, w, hash?, rtl?, menu?, mid?, full? }
const jobs = [];
for (const p of Object.keys(PAGES)) for (const w of [390, 1440]) jobs.push({ page: p, state: "full", w, full: true });
for (const p of RTL) for (const w of [390, 1440]) jobs.push({ page: p, state: "rtl", w, full: true, rtl: true });
jobs.push({ page: "faq", state: "hash-c", w: 390, hash: "#c", full: true });
jobs.push({ page: "home", state: "menu-open", w: 390, menu: true });
jobs.push({ page: "home", state: "mid", w: 390, mid: true });
jobs.push({ page: "home", state: "mid", w: 1440, mid: true });
jobs.push({ page: "conditions", state: "hash-urgent", w: 390, hash: "#urgent", full: true });

const FREEZE = "*,*::before,*::after{animation:none!important;transition:none!important;caret-color:transparent!important;scroll-behavior:auto!important}";
const browser = await chromium.launch();
const ctxs = {};
async function ctxFor(w) {
  return ctxs[w] ??= await browser.newContext({ viewport: { width: w, height: W[w] }, deviceScaleFactor: 1, reducedMotion: "reduce", locale: "en-US", timezoneId: "Asia/Jerusalem" });
}
const FIXED = Date.UTC(2026, 9, 18, 9, 0, 0);
async function shoot(j) {
  const page = await (await ctxFor(j.w)).newPage();
  await page.addInitScript((t) => { const R = Date; globalThis.Date = class extends R { constructor(...a) { a.length ? super(...a) : super(t); } static now() { return t; } }; }, FIXED);
  await page.goto(base + PAGES[j.page] + (j.hash || ""), { waitUntil: "networkidle" });
  await page.addStyleTag({ content: FREEZE });
  if (j.rtl) await page.evaluate(() => { document.documentElement.dir = "rtl"; });
  await page.evaluate(() => document.fonts.ready);
  // trigger IntersectionObserver states once, deterministically, then return to the starting position
  const y0 = await page.evaluate(() => scrollY);
  await page.evaluate(() => scrollTo(0, document.documentElement.scrollHeight)); await page.waitForTimeout(150);
  await page.evaluate((y) => scrollTo(0, y), j.hash ? y0 : 0); await page.waitForTimeout(150);
  if (j.menu) { await page.click("[data-collapse-toggle]"); await page.waitForTimeout(100); }
  if (j.mid) { await page.evaluate(() => scrollTo(0, Math.round(document.documentElement.scrollHeight / 2))); await page.waitForTimeout(200); }
  await page.evaluate(() => document.fonts.ready);
  const clip = j.full && MAX_H ? { x: 0, y: 0, width: j.w, height: Math.min(MAX_H, await page.evaluate(() => document.documentElement.scrollHeight)) } : undefined;
  const buf = await page.screenshot({ fullPage: !!j.full, clip, animations: "disabled", caret: "hide" });
  await page.close();
  return buf;
}
const encode = (png) => PNG.sync.write(png, { deflateLevel: 9, filterType: 4 });
const name = (j) => `${j.page}__${j.state}__${j.w}`;

const rows = [], changed = [];
for (const j of jobs) {
  const n = name(j);
  const cur = PNG.sync.read(await shoot(j));
  writeFileSync(join(CUR, n + ".png"), encode(cur));
  const bp = join(BASE, n + ".png");
  if (UPDATE) {
    const out = encode(cur);
    if (!existsSync(bp)) changed.push(`${n} (new)`);
    else if (!readFileSync(bp).equals(out)) {
      const old = PNG.sync.read(readFileSync(bp));
      const same = old.width === cur.width && old.height === cur.height && pixelmatch(old.data, cur.data, null, cur.width, cur.height, { threshold: THRESHOLD }) === 0;
      if (!same) changed.push(`${n} (changed)`);
    }
    if (!existsSync(bp) || !readFileSync(bp).equals(out)) writeFileSync(bp, out);
    continue;
  }
  if (!existsSync(bp)) { rows.push({ n, pct: "-", dh: "-", note: "NO BASELINE" }); continue; }
  const old = PNG.sync.read(readFileSync(bp));
  if (old.width !== cur.width || old.height !== cur.height) {
    rows.push({ n, pct: "-", dh: cur.height - old.height, note: "SIZE CHANGED" });
    writeSide(n, old, cur, null);
    continue;
  }
  const diff = new PNG({ width: cur.width, height: cur.height });
  const cnt = pixelmatch(old.data, cur.data, diff.data, cur.width, cur.height, { threshold: THRESHOLD });
  const pct = (cnt / (cur.width * cur.height)) * 100;
  if (pct > MAX_PCT) { rows.push({ n, pct: pct.toFixed(3), dh: 0, note: "PIXELS CHANGED" }); writeSide(n, old, cur, diff); }
}
await browser.close(); server.close();

function writeSide(n, a, b, d) {
  const H = Math.max(a.height, b.height), gap = 10, out = new PNG({ width: a.width * 3 + gap * 2, height: H });
  out.data.fill(200);
  const put = (src, x) => PNG.bitblt(src, out, 0, 0, src.width, src.height, x, 0);
  put(a, 0); put(b, a.width + gap);
  if (d) put(d, (a.width + gap) * 2);
  writeFileSync(join(DIFF, n + ".png"), encode(out)); // left: baseline, middle: current, right: diff (red)
}

if (UPDATE) {
  const size = readdirSync(BASE).reduce((s, f) => s + statSync(join(BASE, f)).size, 0);
  console.log(`Baselines written: ${jobs.length} images, ${(size / 1048576).toFixed(1)} MB`);
  console.log(changed.length ? "Changed baselines:\n  " + changed.join("\n  ") : "No baseline changed.");
  process.exit(0);
}
if (rows.length) {
  console.log(`\nVISUAL CHECK FAILED: ${rows.length} of ${jobs.length} images changed (budget ${MAX_PCT}% of pixels)\n`);
  console.log("image".padEnd(44) + "changed %".padEnd(11) + "height delta".padEnd(14) + "reason");
  for (const r of rows) console.log(r.n.padEnd(44) + String(r.pct).padEnd(11) + String(r.dh).padEnd(14) + r.note);
  console.log(`\nSide-by-side images (baseline | current | diff) are in ${DIFF}/.`);
  console.log("If the change is intended: npm run visual:approve, then commit the updated baselines.");
  process.exit(1);
}
console.log(`Visual check passed: ${jobs.length} images match their baselines.`);
