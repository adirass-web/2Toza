# Copy brief — remaining English pages (16 Oct 2026)

All decisions are approved (docs/decisions.md through V-032). Write exact, final English copy, block by block, ready to build.

## Sources (in this order of authority)
1. docs/decisions.md (V-001…V-032) and strategy/OWNER-BRIEF-01.md — approved.
2. src/_data/facts.json — all prices and numbers. Never write a ₪ amount that is not there.
3. strategy/pricing/P7-new-pricing.md §4 (site copy, inclusions, terms) and P8-annual-care.md (Annual Care terms, site line).
4. strategy/2a-message-architecture.md (page map §3, situation template §5, FAQ architecture §7, copy rules §8, method line §6.3, contact §6.2).
5. strategy/2b-referral-model.md (attorney page, flow; fee ₪600 on a paid first step per V-028; continuation fees ₪2,000 / ₪3,000 / ₪4,500 approved).
6. reference/llms.baseline.txt and the approved old pages under the `upstream-baseline` branch (`git show upstream-baseline:src/en/<page>.njk`) — service facts and good lines to reuse. Treat as fact; do not fact-check; no legal or risk assessment.
7. strategy/BRIEF.md — voice and banned phrases.

## Binding rules
- **R-2:** boundaries ("what Toza does not do") and warnings ("don't send details", "not invisible on your device") live **only in the FAQ** (group E and A). Never in heroes, bodies, CTAs, footers or Conditions.
- **No:** VAT labels (one plain sentence "All prices include VAT." is allowed on Conditions only), travel scope, World Bank credential line, press, testimonials, scarcity, discounts, time-limited offers.
- **Yes:** method line verbatim where it fits: "Hardening is Toza's own method, developed from public guidance of government security agencies and security vendors."; "Professional profile ↗" → cyberdrtabansky.com; founder named in every first screen.
- **Device scope** (V-031/W8): "one main phone and one computer, iPad or second phone, on the same main account (Apple or Android)".
- **First step** counts in full toward a tier started within 30 days; after day 30 the tier is charged at full price; moving up a tier = that tier's price less the ₪4,000 already paid, within the same 30 days.
- **Question line:** 60 days, WhatsApp or Signal, answered within one working day, questions and guidance only (not new work, not emergencies). After 60 days: Annual Care.
- **Contact:** WhatsApp / Signal / Call me back (data-driven; buttons only, no forms). Attorney page: "Discuss a referral".
- **Copy rules (2a §8):** one statement per screen; heading ≤10 words, support ≤40 words; page budgets: How it works ≤500 words, About ≤350, situation pages ≤400, FAQ answers ≤80 each, Conditions as needed but plain.
- **Provenance:** after each block, tag its source in brackets: [2a §x], [P7 §4], [P8], [2b §x], [baseline: page], or [new]. Every [new] line will be approved by the owner.

## Output format
Markdown, one H2 per page, then numbered blocks: block name → exact copy (H1/H2/body/list/CTA labels) → [source]. Include page title and meta description (≤155 chars) per page.
