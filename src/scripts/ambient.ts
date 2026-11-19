// The guide's air: one low-resolution canvas fixed behind every chapter.
//
// Three layers drift at different depths (far twinkling stars, mid dust, near
// glowing motes) plus the odd four-point glint. Every canvas pixel is one art
// pixel (ART_PX screen pixels), so particles share the scenery's grain.
//
// Layers move with scroll and, on mouse devices, lean away from the pointer;
// near motes are nudged aside by the cursor. The chapter at the middle of the
// screen sets the mood: how dense the air is and which colours new motes take.
//
// Cost: a few hundred fillRects at ~30 fps on a canvas a ninth of the screen's
// area. Nothing runs while the tab is hidden; reduced motion gets one still frame.
import { prefersReducedMotion } from './motion-prefs';

const ART_PX = 3;
const FRAME_MS = 1000 / 30;

type Rgb = string;
interface Star { x: number; y: number; c: Rgb; a: number; period: number; phase: number; cross: boolean }
interface Dust { x: number; y: number; vx: number; vy: number; c: Rgb; a: number }
interface Mote { x: number; y: number; vx: number; vy: number; ex: number; ey: number; c: Rgb; age: number; life: number }
interface Glint { x: number; y: number; c: Rgb; age: number; life: number }

/** Per chapter: air density (0–1) and the colours new motes and glints take. */
const MOODS: Record<string, { density: number; colors: string[] }> = {
  top: { density: 1, colors: ['violet', 'blue', 'fg'] },
  about: { density: 0.9, colors: ['violet', 'amber'] },
  projects: { density: 0.7, colors: ['amber', 'blue'] },
  journey: { density: 1, colors: ['green', 'blue'] },
  // Skills sit in dense small chips: keep the air thin there.
  skills: { density: 0.4, colors: ['blue', 'violet'] },
  learning: { density: 1, colors: ['amber', 'violet', 'green'] },
  contact: { density: 0.9, colors: ['amber', 'violet'] },
};

/** Parallax per layer: share of the scroll it follows, and how far (art px) it leans from the pointer. */
const DEPTH = { stars: { scroll: 0.05, lean: 1 }, dust: { scroll: 0.14, lean: 2 }, motes: { scroll: 0.3, lean: 4 } };

const rand = (min: number, max: number) => min + Math.random() * (max - min);
const pick = <T,>(list: T[]) => list[Math.floor(Math.random() * list.length)];
const wrap = (v: number, max: number) => ((v % max) + max) % max;
/** Pixel light comes in a few levels, not a smooth ramp. */
const step = (v: number, levels = 4) => Math.round(Math.max(0, Math.min(1, v)) * levels) / levels;

export function initAmbient() {
  const canvas = document.querySelector<HTMLCanvasElement>('[data-ambient]');
  const ctx = canvas?.getContext('2d');
  if (!canvas || !ctx) return;

  const css = getComputedStyle(document.documentElement);
  const color = (name: string) => css.getPropertyValue(`--${name}`).trim() || '#ffffff';
  const palette = Object.fromEntries(['amber', 'violet', 'blue', 'green', 'fg', 'frame-hi'].map((n) => [n, color(n)]));
  const starColors = [palette.fg, palette['frame-hi'], palette.violet, palette.blue];
  const dustColors = [palette.violet, palette.blue, palette['frame-hi']];

  let W = 0;
  let H = 0;
  let stars: Star[] = [];
  let dust: Dust[] = [];
  let motes: Mote[] = [];
  const glints: Glint[] = [];

  let mood = MOODS.top;
  let density = 1;
  let moteColors = mood.colors.map((c) => palette[c]);
  let nextGlint = 0;

  // Pointer, in -1…1 from the screen centre (lean) and in art pixels (repel).
  const fine = window.matchMedia('(pointer: fine)').matches;
  const pointer = { active: false, x: 0, y: 0, nx: 0, ny: 0, sx: 0, sy: 0 };

  const newMote = (spread: boolean): Mote => ({
    x: rand(0, W),
    y: rand(0, H),
    vx: rand(-0.04, 0.04),
    vy: rand(-0.09, -0.03),
    ex: 0,
    ey: 0,
    c: pick(moteColors),
    age: spread ? rand(0, 300) : 0,
    life: rand(240, 420),
  });

  /** Sizes the canvas to the screen; reseeds only when the width changes, so
   *  a phone's address bar sliding away doesn't reshuffle the sky. */
  const resize = () => {
    const w = Math.ceil(window.innerWidth / ART_PX);
    const h = Math.ceil(canvas.clientHeight / ART_PX) || Math.ceil(window.innerHeight / ART_PX);
    const reseed = w !== W;
    W = canvas.width = w;
    H = canvas.height = h;
    if (!reseed) return;
    const area = W * H;
    stars = Array.from({ length: Math.min(220, Math.round(area / 1300)) }, () => ({
      x: rand(0, W),
      y: rand(0, H),
      c: pick(starColors),
      a: rand(0.35, 0.8),
      period: rand(2.5, 7),
      phase: rand(0, Math.PI * 2),
      cross: Math.random() < 0.08,
    }));
    dust = Array.from({ length: Math.min(90, Math.round(area / 3200)) }, () => ({
      x: rand(0, W),
      y: rand(0, H),
      vx: rand(-0.05, 0.05),
      vy: rand(-0.06, -0.015),
      c: pick(dustColors),
      a: rand(0.2, 0.45),
    }));
    motes = Array.from({ length: Math.min(28, Math.round(area / 9000)) }, () => newMote(true));
  };

  const px = (x: number, y: number, w = 1, h = 1) => ctx.fillRect(Math.round(x), Math.round(y), w, h);

  const draw = (t: number, scrollY: number) => {
    ctx.clearRect(0, 0, W, H);
    const s = scrollY / ART_PX;

    // Far stars: fixed in the sky, twinkling in steps.
    const sx = -pointer.sx * DEPTH.stars.lean;
    const sy = -s * DEPTH.stars.scroll - pointer.sy * DEPTH.stars.lean * 0.5;
    for (const st of stars) {
      const lit = step((Math.sin(t / 1000 / st.period * Math.PI * 2 + st.phase) + 1) / 2, 3);
      if (lit === 0) continue;
      const x = wrap(st.x + sx, W);
      const y = wrap(st.y + sy, H);
      ctx.fillStyle = st.c;
      ctx.globalAlpha = st.a * (0.25 + lit * 0.75);
      px(x, y);
      if (st.cross && lit === 1) {
        ctx.globalAlpha *= 0.4;
        px(x - 1, y);
        px(x + 1, y);
        px(x, y - 1);
        px(x, y + 1);
      }
    }

    // Mid dust: drifting up, thinned by the chapter's mood.
    const dx = -pointer.sx * DEPTH.dust.lean;
    const dy = -s * DEPTH.dust.scroll - pointer.sy * DEPTH.dust.lean * 0.5;
    for (const d of dust) {
      ctx.fillStyle = d.c;
      ctx.globalAlpha = d.a * density;
      px(wrap(d.x + dx, W), wrap(d.y + dy, H));
    }

    // Near motes: soft plus-shaped lights that fade in, wander and fade out.
    const mx = -pointer.sx * DEPTH.motes.lean;
    const my = -s * DEPTH.motes.scroll - pointer.sy * DEPTH.motes.lean * 0.5;
    for (const m of motes) {
      const k = m.age / m.life;
      const env = k < 0.2 ? k / 0.2 : k > 0.7 ? (1 - k) / 0.3 : 1;
      const a = step(env, 4) * 0.85 * density;
      if (a <= 0) continue;
      const x = wrap(m.x + mx, W) + m.ex;
      const y = wrap(m.y + my, H) + m.ey;
      ctx.fillStyle = m.c;
      ctx.globalAlpha = a * 0.3;
      px(x - 1, y);
      px(x + 1, y);
      px(x, y - 1);
      px(x, y + 1);
      ctx.globalAlpha = a;
      px(x, y);
    }

    // Glints: a four-point sparkle whose arms grow, then shrink away.
    for (const g of glints) {
      const k = g.age / g.life;
      const arm = [0, 1, 2, 2, 1, 0][Math.min(5, Math.floor(k * 6))];
      ctx.fillStyle = g.c;
      ctx.globalAlpha = 0.9 * density;
      px(g.x, g.y);
      for (let i = 1; i <= arm; i++) {
        ctx.globalAlpha = (0.6 / i) * density;
        px(g.x - i, g.y);
        px(g.x + i, g.y);
        px(g.x, g.y - i);
        px(g.x, g.y + i);
      }
    }
    ctx.globalAlpha = 1;
  };

  /** Advances the world by `f` thirtieths of a second. */
  const tick = (f: number, t: number, scrollY: number) => {
    // The mood eases in rather than switching at a chapter's edge.
    density += (mood.density - density) * 0.03 * f;
    pointer.sx += ((pointer.active ? pointer.nx : 0) - pointer.sx) * 0.06 * f;
    pointer.sy += ((pointer.active ? pointer.ny : 0) - pointer.sy) * 0.06 * f;

    for (const d of dust) {
      d.x += d.vx * f;
      d.y += d.vy * f;
    }

    const s = scrollY / ART_PX;
    const mx = -pointer.sx * DEPTH.motes.lean;
    const my = -s * DEPTH.motes.scroll - pointer.sy * DEPTH.motes.lean * 0.5;
    for (let i = 0; i < motes.length; i++) {
      const m = motes[i];
      m.age += f;
      if (m.age >= m.life) {
        motes[i] = newMote(false);
        continue;
      }
      m.x += m.vx * f;
      m.y += m.vy * f;
      // The cursor parts the motes it passes; they drift back when it moves on.
      if (pointer.active) {
        const rx = wrap(m.x + mx, W) + m.ex - pointer.x;
        const ry = wrap(m.y + my, H) + m.ey - pointer.y;
        const d2 = rx * rx + ry * ry;
        if (d2 < 900 && d2 > 0.01) {
          const d = Math.sqrt(d2);
          const push = (1 - d / 30) * 0.5 * f;
          m.ex += (rx / d) * push;
          m.ey += (ry / d) * push;
        }
      }
      m.ex *= Math.pow(0.96, f);
      m.ey *= Math.pow(0.96, f);
    }

    for (let i = glints.length - 1; i >= 0; i--) {
      glints[i].age += f;
      if (glints[i].age >= glints[i].life) glints.splice(i, 1);
    }
    if (t >= nextGlint && glints.length < 3) {
      glints.push({ x: Math.floor(rand(4, W - 4)), y: Math.floor(rand(4, H - 4)), c: pick(moteColors), age: 0, life: 30 });
      nextGlint = t + rand(1400, 3600) / Math.max(0.3, mood.density);
    }
  };

  // ---- loop ----
  let raf = 0;
  let last = 0;
  const frame = (t: number) => {
    raf = requestAnimationFrame(frame);
    if (t - last < FRAME_MS - 2) return;
    const f = last ? Math.min(t - last, 100) / FRAME_MS : 1;
    last = t;
    const y = window.scrollY;
    tick(f, t, y);
    draw(t, y);
  };
  const start = () => {
    if (raf || document.hidden) return;
    last = 0;
    raf = requestAnimationFrame(frame);
  };
  const stop = () => {
    cancelAnimationFrame(raf);
    raf = 0;
  };

  // ---- inputs ----
  let resizeTimer = 0;
  const still = () => draw(0, window.scrollY);
  window.addEventListener(
    'resize',
    () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        resize();
        if (!raf) still();
      }, 150);
    },
    { passive: true },
  );

  if ('IntersectionObserver' in window) {
    // Whichever chapter crosses the middle of the screen sets the mood.
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          mood = MOODS[e.target.id] ?? MOODS.top;
          moteColors = mood.colors.map((c) => palette[c]);
        }
      },
      { rootMargin: '-50% 0px -50% 0px' },
    );
    Object.keys(MOODS).forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
  }

  if (fine) {
    window.addEventListener(
      'pointermove',
      (e) => {
        pointer.active = true;
        pointer.x = e.clientX / ART_PX;
        pointer.y = e.clientY / ART_PX;
        pointer.nx = (e.clientX / window.innerWidth) * 2 - 1;
        pointer.ny = (e.clientY / window.innerHeight) * 2 - 1;
      },
      { passive: true },
    );
    document.documentElement.addEventListener('pointerleave', () => (pointer.active = false));
  }

  document.addEventListener('visibilitychange', () => (document.hidden ? stop() : !prefersReducedMotion() && start()));

  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const apply = () => {
    if (motionQuery.matches) {
      stop();
      still();
    } else {
      start();
    }
  };
  motionQuery.addEventListener('change', apply);

  resize();
  apply();
  canvas.setAttribute('data-on', '');
}
