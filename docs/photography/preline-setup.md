# Preline setup — 15 November 2026

Owner direction: use Preline; retain HyperUI as plan B. This selects the component family, not the earlier proposed photo geometry.

## Configured

Followed https://preline.co/docs/mcp-codex.html and registered the server with:

```sh
codex mcp add preline --url https://mcp.preline.co --bearer-token-env-var PRELINE_MCP_TOKEN
```

The command succeeded in this execution environment. `codex mcp get preline` confirms enabled Streamable HTTP, the correct endpoint and token environment-variable name. A portable, token-free project entry is also saved in `.codex/config.toml`. The CLI here did not discover the project entry alone; the global registration was verified separately. This does not confirm registration on another desktop or machine.

## Connection pending

`PRELINE_MCP_TOKEN` is absent. Set it through the Codex environment's secret settings, or in the environment that launches desktop/CLI. Do not commit or paste the key into source files. Restart/reload the MCP connection after configuration.

The live initialization request was blocked by this environment's outbound proxy (`CONNECT tunnel failed, response 403`), including the retry outside the sandbox. No authenticated tool discovery or Preline MCP invocation succeeded. The server being listed is configuration verification, not connection verification.

The official https://preline.co/docs/mcp.html says MCP access is included with Preline Pro through January 1, 2027, with a subscription required afterward. Free UI blocks do not establish free MCP access. No purchase was made.

## Public-source use and next integration

Inspected Preline's public pricing and feature catalog while MCP connection is pending:

- https://preline.co/blocks/marketing/pricing-cards — free `pricing-card-grid`, plus free pricing alternatives. The default example contains four tiers and a billing switch; Toza needs its existing three protection tiers, fixed prices and native full-inclusion disclosures. Do not copy those sample commercial behaviors.
- https://preline.co/blocks/marketing/feature-sections — free image/icon, feature-step and three-image blocks. Their responsive grids provide candidate section structures. Sample photographs are not approved Toza assets.

Once connected, use `blocks_categories`, `blocks_in_category`, then `single_block` for the chosen free block to retrieve its exact HTML, styles and dependencies. Verify catalog IDs first. Adapt to the existing Eleventy/Nunjucks build and approved tokens; preserve content, contacts and pricing facts. Validate responsive, accessibility, no-JavaScript, print and performance behavior before preview acceptance. HyperUI remains the fallback, not the active implementation choice.
