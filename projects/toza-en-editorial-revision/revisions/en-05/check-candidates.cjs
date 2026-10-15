'use strict';
// Candidate-only integrity check. Does not synchronize or approve public sources.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const root = path.resolve(__dirname, '../../../..');
const { exact, pages, assertAuthority } = require(path.join(root, 'scripts/accepted-copy.cjs'));
const hash = text => crypto.createHash('sha256').update(text).digest('hex');
const baseline = JSON.parse(fs.readFileSync(path.join(__dirname, 'BASELINE.json'), 'utf8'));
assertAuthority();
const current = pages();
for (const entry of baseline.integrity.pages) {
  assert.equal(hash(current.find(page => page.route === entry.route).source), entry.sha256, entry.route + ': accepted source unchanged');
}
const before = exact('revisions/en-02-v2/01-why-toza.md');
const candidate = exact('revisions/en-05/01-WHY-TOZA-CANDIDATE.md');
const originalUnits = before.trimEnd().split('\n\n');
const candidateUnits = candidate.trimEnd().split('\n\n');
assert.equal(candidateUnits.length, originalUnits.length, 'Original structure and block count');
const allowed = [
  'A conversation you thought was private, an account someone once helped you set up, a service your family shares:',
  'I learn your circumstances and carry out the technical work with you, in person.'
];
const changes = [];
for (let index = 0; index < originalUnits.length; index++) {
  if (originalUnits[index] === candidateUnits[index]) continue;
  assert(allowed.some(prefix => originalUnits[index].startsWith(prefix)), 'Unapproved candidate intervention in unit ' + (index + 1));
  changes.push({ unit: index + 1, before: originalUnits[index], after: candidateUnits[index] });
}
assert.equal(changes.length, 2, 'Exactly two scoped paragraphs');
const destinations = text => [...text.matchAll(/\]\(([^)]+)\)/g)].map(match => match[1]);
const numericFacts = text => text.match(/₪[\d,]+|\b\d+(?:–\d+)?\b/g) || [];
assert.deepEqual(destinations(candidate), destinations(before), 'Original links and sequence');
assert.deepEqual(numericFacts(candidate), numericFacts(before), 'Numeric facts');
const untouched = ['src', 'assets', 'scripts', '.github', 'package.json', 'package-lock.json', 'projects/toza-en-editorial-revision/approved', 'projects/toza-en-editorial-revision/source', 'projects/toza-en-editorial-revision/harness'];
const diff = spawnSync('git', ['diff', '--exit-code', baseline.baselineHead, '--', ...untouched], { cwd: root, encoding: 'utf8' });
assert.equal(diff.status, 0, 'Production, authority and harness unchanged: ' + diff.stdout + diff.stderr);
const report = {
  checkedAt: new Date().toISOString(), baselineHead: baseline.baselineHead,
  status: 'PASS — draft integrity only; not owner approval',
  candidateSha256: hash(candidate),
  acceptedWhySha256: hash(before),
  words: { before: before.trim().split(/\s+/).length, candidate: candidate.trim().split(/\s+/).length },
  changes,
  unchanged: ['Metadata', 'All headings', 'Founder experience and professional-profile link', 'Portrait instructions', 'Three client-gain sections and all service terms', 'Client control, confidentiality and exclusions', 'Contact mechanics', 'All public source and acceptance records', 'Protected Assessment and locked harness'],
  process: { acceptedSha256: hash(current.find(page => page.route === 'what-happens-during-the-visit').source), stageMapRequiresIndependentTraceabilityReview: true }
};
fs.writeFileSync(path.join(__dirname, 'FACT-CHECK.json'), JSON.stringify(report, null, 2) + '\n');
console.log('BATCH A CANDIDATE INTEGRITY PASS: two paragraphs only; metadata/headings/links/service blocks unchanged; accepted sources and production untouched.');
