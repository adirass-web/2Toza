---
page: pricing
title: Pricing — Toza
description: "Toza's fees. {shared:common.one_first_step}"
permalink: /en/pricing/index.html
lang: en
dir: ltr

# Pages v2 (strategy/PAGES-pricing-howitworks-outline.md, owner-approved): first step as one row, one
# comparison table, larger households, Annual Care, payment, Conditions. New and moved lines:
# strategy/copy/PAGES-V2-COPY.md.
blocks:
  - type: hero
    heading: "{shared:pricing.heading}"
    lead: "{shared:pricing.lead}"
    byline: none
    actions: [whatsapp, signal, callback]

  - type: offer
    id: first-step
    tag: "{shared:labels.first_step}"
    name: "{shared:offers.assessment.name}"
    price_key: assessment
    body: "{shared:offers.assessment.body}"
    credit: "{shared:offers.assessment.credit}"

  - type: comparison
    id: tiers
    heading: Then the protection that fits your household.
    heading_visible: true
    columns:
      - name: "{shared:offers.shield.name}"
        price_key: personalShield
      - name: "{shared:offers.two.name}"
        price_key: shieldForTwo
      - name: "{shared:offers.inner.name}"
        price_key: innerCircle
    rows:
      - label: Who it covers
        cells: [One person, You and one other person, "{shared:common.household_four}"]
      - label: "Everyday devices (up to {factword:devicesPerPerson} per person)"
        cells: ["{Factword:devicesPerPerson}", "{Factword:devicesPerPerson*2}", "{Factword:devicesPerPerson*4}"]
      - label: Home network and router
        cells: [Included, Included, Included]
      - label: Security keys, supplied, configured and tested
        cells: ["{Factword:securityKeys.personalShield}", "{Factword:securityKeys.shieldForTwo}", "{Factword:securityKeys.innerCircle}"]
      - label: Follow-up visit
        cells: [After about four weeks, After about four weeks, After about four weeks]
      - label: Questions answered by WhatsApp or Signal
        cells: ["{fact:questionLineDays} days", "{fact:questionLineDays} days", "{fact:questionLineDays} days"]
      - label: Review visit at twelve months
        cells: ["", "", Included]

  - type: details
    id: more
    heading: Larger households, Annual Care and payment
    items:
      - label: Beyond Inner Circle
        text: "{shared:offers.larger}"
      - label: Annual Care
        text: "{shared:common.care_includes} {shared:common.care_prices}"
      - label: How payment works
        text: "{shared:common.written_offer} {shared:common.paid_after}"
    link:
      label: "All terms: Conditions"
      href: /en/conditions/
      kind: more

  - type: contact
    ref: contact
---
