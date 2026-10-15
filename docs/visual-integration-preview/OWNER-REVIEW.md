# Owner preview: integrated Home and Business refinements

2026-10-13 · D-040 · local preview only

[Desktop/mobile comparison gallery](http://127.0.0.1:8798/_preview/) · [Home](http://127.0.0.1:8798/en/) · [Business](http://127.0.0.1:8798/en/business-dispute.html)

## What changed

- Business's Assessment label, fee, complete inspection/approved urgent-first-aid scope and independent summary share a pale panel. The entire Personal Shield paragraph follows on paper, separated by 30px and a thin rule; its separate-scope/price qualification remains attached and visible.
- Home's two supporting situation paragraphs have aligned secondary rows with 16px padding and thin rules. The primary Separation/Business pair, proactive invitation, original text roles and order remain intact.
- A small versioned stylesheet loads only on Home and Business. Existing fonts, palette, portrait, logo and scripts remain unchanged. Business retains its original 288px/350px text measures at 320px/390px.

All accepted wording, metadata and links remain unchanged. The other nine English HTML pages, including protected Assessment, retain exact baseline bytes.

## Evidence

`LOCAL-GATES.md`: reproducible build/verification, 56/56 existing browser tests, 4/4 focused regressions, 6/6 audit-policy tests and 78/78 local Pages checks. Audit policy retains the two documented upstream advisories.

`INDEPENDENT-SOURCE-REVIEW.md`: independent adversarial source, commercial-boundary and test review. `INDEPENDENT-VISUAL-REVIEW.md`: actual integrated desktop/mobile and narrow-width visual review. `capture-checks.json` and rendered QA report record fresh fidelity and interaction checks. Screenshots are from the generated working site; the before images have explicit baseline lineage.

This review cannot establish conversion gains or full accessibility certification. Chromium/local coverage and untested platforms are recorded in the reports. A local Pages gate is not a hosted deployment.

## Deployment plan

The separate plan is `projects/toza-en-editorial-revision/planning/2026-10-13-batch-abc-visual-deployment-plan.md`. It combines the approved A/B/C batch and these layouts in a new PR, preserves separate maintenance/PR #54, prepares an exact-branch noindex hosted preview and final-SHA gates, then requires batch publication authorization before GitHub merge and live verification.

Current main remains #55 at `6c525f8`. Draft maintenance PR #56 is separate and not automatically authorized for release. No push, new PR, merge, deployment or change to PR #54 is included in this local integration.
