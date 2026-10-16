// Design tokens for templates that need a literal value in markup (the theme-color meta tag cannot read a CSS variable).
import { readFileSync } from "node:fs";
const tree = JSON.parse(readFileSync(new URL("../../tokens/tokens.json", import.meta.url), "utf8"));
export default { paper: tree.color.paper.$value };
