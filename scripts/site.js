// Site script (esbuild bundles it into assets/js/site.js, npm run build:js). Four small jobs, no copy:
// Flowbite's navbar collapse; the print button (data-print); the FAQ expand-all toggle (data-faq-toggle);
// opening the question a #hash points at. Everything works without it except the mobile menu, the
// print button and the toggle, which stay hidden or inert.
import { initCollapses } from "flowbite/lib/esm/components/collapse/index.js";

initCollapses();

document.querySelectorAll("[data-print]").forEach((b) => b.addEventListener("click", () => window.print()));

const items = () => Array.from(document.querySelectorAll("details"));
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
    items().forEach((d) => { d.open = !every; });
    sync();
  });
  items().forEach((d) => d.addEventListener("toggle", sync));
  sync();
}

const openTarget = () => {
  const el = location.hash && document.getElementById(decodeURIComponent(location.hash.slice(1)));
  if (el && el.tagName === "DETAILS") { el.open = true; el.scrollIntoView(); }
};
openTarget();
addEventListener("hashchange", openTarget);

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
