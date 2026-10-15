# Integrated local visual QA

PASS on the final stable working `_site` build, 13 October 2026. This review uses fresh Chromium captures of the integrated Home and Business pages, rather than the planning prototypes. `capture-checks.json` completed at 09:18:42 UTC; `gallery-checks.json` also passes.

- All 11 accepted copy payloads and metadata match the pre-integration baseline. Rendered main text, ordered heading/paragraph/list blocks, link labels and targets, and rendered metadata are identical on all 11 pages.
- The other nine built HTML pages and generated templates are byte-identical, including Private Exposure Assessment. The 147 guarded existing copy, asset and runtime files are unchanged. The new refinement stylesheet is explicitly allowed and loads only on Home and Business.
- At 320, 390, 768 and 1440 pixels, Home's original primary pair retains exact measured geometry and styles. Both supporting paragraphs have 16px vertical padding and a 1px rule. Business retains the complete Assessment scope and summary, then the complete Personal Shield paragraph with its separate-price qualification; the group gap is 30px. At 320/390, both groups retain the original 288/350px text measure and 16/20px gutter.
- Actual keyboard checks pass for skip-to-main, contact CTA, visible channel focus, section anchors, internal navigation and Browser Back, mobile menu/Escape focus return, and the existing Home disclosure. The 390×667 contact controls remain reachable through ordinary scrolling. No channel message was sent.
- Print media retains the complete affected content. Reduced motion is respected. With JavaScript disabled, both refinements remain visible and native contact anchors work. No horizontal overflow, missing images, browser errors or failed requests occurred in the final focused run.

Fresh images were personally inspected: affected sections at all four widths, desktop/mobile openings, full mobile pages, short-phone contact/menu states, print targets, and the actual gallery overview. Assessment/Shield boundaries and qualifications remain legible; Home preserves the primary/supporting hierarchy. The independent art review is recorded separately in `INDEPENDENT-VISUAL-REVIEW.md`.

The four `before-*-target.png` images reuse recorded current-page captures from the approved planning review, with exact pre-integration built-hash lineage saved in `BASELINE.json`. Every `after-*` image is a fresh integrated working-page capture. Full-page images provide context; detailed target images provide readable evidence.

Open the checked local comparison gallery at <http://127.0.0.1:8798/_preview/>. All eight comparison images and linked opening/full/print/working pages load; keyboard controls and gallery widths 320/390/768/1440 pass. The helper binds only to loopback and was launched hidden (PID 52900).

An initial capture-helper failure came from a navigation wait that already matched the current URL, causing premature Back to abort the destination navigation. The helper now waits for the exact destination and its committed load before Back; the complete focused run passes. No site fix was required for this runner issue.

Scope: local Chromium, CSS-pixel viewports and emulated print/reduced motion. This is not Safari, physical-device, assistive-technology, native-print or customer validation. No rebuild, production-source edit, commit, push or deployment was performed by this reviewer. The separate existing build/runtime suites are documented in `LOCAL-GATES.md`.
