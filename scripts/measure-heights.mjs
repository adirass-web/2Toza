import { createServer } from "node:http";
import { readFileSync, existsSync, statSync, writeFileSync } from "node:fs";
import { join, extname } from "node:path";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const { chromium } = require("/opt/npm-tools/node_modules/playwright");
const T={".html":"text/html",".css":"text/css",".js":"text/javascript",".svg":"image/svg+xml",".webp":"image/webp",".woff2":"font/woff2",".png":"image/png"};
const s=createServer((q,r)=>{let f=join("_site",decodeURIComponent(q.url.split("?")[0]));if(existsSync(f)&&statSync(f).isDirectory())f=join(f,"index.html");if(!existsSync(f)){r.writeHead(404);r.end();return}r.writeHead(200,{"content-type":T[extname(f)]||"application/octet-stream"});r.end(readFileSync(f))}).listen(0);
const base=`http://127.0.0.1:${s.address().port}`;
const pages={home:"/en/"};for(const n of ["how-it-works","pricing","about","faq","conditions","separation-divorce","business-dispute","inheritance-conflict","they-know-something","attorneys"])pages[n]=`/en/${n}/`;
const b=await chromium.launch();const out={};
for(const [vn,vp] of Object.entries({d:{width:1440,height:900},m:{width:390,height:844}})){
 const c=await b.newContext({viewport:vp});const pg=await c.newPage();
 for(const [n,u] of Object.entries(pages)){
  await pg.goto(base+u,{waitUntil:"networkidle"});
  const r=await pg.evaluate(()=>{
   const H=e=>Math.round(e.getBoundingClientRect().height);
   const cs=e=>{const s=getComputedStyle(e);return {pt:parseInt(s.paddingTop),pb:parseInt(s.paddingBottom)}};
   const name=e=>(e.dataset.block||e.getAttribute("data-hero")!==null&&"hero"||e.getAttribute("data-contact")!==null&&"contact"||e.id||e.className.toString().split(" ").slice(0,2).join(".")||e.tagName);
   const main=document.querySelector("main");
   return {total:document.documentElement.scrollHeight,header:H(document.querySelector("header")),footer:H(document.querySelector("footer")),
    blocks:[...main.children].map(e=>({n:name(e),h:H(e),...cs(e),text:(e.querySelector("h1,h2")?.textContent||"").trim().slice(0,32)}))}});
  out[`${n}-${vn}`]=r;
 }
 await c.close();
}
await b.close();s.close();
writeFileSync("design/compare/heights.json",JSON.stringify(out,null,1));
for(const k of Object.keys(out)){const o=out[k];console.log(k,"total",o.total,"hdr",o.header,"ftr",o.footer,"| "+o.blocks.map(x=>`${x.h}(${x.pt}/${x.pb})`).join(" "))}
