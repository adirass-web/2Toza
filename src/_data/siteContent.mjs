// Global data `siteContent` (not `content`: Eleventy reserves that name for the rendered page body).
// Every content page fully resolved for templates.
//   siteContent.en.pages.<page> = { page, title, description, permalink, lang, dir, labels?, blocks }
// Resolution (tokens, shared blocks, prices, contact keys, Markdown) lives in
// scripts/lib/content.mjs, shared with scripts/check-content.mjs. See content/CONTENT-MODEL.md
// "Rendering" and src/_includes/blocks/README.md.
import { loadContent } from "../../scripts/lib/content.mjs";

export default function () {
  return loadContent();
}
