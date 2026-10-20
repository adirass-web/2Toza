#!/usr/bin/env python3
"""Home photographs for build/g: AVIF + JPEG at the widths the templates use.
Usage: make-home-images.py <dir with the Study G originals>   (hero-full.jpg, hero-full-phone.jpg, sit-N.jpg, sit-N-phone.jpg, close-hand.jpg)
Writes assets/img/home/<name>-<width>.avif|jpg. Sources are Unsplash photographs (credits: see docs/build-g/CREDITS.md)."""
import sys, os
from PIL import Image
src = sys.argv[1]; out = "assets/img/home"; os.makedirs(out, exist_ok=True)
JOBS = {  # output name: (source file, [widths])
    "hero": ("hero-full.jpg", [1620]),
    "hero-phone": ("hero-full-phone.jpg", [780]),
    "sit-1": ("sit-1-phone.jpg", [600, 900]), "sit-2": ("sit-2-phone.jpg", [600, 900]),
    "sit-3": ("sit-3-phone.jpg", [600, 900]), "sit-4": ("sit-4-phone.jpg", [600, 900]),
    "hand": ("close-hand.jpg", [600, 900]),
}
total = 0
for name, (f, widths) in JOBS.items():
    im = Image.open(os.path.join(src, f)).convert("RGB")
    for w in widths:
        r = im.resize((w, round(im.height * w / im.width)), Image.LANCZOS) if w < im.width else im
        for ext, kw in (("avif", {"quality": 48}), ("jpg", {"quality": 74, "optimize": True, "progressive": True})):
            p = f"{out}/{name}-{w}.{ext}"; r.save(p, **kw); total += os.path.getsize(p)
            print(p, r.size, os.path.getsize(p) // 1024, "KB")
print("total", total // 1024, "KB")
