# Toza v2 — Content model

Status: v1, 16 Oct 2026 (branch `content/extract`). Copy is unchanged from the approved site; this step only moves it out of the templates.
Machine-readable schema: `content/content-model.json`. Validator: `npm run check:content`.

## 1. Principles

1. **Semantic, not visual.** A block says *what the copy is* (a promise, a set of signals, an offer, a term), never how it looks. No grid, colour, CSS class or component-library names appear in content. The later component library maps each block type to one component; design tokens stay out of content.
2. **One home for each string.** Copy for one page lives in that page's file. Copy shown on two or more pages lives once in `_shared.yaml`. Interface chrome lives in `i18n/<lang>.json`. Commercial facts live only in `facts.json`.
3. **Facts are referenced, never typed.** No `₪` and no price figure appears in any content file. Structured prices use `price_key`; prices inside sentences use `{price:key}`. The check fails on a typed amount. Day counts, key counts, device counts and month windows come from facts.json through `{fact:…}` / `{factword:…}` (V-035); the check warns on a typed one.
4. **The extraction mirrors the templates' data binding.** Where a template read `t.*`, the content uses a `{shared:…}`/`{ui:…}` token or a shared block; where it read `facts.*`, a fact token; where it held literal text, the content holds the literal text, except that literals equal to a fact are tokens (V-035) and sentences repeated across pages live once in `_shared.yaml: common` (V-036).
5. **Hebrew-ready.** Every user-visible string is in a content field, including alt text, captions, table headings and visually hidden headings. Nothing depends on English word order: amounts are slotted into templates (`price_format: "from {amount}"`), and number words come from `{factword:…}` (English only; Hebrew uses digits, V-034). `lang`/`dir` are page fields.

## 2. Files

| File | Holds | Edited by |
|---|---|---|
| `src/content/en/<page>.md` | Front matter only: page meta + ordered `blocks:` list | Copy editor |
| `src/content/en/_shared.yaml` | Shared editorial strings (§5) + reusable `blocks:` | Copy editor |
| `src/_data/i18n/en.json` → `ui`, `nav`, `footer`, `buttons` | UI chrome (§5) | Developer + translator |
| `src/_data/facts.json` | Prices, days, counts, scope sentence | Owner decision only |
| `src/_data/contact.json` | Channel URLs (WhatsApp, Signal, call-back, referral, profile) | Owner |
| `content/content-model.json` | Block types, fields, kinds, limits | Content architect |

Page files are `.md` so a future CMS or Markdown tool opens them natively; the body below the front matter is intentionally empty (the check fails if it is not), because every passage belongs to a block. A Hebrew site adds `src/content/he/` with the same filenames.

Page files: `home`, `how-it-works`, `about`, `pricing`, `faq`, `conditions`, `separation-divorce`, `business-dispute`, `inheritance-conflict`, `they-know-something`, `attorneys`.

## 3. Page front matter

| Field | Kind | Req. | Notes |
|---|---|---|---|
| `page` | id | yes | Stable page key (= filename) |
| `title` | text ≤ 50 | yes | `<title>`; pattern "<Topic> — Toza" |
| `description` | text ≤ 190 | yes | Meta description; tokens allowed (how-it-works uses `{price:assessment}`) |
| `permalink` | href | yes | Output path, e.g. `/en/faq/index.html` |
| `lang` | `en` \| `he` | yes | Must equal the i18n file's `lang` |
| `dir` | `ltr` \| `rtl` | yes | Must equal the i18n file's `dir` |
| `labels` | map of text ≤ 20 | | Page-local chrome with no shared home (Conditions: `toc: Sections`) |
| `blocks` | list of blocks | yes | Reading order of the page |

`layout` is not content and is not stored; the renderer supplies it.

## 4. References and tokens

| Syntax | Where | Resolves to | Example |
|---|---|---|---|
| `price_key: personalShield` | structured price fields | formatted `facts.prices.personalShield` | ₪32,000 |
| `price_format: "from {amount}"` | price table rows | the amount slotted into words | from ₪90,000 |
| `{price:key}` | any text/md field | formatted price | "The first step is {price:assessment}…" |
| `{fact:path}` | any text/md field | a value from facts.json; `\|capfirst` capitalises | `{fact:credit.windowDays}` → 30 |
| `{factword:path}` / `{factword:path*N}` | any text/md field, English only | the fact as an English number word (digits above twelve) | `{factword:devicesPerPerson*2}` → six |
| `{Factword:path}` | same | the same, capitalised for sentence start | `{Factword:securityKeys.personalShield} security keys` → Two security keys |
| `{shared:path}` | any text/md field | a string in `_shared.yaml` (arrays join with a space); may itself contain tokens | `{shared:offers.shield.name}` |
| `{shared:common.key}` | any text/md field | a sentence used on more than one page (V-036) | `{shared:common.sequence}` |
| `{ui:path}` | any text/md field | a UI string in i18n | `{ui:buttons.profile}` |
| `actions: [whatsapp, signal, callback]` | hero, contact | contact.json channel + its UI label | — |
| `action: referral` | link, FAQ item | one channel as a link/button | — |
| `ref: stages` | any block | the shared block of that name; local fields override | `line:` on situation pages |

### 4.1 Fact tokens

- Which facts: `questionLineDays` (60), `credit.windowDays` (30), `securityKeys.personalShield|shieldForTwo|innerCircle` (2/4/8), `devicesPerPerson` (3, with `*2`, `*4` for the household tiers), `annualCare.joinWindowMonths` (6). Anything else in facts.json that is a whole number also works.
- Use `{fact:…}` for digits ("{fact:questionLineDays} days", "the {fact:credit.windowDays}-day rule") and `{factword:…}` for words ("{factword:securityKeys.shieldForTwo} security keys"). At the start of a sentence or list item use `{Factword:…}`. Never type the number or the word.
- Hebrew content uses digits only: `{fact:…}`. `{factword:}` and `{Factword:}` fail in non-English content (V-034).
- An unknown key fails the check. Tokens resolve before the length and parity checks, so parity runs on the resolved text.
- A typed number that equals one of these facts next to "days", "keys", "devices" or "months" (also in words: "sixty days", "Two security keys") produces a **warning** with the token to use. It is a warning because the same number can mean something else (Conditions: the Annual Care invoice goes out 30 days before the term ends, which is not the credit window).

### 4.2 Shared sentences

Pages already reference shared strings with `{shared:path}` and shared blocks with `ref:`. A sentence of six or more words used on two or more pages lives once in `_shared.yaml: common` and each page writes `{shared:common.key}` in its place, alone or inside a longer field ("Private information has surfaced. {shared:common.start_checked}"). A field that starts with a token must be quoted in YAML. The check fails if such a sentence is typed on two pages, or on a page and in `_shared.yaml`.

The renderer adds a little copy implied by a field: `byline: full|short` adds the person's name and tagline from `_shared.yaml: person`; `stage_names: true` adds the three stage names; a step's position number ("1 · Assess") is generated.

## 5. Shared copy vs UI chrome — the rule

- **UI chrome → `i18n/<lang>.json`** (`ui`, `nav`, `footer`, `buttons`): words that *operate the interface* and would be translated as interface — navigation and footer link labels, action-button labels, skip link, aria/landmark labels, "opens in a new tab", expand/collapse toggles, print, arrows. Content refers to them with `{ui:…}` or `actions`.
- **Shared editorial copy → `_shared.yaml`**: words that *say something about Toza*, shown on more than one page — the person byline, the method statement, offer names, descriptions, inclusions and credit lines, price labels ("Start here", "All protection tiers"), the three stages, the exposure-summary specimen, the contact block. This includes the method line, contact text and price-block labels; nav and footer are chrome and stay in i18n.
- **Page copy → page file**: everything else, even if a similar sentence exists elsewhere.

Sentences used on more than one page: `_shared.yaml: common` (§4.2).

Reusable shared blocks in `_shared.yaml: blocks`: `stages`, `price_strip`, `price_summary`, `method`, `specimen`, `offer_first_step`, `contact`.

*Transition:* the templates still read the editorial strings from `i18n/en.json` (namespaces `person`, `credential`, `contact`, `price`, `stages`, `specimen`). Until the wiring step removes them, `check:content` fails if any of those 71 strings has no identical string in `_shared.yaml`.

## 6. Field kinds and blocks

- **text**: plain, one line, no Markdown; tokens allowed. Used for headings, leads, labels, list items, captions, alt text.
- **md**: Markdown. Used only where the copy is prose that can carry paragraphs, lists or inline links: `text.body`, `letter.body`, `method-statement.body`, `step.body`, `faq_item.answer`/`after`, `terms-section.items`/`intro`/`notes`, `tiers.notes`. Allowed syntax: paragraphs, `-` lists (one level of nesting), `[label](href)` links. No headings, emphasis, HTML or images inside fields; structure is expressed by blocks.
- **Max** is counted in characters of the reader-visible text: tokens resolved, Markdown stripped. **Now** is the longest current English string. Limits are **Now × 1.3, rounded up to the next 10 (at least Now + 10)**; `terms-section.notes` has a floor of 160 because it has one short sample. Hebrew usually runs 10–25 % *shorter* than English in characters, so these limits leave room for Hebrew while warning when English copy grows past what the layout was designed for.

Common block fields: `type` (required), `ref` (shared block), `id` (anchor slug; required for `faq-group` and `terms-section`, whose anchors are linked from other pages, e.g. `/en/faq/#e`, `/en/conditions/#urgent`).

### 6.1 Block types

#### `hero`
Page opening: the promise (h1), one supporting sentence, who does the work, the first actions.

| Field | Kind | Req. | Max | Now |
|---|---|---|---|---|
| `heading` | text | yes | 80 | 61 |
| `lead` | text |  | 270 | 202 |
| `byline` | full \| short \| none | yes |  |  |
| `actions` | list of action | yes |  |  |
| `note` | text |  | 40 | 28 |
| `print` | bool |  |  |  |

#### `situation-doors`
Entry points by life situation, each leading to its page.

| Field | Kind | Req. | Max | Now |
|---|---|---|---|---|
| `heading` | text | yes | 40 | 26 |
| `items` | list of `door` | yes |  |  |
| `aside` | text |  | 90 | 69 |

#### `recognition`
"Does this sound familiar?" — concrete signals the reader recognises in their own life.

| Field | Kind | Req. | Max | Now |
|---|---|---|---|---|
| `heading` | text | yes | 70 | 50 |
| `lead` | text |  | 220 | 169 |
| `items` | list of text | yes | 180 | 134 |
| `links` | list of `link` |  |  |  |

#### `text`
A titled passage of prose, optionally followed by links.

| Field | Kind | Req. | Max | Now |
|---|---|---|---|---|
| `heading` | text | yes | 80 | 59 |
| `body` | md | yes | 430 | 326 |
| `links` | list of `link` |  |  |  |

#### `letter`
First-person note, signed.

| Field | Kind | Req. | Max | Now |
|---|---|---|---|---|
| `heading` | text | yes | 30 | 16 |
| `body` | md | yes | 760 | 581 |
| `signature` | text | yes | 30 | 17 |

#### `method-statement`
The method/credential statement, with optional framing heading, explanation and proof links.

| Field | Kind | Req. | Max | Now |
|---|---|---|---|---|
| `heading` | text |  | 80 | 54 |
| `statement` | text | yes | 160 | 116 |
| `body` | md |  | 260 | 200 |
| `links` | list of `link` |  |  |  |

#### `stages`
The three-stage method (Assess, Harden, Verify) as a summary, with the path to prices. `statement` is the method line shown first in the dark section (optional; the shared block carries it). `variant: compact` is the tighter layout with smaller drawings (situation pages); `full` is the default (Home).

| Field | Kind | Req. | Max | Now |
|---|---|---|---|---|
| `variant` | full \| compact |  |  |  |
| `statement` | text |  | 160 | 116 |
| `heading` | text | yes | 40 | 25 |
| `line` | text |  | 190 | 146 |
| `items` | list of `stage` | yes |  |  |
| `record_date` | text |  | 21 | 11 |
| `price_strip` | block `price-strip` |  |  |  |
| `link` | `link` |  |  |  |

#### `steps`
The three stages in detail: what happens and what the client keeps from each.

| Field | Kind | Req. | Max | Now |
|---|---|---|---|---|
| `heading` | text | yes | 40 | 25 |
| `lead` | text |  | 40 | 30 |
| `keep_label` | text |  | 20 | 8 |
| `items` | list of `step` | yes |  |  |
| `record_date` | text |  | 21 | 11 |

#### `price-strip`
Maps stages to what they cost: one band per span of stages, each with priced items.

| Field | Kind | Req. | Max | Now |
|---|---|---|---|---|
| `label` | text |  | 40 | 25 |
| `stage_names` | bool |  |  |  |
| `bands` | list of `band` | yes |  |  |

#### `price-summary`
The two anchor prices (first step, Personal Shield) with one condition line each, and a link to all tiers.

| Field | Kind | Req. | Max | Now |
|---|---|---|---|---|
| `items` | list of `summary_item` | yes |  |  |
| `link` | `link` |  |  |  |

#### `offer`
The first step as a purchasable offer: name, price, what it includes, how it counts toward protection.

| Field | Kind | Req. | Max | Now |
|---|---|---|---|---|
| `tag` | text |  | 20 | 10 |
| `heading` | text |  | 60 | 39 |
| `name` | text | yes | 40 | 27 |
| `price_key` | price_key | yes |  |  |
| `body` | text |  | 240 | 178 |
| `items` | list of text |  | 150 | 113 |
| `credit` | text |  | 90 | 69 |
| `link` | `link` |  |  |  |

#### `tiers`
Protection tiers with prices; `detail: full` lists inclusions, `summary` gives one line each.

| Field | Kind | Req. | Max | Now |
|---|---|---|---|---|
| `detail` | full \| summary |  |  |  |
| `heading` | text | yes | 60 | 45 |
| `heading_visible` | bool |  |  |  |
| `statement` | text |  | 340 | 257 |
| `first_step` | block `offer` |  |  |  |
| `tiers` | list of `tier` | yes |  |  |
| `notes` | list of md |  | 160 | 118 |
| `link` | `link` |  |  |  |

#### `specimen`
An illustrative deliverable (the exposure summary) shown as a document, with its caveat.

| Field | Kind | Req. | Max | Now |
|---|---|---|---|---|
| `heading` | text | yes | 60 | 41 |
| `document` | `document` | yes |  |  |
| `caption` | text | yes | 90 | 67 |

#### `faq-group`
A titled group of questions and answers; answers are Markdown.

| Field | Kind | Req. | Max | Now |
|---|---|---|---|---|
| `nav_label` | text | yes | 33 | 23 |
| `heading` | text | yes | 40 | 24 |
| `items` | list of `faq_item` | yes |  |  |
| `link` | `link` |  |  |  |

#### `terms-section`
A numbered section of commercial terms (or the price table).

| Field | Kind | Req. | Max | Now |
|---|---|---|---|---|
| `nav_label` | text | yes | 40 | 27 |
| `heading` | text | yes | 60 | 43 |
| `intro` | md |  | 300 |  |
| `items` | list of md |  | 600 | 460 |
| `price_table` | `price_table` |  |  |  |
| `notes` | md |  | 160 | 23 |

#### `contact`
The invitation to make contact: heading, reassurance, channel actions, optional related link.

| Field | Kind | Req. | Max | Now |
|---|---|---|---|---|
| `heading` | text | yes | 50 | 34 |
| `body` | text |  | 120 | 91 |
| `actions` | list of action | yes |  |  |
| `note` | `link` |  |  |  |

### 6.2 Object types

#### `link`
| Field | Kind | Req. | Max | Now |
|---|---|---|---|---|
| `label` | text | yes | 60 | 45 |
| `href` | href |  |  |  |
| `action` | action |  |  |  |
| `kind` | plain \| more \| external |  |  |  |

#### `door`
| Field | Kind | Req. | Max | Now |
|---|---|---|---|---|
| `title` | text | yes | 40 | 27 |
| `line` | text | yes | 90 | 65 |
| `href` | href | yes |  |  |

#### `stage`
| Field | Kind | Req. | Max | Now |
|---|---|---|---|---|
| `key` | stage_key | yes |  |  |
| `name` | text | yes | 16 | 6 |
| `line` | text | yes | 130 | 97 |
| `image_alt` | text | yes | 70 | 51 |

#### `step`
| Field | Kind | Req. | Max | Now |
|---|---|---|---|---|
| `key` | stage_key | yes |  |  |
| `name` | text | yes | 16 | 6 |
| `image_alt` | text | yes | 70 | 51 |
| `heading` | text | yes | 130 | 97 |
| `statement` | text |  | 160 | 116 |
| `body` | md | yes | 320 | 245 |
| `keep` | text | yes | 150 | 111 |

#### `band`
| Field | Kind | Req. | Max | Now |
|---|---|---|---|---|
| `caption` | text | yes | 25 | 15 |
| `stages` | list of stage_key |  |  |  |
| `items` | list of `price_item` | yes |  |  |

#### `price_item`
| Field | Kind | Req. | Max | Now |
|---|---|---|---|---|
| `label` | text | yes | 25 | 15 |
| `price_key` | price_key | yes |  |  |

#### `summary_item`
| Field | Kind | Req. | Max | Now |
|---|---|---|---|---|
| `tag` | text |  | 20 | 10 |
| `name` | text | yes | 25 | 15 |
| `price_key` | price_key | yes |  |  |
| `note` | text | yes | 90 | 65 |

#### `tier`
| Field | Kind | Req. | Max | Now |
|---|---|---|---|---|
| `name` | text | yes | 33 | 23 |
| `price_key` | price_key | yes |  |  |
| `for` | text | yes | 120 | 91 |
| `items` | list of text |  | 110 | 79 |

#### `document`
| Field | Kind | Req. | Max | Now |
|---|---|---|---|---|
| `stamp` | text | yes | 22 | 12 |
| `title` | text | yes | 30 | 16 |
| `subtitle` | text |  | 40 | 27 |
| `date` | text |  | 21 | 11 |
| `entries` | list of `document_entry` | yes |  |  |

#### `document_entry`
| Field | Kind | Req. | Max | Now |
|---|---|---|---|---|
| `label` | text | yes | 30 | 18 |
| `text` | text |  | 50 | 35 |
| `items` | list of text |  | 50 | 32 |
| `ordered` | bool |  |  |  |
| `redacted` | bool |  |  |  |

#### `faq_item`
| Field | Kind | Req. | Max | Now |
|---|---|---|---|---|
| `id` | id | yes |  |  |
| `question` | text | yes | 110 | 79 |
| `answer` | md | yes | 660 | 507 |
| `open` | bool |  |  |  |
| `table` | `table` |  |  |  |
| `after` | md |  | 210 | 155 |
| `action` | action |  |  |  |

#### `table`
| Field | Kind | Req. | Max | Now |
|---|---|---|---|---|
| `caption` | text | yes | 70 | 47 |
| `head` | list of text | yes | 20 | 10 |
| `rows` | list of `table_row` | yes |  |  |

#### `table_row`
| Field | Kind | Req. | Max | Now |
|---|---|---|---|---|
| `label` | text | yes | 50 | 34 |
| `cells` | list of text | yes | 80 | 59 |

#### `price_table`
| Field | Kind | Req. | Max | Now |
|---|---|---|---|---|
| `caption` | text | yes | 30 | 17 |
| `head` | list of text | yes | 17 | 7 |
| `rows` | list of `price_row` | yes |  |  |

#### `price_row`
| Field | Kind | Req. | Max | Now |
|---|---|---|---|---|
| `label` | text | yes | 80 | 56 |
| `for` | text | yes | 60 | 41 |
| `price_key` | price_key | yes |  |  |
| `price_format` | text |  | 25 | 15 |

## 7. Pages → blocks

| Page | Blocks in order |
|---|---|
| home | hero · situation-doors · stages* · method-statement* · specimen* · price-summary* · contact* |
| how-it-works | hero · steps · offer · tiers (summary) · contact* |
| about | hero · letter · text · method-statement · contact* |
| pricing | hero · price-strip* · tiers (full, first_step = offer_first_step*) · contact* |
| faq | hero · faq-group ×7 · contact* |
| conditions | hero · terms-section ×9 · contact |
| separation-divorce, business-dispute, inheritance-conflict | hero · recognition · text · stages* (+ line, compact; carries the method line) · text · price-summary* · contact* (+ note) |
| they-know-something | hero · recognition · text ×2 · stages* (+ line, compact; carries the method line) · text (+ link) · price-summary* · contact* (+ note) |
| attorneys | hero · text · recognition (+ links) · text ×4 · method-statement* · contact* (referral, + note) |

\* uses a shared block via `ref`.

## 8. What `npm run check:content` enforces

1. **Model:** front-matter fields; allowed block types; no unknown fields; required fields; kinds (`text` has no line breaks or Markdown); enum values; anchors are slugs; `price_key` exists in facts.json; `action` exists in contact.json; `ref` exists in `_shared.yaml`; internal links point to an existing content page; every token resolves; max lengths.
2. **No typed prices:** no `₪` and no figure equal to a facts.json price anywhere in content files.
3. **Parity with the built site:** for each page in `_site/en/`, every sentence of visible text (and alt/aria-label text) must be found in that page's content, its shared blocks or UI chrome; every content sentence must be found in the page HTML. `<title>` and meta description must match exactly. Whitespace is normalised.
4. **Drift guard:** editorial strings still in i18n must equal a `_shared.yaml` string.
5. **Facts as tokens:** `{fact:}` / `{factword:}` / `{Factword:}` keys must exist and be whole numbers; number words fail outside English; a typed number equal to one of these facts next to days/keys/devices/months is a warning (§4.1).
6. **No repeated sentences:** a sentence of 6+ words typed on two pages (or on a page and in `_shared.yaml`) fails (§4.2).

## 9. Notes for the wiring step

- Load `src/content/<lang>/*.md` as Eleventy data (front matter via js-yaml), resolve tokens with the same rules as `scripts/check-content.mjs` (move the resolver to a shared module), and render each block type through one Nunjucks macro/component. Then delete the editorial namespaces from `i18n/en.json` and drop the drift guard.
- Keep `check:content` in CI after wiring: it becomes the regression test that rendering does not lose or invent copy.

## 10. Rendering

Content files are rendered by templates through one loader, one generic renderer and one tokens file (the resolver move named in §9 is done). Nothing here changes the built site until a page is switched on.

- **Loader.** `scripts/lib/content.mjs` holds the token grammar, `ref:` merge and Markdown rules once. `scripts/check-content.mjs` uses it for validation; the Eleventy global data file `src/_data/siteContent.mjs` uses it for templates. `siteContent.en.pages.<page>` is `{ page, title, description, permalink, lang, dir, labels?, blocks }` with every string final: prices formatted as the `ils` filter does, facts and `{shared:}`/`{ui:}` substituted, `ref:` blocks merged, contact keys turned into `{ key, label, href, external, aria? }`, `md` fields turned into `{ md, text, html }`. The data shape of each block type is in `src/_includes/blocks/README.md`. (The global is `siteContent`, not `content`: Eleventy reserves `content`.) A content error stops the build with the same messages as `check:content`.
- **Renderer.** `src/_layouts/blocks.njk` (on `base.njk`) loops over `blocks` and includes `src/_includes/blocks/<type>.njk`. `src/content-pages.njk` paginates `siteContent.en.pages` and emits only the pages listed in `src/_data/system.json` `renderFromContent`. The list is empty, so nothing is emitted. While a hand-built page owns a permalink, `permalinkPrefix` (for example `"/_ref"`) puts the rendered page beside it. The twelve reference templates (hero, contact, method-statement, price-summary, situation-doors, specimen, stages, recognition, text, price-strip, tiers, offer) are unstyled HTML with no copy; the Flowbite and daisyUI builds replace them. Types without a template (`steps`, `letter`, `faq-group`, `terms-section`) fail the build if their page is switched on.
- **Parity of a rendered page.** `node scripts/check-content.mjs --prefix=/_ref --only=pricing` runs the normal parity check (both directions, sentence by sentence) on pages rendered under a prefix. Without options the check is unchanged.
- **Tokens.** `tokens/tokens.json` (W3C DTCG) is the single source of colours, type, spacing, layout, radii, focus and shadow values (V-037). `scripts/build-tokens.mjs` generates `styles/tokens.css`, a Tailwind v4 `@theme` block, and `build:css` runs it first; `styles/main.css` imports it. `npm run check` runs `scripts/check-tokens.mjs`: it fails if `tokens.css` is stale or `main.css` declares its own `@theme`, and warns, per file, about colour literals (hex, `rgb()`) still in `src/**/*.njk` and `styles/main.css`; the component-library builds remove that debt by using the semantic variables (`--color-surface`, `--color-text`, `--color-accent`, `--color-action`, …).
- **Gotcha.** Tailwind scans every file under `src/`, including `src/_includes/blocks/README.md` and the block templates. A stray word that is also a utility name (`inline`, `table`, `block`, …) adds a rule to `assets/css/main.css`.
