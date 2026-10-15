import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptsDir = path.dirname(fileURLToPath(import.meta.url));

export const repoRoot = path.resolve(scriptsDir, "..");
export const siteUrl = "https://toza-site.pages.dev";
export const routes = Object.freeze([
  "index",
  "why-us",
  "private-exposure-assessment",
  "what-happens-during-the-visit",
  "pricing",
  "separation-divorce",
  "business-dispute",
  "inheritance-clash",
  "leaving-controlling-relationship",
  "commercial-spying",
  "private-investigator",
  "they-know-something",
  "faq",
  "not-it-support",
  "attorneys",
]);

const directionalControl = [
  "safety safe danger hotline domestic abuse police advocate housing clean ground emergency shelter crisis violence",
  "בטיחות בטוח סכנה קו חירום שירות חירום אלימות התעללות משטרה מקלט עו״ס 118 100",
  "את/ה טוזה מנוף",
  "margin-left: padding-right: border-left: left: right: text-align:left",
].join(" ");

export function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

export function readText(relativePath) {
  return fs.readFileSync(path.join(repoRoot, relativePath), "utf8");
}

export function readJson(relativePath) {
  return JSON.parse(readText(relativePath));
}

export function fileExists(relativePath) {
  return fs.existsSync(path.join(repoRoot, relativePath));
}

export function pageFile(locale, route) {
  return `src/${locale}/${route}.njk`;
}

export function outputFile(locale, route) {
  return `_site/${locale}/${route === "index" ? "index" : route}.html`;
}

export function publicPath(locale, route, { directoryForIndex = false } = {}) {
  if (route === "index") {
    return directoryForIndex ? `/${locale}/` : `/${locale}/index.html`;
  }
  return `/${locale}/${route}.html`;
}

export function expectedFiles(locale) {
  return routes.map((route) => `${route}.njk`).sort();
}

export function assertRouteSourceSet(locale) {
  const sourceDir = path.join(repoRoot, "src", locale);
  const actual = fs
    .readdirSync(sourceDir)
    .filter((name) => name.endsWith(".njk") && !name.endsWith(".11tydata.json"))
    .sort();
  const expected = expectedFiles(locale);

  assert(
    actual.length === expected.length && actual.every((name, index) => name === expected[index]),
    `${locale}: expected exactly ${expected.length} route templates; found ${actual.join(", ") || "none"}`,
  );
}

export function frontmatterValue(source, key, label) {
  const match = source.match(new RegExp(`^${key}:\\s*(.+)$`, "m"));
  assert(match, `${label}: missing front matter key ${key}`);
  const value = match[1].trim();
  return /^".*"$/.test(value) ? value.slice(1, -1) : value;
}

export function countMatches(source, pattern) {
  return [...source.matchAll(pattern)].length;
}

export function assertBanned(pattern, source, label) {
  pattern.lastIndex = 0;
  assert(pattern.test(directionalControl), `${label}: invalid negative-control pattern ${pattern}`);
  pattern.lastIndex = 0;
  assert(!pattern.test(source), `${label}: prohibited content matched ${pattern}`);
}

export function assertIncludes(source, expected, label) {
  assert(source.includes(expected), `${label}: expected text is missing: ${expected}`);
}

export function htmlFor(locale, route) {
  const relativePath = outputFile(locale, route);
  assert(fileExists(relativePath), `Missing built page ${relativePath}; run npm run build first.`);
  return readText(relativePath);
}

export function sourceFor(locale, route) {
  return readText(pageFile(locale, route));
}
