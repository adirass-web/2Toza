# Post-release maintenance — reconciled 13 October 2026

Baseline: released main `d993322` (PR #57), following releases #53 and #55. This work changes development tooling, CI and project navigation; approved source, public templates, design, service facts, legal documents and the production route contract remain unchanged.

## Reconciliation

The project README and CURRENT-STATUS now describe the published release and effective EN-02 → EN-03 → EN-04 → Batch A/B/C authority. The root README describes the current restricted two-branch preview workflow. Historical approval packets and release plans are preserved, with current entry points explaining their scope. No old approval or fingerprint-protected file is rewritten.

Eight duplicate editorial documents and four duplicate root skills now link to their complete canonical project versions. Root skill frontmatter remains discoverable. The older docs/editorial decision register is labelled historical and points to the live register. The canonical instructions, AGENTS.md, original source snapshots, skills and approval manifests retain their original fingerprints.

## Tooling and CI

Wrangler 4.150.0 is an exact devDependency with its transitive tree in package-lock.json. Both deploy workflows use `npm run pages:deploy -- ...`, resolving the installed tool rather than downloading a floating Wrangler major. The existing audit policy reports the same two residual root advisories and nine affected nodes; adding Wrangler introduced no new audit findings. Monitor [braces](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm) and [sprintf-js](https://github.com/advisories/GHSA-hp3w-g68c-fv3c) through `npm run audit:tools`, and reassess compatible fixes without cross-major overrides or audit suppression.

`npm run verify:pages` starts local Wrangler on an available loopback port, waits for that process's readiness and actual English HTML, runs the existing 78-check runtime verifier, and stops its own process tree. Its exit status propagates failures. CI, production and the already-authorized preview workflow run this gate after the build and before any deployment. General PR CI has no deployment credentials or deployment step. The four-page preview's same-repository/exact-head restriction and security-header preparation remain intact.

`npm run pages:dev` starts a persistent editing runtime on port 8788. Runtime-check diagnostics are written to ignored .wrangler/pages-runtime-check.log and uploaded by verification/preview workflows. The CI contract checks the installed Wrangler pin and the ordering of build, local runtime and deployment gates.

## Cleanup disposition

- [Remote branch inventory](branch-inventory-2026-10-12.md) records actual tips, ancestry and keep/deletion-candidate disposition. No remote branches, backup refs or PRs were removed. Branches with distinct history require PR/patch review; a squash merge is not ancestry proof.
- PR #54 remains untouched. #55 already included its required Home/Pricing presentation; merging it again is not a release task.
- Duplicate node_modules ignore rules were consolidated.
- vault.css remains required by 404.html and the retained RTL verifier. It is not dead code.
- guilloche.js is no longer loaded by the published marketing layout, but is currently included in the assets passthrough. Removing shipped legacy assets is deferred to an explicit output-changing cleanup, with reference and rollback review. This maintenance preserves the full generated file set and bytes.
- All eight approved logo variants remain available. Hebrew source and legal documents, historical gallery evidence and accepted copy history remain preserved. Hebrew adaptation is a later workstream.

## Environment and publication

Use .nvmrc (Node 24), npm ci and the pinned Playwright browser install. The managed cloud setup/start instructions are saved separately from repository code; they must match this branch's scripts when it is restored. The new browser distribution redirects to storage.googleapis.com, which must be allowed in addition to the Playwright CDN. The browser redirect and GitHub API destinations are now reachable from the current instance. Draft configuration saving does not apply network changes or publish the snapshot.

This branch requires normal review and passing checks before merge. No production deployment or additional content approval is inferred from maintenance preparation.

## Historical validation in the cloud workspace — 12 October, before #57

- Frozen dependency installation and verify:all passed on Node 24.
- All six existing audit-policy tests passed; live audit:tools reports only the two documented residual advisories.
- All 52 browser tests passed with system Chromium 154 through a local executable override; assertions and projects are unchanged. Playwright 1.64's pinned Chromium 156 is now installed through the standard verified installer; all 52 tests also passed with that exact browser.
- All 78 Pages runtime checks passed using the new wrapper and locked Wrangler. Temporarily removing only the generated Russian redirect made the gate fail with exit 1; restoring it returned all 78 checks to passing. No tracked source was changed for this negative check.
- Sending SIGTERM to the wrapper returned 143 and left no running runtime descendants.
- All 76 generated files match the released baseline byte-for-byte. Changed Markdown links resolve and git diff --check passes.

GitHub API reads confirm #53/#55 are merged and #54 remains open. No production deployment was performed by this maintenance work.

## 13 October reconciliation

The current pin is 4.150.0, matching the successful #57 production tool; the historical candidate used 4.149.0. Fresh installation and audit are required for this tree. The local compatibility date is frozen at 2026-10-06; this does not change the production project setting. Each workflow uses one reusable 78-check gate. The parsed YAML contract retains #57's two exact preview branches, exact-head checkout, trusted literal destination, noindex preparation, main-only production, focused four regression tests and CI synchronize trigger. Maintenance branches have no preview authorization. Older authorized preview heads must update from this base; no fallback skips the gate.

The branch inventory is a dated 12 October snapshot. #57 subsequently merged and its reviewed release branch was removed after production verification. This reconciliation deletes no branch or PR, does not merge #54, and excludes the separate local footer preview. Current execution evidence is recorded separately under V:/TOZA hardening biz/release-evidence/pr56-reconciliation; the historical checks above are not new results.

## Current reconciliation validation — 13 October 2026

Fresh npm ci passed with the locked 4.150.0 tree. All six audit-policy tests and the live audit passed its unchanged strict policy: two visible upstream advisories and nine affected packages. Accepted-source/template/amendment, route/link/RTL and parsed CI contracts passed, as did four focused regression tests, 56 pinned-Chromium browser tests and all 78 real Pages checks. Independent output comparison found all 78 generated public files and routing functions identical to released d993322, without normalization. Public source, accepted manifests and production design are unchanged.

External runtime probes verified a removed Russian redirect fails and restoring its exact bytes returns all 78 checks to passing; missing installed-runtime startup also fails. Real-runtime Windows cancellation-handler evidence is distinguished from native POSIX signal certification. An invalid Wrangler option was rejected, with an upstream Windows libuv assertion during that invalid-command exit; valid runtime invocations passed. No audit suppression or global install-script policy change was introduced. Independent review is recorded in the external reconciliation evidence. Exact-head GitHub CI remains required after pushing the reconciled head to PR #56; this paragraph is not merge or deployment authorization.
