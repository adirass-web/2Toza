// Check local links and resources in generated HTML, resolving URLs as browsers do.
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { parseDocument, DomUtils } from 'htmlparser2';
import { siteDir } from './util.mjs';

const dir = process.argv[2] || siteDir();
const files = d => readdirSync(d).flatMap(n => { const p = join(d, n); return statSync(p).isDirectory() ? files(p) : p.endsWith('.html') ? [p] : []; });
const routes = new Map(files(dir).map(file => {
  const path = '/' + relative(dir, file).split(sep).join('/').replace(/index\.html$/, '');
  return [path, parseDocument(readFileSync(file, 'utf8'))];
}));
let bad = 0, count = 0;
for (const [route, dom] of routes) {
  for (const el of DomUtils.findAll(n => n.type === 'tag' && (n.attribs?.href || n.attribs?.src), dom.children)) {
    const value = el.attribs.href || el.attribs.src;
    if (!value || /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(value)) continue;
    let target;
    try { target = new URL(value, `https://site.invalid${route}`); } catch { console.error(`FAIL ${route}: invalid URL ${value}`); bad++; continue; }
    if (target.origin !== 'https://site.invalid') continue;
    count++;
    let pathname;
    try { pathname = decodeURIComponent(target.pathname); } catch { console.error(`FAIL ${route}: invalid encoding ${value}`); bad++; continue; }
    const indexAlias = pathname.endsWith('/index.html') ? pathname.slice(0, -'index.html'.length) : pathname;
    const key = routes.has(indexAlias) ? indexAlias : routes.has(indexAlias.replace(/\/?$/, '/')) ? indexAlias.replace(/\/?$/, '/') : null;
    const file = join(dir, pathname);
    if (!key && !(existsSync(file) && statSync(file).isFile())) { console.error(`FAIL ${route}: ${value} -> no such page or asset`); bad++; continue; }
    if (target.hash && key) {
      let id;
      try { id = decodeURIComponent(target.hash.slice(1)); } catch { console.error(`FAIL ${route}: invalid fragment ${value}`); bad++; continue; }
      if (!DomUtils.findOne(n => n.type === 'tag' && (n.attribs?.id === id || n.name === 'a' && n.attribs?.name === id), routes.get(key).children, true)) { console.error(`FAIL ${route}: ${value} -> missing id ${id}`); bad++; }
    }
  }
}
console.log(bad ? `links: ${bad} broken of ${count}` : `links OK: ${count} links in ${routes.size} pages`);
if (bad) process.exitCode = 1;
