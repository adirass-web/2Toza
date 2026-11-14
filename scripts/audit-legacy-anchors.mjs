// Report the fate of fragment links in an independently built legacy site.
// Usage: node scripts/audit-legacy-anchors.mjs <legacy-build> <new-build>
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { parseDocument, DomUtils } from 'htmlparser2';
const [oldDir, newDir] = process.argv.slice(2);
if (!oldDir || !newDir) { console.error('Usage: node scripts/audit-legacy-anchors.mjs <legacy-build> <new-build>'); process.exit(2); }
const files = d => readdirSync(d).flatMap(n => { const p=join(d,n); return statSync(p).isDirectory() ? files(p) : p.endsWith('.html') ? [p] : []; });
const redirects = new Map(readFileSync(join(newDir, '_redirects'),'utf8').split('\n').map(line=>line.trim().split(/\s+/)).filter(x=>x.length===3 && x[0].startsWith('/')).map(([from,to])=>[from,to]));
const missing = new Set(), passed = new Set(), unmapped = new Set();
for(const file of files(oldDir)) {
 const route='/' + relative(oldDir,file).split(sep).join('/');
 const dom=parseDocument(readFileSync(file,'utf8'));
 for(const el of DomUtils.findAll(n=>n.type==='tag' && n.name==='a' && n.attribs?.href?.includes('#'),dom.children)) {
  let url; try {url=new URL(el.attribs.href,`https://site.invalid${route}`);} catch {continue;}
  if(url.origin!=='https://site.invalid' || !url.hash || url.hash==='#') continue;
  let id; try {id=decodeURIComponent(url.hash.slice(1));} catch {continue;}
  let target=redirects.get(url.pathname) || url.pathname;
  if(target.endsWith('/')) target += 'index.html';
  const output=join(newDir,target); const label=`${url.pathname}#${id} -> ${target}#${id}`;
  if(!existsSync(output)){unmapped.add(label);continue;}
  const targetDom=parseDocument(readFileSync(output,'utf8'));
  (DomUtils.findOne(n=>n.type==='tag'&&(n.attribs?.id===id||(n.name==='a'&&n.attribs?.name===id)),targetDom.children,true)?passed:missing).add(label);
 }
}
console.log(JSON.stringify({legacy:oldDir, candidate:newDir, passed:[...passed].sort(), missing:[...missing].sort(), unmapped:[...unmapped].sort()},null,2));
