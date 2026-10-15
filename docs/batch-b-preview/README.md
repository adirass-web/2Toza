# Toza Batch B — local preview

12 October 2026. Branch: `codex/toza-trust-process-refinement`. Local baseline: `c85f7fee6c8bb11e97711d33a93c2037a6ae876d` (accepted Batch A). Exact approval: D-035. Local integration authority: D-036.

[Desktop/mobile gallery](http://127.0.0.1:8795/_preview/) · [Business](http://127.0.0.1:8795/en/business-dispute.html) · [Inheritance](http://127.0.0.1:8795/en/inheritance-clash.html) · [Attorneys](http://127.0.0.1:8795/en/attorneys.html).

## Result

The existing design now displays the three complete approved EN-06 payloads. Exactly four paragraphs change: two on Business, one on Inheritance and one on Attorneys. Business makes confidential documents/plans and possible full-service hardening concrete; Inheritance names private correspondence and financial information; Attorneys names the client's basis for authorizing technical changes. No headings, metadata, links, service terms, CSS, client JavaScript or global layout change.

The additive loader selects the three approved payloads while retaining all historical approval, protected Assessment and Process-map checks. The amendment verifier permits only the four literal substitutions and reconstructs each complete original payload to reject any other drift.

Eight other English pages are byte-identical to the preintegration build, including both Batch A pages and protected Assessment. Eleven baseline snapshots and hashes, changed-route metadata/link comparisons and final HTML fingerprints are recorded in [IMPLEMENTATION.md](IMPLEMENTATION.md) and [unchanged-pages.json](unchanged-pages.json).

The archival `preintegration/` directory has a scoped `.gitattributes` rule preserving its raw HTML snapshot bytes without Git line-ending conversion. These built snapshots retain their original whitespace and are treated as binary evidence; production sources and verification scripts remain ordinary reviewable text.

## Gates

- `npm run sync:copy` and `node scripts/accepted-copy.cjs --check`: PASS; only three generated templates change.
- `npm run verify:all`: PASS; build, exact presentation/metadata/links, amendment, protected order, locale retirement and CI contracts.
- `npm run test:rtl-visual`: **56/56 PASS**, recorded in [browser-suite.log](browser-suite.log). No test specifications were modified or assertions weakened.
- `npm run audit:tools`: PASS under the existing two-upstream-advisory residual policy; `npm run test:audit-policy`: **6/6 PASS**. No package or lockfile change. This is not a clean-vulnerability claim.
- Fresh [independent source/adversarial review](INDEPENDENT-SOURCE-REVIEW.md): **PASS, zero required findings**. Exact hashes, four-paragraph delta, eight unchanged routes, historical preservation and five in-memory verifier failure challenges reproduced.
- Fresh [independent rendered review](INDEPENDENT-VISUAL-REVIEW.md): **PASS, no material defects**. Actual screenshots inspected, plus 320/390/768/1440 reflow, keyboard/menu/skip/anchors, 390×667 contact controls, print and reduced-motion checks. [Capture evidence](capture-checks.json).
- Local gallery images, route/section links and keyboard navigation checked at 390/768/1440. Custom loopback server maps the gallery directly to this docs directory; the historical Batch A gallery source and `_site/_preview/` remain untouched. [Gallery evidence](gallery-checks.json).

These are local Chromium source/rendering/interaction checks, not customer-conversion evidence, a complete accessibility certification, Safari/physical-device testing or hosted release validation. The optional generic review skill's checklist was missing; the required project-specific independent source/authority review was completed and documented.

## Captures

| Page | Desktop | Mobile |
|---|---|---|
| Business | [Opening](business-desktop.png) · [Full](business-desktop-full.png) · [Assessment and full-service detail](business-desktop-detail.png) | [Opening](business-mobile.png) · [Full](business-mobile-full.png) · [Detail](business-mobile-detail.png) |
| Inheritance | [Opening](inheritance-desktop.png) · [Full](inheritance-desktop-full.png) · [Detail](inheritance-desktop-detail.png) | [Opening](inheritance-mobile.png) · [Full](inheritance-mobile-full.png) · [Detail](inheritance-mobile-detail.png) |
| Attorneys | [Opening](attorneys-desktop.png) · [Full](attorneys-desktop-full.png) · [Detail](attorneys-desktop-detail.png) | [Opening](attorneys-mobile.png) · [Full](attorneys-mobile-full.png) · [Detail](attorneys-mobile-detail.png) |

[All six openings together](review-gallery.png). Additional menu/focus, short-contact and print captures are retained in this directory and linked from the gallery.

## Resume and boundary

The session runs the custom server on `127.0.0.1:8795` in a hidden process. Start `node docs/batch-b-preview/serve.cjs` only if that listener is no longer running. The server serves the current `_site` for working pages and this directory for `/_preview/`; the gallery is not part of the publication build.

To regenerate evidence after a source change, run sync/build/verification before capture; do not clean-build concurrently with screenshot capture. Historical candidate-only checks in EN-06 and Batch A parity artifacts describe earlier stages and are not Batch B implementation gates. The runtime now selects EN-06, superseding the acceptance-time “integration next” status under D-036.

PR #54's sibling checkout remains at `c5e7e243764605463cd0b6e05fa33b115240729d`. No push, PR change, main merge or deployment. Next gate: owner review of this rendered local result, with release authorization separate.
