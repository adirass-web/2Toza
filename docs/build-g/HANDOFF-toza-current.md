# Toza: handoff, current state and decisions in force

23 Oct 2026 · Reviewer and final approver: Dr. Lior Tabansky · Owner executes the DNS / Cloudflare cut-over.

Scope: only what is current and not already in the repo. Overruled and superseded decisions are left out on purpose.
Basis: `adirass-web/2toza` read on 23 Oct (last commit anywhere: 21 Oct 10:03), the project documents (last dated 20 Oct), and the owner's answers up to 21 Oct.
Not verifiable from here: PR status, Cloudflare deployments, anything after 21 Oct 10:03.

---

## 1. Status

Production = replace the live VIP site on the real domain. English first, Hebrew right after.

| Item | State |
|---|---|
| `build/g` @ `d59b455` | Integration branch. Contains P0 (inventory, baselines), P1a+P1b (CI gates, tokens, palette, type, wordmark; PR #2) and P2 (shell; PR #3). |
| `build/g-p3-home` @ `14848e5` (21 Oct 09:28) | P3: colour-box grid + static Home. **Not in `build/g`.** PR status unknown. Branched before the P2 squash-merge, so it will need re-syncing with `build/g` before it can merge. |
| Palette | Cool-grey option A (highest contrast) kept in P3; P1b palette/type PR approved. |
| Previews | `deploy-preview.yml` triggers on `main`, `design/**` and pull requests only. Pushes to `build/**` get no preview. Whether `build-g.toza-v2.pages.dev` is live is unverified. |
| Waiting on | Owner review and approval of the P3 preview. Then the P4 (motion) plan. |
| Not built yet | Motion, situation template, How it works, Pricing, Attorneys, About, FAQ, Conditions, Hebrew. |

## 2. Decisions in force

### Look and layout
- **Layout:** Aspen colour-box grid. 12 columns, 10 px gap, 20 px margin. Boxes snap to 25% or 50%, with deliberate empty cells that show the ground. Sticky boxes use native `position: sticky`. Radius 0, no borders, no shadows. Phone: 4 columns, plain stack, no sticky.
- **Palette (light):** ground #E0E0E0, boxes #D9D9D9, white, ink #232323, hairline #C4C7C9, node #8A8F93, muted #595959, mint #A1FFCB. Mint is fill only: never mint text or links; ink text on mint. Warm stone/sand rejected.
- **Palette (dark):** ground #0E1012, stone #171A1D, sand #20252A, text #EEF0F2, muted #9AA3A9, hairline #2C3237, node #5A636A, mint unchanged.
- **Theme toggle:** every page, icon only, `data-theme` on `<html>`, stored in `localStorage["tz-theme"]`, default light, no-flash inline script, hidden without JS.
- **Type:** Frank Ruhl Libre for headlines, situation lines, tier names and all paragraphs. Assistant for prices, tier item lists, labels, navigation, buttons, footer. Latin + Hebrew, self-hosted. No italic and no synthesised italic: voice comes from size and weight. Body ≥ 17 px. Labels: uppercase, .75rem, +.12em tracking, muted. Prices: lining + tabular figures, static (no count-up).
- **Wordmark:** *toza* in Bona Nova italic with 閉ざす set vertically, as an outlined SVG. Footer uses the same lockup at header-logo size (the giant cropped version was rejected).
- **Code rules:** logical CSS properties only (RTL-ready), no colour literals outside tokens, no `!important` except reduced-motion, no tracking, no paid licences. Copy comes only from the content files; new content keys are listed in the PR.

### Shell
- Header sticky and solid on all pages.
- WhatsApp and Signal are round monochrome logo buttons (Simple Icons, CC0; used everywhere, not Streamline). They sit in the header from 768 px and in a bottom bar under 768 px. Targets ≥ 44 px, accessible names "WhatsApp" and "Signal".
- Floating contact group removed. "Call me back" removed site-wide. Attorneys keep "Discuss a referral" as a text button.
- Mobile menu: Flowbite collapse. Flowbite is used for the navbar only. FAQ and Conditions keep native `<details>`.
- Photo and icon credits go in a colophon on About (P8), not the footer. `docs/build-g/CREDITS.md` is the record until then.

### Home
Order: photo hero → situations → method line → specimen → fees → close → footer.
- **Hero:** full-screen photo with the text over it, H1 bottom-left, lead bottom-right. No contact buttons in the hero (the header carries them).
- **Situations:** four photo boxes. The line "Or before anything happens. You don't need a known incident to begin." sits on a mint box. Static for now; the pinned scene comes with motion.
- **Method line:** statement from column 3, with the "Why Toza?" link to About. **Stage drawings are not on Home**; the stages live on How it works only.
- **Specimen block:** kept.
- **Fees:** "Start here" assessment as a 50% mint box. All three tiers as boxes with one shared top edge and nothing marked recommended. Prices only from `facts.json`.
- **Close:** ink panel (50%), hand-photo box (25%), dotted grey box (25%).
- **Photos:** the Study G Unsplash set (Govedarovic hero with blurred screen; J. Lo hangers; M. Charkhgard window; Boston Public Library parlour; A. Curcan stairwell; V. Gariev hand). Credit shown on About. Hero is 1620 px and soft on large screens.

### Other pages
- Photo heroes on Home and the four situation pages. Other pages are typographic.
- About: no portrait; typographic page plus one situation photo. Dr. Tabansky is named on About only (V-045).
- How it works: the three stages as sticky boxes, with "You keep" per stage.

### Motion (P4, not built)
- **In:** hero photo drift; hero headline mint underline drawn once; frame lines draw in once; pinned situations scene (four holds, image box grows along the grid to full bleed; the stairwell ends it); word reveal on the method line; ambient dots in one close box; tier fade-up.
- **Out:** 3D mark, odometer, count-up, stacked full-screen images, "(1)." numbering, carousels, intro loader, endless marquee.
- **Guardrails:** reduced-motion fallback; nothing delays or hides the channel buttons; transform, opacity and clip-path only; page complete without JS. Engine: `motion` from npm via esbuild, native sticky for pinning.

### Process
- Chunk order: P3 grid + static Home → P4 motion on Home → P5 situation template (four pages) → P6 How it works → P7 Pricing → P8 Attorneys + About → P9 FAQ + Conditions → P10 release readiness (English) → P11 Hebrew/RTL.
- Other pages adopt the grid page by page.
- One PR per chunk into `build/g`; CI green; owner approval per chunk. `build/g` goes to `main` only at the release gate. `main` and VIP are untouched until then. No file deletions without owner approval. Rollback = revert one squashed PR; VIP stays live until cut-over.
- Gates: see `docs/build-g/GATES.md`. Visual regression and the manual runbook are not in CI.
- P10 runbook for the DNS / Cloudflare cut-over is written for the owner to execute.

## 3. Not in the repo

- **The whole decision register.** `docs/decisions.md` ends at V-046 (18 Oct). Everything in section 2 exists only in the project documents (D47–D107, plans P1b/P2/P3). Both orphan branches refer to project documents that are not in the repo. Proposal: port section 2 into `docs/decisions.md` as V-047 onward.
- **Owner answers given in chat** (21 Oct): about page without portrait; Home keeps specimen; stage drawings dropped from Home; three tiers on Home; no hero contact buttons; header solid; credits in colophon; footer wordmark at header size; palette A and P1b approved; Study G photos reused.

## 4. Open items

1. Owner review and approval of P3. PR status unknown.
2. Re-sync `build/g-p3-home` with `build/g` (P2 was squash-merged).
3. Preview deployment for `build/**` branches is not configured. Decide: extend the workflow trigger, or rely on pull-request previews.
4. `home.md` hero still lists `actions: [whatsapp, signal]` although the template ignores them. Clean up in P3.
5. Is the Signal glyph recognisable at 24 px? Asked on 19 Oct, no recorded answer.
6. The P2 plan asked whether `prefers-color-scheme` stays ignored (default light by design). No recorded answer.
7. Photo-to-slot mapping in `CREDITS.md` is unconfirmed (check at P10). Full-size hero original needed before release.
8. Israeli accessibility requirements (accessibility statement, IS 5568 / WCAG AA): confirm with counsel before P10.
9. Hebrew/RTL: the scroll JS left/right math needs revisiting in P11.

## 5. How to resume

```
git clone https://github.com/adirass-web/2toza && cd 2toza
git checkout build/g-p3-home      # current work
npm ci
npm run build && npm run check    # facts, noindex, tokens, contrast, lint, links
npm run check:a11y                # axe, both themes, 390/1440
npm run check:perf                # LCP ≤ 2.5 s, CLS ≤ 0.05, JS ≤ 60 KB gz, page ≤ 1.2 MB
npm run check:visual              # agent/local; `npm run visual:approve` updates baselines
node scripts/check-anchors.mjs <main build> _site --fail-linked
```

Baseline to protect (P0, 390 px, throttled): LCP 0.86–1.00 s, CLS 0, 111–155 KB per page, JS 6 KB, axe 0.
Browser gates need Chromium (`npx playwright install --with-deps chromium`).

Next step: owner reviews P3, then write the P4 motion plan for approval before any code.
