---
page: home
title: Toza — Private, in-person digital security
description: Private, in-person digital security for people whose private information could be used against them.
permalink: /en/index.html
lang: en
dir: ltr

blocks:
  - type: hero
    layout: box
    heading: Before private information becomes leverage.
    lead: Private conversations, finances and plans can become leverage over you. Toza assesses and hardens your phone, computer and accounts with you, in person.
    byline: none
    promise: true

  - type: situation-doors
    layout: box
    id: situations
    heading: Where this usually begins.
    items:
      - title: Separation or divorce
        line: What still connects your digital lives.
        href: /en/separation-divorce/
      - title: Business or founder dispute
        line: Where personal and business access still meet.
        href: /en/business-dispute/
      - title: Inheritance conflict
        line: Family arrangements that outlived the trust.
        href: /en/inheritance-conflict/
      - title: Someone knows something
        line: Private information has surfaced. {shared:common.start_checked}
        href: /en/they-know-something/
    aside: Or before anything happens. You don't need a known incident to begin.

  - type: method-statement
    id: how
    layout: box
    statement: "{shared:method}"
    links:
      - label: "Why Toza?"
        href: /en/about/
        kind: more

  - type: specimen
    layout: box
    ref: specimen

  - type: tiers
    layout: box
    detail: full
    heading: "{shared:pricing.heading}"
    heading_visible: true
    statement: "{shared:pricing.lead}"
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
      label: "{shared:labels.all_tiers}"
      href: /en/pricing/
      kind: more

  - type: contact
    layout: box
    ref: contact
---
