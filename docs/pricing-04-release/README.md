# Pricing-04 integration and release

Pricing-04 is published and verified through [PR #60](https://github.com/adirass-web/VIP/pull/60). See [publication record](RELEASE.md), [machine record](RELEASE.json) and [production comparisons](PRODUCTION-CHECKS.json). The preceding baseline is #59/b4e918e. Later line edits form a separate version; the historical review packets remain intact.

## Authority and scope

The exact Pricing source, visual labels, owner-review snapshot, research and independent proposal reviews live in [revisions/pricing-04](../../projects/toza-en-editorial-revision/revisions/pricing-04/). Use the additive acceptance amendment through `scripts/accepted-copy.cjs` to resolve approved wording and fingerprints. Research and earlier proposals are provenance, not substitute copy authority.

This release changes Pricing's presentation and its expressly approved copy. Preserve marketing-02 Home/Why, all supporting pages, protected Assessment, shared identity and compact footer. Keep future requested line edits separate until exact instructions are supplied. Do not add service facts, a payment system, new intake fields or a wider shared-CSS refactor.

`scripts/pricing-layout.cjs` owns the Pricing composition; `assets/css/pricing-04.css` and `assets/js/pricing-04.js` own its scoped styling and interactions. Generated `src/en/pricing.njk` must remain reproducible. `BASELINE-OUTPUT.json` records the preceding public output for preservation comparisons.

## Review and verification

Run the locked installation, audit-policy checks and tool audit, `npm run sync:copy`, `npm run verify:all`, focused regressions, `npm run test:rtl-visual` and `npm run verify:pages`. Verify exact approved source/metadata/labels, all comparison facts and conditions, client devices versus supplied keys, summary without continuation, safe first aid, voluntary full-service acceptance, working contact destinations, disclosures, public anchors, keyboard/print and responsive layouts. Independently review the final integration and actual rendered pages.

Use only `codex/toza-pricing-04-release` for this release's hosted preview, with fixed destination `pricing-04-release` and exact PR-head checkout. Preserve noindex and security headers. Record the real served-preview checks separately from local or synthetic checks; do not treat a workflow success unrelated to the reviewed head as release evidence.

## Publication record

Before calling this release published, record the actual PR URL, reviewed head, merge/tree identity, merge-specific deployment run and immutable deployment URL. Check production content/assets, indexing/security headers, routes and desktop/mobile interactions against that release. Record failures and scope limits honestly. Update [current project status](../../projects/toza-en-editorial-revision/state/CURRENT-STATUS.md) and the root release summary with the verified baseline; preserve previous release evidence rather than overwriting history.

Follow the established reviewed revert procedure if rollback is required; preserve independent maintenance and do not force-reset main. Passing technical and expert review establishes implementation fidelity, not improved customer comprehension or sales. Those outcomes require the planned comprehension and qualified-enquiry/paid-engagement measures.
