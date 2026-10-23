# P3 implementation record

23 October 2026. Implements the supplied specification; no new design direction or copy pass.

The original handoff is preserved unchanged in `HANDOFF-toza-current.md`. This chunk carries the static P3 Home implementation onto the P2 integration base, retaining the previous P3 history without a force push. Other page layouts remain for P5–P9.

Implementation corrections: the handoff's exact grey ground/box tokens (#E0E0E0 / #D9D9D9); opaque sticky header; stacked phone situation/close boxes; ink close panel with mint contact controls; actual method-statement content instead of a hidden three-stage declaration; no unused hero actions; the existing `#how` anchor retained. The content model now explicitly validates supported box layouts, while non-photo heroes still require action declarations. Content parity and its mutation regression test run in CI. The visual runner resolves the lockfile-installed Playwright by default.

The chosen skills are installed under `.agents/skills/`, with upstream commits and licences recorded there. No automatic hooks were installed. Impeccable context loading succeeded and its mechanical detector returned no findings for the changed shared shell and Home templates. Its generic design suggestions do not change the approved spec.

## Validation

Node 24.19.0; lockfile Playwright 1.56.1, bundled Chromium 141.0.7390.37. The initial system Chromium check was repeated with the pinned browser once network access became available.

| Check | Outcome |
| --- | --- |
| Build | Passed, 12 HTML pages |
| Facts/noindex/tokens/contrast/lint/links | Passed; 88 amounts, 198 internal links; both themes |
| Content parity | Passed, 11 content pages, 831 sentences, 100% parity both directions |
| Validator regression | Passed: valid photo layout; rejects unknown layout, missing legacy hero actions and non-rendered copy |
| Anchors versus retained main build | Passed: no missing ids |
| axe | Passed: 44 runs, both themes, 390/1440, zero violations |
| Phone performance | Passed on all 11 pages; Home LCP 1.18s, CLS 0, 229KB transferred, 2KB gzip JS |
| Responsive/interaction | Passed in pinned Chromium at 320/390/768/1024/1440/1920, both themes; keyboard menu, theme persistence, no overflow, no console errors |
| Reduced motion / no JavaScript | Static content remains visible; channel controls work; theme toggle hidden without JS; native FAQ keyboard disclosure works |
| RTL smoke | No overflow at 390/1440; actual Hebrew text and scroll logic remain P11 |
| Development server | Home, Pricing, CSS and JavaScript requests passed |
| Firefox 142 | Passed: Home at 390/1440, both themes, mobile menu and theme persistence; required the normal process namespace and a writable cache |
| Visual regression against old main | 35/35 differ due to the changed shell/tokens/Home. Baselines were not updated or approved. This is a recorded comparison, not a passing visual gate. |

The known Conditions literal “30 days” warning is advisory and predates this chunk. Current screenshot examples are in `design/screenshots/p3-current/`; the complete local matrix and logs are under `/workspace/toza-review/` in the prepared environment.

WebKit cannot launch because Linux libraries are missing, and the supported dependency installer cannot acquire root in this cloud image. WebKit compatibility is therefore unverified. Firefox's initial sandbox/cache startup failure was resolved and the bounded follow-up passed. Manual screen-reader validation has not been performed.

No merge into build/g or main, baseline approval, production deployment or DNS cut-over is part of this implementation record. P4 motion remains a separate chunk.
