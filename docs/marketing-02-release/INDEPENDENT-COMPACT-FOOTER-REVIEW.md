# Independent compact-footer review

**PASS — ready for a fresh exact-head PR preview.** No required copy, preservation, visual-overflow or height issue. This review does not authorize merge or production publication.

The final desktop footer plus preceding gap measures **146.4px versus 573.5px before**, or **25.5%** of prior occupied height at 1440px. The footer itself is 130.4px and preceding gap is 16px. This meets the owner’s approximate-quarter instruction; the original 33% draft was superseded by the reviewed final spacing.

At 390px and 320px, occupied height is 332.4px and 352.0px. Mobile navigation wraps naturally with no page overflow; all footer links retain at least 44px height. Short link labels can have widths below 44px, with horizontal spacing maintained; no 44-by-44 claim is made for this version. Main content, footer words and destinations remain exact.

Twelve independent Chromium cases cover Home, Why Toza, Pricing and protected Assessment at 1440, 390 and 320px. All passed overflow, mobile target-height and before/after main/text/link comparison. Before values were measured on the same built pages by disabling only the added footer stylesheet, after fonts/images were ready. Final desktop and 320px crops were visually inspected. Quiet typography, visible legal destinations and reading order remain legible.

All eleven built HTML files independently reconstruct their prior exact-head build hashes after removal of only one exact new stylesheet link. The three frozen copy sources remain protected by the passing marketing gate; the eight supporting pages retain whole-file baseline equality after the same narrowly permitted link. The existing 75-file preservation gate passes. The final built CSS is byte-identical to its source. No original stylesheet, page copy, footer words or destinations changed.

A stale initial built CSS was detected and superseded; final results below use the rebuilt exact final source. Previously reported 56-browser checks on the stale first CSS are not validation of this final spacing. Fresh exact-head CI/browser/hosted checks remain required. No enquiry or sales improvement is claimed.

| Reviewed file | SHA-256 |
| --- | --- |
| `assets/css/footer-compact.css` | `229fe9b02973928954a141eecb0ddbd0b2c57b35ada566c6972e1f86d4f4b4f0` |
| `src/_includes/layouts/vault.njk` | `2b62c59927593999dd62b64c29e08421433ad8c75ece05a8f711229823c5f41a` |
| `scripts/verify-marketing-02.cjs` | `d8d9a193b719a03da826b055bc45dd6b14f1093215094d7bd8b858d8d276c726` |
| `projects/toza-en-editorial-revision/state/EN-REVISION-DECISION-DELTA.md` | `3b47cad22802b4bb08fb71c7a8757b57959fa9e7be321a1023dbb4bef962ef6c` |
| `docs/marketing-02-release/RELEASE.md` | `26d98530acacb25e6c02abf128154223c10e16cfb12d4a23bc1bd3c891f97667` |

Evidence: [focused results](INDEPENDENT-COMPACT-FOOTER-RESULTS.json), [desktop crop](COMPACT-FOOTER-DESKTOP.png), [mobile crop](COMPACT-FOOTER-MOBILE.png). Independent whole-file reconstruction evidence is saved separately at `/workspace/toza-release-evidence/PR59-INDEPENDENT-FOOTER-PRESERVATION.json`.
