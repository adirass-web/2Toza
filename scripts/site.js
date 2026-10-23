// Site script (esbuild bundles it into assets/js/site.js, npm run build:js). Small jobs, no copy:
// Flowbite's navbar collapse; the print button (data-print); the FAQ expand-all toggle (data-faq-toggle);
// collapsible panels on phones (FAQ groups, Conditions sections); opening what a #hash points at; the theme
// toggle. Everything works without it except the mobile menu, the print button and the toggle, which
// stay hidden or inert.
import { initCollapses } from "flowbite/lib/esm/components/collapse/index.js";
import { initHomeMotion } from "./home-motion.js";

initCollapses();
initHomeMotion();

document.querySelectorAll("[data-print]").forEach((b) => b.addEventListener("click", () => window.print()));

// Collapsible panels (FAQ groups, Conditions sections): every panel is <details open> in the markup, so the
// page is complete without script. On phones (<768px) all but the panel a #hash points at (else the first) are
// collapsed; from md up they stay open. Printing opens them all, then restores them.
const narrow = matchMedia("(max-width: 767.98px)");
const panels = Array.from(document.querySelectorAll("details[data-collapsible]"));
const panelFor = (el) => el && (el.closest("[data-collapsible]") || (el.tagName === "SECTION" ? el.querySelector("[data-collapsible]") : null));
const hashEl = () => location.hash.length > 1 ? document.getElementById(decodeURIComponent(location.hash.slice(1))) : null;
const settle = () => {
  const keep = panelFor(hashEl()) || panels[0];
  panels.forEach((p) => { p.open = !narrow.matches || p === keep; });
};
if (panels.length) {
  settle();
  narrow.addEventListener("change", settle);
  panels.forEach((p) => p.addEventListener("toggle", () => { if (!p.open && !narrow.matches) p.open = true; }));
  let was;
  addEventListener("beforeprint", () => { was = panels.map((p) => p.open); panels.forEach((p) => { p.open = true; }); });
  addEventListener("afterprint", () => { if (was) panels.forEach((p, i) => { p.open = was[i]; }); });
}

// FAQ: questions are <details> too (closed by default). Expand all opens every panel and question; collapse all closes the questions.
const items = () => Array.from(document.querySelectorAll("details:not([data-collapsible])"));
const toggle = document.querySelector("[data-faq-toggle]");
if (toggle) {
  const sync = () => {
    const every = items().every((d) => d.open);
    toggle.textContent = every ? toggle.dataset.open : toggle.dataset.closed;
    toggle.setAttribute("aria-pressed", String(every));
  };
  toggle.hidden = false;
  toggle.addEventListener("click", () => {
    const every = items().every((d) => d.open);
    if (!every) panels.forEach((p) => { p.open = true; });
    items().forEach((d) => { d.open = !every; });
    sync();
  });
  items().forEach((d) => d.addEventListener("toggle", sync));
  sync();
}

// A #hash opens what it points at: a question (and its panel) or a whole panel, then scrolls to it.
const openTarget = () => {
  const el = hashEl();
  if (!el) return;
  const panel = panelFor(el);
  if (panel) panel.open = true;
  if (el.tagName === "DETAILS") el.open = true;
  if (panel || el.tagName === "DETAILS") el.scrollIntoView();
};
openTarget();
addEventListener("hashchange", openTarget);
// Clicking the link of the panel already in the URL fires no hashchange, so open it here too.
document.querySelectorAll('a[href^="#"]').forEach((a) => a.addEventListener("click", () => {
  const panel = panelFor(document.getElementById(a.getAttribute("href").slice(1)));
  if (panel) panel.open = true;
}));

// Theme toggle (D95): icon button, default light, remembered per browser (localStorage "tz-theme"). The head script applies the
// stored choice before first paint; this wires the button. Hidden in the markup, so without script it does not show.
const themeBtn = document.querySelector("[data-theme-toggle]");
if (themeBtn) {
  const root = document.documentElement;
  const meta = document.querySelector('meta[name="theme-color"]');
  const sync = () => {
    const dark = root.getAttribute("data-theme") === "dark";
    themeBtn.setAttribute("aria-pressed", String(dark));
    if (meta) meta.content = getComputedStyle(root).getPropertyValue("--color-paper").trim();
  };
  themeBtn.hidden = false;
  themeBtn.addEventListener("click", () => {
    const dark = root.getAttribute("data-theme") === "dark";
    if (dark) root.removeAttribute("data-theme"); else root.setAttribute("data-theme", "dark");
    try { localStorage.setItem("tz-theme", dark ? "light" : "dark"); } catch (e) {}
    sync();
    window.dispatchEvent(new Event("tz-theme"));
  });
  sync();
}
