# build/g — P0 inventory and baselines

19 Oct 2026 · Base: `main` @ d88b143 · Branch: `build/g` · No code changed in P0.

## 1. Content vs the Study G freeze (b3efb35 / design/radical copy)
All 11 content files in `src/content/en/`, `_shared.yaml`, `facts.json`, `contact.json` and `i18n/en.json` are **byte-identical** to the copy Study G was built on. Nothing to reconcile; Study G copy decisions carry over unchanged.

## 2. Pages and blocks (main today)
| Page | Words | Blocks |
|---|---|---|
| Home `/en/` | 182 | hero, situation-doors, stages, specimen, price-summary, contact |
| Separation or divorce | 238 | hero, recognition, text, stages, text, price-summary, contact |
| Business or founder dispute | 253 | hero, recognition, text, stages, text, price-summary, contact |
| Inheritance conflict | 254 | same as business |
| Someone knows something | 302 | hero, recognition, text, text, stages, text, price-summary, contact |
| How it works | 438 | hero, steps, offer, tiers, contact |
| Pricing | 121 | hero, price-strip, tiers, contact |
| For attorneys | 492 | hero, text, recognition, text×4, method-statement, contact |
| About | 306 | hero, letter, text, method-statement, contact |
| FAQ | 2,341 | hero, faq-group ×7, contact |
| Conditions | 1,288 | hero, terms-section ×9, contact |

18 block templates in `src/_includes/blocks/` (hero, situation-doors, stages, specimen, price-summary, price-strip, tiers, offer, steps, recognition, text, letter, method-statement, faq-group, terms-section, contact + `_macros`, README). Situation pages share one structure → one template (P5).

## 3. Current design (main)
Cream ground, dark-green bands, Frank Ruhl Libre + Assistant, text buttons ("WhatsApp", "Signal", "Call me back"), floating contact group, Flowbite navbar collapse, native `<details>` for FAQ and Conditions (open without JS; `#hash` opens target; print opens all), About carries a portrait of Dr. Tabansky (V-045).
Reference screenshots: `tests/visual/baseline/` (35 images, 390 and 1440, includes `rtl` variants for Home, FAQ, Conditions, Pricing). `npm run check:visual` passes on main (35/35).

## 4. Tooling state
| Item | State |
|---|---|
| `npm run build` | passes (12 files, 0.26 s) |
| `npm run check` | passes: facts (88 amounts), noindex (12 pages), tokens (130 variables, 0 colour literals) |
| Visual regression (V-043) | in repo, **not in CI**; baselines pass |
| axe-core | installed; only used by dev script `all-pages-shots.mjs`; **not in CI** |
| `check-anchors` | a comparison tool (`<oldSite> <newSite>`), not a gate; needs main's build as the old site |
| CI (`ci.yml`) | build + check only |
| Deploy | Cloudflare Pages `toza-v2`; `main` and `design/**` branches; `_headers` noindex, `_redirects` maps old VIP URLs to `/en/…` |
| JS | `scripts/site.js` → 6 KB (navbar collapse, print, FAQ toggle, panel/hash logic, floating group) |
| Fonts | Frank Ruhl Libre 400/500 and Assistant 400/600, Latin + Hebrew, self-hosted woff2 (≈ 77 KB total); no italic |

## 5. Baseline measurements (390 px, Chromium, 4× CPU slowdown, 1.6 Mbit/s, 150 ms RTT)
| Page | LCP | CLS | Transfer | JS | axe (WCAG 2.1 AA, light) |
|---|---|---|---|---|---|
| Home | 0.92 s | 0 | 134 KB | 6 KB | 0 |
| Situations (×4) | 0.88–0.89 s | 0 | 117–118 KB | 6 KB | 0 |
| How it works | 0.91 s | 0 | 133 KB | 6 KB | 0 |
| Pricing | 0.86 s | 0 | 117 KB | 6 KB | 0 |
| Attorneys | 0.91 s | 0 | 111 KB | 6 KB | 0 |
| About | 0.94 s | 0 | 117 KB | 6 KB | 0 |
| FAQ | 0.99 s | 0 | 155 KB | 6 KB | 0 |
| Conditions | 1.00 s | 0 | 154 KB | 6 KB | 0 |

No horizontal overflow on any page at 390 px. **This is the bar to protect:** the redesign adds a hero photo, five scene images and `motion`; budgets in plan §4 (LCP ≤ 2.5 s, JS ≤ 60 KB gz, page ≤ 1.2 MB) leave room, but each chunk reports its delta against this table.

## 6. Findings that change the plan
1. **Accordion:** FAQ/Conditions already use native `<details>` with hash-open, expand-all and print handling. Flowbite is only used for the navbar collapse. P9 keeps `<details>` (it is complete without JS) and restyles it; no Flowbite accordion needed.
2. **About portrait:** main shows Dr. Tabansky's portrait on About (V-045 allows it there). Your answer in this session was "no portrait; typographic page with a situation photo". Needs your confirmation (see Q11 in the plan).
3. **Hebrew/RTL is already partly in place:** four pages have RTL visual baselines. P11 can build on that; `dir=rtl` states exist but there are no `/he/` pages or Hebrew copy yet.
4. **Quality gates to add (P1 or a dedicated gate PR):** axe on all pages × both themes in CI; visual check in CI; anchors comparison against main in CI; physical-property CSS lint; performance budget script. None of these exist as CI gates today.
5. **Price strip / specimen blocks:** Home uses `specimen` ("What you take home after the first visit") and `stages` with drawings. Study G Home does not include these (it has tiers and the pinned situations scene). Decision needed for P4: Home follows Study G (specimen and stages not on Home) or keeps them (Q12).
6. **Old URL redirects** (`_redirects`) already map the live VIP URLs to `/en/…`; they stay and must be re-tested at cut-over.
