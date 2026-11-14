# Pricing Redesign Implementation Plan

> For agentic workers: use superpowers:subagent-driven-development, with scoped task reviews and final verification.

**Goal:** Build the approved protection-first Pricing page in Home's design language, with clear expandable inclusions and minimal reusable styles.
**Architecture:** Reuse the approved header/footer/contact elements, Home design tokens, existing Eleventy content resolver and native disclosures. Keep commercial facts in facts.json. Add icons/motion only after pending owner choices resolve.
**Tech Stack:** Eleventy/Nunjucks, existing Tailwind/Flowbite build, native details; Lucide SVGs and Motion patterns subject to owner choice.
**Spec:** docs/superpowers/specs/2026-11-15-pricing-redesign.md

## Global constraints
- Approved visible copy/layout may be implemented. Newly drafted expanded copy must be reviewed before publication; keep existing inclusions until approval.
- Preserve commercial scope, credit qualification, legacy IDs, both build profiles and content elsewhere.
- Reuse existing elements. No new UI framework, icon runtime or custom animation engine.
- Measure output size; static accessible no-JS/reduced-motion behavior remains complete.

## Task 1: Approved Pricing structure
- [ ] Add Pricing route/template using shared Home header/footer/contact, token palette and typography. Exclude prior paginator output.
- [ ] Show three equal-weight ruled option columns, stacking on phones, then assessment/credit, ongoing care and conversation.
- [ ] Use approved visible copy and source all facts dynamically. Full inclusions use existing approved content temporarily; native details, print open, deep-link open.
- [ ] Preserve legacy pricing anchors; replace repeated stage strip/callback presentation.
- [ ] Add tests first for copy/facts/order/disclosures/anchors/indexing; update parity guards only for explicit replaced Pricing output.
- [ ] Verify both profiles, content parity, links, axe and responsive behavior; commit and scoped review.

## Task 2: Expanded inclusions, icons and shared CSS
- [ ] Apply reviewed inclusion copy after owner approval; include full scope without overstating applications.
- [ ] Use official licensed Lucide static SVGs only for chosen categories, alongside labels; retain existing brand glyphs.
- [ ] Consolidate chosen shared design tokens and component styles without unrequested site-wide redesign. Remove superseded page CSS and duplicate selectors in changed areas.
- [ ] Verify content and accessibility, measure generated CSS/JS sizes, review diff.

## Task 3: Restrained motion and preview
- [ ] Apply owner-chosen motion approach to situations and tiers. Reuse existing patterns; no custom scroll engine or animation of amounts.
- [ ] Verify no-JS and reduced-motion remain readable, keyboard/contact access immediate, no layout shift.
- [ ] Run both profiles, legacy anchors, browser/size/performance budgets and final review; publish verified noindex preview through existing pipeline.
