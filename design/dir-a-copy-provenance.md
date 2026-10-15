# Direction A: copy provenance (owner approval list)

Rule: every visible text block is verbatim from `strategy/2a-message-architecture.md`, from `src/_data/contact.json` / `facts.json`, or is listed here. Everything not listed is verbatim. Prices and the 14-day window come from `facts.json`. Strings live in `src/_data/i18n/en.json` (shared components and UI) and in the page templates (page copy). Nothing is marked on the pages themselves.

Counts: 12 visible `[draft]` items (table A), 2 excerpts/paraphrases of 2a (table B), UI labels (table C), metadata and hidden strings (table D).

## A. [draft]: needs owner approval

| # | Page | Location | Exact text | Status |
|---|---|---|---|---|
| 1 | Pricing | H1 | Prices, published. | [draft] |
| 2 | Pricing | Bespoke tier, price | Individually scoped | [draft] (owner round 3 gave the wording; 2a has no Bespoke copy) |
| 3 | Pricing | Bespoke tier, line | Scope and price agreed with you individually. | [draft] (owner round 3) |
| 4 | Pricing | Bespoke tier, name | Bespoke Private Protection | [draft] (owner round 3) |
| 5 | Home | Specimen section heading | What you take home after the first visit. | [draft] (owner round 3) |
| 6 | Home | Specimen document title | Exposure summary | [draft] (owner round 3) |
| 7 | Home | Specimen, "Remaining" | Shared family album, kept by choice | [draft] |
| 8 | Home | Specimen, next step 1 | Move recovery to your own number | [draft] |
| 9 | Home | Specimen, next step 2 | Review location sharing | [draft] |
| 10 | Home | Specimen, next step 3 | Set up security keys | [draft] |
| 11 | Home | Stage 3 drawing folder date; specimen date line | 15 Oct 2026 | [draft] placeholder date |
| 12 | Home, Separation, Pricing | Price strip | Bespoke (last item of the protection band); "Harden + Verify" and "Assess" (phone captions) | [draft] short labels from owner's round 3 spec |

Removed in round 3: "Two prices, both including VAT." heading, every "including VAT" label, the "Larger or different needs are quoted individually." line, the credential line (World Bank / 11 countries), and the stages caption "Assess is the ₪3,600 first visit...". The meta description "All prices include VAT." is also gone.

## B. Paraphrase or excerpt of 2a

| # | Page | Location | Exact text | Status |
|---|---|---|---|---|
| 9 | Home, Separation | Stage "Harden" line | Settings, accounts and recovery rebuilt around your risks. Two security keys supplied and configured. | Excerpt of 2a §6.4 (second half of the Harden line) |
| 10 | Home | Specimen, "Reviewed" | Devices, accounts, recovery routes | 2a §6.5 "(devices, accounts, recovery routes)", capitalised |

Note for owner: 2a "Changes after review" item 5 says the Home subline "ends 'around your own circumstances'", but the §4 body still holds the older text. The build uses the §4 text: "Private conversations, finances and plans can become leverage over you. Dr. Lior Tabansky assesses and hardens your phone, computer and accounts with you, in person." Please confirm which wins.

## C. UI labels (not editorial copy)

| Where | Text |
|---|---|
| Header nav and menu | Situations · How it works · Pricing · FAQ |
| Header button | Message |
| Header menu button (aria) | Menu |
| Skip link (visible on focus) | Skip to content |
| Footer | Pricing · FAQ · For attorneys · Conditions · Privacy · Terms |
| Hero buttons | Message on WhatsApp · Signal (short for "Message on Signal") · Call me back |
| Contact block buttons | Message on WhatsApp · Message on Signal · Call me back |
| Price tiers and strip | from (before ₪42,000) · Start here (Step 1 label, owner-given) · All protection tiers → (link to /en/pricing/, owner-given) |
| Hero captions | Dr. Lior Tabansky (name) |
| Specimen letterhead | toza logo · Confidential (owner-given) · subtitle Private Exposure Assessment |
| Links | Professional profile ↗ · About Dr. Tabansky · How it works · Prices and conditions → · Questions about separation and privacy |

## D. Not visible (screen reader, alt, metadata)

| Where | Text | Status |
|---|---|---|
| Portrait alt, logo and home aria labels, "(opens in a new tab)", "Compare services", "Main", "Menu", "Footer", "Credential", "Prices" (aria label of the price block) | UI labels | UI label |
| Drawing alt texts | "A laptop, a phone and a one-page summary on a table" · "Two hardware security keys" · "A closed record folder with a dated label" | [draft] |
| Home title / description | Toza — Dr. Lior Tabansky / Private, in-person digital security for people whose private information could be used against them. | [draft] |
| Separation title / description | Separation and divorce — Toza / (hero subline, verbatim) | title: UI label |
| Pricing title / description | Pricing — Toza / Toza's prices, published. | [draft] |
| Root `/` page | Toza v2 preview | placeholder |

## E. Verbatim check (for reference)

Verbatim from 2a: all Home blocks 1, 2, 3, 4, 6 text; Separation hero, recognition list, sequence, stage situation line, attorney block; price lines (§6.1, split at the "·"); credit line (§6.1); the method line (§6.4, now used verbatim four times: Home blocks 3 and 4, Pricing above the tiers, stages block on Separation); contact heading and reassurance line (§4, §6.2); stage lines for Assess and Verify (§6.4); the specimen label (§6.5); WhatsApp, Signal and Call me back labels (`contact.json`).
