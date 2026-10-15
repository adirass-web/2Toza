# Lower-footer release preparation — 13 October 2026

Owner authorized a separate PR, unchanged accepted copy, the same independent review/quality gates, and deployment if all pass. Base: published 7844b8406e040605bd8169c7935810ea8a6e7947, with #56 maintenance and #57 copy/design retained. PR #54 remains separate.

Only production changes: shared footer margin-block-start 160px on desktop/tablet, 96px at <=640px, and zero in print; shared CSS URL clear-practice-1 → clear-practice-2 for cache freshness. Existing strict asset bindings adopt that exact version. No footer wording, main-page wording, metadata, service facts, link or content order changes. No workflow allowlist expansion or deployment-gate weakening.

Fresh locked install, six audit-policy tests/live strict audit, full copy/build/link/RTL/CI contracts, four focused regressions, 56 pinned-Chromium tests and all 78 Pages checks passed. The same two upstream advisories remain visible. Fresh footer geometry, exact eleven-page fidelity, keyboard/print checks and independent source/visual review apply before pushing the final head. Preserve BASELINE.json and before captures as historical immutable evidence.

Exact-head GitHub CI and CodeQL must pass before an expected-head merge. The main-only production workflow must succeed for the merge SHA, followed by exact live content/assets/headers/routes and desktop/mobile footer measurements. External evidence: V:/TOZA hardening biz/release-evidence/footer-release. A reviewed revert of this footer PR must retain #56 maintenance and #57 copy/design.
