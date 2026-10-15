# Batch C — editorial findings before drafting

Date: 13 October 2026. Baseline: local Batch B `b1f88a0`, branch `codex/toza-trust-process-refinement`. Authorization: D-037 and the owner-approved 12 October execution plan, Batch C. This is an editorial/source review, not customer testing, browser QA or publication approval.

## Diagnosis

**No blocker, major public-promise contradiction, changed A/B section destination or unresolved commercial fact was found.** One moderate contact-guidance access gap merits a narrow proposal. A minor summary-wording observation does not require correction. Preserve the accepted FAQ's structure and length, shared library, all A/B and EN-04 copy, and protected PA while the proposed unit is independently reviewed.

The current corpus already explains proactive use without a known intrusion, independently useful paid Assessment, separate full hardening/teaching, authorized access and approved changes. Do not manufacture an alignment rewrite because newer page rhetoric is stronger.

## Exact sources and authority

- Mandatory project `AGENTS.md`, architecture, doctrine, execution instructions and decision register through D-037; consolidated v3 read with the later approvals.
- All four project Toza skills; historical calibration and relevant original FAQ/Process/commercial/PA source and revised-v2 specification as context. Later explicit decisions override historical duration, dispute-only framing, conditional full-service value and former standalone category ownership.
- `scripts/accepted-copy.cjs` `pages()` resolves the eleven current English pages: Why EN-05; Home/Pricing/Separation/They Know EN-04; Business/Inheritance/Attorneys EN-06; FAQ/Process EN-02-v2; effective protected PA. `assertAuthority()` passed.
- Accepted shared `revisions/en-02-v2/05-shared-copy-system.md`, including placement instructions. Actual shared sources: `src/_data/i18n/en.json`, `src/_includes/layouts/vault.njk`, `src/_includes/contact-channels.njk`, `src/_includes/schema-org.njk`, root `llms.txt`, the page/presentation adapters and `assets/js/site.js`.
- Source-derived local output inspected for relevant FAQ disclosure/contact markup. No public source was edited.

All locations below are repository-relative. Line references are to the reviewed working tree, not an earlier snapshot.

## Findings and disposition

### C-01 — Moderate: direct contact entry lacks a route back to first-message guidance

**Sweeps:** friction/risk, clarity, compression. **Surfaces:** FAQ and How Toza helps.

The accepted placement instruction says: “FAQ and How Toza helps already carry first-message guidance earlier on the same page; their contact destination must retain access to that guidance.” (`projects/toza-en-editorial-revision/revisions/en-02-v2/05-shared-copy-system.md:267`)

The FAQ closing says “Send a short, neutral message through WhatsApp or Signal.” and then explains personal reply and the purchase boundary (`.../03-faq.md:230`). Its actual `#contact` section has channel controls but no guidance link (`src/en/faq.njk:160`). The canonical warning is “Do not send passwords, recovery codes, screenshots, legal documents, intimate material or details, or detailed allegations in that first message.” (`.../03-faq.md:84`), inside an earlier FAQ answer rendered as closed `<details id="what-should-i-send-in-the-first-message">` (`src/en/faq.njk:75–77`).

The Process closing likewise says “Send a short, neutral message through WhatsApp or Signal. We will confirm fit and the next step before you decide about the paid visit.” (`.../04-what-happens.md:126`; generated contact at `src/en/what-happens-during-the-visit.njk:68`). It provides no link to Step 1's existing warning (`.../04-what-happens.md:50`; visible source section at `src/en/what-happens-during-the-visit.njk:21–25`).

**Why it matters:** both hero/navigation CTAs target `#contact`. A reader taking that route can reach the channel controls without the earlier warning. FAQ's guidance is additionally behind a disclosure. `assets/js/site.js:41–52` reveals the actual anchor target and its ancestors; `#contact` does not reveal the earlier answer. This is an inference from source and existing interaction code, not an executed browser observation. The guide is present and the links are not broken; the issue is its access at the action point.

**Smallest recommendation:** propose one compact link at each short contact ending to its existing guidance. FAQ can use its existing answer anchor; Process can use its existing first-stage anchor. Retain the complete canonical guidance, the short endings and one contact destination. Do not append the full shared contact module or duplicate the warning catalogue. Any proposed new link label and approved-copy insertion must be shown exactly for owner approval; any implementation awaits that approval. No commercial/factual decision is needed. Independent review should challenge whether the existing same-page access is already sufficient before retaining this finding.

### C-02 — Minor, optional: summary wording foregrounds urgent findings

**Sweeps:** clarity, relevance, stage meaning. FAQ asks “What do I receive if I decide not to continue?” and promises “A clear summary of what we reviewed, what urgent exposure we found, what we changed, what remains and the recommended next steps.” (`.../03-faq.md:104–106`). Process similarly says “what urgent exposure was found” (`.../04-what-happens.md:76`). EN-04 Home and Pricing say broadly “what was reviewed, found and changed” / “what was found” (`.../revisions/en-04/06-home.md:68`; `.../02-pricing.md:55`).

**Assessment:** this is not a service contradiction or an intrusion prerequisite. FAQ also explains inspection/diagnosis, remaining issues and recommended next steps; its proactive invitation is explicit. Protected PA itself retains “what urgent exposure we found” (`.../approved/pa-01-v2-effective.md:44`). Current authority expressly preserves PA's positioning exception. Nonurgent diagnostic work has not been excluded.

**Recommendation:** preserve the accepted wording. A narrowly identified alignment could be proposed if the owner prefers it; it must not become a claimed new deliverable or justification to reopen PA. No factual decision is needed to retain the current sources. Protected PA is **S0/C0, consistency-only**.

## Ten editor sweeps and metadata

The sweeps were applied in sequence with earlier criteria rechecked; this table records conclusions rather than replacement drafts.

| Sweep | Corpus result |
|---|---|
| 1 — Clarity | Stages and purchase boundaries are intelligible. C-01 action-point access; C-02 optional nuance. |
| 2 — Voice/tone | Calm, adult voice; Why's first person and Attorneys' professional register are justified. No uniformity rewrite. |
| 3 — Relevance | Distinct page jobs survive A/B. Proactive clients are expressly invited on Home, Why, Pricing, FAQ and reference text. |
| 4 — Proof | Direct named delivery, authorized inspection, defined scope, testing/records and linked profile support the copy. No new credential or customer-result claim proposed. |
| 5 — Specificity | Prices/VAT, device/person/network scope, keys, migration, support, credit and urgency retain current qualifications. No formal threat-model deliverable inferred. |
| 6 — Emotional effect | Concern can lead to understanding and deliberate choices without attribution, guaranteed discovery or invented misconduct. Situation voices remain differentiated. |
| 7 — Friction/risk | Contact is qualification; acceptance/payment precede paid work. C-01 merits the narrow proposal above. Confidentiality, consent and invisible-contact/change limits remain qualified. |
| 8 — Prestige/scarcity | Senior in-person judgment, client presence/control and explained changes supply premium meaning. No new scarcity, luxury adjective or prerequisite. |
| 9 — Compression/density | Preserve FAQ's approved detailed answers. Repeated operational facts remain necessary for independently reached pages. No justified redundant unit was identified for deletion. |
| 10 — Human credibility | Situation mechanisms and page-specific consequences remain recognizable. Shared service facts do not by themselves constitute redundant persuasion. No required cliché/AI-language rewrite. |
| Separate metadata sweep | Eleven titles/descriptions/social descriptions agree with body scope and stage meaning. Current labels/organisation/offer/LLMS descriptions contain no stale A/B term or unsupported promise. |

## Repetition, shared use and protected consistency

| Repeated material | Decision |
|---|---|
| Qualification, neutral contact, explicit acceptance/payment | Keep sufficient local disclosure on independently reached pages. Keep distinct Why/Attorneys closing voices. |
| Assessment fee, two-device scope, typical duration, approved urgent first aid and independent summary | Necessary local buying information, with canonical product/pricing links. |
| Credentials, material approval, authorized environment, no monitoring/security-software installation | Necessary trust/authority facts; different paragraph forms need not be made identical. |
| Price/credit/urgent detail in FAQ and Pricing | Answer-specific detail versus canonical comparison; no arbitrary shortening. |
| Situation mechanisms | Separation: relationship access; Business: personal/work dependencies; They Know: unexplained information without attribution; Inheritance: family help and own authority. Preserve distinction. |
| Full shared contact/privacy variants, short cards, detailed references | A library of placement alternatives, not cumulative live paragraphs. Long unused reference variants do not inflate the actual page. |

`en.json` supplies the approved navigation, primary CTA, channel labels, footer descriptor and Hebrew legal-language labels. Legacy fallback strings in `vault.njk` are not current reader-facing wording. Old proposed/provisional instructions inside the immutable shared packet are acceptance history overridden by D-024. They do not authorize rewriting or republishing that library. Structured organisation/offer descriptions and `llms.txt` match its accepted reference tier; no change is warranted after A/B.

Protected PA facts, metadata, CTA mappings and product/process links are consistent. Its conditional recommendation and omission of a later explicit no-monitoring paragraph remain permitted protected exceptions, not defects to silently fix. Preserve its word sequence and wording. Retired response, withdrawn Hebrew marketing routes, retained Hebrew legal labels and unpublished Russian status create no new editorial task here.

## Verification and boundary

- `node scripts/accepted-copy.cjs --check` — **PASS**: historical/protected/additive authority fingerprints and generated-template fidelity.
- `node scripts/verify-presentation.cjs` — **PASS**: eleven exact-copy pages, table associations, protected PA order and shared identity.
- Read-only source-derived inventory of all `<a>` local destinations across eleven built English pages, including navigation/footer — **273 checked; zero missing files or fragments**. This proves local target existence, not hosted response codes or rendered interaction.

No accepted payload, protected source, manifest, template, asset, public reference or deployment setting changed. No push, PR #54 change, publication or deployment. Findings precede drafting; a candidate is only appropriate after the integrator settles the narrow brief and independent challenge.
