// Validate the owned, isolated preview after deployment from its gated build.
// This step receives no deployment token. Fidelity requests use a fixed origin
// and reject foreign redirect targets before contacting them.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import {createRequire} from 'node:module';
import {setTimeout as delay} from 'node:timers/promises';
const {pages, assertAuthority} = createRequire(import.meta.url)('./accepted-copy.cjs');
assertAuthority();
const checkout = spawnSync('git', ['rev-parse','HEAD'], {encoding:'utf8', timeout:10_000});
assert.equal(checkout.status, 0, 'Read checked-out revision');
assert.match(process.env.PREVIEW_HEAD_SHA || '', /^[a-f0-9]{40}$/, 'Exact PR revision supplied by workflow');
assert.equal(checkout.stdout.trim(), process.env.PREVIEW_HEAD_SHA, 'Hosted verification uses the checked-out PR head');
const origin = 'https://marketing-02-release.toza-site.pages.dev';
const productionOrigin = 'https://toza-site.pages.dev';
const hash = data => crypto.createHash('sha256').update(data).digest('hex');
// Evidence from the served mismatch: one exact provider-added block. Its
// public analytics identifier is pinned; this does not add or disable tracking.
const providerAnalytics = Buffer.from(`<!-- Cloudflare Pages Analytics --><script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "4f3d67273e1349e2a78fd64a8be05620"}'></script><!-- Cloudflare Pages Analytics -->`);
assert.equal(hash(providerAnalytics), 'f41eec495ae60a06fee10f6470eaaca646917506aee9e020440a2a6e2c509f2f');
const closingBody = Buffer.from('</body>');
const securityHeaders = {
  'x-frame-options': 'DENY',
  'x-content-type-options': 'nosniff',
  'referrer-policy': 'strict-origin-when-cross-origin',
  'permissions-policy': 'geolocation=(), camera=(), microphone=(), payment=()',
};
const checked = [];
async function fetchFile(file, targetOrigin = origin) {
  assert(targetOrigin === origin || targetOrigin === productionOrigin, 'Fixed owned site origin');
  let url = new URL('/' + file, targetOrigin);
  const signal = AbortSignal.timeout(15_000);
  for (let redirects = 0; redirects <= 5; redirects++) {
    const response = await fetch(url, {redirect:'manual', headers:{'Cache-Control':'no-cache'}, signal});
    if (![301,302,303,307,308].includes(response.status)) return response;
    const location = response.headers.get('location');
    assert(location, file + ': redirect destination');
    const next = new URL(location, url);
    assert.equal(next.origin, targetOrigin, file + ': same-origin redirect destination');
    assert(redirects < 5, file + ': bounded redirect chain');
    await response.body?.cancel();
    url = next;
  }
  throw Error(file + ': redirect chain did not resolve');
}
function removeProviderAnalytics(buffer) {
  const start = buffer.indexOf(providerAnalytics);
  assert(start >= 0, 'Pinned provider insertion present');
  assert.equal(buffer.indexOf(providerAnalytics, start+1), -1, 'Exactly one pinned provider insertion');
  const end = start + providerAnalytics.length;
  assert.equal(buffer.indexOf(closingBody), end, 'Provider insertion immediately before the sole closing body');
  assert.equal(buffer.indexOf(closingBody, end+1), -1, 'One closing body');
  return Buffer.concat([buffer.subarray(0,start), buffer.subarray(end)]);
}
let productionCorroboration;
async function corroborateProvider() {
  if (productionCorroboration) return;
  const response = await fetchFile('en/index.html', productionOrigin);
  assert.equal(response.status, 200, 'Existing production baseline response');
  const body = Buffer.from(await response.arrayBuffer());
  // Home is unchanged since #59; the earlier #59 comparison baseline predates
  // that release and cannot corroborate current production.
  const baseline = JSON.parse(fs.readFileSync('docs/pricing-04-release/BASELINE-OUTPUT.json','utf8'));
  const rawBaselineMatches = hash(body) === baseline['en/index.html'];
  if (!rawBaselineMatches) {
    fs.mkdirSync('.wrangler', {recursive:true});
    fs.writeFileSync('.wrangler/production-mismatch.json', JSON.stringify({url:response.url, actualHtml:body.toString('utf8'), expectedBaselineSha256:baseline['en/index.html']},null,2)+'\n');
  }
  const normalized = rawBaselineMatches ? body : removeProviderAnalytics(body);
  assert.equal(hash(normalized), baseline['en/index.html'], 'Existing production Home matches the preserved main baseline');
  productionCorroboration = {origin:productionOrigin, rawSha256:hash(body), normalizedSha256:hash(normalized), providerAlreadyOnProduction:!rawBaselineMatches, verified:true};
}
async function check(file) {
  const response = await fetchFile(file);
  assert.equal(response.status, 200, file + ': successful response');
  assert.equal(new URL(response.url).origin, origin, file + ': retained preview origin');
  const actual = Buffer.from(await response.arrayBuffer());
  const expected = fs.readFileSync(path.join('_site', file));
  let comparable = actual;
  let providerInsertionRemoved = false;
  if (file.endsWith('.html')) assert.equal(expected.indexOf(providerAnalytics), -1, file + ': provider block is not source content');
  if (hash(actual) !== hash(expected) && file.endsWith('.html')) {
    fs.mkdirSync('.wrangler', {recursive:true});
    fs.writeFileSync('.wrangler/hosted-mismatch.json', JSON.stringify({file, url:response.url, expectedHtml:expected.toString('utf8'), actualHtml:actual.toString('utf8')},null,2)+'\n');
    comparable = removeProviderAnalytics(actual);
    await corroborateProvider();
    providerInsertionRemoved = true;
  }
  assert.equal(hash(comparable), hash(expected), file + ': exact build bytes after only the pinned provider insertion');
  assert.match(response.headers.get('x-robots-tag') || '', /\bnoindex\b/i, file + ': noindex');
  assert.match(response.headers.get('x-robots-tag') || '', /\bnofollow\b/i, file + ': nofollow');
  for (const [name, value] of Object.entries(securityHeaders)) assert.equal(response.headers.get(name), value, file + ': ' + name);
  checked.push({file, rawSha256:hash(actual), buildSha256:hash(expected), comparedSha256:hash(comparable), providerInsertionRemoved, status:response.status, noindex:true, securityHeaders:true});
}
// Allow bounded edge propagation before checking the complete deployment.
const readyBy = Date.now() + 45_000;
let lastError;
while (true) {
  try { await check('en/index.html'); break; }
  catch (error) {
    lastError = error;
    if (Date.now() >= readyBy) throw lastError;
    await delay(3_000);
  }
}
const htmlFiles = pages().map(p => 'en/' + p.route + '.html').filter(p => p !== 'en/index.html');
function assets(dir) {
  return fs.readdirSync(dir, {withFileTypes:true}).flatMap(entry => {
    const file = path.join(dir, entry.name);
    return entry.isDirectory() ? assets(file) : [file.replace(/^_site\//, '').replaceAll('\\', '/')];
  });
}
const files = [...htmlFiles, ...assets('_site/assets')];
for (let i = 0; i < files.length; i += 6) await Promise.all(files.slice(i, i + 6).map(check));
const routing = spawnSync(process.execPath, ['scripts/verify-pages-runtime.mjs'], {env:{...process.env, TOZA_RUNTIME_URL:origin}, encoding:'utf8', timeout:120_000});
assert.equal(routing.status, 0, 'Hosted route gate failed: ' + routing.stdout + routing.stderr);
assert(routing.stdout.includes('PAGES RUNTIME VERIFIED: 78 route, status, content and asset checks'));
const evidence = {status:'PASS', origin, head:process.env.PREVIEW_HEAD_SHA, workflowEventSha:process.env.GITHUB_SHA, htmlPages:11, assetFiles:files.length-htmlFiles.length, routeChecks:78, productionCorroboration, normalization:'Only one observed, pinned 214-byte Cloudflare Pages Analytics insertion before the sole closing body; assets remain raw bytes. Production baseline continuity is checked separately.', checks:checked.sort((a,b)=>a.file.localeCompare(b.file))};
fs.mkdirSync('.wrangler', {recursive:true});
fs.writeFileSync('.wrangler/hosted-preview-checks.json', JSON.stringify(evidence,null,2)+'\n');
console.log('HOSTED PREVIEW VERIFIED: 11 source-exact HTML pages after the sole pinned provider insertion, ' + evidence.assetFiles + ' exact raw assets, noindex/security headers and 78 route checks.' + (productionCorroboration ? ' Production baseline continuity verified.' : ' No provider normalization required.'));
