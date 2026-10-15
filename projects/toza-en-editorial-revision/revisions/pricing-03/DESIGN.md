# Pricing 03 layout and visual design

Review-only proposal. No accepted copy, production site, templates or PR #59 were changed by this design pass.

The source is `pricing.md`, SHA-256 `6ea8ed8951d2673048300b4dca3632c4ac23c97a3be73c0659bdb8f9ab299461`. The exact diagram labels come from `DIAGRAM-COPY.md`, whose current fingerprint is recorded in `preview/build-manifest.json`. The render adapter refuses changed Pricing or diagram source. This prototype preserves all 95 source text blocks in their original relative order and retains the title, description and social description. Diagram words are an additional, separately identifiable proposal; existing channel controls and footer come from the current accepted build.

## Purchase decision hierarchy

The hero leads with Personal Shield and the full ₪14,000 VAT-inclusive price, one person and two devices. The initial ₪3,600 payment and conditional remaining ₪10,400 appear together with the start-within-14-days and booking-alone conditions. The primary contact action follows that short explanation.

One native comparison table follows. Its two product columns have equal visual weight: Inner Circle offers the same individual protection standard for more people, rather than a stronger security tier. Full prices are the largest figures. The remaining-payment row has its own shaded band and keeps “eligible Assessment credit” in its row label; the exact complete qualifier sits immediately before the table, so a visitor jumping to the comparison sees the conditions before the balances. The twelve rows retain every device, network, mapping, teaching, key, timing, privacy-record and adjustment-support distinction.

Quiet line SVGs identify row subjects: people, phone plus alternate device, physical keys, network, time, accounts, protection and records. Icons are decorative and consistently stroked. Exact words and quantities remain the authoritative labels. The People cells include restrained one-versus-four person glyphs; larger quantities are left as explicit source words rather than repeated symbol walls. The device drawing is an orientation cue, not a restriction to a PC; the full phone/PC/iPad/second-phone allowance remains written beside it.

## Prospect journey and reference terms

The three-stage diagram shows conversation, paid Assessment, and tailored hardening. A distinct “Your decision” interval separates Assessment from hardening. Its exact nearby sentence explains written offer, explicit acceptance and payment, and states that the second purchase requires its own acceptance. It represents decisions, not a conversion probability or an obligation.

The exact journey headings label three native disclosures. The Assessment's exact ₪3,600/including-VAT/typically-four-hours lead stays visible inside its summary. Its independently useful risk-summary paragraph and safe-first-aid/outcome-completion paragraph remain visible directly after the technical-intake disclosure, preserving every source block in order. The detailed technical-intake paragraph can be expanded without making those essential outcomes contingent on opening it. Full credit, delivery method, additions, urgent service, follow-up and boundaries form six more native disclosures. Urgent terms have their own obvious standalone summary. No prices or core included scope are hidden in those reference disclosures.

The visible main path measures **745 whitespace-separated words**, including diagram labels and disclosure summaries, compared with 1,413 words in the complete main DOM. This is a browser measurement, not a claim that statutory or service terms have been deleted. The complete reference wording remains available, linkable, keyboard accessible and included when printing.

## Responsive and access design

At 1440px the page uses the existing 1120px measure, calm paper/ink/green palette and self-hosted Source Sans 3. At 390px and 320px the native table DOM is rendered as a full-width row-subject band above two equal product cells. The products remain side by side in every row, never one whole product followed by the other. This widens each product cell by roughly one third and permits 16px comparison text. Product headers remain visible and sticky while traversing the long mobile matrix. Every row retains native `th scope="row"` and each product header `scope="col"`; explicit `headers` attributes associate each cell with both its exact product and row label despite the CSS grid presentation.

This explicit page override is needed because the existing shared base converts mobile tables to cards and hides their headers. The override changes only `.pricing-03`; it does not alter the shared asset. At 320px the mobile comparison is necessarily dense. It preserves the full authoritative twelve-row scope rather than silently dropping distinctions. Its measured page height is 7,440px; desktop is 3,963px. Review comprehension on actual phones before accepting this density.

Native details work without JavaScript. A small local enhancement opens a details target when a source credit link is followed, and expands all references for print before restoring the previous open states. Contact actions are 48px high. Focus outlines, reduced-motion rules, duplicate-ID checks and horizontal-overflow checks are included. The canonical compact footer module is copied unchanged; the prototype's measured footer is about 130px desktop and 308–328px at the tested phone widths.

## Ownership and checks

`preview/pricing-03.css` owns Pricing hierarchy, matrix, journey, references and responsive behavior. Its named sections keep local review boundaries clear. `preview/assets/css/clear-practice.css` and `footer-compact.css` are exact current copies and remain shared identity/footer owners. No section-by-section stylesheet dependency graph was introduced. A component should move to a shared owner only when another actual page consumes it.

`preview/build.cjs` generates only the review prototype. `preview/check.cjs` checks all 95 source blocks in order, responsive table/grid presentation and product-header visibility, all twelve rows and explicit header associations, duplicate IDs, overflow, contact sizing, credit navigation including a repeated same-hash link, actual mobile sticky header position, native keyboard toggling and print expansion/restoration at 1440, 390 and 320px. Screenshots include full page, viewport, matrix and journey at each width. Independent review and owner approval remain separate from this designer's checks.

## What approval would and would not cover

Review the exact Pricing proposal, exact diagram microcopy and this rendering together. The prototype is not a production integration, a new service policy, a claim that more enquiries will occur, or authorization to publish PR #59. Home, Why Toza and the protected Assessment are outside this pass.
