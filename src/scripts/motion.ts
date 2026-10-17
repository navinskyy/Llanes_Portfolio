// Anime.js motion for the keycap world.
//
// Visibility contract: content is visible by default. The inline head script
// adds `motion-ok` to <html> only when JS runs and reduced motion is off; CSS
// then pre-hides [data-intro] / [data-reveal] items, and these functions bring
// them in. A safety timer in main.ts removes the hiding if anything fails.
import { animate, stagger, createTimeline } from 'animejs';
import { prefersReducedMotion } from './motion-prefs';

type Revertible = { revert: () => unknown };

/** Home focal moment: the name types in as keystrokes, then the rest settles. */
export function playIntro(): () => void {
  const root = document.querySelector<HTMLElement>('[data-intro-root]');
  if (!root || prefersReducedMotion()) return () => {};

  const letters = root.querySelectorAll<HTMLElement>('[data-intro-letter]');
  const rest = root.querySelectorAll<HTMLElement>('[data-intro]');

  const tl = createTimeline({ defaults: { ease: 'outExpo' } })
    .add(letters, {
      opacity: [0, 1],
      y: ['-0.18em', '0em'],
      duration: 380,
      delay: stagger(85),
    })
    .add(
      rest,
      {
        opacity: [0, 1],
        y: [12, 0],
        duration: 620,
        delay: stagger(60),
      },
      '-=240',
    );

  return () => tl.revert();
}

/** Sibling stagger for lists, triggered when the list scrolls into view. */
export function initReveals(): () => void {
  const groups = document.querySelectorAll<HTMLElement>('[data-reveal-group]');
  if (!groups.length) return () => {};
  if (prefersReducedMotion() || !('IntersectionObserver' in window)) return () => {};

  const running: Revertible[] = [];
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        io.unobserve(entry.target);
        const items = entry.target.querySelectorAll<HTMLElement>('[data-reveal]');
        running.push(
          animate(items, {
            opacity: [0, 1],
            y: [16, 0],
            duration: 560,
            // Cap the total stagger so long lists don't drag.
            delay: stagger(Math.min(70, 420 / Math.max(items.length, 1))),
            ease: 'outExpo',
            onComplete: () => items.forEach((el) => el.setAttribute('data-revealed', '')),
          }),
        );
      }
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0.05 },
  );
  groups.forEach((g) => io.observe(g));

  return () => {
    io.disconnect();
    running.forEach((a) => a.revert());
  };
}

/** Physical key press feedback on an on-screen keycap. */
export function pressCap(el: HTMLElement): Promise<void> {
  if (prefersReducedMotion()) return Promise.resolve();
  el.classList.add('is-down');
  return new Promise((resolve) => {
    window.setTimeout(() => {
      el.classList.remove('is-down');
      resolve();
    }, 140);
  });
}
