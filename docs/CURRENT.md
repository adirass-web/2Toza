# Toza current state and source ledger

Updated 23 October 2026. This page records the active project state and where each claim comes from. It does not amend the approved design or copy.

## Active project and delivery state

- **Active project:** `2Toza`, coordinated in the project **Design, copyedit TOZA**. Older VIP work is project history, not an active implementation lane. The replacement site remains separate from the live VIP site until the English release cut-over.
- **Execution mode:** CLOUD FIRST is the owner's chosen execution order. Continue the bounded cloud setup and implementation in the managed cloud environment before attempting any Windows-local inventory or reconciliation.
- **Accepted integration base:** `build/g` at `3dd5abb` (P3 and the approved illustration asset are integrated). P4–P9 remain separate chunks and merge in that order. Each chunk has one PR into `build/g`; `main` and production stay untouched before the P10 release gate. Hebrew follows the English launch in P11.
- **PR state:** PR #4 (P3) is merged at `6c25fc2`; illustration PR #6 is merged at `3dd5abb`. The illustration blob was confirmed identical to the approved asset. This state is based on the coordinator's repository/PR check; refresh it before relying on it for a later release.
- **Acceptance still open:** P3 visual baselines have not been approved; WebKit and manual screen-reader validation remain unverified. These gaps do not change the fixed P3 design or block planning the next chunk, but remain part of the applicable review/release evidence.
- **Cloud environment:** Codex home is read-only; MCP resources were empty; Cloudflare setup is incomplete. Do not report a connected Cloudflare environment. The intended split is `toza-v2` for noindex previews and `toza-site` for production; production remains reserved for the owner-run P10 cut-over.
- **Parallel work:** isolated cloud chats do not share a local worktree. Each task must publish a uniquely named branch for the coordinator to fetch. Worktree reservations, exact paths, ports and accepted bases are tracked in [WORKTREES.md](build-g/WORKTREES.md). Client-side setup requirements are tracked in [CLIENT-PREREQUISITES.md](build-g/CLIENT-PREREQUISITES.md).
- **Repository settings:** the active ruleset `25623993` applies to the default branch and enforces no deletion, no non-fast-forward updates, linear history and CodeQL severity checks. An additive PR/Verify ruleset request for `build/g` was denied with GitHub 403 (`Resource not accessible by integration`); this was an integration permission limitation, not an automatic review rejection. The original ruleset was not changed. The proposed additive configuration is recorded in [proposed-pr-verification-ruleset.json](build-g/proposed-pr-verification-ruleset.json) for an owner with settings access to apply or revise.

## Source precedence

For the current implementation, use these sources in order:

1. The owner's latest explicit instruction for the active project.
2. The current handoff, [HANDOFF-toza-current.md](build-g/HANDOFF-toza-current.md), for the fixed visual, content, process and release specification. Preserve it unchanged.
3. The accepted `build/g` tree and merged PRs for what is actually implemented; use live GitHub PR/branch state for current status because local checkouts can lag.
4. This ledger and [decisions.md](decisions.md) for dated status and decision history. Earlier chats and VIP records explain history; they do not supersede the current handoff.
5. Earlier project documents, plans and chats where the current handoff explicitly records them as superseded or where newer owner instructions conflict.

The Windows machine's uncommitted files and any additional local-only chat artifacts have not been inventoried. Their availability and reconciliation remain pending; this ledger does not claim that all chats or local files have been reconciled. Cloudflare's actual account/project configuration also remains unverified from the read-only setup context.

## Known chat and project source classification

This classification is based on the known project/chat names and the current handoff; it does not infer unseen chat contents.

| Source | Classification | Current use |
|---|---|---|
| **Design, copyedit TOZA** | Current coordination project | Active execution home for the approved replacement. |
| **Restructure Toza website for leads** | Historical/reference | Earlier lead-generation and site-structure context; use only where consistent with the current handoff. |
| **Continue Toza editorial revision** | Historical/reference | Earlier copy-editing lineage; approved current copy remains in repository content and the fixed handoff. |
| **Toza website rebrand/content reconciliation** | Historical/reference | Prior rebrand and content reconciliation context; the current handoff controls implementation decisions. |
| **Continue Cloudflare Cleanup** | Operations reference | Cloudflare troubleshooting/setup history; actual account and project configuration remains unverified and setup incomplete. |
| **Toza — artisan brand visuals** | Visual reference | Earlier brand-visual reference; it does not supersede the fixed specification. |

These labels identify source roles, not verified completeness. The Windows machine's uncommitted files and local-only chat artifacts remain pending inventory.

## Fixed sequence and boundaries

P4 Home motion → P5 four situation pages → P6 How it works → P7 Pricing → P8 Attorneys and About → P9 FAQ and Conditions → P10 English release readiness and owner-run production cut-over → P11 Hebrew/RTL just after English launch. The current owner authorization governs execution of the approved P4 motion plan; no fresh approval interview is needed. Do not merge these chunks out of order, merge `build/g` to `main` early, deploy to `toza-site`, or treat VIP as the active lane. See [GATES.md](build-g/GATES.md) for existing checks and review gates; this ledger introduces no additional approval gate.
