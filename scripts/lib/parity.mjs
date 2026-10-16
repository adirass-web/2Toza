// HTML text extraction and sentence-level matching shared by check-content (parity between
// content files and built pages) and any check that renders pages from content.
import { Parser } from "htmlparser2";
import { norm } from "./content.mjs";

export { norm };
export const squash = (s) => String(s).replace(/\s+/g, "");
export const hasWords = (s) => /[A-Za-z֐-׿]/.test(s) || s.includes("₪");

// Sentence segmentation shared by both sides of the parity check.
export function sentences(s) {
  s = norm(s).replace(/\b(Dr|Mr|Mrs|Ms|St|vs|e\.g|i\.e)\. /g, "$1.\u0000");
  return s
    .split(/(?<=[.!?]["”’)]?) (?=["“(]?[A-Z0-9₪֐-׿])| · /)
    .map((x) => x.replace(/\u0000/g, " ").trim())
    .filter(Boolean);
}

export const INLINE = new Set(["a", "span", "em", "strong", "b", "i", "small", "abbr", "code", "sup", "sub", "time", "mark", "s", "u", "q", "cite", "label"]);
export const SKIP = new Set(["script", "style", "template", "noscript"]);
export const ATTRS = ["alt", "aria-label", "data-open", "data-closed", "title", "placeholder"];
export function extract(html) {
  const out = { title: "", description: "", nodes: [], blocks: [], attrs: [] };
  let skip = 0, inTitle = false, inBody = false, buf = "", node = "";
  // htmlparser2 splits a text node at entities; join adjacent text callbacks.
  const endNode = () => { if (norm(node)) out.nodes.push(norm(node)); node = ""; };
  const flush = () => { endNode(); if (norm(buf)) out.blocks.push(norm(buf)); buf = ""; };
  const p = new Parser({
    onopentag(name, a) {
      endNode();
      if (name === "body") inBody = true;
      if (name === "title") inTitle = true;
      if (name === "meta" && a.name === "description") out.description = a.content || "";
      if (SKIP.has(name)) skip++;
      if (!inBody || skip) return;
      for (const k of ATTRS) if (a[k] && norm(a[k])) out.attrs.push(norm(a[k]));
      if (name === "br") buf += " ";
      else if (!INLINE.has(name)) flush();
    },
    ontext(t) {
      if (inTitle) { out.title += t; return; }
      if (!inBody || skip) return;
      node += t;
      buf += t;
    },
    onclosetag(name) {
      endNode();
      if (name === "title") inTitle = false;
      if (SKIP.has(name)) { skip--; return; }
      if (inBody && !skip && !INLINE.has(name)) flush();
    },
  }, { decodeEntities: true });
  p.write(html); p.end(); flush();
  out.title = norm(out.title); out.description = norm(out.description);
  return out;
}

export function boundedIncludes(hay, needle) {
  let i = hay.indexOf(needle);
  while (i !== -1) {
    const b = hay[i - 1], a = hay[i + needle.length];
    if (!(b && /[\p{L}\p{N}]/u.test(b)) && !(a && /[\p{L}\p{N}]/u.test(a))) return true;
    i = hay.indexOf(needle, i + 1);
  }
  return false;
}
