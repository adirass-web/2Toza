/** One finite narrative sequence; SVG remains fully visible without animation. */
export function orbitalSequence(svg, onUpdate = () => {}) {
  const keys = ['location', 'photos', 'bluetooth'];
  const signals = keys.map(key => svg.querySelector(`#signal-${key}`));
  const sources = keys.map(key => svg.querySelector(`#source-${key}`));
  const packets = keys.map(key => svg.querySelector(`#packet-${key}`));
  const lengths = signals.map(path => path.getTotalLength());
  const result = svg.querySelector('#where-result');
  const fusion = svg.querySelector('#fusion');
  const phone = svg.querySelector('#phone');
  const phoneTransform = phone.getAttribute('transform');
  let frame = 0, started = 0, progress = 1, pausedAt = 0, playing = false;
  const duration = 7800;
  const clamp = v => Math.max(0, Math.min(1, v));
  const ease = v => {v = clamp(v); return v * v * (3 - 2 * v)};
  function render(value) {
    progress = clamp(value);
    const time = progress * 7.8;
    phone.setAttribute('transform', `translate(0 ${18 * (1-ease(time))}) ${phoneTransform}`);
    sources.forEach((source, i) => {
      const activation = ease((time-i*.65)/.7);
      source.style.opacity = .22 + .78 * activation;
      source.classList.toggle('awake', activation > .6);
      const travel = clamp((time-2.5-i*.28)/2.1);
      signals[i].style.strokeDasharray = `${lengths[i]} ${lengths[i]}`;
      signals[i].style.strokeDashoffset = lengths[i] * (1-ease(travel));
      signals[i].style.opacity = .95;
      const point = signals[i].getPointAtLength(lengths[i]*ease(travel));
      packets[i].setAttribute('cx', point.x);
      packets[i].setAttribute('cy', point.y);
      packets[i].style.opacity = travel > 0 && travel < 1 ? '1' : '0';
    });
    const reveal = ease((time-5.2)/1.15);
    fusion.style.opacity = reveal;
    result.style.opacity = reveal;
    result.setAttribute('transform', `translate(${12*(1-reveal)} 0)`);
    const stage = time < .65 ? 'Location' : time < 1.3 ? 'Photos' : time < 2.5 ? 'Bluetooth' : time < 5.2 ? 'Connecting traces' : 'Where';
    onUpdate({progress, playing, stage});
  }
  function pause() {cancelAnimationFrame(frame); frame=0; playing=false; pausedAt=progress*duration; onUpdate({progress,playing,stage:progress>=.67?'Where':'Paused'})}
  function tick(now) {render((now-started)/duration);if(progress<1&&playing)frame=requestAnimationFrame(tick);else {playing=false;frame=0;onUpdate({progress,playing,stage:'Where'})}}
  function play(restart=true) {pause(); if(restart||progress>=1)pausedAt=0;playing=true;started=performance.now()-pausedAt;frame=requestAnimationFrame(tick)}
  function seek(value) {pause();render(value)}
  render(1);
  return {play,pause,seek,destroy(){pause();phone.setAttribute('transform',phoneTransform)}};
}
