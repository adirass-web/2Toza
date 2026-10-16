# Content extraction report — 16 Oct 2026

**Scope:** 11 EN pages → `src/content/en/*.md` + `_shared.yaml`. Templates untouched; `_site` byte-identical to the prior build (sha256, 12 HTML files). `npm run check` passes.

## Block types (83 page blocks)

text 15 · hero 11 · contact 11 · terms-section 9 · faq-group 7 · method-statement 7 · recognition 5 · stages 5 · price-summary 5 · tiers 2 · steps 1 · offer 1 (+1 nested) · price-strip 1 (+6 nested in stages) · letter 1 · situation-doors 1 · specimen 1.

## Parity (`npm run check:content`)

- HTML → content: 1,072 text units, **0 missing** (6 non-exact: "15 Oct", printed in its own span); 108 alt/aria units, 0 missing.
- Content → HTML: 839 sentences, **0 missing** (5 match ignoring spaces: same date).
- `<title>`/meta description: 11/11 exact. Drift guard: 71 editorial i18n strings, all present in `_shared.yaml`.
- **Result: 100% both ways.** Mutation tests (edited word, extra HTML, typed ₪, unknown type/field, bad key/ref/link, over-length) all fail as intended.

## Length limits (selected; full table in CONTENT-MODEL.md §6)

| Field | Now | Max |
|---|---|---|
| hero.heading | 61 | 80 |
| hero.lead | 202 | 270 |
| page.description | 146 | 190 |
| recognition.items | 134 | 180 |
| text.body | 326 | 430 |
| faq_item.question | 79 | 110 |
| faq_item.answer | 507 | 660 |
| terms-section.items | 460 | 600 |
| tier.for | 91 | 120 |
| stages.line | 146 | 190 |
| link.label | 45 | 60 |

Rule: Now × 1.3, rounded up to 10; resolved visible text.

## Open questions

1. **Literal facts.** "60 days" (4 shared strings), "Two/four/eight security keys" and "The 30-day rule" are typed literally though facts.json holds them. Tokenise? (Output unchanged.)
2. **Repeated page copy.** "You agree the sequence together…" (4 pages), the attorney-summary sentence (3) and "The same expert, from first look to final check." (home, about) stay page literals, as in the templates. Move to shared?
3. **Hebrew number words** need grammatical gender (שלושה/שלוש). `{numword}` with gender, or digits?
4. **Dates.** "Terms as of 16 October 2026" (page copy) and the specimen date "15 Oct 2026" (shared). From facts?
5. `price.from` in i18n is unused. Drop it at wiring?
6. `/index.html` (the preview stub) is out of scope.

## Decisions 1–3 applied (owner-approved, 16 Oct 2026)

Content layer only. Templates untouched; `_site` HTML byte-identical to main's build (sha256, 12 files). Decisions recorded as V-034, V-035, V-036 in `docs/decisions.md`.

**1. Facts as tokens.** Syntax `{fact:key}` (digits), `{factword:key}` (English word), `{Factword:key}` (capitalised); `*N` multiplier kept. The earlier `{numword:}` is renamed `{factword:}` (12 uses, same output); `{numword:}` no longer exists. Newly tokenised literals: `questionLineDays` 4 (shared: 3 inclusion lines + Annual Care line), `credit.windowDays` 2 ("The 30-day rule", nav label and heading), `securityKeys.personalShield` 1, `.shieldForTwo` 1, `.innerCircle` 1. Content totals now: questionLineDays 18, credit.windowDays 13, keys 3/3/3, devicesPerPerson 4, joinWindowMonths 2. Checker: unknown key fails; `{factword:}` fails in non-English content; a typed number equal to a fact next to days/keys/devices/months warns. One warning stays by design: conditions.md:140, "30 days before the term ends" (invoice notice, not the credit window).

**2. Repeated sentences.** New `_shared.yaml: common`, referenced with `{shared:common.key}` (the existing inline mechanism; no new syntax). Moved: "The same expert, from first look to final check." (home, about) · "You agree the sequence together before anything changes." (4 pages) · the attorney-summary sentence (3) · "Verify it works, and learn to run it." (4) · "Some of it you still need." (business-dispute, separation-divorce) · "Start with what can be checked." (home, they-know-something) · "After day {30}, the tier is charged at its full price.", "Essential migration covers…", "Availability is confirmed before you pay.", the urgent-arrival sentence (conditions, faq) · "If you authorize it, Dr. Tabansky coordinates with your lawyer or family office." (faq, shared) · "The first conversation is free and commits you to nothing." (conditions, shared) · "Each price is fixed and agreed in writing before work begins." (conditions, how-it-works, shared) · "Every engagement is carried out by Dr. Lior Tabansky in person…" (conditions, shared) · "One first step, then the protection that fits your household." (pricing description, shared). Page copies of existing shared strings now use `{shared:…}`: three stage lines and two tier `for` lines on how-it-works. New check fails on any 6+ word sentence typed on two pages.

**3. Hebrew.** Digits; `{fact:}` only.

**Q5.** `price.from` (i18n) is unused; left as is.

**Check output.** `check:content` OK, parity 100.0% both ways (HTML→content 1,072 units, 0 missing; content→HTML 839 sentences, 0 missing; 71 drift strings). Warnings: 1 (above). `npm run check` OK (88 amounts, 12 pages noindex).
