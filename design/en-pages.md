# English pages (build/en-pages)

**Built (8):** /en/how-it-works/, /about/, /faq/, /conditions/, /business-dispute/, /inheritance-conflict/, /they-know-something/, /attorneys/. Copy is verbatim from C1 and C2. Every ₪ amount and the 30 and 60 day figures come from `facts.json` (`ils`, plus new filters `numword` and `capfirst`).

**Reused as built:** hero grid with portrait, recognition list, sequence rows, `stages.njk`, `price-block.njk`, `credential.njk`, `contact-block.njk`, `.door`, `.step-tag`, `.numeral`, ink and paper-deep bands. The three situation pages are the Separation template with new copy.

**Shared changes**
- Stage drawings moved to `drawing-*.njk`; Home output unchanged.
- `cta-hero` and `cta-full` take `referral`; `contact-block` takes `contactHref`.
- All `#` links replaced; footer is Pricing, FAQ, For attorneys, Conditions, About.
- `_redirects` added (11 rules, passthrough).
- CSS appended: stage rows, tier rows, FAQ accordion, Conditions table and terms, `@media print`.

**Page notes**
- FAQ: `#a` to `#g`, 33 `<details>`, six open by default, sticky group nav, "Expand all answers" via one inline script.
- Conditions: terms numbered 1.1 to 9.4; print checked as a 4-page A4 PDF; `#urgent` is section 8.

**Screens, phone / desktop:** How it works 5.84 / 4.57, About 3.53 / 3.52, FAQ 8.11 / 6.08, Conditions 10.56 / 6.83, Business 5.61 / 5.06, Inheritance 5.52 / 5.00, They-know 5.81 / 5.21, Attorneys 5.40 / 5.06. No horizontal overflow. Phone fold shows headline, founder and WhatsApp on every page with a founder.

**Checks:** build and check pass; no `href="#"`; "VAT" appears once.

**Known gaps**
- Hero eyebrows in the copy are not rendered, matching Home and Separation.
- "Collapse all answers" is a new UI string.
- Conditions "(see 7)" became a link to the 60-day question line, since sections number from Prices as 1.
- No table of contents on phone in Conditions.
- Hebrew, Privacy and Terms are not built.
- Contrast checked by token, not by tool.
