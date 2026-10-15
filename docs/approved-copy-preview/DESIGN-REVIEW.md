# Independent design and responsive review

Date: 2026-10-10
Scope: isolated approved-copy preview, Home and Pricing at http://127.0.0.1:8793/en/ and /en/pricing.html.

## Verdict

**PASS to show the user. No blocking visual or responsive defect found.** No implementation changes are requested before presentation. This is a design judgment supported by rendered evidence, not user-testing or conversion evidence.

The revised composition resolves the most consequential earlier issues: the homepage now connects the concrete risk to a conspicuous full-service benefit section; Pricing exposes the Assessment amount in the first desktop and mobile screen; the comparison emphasizes amounts and people; and the credit block immediately follows the comparison with its conditions visible.

## Method and limits

Applied the design-review skill's actual visual hierarchy, typography, color, spacing, responsive, consistency, interaction-affordance and visual-pattern checklist. Classified these as marketing/service pages. The approved restrained direction and exact approved copy govern over generic skill preferences for gradients, extra motion, copy deletion or a one-sentence hero. No artificial changes were proposed merely to satisfy those stylistic defaults.

Read DESIGN.md. Visually inspected all nine supplied rendered captures. Opened both actual local pages with a separate headless Chromium process using the installed Playwright runtime; root's browser session was untouched. Checked horizontal overflow at 320, 390, 768 and 1440px: none on either page. Body size measured 18px. Inspected three additional actual rendered viewport captures: 390px comparison, 390px credit, and 320px homepage.

The root reports 50 passing browser checks including disclosure, keyboard, contact and responsive coverage. This review does not relabel those checks as independently repeated. No measured performance result, full accessibility audit, motion audit or audience study is claimed. Full-page images were downscaled by the viewer; readable viewport captures and live measurements support fine-detail conclusions.

## What works

- Quiet premium: warm paper, dark green, clean source-sans typography, controlled rules and the authentic portrait form a credible expert-led service identity. No decorative SaaS grid, stock security symbols, ornamental icons or unsupported proof.
- Homepage scan path: explicit risk headline, contextual explanation, named expert and in-person response, one clear conversation action, then a large contrasting outcome band. The benefit section has a distinct job rather than repeating the risk.
- Risk/benefit relationship: the green section clearly names closing unwanted access and stronger habits. Its full-engagement-after-Assessment qualification is visible in the same band, separated by a rule, rather than hidden in a disclosure.
- Desktop composition: portrait balances the hero without competing with the headline. Subsequent heading/body columns provide rhythm and bounded reading widths. The contact ending also uses meaningful columns.
- Mobile composition: portrait reduces to a compact identity row; the CTA retains a full-width touchable shape. At 320px the headline, explanatory copy and CTA fit without clipping or overlap. The screenshot ends at the trust line, but the CTA itself is fully visible.
- Pricing first screen: Assessment name, typical duration and prominent VAT-inclusive amount appear at 390px and desktop. Putting amount before the long introduction is appropriate for a direct pricing visitor.
- Comparison: desktop headers and mobile repeated service labels preserve meaning. Amounts and one/four-person values are emphasized. The independently inspected 390px cells read cleanly and fit their columns.
- Credit proximity: the credit panel follows the comparison directly. The start-within-14-days condition and booking-alone exclusion remain readable and visible, as do once-per-group and additions qualifications.
- Cross-page consistency: navigation, logo, palette, typography, links and buttons read as one system. Page-specific hierarchy improves clarity without making the pages feel unrelated.

## Ranked non-blocking observations

### 1. Medium design tradeoff: Pricing remains a long mobile reference page

Observed: the 390px full-page capture is 7,580px tall. The full-service comparison comes after the complete initial-visit explanation, booking sequence and full-service introduction. A functional-looking Full services jump link is already near the top. This is intentional visible content, not overflow or accidental blank space.

Inferred consequence: a reader scrolling linearly to compare the two full services has substantial reading before reaching the table. Conversely, the exposed sequence reduces the risk of confusing Assessment with the separate full engagement.

Recommendation: retain for this user review. Evaluate the existing jump-link use with actual clients before further collapsing or moving content. No approved copy rewrite or missing-information claim is warranted. Moving the comparison higher would trade service-model understanding for speed.

Status: observation only, no pre-show fix.

### 2. Polish: show-all controls are visually detached from some of the disclosures they control

Observed: Home's Show all details control sits between the paid-visit and situation sections, while the visible collapsed service-boundaries row occurs farther below. Pricing's corresponding control is below the follow-up services, after earlier collapsed service details. The accompanying instruction says Open any heading for more, although ordinary static headings also exist.

Inferred consequence: control scope may be less obvious than the individual plus-marked rows. This is an affordance/placement concern, not evidence that the controls fail.

Recommendation: optional later cleanup to place a control with the first disclosure it affects or make its scope clearer through grouping. Any instructional wording change belongs in explicit copy review. Avoid adding a sticky toolbar or new control just for this polish issue.

Status: deferred polish, no pre-show fix.

## Checklist disposition

- Hierarchy/composition: pass; meaningful page-specific focal points.
- Typography: pass visually at inspected sizes; normal body measured 18px. Dense outcome-band text remains readable in its dedicated viewport capture.
- Color/contrast: coherent and legible visually; no numerical contrast certification claimed here.
- Spacing/layout: pass; no clipping, collision or horizontal overflow in live sampled widths.
- Interaction: clear buttons, links and plus affordances; behavioral regression coverage supplied by root. Small scope caveat recorded above.
- Responsive: pass; deliberate portrait and comparison adaptation, consistent content relationships.
- Motion: not independently evaluated; no extra animation requested for this quiet service experience.
- Content: exact approved copy preserved; no editorial blockers proposed.
- Generic design patterns: pass; no identified hard-rejection pattern.
- Performance: not scored from screenshots.

Qualitative design grade: A- for this two-page preview, not a quantitative usability score. Visual-template/generic-pattern grade: A. No before/after score delta is claimed because this independent review did not modify the implementation.

## Images actually viewed

Repository evidence, all under docs/approved-copy-preview/:

- home-desktop.png
- home-mobile.png
- home-mobile-outcome.png
- home-desktop-full.png
- home-mobile-full.png
- pricing-desktop.png
- pricing-mobile.png
- pricing-desktop-full.png
- pricing-mobile-full.png

Independent live-render checks, temporary local evidence:

- C:/Users/user/AppData/Local/Temp/toza-review-pricing-table.png
- C:/Users/user/AppData/Local/Temp/toza-review-pricing-credit.png
- C:/Users/user/AppData/Local/Temp/toza-review-home-320.png

Only this report was written in the repository. No source, accepted copy, PR, main branch or deployment was changed.
