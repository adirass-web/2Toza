# Toza Batch A — local implementation preview

12 October 2026, Israel. Owner acceptance and local implementation authority: D-033. Branch: `codex/toza-trust-process-refinement`. Baseline: production `6c525f8d948709e3e8b7ea6f6c75abc9d8e5e56f` (#55).

[Desktop/mobile gallery](http://127.0.0.1:8794/_preview/) · [Working Why Toza](http://127.0.0.1:8794/en/why-us.html) · [Working How Toza helps](http://127.0.0.1:8794/en/what-happens-during-the-visit.html)

## Result

Why Toza retains its existing design and integrates the two exact approved paragraphs: concrete personal consequences and the value of contextual judgment before approving material changes. Metadata, headings, three client-gain sections, founder proof/portrait/profile, control, exclusions and contact mechanics retain their accepted wording.

How Toza helps retains every approved word, heading, link, section order and qualification. Its existing three commercial stages now have consistent prominent headings, subordinate step rhythm, the complete Assessment summary emphasized in place, and a visible pause before separately chosen full engagement. The eight existing steps remain in groups 1–2, 3–5 and 6–8. Support, authority, urgent arrival and contact remain separate visible sections. No extra public stage labels or collapsed content are added.

The Process stylesheet is new, versioned and loaded only on that route. Nine other English HTML pages are byte-identical to the baseline. No dependency, workflow, tracking, contact destination or protected-Assessment change.

## Authority and gates

- Additive approval: `projects/toza-en-editorial-revision/approved/acceptance-amendment-2026-10-12-batch-a.json`. Historical approval/source records remain preserved.
- Why exact approved payload: `53ee848c5a5247777c51d46ac1c8a20bc6e2430abd375bfe81ede4a019cad575`.
- Accepted Process wording: `349d9cfc41e95868b7fad0266af3b2a942acc2311e40904da8d38cd5f59566d7`. Complete approved stage-map LF hash: `f3093b5514a9a6d2ed99414781d6b4e14d7a625132aef914d21690cb52923e56`; original raw fingerprint remains provenance. Only CRLF-to-LF normalization is allowed.
- `npm run sync:copy` and `npm run verify:all`: PASS. Accepted/historical fingerprints, reproducible templates, rendered copy/metadata, table associations, protected order, routes, links and CI contracts.
- `npm run test:audit-policy`: 6/6 PASS. `npm run audit:tools`: PASS under the existing residual policy. Two documented upstream advisories remain; no clean-audit claim.
- `npm run test:rtl-visual`: **56/56 PASS**. Prior 52 tests plus four project executions of two focused Process tests. New checks cover exact ordered stage blocks, full visibility, eight-step vertical sequence at 320/390/768/1440, fee/duration association, separate-purchase pause, anchors, 390×667 contact, print and stylesheet scope. A test-only DOM-text versus rendered-whitespace comparison was corrected before the final pass; no copy, boundary or gate was relaxed.
- Independent source/adversarial review: [PASS, no required corrections](INDEPENDENT-REVIEW.md). It reproduced hashes, exact Why delta, ordered Process blocks/links, nine unchanged pages/templates and four failure-mode checks.
- Independent rendered review: [PASS, no material defects](DESIGN-REVIEW.md). Fresh Chromium checks cover both pages at 320/390/768/1440, keyboard stage links/menu, short-phone contact, print/PDF and 200% text-size emulation. The emulation is not native browser zoom. Why's existing contact section requires ordinary scrolling on a short phone; no new copy/layout defect was identified.
- Nine unchanged pages, source/manifests/protected Assessment and PR #54 preservation: [durable integrity evidence](unchanged-pages.json), produced after all assertions pass.
- Twelve current site screenshots: two pages × desktop/mobile × opening/full/detail. [Capture checks](capture-checks.json): no overflow, missing assets or page errors at the capture widths.
- Gallery controls, keyboard selection and screenshot loading: [PASS](gallery-checks.json).

These are local source/rendering/interaction gates, not customer-conversion evidence or a complete accessibility certification. Production is unchanged; no hosted deployment or newly executed edge-runtime gate is claimed for this preview-only instruction.

## Desktop/mobile captures

| Page | Desktop | Mobile |
|---|---|---|
| Why Toza | [Opening](why-desktop.png) · [Full](why-desktop-full.png) · [Changed paragraph](why-desktop-detail.png) | [Opening](why-mobile.png) · [Full](why-mobile-full.png) · [Changed paragraph](why-mobile-detail.png) |
| How Toza helps | [Opening](process-desktop.png) · [Full](process-desktop-full.png) · [Assessment stage](process-desktop-detail.png) | [Opening](process-mobile.png) · [Full](process-mobile-full.png) · [Assessment stage](process-mobile-detail.png) |

## Reproduce

```powershell
npm run sync:copy
npm run test:audit-policy
npm run audit:tools
npm run verify:all
npm run test:rtl-visual
node docs/batch-a-preview/check-unchanged.cjs
node docs/batch-a-preview/capture.cjs
node docs/batch-a-preview/build-gallery.cjs
node docs/batch-a-preview/serve.cjs
```

The session already runs the loopback-only server on 8794 in a hidden process. Do not start a second listener on that port. The normal clean build removes `_site/_preview/`; generate the local gallery afterward. It is excluded from the normal publication build.

EN-05's candidate and earlier owner-review packets are historical preparation records; `revisions/en-05/ACCEPTANCE.md` and D-033 supersede their pending exact-approval labels. The candidate-only `en-05/check-candidates.cjs` describes the pre-integration stage and is not this preview's build gate. Use the current acceptance verifier and `check-unchanged.cjs` for the implemented result.

No push, PR #54 modification, main merge or deployment. The next gate is owner review of this rendered local result.
