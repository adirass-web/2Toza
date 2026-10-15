# Pricing-04 publication — 15 October 2026

**Published and verified.** [PR #60](https://github.com/adirass-web/VIP/pull/60) merged the owner-approved Pricing-04 copy, metadata and visual presentation. This is the content baseline for later line edits.

Reviewed head `940b18209ae279dc807f697d70df37ac1d2ff1e3` and merge `91e52ee8a8b6d9191a609c5353ac068445bc7147` share tree `f63a0bd74e96ac26904e238372677dd402d2354b`. The [production deployment](https://github.com/adirass-web/VIP/actions/runs/38692509885) succeeded, including live verification. Immutable deployment: https://545233ec.toza-site.pages.dev. Live Pricing: https://toza-site.pages.dev/en/pricing.

## Verification

- Exact approved main text/links and metadata; all 93 source blocks and seven comparison rows; correct people/device/key quantities.
- All 79 previous non-Pricing output files unchanged, including ten other pages and the protected Assessment. Only the Pricing HTML and its two new owned assets change public output.
- 56 browser tests, 78 local Pages route checks, historical/current source, schema/link/RTL/CI, audit-policy and independent desktop/mobile/keyboard/print checks passed.
- [Exact-head hosted preview](https://github.com/adirass-web/VIP/actions/runs/38691964025) attempt 2 and merge-specific production both verified all 11 HTML pages, 61 raw assets and 78 routes, with indexing/security headers and robots. Only the existing exact pinned Cloudflare analytics insertion is normalized; no other HTML bytes or asset bytes are ignored.

The first preview attempt returned 404 instead of 410 for a retired URL. The same code and exact head passed all routes on the second attempt; its initial cause is unproven. Both workflow attempts remain recorded. No routing code or verification exception was added.

The production artifact is `11952437861`, SHA-256 `554d8b60bbf159d961daa2458b5ba3c6fa7100fd8406f1b05279df81674a941e`. The successful preview artifact is `11951324916`, SHA-256 `671b4df70bddaa5b5a553f5bcda863d5b6ec98793baa45f441315b0376fcc9d4`. See [machine record](RELEASE.json) and [production comparisons](PRODUCTION-CHECKS.json).

## Cleanup and next version

Current documentation and active verification now resolve Pricing-04 rather than the old Pricing tables. Pricing has one presentation owner; existing navigation/print handlers remain shared. Historical approvals, alternatives, research and evidence remain intact. Existing branches/worktrees and PR #54 are preserved.

Later line edits start from the accepted Pricing-04 source and visual labels. Record the next candidate separately, retain old hashes, obtain the applicable new acceptance and regenerate the template through the adapter. Documentation-only cleanup may advance main without changing this released content or any public file. Implementation and expert checks do not establish a sales or comprehension improvement.
