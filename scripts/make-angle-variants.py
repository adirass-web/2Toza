"""Generate angle-system variants of board 2 (review round 4).
Each variant = the current board 2 + an override stylesheet (desktop) + small markup changes.
Output: site/b2-angle-<x>/index.html. Copy is untouched (copy check still runs on every page)."""
import pathlib, re
ROOT = pathlib.Path(__file__).resolve().parent.parent
base = (ROOT / "site/b2-quiet/index.html").read_text()

SHARDS = '''  <div class="shards" aria-hidden="true">
    <img class="s s1" src="../img/h-hero-wide.jpg" width="2400" height="922" alt="">
    <img class="s s2" src="../img/h-hero-wide.jpg" width="2400" height="922" alt="">
    <img class="s s3" src="../img/h-hero-wide.jpg" width="2400" height="922" alt="">
  </div>'''

V = {
 "a": ("Crossing diagonals", """
/* A: angles vary and oppose. Steep hero cut, opposite cut into the situations, every tile leans its own way. */
@media (min-width:901px){
 .hero-photo{clip-path:polygon(0 0,100% 0,100% 52%,0 100%);block-size:clamp(22rem,64svh,42rem)}
 .doors{margin-block-start:-5rem;padding-block-start:12rem;background:var(--surface);clip-path:polygon(0 0,100% 8rem,100% 100%,0 100%)}
 .cell-head{inset-block-start:11rem}
 .tile + .tile{margin-inline-start:-1.5rem}
 .tile .ph{clip-path:var(--clip)}
 .t-sep{--clip:polygon(12% 0,100% 7%,86% 100%,0 93%)}
 .t-bus{--clip:polygon(0 9%,100% 0,95% 100%,7% 92%)}
 .t-inh{--clip:polygon(9% 0,90% 6%,100% 100%,0 88%)}
 .t-som{--clip:polygon(0 0,100% 12%,88% 95%,5% 100%)}
 .cell-mint{clip-path:polygon(4% 0,100% 22%,95% 100%,0 80%);padding-block:3.2rem 3.4rem}
}"""),
 "b": ("Shards and overlap", """
/* B: the hero breaks into three shards along non-parallel lines (a door ajar); situations overlap like prints at slight, different rotations. */
.shards{position:relative;block-size:clamp(20rem,60svh,40rem);overflow:hidden}
.shards .s{position:absolute;inset:0;inline-size:100%;block-size:100%;object-fit:cover;object-position:60% 55%}
.shards .s1{clip-path:polygon(0 0,44% 0,37% 100%,0 100%)}
.shards .s2{clip-path:polygon(45% 0,70% 0,64% 100%,38.2% 100%);transform:translateY(1.6rem)}
.shards .s3{clip-path:polygon(71% 0,100% 0,100% 100%,65.2% 100%);transform:translateY(-1rem)}
.hero-text h1{margin-block-start:-1.2em}
@media (min-width:901px){
 .doors{background:var(--surface);padding-block:8rem 7rem}
 .cell-head{inset-block-start:8rem;z-index:3}
 .tile{position:relative;background:var(--bg);padding:10px 10px 0}
 .tile .ph{clip-path:none}
 .tile + .tile{margin-inline-start:-2rem}
 .t-sep{transform:rotate(-3deg);z-index:1;margin-block-start:13rem}
 .t-bus{transform:rotate(2.2deg);z-index:2;margin-block-start:17rem}
 .t-inh{transform:rotate(-1.2deg);z-index:3;margin-block-start:9rem}
 .t-som{transform:rotate(4deg);z-index:4;margin-block-start:3rem}
 .tile .cap{padding-block-end:1rem}
 .cell-mint{clip-path:none;transform:rotate(-2deg);margin-block-start:-1rem}
}"""),
 "c": ("Converging perspective", """
/* C: from the stairwell. The four tiles are cut by lines running to one vanishing point, like the walls of a corridor; the headline runs along the hero cut. */
@media (min-width:901px){
 .hero-text h1{transform:rotate(-6.4deg);transform-origin:0 100%;margin-block-start:-1.6em}
 .doors{padding-block-start:16rem}
 .cell-head{inset-block-start:7rem}
 .mosaic{align-items:center;justify-content:center;gap:10px;padding-inline:var(--margin)}
 .tile + .tile{margin-inline-start:0}
 .tile{margin-block-start:0!important}
 .tile .ph{clip-path:var(--clip)}
 .t-sep{--h:34rem;inline-size:30vw;--clip:polygon(0 0,100% 14%,100% 86%,0 100%)}
 .t-bus{--h:34rem;inline-size:16vw;--clip:polygon(0 14%,100% 25%,100% 75%,0 86%)}
 .t-inh{--h:34rem;inline-size:16vw;--clip:polygon(0 25%,100% 14%,100% 86%,0 75%)}
 .t-som{--h:34rem;inline-size:30vw;--clip:polygon(0 14%,100% 0,100% 100%,0 86%)}
 .tile .cap{text-align:start}
 .cell-mint{margin-block-start:3rem}
}"""),
 "d": ("Staircase", """
/* D: the cut becomes steps. The hero's lower edge descends in four stairs; the situations climb diagonally across the page, each tile notched like a step. */
@media (min-width:901px){
 .hero-photo{clip-path:polygon(0 0,100% 0,100% 62%,76% 62%,76% 74%,52% 74%,52% 86%,28% 86%,28% 98%,0 98%)}
 .tile .ph{clip-path:polygon(0 4rem,4rem 4rem,4rem 0,100% 0,100% 100%,0 100%)}
 .tile + .tile{margin-inline-start:12px}
 .t-sep{margin-block-start:22rem;--h:26rem;inline-size:23vw}
 .t-bus{margin-block-start:15rem;--h:26rem;inline-size:23vw}
 .t-inh{margin-block-start:8rem;--h:26rem;inline-size:23vw}
 .t-som{margin-block-start:1rem;--h:26rem;inline-size:23vw}
 .cell-head{inset-block-start:7rem;inline-size:30vw}
 .cell-mint{clip-path:polygon(0 3rem,3rem 3rem,3rem 0,100% 0,100% 100%,0 100%);margin-block-start:-14rem;padding:3.6rem 2.5rem 2.5rem}
}"""),
 "e": ("Tilted plane", """
/* E: the situations sit on one plane tilted against the page; the hero cut runs the other way. */
@media (min-width:901px){
 .hero-photo{clip-path:polygon(0 0,100% 0,100% 100%,0 68%)}
 .doors{overflow:visible;padding-block:9rem 9rem;position:relative}
 .doors::before{content:"";position:absolute;inset:3rem -10vw 2rem;background:var(--surface);transform:rotate(-4deg);z-index:-1}
 .mosaic,.cell-head,.cell-mint{transform:rotate(-4deg)}
 .cell-head{inset-block-start:10rem}
 .tile .ph{clip-path:none}
 .tile + .tile{margin-inline-start:14px}
 .t-sep{margin-block-start:10rem}.t-bus{margin-block-start:13rem}.t-inh{margin-block-start:6rem}.t-som{margin-block-start:0}
 body{overflow-x:hidden}
}"""),
}

for key, (name, css) in V.items():
    s = base
    s = s.replace("</style>", css + "\n</style>", 1)
    s = s.replace("<title>Toza — Private, in-person digital security</title>",
                  "<title>Toza — Private, in-person digital security</title>", 1)
    if key == "b":
        s = re.sub(r"  <picture>.*?</picture>", SHARDS + "\n  <picture class=\"phone-only\">\n    <img class=\"hero-photo\" src=\"../img/h-hero-phone.jpg\" width=\"900\" height=\"782\" alt=\"\">\n  </picture>", s, count=1, flags=re.S)
        s = s.replace("</style>", ".phone-only{display:none}\n@media (max-width:760px){.shards{display:none}.phone-only{display:block}}\n</style>", 1)
    s = s.replace('<p class="credits" data-copy-exempt>', f'<p class="credits" data-copy-exempt>Angle study {key.upper()}: {name}. ', 1)
    out = ROOT / f"site/b2-angle-{key}/index.html"
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(s)
    print("wrote", out.relative_to(ROOT))
