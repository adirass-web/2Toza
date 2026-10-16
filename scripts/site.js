// Site script (esbuild bundles it into assets/js/site.js, npm run build:js). Small jobs, no copy:
// Flowbite's navbar collapse; the print button (data-print); the FAQ expand-all toggle (data-faq-toggle);
// collapsible panels on phones (FAQ groups, Conditions sections); opening what a #hash points at; the floating
// contact group. Everything works without it except the mobile menu, the print button and the toggle, which
// stay hidden or inert.
import { initCollapses } from "flowbite/lib/esm/components/collapse/index.js";

initCollapses();

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

// Floating contact group: shown once the hero has scrolled away, hidden while the contact block or footer is on screen.
const float = document.querySelector("[data-float]");
if (float && "IntersectionObserver" in window) {
  const on = new Set();
  const io = new IntersectionObserver((es) => {
    es.forEach((e) => on[e.isIntersecting ? "add" : "delete"](e.target));
    float.toggleAttribute("data-shown", !on.size);
  });
  document.querySelectorAll("[data-hero],[data-contact],footer").forEach((el) => io.observe(el));
}
