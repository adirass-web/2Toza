# Pricing redesign: proposed layout and copy

Status: awaiting owner approval. No product implementation or publication authorized by this draft alone.

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

Each column has a native disclosure labeled "Full inclusions". Keep the current approved tier scope and inclusions verbatim inside each disclosure, including the home network, configured keys, follow-up timing and message channels. This is the concise comparison; the current content remains available in full. Shared engagement/method text remains available in a separate "How the work is delivered" disclosure, unchanged.

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
