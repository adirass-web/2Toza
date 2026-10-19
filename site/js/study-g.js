/* Toza — Study G motion (D87, D90). Progressive: the page is complete without this file.
   Animates transform / opacity / clip-path only (D56). Contact links are never touched. */
(() => {
  const html = document.documentElement;
  html.classList.remove("no-js");
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) { html.classList.add("reduced"); }
  const M = window.Motion || null;
  const phone = () => innerWidth < 768;
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const ease = (t) => 1 - Math.pow(1 - t, 3);

  /* scroll progress helper: Motion.scroll when vendored, rAF fallback otherwise */
  function onProgress(target, cb, offset = ["start start", "end end"]) {
    if (M && M.scroll) { M.scroll(cb, { target, offset }); return; }
    const run = () => {
      const r = target.getBoundingClientRect();
      const span = offset[1] === "end start" ? r.height + innerHeight : r.height - innerHeight;
      const start = offset[1] === "end start" ? innerHeight : 0;
      cb(clamp((start - r.top) / Math.max(1, span)));
    };
    addEventListener("scroll", run, { passive: true }); addEventListener("resize", run); run();
  }

  /* menu (no motion) */
  const menu = document.querySelector(".menu");
  const btn = document.querySelector(".menu-btn");
  const setMenu = (open) => {
    menu.classList.toggle("open", open);
    btn.setAttribute("aria-expanded", String(open));
    if (open) { const f = menu.querySelector("a"); f && f.focus(); } else btn.focus();
  };
  document.querySelectorAll("[data-menu]").forEach((b) => b.addEventListener("click", () => setMenu(!menu.classList.contains("open"))));
  menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
  addEventListener("keydown", (e) => { if (e.key === "Escape" && menu.classList.contains("open")) setMenu(false); });

  /* theme toggle (D95): icon only, remembered per browser, default light */
  const tbtn = document.querySelector("[data-theme-toggle]");
  const root = document.documentElement;
  const isDark = () => root.getAttribute("data-theme") === "dark";
  const syncTheme = () => tbtn && tbtn.setAttribute("aria-pressed", String(isDark()));
  syncTheme();
  if (tbtn) tbtn.addEventListener("click", () => {
    if (isDark()) root.removeAttribute("data-theme"); else root.setAttribute("data-theme", "dark");
    try { localStorage.setItem("tz-theme", isDark() ? "dark" : "light"); } catch (e) {}
    syncTheme(); window.dispatchEvent(new Event("tz-theme"));
  });

  /* header over the Primes photo (D81) */
  const top = document.querySelector(".top");
  const primes = document.querySelector(".hero-primes");
  if (primes) {
    const set = () => top.classList.toggle("over", scrollY < 8);
    addEventListener("scroll", set, { passive: true }); addEventListener("resize", set); set();
  }

  if (reduced) return;

  /* P5 drift on the Primes photo */
  const media = primes && primes.querySelector(".media");
  if (media) onProgress(primes, (p) => {
    media.style.transform = `translateY(${(p * 40).toFixed(1)}px) scale(${(1.06 - 0.06 * p).toFixed(4)})`;
  }, ["start start", "end start"]);

  /* P6: mint band (H2) / mint rule (Primes) passes once per session; text is visible from frame 0 */
  let seen = false; try { seen = sessionStorage.getItem("tz-p6") === "1"; sessionStorage.setItem("tz-p6", "1"); } catch (e) {}
  const marks = [...document.querySelectorAll(".mark")];
  if (!seen && marks.length) {
    const isRule = !!primes;
    marks.forEach((m, i) => {
      const kf = isRule
        ? { transform: ["scaleX(0)", "scaleX(1)"] }
        : { transform: ["scaleX(0)", "scaleX(1)", "scaleX(1)"], transformOrigin: ["left center", "left center", "right center"] };
      if (M && M.animate) {
        M.animate(m, isRule ? { transform: ["scaleX(0)", "scaleX(1)"] } : { transform: ["scaleX(0)", "scaleX(1)"] },
          { duration: isRule ? 0.7 : 0.55, delay: 0.25 + i * 0.12, ease: [0.2, 0.7, 0.2, 1] })
          .then(() => { if (!isRule) M.animate(m, { opacity: [1, 0] }, { duration: 0.6, delay: 0.5 }); });
      } else { m.style.transform = "scaleX(1)"; }
    });
  } else if (primes) { marks.forEach((m) => (m.style.transform = "scaleX(1)")); }

  /* D78: pinned situations scene */
  const sits = document.querySelector(".sits");
  const stage = sits && sits.querySelector(".stage");
  if (stage) {
    sits.classList.add("pin-on");
    const view = stage.querySelector(".view");
    const layers = [...stage.querySelectorAll(".layer")];
    const caps = [...stage.querySelectorAll(".cap")];
    const closing = stage.querySelector(".closing");
    const title = stage.querySelector(".title");
    const frame = stage.querySelector(".frame");
    const ticks = [...stage.querySelectorAll(".progress i")];
    // boxes: [x0, y0, x1, y1] as fractions of the view
    const D = { boxes: [[.5,.18,.75,.86],[.5,.18,.986,.86],[.25,.10,.986,.94],[.25,0,1,1],[0,0,1,1]],
      vx: [.25,.5,.75], hy: [.18,.86] };
    const P = { boxes: [[.5,.5,.95,.88],[.05,.5,.95,.88],[.05,.44,.95,.92],[0,.44,1,1],[0,0,1,1]],
      vx: [.25,.5,.75], hy: [.5,.88] };
    // timeline: [start, end] of each hold; transitions sit between
    const holds = [[.07,.20],[.28,.40],[.48,.60],[.68,.79],[.87,1]];
    let G = phone() ? P : D;

    // frame lines + nodes
    const build = () => {
      frame.innerHTML = "";
      G.vx.forEach((x) => { const v = document.createElement("i"); v.className = "v"; v.style.insetInlineStart = x * 100 + "%"; if (G === P) v.style.insetBlockStart = G.hy[0] * 100 + "%"; frame.append(v); });
      G.hy.forEach((y) => { const h = document.createElement("i"); h.className = "h"; h.style.insetBlockStart = y * 100 + "%"; frame.append(h);
        G.vx.forEach((x) => { const n = document.createElement("i"); n.className = "n"; n.style.insetInlineStart = x * 100 + "%"; n.style.insetBlockStart = y * 100 + "%"; frame.append(n); }); });
    };
    build();
    addEventListener("resize", () => { const g = phone() ? P : D; if (g !== G) { G = g; build(); } });

    const rectAt = (p) => {
      if (p <= holds[0][0]) { const t = ease(p / holds[0][0]); const b = G.boxes[0]; const cx = (b[0] + b[2]) / 2, cy = (b[1] + b[3]) / 2;
        return [lerp(cx, b[0], t), lerp(cy, b[1], t), lerp(cx, b[2], t), lerp(cy, b[3], t)]; }
      for (let i = 0; i < holds.length; i++) {
        if (p <= holds[i][1]) return G.boxes[i];
        if (i + 1 < holds.length && p < holds[i + 1][0]) {
          const t = ease((p - holds[i][1]) / (holds[i + 1][0] - holds[i][1]));
          return G.boxes[i].map((v, k) => lerp(v, G.boxes[i + 1][k], t));
        }
      }
      return G.boxes[4];
    };
    // weight of hold i at progress p (1 inside the hold, ramps across half of each transition)
    const weight = (i, p) => {
      const [a, b] = holds[i];
      const prevEnd = i > 0 ? holds[i - 1][1] : 0, nextStart = i + 1 < holds.length ? holds[i + 1][0] : 1.01;
      const inA = i === 0 ? clamp(p / a) : clamp((p - prevEnd) / (a - prevEnd));
      const outB = i + 1 < holds.length ? 1 - clamp((p - b) / (nextStart - b)) : 1;
      return Math.min(inA, outB);
    };

    const render = (p) => {
      const W = view.clientWidth, H = view.clientHeight;
      const r = rectAt(p);
      const clip = `inset(${(r[1] * 100).toFixed(2)}% ${((1 - r[2]) * 100).toFixed(2)}% ${((1 - r[3]) * 100).toFixed(2)}% ${(r[0] * 100).toFixed(2)}%)`;
      // the photo is cover-fitted to the box: the whole picture sits in the small box and grows with it
      const cx = (r[0] + r[2]) / 2 - 0.5, cy = (r[1] + r[3]) / 2 - 0.5;
      const s = Math.max(r[2] - r[0], r[3] - r[1]) * 1.04;
      // photo of hold i: 4 photos; holds 4 and 5 share the stairwell
      const w = [0, 1, 2, 3, 4].map((i) => weight(i, p));
      const photo = [w[0], w[1], w[2], Math.max(w[3], w[4])];
      layers.forEach((l, i) => {
        l.style.clipPath = clip;
        l.style.opacity = photo[i] > 0.001 || (i === 0 && p < holds[0][0]) ? Math.max(photo[i], i === 0 && p < holds[0][0] ? 1 : 0).toFixed(3) : "0";
        const img = l.querySelector(phone() ? ".p" : ".d");
        if (img) img.style.transform = `translate(${(cx * W).toFixed(1)}px, ${(cy * H).toFixed(1)}px) scale(${s.toFixed(4)})`;
      });
      caps.forEach((c, i) => { const o = w[i]; c.style.opacity = o.toFixed(3); c.style.transform = `translateY(${((1 - o) * 12).toFixed(1)}px)`; });
      closing.style.opacity = w[4].toFixed(3);
      closing.style.transform = `translateY(${((1 - w[4]) * 16).toFixed(1)}px)`;
      title.style.opacity = (1 - w[4]).toFixed(3);
      frame.style.setProperty("--draw", clamp(p / 0.05).toFixed(3));
      frame.style.opacity = (1 - clamp((p - 0.82) / 0.06)).toFixed(3);
      const k = w.indexOf(Math.max(...w));
      ticks.forEach((t, i) => t.classList.toggle("on", i <= Math.min(k, 3)));
      ticks[0].parentNode.style.opacity = (1 - w[4]).toFixed(3);
    };
    onProgress(stage, render);
  }

  /* A8: method line, words from .55 to 1 (D87) */
  const method = document.querySelector(".method p");
  if (method) {
    const words = method.textContent.trim().split(/\s+/);
    method.textContent = "";
    words.forEach((w, i) => { const s = document.createElement("span"); s.className = "w"; s.textContent = w; method.append(s); if (i < words.length - 1) method.append(" "); });
    const spans = [...method.querySelectorAll(".w")];
    onProgress(method, (p) => {
      const t = clamp((p - 0.15) / 0.45) * spans.length;
      spans.forEach((s, i) => s.style.setProperty("--o", (0.55 + 0.45 * clamp(t - i)).toFixed(3)));
    }, ["start end", "end start"]);
  }

  /* tiers fade-up on entry (D87) — prices never animate on their own */
  const reveals = [...document.querySelectorAll(".reveal")];
  reveals.forEach((el) => { el.style.setProperty("--o", "0"); el.style.setProperty("--y", "16px"); el.style.transition = "opacity .7s cubic-bezier(.2,.7,.2,1), transform .7s cubic-bezier(.2,.7,.2,1)"; });
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { const d = +e.target.dataset.d || 0; setTimeout(() => { e.target.style.setProperty("--o", "1"); e.target.style.setProperty("--y", "0px"); }, d); io.unobserve(e.target); } }), { rootMargin: "0px 0px -10% 0px" });
  reveals.forEach((el) => io.observe(el));

  /* A4: ambient dots in one close cell, paused off screen (D87) */
  const cv = document.querySelector(".dots canvas");
  if (cv) {
    let dotC = "#CFCAC1", dotN = "#B5AFA4", glow = ".20";
    const readTheme = () => { const cs = getComputedStyle(document.documentElement); dotC = cs.getPropertyValue("--dot").trim() || dotC; dotN = cs.getPropertyValue("--dot-near").trim() || dotN; glow = isDark() ? ".16" : ".20"; };
    readTheme();
    const ctx = cv.getContext("2d"); let run = false, t0 = performance.now(), raf = 0;
    const draw = (now) => {
      const dpr = Math.min(2, devicePixelRatio || 1), w = cv.clientWidth, h = cv.clientHeight;
      if (cv.width !== w * dpr) { cv.width = w * dpr; cv.height = h * dpr; }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, w, h);
      const t = (now - t0) / 1000, gx = w * (0.55 + 0.25 * Math.sin(t * 0.11)), gy = h * (0.45 + 0.25 * Math.cos(t * 0.083)), R = Math.max(w, h) * 0.45;
      const g = ctx.createRadialGradient(gx, gy, 0, gx, gy, R); g.addColorStop(0, `rgba(161,255,203,${glow})`); g.addColorStop(1, "rgba(161,255,203,0)");
      ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
      const step = 14;
      for (let y = step / 2; y < h; y += step) for (let x = step / 2 + ((y / step) % 2) * step / 2; x < w; x += step) {
        const d = Math.hypot(x - gx, y - gy) / R; const r = 0.9 + 1.1 * clamp(1 - d);
        ctx.fillStyle = d < 1 ? dotN : dotC; ctx.beginPath(); ctx.arc(x, y, r, 0, 6.2832); ctx.fill();
      }
      if (run) raf = requestAnimationFrame(draw);
    };
    new IntersectionObserver(([e]) => { run = e.isIntersecting; cancelAnimationFrame(raf); if (run) raf = requestAnimationFrame(draw); }).observe(cv);
    draw(performance.now());
    addEventListener("tz-theme", () => { readTheme(); draw(performance.now()); });
  }
})();
