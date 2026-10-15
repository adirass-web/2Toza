// Known residuals are reported, not treated as a clean npm audit.
// See docs/build-tool-maintenance.md for upstream status and reachability.
const assert = require('node:assert/strict');
const {spawnSync} = require('node:child_process');
const fs = require('node:fs');
const residuals = {
  'https://github.com/advisories/GHSA-vfj7-8cjw-p6xm': {name: 'braces', version: '3.0.3', severity: 'high'},
  'https://github.com/advisories/GHSA-hp3w-g68c-fv3c': {name: 'sprintf-js', version: '1.0.3', severity: 'moderate'},
};
const knownNodes = new Set(['@11ty/eleventy', '@11ty/eleventy-dev-server', 'chokidar', 'nunjucks', 'braces', 'gray-matter', 'js-yaml', 'argparse', 'sprintf-js']);
function assess(report, lock) {
  assert(report && !report.error && report.auditReportVersion === 2 && report.vulnerabilities && report.metadata?.vulnerabilities, 'Missing or failed registry audit');
  const found = new Set();
  const entries = Object.entries(report.vulnerabilities);
  assert.equal(entries.length, report.metadata.vulnerabilities.total, 'Incomplete registry audit');
  assert.equal(report.metadata.vulnerabilities.critical, 0, 'Critical dependency advisory');
  for (const [name, entry] of entries) {
    assert(knownNodes.has(name), `New affected dependency: ${name}`);
    assert(Array.isArray(entry.via) && entry.via.length > 0, `Missing advisory cause: ${name}`);
    for (const cause of entry.via) {
      if (typeof cause === 'string') {
        assert(report.vulnerabilities[cause], `Unresolved advisory cause: ${cause}`);
        continue;
      }
      const known = residuals[cause.url];
      assert(known && known.name === name && known.name === cause.name && known.severity === cause.severity, `New or changed advisory: ${cause.url}`);
      assert(Array.isArray(entry.nodes) && entry.nodes.length > 0, `Missing affected package paths: ${name}`);
      for (const node of entry.nodes) {
        assert(typeof node === 'string' && (node === 'node_modules/' + name || node.endsWith('/node_modules/' + name)), `Unexpected affected package path: ${node}`);
        assert.equal(lock.packages[node]?.version, known.version, `Reassess changed residual version: ${node}`);
      }
      found.add(cause.url);
    }
  }
  assert(entries.length === 0 || found.size > 0, 'Audit contains no resolved root advisory');
  return {affectedPackages: entries.length, advisories: [...found]};
}
if (require.main === module) {
  try {
    assert(process.env.npm_execpath, 'Run through npm run audit:tools');
    const result = spawnSync(process.execPath, [process.env.npm_execpath, 'audit', '--json'], {encoding: 'utf8', maxBuffer: 5 * 1024 * 1024, timeout: 120000});
    assert(!result.error && [0, 1].includes(result.status), 'npm audit could not complete');
    const summary = assess(JSON.parse(result.stdout), JSON.parse(fs.readFileSync('package-lock.json', 'utf8')));
    console.log(`BUILD-TOOL AUDIT: ${summary.affectedPackages} affected packages; ${summary.advisories.length} documented, unpatched upstream advisories; no additional advisories.`);
    for (const url of summary.advisories) console.warn(`UNRESOLVED UPSTREAM: ${url}`);
  } catch (error) { console.error(error.message); process.exitCode = 1; }
}
module.exports = {assess};
