# Footer spacing preview

Local layout QA: **PASS**. Compare the old and new Home footer at <http://127.0.0.1:8800/_preview/>. New gaps are 160px at desktop/tablet widths and 96px on mobile; print spacing and all accepted wording are unchanged.

`REVIEW.md` contains the scoped verdict. `BASELINE.json` preserves the pre-build fingerprints and spacing. `capture-checks.json` and `gallery-checks.json` contain measured checks; `review-gallery.png` shows the actual browser comparison.

To reopen locally, run `node docs/footer-spacing-preview/serve.cjs`. It serves the gallery and current `_site` from loopback port 8800. Do not overwrite the baseline by rerunning `capture.cjs --baseline` after the spacing change.

The original local preview is historical. On 13 October the owner authorized a separate PR and deployment if all review/release gates pass. Preparation is based on published main 7844b84, including maintenance #56 and copy/design #57; PR #54 stays separate. See RELEASE.md for the current gate record.
