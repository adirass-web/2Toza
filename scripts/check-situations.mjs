// Focused behavior check for the four box-layout situation pages.
// Build first for local _site checks. Set SITUATION_PREVIEW_URL to check a
// deployed preview instead. Evidence is kept in SITUATION_ARTIFACT_DIR.
import { mkdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { resolve, join } from "node:path";
import { serve, loadPlaywright } from "./lib/serve.mjs";

const PAGES = [
  ["separation-divorce", "sit-1"],
  ["business-dispute", "sit-2"],
  ["inheritance-conflict", "sit-3"],
  ["they-know-something", "sit-4"],
];
const WIDTHS = [390, 768, 1024, 1440, 1920];
const HEIGHT = 900;
const DEST = resolve(process.env.SITUATION_ARTIFACT_DIR || join(tmpdir(), "toza-situations"));
const ENGINES = (process.env.SITUATION_BROWSERS || "chromium").split(",").map((x) => x.trim()).filter(Boolean);
const preview = process.env.SITUATION_PREVIEW_URL;
const remoteOrigin = preview ? new URL(preview).origin : null;
mkdirSync(DEST, { recursive: true });
const { chromium, webkit } = loadPlaywright();
const engines = { chromium, webkit };
const server = remoteOrigin ? null : await serve();
const base = remoteOrigin || server.base;
const report = { createdAt: new Date().toISOString(), base, artifacts: DEST, results: [], errors: [] };
const check = (ok, message, detail) => { if (!ok) throw new Error(detail ? `${message}: ${JSON.stringify(detail)}` : message); };

async function waitReady(page) {
  await page.waitForLoadState("domcontentloaded", { timeout: 10000 });
  await page.waitForFunction(() => document.fonts.status === "loaded", null, { timeout: 20000 });
  await page.waitForFunction(() => {
    const main = document.querySelector("main");
    const hero = main?.querySelector("[data-hero]") || main?.querySelector("section:first-of-type");
    const image = hero?.querySelector("img") || main?.querySelector("img");
    return !!image && image.complete && image.naturalWidth > 0;
  }, null, { timeout: 10000 });
}

async function snapshot(page) {
  return page.evaluate(() => {
    const norm = (s) => (s || "").replace(/\s+/g, " ").trim();
    const main = document.querySelector("main");
    return {
      text: norm(main?.innerText),
      links: [...(main?.querySelectorAll("a[href]") || [])].map((a) => [a.getAttribute("href"), norm(a.innerText), a.getAttribute("aria-label") || ""]),
      anchors: [...(main?.querySelectorAll("[id]") || [])].map((el) => el.id),
      images: [...(main?.querySelectorAll("img") || [])].map((img) => [img.getAttribute("src"), img.getAttribute("alt"), img.getAttribute("width"), img.getAttribute("height")]),
      stages: [...(main?.querySelectorAll("h2, h3") || [])].map((el) => norm(el.innerText)),
    };
  });
}

async function assertPage(page, key, photo, label) {
  const response = await page.goto(`${base}/en/${key}/`, { waitUntil: "load", timeout: 15000 });
  check(response?.status() === 200, `${label}: expected HTTP 200`, response?.status());
  await waitReady(page);
  const state = await page.evaluate((expectedPhoto) => {
    const norm = (s) => (s || "").replace(/\s+/g, " ").trim();
    const main = document.querySelector("main");
    const hero = main?.querySelector("[data-hero]") || main?.querySelector("section:first-of-type");
    const image = hero?.querySelector("img") || main?.querySelector("img");
    const imgRect = image?.getBoundingClientRect();
    const bodyStyle = getComputedStyle(document.body), htmlStyle = getComputedStyle(document.documentElement);
    const links = [...(main?.querySelectorAll("a[href]") || [])];
    return {
      title: norm(document.querySelector("h1")?.innerText), h1Count: document.querySelectorAll("h1").length,
      mainText: norm(main?.innerText), linkCount: links.length,
      contactLinks: [...document.querySelectorAll("[data-contact] a[href]")].map((a) => a.getAttribute("href")),
      robots: document.querySelector('meta[name="robots"]')?.content || "",
      hero: image ? { src: image.currentSrc || image.src, alt: image.alt, widthAttr: image.getAttribute("width"), heightAttr: image.getAttribute("height"), fetchpriority: image.getAttribute("fetchpriority"), loaded: image.complete && image.naturalWidth > 0, naturalWidth: image.naturalWidth, rectWidth: imgRect?.width || 0, rectHeight: imgRect?.height || 0 } : null,
      expectedPhotoPresent: (image?.currentSrc || image?.src || "").includes(expectedPhoto),
      homeHooks: document.querySelectorAll("[data-home-motion], [data-home-hero-photo], [data-home-underline], [data-home-frame], [data-home-method], [data-home-method-scrim], [data-situation-scene], [data-situation-hold]").length,
      homeReady: document.documentElement.classList.contains("home-motion-ready"),
      bodyPosition: bodyStyle.position, bodyOverflow: bodyStyle.overflow, bodyOverflowX: bodyStyle.overflowX,
      htmlOverflowX: htmlStyle.overflowX, scrollWidth: document.documentElement.scrollWidth, clientWidth: document.documentElement.clientWidth,
      details: [...(main?.querySelectorAll("details") || [])].map((d) => ({ open: d.open, text: norm(d.innerText) })),
      stagePositions: [...(main?.querySelectorAll("h2, h3") || [])].map((el) => { const r = el.getBoundingClientRect(); return { text: norm(el.innerText), x: r.left, y: r.top, width: r.width }; }),
    };
  }, photo);
  check(state.h1Count === 1 && state.title.length > 0, `${label}: expected one populated H1`, state);
  check(state.mainText.length > 100 && state.linkCount > 0, `${label}: main content or links missing`, state);
  check(state.contactLinks.length > 0, `${label}: contact actions missing`, state);
  check(/noindex/i.test(state.robots), `${label}: page must remain noindex`, state.robots);
  check(state.hero?.loaded && state.hero.rectWidth > 0 && state.hero.rectHeight > 0 && state.expectedPhotoPresent, `${label}: expected decorative hero photo must load and have dimensions`, state.hero);
  check(state.hero.alt === "" && state.hero.fetchpriority === "high" && Number(state.hero.widthAttr) > 0 && Number(state.hero.heightAttr) > 0, `${label}: hero photo must remain decorative, sized, and prioritized`, state.hero);
  check(state.homeHooks === 0 && !state.homeReady, `${label}: Home-only enhancement leaked onto situation page`, { hooks: state.homeHooks, ready: state.homeReady });
  check(!["fixed", "sticky"].includes(state.bodyPosition), `${label}: body must not become fixed or sticky`, state.bodyPosition);
  check(!["hidden", "clip"].includes(state.bodyOverflow) && !["hidden", "clip"].includes(state.bodyOverflowX), `${label}: body overflow must remain available`, state.bodyOverflow);
  check(!["hidden", "clip"].includes(state.htmlOverflowX), `${label}: document horizontal overflow must remain available`, state.htmlOverflowX);
  return { state, content: await snapshot(page) };
}

async function runEngine(name, engineType) {
  let browser;
  try { browser = await engineType.launch(); }
  catch (e) { report.results.push({ engine: name, status: "unavailable", reason: String(e.message || e) }); return; }
  const result = { engine: name, status: "passed", pages: [], screenshots: [] };
  const context = async (width, theme, reducedMotion = "no-preference", javaScriptEnabled = true) => {
    const ctx = await browser.newContext({ viewport: { width, height: HEIGHT }, deviceScaleFactor: 1, colorScheme: theme, reducedMotion, javaScriptEnabled });
    ctx.setDefaultTimeout(8000); ctx.setDefaultNavigationTimeout(15000);
    await ctx.addInitScript((t) => {
      try { localStorage.setItem("tz-theme", t); } catch {}
      if (t === "dark" && document.documentElement) document.documentElement.setAttribute("data-theme", "dark");
    }, theme);
    return ctx;
  };
  try {
    for (const [key, photo] of PAGES) {
      const baselineCtx = await context(1440, "light", "no-preference", false);
      const baselinePage = await baselineCtx.newPage();
      const baseline = await assertPage(baselinePage, key, photo, `${key} JS-off`);
      await baselineCtx.close();
      const pageChecks = [];
      for (const [mode, reducedMotion] of [["normal", "no-preference"], ["reduced", "reduce"]]) {
        const ctx = await context(1440, "light", reducedMotion, true);
        const page = await ctx.newPage();
        const observed = await assertPage(page, key, photo, `${key} ${mode}`);
        check(JSON.stringify(observed.content) === JSON.stringify(baseline.content), `${key}: ${mode} changed authored content, links, anchors, images, or stage order`, { baseline: baseline.content, observed: observed.content });
        pageChecks.push({ mode, status: "passed" });
        await ctx.close();
      }

      // Keyboard can reach the site navigation and contact actions at phone and desktop widths.
      for (const width of [390, 1440]) {
        const ctx = await context(width, "light");
        const page = await ctx.newPage();
        await assertPage(page, key, photo, `${key} keyboard ${width}`);
        if (width === 390) {
          const menu = page.locator("[data-collapse-toggle]");
          if (await menu.count()) await menu.click();
        }
        const reached = new Set();
        for (let i = 0; i < 60 && reached.size < 2; i++) {
          await page.keyboard.press("Tab");
          let focus;
          const pollStart = Date.now();
          do {
            focus = await page.evaluate(() => {
              const el = document.activeElement, r = el?.getBoundingClientRect();
              return {
                nav: !!el?.closest("nav") && el?.tagName === "A",
                contact: !!el?.closest("[data-contact]") && el?.tagName === "A",
                visible: !!el && !!r && r.width > 0 && r.height > 0 && r.bottom > 0 && r.top < innerHeight && r.right > 0 && r.left < innerWidth && getComputedStyle(el).visibility !== "hidden",
              };
            });
            if (!(focus.nav || focus.contact) || focus.visible || Date.now() - pollStart >= 1500) break;
            await page.waitForTimeout(25);
          } while (true);
          if (focus.nav || focus.contact) check(focus.visible, `${key}: keyboard-focused link must be in the viewport at ${width}px`, focus);
          if (focus.nav && focus.visible) reached.add("navigation");
          if (focus.contact && focus.visible) reached.add("contact");
        }
        check(reached.has("navigation") && reached.has("contact"), `${key}: keyboard cannot reach navigation and contact at ${width}px`, [...reached]);
        await ctx.close();
      }

      // Five viewport widths in both themes; image captures document the shared responsive treatment.
      for (const theme of ["light", "dark"]) for (const width of WIDTHS) {
        const ctx = await context(width, theme);
        const page = await ctx.newPage();
        const { state } = await assertPage(page, key, photo, `${key} ${theme} ${width}`);
        check(await page.evaluate(() => document.documentElement.getAttribute("data-theme") || "light") === theme, `${key}: requested ${theme} theme did not activate`);
        check(state.scrollWidth <= state.clientWidth + 1, `${key}: horizontal overflow at ${theme} ${width}px`, { scrollWidth: state.scrollWidth, clientWidth: state.clientWidth });
        if (width === 390) {
          const geometry = await page.evaluate(() => {
            const headings = [...document.querySelectorAll("main h2, main h3")].map((el) => el.getBoundingClientRect());
            return headings.slice(1).every((r, i) => r.top >= headings[i].bottom - 1);
          });
          check(geometry, `${key}: phone content must remain a plain vertical stack`);
        }
        const path = join(DEST, `${key}-${theme}-${width}.png`);
        await page.screenshot({ path, fullPage: false, animations: "disabled" });
        result.screenshots.push(path);
        if (width === 1440) {
          const fullPagePath = join(DEST, `${key}-${theme}-1440-full.png`);
          await page.screenshot({ path: fullPagePath, fullPage: true, animations: "disabled" });
          result.screenshots.push(fullPagePath);
        }
        await ctx.close();
      }
      result.pages.push({ key, photo, status: "passed", modes: pageChecks });
    }
  } catch (e) {
    result.status = "failed"; result.error = e.stack || String(e);
    report.errors.push({ engine: name, message: e.message || String(e) });
  } finally {
    await browser.close(); report.results.push(result);
  }
}

for (const name of ENGINES) {
  if (!engines[name]) { report.results.push({ engine: name, status: "unavailable", reason: "Choose chromium or webkit." }); continue; }
  await runEngine(name, engines[name]);
}
server?.close();
const reportPath = join(DEST, "situation-report.json");
writeFileSync(reportPath, JSON.stringify(report, null, 2) + "\n");
console.log(`Situation report: ${reportPath}`);
console.log(JSON.stringify(report.results.map(({ engine, status, error, reason }) => ({ engine, status, error, reason })), null, 2));
if (report.errors.length || !report.results.some((x) => x.status === "passed")) process.exitCode = 1;
