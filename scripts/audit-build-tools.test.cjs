const {test} = require('node:test');
const assert = require('node:assert/strict');
const {assess} = require('./audit-build-tools.cjs');
const url = 'https://github.com/advisories/GHSA-vfj7-8cjw-p6xm';
const lock = {packages: {'node_modules/braces': {version: '3.0.3'}}};
const report = () => ({auditReportVersion: 2, metadata: {vulnerabilities: {total: 1, critical: 0}}, vulnerabilities: {braces: {nodes: ['node_modules/braces'], via: [{name: 'braces', url, severity: 'high'}]}}});
test('documented upstream residual is visible in the result', () => {
  assert.deepEqual(assess(report(), lock), {affectedPackages: 1, advisories: [url]});
});
test('new advisory or severity escalation fails', () => {
  const unknown = report(); unknown.vulnerabilities.braces.via[0].url = 'https://github.com/advisories/new';
  assert.throws(() => assess(unknown, lock), /New or changed/);
  const escalated = report(); escalated.vulnerabilities.braces.via[0].severity = 'critical';
  assert.throws(() => assess(escalated, lock), /New or changed/);
});
test('changed residual package must be reassessed', () => {
  assert.throws(() => assess(report(), {packages: {'node_modules/braces': {version: '3.0.4'}}}), /Reassess/);
});
test('failed or incomplete audit fails closed', () => {
  assert.throws(() => assess({error: {code: 'ENETUNREACH'}}, lock), /failed registry/);
  const partial = report(); partial.vulnerabilities = {};
  assert.throws(() => assess(partial, lock), /Incomplete/);
});
test('new affected dependency fails even if it links to an existing advisory', () => {
  const extra = report(); extra.vulnerabilities.unreviewed = {via: ['braces']}; extra.metadata.vulnerabilities.total = 2;
  assert.throws(() => assess(extra, lock), /New affected/);
});
test('nested vulnerable copies and omitted package paths cannot bypass version review', () => {
  const nested = report(); nested.vulnerabilities.braces.nodes.push('node_modules/chokidar/node_modules/braces');
  const nestedLock = {packages: {...lock.packages, 'node_modules/chokidar/node_modules/braces': {version: '3.0.2'}}};
  assert.throws(() => assess(nested, nestedLock), /Reassess/);
  const missing = report(); delete missing.vulnerabilities.braces.nodes;
  assert.throws(() => assess(missing, lock), /Missing affected package paths/);
  const absent = report(); absent.vulnerabilities.braces.nodes = ['node_modules/not-braces'];
  assert.throws(() => assess(absent, lock), /Unexpected affected package path/);
});
