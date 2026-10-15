# Batch A independent rendered design review

**PASS for the approved local-preview presentation scope.** Reviewed 12 October 2026 by an independent reviewer who did not author the layout. No material visual or interaction defect requiring a Batch A fix was found. This is a rendered-review gate, not owner acceptance of the rendered result or authorization to deploy.

## Authority and scope

Read project AGENTS.md, D-033, `revisions/en-05/ACCEPTANCE.md`, `approved/acceptance-amendment-2026-10-12-batch-a.json`, the complete accepted EN-05 Why candidate and Process stage map, and the EN-02-v2 Process source. D-033 supersedes the historical pending labels in the candidate packets. Why's two approved paragraphs and Process's C0 presentation are the review scope. Service facts and public wording were not reopened.

Applied the design-review and web-design-guidelines skills as a scoped, report-only review. Reviewed the current CSS guidance in `V:/TOZA hardening biz/design-reassessment/batch-a-modern-web-guidance.txt` and fetched the current [Web Interface Guidelines](https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md). The user-approved scope governs inherited visual choices and locked copy. No source, build, capture-package, dependency, or deployment change was made by this reviewer. Only this report was added to the preview worktree; additional review evidence is outside it.

## Actual rendered evidence

Live local routes: `http://127.0.0.1:8794/en/why-us.html`, `http://127.0.0.1:8794/en/what-happens-during-the-visit.html`, and `http://127.0.0.1:8794/_preview/`. Browser: actual headless Chromium 156.0.8078.4 through the installed Playwright runtime.

Inspected all 12 supplied PNGs under `docs/batch-a-preview/`: Why and Process desktop/mobile openings, full pages, and detail captures. Full-page images were used to inspect overall order and composition; readable detail captures and fresh browser checks supplied the closer inspection. Additional independent evidence is in `V:/TOZA hardening biz/design-reassessment/batch-a-review/`: `checks.json`, `followup-checks.json`, settled opening/anchor/contact PNGs, text-size-emulation captures, print PDFs, and rendered print pages. Early captures/anchor measurements were followed by settled checks to avoid reporting transient scroll positions as defects.

| Check | Result and observed evidence |
|---|---|
| Both pages at 320, 390, 768, 1440 CSS px | PASS. Fresh browser loads returned 200, no page/asset errors, one H1 per page, no main-content elements outside the viewport, and no hidden prose/headings. Normal body prose is 18px. Openings were also recaptured at scroll position zero. |
| Stage structure and visible content | PASS. Exactly three `.process-stage` groups contain steps 1–2, 3–5, 6–8 in order. All three occupy full-width vertical blocks. All prose remains in ordinary scroll flow, without disclosure controls. |
| Assessment identity and boundary | PASS. The existing name, typical duration and VAT-inclusive fee sit directly below its stage heading. The visibly emphasized summary closes step 5; the separate-purchase paragraph remains beneath it. A clear gap and stage rule precede full engagement. No connecting arrow or numbered extra stage implies compulsory continuation. |
| Support, authority, urgency, contact | PASS. Separate sections follow the three stage groups. Support has no step 9; authority and urgent arrival are not numbered commercial stages. Conditions remain visible beside their relevant work. |
| Keyboard stage anchors | PASS. Each of the four page-index links was reached using Tab and activated with Enter from a fresh navigation. Visible 3px focus outlines were present. Correct hashes and section positions approximately 28px below the viewport top were verified after settling. |
| Mobile menu and skip link | PASS. Tab reached the visibly outlined skip link, brand, and native Menu button. Enter opened the menu, Tab reached Situations, and Escape closed it with `aria-expanded=false`. Stage navigation has native links and 40px-high targets. |
| Contact at 390 × 667 | PASS. Hero contact links reach `#contact`. Both Process channels fit after the anchor jump. Why retains its longer approved first-message guidance; ordinary vertical scrolling reveals both 350px-wide, approximately 50px-high channels. Neither page traps or clips the channels. No enquiry was sent. |
| Reflow and enlarged text | PASS within the tested mechanism. 320px is an actual narrow viewport, not native 400% browser zoom. A supplementary 200% text-size emulation doubled each element's computed font size and numeric line height at 390px; prose was 36px. No main-content horizontal overflow or hidden prose/headings was measured. Labels wrapped and contact buttons grew. This is not a claim of native browser/text zoom certification. |
| Print | PASS for order, text availability and legibility. Print media retained all prose/headings with no horizontal overflow. Generated A4 PDFs were rendered and every page inspected: Why 4 pages, Process 5 pages. All stages, eight steps, fee, purchase/approval/credit/support/urgent conditions and contact channels remain present in order. Some paragraphs cross page boundaries; no text loss was seen. Optimal print pagination is not claimed. |
| Gallery | PASS. The local gallery's four detail previews loaded with nonzero natural widths. It links to both working pages and all desktop/mobile opening and full captures. |

## Six reader tasks answered from the rendered Process page

This is the stage map's source-supported evaluator rubric, not a customer comprehension study. Each answer was found in the actual rendered flow. **12/12 heuristic score; no material boundary failure.**

| Task | Answer visible in the preview | Score |
|---|---|---|
| 1. Contact and commitment | Steps 1–2 explain fit, urgency, location and arrangements; the conversation includes no inspection, mapping, diagnosis or technical work and creates no purchase commitment. A written offer precedes explicit acceptance and receipt of payment before scheduling. | 2 |
| 2. Assessment inclusion and price | Assessment entry shows Private Exposure Assessment, typically four hours, ₪3,600 including VAT. Steps 3–5 cover the initial client's main phone plus PC/iPad/second phone and relevant authorized access, inspection/diagnosis, safe approved urgent first aid within scope, agreed completion and a useful summary even without continuation. Typical duration is not presented as a completion cutoff. | 2 |
| 3. Separate agreement | The Assessment closing paragraph states broader hardening is a separate purchase. Step 6 states written scope/price before deciding, separate Inner Circle remaining-group mapping, eligible full-fee credit only when engagement begins within 14 days of initial completion, booking insufficiency, once-per-group credit and separate additions. The support section states optional later services are separately quoted after completed full service. | 2 |
| 4. Approval and control | Steps 4 and 7 retain material-change explanation/approval and approval before expanded scope/price. Step 8 retains participant consent for personal information. The separate authority section retains client credential control, authorized-environment boundaries, adviser authorization, no ongoing credential retention/remote control, and the record's non-certification/non-guarantee limits. | 2 |
| 5. Useful results afterward | Step 5 gives an independently useful summary even without more purchases. Step 8 gives personal teaching and a private dated work record, with individual/network records distinct. Separate support text limits included help to Toza changes for 14 days, starts the group period at completion, and distinguishes separately quoted optional follow-up. | 2 |
| 6. Contact and urgent arrival | Current contact actions and WhatsApp/Signal channels are usable. Step 1 retains the neutral message and first-message restrictions. The urgent section retains availability confirmation before payment, Central Israel arrival after both acceptance and payment receipt, arrival rather than completion, and outside-area terms agreed before acceptance. | 2 |

## Design and guideline findings

`assets/css/process-stages.css:2` — PASS within scope. Stage boundaries, heading/step hierarchy, logical spacing, text wrapping, intrinsic height, mobile spacing and print adjustments support the approved continuous sequence. The CSS uses existing color variables and remains scoped to Process.

`src/en/what-happens-during-the-visit.njk:1` — PASS within scope. Three semantic, labelled stage sections retain subordinate H3 steps and native anchor navigation. Assessment fee/identity, summary, purchase pause and subsequent boundary sections are in the rendered flow.

Why's two changed paragraphs read as part of the existing founder note and direct-delivery explanation. The first-person context, portrait, client gains, control and contact ending remain visually coherent. No new visual treatment is needed for this approved copy change.

The brand, page-specific heading and primary contact action are clear; stage headings can be scanned without relying on tint alone. The Assessment tint distinguishes the paid visit, while common rules and larger stage titles distinguish all three groups. The summary emphasis has a concrete purpose. It does not turn the eight steps into equally weighted cards. Spacing preserves the separate full-engagement decision.

No required fix, source change, or taste-only redesign recommendation is issued. This review does not certify full WCAG compliance, screen-reader behavior, Safari/Firefox, real mobile hardware, performance/Core Web Vitals, customer comprehension or conversion impact. Exact-copy hashes, metadata, protected-source integrity and unchanged-page gates are covered by the implementation review and quality gates, not substituted by this visual review. Owner review of the rendered desktop/mobile result remains the next gate.
