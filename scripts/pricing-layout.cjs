// Pricing-04 presentation: derives the exact owner-approved review composition.
// This helper does not read generated output or modify editorial source files.
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const md = new (require('markdown-it'))({html:false,typographer:false});
const project = path.resolve(__dirname, '../projects/toza-en-editorial-revision/revisions/pricing-04');
const sourceSha256 = '7e251d413298476d566b767b2c8869b51d36c0c68032e084a9ddf72513378b25';
const visualSha256 = 'b44941fd34d3101f40bdbf618bd70ff43fad66af90fbe47d73d1785e4f5cf64d';
const hash = value => crypto.createHash('sha256').update(value).digest('hex');
function renderBody(source, channels = '{% include "contact-channels.njk" %}') {
  const visual = fs.readFileSync(path.join(project, 'VISUAL-COPY.md'), 'utf8').replace(/\r\n/g,'\n');
  if (hash(source) !== sourceSha256 || hash(visual) !== visualSha256) throw Error('Approved Pricing-04 source changed');
  const exact = value => {if (!visual.includes(value)) throw Error('Unapproved Pricing-04 visual label: ' + value); return value;};
const paths={person:'<circle cx="12" cy="6" r="3"/><path d="M5 21v-3a7 7 0 0 1 14 0v3M12 13v8"/>',phone:'<rect x="6" y="2" width="12" height="20" rx="2"/><path d="M10 18h4"/>',device:'<rect x="2" y="4" width="20" height="14" rx="1"/><path d="M8 22h8M12 18v4"/>',key:'<path d="M8 2h8v6H8zM5 8h14v11a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3z"/><circle cx="12" cy="15" r="3"/>',network:'<rect x="3" y="15" width="18" height="7" rx="2"/><path d="M7 18h.1M11 18h.1M6 15V8M18 15V8M8 5a6 6 0 0 1 8 0M4 2a12 12 0 0 1 16 0"/>',time:'<circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 3"/>',calendar:'<rect x="3" y="5" width="18" height="17" rx="2"/><path d="M7 2v6M17 2v6M3 10h18M7 14h2M14 14h2M7 18h2M14 18h2"/>',account:'<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="M5 16c1-4 7-4 8 0M16 8h2M16 12h2M16 16h2"/>',record:'<path d="M5 2h10l4 4v16H5zM15 2v5h4M8 11h8M8 15h8M8 19h4"/>',talk:'<path d="M3 3h18v13H9l-6 5zM7 7h10M7 11h6"/>',recover:'<path d="M3 9a9 9 0 1 1 0 6M3 3v6h6"/><circle cx="12" cy="12" r="2"/><path d="M12 14v4"/>',share:'<path d="M4 3h10v18H4zM7 7h4M7 11h4M12 15h10M18 11l4 4-4 4"/>',permissions:'<path d="M4 6h16M4 12h16M4 18h16"/><circle cx="8" cy="6" r="2" fill="var(--paper)"/><circle cx="16" cy="12" r="2" fill="var(--paper)"/><circle cx="10" cy="18" r="2" fill="var(--paper)"/>',check:'<path d="M4 12l5 5L20 5"/>',traces:'<path d="M4 3h16M4 8h9M4 13h16M4 18h10"/><circle cx="18" cy="19" r="3"/>'};
const icon=(name,cls='')=>`<svg class="p-object ${cls}" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round">${paths[name]}</svg>`;
const deviceGroup=count=>`<div class="p-device-groups" aria-hidden="true">${Array.from({length:count},()=>`<span class="p-device-pair">${icon('phone')}${icon('device')}</span>`).join('')}</div>`;
const keyGroup=count=>`<div class="p-key-groups" aria-hidden="true">${Array.from({length:count/2},()=>`<span class="p-key-pair">${icon('key')}${icon('key')}</span>`).join('')}</div>`;
const renderMarkdown=x=>md.render(x).replace(/<h([123])>(.*?) \{#([\w-]+)\}<\/h\1>/g,'<h$1 id="$3">$2</h$1>');
const contactAction=`<a class="btn" href="#contact">${exact('Request a private conversation')}</a>`;
const labels=['Your circumstances','Information to protect','Devices','Apps and accounts','Access and recovery','Relevant digital traces','Your risks and ordered priorities'];
const riskGraphic=`<figure class="p-risk-graphic"><figcaption class="p-graphic-title">${exact('Your personal threat model')}</figcaption><div class="p-method-map"><div class="p-guides"><span>${icon('person')}${exact(labels[0])}</span><span>${icon('record')}${exact(labels[1])}</span></div><div class="p-map-connector" aria-hidden="true"></div><div class="p-review-objects">${[['phone',labels[2]],['account',labels[3]],['recover',labels[4]],['traces',labels[5]]].map(([shape,label])=>`<div>${icon(shape)}<span>${exact(label)}</span></div>`).join('')}</div><div class="p-map-connector" aria-hidden="true"></div><strong class="p-priorities">${exact(labels[6])}</strong></div><p class="p-method-caption">${exact('Illustration of the review method. Your assessment reflects your own circumstances.')}</p></figure>`;
const summaryGraphic=`<figure class="p-summary-graphic"><figcaption>${exact('Your practical summary')}</figcaption><div class="p-summary-sheet">${['Reviewed and found','Changed and remaining','Ordered next steps'].map(x=>`<div>${icon('record')}<span>${exact(x)}</span></div>`).join('')}</div><p>${exact('You receive the summary whether or not you continue.')}</p></figure>`;
const practiceGraphic=`<div class="p-practice"><h4>${exact('OpSec training')}</h4><div class="p-practice-scenes">${[['account','Sign in'],['recover','Recover access'],['share','Share information'],['permissions','Grant permissions']].map(([shape,label])=>`<div>${icon(shape)}<strong>${exact(label)}</strong></div>`).join('')}</div><p>${exact('Practise the changed setup and the security habits that go with it.')}</p></div>`;
const setupGraphic=`<div class="p-implementation"><h4>${exact('Personal Shield or Inner Circle Shield')}</h4><div class="p-setup-strip"><div><div class="p-setup-objects">${deviceGroup(1)}${keyGroup(2)}</div><p class="p-per-person">${exact('The same two-device allowance per person')}<br>${exact('Two compatible keys per person, configured and tested')}</p></div><div class="p-record-object">${icon('record')}<strong>${exact('Your private dated record')}</strong></div></div></div>`;
let main='';const body=source.split('## Hero\n\n')[1],parts=body.split(/\n(?=## )/);
for(let i=0;i<parts.length;i++){
 const text=parts[i];let html=renderMarkdown(text);
 if(i===0){html=html.replace('<p>Personal Shield and pricing</p>','<p class="p-kicker">Personal Shield and pricing</p>').replace('<h1>','<h1 id="page-title">').replace('<p><strong>₪14,000 including VAT · One person · Two devices</strong></p>','<p class="p-hero-price"><strong>₪14,000 including VAT · One person · Two devices</strong></p>').replace('<a href="#contact">','<a class="btn" href="#contact">');main+=`<section class="p-hero" aria-labelledby="page-title">${html}</section>`;}
 else if(text.startsWith('## Choose who')){
  let col=0,row=0;
  html=html.replace('<table>','<table class="p-core" aria-labelledby="full-services">').replace(/<th>/g,()=>`<th scope="col" id="p-product-${col++}">`);
  html=html.replace(/<tr>\n<td>([\s\S]*?)<\/td>/g,(_,label)=>`<tr class="p-core-row-${row}"><th scope="row" id="p-attribute-${row++}">${label}</th>`);
  html=html.replace(/(<tr class="p-core-row-(\d+)">[\s\S]*?<\/th>)([\s\S]*?)(<\/tr>)/g,(_,start,row,cells,end)=>{let col=1;return start+cells.replace(/<td>([\s\S]*?)<\/td>/g,(_,value)=>{
   const side=col++;let graphic='';
   if(+row===1)graphic=`<div class="p-people" aria-hidden="true">${icon('person').repeat(side===1?1:4)}</div>`;
   if(+row===2)graphic=deviceGroup(side===1?1:4);
   if(+row===3)graphic=keyGroup(side===1?2:8);
   if(+row===4)graphic=icon('network');
   if(+row===5)graphic=icon(side===1?'time':'calendar');
   return `<td headers="p-attribute-${row} p-product-${side}">${graphic}<span class="p-cell-copy">${value}</span></td>`;
  })+end;});
  html=html.replace('<p>Start with a separate','<p class="p-credit-condition">Start with a separate');
  const localCondition=html.match(/<p class="p-credit-condition">[\s\S]*?<\/p>/)[0];
  html=html.replace('</table>',`</table>${localCondition.replace('p-credit-condition','p-credit-condition p-credit-repeated')}`);
  main+=`<section class="p-compare">${html}</section>`;
 }
 else if(text.startsWith('## Included')){html=html.replace(/<p>/g,'<p class="p-common-item">');main+=`<section class="p-common">${html}</section>`;}
 else if(text.startsWith('## Your route')){
  const blocks=html.split(/(?=<h3)/);main+=`<section class="p-journey">${blocks.shift()}`;
  blocks.forEach((block,j)=>{
   if(j===0){block=block.replace('</h3>',`</h3><div class="p-contact-entry" aria-hidden="true">${icon('talk')}</div>`);main+=`<div class="p-conversation">${block}${contactAction}</div>`;}
   if(j===1){
     block=block.replace(/(<p>Your circumstances and[\s\S]*?<\/p>\n<p><strong>Your circumstances[\s\S]*?<\/p>)/,`<details class="p-inline-reference"><summary>${exact('Your personal threat model')}</summary><div>$1</div></details>`);
     block=block.replace(/<h3 id="assessment">/,'<h3 id="assessment">').replace(/(<p><strong>Private Exposure Assessment[\s\S]*?<\/p>)/,`$1<div class="p-assessment-visuals">${riskGraphic}${summaryGraphic}</div>`);main+=`<div class="p-assessment-scene">${block}${contactAction}</div>`;}
   if(j===2){block=block.replace(/(<p>Toza carries out[\s\S]*?<\/p>)/,`<details class="p-inline-reference"><summary>${exact('Agreed hardening')}</summary><div>$1</div></details>`);block=block.replace('</h3>',`</h3><div class="p-owner-decision"><strong>${exact('Your decision')}</strong><span>${exact('Full protection requires its own acceptance. There is no automatic continuation.')}</span></div><div class="p-work-visuals">${setupGraphic}${practiceGraphic}</div>`);main+=`<div class="p-hardening-scene">${block}<div class="p-aftercare">${icon('calendar')}<div><strong>${exact('14 days of limited adjustment support')}</strong><p>${exact("For issues directly related to Toza's changes. Inner Circle's period starts at group completion.")}</p></div></div>${contactAction}</div>`;}
  });main+='</section>';
 }
 else if(text.startsWith('## Request')){main+=`<section class="p-contact">${html}${channels}</section>`;}
 else{html=html.replace(/<th(\s[^>]*)?>/g,'<th scope="col"$1>').replace(/<tr>\n<td>([\s\S]*?)<\/td>/g,'<tr>\n<th scope="row">$1</th>');const heading=html.match(/^<h2(?: id="([^"]+)")?>(.*?)<\/h2>\n/);if(!heading)throw Error('Unexpected section');main+=`<details class="p-reference" id="${heading[1]||'reference-'+i}"><summary>${heading[2]}</summary><div class="p-reference-body">${html.slice(heading[0].length)}</div></details>`;}
}
  return main;
}
function render(page) {
  if (page.route !== 'pricing') throw Error('Pricing layout cannot render another route');
  const metadata = Object.fromEntries([['Title','title'],['Description','description'],['Social description','og_description']].map(([label,key])=>{
    const value = page.source.match(new RegExp('^'+label+': (.+)$','m'))?.[1];
    if (!value || page.metadata[key] !== value) throw Error('Pricing metadata drift: '+key);
    return [key,value];
  }));
  const frontmatter = {
    layout:'layouts/vault.njk', permalink:'/en/pricing.html', slug:'pricing', page_id:'pricing',
    ...metadata, canonical:'https://toza-site.pages.dev/en/pricing',
    body_class:'accepted-page pricing-page pricing-04', pricing_04:true,
  };
  return '---\n' + Object.entries(frontmatter).map(([key,value])=>key+': '+JSON.stringify(value)).join('\n') +
    '\n---\n{# Generated by scripts/accepted-copy.cjs through pricing-layout.cjs; owner-approved copy is locked. #}\n' +
    '<div class="wrap pricing-04-content">' + renderBody(page.source) + '</div>\n';
}
module.exports = {render, renderBody, sourceSha256, visualSha256};
