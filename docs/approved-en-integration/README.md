# Approved English application integration

Status: implemented and independently reviewed in the managed integration worktree, uncommitted and unmerged. Source base is fetched main `6c4a88be75d2a35cf134df7e7851a1f3492fcb1e`. Published immutable Preview: https://0098c46b.toza-v2.pages.dev/en/ . Deployment `0098c46b-66d2-4207-87e8-da52555fdd5a`, branch `codex-app-en-integration-20261104`; production remains `841bb44a-975c-4ac1-acaa-ddb80e774e67` on main.

## Change boundary

Four approved English routes use source templates in `src/_includes/approved-en`, source Markdown in `content/approved-en`, route-local data in `approvedEN.js`, and portable isolated styling/assets under `styles/approved-en*` and `approved-en-assets`. Existing paginator excludes only Home, How it works and About to avoid duplicate outputs; Exposure is new. Existing application contact configuration is reused. Locked source files match the owner-approved workspace originals.

The approved four-part Home remains Hero → Situations → CTA → Prices, with exact locked excerpts and links to complete Exposure/Approach/Expert copy. Existing full Pricing, FAQ, Conditions, situation pages, shared facts/contact data and legacy assets remain untouched and byte-identical after build. Main has no Hebrew route; no provisional Hebrew source/output is introduced. The unavailable Hebrew language switch is omitted. This is the sole intentional header difference from the earlier bilingual study.

## Build and checks

- `npm run build` builds the existing app and the new isolated approved English stylesheet.
- `npm run check` includes 108 approved-copy, target, noindex and protected-output checks.
- `npm run check:content` also checks legacy content parity; approved routes delegate to their exact source check.
- `node scripts/check-approved-en.mjs --exact-protected` verifies protected outputs byte-for-byte. Default mode normalizes CRLF for text so CI is portable across Windows/Linux; binary assets are always exact.

Clean baseline build and standard checks passed. An existing Windows final-pass path normalization bug in `check-content.mjs` was reproduced and fixed; all legacy copy parity remains 100%. Final build, standard checks and both focused guard modes pass. Browser evidence covers six Home widths, nine supporting route/width cases, exact copy, image placement/loading, overflow, local destinations, no-JS channels, keyboard skip/focus and scoped axe (zero violations/incomplete). Firefox/performance/full accessibility certification are not claimed.

Dependencies were reused from the already installed matching toolchain through an ignored local junction. No dependency/lockfile changes or browser installations. Future clean checkouts use the existing `npm ci` workflow.

Independent scoped LUNA review found no blockers after SOL corrected the port to the latest approved menu and supporting templates. Full photos are loaded and alternate physical right/left/right at desktop/mobile, with readable CTA/supporting pages. Technical review is not owner visual approval.

## Evidence

`content-check.json`, `browser-flow-report.json`, `browser-copy-report.json`, `baseline-output-hashes.json`, `artifact-manifest.json`, `remote-verification.json` and `deployments.json` record the checks and published artifact. Remote 17 selected pages/assets returned 200, matched the built SHA256 values and carried noindex headers. No internal ledger or review files are emitted to `_site`.

The original dirty `codex/p7-pricing` checkout was not edited; its full porcelain change inventory is unchanged. The managed integration worktree remains for review. No commit, push, merge or production deployment was performed. Next gate: owner visual approval of the application-backed Preview, then a separately authorized Git/PR integration step.

Latest correction preview: https://6088309d.toza-v2.pages.dev/en/#situations . Existing source-page lead copy now appears beneath each linked situation title. See `situations-copy-fix.md` for exact source map, checks, review and remote evidence. No Pricing/Hebrew changes or merge.
