// Performance budget gate: phone profile (390 px, 4× CPU slowdown, 1.6 Mbit/s, 150 ms RTT), every page.
//   node scripts/check-perf.mjs        (needs _site built and a Playwright browser)
// Budgets (plan §4): LCP ≤ 2500 ms, CLS ≤ 0.05, JS ≤ 60 KB gzip, transfer ≤ 1.2 MB, no horizontal overflow.
// Prints the table for the PR; CI runners vary, so LCP has 20 % tolerance before failing.
import { gzipSync } from "node:zlib";
import { serve, loadPlaywright, pagePaths } from "./lib/serve.mjs";
const B = { lcp: 2500, cls: 0.05, jsKb: 60, kb: 1200 };
const { chromium } = loadPlaywright();
const srv = await serve();
const browser = await chromium.launch();
let bad = 0;
console.log("page".padEnd(34), "LCP ms".padStart(7), "CLS".padStart(6), "KB".padStart(6), "JS gz".padStart(6));
for (const path of pagePaths()) {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const pg = await ctx.newPage();
  const cdp = await ctx.newCDPSession(pg);
  await cdp.send("Network.enable");
  await cdp.send("Network.emulateNetworkConditions", { offline: false, latency: 150, downloadThroughput: (1.6 * 1024 * 1024) / 8, uploadThroughput: (750 * 1024) / 8 });
  await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });
  let bytes = 0, js = 0;
  pg.on("response", async (r) => { try { const b = await r.body(); bytes += b.length; if (/\.js(\?|$)/.test(r.url())) js += gzipSync(b).length; } catch {} });
  await pg.addInitScript(() => { window.__lcp = 0; window.__cls = 0;
    new PerformanceObserver((l) => { for (const e of l.getEntries()) window.__lcp = e.startTime; }).observe({ type: "largest-contentful-paint", buffered: true });
    new PerformanceObserver((l) => { for (const e of l.getEntries()) if (!e.hadRecentInput) window.__cls += e.value; }).observe({ type: "layout-shift", buffered: true }); });
  await pg.goto(srv.base + path, { waitUntil: "networkidle" });
  await pg.waitForTimeout(600);
  const m = await pg.evaluate(() => ({ lcp: Math.round(window.__lcp), cls: +window.__cls.toFixed(3), ovf: document.documentElement.scrollWidth > innerWidth }));
  const kb = Math.round(bytes / 1024), jsKb = +(js / 1024).toFixed(1);
  const why = [];
  if (m.lcp > B.lcp * 1.2) why.push(`LCP ${m.lcp}`);
  if (m.cls > B.cls) why.push(`CLS ${m.cls}`);
  if (jsKb > B.jsKb) why.push(`JS ${jsKb} KB`);
  if (kb > B.kb) why.push(`${kb} KB`);
  if (m.ovf) why.push("horizontal overflow");
  console.log(path.padEnd(34), String(m.lcp).padStart(7), String(m.cls).padStart(6), String(kb).padStart(6), String(jsKb).padStart(6), why.length ? "  FAIL " + why.join(", ") : "");
  if (why.length) bad++;
  await ctx.close();
}
await browser.close(); srv.close();
console.log(bad ? `perf: ${bad} page(s) over budget` : "perf OK: all pages within budget");
process.exit(bad ? 1 : 0);
