#!/usr/bin/env python3
"""Builds the two Study G demo pages (site/primes/, site/h2/) from one template.
Every visible string is verbatim frozen copy (D58); exempt items carry data-copy-exempt."""
import json, pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
C = json.loads((ROOT / "copy/source/data/contact.json").read_text())
WA, SG, CB = C["whatsapp"]["url"], C["signal"]["url"], C["callback"]["url"]

def ctas(cls=""):
    return (f'<div class="ctas {cls}"><a class="btn" href="{WA}">WhatsApp</a>'
            f'<a class="btn ghost" href="{SG}">Signal</a>'
            f'<a class="btn ghost" href="{CB}">Call me back</a></div>')

H1_LINES = ["Before private information", "becomes leverage."]
def h1():
    return "<h1>" + " ".join(
        f'<span class="h1-line"><span class="mark" aria-hidden="true"></span><span class="ink">{l}</span></span>' + ("<br>" if i == 0 else "")
        for i, l in enumerate(H1_LINES)) + "</h1>"

LEAD = "Private conversations, finances and plans can become leverage over you. Toza assesses and hardens your phone, computer and accounts with you, in person."
PROMISE = "In person · With you present · You control your credentials"

def hero(kind):
    aside = f'<div class="aside"><p>{LEAD}</p>{ctas()}<p class="promise">{PROMISE}</p></div>'
    if kind == "primes":
        return f'''<section class="hero-primes" id="top">
  <div class="media"><picture><source media="(max-width:767px)" srcset="../img/hero-full-phone.jpg"><img src="../img/hero-full.jpg" alt="" width="1620" height="1080" fetchpriority="high"></picture></div>
  <div class="shade"></div>
  <div class="text grid">{h1()}{aside}</div>
</section>'''
    return f'''<section class="hero-h2" id="top">
  <div class="band"><picture><source media="(max-width:767px)" srcset="../img/hero-band-phone.jpg"><img src="../img/hero-band.jpg" alt="" width="1620" height="490" fetchpriority="high"></picture></div>
  <div class="text grid">{h1()}{aside}</div>
</section>'''

SITS = [
    ("Separation or divorce", "What still connects your digital lives.", "sit-1"),
    ("Business or founder dispute", "Where personal and business access still meet.", "sit-2"),
    ("Inheritance conflict", "Family arrangements that outlived the trust.", "sit-3"),
    ("Someone knows something", "Private information has surfaced. Start with what can be checked.", "sit-4"),
]
CLOSING = "Or before anything happens. You don't need a known incident to begin."

def situations():
    lst = "".join(f'<li class="sit"><img src="../img/{img}-phone.jpg" alt="" loading="lazy" width="900" height="1500"><h3>{t}</h3><p>{l}</p></li>' for t, l, img in SITS)
    layers = "".join(f'<div class="layer" aria-hidden="true"><img class="d" src="../img/{img}.jpg" alt="" loading="lazy" width="2400" height="1500"><img class="p" src="../img/{img}-phone.jpg" alt="" loading="lazy" width="900" height="1500"></div>' for _, _, img in SITS)
    caps = "".join(f'<div class="cap" aria-hidden="true"><h3>{t}</h3><p>{l}</p></div>' for t, l, _ in SITS)
    return f'''<section class="sits" id="situations" aria-labelledby="sits-h">
  <div class="head grid"><h2 id="sits-h">Where this usually begins.</h2></div>
  <ul class="sit-list">{lst}<li class="sit-close">{CLOSING}</li></ul>
  <div class="stage" aria-hidden="true">
    <div class="view">
      {layers}
      <div class="frame"></div>
      <p class="title">Where this usually begins.</p>
      {caps}
      <p class="closing">{CLOSING}</p>
      <div class="progress"><i></i><i></i><i></i><i></i></div>
    </div>
  </div>
</section>'''

METHOD = "Hardening is Toza's own method, developed from public guidance of government security agencies and security vendors."

TIERS = [
    ("t1", "Personal Shield", "₪32,000", "For one person. Your phone, computer, accounts and home network hardened around your risks.",
     ["Two security keys, configured and tested", "A follow-up visit after about four weeks", "Questions answered by WhatsApp or Signal for 60 days"]),
    ("t2", "Personal Shield for Two", "₪45,000", "For you and one other person.",
     ["Each person's phone, computer and accounts", "Your home network · four security keys", "Follow-up visit · 60 days of answered questions"]),
    ("t3", "Inner Circle", "₪70,000", "For a household of up to four.",
     ["Everyone's phones, computers and accounts, each kept private", "Your home network · eight security keys", "Follow-up visit · 60 days of answered questions · review visit at twelve months"]),
]

def fees():
    tiers = "".join(f'''<article class="tier {c} reveal" data-d="{i*90}"><h3>{n}</h3><p class="price">{p}</p><p class="for">{f}</p><ul>{"".join(f"<li>{x}</li>" for x in items)}</ul></article>''' for i, (c, n, p, f, items) in enumerate(TIERS))
    return f'''<section class="fees" id="pricing" aria-labelledby="fees-h">
  <div class="row">
    <div class="fees-intro"><span class="label sq">Pricing</span><h2 id="fees-h">Fees</h2><p>One first step, then the protection that fits your household. Each price is fixed and agreed in writing before work begins.</p></div>
    <div class="start on-mint reveal"><span class="label sq">Start here</span><p class="name">Private Exposure Assessment</p><p class="price">₪4,000</p><p>Counts in full toward your protection if you continue within 30 days.</p><p>A senior check-up of your digital life: half a day in person, urgent first aid on the spot, and a written exposure summary you keep whether or not you continue.</p></div>
    {tiers}
    <div class="notes"><p>The first step is included. If you authorize it, Toza coordinates with your lawyer or family office.</p><p>Larger households, several residences or household staff: one fixed price, set out after the first step, from ₪90,000.</p><p>After the 60 days: Annual Care for past clients, from ₪12,000 a year. <a href="#pricing">All protection tiers →</a></p></div>
  </div>
</section>'''

def close():
    return f'''<section class="close" id="contact" aria-labelledby="close-h">
  <div class="panel"><h2 id="close-h">Start with a private conversation.</h2><p>Your message receives a personal reply. The first conversation is free and commits you to nothing.</p>
    <div class="ctas"><a class="btn light" href="{WA}">WhatsApp</a><a class="btn ghost" href="{SG}">Signal</a><a class="btn ghost" href="{CB}">Call me back</a></div></div>
  <div class="hand"><img src="../img/close-hand.jpg" alt="" loading="lazy" width="900" height="893"></div>
  <div class="dots" aria-hidden="true"><canvas></canvas></div>
</section>'''

def page(kind):
    title = "Toza — Private, in-person digital security"
    return f'''<!doctype html>
<html lang="en" dir="ltr" class="no-js">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,nofollow">
<title>{title}</title>
<link rel="preload" href="../fonts/bona-nova-latin-400-italic.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="../fonts/bona-nova-latin-400-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="../css/study-g.css">
<script src="../js/motion.js" defer></script>
<script src="../js/study-g.js" defer></script>
</head>
<body class="page-{kind}">
<a class="skip" href="#main">Skip to content</a>
<header class="top">
  <a class="wordmark" href="#top" aria-label="Toza, home" data-copy-exempt><span class="latin">toza</span><span class="kanji" aria-hidden="true">閉ざす</span></a>
  <nav aria-label="Main"><a class="ch" href="{WA}">WhatsApp</a><a class="ch" href="{SG}">Signal</a><a class="ch" href="{CB}">Call me back</a><button class="menu-btn" type="button" data-menu aria-expanded="false">Menu</button></nav>
</header>
<div class="menu" role="dialog" aria-label="Menu"><button class="close" type="button" data-menu>Menu</button>
  <ul><li><a href="#situations">Situations</a></li><li><a href="#pricing">How it works</a></li><li><a href="#pricing">Pricing</a></li><li><a href="#contact">FAQ</a></li></ul></div>
<main id="main">
{hero(kind)}
{situations()}
<section class="method grid"><p>{METHOD}</p></section>
{fees()}
{close()}
</main>
<footer class="foot" aria-label="Footer">
  <ul><li><a href="#pricing">Pricing</a></li><li><a href="#contact">FAQ</a></li><li><a href="#contact">For attorneys</a></li><li><a href="#contact">Conditions</a></li><li><a href="#contact">About</a></li></ul>
  <p class="credits" data-copy-exempt>Photographs: T. Govedarovic, J. Lo, M. Charkhgard, Boston Public Library, A. Curcan, V. Gariev / Unsplash. Study G demo, light version (noindex).</p>
  <span class="giant" aria-hidden="true" data-copy-exempt>toza</span>
</footer>
<nav class="bar" aria-label="Footer"><a href="{WA}">WhatsApp</a><a href="{SG}">Signal</a><a href="{CB}">Call me back</a></nav>
</body>
</html>
'''

for kind in ("primes", "h2"):
    d = ROOT / "site" / kind
    d.mkdir(parents=True, exist_ok=True)
    (d / "index.html").write_text(page(kind))
    print("wrote", d / "index.html")
