# Toza Copy Workflow

Status: draft operating workflow for controlled editorial work.

## Purpose

Separate strategy, drafting, editing and adversarial review so one agent does not write, rationalize and approve its own copy.

## Authority stack

Before any copy work:
1. Identify later explicit owner approvals.
2. Identify current approved commercial/service facts.
3. Read `docs/editorial/TOZA-EDITORIAL-DOCTRINE.md`.
4. Read the latest strategic copy specification.
5. Read page-specific approved copy/decisions.
6. Read external framework material only after Toza authority is clear.

If sources conflict, create an **Authority Conflict** finding. Do not silently reconcile.

Current ratified facts override the older August specification where they differ:
- Assessment ₪3,600 including VAT;
- one main phone + one PC/iPad/second phone;
- at least two hours in person, typically four, with outcome-based completion preserved;
- Inner Circle Shield approved at its current EN-02-v1 architecture, from ₪42,000 including VAT;
- eligible Assessment credit may apply to Personal Shield, Inner Circle Shield or Bespoke Private Protection under the current conditions.

Do not flag these five as unresolved unless a later owner decision changes them.

## Workflow

### Gate 0 — Corpus and authority lock
Inputs:
- current copy corpus;
- current spec;
- approval markers;
- product/service facts.

Output:
- authority map;
- protected approved sections;
- unresolved conflicts.

Pass only when every conflict is either resolved or explicitly quarantined from editing.

### Gate 1 — Strategy
Run `toza-copy-strategy`.

Output:
- one page objective;
- arrival/departure reader state;
- core argument;
- proof requirements;
- boundary requirements;
- emotional register;
- premium signal;
- section architecture;
- density cuts;
- CTA logic.

No prose drafting before Gate 1.

### Gate 2 — Draft
Run `toza-copywriter`.

Rules:
- preserve protected approved copy unless change is authorized;
- use current approved facts;
- no invented proof;
- no direct-response theatrics;
- no generic luxury language.

### Gate 3 — Ten-sweep edit
Run `toza-editor`.

Order:
1. Clarity
2. Voice/Tone
3. Relevance
4. Proof
5. Specificity
6. Emotional effect
7. Friction/Risk
8. Prestige/Scarcity
9. Compression/Density
10. Human credibility

For multi-page work, add corpus consistency audit.

### Gate 4 — Red team
Run `toza-copy-red-team`.

Red team diagnoses first. It does not automatically rewrite.

Any blocker must be resolved or explicitly accepted before release.

### Gate 5 — Owner review
Present:
- authority conflicts;
- blockers/majors;
- recommended cuts;
- exact revised copy;
- protected copy left unchanged;
- open factual decisions.

Owner approval applies to exact copy/version, not to the instruction to continue drafting.

### Gate 6 — Integration
Only after exact copy approval:
- map approved copy to templates/content files;
- preserve metadata and routes;
- maintain EN/HE future parity requirements;
- run copy consistency checks.

Editorial work does not authorize production merge by itself.

## Corpus-level QA

Before any release:
- price/VAT consistency;
- service names;
- device scope;
- duration language;
- urgent trigger and fees;
- credit condition;
- security-key counts;
- included days;
- support period;
- deliverable names;
- attorney authorization;
- privacy/data-retention wording;
- CTA wording;
- retired categories;
- duplicate persuasive blocks;
- protected approved copy integrity.

## Change classes

### Class A — factual/commercial
Requires authority check. Examples: price, duration, scope, credit, fees, deliverables.

### Class B — claim/risk
Requires proof and boundary review.

### Class C — structural
Section order, cuts, links, hierarchy. Requires page-strategy approval.

### Class D — stylistic
Sentence-level clarity/voice changes. Lowest risk, but still cannot alter meaning.

## Release rule

A page cannot pass with:
- unresolved public-fact contradiction;
- unsupported guarantee/attribution;
- unclear purchase boundary;
- material mismatch with approved service scope;
- unapproved substantive edit to protected approved copy.
