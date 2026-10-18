# Pages v2: How it works and Pricing, copy for approval (18 Oct 2026)

**For:** owner approval. **Branch:** `design/pages-v2`. **Spec:** `strategy/PAGES-pricing-howitworks-outline.md` (approved), with your later instruction: no stages section on How it works ("the idea itself" is wrong, "too much text", "visually thin"), so outline item 3 is dropped entirely.

**Rule used:** every fact, price and sentence of body text is reused word for word from approved copy (the site's pages, `_shared.yaml`, FAQ, Conditions). New wording is limited to headings, row labels and one label word ("Included"). Prices, day counts, key and device counts come from `facts.json`. The founder's name does not appear (V-045).

Legend: **NEW** = wording you have not approved yet. **existing** = approved wording reused verbatim (source given). **fragment** = an existing phrase used as a label.

## How it works (`/en/how-it-works/`)

Order: hero · the method · the first visit · what you keep · after the work · one price line · contact. Body copy: 330 words including the sample document (46) and the contact block (21); was 444.

| # | Location | Text | Status and source |
|---|---|---|---|
| — | Hero heading | Talk through your concerns. Then make the changes together. | existing (V12) |
| — | Hero lead | You do not have to work out what is wrong before you meet. Toza assesses your devices and accounts with you, hardens them around your risks and tests the changes. | existing (V13) |
| — | Hero promise line | In person · With you present · You control your credentials | existing (shared `promise`) |
| P1 | Method, heading (small label on ink) | The method. | **NEW** |
| — | Method, statement (large) | Hardening is Toza's own method, developed from public guidance of government security agencies and security vendors. | existing (shared `method`, V-009) |
| — | Method, point 1 | Toza carries out every engagement in person, at your home or office, with you present and in control of your credentials. | existing (shared `common.engagement_in_person`, V4) |
| — | Method, point 2 | Toza explains each material change and its effects before you approve it. | existing (How it works, Harden step; moved) |
| — | Method, point 3 | Changes tested and checked, and you are taught to use them. | existing (stages line Verify, first sentence) |
| P2 | First visit, heading | The first visit. | **NEW** (outline item 4 "What it is like on the day"; "first visit" because the half-day applies to the first step) |
| P3 | First visit, label | What happens | **NEW** label |
| — | First visit, text | Toza listens to your concerns, inspects the relevant devices, accounts and access, and explains what the findings mean for you. | existing (FAQ b1) |
| P4 | First visit, label | How long | **NEW** label |
| — | First visit, text | Allow half a day; it typically takes four hours. | existing (FAQ b2) |
| P5 | First visit, label | Before the visit | **NEW** label |
| — | First visit, text | Preparation instructions are sent directly. | existing (FAQ a4) |
| P6 | First visit, label | Your credentials | **NEW** label |
| — | First visit, text | You control your passwords, recovery codes and authentication throughout. You may need to sign in on your own devices during the work. | existing (FAQ d1) |
| P7 | What you keep, heading | What you keep. | **NEW** (replaces "What you take home after the first visit." on this page only; Home unchanged) |
| — | What you keep, item | Your phone, computer, accounts and home network, hardened around your risks. | existing (How it works, Harden "You keep") |
| — | What you keep, item | A private dated record of the work, one for each person. | existing (How it works, Verify "You keep") |
| — | What you keep, document | Sample exposure summary and its caption "Illustrative example. Your summary reflects your own circumstances." | existing (shared `specimen`, as on Home) |
| P8 | After the work, heading | After the work. | **NEW** |
| — | After the work | Every tier includes a follow-up visit after about four weeks. | existing (How it works, Verify step) |
| — | After the work | Every tier includes questions answered by WhatsApp or Signal within one working day, for 60 days. | existing (How it works, tiers note) |
| — | After the work | After the 60 days: Annual Care for past clients, from ₪12,000 a year. | existing (shared `offers.care`, P8) |
| — | Price line | First step · ₪4,000 · Counts in full toward your protection within 30 days. · Fees → | existing (labels, `offers.assessment.credit_short`, Pricing H1 as link label). Used instead of the outline's draft "The first step is ₪4,000 and counts toward protection within 30 days.", so no new sentence |
| — | Contact | Start with a private conversation. … | existing (shared `contact`) |
| — | Title / meta description | unchanged. The description still begins "Assess, Harden, Verify: …" | existing. **Your call:** keep, or replace when the stages redesign is settled |

### Removed from How it works
| # | What | Text |
|---|---|---|
| R1 | Stages-in-detail section (dark, three rows with drawings) | Heading "Three stages, one method."; lead "Each stage has its own result."; label "You keep"; "1 · Assess", "2 · Harden", "3 · Verify" with their headings and drawing alt texts; the record date on the Verify drawing |
| R2 | Assess text | "The first step starts with your situation: what changed, what concerns you, which accounts matter and who previously had legitimate access. Toza then examines how your devices, identities and accounts are connected, and what those connections allow." |
| R3 | Assess "You keep" | "A written exposure summary of what was reviewed, found and changed, what remains, and your next steps in order." (the sample document now shows this) |
| R4 | Harden text, first sentence | "The work can include closing unwanted access, strengthening sign-in and recovery, and changing sharing permissions." |
| R5 | Verify text, first two sentences | "Toza works with you on granting access, sharing information, signing in and recovering accounts. You learn how to use the changed arrangements in daily life." |
| R6 | First-step offer card | Heading "A senior check-up of your digital life."; "Start here"; "Private Exposure Assessment ₪4,000"; "Half a day in person, urgent first aid on the spot, and a written exposure summary you keep whether or not you continue."; "Covers one main phone and one computer, iPad or second phone, on the same main account (Apple or Android)."; "Urgent first aid with your approval, including removing a malicious app or profile where that can be done safely."; the credit line; "Conditions →" (all now on Pricing, FAQ or Conditions) |
| R7 | Tier list | Heading "Then the protection that fits your household." (moved to Pricing); Personal Shield ₪32,000 "For one person."; Personal Shield for Two ₪45,000 "For you and one other person."; Inner Circle ₪70,000 "For a household of up to four."; note "The first step is included. Each price is fixed and agreed in writing before work begins."; link "All protection tiers →" |

## Pricing (`/en/pricing/`)

Order: hero · first step (one row) · comparison table · larger households, Annual Care, payment · Conditions link · contact. Body copy: 287 words (was 291).

| # | Location | Text | Status and source |
|---|---|---|---|
| — | Hero | Fees · One first step, then the protection that fits your household. Each price is fixed and agreed in writing before work begins. | existing |
| — | First step row, label | First step | existing (shared label; replaces the "Start here" tag) |
| — | First step row | Private Exposure Assessment · ₪4,000 · Counts in full toward your protection if you continue within 30 days. · A senior check-up of your digital life: half a day in person, urgent first aid on the spot, and a written exposure summary you keep whether or not you continue. | existing (shared `offers.assessment`) |
| — | Table heading | Then the protection that fits your household. | existing (moved from How it works) |
| — | Table columns | Personal Shield ₪32,000 · Personal Shield for Two ₪45,000 · Inner Circle ₪70,000 | existing |
| P9 | Row label | Who it covers | **NEW** (outline wording) |
| — | Row cells | One person · You and one other person · A household of up to four | existing (Conditions price table, "For" column) |
| P10 | Row label | Everyday devices (up to three per person) | **NEW** label, from Conditions "Everyday devices (…): up to three per person" (number from facts) |
| — | Row cells | Three · Six · Twelve | existing (Conditions allowances; facts `devicesPerPerson` ×1, ×2, ×4) |
| P11 | Row label | Home network and router | fragment (Conditions "One home network and router") |
| P12 | Row cells | Included · Included · Included | **NEW** word ("Included") |
| — | Row label | Security keys, supplied, configured and tested | fragment (Conditions allowances) |
| — | Row cells | Two · Four · Eight | existing (facts `securityKeys`) |
| — | Row label / cells | Follow-up visit · After about four weeks (×3) | fragment ("A follow-up visit after about four weeks") |
| — | Row label / cells | Questions answered by WhatsApp or Signal · 60 days (×3) | fragment (Personal Shield inclusions; facts `questionLineDays`) |
| — | Row label | Review visit at twelve months | fragment (Inner Circle inclusions) |
| P13 | Row cells | — · — · Included | dash = not included; screen readers hear "Not included" (**NEW** interface string, P16); "Included" as P12 |
| — | Phones | The table becomes one panel per tier with the same row labels | same words |
| P14 | Section heading (screen readers only) | Larger households, Annual Care and payment | **NEW** |
| P15 | Label | Beyond Inner Circle | fragment (Conditions "Beyond Inner Circle, Toza sets one fixed price in writing.") |
| — | Text | Larger households, several residences or household staff: one fixed price, set out after the first step, from ₪90,000. | existing (shared `offers.larger`) |
| — | Label | Annual Care | existing (name) |
| — | Text | Past clients can continue with Annual Care: the question line on the same terms for twelve months, a check visit, setup of a new or replaced phone or computer, a replacement security key and an update to the dated record. ₪12,000 a year for one person, ₪15,000 for two, ₪20,000 for a household of up to four. | existing (FAQ g4 first sentence + Conditions Annual Care prices) |
| P17 | Label | How payment works | **NEW** (outline heading) |
| — | Text | If the service fits, you receive a written offer with the work, inclusions, exclusions, price, agreed additions and payment terms. No paid work starts before acceptance and receipt of payment. | existing (FAQ a4). The outline's "no sales or time-limited deals" is not in approved site copy (V-025 is a decision only), so it is not on the page |
| — | Link | All terms: Conditions → | existing (FAQ link label) |
| — | Contact | Start with a private conversation. … | existing |

Interface strings added to `src/_data/i18n/en.json`: **P16** `ui.notIncluded` "Not included" (screen readers only) and `ui.dash` "—" (glyph).

### Removed from Pricing
| # | What | Text |
|---|---|---|
| R8 | Price strip | Heading (screen readers) "Three stages and their prices."; "Assess · Harden · Verify"; band captions "Assess", "Harden + Verify"; "First step ₪4,000 · Personal Shield ₪32,000 · for Two ₪45,000 · Inner Circle ₪70,000" |
| R9 | Method paragraph | "Toza carries out every engagement in person, at your home or office, with you present and in control of your credentials. Hardening is Toza's own method, developed from public guidance of government security agencies and security vendors." (both now on How it works) |
| R10 | Tier cards | "For one person. Your phone, computer, accounts and home network hardened around your risks."; "Two security keys, configured and tested"; "A follow-up visit after about four weeks"; "Questions answered by WhatsApp or Signal for 60 days"; "For you and one other person."; "Each person's phone, computer and accounts"; "Your home network · four security keys"; "Follow-up visit · 60 days of answered questions"; "For a household of up to four."; "Everyone's phones, computers and accounts, each kept private"; "Your home network · eight security keys"; "Follow-up visit · 60 days of answered questions · review visit at twelve months" (the table rows replace them) |
| R11 | Notes | "The first step is included. If you authorize it, Toza coordinates with your lawyer or family office." **Your call:** the outline does not list it, so it is gone from Pricing; the credit line in the first-step row still says the ₪4,000 counts in full, and lawyer coordination stays in the FAQ and Conditions. Say if you want it back as a line under the table |
| R12 | Notes | "After the 60 days: Annual Care for past clients, from ₪12,000 a year." (replaced by the three prices) |
| R13 | Labels | "Start here" tag; "Conditions →" under the first step and under the tiers (one "All terms: Conditions →" link instead); "Compare services" (screen-reader heading) |

## Housekeeping (no visible change)

Sentences now used on two pages were moved once into `_shared.yaml: common` (V-036), and FAQ, Conditions and the stages line refer to them; the built FAQ and Conditions pages read exactly as before: `first_visit` (FAQ b1), `half_day` (FAQ b2), `your_credentials` and `sign_in` (FAQ d1), `tested` (stages line Verify), `care_includes` (FAQ g4), `care_prices` (Conditions Annual Care), `written_offer` and `paid_after` (FAQ a4), `household_four` (Conditions price table).
