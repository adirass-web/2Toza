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

## Round 4 (owner, 15 Oct): Bespoke minimised
- Removed from Pricing table and stage strip: "Bespoke Private Protection", "Individually scoped", "Scope and price agreed with you individually.", strip label "Bespoke".
- New [draft], one quiet line under the two tiers: "Larger households, several locations or other needs: scope and price agreed with you individually." + link "Ask about it" (opens WhatsApp).

## pricing-v2 (16 Oct 2026): pricing proposal preview

Branch `design/pricing-v2`. Prices are a PROPOSAL (`facts.json` status "proposal", source `strategy/pricing/P7-new-pricing.md` + `P8-annual-care.md`), not the approved site prices. Amounts come from `facts.json` via the `ils` filter. No VAT label and no travel mention anywhere. Strings live in `en.json` (`price.*`, `ui.previewBar`) and the templates. "Verbatim" means verbatim from the named source.

| # | Page | Location | Exact text | Source |
|---|---|---|---|---|
| 1 | All pages | Slim top bar | Pricing proposal — preview for review | [draft] (owner brief) |
| 2 | Pricing | `<title>` / description | Pricing — Toza / Toza's fees. One first step, then the protection that fits your household. | [draft] (description derived from P7 lead) |
| 3 | Pricing | H1 | Fees | P7 §4.1 |
| 4 | Pricing | Lead | One first step, then the protection that fits your household. Each price is fixed and agreed in writing before work begins. | P7 §4.1 |
| 5 | Pricing | Method block | Every engagement is carried out by Dr. Lior Tabansky in person, at your home or office, with you present and in control of your credentials. Hardening is Toza's own method, developed from public guidance of government security agencies and security vendors. | P7 §4.2 |
| 6 | Pricing | First step band, name | Private Exposure Assessment, ₪4,000 | P7 §4.3 (em dash replaced by the card layout) |
| 7 | Pricing | First step band, tag | Start here | Existing owner-given UI label (round 3) |
| 8 | Pricing | First step band, lead line | Counts in full toward your protection if you continue within 30 days. | P7 §4.3 (30 from `facts.credit.windowDays`) |
| 9 | Pricing | First step band, body | A senior check-up of your digital life: half a day in person with Dr. Tabansky, urgent first aid on the spot, and a written exposure summary you keep whether or not you continue. | P7 §4.3 |
| 10 | Pricing | Tier 1 | Personal Shield, ₪32,000 / For one person. Your phone, computer, accounts and home network hardened around your risks. / Two security keys, configured and tested · A follow-up visit after about four weeks · Questions answered by WhatsApp or Signal for 60 days | P7 §4.4 |
| 11 | Pricing | Tier 2 | Personal Shield for Two, ₪45,000 / For you and one other person. / Each person's phone, computer and accounts · Your home network · four security keys · Follow-up visit · 60 days of answered questions | P7 §4.4 |
| 12 | Pricing | Tier 3 | Inner Circle, ₪70,000 / For a household of up to four. / Everyone's phones, computers and accounts, each kept private · Your home network · eight security keys · Follow-up visit · 60 days of answered questions · review visit at twelve months | P7 §4.4 |
| 13 | Pricing | Under the tiers | The first step is included. If you authorise it, Dr. Tabansky coordinates with your lawyer or family office. | P7 §4.4 with the travel sentence removed (owner brief). Note: P7 spells "authorise"; the rest of the site uses "authorization". Left verbatim, owner to decide. |
| 14 | Pricing | Larger households line | Larger households, several residences or household staff: one fixed price, set out after the first step, from ₪90,000. | P7 §4.5 |
| 15 | Pricing | Annual Care line | After the 60 days: Annual Care for past clients, from ₪12,000 a year. | P8 §5 site line |
| 16 | Pricing | Link after Annual Care line and in first step band | Conditions → | P7 §4.8 / P8 §5 (target `#`, page not built) |
| 17 | Pricing, Home, Separation | Price strip | First step ₪4,000 (Assess) · Personal Shield ₪32,000 · for Two ₪45,000 · Inner Circle ₪70,000 (Harden + Verify) | [draft] short labels, amounts per owner brief |
| 18 | Home, Separation | Price block, left | Start here / First step / ₪4,000 / Counts in full toward your protection within 30 days. | P7 Home block wording, split into columns; "Start here" existing label |
| 19 | Home, Separation | Price block, right | Personal Shield / ₪32,000 / Fixed and agreed in writing before any work, first step included. | P7 Home block wording + "first step included" (owner brief) |
| 20 | Home, Separation | Price block link | All protection tiers → | Existing owner-given label (round 3); P7 says "All fees →", owner brief kept "All protection tiers" |

Removed from the previous pricing copy: "Prices, published." H1, the "Prices and conditions" link, the four-hour and device bullets of the first step card, the Personal Shield and Inner Circle bullets, the bespoke line and its "Ask about it" link, the old credit line (14 days), the Bespoke wording of Round 4.

Not shown, therefore not in `facts.json`: balances (₪28,000, ₪41,000, ₪66,000) and urgent surcharges (₪4,800, ₪6,000); P7 §4.7 urgent line is not on the page (not in the brief).

Known copy inconsistencies outside this change (stage blocks on Home and Separation, unchanged): "Two security keys supplied and configured" (Harden) is true for Personal Shield only; "Typically four hours" (Assess) vs "half a day" in the band.

### pricing-v2 consistency edits (16 Oct)
- "authorise" → "authorize" (site uses US spelling).
- Harden stage line: "Two security keys supplied and configured." → "Security keys supplied and configured." (key count now varies by tier: 2 / 4 / 8). [draft — owner to confirm]
