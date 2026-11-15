# Legacy anchor audit — pinned VIP source

The frozen VIP source at `63cda10` was built locally and its rendered pages compared with the current English preview through the current `_redirects` mappings. Run `node scripts/audit-legacy-anchors.mjs <legacy-build> <candidate-build>` after building both. The script resolves fragments referenced in old generated HTML against the mapped new page.

These are links found **within the frozen site's own output**. No external backlink inventory or current production crawl was available; this does not establish which anchors external sites link to, nor whether later VIP revisions changed the list. Review before release. Redirects preserve fragments; compatibility aliases supply the corresponding target on the destination.

Results: 53 unique fragments resolve, 0 do not, 0 point to unbuilt destinations.

For older sections without an exact counterpart, the owner selected the nearest broader section. Mappings for review:

- Attorneys' inspection/first-aid fragment → What Toza does for your client.
- Business dispute's experienced-hands fragment → Understand what a change will affect before you approve it.
- Inheritance's expert-help fragment → Understand the connections before changing them.
- Separation's future setup → Change things in the right order; its first-visit fragment → First step.
- How-it-works' service-fit fragment → Agree the work before it starts.
- About's assessment fragment → Start a private conversation; methods fragment → How that judgment becomes practical work.

## Resolved legacy fragments

- `/en/#situations -> /en/index.html#situations`
- `/en/attorneys.html#contact -> /en/attorneys/index.html#contact`
- `/en/attorneys.html#hands-on-inspection-diagnosis-and-urgent-first-aid -> /en/attorneys/index.html#hands-on-inspection-diagnosis-and-urgent-first-aid`
- `/en/attorneys.html#main-content -> /en/attorneys/index.html#main-content`
- `/en/attorneys.html#when-a-referral-may-help -> /en/attorneys/index.html#when-a-referral-may-help`
- `/en/business-dispute.html#contact -> /en/business-dispute/index.html#contact`
- `/en/business-dispute.html#main-content -> /en/business-dispute/index.html#main-content`
- `/en/business-dispute.html#put-the-technical-questions-in-experienced-hands -> /en/business-dispute/index.html#put-the-technical-questions-in-experienced-hands`
- `/en/business-dispute.html#see-where-personal-and-business-access-still-meet -> /en/business-dispute/index.html#see-where-personal-and-business-access-still-meet`
- `/en/faq.html#boundaries -> /en/faq/index.html#boundaries`
- `/en/faq.html#can-someone-notice-my-contact-with-toza-or-the-changes-we-make -> /en/faq/index.html#can-someone-notice-my-contact-with-toza-or-the-changes-we-make`
- `/en/faq.html#contact -> /en/faq/index.html#contact`
- `/en/faq.html#getting-started -> /en/faq/index.html#getting-started`
- `/en/faq.html#hardening-and-teaching-for-you-or-your-close-circle -> /en/faq/index.html#hardening-and-teaching-for-you-or-your-close-circle`
- `/en/faq.html#how-toza-differs -> /en/faq/index.html#how-toza-differs`
- `/en/faq.html#main-content -> /en/faq/index.html#main-content`
- `/en/faq.html#prices-credit-and-urgent-visits -> /en/faq/index.html#prices-credit-and-urgent-visits`
- `/en/faq.html#privacy -> /en/faq/index.html#privacy`
- `/en/faq.html#what-should-i-send-in-the-first-message -> /en/faq/index.html#what-should-i-send-in-the-first-message`
- `/en/faq.html#what-you-gain-from-the-first-paid-visit -> /en/faq/index.html#what-you-gain-from-the-first-paid-visit`
- `/en/index.html#assessment -> /en/index.html#assessment`
- `/en/index.html#contact -> /en/index.html#contact`
- `/en/index.html#main-content -> /en/index.html#main-content`
- `/en/index.html#personal-shield -> /en/index.html#personal-shield`
- `/en/index.html#situations -> /en/index.html#situations`
- `/en/inheritance-clash.html#access-shared-in-good-faith-can-still-matter -> /en/inheritance-conflict/index.html#access-shared-in-good-faith-can-still-matter`
- `/en/inheritance-clash.html#contact -> /en/inheritance-conflict/index.html#contact`
- `/en/inheritance-clash.html#main-content -> /en/inheritance-conflict/index.html#main-content`
- `/en/inheritance-clash.html#work-through-your-own-access-with-expert-help -> /en/inheritance-conflict/index.html#work-through-your-own-access-with-expert-help`
- `/en/pricing.html#contact -> /en/pricing/index.html#contact`
- `/en/pricing.html#credit -> /en/pricing/index.html#credit`
- `/en/pricing.html#full-specification -> /en/pricing/index.html#full-specification`
- `/en/pricing.html#main-content -> /en/pricing/index.html#main-content`
- `/en/private-exposure-assessment.html#contact -> /en/how-it-works/index.html#contact`
- `/en/private-exposure-assessment.html#main-content -> /en/how-it-works/index.html#main-content`
- `/en/separation-divorce.html#a-setup-for-the-life-you-are-moving-into -> /en/separation-divorce/index.html#a-setup-for-the-life-you-are-moving-into`
- `/en/separation-divorce.html#contact -> /en/separation-divorce/index.html#contact`
- `/en/separation-divorce.html#have-your-own-devices-and-access-examined-with-urgent-first-aid -> /en/separation-divorce/index.html#have-your-own-devices-and-access-examined-with-urgent-first-aid`
- `/en/separation-divorce.html#main-content -> /en/separation-divorce/index.html#main-content`
- `/en/they-know-something.html#contact -> /en/they-know-something/index.html#contact`
- `/en/they-know-something.html#have-someone-examine-the-access-and-address-urgent-problems -> /en/they-know-something/index.html#have-someone-examine-the-access-and-address-urgent-problems`
- `/en/they-know-something.html#main-content -> /en/they-know-something/index.html#main-content`
- `/en/they-know-something.html#start-with-what-can-be-checked -> /en/they-know-something/index.html#start-with-what-can-be-checked`
- `/en/what-happens-during-the-visit.html#contact -> /en/how-it-works/index.html#contact`
- `/en/what-happens-during-the-visit.html#decide-whether-toza-fits-before-you-buy -> /en/how-it-works/index.html#decide-whether-toza-fits-before-you-buy`
- `/en/what-happens-during-the-visit.html#have-the-agreed-setup-hardened-around-your-life -> /en/how-it-works/index.html#have-the-agreed-setup-hardened-around-your-life`
- `/en/what-happens-during-the-visit.html#main-content -> /en/how-it-works/index.html#main-content`
- `/en/what-happens-during-the-visit.html#your-paid-assessment-inspection-diagnosis-and-urgent-first-aid -> /en/how-it-works/index.html#your-paid-assessment-inspection-diagnosis-and-urgent-first-aid`
- `/en/why-us.html#assessment -> /en/about/index.html#assessment`
- `/en/why-us.html#contact -> /en/about/index.html#contact`
- `/en/why-us.html#experience -> /en/about/index.html#experience`
- `/en/why-us.html#main-content -> /en/about/index.html#main-content`
- `/en/why-us.html#methods -> /en/about/index.html#methods`
