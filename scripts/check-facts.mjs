// 1) facts.json prices must appear in the approved baseline llms.txt.
// 2) Every ₪ amount in built pages must be a price listed in facts.json.
import { readJson, readText, walk, fail } from "./util.mjs";

const facts = readJson("src/_data/facts.json");
const baseline = readText("reference/llms.baseline.txt");
const fmt = (n) => "₪" + n.toLocaleString("en-US");

// Derived amounts are not stated verbatim in llms.txt.
const derived = new Set(["personalShieldRemainingAfterCredit", "innerCircleRemainingAfterCreditFrom"]);
for (const [key, value] of Object.entries(facts.prices)) {
  if (derived.has(key)) continue;
  if (!baseline.includes(fmt(value))) fail(`facts.prices.${key}=${fmt(value)} not found in reference/llms.baseline.txt`);
}
if (facts.prices.personalShield - facts.prices.assessment !== facts.prices.personalShieldRemainingAfterCredit)
  fail("personalShieldRemainingAfterCredit is not personalShield - assessment");
if (facts.prices.innerCircleFrom - facts.prices.assessment !== facts.prices.innerCircleRemainingAfterCreditFrom)
  fail("innerCircleRemainingAfterCreditFrom is not innerCircleFrom - assessment");

const allowed = new Set(Object.values(facts.prices));
let pages = 0, amounts = 0;
for (const file of walk("_site")) {
  pages++;
  const text = readText(file);
  for (const m of text.matchAll(/₪\s?([\d,]+)/g)) {
    amounts++;
    const n = Number(m[1].replace(/,/g, ""));
    if (!allowed.has(n)) fail(`${file}: ₪${m[1]} is not in facts.json`);
  }
}
if (!process.exitCode) console.log(`facts OK: ${pages} pages, ${amounts} amounts checked`);
