# Direction A: copy provenance (owner approval list)

Rule: every visible text block is verbatim from `strategy/2a-message-architecture.md`, from `src/_data/contact.json` / `facts.json`, or is listed here. Everything not listed is verbatim. Prices and the 14-day window come from `facts.json`. Strings live in `src/_data/i18n/en.json` (shared components and UI) and in the page templates (page copy). Nothing is marked on the pages themselves.

Counts: 8 visible `[draft]` blocks (table A), 2 excerpts/paraphrases of 2a (table B), UI labels (table C), metadata and hidden strings (table D).

## A. [draft]: needs owner approval

| # | Page | Location | Exact text | Status |
|---|---|---|---|---|
| 1 | Pricing | H1 | Prices, published. | [draft] |
| 2 | Pricing | Below the price columns | Larger or different needs are quoted individually. | [draft] (2a names Bespoke but gives no copy) |
| 3 | Home | Price block H2 | Two prices, both including VAT. | [draft] (2a §4 block 5 has no heading) |
| 4 | Home | Specimen, "Remaining" | Shared family album, kept by choice | [draft] (entry style from Direction C; 2a §6.5 gives no example) |
| 5 | Home | Specimen, next step 1 | Move recovery to your own number | [draft] |
| 6 | Home | Specimen, next step 2 | Review location sharing | [draft] |
| 7 | Home | Specimen, next step 3 | Set up security keys | [draft] |
| 8 | Home | Stage 3 drawing, folder date | 15 Oct 2026 | [draft] illustration label (placeholder date, B's treatment) |

## B. Paraphrase or excerpt of 2a

| # | Page | Location | Exact text | Status |
|---|---|---|---|---|
| 9 | Home, Separation | Stage "Harden" line | Settings, accounts and recovery rebuilt around your risks. Two security keys supplied and configured. | Excerpt of 2a §6.4 (second half of the Harden line; first half is the separate "Hardening is Toza's own method…" support line) |
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
| Price tiers (Pricing) | from (before ₪42,000) |
| Hero captions | Dr. Lior Tabansky (name) |
| Specimen header | Practical summary · Private Exposure Assessment |
| Links | Professional profile ↗ · About Dr. Tabansky · How it works · Prices and conditions → · Questions about separation and privacy |

## D. Not visible (screen reader, alt, metadata)

| Where | Text | Status |
|---|---|---|
| Portrait alt, logo and home aria labels, "(opens in a new tab)", "Compare services", "Main", "Menu", "Footer", "Credential" | UI labels | UI label |
| Drawing alt texts | "A laptop, a phone and a one-page summary on a table" · "Two hardware security keys" · "A closed record folder with a dated label" | [draft] |
| Home title / description | Toza — Dr. Lior Tabansky / Private, in-person digital security for people whose private information could be used against them. | [draft] |
| Separation title / description | Separation and divorce — Toza / (hero subline, verbatim) | title: UI label |
| Pricing title / description | Pricing — Toza / Toza's prices, published. All prices include VAT. | [draft] |
| Root `/` page | Toza v2 preview | placeholder |

## E. Verbatim check (for reference)

Verbatim from 2a: all Home blocks 1, 2, 3, 4, 6 text; Separation hero, recognition list, sequence, stage situation line, attorney block; price lines (§6.1, split at the "·"); credit line (§6.1); credential line (§6.3); contact heading and reassurance line (§4, §6.2); stage lines for Assess and Verify, the caption and the method line (§6.4 and owner comment 8); the specimen label (§6.5); WhatsApp, Signal and Call me back labels (`contact.json`).
