# C1 — How it works · About · FAQ · Conditions (EN master, final copy)

16 Oct 2026. Written to `strategy/copy/COPY-BRIEF.md`. Facts from `src/_data/facts.json`; every ₪ amount below is listed there. Ready to build, block by block.

**Provenance tags.** [2a §x], [P7 §x], [P8 §x], [2b §x] = verbatim or a direct excerpt of that source. [baseline: page] = verbatim from the approved old page; "edited" means only a term swap (e.g. "Assessment" → "first step", "we" → "Dr. Tabansky", tier names) or a cut, with no new claim. [facts] = `facts.json` (incl. `assessmentScope`). [UI] = existing label in `src/_data/i18n/en.json` or `contact.json`. **[new]** = new wording; every [new] item needs owner approval.

**Shared components used as built (no new copy):** hero buttons "Message on WhatsApp · Signal · Call me back" and contact block "Start with a private conversation." / "Message on WhatsApp · Message on Signal · Call me back" / "Dr. Tabansky replies personally. The first conversation is free and commits you to nothing." [2a §6.2, contact.json]. Method line [2a §6.3]: "Hardening is Toza's own method, developed from public guidance of government security agencies and security vendors." + "Professional profile ↗" (cyberdrtabansky.com, new tab).

**R-2 check.** No boundary or warning sentence appears on How it works, About or Conditions. All of them are in the FAQ, groups A, D and E.

---

## 1. How it works — `/en/how-it-works/`

- **Page title:** How it works — Toza [new]
- **Meta description (146 chars):** Assess, Harden, Verify: how Dr. Lior Tabansky works on your devices and accounts in person. The first step is ₪4,000 and counts toward protection. [new]

### 1. Hero
- **Eyebrow:** How it works [UI]
- **H1:** Work it through with the person who makes the changes. [new] *(old H1 cut from 11 to 10 words to fit the heading limit; old: "Work through your concerns with the person who makes the changes.")*
- **Support:** You do not have to work out what is wrong before you meet. [baseline: what-happens-during-the-visit, edited] Dr. Lior Tabansky assesses your devices and accounts with you, hardens them around your risks and tests the changes. [new]
- **Caption:** In person · With you present · You control your credentials [2a §4]
- **Buttons:** Message on WhatsApp · Signal · Call me back [2a §6.2]

### 2. Three stages
- **H2:** Three stages, one person. [2a §4]
- **Support:** Each stage has its own result. [baseline: what-happens-during-the-visit]

### 3. Stage 1 — Assess
- **Label:** 1 · Assess [2a §6.4]
- **H3:** Your threat model, your risks in order, and urgent first aid. [2a §6.4]
- **Body:** Dr. Tabansky starts with your situation: what changed, what concerns you, which accounts matter and who previously had legitimate access. [baseline: private-exposure-assessment, edited] He then examines how your devices, identities and accounts are connected, and what those connections allow. [baseline: what-happens-during-the-visit, edited]
- **You keep:** A written exposure summary of what was reviewed, found and changed, what remains, and your next steps in order. [P7 §4 + baseline: private-exposure-assessment] *(label "You keep" [new], used on all three stages)*

### 4. Stage 2 — Harden
- **Label:** 2 · Harden [2a §6.4]
- **H3:** Settings, accounts and recovery rebuilt around your risks. Security keys supplied and configured. [2a §6.4, as in en.json]
- **Method line:** Hardening is Toza's own method, developed from public guidance of government security agencies and security vendors. [2a §6.3]
- **Body:** The work can include closing unwanted access, strengthening sign-in and recovery, and changing sharing permissions. Dr. Tabansky explains each material change and its effects before you approve it. [baseline: what-happens-during-the-visit, edited]
- **You keep:** Your phone, computer, accounts and home network, hardened around your risks. [P7 §4]

### 5. Stage 3 — Verify
- **Label:** 3 · Verify [2a §6.4]
- **H3:** Changes tested and checked, and you are taught to use them. A private dated record of the work. [2a §6.4]
- **Body:** Dr. Tabansky works with you on granting access, sharing information, signing in and recovering accounts. You learn how to use the changed arrangements in daily life. [baseline: what-happens-during-the-visit, edited] Every tier includes a follow-up visit after about four weeks. [P7 §1]
- **You keep:** A private dated record of the work, one for each person. [baseline: what-happens-during-the-visit, edited]

### 6. The first step
- **Eyebrow:** Start here [UI]
- **H2:** A senior check-up of your digital life. [P7 §4]
- **Price line:** Private Exposure Assessment · ₪4,000 [P7 §4, facts]
- **Body:** Half a day in person with Dr. Tabansky, urgent first aid on the spot, and a written exposure summary you keep whether or not you continue. [P7 §4]
- **List:**
  - Covers one main phone and one computer, iPad or second phone, on the same main account (Apple or Android). [facts]
  - Urgent first aid with your approval, including removing a malicious app or profile where that can be done safely. [2a §5 They know something]
- **Credit line:** Counts in full toward your protection if you continue within 30 days. [P7 §4]
- **Link:** Conditions → [UI]

### 7. Protection tiers
- **H2:** Then the protection that fits your household. [P7 §4, edited from the Pricing lead]
- **Rows (name · price · line):**
  - Personal Shield · ₪32,000 · For one person. [P7 §4]
  - Personal Shield for Two · ₪45,000 · For you and one other person. [P7 §4]
  - Inner Circle · ₪70,000 · For a household of up to four. [P7 §4]
- **Line:** The first step is included. Each price is fixed and agreed in writing before work begins. [P7 §4]
- **Line:** Every tier includes questions answered by WhatsApp or Signal within one working day, for 60 days. [P7 §1]
- **Line:** After the 60 days: Annual Care for past clients, from ₪12,000 a year. [P8 §5]
- **Link:** All protection tiers → (/en/pricing/) [UI]

### 8. Contact
- Shared contact block, unchanged. [2a §6.2]

---

## 2. About Dr. Tabansky — `/en/about/`

- **Page title:** About Dr. Lior Tabansky — Toza [new]
- **Meta description (136 chars):** Why Dr. Lior Tabansky created Toza: expert attention, in person, for the private life that runs on phones, accounts and vendor defaults. [new]

### 1. Hero
- **Eyebrow:** About Dr. Tabansky [UI]
- **H1:** Why I created Toza. [baseline: why-us]
- **Support:** People who give important decisions considerable care still entrust much of their digital privacy to vendor defaults. I created Toza to give that part of your life the expert attention it deserves. [baseline: why-us]
- **Portrait caption:** Dr. Lior Tabansky · In person · With you present · You control your credentials [2a §4]
- **Buttons:** Message on WhatsApp · Signal · Call me back [2a §6.2]

### 2. A personal note
- **H2:** A personal note. [baseline: why-us]
- **Body:**
  - In two decades of cybersecurity work, I kept noticing a contradiction. People are discerning about their advisers, investments and personal choices, yet their phones, accounts and apps still run on defaults or arrangements someone made for them years ago. [baseline: why-us]
  - Those settings were not chosen around their private risks. Private information can become leverage over your money, reputation and decisions. [baseline: why-us]
  - I created Toza to bring my cybersecurity experience directly to private individuals: understand their circumstances, identify the risks and carry out protection fitted to their lives. [baseline: why-us]
- **Signature:** Dr. Lior Tabansky [baseline: why-us]

### 3. One person throughout
- **H2:** The same expert, from first look to final check. [2a §4]
- **Body:** When you engage Toza, you work with me personally from understanding the situation to making and verifying the agreed changes. [baseline: why-us] I apply my judgment to your private circumstances and personally carry out the agreed technical work. [baseline: why-us, edited: "At Toza, I apply that judgment" → "I apply my judgment", because the World Bank paragraph it referred to is removed]

### 4. Method
- **H2:** Establish the risks. Build the protection around them. [baseline: why-us]
- **Method line:** Hardening is Toza's own method, developed from public guidance of government security agencies and security vendors. [2a §6.3]
- **Body:** I select and adapt the relevant measures to your threat model and the services you need to keep using. The result is protection fitted to your circumstances, with practical teaching so you can use it. [baseline: why-us]
- **Links:** Professional profile ↗ [2a §6.3] · How it works → [UI]

### 5. Contact
- Shared contact block, unchanged. [2a §6.2]

*Removed from baseline why-us:* the World Bank / 11 countries paragraph, the NCSC/NSA/DoD guidance paragraph (replaced by the method line, per 2a §3), the old ₪3,600 / ₪14,000 / credit paragraphs, and the "Before you message" warning (now FAQ A1, A2).

---

## 3. FAQ — `/en/faq/`

- **Page title:** Questions — Toza [new]
- **Meta description (139 chars):** Plain answers about the first step, protection tiers, privacy, Annual Care and what Toza does not do, before you contact Dr. Lior Tabansky. [new]

### 1. Hero
- **Eyebrow:** FAQ [UI]
- **H1:** Questions, answered plainly. [baseline: faq]
- **Support:** You do not need to know the technical terms or be certain that something is wrong. [baseline: faq]
- **Caption:** Dr. Lior Tabansky · In person · You control your credentials [2a §5]
- **Buttons:** Message on WhatsApp · Signal · Call me back [2a §6.2]
- **Group links:** Before you get in touch · The first step · Protection tiers · Privacy and control · What Toza does not do · For attorneys · Prices and timing [2a §7, edited]
- **Toggle:** Expand all answers [baseline: faq]

Suggested anchors for deep links: `#before`, `#first-step`, `#tiers`, `#privacy`, `#boundaries`, `#attorneys`, `#prices`. Situation pages link to `#boundaries` ("Questions about separation and privacy" etc.); the Attorneys page links to `#attorneys`.

**Open by default (6):** A3, A4, B1, B3, C1, G1. All others are closed.

### 2. Group A — Before you get in touch (`#before`)
**H2:** Before you get in touch. [2a §7]

**A1. What should I send in the first message?**
A short, neutral message through WhatsApp or Signal, such as: "I'd like a private conversation. Please let me know the next step." Dr. Tabansky replies personally as soon as possible. Do not send passwords, recovery codes, screenshots, legal documents, intimate material or details, or detailed allegations in that first message. Keep identifying case details out of it as well. [baseline: faq; last sentence baseline: attorneys, edited]

**A2. Can someone notice my contact with Toza?**
Contact through WhatsApp or Signal is not guaranteed to be invisible on your device or account. Keep the first message short and neutral. [baseline: faq]

**A3. Is the first conversation the paid service?** *(open)*
No. The first conversation checks whether Toza fits your situation, whether anything appears urgent and what the next step should be. It is free and includes no device inspection, mapping, diagnosis or technical work. Contacting Toza does not commit you to a purchase. [baseline: faq; "free" 2a §6.2]

**A4. What happens before I pay?** *(open)*
If the service fits, you receive a written offer with the work, inclusions, exclusions, price, agreed additions and payment terms. You accept it explicitly and pay; then the visit is scheduled. No paid work starts before acceptance and receipt of payment. Preparation instructions are sent directly. [baseline: faq, edited]

**A5. Do I need to know what's wrong before I get in touch?**
No. You can have a concern, a hunch, or a wish to take a more deliberate approach to your digital life. You do not need to identify an account, setting or technical fault. The first conversation checks whether Toza fits; examining your digital environment belongs to the first step. A concern alone does not establish that someone has accessed your information. [baseline: faq, edited]

### 3. Group B — The first step (`#first-step`)
**H2:** The first step (₪4,000). [2a §7, price from facts]

**B1. What do I get for ₪4,000?** *(open)*
A senior check-up of your digital life: half a day in person with Dr. Tabansky. [P7 §4] He listens to your concerns, inspects the relevant devices, accounts and access, and explains what the findings mean for you. Where urgent exposure can be addressed safely within the agreed scope, he makes the changes with your approval. You keep a written exposure summary with ordered next steps. [baseline: faq, edited] The ₪4,000 counts in full toward a tier that begins within 30 days. [P7 §1]

**B2. What does it cover, and how long does it take?**
One main phone and one computer, iPad or second phone, on the same main account (Apple or Android). [facts] Dr. Tabansky reviews the relevant identities, accounts, apps, permissions, signed-in devices, recovery routes and shared services. Allow half a day; it typically takes four hours. The visit completes the agreed intake, access mapping, diagnosis and approved urgent first aid. The review stays within your authorized environment and is not a promise to find accounts or devices that have not been identified. [baseline: faq, edited; "half a day" P7 §4]

**B3. What do I receive if I don't continue?** *(open)*
A written exposure summary: what was reviewed, what urgent exposure was found, what was changed, what remains and the recommended next steps. You keep it whether or not you continue. There is no automatic continuation to a protection tier. [baseline: faq, edited; P7 §4]

**B4. What if you find something serious outside my concern?**
Dr. Tabansky explains it and obtains your approval before addressing it. If the proposed work expands the scope or price, that is agreed with you first. Finding an urgent problem does not authorize unagreed work or charges. [baseline: faq, edited]

**B5. Can you remove spyware or a malicious app?**
Where it can be done safely within the agreed scope, yes. Urgent first aid during the first step can include removing a malicious app or profile, with your approval. Dr. Tabansky explains each material change before acting. [2a §5; baseline: what-happens-during-the-visit] Removing it does not prove who installed it or how. [new]

### 4. Group C — Protection tiers (`#tiers`)
**H2:** Personal Shield, for Two and Inner Circle. [2a §7, edited for the new tier names]

**C1. What does Personal Shield include?** *(open)*
Personal Shield costs ₪32,000 for one person, with the first step included. Dr. Tabansky hardens your phone, computer, accounts and home network around your risks, in person. [P7 §4] It includes up to three everyday devices, two security keys supplied, configured and tested, new core accounts and essential migration where needed, personal teaching, testing of material changes, a private dated record, a follow-up visit after about four weeks, and questions answered by WhatsApp or Signal for 60 days. [P7 §1; baseline: faq]

**C2. What do Personal Shield for Two and Inner Circle include?**
Personal Shield for Two (₪45,000) is for you and one other person: each person's phone, computer and accounts, your home network and four security keys. Inner Circle (₪70,000) is for a household of up to four, with eight security keys and a review visit at twelve months. Both include the follow-up visit and 60 days of answered questions. If you authorize it, Dr. Tabansky coordinates with your lawyer or family office. [P7 §4]

**C3. In Two or Inner Circle, who sees whose records?**
Each person receives a private dated record. The home-network work is recorded separately. Personal details are shared only with that person's consent; being part of the same engagement does not grant access to another person's information. [baseline: faq, edited]

**C4. Does migration include all my files and old accounts?**
Essential migration covers identity, recovery routes and critical-service access where needed. Historical archives and bulk data migration require a separately agreed scope. The written offer identifies the work to be done; the service does not promise unlimited accounts or data transfers. [baseline: faq]

**C5. What does the 60-day question line cover?**
For 60 days after the work is complete, you can send questions by WhatsApp or Signal and receive an answer within one working day. [P7 §1; "after the work is complete" new] It covers questions and guidance about your setup. It is not new work and not an emergency line; urgent needs go through an urgent visit. [P7 §1] There is no remote control of your devices. [baseline: faq, edited]

### 5. Group D — Privacy and control (`#privacy`)
**H2:** Privacy and control. [2a §7]

**D1. Do I give you my passwords or remote access?**
You control your passwords, recovery codes and authentication throughout. Do not send them in advance. You may need to sign in on your own devices while we work. Toza does not keep your credentials for ongoing use or remotely control your devices. [baseline: faq]

**D2. Will you see my messages or photos?**
Some information may be visible on your own screen where it is necessary for the agreed work, with you present. We explain the relevant access and agree what needs to be reviewed. The service is not a general inspection of your private content. [baseline: faq]

**D3. Do you keep records or use the cloud?**
Your situation and the information you share are handled confidentially. Your accounts and shared services may themselves use cloud systems. During the core engagement, Toza does not upload a client dataset to a Toza cloud-analysis platform or retain a copy or comprehensive log of your digital life beyond agreed deliverables and ordinary lawful business records. This does not mean that no cloud services or administrative records exist. [baseline: faq]

**D4. Do you monitor my devices or install software?**
No. Toza does not monitor your devices or install security software on them. The work focuses on the settings and access arrangements within your authorized environment. Every protection tier also includes practical security habits and personal teaching so you understand how to use the resulting setup. [baseline: faq, edited: "Personal Shield and Inner Circle Shield" → "Every protection tier"]

### 6. Group E — What Toza does not do (`#boundaries`)
**H2:** What Toza does not do. [2a §7]

**E1. Can you prove who accessed my account, investigate someone or collect evidence?**
No. We examine your own authorized digital environment and reduce the exposure identified within the agreed scope. We do not investigate another person, attribute past activity, reconstruct events forensically, collect court evidence or give legal advice. Finding a current access path does not prove who used it or how information reached someone else. [baseline: faq] Changing access cannot recall copies already held elsewhere. [baseline: pricing, edited]

**E2. Will the other side notice the changes?**
Some changes are visible. Ending a signed-in session, for example, signs that device out, and some changes create notifications for other users. [baseline: faq; separation-divorce, edited] We explain material changes and agree their timing and sequence with you before acting. We do not promise that changes will go unnoticed. [baseline: faq]

**E3. Will this escalate my dispute? Is it legal?**
Dr. Tabansky works only within your own authorized digital environment, on access you are authorized to manage. Changing recovery details or ending shared access can interrupt access or create notifications, so the effects are explained before you approve them. With your permission, timing can be coordinated with your attorney. Legal strategy stays with your attorney; Toza does not give legal advice. [baseline: attorneys, they-know-something, faq, edited]

**E4. Can you work on company systems or a relative's account?**
Only where you have lawful access and agreed authority. A dispute does not itself authorize changes to company systems or another person's accounts. A family connection does not authorize work on someone else's account or device. Toza does not determine who is entitled to an account, document or asset, and is not a corporate security audit. [baseline: business-dispute, inheritance-clash, edited]

**E5. Is the dated record a certification or a security guarantee?**
No. It is a practical, dated account of the work performed, not a forensic report, legal opinion, court-evidence document or certification. A technically blocked or declined action is not presented as a completed change. The record does not guarantee that every possible exposure has been found or removed. [baseline: faq]

**E6. How is this different from IT support or a private investigator?**
Other help is useful for its own scope: [baseline: faq, edited]

| Option | Useful for |
|---|---|
| IT support | Device faults, setup, maintenance and agreed technical work |
| Apple, Google or Microsoft support | Questions within that provider's products |
| A password manager or antivirus | Managing credentials; detecting threats the product covers |
| A private investigator | Investigative work within an agreed lawful scope |

Toza applies expert judgment to your actual setup: tracing relevant connections, explaining what they allow and selecting changes in a considered sequence. [baseline: faq] *(table cut from 7 rows and 2 columns to 4 rows and 1 column to fit 80 words)*

### 7. Group F — For attorneys (`#attorneys`)
**H2:** For attorneys. [2a §7]

**F1. Does a referral authorize access to my client's information?**
No. A referral does not authorize access to devices, accounts or findings. The client must authorize the work and have lawful authority over the environment being reviewed. Coordination with counsel requires the client's permission; the referring attorney is not automatically a recipient of personal information or findings. [baseline: attorneys]

**F2. What does the attorney-friendly summary contain, and who decides?**
With the client's explicit authorization, an attorney-friendly summary can describe the work and remaining issues. The client decides what may be disclosed. [baseline: attorneys] It is a practical account of the work, not legal advice or a forensic report, and it does not establish what another person did. [baseline: they-know-something, attorneys, edited]

**F3. Can timing be coordinated with proceedings?**
Yes, with the client's permission. Timing of changes can be coordinated with counsel around a filing, a negotiation or a hearing. [2b §3, edited] Legal strategy remains with the attorney; the client authorizes technical changes. [baseline: attorneys]

**F4. How does referral work commercially?**
A referral fee is paid when a referred client's first step is paid, and a further fee if the client continues to a protection tier. The terms are in a one-page agreement. [2b §3, edited] To discuss it, tap "Discuss a referral". [UI]
*(Fee amounts are left out on purpose: ₪600 and the continuation fees are not in facts.json, and their public visibility is still an open owner item, 2a "Open items" (2).)*

### 8. Group G — Prices and timing (`#prices`)
**H2:** Prices and timing. [2a §7]

**G1. How does the ₪4,000 first step count toward a tier?** *(open)*
In full, when the tier's work begins within 30 days of completion of the first step. You then pay the balance: ₪28,000 for Personal Shield, ₪41,000 for Personal Shield for Two or ₪66,000 for Inner Circle. After day 30, the tier is charged at its full price. If the first step shows you need the next tier, you pay that tier's price less the ₪4,000 already paid, within the same 30 days. [P7 §1; "of completion of the first step" baseline: faq, edited]

**G2. What if the first step shows I need more than a tier includes?**
Dr. Tabansky proposes the next tier, with its full allowance, before any work begins. Larger households, several residences or household staff receive one fixed price in writing after the first step, from ₪90,000. There are no per-device or per-hour charges. [P7 §1, §4]

**G3. Can you come urgently, and what does it cost?**
In Central Israel, when available. Availability is confirmed before you pay. For an accepted urgent booking, arrival is within four hours of both Toza's acceptance and receipt of payment. This is an arrival commitment, not a four-hour completion promise. The surcharge is ₪4,800, added to the agreed service price; at weekends or holidays it is ₪6,000 instead. [baseline: faq, edited]

**G4. What happens after the 60 days?**
Past clients can continue with Annual Care: the question line on the same terms for twelve months, a check visit, setup of a new or replaced phone or computer, a replacement security key and an update to the dated record. It costs ₪12,000 a year for one person, ₪15,000 for two and ₪20,000 for a household of up to four. Join within six months of the question line ending. [P8 §5, edited]

- **Link under group G:** All terms: Conditions → [new]

### 9. Contact
- Shared contact block, unchanged. [2a §6.2]

---

## 4. Conditions — `/en/conditions/`

Printable. Commercial terms only (R-2): no boundary or warning sentences. Plain headings, short numbered terms.

- **Page title:** Conditions — Toza [new]
- **Meta description (131 chars):** Toza's prices and commercial terms on one printable page: the first step, protection tiers, Annual Care, urgent visits and payment. [new]

### 1. Header
- **Eyebrow:** Conditions [UI]
- **H1:** Prices and conditions. [UI, link label "Prices and conditions →" (2a §6.1)]
- **Lead:** Every engagement is carried out by Dr. Lior Tabansky in person, at your home or office, with you present and in control of your credentials. Each price is fixed and agreed in writing before work begins. [P7 §4]
- **Date line:** Terms as of 16 October 2026. [new]
- **Button:** Print this page [new]

### 2. Prices
- **H2:** Prices [new]
- **Table:**

| Service | For | Price |
|---|---|---|
| Private Exposure Assessment (first step) | Everyone starts here | ₪4,000 |
| Personal Shield | One person | ₪32,000 |
| Personal Shield for Two | You and one other person | ₪45,000 |
| Inner Circle | A household of up to four | ₪70,000 |
| Larger households, several residences or household staff | One fixed price, set after the first step | from ₪90,000 |
| Annual Care, one person | Past clients | ₪12,000 a year |
| Annual Care for two | Past clients | ₪15,000 a year |
| Annual Care, household of up to four | Past clients | ₪20,000 a year |
| Urgent visit surcharge | Added to the agreed service price | ₪4,800 |
| Urgent visit surcharge, weekend or holiday | Replaces the ordinary surcharge | ₪6,000 |

[P7 §1, §4; P8 §3; facts] *(row labels and "For" column [new] as table wording)*
- **Line:** All prices include VAT. [COPY-BRIEF]

### 3. The first step
- **H2:** The first step: Private Exposure Assessment [P7 §4]
1. Covers one main phone and one computer, iPad or second phone, on the same main account (Apple or Android), with the relevant identities, accounts, apps, permissions, recovery routes and shared services. [facts; baseline: faq, edited]
2. Half a day in person, typically four hours. The visit completes the agreed intake, access mapping, diagnosis and approved urgent first aid, including removing a malicious app or profile where that can be done safely. [P7 §4; baseline: faq; 2a §5]
3. Four hours is a guide; the visit completes its agreed scope. [new, from baseline faq "a typical duration, not an automatic cutoff"]
4. You receive a written exposure summary of what was reviewed, found and changed, what remains and the next steps, whether or not you continue. [P7 §4; baseline: faq, edited]
5. For Personal Shield for Two and Inner Circle, the first step covers the first person's devices. The other people are reviewed within the tier. [baseline: faq, edited]

### 4. How the first step counts toward a tier
- **H2:** The 30-day rule [new]
1. The ₪4,000 counts in full toward a tier whose work begins within 30 days of completion of the first step. You then pay the balance. [P7 §1; baseline: faq, edited]
2. Balances: Personal Shield ₪28,000 · Personal Shield for Two ₪41,000 · Inner Circle ₪66,000. [P7 §1, facts]
3. The tier qualifies once its work begins within the 30 days. [new, from baseline "Booking alone does not qualify", turned positive]
4. After day 30, the tier is charged at its full price. [P7 §1]
5. Moving up a tier: if the first step shows the next tier is needed, you pay that tier's price less the ₪4,000 already paid, within the same 30 days. [P7 §1]
6. The first step counts once per engagement, also for a group. [baseline: faq, edited]
7. Larger households: the fixed price is set in writing after the first step, from ₪90,000, and the ₪4,000 counts toward it on the same 30-day terms. [P7 §4; credit clause new, from baseline Bespoke credit rule]

### 5. Choosing the tier
- **H2:** When a household needs more [new]
1. If the first step shows more than a tier includes, such as more people or devices, a second home, staff or company devices, Dr. Tabansky proposes the next tier, with its full allowance, before any work begins. [P7 §1]
2. Beyond Inner Circle, he sets one fixed price in writing. [P7 §1]
3. Each tier has one fixed price, whatever the number of devices or hours within its allowance. [new, positive form of P7 §1 "There are no per-device or per-hour charges"]
4. Agreed additions are separate, and any added scope or price is agreed in writing before that work begins. [baseline: llms, edited]

### 6. What each tier includes
- **H2:** Allowances in every tier [new]
1. Everyday devices (phone, computer, tablet or second phone): up to three per person, shared within the tier. Personal Shield three, Personal Shield for Two six, Inner Circle twelve. [P7 §1, facts devicesPerPerson]
2. Security keys, supplied, configured and tested: Personal Shield two, Personal Shield for Two four, Inner Circle eight. [P7 §1, facts securityKeys]
3. One home network and router, in addition to the devices. The work covers accessible settings and authorized administration. Replacement hardware, further connected devices and additional locations are quoted separately. [P7 §1; baseline: faq, edited]
4. Essential migration covers identity, recovery routes and critical-service access where needed. Historical archives and bulk data migration are scoped separately. [baseline: faq, edited]
5. A follow-up visit after about four weeks. [P7 §1]
6. Questions answered by WhatsApp or Signal for 60 days (see 7). [P7 §1]
7. Coordination with your lawyer or family office, if you authorize it. [P7 §1]
8. A private dated record for each person; home-network work is recorded separately. [baseline: faq, edited]
9. Inner Circle adds a review visit at twelve months. [P7 §1]

### 7. The 60-day question line
- **H2:** The 60-day question line [new]
1. Questions answered by WhatsApp or Signal within one working day, for 60 days from completion of the tier's work. [P7 §1; start point new]
2. For questions and guidance about the work done. New work is agreed and priced separately; urgent needs go through an urgent visit. [P7 §1, turned positive]
3. After the 60 days, the line can continue through Annual Care. [P7 §1, P8]

### 8. Annual Care
- **H2:** Annual Care [P8 §5]
1. For past clients, after the 60-day question line. Twelve months of: [P8 §5]
   - Questions answered by WhatsApp or Signal within one working day, as before
   - A check visit in person: devices, accounts, recovery settings and keys re-checked, and your dated record updated
   - A new or replaced phone or computer set up the same way
   - A replacement security key if one is lost or broken
   - First available appointments
   - Coordination with your lawyer or family office, if you authorize it [P8 §2]
2. ₪12,000 a year for one person, ₪15,000 for two, ₪20,000 for a household of up to four. Paid yearly in advance. [P8 §5]
3. The term starts the day the 60-day question line ends. [P8 §3]
4. Household Care covers up to two new or replaced devices and up to two replacement keys. For Inner Circle, the first Care term moves the check visit to about month six; the twelve-month review stays. [P8 §2, edited]
5. Further keys and any replacement router are charged at cost. Added devices are scoped separately. [P8 §2, edited]
6. Joining: within six months of the question line ending. After that, we start again with a first step (₪4,000), which counts in full toward Annual Care within 30 days. [P8 §3, §5]
7. Renewal: at the published price at the time. The invoice is sent 30 days before the term ends, and the line stays open for 14 days while it is settled. [P8 §3, edited]
8. Scoped and priced separately: new people; a new or second home; company devices or staff; devices beyond the original allowance; any incident, such as a suspected compromise; urgent visits, on the urgent terms below. [P8 §2, §5, edited]

### 9. Urgent visits
- **H2:** Urgent visits in Central Israel [2a §5]
1. Availability is confirmed before you pay. [baseline: faq]
2. For an accepted urgent booking, arrival is within four hours of both Toza's acceptance and receipt of payment. The clock starts when both conditions are met. [baseline: faq, edited]
3. The four hours are an arrival commitment; the visit then runs its agreed course. [new, positive form of baseline "an arrival commitment, not a four-hour completion promise"]
4. Surcharge ₪4,800, added to the agreed base service price. At weekends or holidays the surcharge is ₪6,000, replacing the ordinary surcharge. Other charges apply only if separately agreed. [baseline: faq, edited]
5. Elsewhere in Israel, the arrival time is agreed before you accept. [new, from baseline; "travel terms" dropped per V-029]

### 10. Payment before work
- **H2:** Payment before work [new]
1. Every paid service follows three steps: a written scope and price (the work, inclusions, exclusions, price, agreed additions and payment terms); your explicit acceptance; receipt of payment. The work is then scheduled. [baseline: faq, llms, edited]
2. This applies to the first step, each tier or its balance, Annual Care and any agreed addition. [new]
3. The first conversation is free and commits you to nothing. [2a §6.2]

### 11. Footer of the page
- **Line:** Questions about these terms? [new] Message on WhatsApp · Message on Signal · Call me back (text links) [2a §6.2]
- **Link:** Privacy, boundaries and other questions: FAQ → [new]

---

## Notes for the owner and builder

1. **Fee amounts left off the site:** referral fees (₪600, ₪2,000 / ₪3,000 / ₪4,500) are not in facts.json, so FAQ F4 states the mechanism only. Add them to facts.json first if they should be public.
2. **Travel (V-029):** baseline "Outside Central Israel, arrival time and travel terms are agreed" is shortened to "Elsewhere in Israel, the arrival time is agreed before you accept." (Conditions 9.5). Delete the line if even that is too much.
3. **New start point:** the 60-day line runs "from completion of the tier's work" (FAQ C5, Conditions 7.1). P7 does not say when it starts; the baseline started support at completion. Please confirm.
4. **Larger households and the first step:** Conditions 4.7 applies the 30-day credit to the "from ₪90,000" price, following the baseline Bespoke rule. Please confirm.
5. **Positive wording in Conditions:** three baseline "not" terms are rephrased positively to keep Conditions free of negative sentences (R-2, 2a §8.5): 3.3, 4.3, 9.3. The negative originals stay in the FAQ (B2, G3).
6. **Old URLs → 301:** `/en/private-exposure-assessment.html` and `/en/what-happens-during-the-visit.html` → `/en/how-it-works/`; `/en/why-us.html` → `/en/about/`; `/en/faq.html` → `/en/faq/` (2a §3).
