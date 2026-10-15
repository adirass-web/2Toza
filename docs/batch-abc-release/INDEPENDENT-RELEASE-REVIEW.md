# Independent release review — A/B/C and visual refinements

2026-10-13 · T1 adversarial source review · D-033/D-035/D-036/D-038/D-040/D-041
Base: released `origin/main` at `6c525f8d948709e3e8b7ea6f6c75abc9d8e5e56f`
Content/presentation candidate reviewed: `b81da1acdc2bf9a40bee24bf3bee304b97b4a9b2`

**Full release source and preview-workflow review: PASS, zero required findings.** The reviewed working delta is ready to be committed; exact commit binding will be checked before push. D-041 permits a separate PR and restricted hosted preview only; it does not permit merging main or publishing production. PR #54 and deferred maintenance PR #56 remain separate.

## Full release scope and authority

Reviewed the complete production-code diff against released main, not merely the last two visual components: accepted-copy loader and all three new acceptance amendments; Process adapter/CSS; Home and Business adapters/CSS; shared conditional layout; seven generated templates; exact-copy amendment verifier; new focused tests; and the added Process browser tests. Applied the project Toza Red Team authority, claim/proof, proportionate-risk and purchase-boundary checks. The deployment plan and current D-040/D-041 govern release scope.

Expected changed routes are Home, Why, Process, FAQ, Business, Inheritance and Attorneys. Independently compared generated Pricing, Separation, Surfaced Information and protected Assessment against `origin/main`: all four are unchanged after CRLF-to-LF normalization. Historical accepted sources, original manifest/fingerprints and earlier amendments remain intact. Shared service data, client-contact runtime, Hebrew/legal/retired-language handling and publication boundaries receive no production change in this diff.

The effective loader retains original authority checks, validates each additive amendment's exact route set and payload fingerprints, and preserves historical Process wording and the approved stage-map fingerprint. Batch C overlays its approved Process source only after the historical checks. The verifier reconstructs the entire prior Why payload by reversing precisely two approved paragraph substitutions, the three Batch B payloads by reversing four substitutions, and FAQ/Process by removing only the single approved guidance paragraph from each. Metadata, original links, numeric facts, headings and applicable table associations remain checked; an exception is not a broad waiver.

## Commercial and editorial challenge

No unresolved public-promise conflict was found. The edits make private-information consequences concrete without claiming that a particular reader has been attacked. Business remains work on authorized personal access, not a corporate investigation. Inheritance does not grant rights to family or estate information. Attorneys retain client authorization and the absence of evidentiary/forensic/legal promises. The revised Why paragraphs describe direct judgment, sequencing and explanation before approval rather than inventing proof or guaranteeing protection.

The paid Assessment retains ₪3,600 including VAT, the existing two-device scope, qualified urgent first aid and a useful independent summary. Contact remains a fit/urgency discussion without technical inspection. Broader hardening and teaching remain a separately accepted purchase; Business keeps its complete scope/price/complex-situation qualification in the Personal Shield paragraph. The Process summary and separate-purchase decision remain together before full engagement. Existing prices, VAT, eligible-credit timing, group-credit conditions, support, urgent-arrival conditions and client control stay under their accepted authority. Protected PA is neither restyled nor rewritten.

No new hard-sell repetition, false scarcity, incident certainty, professional guarantee or customer-proof claim was introduced. Existing necessary cross-page scope and consent repetition is preserved. This is preservation review, not a request to reopen accepted prose or invent page scores, customer research or conversion measurements.

## Implementation and regression challenge

Process retains three visible stages and all eight steps in order; guards reject missing stage IDs, unexpected step numbering/counts or a missing summary/purchase boundary. Added browser tests compare approved stage text, visible order, fee, heading widths, anchors, contact controls, print content and narrow-screen overflow. They extend the prior suite without removing assertions.

Home retains the primary pair and supporting hierarchy; Business retains whole commercial paragraphs. Both adapters validate their expected target structure and fail on representative missing/reordered/split blocks. The four focused tests check ordered paragraphs/links, unchanged primary-pair markup, the full Personal Shield qualification and malformed inputs. New assets have versioned URLs and route/component-scoped selectors; the shared layout includes them only on intended pages. No new browser script, font or dependency is introduced.

Independent checks executed during this release review: accepted source/template check PASS; amendment verifier PASS; presentation verifier PASS for eleven pages, table associations and protected PA order; focused tests 4/4 PASS; four unchanged released templates PASS. Prior full local build/audit/browser/78-route results and fresh integrated visual review are recorded in `docs/visual-integration-preview/LOCAL-GATES.md` and `INDEPENDENT-VISUAL-REVIEW.md`; these are supporting team evidence, not new executions or pixel inspections by this reviewer.

## Preview workflow and final binding

Reviewed the final CI, preview workflow and YAML-parsed contract delta. CI refreshes on `synchronize` and runs the four focused regressions unconditionally before full verification. Preview retains only the prior exact branch and this new exact branch inside the same-repository guard, checks out the PR head SHA, and never uses `pull_request_target`. The new focused suite is conditional only for the new branch because historical approved heads may not contain it.

The preview runtime uses explicit Wrangler 4.149.0, loopback port 8788, a bounded readiness check of actual English HTML, `pipefail`, an exact 78-check success marker and cleanup of only its own process group, with bounded TERM-to-KILL fallback. Gate failure prevents deployment. Noindex preparation follows the checks and preserves the unique global rule and security headers. Only the deploy step receives the Cloudflare secret; event values enter through environment variables, and the destination is selected from trusted fixed preview-branch literals. The recorded commit hash is the same PR head SHA. Production workflow and main-only trigger remain unchanged. No maintenance dependency/lockfile changes were imported.

The strengthened contract parses YAML and checks actual step configuration/order, exact allowlist, SHA checkout, read-only permissions, secret scope, runtime failure behavior, and noindex-before-deploy ordering. Independently executed `node scripts/verify-ci-contract.mjs`: PASS. `git diff --check`: PASS. Static source and contract review do not substitute for Linux execution of the new shell step; the hosted CI run must still prove it on the final head.

No blocker, major issue, required cut or new commercial owner decision was found. The remaining decision is production publication after the separately authorized PR/hosted-preview evidence. Exact release SHA binding is the next checkpoint, not permission to broaden the reviewed diff.

Hosted CI/CodeQL, Code Review diagnostics, final URL/HTML/assets/headers, edge behavior and fresh hosted screenshots remain later evidence. Passing this source review will not represent those checks as complete or grant production publication permission.
