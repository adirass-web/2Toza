# Component library comparison — Flowbite 4 vs daisyUI 5 (16 Oct 2026)

Same content files, same tokens file, same three pages (Home, Separation, Pricing). Both free (MIT, V-038).

| Preview | Flowbite | daisyUI |
|---|---|---|
| Home | https://design-lib-flowbite.toza-v2.pages.dev/en/ | https://design-lib-daisyui.toza-v2.pages.dev/en/ |
| Separation | https://design-lib-flowbite.toza-v2.pages.dev/en/separation-divorce/ | https://design-lib-daisyui.toza-v2.pages.dev/en/separation-divorce/ |
| Pricing | https://design-lib-flowbite.toza-v2.pages.dev/en/pricing/ | https://design-lib-daisyui.toza-v2.pages.dev/en/pricing/ |

## Measured

| | Flowbite 4.0.2 | daisyUI 5.7.50 |
|---|---|---|
| Custom CSS rules outside the library | **3** | 11 |
| CSS (gzip) | **9.1 KB** (12.2 with legacy pages) | 15.4 KB |
| JavaScript (gzip) | 1.4 KB (mobile menu only) | **0** |
| Template lines (12 blocks + header + footer) | 322 | 321 |
| Copy parity with content files | 100% | 100% |
| Colour literals in new files | 0 | 0 |
| Accessibility (axe, 3 pages) | 0 violations | 0 violations |
| Right-to-left | mirrors fully, no overflow | mirrors fully, no overflow |

## Observed

| | Flowbite | daisyUI |
|---|---|---|
| Phone menu | full menu behind a menu button | no menu: header shows "Pricing" + "Message"; other links in footer |
| Situation list (Home) | boxed cards (library default) | hairline rows, as in Direction A |
| Price strip under the stages | brackets kept, as in Direction A | approximated; "Verify" column does not line up |
| Tier lists (Pricing) | check icons | plain ruled rows, as in Direction A |
| Dark (ink) sections | handled by theme variables | each button/link needs extra on-dark classes |
| Phone contact buttons | clean | "Message on Signal" wraps to two lines |

## Recommendation
**Flowbite.** It needs the least custom code (3 rules), so the library — not our CSS — carries the design, which is the point of a fixed base. It has a working phone menu, keeps the price brackets, handles dark sections through the theme, and its right-to-left support is documented for every component. Two fixes after the pick: situation list as hairline rows, tier lists without check icons (both Direction A details).

daisyUI's strengths (no JavaScript, closer list styling) do not outweigh 11 custom rules, the missing phone menu and per-element work in dark sections.

## After the pick
1. Merge the chosen branch; delete nothing until approved.
2. Apply the two Direction A fixes.
3. Render the other 8 pages from content (4 more block types: steps, letter, faq-group, terms-section).
4. Screenshot baselines + a check that blocks visual change without approval.
