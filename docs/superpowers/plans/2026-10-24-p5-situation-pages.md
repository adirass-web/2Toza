# P5 Situation Pages Implementation Plan

> Use Superpowers subagent-driven development with SOL coordinating scoped LUNA experts. Follow the faster workflow in the roadmap plan.

**Goal:** Apply the approved photo/grid design to the four existing situation pages, preserving their complete content and keeping accepted Home behavior intact.

**Base:** P4 squash merge `18e1941be773b05b4643e417b8637f98e89148e9` on `build/g`. P4 preview was explicitly approved by the owner; post-merge CI is being checked. Reuse the existing isolated checkout on `codex/p5-situations` and its installed dependencies.

**Spec:** `docs/build-g/HANDOFF-toza-current.md` section 2, later owner decisions in `docs/decisions.md`, and the roadmap's faster workflow. Preserve copy/facts/tokens/photo files, logical CSS, 12-column desktop/4-column phone grid, 10 px gaps, 20 px margins, 25%/50% boxes, square corners and deliberate ground cells. Phones remain a plain stack. No new motion, tracking or dependency installation.

## Shared contract and ownership

- LUNA implementer owns four situation content files, `src/_includes/blocks/box/hero.njk`, new box variants for recognition/text/price-summary/compact stages, the compact-stage dispatch in existing box stages, `content/content-model.json`'s box allowlist, and block-contract documentation. All other pages and schemas keep their current semantics.
- Hero selection uses a finite page-key mapping to existing photo slots: separation-divorce → sit-1 (hangers), business-dispute → sit-2 (window), inheritance-conflict → sit-3 (parlour), they-know-something → sit-4 (stairwell). Preserve Home's existing hero branch and Home-only motion hooks. No new editorial image keys or semantic schema fields are needed.
- Existing resolved blocks, optional fields, markdown, nested price strip, stage drawings/alts, link anchors and facts stay present and in order. Add only `layout: box` presentation flags to the four content files; preserve existing actions and references. The shell and closing panel retain immediate contact access.
- Extend the existing box allowlist only for the necessary existing block types. Use the existing renderer; dispatch compact stages to a separate compact template without changing other variants. Keep the current 50% dark contact panel, 25% hand photograph and 25% dots.
- SOL owns the plan, current status/ownership records, verification harness and all Git/publication. One independent LUNA reviews the whole P5 diff once implementation is complete; fix findings before the single candidate push.

## Execution

- [x] Confirm post-merge P4 CI: Verify/deploy passed; WebKit focus timing failed and one retry timed out at 15s. Record the exception; P5 contains bounded test-settling/navigation fixes without a Home behavior change.
- [x] Implement the agreed presentation contract; all implementer edits are finished.
- [x] Run one focused local pass: build/static/content checks and a bounded Chromium situation-page check for matching loaded hero images, content/links, desktop grid, phone overflow/stack, light/dark appearance, keyboard contact/navigation, JS-off/reduced-motion completeness, and absence of Home motion hooks. Capture representative five-width/theme views in this pass; check shared hero isolation against Home.
- [x] Obtain one independent scope/compliance/code review; resolve findings and final screenshot timing before publication. Repeat affected local checks only if code changes or a real failure warrants it. Do not regenerate legacy visual baselines.
- [ ] Freeze, commit and push one reviewed candidate. Open one draft PR into `build/g`; run required CI once, consuming its verified archive for the noindex preview. A genuine failure may require a corrected candidate with its reason recorded.
- [ ] Verify source/build/base/hash provenance and run one bounded live preview check for the P5 changes and essential navigation/contact. Present immutable preview and evidence, with browser/manual exceptions stated.
- [ ] Wait for explicit owner visual approval before merging P5. Keep `main` and production unchanged and do not activate P6 before P5 acceptance.

## Known exceptions

Firefox remains a separate diagnostic lane. Manual screen-reader acceptance, unapproved legacy visual baselines and final photo-credit/resolution confirmation remain release checks; automated accessibility is not manual screen-reader acceptance. No production or DNS actions are in this phase.
