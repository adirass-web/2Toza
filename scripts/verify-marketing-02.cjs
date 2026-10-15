'use strict';
// Release integrity: exact frozen payloads, block order, commercial table
// associations and every previously published file outside the three pages.
const fs = require('node:fs');
const crypto = require('node:crypto');
const assert = require('node:assert/strict');
const {parseDocument} = require('htmlparser2');
const D = require('domutils');
const {pages, renderPage, assertAuthority, read, project} = require('./accepted-copy.cjs');
const hash = data => crypto.createHash('sha256').update(data).digest('hex');
const find = (n, fn) => D.findAll(fn, n.children || []);
const norm = n => D.textContent(n).replace(/\s+/g, ' ').trim();
function content(html) {
  const doc = parseDocument(html), root = find(doc, n => n.name === 'main')[0] || doc;
  find(root, n => n.attribs?.['data-presentation-ui'] !== undefined || (n.attribs?.class || '') === 'table-hint' || (n.attribs?.class || '') === 'contact-channels').forEach(D.removeElement);
  return root;
}
const blocks = n => find(n, x => ['h1','h2','h3','p','li','th','td','figcaption'].includes(x.name)).map(x => [x.name, norm(x)]);
const links = n => find(n, x => x.name === 'a').map(x => [norm(x), x.attribs.href]);
assertAuthority();
const manifest = JSON.parse(read(project + 'approved/acceptance-amendment-2026-10-14-marketing-02.json'));
const approvedHashes = {
  index: '940828ba8c1df1092bf9cca9b2db3d5a2d4f8b42c593d49138103e2c7ea96864',
  'why-us': '03e473a5f58dc6bab4243d259df8610c266a838d6b6830903b279aea9b8bc196',
  pricing: 'e416b43f5936aaf448dca0966a2bbbec337ffb491f2d46179dfb2cd4c1e74a8e',
};
assert.deepEqual(manifest.entries.map(e => e.route).sort(), Object.keys(approvedHashes).sort());
for (const entry of manifest.entries) {
  assert.equal(entry.sha256, approvedHashes[entry.route], entry.route + ': frozen owner approval');
  assert.equal(hash(read(project+entry.path)),entry.sha256,entry.route+': historical marketing source remains exact');
  const page = pages().find(p => p.route === entry.route);
  // Pricing-04 is a later exact owner approval, with its own complete render
  // and preservation gate. Marketing-02 still owns unchanged Home and Why.
  if(page.pricing04){assert.equal(entry.route,'pricing');continue;}
  assert.equal(hash(page.source), entry.sha256, entry.route + ': exact effective source');
  const expected = content(renderPage(page, {presentation:false}));
  const actual = content(fs.readFileSync('_site/en/' + page.route + '.html', 'utf8'));
  assert.deepEqual(blocks(actual), blocks(expected), page.route + ': exact block text AND source order');
  assert.deepEqual(links(actual), links(expected), page.route + ': exact source links AND order');
  if (page.route === 'pricing') assert.equal(find(actual, n => n.name === 'table').length, 5, 'Four frozen commercial tables and additional delivery matrix');
}
const baseline = JSON.parse(fs.readFileSync('docs/marketing-02-release/BASELINE-OUTPUT.json', 'utf8'));
const changed = new Set(['en/index.html','en/why-us.html','en/pricing.html']);
let retained = 0;
for (const [path, fingerprint] of Object.entries(baseline)) {
  if (changed.has(path)) continue;
  let output = fs.readFileSync('_site/' + path);
  if (path.startsWith('en/') && path.endsWith('.html')) {
    const footerAsset = '\n    <link rel="stylesheet" href="/assets/css/footer-compact.css?v=footer-compact-1">';
    const html = output.toString('utf8');
    assert.equal(html.split(footerAsset).length, 2, path + ': one exact authorized footer stylesheet');
    output = Buffer.from(html.replace(footerAsset, ''));
  }
  assert.equal(hash(output), fingerprint, path + ': published output unchanged apart from authorized footer stylesheet'); retained++;
}
console.log('MARKETING-02 VERIFIED: all historical source hashes; current Home/Why exact block/link order; Pricing checked by its effective approval; ' + retained + ' prior public files unchanged apart from the exact authorized footer stylesheet link.');
