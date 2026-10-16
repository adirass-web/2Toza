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
