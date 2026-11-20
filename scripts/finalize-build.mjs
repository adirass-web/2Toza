import { readFileSync, writeFileSync, readdirSync, rmSync } from 'node:fs';
import path from 'node:path';
if ((process.env.SITE_ENV || 'preview') === 'production') {
  const dir = '_site-production', origin = process.env.SITE_URL;
  const walk = d => readdirSync(d, { withFileTypes: true }).flatMap(e => e.isDirectory() ? walk(path.join(d, e.name)) : e.name === 'index.html' ? [path.join(d, e.name)] : []);
  const pages = walk(path.join(dir, 'en')).sort();
  for (const file of pages) {
    let html = readFileSync(file, 'utf8');
    const route = '/' + file.slice(dir.length + 1).replace(/index\.html$/, '');
    const title = (html.match(/<title>([\s\S]*?)<\/title>/i) || [,'Toza'])[1].trim();
    const description = (html.match(/<meta name="description" content="([^"]*)"/i) || [,'Private digital protection for private clients.'])[1];
    if (!route.startsWith('/en/lp/')) html = html.replace(/\s*<meta name="robots" content="[^"]*noindex[^"]*"\s*\/?\s*>/gi, '');
    const tags = `\n<link rel="canonical" href="${origin}${route}">\n<meta property="og:title" content="${title.replace(/"/g, '&quot;')}">\n<meta property="og:description" content="${description}">\n<meta property="og:url" content="${origin}${route}">\n<meta property="og:image" content="${origin}/approved-en-assets/photos/hero-wide-1536.webp">\n`;
    if (!/<meta name="description"/i.test(html)) html = html.replace('</head>', `<meta name="description" content="${description}">\n</head>`);
    html = html.replace('</head>', tags + '</head>');
    writeFileSync(file, html);
  }
  const root = path.join(dir, 'index.html');
  writeFileSync(root, readFileSync(root, 'utf8').replace(/\s*<meta name="robots" content="[^"]*noindex[^"]*"\s*\/?\s*>/gi, ''));
  const headers = path.join(dir, '_headers');
  writeFileSync(headers, readFileSync(headers, 'utf8').replace(/^\s*X-Robots-Tag:.*\n/gim, ''));
  writeFileSync(path.join(dir, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`);
  writeFileSync(path.join(dir, 'sitemap.xml'), '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + pages.filter(file => !file.startsWith(path.join(dir, 'en/lp') + path.sep)).map(file => `  <url><loc>${origin}/${file.slice(dir.length + 1).replace(/index\.html$/, '')}</loc></url>`).join('\n') + '\n</urlset>\n');
  rmSync(path.join(dir, 'assets/previews'), { recursive: true, force: true });
}
