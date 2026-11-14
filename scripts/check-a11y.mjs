// Accessibility gate: axe-core (WCAG 2.0/2.1 A+AA) on every built page, at 390 and 1440, in every shipped theme.
//   node scripts/check-a11y.mjs        (needs _site built and a Playwright browser)
// Fails on any violation of impact serious or critical; lists moderate/minor as warnings.
// Themes: light always; dark when tokens declare [data-theme="dark"].
import { readFileSync } from "node:fs";
import { serve, loadPlaywright, pagePaths, themes } from "./lib/serve.mjs";
const axeSrc = readFileSync("node_modules/axe-core/axe.min.js", "utf8");
const { chromium } = loadPlaywright();
const srv = await serve();
const browser = await chromium.launch();
let hard = 0, soft = 0, runs = 0;
for (const theme of themes()) for (const w of [390, 1440]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: w === 390 ? 844 : 900 }, reducedMotion: "reduce" });
  await ctx.addInitScript((t) => { try { localStorage.setItem("tz-theme", t); } catch {} if (t === "dark") document.documentElement.setAttribute("data-theme", "dark"); }, theme);
  for (const path of pagePaths()) {
    const pg = await ctx.newPage();
    await pg.goto(srv.base + path, { waitUntil: "load" });
    await pg.evaluate((s) => { const e = document.createElement("script"); e.textContent = s; document.head.append(e); }, axeSrc);
    const v = await pg.evaluate(async () => (await axe.run(document, { runOnly: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"] })).violations.map((x) => ({ id: x.id, impact: x.impact, help: x.help, nodes: x.nodes.slice(0, 3).map((n) => n.target.join(" ")) })));
    runs++;
    for (const x of v) {
      const line = `${theme} ${w} ${path} ${x.id} (${x.impact}): ${x.help} — ${x.nodes.join(" | ")}`;
      if (x.impact === "serious" || x.impact === "critical") { console.error("FAIL " + line); hard++; } else { console.warn("warn " + line); soft++; }
    }
    await pg.close();
  }
  await ctx.close();
}
await browser.close(); srv.close();
console.log(`a11y: ${runs} runs (${themes().join("+")} × 390/1440 × pages), ${hard} serious/critical, ${soft} lesser`);
process.exit(hard ? 1 : 0);
