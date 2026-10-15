// Pricing-only supplement. site.js remains the single nav/hash/print owner.
(function () {
  'use strict';
  document.addEventListener('click', function (event) {
    var link = event.target.closest('a[href^="#"]');
    if (!link || !link.closest('main')) return;
    var id;
    try {id = decodeURIComponent(link.getAttribute('href').slice(1));} catch (_) {return;}
    var target = document.getElementById(id);
    for (var node = target; node; node = node.parentElement) {
      if (node.tagName === 'DETAILS') node.open = true;
    }
  });
})();
