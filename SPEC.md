# Toza — Radical redesign: spec v0.3 (approved 18 Oct; v0.3 records later answers)

18 Oct 2026 · Reviewer: Dr. Lior Tabansky · Status: approved; step 2 (branch setup) done · v0.1 → v0.2: decisions D8–D16, shot list, sources found. v0.2.1: D17. v0.3: D2/D3/D14 revised, D18–D20 added after main moved to b3efb35.

## 1. Goal
Five radically different visual directions for the Toza site, shown as concept boards. One or two are chosen and developed later. The design is new; the copy is not.

What the site must do (unchanged from strategy/2a, design choices ignored):
- name the fear (ordinary access becomes leverage);
- show one senior expert working in person, with the client in control;
- show a defined process with tangible results (Assess → Harden → Verify; keys, dated record, summary);
- show known prices;
- open a private channel (WhatsApp / Signal / call-back) on the first tap.

## 2. Decisions
| # | Decision |
|---|---|
| D1 | New tree = orphan branch in `adirass-web/2toza` (no shared history with `main`). |
| D2 | Copy freeze: the content files are the source and are not edited: `src/content/en/*.md`, `_shared.yaml`, `src/_data/i18n/en.json`, `facts.json`, `contact.json` at `main@b3efb35` (owner-approved voice pass V-045/V-046; moved from 0037081). |
| D3 | "Toza" is the common name. Per V-045 the founder is named on About only; Home boards therefore do not show his name (no preference either way for boards). |
| D4 | Pricing and How it works wait for the pending outline (strategy/PAGES-pricing-howitworks-outline.md). Boards do not use those pages. |
| D5 | Deliverable this round: one static concept board per direction. |
| D6 | No RTL shown this round. Future Hebrew must remain possible (§5). |
| D7 | Open to change: library, fonts, palette, tokens, layout, imagery rules, page budgets, page weight, R-2 placement, CTA mechanics. |
| D8 | Logo in scope. Each board carries its own wordmark proposal for "Toza". |
| D9 | The 9 Oct 2026 logo rules (VIP repo, DESIGNER-LOGO-BRIEF) do not bind the proposals, and the current fitted-panel logo is not shown as a reference. |
| D10 | Name origin as design input: Japanese 閉ざす (tozasu), "to close shut". Pronounced TOH-zah. |
| D11 | Binding inputs for all directions (owner art-direction facts, 13 Oct 2026): private individuals, mostly women, Israel, mid-high income through HNW; artisan care, tailoring, precision, Japanese aesthetic restraint expressed through composition. |
| D12 | Photography allowed: ambient, real, ordinary people with phones (shot list §7). No private screen content; nothing that implies a real client, testimonial or outcome. |
| D13 | Boards use marked placeholders for photos. Licence when real photos come: free stock only. |
| D14 | Boards show the same content for all five: hero + situation doors (four situations + "Or before anything happens"). Stages swapped out: owner rejected three stages designs (V-046). |
| D15 | Review via a preview URL from the orphan branch (deploy workflow to be added on that branch). |
| D16 | Component library decided after a direction is chosen; boards use no library. |
| D17 | Japanese characters allowed anywhere (wordmark and site). This overrides the "no Japanese characters or cultural ornament" part of D11; the rest of D11 stands. |
| D18 | Japanese characters may appear in the wordmark and as a meaning line (e.g. 閉ざす · tozasu · to close shut). The meaning line is a listed exception to the copy freeze. |
| D19 | Orphan branch `design/radical`, fully separate from main and other sessions' work; never merged. Preview: design-radical.toza-v2.pages.dev. |
| D20 | Branch contents: frozen copy sources (`copy/source/`), exported strings (`copy/strings.json`), parity check (`npm run check`), boards in `site/`, own deploy workflow. |

## 3. Copy rule (enforced)
- Every visible string on a board comes verbatim from the frozen content files, resolved (facts, shared, ui tokens), taken from a build of `main@b3efb35` and exported to `copy/strings.json`.
- No new strings, including labels inside drawings or diagrams. Where a direction needs a label, it uses an existing phrase.
- Exceptions (marked `data-copy-exempt`, listed by the check): the wordmark, the Japanese meaning line (D18), photo-placeholder notes.
- Allowed: choosing which blocks appear, their order, and line breaks.
- Check: a script compares every text node on each board (placeholders excluded) against the built current site. Any string not found fails the board.

## 4. Board format (identical for all five)
- Content: Home hero + situation doors.
- Frames: desktop 1440 and phone 390.
- Each board includes its wordmark proposal: primary lockup, small size, and the reverse version if the direction uses one.
- Built as static HTML/CSS (no framework). PNG screenshots are committed.
- One comparison page shows the five boards side by side. Each carries a five-line rationale and a note on how it answers D11.

## 5. Library and future Hebrew
- RTL comes from logical CSS properties (Tailwind v4 logical utilities or plain CSS), not from Flowbite.
- Every direction names a Hebrew-capable typeface for its text and uses logical properties only.
- Flowbite stays an option at build stage, for behaviour (menu, collapse). That decision is deferred (D16).
- The wordmark is Latin. Whether Hebrew pages also need a Hebrew form is decided at the Hebrew stage.

## 6. The five directions
| | Idea | Photography | Type (Latin / Hebrew companion) | Palette | Main risk |
|---|---|---|---|---|---|
| 1 Dossier | The site is a private document: folios, letterhead, dated entries. Precision through the document's own grid. | None (portrait only) | IBM Plex Serif + Plex Mono / IBM Plex Sans Hebrew | Paper white, black, one stamp colour | Reads as investigation |
| 2 Plates | Typographic monograph. Each statement is a full-screen numbered plate; photo plates alternate with type plates. | P1, P3 as full-bleed plates | Display serif / Frank Ruhl Libre or David Libre | Two colours | Long phone scroll |
| 3 Still life | Objects carry the story: phone, laptop, two keys, dated record. Crafted, tailored, lit like product photography. | P2 (phone on the table) | Quiet grotesk / Heebo or Rubik | Dark ground, warm light | Illustration quality |
| 4 Access map | Connections drawn as a web that closes shut through the stages (a direct reading of *tozasu*). | None | IBM Plex Sans / Plex Sans Hebrew | Light, one signal colour | Node labels limited to existing phrases |
| 5 Conversation | The page reads as the first private conversation. Copy arrives as calm messages; the CTA is the next message. | P1, P3 | Assistant / Assistant | Neutral, very light | Gimmick; must not imitate WhatsApp's UI or brand |

All five must also avoid:
- shields, padlocks, hackers, binary code;
- pink or "feminine" stereotypes;
- luxury signalling.

## 7. Photo shot list (placeholders now, free stock later)
- **P1:** Israeli woman, 35–50, walking on a city street in Tel Aviv light, phone in hand, mid-step, not looking at the camera.
- **P2:** Woman of the same type seated at a café or home table, phone face-down on the table beside her.
- **P3:** Hands only, holding a phone, shallow focus, natural light.
- **Treatment for all:** real, unposed, ambient. No visible screens, no logos, no close-up faces.

## 8. Order of work (each step needs approval)
1. Approve this spec.
2. Get push access to `2toza`, create the orphan branch, and add:
   - the frozen copy export,
   - the copy-parity check,
   - the preview deploy workflow.
3. Build boards 1–5, one at a time. Each one is screenshotted and checked.
4. Build the comparison page on the preview URL, then review with Dr. Tabansky.
5. Pick one or two directions, then write the next spec (pages, stack, Hebrew, real photos).

## 9. Sources
- Repo `adirass-web/2toza@0037081`: strategy/BRIEF.md, 2a-message-architecture.md, docs/decisions.md.
- Branch `upstream-baseline` (copy of `adirass-web/VIP`):
  - projects/toza-en-editorial-revision/brand/DESIGNER-LOGO-BRIEF.md (name origin);
  - docs/visual-refinement-review/ART-DIRECTION.md (audience and art direction);
  - planning/2026-10-12-next-editorial-design-execution-plan.md (ambient photography).

## 10. Open
- None.

## 11. v0.4 additions (18 Oct, 13:28–13:48)
| # | Decision |
|---|---|
| D21 | Scope cut to three directions: 2 Plates, 3 Still life, 4 Access map. 1 Dossier and 5 Conversation dropped. |
| D22 | Design engine: `leonxlnx/taste-skill` (tasteskill v2, @f624f37), core skill rather than its redesign skill (that one forbids rewriting from scratch). Directions dealt by its `draw.mjs`, quiet tone. Mapping: 2 → *The quiet instrument* (finance), 3 → *The split stage* (health), 4 → *The product performs* (finance). |
| D23 | Motion follows PFD R3 (one quiet motion at most), overriding the skill's motion floor. The inspector's `still-page` FAIL is accepted. |
| D24 | Real photographs now, from free stock (Unsplash License), credited; they replace the marked placeholders of D13. |
| D25 | Every typeface must set both Hebrew and English in one family: Bona Nova (2), Noto Serif Hebrew (3), IBM Plex Sans Hebrew (4). These replace the dealt EB Garamond, Literata and General Sans. |
| D26 | The dark palette dealt to direction 4 is redrawn (PFD R2: dark reads as threat). Result: *Putty and black*, with teal accent. |
| D27 | The skill's house rule applies: headlines at most two lines at every width. The frozen H1 is sized to fit. |
| D28 | Idea sentences, as proposed 13:44: 2 restraint as *tozasu*; 3 an ordinary moment kept in view; 4 her own words, closed link by link. |

## 12. Review round 1 (18 Oct, 14:16)
| # | Decision |
|---|---|
| D29 | Board 4 (Access map) rejected. |
| D30 | Board 2 (The quiet instrument) preferred over board 3 (The split stage). Board 2 is developed further. |
| D31 | **Wordmark approved:** italic lowercase *toza* in Bona Nova, with 閉ざす set vertically beside it like a colophon. |
| D32 | Photos rejected. The owner supplies the photographs. |
| D33 | Situations become a media gallery, tighter but bigger, not a stacked list. |
| O3 | Resolved by D34 (full-bleed hero) and D37 (gallery edge to edge, within the width).

## 13. Review round 2 (18 Oct, 15:01–15:27)
| # | Decision |
|---|---|
| D34 | Hero layout H2 approved: a full-bleed photo across the top, with the text on white below. The Gariev photo (a hand placing a phone on a desk) stays as the hero for now. |
| D35 | Owner photo directions: real daily ambience, not staged; no faces or model beauty needed. Crops, recolours and modifications are allowed. Originals are kept in `assets/photos/` with `CREDITS.md`; on the page, attribution is one small line. |
| D36 | Situation photos are atmospheric and emotion-triggering, shown in their own colours: 1B two hangers, 2B one lit window, 3A period parlour, 4D stairwell. |
| D37 | A horizontal strip that runs past the right edge is rejected. All four situations must fit the width. Desktop: four in a row; phone: 2×2. |
| D38 | Geometry G3 (editorial mosaic) chosen, 15:32. The hero headline crosses the photo's lower edge. Situations form one interlocking grid with the heading and the mint line: desktop 4×2; phone 2 columns, with separation full width. |
