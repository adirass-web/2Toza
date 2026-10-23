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

async function inspectMethodScrim(page) {
  return page.evaluate(() => {
    const method = document.querySelector("[data-home-method]");
    const scrim = document.querySelector("[data-home-method-scrim]");
    const stage = document.querySelector("[data-situation-stage]");
    const rect = (el) => {
      const r = el?.getBoundingClientRect();
      return r ? { top: r.top, right: r.right, bottom: r.bottom, left: r.left, width: r.width, height: r.height } : null;
    };
    const textRects = (el) => {
      if (!el) return [];
      const range = document.createRange();
      range.selectNodeContents(el);
      return [...range.getClientRects()].map((r) => ({ top: r.top, right: r.right, bottom: r.bottom, left: r.left, width: r.width, height: r.height }));
    };
    const intersection = (a, b) => {
      if (!a || !b) return { width: 0, height: 0, area: 0 };
      const width = Math.max(0, Math.min(a.right, b.right) - Math.max(a.left, b.left));
      const height = Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top));
      return { width, height, area: width * height };
    };
    const parseColors = (value) => {
      const out = [];
      for (const match of (value || "").matchAll(/rgba?\(([^)]+)\)/gi)) {
        const parts = match[1].replace(/\s*\/\s*/, " ").split(/[\s,]+/).filter(Boolean);
        if (parts.length < 3) continue;
        const channels = parts.slice(0, 3).map((part) => Number.parseFloat(part));
        const alpha = parts.length >= 4 ? Number.parseFloat(parts[3]) : 1;
        if (channels.every(Number.isFinite) && Number.isFinite(alpha)) out.push({ channels, alpha: Math.min(1, Math.max(0, alpha)) });
      }
      for (const match of (value || "").matchAll(/color\(\s*srgb\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*([\d.]+))?\s*\)/gi)) {
        const channels = match.slice(1, 4).map((part) => Number.parseFloat(part) * 255);
        const alpha = match[4] === undefined ? 1 : Number.parseFloat(match[4]);
        if (channels.every(Number.isFinite) && Number.isFinite(alpha)) out.push({ channels, alpha: Math.min(1, Math.max(0, alpha)) });
      }
      return out;
    };
    const luminance = (rgb) => rgb.map((channel) => {
      const s = Math.max(0, Math.min(255, channel)) / 255;
      return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
    }).reduce((sum, channel, i) => sum + channel * [0.2126, 0.7152, 0.0722][i], 0);
    const contrast = (a, b) => (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
    const foreground = (el) => {
      const c = parseColors(getComputedStyle(el).color)[0];
      return c ? { rgb: c.channels, luminance: luminance(c.channels) } : null;
    };
    const methodStyle = method ? getComputedStyle(method) : null;
    const link = method?.closest("section")?.querySelector('a[href="/en/about/"]');
    const pseudo = scrim ? ["::before", "::after"].map((name) => {
      const style = getComputedStyle(scrim, name);
      const colors = [...parseColors(style.backgroundColor), ...parseColors(style.backgroundImage)];
      const layers = colors.map((c) => {
        const alpha = c.alpha * Number.parseFloat(style.opacity || "1");
        const overWhite = c.channels.map((channel) => channel * alpha + 255 * (1 - alpha));
        return { source: c, alpha, overWhite, luminanceOnWhite: luminance(overWhite) };
      });
      return { name, content: style.content, opacity: style.opacity, backgroundColor: style.backgroundColor, backgroundImage: style.backgroundImage, maskImage: style.maskImage, maskComposite: style.maskComposite, inset: style.inset, layers };
    }) : [];
    const allLayers = pseudo.flatMap((x) => x.layers);
    const darkest = allLayers.filter((x) => x.alpha > 0.5).sort((a, b) => a.luminanceOnWhite - b.luminanceOnWhite)[0] || null;
    const stageStyle = stage ? getComputedStyle(stage) : null;
    const sceneHolds = [...(stage?.querySelectorAll("img[data-situation-hold]") || [])];
    const sceneOpacity = sceneHolds.map((img) => Number.parseFloat(getComputedStyle(img).opacity || "0"));
    const words = [...(method?.querySelectorAll("[data-home-word]") || [])];
    const wordOpacities = words.map((word) => Number.parseFloat(getComputedStyle(word).opacity || "0"));
    const methodFg = method ? foreground(method) : null;
    const linkFg = link ? foreground(link) : null;
    return {
      hasMethod: !!method,
      hasScrimHook: !!scrim,
      methodText: (method?.innerText || "").replace(/\s+/g, " ").trim(),
      methodRect: rect(method),
      scrimRect: rect(scrim),
      linkRect: rect(link),
      methodGlyphRects: textRects(method),
      linkGlyphRects: textRects(link),
      stageRect: rect(stage),
      intersection: intersection(rect(method), rect(stage)),
      stageOpacity: stageStyle ? Number.parseFloat(stageStyle.opacity || "1") : 0,
      stageDisplay: stageStyle?.display || null,
      visibleHoldIndex: sceneOpacity.indexOf(Math.max(0, ...sceneOpacity)) + 1,
      visibleHoldOpacity: Math.max(0, ...sceneOpacity),
      stageImageLoaded: sceneHolds.some((img) => img.complete && img.naturalWidth > 0),
      methodWordCount: words.length,
      minimumMethodWordOpacity: wordOpacities.length ? Math.min(...wordOpacities) : null,
      foreground: methodStyle?.color || null,
      linkForeground: link ? getComputedStyle(link).color : null,
      methodForegroundIsWhite: !!methodFg && methodFg.rgb.every((c) => c >= 250),
      linkForegroundIsWhite: !!linkFg && linkFg.rgb.every((c) => c >= 250),
      coreScrimSample: darkest,
      textContrastAgainstWorstCaseWhitePhoto: methodFg && darkest ? contrast(methodFg.luminance, darkest.luminanceOnWhite) : null,
      linkContrastAgainstWorstCaseWhitePhoto: linkFg && darkest ? contrast(linkFg.luminance, darkest.luminanceOnWhite) : null,
      pseudo,
    };
  });
}

async function inspectStaticMethod(page) {
  return page.evaluate(() => {
    const el = document.querySelector("[data-home-method]");
    const scrim = document.querySelector("[data-home-method-scrim]");
    const style = el ? getComputedStyle(el) : null;
    const pseudos = scrim ? ["::before", "::after"].map((name) => {
      const pseudo = getComputedStyle(scrim, name);
      return { content: pseudo.content, backgroundColor: pseudo.backgroundColor, backgroundImage: pseudo.backgroundImage, opacity: pseudo.opacity };
    }) : [];
    return { exists: !!el, color: style?.color || null, pseudos };
  });
}

async function waitForFonts(page) {
  await page.waitForFunction(() => document.fonts.status === "loaded", { timeout: 8000 });
}

function assertStaticMethod(state, label) {
  check(state.exists, `${label}: authored method statement missing`);
  const channels = state.color?.match(/rgba?\(([^)]+)\)/i)?.[1]?.replace(/\s*\/\s*/, " ").split(/[\s,]+/).filter(Boolean).slice(0, 3).map(Number) || [];
  check(channels.length === 3 && channels.some((channel) => channel < 245), `${label}: static method text must keep its original dark foreground`, state);
  const painted = state.pseudos.some((p) => p.content !== "none" && p.content !== "normal" && p.opacity !== "0" && (p.backgroundImage !== "none" || !/rgba?\([^)]*,\s*0\s*\)/i.test(p.backgroundColor)));
  check(!painted, `${label}: static method must not paint a scrim`, state);
}

async function inspectLogoSet(page) {
  return page.evaluate(() => [...document.querySelectorAll('[data-track$="-logo"]')].map((el) => {
    const style = getComputedStyle(el), r = el.getBoundingClientRect();
    const parentColor = (node) => node ? getComputedStyle(node).backgroundColor : null;
    const contact = el.closest("[data-contact]");
    const actionRow = contact ? el.closest(".flex") : null;
    const region = el.closest("header") ? "header" : contact ? "contact" : el.closest("nav.fixed") ? "closing-bar" : "other";
    const bgNode = region === "header" ? el.closest("header") : region === "closing-bar" ? el.closest("nav.fixed") : contact?.querySelector('[data-tone="dark"]');
    const rgb = (value) => {
      const body = value?.match(/rgba?\(([^)]+)\)/i)?.[1];
      if (!body) return null;
      const parts = body.replace(/\s*\/\s*/, " ").split(/[\s,]+/).filter(Boolean).map(Number);
      return parts.length >= 3 ? { channels: parts.slice(0, 3), alpha: parts.length >= 4 ? parts[3] : 1 } : null;
    };
    const luminance = (channels) => channels.map((channel) => {
      const c = channel / 255;
      return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
    }).reduce((sum, c, i) => sum + c * [0.2126, 0.7152, 0.0722][i], 0);
    const fg = rgb(style.color), bg = rgb(parentColor(bgNode));
    const fgL = fg && luminance(fg.channels), bgL = bg && luminance(bg.channels);
    return {
      track: el.getAttribute("data-track"),
      href: el.getAttribute("href"),
      ariaLabel: el.getAttribute("aria-label"),
      title: el.getAttribute("title"),
      target: el.getAttribute("target"),
      rel: el.getAttribute("rel"),
      region,
      visible: style.display !== "none" && style.visibility !== "hidden" && Number.parseFloat(style.opacity || "1") > 0 && r.width > 0 && r.height > 0,
      width: r.width,
      height: r.height,
      backgroundColor: style.backgroundColor,
      backgroundAlpha: rgb(style.backgroundColor)?.alpha ?? null,
      borderWidths: [style.borderTopWidth, style.borderRightWidth, style.borderBottomWidth, style.borderLeftWidth].map((x) => Number.parseFloat(x)),
      actionRowBackground: parentColor(actionRow),
      actionRowBackgroundAlpha: rgb(parentColor(actionRow))?.alpha ?? null,
      foregroundContrastInContext: fgL !== null && bgL !== null ? (Math.max(fgL, bgL) + 0.05) / (Math.min(fgL, bgL) + 0.05) : null,
    };
  }));
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
    ctx.setDefaultTimeout(8000);
    ctx.setDefaultNavigationTimeout(15000);
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
    await waitForFonts(fallback);
    const fallbackContent = await readHome(fallback);
    check(fallbackContent.doors.length === 4, "No-JS Home must retain all four situation links", fallbackContent.doors);
    check(fallbackContent.contact.length > 0, "No-JS Home must retain contact controls");
    check(await fallback.locator("[data-home-motion]").count() === 1, "Home motion hook missing from static Home");
    check(!(await fallback.locator("html").getAttribute("class") || "").includes("home-motion-ready"), "No-JS fallback must not claim enhancement readiness");
    assertStaticMethod(await inspectStaticMethod(fallback), "No-JS fallback");
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

    // The method statement remains over the live photo stage. Verify the
    // overlap in both scroll directions, at both desktop breakpoints and in
    // both themes. The measured scrim color is composited over worst-case white.
    const methodChecks = [];
    for (const theme of ["light", "dark"]) for (const width of [768, 1024, 1440, 1920]) {
      const methodCtx = await context(width, theme);
      const methodPage = await methodCtx.newPage();
      const errors = [];
      observe(methodPage, errors);
      await methodPage.goto(`${server.base}/en/`, { waitUntil: "load" });
      await methodPage.evaluate(() => { document.documentElement.style.scrollBehavior = "auto"; });
      await methodPage.waitForFunction(() => document.documentElement.classList.contains("home-motion-ready"), { timeout: 12000 });
      await waitForFonts(methodPage);
      const bounds = await methodPage.evaluate(() => {
        const section = document.querySelector("[data-home-method]")?.closest("section");
        if (!section) return null;
        const r = section.getBoundingClientRect();
        const max = document.documentElement.scrollHeight - innerHeight;
        const y = Math.max(0, Math.min(max, Math.round(scrollY + r.top + r.height * 0.5 - innerHeight * 0.5)));
        return { y, max };
      });
      check(!!bounds, "Method section missing from enhanced Home");
      for (const direction of ["forward", "backward"]) {
        const start = direction === "forward" ? 0 : bounds.max;
        await methodPage.evaluate((y) => scrollTo(0, y), start);
        await pause(180);
        await methodPage.evaluate((y) => scrollTo(0, y), bounds.y);
        const settledAt = Date.now();
        let sample;
        do {
          sample = await inspectMethodScrim(methodPage);
          if (sample.visibleHoldOpacity >= 0.98 && sample.methodWordCount > 0 && sample.minimumMethodWordOpacity >= 0.98) break;
          await methodPage.waitForTimeout(50);
        } while (Date.now() - settledAt < 2500);
        check(sample.hasMethod && sample.hasScrimHook && sample.methodText.length > 0, `Method scrim hook missing in ${theme} ${width}px`, sample);
        check(sample.methodRect?.width > 0 && sample.methodRect.top < HEIGHT && sample.methodRect.bottom > 0, `Method statement must remain visible in ${theme} ${width}px`, sample);
        check(sample.intersection.area > 0 && sample.visibleHoldOpacity >= 0.98 && sample.stageImageLoaded, `Original photo stage must visibly overlap method text in ${theme} ${width}px`, sample);
        check(sample.methodForegroundIsWhite && sample.linkForegroundIsWhite, `Method statement and Why Toza link must be white in ${theme} ${width}px`, sample);
        check(sample.textContrastAgainstWorstCaseWhitePhoto >= 4.5 && sample.linkContrastAgainstWorstCaseWhitePhoto >= 4.5, `Method text and link need 4.5:1 contrast over a white photo in ${theme} ${width}px`, sample);
        const scrim = sample.scrimRect;
        const glyphs = [...sample.methodGlyphRects, ...sample.linkGlyphRects];
        const mask = sample.pseudo.find((p) => p.content !== "none" && p.maskImage !== "none");
        check(!!mask && /intersect/.test(mask.maskComposite) && /linear-gradient/.test(mask.maskImage) && /-\d+px/.test(mask.inset), `Scrim mask must keep an opaque core and feather outside it in ${theme} ${width}px`, sample);
        check(!!scrim && glyphs.length > 0 && glyphs.every((r) => r.left >= scrim.left - 2 && r.right <= scrim.right + 2 && r.top >= scrim.top - 2 && r.bottom <= scrim.bottom + 2), `Opaque scrim core must cover every method and link text glyph in ${theme} ${width}px`, sample);
        const filename = `method-${theme}-${width}-${direction}.png`;
        const path = join(DEST, filename);
        await methodPage.screenshot({ path, fullPage: false, animations: "disabled" });
        methodChecks.push({ theme, width, direction, screenshot: path, observation: sample });
      }
      check(!errors.length, `Browser errors in method overlap ${theme} ${width}px`, errors);
      await methodCtx.close();
    }
    state.cases.push({ kind: "method-photo-overlap-and-scrim", status: "passed", observations: methodChecks });

    // Shared logo links keep their original destination and name, remain plain
    // transparent 48px targets, and retain a visible keyboard focus outline.
    const logoChecks = [];
    const hrefByTrack = new Map();
    for (const theme of ["light", "dark"]) for (const width of [390, 1440]) {
      const logoCtx = await context(width, theme);
      const logoPage = await logoCtx.newPage();
      await logoPage.goto(`${server.base}/en/`, { waitUntil: "load" });
      await logoPage.evaluate(() => { document.documentElement.style.scrollBehavior = "auto"; });
      await waitForFonts(logoPage);
      const logos = await inspectLogoSet(logoPage);
      check(logos.length === 6, `Expected six shared contact logo links in ${theme} ${width}px`, logos);
      const visible = logos.filter((x) => x.visible);
      const counts = Object.fromEntries(["header", "contact", "closing-bar"].map((region) => [region, visible.filter((x) => x.region === region).length]));
      const expected = width < 768 ? { header: 0, contact: 2, "closing-bar": 2 } : { header: 2, contact: 2, "closing-bar": 0 };
      check(JSON.stringify(counts) === JSON.stringify(expected), `Visible logo locations changed in ${theme} ${width}px`, { counts, expected, logos });
      for (const logo of logos) {
        check(!!logo.href && !!logo.ariaLabel && logo.ariaLabel === logo.title, `Logo link needs a stable destination and accessible name in ${theme} ${width}px`, logo);
        check(logo.target === "_blank" && /(?:^|\s)noopener(?:\s|$)/.test(logo.rel || ""), `Logo link must preserve its external-link behavior in ${theme} ${width}px`, logo);
        if (logo.visible) check(logo.width >= 48 && logo.height >= 48, `Logo hit target must be at least 48 by 48 in ${theme} ${width}px`, logo);
        check(logo.backgroundAlpha === 0 && logo.borderWidths.every((n) => n === 0), `Logo itself must stay transparent and borderless in ${theme} ${width}px`, logo);
        if (logo.region === "contact") check(logo.actionRowBackgroundAlpha === 0, `Closing contact logo wrapper must stay transparent in ${theme} ${width}px`, logo);
        check(logo.foregroundContrastInContext >= 3, `Logo foreground needs 3:1 contrast in its ${logo.region} context in ${theme} ${width}px`, logo);
        const previous = hrefByTrack.get(logo.track);
        if (previous) check(previous.href === logo.href && previous.name === logo.ariaLabel, `Logo destination or name changed across breakpoints/themes for ${logo.track}`, { previous, logo });
        else hrefByTrack.set(logo.track, { href: logo.href, name: logo.ariaLabel });
      }
      const focusVisited = new Map();
      await logoPage.evaluate(() => scrollTo(0, 0));
      await logoPage.keyboard.press("Home");
      for (let i = 0; i < 140 && focusVisited.size < visible.length; i++) {
        await logoPage.keyboard.press("Tab");
        const focus = await logoPage.evaluate(() => {
          const el = document.activeElement;
          if (!el?.matches('[data-track$="-logo"]')) return null;
          const s = getComputedStyle(el), r = el.getBoundingClientRect();
          const parse = (v) => { const m = v?.match(/rgba?\(([^)]+)\)/i)?.[1]; if (!m) return null; const p = m.replace(/\s*\/\s*/, " ").split(/[\s,]+/).filter(Boolean).map(Number); return p.length >= 3 ? { rgb: p.slice(0, 3), alpha: p.length >= 4 ? p[3] : 1 } : null; };
          const contact = el.closest("[data-contact]");
          const region = el.closest("header") ? "header" : contact ? "contact" : el.closest("nav.fixed") ? "closing-bar" : "other";
          const bgNode = el.closest("header") || (contact ? contact.querySelector('[data-tone="dark"]') : el.closest("nav.fixed"));
          const fg = parse(s.outlineColor), bg = parse(bgNode ? getComputedStyle(bgNode).backgroundColor : "");
          const lum = (rgb) => rgb.map((v) => { v /= 255; return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }).reduce((sum, v, i) => sum + v * [0.2126, 0.7152, 0.0722][i], 0);
          const fl = fg && lum(fg.rgb), bl = bg && lum(bg.rgb);
          return { track: el.getAttribute("data-track"), region, visible: r.width > 0 && r.height > 0 && r.bottom > 0 && r.top < innerHeight, focusVisible: el.matches(":focus-visible"), outlineStyle: s.outlineStyle, outlineWidth: Number.parseFloat(s.outlineWidth), outlineContrast: fl !== null && bl !== null ? (Math.max(fl, bl) + 0.05) / (Math.min(fl, bl) + 0.05) : null };
        });
        if (focus?.visible) focusVisited.set(`${focus.region}:${focus.track}`, focus);
      }
      check(focusVisited.size === visible.length, `Keyboard traversal did not reach all visible logo links in ${theme} ${width}px`, [...focusVisited.values()]);
      for (const focus of focusVisited.values()) check(focus.focusVisible && focus.outlineStyle !== "none" && focus.outlineWidth >= 1 && focus.outlineContrast >= 3, `Keyboard focus outline must remain visible in ${theme} ${width}px`, focus);
      const headerPath = join(DEST, `logos-header-${theme}-${width}.png`);
      await logoPage.evaluate(() => scrollTo(0, 0));
      await pause(100);
      await logoPage.screenshot({ path: headerPath, fullPage: false, animations: "disabled" });
      let closingPath = null;
      if (width < 768) {
        await logoPage.evaluate(() => scrollTo(0, document.documentElement.scrollHeight));
        await pause(120);
        closingPath = join(DEST, `logos-closing-${theme}-${width}.png`);
        await logoPage.screenshot({ path: closingPath, fullPage: false, animations: "disabled" });
      }
      logoChecks.push({ theme, width, counts, visible: visible.map((x) => x.track), focus: [...focusVisited.values()], headerScreenshot: headerPath, closingScreenshot: closingPath });
      await logoCtx.close();
    }
    state.cases.push({ kind: "shared-logo-hit-targets-and-focus", status: "passed", observations: logoChecks });

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
    await mobileFallback.evaluate(() => { document.documentElement.style.scrollBehavior = "auto"; });
    await waitForFonts(mobileFallback);
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
        assertStaticMethod(await inspectStaticMethod(page), `Phone-width ${width}px`);
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
    assertStaticMethod(await inspectStaticMethod(reduced), "Reduced motion");
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
    await reduced.waitForFunction(() => document.documentElement.classList.contains("home-motion-ready"), { timeout: 12000 });
    await reduced.evaluate(() => dispatchEvent(new PageTransitionEvent("pagehide", { persisted: true })));
    check(!(await reduced.locator("html").getAttribute("class") || "").includes("home-motion-ready"), "History navigation must dispose motion");
    await reduced.evaluate(() => dispatchEvent(new PageTransitionEvent("pageshow", { persisted: true })));
    await reduced.waitForFunction(() => document.documentElement.classList.contains("home-motion-ready"), { timeout: 12000 });
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
      await waitForFonts(shotPage);
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
