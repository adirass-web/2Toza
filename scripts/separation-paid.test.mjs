import { test } from 'node:test';
import { strict as assert } from 'node:assert';
import { readFileSync } from 'node:fs';

const sitemap = readFileSync('_site-production/sitemap.xml', 'utf8');

for (const slug of ['separation', 'business-account-privacy']) {
  test(`paid route ${slug} stays noindex and out of the production sitemap`, () => {
    const route = `/en/lp/${slug}/`;
    const html = readFileSync(`_site-production${route}index.html`, 'utf8');
    assert.match(html, /<meta name="robots" content="noindex,nofollow">/);
    assert.ok(!sitemap.includes(route));
  });
}
