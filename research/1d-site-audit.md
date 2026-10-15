# Toza EN site: CRO/UX audit (11 pages)

Method: Playwright measurements on the built `_site/en` (1440x900 desktop; 390x844 touch-emulated phone) plus review of the fold and full-page screenshots in the scratchpad `shots/` folder. "CTA" = visible link to `#contact`, wa.me, signal.me, or labelled "private conversation". Words = `<main>` text. Phone screens = page height / 844.

## 1. Scorecard

| Page | Words | Phone screens | Scroll px to first CTA (phone / desktop) | CTAs in main | Prices above phone fold | Accordions | Founder in phone first screen |
|---|---|---|---|---|---|---|---|
| index | 865 | 8.0 | **856 (below fold)** / 701 | 4 | 2 | 1 | n |
| pricing | 864 | 9.7 | 596 / 483 | 6 | 2 | 8 | n |
| private-exposure-assessment | 982 | 8.1 | 656 / 571 | 3 | 1 (eyebrow) | 0 | n |
| what-happens-during-the-visit | 1,238 | 10.0 | 596 / 498 | 4 | 0 | 0 | n |
| why-us | 775 | 6.6 | 365 / 353 | 4 | 0 | 1 | n (photo ~700px) |
| faq | 432 | 6.0 | 405 / 440 | 3 | 0 | 30 | n |
| attorneys | 757 | 6.8 | 473 / 440 | 4 | 0 | 0 | n |
| they-know-something | 673 | 5.9 | 445 / 440 | 4 | 0 | 0 | n |
| separation-divorce | 540 | 5.0 | 405 / 382 | 4 | 0 | 2 | **y** (80px thumb) |
| business-dispute | 723 | 6.2 | 512 / 499 | 4 | 0 | 0 | n |
| inheritance-clash | 710 | 5.9 | 473 / 440 | 4 | 0 | 0 | n |

Desktop has a header CTA at y=26 on every page, so desktop first-CTA is immediate. Phone has no persistent CTA (header = logo + "Menu"). Index is the only page whose first CTA is below the phone fold. Conditions above the fold: none on any page apart from the VAT/"typically four hours" lines.

## 2. Site-wide findings, ranked by conversion impact

1. **Every "Request a private conversation" button is a same-page anchor (`#contact`), not a channel.** Evidence: index.html source; same on all 11 pages. Index contact section is ~6,000px down on phone (`index-m-full.png`). Tap, long scroll, tap again. Why it hurts: referral and ad visitors decide on the first screen; the jump drops them below the context that made them ready. v2: first CTA opens a short sheet or inline block with WhatsApp, Signal and call-back as direct buttons, plus the neutral wording and the "don't send details" line already visible.
2. **Index phone fold has no CTA and no founder** (`index-m-fold.png`): headline, bold question, two paragraphs, price line, third paragraph; button sits at 856px. Desktop (`index-d-fold.png`) works because the portrait is there. Why: the offer is trust in one person and the main landing page hides him on phone. v2: 72px portrait + name, one statement, calm two-price line, button, all within 640px.
3. **Fold copy is too long for "one strong statement per screen."** Index fold ~130 words; attorneys, pricing, assessment folds 60-90 (`*-m-fold.png`). v2: headline + max 25 words + button.
4. **Pre-message warnings are in a closed accordion ("Before you message") under the buttons.** Evidence: index.html contact section. Content: do not send passwords, recovery codes, screenshots, legal documents or intimate material; messaging "not guaranteed to be invisible on your device." This audience is the most likely to have a monitored phone; the most protective sentence on the site is the least visible. v2: two visible lines beside the buttons.
5. **Prices are presented inconsistently and the large number is the wrong one.** Index fold and pricing fold lead with Personal Shield ₪14,000 and mention the ₪3,600 Assessment later (`index-d-fold.png`, `pricing-m-fold.png`); the assessment page has ₪3,600 only in the eyebrow (`private-exposure-assessment-m-fold.png`); situation pages show no price in the fold at all. The Assessment is the real entry decision. v2: one identical calm block everywhere: "Assessment ₪3,600 · Personal Shield ₪14,000 · Assessment fee credited" with one "Conditions" link.
6. **Pricing page spreads conditions across 8 accordions** (scope, credit, bespoke, urgent visits, boundaries...) on 864 words / 9.7 screens, so the reader opens many panels to learn what ₪14,000 covers. That is conditions many clicks away, not one. v2: pricing page under ~300 words; one Conditions page or single section, printable.
7. **Situation-page folds add a "Show all details" decision** (`separation-divorce-m-fold.png`), a ghost button plus explainer text competing with the CTA. Remove from the fold.
8. **Situation pages and attorneys are near-duplicates below the fold** (673-757 words, identical link rows "First paid visit / Contact / Your situation"; same 15/24px type table). Fine for ads, but heavy to maintain and dilutes each page. v2: one template; one situation-specific screen plus a shared process block.
9. **Jump-link rows crowd the fold.** Every page shows an underlined anchor row (Experience · Methods · Assessment to protection · Contact on why-us; six anchors plus "Expand all answers" on faq; `why-us-m-fold.png`, `faq-m-fold.png`). These offer exits at peak attention. v2: remove on phone for pages under 6 screens.
10. **Phone nav hides Pricing and FAQ behind "Menu" and has no sticky contact.** Desktop nav shows both plus a CTA (`index-d-fold.png`). Prices are a trust signal for this audience; hiding them contradicts "prices calm and visible." v2: slim persistent header with a small "Message" button.
11. **Process/assessment pages are long.** what-happens: 1,238 words, 10 screens, zero accordions, no price in the first two screens; assessment: 982 words, 10 price mentions, zero disclosures. Reads as warranty copy, not a private adviser. v2: 400-500 words, three-step Map / Close and harden / Verify.
12. **Founder presence is uneven.** Portrait shows on index (desktop fold), why-us (~700px on phone), separation-divorce (80px); absent from pricing, assessment, process, faq, attorneys and three situation pages. First-person voice exists only on why-us. v2: portrait, name, one-line credential and "I reply personally" next to the CTA on every landing page.

## 3. Page-by-page notes

**index**
- Keep: headline "Private information can be used against you"; desktop fold with portrait and "In person · With you present · One senior expert"; contact copy ("includes no device inspection... does not commit you to purchase").
- Fix: phone fold (findings 2, 3); fear-led headline sits against doctrine progression (recognition, confidence) so follow it immediately with the calm line.
- Fix: 8 phone screens and 865 words; situations are a link line, not a decision screen.
- Fix: two prices as stacked paragraphs.

**pricing**
- Keep: large "₪14,000 including VAT · One person · Two devices" line; "Work directly with Dr. Lior Tabansky"; "Choose who to protect" household option.
- Fix: 8 accordions; Assessment price below fold; six CTAs; 24px accordion summaries.

**private-exposure-assessment**
- Keep: concrete examples (old phone still receiving messages, recovery email, shared app); "Typically four hours." as its own line.
- Fix: price only in the eyebrow; no founder; 10 price mentions in 982 words.
- Fix: "You pay only after accepting a written scope and price" is the key reassurance; place it right beside the button (it already follows it, but is separated by the heading rhythm and not bold).

**what-happens-during-the-visit**
- Keep: stage structure (before you buy / Assessment / full engagement) fits the doctrine.
- Fix: longest page; no founder, no accordions; first CTA at 596px is before any process content, so move the CTA after stage one.

**why-us**
- Keep: "Why I created Toza." first-person opening; earliest phone CTA (365px).
- Fix: portrait only at ~700px, after the anchor row; show it beside the CTA.
- Fix: credential links (UK NCSC, World Bank) are 24px-tall inline links; present as one visible credential line.

**faq**
- Keep: natural question wording, short answers (432 words); "What should I send in the first message?" is the right question.
- Fix: 30 accordions with an "Expand all" button in the fold; open the five that decide a purchase (price, before paying, first message, what you get, in person only) by default; move the rest behind a link.

**attorneys**
- Keep: "works directly with the client... within their authorized environment" is the right referral framing.
- Fix: CTA is the client's wording; an attorney needs "Refer a client" plus an e-mail path; no founder; one price mention.

**they-know-something / business-dispute / inheritance-clash**
- Keep: situation-first headline, single route to the first paid visit.
- Fix: first CTA 440-512px; no founder in fold; 24px "Initial visit details" links; the first 80 words should name the situation more concretely than the eyebrow does.

**separation-divorce**
- Keep: best fold on the site (`separation-divorce-m-fold.png`): headline, 3-line paragraph, CTA at 405px, founder photo + name, "You control your credentials". Make this the v2 base layout.
- Fix: "Show all details" button; 80px portrait; 11-13px microcopy.

## 4. Contact path audit

- Today: CTA (any page) scrolls to `#contact`; then "Message on WhatsApp" (wa.me/972533366276, prefilled "I'd like a private conversation. Please let me know the next step.") or "Message on Signal" (signal.me/#p/+972533366276). Both `target=_blank rel=noopener`. WhatsApp appears on all 11 pages.
- Good: neutral prefilled text; same number for both channels; honest description of the first conversation; no form or data capture.
- Friction: (1) anchor jump, not a channel (finding 1); (2) warnings in a closed `<details>` (finding 4); (3) on desktop, wa.me opens WhatsApp Web or a browser prompt with no hint to use the phone, and no QR or copy-number option; (4) signal.me fails for non-Signal users with no fallback; (5) the contact block is last, below situation links, so a reader who scrolls past never sees it.
- Missing: call-back request (name, best time, no situation detail) or at least a stated "I will call you from a private number" option; an e-mail route for attorneys; a safer-device note ("message from a device and account no one else can access"); a stated reply expectation that stays within the doctrine ("Dr. Tabansky replies personally", no SLA).
- Business decision needed: whether to allow voice call-back. Without it, at least add one line for readers who do not want to message.

## 5. Accessibility and performance quick checks

- Contrast: from the CSS tokens, ink #202b29, muted #54615b and accent #725528 on #f5f3ed all pass AA for normal text (calculated about 13:1, 5.8:1, 6:1). Not measured: text over the green buttons (white on #234f46 is about 9:1).
- Font sizes: body 17-18px (good). Text at 11-13px appears on 20-70 words per phone page (faq: 73 words at 12px; index and why-us about 19-23) for the microcopy lines and captions. Raise to 14px minimum.
- Tap targets (phone): 4-13 links per page under 44px, mainly inline "details" links at 24px height ("Credit details", "What the initial visit includes", "Services, scope and credit conditions") and 40px jump links. On desktop the header "Pricing" and "FAQ" links are 23-40px wide. Primary buttons are 49px tall and pass.
- Focus: 3px visible outline defined; keyboard nav with Escape closes menu; `aria-expanded` is maintained. `prefers-reduced-motion` appears only in pricing-04 and vault CSS, not clear-practice.
- Semantics: `<summary>` wraps an `<h3>` in the contact block (valid but test with screen readers). Portrait has alt text; header logo is `aria-hidden`, footer logo has alt.
- Language: footer legal links are Hebrew-only ("Terms of use (Hebrew)", "Privacy notice (Hebrew)"); an English-speaking client has no readable privacy notice.
- Weight: HTML 18-43KB (pricing 43KB, faq 37KB); CSS about 20KB shared plus 20-23KB on home or pricing; two Source Sans 3 font files 154KB + 156KB = about 310KB on every page (largest single cost); portrait 640px WebP. Estimated 400-450KB first load. Subsetting the fonts would cut to about 150KB. Not measured: network timings, LCP.
- Several stylesheets per page (4-5); consolidate.

## 6. Keep list

- Copy: "Private information can be used against you."; "includes no device inspection, mapping, diagnosis or technical work and does not commit you to purchase."; "Typically four hours."; concrete assessment examples (old phone, recovery email, shared app).
- The separation-divorce phone fold layout.
- Microcopy "In person · With you present · One senior expert / You control your credentials" (raise size).
- First-person "Why I created Toza." and the personal-note section.
- Large calm price lines with VAT stated and the credit rule (Assessment fee credited toward Personal Shield).
- Neutral prefilled WhatsApp message; Signal offered; same number for both.
- Visual system: warm paper #f5f3ed, dark green #234f46 buttons, 17-18px body, 3px focus outline, 49px primary buttons.
- Three-stage process structure and the 11-page footprint as the v2 skeleton once repeated sections are shared.
