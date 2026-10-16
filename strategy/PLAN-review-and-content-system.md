# Plan — independent review + copy-safe content system (v1, for approval)

16 Oct 2026 · Repo `adirass-web/2Toza` · Nothing executed yet.

## Why a new method
Today copy sits **inside the HTML templates**, mixed with layout classes (148 class attributes on the FAQ page alone, 52 one-off sizes/colours in templates). Changing a sentence means editing markup, and a long line can break a layout unnoticed.

## The method: content as data, components with limits, automatic guards
1. **Content files, not HTML.** Every page becomes a structured file (`src/content/en/<page>.yaml`): an ordered list of blocks (hero, recognition, stages, first step, tiers, FAQ group, conditions section, contact). Editors touch only these files. Hebrew later = `src/content/he/` with the same structure.
2. **A fixed component library.** One template per block type with a few named variants. Pages contain no styling. Layout lives in the components only.
3. **Design tokens as the single source.** Colours, type scale, spacing and radii are defined once (Tailwind theme / CSS variables). A lint rule rejects one-off colours or sizes in templates.
4. **Copy limits enforced by the build.** Each field has a schema with a length limit (e.g. headline ≤ 60 characters, subline ≤ 160, FAQ answer ≤ 80 words). Copy that would break the layout fails the build before anyone sees it.
5. **Text-resilient CSS.** Balanced headline wrapping, safe word breaking and container-based component sizing, so components adapt to any text within the limits, in English and Hebrew.
6. **Automatic checks on every change:** schema and limits; prices only from `facts.json` (existing); accessibility (axe-core) on every page; screenshot comparison against approved baselines at phone, tablet and desktop; a "stress page" rendering every component with maximum-length text and in right-to-left.
7. **Living style guide** at `/styleguide/` (noindex): every component and token with sample content. It is the reference for editors and reviewers.
8. **Workflow:** copy change → branch → checks → preview URL → approval → merge. Optional: a git-based form editor (Decap CMS or Pages CMS) on the same files for non-technical editors.

## Phases (each ends with a gate)
| # | Phase | Output | Skills | Model |
|---|---|---|---|---|
| R1 | Automated audit of 11 pages: axe-core, keyboard and focus run, contrast measured on rendered pixels, layout at 320 / 390 / 768 / 1024 / 1440, page weight | `review/R1-automated.md` + screenshots | `responsive-check:responsive-check`, `design:accessibility-review` | Sonnet |
| R2 | Independent expert review: hierarchy, consistency across 11 pages, register, trust and first impression | `review/R2-expert.md` with a ranked fix list | `design:design-critique`, `perception-first-design:evaluate`, `brand-studio:brand-review` | Opus |
| **Gate 1** | You approve the fix list | | | |
| S1 | Content model: block types, fields, variants, length limits, token inventory | `system/S1-content-model.md` | `design:design-system`, `ui-ux-pro-max:design-system`, `design:design-handoff` | Opus |
| S2 | Refactor to the method: content files, components, tokens. **Proven pixel-identical** by before/after screenshot diff, so the redesign does not drift | Code on a branch | `frontend-design` | Sonnet |
| F | Apply the approved fixes inside the components, once, for all pages | Code | `frontend-design`, `design:ux-copy` | Sonnet |
| S3 | Guardrails in CI: schema and limits, token lint, axe, visual regression, stress page; new baselines after fixes | CI green | — | Sonnet + Haiku checks |
| S4 | Style guide page + `COPY-EDITING.md` (how to change copy safely, in plain words) | Page + guide | `design:design-system` | Sonnet |
| R3 | Independent re-review of the result | `review/R3-final.md` | as R2 | Opus |
| **Gate 2** | You approve; merge to `main`, preview updates | | | |
| (opt.) S5 | Form-based editor for copy | CMS on the same files | — | Sonnet |

Order rationale: review first (find the problems), then refactor without visual change (so the system is proven safe), then fix once inside components, then lock the result with automatic checks.

## Decisions needed
1. Approve this plan and order.
2. Form-based editor (S5): now, later, or not needed?
3. Screenshot comparison strictness: block any visual change without approval (recommended), or warn only?
