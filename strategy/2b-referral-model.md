# 2b. Attorney referral model — Toza v2 (15 Oct 2026)

Basis: BRIEF.md (R-1, R-2, decisions), llms.txt, current /en/attorneys.html, 1b section 3. Every ₪ fee figure below is a **proposal** for Dr. Tabansky to set. Prices of the service are from current copy. Where 1b suggests avoiding a fee, the brief wins: a fee exists.

---

## 1. Fee-structure options

Reference economics (current copy, incl. VAT): Assessment ₪3,600; Personal Shield ₪14,000; Inner Circle from ₪42,000. The Assessment is credited to a full service that starts within 14 days, so the Assessment is not additive revenue when a client continues. All fee figures: confirm with the accountant whether they are quoted incl. or excl. VAT.

### Option A: fixed fee per paid Assessment
- **Mechanics:** ₪400 for each referred client whose Assessment is paid.
- **Trigger:** Assessment payment received by Toza.
- **Attorney motivation:** Simple, quick, certain. Rewards sending anyone, including poor-fit clients. The attorney sees nothing for the cases that matter most (Shield, Inner Circle).
- **Toza margin:** Cost is about 11% of the Assessment and does not grow with deal size. Cheap to forecast. Paid even when nothing further is bought.
- **Admin:** Lowest. One event, one amount.

### Option B: percentage of the full service
- **Mechanics:** 10% of the full-service price actually paid: ₪1,400 on Personal Shield, ₪4,200 on Inner Circle (at the ₪42,000 floor), 10% of agreed price on Bespoke. Nothing on an Assessment that does not continue.
- **Trigger:** full-service payment received.
- **Attorney motivation:** Strong pull toward serious cases and toward Inner Circle. Long wait and uncertainty: many referred clients stop after the Assessment, so the attorney may feel unpaid for real effort.
- **Toza margin:** Best alignment. Fee scales with revenue and is only paid on revenue.
- **Admin:** Medium. Must track the 14-day credit window and the final price (additions, Bespoke).

### Option C: hybrid, two fixed steps (recommended)
- **Mechanics:** ₪300 when the referred client's Assessment is paid, plus a second fixed fee when a full service begins: ₪1,000 for Personal Shield, ₪3,000 for Inner Circle. (Internal note, term sheet only: Bespoke 7% of agreed price; 90-day attribution window.)
  - One-sentence version for attorneys: "₪300 when your client's Assessment is paid, and ₪1,000 more if they continue to Personal Shield (₪3,000 for Inner Circle)."
  - Example: Assessment only: ₪300. Assessment, then Personal Shield: ₪1,300 (about 9% of ₪14,000). Assessment, then Inner Circle: ₪3,300 (about 8% of ₪42,000).
- **Trigger:** each step on cash received from the client. The second step counts a full service that begins inside the 14-day credit window or later within the referral's 90-day attribution period (internal).
- **Attorney motivation:** Early confirmation that the referral registered (₪300 is a visible first payment), plus a real reward for the larger engagements. Fixed amounts are easy to remember and to explain.
- **Toza margin:** Around 8 to 9% of revenue on converting referrals, about 8% of the Assessment on non-converting ones. Predictable.
- **Admin:** Medium-low. Two events per referral, flat amounts, one monthly statement.

**Recommendation: Option C.** It pays something early (so the attorney sees the referral worked), pays more on the engagements that carry the business, and uses flat sums that fit on one line of a term sheet. Review after 20 referrals or 6 months.

---

## 2. Referral flow without email (mobile-first)

Design rule: everything runs on WhatsApp/Signal plus one link. No form, no account, no portal.

1. **Register interest.** On the Attorneys page the one button, "Discuss a referral", opens WhatsApp with the approved prefill: "I'd like a private conversation about a possible referral. Please let me know the next step." Alternatives: Signal, or call-back as a separate choice. Dr. Tabansky replies personally.
2. **Short call or chat (10 min).** Fit, case types, Central Israel coverage, the fee summary, the term sheet (section 6) sent as a PDF over WhatsApp/Signal.
3. **Agreement.** Attorney confirms the term sheet by reply message, or signs the one-page agreement. Toza logs the firm.
4. **Code issued.** Each attorney gets a personal code (format `TZ-` + 4 characters, e.g. `TZ-K7M2`) and a personal link: `/go/TZ-K7M2`. Toza also sends the two forwardable messages (section 4) with the code already filled in, ready to forward.
5. **Client taps the link.** `/go/TZ-K7M2` logs the click (first-party) and redirects straight to WhatsApp with the prefill: "Hello, I'd like a private conversation. Ref TZ-K7M2." No interstitial page, no extra tap. Signal users quote the code already visible in the forwarded message. Call-back stays a separate choice on the site. Dependency: the redirect and click log need a server-side function (Pages Function); the site is static today.
6. **Identification fallbacks.** (a) Client says the code or attorney name in the first conversation: Dr. Tabansky logs it manually. (b) Client contacts Toza without a code and the attorney sends the client's first name or initials plus date by WhatsApp: matched only inside the 90-day window and only if the client confirms in the conversation.
7. **Client consent step.** In the first conversation Dr. Tabansky asks the client one plain question: "May I tell your attorney that we have spoken, and that you booked, so that they know the referral arrived?" No yes, no message to the attorney. The answer is logged as a yes/no and a date.
8. **Confirmation to attorney.** With a yes: a two-line WhatsApp/Signal message to the attorney: "Referral TZ-K7M2-001 received. Status: in conversation / booked." Nothing about the client's circumstances. With a no: the attorney hears nothing about that client, and the fee still accrues from Toza's own log (owner decision: confirm).
9. **Any further coordination** (timing of changes, an attorney-friendly summary) happens only on the client's explicit authorisation, case by case.
10. **Fee statement and payment.** Monthly, by the 10th: a short PDF or message sent over WhatsApp/Signal listing, for clients who said yes, referral ID (`TZ-K7M2-001`), event, date, amount. For clients who said no, the statement shows no ID, event or date: only one line "Other referrals this month: N", with their fees folded into the total. No client names. The attorney confirms by reply; payment by bank transfer within 14 days of confirmation, on the client's cash received. Fee statement and invoice mechanics per the attorney's firm (receipt/invoice requirements: confirm with accountant).

---

## 3. Attorney one-pager (EN draft, ready to design)

**Headline:** A private digital-security adviser for the client who says "I think they can see my messages."

**Subline:** Dr. Lior Tabansky works in person, with your client, on your client's own devices and accounts. You keep the legal strategy.

**Block 1. What Toza does for your client**
A Private Exposure Assessment, typically four hours: the client's phone and one PC, iPad or second phone, their accounts and recovery routes. Urgent first aid where safely possible. The client leaves with a practical summary and next steps, even if they buy nothing further. Full services follow only if the client chooses them.

**Block 2. When to refer**
- The client believes someone knows private information they did not share.
- Shared accounts, devices or recovery routes still connect them to a former partner, colleague or relative.
- A separation, shareholder dispute or estate matter has started and the client's phone is part of daily life.
- You want the client to understand the effect of changes before they make them.

**Block 3. How your client makes contact**
One WhatsApp tap or Signal message, or a call-back. No form. The first conversation is free, private and short. Dr. Tabansky replies personally. Written scope and price come before any paid work.

**Block 4. What you receive**
Coordination with you only with your client's authorisation: timing of changes around a filing, a negotiation or a hearing; an attorney-friendly summary of the work, in the form the client approves. A fee is paid when a referred client's Assessment is paid, and more if they continue to Personal Shield (₪3,000 for Inner Circle in place of ₪1,000). Terms are in a one-page agreement.

**Block 5. Prices (incl. VAT)**
- Private Exposure Assessment: ₪3,600. Credited in full toward a full service that begins within 14 days.
- Personal Shield: ₪14,000. One person, two devices, two security keys, a private dated record, 14 days of adjustment support.
- Inner Circle Shield: from ₪42,000. Four people, eight devices, eight keys, the home network.

**Block 6. Credential line**
Dr. Lior Tabansky's work has included national cybersecurity strategy and collaborative cyber-resilience projects with the World Bank across 11 countries. Professional profile: cyberdrtabansky.com (credential line as in 2a §6.3)

**CTA (one):** Discuss a referral (opens WhatsApp with the approved prefill). Secondary text link: Signal.

Footer line: "Questions: FAQ · Conditions" (per R-2, boundaries stay in the FAQ).

---

## 4. Neutral forwardable message (client-facing, EN)

Short, no case detail, nothing that discloses why the attorney is forwarding it.

**Variant A (plain)**
> Hello [first name]. As we discussed, here is the private adviser I mentioned: Dr. Lior Tabansky. He works in person, on your own devices, and you approve every material change. The first conversation is free and private: [production-domain/go/TZ-K7M2]. Reference TZ-K7M2.

**Variant B (shorter, for a client who already asked)**
> Dr. Lior Tabansky, the specialist I mentioned. One message starts the conversation, no commitment: [production-domain/go/TZ-K7M2]. Reference TZ-K7M2.

Notes: links use the production domain once chosen (owner decision); code stays in the visible text so attribution works if the link is stripped. Both variants can be sent as Signal messages unchanged.

---

## 5. Attorneys page v2: outline and draft hero

**Outline**
1. Hero: headline, subline, one CTA, founder portrait.
2. Four situations in your practice: separation/divorce, business or founder dispute, inheritance conflict, "they know something". Each with a one-line "when a referral helps". Links to the situation pages.
3. What your client gets: Assess → Harden → Verify, with real objects (devices, security keys, dated record).
4. What you get: coordination with client authorisation; the attorney-friendly summary; the fee arrangement in the one sentence from section 1 (public visibility is an owner decision), with the one-pager download.
5. Prices: ₪3,600 / ₪14,000, Inner Circle on Pricing; credit within 14 days.
6. One-pager download (PDF, EN now, HE later) and the two forwardable messages as "Copy" buttons.
7. Credential line plus personal-site link.
8. Contact: WhatsApp, Signal, call-back. Link to FAQ for conditions.

**Draft hero**
- **Headline:** When your client's phone is part of the dispute.
- **Subline:** Dr. Lior Tabansky sees your client in person, on their own devices and accounts. Your client decides what you are told.
- **CTA:** Discuss a referral

(Keep the existing section "When a referral may help" and the attorney-friendly summary text as the body. Move the privacy and service boundaries block, including the "keep identifying details out of the first message" line, to the FAQ per R-2.)

---

## 6. Onboarding

### Message from Dr. Tabansky (WhatsApp / LinkedIn, EN)
> Dear [Name], thank you for the conversation. I work one-to-one with clients who need their phones, accounts and shared access put in order, usually during a separation, a business dispute or an estate matter. I'd be glad to have you as a referral partner. Attached: a one-page description of how it works and the fee arrangement. Your personal link and code are below. If a client of yours would benefit, forward the link and I will reply to them personally. [link / code] — Lior

### Referral agreement: one-page term sheet outline
1. **Parties and purpose:** attorney/firm and Toza; referral of prospective clients.
2. **Independence:** each side acts independently; the client contracts with Toza directly.
3. **Client authority:** no work without the client's own authorisation; client pays Toza directly.
4. **Referral identification:** personal code and link; Toza's log is the record; 90-day attribution window.
5. **Fee:** amounts per step (section 1, Option C), payable on cash received.
6. **Statement and payment:** monthly statement, payment within 14 days of confirmation.
7. **Client confidentiality:** no client information to the attorney without the client's consent.
8. **Coordination:** with client authorisation only; the attorney keeps legal strategy.
9. **No exclusivity:** neither side is tied to the other.
10. **Changes and term:** either side may change or end the arrangement on written (message) notice; fees already earned remain due.
11. **Governing law and tax details:** to be set by counsel.

---

## 7. Tracking spec

One sheet or table, one row per referral. No client name, phone or case detail.

| Field | Content |
|---|---|
| `partner_code` | e.g. `TZ-K7M2` (one per attorney) |
| `partner_name`, `firm`, `since` | held in a separate partner table |
| `referral_id` | `TZ-K7M2-001` (running number per partner) |
| `source` | `go_click` / `code_stated` / `attorney_message` |
| `first_contact_date` | date client first messaged |
| `channel` | WhatsApp / Signal / call-back |
| `client_consent_to_confirm` | yes / no / not asked, with date |
| `status` | in conversation / quoted / Assessment paid / full service begun / closed |
| `assessment_paid_date`, `assessment_amount` | for the first-step fee |
| `full_service`, `full_service_start_date`, `full_service_amount` | Shield / Inner Circle / Bespoke |
| `fee_step1_due`, `fee_step2_due` | amounts per partner terms |
| `fee_statement_month`, `fee_paid_date` | statement and payment tracking |
| `attribution_expires` | `first_contact_date` + 90 days |

**First-party `/go/*` logging (compatible):** each hit on `/go/TZ-K7M2` logs `ts`, `partner_code`, `device_class` (mobile/desktop), `target` (whatsapp/signal), and a daily-rotating non-identifying hash only if deduplication is needed. No IP storage, no cookies, no third-party scripts. Click totals per partner feed a click → first message → Assessment → full service funnel. A click is never treated as a referral by itself; the referral row is created only when the client messages.

**Monthly review (10 minutes):** clicks, first messages, Assessments, full services per partner; fees accrued and paid; partners with no activity in 90 days get a short personal check-in.

---

## Changes after review (2z)

- "Typically four hours" in the one-pager (was "four-hour").
- Fee trigger worded as paid Assessment plus continuation; removed from the hero subline; Bespoke 7% and the 90-day window kept as internal/term-sheet notes only; one-sentence fee line added.
- Removed the "straight to full service" path.
- Variant A: "you approve every material change"; onboarding note: "put in order".
- `/go/TZ-xxxx` is a direct redirect to WhatsApp, no interstitial; Signal users quote the visible code; Pages Function dependency noted. Referred-client prefill: "Hello, I'd like a private conversation. Ref TZ-K7M2."
- Attorney CTA "Discuss a referral" with the approved prefill, in the flow, one-pager and hero.
- Consent "no": fee still accrues (to confirm); statement shows only an anonymous "Other referrals this month: N", no ID, event or date.
- One-pager: 2a credential line and profile link; footer "Questions: FAQ · Conditions". Link domain is a placeholder pending the production domain.
