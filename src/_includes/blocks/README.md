# Block templates: the data they receive

Each file here, `<type>.njk`, renders one content block. The generic layout `src/_layouts/blocks.njk` loops over the page's `blocks` and includes `blocks/<type>.njk` with the loop variable `block`. A page whose type has no template here fails the build, on purpose.

The templates in this directory are **reference templates**: plain semantic HTML, no classes, no copy. Every visible string comes from `block`; the only interface strings are `t.ui.pricesLabel` and `t.ui.print`. The Flowbite build (the owner pick) replaces them in place and keeps the data contract below.

Data comes from `siteContent.<lang>.pages.<page>.blocks` (global data `src/_data/siteContent.mjs`, resolver in `scripts/lib/content.mjs`). `siteContent` is not called `content` because Eleventy reserves that name for the rendered page body.

## Conventions that hold for every block

- **Everything is final text.** Tokens (`{price:…}`, `{fact:…}`, `{shared:…}`, `{ui:…}`), `ref:` shared blocks and contact keys are already resolved. A template never formats a price, looks up a fact, or reads i18n for copy.
- **Optional means the key is absent**, never `null` or `""`. Test with `{% if block.lead %}`.
- **`type`** is always present; **`id`** is present when the content sets one (an anchor slug).
- **Plain text** fields are strings. Autoescape is on; print them with `{{ x }}`.
- **Markdown** fields (`md`) are objects `{ md, text, html }`: `md` the resolved source, `text` the reader-visible text (paragraphs joined by a space, the basis of the length limits), `html` rendered by markdown-it with the check's settings (paragraphs, lists, links; no raw HTML). Print with `{{ x.html | safe }}`.
- **Links** (`link` objects) are `{ label, href, kind, external, aria? }`. `kind` is `plain` (default), `more` (leads to a fuller page; usually shown with an arrow) or `external` (leaves the site; shown with the external glyph). `external` is true for `https://` targets: open them with `target="_blank" rel="noopener"`. `aria` is the screen-reader hint "(opens in a new tab)" and is present when `kind` is `external`. A link written with `action:` in content is already resolved to its `href`.
- **Actions** (contact channels) are `{ key, label, href, external, aria? }`, built from `contact.json` and the i18n button labels, as the current templates do. `key` is `whatsapp`, `signal`, `callback` or `referral` (or `profile`). The first entry of a list is the lead action. The label depends on where the list sits: in a **hero** the Signal button reads "Signal" (short), in a **contact** block "Signal". `external` is true for all channels.
- **Prices**: an object with a `price_key` also carries `price` (display string, formatted like the `ils` filter, with any `price_format` applied, e.g. "from ₪90,000") and `price_value` (number, for `<data value>`). `price_format` itself is not passed on.
- **Nested blocks** (`stages.price_strip`, `tiers.first_step`) are complete blocks of their own type with the same shape. Render them by including that type's template with `block` set to the nested block (see `stages.njk`).
- **Order of items** is reading order. Do not sort.

Page front matter is resolved too: `title`, `description`, `permalink`, `lang`, `dir`, optional `labels` (page-local chrome strings, e.g. Conditions `toc`).

Examples below are real resolved data (16 Oct 2026), abridged where marked.

---

## hero

Page opening. The only block with an `h1`.

| Field | Type | | Notes |
|---|---|---|---|
| `heading` | text | required | The promise (h1) |
| `lead` | text | optional | One supporting sentence |
| `byline` | `{ variant, name, tagline }` | optional | Present when content says `full` or `short`; absent for `none`. `variant` is `full` or `short` (the tagline text already differs). About only (V-045) |
| `actions` | action[] | required | 0 to 3, hero labels |
| `promise` | text | optional | Toza's promise line ("In person · With you present · You control your credentials"), present when content sets `promise: true`. Shown as a quiet line under the actions |
| `note` | text | optional | Small line under the actions |
| `print` | bool | optional | true: show a print button (`t.ui.print`) |

Variants (V-045): without `byline` the hero is typography only: full-width headline at the hero measure (`max-w-hero`), a brass hairline, lead, actions and the optional promise line. With `byline` (About only) the headline sits beside the founder's portrait, name and tagline.

Example: home.

```jsonc
{
  "type": "hero",
  "heading": "Before private information becomes leverage.",
  "lead": "Private conversations, finances and plans can become leverage over you. Toza assesses and hardens your phone, computer and accounts with you, in person.",
  "promise": "In person · With you present · You control your credentials",
  "actions": [
    {
      "key": "whatsapp",
      "label": "WhatsApp",
      "href": "https://wa.me/972533366276?text=…",
      "external": true
    },
    {
      "key": "signal",
      "label": "Signal",
      "href": "https://signal.me/#p/+972533366276",
      "external": true
    },
    {
      "key": "callback",
      "label": "Call me back",
      "href": "https://wa.me/972533366276?text=…",
      "external": true
    }
  ]
}
```

## contact

The invitation to make contact; usually the last block of a page.

| Field | Type | | Notes |
|---|---|---|---|
| `heading` | text | required | |
| `body` | text | optional | Reassurance |
| `actions` | action[] | required | 1 to 3, contact labels |
| `note` | link | optional | A related link below the actions (situation pages, attorneys) |

Example: separation-divorce (with `note`).

```jsonc
{
  "type": "contact",
  "heading": "Start with a private conversation.",
  "body": "Your message receives a personal reply. The first conversation is free and commits you to nothing.",
  "actions": [
    {
      "key": "whatsapp",
      "label": "WhatsApp",
      "href": "https://wa.me/972533366276?text=…",
      "external": true
    },
    {
      "key": "signal",
      "label": "Signal",
      "href": "https://signal.me/#p/+972533366276",
      "external": true
    },
    {
      "key": "callback",
      "label": "Call me back",
      "href": "https://wa.me/972533366276?text=…",
      "external": true
    }
  ],
  "note": {
    "label": "Questions about separation and privacy",
    "kind": "plain",
    "href": "/en/faq/#e",
    "external": false
  }
}
```

## method-statement

The method/credential statement.

| Field | Type | | Notes |
|---|---|---|---|
| `heading` | text | optional | Framing heading; without it the block has no heading |
| `statement` | text | required | The method line |
| `body` | md | optional | Explanation |
| `links` | link[] | optional | Proof links; the profile link (`kind: external`) appears on About only (V-045) |

Example: home.

```jsonc
{
  "type": "method-statement",
  "heading": "One method, from first look to final check.",
  "statement": "Hardening is Toza's own method, developed from public guidance of government security agencies and security vendors."
}
```

## price-summary

The two anchor prices with one condition line each, and the path to all tiers. Has no heading in content: label the region with `t.ui.pricesLabel`.

| Field | Type | | Notes |
|---|---|---|---|
| `items` | summary item[] | required | Up to 3 |
| `items[].tag` | text | optional | e.g. "Start here" |
| `items[].name` | text | required | |
| `items[].price_key`, `price`, `price_value` | | required | See Prices |
| `items[].note` | text | required | One condition line |
| `link` | link | optional | Usually `kind: more` |

Example: home.

```jsonc
{
  "type": "price-summary",
  "items": [
    {
      "tag": "Start here",
      "name": "First step",
      "price_key": "assessment",
      "note": "Counts in full toward your protection within 30 days.",
      "price": "₪4,000",
      "price_value": 4000
    },
    {
      "name": "Personal Shield",
      "price_key": "personalShield",
      "note": "Fixed and agreed in writing before any work, first step included.",
      "price": "₪32,000",
      "price_value": 32000
    }
  ],
  "link": {
    "label": "All protection tiers",
    "kind": "more",
    "href": "/en/pricing/",
    "external": false
  }
}
```

## situation-doors

Entry points by life situation, each a link to its page.

| Field | Type | | Notes |
|---|---|---|---|
| `heading` | text | required | |
| `items` | door[] | required | 2 to 6 |
| `items[].title` | text | required | |
| `items[].line` | text | required | One line of explanation |
| `items[].href` | string | required | Internal path |
| `aside` | text | optional | A closing remark |

Example: home.

```jsonc
{
  "type": "situation-doors",
  "id": "situations",
  "heading": "Where this usually begins.",
  "items": [
    {
      "title": "Separation or divorce",
      "line": "What still connects your digital lives.",
      "href": "/en/separation-divorce/"
    },
    {
      "title": "Business or founder dispute",
      "line": "Where personal and business access still meet.",
      "href": "/en/business-dispute/"
    },
    // … 2 more
  ],
  "aside": "Or before anything happens. You don't need a known incident to begin."
}
```

## specimen

An illustrative deliverable (the exposure summary) shown as a document, with its caveat.

| Field | Type | | Notes |
|---|---|---|---|
| `heading` | text | required | |
| `document.stamp` | text | required | e.g. "Confidential" |
| `document.title` | text | required | |
| `document.subtitle` | text | optional | |
| `document.date` | text | optional | Final text ("15 Oct 2026") |
| `document.entries` | entry[] | required | A labelled row each |
| `entries[].label` | text | required | |
| `entries[].text` | text | optional | A single line |
| `entries[].items` | text[] | optional | A list; `ordered: true` makes it numbered |
| `entries[].ordered` | bool | optional | |
| `entries[].redacted` | bool | optional | Show a redaction bar instead of text (the entry has no text) |
| `caption` | text | required | The caveat |

Example: home.

```jsonc
{
  "type": "specimen",
  "heading": "What you take home after the first visit.",
  "document": {
    "stamp": "Confidential",
    "title": "Exposure summary",
    "subtitle": "Private Exposure Assessment",
    "date": "15 Oct 2026",
    "entries": [
      {
        "label": "Your circumstances",
        "redacted": true
      },
      {
        "label": "Reviewed",
        "text": "Devices, accounts, recovery routes"
      },
      {
        "label": "Found and changed",
        "items": [
          "Recovery email updated",
          "Old tablet signed out"
        ]
      },
      // … 2 more
    ]
  },
  "caption": "Illustrative example. Your summary reflects your own circumstances."
}
```

## stages

The three-stage method as a summary, with the path to prices.

| Field | Type | | Notes |
|---|---|---|---|
| `variant` | `full` \| `compact` | optional | `full` (default, Home): large drawings. `compact` (situation pages): same copy and elements, small drawings, three stages in a tight row |
| `statement` | text | optional | The method line; leads the dark section, set large above the heading (the shared `stages` block carries it, so the situation pages no longer need a separate `method-statement` block) |
| `statement_link` | link | optional | Proof link row directly under the statement. Unused since V-045 (the profile link lives on About only) |
| `heading` | text | required | |
| `line` | text | optional | Page-specific sentence under the heading (situation pages) |
| `items` | stage[] | required | Exactly 3, in order assess, harden, verify |
| `items[].key` | `assess` \| `harden` \| `verify` | required | Selects the drawing |
| `items[].name` | text | required | |
| `items[].line` | text | required | |
| `items[].image_alt` | text | required | Alt text of the drawing |
| `record_date` | text | optional | Final text; shown on the Verify drawing as a dated label |
| `price_strip` | price-strip block | optional | Nested block |
| `link` | link | optional | Usually "How it works" |

Example: separation-divorce (page `line`, nested strip shortened).

```jsonc
{
  "type": "stages",
  "id": "how",
  "statement": "Hardening is Toza's own method, developed from public guidance of government security agencies and security vendors.",
  "heading": "Three stages, one person.",
  "line": "Assess what still connects you. Harden a setup for the life you are moving into. Verify it works, and learn to run it.",
  "items": [
    {
      "key": "assess",
      "name": "Assess",
      "line": "Your threat model, your risks in order, and urgent first aid. Typically four hours.",
      "image_alt": "A laptop, a phone and a one-page summary on a table"
    },
    {
      "key": "harden",
      "name": "Harden",
      "line": "Settings, accounts and recovery rebuilt around your risks. Security keys supplied and configured.",
      "image_alt": "Two hardware security keys"
    },
    {
      "key": "verify",
      "name": "Verify",
      "line": "Changes tested and checked, and you are taught to use them. A private dated record of the work.",
      "image_alt": "A closed record folder with a dated label"
    }
  ],
  "record_date": "15 Oct 2026",
  "price_strip": {
    "type": "price-strip",
    "bands": [
      {
        "caption": "Assess",
        "stages": [
          "assess"
        ],
        "items": [
          {
            "label": "First step",
            "price_key": "assessment",
            "price": "₪4,000",
            "price_value": 4000
          }
        ]
      },
      // … 1 more
    ]
  },
  "link": {
    "label": "How it works",
    "kind": "plain",
    "href": "/en/how-it-works/",
    "external": false
  }
}
```

## recognition

"Does this sound familiar?": concrete signals the reader recognises.

| Field | Type | | Notes |
|---|---|---|---|
| `heading` | text | required | |
| `lead` | text | optional | |
| `items` | text[] | required | 2 to 6 |
| `links` | link[] | optional | e.g. attorneys links to the situation pages |

Example: separation-divorce.

```jsonc
{
  "type": "recognition",
  "heading": "Choose which access you keep.",
  "lead": "Some of it you still need. Toza shows you what each connection allows, so you can tell access you want to keep from access you want to end.",
  "items": [
    "A family cloud that still shares photos and documents.",
    "A recovery number or email that belongs to your spouse.",
    "An old phone or tablet still signed in to your messages.",
    "Location sharing set up years ago."
  ]
}
```

## text

A titled passage of prose, optionally followed by links.

| Field | Type | | Notes |
|---|---|---|---|
| `heading` | text | required | |
| `body` | md | required | One or more paragraphs; may hold lists and links within the text |
| `links` | link[] | optional | Up to 3 |

Example: separation-divorce.

```jsonc
{
  "type": "text",
  "heading": "Change things in the right order.",
  "body": {
    "md": "A password change can leave another route open, and changing a family service can cut access you rely on. You agree the sequence together before anything changes.",
    "text": "A password change can leave another route open, and changing a family service can cut access you rely on. You agree the sequence together before anything changes.",
    "html": "<p>A password change can leave another route open, and changing a family service can cut access you rely on. You agree the sequence together before anything changes.</p>\n"
  }
}
```

## price-strip

Maps the stages to what they cost: one band per span of stages.

| Field | Type | | Notes |
|---|---|---|---|
| `label` | text | optional | A heading for the strip |
| `stage_names` | `{ key, name }[]` | optional | Present when content sets `stage_names: true` (pricing): show the three stage names above the bands. Absent otherwise |
| `bands` | band[] | required | |
| `bands[].caption` | text | required | e.g. "Harden + Verify" |
| `bands[].stages` | stage key[] | optional | Which stages the band spans (for placing the bracket) |
| `bands[].items` | price item[] | required | |
| `items[].label` | text | required | |
| `items[].price_key`, `price`, `price_value` | | required | See Prices |

Example: pricing.

```jsonc
{
  "type": "price-strip",
  "label": "Three stages and their prices.",
  "stage_names": [
    {
      "key": "assess",
      "name": "Assess"
    },
    {
      "key": "harden",
      "name": "Harden"
    },
    {
      "key": "verify",
      "name": "Verify"
    }
  ],
  "bands": [
    {
      "caption": "Assess",
      "stages": [
        "assess"
      ],
      "items": [
        {
          "label": "First step",
          "price_key": "assessment",
          "price": "₪4,000",
          "price_value": 4000
        }
      ]
    },
    {
      "caption": "Harden + Verify",
      "stages": [
        "harden",
        "verify"
      ],
      "items": [
        {
          "label": "Personal Shield",
          "price_key": "personalShield",
          "price": "₪32,000",
          "price_value": 32000
        },
        {
          "label": "for Two",
          "price_key": "shieldForTwo",
          "price": "₪45,000",
          "price_value": 45000
        },
        {
          "label": "Inner Circle",
          "price_key": "innerCircle",
          "price": "₪70,000",
          "price_value": 70000
        }
      ]
    }
  ]
}
```

## tiers

Protection tiers with prices. The `matrix` variant keeps the nested first-step offer above a compact, scrollable comparison; all three prices remain in sticky column headers.

| Field | Type | | Notes |
|---|---|---|---|
| `detail` | `full` \| `summary` \| `matrix` | optional | `full`: tier cards; `summary`: one line each; `matrix`: separate Assessment plus three Shield price columns and comparison rows |
| `heading` | text | required | Always present, may be visually hidden |
| `heading_visible` | bool | optional | false or absent: hide the heading visually, keep it for assistive technology |
| `statement` | text | optional | |
| `first_step` | offer block | optional | Nested block, shown before the tiers |
| `tiers` | tier[] | required | 1 to 4 |
| `tiers[].name` | text | required | |
| `tiers[].price_key`, `price`, `price_value` | | required | See Prices |
| `tiers[].for` | text | required | Who it is for |
| `tiers[].items` | text[] | optional | Up to 6 inclusions |
| `notes` | md[] | optional | One md object per note |
| `link` | link | optional | |
| `matrix_rows` | matrix_row[] | optional | Exactly three cells per row; used by `detail: matrix` |
| `shared_heading`, `shared_items` | text, text[] | optional | Work included in every tier, outside the comparison rows |
| `services_heading`, `services_note`, `services` | text, text, brand_service[] | optional | Locally served, labelled app examples |
| `icon_sources`, `icons_credit_label`, `marks_note` | icon_source[], text, text | optional | Visible source and license credits for icons |
| `more_label` | text | optional | Summary for collapsed pricing conditions in matrix mode |

Example: pricing (abridged).

```jsonc
{
  "type": "tiers",
  "detail": "full",
  "heading": "Compare services",
  "heading_visible": false,
  "statement": "Toza carries out every engagement in person, at your home or office, with you present and in control of your credentials. Hardening is Toza's own method, developed from public guidance of government security agencies and security vendors.",
  "first_step": {
    "type": "offer",
    "tag": "Start here",
    "name": "Private Exposure Assessment",
    "price_key": "assessment",
    "body": "A senior check-up of your digital life: half a day in person, urgent first aid on the spot, and a written exposure summary you keep whether or not you continue.",
    "credit": "Counts in full toward your protection if you continue within 30 days.",
    "link": {
      "label": "Conditions",
      "kind": "more",
      "href": "/en/conditions/",
      "external": false
    },
    "price": "₪4,000",
    "price_value": 4000
  },
  "tiers": [
    {
      "name": "Personal Shield",
      "price_key": "personalShield",
      "for": "For one person. Your phone, computer, accounts and home network hardened around your risks.",
      "items": [
        "Two security keys, configured and tested",
        "A follow-up visit after about four weeks",
        "Questions answered by WhatsApp or Signal for 60 days"
      ],
      "price": "₪32,000",
      "price_value": 32000
    },
    // … 2 more
  ],
  "notes": [
    {
      "md": "The first step is included. If you authorize it, Toza coordinates with your lawyer or family office.",
      "text": "The first step is included. If you authorize it, Toza coordinates with your lawyer or family office.",
      "html": "<p>The first step is included. If you authorize it, Toza coordinates with your lawyer or family office.</p>\n"
    },
    // … 2 more
  ],
  "link": {
    "label": "Conditions",
    "kind": "more",
    "href": "/en/conditions/",
    "external": false
  }
}
```

## offer

The first step as a purchasable offer. Appears nested in `tiers.first_step` (pricing) and as a page block (how-it-works, where it has a `heading`).

| Field | Type | | Notes |
|---|---|---|---|
| `tag` | text | optional | e.g. "Start here" |
| `heading` | text | optional | Present on the how-it-works block only |
| `name` | text | required | |
| `price_key`, `price`, `price_value` | | required | See Prices |
| `body` | text | optional | |
| `items` | text[] | optional | Up to 5 |
| `credit` | text | optional | How the price counts toward protection |
| `link` | link | optional | |

Example: pricing, `tiers.first_step`.

```jsonc
{
  "type": "offer",
  "tag": "Start here",
  "name": "Private Exposure Assessment",
  "price_key": "assessment",
  "body": "A senior check-up of your digital life: half a day in person, urgent first aid on the spot, and a written exposure summary you keep whether or not you continue.",
  "credit": "Counts in full toward your protection if you continue within 30 days.",
  "link": {
    "label": "Conditions",
    "kind": "more",
    "href": "/en/conditions/",
    "external": false
  },
  "price": "₪4,000",
  "price_value": 4000
}
```

---

## steps

The three stages in detail (how-it-works). Dark section, one hairline row per stage with the shared drawing.

| Field | Type | | Notes |
|---|---|---|---|
| `heading` | text | required | |
| `lead` | text | optional | |
| `keep_label` | text | optional | Label above each `keep` line ("You keep") |
| `items[].key` | `assess` \| `harden` \| `verify` | required | Selects the drawing |
| `items[].name` | text | required | Shown as "n · name" (the number is the position) |
| `items[].image_alt` | text | required | Alt of the drawing |
| `items[].heading` | text | required | h3 |
| `items[].statement` | text | optional | Method line, harden only |
| `items[].body` | md | required | |
| `items[].keep` | text | optional | What the client keeps |
| `record_date` | text | optional | Dated label on the Verify drawing |

## letter

First-person note (about). `heading` text, `body` md (paragraphs), `signature` text.

## faq-group

A titled group of questions. Consecutive groups share one page grid with a navigation list of `nav_label`s and an expand-all button (labels `t.ui.faqGroups|faqExpand|faqCollapse`; the button needs `site.js`). Questions are native `<details>`/`<summary>`: usable by keyboard without JavaScript. All questions are closed on load. Each group is a `<details open data-collapsible>` whose `<summary>` holds the h2: on phones (<768px) `site.js` collapses all groups but the one a `#hash` (or the first) points at; from md up they stay open and the summary is inert. Without script every group is open. `site.js` opens the question or group a `#hash` points at.

| Field | Type | | Notes |
|---|---|---|---|
| `id` | slug | required | Anchor of the group (`#a` to `#g`) |
| `nav_label` | text | required | |
| `heading` | text | required | h2, id `<id>-h` |
| `items[].id` | slug | required | Anchor of the question (`#a1`) |
| `items[].question` | text | required | summary |
| `items[].answer` | md | required | |
| `items[].table` | `{ caption, head[], rows[{ label, cells[] }] }` | optional | After the answer |
| `items[].after` | md | optional | After the table |
| `items[].action` | action | optional | Button after the answer |
| `link` | link | optional | After the group |

## terms-section

A numbered section of terms. Consecutive sections share one page grid with a contents list (label `pg.labels.toc`, hidden when printed). Section and clause numbers are CSS counters. Sections with more than four clauses lay the clause list out in two balanced columns from md up (single column in print). Each section is a `<details open data-collapsible>` with the h2 in its `<summary>`: on phones `site.js` collapses all but the targeted (else the first) section; from md up and without script they stay open, and printing opens them all. Prints cleanly (no header, footer, contents or contact; white paper).

| Field | Type | | Notes |
|---|---|---|---|
| `id` | slug | required | Anchor (`#urgent`); heading id `<id>-h` |
| `nav_label` | text | required | Contents entry |
| `heading` | text | required | h2 |
| `intro` | md | optional | |
| `items` | md[] | optional | One numbered clause each; may hold a list |
| `price_table` | `{ caption, head[], rows[{ label, for, price_key, price, price_value }] }` | optional | Table, price column right |
| `notes` | md | optional | |

Hero `print: true` shows a print button (`data-print`, handled by `site.js`) and a print-only logo.

## Trying a template

Add the page key to `src/_data/system.json` `renderFromContent` and, while a hand-built page still owns the permalink, set `permalinkPrefix` (for example `"/_ref"`) so the output goes beside it. Build, then compare with the content:

    node scripts/check-content.mjs --prefix=/_ref --only=pricing

The check extracts the visible text and attributes of the rendered page and compares them with the content files sentence by sentence, both directions.
