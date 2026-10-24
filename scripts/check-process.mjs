// Bounded local/live behavior check for the How it works process page.
// Build first for local _site checks. PROCESS_PREVIEW_URL checks a preview origin.
// Screenshots and JSON evidence go to PROCESS_ARTIFACT_DIR when set.
import { mkdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { resolve, join } from "node:path";
import { serve, loadPlaywright } from "./lib/serve.mjs";

const WIDTHS = [390, 768, 1024, 1440, 1920];
const HEIGHT = 900;
const DEST = resolve(process.env.PROCESS_ARTIFACT_DIR || join(tmpdir(), "toza-process"));
const ENGINES = (process.env.PROCESS_BROWSERS || "chromium").split(",").map((x) => x.trim()).filter(Boolean);
const preview = process.env.PROCESS_PREVIEW_URL;
const origin = preview ? new URL(preview).origin : null;
mkdirSync(DEST, { recursive: true });
const { chromium, webkit } = loadPlaywright();
const engines = { chromium, webkit };
const server = origin ? null : await serve();
const base = origin || new URL(server.base).origin;
const report = { createdAt: new Date().toISOString(), base, artifacts: DEST, results: [], errors: [] };
const check = (ok, message, detail) => { if (!ok) throw new Error(detail ? `${message}: ${JSON.stringify(detail)}` : message); };

async function waitReady(page) {
  await page.waitForLoadState("domcontentloaded", { timeout: 10000 });
  const started = Date.now();
  while (Date.now() - started < 20000) {
    const loaded = await page.evaluate(() => document.fonts.status === "loaded");
    if (loaded) return;
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  throw new Error("Fonts did not finish loading within 20 seconds");
}

function observe(page, errors) {
  page.on("pageerror", (error) => errors.push(`pageerror: ${error.message}`));
  page.on("console", (message) => { if (message.type() === "error") errors.push(`console: ${message.text()}`); });
}

async function snapshot(page, excludeContacts = false) {
  return page.evaluate((omitContacts) => {
    const norm = (s) => (s || "").replace(/\s+/g, " ").trim();
    const main = document.querySelector("main")?.cloneNode(true);
    if (omitContacts) main?.querySelectorAll("[data-contact]").forEach((el) => el.remove());
    return {
      text: norm(main?.innerText),
      links: [...(main?.querySelectorAll("a[href]") || [])].map((a) => [a.getAttribute("href"), norm(a.innerText), a.getAttribute("aria-label") || ""]),
    };
  }, excludeContacts);
}

async function open(page, label) {
  const response = await page.goto(`${base}/en/how-it-works/`, { waitUntil: "load", timeout: 15000 });
  check(response?.status() === 200, `${label}: expected HTTP 200`, response?.status());
  await waitReady(page);
  const state = await page.evaluate(() => {
    const norm = (s) => (s || "").replace(/\s+/g, " ").trim();
    const main = document.querySelector("main");
    const h1s = [...document.querySelectorAll("h1")];
    const hero = main?.querySelector("[data-hero]") || main?.querySelector("section:first-of-type");
    const steps = [...(main?.querySelectorAll("li[data-process-step]") || [])];
    const keys = steps.map((li) => li.getAttribute("data-process-step"));
    const keep = steps.map((li) => norm(li.querySelector("[data-process-keep]")?.innerText));
    const drawings = steps.map((li) => {
      const img = li.querySelector("img[alt]");
      const svg = li.querySelector("svg[aria-label], svg[role=img]");
      return img?.getAttribute("alt") || svg?.getAttribute("aria-label") || "";
    });
    const body = getComputedStyle(document.body), html = getComputedStyle(document.documentElement);
    return {
      title: norm(h1s[0]?.innerText), h1Count: h1s.length,
      mainText: norm(main?.innerText),
      robots: document.querySelector('meta[name="robots"]')?.content || "",
      heroImages: [...(hero?.querySelectorAll("img") || [])].map((img) => img.currentSrc || img.src),
      keys, keep, drawings,
      cardCount: main?.querySelectorAll("li[data-process-step] [data-process-card]").length || 0,
      offer: !!main?.querySelector("article.bg-mint"),
      homeHooks: document.querySelectorAll("[data-home-motion], [data-home-hero-photo], [data-home-underline], [data-home-frame], [data-home-method], [data-home-method-scrim], [data-situation-scene], [data-situation-hold]").length,
      homeReady: document.documentElement.classList.contains("home-motion-ready"),
      bodyOverflow: body.overflow, bodyOverflowX: body.overflowX, htmlOverflowX: html.overflowX,
      scrollWidth: document.documentElement.scrollWidth, clientWidth: document.documentElement.clientWidth,
    };
  });
  check(state.h1Count === 1 && state.title, `${label}: expected one populated H1`, state);
  check(/noindex/i.test(state.robots), `${label}: page must remain noindex`, state.robots);
  check(state.heroImages.length === 0, `${label}: typographic hero must not contain a photograph`, state.heroImages);
  check(JSON.stringify(state.keys) === JSON.stringify(["assess", "harden", "verify"]), `${label}: expected Assess → Harden → Verify process order`, state.keys);
  check(state.keep.length === 3 && state.keep.every(Boolean), `${label}: each stage must retain its You keep result`, state.keep);
  check(state.drawings.length === 3 && state.drawings.every(Boolean), `${label}: each stage needs an accessible drawing alternative`, state.drawings);
  check(state.cardCount === 3 && state.offer, `${label}: stage cards or assessment offer missing`, { cardCount: state.cardCount, offer: state.offer });
  check(state.homeHooks === 0 && !state.homeReady, `${label}: Home-only enhancement leaked onto process page`, { hooks: state.homeHooks, ready: state.homeReady });
  return state;
}

async function processGeometry(page) {
  return page.evaluate(() => [...document.querySelectorAll("li[data-process-step]")].map((row) => {
    const card = row.querySelector("[data-process-card]");
    const keep = row.querySelector("[data-process-keep]");
    const r = row.getBoundingClientRect(), c = card?.getBoundingClientRect(), k = keep?.getBoundingClientRect();
    const style = card ? getComputedStyle(card) : null;
    return { key: row.getAttribute("data-process-step"), rowTop: scrollY + r.top, rowBottom: scrollY + r.bottom, rowHeight: r.height, rowPaddingTop: Number.parseFloat(getComputedStyle(row).paddingTop) || 0, cardTop: c ? scrollY + c.top : null, cardHeight: c?.height || 0, sticky: style?.position === "sticky", stickyTop: style ? Number.parseFloat(style.top) || 0 : 0, keepVisible: !!k && k.width > 0 && k.height > 0 };
  }));
}

async function runEngine(name, engineType) {
  let browser;
  try { browser = await engineType.launch(); }
  catch (e) { report.results.push({ engine: name, status: "unavailable", reason: String(e.message || e) }); return; }
  const result = { engine: name, status: "passed", screenshots: [], cases: [] };
  const context = async (width, height = HEIGHT, theme = "light", reducedMotion = "no-preference", javaScriptEnabled = true) => {
    const ctx = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 1, colorScheme: theme, reducedMotion, javaScriptEnabled });
    ctx.setDefaultTimeout(8000); ctx.setDefaultNavigationTimeout(15000);
    await ctx.addInitScript((t) => {
      try { localStorage.setItem("tz-theme", t); } catch {}
      if (t === "dark" && document.documentElement) document.documentElement.setAttribute("data-theme", "dark");
    }, theme);
    return ctx;
  };
  try {
    const jsOffCtx = await context(1440, HEIGHT, "light", "no-preference", false);
    const jsOff = await jsOffCtx.newPage();
    const jsOffErrors = []; observe(jsOff, jsOffErrors);
    await open(jsOff, "JS-off baseline");
    const baseline = await snapshot(jsOff);
    const baselineWithoutContacts = await snapshot(jsOff, true);
    check(!jsOffErrors.length, "JS-off browser errors", jsOffErrors);
    await jsOffCtx.close();

    for (const mode of [["normal", "no-preference"], ["reduced", "reduce"]]) {
      const ctx = await context(1440, HEIGHT, "light", mode[1]);
      const page = await ctx.newPage(); const errors = []; observe(page, errors);
      const state = await open(page, mode[0]);
      check(JSON.stringify(await snapshot(page)) === JSON.stringify(baseline), `${mode[0]} mode changed process content or links`, mode[0]);
      check(!errors.length, `${mode[0]} browser errors`, errors);
      if (mode[0] === "reduced") {
        const cards = await page.locator("li[data-process-step] [data-process-card]").evaluateAll((els) => els.map((el) => getComputedStyle(el).position));
        check(cards.every((position) => position !== "sticky"), "Reduced motion must keep process cards static", cards);
      }
      result.cases.push({ kind: "content-parity", mode: mode[0], status: "passed", h1: state.title });
      await ctx.close();
    }

    // Responsive/theme matrix, with representative full-page evidence from this same run.
    for (const theme of ["light", "dark"]) for (const width of WIDTHS) {
      const ctx = await context(width, HEIGHT, theme);
      const page = await ctx.newPage(); const errors = []; observe(page, errors);
      const state = await open(page, `${theme} ${width}px`);
      await page.evaluate(() => { document.documentElement.style.scrollBehavior = "auto"; document.body.style.scrollBehavior = "auto"; });
      const activeTheme = await page.evaluate(() => document.documentElement.getAttribute("data-theme") || "light");
      check(activeTheme === theme, `Requested ${theme} theme did not activate`, { activeTheme, requested: theme });
      check(state.scrollWidth <= state.clientWidth + 1, `Horizontal overflow at ${theme} ${width}px`, { scrollWidth: state.scrollWidth, clientWidth: state.clientWidth });
      const cardPositions = await page.locator("li[data-process-step] [data-process-card]").evaluateAll((els) => els.map((el) => getComputedStyle(el).position));
      if (width < 768) check(cardPositions.every((position) => position !== "sticky"), "Phone cards must remain static", cardPositions);
      else check(cardPositions.length === 3 && cardPositions.every((position) => position === "sticky"), `${width}px process cards must use native sticky positioning`, cardPositions);
      if (width === 1440) {
        const full = join(DEST, `process-${theme}-1440-full.png`);
        await page.screenshot({ path: full, fullPage: true, animations: "disabled" }); result.screenshots.push(full);
        const offer = page.locator("main article.bg-mint");
        await offer.scrollIntoViewIfNeeded();
        const offerPath = join(DEST, `process-${theme}-offer.png`);
        await page.screenshot({ path: offerPath, fullPage: false, animations: "disabled" }); result.screenshots.push(offerPath);
        await page.evaluate(() => scrollTo(0, 0));
      }
      if (theme === "light" && width === 1440) {
        // Scroll through each real row and observe native sticky motion and row-end release.
        const geometry = await processGeometry(page);
        const sticky = [];
        for (const initial of geometry) {
          check(initial.sticky, `${initial.key}: desktop process card must use native sticky positioning`, initial);
          const naturalTravel = initial.rowHeight - initial.cardHeight - initial.rowPaddingTop;
          if (naturalTravel > 24) {
            const start = Math.max(0, initial.rowTop + initial.rowPaddingTop - initial.stickyTop + 4);
            const end = Math.max(start, initial.rowBottom - initial.cardHeight - initial.stickyTop - 4);
            const samples = [];
            for (const [index, y] of [start, (start + end) / 2, end].entries()) {
              await page.evaluate((top) => scrollTo(0, top), y); await page.waitForTimeout(80);
              samples.push(await page.locator(`li[data-process-step="${initial.key}"]`).evaluate((row) => {
                const c = row.querySelector("[data-process-card]").getBoundingClientRect();
                const r = row.getBoundingClientRect();
                const body = row.querySelector(".space-y-4").getBoundingClientRect();
                return { cardTop: c.top, cardBottom: c.bottom, rowTop: r.top, rowBottom: r.bottom, bodyVisible: body.width > 0 && body.height > 0 && body.bottom > 0 && body.top < innerHeight };
              }));
              if (index === 1) {
                const stickyPath = join(DEST, `process-sticky-${initial.key}.png`);
                await page.screenshot({ path: stickyPath, fullPage: false, animations: "disabled" }); result.screenshots.push(stickyPath);
              }
            }
            check(Math.max(...samples.map((s) => s.cardTop)) - Math.min(...samples.map((s) => s.cardTop)) < 12, `${initial.key}: card did not stay pinned during natural row travel`, samples);
            check(samples.every((s) => s.bodyVisible), `${initial.key}: stage explanation must remain visible during sticky travel`, samples);
            const afterBoundaryY = end + 50;
            await page.evaluate((top) => scrollTo(0, top), afterBoundaryY); await page.waitForTimeout(80);
            const afterBoundary = await page.locator(`li[data-process-step="${initial.key}"]`).evaluate((row) => {
              const c = row.querySelector("[data-process-card]").getBoundingClientRect();
              const r = row.getBoundingClientRect();
              return { cardTop: c.top, cardBottom: c.bottom, rowTop: r.top, rowBottom: r.bottom };
            });
            check(afterBoundary.cardTop < initial.stickyTop - 4, `${initial.key}: card did not leave its sticky position after the row boundary`, afterBoundary);
            check(afterBoundary.cardBottom <= afterBoundary.rowBottom + 14 && afterBoundary.cardBottom >= afterBoundary.rowTop - 14, `${initial.key}: card escaped its row at release`, afterBoundary);
            sticky.push({ key: initial.key, naturalTravel, samples, afterBoundary });
          } else sticky.push({ key: initial.key, naturalTravel, skipped: "Row has no meaningful natural sticky travel at current content height." });
        }
        const movedRows = sticky.filter((row) => !row.skipped);
        check(movedRows.length >= 1, "Expected at least one process row with observable natural sticky movement", sticky);
        result.cases.push({ kind: "native-sticky-rows", status: "passed", rows: sticky });
        // Short desktop viewport catches card/offer wrapping and horizontal overflow.
        await page.setViewportSize({ width: 1440, height: 500 });
        await page.evaluate(() => scrollTo(0, 0));
        const short = await page.evaluate(() => ({ scrollWidth: document.documentElement.scrollWidth, clientWidth: document.documentElement.clientWidth, stepCount: document.querySelectorAll("li[data-process-step]").length }));
        check(short.scrollWidth <= short.clientWidth + 1 && short.stepCount === 3, "1440×500 process layout overflow or lost content", short);
        await page.setViewportSize({ width: 1440, height: HEIGHT });
        await page.evaluate(() => scrollTo(0, 0));
        result.cases.push({ kind: "short-desktop", status: "passed", metrics: short });
      }
      const shot = join(DEST, `process-${theme}-${width}.png`);
      await page.evaluate(() => scrollTo(0, 0));
      await page.screenshot({ path: shot, fullPage: false, animations: "disabled" }); result.screenshots.push(shot);
      check(!errors.length, `${theme} ${width}px browser errors`, errors);
      result.cases.push({ kind: "responsive-theme", width, theme, status: "passed" });
      await ctx.close();
    }

    // Print must preserve the same authored text and links, and print cards remain static.
    const printCtx = await context(1440);
    const printPage = await printCtx.newPage(); const printErrors = []; observe(printPage, printErrors);
    const printState = await open(printPage, "print baseline"); await printPage.emulateMedia({ media: "print" });
    check(JSON.stringify(await snapshot(printPage, true)) === JSON.stringify(baselineWithoutContacts), "Print mode changed non-contact process content or links");
    const printPositions = await printPage.locator("li[data-process-step] [data-process-card]").evaluateAll((els) => els.map((el) => getComputedStyle(el).position));
    check(printState.cardCount === 3 && printPositions.length === 3 && printPositions.every((position) => position !== "sticky"), "Print must preserve all three static process cards", printPositions);
    const printKeeps = await printPage.locator("li[data-process-step] [data-process-keep]").evaluateAll((els) => els.map((el) => { const r = el.getBoundingClientRect(), s = getComputedStyle(el); return r.width > 0 && r.height > 0 && s.display !== "none" && s.visibility !== "hidden"; }));
    check(printKeeps.length === 3 && printKeeps.every(Boolean), "Print must preserve all three You keep results", printKeeps);
    check(!printErrors.length, "Print browser errors", printErrors);
    result.cases.push({ kind: "print", status: "passed" }); await printCtx.close();

    // Keyboard navigation/contact: poll only once the focused target is a matched link.
    for (const width of [390, 1440]) {
      const ctx = await context(width); const page = await ctx.newPage(); const errors = []; observe(page, errors);
      await open(page, `keyboard ${width}`);
      const reached = new Set();
      for (let i = 0; i < 70 && reached.size < 2; i++) {
        await page.keyboard.press("Tab");
        let focus = await page.evaluate(() => {
          const el = document.activeElement, r = el?.getBoundingClientRect();
          return { nav: el?.tagName === "A" && !!el.closest("nav"), contact: el?.tagName === "A" && !!el.closest("[data-contact]"), focusVisible: !!el?.matches(":focus-visible"), visible: !!el && !!r && r.width > 0 && r.height > 0 && r.bottom > 0 && r.top < innerHeight && r.right > 0 && r.left < innerWidth && getComputedStyle(el).visibility !== "hidden" };
        });
        if (!(focus.nav || focus.contact)) continue;
        const deadline = Date.now() + 1500;
        while (!focus.visible && Date.now() < deadline) { await new Promise((resolve) => setTimeout(resolve, 25)); focus = await page.evaluate(() => { const el = document.activeElement, r = el?.getBoundingClientRect(); return { nav: el?.tagName === "A" && !!el.closest("nav"), contact: el?.tagName === "A" && !!el.closest("[data-contact]"), focusVisible: !!el?.matches(":focus-visible"), visible: !!el && !!r && r.width > 0 && r.height > 0 && r.bottom > 0 && r.top < innerHeight && r.right > 0 && r.left < innerWidth && getComputedStyle(el).visibility !== "hidden" }; }); }
        check(focus.visible && focus.focusVisible, `Keyboard-focused link must be visible with a visible focus state at ${width}px`, focus);
        if (focus.nav) reached.add("navigation"); if (focus.contact) reached.add("contact");
      }
      check(reached.has("navigation") && reached.has("contact"), `Keyboard must reach navigation and contact at ${width}px`, [...reached]);
      check(!errors.length, `Keyboard ${width}px browser errors`, errors); await ctx.close();
      result.cases.push({ kind: "keyboard", width, status: "passed", reached: [...reached] });
    }
  } catch (e) {
    result.status = "failed"; result.error = e.stack || String(e);
    report.errors.push({ engine: name, message: e.message || String(e) });
  } finally { await browser.close(); report.results.push(result); }
}

for (const name of ENGINES) {
  if (!engines[name]) { report.results.push({ engine: name, status: "unavailable", reason: "Choose chromium or webkit." }); continue; }
  await runEngine(name, engines[name]);
}
server?.close();
const reportPath = join(DEST, "process-report.json");
writeFileSync(reportPath, JSON.stringify(report, null, 2) + "\n");
console.log(`Process report: ${reportPath}`);
console.log(JSON.stringify(report.results.map(({ engine, status, error, reason }) => ({ engine, status, error, reason })), null, 2));
if (report.errors.length || !report.results.some((x) => x.status === "passed")) process.exitCode = 1;
