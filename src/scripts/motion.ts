// Anime.js motion, used sparingly.
//
// Visibility contract: content is visible by default. The inline head script
// adds `motion-ok` to <html> only when JS runs and reduced motion is off; CSS
// then pre-hides [data-reveal] items, [data-letter] title letters and the
// [data-portrait] until these functions bring them in.
import { animate, stagger, steps, type JSAnimation } from 'animejs';
import { prefersReducedMotion } from './motion-prefs';

const markShown = (els: Iterable<Element>) => {
  for (const el of els) el.setAttribute('data-shown', '');
};

/** Cover: the title steps in letter by letter, the rest settles in, the
 *  portrait is drawn in top to bottom, then the status line starts typing. */
export function playIntro() {
  const root = document.querySelector<HTMLElement>('[data-intro]');
  if (!root) return;
  const items = root.querySelectorAll<HTMLElement>('[data-reveal]');
  const letters = root.querySelectorAll<HTMLElement>('[data-letter]');
  const portrait = root.querySelectorAll<HTMLElement>('[data-portrait]');
  if (prefersReducedMotion()) return markShown([...items, ...letters, ...portrait]);

  animate(letters, {
    opacity: [0, 1],
    y: [-28, 0],
    duration: 360,
    delay: stagger(55, { start: 40 }),
    ease: steps(4),
    onComplete: () => markShown(letters),
  });
  animate(items, {
    opacity: [0, 1],
    y: [12, 0],
    duration: 650,
    delay: stagger(80, { start: 360 }),
    // Pixel worlds move in whole steps.
    ease: steps(6),
    onComplete: () => markShown(items),
  });
  // The sprite appears as if a CRT were drawing it, eight rows at a time.
  animate(portrait, {
    clipPath: ['inset(100% 0% 0% 0%)', 'inset(0% 0% 0% 0%)'],
    duration: 640,
    delay: 760,
    ease: steps(8),
    onComplete: () => markShown(portrait),
  });
  typeStatus(1500);
  initCoverMotion(root);
}

/** Types the status lines in turn: type, hold, erase, next. */
function typeStatus(delay: number) {
  const el = document.querySelector<HTMLElement>('[data-type]');
  if (!el) return;
  // The typed copy is aria-hidden; a visually hidden twin carries the text.
  const lines: string[] = JSON.parse(el.dataset.lines ?? '[]');
  if (!lines.length) return;
  let line = 0;
  let i = 0;
  let erasing = false;
  el.textContent = '';
  const tick = () => {
    const text = lines[line];
    if (!erasing) {
      el.textContent = text.slice(0, ++i);
      if (i < text.length) return void window.setTimeout(tick, 42);
      if (lines.length < 2) return;
      erasing = true;
      return void window.setTimeout(tick, 2800);
    }
    el.textContent = text.slice(0, --i);
    if (i > 0) return void window.setTimeout(tick, 18);
    erasing = false;
    line = (line + 1) % lines.length;
    window.setTimeout(tick, 420);
  };
  window.setTimeout(tick, delay);
}

/** Cover ambience and hover feedback. Looping pieces pause whenever the cover
 *  is off screen, so they cost nothing while reading the chapters. */
function initCoverMotion(root: HTMLElement) {
  const loops: JSAnimation[] = [];

  root.querySelectorAll<HTMLElement>('[data-float]').forEach((el, i) => {
    const dist = Number(el.dataset.float) || 6;
    loops.push(
      animate(el, {
        y: [0, -dist],
        duration: 2200 + i * 340,
        ease: steps(Math.max(2, dist / 2)),
        loop: true,
        alternate: true,
      }),
    );
  });
  root.querySelectorAll<HTMLElement>('[data-drift]').forEach((el) => {
    loops.push(animate(el, { x: [0, 64], y: [0, -6], duration: 9000, ease: steps(24), loop: true, alternate: true }));
  });
  // The character idles: a one-pixel breath.
  root.querySelectorAll<HTMLElement>('[data-bob]').forEach((el) => {
    loops.push(animate(el, { y: [0, -3], duration: 1100, ease: steps(1), loop: true, alternate: true }));
  });
  // PRESS START glows softly, the one lit option on the menu.
  root.querySelectorAll<HTMLElement>('[data-glow]').forEach((el) => {
    loops.push(
      animate(el, {
        filter: ['drop-shadow(0px 0px 0px rgba(242,184,75,0))', 'drop-shadow(0px 0px 12px rgba(242,184,75,0.45))'],
        duration: 1400,
        ease: 'inOutSine',
        loop: true,
        alternate: true,
      }),
    );
  });

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => {
      for (const a of loops) entry.isIntersecting ? a.play() : a.pause();
    }).observe(root);
  }

  // Menu: the selection cursor slides in beside the option under the pointer.
  root.querySelectorAll<HTMLElement>('[data-menu] .key').forEach((key) => {
    const cur = key.querySelector<HTMLElement>('.cur');
    if (!cur) return;
    const select = () => animate(cur, { x: [-8, 0], duration: 180, ease: steps(3) });
    key.addEventListener('pointerenter', select);
    key.addEventListener('focus', select);
  });

  // Character panel: the sprite hops and the stat icons answer in turn.
  const card = root.querySelector<HTMLElement>('[data-card]');
  const sprite = root.querySelector<HTMLElement>('[data-portrait]');
  if (card && sprite) {
    const icons = card.querySelectorAll<SVGElement>('.stat-icon');
    let busy = false;
    card.addEventListener('pointerenter', () => {
      if (busy) return;
      busy = true;
      animate(sprite, {
        y: [{ to: -8 }, { to: 0 }],
        duration: 420,
        ease: steps(4),
        onComplete: () => (busy = false),
      });
      animate(icons, { y: [{ to: -3 }, { to: 0 }], duration: 240, delay: stagger(60, { start: 80 }), ease: steps(2) });
    });
  }
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
