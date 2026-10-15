# 1z Independent review of Phase-1 research (1a–1d)

Reviewer: independent, 2026-10-15.

## Verdicts

| File | Verdict | Why |
|---|---|---|
| 1a Benchmarks | **Pass with corrections** | 5 of 5 claims I checked hold up. Two recommendations go beyond Toza's facts: a phone line and a dated record. |
| 1b Audience/objections | **Pass with corrections** | It is honestly labelled as hypothesis. Three recommendations clash with the proof constraint or the doctrine, and two facts drop their qualifiers. |
| 1c Search demand | **Pass with corrections** | The sources are real and the uncertainty is mostly flagged. The funnel's low bound is overstated, it assumes a form, and one scope claim is unsupported. |
| 1d Site audit | **Pass with corrections** | 3 of 3 structural measurements reproduce. The word counts measure only visible text, which understates the pricing and FAQ pages by half or more. |

## Verification log

**External, 7 checks, all confirmed:**
- Google stalkerware ad ban: started 11 Aug 2020, with exceptions for private-investigation services and parental monitoring (BleepingComputer).
- Shopifreaks: $5.42 overall, legal tops the ranking at $8.58. The source is WordStream, and the article does not state a geography. 1c's "US-led" is therefore an inference, though a fair one.
- Superads: $1.78, all countries, not Israel-specific. The page contradicts itself on the date range.
- USI: Silver/Gold/Platinum cards with "Inquire for Pricing", no testimonials, phone number in the footer.
- Gavin de Becker: founder portrait and credentials, no CTA button, PPO licence numbers in the footer, client slider.
- C. Hoare: phone and email under "Quick links", "since 1672", 12 generations, news carousel.
- Pictet: "How do you like your calm?", "Find out more", "Since 1805", three-profile selector.

**Built HTML, 1d:**
- Confirmed: every primary CTA is `href="#contact"`, with 2–5 per page.
- Confirmed: accordion counts match exactly (index 1, pricing 8, faq 30, separation 2, why-us 1, the rest 0).
- Confirmed: index has about 114 words before the first CTA, consistent with 1d's "~130 fold words".
- Confirmed: the legal links are Hebrew-only, and Signal and WhatsApp appear on all 11 pages.

## Numbered corrections

1. **1d word counts measure visible text only.** Full `<main>` text gives these totals:

   | Page | Full text | 1d figure |
   |---|---|---|
   | faq | 2,601 | 432 |
   | pricing | 1,698 | 864 |
   | separation | 689 | 540 |
   | index | 917 | 865 |

   1d calls the FAQ "short answers (432 words)", which is wrong: the answers are in collapsed panels. The "pricing under ~300 words" target is therefore a cut of about 80%. That cut must not drop conditions (Doctrine §12), so it only works if the conditions move to a dedicated Conditions page. The method note should say "visible words".
2. **1d finding 5 proposes the block "Assessment fee credited".** This overstates the credit. Per llms.txt the credit is conditional: it applies only if the selected engagement begins within 14 days of completion, booking alone does not qualify, and it applies once per group. Use "eligible Assessment fee credited" with a link to the conditions.
3. **1c §1A says Toza "does not scan for or remove spyware as a product".** llms.txt does not say this. It excludes monitoring, forensic reconstruction and investigation, but includes "diagnosis" and "approved urgent first aid", which could involve removing a malicious profile or app. The owner must confirm the wording before it goes into ad or landing copy.
4. **1c funnel low bound is overstated.** Multiplying the stated low ends gives 714 clicks × 1.5% × 20% × 20% ≈ 0.4 Assessments. With 1c's own ₪15–20 CPC case and possible underspend, it is about 0.3. The honest range is **0–5, with zero a realistic outcome**, not "1–5".
5. **1c contains internal inconsistencies.**
   - The ₪15 CPC cap contradicts its own "₪15–20 may be real" scenario.
   - It counts "form" conversions and recommends a "neutral intake form", but 1a and the v2 direction say no form.
   - Break-even ignores that the Assessment credit means Assessment + Shield yields ₪14,000, not ₪17,600.
   - WhatsApp-click events will overcount enquiries, because many taps never send a message.
6. **1c's claim that the policy "has been revised since 2020" is unsourced.** Keep the instruction to check the live policy, and drop the claim.
7. **1a implication 6 calls for "a human phone line visible in the first screen".** Toza has no voice line, and call-back is only planned. Reframe it as visible WhatsApp/Signal plus a call-back option, pending a decision (open question 1).
8. **1a implication 8 lists "dated record, hardware keys" as proof of method.** Per llms.txt the keys belong to Personal Shield and Inner Circle, and the Assessment yields "a practical summary". The dated record is "where included" (Doctrine §5). State which tier gives what.
9. **1b objection 10 and §4.6 would breach the proof constraint.** They propose showing the expert's "credentials and public record" and "verifiable background" on site. The constraint allows only a link to the founder's personal site, so a single neutral credential line plus that link is the ceiling. 1d's "one visible credential line" (why-us) needs the same owner ruling.
10. **1b has two items that conflict with the doctrine.**
    - P2's "offers a fast first reply" and P4's "sense of speed" push toward an SLA (Doctrine §8). Use "Dr. Tabansky replies personally" and the documented urgent terms only.
    - Objection 1's "frame against the cost of the dispute" drifts toward fear-selling. Answer the objection with outputs, not with stakes.
11. **1b drops qualifiers from two facts.**
    - "nothing uploaded to a Toza cloud" is limited to "during the core engagement".
    - "no stored credentials" is really "not retained for ongoing use".
    - The urgent route (P4, objection 15) is Central Israel only; elsewhere, terms are agreed before acceptance.
12. **1d's Keep list keeps the fear-led index headline.** "Private information can be used against you." and the line "Are you sure your private information is still private?" open on fear. Doctrine §6 says recognition comes before fear, and §11 bars repeated rhetorical questions. 1d itself flags the tension, and Phase 2 must decide it rather than inherit it.

## Contradictions and gaps for Phase 2 and Phase 3

- **Contact model is unresolved.** 1a says one CTA with no form. 1c assumes a form for tracking. 1d proposes a call-back request (name and time), which is data capture. Decide this before design.
- **Number of prices on Home is undecided.** 1a shows three: ₪3,600 / ₪14,000 / from ₪42,000. 1d shows two. 1b's P5 needs Inner Circle visible.
- **Hebrew is unaudited.** Every measurement is EN, yet the market is Hebrew-first. Phase 3 needs RTL fold measurements, and Phase 2 needs Hebrew-native headlines rather than translations (1b objection 9).
- **1a's benchmark mobile layout and typography are unverified.** Phase 3 should not cite them as evidence.
- **The attorney lane lacks a channel decision.** It needs an email route, a one-pager and a referral opener, and must avoid a referral fee. The fee question goes to Israeli counsel.
- **There is no measurement plan for referral traffic, the expected main channel.**

## Decision-ready conclusions (survive review)

1. Showing ₪ prices calmly on Home is a genuine differentiator. All 10 benchmarks hide them, which was spot-verified on 4 sites.
2. Founder-first hero: portrait, name and a plain description, with credentials via one link to his personal site.
3. Replace the `#contact` anchor jump with a contact sheet that opens on the first tap and offers WhatsApp and Signal directly.
4. Put the "don't send details / not invisible on your device" warning visibly beside the buttons, not in a closed accordion.
5. One identical price block site-wide, with the Assessment as the entry decision and "eligible credit" linked to the conditions.
6. Conditions move to one dedicated, printable page one click away. The pricing page can then be short without losing material terms.
7. Use the separation-divorce phone fold as the v2 base layout. Add a slim persistent phone header with Pricing and a Message button.
8. Situation pages share one template: one situation-specific screen, then shared process, price and contact blocks.
9. Every page gets a plain "what Toza does not do" line: no monitoring, investigation, forensics, evidence or legal advice. It filters wrong-intent traffic and serves as the trust footer.
10. Paid search: exact and phrase match only, on commercial phrasing ("יועץ", "הקשחה"), with the full negative list from day 1. Treat it as a lead-quality test whose likely yield is 0–5 Assessments.
11. Publish English versions of the privacy notice and terms. The current English pages link only to Hebrew versions.
12. Raise microcopy to at least 14px, make inline links at least 44px tap targets, and subset the fonts (about 310KB today).

## Open questions for the owner

1. Will you offer voice call-back? If so, how is it requested without a form that collects situation detail?
2. On-site credentials: is one neutral credential line acceptable, or only the link to your personal site?
3. Does diagnosis or urgent first aid ever include removing a malicious app or profile? This sets the "spyware" wording.
4. Home price block: two tiers, or three including Inner Circle?
5. Can attorneys contact you by email, and will you confirm in writing that there is no referral fee?
6. Should the index headline stay or be replaced? It is currently fear-led.
7. Is limited engagement capacity factually supportable? (Doctrine §5 allows it only if true.)
8. Will the ads run only if Keyword Planner shows enough Hebrew volume? Who reviews the search-terms report every day for the first two weeks?
