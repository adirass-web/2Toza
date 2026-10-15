// Read-only watch on the approved site's service facts. Never writes upstream.
import { readText } from "./util.mjs";

const URL = "https://raw.githubusercontent.com/adirass-web/VIP/main/llms.txt";
const res = await fetch(URL);
if (!res.ok) { console.error(`WARN: could not fetch upstream (${res.status})`); process.exit(0); }
const norm = (s) => s.replace(/\r\n/g, "\n").trim();
const now = norm(await res.text()), then = norm(readText("reference/llms.baseline.txt"));
if (now === then) { console.log("upstream facts unchanged"); process.exit(0); }
const a = then.split("\n"), b = now.split("\n");
console.error("UPSTREAM FACTS CHANGED. Review with the owner before updating facts.json and reference/llms.baseline.txt.");
for (let i = 0; i < Math.max(a.length, b.length); i++) {
  if (a[i] !== b[i]) { console.error(`- ${a[i] ?? ""}`); console.error(`+ ${b[i] ?? ""}`); }
}
process.exit(1);
