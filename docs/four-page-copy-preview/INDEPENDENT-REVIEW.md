# Independent implementation review — four-page approved copy

Date: 2026-10-11. Reviewer: independent adversarial/editorial implementation reviewer. Scope: local `codex/toza-approved-copy-preview`, against baseline `09a534e`; no repository code changes made by this reviewer.

## Verdict

**PASS — ready for owner review of the local preview.** No actionable source, authority, copy-preservation, or rendered association defect found in the final implementation inspected. This is an implementation and heuristic comprehension review, not customer validation or proof of conversion. It does not authorize a merge or deployment.

## Authority and exact approval

Reviewed the project instructions, locked harness and doctrine, current v3, relevant decisions through D030, the four Toza skills, the accepted round-02 editorial review and final candidates, and the new approval mechanism. D030 authorizes these four pages locally while retaining the service facts and leaving PR #54 and deployment alone.

Independently compared the new EN-04 exact-copy blocks with the final external round-02 candidate blocks. They match. The difference between the editorial review hashes and the implementation hashes is the documented single trailing LF normalization, not a wording change. The effective implementation hashes are:

| Page | SHA-256, normalized with one final LF |
| --- | --- |
| Home | `e4d76c2969e29c597d7435ea866149b82ed928fcd4f8de4195fdc21125a3d3d6` |
| Pricing | `898f0a609a157b5c7c1c86085c83f710fcfb3af54d053be619350a93a4099e54` |
| Separation/divorce | `ca84b2a3f025ffd08366018479d9b9fc8633403cea09f9a8d47e04fdb63355f1` |
| They know something | `58208a1dbfb604dc55bf141e2daa50dc546e7dae7f765788a77b42e15e97d01f` |

The original acceptance manifest, first amendment, EN-02, EN-03, protected effective PA, and locked harness remain preserved. The new manifest is additive. The source adapter validates the original acceptance and both amendment records before applying the latest four-route overlay; historical validation is not replaced by the latest approval. Duplicate, missing, or extra amendment routes do not silently expand its scope.

## Independent source and rendered checks

Inspected the adapter changes in `accepted-copy.cjs`, `clear-practice.cjs`, `home-pricing-narrative.cjs`, the amendment verifier, and the corresponding browser test changes. Section lookup now uses required semantic identifiers where the approved new headings changed; missing sections fail rather than silently selecting a positional neighbour.

Independently ran these final checks successfully:

- `node scripts/accepted-copy.cjs --check`
- `node scripts/verify-copy-amendment.cjs`
- `node scripts/verify-presentation.cjs`

Additional independent read-only DOM checks verified all four title, description and Open Graph descriptions against the effective source; every accepted source link label and destination in built main content; the relevant section ordering and visible qualifications; and SHA-256 equality for the seven unchanged built English pages against the recorded pre-change baseline.

| Page | Material association and scope checks |
| --- | --- |
| Home | Full outcome remains before the detailed risk section, with its separate-purchase qualification outside a closed disclosure. The approved proactive invitation, no-misuse qualification and personal threat-modelling explanation remain intact. |
| Pricing | Assessment and separately agreed broader work remain distinct. Exactly one complete participant-privacy paragraph immediately follows the main comparison and precedes the complete credit block, so the group-engagement antecedent remains clear. All four approved tables and source links are preserved. |
| Separation/divorce | Consequences of changes, notification visibility, approval and the lack of an invisible-change promise remain together and visible. The full engagement remains separately purchased. The after-visit navigation points to the intended semantic section. |
| They know something | Assessment retains its initial-visit details link and urgent-arrival qualification. The next full-engagement section is explicitly headed “Hardening beyond the first visit”; Personal Shield is not presented as included in the Assessment. Separate scope, price and purchase, “original concern”, evidentiary limits and retained-copy boundaries remain intact. |

No implementation introduces a deletion or recall promise for old copies, expanded device scope, a formal threat-model report, monitoring/software installation, guaranteed detection, invisible contact or legal outcomes. Prices, timing, device counts, credit terms and approval controls remain those of the approved authority.

## Visual inspection and limits

Independently inspected final desktop and mobile capture samples, including the two situation-page heroes and the detailed mobile captures for all four pages. The concrete pain is followed by an available action; the pages do not require a visitor to establish wrongdoing before contacting Toza. The narrow-screen Pricing capture keeps the participant-privacy paragraph before the credit panel. The situation captures show the visibility qualification and separate hardening stage legibly, without treating a new heading as permission to drop its qualifications. No clipping or overlapping content was apparent in the inspected samples.

The parent and implementation worker report full `verify:all` success, **52/52 browser checks**, eight viewport/full-page capture pairs plus four detail captures, and no capture-time overflow, asset failures or page errors. These are team-provided execution results; this reviewer did not independently rerun the complete browser suite or perform an interactive browser session. Independent checks above supplement that evidence rather than merely restating it.

No required fixes remain from this review. No candidate wording was reopened. The seven unchanged pages and the protected historical acceptance chain remain outside the amendment's editorial scope. PR #54 and production are outside this local review and have not been modified by this reviewer.
