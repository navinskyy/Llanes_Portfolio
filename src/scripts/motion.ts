// Anime.js motion, used sparingly.
//
// Visibility contract: content is visible by default. The inline head script
// adds `motion-ok` to <html> only when JS runs and reduced motion is off; CSS
// then pre-hides [data-reveal] items until these functions bring them in.
import { animate, stagger, steps } from 'animejs';
import { prefersReducedMotion } from './motion-prefs';

const markShown = (els: Iterable<Element>) => {
  for (const el of els) el.setAttribute('data-shown', '');
};

/** Cover: the title and status window settle in, then the status line types. */
export function playIntro() {
  const items = document.querySelectorAll<HTMLElement>('[data-intro] [data-reveal]');
  if (!items.length) return;
  if (prefersReducedMotion()) return markShown(items);
  animate(items, {
    opacity: [0, 1],
    y: [12, 0],
    duration: 650,
    delay: stagger(80, { start: 60 }),
    // Pixel worlds move in whole steps.
    ease: steps(6),
    onComplete: () => markShown(items),
  });
  typeStatus(700);
}

/** Types the cover's status line once, character by character. */
function typeStatus(delay: number) {
  const el = document.querySelector<HTMLElement>('[data-type]');
  if (!el) return;
  // The typed copy is aria-hidden; a visually hidden twin carries the text.
  const text = el.textContent ?? '';
  el.textContent = '';
  let i = 0;
  const tick = () => {
    el.textContent = text.slice(0, ++i);
    if (i < text.length) window.setTimeout(tick, 38);
  };
  window.setTimeout(tick, delay);
}

/** Chapters: each block steps in once as it scrolls into view; item rows
 *  inside it follow one after another. */
export function initReveals() {
  const els = [...document.querySelectorAll<HTMLElement>('[data-reveal]')].filter((el) => !el.closest('[data-intro]'));
  if (!els.length) return;
  if (prefersReducedMotion() || !('IntersectionObserver' in window)) return markShown(els);
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;
        io.unobserve(el);
        animate(el, {
          opacity: [0, 1],
          y: [16, 0],
          duration: 520,
          ease: steps(5),
          onComplete: () => markShown([el]),
        });
        const rows = el.querySelectorAll<HTMLElement>('[data-reveal-item]');
        if (rows.length) {
          animate(rows, {
            opacity: [0, 1],
            x: [-12, 0],
            duration: 420,
            delay: stagger(90, { start: 160 }),
            ease: steps(4),
          });
        }
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.01 },
  );
  els.forEach((el) => io.observe(el));
}
