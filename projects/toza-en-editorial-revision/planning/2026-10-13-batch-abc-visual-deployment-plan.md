# Deployment plan: approved editorial batches and visual refinement

Date: 2026-10-13. This is a release plan, not permission to push, merge or deploy. Current owner instruction authorizes local integration/review and this plan. PR #54 remains untouched.

## Release scope

Use one separate PR for the settled, approved Batch A/B/C copy/presentation and the two approved visual refinements on `codex/toza-trust-process-refinement`. Explain the resulting client experience: stronger expert-value explanation, legible service stages, differentiated Business/Inheritance/Attorney passages, first-message guidance links, clearer Business purchase groups and Home supporting destinations.

Expected changed English routes against released main: Home, Why, Process, FAQ, Business, Inheritance and Attorneys. Pricing, Separation, They Know Something and protected Assessment retain their current released copy/presentation. Confirm this from the final diff rather than treating it as a waiver of checks. Preserve Hebrew marketing withdrawal, retained Hebrew legal pages, unpublished Russian, redirects/410 routes, current brand, all prices/scopes/credit terms and client-control boundaries. No new analytics, assets beyond the scoped CSS, dependencies or service promises.

## 1. Finish the local gates and owner preview

- G5/G6: accepted-source hashes/metadata/order/links and protected Assessment; reproducible `sync:copy`, build/`verify:all`, audit policy and its tests, existing browser suite. The dependency policy acknowledges two upstream advisories; a policy pass does not mean zero vulnerabilities.
- G7: independent current source review including test/gate changes; actual desktop/mobile inspection, 320/390/768/1440 and short-phone contact, keyboard/menu/anchors/disclosures, print and reduced motion. No messages sent in testing. Demonstrate that Business keeps its full separate-purchase qualification and original mobile measure; Home preserves its primary/supporting hierarchy.
- G8: show the working local preview and precise before/after screenshots. Record any material tradeoff; do not claim conversion lift from heuristic review. The owner approves the rendered release candidate before publication.

## 2. Reconcile main and separate maintenance

Read-only GitHub check on 13 October: main is still `6c525f8d948709e3e8b7ea6f6c75abc9d8e5e56f` (#55). PR #56 is an open draft at `52120af07e25c2d49a8dabdef0b75f8a5694c012`; its current CI/CodeQL checks passed and its branch preview correctly skipped. It separately pins Wrangler, automates the existing 78 local Pages checks and reconciles documentation. This observation is not approval to release that PR.

Preferred sequence if #56 receives its own release authorization: release and verify it first, then update this editorial branch from new main, resolve only genuine conflicts and rerun affected gates. Keep maintenance and editorial PRs separate. If maintenance is deferred, the editorial release must still execute the existing 78 Pages checks and record its deployment-tool version. Reassess the final dependency tree and workflow diff; do not claim checks from #56 apply automatically to this branch.

Refresh remote main and compare the complete release diff. Do not reuse PR #54, force-push unrelated branches, or merge unreviewed background work. Regeneration and checks must run after any base reconciliation.

## 3. Prepare the separate PR and restricted hosted preview

When PR/hosted-preview preparation is authorized, push this reviewed branch and create a separate same-repository PR targeting main. Attach the created PR to this task. Its description lists final changed behavior, exact source approvals, local validation and remaining platform limits; it should not present design concepts as client evidence.

The current `.github/workflows/preview.yml` permits only `codex/toza-approved-copy-preview`. A new branch will therefore skip deployment under today's workflow. Prepare a narrowly reviewed update allowing the exact new branch, still same-repository-only and checkout of the PR head SHA. Update the corresponding CI contract assertions and preview job labels/branch name as appropriate. Preserve production's main-only trigger, permissions/secret boundary, noindex preparation and every security header. Do not broaden the rule to arbitrary forks or all branches, and do not repurpose PR #54.

Review this workflow/contract delta independently before relying on hosted results. Include the four new `node --test scripts/visual-refinements.test.cjs` regressions in the PR verification job rather than relying solely on a local run. Use the locked deployment runtime if #56 has landed. CI/CodeQL, audit/build/browser and the 78 local edge-route/status checks must pass on the final PR head. Run Code Review's available CI diagnostics and independent adversarial diff review; diagnostics alone are not source-review proof. Every required finding must be resolved consistently with current Toza authority, without weakening gates or rewriting accepted text.

Verify the hosted noindex preview: all eleven accepted HTML/metadata/link inventories; new versioned CSS returned successfully only on the intended routes; protected/unchanged pages; menu/contact/deep-link behavior and actual desktop/mobile screenshots; 78 edge-route/status behavior; robots/indexing/security headers. Do not mistake a skipped preview job for deployed success. Record final reviewed SHA, hosted URL and executed evidence.

## 4. Owner release decision and GitHub merge

Present the concrete hosted result and release-ready checks. Obtain publication authorization for this batch; the earlier #55 release approval does not authorize it. Once authorized and gates remain green, recheck main, the expected PR head, unresolved reviews and CI freshness; merge through GitHub using expected-head validation. Do not deploy manually around failing CI or merge stale reviewed code. Record the merge commit and production workflow run.

## 5. Production verification and rollback

Wait for the merge-specific main-only Cloudflare deployment to succeed. Confirm live HTML matches approved built output, allowing only documented line-ending normalization; verify new CSS URL/content, all eleven English routes, protected Assessment, retained legal/retired/withdrawn-language routes, indexing and security headers. Inspect actual live desktop/mobile Home/Business and affected editorial routes, and test native contact destinations without sending an enquiry. Report the verified deployment commit and live URL.

If a material release regression occurs, investigate promptly and revert the editorial release through a reviewed GitHub revert, preserving independently released maintenance. Immediately before merge record the current production commit as rollback reference; it may differ from today's #55 SHA. Rerun the production verification after rollback. A missing or mismatched deployment is not a successful release.

## Models and responsibilities

T2 integrates and runs reproducible gates; T1 independently challenges source/commercial meaning and actual visual output; T3 may inventory deterministic hashes/links. The root integrator owns authority/decision records, release sequence and GitHub expected-head validation. Apply Toza Editor/Red Team for preservation, modern-web-guidance/design-review/web-design-guidelines for presentation, and the existing release workflow guidance when actual publishing is authorized. No model preference permits invention of proof or changes to service facts.
