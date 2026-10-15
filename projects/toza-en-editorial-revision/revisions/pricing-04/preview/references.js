/* Native disclosure enhancements: reveal linked terms and print every word. */
(() => {
  const reveal = (hash = location.hash) => {
    const target = document.getElementById(decodeURIComponent(hash.slice(1)));
    if (target?.matches('details')) target.open = true;
    for (let node = target?.parentElement; node; node = node.parentElement) {
      if (node.matches('details')) node.open = true;
    }
  };
  window.addEventListener('hashchange', () => reveal());
  document.addEventListener('click', event => {
    const link = event.target.closest('a[href^="#"]');
    if (link) reveal(link.getAttribute('href'));
  });
  reveal();
  let previous = [];
  window.addEventListener('beforeprint', () => {
    previous = [...document.querySelectorAll('details')].map(node => [node, node.open]);
    previous.forEach(([node]) => { node.open = true; });
  });
  window.addEventListener('afterprint', () => previous.forEach(([node, open]) => { node.open = open; }));
})();
