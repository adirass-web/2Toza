# Voice changes: Toza speaks by name (18 Oct 2026)

**For:** Dr. Lior Tabansky (owner approval). **Decision:** V-045 in `docs/decisions.md`. **Branch:** `design/toza-voice`.

Your instruction: *"My name appears too often. I said TOZA and one page one mention about why ME, instead its my face and name everywhere."*
Your choices: Toza speaks **by name** ("Toza assesses…", *it*, never *he* or *we*); heroes are **typography only** (no portrait) on every page except About.

What this change does:

- Your name and portrait now appear **only on About** (your "why I created Toza" story, the portrait, the signature and the "Professional profile ↗" link to cyberdrtabansky.com), plus **one factual line in Conditions** saying who carries out the service.
- Everywhere else Toza is the one acting. Each sentence was rewritten to read naturally. Every fact, price, promise and boundary is unchanged, and so are *in person*, *at your home or office*, *with you present* and *in control of your credentials*.
- The other heroes no longer show the portrait or the name: headline, a thin brass line, the lead sentence, the buttons, and Toza's promise line underneath: "In person · With you present · You control your credentials" (not on Pricing, where the next block already says it, or on Conditions).
- The three-stage blocks (dark sections) are being redesigned separately and were not changed here.

## Name count per page

"Name" = "Tabansky" (Dr. Lior Tabansky / Dr. Tabansky). In addition, 6 "he" (meaning you) and 7 "we" are gone: Toza is "it".

| Page | Page copy before → after | Title, meta, alt before → after |
|---|---|---|
| Home | 4 → 0 | 2 → 0 |
| How it works | 7 → 0 | 2 → 0 |
| About | 3 → 2 (portrait name, signature) | 3 → 3 (title, meta, portrait alt) |
| Pricing | 4 → 0 | 0 → 0 |
| FAQ | 11 → 0 | 2 → 0 |
| Conditions | 2 → 1 (provider line) | 0 → 0 |
| Separation or divorce | 4 → 0 | 2 → 0 |
| Business or founder dispute | 4 → 0 | 2 → 0 |
| Inheritance conflict | 4 → 0 | 2 → 0 |
| Someone knows something | 4 → 0 | 2 → 0 |
| For attorneys | 6 → 0 | 2 → 0 |
| **Total** | **53 → 3** | **19 → 3** |

In the built site, "Tabansky" now appears only on /en/about/ (5 times: title, meta, portrait alt, name, signature) and once on /en/conditions/. Before: 72 times across 11 pages. "Professional profile ↗" was on 7 pages (Home, About, Attorneys, four situation pages). Now it is on About only.

## Genuinely new wording (please approve)

Everything else either replaces your name with "Toza" or shortens a sentence that already existed.

1. Home title: **"Toza — Private, in-person digital security"** (V7)
2. Home, method heading: **"One method, from first look to final check."** (V10)
3. How it works, hero heading: **"Talk through your concerns. Then make the changes together."** (V12)
4. How it works, stages-in-detail heading: **"Three stages, one method."** (V14). Note: the shared stages heading "Three stages, one person." stays in the dark stage blocks until their redesign.
5. Pricing, heading of the price strip (heard by screen readers only): **"Three stages and their prices."** (V22)
6. Contact block, every page: **"Your message receives a personal reply."** (V3)
7. FAQ "first message": **"You receive a personal reply as soon as possible."** (V25)
8. Attorneys: **"Your client receives a personal reply."** (V62) and **"Toza asks your client before confirming to you that the referral arrived."** (V63)
9. Pricing statement: **"Toza carries out every engagement in person, at your home or office, with you present and in control of your credentials."** (V4)

## Shared lines (appear on several pages)

| # | Where | Before | After | Note |
|---|---|---|---|---|
| V1 | Hero, all pages except About | Portrait, "Dr. Lior Tabansky", tagline beside the headline | Typographic hero: headline, brass hairline, lead, buttons; promise line under the buttons | removed (portrait and name) |
| V2 | Promise line "In person · With you present · You control your credentials" | Founder byline tagline | Toza's own promise line (shared `promise`), under the hero buttons; About uses it as the portrait tagline | moved, same words |
| V3 | Contact block (all pages but Conditions) | Dr. Tabansky replies personally. The first conversation is free and commits you to nothing. | Your message receives a personal reply. The first conversation is free and commits you to nothing. | new wording |
| V4 | Pricing statement (shared "engagement" line) | Every engagement is carried out by Dr. Lior Tabansky in person, at your home or office, with you present and in control of your credentials. | Toza carries out every engagement in person, at your home or office, with you present and in control of your credentials. | rewritten |
| V5 | "Coordinates" line: Pricing notes, FAQ (tiers) | If you authorize it, Dr. Tabansky coordinates with your lawyer or family office. | If you authorize it, Toza coordinates with your lawyer or family office. | name → Toza |
| V6 | First-step offer: Pricing | A senior check-up of your digital life: half a day in person with Dr. Tabansky, urgent first aid on the spot, and a written exposure summary you keep whether or not you continue. | A senior check-up of your digital life: half a day in person, urgent first aid on the spot, and a written exposure summary you keep whether or not you continue. | rewritten ("with Dr. Tabansky" removed) |

## Home

| # | Where | Before | After | Note |
|---|---|---|---|---|
| V7 | Page title | Toza — Dr. Lior Tabansky | Toza — Private, in-person digital security | new wording |
| V8 | Hero lead | Private conversations, finances and plans can become leverage over you. Dr. Lior Tabansky assesses and hardens your phone, computer and accounts with you, in person. | Private conversations, finances and plans can become leverage over you. Toza assesses and hardens your phone, computer and accounts with you, in person. | name → Toza |
| V9 | Hero | Portrait, name and tagline | Typographic hero with the promise line (V1, V2) | removed |
| V10 | Method heading | The same expert, from first look to final check. | One method, from first look to final check. | new wording |
| — | Method links | Professional profile ↗ | (none) | removed |
| — | Method links | About Dr. Tabansky | (none) | removed. The footer "About" link stays. **Your call:** keep it removed, or bring it back as a neutral link such as "Why Toza was created". |
| — | Contact | V3 | | |

## How it works

| # | Where | Before | After | Note |
|---|---|---|---|---|
| V11 | Meta description | Assess, Harden, Verify: how Dr. Lior Tabansky works on your devices and accounts in person. The first step is ₪4,000 and counts toward protection. | Assess, Harden, Verify: how Toza works on your devices and accounts in person. The first step is ₪4,000 and counts toward protection. | name → Toza |
| V12 | Hero heading | Work through your concerns with the person who makes changes. | Talk through your concerns. Then make the changes together. | new wording |
| V13 | Hero lead | You do not have to work out what is wrong before you meet. Dr. Lior Tabansky assesses your devices and accounts with you, hardens them around your risks and tests the changes. | You do not have to work out what is wrong before you meet. Toza assesses your devices and accounts with you, hardens them around your risks and tests the changes. | name → Toza |
| — | Hero | Portrait, name and tagline | Typographic hero with the promise line | removed |
| V14 | Stages-in-detail heading | Three stages, one person. | Three stages, one method. | new wording |
| V15 | Assess | Dr. Tabansky starts with your situation: what changed, what concerns you, which accounts matter and who previously had legitimate access. He then examines how your devices, identities and accounts are connected, and what those connections allow. | The first step starts with your situation: what changed, what concerns you, which accounts matter and who previously had legitimate access. Toza then examines how your devices, identities and accounts are connected, and what those connections allow. | rewritten |
| V16 | Harden | … Dr. Tabansky explains each material change and its effects before you approve it. | … Toza explains each material change and its effects before you approve it. | name → Toza |
| V17 | Verify | Dr. Tabansky works with you on granting access, sharing information, signing in and recovering accounts. … | Toza works with you on granting access, sharing information, signing in and recovering accounts. … | name → Toza |
| V18 | First-step offer | Half a day in person with Dr. Tabansky, urgent first aid on the spot, and a written exposure summary you keep whether or not you continue. | Half a day in person, urgent first aid on the spot, and a written exposure summary you keep whether or not you continue. | rewritten |
| — | Contact | V3 | | |

## About (the one page about you)

| # | Where | Before | After | Note |
|---|---|---|---|---|
| V19 | Hero | Portrait, name, tagline | unchanged (the only portrait on the site) | kept |
| V20 | "The same expert, from first look to final check." | shared sentence (also on Home) | same words, now on About only | kept |
| — | Title, meta, letter, signature, "Professional profile ↗" | | unchanged | kept |
| — | Contact | V3 | | |

## Pricing

| # | Where | Before | After | Note |
|---|---|---|---|---|
| V21 | Hero | Typographic already | brass hairline added; no promise line (the statement below says it) | design only |
| V22 | Price strip heading (screen readers only) | Three stages, one person. | Three stages and their prices. | new wording |
| — | Statement | V4 | | |
| — | First step | V6 | | |
| — | Notes | V5 | | |
| — | Contact | V3 | | |

## FAQ

| # | Where | Before | After | Note |
|---|---|---|---|---|
| V23 | Meta description | … what Toza does not do, before you contact Dr. Lior Tabansky. | … what Toza does not do, before you contact Toza. | name → Toza |
| V24 | Hero | Small portrait, name, short tagline | Typographic hero with the promise line | removed |
| V25 | A1 first message | … Dr. Tabansky replies personally as soon as possible. … | … You receive a personal reply as soon as possible. … | new wording |
| V26 | B1 what you get | A senior check-up of your digital life: half a day in person with Dr. Tabansky. He listens to your concerns, inspects …. Where urgent exposure can be addressed safely within the agreed scope, he makes the changes with your approval. … | A senior check-up of your digital life: half a day in person. Toza listens to your concerns, inspects …. Where urgent exposure can be addressed safely within the agreed scope, the changes are made with your approval. … | rewritten |
| V27 | B2 coverage | … Dr. Tabansky reviews the relevant identities, … | … Toza reviews the relevant identities, … | name → Toza |
| V28 | B4 something serious | Dr. Tabansky explains it and obtains your approval before addressing it. | Toza explains it and obtains your approval before addressing it. | name → Toza |
| V29 | B5 spyware | … Dr. Tabansky explains each material change before acting. … | … Toza explains each material change before acting. … | name → Toza |
| V30 | C1 Personal Shield | … Dr. Tabansky hardens your phone, computer, accounts and home network around your risks, in person. … | … Toza hardens your phone, computer, accounts and home network around your risks, in person. … | name → Toza |
| — | C2 | V5 | | |
| V31 | D1 passwords | … You may need to sign in on your own devices while we work. … | … You may need to sign in on your own devices during the work. … | rewritten ("we" removed) |
| V32 | D2 messages/photos | … We explain the relevant access and agree what needs to be reviewed. … | … Toza explains the relevant access and agrees with you what needs to be reviewed. … | rewritten ("we" → Toza) |
| V33 | E1 proof/evidence | No. We examine your own authorized digital environment and reduce the exposure identified within the agreed scope. We do not investigate another person, … | No. Toza examines your own authorized digital environment and reduces the exposure identified within the agreed scope. It does not investigate another person, … | rewritten ("we" → Toza / it) |
| V34 | E2 noticing changes | … We explain material changes and agree their timing and sequence with you before acting. We do not promise that changes will go unnoticed. | … Toza explains material changes and agrees their timing and sequence with you before acting. It does not promise that changes will go unnoticed. | rewritten ("we" → Toza / it) |
| V35 | E3 escalation/legality | Dr. Tabansky works only within your own authorized digital environment, … | Toza works only within your own authorized digital environment, … | name → Toza |
| V36 | G2 needing more | Dr. Tabansky proposes the next tier, … | Toza proposes the next tier, … | name → Toza |
| — | Contact | V3 | | |

## Conditions

| # | Where | Before | After | Note |
|---|---|---|---|---|
| V37 | Hero lead (the one provider line) | Every engagement is carried out by Dr. Lior Tabansky in person, … (shared line) | same words, kept on Conditions only | kept (existing wording, no new claim) |
| V38 | When a household needs more, 1 | … Dr. Tabansky proposes the next tier, with its full allowance, before any work begins. | … Toza proposes the next tier, with its full allowance, before any work begins. | name → Toza |
| V39 | When a household needs more, 2 | Beyond Inner Circle, he sets one fixed price in writing. | Beyond Inner Circle, Toza sets one fixed price in writing. | name → Toza |
| V40 | Annual Care, joining | … After that, we start again with a first step (₪4,000), … | … After that, you start again with a first step (₪4,000), … | rewritten ("we" removed) |
| — | Hero | Typographic already | brass hairline added | design only |

## Separation or divorce

| # | Where | Before | After | Note |
|---|---|---|---|---|
| V41 | Meta description and hero lead | Accounts set up for a shared life can outlast it. Dr. Lior Tabansky finds, with you and in person, what still connects you. | Accounts set up for a shared life can outlast it. Toza finds, with you and in person, what still connects you. | name → Toza |
| V42 | Hero | Small portrait, name, short tagline | Typographic hero with the promise line | removed |
| V43 | "Choose which access you keep." | Some of it you still need. Dr. Tabansky shows you what each connection allows, … | Some of it you still need. Toza shows you what each connection allows, … | name → Toza |
| V44 | Stages block | Professional profile ↗ | (none) | removed |
| — | Contact | V3 | | |

## Business or founder dispute

| # | Where | Before | After | Note |
|---|---|---|---|---|
| V45 | Meta description | … Dr. Lior Tabansky helps you find where personal and business access meet, in person. | … Toza helps you find where personal and business access meet, in person. | name → Toza |
| V46 | Hero lead | … Dr. Lior Tabansky helps you find where personal and business access meet, and separate them deliberately. | … Toza helps you find where personal and business access meet, and separate them deliberately. | name → Toza |
| V47 | Hero | Small portrait, name, short tagline | Typographic hero with the promise line | removed |
| V48 | "See where personal and business access still meet." | Some of it you still need. Dr. Tabansky shows you what each connection allows and what depends on it, … | Some of it you still need. Toza shows you what each connection allows and what depends on it, … | name → Toza |
| V49 | Stages block | Professional profile ↗ | (none) | removed |
| — | Contact | V3 | | |

## Inheritance conflict

| # | Where | Before | After | Note |
|---|---|---|---|---|
| V50 | Meta description and hero lead | … Dr. Lior Tabansky works through it with you, in person. | … Toza works through it with you, in person. | name → Toza |
| V51 | Hero | Small portrait, name, short tagline | Typographic hero with the promise line | removed |
| V52 | "Access shared in good faith can still matter." | … Dr. Tabansky explains what each one allows and what ending it would mean. … | … Toza explains what each one allows and what ending it would mean. … | name → Toza |
| V53 | Stages block | Professional profile ↗ | (none) | removed |
| — | Contact | V3 | | |

## Someone knows something

| # | Where | Before | After | Note |
|---|---|---|---|---|
| V54 | Meta description and hero lead | … Dr. Lior Tabansky examines your devices and accounts with you and gives urgent first aid. | … Toza examines your devices and accounts with you and gives urgent first aid. | name → Toza |
| V55 | Hero | Small portrait, name, short tagline | Typographic hero with the promise line | removed |
| V56 | "Start with what can be checked." | … Dr. Tabansky shows what each one reveals or allows, and what to change now. | … Toza shows what each one reveals or allows, and what to change now. | name → Toza |
| V57 | Stages block | Professional profile ↗ | (none) | removed |
| — | Contact | V3 | | |

## For attorneys

| # | Where | Before | After | Note |
|---|---|---|---|---|
| V58 | Meta description | Refer a client to Dr. Lior Tabansky for in-person digital security … | Refer a client to Toza for in-person digital security … | name → Toza |
| V59 | Hero lead | Dr. Lior Tabansky sees your client in person, on their own devices and accounts. … | Toza works with your client in person, on their own devices and accounts. … | rewritten |
| V60 | Hero | Small portrait, name, short tagline | Typographic hero with the promise line | removed |
| V61 | What Toza does for your client | The first step is half a day in person with Dr. Tabansky. He reviews …, and gives urgent first aid on the spot. | The first step is half a day in person. Toza reviews …, and gives urgent first aid on the spot. | rewritten |
| V62 | Contact with one tap | … The first conversation is free, private and short. Dr. Tabansky replies personally. … | … The first conversation is free, private and short. Your client receives a personal reply. … | new wording |
| V63 | Coordination | Dr. Tabansky asks your client whether he may confirm to you that the referral arrived. | Toza asks your client before confirming to you that the referral arrived. | new wording |
| V64 | Method statement | Professional profile ↗ | (none) | removed |
| — | Contact | V3 | | |

## Not changed, on purpose

- The dark three-stage blocks (Home and situation pages), including "Three stages, one person.": redesign in progress separately.
- Footer and menu "About" link.
- Questions in the FAQ that address Toza as "you" ("Can you remove spyware…?"): that is the reader speaking.

## Open for you

1. **Home "About Dr. Tabansky" link:** removed. Keep it removed, or add a neutral link such as "Why Toza was created"?
2. **Provider line in Conditions:** it is the existing sentence in the Conditions opening ("Every engagement is carried out by Dr. Lior Tabansky in person, …"). If you would rather keep the opening in Toza's voice and name yourself in the terms, for example under "Payment before work", please give the exact legal wording (person or company).
3. The nine new lines above.
