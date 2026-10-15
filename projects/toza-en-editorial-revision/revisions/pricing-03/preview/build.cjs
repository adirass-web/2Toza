/* Review-only render adapter; exact source and diagram words are frozen inputs. */
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const MarkdownIt = require('/workspace/toza-release/node_modules/markdown-it');
const root = path.resolve(__dirname, '..');
const source = fs.readFileSync(path.join(root, 'pricing.md'), 'utf8');
const diagram = fs.readFileSync(path.join(root, 'DIAGRAM-COPY.md'), 'utf8');
const sha = x => crypto.createHash('sha256').update(x).digest('hex');
const frozen = '6ea8ed8951d2673048300b4dca3632c4ac23c97a3be73c0659bdb8f9ab299461';
if (sha(diagram) !== 'dd238e0735c06726feaae309d480ba56c39be694c69cababf96907736e7d64af') throw new Error('Diagram copy has changed; obtain review before rebuilding');
if (sha(source) !== frozen) throw new Error('Pricing source has changed; obtain review before rebuilding');
const md = new MarkdownIt({html:false, typographer:false});
const esc = x => md.utils.escapeHtml(x);
const iconPaths = {
 person:'<circle cx="12" cy="6" r="3"/><path d="M5 21v-3a7 7 0 0 1 14 0v3M12 13v8"/>',
 devices:'<rect x="2" y="3" width="8" height="17" rx="1.5"/><path d="M5 17h2M13 5h9v11h-9M16 16v4h6"/>',
 keys:'<circle cx="8" cy="8" r="5"/><path d="m11.5 11.5 10 10M17 17l3-3M19.5 19.5l3-3"/>',
 network:'<rect x="6" y="15" width="12" height="6" rx="1"/><path d="M9 18h.1M13 18h.1M12 15V9M8 6a6 6 0 0 1 8 0M4 3a12 12 0 0 1 16 0"/>',
 time:'<circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 3"/>',
 shield:'<path d="m12 2 8 3v6c0 6-8 11-8 11S4 17 4 11V5zM8 12l3 3 5-6"/>',
 account:'<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="M5 16c1-4 7-4 8 0M16 8h2M16 12h2M16 16h2"/>',
 record:'<path d="M5 2h10l4 4v16H5zM15 2v5h4M8 11h8M8 15h8M8 19h4"/>',
 talk:'<path d="M3 3h18v13H9l-6 5zM7 7h10M7 11h6"/>'
};
const icon = name => `<svg class="p-icon" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${iconPaths[name]}</svg>`;
const metadata = Object.fromEntries(['Route','Title','Description','Social description'].map(k=>[k,source.match(new RegExp('^'+k+': (.+)$','m'))[1]]));
const bodySource = source.split('## Hero\n\n')[1];
const parts = bodySource.split(/\n(?=## )/);
const render = x => md.render(x).replace(/<h([123])>(.*?) \{#([\w-]+)\}<\/h\1>/g,'<h$1 id="$3">$2</h$1>');
let main = '';
const sections = [];
for (let i=0;i<parts.length;i++) {
 let text = parts[i], html = render(text);
 if(i===0) {
   html=html.replace('<p>Personal Shield and pricing</p>','<p class="hero-kicker">Personal Shield and pricing</p>');
   html=html.replace('<p><strong>₪14,000 including VAT · One person · Two devices</strong></p>',`<p class="p-hero-price"><strong>₪14,000 including VAT · One person · Two devices</strong></p>`);
   html=html.replace('<p><strong><a href="#contact">Request a private conversation</a></strong></p>','<p><strong><a class="btn" href="#contact">Request a private conversation</a></strong></p>');
   html=html.replace('<p>In person · With you present · You control your credentials</p>','<p class="p-assurance">In person · With you present · You control your credentials</p>');
   main+=`<section class="p-hero" aria-labelledby="page-title">${html.replace('<h1>','<h1 id="page-title">')}</section>`;
 } else if(text.startsWith('## Choose who')) {
   const names=['shield','record','person','devices','account','shield','keys','shield','network','account','time','record'];
   let row=0;
   html=html.replace('<table>','<table class="p-matrix" aria-labelledby="full-services"><colgroup><col class="p-label-col"><col><col></colgroup>').replace(/<th>/g,'<th scope="col">');
   let column=0;html=html.replace(/<th scope="col">/g,()=>`<th scope="col" id="p-col-${column++}">`);
   html=html.replace(/<tr>\n<td>([\s\S]*?)<\/td>/g, (_,label)=>`<tr class="p-row-${row}">\n<th scope="row" id="p-label-${row}"><span class="p-row-label">${icon(names[row++])}<span>${label}</span></span></th>`);
   html=html.replace(/(<tr class="p-row-2">[\s\S]*?<\/th>\n)<td><strong>One<\/strong><\/td>\n<td><strong>Four<\/strong><\/td>/,(_,row)=>`${row}<td><span class="p-count-icons">${icon('person')}</span><strong>One</strong></td>\n<td><span class="p-count-icons">${icon('person').repeat(4)}</span><strong>Four</strong></td>`);
   html=html.replace(/(<tr class="p-row-(\d+)">[\s\S]*?<\/th>)([\s\S]*?)(<\/tr>)/g,(_,start,row,cells,end)=>{let col=1;return start+cells.replace(/<td>/g,()=>`<td headers="p-label-${row} p-col-${col++}">`)+end;});
   html=html.replace('<p>The eligible balances' ,'<p class="p-credit-note">The eligible balances');
   main+=`<section class="p-compare">${html}</section>`;
 } else if(text.startsWith('## From conversation')) {
   const exact = s => {if(!diagram.includes(s)) throw Error('Diagram copy not in frozen diagram input: '+s); return s;};
   const stages=[['talk',exact('Private conversation'),exact('Check fit and urgency. No purchase commitment.')],['account',exact('Private Exposure Assessment'),exact('₪3,600 including VAT')+'<br>'+exact('Your personal threat model, specific risk assessment and next steps.')],['shield',exact('Tailored hardening'),exact('Personal Shield or Inner Circle Shield. Teaching and verification included.')]];
   const chart=`<div class="p-journey" role="group" aria-label="From conversation to protection">${stages.map((s,j)=>`<div class="p-stage"><span class="p-stage-icon">${icon(s[0])}</span><strong>${s[1]}</strong><p>${s[2]}</p></div>${j===1?`<div class="p-decision"><strong>${exact('Your decision')}</strong><span>${exact('Choose whether to proceed with separately accepted hardening.')}</span></div>`:''}`).join('')}</div><p class="p-diagram-note">${exact('The Assessment follows your explicit acceptance of the written offer and receipt of payment. Full protection requires its own acceptance. There is no automatic continuation.')}</p>`;
   const closing=html.indexOf('</h2>')+5;
   html=html.slice(0,closing)+chart+html.slice(closing);
   html=html.replace(/<h3(?: id="([^"]+)")?>(.*?)<\/h3>\n([\s\S]*?)(?=<h3|$)/g,(_,id,title,body)=>{
     let lead='';
     if(id==='assessment') {const match=body.match(/^<p><strong>Private Exposure Assessment[\s\S]*?<\/p>\n/); if(match){lead=match[0];body=body.slice(lead.length);}}
     const summary=`${title}${lead.replace('<p>','<span class="p-assessment-price">').replace('</p>','</span>')}`;
     if(id==='assessment') { const first=body.match(/^<p>[\s\S]*?<\/p>\n/)[0];return `<details class="p-reference p-journey-reference" id="assessment"><summary>${summary}</summary><div class="p-reference-body">${first}</div></details><div class="p-assessment-outcomes">${body.slice(first.length)}</div>`; }
     return `<details class="p-reference p-journey-reference"${id?` id="${id}"`:''}><summary>${summary}</summary><div class="p-reference-body">${body}</div></details>`;
   });
   main+=`<section class="p-process">${html}</section>`;
 } else if(text.startsWith('## Start')) {
   const channels=fs.readFileSync('/workspace/toza-release/_site/en/pricing.html','utf8').match(/<nav class="contact-channels"[\s\S]*?<\/nav>/)?.[0];
   if(!channels) throw Error('Cannot find canonical contact controls');
   main+=`<section class="p-contact">${html}${channels}</section>`;
 } else {
   const heading=html.match(/^<h2(?: id="([^"]+)")?>(.*?)<\/h2>\n/);
   if(!heading) throw Error('Expected reference heading');
   const id=heading[1]||'reference-'+i;
   main+=`<details class="p-reference" id="${id}"><summary>${heading[2]}</summary><div class="p-reference-body">${html.slice(heading[0].length)}</div></details>`;
 }
 sections.push({heading:text.split('\n')[0], words:text.split(/\s+/).length});
}
const published=fs.readFileSync('/workspace/toza-release/_site/en/pricing.html','utf8');
const footer=published.match(/<footer class="site-footer">[\s\S]*?<\/footer>/)[0].replace(/\/assets\/brand\/toza\/toza-logo-ink.svg/g,'assets/brand/toza-logo-ink.svg');
const output=`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>${esc(metadata.Title)}</title><meta name="description" content="${esc(metadata.Description)}"><meta property="og:description" content="${esc(metadata['Social description'])}"><link rel="stylesheet" href="assets/css/clear-practice.css"><link rel="stylesheet" href="assets/css/footer-compact.css"><link rel="stylesheet" href="pricing-03.css"></head><body class="pricing-03"><a class="skip-link" href="#main">Skip to content</a><header class="site-header"><div class="wrap p-prototype-header"><a class="brand" href="https://toza-site.pages.dev/en/index.html"><img class="brand-logo" src="assets/brand/toza-logo-ink.svg" width="144" height="48" alt="Toza"></a><span class="p-review-label">Pricing proposal · Not published</span></div></header><main id="main" class="wrap">${main}</main>${footer}<script src="references.js"></script></body></html>`;
fs.writeFileSync(path.join(__dirname,'index.html'),output);
fs.writeFileSync(path.join(__dirname,'build-manifest.json'),JSON.stringify({status:'review-only',pricingSha256:sha(source),diagramSha256:sha(diagram),htmlSha256:sha(output),cssSha256:sha(fs.readFileSync(path.join(__dirname,'pricing-03.css'))),referenceScriptSha256:sha(fs.readFileSync(path.join(__dirname,'references.js'))),sharedBuildSha256:sha(published),metadata,sections},null,2)+'\n');
console.log('Review prototype generated. Pricing source SHA '+sha(source));
