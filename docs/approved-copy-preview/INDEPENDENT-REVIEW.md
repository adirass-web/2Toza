# Independent implementation review — approved Home / Pricing copy preview

10 October 2026. **PASS for owner preview review. No actionable source, authority or rendered-content defect remains in the reviewed build.** This is not merge/deployment authorization or evidence of conversion performance.

Scope: isolated `codex/toza-approved-copy-preview` checkout, based on `c5e7e243764605463cd0b6e05fa33b115240729d`. Applied current Toza Editor/Copy Red Team authority, the reviewed EN-03 approval and the owner's instruction to build the selected main copies. No stylistic rewrite of approved wording was proposed.

## Independent evidence

- Compared both EN-03 exact blocks to the main exact-copy blocks in the owner-approved external Home and Pricing packets. They match under the declared CRLF-to-LF normalization. Unselected alternatives are separately recorded and do not enter either rendered page.
- Executed `assertAuthority`, `sync(true)`, the presentation verifier and the amendment verifier against the final build. All passed.
- Confirmed the historical acceptance manifest and protected Assessment retain their accepted content. The amendment adds only Home/index and Pricing; scope validation rejects additional or duplicate effective route entries.
- Independently compared all nine unaffected generated templates and all nine unaffected built HTML files against the prior `VIP-narrative` checkout: byte-identical. Windows working templates use CRLF while raw Git blobs use LF; normalized equality to Git also holds. No content defect is implied by that newline difference.
- Independently checked final Home/Pricing metadata and every source link against built HTML, exact rendered block preservation, table associations, protected Assessment order and the final Home heading sequence.
- Inspected desktop/mobile opening captures, the mobile full-outcome capture and full-page captures for both pages. This was independent visual inspection of the supplied final captures, not a separate interactive browser session. Full-page images were used for overall sequence/relationships; detailed type inspection relied on the opening/outcome captures.
- Reviewed the final adapter, CSS additions, versioned stylesheet change, verification wiring and regression-test diff. JavaScript behavior is unchanged by this round.

The implementation team separately reports `verify:all` and **50/50 browser tests** passing at the final build. This reviewer independently ran the narrower source/render checks above; the complete browser suite is team evidence, not represented as an independently repeated run.

## Final chronology and meaning

Home now reads:

1. Explicit personal stake and direct expert help in the hero, with proactive eligibility intact.
2. Existing page shortcuts.
3. Complete full-service outcome, including all three paragraphs.
4. Detailed everyday-access and independent-copy explanation, including the non-accusation qualification.
5. Personal threat-modelling method and direct delivery.
6. Paid Assessment, fee, device scope, qualified urgent first aid and independently useful summary.
7. Situations, privacy/control and one contact ending.

Moving the complete outcome before the detailed mechanism explanation is coherent: the hero already establishes the danger, and the next section answers what can improve. It does not imply that the first fee buys full hardening. The outcome's paragraph beginning “Each full engagement follows the Assessment” remains open and attached, including separately agreed scope, price and purchase, no monitoring and no security-software installation.

The team corrected the initial layout's delayed outcome by moving this whole section; the original two-mobile-screen outcome/qualification gate now passes without shrinking or rewriting approved copy. The mobile outcome capture visibly preserves the complete qualification.

Pricing preserves its early Assessment identity/fee, both approved opening paragraphs, open Assessment benefits, distinct full-service introduction and unchanged commercial tables. The complete credit conditions remain adjacent to the main comparison; additional comparison rows and service details stay available through the established disclosures. No unqualified discounted price or automatic continuation was introduced.

## Authority and claim challenges

| Challenge | Finding |
| --- | --- |
| Newly approved main wording | Exact match; no alternative silently selected. |
| Current account access versus old copies | The approved independent-copy example is preserved. No deletion/recall promise or expanded device/archive inclusion is created by rendering. |
| Threat modelling | Preserved as a method, not promoted to a separate report or certification. |
| Business access | The personal-device/identity intersection, authority and agreed-scope qualification remain intact. |
| Assessment versus full work | Separate purchases and qualified urgent first aid are preserved; the summary remains available without further purchase. |
| Risk versus unsupported accusation | The hero states possibility. The detailed section explicitly says remaining arrangements do not establish misuse. |
| Guarantees and evidence | No claim of complete immunity, universal discovery, investigation, legal result, invented customer proof or exclusive capability was introduced. |
| Control and confidentiality | Existing qualified terms and contact warnings retained; neither channel is presented as invisible. |
| Protected/other pages | No change to the other nine English HTML outputs, including protected Assessment. |

## Selector and gate robustness

The revised Home and Pricing lookup uses explicit approved section IDs for the newly named outcome, risk, method and full-service sections. Missing required sections fail the build rather than silently selecting an unrelated positional section. Pricing also asserts that both approved opening paragraphs are retained. Remaining table/heading selectors operate on exact approved text, with exact-block and row-association checks protecting the result.

The previous Home-only heading-demotion exception was removed because that redundant Assessment subsection no longer exists. The sole retained exception is Pricing's nested credit heading; the verifier does not broadly relax heading or copy checks.

The stylesheet version changes only where `narrative_layout` is set. The nine unaffected built pages remain byte-identical. Skipping unchanged writes in `sync` preserves their existing working-file bytes without weakening drift detection.

## Resolved review observation

The amendment verifier initially existed only as a standalone script. It is now required by `verify-hebrew-build.mjs`, which is part of `verify:all`. Its commercial-table, unchanged operational-section and unaffected-source checks are therefore part of the normal gate. Resolved; no outstanding action.

## Limits and release boundary

No fresh customer test, conversion experiment, physical-phone/Safari session, assistive-technology session or full accessibility certification was performed by this reviewer. Longer approved text remains a real reading-effort tradeoff; this implementation review found no reason to reopen the accepted wording.

This report covers the local owner preview only. It does not clear inherited dependency advisories or authorize changes to PR #54, a new PR, merge, production or hosted deployment.

Only this review file was written by the independent reviewer. All implementation changes and fixes were made by the owning agents.
