# P3 — Product architecture and tier design, Toza v2

15 Oct 2026. Bound by BRIEF.md (R-1, R-2) and the owner direction. Inputs: llms baseline, `facts.json`, approved `pricing.html`, 2a, P1, P2, 1b. Revised after independent review P3z (see end).

**Frameworks used:** value-metric test; good-better-best with the entry step outside the tier set; tier fences; entry-to-core ladder (commitment and consistency, credit as bridge); anchoring and asymmetric dominance from real prices; round premium pricing; Hormozi value equation (top tier); Van Westendorp and Gabor-Granger.

Any change to a price, name or inclusion is marked **[Owner decision required]**; everything else presents existing facts. Figures stay VAT-inclusive, unlabelled.

---

## 1. Diagnosis of the current ladder

**What is clear**
- Published round prices (₪3,600, ₪14,000), rare in the category (P1) and right for the register.
- The Assessment stands alone with a practical summary: low-risk first step without discounting.
- The credit makes the first step a bridge, not a sunk cost.
- No subscription, unlike BlackCloak/Aprivé (P1).

**What confuses**
1. **Four value metrics at once.** Assessment: hours and devices. Shield: person, devices, keys, hours (7–14). Inner Circle: people, devices, keys, network, days (2–4). Bespoke: situation. The reader cannot tell what the price follows. Hours are the riskiest: Israeli cyber freelancers charge ₪320–520/h (P1), so an hour count invites division.
2. **The household gap.** Between one person (₪14,000) and four plus network (from ₪42,000) there is no published route for a couple or parent and child. "Extra people quoted individually" is accurate, but the likeliest second buyer meets no price.
3. **"From ₪42,000" without a visible ceiling**: what moves it up is not stated (P2: enquiries will cluster above it).
4. **Two Bespoke triggers mixed**: scale and situation, neither stated on the tier.
5. **Name drift.** "Inner Circle" and "Inner Circle Shield" are used interchangeably.
6. **Uneven credit weight**: 26% of Shield, 8.6% of Inner Circle (P2); as a headline benefit it oversells for groups.
7. **Assessment sits in the tier area** on the approved page; the owner rules it a step.

**Muddled metric, in one line:** the price actually scales with **people protected**, each group having a pooled device and key allowance; time is a scope description, not the metric.

---

## 2. Recommended architecture: one first step, three protection tiers

**Value metric: people protected.** Allowances stay pooled as in the fact base (Shield: two devices, two keys; Inner Circle: eight devices, eight keys for four people). A per-person allowance ("two each") would be a new restriction and is **[Owner decision required]**; it would fail, for example, a parent with three devices and a child with one. Time is shown in working days for every tier, hours move to Conditions. Test passed: one more person protected is more value to the client; one more hour is not.

**Fences (what makes you move up)** — all three are **[Owner decision required]**; the fact base today says only that extra people, devices, network work and locations are quoted individually.
- **F1 Personal Shield → household route: a second person.** Counts people only. The home network for one person stays a scoped add-on to Personal Shield (fact: "network work for Personal Shield is separately scoped"), so it is not a fence.
- **F2 Inner Circle → Bespoke: more than four people.** Alternative: keep adding people to Inner Circle by quote (current fact).
- **F3 Inner Circle → Bespoke: more than one location or network.** Alternative: quote additional locations as Inner Circle extras (current fact).
- The fact-based trigger leads Bespoke regardless of size: **a situation that requires different work** ("severe, unusual or highly complex").

### First step — Private Exposure Assessment

| | |
|---|---|
| Name | Keep. It is the approved term and describes what happens. |
| Who | Everyone; always the first paid step. |
| Metric | One visit for the initial client. |
| Inclusions (facts) | Typically four hours; one main phone and one PC, iPad or second phone on the same main account, be it Apple or Android, with access; personal threat model and risk assessment; approved urgent first aid where safely possible, including removing a malicious app or profile; practical summary and next steps whether or not you continue. |
| Price | Exact: **₪3,600**. |
| Presentation | Own band above the tiers, "First step", never a column. |
| Positioning | *First, a clear picture of what can reach you.* |

### Tier 1 — Personal Shield

| | |
|---|---|
| Name | Keep. |
| Who | One person whose own devices and accounts are the exposure, in any situation or proactively. |
| Metric | One person. |
| Inclusions (facts) | Two devices; two security keys supplied, configured and tested; hardening of devices, identities, accounts, apps and access; essential migration; OpSec teaching; verification; private dated record; 14 days of adjustment support; one primary working day and a second if needed. |
| Add-on | Home network: scoped separately (fact). |
| Price | Exact: **₪14,000**. |
| Positioning | *Your phone, computer and accounts hardened around your risks, with you, in person.* |

### Tier 2 — Inner Circle

| | |
|---|---|
| Name | Keep; use **one** name everywhere. **[Owner decision required]** "Inner Circle" (recommended) or "Inner Circle Shield" (current formal name, once in Conditions). |
| Who | A household of up to four sharing a home network: proactive families (1b persona P5), or disputes where relatives share access. |
| Metric | Four people plus one shared network. |
| Inclusions (facts) | Eight personal devices; eight keys; one shared home or home-office network and router; private dated record per person and a separate network record; 14 days of support for all four from group completion; typically 2–4 working days. Group membership gives no access to one another's information. |
| Extras (fact) | Extra people, devices or locations are quoted before work begins (unless F2/F3 are adopted). |
| Price | "From **₪42,000**", with the line "for four people and the home network". No per-person figure shown (P1). |
| Positioning | *The same standard of protection for the people you live with, and the network you share.* |

**Household add-on.** **[Owner decision required]** Close the couple gap with a published additional-person price on Personal Shield, tested in the range **₪11,500–12,500, working figure ₪12,000**: two people ₪26,000, three ₪38,000; Inner Circle then adds a fourth person and the network for ₪4,000 more.
- Not ₪10,500: that equals Inner Circle's per-person price (which is not to be shown) and leaves Inner Circle only "network plus a fourth person for ₪7,000".
- Yield on P2 placeholders, ~14.5 h per extra person with shared travel (reviewer's placeholder): ₪10,500 ≈ ₪570 net/h, barely above Shield's ₪550; ₪12,000 ≈ ₪660.
- Extra-person inclusions (devices, keys, record, support) are owner decisions. Cannibalisation risk: moderate. Fallback: "quoted individually".

### Tier 3 — Bespoke Private Protection

| | |
|---|---|
| Name | Keep (fact base). "Private Office" or "Family Office Protection" narrow it to one segment. |
| Who | Situations requiring different work (fact); if F2/F3 are adopted, also larger families and several residences. |
| Metric | Scoped engagement, agreed in writing after the Assessment. |
| Facts it already carries | Scope and price agreed after the initial visit; credit applies; extra people, devices, network work and vehicle access reviews quoted individually. |
| Proposed inclusions **[Owner decision required]** | (a) Everything in Inner Circle for each agreed person; (b) more than one network or residence; (c) vehicle access review included rather than extra; (d) coordination of timing with the client's attorney or family office, with the attorney-friendly summary (exists on the Separation page) where authorized; (e) one Annual Shield Review included. (b) and (d) give Bespoke its reason to exist; (c) and (e) need costing first. |
| Why | Value equation: raise perceived likelihood (one adviser across the agreed circle) and cut effort (one scope, schedule, record set). Without (b) and (d) it reads as "Inner Circle, bigger". |
| Price | **Recommended now: "Individually scoped", no figure.** |
| Positioning | *For larger families and complex affairs: one adviser and one agreed scope, for the people and places you agree.* |

**"From" figure — later, not now.** P2's six-day floor is about ₪63,200 gross at Shield yield, ₪80,100 at Inner Circle yield (1.9x Inner Circle). The floor rests on placeholder hours, and "from ₪42,000" already anchors. **Rule [Owner decision required]:** after 5 Assessments and 3 Shields are time-logged, publish "from" at the logged Inner Circle-yield floor rounded to the nearest ₪10,000 and never more than 5% below it (₪80,100 → ₪80,000 on current placeholders). No interview test of this figure (too few larger households to read).

### Price presentation summary

| Offer | Display |
|---|---|
| Assessment | ₪3,600 (exact) |
| Personal Shield | ₪14,000 (exact) |
| Inner Circle | From ₪42,000 (four people and the home network) |
| Bespoke | Individually scoped |

Order: First step band, Personal Shield, Inner Circle (visible anchor, P1), Bespoke. Home keeps two prices (BRIEF; decisions.md V-007).

**Alternatives considered:** a per-person ladder without Inner Circle, and a single published tier with Inner Circle merged into Bespoke. Both are excluded by the owner's three-tier direction.

---

## 3. Messaging

### Tier one-liners (2a voice: plain, calm, one statement)

| Offer | Headline | Support line |
|---|---|---|
| First step | **First, a clear picture.** | Your threat model, your risks in order, and urgent first aid. You keep the practical summary whether or not you continue. |
| Personal Shield | **Protection built around your risks.** | Your phone, computer and accounts hardened with you, in person, with two security keys configured and tested. |
| Inner Circle | **The people you live with, and the network you share.** | Four people, each with private work and their own record, plus your home network. |
| Bespoke | **For larger families and complex affairs.** | Scope and price set out after the first visit, for your decision. |

### Shared line above the grid (method and constants)

> **Every protection tier:** one adviser, in person, with you present and in control of your credentials. Hardening is Toza's own method, developed from public guidance of government security agencies and security vendors. Changes are tested, you are taught to use them, and you receive a private dated record.

### Comparison grid (only dimensions that differ)

| | Personal Shield | Inner Circle | Bespoke |
|---|---|---|---|
| People | 1 | 4 | Set out in writing after the first visit (one merged cell across all rows) |
| Devices | 2 | 8 | ↑ |
| Security keys, configured and tested | 2 | 8 | ↑ |
| Home network and router | Scoped separately | 1 included | ↑ |
| In person | 1–2 working days | 2–4 working days | ↑ |
| Private dated record | One | One per person, plus network | ↑ |
| Adjustment support | 14 days | 14 days for all four | ↑ |
| Price | ₪14,000 | From ₪42,000 | Individually scoped |

"1–2 working days" restates "one primary working day and a second if needed". If Bespoke inclusions (b) and (d) are approved, name them in the merged cell.

### Assessment credit

Directly under the First step band, one sentence, no figure repeated:

> Your Assessment fee counts toward the protection you choose when it begins within 14 days of completion of the initial service. [Prices and conditions →]

Remaining amounts and conditions go to Conditions. Continuity, never a discount.

### VAT

No label beside any price. One sentence, "All prices include VAT.", on Conditions. Copy owner to update 2a §6.1 and §8.4 and llms.txt, which still say "including VAT".

### Below the grid (one line, facts)

> After a completed full service: Annual Shield Review and Priority Retainer, quoted individually.

---

## 4. Price-test plan (reduced, one-person feasible)

| # | What | Method | Decision rule (set before data) |
|---|---|---|---|
| T1 | Delivery economics | Time-log the next 5 Assessments and 3 Shields by component (P2 §4) | Confirms or replaces P2 placeholders; gates any Bespoke "from" figure and the add-on yield. |
| T2 | Acceptance of ₪3,600 and ₪14,000 | P2 interviews (10–15 clients, 5–8 attorneys): Van Westendorp on Assessment and Shield; Gabor-Granger on Shield (P2 ladder 9,000–19,000) | Hold if Shield weighted acceptance ≥50% at ₪14,000 and both prices sit inside the acceptable range. Review if <30%, or >70% still accept at ₪16,500. If ₪3,600 is above marginal expensiveness in two segments, fix presentation before price. |
| T3 | Household add-on | Same interviews: Gabor-Granger on a two-person card at ₪24,500 / ₪26,000 / ₪27,000 (add-on ₪10,500 / ₪12,000 / ₪13,000) | Directional only (expect 3–5 two-person households). Read together with T4. |
| T4 | Household demand | Owner counts past enquiries by household size, with what was quoted | Publish an add-on if two- and three-person enquiries are a recurring share and T3 shows no clear rejection at ₪12,000; otherwise keep "quoted individually". |
| T5 | Credit and window | 14-day conversion over 3–6 months of funnel data | Keep if ≥25%; 15–25% with timing complaints → consider 21 days; <15% → revisit the first-step offer, not price. |

**Reading results.** At n=10–15 Van Westendorp is indicative (±10–15%); its "optimal price point" marks acceptability, not revenue. Gabor-Granger: definitely 100%, probably 50%. No change on <10 interviews; a move >10% needs both samples plus T1. On-site tests: presentation only, directional.

---

## 5. Owner decisions (prioritised)

1. **Confirm the architecture.** First step band, three tiers, people as the metric, Bespoke unpriced, all current prices held. *Recommend confirm.*
2. **Fences.** (a) Second person: add-on or quote? (b) Network for one person: scoped add-on (recommended, matches the fact base)? (c) Inner Circle beyond four people or one location: extras by quote, or Bespoke? (d) Allowances: pooled (recommended, fact base) or per person? *Recommend add-on after T3/T4; network as add-on; extras by quote until T1; pooled.*
3. **Household add-on.** Test ₪12,000 (range ₪11,500–12,500) against ₪10,500 and set its inclusions, or keep "quoted individually". *Recommend test ₪12,000.*
4. **Names.** "Inner Circle" everywhere, formal name once in Conditions; keep "Bespoke Private Protection". *Recommend both.*
5. **Bespoke inclusions.** *Recommend approving (a), (b) and (d) now; cost (c) and (e) first.*
6. **Bespoke price display.** *Recommend scoped now; after T1, apply the corrected rule (nearest ₪10,000, never more than 5% below the logged floor).*
7. **Test programme.** Approve T1–T5 and supply P2 §4 inputs, starting with time logs and enquiry history.

**Presentation defaults (approve as one batch):** working days on Pricing, hours in Conditions; VAT sentence on Conditions, labels removed from 2a and llms.txt; credit detail on Conditions only; urgent surcharge unchanged.

### Owner inputs still needed

P2 §4 items 1–10 (logged hours, travel, target rate, key and router costs, capacity, VAT, Assessment overlap saving, Inner Circle limits, funnel data), plus past enquiries by household size and what was quoted (T4).

---

## Changes after review (P3z)

1. Alternatives B and C removed; one line notes they were considered and excluded by owner direction.
2. The three fences labelled [Owner decision required]; the Shield fence now counts people only, and the network for one person is a scoped add-on, resolving the "scoped separately" contradiction.
3. Allowances kept pooled ("8", not "two each"); per-person allowance labelled as an owner decision.
4. Household add-on changed from ₪10,500 to a tested range ₪11,500–12,500 (working figure ₪12,000), with the reviewer's yield and dominance reasoning.
5. H4 dropped; Bespoke rounding rule corrected so it yields ₪80,000 on current placeholders.
6. Copy: "honest" → "clear"; "rebuilt" → "hardened"; "people closest to you" → "people you live with"; "usual starting point" removed; "every person and place included" → "the people and places you agree"; Bespoke grid cells merged; "Yours" → "One".
7. Test plan reduced to T1–T5; decision list reduced to seven prioritised decisions plus one presentation batch.
8. Unexplained references P5 and V-007 now cited (1b persona; BRIEF and decisions.md).


## Owner update (15 Oct, after review)
Bespoke is removed from the pricing table (or minimised): the site shows the Assessment as the first step and two tiers, Personal Shield and Inner Circle, with one line under them for larger households, several locations or other needs (scope and price agreed individually). Where this document treats Bespoke as a displayed third tier, read it as this minimised line; its inclusions and any "from" figure remain internal options.
