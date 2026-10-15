'use strict';
// Draft-only source QA. Does not render, build, synchronize, accept or publish copy.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const cp = require('node:child_process');
const root = path.resolve(__dirname, '../../../..');
const project = path.join(root, 'projects/toza-en-editorial-revision');
const read = p => fs.readFileSync(p, 'utf8').replace(/\r\n/g, '\n').replace(/^\uFEFF/, '');
const sha = s => crypto.createHash('sha256').update(s).digest('hex');
const baseline = JSON.parse(read(path.join(__dirname, 'BASELINE.json')));
const loader = require(path.join(root, 'scripts/accepted-copy.cjs'));
const checks = [];
const check = (name, pass, details) => checks.push({ name, status: pass ? 'PASS' : 'FAIL', ...(details === undefined ? {} : { details }) });
const git = args => cp.execFileSync('git', args, { cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
const exactCandidate = file => {
  const text = read(path.join(__dirname, file));
  const start = '## Exact revised copy\n\n';
  const end = '\n## Unresolved red-team issues';
  if (text.split(start).length !== 2 || text.split(end).length !== 2) throw Error('Invalid exact wrapper: ' + file);
  return text.split(start)[1].split(end)[0].trimEnd() + '\n';
};
const eq = (a,b) => JSON.stringify(a) === JSON.stringify(b);
const linesMatching = (s,re) => s.split('\n').filter(line=>re.test(line));
const links = s => [...s.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g)].map(m=>({label:m[1],href:m[2]}));
const headings = s => linesMatching(s,/^#{1,6} /);
const metadata = s => s.split('## Hero\n\n')[0];
const numeric = s => s.match(/₪?\d[\d,]*(?:[–.-]\d+)?|\b(?:one|two|three|four|five|six|seven|eight|nine|ten|fourteen)\b/gi) || [];
const specifications = [
  { route:'business-dispute', file:'01-BUSINESS-CANDIDATE.md', allowed:[
    { starts:'A personal email may recover a business account.', from:'may still reveal documents after the relationship changes.', to:'may still reveal confidential documents or plans you intend to keep private after the relationship changes.' },
    { starts:'Personal Shield hardens the agreed settings', from:'You learn how to manage the changed setup.', to:'The work can include closing unwanted shared access and strengthening sign-in and recovery. You learn how to manage the changed setup.' }
  ]},
  { route:'inheritance-clash', file:'02-INHERITANCE-CANDIDATE.md', allowed:[
    { starts:'An estate dispute can change the meaning', from:'your private information.', to:'your private correspondence or financial information.' }
  ]},
  { route:'attorneys', file:'03-ATTORNEYS-CANDIDATE.md', allowed:[
    { starts:'Dr. Lior Tabansky works directly with the client,', from:'The client has someone to work through the technical questions with them and explain what they can do next.', to:'The client gains a clearer basis for deciding which technical changes to authorize.' }
  ]}
];
const report = { purpose:'Mechanical source-integrity QA only; not independent editorial judgment or owner acceptance.', checkedAt:new Date().toISOString(), baselineHead:baseline.baselineHead, currentHead:git(['rev-parse','HEAD']), normalization:'LF exact payload; trimEnd plus one final LF, as accepted-copy.exact(). No other candidate normalization.', scope:'Draft-only. No build, browser, template synchronization, acceptance or release action.', checks, candidatePages:[], effectiveAcceptedRoutes:[], protectedSources:[] };
check('HEAD remains baseline', report.currentHead === baseline.baselineHead);
try { loader.assertAuthority(); check('accepted-copy.assertAuthority()',true); } catch(e) { check('accepted-copy.assertAuthority()',false,e.message); }
const effective = loader.pages();
check('11 effective accepted routes',effective.length===11);
for(const expected of baseline.allEffectiveRouteHashes.pages) {
  const actual=effective.find(p=>p.route===expected.route);
  const actualHash=actual ? sha(actual.source) : null;
  const pass=actualHash===expected.sha256;
  report.effectiveAcceptedRoutes.push({route:expected.route,baselineSha256:expected.sha256,currentSha256:actualHash,unchanged:pass});
  check('Accepted route unchanged: '+expected.route,pass);
}
for(const expected of baseline.integrity.protectedSourcePathsAndHashes) {
  const actual=sha(read(path.join(project,expected.path)));
  const pass=actual===expected.sha256Lf;
  report.protectedSources.push({path:expected.path,baselineSha256:expected.sha256Lf,currentSha256:actual,unchanged:pass});
  check('Protected source unchanged: '+expected.path,pass);
}
const packet=read(path.join(__dirname,'06-OWNER-REVIEW.md'));
const packetQuotes=packet.split('\n').filter(l=>l.startsWith('> ')).map(l=>l.slice(2));
const expectedQuotes=[];
for(const spec of specifications) {
  const base=baseline.affectedPages.find(p=>p.route===spec.route);
  const before=read(path.join(project,base.exactBaselinePath));
  const after=exactCandidate(spec.file);
  check(spec.route+': exact baseline hash',sha(before)===base.sha256);
  check(spec.route+': saved baseline equals current accepted source',before===effective.find(p=>p.route===spec.route).source);
  const oldUnits=before.trimEnd().split('\n\n');
  const newUnits=after.trimEnd().split('\n\n');
  check(spec.route+': paragraph/block count unchanged',oldUnits.length===newUnits.length);
  const changed=[];
  for(let i=0;i<Math.max(oldUnits.length,newUnits.length);i++) if(oldUnits[i]!==newUnits[i]) changed.push({blockIndex:i+1,before:oldUnits[i],after:newUnits[i]});
  check(spec.route+': only nominated paragraph count',changed.length===spec.allowed.length);
  const nominatedIndices=[];
  for(const allowed of spec.allowed) {
    const matches=oldUnits.map((text,i)=>({text,i})).filter(x=>x.text.startsWith(allowed.starts));
    check(spec.route+': nominated source unique: '+allowed.starts,matches.length===1);
    if(matches.length!==1) continue;
    const old=matches[0];
    nominatedIndices.push(old.i);
    check(spec.route+': exact reviewed replacement: '+allowed.starts,newUnits[old.i]===old.text.replace(allowed.from,allowed.to));
  }
  check(spec.route+': all other paragraphs byte-identical and same order',oldUnits.every((p,i)=>nominatedIndices.includes(i)||p===newUnits[i]));
  check(spec.route+': metadata exact',metadata(before)===metadata(after));
  check(spec.route+': headings and order exact',eq(headings(before),headings(after)));
  check(spec.route+': headings match BASELINE inventory',eq(headings(after),base.headings.map(h=>h.text)));
  check(spec.route+': link labels, destinations and order exact',eq(links(before),links(after))&&eq(links(after),base.links));
  check(spec.route+': numeric and written-number inventory exact',eq(numeric(before),numeric(after)));
  check(spec.route+': contact ending exact',before.slice(before.indexOf('{#contact}'))===after.slice(after.indexOf('{#contact}')));
  for(const change of changed) expectedQuotes.push(change.before,change.after);
  const wrapper=read(path.join(__dirname,spec.file));
  const bullets=wrapper.split('## What changed\n\n')[1].split('\n## Exact revised copy')[0].split('\n').filter(l=>l.startsWith('- ')).length;
  check(spec.route+': at most five change bullets',bullets<=5);
  report.candidatePages.push({route:spec.route,file:spec.file,source:base.authority,baselineSha256:sha(before),candidateSha256:sha(after),blockCount:oldUnits.length,changedParagraphCount:changed.length,unchangedBlockCount:oldUnits.length-changed.length,changedUnits:changed,metadataUnchanged:metadata(before)===metadata(after),headings:headings(after),links:links(after),numericInventory:numeric(after),changeBulletCount:bullets});
}
check('Exactly four nominated paragraph changes across batch',report.candidatePages.reduce((n,p)=>n+p.changedParagraphCount,0)===4);
check('Owner packet contains exact eight before/after excerpts in page order',eq(packetQuotes,expectedQuotes));
check('Owner packet paragraph counts match 2 / 1 / 1',packet.includes('Two paragraph changes;')&&packet.includes('One opening-paragraph change.')&&packet.includes('One paragraph change, limited to its closing sentence.'));
for(const spec of specifications) check('Owner packet links complete candidate: '+spec.file,packet.includes(']('+spec.file+')'));
const business=report.candidatePages.find(p=>p.route==='business-dispute').changedUnits.find(p=>p.before.startsWith('Personal Shield'));
const addedBusinessSentence='The work can include closing unwanted shared access and strengthening sign-in and recovery. ';
check('Business full-service facts retained; paragraph is intentionally NOT byte-identical',business.after.replace(addedBusinessSentence,'')===business.before);
report.businessFullServiceFactPreservation={method:'Removing only the nominated illustrative action sentence reproduces the complete original paragraph exactly.',retained:['agreed settings/access arrangements','personal and professional circumstances','practical security habits','teaching and verification','learning resulting setup','separate scope and price decision','different agreed service for group or unusually complex situation'],addedSentence:addedBusinessSentence.trim(),paragraphByteIdentical:false};
const tracked=git(['diff','--name-only',baseline.baselineHead]).split('\n').filter(Boolean);
const untracked=git(['ls-files','--others','--exclude-standard']).split('\n').filter(Boolean);
const allowedPrefix='projects/toza-en-editorial-revision/revisions/en-06/';
const allowedState='projects/toza-en-editorial-revision/state/EN-REVISION-DECISION-DELTA.md';
const outside=[...new Set([...tracked,...untracked])].filter(p=>!p.startsWith(allowedPrefix)&&p!==allowedState);
check('Only EN-06 artifacts and authorized decision delta changed',outside.length===0,outside);
const prohibited=/^(?:src\/|assets\/|scripts\/|\.github\/|.*\/approved\/|package(?:-lock)?\.json$|eleventy|\.eleventy|wrangler|netlify|functions\/|_headers$|_redirects$)/;
const prohibitedChanged=[...new Set([...tracked,...untracked])].filter(p=>prohibited.test(p));
check('No production/templates/assets/scripts/workflows/manifests changed vs baseline',prohibitedChanged.length===0,prohibitedChanged);
report.repositoryScope={trackedChanges:tracked,untrackedFiles:untracked,allowedDecisionDelta:allowedState,unexpectedChanges:outside,prohibitedChanges:prohibitedChanged};
report.status=checks.every(c=>c.status==='PASS')?'PASS':'FAIL';
report.summary={checks:checks.length,passed:checks.filter(c=>c.status==='PASS').length,failed:checks.filter(c=>c.status==='FAIL').length,changedParagraphs:report.candidatePages.reduce((n,p)=>n+p.changedParagraphCount,0),effectiveAcceptedRoutesUnchanged:report.effectiveAcceptedRoutes.filter(p=>p.unchanged).length};
fs.writeFileSync(path.join(__dirname,'FACT-CHECK.json'),JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({status:report.status,summary:report.summary,failedChecks:checks.filter(c=>c.status==='FAIL'),candidateHashes:report.candidatePages.map(p=>({route:p.route,sha256:p.candidateSha256}))},null,2));
if(report.status!=='PASS') process.exitCode=1;
