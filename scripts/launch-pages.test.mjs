import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
const dir = process.env.SITE_ENV === 'production' ? '_site-production' : '_site';
const read = path => readFileSync(`${dir}/${path}`, 'utf8');

test('about displays selected portrait before the biography', () => {
  const html = read('en/about/index.html');
  const portrait = html.indexOf('dr-tabansky-graphite-polished-640.webp');
  assert.ok(portrait > 0, 'selected portrait is missing');
  assert.ok(portrait < html.indexOf('<article'), 'portrait must precede biography');
  assert.match(html, /alt="[^\"]*Tabansky[^\"]*"/);
});

test('approved pages have useful footer links without preview label', () => {
  for (const route of ['en/index.html', 'en/about/index.html', 'en/exposure/index.html', 'en/separation-divorce/index.html']) {
    const html = read(route);
    assert.doesNotMatch(html, /Local design preview/);
    const footer = html.match(/<footer[\s\S]*?<\/footer>/i)?.[0] || '';
    for (const slug of ['pricing', 'faq', 'attorneys', 'conditions', 'about']) assert.match(footer, new RegExp(`/en/${slug}/`), `${route}: missing ${slug}`);
  }
});

test('legacy English and Hebrew routes have appropriate redirects', () => {
  const redirects = read('_redirects');
  for (const slug of ['attorneys', 'business-dispute', 'commercial-spying', 'faq', 'inheritance-clash', 'leaving-controlling-relationship', 'not-it-support', 'pricing', 'private-exposure-assessment', 'private-investigator', 'separation-divorce', 'they-know-something', 'what-happens-during-the-visit', 'why-us']) {
    for (const lang of ['en', 'he']) for (const suffix of ['', '.html']) {
      assert.match(redirects, new RegExp(`^/${lang}/${slug.replace(/[-]/g, '\\-')}${suffix ? '\\.'+'html' : ''}\\s+/en/[^\\s]*\\s+${lang === 'he' ? '302' : '301'}\\s*$`, 'm'), `${lang}/${slug}${suffix}`);
    }
  }
  assert.match(redirects, /^\/he\/\s+\/en\/\s+302\s*$/m);
});

test('404 page provides navigation and no redirect fallback', () => {
  assert.ok(existsSync(`${dir}/404.html`));
  const page = read('404.html');
  assert.match(page, /Page not found/); assert.match(page, /name="robots" content="noindex"/); assert.match(page, /href="\/en\/"/);
  assert.doesNotMatch(read('_redirects'), /^\/\*\s+\/en\//m);
});

test('clearly matching legacy fragments remain available on their destinations', () => {
  for (const [route, ids] of Object.entries({
    'en/index.html':['main-content','contact'],
    'en/faq/index.html':['main-content','contact','privacy','boundaries','getting-started','prices-credit-and-urgent-visits','what-should-i-send-in-the-first-message','can-someone-notice-my-contact-with-toza-or-the-changes-we-make'],
    'en/business-dispute/index.html':['main-content','contact','see-where-personal-and-business-access-still-meet'],
    'en/inheritance-conflict/index.html':['main-content','contact','access-shared-in-good-faith-can-still-matter'],
    'en/they-know-something/index.html':['main-content','contact','start-with-what-can-be-checked'],
    'en/attorneys/index.html':['main-content','contact','when-a-referral-may-help'],
  })) { const html = read(route); for (const id of ids) assert.ok(html.includes(`id="${id}"`),`${route} #${id}`); }
});
