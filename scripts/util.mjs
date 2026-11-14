import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

export const readJson = (p) => JSON.parse(readFileSync(p, "utf8"));
export const readText = (p) => readFileSync(p, "utf8");

export function walk(dir, ext = ".html") {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...walk(p, ext));
    else if (p.endsWith(ext)) out.push(p);
  }
  return out;
}

export function fail(msg) {
  console.error("FAIL: " + msg);
  process.exitCode = 1;
}

// All output checks must inspect the artifact selected by the build profile.
export function siteDir() {
  const profile = process.env.SITE_ENV || "preview";
  if (!["preview", "production"].includes(profile)) throw new Error("SITE_ENV must be preview or production");
  if (profile === "production" && process.env.SITE_URL !== "https://toza-site.pages.dev") throw new Error("SITE_URL must be https://toza-site.pages.dev for production");
  return profile === "production" ? "_site-production" : "_site";
}
