# Pricing redesign: proposed layout and copy

Status: owner approved the layout and visible copy. Owner then requested clearer expanded inclusions, Lucide icons, restrained motion and a minimal coherent CSS system. Owner approved the revised inclusions and scoped CSS cleanup, plus restrained Motion patterns. Category-only visible wording and maximum available icons from the confirmed examples are required.

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

- Up to three everyday devices, with your relevant accounts and recovery routes.
- One home network and router.
- Two security keys, supplied, configured and tested.
- A follow-up visit after about four weeks.
- A private dated record of your work.
- 60 days of questions and guidance about the completed work.

### Personal Shield for Two — Full inclusions

Protection for you and one other person.

- Up to six everyday devices, shared within the tier, with each person's relevant accounts and recovery routes.
- One home network and router.
- Four security keys, supplied, configured and tested.
- A follow-up visit after about four weeks.
- A private dated record for each person.
- 60 days of questions and guidance about the completed work.

### Inner Circle — Full inclusions

Protection for a household of up to four, with each person's information kept private.

- Up to twelve everyday devices, shared within the tier, with each person's relevant accounts and recovery routes.
- One home network and router.
- Eight security keys, supplied, configured and tested.
- A follow-up visit after about four weeks, plus a review visit at twelve months.
- A private dated record for each person.
- 60 days of questions and guidance about the completed work.

### Shared scope and support — shown once below the comparison

Every option includes essential migration of identities, recovery routes and critical-service access where needed. Historical archives and bulk data migration are scoped separately.

Home-network work covers accessible settings and authorized administration; it is recorded separately. Replacement hardware, further connected devices and additional locations are quoted separately.

The 60-day question line starts when the protection work is complete. Toza answers through WhatsApp or Signal within one working day. New work is agreed and priced separately; urgent needs follow the urgent-visit terms.

If you authorize it, Toza coordinates with your lawyer or family office. Full scope and terms: Conditions.

Assessment credit terms remain visible. Device allowances, key counts and time periods must come from existing facts; do not imply unlimited support or unconditional assessment credit.

## Icons, motion and CSS — proposed implementation direction

- Use Lucide's official free line icons as static SVGs, beside labels, not a browser-loaded icon library. Preserve license/attribution. Keep existing WhatsApp and Signal brand glyphs. Generic Devices/Accounts/Network/Keys/Follow-up icons do not imply named app compatibility.
- Reuse Home components and native details/summary; use existing project Motion patterns only if chosen by owner. No new UI framework, animation engine, custom scrolling system or icon drawings.
- Calm one-time reveals for situations and tiers; opacity and a small vertical translation only. Nothing waits for animation to become readable or clickable. No animated prices, automatic carousels, pinned scenes or continuous effects. Reduced motion and no-JS stay static and complete.
- Suggest only feedback elsewhere: link underline/focus and disclosure chevron. Keep hero and long reading pages static for MVP.
- Consolidate shared palette, font, spacing, rules and focus/motion tokens. Avoid layering contradictory selectors; remove superseded Pricing-specific styles from its output. Maintain separate build boundaries while legacy pages remain. Measure generated CSS and JS before/after, list dependencies and imported icons; stay inside performance budgets.


## Final owner choices

- Expanded inclusions above are approved for preview publication.
- Visible service copy uses categories, not specific application names: Browsers; Email; Messaging; Social and dating; Password managers. Other widely used apps remain within the agreed device/account scope; protections depend on service capabilities.
- Use as many icons as possible from confirmed examples Chrome, Safari, Gmail, Outlook, WhatsApp, Instagram, Facebook, Tinder, LinkedIn, 1Password. Use available existing Simple Icons assets, monochrome, not custom-drawn brand marks. Installed set supplies eight; Outlook and LinkedIn are absent and must not be fabricated. Each icon needs an accessible name; category text remains visible.
- Lucide generic device/account/network/key/follow-up icons complement brand examples. Import only selected static licensed SVGs; no icon runtime or CDN.
- Scope of CSS consolidation: shared Home, Pricing and Situations elements first. No unrelated migration of other pages.
- Motion: existing free Motion patterns for one-time Home situation and Pricing tier reveals plus small hover/focus/disclosure feedback. All essential content visible without JS; reduced motion static; no animated prices or custom scrolling. Other suggested motion remains limited to feedback, leaving long reading pages and hero static.
