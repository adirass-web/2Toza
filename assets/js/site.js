(function () {
  'use strict';
  var button = document.querySelector('[data-nav-toggle]');
  var menu = document.getElementById('site-menu');
  function closeMenu() { if (menu && button) {menu.classList.remove('open'); button.setAttribute('aria-expanded', 'false');} }
  if (button && menu) {
    button.addEventListener('click', function () {button.setAttribute('aria-expanded', String(menu.classList.toggle('open')));});
    menu.addEventListener('click', function (event) {if (event.target.closest('a')) closeMenu();});
    document.addEventListener('keydown', function (event) {if (event.key === 'Escape' && menu.classList.contains('open')) {closeMenu(); button.focus();}});
  }
  var toggle = document.querySelector('[data-faq-toggle-all]');
  var details = Array.from(document.querySelectorAll('.faq details'));
  function syncToggle() {
    if (!toggle) return;
    var allOpen = details.length > 0 && details.every(function (item) {return item.open;});
    toggle.setAttribute('aria-expanded', String(allOpen));
    toggle.textContent = allOpen ? toggle.dataset.closeLabel : toggle.dataset.openLabel;
  }
  if (toggle) {
    toggle.addEventListener('click', function () {
      var open = !details.every(function (item) {return item.open;});
      details.forEach(function (item) {item.open = open;}); syncToggle();
    });
    details.forEach(function (item) {item.addEventListener('toggle', syncToggle);});
  }
  var detailToggle = document.querySelector('[data-expand-details]');
  var supporting = Array.from(document.querySelectorAll('main details:not(.faq details)'));
  function syncDetails() {
    if (!detailToggle) return;
    var allOpen = supporting.length > 0 && supporting.every(function (item) {return item.open;});
    detailToggle.setAttribute('aria-expanded', String(allOpen));
    detailToggle.textContent = allOpen ? 'Close supporting details' : 'Show all details';
  }
  if (detailToggle) {
    detailToggle.addEventListener('click', function () {
      var open = !supporting.every(function (item) {return item.open;});
      supporting.forEach(function (item) {item.open = open;}); syncDetails();
    });
    supporting.forEach(function (item) {item.addEventListener('toggle', syncDetails);});
  }
  function revealAnchor() {
    var id; try {id = decodeURIComponent(location.hash.slice(1));} catch (_) {return;}
    if (!id) return;
    var target = document.getElementById(id);
    if (!target) return;
    for (var parent = target; parent; parent = parent.parentElement) {if (parent.tagName === 'DETAILS') parent.open = true;}
    var disclosure = target.querySelector('.section-disclosure'); if (disclosure) disclosure.open = true;
    if (target.matches('.faq')) target.querySelectorAll('details').forEach(function (item) {item.open = true;});
    syncToggle(); syncDetails();
    requestAnimationFrame(function () {target.scrollIntoView();});
  }
  window.addEventListener('hashchange', revealAnchor); revealAnchor();
  // Print the complete information and restore the reader's chosen disclosure state.
  var printState;
  window.addEventListener('beforeprint', function () {
    printState = Array.from(document.querySelectorAll('main details')).map(function (item) {return [item, item.open];});
    printState.forEach(function (entry) {entry[0].open = true;});
  });
  window.addEventListener('afterprint', function () {
    if (printState) printState.forEach(function (entry) {entry[0].open = entry[1];});
    printState = null; syncToggle(); syncDetails();
  });
})();
