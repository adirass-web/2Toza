import { animate } from "motion/mini";
import { inView, scroll, stagger } from "motion";

const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));

export function initHomeMotion() {
  const hero = document.querySelector("[data-home-motion]");
  if (!hero || typeof matchMedia !== "function") return;

  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const desktop = matchMedia("(min-width: 768px)");
  const played = new WeakSet();
  let dispose = () => {};

  const start = () => {
    dispose();
    dispose = () => {};
    if (reduced.matches || !desktop.matches) return;

    const cleanups = [];
    const stop = (fn) => cleanups.push(fn);
    const playOnce = (element, keyframes, options) => {
      if (!element) return;
      if (played.has(element)) { element.style.opacity = "1"; element.style.transform = "none"; return; }
      if (element.getBoundingClientRect().bottom < 0) {
        played.add(element);
        element.style.opacity = "1";
        element.style.transform = "none";
        return;
      }
      const unobserve = inView(element, () => {
        if (played.has(element)) return;
        played.add(element);
        const animation = animate(element, keyframes, options);
        stop(() => { animation.cancel(); element.style.removeProperty("opacity"); element.style.removeProperty("transform"); });
      });
      stop(unobserve);
    };

    const photo = hero.querySelector("[data-home-hero-photo]");
    const title = hero.querySelector("[data-home-hero-title]");
    const underline = hero.querySelector("[data-home-underline]");
    const frame = hero.querySelector("[data-home-frame]");
    const scene = document.querySelector("[data-situation-scene]");
    const stage = scene?.querySelector("[data-situation-stage]");
    const holds = Array.from(stage?.querySelectorAll("[data-situation-hold]") || []);
    const cards = Array.from(scene?.querySelectorAll("[data-situation-card]") || []);
    const list = scene?.querySelector("[data-situation-list]");
    const method = document.querySelector("[data-home-method]");
    const tiers = Array.from(document.querySelectorAll("[data-home-tier]"));
    const dots = document.querySelector("[data-home-dots]");
    const dotLayer = dots?.querySelector("[data-home-dot-layer]");
    let originalMethod = null;

    try {
      if (stage && holds.length === 4 && cards.length === 4) stage.hidden = false;
      document.documentElement.classList.add("home-motion-ready");
      if (frame) {
        if (played.has(frame)) frame.style.clipPath = "inset(0)";
        else {
          played.add(frame);
          const animation = animate(frame, { clipPath: ["inset(0 100% 0 0)", "inset(0)"] }, { duration: 0.8, ease: "easeOut" });
          stop(() => { animation.cancel(); frame.style.removeProperty("clip-path"); });
        }
      }
      if (underline) {
        if (played.has(underline)) underline.style.clipPath = "inset(0)";
        else {
          played.add(underline);
          const animation = animate(underline, { clipPath: ["inset(0 100% 0 0)", "inset(0)"] }, { duration: 0.75, delay: 0.12, ease: "easeOut" });
          stop(() => { animation.cancel(); underline.style.removeProperty("clip-path"); });
        }
      }
      if (photo) {
        const animation = animate(photo, { transform: ["translateY(0%) scale(1.04)", "translateY(1.4%) scale(1.015)"] }, { ease: "linear" });
        const cancel = scroll(animation, { target: hero, offset: ["start start", "end start"] });
        stop(() => { cancel(); animation.cancel(); });
      }

      if (stage && holds.length === 4 && cards.length === 4) {
        const syncScene = () => {
          const firstTop = cards[0].getBoundingClientRect().top + window.scrollY;
          const run = Math.max(1, cards.reduce((sum, card) => sum + card.getBoundingClientRect().height, 0));
          const progress = clamp((window.scrollY - firstTop + 4.25 * parseFloat(getComputedStyle(document.documentElement).fontSize)) / run);
          const scaled = progress * 4;
          const active = Math.min(3, Math.floor(scaled));
          const within = clamp(scaled - active);
          let crop = 0.25;
          if (progress <= 0.25) crop = 0.25 + within * 0.25;
          else if (progress <= 0.5) crop = 0.5 + within * 0.5;
          else crop = 1;
          stage.style.clipPath = `inset(0 ${(1 - crop) * 100}% 0 0)`;
          holds.forEach((image, index) => {
            image.style.opacity = index === active ? "1" : "0";
            if (index === active) {
              const stageBox = stage.getBoundingClientRect();
              const baseWidth = stageBox.height * ((image.naturalWidth || 900) / (image.naturalHeight || 1500));
              const visibleWidth = stageBox.width * crop;
              const scale = Math.max(1, visibleWidth / baseWidth);
              image.style.transform = `translateX(${(visibleWidth - baseWidth) / 2}px) scale(${scale})`;
            }
          });
          if (list) list.dataset.activeHold = String(active + 1);
        };
        syncScene();
        const cancel = scroll(syncScene, { target: scene, offset: ["start start", "end end"] });
        stop(cancel);
      }

      if (method) {
        originalMethod = method.textContent;
        const words = originalMethod.match(/\S+|\s+/g) || [];
        method.replaceChildren(...words.map((word) => {
          if (/^\s+$/.test(word)) return document.createTextNode(word);
          const span = document.createElement("span");
          span.dataset.homeWord = "";
          span.textContent = word;
          return span;
        }));
        const wordSpans = Array.from(method.querySelectorAll("[data-home-word]"));
        if (played.has(method) || method.getBoundingClientRect().bottom < 0) {
          played.add(method);
          wordSpans.forEach((word) => { word.style.opacity = "1"; word.style.transform = "none"; });
        }
        else {
          const unobserve = inView(method, () => {
            if (played.has(method)) return;
            played.add(method);
            const animation = animate(wordSpans, { opacity: [0, 1], transform: ["translateY(8px)", "translateY(0)"] }, { duration: 0.4, delay: stagger(0.018), ease: "easeOut" });
            stop(() => { animation.cancel(); wordSpans.forEach((word) => { word.style.removeProperty("opacity"); word.style.removeProperty("transform"); }); });
          });
          stop(unobserve);
        }
      }

      tiers.forEach((tier) => playOnce(tier, { opacity: [0, 1], transform: ["translateY(12px)", "translateY(0)"] }, { duration: 0.5, ease: "easeOut" }));

      if (dots) {
        let ambient;
        let inViewport = false;
        const update = () => {
          if (!ambient) return;
          if (inViewport && !document.hidden) ambient.play();
          else ambient.pause();
        };
        const unobserve = inView(dotLayer || dots, () => {
          inViewport = true;
          ambient ||= animate(dotLayer || dots, { transform: ["translateY(0)", "translateY(-8px)"] }, { duration: 18, ease: "linear", repeat: Infinity, repeatType: "mirror" });
          update();
          return () => { inViewport = false; update(); };
        });
        const visibility = () => update();
        document.addEventListener("visibilitychange", visibility);
        stop(() => { unobserve(); document.removeEventListener("visibilitychange", visibility); ambient?.cancel(); });
      }

      dispose = () => {
        cleanups.reverse().forEach((cleanup) => cleanup());
        document.documentElement.classList.remove("home-motion-ready");
        if (photo) photo.style.removeProperty("transform");
        if (frame) frame.style.removeProperty("clip-path");
        if (underline) underline.style.removeProperty("clip-path");
        if (stage) { stage.hidden = true; stage.style.removeProperty("clip-path"); }
        holds.forEach((image) => { image.style.removeProperty("opacity"); image.style.removeProperty("transform"); });
        tiers.forEach((tier) => { tier.style.removeProperty("opacity"); tier.style.removeProperty("transform"); });
        if (method && originalMethod !== null) {
          method.textContent = originalMethod;
        }
        if (list) delete list.dataset.activeHold;
      };
    } catch (error) {
      cleanups.reverse().forEach((cleanup) => { try { cleanup(); } catch {} });
      document.documentElement.classList.remove("home-motion-ready");
      if (photo) photo.style.removeProperty("transform");
      if (frame) frame.style.removeProperty("clip-path");
      if (underline) underline.style.removeProperty("clip-path");
      if (stage) { stage.hidden = true; stage.style.removeProperty("clip-path"); }
      holds.forEach((image) => { image.style.removeProperty("opacity"); image.style.removeProperty("transform"); });
      tiers.forEach((tier) => { tier.style.removeProperty("opacity"); tier.style.removeProperty("transform"); });
      if (method && originalMethod !== null) method.textContent = originalMethod;
    }
  };

  const update = () => start();
  reduced.addEventListener("change", update);
  desktop.addEventListener("change", update);
  window.addEventListener("pageshow", (event) => { if (event.persisted) update(); });
  window.addEventListener("pagehide", () => dispose());
  window.addEventListener("beforeprint", () => dispose());
  window.addEventListener("afterprint", update);
  start();
}
