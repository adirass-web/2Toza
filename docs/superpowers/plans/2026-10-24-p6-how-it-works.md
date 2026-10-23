# P6 How It Works Implementation Plan

> Use Superpowers subagent-driven development with SOL coordinating scoped LUNA experts. Follow the approved faster workflow: finish implementation/review before one candidate push; repeat only for real findings.

**Goal:** Present the existing How it works content in the approved Aspen grid, with native desktop sticky stage boxes and complete plain phone reading order.

**Base:** Owner-approved P5 squash merge `10ae3ed80912dd01d8b133a893c0790cb9eb4254` on `build/g`. P5 post-merge CI is checked before publication. Reuse the current isolated checkout on `codex/p6-how-it-works` and installed dependencies.

**Spec:** Handoff section 2, latest decisions and owner instructions, and roadmap P6 acceptance. Preserve all copy/facts/links/drawings, Assess → Harden → Verify order and each stage's existing “You keep” result. Use existing typography/palette/tokens, 12-column desktop/4-column phone grid, 10px gap, 20px edge, square 25%/50% boxes and deliberate ground cells. No new images, content keys, JS motion, dependencies or production changes.

## Shared contract and ownership

- LUNA implementer owns `src/content/en/how-it-works.md` (presentation flags only), new box templates for typographic hero, steps and offer, the minimal How-it-works-only dispatch in box hero, the box allowlist for existing steps/offer types, and block documentation. Keep Home and all four photo-hero branches unchanged.
- The opening is typographic, with no hero photograph. Global header/mobile/closing contacts remain immediate and plain. Preserve all existing hero content/action metadata; no copied or invented editorial text.
- Steps consume the existing resolved `block.items` and `keep_label`. Use semantic ordered list rows, one native sticky stage/drawing box beside its explanation/result on desktop, confined by that row. Use 25%/50% widths and natural content height; avoid invented scroll runway. All three drawings/alts, statements, stage headings/body, dated-record detail and “You keep” text remain present in source order. Body text is at least 17px; label/decorative text may use the existing smaller tokens.
- Phones stay static and stacked. Reduced motion and print remain complete, with static stage cards. Use CSS native sticky only; no new JS or overflow-clipping ancestors. Use existing theme-aware surface/text pairs consistently.
- The assessment offer uses the existing resolved facts/content in a 50% mint box; reuse existing box tiers and closing contact. Preserve all notes, static prices, links and tier order.
- LUNA verification worker owns one bounded P6 local/live browser gate, its npm script and minimal Chromium/WebKit CI wiring/evidence retention. Reuse existing verified-artifact/container/Bash/Node packaging; do not redesign CI. Use Node-side font polling from the start, including JS-off pages, with an explicit bound.
- SOL owns plans/status, Git and publication. One independent LUNA reviews the complete diff before push. Workers must explicitly confirm edits complete; fix findings locally, then freeze the candidate.

## Execution

- [x] P5 post-merge run `40030892510` passed Verify, WebKit and deployment on merge `10ae3ed`.
- [x] Implement the scoped presentation contract; implementation and verification edits are complete.
- [x] Run one focused local pass: build/static/content parity checks and P6 browser behavior. Check actual theme activation, five widths, phone/short-height wrapping and overflow, Assess/Harden/Verify and all three “You keep” results, real sticky movement/bounds, keyboard/contact, JS-off/reduced-motion/print completeness, and no Home motion hooks. Capture hero/stages/offer and representative full-page views in the same pass.
- [x] Independent LUNA whole-diff review completed with no open findings before push. Re-run only affected checks for real changes; do not regenerate legacy visual baselines.
- [ ] Commit/push the reviewed candidate once; open a draft PR into `build/g`; required CI validates Home, situations and P6 in Chromium/WebKit plus existing content/a11y/performance/anchor gates.
- [ ] Verify archive/source/base/build/hash identity, consume the exact verified artifact and run one public P6 check using the same driver. Present the immutable tested preview and evidence.
- [ ] Wait for explicit owner visual approval before P6 merge or P7 activation. Keep main/production unchanged.

**Known release checks:** Firefox stays in its separate diagnostic lane; manual screen reader, legacy visual baseline approval and final photo credits/resolution remain open. Automated checks are not manual screen-reader validation.
