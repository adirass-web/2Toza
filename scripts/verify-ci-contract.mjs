import { assert, assertIncludes, readJson, readText } from "./verify-utils.mjs";
import { createRequire } from 'node:module';
// js-yaml is already supplied by the locked Eleventy dependency tree.
const yaml = createRequire(import.meta.url)('js-yaml');
const workflow = source => yaml.safeLoad(source, {schema: yaml.JSON_SCHEMA});
const oneStep = (job, run, label) => {
  const steps = job.steps.filter(step => step.run?.trim() === run);
  assert(steps.length === 1, label + ': exactly one executable step required');
  assert(!steps[0]['continue-on-error'], label + ': failures must block later steps');
  return steps[0];
};
const before = (job, first, second, label) => assert(job.steps.indexOf(first) < job.steps.indexOf(second), label);

const pkg = readJson("package.json");
for (const script of [
  "verify:he-build",
  "verify:he-copy",
  "verify:leaving-alignment",
  "verify:rtl",
  "verify:he-links",
  "verify:ci-contract",
  "verify:all",
  "test:rtl-visual",
  "verify:pages",
  "pages:dev",
  "pages:deploy",
]) {
  assert(typeof pkg.scripts[script] === "string", `package.json is missing the ${script} script`);
}
assert(pkg.devDependencies["@playwright/test"] === "1.64.0", "Playwright version must stay pinned for repeatable screenshots");
assert(pkg.devDependencies.wrangler === '4.150.0', 'Wrangler must use the reviewed exact version');
assert(readJson('package-lock.json').packages['node_modules/wrangler'].version === pkg.devDependencies.wrangler, 'Wrangler lockfile version must match');
assert(pkg.scripts['pages:deploy'] === 'wrangler pages deploy', 'Deployment must use the installed Wrangler');
assert(pkg.scripts['verify:pages'] === 'node scripts/check-pages-runtime.mjs', 'Local Pages gate must use the reusable checked wrapper');
assert(pkg.scripts['pages:dev'] === 'wrangler pages dev _site --ip 127.0.0.1 --port 8788 --compatibility-date 2026-10-06 --show-interactive-dev-session=false', 'Manual local Pages runtime must match the release-tested compatibility date');

const ci = readText(".github/workflows/ci.yml");
assertIncludes(ci, "pull_request:", "PR CI trigger");
assertIncludes(ci, "npm ci", "PR CI dependency install");
assertIncludes(ci, "npm run verify:all", "PR CI verification suite");
assertIncludes(ci, "node node_modules/@playwright/test/cli.js install --with-deps chromium chromium-headless-shell", "PR CI browser install");
assertIncludes(ci, "npm run test:rtl-visual", "PR CI visual suite");
assertIncludes(ci, "actions/upload-artifact@cf430e030ddbb5b0abf93d22962f4752f3646cd9", "PR CI pinned test artifact upload");
assert(!/pages[: ]deploy|cloudflare_api_token|cloudflare_account_id/i.test(ci), "General PR CI must not deploy or receive deployment credentials");
const ciConfig = workflow(ci), ciJob = ciConfig.jobs.verify;
assert(ciConfig.on.pull_request.types.includes('synchronize'), 'PR CI must refresh on each new head');
const focusedRun = 'node --test scripts/visual-refinements.test.cjs';
const ciFocused = oneStep(ciJob, focusedRun, 'PR CI focused visual regressions');
const ciVerification = oneStep(ciJob, 'npm run verify:all', 'PR CI verification');
assert(ciFocused.if === undefined && ciVerification.if === undefined, 'PR CI regression/build checks must run unconditionally');
before(ciJob, ciFocused, ciVerification, 'PR CI focused regressions must run before build checks');

const deploy = readText(".github/workflows/deploy.yml");
assertIncludes(deploy, "push:", "Production deploy trigger");
assertIncludes(deploy, "- main", "Production deploy main branch guard");
assertIncludes(deploy, "concurrency:", "Production deploy serialization");
assertIncludes(deploy, "npm run verify:all", "Production deploy verification suite");
assertIncludes(deploy, "node node_modules/@playwright/test/cli.js install --with-deps chromium chromium-headless-shell", "Production deploy browser install");
assertIncludes(deploy, "npm run test:rtl-visual", "Production deploy visual suite");
assertIncludes(deploy, "npm run pages:deploy --", "Production deploy lockfile-pinned Wrangler");
assert(!/pull_request:/i.test(deploy), "Production deploy must not run on pull requests");
assert(!/npx.*wrangler/i.test(deploy), "Production deploy must not download a separate Wrangler");
const deployConfig = workflow(deploy), deployJob = deployConfig.jobs.deploy;
assert(Object.keys(deployConfig.on).length === 1 && deployConfig.on.push.branches.length === 1 && deployConfig.on.push.branches[0] === 'main', 'Production must remain a main-only push workflow');
assert(deployConfig.concurrency.group === 'toza-pages-production' && deployConfig.concurrency['cancel-in-progress'] === false, 'Production deployments must remain serialized');
const productionDeploy = oneStep(deployJob, 'npm run pages:deploy -- _site --project-name "$CF_PROJECT_NAME" --branch main --commit-hash "$GITHUB_SHA"', 'Installed production deployment');
assert(productionDeploy.if === undefined, 'Production deployment must follow successful gates');

const preview = readText(".github/workflows/preview.yml");
assertIncludes(preview, "pull_request:", "Preview PR trigger");
assert(!preview.includes("pull_request_target"), "Preview must not run in privileged PR-target context");
assertIncludes(preview, "head.repo.full_name == github.repository", "Preview same-repository guard");
assertIncludes(preview, "head.ref == 'codex/toza-approved-copy-preview'", "Preview approved branch guard");
assertIncludes(preview, "ref: ${{ github.event.pull_request.head.sha }}", "Preview exact source revision");
assertIncludes(preview, "npm run verify:all", "Preview copy/build gates");
assertIncludes(preview, "npm run test:rtl-visual", "Preview browser gate");
assertIncludes(preview, "node scripts/prepare-preview.cjs", "Preview indexing without duplicate global header rules");
const preparePreview = readText('scripts/prepare-preview.cjs');
for (const header of ['X-Robots-Tag: noindex, nofollow', 'X-Frame-Options: DENY', 'X-Content-Type-Options: nosniff', 'Referrer-Policy: strict-origin-when-cross-origin', 'Permissions-Policy: geolocation=(), camera=(), microphone=(), payment=()']) {
  assertIncludes(preparePreview, header, 'Preview indexing/security header preservation');
}
assertIncludes(preparePreview, "Exactly one global header rule required", 'Preview header uniqueness guard');
assertIncludes(preparePreview, "Preview indexing already configured", 'Preview duplicate indexing guard');
assert(!preview.includes('>> _site/_headers'), 'Preview must not append a duplicate global header rule');
const previewConfig = workflow(preview), previewJob = previewConfig.jobs.preview;
const branchGuard = "github.event.pull_request.head.repo.full_name == github.repository && (github.event.pull_request.head.ref == 'codex/toza-approved-copy-preview' || github.event.pull_request.head.ref == 'codex/toza-trust-process-refinement' || github.event.pull_request.head.ref == 'codex/toza-marketing-02-release' || github.event.pull_request.head.ref == 'codex/toza-pricing-04-release')";
assert(previewJob.if === branchGuard, 'Preview requires the exact same-repository four-branch allowlist');
assert(Object.keys(previewConfig.on).length === 1 && previewConfig.on.pull_request.branches.length === 1 && previewConfig.on.pull_request.branches[0] === 'main', 'Preview may run only for PRs targeting main');
assert(previewConfig.on.pull_request.types.includes('synchronize'), 'Preview must refresh on each new head');
assert(JSON.stringify(previewConfig.permissions) === JSON.stringify({contents: 'read'}), 'Preview token permissions must remain read-only');
assert(previewConfig.env === undefined && previewJob.env === undefined, 'Preview credentials must remain scoped to the deployment step');
const checkouts = previewJob.steps.filter(step => step.uses?.startsWith('actions/checkout@'));
assert(checkouts.length === 1 && checkouts[0].with.ref === '${{ github.event.pull_request.head.sha }}', 'Preview must check out only the exact PR head');
const previewFocused = oneStep(previewJob, focusedRun, 'Preview focused visual regressions');
assert(previewFocused.if === "github.event.pull_request.head.ref == 'codex/toza-trust-process-refinement'", 'Focused preview regressions run only for the new branch; prior exact heads may lack this file');
const previewVerification = oneStep(previewJob, 'npm run verify:all', 'Preview build verification');
const previewBrowser = oneStep(previewJob, 'npm run test:rtl-visual', 'Preview browser suite');
const previewPrepare = oneStep(previewJob, 'node scripts/prepare-preview.cjs', 'Preview noindex preparation');
const previewDeploy = oneStep(previewJob, 'npm run pages:deploy -- _site --project-name toza-site --branch "$PREVIEW_BRANCH" --commit-hash "$PREVIEW_SHA"', 'Installed isolated preview deployment');
for (const step of [previewVerification, previewBrowser, previewPrepare, previewDeploy]) assert(step.if === undefined, 'Required preview gates/deployment must not bypass prior success');
assert(previewDeploy.env.PREVIEW_SHA === '${{ github.event.pull_request.head.sha }}', 'Preview deployment must record the exact reviewed SHA');
assert(previewDeploy.env.PREVIEW_BRANCH === "${{ github.event.pull_request.head.ref == 'codex/toza-pricing-04-release' && 'pricing-04-release' || github.event.pull_request.head.ref == 'codex/toza-marketing-02-release' && 'marketing-02-release' || github.event.pull_request.head.ref == 'codex/toza-trust-process-refinement' && 'trust-process-release' || 'four-page-release' }}", 'Preview destinations must be trusted fixed literals for the four allowed branches');
assert(previewDeploy.env.CLOUDFLARE_API_TOKEN === '${{ secrets.CLOUDFLARE_API_TOKEN }}', 'Preview deploy token must use the repository secret');
const servedPreview = oneStep(previewJob, 'node scripts/verify-hosted-marketing-02.mjs', 'Hosted marketing preview fidelity gate');
assert(servedPreview.if === "github.event.pull_request.head.ref == 'codex/toza-marketing-02-release'", 'Served preview gate is scoped to the new reviewed branch');
assert(servedPreview.env.PREVIEW_HEAD_SHA === '${{ github.event.pull_request.head.sha }}', 'Served preview evidence identifies the exact PR head');
assert(servedPreview.env.CLOUDFLARE_API_TOKEN === undefined, 'Hosted read-only verification receives no deployment credential');
before(previewJob, previewDeploy, servedPreview, 'Actual hosted checks follow the deployment');
const pricingPreview=oneStep(previewJob,'node scripts/verify-hosted-release.mjs','Hosted Pricing preview fidelity');
assert(pricingPreview.if === "github.event.pull_request.head.ref == 'codex/toza-pricing-04-release'",'Pricing preview gate has its fixed reviewed branch');
assert(pricingPreview.env.RELEASE_HEAD_SHA === '${{ github.event.pull_request.head.sha }}' && pricingPreview.env.TOZA_CHECK_MODE === 'preview','Pricing preview checks the exact source and fixed destination');
assert(pricingPreview.env.CLOUDFLARE_API_TOKEN === undefined,'Read-only Pricing preview check has no deployment credential');
before(previewJob,previewDeploy,pricingPreview,'Pricing hosted checks follow deployment');
assert(previewJob.steps.filter(step => step.env?.CLOUDFLARE_API_TOKEN !== undefined).length === 1, 'Only the preview deployment step may receive its deploy token');
assert(previewJob.steps.every(step => !step.run?.includes('${{')), 'Untrusted event expressions must never be interpolated into shell code');
const runtime = oneStep(previewJob, 'npm run verify:pages', 'Preview shared Pages runtime gate');
assert(runtime.if === undefined, 'Local Pages failures must block preview deployment');
const runtimeWrapper = readText('scripts/check-pages-runtime.mjs');
for (const required of [
  "path.join(root, 'node_modules/wrangler/bin/wrangler.js')",
  "'pages', 'dev', '_site', '--ip', '127.0.0.1', '--port', String(port)",
  "'--compatibility-date', '2026-10-06', '--show-interactive-dev-session=false'",
  "detached: process.platform !== 'win32'",
  "[['SIGINT', 130], ['SIGTERM', 143]]",
  "gate?.kill('SIGTERM')",
  "process.kill(-runtime.pid, 'SIGTERM')",
  "process.kill(-runtime.pid, 'SIGKILL')",
  "spawn('taskkill', ['/pid', String(runtime.pid), '/t', '/f']",
  'Date.now() + 90_000',
  "fetch(url + '/en/', { signal: AbortSignal.timeout(2_000) })",
  "response.status === 200 && html.includes('<html lang=\"en\" dir=\"ltr\">') && html.includes('id=\"main-content\"')",
  "['scripts/verify-pages-runtime.mjs']",
  'TOZA_RUNTIME_URL: url',
  'timeout: 120_000',
  "await once(gate, 'close')",
  'PAGES RUNTIME VERIFIED: 78 route, status, content and asset checks',
  'process.exitCode = code ?? 1',
  'finally {',
  'await stopRuntime()',
]) assertIncludes(runtimeWrapper, required, 'Shared bounded installed Pages gate');
assert(!/\bpkill\b|\bkillall\b|\bnpx\b/.test(runtimeWrapper), 'Runtime must use the installed CLI and target only its owned process tree');
before(previewJob, previewFocused, previewVerification, 'Preview focused regressions must precede build checks');
before(previewJob, previewVerification, previewBrowser, 'Preview browser suite must follow build verification');
before(previewJob, previewBrowser, runtime, 'Local Pages checks must follow the browser/build checks');
before(previewJob, runtime, previewPrepare, 'All 78 local Pages checks must run before noindex preparation');
before(previewJob, previewPrepare, previewDeploy, 'Noindex preparation must precede preview deployment');
assert(!preview.includes("--branch main"), "Preview must not deploy production");
assert(readText('.nvmrc').trim() === '24' && pkg.engines.node === '24.x', 'Build runtime must use supported Node 24');
for (const [source, job] of [[ci, ciJob], [preview, previewJob], [deploy, deployJob]]) {
  const sharedRuntime = oneStep(job, 'npm run verify:pages', 'Shared local Pages runtime gate');
  const verification = oneStep(job, 'npm run verify:all', 'Build/copy verification gate');
  const audit = oneStep(job, 'npm run test:audit-policy && npm run audit:tools', 'Build-tool audit policy');
  assert(sharedRuntime.if === undefined && verification.if === undefined && audit.if === undefined, 'Shared runtime/build/audit failures must block release');
  assert(job.steps.filter(step => /verify:pages|check-pages-runtime|verify-pages-runtime|pages dev/.test(step.run || '')).length === 1, 'Exactly one reusable runtime gate per workflow; no duplicate inline runtime');
  before(job, verification, sharedRuntime, 'Build must precede local Pages checks');
  assert(!/npx.*wrangler/i.test(source), 'Use the lockfile-pinned Wrangler');
  assertIncludes(source, 'runs-on: ubuntu-24.04', 'Stable runner image');
  assertIncludes(source, "node-version-file: '.nvmrc'", 'Shared Node version');
  assertIncludes(source, 'actions/checkout@3d3c42e5aac5ba805825da76410c181273ba90b1', 'Pinned Node 24 checkout');
  assertIncludes(source, 'actions/setup-node@949feb2413d6458794dcd2491c4babbbce0c15c1', 'Pinned Node 24 setup');
  assert(!source.includes('ubuntu-latest') && !source.includes('actions/checkout@v4'), 'No deprecated runner/action defaults');
}
before(deployJob, oneStep(deployJob, 'npm run verify:pages', 'Production Pages runtime'), productionDeploy, 'Production runtime gate must precede deployment');
const publishedCheck=oneStep(deployJob,'node scripts/verify-hosted-release.mjs','Production hosted fidelity');
assert(publishedCheck.env.RELEASE_HEAD_SHA === '${{ github.sha }}' && publishedCheck.env.TOZA_CHECK_MODE === 'production','Production checks the deployed main commit and fixed origin');
assert(publishedCheck.env.CLOUDFLARE_API_TOKEN === '', 'Production read-only check explicitly clears the inherited deployment credential');
before(deployJob,productionDeploy,publishedCheck,'Actual production verification follows deployment');
console.log("CI CONTRACT VERIFIED");
