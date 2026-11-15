// Reuse the project's Motion play-once pattern; content is complete before enhancement.
import { animate } from 'motion/mini';
import { inView } from 'motion';

const preference = matchMedia('(prefers-reduced-motion: reduce)');
const played = new WeakSet();
const targets = document.querySelectorAll('.en-situation-image, .pricing-option');
let stop = () => {};

function start() {
  stop();
  stop = () => {};
  if (preference.matches || !('IntersectionObserver' in window)) return;
  const disposers = [];
  for (const element of targets) {
    if (played.has(element)) continue;
    disposers.push(inView(element, () => {
      if (played.has(element)) return;
      played.add(element);
      const animation = animate(element, { opacity: [.85, 1], transform: ['translateY(8px)', 'translateY(0)'] }, { duration: .4, ease: 'easeOut' });
      const clear = () => { animation.cancel(); element.style.removeProperty('opacity'); element.style.removeProperty('transform'); };
      disposers.push(clear);
      animation.then(clear);
    }, { amount: .15 }));
  }
  stop = () => disposers.forEach(dispose => dispose());
}

try { start(); preference.addEventListener('change', start); addEventListener('beforeprint', stop); } catch { stop(); }
