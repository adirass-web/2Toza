import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, existsSync, symlinkSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { exportProduction } from './export-production.mjs';
function fixture(t) {
  const root = mkdtempSync(path.join(tmpdir(), 'toza-export-'));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const source = path.join(root, 'source'), destination = path.join(root, 'bundle');
  mkdirSync(source);
  const put = (name, data) => { mkdirSync(path.dirname(path.join(source, name)), { recursive: true }); writeFileSync(path.join(source, name), data); };
  put('index.html', '<link href="/assets/main.css"><img srcset="/assets/a.webp 480w, /assets/b.webp 900w">');
  put('robots.txt', 'User-agent: *\nAllow: /'); put('_headers', '/*\n  X-Content-Type-Options: nosniff'); put('_redirects', '/ /en/ 302'); put('sitemap.xml', '<urlset/>');
  put('assets/LICENSE', 'Retain attribution');
  put('assets/main.css', '@font-face { src:url("font.woff2") }');
  for (const name of ['a.webp', 'b.webp', 'font.woff2', 'unused.png']) put(`assets/${name}`, name);
  return { source, destination, put };
}
test('exports reference closure, control files and verifiable hashes without unused assets', t => {
  const f = fixture(t); const manifest = exportProduction(f);
  assert.ok(existsSync(path.join(f.destination, 'site/assets/LICENSE')));
  assert.ok(existsSync(path.join(f.destination, 'site/assets/font.woff2')));
  assert.ok(existsSync(path.join(f.destination, 'site/assets/b.webp')));
  assert.ok(!existsSync(path.join(f.destination, 'site/assets/unused.png')));
  for (const file of manifest.files) assert.equal(file.sha256, createHash('sha256').update(readFileSync(path.join(f.destination, 'site', file.path))).digest('hex'));
  assert.equal(JSON.parse(readFileSync(path.join(f.destination, 'manifest.json'))).files.length, manifest.files.length);
  assert.throws(() => exportProduction(f), /exists/);
});
test('fails closed for missing local dependencies and preview indexing', t => {
  const f = fixture(t); f.put('index.html', '<img src="/missing.webp">');
  assert.throws(() => exportProduction(f), /Missing local reference/);
  assert.ok(!existsSync(f.destination));
  f.put('index.html', '<meta name="robots" content="noindex">');
  assert.throws(() => exportProduction(f), /noindex/);
});
test('rejects symlinks, including unreferenced files', t => {
  const f = fixture(t); symlinkSync('/etc/passwd', path.join(f.source, 'secret'));
  assert.throws(() => exportProduction(f), /symlink/);
});

test('keeps Open Graph images, SVG references, imports and literal script assets', t => {
  const f = fixture(t);
  f.put('index.html', '<meta property="og:image" content="https://toza-site.pages.dev/assets/social.webp"><svg><use href="/assets/icons.svg#check"/></svg><link href="/assets/main.css"><script src="/assets/app.js"></script>');
  f.put('assets/main.css', '@import "extra.css";'); f.put('assets/extra.css', 'body{background:url(a.webp)}');
  f.put('assets/icons.svg', '<svg><image href="b.webp"/></svg>'); f.put('assets/social.webp', 'social');
  f.put('assets/app.js', 'const image = "/assets/script.webp";'); f.put('assets/script.webp', 'script');
  const result = exportProduction(f);
  for (const asset of ['social.webp', 'icons.svg', 'a.webp', 'b.webp', 'script.webp']) assert.ok(result.files.some(file => file.path === `assets/${asset}`));
});

test('rejects missing extensionless runtime and navigation references', t => {
  const f = fixture(t);
  for (const markup of ['<img src="/missing-image">', '<a href="/missing-route">Missing</a>', '<link rel="stylesheet" href="/missing-style">', '<style>body {background:url(/missing-background)}</style>']) {
    f.put('index.html', markup);
    assert.throws(() => exportProduction(f), /Missing local reference/);
    assert.ok(!existsSync(f.destination));
  }
});
test('allows an exact declared navigation redirect only to an existing destination', t => {
  const f = fixture(t);
  f.put('index.html', '<a href="/old-route">Current page</a>');
  f.put('_redirects', '/old-route /en/ 301');
  assert.throws(() => exportProduction(f), /Missing local reference/);
  f.put('en/index.html', '<h1>Destination</h1>');
  const result = exportProduction(f);
  assert.ok(result.files.some(file => file.path === 'en/index.html'));
});
test('does not exempt runtime dependencies just because a redirect exists', t => {
  const f = fixture(t);
  f.put('index.html', '<img src="/old-image">');
  f.put('_redirects', '/old-image /assets/a.webp 301');
  assert.throws(() => exportProduction(f), /Missing local reference/);
});
