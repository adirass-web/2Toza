# Separate preview branch integration

Owner selected merge to a separate preview integration branch only. Main and its deployment workflow must not change. The feature is based on verified main6c4a88be75d2a35cf134df7e7851a1f3492fcb1e. The destination is codex/toza-preview-integration, initially from that same main commit; the feature branch is codex/approved-en-integration.

The existing deploy-preview workflow runs on main/design pushes or pull requests and would deploy main to Cloudflare project production. This task therefore opens no PR and pushes only codex branches, which run Verify CI. After successful remote verification, the separate merged branch is deployed directly to a distinct Cloudflare Pages Preview branch. No main merge, production publish or workflow change is authorized.

Existing local build,117focused checks, legacy content parity, responsive/browser/accessibility checks and independent source/visual reviews have passed. Remote Linux Verify CI, exact branch SHAs, final preview and production identity are recorded in the parent chat's checkpoint after completion.
