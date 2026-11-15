# Approved contact and situation layout integration

Owner approved immutable preview https://6604b9a6.toza-v2.pages.dev/en/ on 4 November 2026 and authorized proceeding with the existing separate preview-branch integration plan.

Scope: shared icon-only WhatsApp/Signal controls across English pages, fixed together at bottom inline-end with 44px targets and visible keyboard focus; three photo-led situation pages, retaining source copy, callback actions and existing photographs. No Hebrew content or route introduced. Pricing prose and values remain unchanged; global controls intentionally update its shared presentation.

Icon sources are the unmodified Simple Icons 16.35.0 WhatsApp and Signal SVGs; attribution/license provenance lives in approved-en-assets/icons/SOURCES.md and LICENSE.md.

Verification before integration: npm run build, npm run check (183 assertions), node scripts/check-content.mjs (100% parity), git diff --check. Browser evidence: 48 final route/width cases, four direction checks and three no-JS keyboard checks passed; Home/three situation-page mobile axe scans had zero violations. The Conditions narrow table correction was retested at all four widths after the first matrix found its overflow. No remaining blocker in independent LUNA mobile visual review. Remote preview pages/CSS/icons matched local SHA256 and noindex.

Integration target is codex/toza-preview-integration only. Main remains 6c4a88be75d2a35cf134df7e7851a1f3492fcb1e; production deployment remains 841bb44a-975c-4ac1-acaa-ddb80e774e67. No workflow modification or production deployment authorized.
