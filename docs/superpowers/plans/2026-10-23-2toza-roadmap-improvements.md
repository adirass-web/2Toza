# 2Toza Roadmap Improvements Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Status:** Owner approved the revised plan and localized scrim on 23 October 2026. Sol coordinates scoped Luna experts. Continue P4 and present a tested preview before merging; later phases activate in the approved order. Merge and production cut-over remain subject to their separate owner approvals.

**Goal:** Finish the approved 2Toza design faithfully, make each remaining phase independently reviewable, and prevent tests or historical notes from overriding owner intent.

**Architecture:** Keep the existing Eleventy content/block system, shared tokens, Motion enhancement and verified-artifact preview pipeline. Retain one PR per website phase into `build/g`; prepare short execution plans at activation rather than speculative implementations of every future page.

**Tech Stack:** Eleventy 3, Nunjucks, Tailwind 4, Flowbite core for navigation, Motion 14.6.0, Playwright, GitHub Actions and Cloudflare Pages.

**Spec:** `docs/build-g/HANDOFF-toza-current.md` section 2; `docs/decisions.md` V-047–V-072; latest owner instructions in this chat; `docs/build-g/P4-MOTION-PLAN.md`. Historical status sections and earlier plans are context, not authority over later owner decisions.

## Global Constraints

- Preserve the Aspen grid: 12 columns, 10 px gap, 20 px margin; 25%/50% boxes; phones use 4 columns, plain stack, no sticky.
- Preserve approved copy, facts, photographs, typography, tokens and page order. No invented copy, tracking, paid licenses, or unauthorized file deletions.
- Photo overlap is explicitly permitted and must remain. The method statement must be readable within that composition.
- Remove additional circles and mint backing around channel icons. Keep original symbols, destinations, accessible names, focus indication and existing 48 px click targets.
- Keep the six approved P4 effects; no count-ups, carousel, loader, fullscreen image stack or new motion concept.
- Reduced motion and JS-off remain complete; header and contact access remain immediate.
- Keep P4 → P5 → P6 → P7 → P8 → P9 merge order. Owner visual approval is required before every chunk merge.
- Keep main and production unchanged before P10. The owner executes production/DNS cut-over. English launches before Hebrew/RTL in P11.
- Keep previews public and noindex. Firefox is deferred from P4 by the owner, not passed; its diagnosis is a separate lane.
- Preserve existing CI budgets: LCP ≤ 2.5 s with 20% CI tolerance, CLS ≤ 0.05, JS ≤ 60 KB gzip, page ≤ 1.2 MB. Reuse existing SHA/hash provenance and seven-day evidence retention.

## Review Focus

1. **Approved overlap versus unreadability:** photo overlap remains, while the complete method statement is legible through wrapping, scroll and theme changes. Owned by Task 2.
2. **Shared contact controls across contexts:** plain icons remain visible and keyboard usable in header, mobile bar and closing panel. Owned by Task 2 and future shared-component checks.
3. **Cross-page component reuse:** a new page variant must not change accepted Home content, photo mapping or shared interactions. Owned by Task 3.
4. **Preview versus release policy:** noindex preview bytes must not be mistaken for a validated indexable production release. Owned by Task 5.
5. **Hebrew expansion and direction:** layout, reading order and direction-sensitive motion must survive approved Hebrew content. Owned by Tasks 3 and 6.

## Current state and scope of this review

- Remote P4 PR #21 remains draft/unmerged at `c39767bdc41c4c0a646dbc952565ae1fb15db652`, based on accepted integration `a0021ab`.
- Its existing immutable preview is https://21aa5059.toza-v2.pages.dev/en/ . CI Verify, Home WebKit and deployment passed; this is the previously published candidate, not a preview of today's unpublished icon corrections.
- The mistaken containment change and tests forbidding photo overlap were removed. The approved localized scrim and plain-icon corrections are implemented locally; their corrected preview and final candidate checks are pending.
- P4 Home WebKit coverage is not sitewide WebKit approval. Manual screen-reader validation remains open. The 35 legacy snapshot mismatches remain unresolved; no baselines were regenerated.
- Future phases have an approved sequence and partial design requirements, not complete executable specifications. Older pricing-research phase numbers are not website delivery phase numbers.
- Two independent Luna reviews covered design/product acceptance and engineering/release dependencies; Sol checked their findings against the current sources.

## Prioritized amendments

| Priority | Change | Why |
|---|---|---|
| P1, before further P4 implementation | Record owner intent before writing a regression assertion. | The overlap was incorrectly classified as a defect and a test was written against the intended composition. |
| P1, P4 visual completion | Choose a legibility treatment that retains overlap; finish plain icons. | Green static/reduced-motion axe checks did not prove text readability over the animated photo. |
| P1, before P5 activation | Define the shared block/schema/photo contract and exclusive ownership. | The current box hero contains Home-specific image choices; future situation pages must not inherit them accidentally. |
| P1, for each phase | Add a short phase-specific execution contract and approval checklist. | A phase name and general CI gates are insufficient to authorize precise page changes. |
| P1, planned before P10 execution | Define preview/release indexing modes and separately validated artifacts. | Current HTML, headers and robots.txt all require noindex; the preview archive cannot be blindly promoted as an indexable release. |
| P2, throughout | Maintain one scoped status/exception ledger and keep diagnostics independent. | Historical cloud status and global browser claims obscure what is actually verified today. |

## Task 1: Align authoritative decisions and live status

**Files:** Modify `docs/decisions.md`, `docs/CURRENT.md`, `docs/build-g/P4-MOTION-PLAN.md`, `docs/build-g/WORKTREES.md`, and applicable current notes in `CLIENT-PREREQUISITES.md`. Add historical-status labels to `docs/cloudflare-plan.md` and `strategy/PLAN-review-and-content-system.md` where needed. Preserve the handoff itself.

**Interfaces:** Consumes latest owner instructions and actual PR/CI evidence. Produces one active source-precedence summary plus a per-scope acceptance/exception record.

- [x] Record overlap as approved, plain channel icons as required, and the selected readability treatment as a new approval decision.
- [x] Distinguish implementation authorization, passing checks, owner visual approval and merge. Never infer one from another.
- [x] Record browser coverage by page and candidate: P4 Home Chromium/WebKit passed; Firefox deferred for P4; screen reader outstanding.
- [x] Mark older runtime/base/PR snapshots historical without treating historical design notes as current instructions.
- [x] Mark the old analytics/redirect-logging instructions and older design/copy-system proposals as superseded where they conflict with the current no-tracking and approved component requirements.
- [x] Review the changed records against the PR head and latest chat before including them in the next P4 candidate.

## Task 2: Complete P4 visual corrections without changing the composition

**Files:** Modify `src/_includes/blocks/box/method-statement.njk`, `styles/main.css`, `src/_includes/logos.njk`, `src/_includes/blocks/box/contact.njk` and `scripts/check-home-motion.mjs` only as needed. Copy remains in its existing content sources.

**Interfaces:** Consumes unchanged method text, current photo/scroll behavior, existing color tokens and channel destinations. Produces readable overlapping text and plain accessible contact icons.

**Owner choice: A approved.**
- **A — recommended:** light on-photo type with a localized dark scrim covering the statement's full text area, feathered outside it. Keep the photograph and its overlap visible; reuse existing on-photo/scrim tokens.
- **B:** an opaque existing-token text plate within the approved grid. More visually solid, with simpler contrast verification.
- Removing/clipping the photograph, text shadows, new colors or a new layout concept are outside this correction.

- [x] Owner approved A: localized scrim; preserve photo overlap.
- [x] Add a readability regression for the selected contract. Inspect the statement over the overlapping photo in both themes at 390/768/1024/1440/1920, including forward/backward scroll and reduced motion. Propose a minimum 4.5:1 text/background target; use an opaque surface or conservative compositing proof plus rendered checks, not axe alone.
- [ ] Verify the regression fails for the current unreadable text-on-photo state, then implement only the approved foreground treatment.
- [x] Keep the authorized plain-icon changes; verify transparent borderless surrounds, unchanged symbols/names/hrefs, 48 px targets, visible keyboard focus and appropriate foreground colors in each shell context.
- [ ] Re-run focused Chromium/WebKit checks and required CI on the final candidate; inspect representative photos, method and contact states manually. Do not assert that the stage must never overlap the method.
- [ ] Present the immutable preview, exact source/built SHA, retained evidence and remaining manual gaps. Await owner visual approval before merge.

## Task 3: Establish the P5 shared-component handoff

**Files:** Read `content/CONTENT-MODEL.md`, `content/content-model.json`, `src/_includes/blocks/README.md`, `src/_layouts/blocks.njk`, `src/_includes/blocks/box/hero.njk` and `src/content/en/_shared.yaml`; update ownership/phase plan before editing shared code.

**Interfaces:** Consumes the existing validated block model and approved page content. Produces an explicit page-to-block/photo mapping and an exclusive shared-code owner.

- [ ] Map the four situation pages to approved content and photographs; identify existing reusable blocks and the smallest missing presentation variant.
- [ ] Define any required schema/presentation extension before page writers begin. Reuse existing contracts; do not invent a second content model or copy layer.
- [ ] Assign shared template/schema/style changes to one owner and page content/templates to scoped workers.
- [ ] Add cross-page checks for photo mapping, preserved copy/facts/anchors, keyboard/contact access and Home isolation.
- [ ] Add a representative long-text/RTL fixture when a shared component changes, without inventing translated production copy or moving Hebrew launch earlier.

## Task 4: Activate the remaining page phases with small plans

**Files:** Create one short plan per phase under `docs/superpowers/plans/` when activated; update `WORKTREES.md`. List exact touched paths from the accepted predecessor at that time.

**Interfaces:** Each plan consumes the accepted previous integration commit and existing block contracts; it produces one independently reviewable PR and immutable preview.

| Phase | Deliverable and source | Specific acceptance beyond shared CI |
|---|---|---|
| P5 | Four situation pages: `separation-divorce.md`, `business-dispute.md`, `inheritance-conflict.md`, `they-know-something.md` | Correct approved photo hero per page, recognition/sequence content intact, links/contact usable on phones and desktop; no Home motion leakage. |
| P6 | `how-it-works.md`, stage presentation | Assess/Harden/Verify remain in order; every stage has its approved “You keep” result; native sticky desktop and plain phone reading order; drawings only where approved. |
| P7 | `pricing.md`, relevant tier/assessment presentation | All amounts/durations resolve from facts.json; assessment and approved tiers intact; static prices, shared tier alignment and no recommended-tier badge. Do not reopen historical pricing research. |
| P8 | `attorneys.md`, `about.md`, colophon | About remains typographic, no portrait, one approved situation photo; founder/profile constraints preserved with existing legal-provider exception; approved credits/licensing; referral contact wording unchanged. |
| P9 | `faq.md`, `conditions.md` and existing details/print components | Native details, keyboard state, deep links and Conditions print remain usable; no lost linked anchors; any new UI text explicitly reviewed for provenance. |

- [ ] Before each phase, create its concrete file/ownership/test/approval plan from the accepted predecessor.
- [ ] Reference shared gates once; add only phase-specific behavior/visual/manual cases.
- [ ] Use red/green behavioral tests where the change needs them; do not create implementation-mirroring tests for simple reversible styling.
- [ ] Keep one PR per phase and the existing merge order. Separate page drafts are allowed only after shared interfaces are agreed.
- [ ] Require scope-appropriate independent review and owner visual approval before every merge.

## Task 5: Specify P10 release artifacts and owner cut-over

**Files:** Plan changes to `scripts/check-noindex.mjs`, `src/_includes/base.njk`, indexing/header/robots sources and a release runbook after the release policy is approved. Reuse the existing workflow provenance mechanism.

**Interfaces:** Consumes one approved English source SHA. Produces a noindex preview artifact and an independently validated release artifact from that same SHA, each with its own digest.

- [ ] Confirm intended production indexability and canonical domain with the owner; default proposal is indexable English production at approved cut-over, with previews remaining noindex.
- [ ] Define and test both build policies: preview must retain noindex at HTML/header/robots layers; release must satisfy the chosen indexing/canonical policy. Reject cross-contamination in either direction.
- [ ] Build and validate the release artifact before owner cut-over; retain its digest/provenance. Do not rebuild unverified content after approval or deploy the noindex preview archive blindly.
- [ ] Record both source-head and actual checkout SHA. Preview and release variants must use the same actual checkout; if the final main merge creates a different commit, prove source-tree equivalence or validate the new candidate again. Retain the release artifact for the owner-approved rollback window.
- [ ] Collect all-English-page WebKit/keyboard/reduced-motion/JS-off checks, manual screen-reader acceptance, owner-approved visual baselines, credits/photo-resolution decisions and the previously recorded counsel/accessibility confirmation.
- [ ] Recheck protected production environment/credentials, exact target project/domain, serialized deployment, previous deployment/rollback identity and retirement of the superseded VIP publisher.
- [ ] Deliver an owner-run checklist with abort/rollback conditions and live verification. No DNS action or production deployment occurs from this planning work.

## Task 6: Specify P11 Hebrew/RTL and ongoing evidence

**Files:** Future approved `src/content/he/` content, relevant shared templates, `scripts/home-motion.js` for direction-sensitive logic, and language/navigation metadata as the P11 plan defines.

**Interfaces:** Consumes approved English structure and owner-approved Hebrew copy; produces Hebrew pages with the same protected facts and usable bidirectional navigation.

- [ ] Keep Hebrew publication after English launch; do not silently reuse stale Hebrew text.
- [ ] Confirm each translated block and fact substitution, preserving the approved digits convention and content provenance.
- [ ] Test wrapping, mixed-direction labels/numbers/URLs, reading/focus order, contact controls and logical grid/scroll behavior.
- [ ] Review physical `clip-path`/translateX motion math explicitly; logical CSS alone does not establish RTL motion correctness.
- [ ] Revalidate both languages and owner previews, and record browser exceptions separately from passes.

## Self-review and approval decisions

Coverage checked: all P4–P11 phases have an owner outcome and exit condition; existing approved design/business facts are preserved; P4 visual approval is not assumed; Firefox deferral is scoped; P10 preview/release mismatch is addressed; P11 remains after English.

No exact future component APIs or translated strings are invented. Those belong in the short activation-time plans after predecessor review, not a speculative rewrite now.

**D1 — approved:** localized scrim/light type (A) for method readability while retaining photo overlap. The opaque plate alternative is not selected.

**D2 — approved:** roadmap/process amendments, keeping Sol coordination and scoped Luna implementation/review. This is not approval to merge P4 or release production.

**Still open for later gates:** manual screen-reader evidence, legacy baseline approval, production domain/indexing confirmation, release credentials/environment recheck, and approved Hebrew content.
