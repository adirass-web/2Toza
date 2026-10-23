# Decisions (v2)

Rules: R-1 the approved copy is the fact base, no fact-checking or risk assessments. R-2 boundaries and warnings live in the FAQ only.

| ID | Date | Decision |
|---|---|---|
| V-001 | 2026-10-15 | v2 is a competing parallel build; the approved site and its copy are not altered. |
| V-002 | 2026-10-15 | Hebrew-first market; EN copy first, HE after copy and design approval. Domain after approval. |
| V-003 | 2026-10-15 | Rebuild front end and message architecture on the same stack. Facts locked, prose reviewed. |
| V-004 | 2026-10-15 | Final approver: Dr. Lior Tabansky. |
| V-005 | 2026-10-15 | Cookieless analytics and first-party click logging; no third-party pixels. |
| V-006 | 2026-10-15 | Proof: one credential line plus link to cyberdrtabansky.com. No press, testimonials or separate proof. |
| V-007 | 2026-10-15 | Home shows two prices (₪3,600, ₪14,000). Call-back offered. Referral fee exists, no email channel. No scarcity claims. |
| V-008 | 2026-10-15 | Home headline: "Before private information becomes leverage." Fallback: current H1, tested in phase 5. |
| V-009 | 2026-10-15 | Harden is Toza's own method, developed from public agency and vendor guidance. |
| V-010 | 2026-10-15 | Model tiers: Opus lead and reviews, Sonnet specialists, Haiku checks. No Fable. |
| V-011 | 2026-10-15 | Ads postponed. When resumed: Hebrew only, Dr. Tabansky reviews search terms. |
| V-012 | 2026-10-15 | No Cloudflare Access on the preview (user decision). Previews are public URLs with noindex. |
| V-013 | 2026-10-15 | Phase 3 starts from established open-source design systems and templates, not from scratch. |
| V-014 | 2026-10-15 | Design base: Direction A (Private bank). B and C kept as reference only. |
| V-015 | 2026-10-15 | Fonts: Frank Ruhl Libre + Assistant for English and Hebrew, self-hosted. |
| V-016 | 2026-10-15 | English first; Hebrew after EN copy and design approval. Old Hebrew copy is stale; reuse selected lines only. Layout stays RTL-ready. |
| V-017 | 2026-10-15 | Copy provenance rule: builders may not invent copy; every non-verbatim text block is listed for owner approval. |
| V-018 | 2026-10-15 | No visible "including VAT" labels; prices unchanged (VAT-inclusive). |
| V-019 | 2026-10-15 | Credential line deleted; method line used prominently instead, plus profile link. |
| V-020 | 2026-10-15 | Pricing: Assessment is the first step, not a tier. Tiers: Personal Shield, Inner Circle, Bespoke (top, individually scoped). Tier architecture developed separately (strategy/pricing/). |
| V-021 | 2026-10-15 | Bespoke minimised: not shown as a tier; one line under Personal Shield and Inner Circle. Pricing shows the Assessment (first step) and two tiers. Supersedes the three-tier part of V-020. |
| V-022 | 2026-10-15 | Pricing reopened: build a new premium (HNW, white-glove) pricing. Business target: higher margin at 1–2 engagements per month. Two-person price adopted (P4 option D). Current prices remain on the site until the new pricing is approved. |
| V-023 | 2026-10-16 | Larger households shown as "from ₪90,000" (below six figures). |
| V-024 | 2026-10-16 | First step ₪4,000 (test fallback ₪3,600); counted in full toward a tier started within 30 days. Health-check format may frame it; no health-check price comparison. |
| V-025 | 2026-10-16 | No public sales, discounts or time-limited deals. The 30-day window is the only time element; private value-adds at owner discretion, never advertised. |
| V-026 | 2026-10-16 | Direct question line 60 days (WhatsApp/Signal, within one working day, questions only). Ongoing access via the paid Annual Care plan. |
| V-027 | 2026-10-16 | Urgent surcharge stays ₪4,800 / ₪6,000 (weekend, holiday). |
| V-028 | 2026-10-16 | Attorney referral fee on a paid first step: ₪600. |
| V-029 | 2026-10-16 | Travel scope is not spelled out on the site (handled in conversation). |
| V-030 | 2026-10-16 | Build the new pricing as a separate preview branch for side-by-side comparison. Annual Care to be developed. |
| V-031 | 2026-10-16 | OWNER-BRIEF-01 approved in full (P1–P7, W1–W8): new grid ₪4,000 / ₪32,000 / ₪45,000 / ₪70,000 / from ₪90,000 with fallback grid; first step counted in full within 30 days; network in Personal Shield; inclusions; Annual Care ₪12,000 / ₪15,000 / ₪20,000; referral fees; validation plan; design A; headline C; method line; contact; page restructure; new copy list; specimen; device scope "same main account (Apple or Android)". Inputs: Inner Circle 4 days realistic; key price includes VAT. |
| V-032 | 2026-10-16 | Approved design and pricing merged into main; preview bar removed; facts.json is owner-approved. |
| V-033 | 2026-10-16 | Copy defaults confirmed: 60-day question line starts on completion of the tier's work; the ₪4,000 first step counts toward the larger-household price on the same 30-day terms; referral fee described without amounts (amounts in the one-page agreement). Builder choices stay as built (no hero eyebrow on situation pages, FAQ expand/collapse control, no phone table of contents on Conditions). |
| V-034 | 2026-10-16 | Hebrew copy uses digits for numbers (avoids gendered number words); `{factword:}` is English-only; Hebrew content uses `{fact:}`. |
| V-035 | 2026-10-16 | Facts (question-line days, key counts, credit window) are referenced from facts.json in content files, not typed. |
| V-036 | 2026-10-16 | Sentences used on more than one page live once in _shared.yaml. |
| V-037 | 2026-10-16 | One tokens file (tokens/tokens.json, DTCG) is the single source of colours, type, spacing and radii; styles/tokens.css is generated. |
| V-038 | 2026-10-16 | No paid licences: only free, MIT/OFL-licensed code and fonts (Flowbite core or daisyUI, Tailwind, Eleventy, fontsource). No Flowbite Pro, paid blocks, store templates or Tailwind Plus. Component library finalists: Flowbite 4 and daisyUI 5; owner picks after a three-page comparison. |
| V-039 | 2026-10-16 | Owner picked Flowbite 4 (free core) as the fixed component library. daisyUI branch kept, not merged. |
| V-040 | 2026-10-16 | Owner approved deletion of the switched-off old page templates, old includes, legacy CSS and superseded scripts. All 11 pages render from content. |
| V-041 | 2026-10-16 | Contact buttons read "WhatsApp" and "Signal" (no "Message on"), in blocks and floating buttons. Owner request. |
| V-042 | 2026-10-18 | Floating contact buttons are hidden on the FAQ page (they covered its group links on phones). Per-page content setting `float_contact: false`. |
| V-043 | 2026-10-18 | Visual regression: approved screenshot baselines in tests/visual/baseline; `npm run check:visual` fails on unapproved change; approval = committing updated baselines. Local/agent run; not in CI because of cross-OS font rendering. |
| V-044 | 2026-10-18 | Floating buttons keep their timing; an ivory ring makes them visible on dark sections. |
| V-045 | 2026-10-18 | Toza speaks by name; the founder is named and pictured only on About (plus the legal provider line in Conditions). Heroes are typography-only. Supersedes COPY-BRIEF 'founder named in every first screen' and the portrait in W1/W3. Owner instruction: "My name appears too often. I said TOZA and one page one mention about why ME." Toza is "it", never "he" or "we". The "Professional profile" link lives on About only. Changes: strategy/copy/VOICE-CHANGES.md. |
| V-046 | 2026-10-18 | Owner approved the Toza voice pass and its new wording. Home links to About as "Why Toza?" (under the method line); the repeated method block on Home is removed; the Conditions provider sentence stays as is. Stages options A/B/C rejected ("below mediocre"); redesign pending. |

Open owner decisions are listed at the end of `strategy/2a-message-architecture.md` and in the project handoff.

## Current delivery decisions

The entries above are historical decisions from the earlier VIP/v2 work. Apply them only where they remain consistent with the current approved replacement specification. For current source precedence, project state, and unresolved inventory, see [CURRENT.md](CURRENT.md). The approved fixed specification remains in [HANDOFF-toza-current.md](build-g/HANDOFF-toza-current.md); this note does not alter it.

| ID | Date | Decision |
|---|---|---|
| V-047 | 2026-10-23 | `2Toza`, coordinated in **Design, copyedit TOZA**, is the sole active project. VIP is historical. Keep the replacement separate from the live site until the owner-run English release cut-over. |
| V-048 | 2026-10-23 | The current handoff is the fixed implementation specification. Later owner instructions supersede it; historical chats and older project documents do not override it. Preserve the handoff unchanged. |
| V-049 | 2026-10-23 | Execute P4 through P9 in the documented order, with one PR per chunk into `build/g`. Keep `main` and production untouched until P10; Hebrew/RTL follows English launch in P11. |
| V-050 | 2026-10-23 | Use `toza-v2` for noindex previews and reserve `toza-site` for production cut-over. Cloudflare setup is incomplete and actual account configuration is unverified. |
| V-051 | 2026-10-23 | Separate cloud chats use unique task branches and send commits to the primary integrator; they do not share a local worktree. The coordinator's worktree and port registry is [WORKTREES.md](build-g/WORKTREES.md). |

## Current fixed specification

The following entries port the current approved choices in section 2 of [HANDOFF-toza-current.md](build-g/HANDOFF-toza-current.md). They record that specification without changing or reopening it. Apply them with the current delivery decisions above.

### Look and layout

| ID | Date | Decision |
|---|---|---|
| V-052 | 2026-10-23 | Use the Aspen colour-box grid: 12 columns, 10 px gap, 20 px margin; boxes snap to 25% or 50%, with deliberate empty cells showing the ground. Sticky boxes use native `position: sticky`. Radius 0, no borders or shadows. Phones use 4 columns, a plain stack and no sticky boxes. |
| V-053 | 2026-10-23 | Light tokens: ground `#E0E0E0`, boxes `#D9D9D9`, white, ink `#232323`, hairline `#C4C7C9`, node `#8A8F93`, muted `#595959`, mint `#A1FFCB`. Dark tokens: ground `#0E1012`, stone `#171A1D`, sand `#20252A`, text `#EEF0F2`, muted `#9AA3A9`, hairline `#2C3237`, node `#5A636A`; mint is unchanged. Mint is fill only; use ink text on mint, never mint text or links. Cool-grey palette A is fixed; warm stone/sand was rejected. |
| V-054 | 2026-10-23 | Every page has an icon-only theme toggle using `data-theme` on `<html>` and `localStorage["tz-theme"]`; default light, no-flash inline script, hidden without JavaScript. |
| V-055 | 2026-10-23 | Use Frank Ruhl Libre for headlines, situation lines, tier names and all paragraphs; Assistant for prices, tier item lists, labels, navigation, buttons and footer. Fonts support Latin and Hebrew and are self-hosted. No italics or synthesized italics; voice comes from size and weight. Body text is at least 17 px. Labels are uppercase, `.75rem`, `.12em` tracking and muted. Prices use lining and tabular figures and remain static. |
| V-056 | 2026-10-23 | The wordmark is *toza* in Bona Nova italic with 閉ざす vertically, as an outlined SVG. The footer uses the same lockup at header-logo size. |
| V-057 | 2026-10-23 | Use logical CSS properties for RTL readiness. No color literals outside tokens, no `!important` except reduced-motion, no tracking, and no paid licences. Copy comes only from content files; list new content keys in the PR. |

### Shell

| ID | Date | Decision |
|---|---|---|
| V-058 | 2026-10-23 | The header is sticky and solid on all pages. WhatsApp and Signal use round monochrome Simple Icons (CC0), with targets at least 44 px and accessible names “WhatsApp” and “Signal”. They appear in the header from 768 px and in a bottom bar below 768 px. |
| V-059 | 2026-10-23 | There is no floating contact group or “Call me back” anywhere. Attorneys retain “Discuss a referral” as a text button. Flowbite collapse is for the mobile navbar only; FAQ and Conditions use native `<details>`. Photo and icon credits go in the About colophon; `docs/build-g/CREDITS.md` is the interim record. |

### Home

| ID | Date | Decision |
|---|---|---|
| V-060 | 2026-10-23 | Home order is photo hero → situations → method line → specimen → fees → close → footer. The full-screen hero overlays text on the photo, with H1 bottom-left and lead bottom-right; no hero contact buttons. |
| V-061 | 2026-10-23 | Home has four photo situation boxes. “Or before anything happens. You don't need a known incident to begin.” sits on a mint box. They are static in P3; the pinned scene is P4 motion. |
| V-062 | 2026-10-23 | The method statement starts in column 3 and links “Why Toza?” to About. Stage drawings appear on How it works only, not Home. Keep the specimen block. |
| V-063 | 2026-10-23 | Home fees show “Start here” assessment as a 50% mint box and all three tiers as boxes with one shared top edge; none is recommended. Prices come only from `facts.json`. The close is a 50% ink panel, 25% hand-photo box and 25% dotted grey box. |
| V-064 | 2026-10-23 | Reuse the Study G Unsplash set: Govedarovic hero with blurred screen; J. Lo hangers; M. Charkhgard window; Boston Public Library parlour; A. Curcan stairwell; V. Gariev hand. Credits appear on About. The hero source image is 1620 px and soft on large screens. |

### Other pages

| ID | Date | Decision |
|---|---|---|
| V-065 | 2026-10-23 | Home and the four situation pages have photo heroes; other pages are typographic. About has no portrait, uses a typographic layout plus one situation photo, and names Dr. Tabansky on About only. |
| V-066 | 2026-10-23 | How it works contains the three stages as sticky boxes, each with “You keep”. |

### Motion

| ID | Date | Decision |
|---|---|---|
| V-067 | 2026-10-23 | P4 motion includes hero photo drift; a once-drawn mint headline underline and frame lines; pinned situations with four holds and a grid-growing image box to full bleed, ending on the stairwell; method-line word reveal; ambient dots in one close box; and tier fade-up. |
| V-068 | 2026-10-23 | Excluded motion includes a 3D mark, odometer, count-up, stacked full-screen images, “(1).” numbering, carousels, intro loader and endless marquee. |
| V-069 | 2026-10-23 | Motion must have a reduced-motion fallback and leave the page complete without JavaScript. It must not delay or hide channel buttons. Use only transform, opacity and clip-path. Motion engine is the `motion` npm package via esbuild; native sticky handles pinning. |

### Process and release

| ID | Date | Decision |
|---|---|---|
| V-070 | 2026-10-23 | Chunk order is P3 grid and static Home → P4 Home motion → P5 situation template and four pages → P6 How it works → P7 Pricing → P8 Attorneys and About → P9 FAQ and Conditions → P10 English release readiness → P11 Hebrew/RTL just after English launch. Other pages adopt the grid page by page. |
| V-071 | 2026-10-23 | Use one PR per chunk into `build/g`, with CI green and the existing owner review/approval for each chunk. Merge `build/g` to `main` only at the release gate. Keep `main` and VIP untouched until then. No file deletions without owner authorization. Rollback is reverting one squashed PR; VIP stays live until cut-over. |
| V-072 | 2026-10-23 | Existing gates are in `docs/build-g/GATES.md`; visual regression and manual checks are not in CI. P10's DNS/Cloudflare cut-over runbook is for the owner to execute. The owner's current full-execution authorization governs implementation; do not restart discovery or require a fresh P4 approval interview. |

### Latest owner review

| ID | Date | Decision |
|---|---|---|
| V-073 | 2026-10-23 | Photo overlap in P4 is explicitly permitted and must remain. Use the approved localized dark scrim with light text for method readability; do not clip or remove the overlapping photograph. |
| V-074 | 2026-10-23 | Remove the additional circles around WhatsApp/Signal and the mint backing around the closing icon row. Keep original symbols, contact destinations, accessible names, visible focus and existing 48 px click targets. Supersedes the visible round-button treatment in V-058 and the historical handoff. |
| V-075 | 2026-10-23 | The owner approved the revised roadmap in `docs/superpowers/plans/2026-10-23-2toza-roadmap-improvements.md`: scoped execution contracts, shared-component handoffs, candidate-specific acceptance, separate preview/release indexing policies at P10 and explicit P11 RTL checks. Continue P4 with Sol coordinating scoped Luna experts and bring a tested preview before merge. |
| V-076 | 2026-10-23 | Firefox is deferred from P4 acceptance and diagnosed separately; it is not counted as passed. P4 Home Chromium/WebKit coverage does not imply sitewide browser or manual screen-reader acceptance. |

| V-077 | 2026-10-24 | Owner visually approved the corrected P4 preview209a7fc2 and explicitly authorized P4 merge, post-merge CI check, then P5 implementation and tested preview. P4 PR21 merged18e1941; P5 still requires its own visual approval before merge. |
| V-078 | 2026-10-24 | Use the faster workflow: SOL coordinates scoped LUNA experts; finish implementation/review before push; one focused local pass, one CI cycle and one bounded public preview check; repeat only for actual findings/changes. No redundant unchanged-status polling or repeated full suites. |

| V-079 | 2026-10-24 | Owner approved P5 preview475252e6 and authorized PR22 merge, post-merge CI, then P6 using the faster SOL/scoped-LUNA workflow. P5 merged10ae3ed and post-merge CI40030892510 passed. P6 requires a separate tested preview and explicit owner visual approval before merge. |
