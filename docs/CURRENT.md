# Toza current state and source ledger

**Current delivery checkpoint — 24 October 2026:** Owner approved P5 preview `475252e6`; PR #22 was squash-merged to `build/g` at `10ae3ed80912dd01d8b133a893c0790cb9eb4254`. Post-merge run `40030892510` passed Verify, WebKit and deployment, including Home and situation behavior. P6 is active on `codex/p6-how-it-works`, with SOL coordinating scoped LUNA implementation/verification and independent review under the [P6 plan](superpowers/plans/2026-10-24-p6-how-it-works.md). P6 must stop at a tested preview pending its own explicit visual approval. Main and production remain unchanged.

**P5 activation checkpoint (historical):** The owner visually approved P4 preview `209a7fc2`; PR #21 was squash-merged to `build/g` at `18e1941be773b05b4643e417b8637f98e89148e9`. Post-merge run `40025949669` passed Verify and deployment. WebKit failed an immediate focus-visibility sample, then its one targeted retry hit a 15-second local navigation timeout. P5 includes bounded native-focus settling and a 30-second navigation limit; these are verification fixes, with no Home motion behavior change. P4 post-merge WebKit is not recorded as passed. P5 is active on `codex/p5-situations` from that merge, with SOL coordinating scoped LUNA implementation, verification and independent review under the [P5 plan](superpowers/plans/2026-10-24-p5-situation-pages.md). Its preview must receive explicit owner visual approval before merge. Main and production remain unchanged.

Updated 24 October 2026. This page records the active project state and where each claim comes from. It does not amend the approved design or copy.

**P4 pre-merge checkpoint (historical):** [PR #21](https://github.com/adirass-web/2Toza/pull/21) is draft and unmerged on `build/g-p4-home-motion`, based on accepted `build/g` commit `a0021ab`. The owner approved the [revised roadmap](superpowers/plans/2026-10-23-2toza-roadmap-improvements.md), localized scrim, preserved photo overlap and plain channel icons. Sol coordinates scoped Luna experts; present the corrected tested preview for owner visual approval before merge. Prior candidate `c39767b` passed Verify, Home WebKit and preview deployment in run `40019640686`; that does not validate the new corrections until their own candidate checks pass. Firefox is deferred; manual screen-reader acceptance remains outstanding. Earlier dated cloud observations below are historical context.

**Windows client checkpoint:** Cloudflare skills and OAuth are installed/authenticated; read-only queries confirmed `toza-v2` and `toza-site`. Additive PR/`verify` ruleset `25749095` is active for `build/g` and `main`, preserving ruleset `25623993`. The known Windows project checkouts were inventoried; 34 changed/untracked historical files and 10 shared local-only commits were preserved outside the original repositories, with no historical work imported. See [the client checkpoint](build-g/CLIENT-PREREQUISITES.md#windows-client-checkpoint--23-october-2026) for evidence limits and the remaining release requirements. Earlier cloud-runtime observations below remain applicable only to that runtime.

## Active project and delivery state

- **Active project:** `2Toza`, coordinated in the project **Design, copyedit TOZA**. Older VIP work is project history, not an active implementation lane. The replacement site remains separate from the live VIP site until the English release cut-over.
- **Execution mode:** CLOUD FIRST is the owner's chosen execution order. Continue the bounded cloud setup and implementation in the managed cloud environment before attempting any Windows-local inventory or reconciliation.
- **Recorded integration base for this reconciliation:** `build/g` at `4cacdb85fc4ef72126074d567e8628e39c53c53d` (P3, approved illustration and CI artifact workflow integrated). The accepted application baseline is `3dd5abb`; after this documentation PR merges, use `git rev-parse build/g` for the exact current tip. P4–P9 remain separate chunks and merge in that order. Each chunk has one PR into `build/g`; `main` and production stay untouched before the P10 release gate. Hebrew follows the English launch in P11.
- **PR state:** PR #4 (P3) is merged at `6c25fc2`; illustration PR #6 is merged at `3dd5abb`. CI PR [#16](https://github.com/adirass-web/2Toza/pull/16) is merged at `4cacdb8`. The illustration blob was confirmed identical to the approved asset. This state is based on the coordinator's repository/PR check; refresh it before relying on it for a later release.
- **Acceptance still open:** P3 visual baselines have not been approved; WebKit and manual screen-reader validation remain unverified. These gaps do not change the fixed P3 design or block planning the next chunk, but remain part of the applicable review/release evidence.
- **Cloud environment:** Codex home is read-only; `codex mcp list --json` returned no configured servers; Cloudflare setup is incomplete. Do not report a connected Cloudflare environment. The intended split is `toza-v2` for noindex previews and `toza-site` for production; production remains reserved for the owner-run P10 cut-over.
- **Parallel work:** isolated cloud chats do not share a local worktree. Each task must publish a uniquely named branch for the coordinator to fetch. Worktree reservations, exact paths, ports and accepted bases are tracked in [WORKTREES.md](build-g/WORKTREES.md). Client-side setup requirements are tracked in [CLIENT-PREREQUISITES.md](build-g/CLIENT-PREREQUISITES.md).
- **Repository settings:** active ruleset `25623993` still applies to the default branch and enforces no deletion, no non-fast-forward updates, linear history and CodeQL severity checks. The client subsequently applied additive ruleset `25749095`, requiring PRs and successful `verify` checks on both `build/g` and `main`; read-back confirms `build/g` is protected. The earlier integration-only request was denied with GitHub 403; owner-authorized CLI access resolved that prerequisite. [The proposed configuration](build-g/proposed-pr-verification-ruleset.json) remains the source for the additive rule.

## Active tasks and preview

Sol plans/reviews; the two Luna infrastructure tasks are complete. P4 [#7](https://github.com/adirass-web/2Toza/issues/7) is the next implementation task; P5 [#8](https://github.com/adirass-web/2Toza/issues/8) is reserved for disjoint drafting after the shared interface contract. P6–P9 remain reserved; merge in order. Exact ownership and paths are in WORKTREES. Reconciliation PR [#17](https://github.com/adirass-web/2Toza/pull/17) records this work. Reconciliation tasks [#13](https://github.com/adirass-web/2Toza/issues/13) and [#15](https://github.com/adirass-web/2Toza/issues/15) link their integration PR.

CI PR16 verification and artifact deployment passed; [immutable preview](https://df554d55.toza-v2.pages.dev), [movable p-16 alias](https://p-16.toza-v2.pages.dev). Actual checkout `965de3e9`, PR head `6c2f1c5`, base `3dd5abb`, site digest and GitHub artifact digest are retained in [deployment evidence](build-g/evidence/verified-preview-pr16.json). This is deployment evidence; browser-level acceptance has the limits recorded below.

## Source precedence

For the current implementation, use these sources in order:

1. The owner's latest explicit instruction for the active project.
2. The current handoff, [HANDOFF-toza-current.md](build-g/HANDOFF-toza-current.md), for the fixed visual, content, process and release specification. Preserve it unchanged.
3. The accepted `build/g` tree and merged PRs for what is actually implemented; use live GitHub PR/branch state for current status because local checkouts can lag.
4. This ledger and [decisions.md](decisions.md) for dated status and decision history. Earlier chats and VIP records explain history; they do not supersede the current handoff.
5. Earlier project documents, plans and chats where the current handoff explicitly records them as superseded or where newer owner instructions conflict.

The known Windows project Git checkouts have now been inventoried and their unique Git work preserved locally, as detailed in the client checkpoint. This does not claim exhaustive discovery of every local-only chat artifact or approval to import historical material. Cloudflare account/Pages access was verified on the Windows client; it remains unverified from the earlier read-only cloud setup context.

## Known source classification

[Source records and identifiers](build-g/SOURCES.md) retain provenance and the limits of discovery. Status applies to specific material, not every instruction ever issued in a chat.

| Source/material | Status | Treatment |
|---|---|---|
| Approved current handoff and latest owner instructions | **current** | Fixed specification; no design/copy discovery reopened. |
| P3 PR #4, illustration PR #5 forward-ported through #6 | **incorporated** | Accepted implementation and byte-identical asset; usage unchanged. |
| “Restructure Toza website for leads” — VIP commercial baseline | **superseded** | Preserve history; do not import earlier prices or terms. |
| “Continue Toza editorial revision” — analytics implementation | **superseded** | Current no-tracking requirement controls. Search Console completion is **unresolved**. |
| “Toza website rebrand/content reconciliation” — complete English review | **draft** | Preserve unapproved copy; local-only artifact inventory is **unresolved**. |
| “Continue Cloudflare Cleanup” — VIP pricing/design instructions | **superseded** | Historical operational context only; client connection remains **unresolved**. |
| “Toza — artisan brand visuals” — earlier logo options | **superseded** | Current approved outlined wordmark controls; unique Windows assets remain **unresolved**. |
| Fixed handoff section 2 decisions | **incorporated** | Ported into V-052–V-072 without changing the source. |
| Known Windows project uncommitted files/local-only commits | **incorporated** (inventory only) | Inventoried and preserved locally; historical material is not approved for import. Other local-only chat artifacts remain unresolved. |

## Verified results

P3 exact-head PR verification and preview deployment passed. Existing evidence in [P3-IMPLEMENTATION.md](build-g/P3-IMPLEMENTATION.md) records accessibility, performance and responsive/browser results with their limitations. A fresh detached checkout at `3dd5abb` passed build, facts, noindex, tokens, contrast, lint, 198 internal links, 100% content parity across 11 content pages, and the content-validation regression test. Simultaneous worktree servers and distinct mutable outputs passed the [isolation check](build-g/evidence/worktree-isolation.json). These checks do not close the outstanding visual, WebKit, screen-reader or external-client prerequisites.

## Fixed sequence and boundaries

P4 Home motion → P5 four situation pages → P6 How it works → P7 Pricing → P8 Attorneys and About → P9 FAQ and Conditions → P10 English release readiness and owner-run production cut-over → P11 Hebrew/RTL just after English launch. The current owner authorization governs execution of the approved P4 motion plan; no fresh approval interview is needed. Do not merge these chunks out of order, merge `build/g` to `main` early, deploy to `toza-site`, or treat VIP as the active lane. See [GATES.md](build-g/GATES.md) for existing checks and review gates; this ledger introduces no additional approval gate.
