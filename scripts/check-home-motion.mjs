// Focused behavior gate for the Home motion enhancement. Requires a built _site
// and Playwright. Screenshots and JSON evidence go to the OS temp directory by
// default; set HOME_MOTION_ARTIFACT_DIR to choose another artifact location.
import { mkdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { resolve, join } from "node:path";
import { serve, loadPlaywright } from "./lib/serve.mjs";

const WIDTHS = [390, 768, 1024, 1440, 1920];
const HEIGHT = 900;
const DEST = resolve(process.env.HOME_MOTION_ARTIFACT_DIR || join(tmpdir(), "toza-home-motion"));
const ENGINES = (process.env.HOME_MOTION_BROWSERS || "chromium").split(",").map((x) => x.trim()).filter(Boolean);
mkdirSync(DEST, { recursive: true });
const { chromium, firefox, webkit } = loadPlaywright();
const engines = { chromium, firefox, webkit };
const server = await serve();
const report = { createdAt: new Date().toISOString(), base: server.base, artifacts: DEST, results: [], skippedEngines: [], errors: [] };
report.notRunEngines = ["chromium", "firefox", "webkit"].filter((name) => !ENGINES.includes(name)).map((engine) => ({ engine, reason: "Not selected in HOME_MOTION_BROWSERS." }));
const check = (condition, message, detail) => {
  if (!condition) throw new Error(detail ? `${message}: ${JSON.stringify(detail)}` : message);
};
const pause = (ms = 180) => new Promise((r) => setTimeout(r, ms));

async function readHome(page) {
  return page.evaluate(() => {
    const scene = document.querySelector("[data-situation-scene]");
    const cards = [...(scene?.querySelectorAll("[data-situation-card]") || [])];
    const norm = (s) => (s || "").replace(/\s+/g, " ").trim();
    return {
      title: norm(document.querySelector("h1")?.innerText),
      mainText: norm(document.querySelector("main")?.innerText),
      doors: cards.map((li) => {
        const a = li.querySelector("a");
        return { href: a?.getAttribute("href"), text: norm(a?.innerText) };
      }),
      contact: [...document.querySelectorAll('[data-contact] a[href]')]
        .map((a) => ({ href: a.getAttribute("href"), text: norm(a.innerText) })),
    };
  });
}

async function runEngine(name, engineType) {
  let browser;
  try { browser = await engineType.launch(); }
  catch (e) {
    const skipped = { engine: name, status: "unavailable", reason: String(e.message || e) };
    report.results.push(skipped);
    report.skippedEngines.push(skipped);
    return;
  }
  const state = { engine: name, status: "passed", cases: [], screenshots: [] };
  const observe = (page, errors) => {
    page.on("console", (msg) => { if (msg.type() === "error") errors.push(`console: ${msg.text()}`); });
    page.on("pageerror", (e) => errors.push(`pageerror: ${e.message}`));
  };
  const context = async (width, theme, reducedMotion = "no-preference", javaScriptEnabled = true) => {
    const ctx = await browser.newContext({ viewport: { width, height: HEIGHT }, deviceScaleFactor: 1, colorScheme: theme, reducedMotion, javaScriptEnabled });
    await ctx.addInitScript((t) => { try { localStorage.setItem("tz-theme", t); } catch {} if (t === "dark" && document.documentElement) document.documentElement.setAttribute("data-theme", "dark"); }, theme);
    return ctx;
  };
  try {
    // No-JS and enhanced pages must expose identical authored text and links.
    const fallbackCtx = await context(1440, "light", "no-preference", false);
    const fallback = await fallbackCtx.newPage();
    const fallbackErrors = [];
    observe(fallback, fallbackErrors);
    await fallback.goto(`${server.base}/en/`, { waitUntil: "load" });
    await fallback.evaluate(() => { document.documentElement.style.scrollBehavior = "auto"; });
    await fallback.evaluate(() => document.fonts.ready);
    const fallbackContent = await readHome(fallback);
    check(fallbackContent.doors.length === 4, "No-JS Home must retain all four situation links", fallbackContent.doors);
    check(fallbackContent.contact.length > 0, "No-JS Home must retain contact controls");
    check(await fallback.locator("[data-home-motion]").count() === 1, "Home motion hook missing from static Home");
    check(!(await fallback.locator("html").getAttribute("class") || "").includes("home-motion-ready"), "No-JS fallback must not claim enhancement readiness");
    check(!fallbackErrors.length, "No-JS page reported browser errors", fallbackErrors);
    await fallbackCtx.close();

    const standardCtx = await context(1440, "light");
    const page = await standardCtx.newPage();
    const pageErrors = [];
    observe(page, pageErrors);
    await page.goto(`${server.base}/en/`, { waitUntil: "load" });
    await page.evaluate(() => { document.documentElement.style.scrollBehavior = "auto"; });
    await page.waitForFunction(() => document.documentElement.classList.contains("home-motion-ready"), { timeout: 12000 });
    await page.waitForTimeout(900);
    const enhancedContent = await readHome(page);
    check(JSON.stringify(enhancedContent) === JSON.stringify(fallbackContent), "Enhancement changed authored Home text or links", { fallbackContent, enhancedContent });
    const firstPaintContent = await page.evaluate(() => {
      const selectors = ["[data-home-hero-title]", "[data-home-motion] p", "[data-contact] a[href]"];
      return selectors.flatMap((selector) => [...document.querySelectorAll(selector)].map((el) => {
        const style = getComputedStyle(el), rect = el.getBoundingClientRect();
        return { selector, text: (el.innerText || "").replace(/\s+/g, " ").trim(), visible: style.visibility !== "hidden" && Number(style.opacity) > 0.01 && rect.width > 0 && rect.height > 0 };
      }));
    });
    check(firstPaintContent.length >= 4 && firstPaintContent.every((x) => x.visible), "Headline, lead, and contact controls must remain rendered when enhancement initializes", firstPaintContent);
    check(await page.locator("[data-home-tier]").count() === 3, "Expected three original pricing tiers");
    check(await page.locator("[data-situation-hold]").count() === 4, "Expected four decorative situation holds");
    check(await page.locator("[data-situation-card] a").count() === 4, "Situation links must remain in the DOM");

    // A page outside Home must never initialize the Home enhancement.
    const other = await standardCtx.newPage();
    observe(other, pageErrors);
    await other.goto(`${server.base}/en/faq/`, { waitUntil: "load" });
    await pause();
    check(await other.locator("[data-home-motion], [data-situation-scene]").count() === 0, "Home-only enhancement hooks appeared on FAQ");
    check(!(await other.locator("html").getAttribute("class") || "").includes("home-motion-ready"), "Home enhancement initialized on FAQ");
    await other.close();

    // Desktop holds: sample the linked card order and require each distinct
    // authored scene image to become the visible hold at its own card position.
    await page.setViewportSize({ width: 1440, height: HEIGHT });
    const holdChecks = { samples: [] };
    const cards = page.locator("[data-situation-card]");
    const holdCount = await page.locator("[data-situation-hold]").count();
    check(await cards.count() === 4 && holdCount === 4, "Expected four situation cards and four image holds");
    for (let i = 0; i < 4; i++) {
      await cards.nth(i).evaluate((card) => {
        const r = card.getBoundingClientRect();
        const y = Math.max(0, Math.round(scrollY + r.top + r.height * 0.52 - innerHeight * 0.5));
        scrollTo(0, y);
      });
      const started = Date.now();
      let sample;
      do {
        sample = await page.evaluate((expectedIndex) => {
          const scene = document.querySelector("[data-situation-scene]");
          const stage = scene?.querySelector("[data-situation-stage]");
          const imgs = [...(scene?.querySelectorAll("[data-situation-hold]") || [])];
          const opacity = imgs.map((img) => Number.parseFloat(getComputedStyle(img).opacity || "0"));
          return {
            atCard: expectedIndex + 1,
            activeHold: opacity.indexOf(Math.max(...opacity)) + 1,
            opacity,
            expectedOpacity: opacity[expectedIndex] ?? 0,
            clipPath: stage ? getComputedStyle(stage).clipPath : null,
            sticky: stage ? getComputedStyle(stage).position === "sticky" : false,
            scrollY,
          };
        }, i);
        if (sample.activeHold === i + 1 && sample.expectedOpacity >= 0.98) break;
        await page.waitForTimeout(50);
      } while (Date.now() - started < 2500);
      sample.waitMs = Date.now() - started;
      sample.settled = sample.activeHold === i + 1 && sample.expectedOpacity >= 0.98;
      holdChecks.samples.push(sample);
    }
    await page.evaluate(() => scrollTo(0, 0));
    holdChecks.sourceOrder = await page.locator("[data-situation-hold]").evaluateAll((imgs) => imgs.map((img) => Number((img.currentSrc || img.src).match(/sit-(\d+)-/)?.[1] || 0)));
    holdChecks.cardSourceOrder = await cards.evaluateAll((items) => items.map((card) => Number((card.querySelector("img")?.currentSrc || card.querySelector("img")?.src || "").match(/sit-(\d+)-/)?.[1] || 0)));
    check(holdChecks.samples.every((x, i) => x.activeHold === i + 1 && x.settled), "Situation image holds must become nearly opaque in the four-card order", holdChecks);
    check(holdChecks.samples.every((x) => x.sticky), "Desktop situation stage must remain sticky during its holds", holdChecks.samples);
    check(holdChecks.samples[0].clipPath !== holdChecks.samples[3].clipPath, "Situation crop should widen over the sequence", holdChecks.samples.map((x) => x.clipPath));
    check(JSON.stringify(holdChecks.sourceOrder) === JSON.stringify([1, 2, 3, 4]) && JSON.stringify(holdChecks.cardSourceOrder) === JSON.stringify([1, 2, 3, 4]), "Decorative holds must use the four existing situation photos in their original order, ending on the stairwell", holdChecks);
    state.cases.push({ kind: "desktop-holds", status: "passed", observations: holdChecks });

    // Keyboard traversal must keep the four original linked cards focusable and
    // rendered in the viewport after focus moves to each one.
    await page.evaluate(() => scrollTo(0, 0));
    const focusResults = [];
    for (let i = 0; i < 4; i++) {
      await page.keyboard.press("Tab");
      const focused = await page.evaluate(() => {
        const el = document.activeElement;
        const card = el?.closest("[data-situation-card]");
        const r = el?.getBoundingClientRect();
        return { cardIndex: card ? [...document.querySelectorAll("[data-situation-card]")].indexOf(card) + 1 : null, visible: !!r && r.width > 0 && r.height > 0 && r.bottom > 0 && r.top < innerHeight };
      });
      if (focused.cardIndex) focusResults.push(focused);
    }
    // Start from the document beginning and tab until every situation link has
    // been focused once; the browser itself scrolls focus into view.
    await page.evaluate(() => { document.activeElement.blur(); scrollTo(0, 0); });
    await page.keyboard.press("Home");
    const visited = new Set();
    for (let i = 0; i < 120 && visited.size < 4; i++) {
      await page.keyboard.press("Tab");
      const f = await page.evaluate(() => {
        const el = document.activeElement, card = el?.closest("[data-situation-card]");
        const r = el?.getBoundingClientRect();
        return { index: card ? [...document.querySelectorAll("[data-situation-card]")].indexOf(card) + 1 : null, visible: !!r && r.width > 0 && r.height > 0 && r.bottom > 0 && r.top < innerHeight };
      });
      if (f.index) { check(f.visible, "Keyboard-focused situation link must remain visible", f); visited.add(f.index); }
    }
    check(visited.size === 4, "Keyboard traversal did not reach all original situation links", [...visited]);

    // Resize checks: no horizontal overflow, scene remains native stacked on
    // phones, and the enhancement does not duplicate authored scene nodes.
    const originalCounts = await page.evaluate(() => [document.querySelectorAll("[data-situation-card]").length, document.querySelectorAll("[data-situation-hold]").length]);
    const mobileFallbackCtx = await context(390, "light", "no-preference", false);
    const mobileFallback = await mobileFallbackCtx.newPage();
    await mobileFallback.goto(`${server.base}/en/`, { waitUntil: "load" });
    await mobileFallback.evaluate(() => { document.documentElement.style.scrollBehavior = "auto"; document.fonts.ready; });
    await mobileFallback.evaluate(() => document.fonts.ready);
    const mobileBaseline = await mobileFallback.evaluate(() => ({ scene: document.querySelector("[data-situation-scene]").getBoundingClientRect().height, page: document.documentElement.scrollHeight }));
    await mobileFallbackCtx.close();
    for (const width of WIDTHS) {
      await page.setViewportSize({ width, height: HEIGHT });
      await page.evaluate(() => scrollTo(0, 0));
      await pause(220);
      const metrics = await page.evaluate(() => {
        const scene = document.querySelector("[data-situation-scene]");
        const stage = scene?.querySelector("[data-situation-stage]");
        return { width: innerWidth, scrollWidth: document.documentElement.scrollWidth, clientWidth: document.documentElement.clientWidth, stagePosition: stage ? getComputedStyle(stage).position : null, stageDisplay: stage ? getComputedStyle(stage).display : null, counts: [document.querySelectorAll("[data-situation-card]").length, document.querySelectorAll("[data-situation-hold]").length], sceneHeight: scene?.getBoundingClientRect().height };
      });
      check(metrics.scrollWidth <= metrics.clientWidth + 1, "Horizontal overflow at responsive width", metrics);
      check(JSON.stringify(metrics.counts) === JSON.stringify(originalCounts), "Resize duplicated or removed motion nodes", metrics);
      if (width < 768) check(metrics.stagePosition !== "sticky", "Mobile situation stage must not pin", metrics);
      if (width >= 768) check(metrics.stagePosition === "sticky", "Desktop situation stage must use native sticky positioning", metrics);
      if (width < 768) {
        const mobileDelta = { scene: metrics.sceneHeight - mobileBaseline.scene, page: await page.evaluate(() => document.documentElement.scrollHeight) - mobileBaseline.page };
        check(Math.abs(mobileDelta.scene) <= 2 && Math.abs(mobileDelta.page) <= 4, "Mobile enhancement must not add a scroll runway", { metrics, mobileBaseline, mobileDelta });
      }
      state.cases.push({ kind: "resize", width, metrics });
    }
    check(!pageErrors.length, "Home/FAQ emitted console or page errors", pageErrors);
    await standardCtx.close();

    // Reduced motion at load and live preference changes must remove readiness,
    // restore it when motion is re-enabled, and leave one copy of each node.
    const reducedCtx = await context(1024, "light", "reduce");
    const reduced = await reducedCtx.newPage();
    const reducedErrors = [];
    observe(reduced, reducedErrors);
    await reduced.goto(`${server.base}/en/`, { waitUntil: "load" });
    await pause(350);
    check(!(await reduced.locator("html").getAttribute("class") || "").includes("home-motion-ready"), "Reduced-motion-at-load must remain static");
    check(await reduced.locator("[data-situation-card]").count() === 4, "Reduced motion must preserve four original situation cards");
    await reduced.emulateMedia({ reducedMotion: "no-preference" });
    await reduced.waitForFunction(() => document.documentElement.classList.contains("home-motion-ready"), { timeout: 12000 });
    const beforeToggle = await reduced.locator("[data-situation-card], [data-situation-hold], [data-situation-stage]").count();
    await reduced.emulateMedia({ reducedMotion: "reduce" });
    await reduced.waitForFunction(() => !document.documentElement.classList.contains("home-motion-ready"), { timeout: 8000 });
    check(await reduced.locator("[data-situation-stage]").evaluate(el => getComputedStyle(el).display === "none"), "Live reduced motion must hide the decorative stage");
    await pause(100);
    const driftCleanup = await reduced.locator("[data-home-hero-photo]").evaluate(el => ({ transform: getComputedStyle(el).transform, inline: el.getAttribute("style"), animations: el.getAnimations().map(a => ({ state: a.playState, time: a.currentTime })) }));
    check(driftCleanup.transform === "none", "Live reduced motion must remove hero drift", driftCleanup);
    await reduced.emulateMedia({ reducedMotion: "no-preference" });
    await reduced.waitForFunction(() => document.documentElement.classList.contains("home-motion-ready"), { timeout: 12000 });
    await pause(250);
    const afterToggle = await reduced.locator("[data-situation-card], [data-situation-hold], [data-situation-stage]").count();
    check(beforeToggle === afterToggle, "Live reduced-motion toggling duplicated or removed DOM nodes", { beforeToggle, afterToggle });
    await reduced.evaluate(() => dispatchEvent(new Event("beforeprint")));
    check(!(await reduced.locator("html").getAttribute("class") || "").includes("home-motion-ready"), "Print must tear down the motion runway");
    check(await reduced.locator("[data-situation-source]").first().isVisible(), "Print must restore original situation photos");
    await reduced.evaluate(() => dispatchEvent(new Event("afterprint")));
    await reduced.waitForFunction(() => document.documentElement.classList.contains("home-motion-ready"));
    await reduced.evaluate(() => dispatchEvent(new PageTransitionEvent("pagehide", { persisted: true })));
    check(!(await reduced.locator("html").getAttribute("class") || "").includes("home-motion-ready"), "History navigation must dispose motion");
    await reduced.evaluate(() => dispatchEvent(new PageTransitionEvent("pageshow", { persisted: true })));
    await reduced.waitForFunction(() => document.documentElement.classList.contains("home-motion-ready"));
    check(await reduced.locator("[data-situation-stage]").count() === 1, "History restoration must not duplicate the stage");
    check(!reducedErrors.length, "Reduced-motion lifecycle emitted browser errors", reducedErrors);
    await reducedCtx.close();
    state.cases.push({ kind: "reduced-motion", status: "passed", nodeCount: beforeToggle });
    state.cases.push({ kind: "print-and-history-lifecycle", status: "passed" });

    const unsupportedCtx = await context(1440, "light");
    await unsupportedCtx.addInitScript(() => { window.IntersectionObserver = undefined; });
    const unsupported = await unsupportedCtx.newPage();
    const unsupportedErrors = [];
    observe(unsupported, unsupportedErrors);
    await unsupported.goto(`${server.base}/en/`, { waitUntil: "load" });
    await pause(250);
    check(!(await unsupported.locator("html").getAttribute("class") || "").includes("home-motion-ready"), "Missing animation APIs must restore static Home");
    check(await unsupported.locator("[data-situation-source]").first().isVisible(), "Initialization failure must preserve original photos");
    check((await readHome(unsupported)).mainText === fallbackContent.mainText, "Initialization failure must preserve all content");
    check(!unsupportedErrors.length, "Initialization failure must remain contained", unsupportedErrors);
    await unsupportedCtx.close();
    state.cases.push({ kind: "initialization-failure-fallback", status: "passed" });

    // Non-baseline full-page screenshots: every required viewport and theme.
    for (const theme of ["light", "dark"]) for (const width of WIDTHS) {
      const ctx = await context(width, theme);
      const shotPage = await ctx.newPage();
      const errors = [];
      observe(shotPage, errors);
      await shotPage.goto(`${server.base}/en/`, { waitUntil: "load" });
      await shotPage.evaluate(() => { document.documentElement.style.scrollBehavior = "auto"; });
      if (width >= 768) await shotPage.waitForFunction(() => document.documentElement.classList.contains("home-motion-ready"), { timeout: 12000 });
      else await pause(250);
      await shotPage.evaluate(() => document.fonts.ready);
      await pause(250);
      const metrics = await shotPage.evaluate(() => ({ scrollWidth: document.documentElement.scrollWidth, clientWidth: document.documentElement.clientWidth }));
      check(metrics.scrollWidth <= metrics.clientWidth + 1, `Horizontal overflow in ${theme} ${width}px screenshot`, metrics);
      const filename = `home-${theme}-${width}.png`;
      await shotPage.screenshot({ path: join(DEST, filename), fullPage: true, animations: "disabled" });
      state.screenshots.push({ kind: "full-page", theme, width, path: join(DEST, filename), ...metrics });
      if (theme === "light" && width === 1440) {
        for (let i = 0; i < 4; i++) {
          await shotPage.evaluate((index) => {
            const card = document.querySelectorAll("[data-situation-card]")[index];
            const r = card.getBoundingClientRect();
            const y = Math.max(0, Math.round(scrollY + r.top + r.height * 0.52 - innerHeight * 0.5));
            scrollTo(0, y);
          }, i);
          await pause(280);
          const holdPath = join(DEST, `home-hold-${i + 1}.png`);
          await shotPage.screenshot({ path: holdPath, fullPage: false, animations: "disabled" });
          state.screenshots.push({ kind: "situation-hold", hold: i + 1, width, theme, path: holdPath });
        }
        await shotPage.evaluate(() => scrollTo(0, 0));
        await pause(250);
        const heroPath = join(DEST, "home-hero-1440.png");
        await shotPage.screenshot({ path: heroPath, fullPage: false, animations: "disabled" });
        state.screenshots.push({ kind: "hero", width, theme, path: heroPath });
      }
      check(!errors.length, `Browser error in ${theme} ${width}px screenshot`, errors);
      await ctx.close();
    }
    state.cases.push({ kind: "fallback-content", status: "passed", doors: fallbackContent.doors.length, contactControls: fallbackContent.contact.length });
    state.cases.push({ kind: "keyboard", status: "passed", visited: [...visited].sort() });
  } catch (e) {
    state.status = "failed";
    state.error = e.stack || String(e);
    report.errors.push({ engine: name, message: e.message || String(e) });
  } finally {
    await browser.close();
    report.results.push(state);
  }
}

for (const name of ENGINES) {
  if (!engines[name]) {
    report.results.push({ engine: name, status: "unavailable", reason: "Unknown Playwright engine; choose chromium, firefox, or webkit." });
    continue;
  }
  await runEngine(name, engines[name]);
}
server.close();
const reportPath = join(DEST, "home-motion-report.json");
writeFileSync(reportPath, JSON.stringify(report, null, 2) + "\n");
console.log(`Home motion report: ${reportPath}`);
console.log(JSON.stringify(report.results.map(({ engine, status, error, reason }) => ({ engine, status, error, reason })), null, 2));
if (report.skippedEngines.length) console.log(`Skipped engines: ${report.skippedEngines.map((x) => `${x.engine}: ${x.reason}`).join("; ")}`);
if (report.notRunEngines.length) console.log(`Not run: ${report.notRunEngines.map((x) => `${x.engine} (${x.reason})`).join("; ")}`);
if (report.errors.length || !report.results.some((x) => x.status === "passed")) process.exitCode = 1;
