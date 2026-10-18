# Toza — radical redesign (branch `design/radical`)

Orphan branch: no shared history with `main`, never merged. Five concept boards for Dr. Lior Tabansky.
Preview: https://design-radical.toza-v2.pages.dev (noindex).

- `SPEC.md` — approved spec (decisions D1–D20).
- `DECISIONS.md` — log and handoff.
- `copy/source/` — frozen content files from `adirass-web/2toza` main @ `b3efb35`. Do not edit.
- `copy/strings.json` — resolved copy of every page, exported from a build of that commit.
- `site/` — board 2 (static HTML/CSS), palette previews and the review page.
- `review/` — inspector screenshots and the taste-skill direction sheets.

Commands: `npm ci` · `npm run check` (copy parity: every visible board string must exist in the frozen copy).
Re-export copy only on an owner decision: build 2toza at the new commit, then `npm run export-copy -- <path>/_site <commit>`.
