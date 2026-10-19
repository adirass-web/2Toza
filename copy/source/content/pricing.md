---
page: pricing
title: Pricing — Toza
description: "Toza's fees. {shared:common.one_first_step}"
permalink: /en/pricing/index.html
lang: en
dir: ltr

blocks:
  - type: hero
    heading: "{shared:pricing.heading}"
    lead: "{shared:pricing.lead}"
    byline: none
    actions: [whatsapp, signal, callback]

  - type: price-strip
    ref: price_strip
    label: Three stages and their prices.
    stage_names: true

  - type: tiers
    detail: full
    heading: "{ui:ui.compareServices}"
    heading_visible: false
    statement: "{shared:pricing.method}"
    first_step:
      ref: offer_first_step
    tiers:
      - name: "{shared:offers.shield.name}"
        price_key: personalShield
        for: "{shared:offers.shield.for}"
        items:
          - "{shared:offers.shield.items.0}"
          - "{shared:offers.shield.items.1}"
          - "{shared:offers.shield.items.2}"
      - name: "{shared:offers.two.name}"
        price_key: shieldForTwo
        for: "{shared:offers.two.for}"
        items:
          - "{shared:offers.two.items.0}"
          - "{shared:offers.two.items.1}"
          - "{shared:offers.two.items.2}"
      - name: "{shared:offers.inner.name}"
        price_key: innerCircle
        for: "{shared:offers.inner.for}"
        items:
          - "{shared:offers.inner.items.0}"
          - "{shared:offers.inner.items.1}"
          - "{shared:offers.inner.items.2}"
    notes:
      - "{shared:offers.under_all}"
      - "{shared:offers.larger}"
      - "{shared:offers.care}"
    link:
      label: "{shared:labels.conditions}"
      href: /en/conditions/
      kind: more

  - type: contact
    ref: contact
---
