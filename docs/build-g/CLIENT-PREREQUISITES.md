# Client prerequisites and remaining boundaries

## Cloudflare skills and MCP — not installed

Official source: https://developers.cloudflare.com/agent-setup/prompt.md (previously fetched in this task; a later refresh returned HTTP 403).
Selected scope: skills + MCP; no optional beta `cf` CLI. Keep repository-pinned Wrangler.

Execute on the **writable Codex client**, preserving existing skills and configuration:

```sh
npx -y skills add cloudflare/skills --skill '*' --yes --global
codex mcp add cloudflare --url https://mcp.cloudflare.com/mcp
codex mcp login cloudflare
```

Inspect `codex mcp list --json` first. Update an existing Cloudflare entry rather than creating a duplicate; preserve unrelated entries. The owner completes browser OAuth, then reloads the agent. Verify through read-only account and Pages project queries that `toza-v2` and `toza-site` are accessible. Never enter tokens in chat or store OAuth credentials in Git.

This runtime reports `CODEX_HOME=/run/codex-environment/codex-home`, filesystem read-only and not writable; `codex mcp list --json` returns `[]`. No direct Cloudflare integration or runtime Cloudflare bindings are available. The writable client cannot be executed from this runtime. No setup command above has been executed here. Do not relocate CODEX_HOME or treat existing Actions preview credentials as client OAuth. If the client connection does not reach cloud tasks, keep account administration in the client coordinator.

## Windows inventory — consolidation remains incomplete

Coordination home: **Design, copyedit TOZA**, project ID `59af5bd0-ba3f-4b2f-be3b-75109ef05b52`.
Windows path: `C:\Users\user\OneDrive - Tel-Aviv University\Documents\ChatGPT\Design, copyedit TOZA`.
That filesystem is not mounted in this cloud runtime. Chat summaries establish context, not the current contents of that checkout.

On the Windows coordinator, inspect each repository under the project, recording its root, remotes, branch, HEAD, `git status --short`, `git log --branches --not --remotes --oneline`, and untracked file names. Preserve local-only commits in named branches and copy unique untracked/modified files to a separate backup outside the Git directory before importing. Inspect provenance and compare to the fixed handoff before bringing any work into 2Toza. Do not copy credentials, node_modules or generated output. Do not run concurrent linked worktrees through OneDrive. Do not declare consolidation complete until this inventory and preservation have been reviewed.

## GitHub protections — write blocked

Existing ruleset `25623993` was read and left unchanged: default branch deletion and non-fast-forward protection, linear history, and CodeQL high/error rule. Classic protection GET is HTTP 403. An authorized additive ruleset POST also returned HTTP 403 `Resource not accessible by integration`; repository metadata admin permission does not grant this integration API scope. This is a GitHub integration denial, not an automatic sandbox approval rejection.

[Proposed additive ruleset](proposed-pr-verification-ruleset.json) requires PRs and successful `verify` for `build/g` and `main`, with no bypass. An account with repository rules administration must add it through GitHub settings or the API. Preserve all existing and unknown rules. The proposed zero review-count minimum adds no new approval gate; owner approval per chunk remains the existing process. Read back the active rules before claiming enforcement.

## Protected production environment — release prerequisite

A read-only GitHub environments query returned an empty list during this execution. A protected production environment and production credential binding have therefore not been established here. Before P10, configure a production environment restricted to the release branch with owner approval, enter credentials securely there, and reference that environment from the future serialized production workflow. Do not treat repository-level preview secrets as proof of protected production setup.

## Release boundaries

Preview: `toza-v2`. Future production: existing `toza-site`, exclusively 2Toza code, preserving domains. No production deployment or DNS change is authorized by infrastructure implementation; the owner executes cut-over. Retire the superseded VIP production workflow at cut-over so it cannot overwrite the endpoint. Record its exact repository/workflow and disable it before production deployment. Do not migrate historical analytics: current specification requires no tracking.

WebKit runtime libraries and manual screen-reader checks remain outstanding. Approved visual baselines are unchanged. Preview HTTP 1010 from this machine does not prove deployment failure; deployment success also does not prove browser-level page acceptance.
