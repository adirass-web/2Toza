# Client prerequisites and remaining boundaries

## Windows client checkpoint — 23 October 2026

The current repository is **adirass-web/2Toza**. The older **Business site** project and VIP repositories are historical references. The client work described here does not change the accepted design, copy, preview destination or owner-run production cut-over.

### Cloudflare skills and OAuth — verified on the Windows client

- Installed all 19 skills currently supplied by `cloudflare/skills` for Codex using `npx -y skills add cloudflare/skills --skill '*' --yes --global --agent codex`. Existing Cloudflare skills and the skills lockfile were backed up before installation. The optional beta `cf` binary was not installed; repository-pinned Wrangler remains the deployment tool.
- Preserved the existing enabled MCP entry **cloudflare-api** at `https://mcp.cloudflare.com/mcp`; no duplicate server entry was added.
- The installed `codex-cli 0.145.0` failed after owner consent with `Authorization server response missing required issuer`. A temporary official `@openai/codex@0.164.0` invocation completed OAuth using the same server name and URL. The installed CLI was not replaced, issuer validation was not disabled, and no credentials were put in this repository.
- The fixed CLI reported OAuth authentication. A scoped Luna verification then completed only `GET /accounts` and `GET /accounts/{account_id}/pages/projects`. Both **toza-v2** and **toza-site** are accessible, with production branch `main` and domains `toza-v2.pages.dev` and `toza-site.pages.dev`, respectively. These reads do not establish custom-domain bindings or authorize deployment.
- Refresh the desktop agent before expecting the newly installed skills or MCP tools in its current tool inventory. This client authentication does not establish Cloudflare access for isolated cloud tasks; keep account administration on the client until separately verified there.

### Windows Git inventory and preservation — completed for the known project checkouts

- The configured **Design, copyedit TOZA** folder is an empty Git repository on unborn `master`: no commits, remotes, tracked files, modifications or untracked files.
- The older Business site project contains three linked VIP checkouts. Their exact paths, branch names and unpublished commit IDs are retained only in the local inventory. None is the active 2Toza checkout.
- The shared historical Git repository has **10 distinct commits** not reachable from its cached remote refs, across four existing named local branches. They were preserved in a verified incremental Git bundle outside the original Git directory. The three worktree reports repeat the same shared refs; this is not 30 distinct commits. The bundle requires six existing prerequisite commits, which remain in the untouched original repository.
- Preserved **34 modified or untracked files** from `VIP-copy-preview`, checking every copy against its source with SHA-256. The other two working trees are clean. Backup files and the detailed inventory remain local to the client task and are not published in this repository.
- These comparisons use cached remote refs; no historical remote was fetched. Original worktrees, branches, files and remotes were left unchanged. No historical copy, prices, analytics or implementation was imported into 2Toza. Historical material still requires provenance/spec review before any future import.

### GitHub PR and verification gates — active

Owner-authorized GitHub CLI access applied additive ruleset **25749095**, named **PR and verification gates — integration and release**. Read-back confirms it is active for `refs/heads/build/g` and `refs/heads/main`, requiring pull requests, resolved review threads, squash merging, and successful `verify` with the branch up to date. The rule has no bypass actors. The approving-review minimum remains zero, as proposed.

Existing active ruleset **25623993** was read before the change and retained: default-branch deletion and non-fast-forward protection, linear history, and CodeQL high/error checks. `build/g` now reports `protected: true`. The earlier integration-only denial below remains historical evidence, not the current settings state.

The last production-environments query returned an empty list; recheck at P10. A protected production environment, production credential binding and owner-run release remain prerequisites. P4 Home WebKit checks passed for candidate `c39767b` in run `40019640686`; this does not close sitewide WebKit or manual screen-reader acceptance. Firefox is owner-deferred for P4 only.

## Original cloud-runtime findings (historical context)

The following records describe the earlier cloud setup. The Windows checkpoint above supersedes their client inventory, installation and repository-settings status; it does not claim to alter the cloud runtime's read-only configuration.

### Cloudflare skills and MCP — original cloud prerequisite

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
