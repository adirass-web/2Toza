# 2a Message architecture — Toza v2 (EN master)

15 Oct 2026. Bound by BRIEF.md (R-1, R-2). All facts come from llms.txt and `_site/en`. Where 1a–1z conflict with the brief, the brief wins. The main case is 1d/1z's advice to put the "don't send details" warning beside the buttons: under R-2 it goes to the FAQ.

---

## 1. Positioning and core promise

**Positioning (internal).** Toza is for people in Israel whose private information could be used against them: in a separation, a business or inheritance dispute, after something has surfaced, or before any of that. Dr. Lior Tabansky assesses the client's own phone, computer and accounts in person and hardens them around a personal threat model, with the client present and in control. Unlike IT support, an app or a provider helpline, one senior person understands the situation, makes the changes and teaches the client, at a published price.

**Core promise.** *One expert, in person, closes the access that can be used against you and shows you how to keep it closed.*

---

## 2. Message hierarchy (in order)

| # | Message the visitor leaves with | Proof (fact base only) |
|---|---|---|
| 1 | **Private information can be used against you, and the route is usually ordinary access you've forgotten.** | Three concrete things to check, drawn from the current copy's themes (what someone can reach, what separate details reveal together): (1) a recovery email or number on your main account that is no longer yours, so one reset can open everything linked to it; (2) an old profile, a delivery address and a tagged photo that each look harmless but together show where you live and when you are out; (3) a smart-home hub or connected-car app set up jointly, whose history and controls the other account holder can still see. |
| 2 | **One senior expert does the work himself, in person, with you.** | Founder portrait and name. "In person · With you present · You control your credentials." He understands the situation, makes the changes and verifies them. The credential line plus the personal-site link. |
| 3 | **It is a defined process with tangible results.** | Assess → Harden → Verify, Toza's own method, developed from public guidance of government security agencies and security vendors. Practical summary, even without further purchase. Two security keys supplied, configured and tested. Private dated record. Teaching. 14 days of adjustment support. |
| 4 | **The price is known, and the first step is a private conversation.** | ₪3,600 Assessment, ₪14,000 Personal Shield, both incl. VAT. Assessment fee credited (14-day condition, linked). The first conversation is free and commits you to nothing. WhatsApp, Signal, call-back. |

Messages 1–2 go in the first screen, 3 gets one screen, and 4 repeats on every page.

---

## 3. Page map for v2

There are still **11 pages**, but the footprint changes: Assessment and How Toza helps merge, and Conditions is added. Old URLs get 301 redirects.

| Page | Job (one line) | Primary reader | Entry source | One action | Moves out |
|---|---|---|---|---|---|
| **Home** `/en/` | State the fear, show the man, show the method and the two prices, open a channel. | Situation-aware visitor, often referred | Referral, direct, brand search | Open WhatsApp | Commercial terms → Conditions; boundaries and warnings → FAQ |
| **Separation & Divorce** | Name the situation, then show what Toza does about it. | P1 separating partner | Search, attorney referral, Home door | Open WhatsApp | Spouse/evidence/visibility limits → FAQ |
| **Business dispute** | Same, for personal and business access overlap. | P2 founder/partner | Search, attorney referral, Home door | Open WhatsApp | Corporate-audit and authority limits → FAQ |
| **Inheritance conflict** | Same, for family arrangements made in good faith. | P3 heir | Attorney referral, Home door | Open WhatsApp | "Does not decide entitlement" → FAQ |
| **They know something** | Same, when private information has surfaced. Urgent route visible. | P4 leak/pressure | Search, Home door | Open WhatsApp | Attribution and forensics limits → FAQ; urgent terms → Conditions |
| **How it works** (merges *Private Exposure Assessment* + *How Toza helps*) | Show the three stages and what each one produces. | Reader comparing or justifying the price | Home, situation pages | Open WhatsApp | Group mechanics → Pricing; credit, urgent → Conditions |
| **About Dr. Tabansky** (was *Why Toza*) | The founder's first-person reason for Toza, the credential line and the personal-site link. | Reader checking "who is this man" | Home block 4, nav | Open WhatsApp | Methods-guidance paragraph cut to one line |
| **Pricing** | All services on one calm page: Assessment, Personal Shield, Inner Circle, Bespoke. ≤300 words. | Reader ready to decide; proactive family (P5) | Nav, price block | Open WhatsApp | Commercial accordions → Conditions; "Service boundaries" accordion → FAQ E |
| **Conditions** (new, printable) | Commercial terms only, in one place: credit, urgent surcharges, support periods, migration and network scope, follow-up, group records. No boundary sentences (R-2). | Careful buyer, attorney, client's adviser | "Prices and conditions" link only | None (text link to contact) | — |
| **For attorneys** | Make referring safe and simple. | P6 family, commercial and estate attorneys | Direct link from Dr. Tabansky, nav footer | Open WhatsApp (referral text) | Authority and boundary detail → FAQ F |
| **FAQ** | Absorb every boundary, warning and edge case, in plain questions. | Doubter, attorney, pre-contact reader | Footer, "Questions" links | Open WhatsApp | — |

Also needed: EN privacy notice and terms (currently Hebrew only).

**Merge rationale.** Both pages describe the same visit (~2,200 words and ~18 phone screens combined, per 1d). One Assess → Harden → Verify page replaces them. **About stays separate:** the founder is the brand, and "who is he?" is the silent objection (1b #10).

---

## 4. Home, block by block

Budget: ≤6 phone screens, ≤420 words in `<main>`. One statement per screen.

### Block 1 — Promise + founder + first CTA (phone fold ≤640px)

**Visual:** founder portrait (≥96px on phone, large on desktop), name beneath it. Microcopy: "In person · With you present · You control your credentials" (≥14px).

Headline options:

| # | Headline | Rationale |
|---|---|---|
| A | **Private information can be used against you.** | Approved H1, unchanged. It names a fear the reader already has, without exaggerating. *(current spirit)* |
| B | **Private information can be used against you. Keep it private.** | Same fear, with a turn to agency. Slightly ad-like. *(current spirit)* |
| C | **Before private information becomes leverage.** | Quieter, private-bank register. Fits proactive and anxious readers, but is less clear at first glance. |
| D | **Trust can end before access does.** | Sharpest line on the site, but separation-specific. It belongs to that page. |
| E | **Your phone, your accounts, secured in person by one expert.** | Product-led and clear, but reads like a cyber vendor. |

**Decision: C, "Before private information becomes leverage."** Reasons: (1) it carries the quiet-adviser register the rebuild is built on, where A is the fear-led incumbent line; (2) it echoes the core mechanism in the doctrine, ordinary access becoming leverage; (3) "before" fits both the proactive reader and the one already in a dispute. Its weakness is clarity at first glance, so the subline names the stake and the person. A, the current approved H1, stays as the fallback: it is tested head-to-head against C in the Phase 5 five-second test, and C is replaced only if A wins clearly.

**Subline (≤2 lines):**
> Private conversations, finances and plans can become leverage over you. Dr. Lior Tabansky assesses and hardens your phone, computer and accounts with you, in person.

**CTA:** primary button **"Message on WhatsApp"** (opens wa.me directly). Beside it: **"Signal"** · **"Call me back"**.

### Block 2 — Four situations as doors

**Purpose:** self-selection.
**Heading:** *Where this usually begins.*
Four cards, one line each, the whole card tappable:
- **Separation or divorce.** What still connects your digital lives.
- **Business or founder dispute.** Where personal and business access still meet.
- **Inheritance conflict.** Family arrangements that outlived the trust.
- **Someone knows something.** Private information has surfaced. Start with what can be checked.

Below, one line for P5: *Or before anything happens. You don't need a known incident to begin.*
**CTA:** none. The cards are the action.

### Block 3 — Assess → Harden → Verify

Shared strip (§6.4), real objects, no icons.
**Heading:** *Three stages, one person.*
**Support line (Harden):** *Hardening is Toza's own method, developed from public guidance of government security agencies and security vendors.*
**CTA:** text link "How it works".

### Block 4 — Credential + specimen

**Heading:** *The same expert, from first look to final check.*
Credential line (§6.3) + link **"Professional profile ↗"** (cyberdrtabansky.com, opens in a new tab).
**Visual:** illustrative specimen of the practical summary (§6.5), labelled.
**CTA:** text link "About Dr. Tabansky".

### Block 5 — Price anchor

The shared price block (§6.1), exactly. No Inner Circle here.

### Block 6 — Private contact

The shared contact block (§6.2).
**Heading:** *Start with a private conversation.*

Footer: Pricing · FAQ · For attorneys · Conditions · Privacy · Terms. No boundary line in the footer (R-2).

---

## 5. Situation page template (shared)

Budget: ≤5 phone screens, ≤400 words. Base layout: the current separation-divorce phone fold (1d).

**Block order**
1. **Hero:** H1 + ≤2-line subline + founder thumbnail + contact buttons.
2. **Recognition:** heading + 3–4 concrete examples of lingering access + one line on choice.
3. **Sequence:** heading + two lines on order of changes.
4. **Three stages:** shared strip + one situation line.
5. **Extra (optional):** attorney coordination, or urgent visit (They know something).
6. **Price block** (shared).
7. **Credential line** (shared).
8. **Contact block** + link "Questions about [situation]" → FAQ group.

### Fully drafted: Separation & Divorce

**1. Hero**
> # Trust can end before access does.
> Accounts set up for a shared life can outlast it. Dr. Lior Tabansky finds, with you and in person, what still connects you.
>
> [Message on WhatsApp] · Signal · Call me back
> *Dr. Lior Tabansky · In person · You control your credentials*

**2. Recognition**
> ## Choose which access you keep.
> - A family cloud that still shares photos and documents.
> - A recovery number or email that belongs to your spouse.
> - An old phone or tablet still signed in to your messages.
> - Location sharing set up years ago.
>
> Some of it you still need. Dr. Tabansky shows you what each connection allows, so you can tell access you want to keep from access you want to end.

**3. Sequence**
> ## Change things in the right order.
> A password change can leave another route open, and changing a family service can cut access you rely on. You agree the sequence together before anything changes.

**4. Three stages** (shared strip). Situation line:
> *Assess what still connects you. Harden a setup for the life you are moving into. Verify it works, and learn to run it.*

**5. Situation extra**
> ## Your attorney can be involved.
> With your authorization, you receive an attorney-friendly summary of the work and what remains, and timing can be coordinated with counsel.

**6–8.** Price block · credential line · contact block · link "Questions about separation and privacy".

(~230 words. The boundary sentences cut from this page (spouse use, invisibility, investigation) move to FAQ group E.)

### Hero drafts for the other three

**Business dispute**
> # When interests diverge, ordinary access becomes leverage.
> A personal email may still recover a business account, and a folder shared during the partnership may still be open. Dr. Lior Tabansky helps you find where personal and business access meet and separate them deliberately.

**Inheritance conflict**
> # Family access is still access when trust breaks.
> Help with an account, years ago, may still connect someone to your correspondence or finances. Work through it in person with Dr. Lior Tabansky, and decide what to change.

**They know something**
> # Someone seems to know something private.
> You don't have to prove how it happened before acting. Dr. Lior Tabansky examines your devices and accounts with you and gives urgent first aid, including removing a malicious app or profile where that can be done safely.
> Situation extra: *Urgent visits in Central Israel.* "Arrival within four hours of acceptance and payment, when available. Surcharge applies. [Urgent terms]" → Conditions.

---

## 6. Shared components

### 6.1 Price block (identical everywhere)

> **Private Exposure Assessment**
> **₪3,600** including VAT
> Typically four hours · One main phone and one computer, iPad or second phone · Practical summary, whether or not you continue
>
> **Personal Shield**
> **₪14,000** including VAT
> One person · Two devices · Two security keys, configured · Private dated record
>
> Your Assessment fee counts toward Personal Shield when it begins within 14 days of completion of the initial service.
> [Prices and conditions →]

On Pricing only, Inner Circle is added as a third column: "from ₪42,000 including VAT · Four people · Eight devices · Home network".

### 6.2 Contact block

**Buttons (in this order, all direct links, never anchors):**
1. **Message on WhatsApp** (primary). Prefill: *"I'd like a private conversation. Please let me know the next step."* (current approved text)
2. **Message on Signal.** signal.me cannot prefill, so it opens the chat only.
3. **Call me back.** Opens WhatsApp with the prefill: *"Hello, I'd like a private conversation. Please call me back when convenient."*

Attorney page (hero, contact block and the 2b flow), one label only: **"Discuss a referral"**. One prefill only: *"I'd like a private conversation about a possible referral. Please let me know the next step."* (current approved text)

**Reassurance line (one, not a warning):**
> Dr. Tabansky replies personally. The first conversation is free and commits you to nothing.

**Sticky phone header:** logo · Pricing · **[Message]** (opens WhatsApp).

### 6.3 Credential line (one line, site-wide, approved wording)

> *Dr. Lior Tabansky's work has included national cybersecurity strategy and collaborative cyber-resilience projects with the World Bank across 11 countries.* [Professional profile ↗]

Link: cyberdrtabansky.com, new tab. Identical on every page and the 2b one-pager.

### 6.4 Three-stage strip

| Stage | Label | One line | Real object to show |
|---|---|---|---|
| 1 | **Assess** | Your threat model, your risks in order, and urgent first aid. Typically four hours. | The client's own phone and laptop on a table, with the practical summary beside them |
| 2 | **Harden** | Toza's own method, built from public agency and vendor guidance: settings, accounts and recovery rebuilt around your risks. Two security keys supplied and configured. | Two hardware security keys (photographed, unbranded framing) |
| 3 | **Verify** | Changes tested and checked, and you are taught to use them. A private dated record of the work. | The dated record, closed or with the cover page only |

Caption: *Assess is the ₪3,600 first visit. Harden and Verify are Personal Shield.* (keeps tiers honest, 1z #8)

### 6.5 Illustrative deliverable specimen

One page of the **practical summary** (the Assessment output every client receives), shown as a document with neutral placeholders. Its sections follow the current pricing illustration:
- **Your circumstances** (one redacted line)
- **Reviewed** (devices, accounts, recovery routes)
- **Found and changed** (e.g. "Recovery email updated", "Old tablet signed out")
- **Remaining**
- **Ordered next steps** (1, 2, 3)

Label, always visible under the image: **"Illustrative example. Your summary reflects your own circumstances."**

---

## 7. FAQ architecture

All boundaries and warnings live here (R-2). The questions marked *(open)* show expanded by default. Situation pages deep-link to the relevant group.

**A. Before you get in touch**
- What should I send in the first message? *(the full "do not send" list)*
- Can someone notice my contact with Toza? *("not guaranteed invisible on your device")*
- Is the first conversation the paid service? *(open)*
- What happens before I pay? *(written offer, acceptance, payment; open)*
- Do I need to know what's wrong first?

**B. The first visit (₪3,600)**
- What do I get for ₪3,600? *(open)*
- What does it cover, and how long does it take?
- What do I receive if I don't continue? *(open)*
- What if you find something serious outside my concern?
- Can you remove spyware or a malicious app? *(approved urgent first aid, where safely possible within scope)*

**C. Personal Shield and Inner Circle**
- What does Personal Shield include? *(open)*
- Does migration include all my files? *(essential migration only)*
- What does adjustment support cover?
- What does Inner Circle include? Who sees whose records?

**D. Privacy and control**
- Do I give you my passwords or remote access?
- Will you see my messages or photos?
- Do you keep records or use the cloud? *(qualifier: "during the core engagement")*
- Do you monitor my devices or install software?

**E. What Toza does not do** *(all boundaries in one group)*
- Can you prove who accessed my account or collect evidence? *(no investigation, attribution, forensics, evidence, legal advice)*
- Will the other side notice the changes? *(some changes are visible; no promise of invisibility; sequence and timing agreed)*
- Will this escalate my dispute? Is it legal? *(own authorized environment only; timing with counsel)*
- Can you work on company systems or a relative's account? *(only with lawful authority; Toza doesn't decide entitlement)*
- Is the dated record a certification or guarantee? *(no; not every exposure guaranteed found)*
- How is this different from IT support or an investigator? *(keep table)*

**F. For attorneys** *(linked from the Attorneys page)*
- Does a referral authorize access to my client's information?
- What does the attorney-friendly summary contain, and who decides?
- Can timing be coordinated with proceedings?
- How does referral work commercially? *(referral fee exists; wording pending owner decision)*

**G. Prices and timing** *(short, pointing to Conditions)*
- How does the ₪3,600 credit work?
- Can you come urgently, and what does it cost?
- Is follow-up available later?

---

## 8. Copy rules for v2

1. **One statement per screen.** Heading ≤10 words, support ≤40 words. Phone fold: headline + ≤25 words + button.
2. **Budgets.** Home ≤420 words / 6 phone screens; situation ≤400 / 5; How it works ≤500; About ≤350; Pricing ≤300; FAQ answers ≤80 each.
3. **CTA.** Every CTA opens a channel on the first tap (WhatsApp primary, Signal and Call me back beside it). No anchors, no forms. Labels name the channel.
4. **Price.** Always "₪X including VAT", never "only". Home and situation pages show ₪3,600 and ₪14,000 only. The credit line always says "within 14 days of completion of the initial service" and links to Conditions.
5. **R-2.** "Does not / cannot / not guaranteed / do not send" sentences go in the FAQ only, never in heroes, bodies, CTA zones, footers or Conditions. Conditions holds commercial terms; the FAQ holds boundaries.
6. **Founder.** Name him in every first screen. First person on About only.
7. **Proof ceiling.** Credential line + profile link. No logos, press, testimonials, counts, statistics or scarcity.
8. **Concrete.** Name the device, the recovery email, the shared cloud: ≥3 fact-base examples per situation page. No implied wrongdoing.
9. **Voice.** Plain, calm, adult. BRIEF banned list applies. At most one rhetorical question per page.
10. **HE-ready.** No idioms or puns. Hebrew headlines are written natively.

---

**Open items for owner:** (1) Call-back via WhatsApp prefill: confirm. (2) Referral-fee wording and visibility (Attorneys page / FAQ F). (3) Approve the single credential line in §6.3. (4) Page restructure and 301s. (5) Whether the specimen may show realistic placeholder findings such as "Old tablet signed out".

---

## Changes after review (2z)

1. §8.5: "(or Conditions)" removed. Conditions = terms, FAQ = boundaries. Page-map rows aligned.
2. §6.3: one credential line site-wide, in the approved wording ("collaborative … with the World Bank"), with the profile link opening in a new tab.
3. §6.1 and §8.4: the credit line now reads "within 14 days of completion of the initial service".
4. They know something: "fixes what is urgent" is now "gives urgent first aid", and "Surcharge applies" is added beside Urgent terms.
5. All three rewrites adopted: Block 2 "Where this usually begins.", Block 4 "The same expert, from first look to final check.", and the Separation subline (21 words). The Home subline now ends "around your own circumstances."
6. Attorney CTA: one label, "Discuss a referral", and one prefill, the approved "I'd like a private conversation about a possible referral. Please let me know the next step." 2b should use the same.
7. Typo fixed in the Home page-map row. Open items updated.

8. Harden (owner comment, 15 Oct): described as Toza's own method, developed from public guidance of government security agencies and security vendors. Added to message 3, Home block 3 support line and the §6.4 table. Wording says "developed from", never "endorsed by" or "equivalent to" an agency, and avoids "high-end" (luxury adjectives are on the banned list).
9. Message 1 proof (owner comment, 15 Oct): replaced the four examples with three stronger things to check: recovery chain, separate details read together, shared home or car app. All phrased as checks, with no claim about what anyone is doing.
10. Home headline (owner comment, 15 Oct): decided C, "Before private information becomes leverage." Subline now names the stake and the person. A is the fallback, tested against C in Phase 5.
