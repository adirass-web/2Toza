# Pricing inclusions, unified icons and shared CSS

## Delivered

- Updated expanded inclusions to the approved copy and dynamic 3/6/12 device allowances, 2/4/8 security keys and 60-day period. Shared migration, network and question-line limits are visible once below the comparison.
- Added category-only browser/app copy and eight accessible brand examples. No named apps appear as visible scope prose. Outlook and 1Password have no exact Tabler symbol and are not represented by misleading substitutes.
- Vendored 23 official Tabler 3.52.0 SVGs with MIT license and source manifest. Shared WhatsApp/Signal contacts and existing menu, FAQ, Conditions and situation-link control glyphs now use the same family. Editorial illustrations and wordmarks remain unchanged.
- Reused generated Home palette/font tokens; removed obsolete study scene selectors and duplicate hero declarations while retaining required hero positioning and phone body type. Shared reading width/focus tokens and consolidated contact selectors reduce contradictory CSS. No framework, browser icon runtime or dependency added. Motion is intentionally deferred to Task 3.

## Verification

TDD RED: `node --test scripts/pricing-inclusions.test.mjs` failed on missing `Up to three everyday devices` and `Browsers` before implementation. GREEN: both new tests pass; included in CI through `test:launch-pages`.

- `npm run test:profiles`: 3 passed, rebuilds preview and production.
- `npm run check`: 301 preview assertions; production equivalent: 296 assertions; facts/indexing/tokens pass.
- `node scripts/check-content.mjs` in both profiles: 100% legacy parity; explicit Pricing fixture updated for this approved copy only.
- `npm run test:launch-pages` in both profiles: 10 passed.
- `npm run test:production-checks`, `test:links`, `test:anchors`, `node --test scripts/release-policy.test.mjs`: all passed.
- Production link check: 474 links in 15 pages passed.
- `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm run check:pricing-print` in both profiles: closed native disclosures print full contents with JavaScript disabled.
- Production `check:a11y`: 30 runs, zero violations, rerun after final icon/style changes.
- Production `check:perf`: all 15 pages within budgets; Pricing LCP 1104ms, transfer 138KB, JS 2.2KB gzip. Last glyph-only control replacements add static SVGs; no behavior dependency.
- Browser smoke `/tmp/task2-smoke.mjs`: Home, Pricing and Separation at 320/390/768/1024/1440; 15 cases, zero overflow/broken images. Verified grey background, absolute Home hero and white situation heading after token consolidation.
- Screenshot: `/tmp/pricing-tabler-1440.png`. `git diff --check` passed.

Existing warning retained: Conditions has a literal `30 days`; no change in this task. Firefox/WebKit and manual screen-reader verification are not claimed.

## Output size

Measured from built files before/after Task 2, not source lengths:

| Asset | Before bytes (gzip) | After bytes (gzip) |
|---|---:|---:|
| Approved main CSS | 51,406 (10,761) | 48,958 (10,178) |
| Pricing CSS | 3,417 (1,126) | 4,353 (1,384) |
| Home continuation CSS | 4,630 (1,245) | 4,674 (1,257) |
| Situation CSS | 2,541 (887) | 2,598 (887) |
| Contact CSS | 2,816 (936) | 2,616 (939) |
| Site JS | 7,411 (2,258) | 7,411 (2,258) |

Combined changed CSS falls by 1,611 raw bytes / 310 gzip bytes. The 23 reusable static SVGs total 12,550 raw bytes, rather than shipping a complete library. No runtime package or CDN added.
