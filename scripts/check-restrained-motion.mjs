import assert from 'node:assert/strict';
import { serve, loadPlaywright } from './lib/serve.mjs';
const server = await serve();
const { chromium } = loadPlaywright();
const browser = await chromium.launch({ executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || undefined });
const errors = [];
try {
  for (const [route, selector] of [['/en/', '.en-situation-image'], ['/en/pricing/', '.pricing-option']]) {
    for (const options of [{ javaScriptEnabled: false }, { reducedMotion: 'reduce' }]) {
      const page = await browser.newPage(options);
      page.on('pageerror', error => errors.push(error.message));
      await page.goto(server.base + route);
      const target = page.locator(selector).first();
      await target.scrollIntoViewIfNeeded();
      assert.equal(await target.evaluate(e => getComputedStyle(e).opacity), '1');
      if (options.javaScriptEnabled !== false) assert.equal(await target.evaluate(e => e.getAnimations().length), 0);
      assert.ok(await page.locator('.fixed-contact-icons a').first().isVisible());
      await page.close();
    }
    const page = await browser.newPage({ reducedMotion: 'no-preference', viewport: { width: 1440, height: 300 } });
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(server.base + route);
    assert.equal(await page.locator('script[src="/assets/js/restrained-motion.js"]').count(), 1, 'approved routes load the small motion entry');
    const target = page.locator(selector).last();
    await target.evaluate(e => e.scrollIntoView());
    await page.waitForFunction(s => document.querySelectorAll(s)[document.querySelectorAll(s).length - 1].getAnimations().some(a => a.playState === 'running'), selector);
    const frames = await target.evaluate(e => e.getAnimations()[0].effect.getKeyframes());
    assert.ok(frames.every(f => f.opacity === undefined || Number(f.opacity) >= .85), 'reveal stays readable');
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.waitForTimeout(50);
    assert.equal(await target.evaluate(e => e.getAnimations().length), 0, 'changing preference cancels motion');
    assert.equal(await target.evaluate(e => getComputedStyle(e).opacity), '1');
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.evaluate(() => window.scrollTo(0, 0));
    await target.scrollIntoViewIfNeeded();
    await page.waitForTimeout(50);
    assert.equal(await target.evaluate(e => e.getAnimations().length), 0, 'visited content never replays');
    await page.close();
  }
  assert.deepEqual(errors, [], 'motion must not cause page errors');
  console.log('Motion: static/no-JS, reduced motion, preference changes, readable keyframes and once-only reveals pass.');
} finally { await browser.close(); server.close(); }
