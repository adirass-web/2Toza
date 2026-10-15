# 2z Independent review of 2a and 2b (15 Oct 2026)

Reviewer: copy chief and conversion strategist (did not write 2a/2b). Bound by BRIEF.md: R-1 (current approved copy is the fact base, no outside fact-checking, no legal or ethical risk assessment) and R-2 (boundaries and warnings in the FAQ only). Checked against llms.txt and `_site/en/*.html`.

## Verdicts

| File | Verdict |
|---|---|
| 2a Message architecture | **Approve with changes.** Close to the brief, with strong situation copy. Fixes needed on R-2 scope, the credential wording, and two lines that break 2a's own budget rules. |
| 2b Referral model | **Approve with changes.** Option C is sound. The flow has one logic gap (the consent "no" case) and three points that contradict 2a. |

---

## 1. Brief compliance

| Decision | 2a | 2b |
|---|---|---|
| Two prices on Home, Inner Circle on Pricing only | Yes (§6.1) | n/a. The one-pager lists Inner Circle, which is fine off-Home |
| One credential line + link | **Partly.** It offers three lines and uses two of them on-site (1 on Home, 2 on About/Attorneys) | Placeholder only. Link lacks `/en/` |
| No press, testimonials or scarcity | Yes (§8.7) | Yes |
| First tap opens a channel | Yes (§6.2, sticky header) | **At risk.** It is not stated whether `/go/` redirects or shows an interstitial (see R-10) |
| Call-back without a form | Yes (WhatsApp prefill) | Yes |
| R-2 | **Partly.** §8.5 adds "(or Conditions)" as a second home for "does not" sentences | Mostly yes. The one-pager footer label says "boundaries" |
| Fear-led allowed | Yes (H1 A retained) | Yes |

## 2. Consistency with the fact base

- **Credential wording.** The current copy says "national cybersecurity strategy and *collaborative* cyber-resilience projects *with* the World Bank across 11 countries". 2a's options 1 and 3 drop "collaborative" and "with", which makes the claim stronger than the approved text.
- **Credit condition.** The fact base says "within 14 days *of completion of the initial service*" and counts toward Personal Shield, Inner Circle or Bespoke. 2a §6.1 says only "when it begins within 14 days". That is ambiguous about when the 14 days start. Using only Personal Shield on Home is fine.
- **"Fixes what is urgent"** (They know something hero). The approved scope is "approved urgent first aid safely possible within scope". "Fixes" promises more than that.
- **"A four-hour Private Exposure Assessment"** (2b one-pager Block 1). The approved wording is "typically four hours".
- **"Partners receive a fee for each referral"** (2b Block 4 and hero). Under Option C the fee is triggered by a paid Assessment, not by a referral.
- **"A referred client who goes straight to a full service"** (2b Option C). The fact base describes the Assessment as the initial service. A path that skips it is not in the approved copy and should not be invented.
- **"You decide every change"** (2b Variant A). The approved wording is "material changes require approval; client controls credentials". Use "you approve every material change".
- Prices, the device allowance, keys, the dated record, adjustment support, the urgent-arrival logic and the names all match.

## 3. Copy quality (Home and Separation)

The register is right: restrained, concrete, no vendor tone. A scan found no banned phrases. The four situation cards and "Choose which access you keep." are the best writing in the set. Weak points:

- Block 2 heading "When private information becomes consequential." is abstract and reads like a report.
- The Separation hero subline is 35 words. 2a's own fold rule is ≤25.
- The Block 4 heading is 11 words. 2a's own rule is ≤10, and the line is heavy.
- The Home subline "around the risks in your life" is slightly vague. That is acceptable.
- The Separation stage line ("Assess… Harden… Verify…") is a triple, but it maps to the real stages, so keep it.

**Rewrites for the three weakest lines**

1. Block 2 heading: ~~When private information becomes consequential.~~ → **"Where this usually begins."**
2. Separation subline: ~~Your plans for a separate life may still sit in accounts set up for a shared one. Dr. Lior Tabansky works with you…~~ → **"Accounts set up for a shared life can outlast it. Dr. Lior Tabansky finds, with you and in person, what still connects you."** (21 words)
3. Block 4 heading: ~~The expert who assesses your situation is the one who makes the changes.~~ → **"The same expert, from first look to final check."**

## 4. Conversion logic

- Home goes fear → founder → CTA in the fold, which is the shortest path possible: one tap. Prices come at screen 5 and contact repeats at screen 6. Good.
- Each page has one primary action (WhatsApp), with Signal and call-back as equals beside it. Conditions correctly has no button.
- Home carries four secondary text links (How it works, About, Prices and conditions, Professional profile ↗). That is acceptable. The profile link must open in a new tab so the visitor doesn't leave the conversion path.
- The urgent extra on They know something states arrival terms but not that a surcharge applies. Mention it in a few words beside the "Urgent terms" link so prices stay visible.

## 5. Referral model

- **Fee in one sentence.** Option C passes if Bespoke is removed from the sentence: *"₪300 when your client's Assessment is paid, and ₪1,000 more if they continue to Personal Shield (₪3,000 for Inner Circle)."* The 7% Bespoke rule and the 90-day window belong in the term sheet. The arithmetic checks out (8.3%, 9.3%, 7.9%).
- **No-email flow.** It works end to end on WhatsApp/Signal plus PDF. Gaps:
  - (a) Consent "no" case: the monthly statement lists referral ID, event and date, so the attorney learns "Assessment paid" anyway. The flow contradicts itself.
  - (b) `/go/` behaviour is undefined: redirect or interstitial. "Signal variant: shown for copy" implies a page, which adds a tap.
  - (c) `/go/` logging needs a server-side function. The site is currently static on Pages.
  - (d) The forwardable messages use `toza-site.pages.dev`, which a premium referral should not carry.
  - (e) The client prefill "A possible referral. Ref TZ-K7M2. Please call me." puts every referred client into call-back mode and is phrased from Toza's side.
- **Attorney copy vs 2a.** The register matches. The fee in the hero subline is transactional for a "quiet private adviser". Move it to Block 4.

## 6. Contradictions between 2a and 2b

1. Attorney CTA label: 2a says "Discuss a referral"; 2b says "Message Dr. Tabansky about a (possible) referral" (two variants of its own).
2. Attorney prefill: 2a keeps the approved text ("…about a possible referral. Please let me know the next step."); 2b step 1 uses "I'd like to join the Toza referral partners."
3. Credential: 2a specifies option 2 for Attorneys with `cyberdrtabansky.com/en/`; 2b uses a placeholder and the bare domain.
4. Fee wording: 2a FAQ F marks it "pending owner decision"; 2b puts it in the hero subline and Block 4.
5. Conditions: 2a creates a Conditions page; 2b sends attorneys to "Conditions and boundaries: FAQ".
6. Referred-client prefill (2b, call-back) differs from 2a's standard prefill.
7. "Four-hour" (2b) vs "Typically four hours" (2a, fact base).

---

## Required changes

**2a**
1. **R-2:** delete "(or Conditions)" from §8.5. Conditions holds commercial terms only (credit, surcharges, support periods, follow-up). Every "does not / not guaranteed" sentence, including migration and network limits phrased as limits, goes to the FAQ.
2. **One credential line site-wide**, restoring the approved wording: *"Dr. Lior Tabansky's work has included national cybersecurity strategy and collaborative cyber-resilience projects with the World Bank across 11 countries."* + "Professional profile ↗".
3. §6.1 credit line: "…when it begins within 14 days of your Assessment." Keep the link to Conditions.
4. They know something hero: replace "fixes what is urgent" with "gives urgent first aid".
5. Apply rewrites 2 and 3 above so the page meets its own word rules.
6. Urgent extra: add "Surcharge applies" next to the "Urgent terms" link.
7. Fix the typo in the page-map Home row: "Conditions → Conditions".

**2b**
8. Use the approved attorney prefill and one CTA label, "Discuss a referral", in the flow, the one-pager and the page hero.
9. Change "fee for each referral" to "a fee when a referred client's Assessment is paid, and more if they continue". Remove the fee from the hero subline. Suggested subline: *"Dr. Lior Tabansky sees your client in person, on their own devices and accounts. Your client decides what you are told."*
10. Define `/go/` as a direct redirect to WhatsApp. Signal users quote the code that is already in the message text. Note the Pages Function dependency.
11. Referred-client prefill: *"Hello, I'd like a private conversation. Ref TZ-K7M2."* Call-back stays available as a separate choice.
12. Remove the "straight to full service" clause. Change the one-pager to "Typically four hours" and Variant A to "you approve every material change".
13. Resolve the consent "no" case (owner decision 7). Until it is resolved, the statement for a "no" client must not show the event or date.
14. One-pager: insert the chosen credential line and link `/en/`. Change the footer label to "Questions: FAQ · Conditions".

## Optional suggestions

- Home subline: "around your own circumstances" in place of "around the risks in your life".
- Drop Option A and Option B from the owner-facing summary. Keep them in an appendix.
- The forwardable messages should give the attorney's code in the visible text only once (already done) and stay at ≤40 words.
- Onboarding message: replace "sorted out" with "put in order".

## Owner decisions needed (deduplicated)

1. **Call-back mechanism:** a WhatsApp prefill ("Please call me back") with no form. Confirm.
2. **Credential line:** approve the single wording in required change 2.
3. **Page restructure:** merge Assessment and How Toza helps into How it works; rename Why Toza to About; add a Conditions page; 301 redirects.
4. **Specimen:** may it show realistic placeholder findings ("Old tablet signed out")?
5. **Fee amounts:** Option C (₪300 / +₪1,000 / +₪3,000). Bespoke flat or case-by-case. Whether amounts are quoted incl. or excl. VAT.
6. **Fee visibility:** on the public Attorneys page (Block 4 and FAQ F), or in the one-pager and conversation only?
7. **Consent "no":** does the fee still accrue, and if so, how is it reported without revealing the client's progress?
8. **Production domain** for `/go/` links, and approval to add a server-side function for click logging.
