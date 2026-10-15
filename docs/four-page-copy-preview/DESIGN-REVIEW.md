# Four-page preview: independent rendered design review

Date: 2026-10-11
Reviewer: independent AI design/responsive reviewer
Scope: approved-copy local build at http://127.0.0.1:8793/en/, /en/pricing.html, /en/separation-divorce.html and /en/they-know-something.html.

## Verdict

**PASS for user presentation. No blocking design, responsive or sampled accessibility defect found.** This verdict covers the four-page local preview, not publication authorization or a full accessibility certification. No source changes are requested before showing it.

This is implementation QA against the approved light direction and approved drafts. It is not a new design exploration, external customer endorsement, user study or measured conversion result. Exact-copy verification and the broader functional suite belong to the other quality gates.

## Evidence and method

Applied the previously read design-review skill's hierarchy, typography, color, spacing, responsive, consistency and interaction-affordance checklist. Used DESIGN.md and the previous approved-copy-preview/DESIGN-REVIEW.md as context. The accepted quiet direction and exact drafts take precedence over generic skill suggestions to add gradients, animation or delete prose.

Viewed all 20 current supplied screenshots: desktop and mobile opening viewport, desktop and mobile full page, and mobile detail for each of Home, Pricing, Separation and They Know. Full-page images were downscaled by the viewer; viewport and detail images support fine reading.

Independently opened the actual local pages with a separate Chromium process using the existing Playwright runtime. Root's session was not used. At each of 320, 390, 768 and 1440px, all four routes had:

- No horizontal document overflow.
- Exactly one h1 and one main landmark.
- 18px body text.
- No image missing an alt attribute. This checks presence, not the quality of every alt description.

Also independently verified mobile Menu reports aria-expanded=true when opened, and the Separation disclosure opens with keyboard Enter. Visually inspected its visible focus ring. Captured and viewed independent 320px Separation and 768px They Know screenshots.

Root reports verify:all and 52/52 browser tests passed, plus eight capture viewports without errors or overflow. Those are supporting team results, not relabelled as this reviewer's independent tests. Numerical contrast, all focus-order paths, screen-reader behavior and performance were not exhaustively audited here.

## Required placement and composition checks

### Home: pass

The concrete risk headline and authentic portrait form the desktop opening composition. On mobile, the portrait becomes a compact identity row and the CTA remains prominent. The contrasting full-service benefit band remains directly after the hero/index and before the detailed connection mechanism. The Assessment/separate-purchase qualifier stays visibly inside that benefit band.

The revised personal threat-modelling explanation is an ordinary readable paragraph under its own heading, not a new badge, claim card or visually overstated promise. The paid-visit panel keeps the amount, typical duration and scope together.

### Pricing: pass

The VAT-inclusive Assessment amount is prominent in the opening desktop and 390px mobile view. The comparison maintains strong amounts and one/four-person differentiation. Its labels survive the mobile adaptation.

The group-privacy paragraph is **visible directly after the service comparison and before the credit panel**. It is not hidden inside an unrelated disclosure. The statement about participant consent and no mutual information access reads as part of the comparison context.

The adjacent credit panel exposes both the engagement-begins-within-14-days condition and the booking-alone exclusion, followed by once-per-group and additions qualifications. No qualifier is stranded in a collapsed region.

### Separation: pass

The opening is specific to separation: the headline, shared-life account context and potential pressure appear before the conversation action. The page retains the compact founder panel and first-visit jump link.

The existing H2, Make changes with their consequences in view, has a clear section boundary and its effects paragraph is now fully visible and readable. It is separate from the preceding disclosure, whose newly worded H2 is Choose which access you want to keep. The following full-hardening section has its own heading and visible separate-scope/purchase qualification. At 320px the title, paragraphs, founder panel and controls fit without collision or horizontal clipping.

The disclosure Choose which access you want to keep opens with keyboard Enter and shows a conspicuous focus outline. Its open body remains readable in the inspected mobile render.

### They Know: pass

The opening recognizes surfaced private information while retaining uncertainty about what another person has or how it reached them. It reads as a specific situation page within the same visual system.

Hardening beyond the first visit is a **separate H2 section after the complete Assessment panel and urgent-visit sentence/link**. Its benefit paragraph and separately agreed scope, price and purchase are visible together. The following limits section is distinct. This preserves the intended Assessment/full-service distinction visually as well as in the words.

At 768px, the headline wraps naturally, the text remains bounded and the menu adapts without leaving a broken desktop navigation row.

## Findings and remaining tradeoffs

No new fix-required finding.

Two earlier non-blocking observations persist:

1. **Long mobile Pricing reference page.** Observed: the current 390px full-page image is 7,743px tall. The visible initial-service explanation precedes the full-service comparison. Inference: a linear reader has considerable scrolling, while the early Full services link offers a direct route. Retain this approved sequence for presentation; shortening it would require a deliberate information tradeoff, not a defect fix.
2. **Show-all control scope could be clearer.** Observed: Home and Pricing retain a show-all control separated from some affected disclosures, with the existing instruction Open any heading for more despite static headings also being present. Inference: some readers may use individual plus controls more readily than the global control. Defer this inherited polish issue; do not silently revise approved wording or add navigation complexity.

The quieter supporting typography and longer explanatory passages are deliberate aspects of this service site. No new decorative components, invented proof or copy rewrites are recommended to satisfy a generic landing-page formula.

## Exact visual evidence

All current supplied files viewed under docs/four-page-copy-preview/:

- home-desktop.png; home-mobile.png; home-desktop-full.png; home-mobile-full.png; home-mobile-detail.png.
- pricing-desktop.png; pricing-mobile.png; pricing-desktop-full.png; pricing-mobile-full.png; pricing-mobile-detail.png.
- separation-desktop.png; separation-mobile.png; separation-desktop-full.png; separation-mobile-full.png; separation-mobile-detail.png.
- they-know-desktop.png; they-know-mobile.png; they-know-desktop-full.png; they-know-mobile-full.png; they-know-mobile-detail.png.

Independent live-render images viewed, temporary evidence:

- C:/Users/user/AppData/Local/Temp/toza-four-separation-320.png.
- C:/Users/user/AppData/Local/Temp/toza-four-they-768.png.
- C:/Users/user/AppData/Local/Temp/toza-four-separation-focus.png.

Only this report was written in the repository. No source, accepted copy, other report, PR, main branch or deployment was changed.
