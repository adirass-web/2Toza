# Image layout decision and tools

Research date: 15 November 2026. Status: recommendation for the layout checkpoint, before product changes.

## Recommended element

Use one Nunjucks photographic element that emits native `figure`, `picture` and `img` markup. Reuse the existing layout wrappers. Define controlled variants in one CSS source. Keep original Hero and Situation compositions intact.

The element governs placement, container width, gutter, ratio, bleed, focal crop, responsive sources, alternative text and loading. A shared element does not require one crop for every photograph. Logos and SVG icons keep their existing elements.

| Approach | Benefit | Cost and decision |
|---|---|---|
| Existing native markup, shared element | Preserves Home and works without JavaScript | Selected recommendation. Consolidate markup and geometry without a new runtime. |
| Free Flowbite image/figure examples | Native image and caption patterns; code under MIT | Already available as a project dependency. No extra capability warrants replacing the approved layout. Avoid Pro assets. |
| Free HyperUI image/card examples | Copyable Tailwind patterns under MIT | Requires reconciliation with current CSS. Keep as a reference, not a second design system. |

Nimble's Web Search Agent recommended reuse. Its generic suggestions included a 16:9 Hero and square Pricing crop. Those values do not describe this repository. Preserve the actual 3:2 Hero and approve new slot geometry in context.

## Proposed controlled variants

These are implementation recommendations. The owner approves new geometry at Checkpoint 0.

| Variant | Placement and width | Ratio and crop | Bleed and text |
|---|---|---|---|
| `hero` | Existing Home wrapper, full available width | Preserve 3:2 and `object-fit: contain` | Preserve current bleed and adjacent text. No new overlay. |
| `scene` | Existing Home Situation wrappers | Preserve desktop geometry and phone ratios 1.14:1 / 1.08:1 | Preserve offset edges and title panels. No additional scene types in this release. |
| `situation-hero` | Existing Situation-page hero wrapper | Preserve current container height and `cover` crop | Preserve full background, scrim and title relationship. |
| `section` | Within the existing reading/content container | Proposed 3:2 at all widths; `cover` with recorded focal point | Contained, aligned with page gutters. Text remains outside the photograph. |
| `card` | Within the featured Personal Shield tile only | Proposed 3:2 at all widths; `cover` with recorded focal point | Contained within the existing tile padding. Keep price and comparison visible. |
| `portrait` | Existing About biography placement | Preserve the approved portrait proportions | Contained. No crop that removes identifying detail. |

Do not add per-page ratios, arbitrary heights or viewport-escape tricks. A new requirement changes the shared contract first. Card and section use the same ratio but differ in their container.

## Element contract

Proposed file: `src/_includes/approved-en/photo.njk`. Proposed geometry source: `styles/photo.css`, included through existing CSS builds.

- Required: local fallback `src`, intrinsic `width`/`height`, explicit `alt`, allowed `variant`, and `priority` (`normal` or `lcp`).
- Responsive images require `srcset` and slot-specific `sizes` that match the actual container.
- Optional: modern-format sources, approved mobile art direction, focal position and caption.
- Empty `alt` is valid for atmosphere. An omitted `alt` is an error.
- Default to lazy loading. Only the actual LCP image receives eager loading and high fetch priority.
- Keep price, scope, contacts and other essential information in HTML.
- Reuse current build tools for derivatives. Evaluate Eleventy's image plugin only if the existing tools cannot reliably produce the required outputs.
- The element requires no JavaScript. Image failure preserves space and leaves adjacent content usable.

## Tool selection

| Tool | Availability in this session | Role and limit |
|---|---|---|
| Nimble MCP: Web Search Agent, Search, Extract | Connected; research run completed | Compare templates and read original source/license pages. Does not replace visual inspection. CLI is absent. |
| Parallel Image Search MCP | Exposed; not invoked for this planning task | Discover images with direct URLs, source pages and dimensions. Results do not describe pixels or prove permission. |
| Local `view_image` | Available | Inspect downloaded candidates and contact sheets visually. |
| Existing Playwright plus screenshot inspection | Project dependency | Review actual crops, spacing and mobile compositions. Inspect screenshots, not only accessibility snapshots. |
| Serbyte `image-search-mcp` | Research lead; not installed or verified here | Optional dedicated Unsplash/Pexels/Pixabay integration. Evaluate credentials, permissions and current maintenance before installation. Existing tools are sufficient initially. |
| Microsoft Playwright MCP | Research lead; not required here | Alternative browser integration. Existing project Playwright can perform the necessary screenshot checks. |

Use Parallel for image discovery, Nimble for source evidence, and local visual inspection for selection. Do not install another MCP by default. Search and selection belong in the separate chat.

## Evidence and sources

Nimble run: `task_run_65fbbd2c9d9c44cd8f9f0cbc10b8d403`, completed. Raw responses remain locally under ignored `.nimble/`. The recommendation combines that research with the repository inspection.

- [Eleventy Image](https://www.11ty.dev/docs/plugins/image/): build-time responsive image generation, native output and intrinsic sizes.
- [Flowbite images](https://flowbite.com/docs/typography/images/) and [license](https://github.com/themesberg/flowbite/blob/main/LICENSE.md): free native image patterns. Code licensing does not license example photographs.
- [HyperUI](https://www.hyperui.dev/) and [license](https://github.com/markmead/hyperui/blob/main/LICENSE): free component patterns. Verify the exact copied source if used.
- [MDN responsive images](https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Responsive_images): resolution switching and art direction.
- [Tailwind aspect ratio](https://tailwindcss.com/docs/aspect-ratio) and [object fit](https://tailwindcss.com/docs/object-fit): native CSS geometry utilities.
- [Serbyte image-search-mcp](https://github.com/serbyte-development/image-search-mcp): third-party integration lead from research, not a connected service here.
- [Microsoft Playwright MCP](https://github.com/microsoft/playwright-mcp): browser automation and screenshot tooling.
- [Unsplash license](https://unsplash.com/license), [Pexels license](https://www.pexels.com/license/), [Pixabay license summary](https://pixabay.com/service/license-summary/): verify the selected asset and applicable restrictions in the selection chat.

The research output supplied only one normalized source-index entry. Other links above identify the original pages discussed in its response. Recheck exact licenses before copying any third-party code or shipping images.

## Repository reconciliation — geometry checkpoint

The source-derived inventory in `selection.md` is authoritative when preserving existing layouts. In particular, the current Home hero has a title overlay and scrim, plus explanatory text below. The table's “adjacent text / no new overlay” wording means no additional overlay; it must not be interpreted as removing the existing one. Keep current hero markup and geometry unchanged until the approved shared-element migration. The proposed contract in `docs/design-system.md` records this distinction.
