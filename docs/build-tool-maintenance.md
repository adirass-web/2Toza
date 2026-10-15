# Build-tool maintenance — 9 October 2026

Owner request: a separate maintenance PR following the prior handoff and review gates, with accepted copy and deployed design unchanged. Base production commit: `ed8d06aba134132b9832e46df2771fb0aaecbdba` (PR #52).

## Targeted updates

| Tool | Before | After |
| --- | --- | --- |
| Eleventy | 2.0.1 | 3.1.6 (exact stable pin) |
| Playwright | 1.52.0 | 1.64.0 (exact pin, Chromium refreshed with it) |
| Markdown-it | 13.0.2 | 15.0.2 (exact pin) |
| Transitive js-yaml 3 | 3.14.2 | 3.15.2 (compatible patched release) |
| Build runtime | Node 20 in CI | Node 24 via .nvmrc |
| GitHub actions | v4 / Node 20 runtime | checkout 7.0.1, setup-node 7.1.0, upload-artifact 7.0.2; immutable commit pins, Node 24 runtime |
| Runner | ubuntu-latest | ubuntu-24.04 |

Eleventy 3 retains the site's CommonJS configuration; its CLI moved from cmd.js to cmd.cjs. No content renderer, public template, CSS, JS, image or font changes are required. Existing parser helper versions are retained. The compatible YAML patch was selected explicitly; no forced audit fix, prerelease platform upgrade or cross-major override is used. Missing integrity hashes inherited from the old lockfile were restored from the official registry for those exact package versions.

Official compatibility/release references: [Eleventy CommonJS](https://www.11ty.dev/docs/cjs-esm/), [Eleventy releases](https://www.11ty.dev/docs/versions/), [checkout 7.0.1](https://github.com/actions/checkout/releases/tag/v7.0.1), [setup-node 7.1.0](https://github.com/actions/setup-node/releases/tag/v7.1.0), [upload-artifact 7.0.2](https://github.com/actions/upload-artifact/releases/tag/v7.0.2). Package versions and dependencies were also checked directly against the npm registry.

## Audit outcome and remaining exposure

The baseline audit had 18 affected dependency nodes: 2 critical, 14 high and 2 moderate. Updated audit: **9 affected nodes, 5 high and 4 moderate, no critical**. Those nine nodes propagate **two root advisories**, both with no published patched version as of this review. This is not a clean audit.

- [braces — GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm): deeply nested glob patterns can exhaust the stack. Chokidar 3.6.0 brings in braces 3.0.3 through Eleventy, its dev server and Nunjucks. Eleventy loads the watcher in watch mode; Nunjucks does so when watch is enabled. CI and production deployment use a one-shot build without watch/serve. The remaining relevant input is developer-controlled filesystem/watch patterns, not public-site request data. Do not expose the development server or process untrusted glob patterns.
- [sprintf-js — GHSA-hp3w-g68c-fv3c](https://github.com/advisories/GHSA-hp3w-g68c-fv3c): attacker-controlled precision format strings can throw an exception. The chain is gray-matter → js-yaml 3 → argparse 1 → sprintf-js 1.0.3. Argparse is used by the YAML package's CLI; the normal front-matter parser does not load it. No website code accepts format strings or invokes that CLI. This does not make arbitrary use of that dependency safe.

Do not apply npm audit's suggested downgrade to Eleventy 0.6, override Chokidar to a major that removes glob support, or override js-yaml 3 with 4: gray-matter binds the safeLoad/safeDump APIs removed in v4. Reassess when upstream releases compatible fixes, or before introducing untrusted content, watcher patterns, YAML CLI usage or public development-server access.

`npm run audit:tools` performs a live registry audit. It reports these residuals explicitly and fails on new affected package names, additional/root advisories, changed residual versions, critical findings, or incomplete/failed audit responses. It is an additional regression gate, not a claim that the two residual vulnerabilities are fixed. No existing quality gate was weakened.

## Unchanged-site and release checks

The baseline was built before updates and all 74 generated files were hashed. After the updates the same file set and hashes must match; public source remains unchanged. Existing exact-copy, table-association, protected-Assessment order, metadata, link, routing, RTL, keyboard, mobile and print gates remain required. Review the preview against the current deployed site as well as the local baseline.

The preview remains same-repository and exact-head restricted, now to `codex/toza-build-tool-maintenance` and Cloudflare branch `build-tool-maintenance`. It never deploys main. Production remains main-only through a reviewed merge. The current production design commit above is the rollback reference for any later release of this maintenance PR.
