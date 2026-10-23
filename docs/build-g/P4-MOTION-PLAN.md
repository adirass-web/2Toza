# P4 Home motion execution contract

Coordinator: Sol. Implementation and scoped verification: Luna. Base: `a0021abada45f21c67d49b8d4f777ee3b8443425`; target: `build/g`; issue: #7. This implements the already-authorized V-067–V-072 effects without reopening the design or changing copy, facts, images, tokens or production.

## Effects

- Hero: restrained photo drift linked to its own scroll range; mint underline and decorative frame lines draw once, without hiding or delaying the headline, lead or contact controls.
- Situations: desktop enhancement only, native sticky stage with four distinct photo holds in the existing order and a grid-aligned crop that grows from a quarter-width box through half width to full bleed, ending on the stairwell. Animate the crop/transform, never layout dimensions. Keep all four original links, titles, descriptions and the mint aside readable and keyboard reachable. Decorative scene imagery must not create duplicate accessible content or act as a carousel. No scroll interception, snap, auto-scroll or focus trap.
- Method: a brief once-per-page word reveal that preserves the exact original text and accessible reading order; base content is always complete.
- Tiers: restrained one-time fade-up on entry, preserving static prices and a shared top edge.
- Close: slow decorative ambient dots in the existing grey box only; pause outside the viewport and while the document is hidden.

Use the free `motion` npm engine bundled with esbuild. Prefer Motion's native ScrollTimeline path for linked animations where possible. Keep continuous effects modest; use only transform, opacity and clip-path for animated properties. One-time effects should settle within roughly one second, with no repeated re-entry animation. No added UI controls, content strings, paid packages, tracking, count-up or new image choices.

## Fallback and lifecycle contract

- No JavaScript, missing browser APIs or initialization failure: original static P3 layout, all text, photos, links and contact controls available.
- Reduced motion at load or changed live: stop and clean up every effect; show static Home. Restore a working enhancement if the preference changes back without duplicating elements or observers.
- Below 768px: plain situation stack, no sticky sequence or artificial scroll runway; keep mobile contact bar immediately reachable. Other decorative motion may be restrained or omitted.
- Keyboard focus must always remain visibly rendered. Respect print, resizing, tab visibility and browser history navigation. Keep the header and mobile contact bar outside motion ownership.
- Add stable data hooks for the behavioral verification worker. Keep generated outputs and dependencies specific to this worktree.

## Ownership and evidence

Implementation worker: `scripts/home-motion.*`, `scripts/site.js`, `styles/main.css`, `package.json`, `package-lock.json`, and motion hooks/wrappers in the existing Home templates. No workflow, content, token or visual-baseline edits. Coordinator owns this plan and implementation/status records. Verification worker owns only `scripts/check-home-motion.mjs` and its evidence; it must accommodate the implementation worker's hooks without editing production code.

Acceptance: build and repository checks; content parity/regression; all existing anchors; axe across themes/phone/desktop; performance budgets; responsive screenshots at 390/768/1024/1440/1920 in both themes; focused keyboard, JS-off, reduced-motion/live-toggle, four-hold and lifecycle browser checks. Existing visual baselines are comparison evidence only and must not be regenerated. Firefox, WebKit and manual screen-reader checks remain required by GATES.md; unavailable checks remain outstanding unless the owner explicitly approves an exception. Independent review before integration. One PR into `build/g` produces required CI and an immutable noindex preview. Successful checks and owner visual approval are required before merge; no production cut-over.

## Approved delivery revisions — 23 October 2026

The owner approved all six expert-review recommendations before resuming P4:

1. Reconcile the accepted base and actual ownership; prepare public text from repository facts without local machine paths or raw local logs.
2. Tie final acceptance to the source head, base, built SHA, Verify run, artifact digest and immutable preview. Reuse the existing CI provenance pipeline. Runtime changes require final CI accessibility and performance results, without redundant local reruns after successful candidate checks.
3. Complete Firefox, WebKit and a scoped screen-reader pass. Reporting unavailability does not complete the checklist.
4. Present all four situation holds, including the stairwell endpoint, plus representative hero/method/tier states. Preserve historical P3 visual comparisons separately and do not regenerate baselines.
5. Preflight dependencies, run fast checks first and diagnose CI after five minutes without progress while continuing independent work. Preserve the existing 20-minute Verify timeout; do not repeatedly restart a healthy install or weaken checks.
6. Retain focused reports/screenshots for seven days, including available failure diagnostics, separately from the deployed site artifact.

Actual execution uses one isolated P4 worktree with disjoint writer files, not concurrent writers sharing file ownership. The coordinator alone owns staging, commits and publication. The implementation worker owned production motion files; the verification worker owned `scripts/check-home-motion.mjs`. The coordinator owns generated JS, package test wiring, workflow integration, documentation and the narrowly scoped Windows URL/fixture portability fixes in `scripts/check-content.mjs`, `scripts/check-content.test.mjs` and `scripts/check-links.mjs`. A scoped release worker owns only the evidence-retention workflow edit. No content, token or visual-baseline changes are part of P4.

Execution order: reconcile and preflight → fast checks → final candidate/PR → required CI and immutable preview → remaining browser/manual checks and independent review → owner visual approval → merge. A PR may be opened before hosted evidence exists; merge may not. Additional polish becomes a later task unless needed to satisfy this contract.

Owner update, 23 October 2026: skip Firefox for P4 and diagnose it separately. Firefox is deferred, not passed, and removed from the required P4 browser matrix. Chromium and WebKit verification remain required. This does not waive the outstanding manual screen-reader check or owner visual approval.

Owner visual feedback: photo overlap is explicitly permitted and must remain. The owner approved localized dark scrim/light type for readability within that composition; do not treat overlap as a defect. Remove the extra circles around channel logos and the mint backing around the closing icon group; preserve the original symbols, contact links, accessible names, focus indication and 48-pixel click targets. This supersedes the earlier visible round-button treatment. The revised roadmap is approved; present the corrected tested preview before any merge.
