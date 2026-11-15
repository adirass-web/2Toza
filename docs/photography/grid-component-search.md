# Ready-made grid components — 15 November 2026

Owner direction: search for a production-ready grid element for pictures, pricing and supporting sections instead of approving the proposed fixed photo placements. The prior 3:2 compositions remain unapproved. This search does not authorize a purchase or establish production acceptance.

## Shortlist

1. **Preline free marketing blocks**: strongest ready-made section family. The official pricing page exposes a free “Pricing Card Grid.” Feature sections include free “Feature Section with Image and Icon Blocks,” “Centered Feature Section with Three Images” and “Feature Steps Section.” These supply concrete pricing, photo and supporting-section layouts in HTML/Tailwind. Prefer static examples; inspect their actual source before introducing any plugin dependency.
   - https://preline.co/blocks/marketing/pricing-cards
   - https://preline.co/blocks/marketing/feature-sections
   - https://preline.co/docs/license.html
   - Free UI is offered for commercial projects under MIT plus Fair Use terms; retain applicable notices and attribution. Pro is separate and restricts public source redistribution. Use only explicitly free blocks for this public repository.
2. **HyperUI**: simplest fit with the current Eleventy/Nunjucks and Tailwind v4 build. Copyable HTML, no package installation. Responsive grid primitives, image/text sections and highlighted pricing options are available. More assembly is required than Preline; pricing examples need adaptation to Toza's three tiers and full inclusions.
   - https://hyperui.dev/components/application/grids
   - https://www.hyperui.dev/components/marketing/sections
   - https://hyperui.dev/components/marketing/pricing
   - https://github.com/markmead/hyperui/blob/main/LICENSE (MIT; preserve notice)
3. **Tailwind Plus**: purpose-built bento grids and a broad matching pricing/feature library, with HTML examples. Paid library; not selected for copying under the existing no-paid-assets direction.
   - https://tailwindcss.com/plus/ui-blocks/marketing/sections/bento-grids
   - https://tailwindcss.com/plus/ui-blocks

Flowbite was also checked. Its default pricing cards are available, but several richer image/feature layouts are locked. It did not offer a clear advantage over the first two candidates for this request.

## Owner selection

Preline selected for setup and use; HyperUI remains plan B. See `preline-setup.md` for configuration, public-source inspection and the pending authenticated connection.

## Recommendation

Evaluate Preline's explicitly free static pricing and image-feature blocks first as one consistent family. Keep HyperUI as the lower-dependency, simpler-license alternative. These are separate section blocks sharing a grid approach, not a single universal component that already implements Toza's content.

Before calling an adaptation production-ready, inspect the selected HTML, preserve Toza typography/palette/copy, make responsive images local with dimensions, retain all pricing disclosures and contacts, and run mobile, no-JavaScript, accessibility, print and performance checks. Library sample-photo licenses are separate. No component code or sample images were copied in this search.

Evidence: official pages returned by Parallel web search on 15 November 2026; session `session_c120cc9bcb93ad3e5535dd22ce771c8c`. Source excerpts establish available examples and license terms, not visual or runtime verification within Toza.
