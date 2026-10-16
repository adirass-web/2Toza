# C2 — Situation pages and For attorneys (EN master, final copy)

16 Oct 2026. Follows `strategy/copy/COPY-BRIEF.md`. Template: 2a §5 and the built Separation page (`src/en/separation-divorce/index.njk`). Every line of page copy is a `>` quote line, so it can be pasted straight into the template.

**Tags.** `[2a §x]`, `[2b §x]`, `[P7 §4]`, `[baseline: page]` mean verbatim. "trimmed" means words cut and nothing added or reworded. `[new; from …]` means reworded or newly written, with its origin; all of these need owner approval (V-017). `[new, review]` marks a change made in the copy-chief review (C-review.md) that changes meaning. `[shared]` means an existing include or `en.json` / `contact.json` string, used unchanged.

**Shared components (unchanged, not repeated per page).**
- **S-hero:** founder portrait + `Dr. Lior Tabansky` / `In person · You control your credentials`. Buttons: `Message on WhatsApp` · `Signal` · `Call me back` (`cta-hero.njk`). [shared]
- **S-stages:** `stages.njk` (method line, "Three stages, one person.", Assess / Harden / Verify lines, price strip, "How it works"). Each page sets only `stageLine`. [shared]
- **S-price:** `price-block.njk`: Start here · First step · ₪4,000 · "Counts in full toward your protection within 30 days." | Personal Shield · ₪32,000 · "Fixed and agreed in writing before any work, first step included." | "All protection tiers →". [shared; P7 §4]
- **S-method:** `credential.njk`: "Hardening is Toza's own method, developed from public guidance of government security agencies and security vendors." + "Professional profile ↗" (cyberdrtabansky.com, new tab). [shared; 2a §6.3]
- **S-contact:** `contact-block.njk`: "Start with a private conversation." / "Dr. Tabansky replies personally. The first conversation is free and commits you to nothing." + Message on WhatsApp · Message on Signal · Call me back. Each page sets only `contactNote` (the FAQ link). [shared; 2a §6.2]

**FAQ link targets.** All three situation pages link to FAQ group E ("What Toza does not do"), as the 2a §3 page map assigns. Attorneys links to group F. The anchors `/en/faq/#e` and `/en/faq/#f` match the FAQ copy in C1 (groups `#a`…`#g`).

---

## 1. Business or founder dispute — `/en/business-dispute/`

**Page title:** Business or founder dispute — Toza [new; pattern of built Separation title]
**Meta description (139 chars):** A personal email may still recover a business account. Dr. Lior Tabansky helps you find where personal and business access meet, in person. [new; from 2a §5]

**1. Hero**
> # When interests diverge, ordinary access becomes leverage.
[2a §5]
> A personal email may still recover a business account. Dr. Lior Tabansky helps you find where personal and business access meet, and separate them deliberately.
[2a §5, trimmed: folder clause cut; comma added]

S-hero (founder caption + WhatsApp · Signal · Call me back).

**2. Recognition**
> ## See where personal and business access still meet.
[baseline: business-dispute]
> - A personal email that can still recover a business account.
> - One phone that signs in to both private and work services.
> - A folder shared during the partnership that is still open.
> - A work service that still holds private documents or plans.
[new; from baseline: business-dispute (each item recast as a thing to check)]
> Some of it you still need. Dr. Tabansky shows you what each connection allows and what depends on it, so you can separate access deliberately.
[new; first sentence 2a §5 Separation, rest from baseline: business-dispute]

**3. Sequence**
> ## Understand what a change will affect before you approve it.
[baseline: business-dispute]
> A password change can leave a recovery address or shared session in place, and removing an account can interrupt services you still use. You agree the sequence together before anything changes.
[new; first sentence from baseline: business-dispute; second sentence 2a §5 Separation, verbatim]

**4. Three stages:** S-stages, with `stageLine`:
> Assess where personal and business access meet. Harden what is yours to change. Verify it works, and learn to run it.
[new; pattern 2a §5 Separation stage line; last sentence verbatim]

**5. Extra: attorney coordination**
> ## Your attorney or adviser can be involved.
[baseline: business-dispute, trimmed]
> With your authorization, you receive an attorney-friendly summary of the work and what remains, and timing can be coordinated with counsel.
[2a §5 Separation extra]

**6. Price block:** S-price.
**7. Method line:** S-method.
**8. Contact:** S-contact, with `contactNote` link:
> Questions about business disputes
[new; pattern 2a §5 "Questions about [situation]"] → `/en/faq/#e`

*Moved to FAQ E (R-2), not on this page:* company systems only with lawful authority; a dispute does not authorize changes to another person's accounts; not a corporate audit or counter-espionage service; no investigation, forensics, evidence or legal opinion; a connection does not show anyone misused access.

---

## 2. Inheritance conflict — `/en/inheritance-conflict/`

**Page title:** Inheritance conflict — Toza [new; pattern of built Separation title]
**Meta description (138 chars):** Help with an account, years ago, may still connect someone to your correspondence. Dr. Lior Tabansky works through it with you, in person. [new; from 2a §5]

**1. Hero**
> # Family access is still access when trust breaks.
[2a §5; baseline: inheritance-clash]
> Help with an account, years ago, may still connect someone to your correspondence. Dr. Lior Tabansky works through it with you, in person.
[new; from 2a §5 (first sentence trimmed, "or finances" cut; second sentence reworded to fit 25 words)]

S-hero.

**2. Recognition**
> ## Access shared in good faith can still matter.
[baseline: inheritance-clash]
> - A relative listed as the recovery contact for your email.
> - A shared family cloud folder that still holds your documents.
> - A password shared years ago, when someone helped with an account.
[new; from baseline: inheritance-clash (account help, shared cloud folder, family recovery contact)]
> - Bank or card alerts that still go to a shared family email.
[new; from baseline: inheritance-clash theme "financial information"]
> Some of these arrangements still help you. Dr. Tabansky explains what each one allows and what ending it would mean. You decide what to change.
[new; from baseline: inheritance-clash; last sentence verbatim from its hero]

**3. Sequence**
> ## Understand the connections before changing them.
[baseline: inheritance-clash]
> One password change leaves a shared service or recovery setting as it was, and ending an arrangement can cut access you rely on. You agree the sequence together before anything changes.
[new; first sentence from baseline: inheritance-clash; second sentence 2a §5 Separation, verbatim]

**4. Three stages:** S-stages, with `stageLine`:
> Assess what family arrangements still connect. Harden a setup that fits your circumstances now. Verify it works, and learn to run it.
[new; pattern 2a §5 Separation stage line; "current circumstances" from baseline: inheritance-clash]

**5. Extra: attorney coordination**
> ## Your attorney can be involved.
[2a §5 Separation extra]
> With your authorization, you receive an attorney-friendly summary of the work and what remains, and timing can be coordinated with counsel.
[2a §5 Separation extra]

**6. Price block:** S-price.
**7. Method line:** S-method.
**8. Contact:** S-contact, with `contactNote` link:
> Questions about inheritance and family access
[new; pattern 2a §5] → `/en/faq/#e`

*Moved to FAQ E (R-2):* Toza does not decide entitlement to an account, document or asset; a family connection does not authorize work on someone else's account; remaining access does not show a relative used it; no investigation of relatives, forensics, evidence or legal advice; the summary is not a forensic report.

**URL note:** the old URL is `/en/inheritance-clash.html`; the brief sets `/en/inheritance-conflict/`. A 301 from the old URL is needed (2a §3).

---

## 3. Someone knows something — `/en/they-know-something/`

**Page title:** Someone knows something — Toza [new; Home door label, 2a §4]
**Meta description (144 chars):** You don't have to prove how it happened before acting. Dr. Lior Tabansky examines your devices and accounts with you and gives urgent first aid. [2a §5, trimmed]

**1. Hero**
> # Someone seems to know something private.
[2a §5; baseline: they-know-something]
> You don't have to prove how it happened before acting. Dr. Lior Tabansky examines your devices and accounts with you and gives urgent first aid.
[2a §5, trimmed: the malicious-app clause moves to block 3]

S-hero.

**2. Recognition**
> ## Start with what can be checked.
[baseline: they-know-something; 2a §4]
> - Devices still signed in to your messages or email.
> - Location settings that share where you are.
> - An app or profile on your phone that you don't recognize.
> - Public details and old online trails that reveal more together.
[new; from baseline: they-know-something (connected devices, location settings, public information and online trails), 2a §2 message 1 (details read together), BRIEF (malicious app or profile)]
> Exposure can run through a connected device or service, beyond the account you first suspect. Dr. Tabansky shows what each one reveals or allows, and what to change now.
[new; from baseline: they-know-something]

**3. Urgent first aid**
> ## Urgent first aid on the spot.
[P7 §4, trimmed]
> With your approval, pressing problems are handled during the first step, including removing a malicious app or profile where that can be done safely.
[new; from 2a §5 hero draft and baseline: they-know-something ("approved urgent first aid where safely possible"); edited in review: "first visit" → "first step" (site name), "where that can" as in 2a]

**4. Sequence**
> ## Understand the effects before making isolated changes.
[baseline: they-know-something]
> Changing a password may leave another session or recovery route open, and deleting an account can affect services you still need. You agree the sequence together before anything changes.
[new; first sentence baseline: they-know-something (two sentences joined); second sentence 2a §5 Separation, verbatim]

**5. Three stages:** S-stages, with `stageLine`:
> Assess what can be checked. Harden what you decide to close, even if the original concern stays unexplained. Verify it works, and learn to run it.
[new; middle sentence from baseline: they-know-something ("even if the original concern remains unexplained")]

**6. Extra: urgent visit**
> ## Urgent visits.
[2a §5, trimmed in review: region cut per V-029]
> Arrival within four hours of acceptance and payment, when available. Surcharge applies.
[2a §5]
> Urgent terms →
[2a §5] → `/en/conditions/#urgent`

**7. Price block:** S-price.
**8. Method line:** S-method.
**9. Contact:** S-contact, with `contactNote` link:
> Questions about proof and evidence
[new; pattern 2a §5] → `/en/faq/#e`

*Moved to FAQ (R-2):* E: no proof of how information reached someone, no identifying an actor, forensics or court evidence; recovering copies already shared is outside the service; some changes can be noticed, no promise of invisibility; no guarantee every exposure is found. A: contact via WhatsApp or Signal is not guaranteed invisible on the device. Surcharge amounts (₪4,800 / ₪6,000) stay on Pricing and Conditions only.

**Urgent heading:** 2a's heading is used without its region, as on Conditions 9 (V-029: no travel scope or region on the site).

---

## 4. For attorneys — `/en/attorneys/`

**Page title:** For attorneys — Toza [new; footer label]
**Meta description (140 chars):** Refer a client to Dr. Lior Tabansky for in-person digital security on their own devices and accounts. Your client decides what you are told. [new; from 2b §5]

**1. Hero**
> # When your client's phone is part of the dispute.
[2b §5]
> Dr. Lior Tabansky sees your client in person, on their own devices and accounts. Your client decides what you are told.
[2b §5]

Founder caption as S-hero. Buttons: **`Discuss a referral`** (primary; `contact.referral`, prefill "I'd like a private conversation about a possible referral. Please let me know the next step.") · `Signal` · `Call me back`. [2a §6.2; 2b §2 step 1]

**2. What Toza does for your client**
> ## What Toza does for your client.
[2b §3 Block 1]
> The first step is half a day in person with Dr. Tabansky. He reviews one main phone and one computer, iPad or second phone, on the same main account (Apple or Android), and gives urgent first aid on the spot.
[new; from P7 §4 first-step line and facts.json `assessmentScope` (verbatim scope)]
> Your client keeps a written exposure summary whether or not they continue. Protection follows only if they choose it.
[new; from P7 §4 and 2b §3 Block 1]
> How it works →
[shared UI label] → `/en/how-it-works/`

**3. When to refer**
> ## When a referral may help.
[baseline: attorneys]
> - Someone appears to know private information your client did not knowingly share.
> - Your client is unsure which devices, recovery routes or shared services still connect them to a former partner, colleague or relative.
> - Personal accounts or devices overlap with a business or family dispute.
> - Your client needs to understand the consequences of changes before authorizing them.
[baseline: attorneys; "the client" changed to "your client" only]
> Separation or divorce · Business or founder dispute · Inheritance conflict · Someone knows something
[2a §4 door labels; links: `/en/separation-divorce/`, `/en/business-dispute/`, `/en/inheritance-conflict/`, `/en/they-know-something/`]

**4. How your client makes contact**
> ## Your client makes contact with one tap.
[new]
> You receive a personal code and link, and a short neutral message to forward. Your client's tap opens WhatsApp with the code already in the message. On Signal, they quote the code.
[new; from 2b §2 steps 4–5]
> The first conversation is free, private and short. Dr. Tabansky replies personally. Written scope and price come before any paid work.
[2b §3 Block 3]

**5. Consent and coordination**
> ## Coordination, with your client's consent.
[new]
> Dr. Tabansky asks your client whether he may confirm to you that the referral arrived.
[new; from 2b §2 step 7]
> With your client's authorization, the timing of changes can be coordinated with you around a filing, a negotiation or a hearing. You receive an attorney-friendly summary in the form your client approves. Legal strategy stays with you.
[new; from 2b §3 Block 4 and baseline: attorneys ("Legal strategy remains with the attorney")]

**6. Referral fee**
> ## A referral fee, agreed in writing.
[new]
> Toza pays a fee when a referred client's first step is paid, and a further fee if they continue to a protection tier. Amounts and terms are in a one-page agreement, sent after a short call.
[new; from 2b §1 Option C, §2 steps 2–3, 2z item 9]

**Fee visibility (default, open owner item):** the fee and its trigger are named, with **no amounts** on the public page. 2b leaves public visibility to the owner (2b §5 item 4; 2z open item 6). 2z moved the fee out of the hero because it reads as transactional, and V-007 says only that "a referral fee exists". The amounts (₪600 on a paid first step, then ₪2,000 / ₪3,000 / ₪4,500) go in the one-page agreement and the conversation. None of these figures are in facts.json, so CI would reject them on the page anyway.

**7. Prices summary**
> ## What your client pays.
[new]
> The first step is ₪4,000 and counts in full toward a protection tier that begins within 30 days. Personal Shield, for one person, is ₪32,000, first step included. Your client pays Toza directly.
[new; from P7 §4, facts.json; last sentence from 2b §6 term 3]
> All protection tiers → · Conditions →
[shared: en.json `price.allTiers`, `price.conditions`] → `/en/pricing/`, `/en/conditions/`

**8. Method line:** S-method.

**9. Contact:** S-contact (heading and reassurance unchanged). Buttons: **`Discuss a referral`** · `Message on Signal` · `Call me back`. `contactNote` link:
> Questions from attorneys
[new; 2a §7 group F] → `/en/faq/#f`

*Kept off this page (R-2).* Covered in the FAQ: a referral does not authorize access to devices, accounts or findings, and the attorney is not automatically a recipient of anything (F1); the summary is not legal advice or a forensic report and does not establish what another person did (F2); no investigation, evidence or legal advice (E1); keep identifying case details out of the first message (A1). **Not on the site at all** (owner may add to F1 later, or leave to the conversation and the one-page agreement): a client's "no" means the attorney hears nothing about that client; the confirmation says nothing about the client's circumstances; chain of custody; the listed concerns do not establish wrongdoing.

*Left out on purpose:* the one-pager download and the forwardable-message "Copy" buttons (2b §5 item 6). The messages carry each attorney's personal code, so they are sent in the conversation after the agreement, not shown on the public page. The `/go/TZ-xxxx` redirect needs a Pages Function (2b §2 step 5).

---

## Word counts and [new] lines

| Page | Page-specific copy | Shared components | Total visible | Budget | [new] blocks | [new] title/meta |
|---|---|---|---|---|---|---|
| Business dispute | 200 | 179 | 379 | ≤400 | 5 | 2 |
| Inheritance conflict | 198 | 179 | 377 | ≤400 | 7 | 2 |
| Someone knows something | 216 | 179 | 395 | ≤400 | 6 | 1 |
| For attorneys | 374 | 62 | 436 | ≤450 | 12 | 2 |

Counting method: page-specific copy is every `>` line on the page (headings, body, lists, link labels), excluding title and meta. Shared components are S-hero caption and buttons, the S-stages strip (method line, heading, three stage lines, price strip, link), S-price, S-method and S-contact. Attorneys uses S-hero, S-method and S-contact only, with no stages strip or price block. A "[new] block" is one tagged block (a list counts once), not one sentence. In all: 30 [new] blocks of page copy, plus 7 [new] titles or meta descriptions (after review; see C-review.md for the consolidated list).
