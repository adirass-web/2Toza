# Standalone pricing: HyperUI versus Preline

Assessed 15 November 2026. This comparison is about the [HyperUI pricing components](https://hyperui.dev/components/marketing/pricing/), not its [SaaS landing-page template](https://hyperui.dev/components/templates/saas-landing-page/). The latter explicitly says “Not a production-ready template” and requires real content, functionality, accessibility checks and testing. It includes a header, hero, stats, features and footer that Toza does not need replaced.

## Source comparison

| Criterion | HyperUI standalone | Preline free Pricing Card Grid |
| --- | --- | --- |
| Starting structure | Two examples: two-tier highlighted; three-tier with separate introduction/inclusions regions | Four tiers, highlighted Startup, billing switch and comparison section |
| Closest match to Toza | Three-tier example; fewer sample concepts to remove | Requires four-to-three adaptation and removal of subscription controls |
| Default responsiveness | Three-tier: one column, two at `sm`, three at `md`; two-tier example visually reorders highlighted plan at `sm` | One, two at `sm`, four at `lg` |
| Runtime | Static card markup; no package installation needed | Static card adaptation needs no Preline runtime or MCP |
| Accessibility work | Three-tier excluded features use aria-hidden red crosses without exclusion text; correct this before use. Keep source and visual order consistent in highlighted example | Verify exact selected markup; do not infer accessibility from vendor claims or extracted HTML. Toza's native disclosures and focus handling remain necessary |
| Commercial content | Monthly sample prices and placeholder CTA links | Subscription switch, sample prices and feature comparisons |
| License | MIT; retain copyright/permission notice | MIT plus Fair Use terms; preserve attribution and both notices |

Neither example supplies Toza's scope limits, household privacy wording, assessment credit, native disclosures, fixed-contact clearance or print expansion. Neither contains a ready-approved photography placement. These are integration requirements whichever source is used.

## Recommendation

For a fresh pricing implementation, HyperUI's **three-tier standalone component** is the simpler starting point. Its tier count and license fit better than the full Preline pricing example. The two-tier highlighted component is less suitable, and the SaaS template is outside this change's scope.

For the current local Toza candidate, keep the Preline-derived grid for review: it already adapts the structure to three fixed-price tiers, preserves approved content and passes the site checks. Switching vendor would still require the same Toza-specific integration and testing. HyperUI remains a credible plan B; no vendor switch was made during comparison.

The current grid stays single-column below 1280px and uses three columns above it, so longer service descriptions do not become narrow tablet columns. That is a Toza adaptation, not a claim that either vendor's default breakpoint is appropriate.

## Evidence and limits

HyperUI HTML inspected from official repository revision `b3941ba0e361bd827c27f462eaecbb04879bd20e`, `public/examples/marketing/pricing/1.html` and `2.html`; MIT license checked. The excluded-feature finding is visible in the source: hidden cross SVG followed only by the feature name under “What's included.”

Preline public HTML/source descriptions were retrieved from https://preline.co/blocks/marketing/pricing-cards/ and compared with the local implementation at `abd4f12`. Extracted pages are not always faithful raw HTML; local code and rendered checks determine Toza acceptance.

This comparison is source-based. HyperUI has not been rendered with Toza content, so no visual superiority or measured performance advantage is claimed. Current Preline-derived Toza verification and screenshots are recorded in `preline-integration.md`. No production deployment has occurred.
