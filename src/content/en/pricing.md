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

  - type: tiers
    detail: matrix
    heading: Shield comparison
    heading_visible: false
    first_step_aria: Separate first step
    table_aria: Shield pricing comparison; scroll to see all inclusions
    table_caption: Shield prices and included services
    included_label: Included
    first_step:
      ref: offer_first_step
      body: Risk assessment · Threat model built together · Urgent first aid within scope.
      credit: Counts toward a Shield if Shield work begins within 30 days of Assessment completion.
    tiers:
      - name: "{shared:offers.shield.name}"
        price_key: personalShield
        for: One person
      - name: "{shared:offers.two.name}"
        price_key: shieldForTwo
        for: Two people
      - name: "{shared:offers.inner.name}"
        price_key: innerCircle
        for: Up to four people
    matrix_rows:
      - label: Everyday devices
        cells: [Up to 3, Up to 6 · pooled, Up to 12 · pooled]
      - label: Security keys supplied, configured and tested
        cells: ["2", "4", "8"]
      - label: Review visit at 12 months
        cells: [Not included, Not included, Included]
    shared_heading: Included in every Shield
    shared_items:
      - Device and account hardening
      - Sign-in, recovery and sharing
      - Core-account setup and essential migration where needed
      - Teaching and a private work record
      - One home network and router
      - Follow-up visit at about four weeks
      - 60-day question line; replies within one working day
      - Lawyer or family-office coordination, when authorized
    services_heading: Apps and accounts we help secure
    services_note: Examples of everyday services in scope.
    icons_credit_label: "Icons and licenses:"
    marks_note: Product names and marks belong to their owners.
    icon_sources:
      - name: Simple Icons
        link: {label: "Simple Icons (CC0)", href: https://github.com/simple-icons/simple-icons, kind: external}
        license: CC0
      - name: Developer Icons
        link: {label: "Developer Icons (MIT)", href: https://github.com/xandemon/developer-icons, kind: external}
        license: MIT
    services:
      - {name: WhatsApp, icon: whatsapp}
      - {name: Messenger, icon: messenger}
      - {name: Outlook, icon: outlook}
      - {name: Gmail, icon: gmail}
      - {name: Chrome, icon: googlechrome}
      - {name: Safari, icon: safari}
      - {name: Instagram, icon: instagram}
      - {name: Facebook, icon: facebook}
      - {name: Photos, icon: googlephotos}
      - {name: iCloud, icon: icloud}
      - {name: Waze, icon: waze}
      - {name: Maps, icon: googlemaps}
    more_label: Other pricing and conditions
    notes:
      - "**Assessment credit:** The {price:assessment} Assessment counts toward Shield work started within {fact:credit.windowDays} days."
      - "**Remaining balances:** Personal Shield {price:balanceShield} · Personal Shield for Two {price:balanceTwo} · Inner Circle {price:balanceInnerCircle}."
      - "**Larger engagements:** Larger households, several residences or household staff: one fixed price agreed in writing after the Assessment, from {price:largerFrom}."
      - "**Annual Care:** For past clients after the question line: one person {price:annualCareOne} a year · two people {price:annualCareTwo} a year · household of up to four {price:annualCareHousehold} a year."
      - "**Urgent visits:** {shared:common.availability} Surcharge {price:urgentSurcharge}; weekends and holidays {price:urgentSurchargeWeekend}, replacing the ordinary surcharge."
    link:
      label: "{shared:labels.conditions}"
      href: /en/conditions/
      kind: more

  - type: contact
    ref: contact
---
