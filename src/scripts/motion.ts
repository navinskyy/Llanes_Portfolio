// Anime.js motion for the drawing set.
//
// Visibility contract: content is visible by default. The inline head script
// adds `motion-ok` to <html> only when JS runs and reduced motion is off; CSS
// then pre-hides [data-intro] / [data-intro-letter] / [data-reveal] items, and
// these functions bring them in and mark them [data-shown]. A safety timer in
// the head removes the hiding if this bundle never boots.
import { animate, stagger, createTimeline } from 'animejs';
import { prefersReducedMotion } from './motion-prefs';

const markShown = (els: Iterable<Element>) => {
  for (const el of els) el.setAttribute('data-shown', '');
};

/** The cover sheet's one authored moment: the name rises out of its baseline,
 *  then a dimension line draws outward from the centre to measure it. */
export function playIntro(): () => void {
  const root = document.querySelector<HTMLElement>('[data-intro-root]');
  if (!root || prefersReducedMotion()) return () => {};

  const letters = root.querySelectorAll<HTMLElement>('[data-intro-letter]');
  const dim = root.querySelector<HTMLElement>('[data-intro-dim]');
  const dimLine = dim?.querySelector<HTMLElement>('.dim-line');
  const rest = root.querySelectorAll<HTMLElement>('[data-intro]');

  const tl = createTimeline({ defaults: { ease: 'outExpo' } });
  tl.add(letters, {
    y: ['105%', '0%'],
    duration: 900,
    delay: stagger(70),
    onComplete: () => markShown(letters),
  });
  if (dimLine) {
    tl.add(
      dimLine,
      { scaleX: [0, 1], duration: 900, ease: 'inOutExpo', onComplete: () => dim?.setAttribute('data-shown', '') },
      '-=520',
    );
  }
  tl.add(
    rest,
    {
      opacity: [0, 1],
      y: [14, 0],
      duration: 700,
      delay: stagger(70),
      onComplete: () => markShown(rest),
    },
    '-=500',
  );

  return () => tl.pause();
}

/** Sibling stagger for lists, played once when the list scrolls into view.
 *  `data-reveal-group="plates"` wipes figures down like a sheet being printed;
 *  every other group settles its rows upward. */
export function initReveals(): () => void {
  const groups = document.querySelectorAll<HTMLElement>('[data-reveal-group]');
  if (!groups.length || prefersReducedMotion() || !('IntersectionObserver' in window)) return () => {};

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        io.unobserve(entry.target);
        const group = entry.target as HTMLElement;
        const items = group.querySelectorAll<HTMLElement>(':scope > [data-reveal]');
        // Cap the total stagger so long lists don't drag.
        const each = Math.min(70, 480 / Math.max(items.length, 1));
        const done = () => markShown(items);
        if (group.dataset.revealGroup === 'plates') {
          animate(items, {
            opacity: [0, 1],
            clipPath: ['inset(0% 0% 100% 0%)', 'inset(0% 0% 0% 0%)'],
            duration: 1000,
            delay: stagger(120),
            ease: 'outExpo',
            onComplete: done,
          });
        } else {
          animate(items, {
            opacity: [0, 1],
            y: [14, 0],
            duration: 640,
            delay: stagger(each),
            ease: 'outExpo',
            onComplete: done,
          });
        }
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.01 },
  );
  groups.forEach((g) => io.observe(g));
  return () => io.disconnect();
}
