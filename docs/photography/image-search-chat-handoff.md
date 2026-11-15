# Separate chat: image search and selection

This file is a self-contained prompt for a new user chat. No chat was created automatically: this session exposes no chat-creation tool.

## Prompt to paste

Work on image search and selection for Toza. Keep this work separate from product implementation. Use Nimble for research and source evidence. Use available image-search and visual-inspection tools for candidates. Discover tools again in this chat, because availability can differ.

The repository is `/workspace/toza-launch`, branch `launch/english-mvp`, remote `https://github.com/adirass-web/2Toza.git`. If this workspace is unavailable, obtain the repository documents before selection. Do not treat this prompt as proof that later product files are unchanged.

Read these documents first:

- `docs/superpowers/specs/2026-11-15-photography-upgrade-brief.md`
- `docs/superpowers/plans/2026-11-15-photography-upgrade.md`
- `docs/photography/image-layout-research.md`
- `docs/design-system.md`
- `docs/photography/selection.md`, when available

The approved Home Hero and Situation photographs define the visual language. Inspect those actual images and rendered pages first. The last recorded verified preview is `https://ceaa9c65.toza-v2.pages.dev/en/`. Verify its current availability. The owner requested precision, practical hardening, peace of mind, confidence and relief.

Use real photographs with natural light, a muted palette, believable interiors and human scale. Reject hacker imagery, glowing locks, shield graphics, staged surveillance and decorative technology collages. Do not imply Toza staff, actual clients, premises or endorsements. The real About portrait remains authoritative for Dr. Tabansky.

The first two intended placements are Personal Shield on Pricing and an assessment/method section on How it works. These remain subject to the layout checkpoint. Do not finalize photo selection before the implementation chat supplies two approved slot specifications. Do not invent a ratio or change a layout to rescue a candidate.

## Required input from the implementation chat

For each slot, obtain its ID, purpose, page/section, shared element variant, container width, gutters and maximum width. Obtain desktop/mobile ratios, bleed, crop bounds, text relationship and loading priority. Obtain reference screenshots and the approved standard version.

If an input is absent, record it as unresolved and ask for that input before selection. Candidate discovery can proceed provisionally, with that limitation stated.

## Tools to use

| Need | Preferred tool | Required follow-through |
|---|---|---|
| Find photographs | Parallel Image Search MCP | Open the original source page. Search metadata is not visual review. |
| Read sources, licenses or template guidance | Nimble Search/Extract; one Web Search Agent for broader comparison | Save original URLs and dated evidence. Preserve the server-issued conversation ID within this chat. |
| Inspect pixels | Download locally and use `view_image` | Inspect every shortlisted candidate at useful resolution. |
| Judge crops and hierarchy | Existing Playwright and inspected screenshots | Show desktop and phone compositions inside the frozen geometry. |

Begin with free Unsplash photographs to match existing provenance. Pexels or Pixabay can supplement the search. A free search result is not proof of commercial permission. Verify the exact asset and applicable terms. Do not buy assets or use paid collections. Do not generate replacements.

Optional MCP leads are recorded in `image-layout-research.md`. Do not install them or request credentials unless existing tools prove insufficient. Template code licenses do not license their sample photos.

## Search and selection procedure

1. Record the repository SHA, standard version, slot specifications and baseline references.
2. Find three credible candidates per slot, six total.
3. Record each asset's ID, photographer, source page, license URL/date, dimensions and relevant rights limitations.
4. Reject uncertain licenses, inadequate resolution, misleading context and incompatible crops.
5. Download candidates outside published directories. Do not hotlink them into the site.
6. Inspect the candidates beside Home's actual reference images.
7. Show a labeled contact sheet with source/license links and short reasons.
8. Show the strongest pair in desktop and 320/390px compositions using the approved slot geometry.
9. Recommend one coherent pair. Explain each image's purpose and why the alternatives are weaker.
10. Ask the owner to select images and approve crops. Record the exact decision.
11. Return the selection record and evidence to the implementation chat. Do not publish or change product templates.

## Deliverables and acceptance

Save the selection record at `docs/photography/selection.md`. Save candidate files, contact sheets and compositions under ignored `.artifacts/photography/`. If a separate checkout is used, return a portable evidence bundle and the record's commit or patch.

For each selected image, include the exact asset/source, photographer, license evidence, retrieval date and source dimensions. Include the intended slot, shared variant, desktop/mobile crop or focal coordinates, alt recommendation and owner decision. Distinguish approval from a recommendation.

Use these statuses: `candidate`, `rejected`, `recommended`, `owner-approved`. Only `owner-approved` assets can pass to integration.

The implementation chat must reject an incomplete handoff. Selection is complete only when both approved assets fit the frozen geometry and carry traceable provenance. Optimization, product changes, performance checks and preview publication remain in the implementation plan.
