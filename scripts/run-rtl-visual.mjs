import { spawnSync } from "node:child_process";
import path from "node:path";

const playwrightCli = path.join("node_modules", "@playwright", "test", "cli.js");
const result = spawnSync(process.execPath, [playwrightCli, "test"], { cwd: process.cwd(), stdio: "inherit" });

if (result.error) {
  console.error(result.error.message);
  process.exit(1);
}
if (result.status !== 0) {
  process.exit(result.status || 1);
}

console.log("RTL VISUAL VERIFIED");
