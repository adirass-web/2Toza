# Focused planning concepts — rendered QA

**PASS, pending owner approval.** Two complete planning-only prototypes show the scoped Home and Business concepts using the full current page HTML. These are reviewable mockups, not approved production changes.

[Before/after gallery](http://127.0.0.1:8797/_concept/) · [Actual gallery overview](concept-gallery-overview.png) · [Exact browser evidence](concept-checks.json)

| Concept | Desktop current / concept | Mobile current / concept |
|---|---|---|
| Business | [Current](concept-business-desktop-current.png) · [Concept](concept-business-desktop-concept.png) | [Current](concept-business-mobile-current.png) · [Concept](concept-business-mobile-concept.png) |
| Home | [Current](concept-home-desktop-current.png) · [Concept](concept-home-desktop-concept.png) | [Current](concept-home-mobile-current.png) · [Concept](concept-home-mobile-concept.png) |

Business keeps its H2 outside both groups. The pale Assessment panel contains its existing label, fee, complete scope and summary. The complete Personal Shield paragraph follows on paper after a 30px gap and thin rule, with its separate-scope/price qualification attached. The final two-link paragraph remains afterward. The final mobile version keeps **288px reading width at 320px and 350px at 390px**, exactly matching the original. Desktop styling was preserved when fixing the first draft's mobile inset.

Home groups only the two complete supporting linked paragraphs as secondary rows. Both have **16px vertical padding and a 1px separator** at every tested width. The original primary two H3/paragraph groups, bronze rules, typography and geometry match the current page exactly at all four widths. All prose, dashes, links, headings, order and the proactive introduction remain exact.

Actual Chromium checks passed:

- Full main non-whitespace characters, ordered heading/paragraph/list blocks, all link labels/targets/relations, and title/description/social/canonical metadata equal the original. Only prototype noindex metadata and the scoped concept stylesheet are added.
- Both concepts at 320/390/768/1440: no horizontal overflow, missing images, page/console/request/HTTP errors, hidden groups or changed 18px body text. Reduced motion remains active with ordinary document scrolling.
- Desktop and 390×667 keyboard: visible skip link, main focus, hero CTA/contact, visible messaging-action focus, section anchors, working internal links and browser Back to the prototype. No message was sent.
- Static concepts remain visible without JavaScript; native contact anchors work. Existing shared scripts are retained unchanged. This does not claim that the pre-existing mobile menu works without JavaScript.
- Print media and the existing before-print hook retain the complete target information. Actual print-target captures were saved. No physical-printing or PDF-pagination claim.
- The gallery loads all eight comparison images and the overview is an actual browser screenshot.

All eight comparison screenshots, the refined Business mobile result and corrected Home rows were personally inspected with `view_image`; the actual gallery overview was also viewed. The initial Home selector did not apply because the body class order differed from the helper's assumption. Scoping through the existing prototype `data-concept` attribute fixed it; computed padding/border assertions now prove the intended effect. Independent art-direction and UX reviewers inspected the revised actual pixels and recorded final PASS in their respective review files.

**283 built/accepted/template/runtime/asset/config files retain exact byte identity before and after.** No production page, accepted copy, shared stylesheet/script, dependency, build output or deployment file changed. No rebuild, source sync, commits, push, PR #54 change, merge or deployment by this worker. Prototype-only trailing horizontal whitespace inherited from the original HTML is trimmed; the complete DOM fidelity checks remain strict.

Current web-guidance search/list/retrieval ran before HTML/CSS work. The concepts use ordinary flow, logical spacing and scoped static CSS; no new project dependency, font, imagery, visible wording or ARIA label was introduced. Prototype pages contain noindex and the loopback server sends noindex for the concept surface.

Limits: Chromium/local rendering only; no Safari, physical device, assistive technology, customer comprehension or conversion evidence, native zoom or complete accessibility certification. Owner approval of these pixels is required before any production implementation.

Reproduce:

```powershell
node docs/visual-refinement-review/capture-concepts.cjs --prepare
node docs/visual-refinement-review/serve-concepts.cjs
node docs/visual-refinement-review/capture-concepts.cjs
node docs/visual-refinement-review/capture-concepts.cjs --primary-only
```

The hidden loopback-only server on port 8797 is already running (PID 42164); do not start a duplicate. It maps only `/_concept/` to these planning documents and falls back to the unchanged `_site` for assets and working links.
