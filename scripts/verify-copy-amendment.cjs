'use strict';
const assert=require('node:assert/strict');
const {exact,pages,assertAuthority,read,project}=require('./accepted-copy.cjs');
const tables=s=>s.match(/(?:^\|.*\n?)+/gm)||[];
const sections=s=>new Map([...s.matchAll(/^## (.+)\n([\s\S]*?)(?=^## |$(?![\s\S]))/gm)].map(m=>[m[1],m[2].trim()]));
const links=s=>[...s.matchAll(/\]\(([^)]+)\)/g)].map(m=>m[1]).sort();
const facts=s=>s.match(/₪[\d,]+|\b\d+(?:–\d+)?\b/g);
assertAuthority();
// Verify prior narrowly approved exceptions against their historical overlay.
// The later three-page marketing amendment has its own full-source/fidelity gate.
const current=pages({historical:true});
const approvedRoutes=[
 {route:'index',file:'06-home',previous:'en-03',fixed:['Metadata','Hero','Close unwanted access. Build stronger security habits.','The paid visit: inspection, diagnosis and urgent first aid','Your confidence matters. Your approval directs the work.','You can ask for help before you have answers. {#contact}']},
 {route:'pricing',file:'02-pricing',previous:'en-03',fixed:['Metadata','Hero','Before you book','Your initial fee counts toward the full service','Urgent visits in Central Israel','Additional work','What the service covers','You do not need to know where to look. {#contact}']},
 {route:'separation-divorce',file:'07-separation-divorce',previous:'en-02-v2',fixed:['Make changes with their consequences in view','Have your own devices and access examined, with urgent first aid','You decide what is changed and shared','Start with what is on your mind. {#contact}']},
 {route:'they-know-something',file:'09-they-know-something',previous:'en-02-v2',fixed:['Understand the effects before making isolated changes','What the findings can—and cannot—tell you','You can start without an explanation. {#contact}']},
];
for(const entry of approvedRoutes){
 const prior=exact('revisions/'+entry.previous+'/'+entry.file+'.md');
 const next=current.find(page=>page.route===entry.route).source;
 assert.equal(next,exact('revisions/en-04/'+entry.file+'.md'),entry.route+': latest approved overlay');
 assert.deepEqual(links(next),links(prior),entry.route+': original link destinations and counts');
 assert.deepEqual(facts(next),facts(prior),entry.route+': unchanged numeric service facts');
 const before=sections(prior),after=sections(next);
 for(const heading of entry.fixed){
  assert(before.has(heading)&&after.has(heading),entry.route+': required section '+heading);
  assert.equal(after.get(heading),before.get(heading),entry.route+': unchanged commercial/operational section '+heading);
 }
 if(entry.route==='pricing'){
  assert.deepEqual(tables(next),tables(prior),'All four commercial tables remain exactly unchanged');
  const privacy=[...prior.matchAll(/^Each participant receives a private dated record\.[\s\S]*?(?=\n\n|$)/gm)].map(m=>m[0]);
  assert.equal(privacy.length,1,'Prior participant privacy paragraph');
  assert.equal(next.split(privacy[0]).length,2,'Participant privacy retained exactly once');
  assert(next.indexOf(privacy[0])<next.indexOf('### Personal Shield:'),'Participant privacy accompanies the comparison');
 }
 if(entry.route==='they-know-something'){
  const heading='Have someone examine the access and address urgent problems';
  for(const block of before.get(heading).split('\n\n').filter(p=>!p.startsWith('Personal Shield')&&!p.startsWith('[Initial visit details]'))){
   assert(after.get(heading).includes(block),'They Know: original Assessment scope, independent value and urgent terms');
  }
  assert(after.get(heading).includes('[Initial visit details]'),'Initial visit link remains with the Assessment');
  assert(after.get(heading).includes('An urgent in-person visit may be available.'),'Urgent conditions remain with the Assessment');
  assert(after.has('Hardening beyond the first visit'),'Full hardening is a separate section');
 }
}
const protectedAssessment=JSON.parse(read(project+'approved/acceptance-manifest.json')).protectedAssessment.path;
// Batch A is a narrow, additive exception: reversing exactly these two approved
// paragraphs must reconstruct the entire prior payload, including metadata.
const whyPrior=exact('revisions/en-02-v2/01-why-toza.md');
const whyNext=current.find(page=>page.route==='why-us').source;
assert.equal(whyNext,exact('revisions/en-05/01-WHY-TOZA-CANDIDATE.md'),'Why: approved Batch A overlay');
const whyChanges=[
 {
  before:'A conversation you thought was private, an account someone once helped you set up, a service your family shares: each can connect to more of your life than you realize. I look at how the relevant devices, identities, accounts and apps work together, and what their access to your data means for you.',
  after:'A conversation you thought was private, an account someone once helped you set up, a service your family shares: each can connect to more of your life than you realize. Private information can be used to pressure you, cost you money or damage your reputation. I look at how the relevant devices, identities, accounts and apps work together, and what that access means in your circumstances.'
 },
 {
  before:'I learn your circumstances and carry out the technical work with you, in person. You do not have to retell a sensitive situation to a succession of people. A working phone can still leave private information accessible through arrangements that no longer suit your life; my work connects that personal context to the changes we make.',
  after:'I learn your circumstances and carry out the technical work with you, in person. You do not have to retell a sensitive situation to a succession of people. I use that understanding to judge which access deserves attention first. Before you decide what to approve, I explain what a proposed material change could affect, including account recovery and services you still need.'
 },
];
let reconstructed=whyNext;
for(const change of whyChanges){
 assert.equal(whyPrior.split(change.before).length,2,'Why: prior paragraph appears exactly once');
 assert.equal(whyNext.split(change.after).length,2,'Why: approved paragraph appears exactly once');
 reconstructed=reconstructed.replace(change.after,change.before);
}
assert.equal(reconstructed,whyPrior,'Why: only the two approved paragraphs change; all other blocks and metadata exact');
assert.deepEqual(links(whyNext),links(whyPrior),'Why: all links and counts unchanged');
assert.deepEqual(facts(whyNext),facts(whyPrior),'Why: numeric facts unchanged');
assert.deepEqual([...sections(whyNext).keys()],[...sections(whyPrior).keys()],'Why: headings and anchors unchanged');
// Batch B reverses only its four reviewed substitutions. The complete prior
// payload must be recovered; exclusions do not weaken any unchanged-source gate.
const batchBRoutes=[
 {route:'business-dispute',prior:'08-business-founder-dispute',candidate:'01-BUSINESS-CANDIDATE',changes:[
  {before:'A personal email may recover a business account. A phone may authenticate both private and work services. A folder shared during a partnership may still reveal documents after the relationship changes.',after:'A personal email may recover a business account. A phone may authenticate both private and work services. A folder shared during a partnership may still reveal confidential documents or plans you intend to keep private after the relationship changes.'},
  {before:'Personal Shield hardens the agreed settings and access arrangements around your personal and professional circumstances, with practical security habits, teaching and verification. You learn how to manage the changed setup. Its scope and price require a separate decision; a group or unusually complex situation may need a different agreed service.',after:'Personal Shield hardens the agreed settings and access arrangements around your personal and professional circumstances, with practical security habits, teaching and verification. The work can include closing unwanted shared access and strengthening sign-in and recovery. You learn how to manage the changed setup. Its scope and price require a separate decision; a group or unusually complex situation may need a different agreed service.'}
 ]},
 {route:'inheritance-clash',prior:'10-inheritance-conflict',candidate:'02-INHERITANCE-CANDIDATE',changes:[
  {before:'An estate dispute can change the meaning of arrangements made years earlier. Help with an account, a shared cloud folder or a family recovery contact may still connect someone else to your private information.',after:'An estate dispute can change the meaning of arrangements made years earlier. Help with an account, a shared cloud folder or a family recovery contact may still connect someone else to your private correspondence or financial information.'}
 ]},
 {route:'attorneys',prior:'11-for-attorneys',candidate:'03-ATTORNEYS-CANDIDATE',changes:[
  {before:'Dr. Lior Tabansky works directly with the client, in person, to assess relevant access within their authorized environment, address approved urgent issues where safely possible and explain the priorities and recommended next steps. The client has someone to work through the technical questions with them and explain what they can do next.',after:'Dr. Lior Tabansky works directly with the client, in person, to assess relevant access within their authorized environment, address approved urgent issues where safely possible and explain the priorities and recommended next steps. The client gains a clearer basis for deciding which technical changes to authorize.'}
 ]},
];
for(const entry of batchBRoutes){
 const prior=exact('revisions/en-02-v2/'+entry.prior+'.md');
 const next=current.find(page=>page.route===entry.route).source;
 assert.equal(next,exact('revisions/en-06/'+entry.candidate+'.md'),entry.route+': approved Batch B overlay');
 let restored=next;
 for(const change of entry.changes){
  assert.equal(prior.split(change.before).length,2,entry.route+': prior paragraph unique');
  assert.equal(next.split(change.after).length,2,entry.route+': approved paragraph unique');
  restored=restored.replace(change.after,change.before);
 }
 assert.equal(restored,prior,entry.route+': only nominated paragraphs differ; all other copy and metadata exact');
 assert.deepEqual(links(next),links(prior),entry.route+': all links and counts unchanged');
 assert.deepEqual(facts(next),facts(prior),entry.route+': numeric service facts unchanged');
 assert.deepEqual([...sections(next).keys()],[...sections(prior).keys()],entry.route+': headings and anchors unchanged');
}
// Batch C permits one exact contact-guidance link per approved route. Removing
// only that paragraph must recover the complete original payload and metadata.
const batchCRoutes=[
 {route:'faq',prior:'03-faq',candidate:'04-FAQ-CANDIDATE',target:'#what-should-i-send-in-the-first-message',sha256:'1128e453d6edd13c5c9cbca026239b8c2176fbcce64db686d0b495257e1e5eea'},
 {route:'what-happens-during-the-visit',prior:'04-what-happens',candidate:'05-PROCESS-CANDIDATE',target:'/en/faq.html#what-should-i-send-in-the-first-message',sha256:'55a6c0e3c2c26475fd843f4f822a6ff77c6798e14af28b6f821ea40d638fe8dd'},
];
const batchCManifest=JSON.parse(read(project+'approved/acceptance-amendment-2026-10-13-batch-c.json'));
assert.deepEqual(batchCManifest.entries,batchCRoutes.map(entry=>({route:entry.route,path:'revisions/en-07/'+entry.candidate+'.md',sha256:entry.sha256})),'Batch C: exact approved routes, paths and hashes');
const orderedLinks=s=>[...s.matchAll(/\]\(([^)]+)\)/g)].map(m=>m[1]);
for(const entry of batchCRoutes){
 const prior=exact('revisions/en-02-v2/'+entry.prior+'.md');
 const next=current.find(page=>page.route===entry.route).source;
 assert.equal(next,exact('revisions/en-07/'+entry.candidate+'.md'),entry.route+': approved Batch C overlay');
 assert.equal(require('node:crypto').createHash('sha256').update(next).digest('hex'),entry.sha256,entry.route+': exact owner-approved payload hash');
 const addition='[What should I send in the first message?]('+entry.target+')\n\n';
 assert.equal(prior.split(addition).length,1,entry.route+': original payload has no added guidance paragraph');
 assert.equal(next.split(addition).length,2,entry.route+': approved guidance paragraph appears exactly once');
 assert.equal(sections(next).get('You do not need to know where to look. {#contact}').split(addition.trim()).length,2,entry.route+': added guidance stays in contact section');
 assert.equal(next.replace(addition,''),prior,entry.route+': removal of only the approved link reconstructs all original copy and metadata');
 assert.deepEqual(links(next),[...links(prior),entry.target].sort(),entry.route+': all old links plus exactly one approved target');
 assert.deepEqual(orderedLinks(next).filter(target=>target!==entry.target),orderedLinks(prior),entry.route+': original link order and counts unchanged');
 assert.deepEqual(facts(next),facts(prior),entry.route+': numeric service facts unchanged');
 assert.deepEqual(next.match(/^#{1,6} .+$/gm),prior.match(/^#{1,6} .+$/gm),entry.route+': all headings and anchors unchanged');
 assert.deepEqual(tables(next),tables(prior),entry.route+': table wording and associations unchanged');
}
assert.equal(current.find(page=>page.route==='faq').source.split('### What should I send in the first message?\n').length,2,'Batch C: existing guidance question appears exactly once');
for(const page of current.filter(p=>p.route!=='why-us'&&!approvedRoutes.some(entry=>entry.route===p.route)&&!batchBRoutes.some(entry=>entry.route===p.route)&&!batchCRoutes.some(entry=>entry.route===p.route))){
 const prior=page.route==='private-exposure-assessment'?read(project+protectedAssessment):exact('revisions/en-02-v2/'+page.sourceName+'.md');
 assert.equal(page.source,prior,page.route+': original approved source');
}
console.log('COPY AMENDMENT VERIFIED: four EN-04 pages; exactly two Why and four Batch B paragraph changes; exactly two approved Batch C links; original protected Assessment; historical and unchanged Process stage-map hashes; metadata/tables/terms/link order/facts preserved');
