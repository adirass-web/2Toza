// Verify indexing policy against the selected build artifact.
import { join } from 'node:path';
import { readText, walk, fail, siteDir } from './util.mjs';
const dir = siteDir(), production = process.env.SITE_ENV === 'production';
const isPaid = file => file.startsWith(join(dir, 'en', 'lp') + '/');
const pages = walk(dir);
for (const file of pages) {
  const is404 = file === join(dir, '404.html');
  const blocked = /<meta\s+name="robots"[^>]*noindex/i.test(readText(file));
  if (production && !is404 && !isPaid(file) ? blocked : !blocked) fail(`${file}: incorrect robots meta for ${production ? 'production' : 'preview'}`);
}
const headers = readText(join(dir, '_headers'));
const robots = readText(join(dir, 'robots.txt'));
const blockedHeaders = /X-Robots-Tag:\s*noindex/i.test(headers);
const blockedRobots = /Disallow:\s*\//i.test(robots);
if (production ? blockedHeaders : !blockedHeaders) fail('_headers: incorrect indexing policy');
if (production ? blockedRobots : !blockedRobots) fail('robots.txt: incorrect indexing policy');
if (production) {
  const origin = process.env.SITE_URL;
  const englishPages = pages.filter(file => file.startsWith(join(dir, 'en') + '/') && file.endsWith('/index.html'));
  for (const file of englishPages) {
    const route = '/' + file.slice(dir.length + 1).replace(/index\.html$/, '');
    if (!readText(file).includes(`<link rel="canonical" href="${origin}${route}">`)) fail(`${file}: missing canonical`);
  }
  const sitemap = readText(join(dir, 'sitemap.xml'));
  for (const file of englishPages) {
    const route = '/' + file.slice(dir.length + 1).replace(/index\.html$/, '');
    if (sitemap.includes(`<loc>${origin}${route}</loc>`) === isPaid(file)) fail(`${file}: incorrect sitemap inclusion`);
  }
  if ((sitemap.match(/<loc>/g) || []).length !== englishPages.filter(file => !isPaid(file)).length) fail('sitemap: unexpected route count');
}
if (!process.exitCode) console.log(`${production ? 'production indexing' : 'noindex'} OK: ${pages.length} pages in ${dir}`);
