# Current visual baseline: measured observations

13 October 2026. Evidence-only handoff under D-039 and section 9 of the owner-approved execution plan. Local commit `d8a29242f325d54f7908ccf9be8175051efc46cd`, branch `codex/toza-trust-process-refinement`. **No site implementation, copy editing, rebuild, generation, publication, commits or messages to prospects.**

Capture started `2026-10-13T08:22:24.100Z`, completed `08:23:16.691Z`, with two supplementary Why benefits shots afterward. [Full measurements, hashes and screenshot inventory](BASELINE.json).

## Identity and actual baseline

All eleven local served HTML responses matched their current `_site/en/*.html` bytes exactly. The record includes current accepted payload hashes, source metadata plus deterministic metadata hashes, raw generated-template hashes, raw/LF built hashes and served hashes. The capture helper requires the accepted-copy module for read-only resolution; it never calls sync or a build.

Live was fetched from `https://toza-site.pages.dev/en/` and the ten `.html` route aliases, following their ordinary redirects. All eleven final responses were HTTP 200. Live HTML matches the recorded #55 baseline **after line-ending normalization only**, not raw byte identity. No URL, whitespace beyond CRLF/LF, script or content rewriting was used.

The initial raw-hash mismatch was diagnosed: live Home is 20,777 bytes and local Home is 20,977 bytes; its first difference is LF versus CRLF at byte 0. Normalizing both to LF produces exact HTML equality. Seven live pages reproduce recorded baseline hashes when LF is restored to CRLF. Four EN-04 pages use mixed line endings locally; their current raw built hashes match the #55 records and their current/live LF hashes match. Each route records this explicit proof method. This avoids falsely calling a Windows/Linux checkout difference a production change.

The recorded hash sources are `docs/batch-a-preview/unchanged-pages-baseline.json` for #55 and `docs/four-page-copy-preview/unchanged-pages-baseline.json` for the seven routes unchanged by #55. These are stored repository records; this task did not independently attest deployment infrastructure or a GitHub deployment ID.

Current local and live LF HTML match exactly on Home, Pricing, Separation, They Know Something and protected Assessment. They differ on Why, Process, FAQ, Business, Inheritance and Attorneys, consistent with the accepted local A/B/C integrations. The four representative live screenshots are clearly prefixed `live-`; current preview images use `local-`.

## Measured layout observations

Forty-four local checks cover all eleven routes at **320/390/768/1440px**. There was no document horizontal overflow, broken image, extra H1, page exception, console error, failed request or loaded-asset HTTP error during this capture. The four live representative pages also produced no recorded browser errors. This is a layout/capture check, not a new complete interaction or accessibility certification.

| Local route | Desktop document height, 1440×900 | Mobile document height, 390×844 |
|---|---:|---:|
| Home | 4,182px | 6,267px |
| Pricing | 5,255px | 7,743px |
| Why Toza | 4,132px | 6,133px |
| FAQ, answers initially closed | 4,469px | 5,280px |
| How Toza helps | 5,813px | 8,637px |
| Separation / Divorce | 3,330px | 4,444px |
| Business | 3,657px | 5,338px |
| They Know Something | 3,709px | 5,181px |
| Inheritance | 3,701px | 5,404px |
| Attorneys | 4,064px | 5,959px |
| Protected Assessment | 4,882px | 6,968px |

Heights include header/footer and default disclosure state. They establish physical reading length, not reading time, comprehension or abandonment.

1. **Home situations use two different current treatments.** Separation and Business have H3 headings and bronze rules, side by side on desktop and stacked on mobile. They Know Something and Inheritance are inline linked paragraphs below. The entire section measures 616px desktop and 973px mobile; it starts at document Y 2,416 / 3,631px. Its introduction explicitly says a dispute or known incident is not needed. This is visible structural asymmetry, not a broken link or proof that all four must look identical. [Desktop](local-home-desktop-situations.png), [mobile](local-home-mobile-situations.png).
2. **Why has a substantial three-benefit section.** `#what-becomes-different-for-you` contains three existing H3 units, 247 visible words, and measures 847px desktop / 1,397px mobile. The authentic portrait and personal note are separate: that section measures 955 / 1,527px. A different existing section is `#one-person-understands-your-situation-and-does-the-work`; the file named `-benefits.png` captures that section, while `-client-benefits.png` captures the three actual benefit units. [Actual three-benefit desktop](local-why-us-desktop-client-benefits.png), [mobile](local-why-us-mobile-client-benefits.png), [portrait](local-why-us-desktop-portrait.png).
3. **Pricing already exposes the Assessment price early.** The mobile opening shows the Assessment/duration/₪3,600 panel before the longer introduction; the main body CTA bottom is Y 915px, below the 844px opening viewport. All other tested mobile primary CTA bottoms are within the opening viewport. This is a fold-placement measurement, not an inaccessible action or customer finding. The desktop CTA bottom is Y 689px. Comparison rows keep their two service labels on mobile; credit qualifications remain visible outside optional balance detail. [Mobile opening](local-pricing-mobile-opening.png), [comparison](local-pricing-mobile-comparison.png), [credit](local-pricing-mobile-credit.png).
4. **Business uses long plain bands without collapse.** Its first two content sections measure 406/326px desktop and 599/495px mobile. The Assessment/Personal Shield panel measures 693 / 1,101px; the authority section measures 514 / 842px. No clipped or overlapping text was observed in the focused band shots. [Desktop bands](local-business-dispute-desktop-long-band.png), [mobile bands](local-business-dispute-mobile-long-band.png), [offer](local-business-dispute-desktop-offer.png).
5. **FAQ already has grouped native disclosure.** It starts with 30 closed answers, a visible expand-all control and seven category anchors. Its initial question-only main content counts 432 rendered words; expanded answer length is a separate state. Getting Started is 341px desktop / 350px mobile. The first-message answer is captured open as a separate detail. No new claim that FAQ lacks grouping or guidance access is supported. [Categories desktop](local-faq-desktop-categories.png), [mobile](local-faq-mobile-categories.png), [open guidance](local-faq-mobile-guidance.png).
6. **Process already has the accepted local stage hierarchy.** On mobile, conversation/offer, Assessment and full engagement groups measure approximately 979 / 2,021 / 2,100px. The local full page visibly distinguishes stage headings from numbered steps. The live #55 image is the preceding presentation; do not rank its older stage treatment as a current-local defect. [Local desktop full](local-what-happens-during-the-visit-desktop-full.png), [live desktop full](live-what-happens-during-the-visit-desktop-full.png).

These are inputs for independent art-direction and UX judgment. The capture reviewer is not assigning a marketing priority, forecasting conversion effects, reopening wording or prescribing a design variant.

## Reviewer screenshot handoff

Absolute root: `V:\TOZA hardening biz\VIP-copy-preview\docs\visual-refinement-review\`.

All eleven names: `home`, `pricing`, `why-us`, `faq`, `what-happens-during-the-visit`, `separation-divorce`, `business-dispute`, `they-know-something`, `inheritance-clash`, `attorneys`, `private-exposure-assessment`.

- Every current page: `local-{name}-desktop-opening.png`, `local-{name}-desktop-full.png`, `local-{name}-mobile-opening.png`, `local-{name}-mobile-full.png`.
- Live representatives: the same four suffixes prefixed `live-` for `home`, `pricing`, `why-us`, `what-happens-during-the-visit`.
- Home detail suffixes: `situations`, `full-service-outcome`, `assessment`, both widths.
- Pricing detail suffixes: `assessment`, `comparison`, `credit`, `inclusions` (that disclosure opened), `contact`, both widths.
- Why detail suffixes: `portrait`, `benefits` (single direct-expert section), `client-benefits` (three benefit units), both widths.
- Business detail suffixes: `long-band`, `offer`, both widths. FAQ suffixes: `categories`, `guidance` (answer opened), both widths.

There are **90 current browser PNGs**: 44 local opening/full images, 30 focused local details including the two supplementary Why shots, and 16 representative live opening/full images. Both T1 reviewers received incremental exact paths before completion. Core opening/detail/live-comparison screenshots used for the observations were personally opened with `view_image`; no screenshot finding here derives only from a DOM metric.

## Constraints and limits

Current `DESIGN.md`, approved fitted-panel artwork and section 9 remain design authority: warm light/green palette, self-hosted current fonts, authentic portrait, precise alignment and restrained composition. No shields, locks, cyber grids, fake seals, generated photography, new fonts, cultural ornament or invented client proof. Audience and brand preferences come from owner records, not customer research.

No Safari, physical devices, assistive technology, native zoom, customer comprehension/conversion, LCP/CWV field data, print-pagination or broader security certification was tested in this capture task. No test enquiries were sent. Old `RANKED-DESIGN-GAPS.md` diagnoses were not imported as present defects.

Reproduce after a stable current build, without rebuilding:

```powershell
node docs/visual-refinement-review/capture.cjs
```

The helper's first draft had an over-specific inclusion selector and a later syntax typo; both were corrected in the artifact helper only. The final complete run passed. The local page source and `_site` were untouched.
