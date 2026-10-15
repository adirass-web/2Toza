// Verify either fixed owned release destination against this exact gated build.
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
assert.match(process.env.RELEASE_HEAD_SHA || '', /^[a-f0-9]{40}$/, 'Exact PR revision supplied by workflow');
assert.equal(checkout.stdout.trim(), process.env.RELEASE_HEAD_SHA, 'Hosted verification uses the checked-out PR head');
const mode = process.env.TOZA_CHECK_MODE;
assert(['preview','production'].includes(mode), 'Explicit fixed release-check mode');
const origin = mode === 'preview' ? 'https://pricing-04-release.toza-site.pages.dev' : 'https://toza-site.pages.dev';
const productionOrigin = origin;
const release = process.env.RELEASE_HEAD_SHA;
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
    providerInsertionRemoved = true;
  }
  assert.equal(hash(comparable), hash(expected), file + ': exact build bytes after only the pinned provider insertion');
  if (mode === 'preview') {
    assert.match(response.headers.get('x-robots-tag') || '', /\bnoindex\b/i, file + ': preview noindex');
    assert.match(response.headers.get('x-robots-tag') || '', /\bnofollow\b/i, file + ': preview nofollow');
  } else {
    assert.doesNotMatch(response.headers.get('x-robots-tag') || '', /\b(?:noindex|nofollow|none)\b/i, file + ': production indexing headers');
    if (file.endsWith('.html')) assert.doesNotMatch(actual.toString('utf8'), /<meta\b[^>]*(?:name|http-equiv)=[\"'](?:robots|googlebot|x-robots-tag)[\"'][^>]*content=[\"'][^\"']*\b(?:noindex|nofollow|none)\b/i, file + ': production indexing metadata');
  }
  for (const [name, value] of Object.entries(securityHeaders)) assert.equal(response.headers.get(name), value, file + ': ' + name);
  checked.push({file, rawSha256:hash(actual), buildSha256:hash(expected), comparedSha256:hash(comparable), providerInsertionRemoved, status:response.status, indexingAllowed:mode === 'production', securityHeaders:true});
}
// Allow bounded edge propagation before checking the complete deployment.
const readyBy = Date.now() + 45_000;
let lastError;
while (true) {
  try { await check('en/pricing.html'); break; }
  catch (error) {
    lastError = error;
    if (Date.now() >= readyBy) throw lastError;
    await delay(3_000);
  }
}
const htmlFiles = pages().map(p => 'en/' + p.route + '.html').filter(p => p !== 'en/pricing.html');
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
const robotsResponse = await fetchFile('robots.txt');
assert.equal(robotsResponse.status,200);
const robots = await robotsResponse.text();
assert.equal(robots, fs.readFileSync('_site/robots.txt','utf8'), 'Published robots matches release');
const wildcardGroup = robots.split(/\r?\n[ \t]*\r?\n/).find(group => group.split(/\r?\n/).some(line => /^User-agent:[ \t]*\*[ \t]*$/i.test(line.trim())));
assert(wildcardGroup, 'Production robots has a general crawler policy');
assert.match(wildcardGroup, /^Allow:[ \t]*\/[ \t]*\r?$/im, 'General crawlers can index production');
assert.doesNotMatch(wildcardGroup, /^Disallow:[ \t]*\/[ \t]*\r?$/im, 'General crawlers are not blocked');
const evidence = {status:'PASS', mode, origin, release, checkedHead:process.env.RELEASE_HEAD_SHA, htmlPages:11, assetFiles:files.length-htmlFiles.length, routeChecks:78, robotsVerified:true, normalization:'Only the existing exact pinned Cloudflare insertion, if present; every other HTML byte and raw asset exact.', checks:checked.sort((a,b)=>a.file.localeCompare(b.file))};
fs.mkdirSync('.wrangler', {recursive:true});
fs.writeFileSync('.wrangler/hosted-release-checks.json', JSON.stringify(evidence,null,2)+'\n');
console.log('HOSTED RELEASE VERIFIED (' + mode + '): 11 exact HTML pages, ' + evidence.assetFiles + ' exact assets, indexing/security headers, robots and 78 routes at release ' + release);
