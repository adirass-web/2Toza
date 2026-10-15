# P2 Cost and value model, tier economics, price-test design

Workbook: `P2-cost-value-model.xlsx` (sheets Assumptions, Model, Sensitivity, Tier-economics; live formulas, edit the yellow cells). 2026-10-15. No final prices are recommended here. Prices are VAT-inclusive per `facts.json`. Items marked A are my placeholders for the owner to replace (section 4); only "typically 4h" and "7-14h" are site facts.

## 1. Assumptions block

| Parameter | Low | Typical | High |
|---|---|---|---|
| VAT (A, confirm) | 18% | 18% | 18% |
| FX ILS/USD (A) | 3.70 | 3.70 | 3.70 |
| Key list price USD | 58 | 64 | 70 |
| Landed factor, shipping/import (A) | 1.00 | 1.25 | 1.45 |
| Key cost ILS each (derived) | 215 | 296 | 375 |
| Router ILS, Inner Circle (A) | 400 | 800 | 1,500 |
| Delivery hours per month (A) | 90 | 120 | 140 |

**Key prices, public, Oct 2026:** YubiKey 5C NFC US$58.00 at [Staples](https://staples.com/yubico-yubikey-5c-nfc-usb-c-security-key-black-992-00014/product_IM1YS3294); [Yubico AU store](https://www.yubico.com/au/store/yubikey-5-series/) lists US$63.80 (incl. GST) for 5C NFC and 5 NFC, 71.50 for 5C, 74.80 for Nano models, 93.50 for 5Ci. Israeli importer price, duty and input-VAT recovery are not checked; hardware is treated as gross cost.

**Hours per engagement (A, except stated work), Low / Typical / High:**

| Component | Assessment | Shield | Inner Circle |
|---|---|---|---|
| On-site / configuration | 3.5 / 4 / 5 | 7 / 10.5 / 14 (stated) | 16 / 24 / 32 (2-4 days) |
| Travel | 1 / 2 / 3 | 2 / 4 / 6 | 4 / 6 / 10 |
| Preparation, kit | 0.5 / 0.75 / 1 | 1 / 2 / 3 | 3 / 5 / 8 |
| Write-up, handover | 1 / 1.5 / 2.5 | 1 / 2 / 3 | 3 / 5 / 8 |
| Support (Shield: 14 days) | 0.25 / 0.5 / 1 | 1 / 2 / 4 | 3 / 6 / 10 |
| **Total** | **6.25 / 8.75 / 12.5** | **12 / 20.5 / 30** | **29 / 46 / 68** |

Low = fewest hours and cheapest kit; High = worst case on both.

## 2. Cost and value model

Net revenue (price / 1.18): Assessment 3,051; Shield 11,864; Inner Circle from 35,593; urgent surcharge 4,068 (weekend 5,085).

| Offer | Net revenue | Hardware L/T/H | Net ILS/h after hardware, L / T / H | Contribution after hardware (T) |
|---|---|---|---|---|
| Assessment | 3,051 | 0 | 488 / 349 / 244 | 3,051 |
| Shield | 11,864 | 429 / 592 / 751 | 953 / 550 / 370 | 11,272 |
| Inner Circle (from) | 35,593 | 2,117 / 3,168 / 4,504 | 1,154 / 705 / 457 | 32,425 |

On these placeholders the Assessment is the lowest-yield hour, Inner Circle the highest, because 8 keys and 4 people multiply hours by 2.2x for a 3.0x price. Inner Circle yield is a floor case ("from") and sensitive to support and travel overruns.

**Assessment credit** (total cash equals the full-service price; Assessment hours are still worked). Net ILS/h after hardware:

| | Low | Typical | High |
|---|---|---|---|
| Shield path with credit (A+S: 18.25 / 29.25 / 42.5 h) | 627 | 385 | 261 |
| Same path without credit | 794 | 490 | 333 |
| Cost of credit | 167 | 104 | 72 |

The credit forgoes 3,051 net per converting client. Inner Circle path (A+I, 35 / 55 / 81 h): 950 / 592 / 386. Site copy says Shield hours exclude the Assessment, so no overlap saving is modelled; any real saving narrows the gap.

**Capacity** (engagement hours at typical; delivery hours 90 / 120 / 140 a month):

| Mix | Engagements per month | Net revenue ceiling per month |
|---|---|---|
| Assessments only | 10.3 / 13.7 / 16.0 | 31k / 42k / 49k |
| Shield standalone | 4.4 / 5.9 / 6.8 | 52k / 69k / 81k |
| Shield path, credited | 3.1 / 4.1 / 4.8 | 37k / 49k / 57k |
| Inner Circle standalone | 2.0 / 2.6 / 3.0 | 70k / 93k / 108k |
| Inner Circle path, credited | 1.6 / 2.2 / 2.6 | 59k / 78k / 91k |

**Sensitivity** (typical case, net ILS/h after hardware; full 5x5 grids in the workbook), one factor moved at a time:

| Offer | Hours -20% | Hours +20% | Price -20% | Price -10% | Price +10% | Price +20% |
|---|---|---|---|---|---|---|
| Assessment | 436 | 291 | 279 | 314 | 384 | 418 |
| Shield | 687 | 458 | 434 | 492 | 608 | 666 |
| Shield path, credited | 482 | 321 | 304 | 345 | 426 | 467 |
| Inner Circle | 881 | 587 | 550 | 628 | 782 | 860 |

## 3. Tier economics

| Check (gross ILS) | Value | Implication |
|---|---|---|
| Per person, Shield / Inner Circle | 14,000 / 10,500 (0.75x) | 25% group discount, kit and router included |
| Inner Circle / Shield total | 3.0x for 4x people, devices, keys | straight 4x would be 56,000 |
| Assessment as share of Shield / Inner Circle | 26% / 8.6% | credit is large for Shield, small for Inner Circle |
| Remaining after credit | 10,400 / 38,400 (9,600 per person) | |
| Urgent surcharge vs Assessment | 133% / 167% (weekend) | surcharge exceeds the product it accelerates |
| Hours ratio IC/Shield | 2.2x vs price 3.0x | source of the hourly uplift |

**Bespoke coherence.** Bespoke is coherent if it exceeds Inner Circle in scope (for example more than 4 people, several properties, business principals, 6-10 days) and yields at least the ladder's own hourly rate. Floor = total hours x net rate + hardware. Illustration: 6 delivery days (48 work h, overhead ratio 0.92 from Inner Circle typical, 92 hours total, 3,000 hardware):

| Rate basis (net ILS/h) | Floor net | Floor gross |
|---|---|---|
| Shield typical, 550 | 53,600 | 63,200 |
| Inner Circle typical, 705 | 67,900 | 80,100 |
| Owner target placeholder, 700 | 67,400 | 79,500 |

A floor at Inner Circle yield is about 80,000 gross for six days (1.9x Inner Circle from); below roughly 63,000 pays less per hour than Shield. Options: (1) "from" plus day-rate formula (about 10,800 net a day at Inner Circle yield, plus kit at cost); (2) fixed minimum of N days; (3) unpublished, quoted case by case. Trade-off: transparency and anchoring versus flexibility. Inner Circle needs a stated scope ceiling (people, devices), or enquiries will cluster just above it.

## 4. Owner inputs needed

1. Logged hours per engagement by component (time-log the next 5 Assessments and 3 Shields).
2. Typical travel time, visits per engagement, out-of-region work.
3. Target net hourly value or day rate; desired monthly income.
4. Key supplier: model, Israeli unit price, shipping, duty, input-VAT recovery, spares allowance.
5. Router model and cost; other consumables.
6. Monthly delivery capacity (days, sales and admin share, leave).
7. VAT confirmation (18%, prices stay VAT-inclusive).
8. Hours saved on Shield by a preceding Assessment.
9. Inner Circle support term and scope limits; fixed or "from".
10. Current funnel: enquiries, Assessments sold, 14-day conversion to full service.

## 5. Price-test design

### 5a. Interviews: 10-15 clients, 5-8 attorneys

Recruit via the owner's network and attorney introductions: people in or after separation, business or inheritance disputes; family, commercial and estate attorneys. No incentives. 25-30 minutes, notes only, no personal data. Rotate tier-card order. Ask Van Westendorp before showing any price.

**Script.** Show a description card per tier (scope, hours, in-person, exclusions; no price).
*Opening:* "I am testing how people value a private, in-person digital security service. There are no right answers and I am not selling."

*Van Westendorp (per tier: Assessment, Shield, Inner Circle; attorneys answer for a typical client; ILS incl. VAT):*
1. At what price would this be so cheap that you would doubt its quality?
2. At what price is it a bargain, a great buy for the money?
3. At what price does it start to feel expensive, though you might still consider it?
4. At what price is it too expensive to consider at all?

*Gabor-Granger (per tier; random starting point on the ladder, then step up after "yes", down after "no"):* "Would you buy the [tier] at [price]? Definitely, probably, probably not, definitely not." Ladders (illustrative): Assessment 2,400 / 3,000 / 3,600 / 4,200 / 4,800; Shield 9,000 / 11,500 / 14,000 / 16,500 / 19,000; Inner Circle for four people 28,000 / 35,000 / 42,000 / 49,000 / 56,000. Weight definitely 100%, probably 50%.

*Ladder and credit:* "If the Assessment fee were credited when you start a full service within 14 days, does that change your view?" "Which is the right first step, and why?" "What would make you choose the group tier over four Shields?"

*Attorneys:* "What would your client comfortably pay on your recommendation?" "What would worry you about recommending it at these prices?"

*Bespoke:* describe a larger case (more than 4 people, several properties) and ask the four Van Westendorp questions.

Analysis: Van Westendorp cut-points with bootstrap ranges; Gabor-Granger acceptance and revenue-per-enquiry curves; report counts with shares. At n=10-15 thresholds are indicative only (roughly plus or minus 10-15%).

### 5b. Later on-site test, first-party only

Two variants at most (for example Assessment credit shown above versus below the tiers, or Inner Circle shown per person). Assign by first-party randomisation; log only variant plus clicks on WhatsApp, Signal and call-back buttons to a first-party endpoint. No third-party trackers or fingerprinting; update the privacy notice; keep no personal data in logs.

Sample-size realism: at a 2% visit-to-contact rate, detecting 3% (alpha 0.05, power 0.8) needs about 3,800 visitors per variant; 2% to 4% needs about 1,150. At 300-500 visitors a month, only effects of about 2x are detectable in under a year. So: test presentation, not price level; use contact-click rate, not sales; read results as directional. Varying prices on-site is not advised (untestable at this traffic, and a trust risk).

### 5c. Decision criteria (set before data)

| Signal | Supports holding | Supports review |
|---|---|---|
| Gabor-Granger at current price | weighted acceptance 50% or more | below 30%, or above 70% at +20% |
| Van Westendorp | price between marginal cheapness and optimal point | above marginal expensiveness in 2 or more segments |
| Attorneys | most call it "serious but justifiable" | most say clients balk, or would pay clearly more |
| Economics | net rate at or above owner target, using logged hours | below target |
| Credit | 14-day conversion 25% or more | below 15% |

No change on fewer than 10 usable interviews; a move beyond 10% needs the signal in both client and attorney samples plus the economics check. Changes to `facts.json` only on owner decision.
