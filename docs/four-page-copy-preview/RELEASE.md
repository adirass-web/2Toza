# Four-page release — 12 October 2026

Owner approved a separate PR and publication after the review and release gates pass, then explicitly approved maintenance PR #53 first. PR #55 carries the complete accepted preview; PR #54 remains untouched. The earlier local-only limits in this folder record the historical preview stage and are superseded for this release only.

## Scope and authority

The production diff includes the approved Home/Pricing presentation, EN-03 copy and EN-04 refinements for Home, Pricing, Separation and Divorce, and They Know Something. These are dependencies of the exact preview accepted by the owner. Seven other English pages, service facts, original acceptance fingerprints and the protected Assessment remain unchanged. No new wording, analytics, contact destination, translation or service promise is introduced.

Maintenance PR #53 merged separately as `e78a85c66ac001455ae7759e5346c3a14f6113d6`. Its Node 24, Eleventy 3 and Playwright 1.64 toolchain is integrated here. Its audit gate still explicitly reports two unpatched upstream advisories (nine affected nodes, zero critical); this is not a clean npm audit.

## Release gates

- Fresh independent review at `ea4a46b` found no actionable copy, rendering or purchase-stage defect. Exact authority, links, metadata, ARIA references, table associations and seven unchanged pages were checked independently.
- Clean `npm ci`, six audit-policy tests, live `audit:tools`, `verify:all` and **52/52 browser tests** passed after integrating maintenance. An initial maintenance browser run could not launch because its pinned Chromium was missing locally; installing that exact browser resolved the environment failure, with all 40 maintenance tests then passing. No assertion was relaxed.
- The preview workflow now permits only this same-repository branch at the exact PR head, deploying to the isolated `four-page-release` Cloudflare branch with `noindex, nofollow`. Production workflow remains main-only and unchanged from the separately reviewed maintenance release. Its branch-contract assertions change to the new authorized preview target; no gate is removed.
- The first hosted check caught an inherited preview-only header defect: appending a duplicate global rule for noindex caused the hosted preview to lose X-Frame-Options and Permissions-Policy. Production retained them. The preview preparation now inserts noindex into the existing rule, asserts that all global headers remain together, and the hosted gate verifies both headers. The failing assertion was retained and strengthened; public copy, design and production headers are unchanged.
- Final-head GitHub verification, CodeQL, hosted preview, 78 edge routing checks, hosted content/indexing parity and desktop/mobile checks must pass before merging #55. Their final evidence and workflow links are recorded in the PR description.
- The complete source diff whitespace gate excludes only `revisions/en-04/CHANGES.diff`: literal single-space blank context markers are valid unified-diff syntax in that historical artifact. No public source or executable file receives an exception.

The local gallery and review artifacts are excluded by the clean production build. Reviews and tests establish fidelity and behavior, not conversion performance or full accessibility certification.

## Publication and rollback

Merge #55 through GitHub with the reviewed head SHA, after confirming the base has not changed. Wait for the main-only deployment workflow for that merge commit, then verify the production routes, current HTML/assets, indexing, contact links and desktop/mobile rendering. Do not send test enquiries.

Rollback reference: `e78a85c66ac001455ae7759e5346c3a14f6113d6`. Revert only the #55 merge through a new reviewed PR, preserving #53 maintenance. Never force-reset main. Production verification is complete only after the merge-specific deployment succeeds and the live checks pass.
