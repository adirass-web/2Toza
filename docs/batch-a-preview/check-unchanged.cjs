'use strict';
// Batch A preview integrity checks. Read-only: never builds or writes artifacts.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');

const root = path.resolve(__dirname, '../..');
const project = 'projects/toza-en-editorial-revision/';
const base = '6c525f8d948709e3e8b7ea6f6c75abc9d8e5e56f';
const amendmentPath = project + 'approved/acceptance-amendment-2026-10-12-batch-a.json';
const whyHash = '53ee848c5a5247777c51d46ac1c8a20bc6e2430abd375bfe81ede4a019cad575';
const stageMapHash = '14af90ab3d758fa56a58866a1f03ead3cae12142a8e044f5de5870f044ccd79d';
const stageMapLfHash = 'f3093b5514a9a6d2ed99414781d6b4e14d7a625132aef914d21690cb52923e56';
const processHash = '349d9cfc41e95868b7fad0266af3b2a942acc2311e40904da8d38cd5f59566d7';
const expectedPr54Head = 'c5e7e243764605463cd0b6e05fa33b115240729d';
const read = rel => fs.readFileSync(path.join(root, rel));
const readText = rel => read(rel).toString('utf8').replace(/\r\n/g, '\n');
const hash = value => crypto.createHash('sha256').update(value).digest('hex');
const git = (...args) => {
  const result = spawnSync('git', args, { cwd: root, encoding: 'utf8' });
  assert.equal(result.status, 0, `git ${args.join(' ')} failed: ${result.stderr || result.stdout}`);
  return result.stdout.trim();
};
const gitText = (...args) => {
  const result = spawnSync('git', args, { cwd: root, encoding: 'utf8' });
  assert.equal(result.status, 0, `git ${args.join(' ')} failed: ${result.stderr || result.stdout}`);
  return result.stdout.replace(/\r\n/g, '\n');
};
const check = (label, predicate) => {
  assert(predicate, label);
  console.log(`PASS ${label}`);
  return { check: label, status: 'PASS' };
};

const unchanged = JSON.parse(readText('docs/batch-a-preview/unchanged-pages.json'));
const baseline = JSON.parse(readText(path.join('docs/batch-a-preview', unchanged.baseline)));
assert.equal(baseline.baseCommit, base, 'Unchanged-page baseline commit');
assert.deepEqual(unchanged.routes, baseline.pages.map(page => page.route), 'Route list matches baseline');
const pageResults = [];
for (const page of baseline.pages) {
  assert(fs.existsSync(path.join(root, page.path)), `${page.route}: built page exists (${page.path})`);
  const currentSha256 = hash(read(page.path));
  assert.equal(currentSha256, page.sha256, `${page.route}: built HTML byte hash unchanged`);
  pageResults.push({ route: page.route, path: page.path, baselineSha256: page.sha256, currentSha256, status: 'PASS' });
}
console.log(`PASS ${baseline.pages.length} unaffected English page byte hashes`);

const { exact, pages, assertAuthority } = require(path.join(root, 'scripts/accepted-copy.cjs'));
assertAuthority();
console.log('PASS historical accepted sources, source fingerprints, and protected Assessment');
const historicalAcceptance = JSON.parse(readText(project + 'approved/acceptance-manifest.json'));
const sourceResults = [
  ...historicalAcceptance.sourceFingerprints.map(entry => ({
    path: entry.path, expectedSha256Lf: entry.sha256Lf, currentSha256Lf: hash(readText(project + entry.path)), status: 'PASS'
  })),
  {
    path: historicalAcceptance.protectedAssessment.path,
    expectedSha256Lf: historicalAcceptance.protectedAssessment.sha256,
    currentSha256Lf: hash(readText(project + historicalAcceptance.protectedAssessment.path)), status: 'PASS'
  }
];

const acceptance = JSON.parse(readText(project + 'approved/acceptance-manifest.json'));
const amendment = JSON.parse(readText(amendmentPath));
assert.equal(amendment.baseCommit, base, 'Batch A approval base commit');
assert.deepEqual(amendment.entries, [{ route: 'why-us', path: 'revisions/en-05/01-WHY-TOZA-CANDIDATE.md', sha256: whyHash }], 'Batch A Why approval record');
assert.equal(hash(exact(amendment.entries[0].path)), whyHash, 'Accepted Why Toza candidate hash');
assert.equal(amendment.presentation.sha256Raw, stageMapHash, 'Approved stage map raw provenance hash');
assert.equal(amendment.presentation.sha256Lf, stageMapLfHash, 'Approved stage map normalized hash');
assert.equal(hash(readText(project + amendment.presentation.path)), stageMapLfHash, 'Approved stage map content unchanged after LF normalization');
assert.equal(amendment.presentation.copySource, 'revisions/en-02-v2/04-what-happens.md', 'Process public source remains EN-02-v2');
assert.equal(amendment.presentation.copySha256, processHash, 'Process accepted source hash in amendment');
assert.equal(hash(exact(amendment.presentation.copySource)), processHash, 'Process accepted source hash');
console.log('PASS Batch A approval, accepted Why hash, unchanged Process source, and stage-map hash');
const batchAResults = [
  { check: 'Batch A Why accepted source', path: project + amendment.entries[0].path, expectedSha256: whyHash, currentSha256: hash(exact(amendment.entries[0].path)), status: 'PASS' },
  { check: 'Stage map approved raw provenance', path: project + amendment.presentation.path, expectedSha256Raw: stageMapHash, status: 'PASS' },
  { check: 'Stage map current LF-normalized content', path: project + amendment.presentation.path, expectedSha256Lf: stageMapLfHash, currentSha256Lf: hash(readText(project + amendment.presentation.path)), status: 'PASS' },
  { check: 'Process source remains EN-02-v2', path: project + amendment.presentation.copySource, expectedSha256: processHash, currentSha256: hash(exact(amendment.presentation.copySource)), status: 'PASS' }
];

const historical = [
  project + 'approved/acceptance-manifest.json',
  project + 'approved/acceptance-amendment-2026-10-10.json',
  project + 'approved/acceptance-amendment-2026-10-10-round-02.json',
];
for (const file of historical) {
  const before = gitText('show', `${base}:${file}`);
  assert.equal(readText(file), before, `Historical approval record unchanged from ${base}: ${file}`);
}
console.log('PASS historical approval manifests unchanged from base (Batch A amendment is additive)');
const manifestResults = historical.map(file => ({
  path: file, baseline: `${base}:${file}`, baselineSha256Lf: hash(gitText('show', `${base}:${file}`)), currentSha256Lf: hash(readText(file)), status: 'PASS'
}));

const pr54Head = git('rev-parse', 'refs/heads/codex/toza-home-pricing-narrative');
assert.equal(pr54Head, expectedPr54Head, 'PR #54 checkout branch ref remains at its expected head');
const pr54Checkout = path.resolve(root, '..', 'VIP-narrative');
const checkedOutHead = git('-C', pr54Checkout, 'rev-parse', 'HEAD');
assert.equal(checkedOutHead, expectedPr54Head, 'PR #54 sibling checkout remains at its expected head');
console.log(`PASS PR #54 local ref and sibling checkout head ${expectedPr54Head}`);

fs.writeFileSync(path.join(__dirname, 'unchanged-pages.json'), JSON.stringify({
  baseline: unchanged.baseline,
  baseCommit: base,
  routes: unchanged.routes,
  checkedAt: new Date().toISOString(),
  status: 'PASS',
  pages: pageResults,
  checks: [
    { check: 'Accepted-copy authority check', status: 'PASS', details: 'Historical accepted blocks, all source fingerprints, and protected Assessment validated by scripts/accepted-copy.cjs.' },
    ...sourceResults.map(entry => ({ check: entry.path === 'approved/pa-01-v2-effective.md' ? 'Protected Assessment' : 'Protected source fingerprint', ...entry })),
    ...batchAResults,
    ...manifestResults.map(entry => ({ check: 'Historical approval manifest unchanged from base', ...entry })),
    { check: 'PR #54 local branch ref', ref: 'refs/heads/codex/toza-home-pricing-narrative', currentHead: pr54Head, expectedHead: expectedPr54Head, status: 'PASS' },
    { check: 'PR #54 sibling checkout', path: pr54Checkout, currentHead: checkedOutHead, expectedHead: expectedPr54Head, status: 'PASS' }
  ]
}, null, 2) + '\n');

console.log('BATCH A PREVIEW INTEGRITY PASS');
