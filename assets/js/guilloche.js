/*
 * Guilloché v2 — parametric engine-turned SVG (locked params, Design Brief).
 * Strokes use currentColor so they inherit the element's CSS colour (light/dark aware).
 * Null-guarded: only draws where the target elements exist.
 */
(function () {
  var NS = "http://www.w3.org/2000/svg";

  function groove(cx, cy, R, a1, n1, p1, a2, n2, p2) {
    var d = "";
    for (var t = 0; t <= 720; t++) {
      var th = t * Math.PI / 360;
      var r = R + a1 * Math.sin(n1 * th + p1) + a2 * Math.sin(n2 * th + p2);
      d += (t ? "L" : "M") + (cx + r * Math.cos(th)).toFixed(2) + " " + (cy + r * Math.sin(th)).toFixed(2);
    }
    return d + "Z";
  }

  function path(svg, d, w, op) {
    var p = document.createElementNS(NS, "path");
    p.setAttribute("d", d);
    p.setAttribute("fill", "none");
    p.setAttribute("stroke", "currentColor");
    p.setAttribute("stroke-width", w);
    p.setAttribute("opacity", op);
    svg.appendChild(p);
  }

  function svg(w, h, vb, par) {
    var s = document.createElementNS(NS, "svg");
    s.setAttribute("width", w);
    s.setAttribute("height", h);
    s.setAttribute("viewBox", vb);
    if (par) s.setAttribute("preserveAspectRatio", par);
    s.setAttribute("aria-hidden", "true");
    return s;
  }

  // Hero field — grooves centred off-canvas right, <=10% opacity
  var field = document.getElementById("hero-field");
  if (field && !field.firstChild) {
    var f = svg("100%", "100%", "0 0 900 460", "xMaxYMid slice");
    for (var i = 0; i < 46; i++) {
      var R = 70 + i * 10, cx = 985 + 4 * Math.sin(i * 0.4), cy = 230 + 4 * Math.cos(i * 0.33);
      path(f, groove(cx, cy, R, 3.4, 13, i * 0.5, 1.6, 29, -i * 0.27), 0.5, 0.085);
    }
    field.appendChild(f);
  }

  // Onramp medallion — turned disc, 36 rings, drift 0.42, wander 3.2
  var medal = document.getElementById("onramp-medal");
  if (medal && !medal.firstChild) {
    var m = svg("300", "300", "0 0 400 400");
    for (var j = 0; j < 36; j++) {
      var Rj = 64 + j * (180 / 36), mx = 200 + 3.2 * Math.sin(j * 0.35), my = 200 + 3.2 * Math.cos(j * 0.28);
      path(m, groove(mx, my, Rj, 2.4, 11, j * 0.42, 1.0, 23, -j * 0.21), 0.5, 0.4);
    }
    medal.appendChild(m);
  }

  // Outcome-vignette corner accent — small disc per .vig-field, clipped by card overflow:hidden
  var vigFields = document.querySelectorAll(".vig-field");
  vigFields.forEach(function (el, i) {
    if (el.firstChild) return;
    var v = svg("160", "160", "0 0 160 160");
    for (var k = 0; k < 20; k++) {
      var Rk = 16 + k * (52 / 20);
      path(v, groove(80, 80, Rk, 1.6, 9, k * 0.48 + i * 0.3, 0.7, 19, -k * 0.20), 0.45, 0.38);
    }
    el.appendChild(v);
  });
})();
