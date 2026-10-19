# build/g quality gates (as implemented)

| # | Gate | Command | Where | Blocks merge |
|---|---|---|---|---|
| 1 | Build, facts, noindex, tokens | `npm run build && npm run check` | CI | yes |
| 2 | Lint: no physical CSS/Tailwind properties (RTL-safe), no `!important` outside reduced-motion, no colour literals in `styles/*.css`, `src/**` | in `npm run check` (`check-lint.mjs`; `/* lint-allow */` for a reviewed exception) | CI | yes |
| 3 | Links: every internal link and `#id` resolves | in `npm run check` (`check-links.mjs`) | CI | yes |
| 4 | Accessibility: axe-core WCAG 2.0/2.1 A+AA, every page × 390/1440 × shipped themes, 0 serious/critical | `npm run check:a11y` | CI | yes |
| 5 | Performance budget, phone profile: LCP ≤ 2.5 s (20 % CI tolerance), CLS ≤ 0.05, JS ≤ 60 KB gz, page ≤ 1.2 MB, no horizontal overflow | `npm run check:perf` | CI | yes |
| 6 | Anchors: no id linked from main disappears | `check-anchors.mjs <main build> _site --fail-linked` | CI (not on main) | yes |
| 7 | Visual regression (V-043): screenshots vs `tests/visual/baseline` | `npm run check:visual` | agent/local, result pasted in the PR; **not in CI** (cross-OS font rendering, V-043) | by PR checklist |
| 8 | Screenshots 390/768/1024/1440/1920 × light/dark, overflow scan, WebKit + Firefox, keyboard, screen reader, reduced motion, JS off | manual runbook in each PR | agent + owner | by PR checklist |
| 9 | Independent blind review | reviewer without build context | per chunk | by PR checklist |

Browser gates need Chromium: CI runs `npx playwright install --with-deps chromium`; in the agent sandbox set `PLAYWRIGHT_MODULE` and `PLAYWRIGHT_BROWSERS_PATH`.
Dark theme: gates 4 runs light only until `styles/tokens.css` declares `[data-theme="dark"]` (P1b), then both automatically.

Baseline (P0, main): LCP 0.86–1.00 s, CLS 0, 111–155 KB, JS 6 KB (2 KB gz), axe 0.
