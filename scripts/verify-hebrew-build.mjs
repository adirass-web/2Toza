// Historical command name retained for CI; D-026 changes the published route contract.
import fs from 'node:fs';
import { createRequire } from 'node:module';
import { assert, readText, htmlFor } from './verify-utils.mjs';
const require = createRequire(import.meta.url);
const {pages, sync} = require('./accepted-copy.cjs');
sync(true);
const expected = pages().map(p => p.route + '.html').sort();
const actual = fs.readdirSync('_site/en').filter(p => p.endsWith('.html')).sort();
assert(JSON.stringify(actual) === JSON.stringify(expected), 'Published English routes differ from accepted copy');
assert(!fs.existsSync('_site/he') && !fs.existsSync('_site/ru'), 'Unpublished locale survived clean build');
for (const page of pages()) {
  const html = htmlFor('en', page.route);
  assert(html.includes('<html lang="en" dir="ltr">'), page.route + ': English document contract');
  assert((html.match(/<h1[\s>]/g) || []).length === 1, page.route + ': expected one h1');
  assert((html.match(/id="contact"/g) || []).length === 1, page.route + ': expected one contact destination');
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
  assert(new Set(ids).size === ids.length, page.route + ': duplicate IDs');
  assert(!/hreflang="he" href=/.test(html), page.route + ': withdrawn Hebrew alternate');
  assert(!/(?:3,500|38,000|"price": "3500"|"price": "38000"|No cloud processing|No cloud ·|No logs ·|Book an assessment|Portrait alt text:|Portrait caption:|\{#)/i.test(html), page.route + ': stale claim or editorial annotation');
  const schema = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
  const offers = schema['@graph'][0].hasOfferCatalog.itemListElement;
  assert(offers[0].price === '3600' && offers[1].price === '14000', 'Fixed schema prices');
  assert(offers[2].price === undefined && offers[2].priceSpecification.minPrice === 42000, 'Inner Circle must retain starting-price meaning');
  assert(offers[3].price === undefined, 'Bespoke has no public fixed price');
}
for (const legal of ['terms', 'privacy']) assert(readText('_site/' + legal + '.html').includes('<html lang="he" dir="rtl">'), legal + ': preserve Hebrew legal document');
console.log('ENGLISH PUBLICATION AND ACCEPTED SOURCE CONTRACT VERIFIED');
require('./verify-presentation.cjs');
require('./verify-copy-amendment.cjs');
require('./verify-marketing-02.cjs');
