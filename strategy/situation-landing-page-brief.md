# Toza situation landing pages

> Historical website planning brief. Use the [messaging spec](toza-messaging-positioning-spec.md) and [LP handoff](lp-project-handoff.md) for current copy direction and project state.

Planning brief · 18 November 2026

Upgrade the three existing situation routes. Each should be able to stand on its own for someone arriving from search, an adviser referral, or the Home Situations section. Use one conversion goal across all three: a qualified request for a free private conversation. WhatsApp and Signal are two ways to take that same step.

Sources for the baseline are the repository's production profile, the shared situation template and the three pages in the supplied Cloudflare preview. The preview pages were reachable through web extraction. The public apex could not be verified from this environment. Production URLs below are the intended addresses. Treat the proposed wording and conversion changes as hypotheses for review.

## Instructions for the copy and design team

1. Keep the Home Situations section as a concise routing hub. Keep the proactive framing that clients can seek protection before a known incident. Retain the three descriptive links and the secondary link to Exposure. Use the supplied photos in their existing situation association.
2. Make the opening useful to a direct visitor. Put the situation in the H1 or the immediately adjacent text. Follow it with a specific example and one sentence about what Dr. Lior Tabansky does with the client in person. Place labelled WhatsApp and Signal links just below the opening copy. On phones, test shortening the full-height photo treatment so it does not push the explanation and action far down the page.
3. Add a short recognition section with three or four real situations drawn from the current page. Explain what the expert examines and which decisions the client keeps. Answer the main hesitation for that situation before introducing prices.
4. Show the engagement sequence in plain language. A free private conversation usually takes 10–20 minutes. The separately purchased Private Exposure Assessment costs ₪4,000, takes about half a day in person, and leaves the client with a written exposure summary. Protection is agreed separately. If mentioning the credit, state that it applies in full when protection work begins within 30 days of assessment completion. Pull prices and terms from the repository's facts and approved copy.
5. Repeat the main action where readers make a decision, after the scope and pricing explanation. State that the links open messaging. Use the neutral first-message guidance and approved destinations already on the site. Keep the FAQ, Pricing and professional background as secondary links, with clear labels. Retain shared navigation and accessibility affordances for these organic and referral pages.
6. Keep the voice calm and specific. Use examples of ordinary arrangements that can persist over time. Describe approved changes on the client's own devices and accounts. Mention adviser or attorney coordination where the existing wording supports it and the client authorizes it. Use the named expert, the consent process and the written deliverable as proof. Any new credential or client outcome needs a verified source and, where applicable, permission to publish.

## Page-by-page briefs

| Existing route | First question to answer | Draft lead to test | Details that belong on this page |
|---|---|---|---|
| /en/separation-divorce/ | What still connects our accounts and devices after separation? | **Digital privacy during separation.** Accounts set up for a shared life can outlast it. Dr. Lior Tabansky works with you in person to see which connections you still rely on and which you want to change. | Family cloud sharing, old signed-in devices, recovery contacts and location sharing. Explain why the order matters for services the client relies on. Point to the existing first-contact safety guidance. |
| /en/business-dispute/ | Where does personal access still intersect with business access? | **Digital protection during a business dispute.** A personal email may still recover a business account. Toza helps you trace where private and business access meet and agree which changes you can authorize. | Recovery email, phones used for both roles and folders shared during the partnership. Explain how the expert checks which services depend on an arrangement. Keep company-system authority and adviser coordination explicit. |
| /en/inheritance-conflict/ | What access did I share with family years ago that may still matter? | **Private accounts during an inheritance conflict.** Help with an account years ago can still connect someone to your correspondence. Toza works with you in person to review which access remains and what changing it would affect. | Recovery contacts, family folders and alerts sent to a shared family address. Explain that some arrangements still help and the client decides what to keep. Address the client's own digital privacy. Estate administration questions belong with their adviser. |

Check draft leads against the approved editorial sources before publishing. Give every route its own examples, hesitation and answers. Reuse the layout, offer and contact components. The terms above describe possible search intent. Validate phrase choices against adviser language and, after launch, real Search Console queries.

## Implementation and validation

- Use the three scenario Markdown sources in `src/content/en/` and the shared `src/_includes/approved-en/situation-page.njk` template. Pull contact destinations from the existing shared component and keep existing route and anchor references. Update renderer baselines deliberately alongside any approved copy changes.
- Give each page a distinct title, description and first heading that agree with the page content. Preserve one self-referencing production canonical and the current sitemap route. Check production HTTP status, directives and metadata after release. Keep the preview indexing controls in place. For any later ad campaign, match the ad's situation, promise and action to its destination.
- Draft Separation as the first prototype, then reuse the agreed structure for the other two. Review the mobile opening at 390 px and desktop at 1440 px. Check image crop, text contrast, keyboard order, visible focus, CTA destinations and any overlap with fixed controls. Have intended clients or advisers try finding the scope, fee and first contact path without guidance. Keep existing build, content parity, links, accessibility and performance checks as the release gates.
- Measure contact-link opens by page and channel only if the measurement setup is approved and suitable for this service. Keep message text and private details out of event payloads. Compare those opens with qualified enquiries separately. Start with a small qualitative baseline and test one change at a time, beginning with the opening CTA and hero height. Consider a controlled split test only when traffic can support it.

## Guidance used

- [CRO and copywriting skills from Marketing Skills](https://github.com/coreyhaines31/marketingskills) for action hierarchy, intent match, concrete examples and supportable claims.
- Match the promise and CTA to the traffic source and keep the page usable on phones. [Google Ads landing-page guidance](https://support.google.com/google-ads/answer/6238826)
- Make every page useful in its own right. [Google Search spam policies](https://developers.google.com/search/docs/essentials/spam-policies)
- Check loading, responsiveness and visual stability. Use field data when it becomes available. [Web Vitals](https://web.dev/articles/vitals)
