// D-026 English-first publication, with Hebrew legal documents retained.
import fs from 'node:fs';
import { createRequire } from 'node:module';
import { assert, readText, htmlFor, siteUrl } from './verify-utils.mjs';
const require = createRequire(import.meta.url);
const {pages} = require('./accepted-copy.cjs');
const sitemap = readText('sitemap.xml');
assert((sitemap.match(/<loc>/g) || []).length === 11, 'Sitemap must contain eleven retained English pages');
for (const page of pages()) {
  const html = htmlFor('en', page.route);
  const route = '/en/' + (page.route === 'index' ? '' : page.route);
  assert(sitemap.includes('<loc>' + siteUrl + route + '</loc>'), 'Missing sitemap URL ' + route);
  assert(html.includes('rel="canonical" href="' + siteUrl + route + '"'), 'Canonical mismatch ' + route);
  assert(html.includes('href="/terms.html" hreflang="he">Terms of use (Hebrew)'), 'Terms language label');
  assert(html.includes('href="/privacy.html" hreflang="he">Privacy notice (Hebrew)'), 'Privacy language label');
  for (const [,href] of html.matchAll(/<a\b[^>]*href="([^"]+)"/g)) {
    if (!href.startsWith('/') && !href.startsWith('#')) continue;
    const url = new URL(href, siteUrl + route);
    assert(!/^\/(he|ru)\//.test(url.pathname), 'Visible withdrawn-language link ' + href);
    const target = '_site' + url.pathname + (url.pathname.endsWith('/') ? 'index.html' : /\.html$/.test(url.pathname) ? '' : '.html');
    assert(fs.existsSync(target), route + ': broken link ' + href);
    if (url.hash) assert(readText(target).includes('id="' + decodeURIComponent(url.hash.slice(1)) + '"'), route + ': broken anchor ' + href);
  }
}
for (const p of ['404.html', 'llms.txt', 'sitemap.xml']) assert(!/\/(he|ru)\//.test(readText(p)), p + ': withdrawn language discovery link');
for (const route of ['commercial-spying', 'private-investigator', 'not-it-support', 'leaving-controlling-relationship']) {
  for (const p of ['llms.txt', 'sitemap.xml']) assert(!readText(p).includes('/en/' + route), 'Retired route in ' + p);
}
assert(/^\/he\/\*\s+\/en\/\s+302$/m.test(readText('_redirects')), 'Hebrew withdrawal must remain temporary');
console.log('PUBLIC LINKS, ANCHORS AND LANGUAGE DISCOVERY VERIFIED');
