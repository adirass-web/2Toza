'use strict';
// Read-only hosted release checks. Evidence is saved to the explicitly supplied directory.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const assert = require('node:assert/strict');
const { chromium } = require('@playwright/test');
const { pages } = require('../../scripts/accepted-copy.cjs');
const root = path.resolve(__dirname, '../..');
const [baseArg, mode, outputArg] = process.argv.slice(2);
assert(baseArg && outputArg && ['preview', 'production'].includes(mode), 'Usage: node verify-hosted.cjs <origin> <preview|production> <evidence-directory>');
const base = new URL(baseArg).origin;
assert(new URL(base).protocol === 'https:', 'Hosted HTTPS required');
const output = path.resolve(outputArg);
const digest = value => crypto.createHash('sha256').update(value).digest('hex');
const normalize = value => value.toString('utf8').replace(/\r\n/g, '\n');
const files = pages().map(p => 'en/' + p.route + '.html').concat([
  'assets/css/clear-practice.css', 'assets/css/home-pricing.css',
  'assets/js/site.js', 'assets/js/home-pricing.js',
  'assets/brand/toza/toza-logo-ink.svg', 'assets/brand/toza/toza-mark-micro-ink.svg',
  'assets/fonts/source-sans-3-regular.woff2', 'assets/fonts/source-sans-3-semibold.woff2'
]);
(async () => {
  fs.mkdirSync(output, { recursive: true });
  const parity = [];
  for (const file of files) {
    const response = await fetch(base + '/' + file, { signal: AbortSignal.timeout(15000) });
    assert.equal(response.status, 200, file);
    const remote = Buffer.from(await response.arrayBuffer());
    const local = fs.readFileSync(path.join(root, '_site', file));
    const text = /\.(html|css|js|svg)$/.test(file);
    assert.equal(digest(text ? normalize(remote) : remote), digest(text ? normalize(local) : local), file + ': approved build parity');
    if (file.endsWith('.html')) {
      const robots = response.headers.get('x-robots-tag') || '';
      assert.equal(robots.includes('noindex'), mode === 'preview', file + ': indexing');
      assert.equal(response.headers.get('x-frame-options'), 'DENY', file + ': frame header');
      assert.equal(response.headers.get('permissions-policy'), 'geolocation=(), camera=(), microphone=(), payment=()', file + ': permissions header');
    }
    parity.push({ file, sha256: digest(remote), bytes: remote.length });
  }
  assert.equal((await fetch(base + '/_preview/', { signal: AbortSignal.timeout(15000) })).status, 404, 'Local gallery excluded');
  const browser = await chromium.launch();
  const rendering = [];
  try {
    for (const [device, width, height] of [['desktop',1440,900], ['mobile',390,844]]) {
      const context = await browser.newContext({ viewport: { width, height }, colorScheme: 'light', reducedMotion: 'reduce' });
      for (const route of ['index', 'pricing', 'separation-divorce', 'they-know-something']) {
        const page = await context.newPage();
        const errors = [];
        page.on('pageerror', error => errors.push(error.message));
        page.on('response', response => { if (response.status() >= 400) errors.push(response.status() + ' ' + response.url()); });
        const response = await page.goto(base + '/en/' + (route === 'index' ? '' : route + '.html'), { waitUntil: 'networkidle' });
        assert.equal(response.status(), 200);
        await page.evaluate(() => document.fonts.ready);
        const metrics = await page.evaluate(() => ({
          width: document.documentElement.clientWidth,
          scrollWidth: document.documentElement.scrollWidth,
          h1s: document.querySelectorAll('h1').length,
          loadMs: performance.getEntriesByType('navigation')[0].loadEventEnd,
          contactLinks: [...document.querySelectorAll('#contact a[href]')].map(a => a.getAttribute('href'))
        }));
        assert(metrics.scrollWidth <= metrics.width + 1, route + ': horizontal overflow');
        assert.equal(metrics.h1s, 1, route + ': one H1');
        assert(metrics.contactLinks.length > 0, route + ': contact destinations');
        assert(metrics.loadMs > 0 && metrics.loadMs < 10000, route + ': load under 10s');
        assert.deepEqual(errors, [], route + ': page/assets errors');
        await page.screenshot({ path: path.join(output, route + '-' + device + '.png') });
        rendering.push({ route, device, ...metrics, errors });
        await page.close();
      }
      await context.close();
    }
  } finally { await browser.close(); }
  fs.writeFileSync(path.join(output, 'hosted-checks.json'), JSON.stringify({ checkedAt: new Date().toISOString(), base, mode, parity, rendering }, null, 2) + '\n');
  console.log('HOSTED VERIFIED: 19 approved pages/assets; indexing; gallery excluded; 8 desktop/mobile renderings without errors or overflow.');
})().catch(error => { console.error(error); process.exitCode = 1; });
