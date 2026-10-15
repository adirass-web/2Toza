# Toza Batch C — local implementation preview

13 October 2026. Branch: `codex/toza-trust-process-refinement`. Baseline: `9b128422c55d3a91f71bc7d2f241809460429245`. Owner acceptance and local integration authority: D-038.

[Desktop/mobile gallery](http://127.0.0.1:8796/_preview/) · [FAQ contact](http://127.0.0.1:8796/en/faq.html#contact) · [How Toza helps contact](http://127.0.0.1:8796/en/what-happens-during-the-visit.html#contact) · [Existing first-message answer](http://127.0.0.1:8796/en/faq.html#what-should-i-send-in-the-first-message).

## Result

Both contact endings now contain the exact approved supporting link **What should I send in the first message?** FAQ opens its existing answer on the same page; How Toza helps goes directly to that answer on FAQ. The existing disclosure script opens it and native navigation remains usable. WhatsApp/Signal actions remain immediately available; guidance is not a compulsory step.

No original words, metadata, headings, service facts, existing links, CSS, client JavaScript or stage-map content changed. The other nine English pages are byte-identical to the preintegration build, including Why Toza, all Batch B pages and protected Assessment. Shared navigation/footer/contact, schema and llms.txt remain unchanged.

The fifth additive amendment records only FAQ and Process. Historical approvals and original Process/map validation stay active. The strict verifier checks both exact approved hashes and permits only one literal contact link per page: removing it must reconstruct the entire prior payload. The old link order, headings, tables and numeric facts remain required.

## Current quality gates

- `npm run sync:copy`, accepted-copy `--check`, direct amendment verifier and `npm run verify:all`: **PASS**. Exact authority/template/body/metadata, protected order, table associations, links, locale retirement and CI contracts remain enforced.
- Existing `npm run test:rtl-visual`: **56/56 PASS**, recorded in [browser-suite.log](browser-suite.log). No test specification was changed or assertion weakened.
- Audit tools: **PASS** under the existing two-upstream-advisory residual policy; audit-policy tests **6/6 PASS**. No dependency/package-lock change or vulnerability-free claim.
- [Independent source/adversarial review](INDEPENDENT-SOURCE-REVIEW.md): **PASS, zero required findings**. Reproduced the two additions, nine untouched pages, protected/shared/historical preservation and fourteen in-memory rejection challenges.
- [Independent actual rendered review](INDEPENDENT-VISUAL-REVIEW.md): **PASS, zero required corrections**. Both guidance links exercised by real keyboard Enter and pointer clicks at 320/390/768/1440; correct answer and existing message/guidance displayed; Back restored contact; both channel controls remained usable without sending a message.
- Fresh desktop/mobile contact and answer captures inspected, plus openings, full pages, 390×667 contact/actions/menu, print and reduced-motion checks. No overflow, page/console/asset errors or clipped controls. [Capture evidence](capture-checks.json).
- Actual local gallery images, working links, Tab/Enter and reflow checks passed. [Gallery evidence](gallery-checks.json). The custom loopback server maps `/_preview/` directly to this docs directory and working pages to `_site`; earlier galleries are not overwritten.

These are local Chromium source/interaction/rendering checks, not customer-conversion evidence, a complete accessibility certification, Safari/physical-device/assistive-technology testing or hosted release validation. Print-media checks do not claim physical printing or PDF pagination. The generic review checklist was unavailable; the required fresh project-specific independent source review was completed and documented.

## Evidence and preservation

[IMPLEMENTATION.md](IMPLEMENTATION.md) records actual executed commands, approved fingerprints, all eleven before/after HTML hashes and the stable build handoff. [unchanged-pages.json](unchanged-pages.json) records nine strict raw byte comparisons. Full target HTML reconstructs the previous snapshots after only exact added-paragraph/separator removal and CRLF-to-LF normalization; this does not claim raw target byte identity. The two original target snapshots have scoped `-text -diff` Git attributes preserving their raw bytes across checkouts; production sources remain ordinary reviewable text.

| Page | Desktop | Mobile |
|---|---|---|
| FAQ | [Contact link](faq-desktop-contact.png) · [Opened answer](faq-desktop-guidance.png) · [Full page](faq-desktop-full.png) | [Contact link](faq-mobile-contact.png) · [Opened answer](faq-mobile-guidance.png) · [Full page](faq-mobile-full.png) |
| How Toza helps | [Contact link](process-desktop-contact.png) · [Answer reached](process-desktop-guidance.png) · [Full page](process-desktop-full.png) | [Contact link](process-mobile-contact.png) · [Answer reached](process-mobile-guidance.png) · [Full page](process-mobile-full.png) |

[Combined desktop/mobile view](review-gallery.png). Focus outlines in these screenshots reflect actual keyboard focus; they are not a permanent decorative border.

## Resume and boundary

Port 8796 is already running in a hidden, loopback-only process. Start `node docs/batch-c-preview/serve.cjs` only if that listener has stopped. To refresh evidence after a source change, finish sync/build/verification before running `node docs/batch-c-preview/capture.cjs`; then run its `--gallery` mode with the gallery server active. Do not clean-build concurrently with capture.

Historical EN-07 draft checks and pending-owner labels are superseded by `revisions/en-07/ACCEPTANCE.md` and D-038; they are not this integration gate. A/B/C are now locally integrated. No push, PR #54 change, main merge or deployment. Owner review of this rendered result and separate release authorization remain later gates.
