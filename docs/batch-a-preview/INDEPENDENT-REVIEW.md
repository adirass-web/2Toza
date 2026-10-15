# Batch A independent implementation review

12 October 2026. **PASS for local owner preview: no actionable implementation, authority or preservation defect found.** This is not approval to merge or deploy, and does not reopen accepted wording.

Reviewed final handoff on `codex/toza-trust-process-refinement`, HEAD/base `6c525f8d948709e3e8b7ea6f6c75abc9d8e5e56f`. The reviewer did not write the candidate, stage map, loader, adapter, styling, templates or tests. Only this report was written by this reviewer.

## Authority and exact preservation

Applied project AGENTS, locked architecture, current v3, D-033, EN-05 ACCEPTANCE, accepted candidate and complete stage map, and the project Toza Copy Red Team skill. Read the preceding independent editorial review as historical evidence; it was not substituted for this implementation review. Later D-020/D-033 authority governs stale duration and pending-approval labels in historical documents.

Independent checks reproduced:

| Artifact | Result |
|---|---|
| Accepted Why exact payload | `53ee848c5a5247777c51d46ac1c8a20bc6e2430abd375bfe81ede4a019cad575` |
| Accepted Process exact payload | `349d9cfc41e95868b7fad0266af3b2a942acc2311e40904da8d38cd5f59566d7` |
| Complete map, original raw bytes | `14af90ab3d758fa56a58866a1f03ead3cae12142a8e044f5de5870f044ccd79d` |
| Complete map, CRLF-to-LF only | `f3093b5514a9a6d2ed99414781d6b4e14d7a625132aef914d21690cb52923e56` |

Why has 44 exact-source units before and after; only one-based units 15 and 30 change. The other 42 units remain identical. Metadata, headings, portrait/profile, all links, operational facts, client control, qualifications and complete contact wording remain accepted. The two changes are exactly the approved consequence and expert-judgment paragraphs.

Compared the Process template to the base Git blob independently: all 49 heading/paragraph content blocks preserve exact text and order, and all 11 template links preserve their order, labels and destinations. Both target pages' title, description, social description and canonical remain unchanged. The new wrappers do not duplicate, excerpt or move approved prose.

All nine unaffected built English pages match their recorded pre-change SHA-256 values. All nine corresponding source templates match the base commit after CRLF-to-LF normalization. This includes protected Assessment and the current Home/Pricing/four-page amendments. The historical accepted-source hashes also pass the authority verifier.

## Implementation and gate integrity

The changed implementation is limited to the additive Why amendment loader, Process presentation adapter and stylesheet, conditional asset inclusion, the two generated target templates, amendment checks and two focused browser cases. No dependency, workflow, routing, contact destination, shared JavaScript or unrelated page source change is present in the reviewed diff.

The Process adapter locates the three accepted section IDs and checks exactly 2/3/3 steps in ascending 1–8 order. It emphasizes the complete independent summary and retains the complete separate-purchase paragraph at the Assessment close. Support, client authority, urgency and contact remain separate following sections; there is no ninth step or new public stage caption. There are no new disclosure controls or connector arrows implying compulsory continuation.

The new CSS uses the Process page class throughout and loads only when `process_stages` is true. `/assets/css/process-stages.css?v=batch-a-1` supplies a distinct versioned asset under the existing immutable asset-cache policy. Other generated pages remain byte-identical. Print rules preserve normal flow and do not hide prose.

The loader preserves validation of all historical manifests and limits the new effective copy overlay to Why. The complete stage map is checked with CRLF-to-LF normalization only; the raw approval fingerprint remains recorded as provenance. Independently reproducing both hashes confirms that this portability adjustment did not alter the approved map. Process source hash and route/source scope are separately checked.

The amendment verifier reconstructs the entire previous Why payload by reversing precisely the two approved paragraphs, each required exactly once. It also checks unchanged links, numerical facts, headings and anchors; other accepted-source preservation checks remain. The amendment and presentation verifiers remain wired into the existing build verification path. No broad copy/heading exception was added.

Independently executed `accepted-copy.cjs --check`, `verify-copy-amendment.cjs` and `verify-presentation.cjs`: all passed. Independent read-only scripts checked the hashes, exact delta, order, links, metadata and nine unaffected outputs described above. In-memory adversarial tests confirmed generation rejects a missing stage, wrong step number, missing summary opening and missing purchase-boundary opening; no working files were altered for these tests.

## Reader-task and capture review

The reviewer inspected supplied final captures with provenance in `capture-checks.json`: Process desktop opening/full page and mobile Assessment detail/full page; Why desktop full page/detail and mobile opening/detail. These are actual local rendered captures, not design mockups. The desktop Process full page shows the three commercial groups and subordinate steps; the mobile detail shows the Assessment identity, typical duration, VAT-inclusive fee and scope together. Why's revised direct-delivery paragraph remains readable and attached to its heading on desktop and mobile. No clipping, conflicting grouping or new visual promise was observed in the inspected captures.

| Reader task | Preservation and presentation finding |
|---|---|
| Contact and commitment | Stage 1 retains qualification only, no technical work, no commitment, and written offer/acceptance/payment before scheduling. |
| Assessment content and cost | Stage 2 retains the fee/name/typical duration, authorized two-device scope, diagnosis, safe approved first aid and independent summary. |
| What needs another agreement | Complete purchase boundary closes the Assessment before a visual pause; step 6 retains voluntary written scope/price and all credit conditions. |
| Approval and control | Client credential control/material approval, authority, adviser authorization and participant consent remain visible in the unchanged prose. |
| Useful result and later help | Independent summary stays in Assessment; teaching and dated records stay in full work; limited support and separately quoted follow-up stay distinct afterward. |
| Contact and urgency | Existing anchors/channel controls remain; complete urgent arrival trigger, availability and geographical conditions remain in their separate section. |

These six findings combine independently verified built/source preservation with capture inspection. They are not a customer test or a numerical usability/conversion score. The full-height mobile capture is reduced for display and supports overall sequence rather than detailed typography. Independent interaction, keyboard, zoom/reflow and print runtime testing were not repeated by this reviewer; the owning team's focused browser gates cover those checks. The complete build/audit/browser suite is team evidence and should be reported separately from this reviewer's narrower executions.

## Findings and release boundary

Blockers: **0**. Required implementation corrections: **0**. New factual decisions: **0**. No optional copy rewrite is requested.

The implemented grouping preserves qualification, paid Assessment and optional full engagement as separate commercial decisions. It does not add a discovery guarantee, forensic service, monitoring, unlimited support, automatic continuation or a four-hour completion promise.

This report supports review of the local preview. It is not a production-renderer pass, physical-device/Safari or assistive-technology certification, customer validation, or approval of the rendered result on the owner's behalf. No push, PR #54 change, merge or deployment was performed or authorized by this review.
