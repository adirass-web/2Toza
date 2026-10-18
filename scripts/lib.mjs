// Shared helpers: walk HTML with htmlparser2 and collect visible text.
import { parseDocument } from "htmlparser2";

const SKIP = new Set(["script", "style", "noscript", "template", "svg"]);
export const norm = (s) => s.replace(/ /g, " ").replace(/\s+/g, " ").trim();

// Returns { elements: [full text of each element], nodes: [{text, exempt}] , attrs: [...] }
export function collect(html) {
  const doc = parseDocument(html);
  const elements = [], nodes = [], attrs = [];
  const walk = (n, exempt) => {
    if (n.type === "text") {
      const t = norm(n.data);
      if (t && /[\p{L}\p{N}₪]/u.test(t)) nodes.push({ text: t, exempt });
      return;
    }
    if (!n.children) return;
    if (n.type === "tag" && SKIP.has(n.name)) {
      // aria/title text inside SVG still counts
      return;
    }
    const ex = exempt || (n.attribs && "data-copy-exempt" in n.attribs);
    if (n.attribs) for (const a of ["aria-label", "alt", "title", "placeholder"]) {
      const v = n.attribs[a] && norm(n.attribs[a]);
      if (v) attrs.push({ text: v, exempt: ex });
    }
    if (n.type === "tag") {
      const t = norm(textOf(n));
      if (t) elements.push(t);
    }
    for (const c of n.children) walk(c, ex);
  };
  walk(doc, false);
  return { elements, nodes, attrs };
}

function textOf(n) {
  if (n.type === "text") return n.data;
  if (!n.children || (n.type === "tag" && SKIP.has(n.name))) return "";
  // keep a space between block children so words do not fuse
  return n.children.map(textOf).join(" ");
}
