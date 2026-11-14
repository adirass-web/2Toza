# Pricing redesign: proposed layout and copy

Status: owner approved the layout and visible copy. Owner then requested clearer expanded inclusions, Lucide icons, restrained motion and a minimal coherent CSS system. The additions below are proposed for review before publication.

## Intent and chosen approach

Make Pricing visually consistent with the approved Home and easy to scan. The owner chose protection comparison first, assessment and credit below, shorter proposed copy for review, and a short visible comparison with expandable full inclusions.

Approaches considered: a chronological conversation/assessment/protection explanation; protection-first comparison. The owner selected protection-first. Use Home's shared header, cool grey palette, typography, footer and fixed messaging controls. Use aligned, ruled comparison columns rather than the older cream/green cards. On phones, stack the same three options; no sideways table scrolling. Show all three with equal weight, without a recommended tier. Keep assessment information visible beneath the comparison. Remove the repeated stage-price strip and redundant callback actions. Preserve all old pricing anchors.

## Proposed visible copy

# Pricing

Choose protection for one person, two people or your household. Every price is fixed and agreed in writing before work begins. Prices include VAT.

| | Personal Shield | Personal Shield for Two | Inner Circle |
|---|---|---|---|
| Total price | ₪32,000 | ₪45,000 | ₪70,000 |
| For | One person | Two people | A household of up to four |
| Devices and accounts | Your phone, computer and accounts | Each person's phone, computer and accounts | Everyone's phones, computers and accounts, each kept private |
| Security keys | Two | Four | Eight |
| Follow-up | Follow-up visit and 60 days of answered questions | Follow-up visit and 60 days of answered questions | Follow-up visit, 60 days of answered questions and a review visit at twelve months |

The qualifying assessment fee is included in these prices. The credit terms are below.

Each column has a native disclosure labeled "Full inclusions". Use the revised expanded inclusions below, preserving the approved tier scope, home network, configured keys, follow-up timing and message channels. This is the concise comparison; the current content remains available in full. Shared engagement/method text remains available in a separate "How the work is delivered" disclosure, unchanged.

## Start with an assessment

### Private Exposure Assessment · ₪4,000

Half a day in person to establish your personal threat model, assess exposure, address urgent issues and set priorities. You keep a written exposure summary whether or not you continue.

### How the credit works

The ₪4,000 assessment fee counts in full toward protection whose work begins within 30 days of assessment completion. The assessment and protection are separate decisions.

## Larger households and ongoing care

Larger households, several residences or household staff: a fixed price agreed after the assessment, from ₪90,000.

After the 60 days, past clients can choose Annual Care, from ₪12,000 a year.

If you authorize it, Toza coordinates with your lawyer or family office.

Full scope and terms: Conditions.

## Start a private conversation

The first conversation is free and commits you to nothing. Contact Toza through WhatsApp or Signal.

## Implementation constraints and acceptance

- All displayed prices, durations and counts read existing facts data. Scope/details remain available and approved copy elsewhere is unchanged.
- Use Home's existing design primitives and assets; avoid global legacy stylesheet overrides. Give Pricing its own source/template while excluding its previous paginator output.
- Native disclosures work without JavaScript; all essential prices, audiences and credit conditions stay visible when closed. Print includes all details.
- Preserve legacy IDs, opening any containing disclosure for a linked fragment. Keep preview/production indexing and sitemap behavior.
- Verify copy and facts, price arithmetic/credit wording, expanded details, legacy fragments, keyboard and no-JS operation, responsive 320/390/768/1024/1440, Chromium axe, links and performance. Review before publishing the changed preview.


## Revised expanded inclusions — proposed copy

### Personal Shield — Full inclusions

Protection for one person, shaped around your risks.

- **Devices and accounts:** Your phone, computer and relevant accounts, covering up to three everyday devices within the agreed scope.
- **Home network:** Included in your protection work.
- **Security keys:** Two keys, configured and tested.
- **Follow-up:** A visit after about four weeks.
- **Questions:** Answers through WhatsApp or Signal for 60 days.

### Personal Shield for Two — Full inclusions

Protection for you and one other person.

- **Devices and accounts:** Each person's phone, computer and accounts.
- **Home network:** Included in your protection work.
- **Security keys:** Four keys.
- **Follow-up:** A follow-up visit.
- **Questions:** Answers through WhatsApp or Signal for 60 days.

### Inner Circle — Full inclusions

Protection for a household of up to four, with each person's information kept private.

- **Devices and accounts:** Each person's phones, computers and accounts.
- **Home network:** Included in your protection work.
- **Security keys:** Eight keys.
- **Follow-up:** A follow-up visit and a review visit at twelve months.
- **Questions:** Answers through WhatsApp or Signal for 60 days.

Shared note, visible outside disclosures: If you authorize it, Toza coordinates with your lawyer or family office. Assessment credit terms remain visible; do not imply unconditional inclusion or additional charges.

## Icons, motion and CSS — proposed implementation direction

- Use Lucide's official free line icons as static SVGs, beside labels, not a browser-loaded icon library. Preserve license/attribution. Keep existing WhatsApp and Signal brand glyphs. Generic Devices/Accounts/Network/Keys/Follow-up icons do not imply named app compatibility.
- Reuse Home components and native details/summary; use existing project Motion patterns only if chosen by owner. No new UI framework, animation engine, custom scrolling system or icon drawings.
- Calm one-time reveals for situations and tiers; opacity and a small vertical translation only. Nothing waits for animation to become readable or clickable. No animated prices, automatic carousels, pinned scenes or continuous effects. Reduced motion and no-JS stay static and complete.
- Suggest only feedback elsewhere: link underline/focus and disclosure chevron. Keep hero and long reading pages static for MVP.
- Consolidate shared palette, font, spacing, rules and focus/motion tokens. Avoid layering contradictory selectors; remove superseded Pricing-specific styles from its output. Maintain separate build boundaries while legacy pages remain. Measure generated CSS and JS before/after, list dependencies and imported icons; stay inside performance budgets.
