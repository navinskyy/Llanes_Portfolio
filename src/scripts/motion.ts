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

/** Cover-only motion: the character's idle and the PRESS START glow (paused
 *  while the cover is off screen), plus hover feedback. The cover's scenery
 *  is driven by initScenes like every other chapter's. */
function initCoverMotion(root: HTMLElement) {
  const loops: JSAnimation[] = [];

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
      animate(icons, { translateY: [{ to: -3 }, { to: 0 }], duration: 240, delay: stagger(60, { start: 80 }), ease: steps(2) });
    });
  }
}

// ---------- scenery ----------
// Sprites are <svg> elements, which have their own x/y attributes, so motion
// here always names translateX/translateY rather than the x/y shorthands.

const rand = (min: number, max: number) => min + Math.random() * (max - min);

/** The looping pieces of one scene, built the first time it comes into view. */
function sceneLoops(scene: HTMLElement): JSAnimation[] {
  const loops: JSAnimation[] = [];
  const all = (sel: string) => scene.querySelectorAll<HTMLElement>(sel);

  // Props bob in whole steps.
  all('[data-float]').forEach((el, i) => {
    const d = Number(el.dataset.float) || 6;
    loops.push(
      animate(el, { translateY: [0, -d], duration: 2200 + i * 340, ease: steps(Math.max(2, d / 2)), loop: true, alternate: true }),
    );
  });
  // Ships, drones and clouds cross a short stretch of sky and back.
  all('[data-drift]').forEach((el) => {
    const d = Number(el.dataset.drift) || 64;
    loops.push(
      animate(el, { translateX: [0, d], duration: Math.abs(d) * 140, ease: steps(Math.round(Math.abs(d) / 4)), loop: true, alternate: true }),
    );
  });
  // Windows, LEDs and beacons flicker at their own pace.
  all('[data-blink]').forEach((el) => {
    loops.push(
      animate(el, {
        opacity: [1, 0.15],
        duration: rand(500, 1800),
        delay: rand(0, 2000),
        ease: steps(1),
        loop: true,
        alternate: true,
      }),
    );
  });
  // Lights and checkpoints breathe.
  all('[data-pulse]').forEach((el, i) => {
    loops.push(
      animate(el, { opacity: [0.45, 1], duration: 1600 + i * 120, ease: 'inOutSine', loop: true, alternate: true }),
    );
  });
  // Fireflies rise and fade, then start again.
  all('[data-rise]').forEach((el) => {
    const d = Number(el.dataset.rise) || 80;
    loops.push(
      animate(el, {
        translateY: [0, -d],
        opacity: [{ to: 0.8 }, { to: 0 }],
        duration: rand(3600, 6200),
        delay: rand(0, 3000),
        ease: steps(Math.round(d / 4)),
        loop: true,
      }),
    );
  });
  // Now and then, a shooting star.
  all('[data-shoot]').forEach((el) => {
    loops.push(
      animate(el, {
        translateX: [0, 300],
        translateY: [0, 120],
        opacity: [{ to: 1 }, { to: 0 }],
        duration: 900,
        delay: rand(1500, 5000),
        loopDelay: rand(6000, 11000),
        ease: 'inQuad',
        loop: true,
      }),
    );
  });
  return loops;
}

/** Scenery behind every chapter: loops start when a scene first scrolls into
 *  view and pause whenever it leaves; chapter scenes fade in once as you
 *  arrive; [data-depth] layers drift with scroll on large screens with a
 *  mouse, in whole 4px steps so they stay on the pixel grid. */
export function initScenes() {
  const scenes = [...document.querySelectorAll<HTMLElement>('[data-scene]')];
  if (!scenes.length) return;
  if (prefersReducedMotion() || !('IntersectionObserver' in window)) return markShown(scenes);

  const loops = new Map<HTMLElement, JSAnimation[]>();
  const visible = new Set<HTMLElement>();
  const parallax = window.matchMedia('(min-width: 861px) and (pointer: fine)').matches;

  let queued = false;
  const update = () => {
    queued = false;
    const vh = window.innerHeight;
    // Read every layer first, then write, so the browser lays out once.
    const moves: [HTMLElement, number][] = [];
    for (const scene of visible) {
      scene.querySelectorAll<HTMLElement>('[data-depth]').forEach((layer) => {
        // Measured from the layer's own resting place, so it sits where it was
        // designed when it crosses the middle of the screen; −1…1 either side.
        const box = layer.getBoundingClientRect();
        const rest = box.top - Number(layer.dataset.py ?? 0) + box.height / 2;
        const p = Math.max(-1, Math.min(1, (vh / 2 - rest) / vh));
        moves.push([layer, Math.round((p * Number(layer.dataset.depth) * 32) / 4) * 4]);
      });
    }
    for (const [layer, y] of moves) {
      layer.dataset.py = String(y);
      layer.style.transform = `translate3d(0, ${y}px, 0)`;
    }
  };
  const schedule = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(update);
  };

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const scene = entry.target as HTMLElement;
        if (entry.isIntersecting) {
          if (!loops.has(scene)) {
            loops.set(scene, sceneLoops(scene));
            arrive(scene);
          }
          loops.get(scene)!.forEach((a) => a.play());
          visible.add(scene);
        } else {
          loops.get(scene)?.forEach((a) => a.pause());
          visible.delete(scene);
        }
      }
      if (parallax) schedule();
    },
    { rootMargin: '80px 0px' },
  );
  scenes.forEach((s) => io.observe(s));
  if (parallax) {
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });
  }
}

/** A chapter's scenery fades in on arrival and its ground rises into place. */
function arrive(scene: HTMLElement) {
  if (scene.closest('[data-intro]')) return markShown([scene]);
  animate(scene, { opacity: [0, 1], duration: 900, ease: steps(6), onComplete: () => markShown([scene]) });
  const ground = scene.querySelectorAll<HTMLElement>('[data-ground]');
  if (ground.length) animate(ground, { y: [24, 0], duration: 700, ease: steps(6) });
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
