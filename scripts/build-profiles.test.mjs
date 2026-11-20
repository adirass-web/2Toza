import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import path from 'node:path';
const read = p => readFileSync(p, 'utf8');
function run(env) { return spawnSync('npm', ['run', 'build'], { encoding: 'utf8', env: { ...process.env, ...env } }); }
function htmlFiles(dir) { return readdirSync(dir, { withFileTypes: true }).flatMap(e => e.isDirectory() ? htmlFiles(path.join(dir,e.name)) : e.name === 'index.html' ? [path.join(dir,e.name)] : []); }
test('build profiles isolate indexing and canonical metadata', () => {
  let result = run({ SITE_ENV: 'preview', SITE_URL: '' }); assert.equal(result.status, 0, result.stderr);
  assert.match(read('_site/en/index.html'), /name="robots"[^>]*noindex/);
  assert.match(read('_site/_headers'), /X-Robots-Tag:\s*noindex/i);
  result = run({ SITE_ENV: 'production', SITE_URL: 'https://toza-site.pages.dev' }); assert.equal(result.status, 0, result.stderr);
  const files = htmlFiles('_site-production/en');
  const paidRoutes = new Set(['/en/lp/separation/', '/en/lp/business-account-privacy/']);
  const sitemap = read('_site-production/sitemap.xml');
  for (const file of files) {
    const html = read(file); const route = '/' + file.replace(/^_site-production\//, '').replace(/index\.html$/, '');
    if (paidRoutes.delete(route)) {
      assert.match(html, /name="robots"[^>]*noindex/i, file);
      assert.ok(!sitemap.includes(route), file);
    } else {
      assert.doesNotMatch(html, /name="robots"[^>]*noindex/i, file);
      assert.ok(sitemap.includes(route), file);
    }
    assert.ok(html.includes(`<link rel="canonical" href="https://toza-site.pages.dev${route}">`), file);
    assert.match(html, /property="og:title"/, file); assert.match(html, /property="og:description"/, file);
  }
  assert.equal(paidRoutes.size, 0, "both paid routes must be built");
  assert.doesNotMatch(read('_site-production/_headers'), /X-Robots-Tag:\s*noindex/i);
  assert.doesNotMatch(read('_site-production/robots.txt'), /Disallow:\s*\//);
  assert.equal((read('_site-production/sitemap.xml').match(/<loc>/g) || []).length, 13);
  assert.equal(existsSync('_site-production/assets/previews'), false);
  assert.match(read('_site/en/index.html'), /name="robots"[^>]*noindex/);
});
test('production rejects a missing or incorrect public URL', () => {
  for (const SITE_URL of ['', 'https://example.com']) assert.notEqual(run({ SITE_ENV:'production', SITE_URL }).status, 0);
});
test('home serves responsive compressed hero images', () => {
  const html = read('_site/en/index.html');
  assert.match(html, /hero-wide-900\.webp/); assert.match(html, /hero-wide-1536\.webp/);
});
