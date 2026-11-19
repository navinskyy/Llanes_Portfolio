// Sticky header behaviour: mobile menu, sound switch, the stepped reading
// meter, the glass state past the cover, and highlighting the chapter in view
// (with a marker that slides under it and a confirm flash on selection).
import { isSoundOn, play, setSound, type Sfx } from '../lib/sound';

function initMenu(signal: AbortSignal) {
  const btn = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
  const nav = document.querySelector<HTMLElement>('[data-nav]');
  if (!btn || !nav) return;

  const setOpen = (open: boolean) => {
    btn.setAttribute('aria-expanded', String(open));
    nav.toggleAttribute('data-open', open);
  };
  btn.addEventListener(
    'click',
    () => {
      const open = btn.getAttribute('aria-expanded') !== 'true';
      setOpen(open);
      play(open ? 'open' : 'close');
    },
    { signal },
  );
  nav.addEventListener('click', (e) => (e.target as Element).closest('a') && setOpen(false), { signal });
  document.addEventListener(
    'keydown',
    (e) => {
      if (e.key === 'Escape' && nav.hasAttribute('data-open')) {
        setOpen(false);
        btn.focus();
      }
    },
    { signal },
  );
  // Close when the layout grows past the breakpoint.
  matchMedia('(min-width: 861px)').addEventListener('change', (e) => e.matches && setOpen(false), { signal });
}

function initSound(signal: AbortSignal) {
  const btn = document.querySelector<HTMLButtonElement>('[data-sound-toggle]');
  const state = btn?.querySelector<HTMLElement>('[data-sound-state]');
  if (!btn || !state) return;
  const sync = () => {
    const on = isSoundOn();
    btn.setAttribute('aria-pressed', String(on));
    state.textContent = on ? 'on' : 'off';
  };
  sync();
  btn.addEventListener(
    'click',
    () => {
      setSound(!isSoundOn());
      sync();
      play('on');
    },
    { signal },
  );

  // Interface sounds: links and buttons say "select"; anything can ask for a
  // specific sound with data-sfx. Silent unless sound is on.
  document.addEventListener(
    'click',
    (e) => {
      const el = (e.target as Element).closest<HTMLElement>('a, button');
      if (!el || el === btn || el.hasAttribute('data-menu-toggle') || el.hasAttribute('data-copy-email')) return;
      play((el.dataset.sfx as Sfx | undefined) ?? 'select');
    },
    { signal },
  );
}

function initProgress(signal: AbortSignal) {
  const fill = document.querySelector<HTMLElement>('[data-progress]');
  if (!fill) return;
  let queued = false;
  const update = () => {
    queued = false;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
    // 25 cells: fill whole cells only, like a health bar.
    fill.style.setProperty('--p', String(Math.round(p * 25) / 25));
  };
  update();
  const onScroll = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(update);
  };
  window.addEventListener('scroll', onScroll, { passive: true, signal });
  window.addEventListener('resize', onScroll, { passive: true, signal });
}

function initActiveSection(signal: AbortSignal, onChange: (link: HTMLAnchorElement | null) => void) {
  const links = new Map(
    [...document.querySelectorAll<HTMLAnchorElement>('[data-nav-link]')].map((a) => [a.dataset.navLink!, a]),
  );
  const targets = [...links.keys()].map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el);
  if (!targets.length || !('IntersectionObserver' in window)) return;

  const visible = new Set<string>();
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) e.isIntersecting ? visible.add(e.target.id) : visible.delete(e.target.id);
      // The first chapter (in page order) that crosses the reading line wins.
      const current = targets.find((t) => visible.has(t.id))?.id;
      links.forEach((a, id) => (id === current ? a.setAttribute('aria-current', 'true') : a.removeAttribute('aria-current')));
      onChange(current ? links.get(current)! : null);
    },
    // A thin band a third of the way down the viewport.
    { rootMargin: '-33% 0px -66% 0px' },
  );
  targets.forEach((t) => io.observe(t));
  signal.addEventListener('abort', () => io.disconnect());
}

/** The segmented marker slides (in steps) under the chapter in view. */
function initMarker(signal: AbortSignal) {
  const marker = document.querySelector<HTMLElement>('[data-nav-marker]');
  let current: HTMLAnchorElement | null = null;
  const place = () => {
    if (!marker) return;
    marker.toggleAttribute('data-on', !!current);
    if (!current) return;
    marker.style.setProperty('--x', `${current.offsetLeft}px`);
    marker.style.setProperty('--w', `${current.offsetWidth}px`);
  };
  window.addEventListener('resize', place, { passive: true, signal });
  // Pixel fonts change link widths when they arrive.
  document.fonts?.ready.then(place);
  return (link: HTMLAnchorElement | null) => {
    current = link;
    place();
  };
}

/** Choosing a chapter flashes its menu item twice, like a game menu confirming. */
function initPick(signal: AbortSignal) {
  document.querySelector('[data-nav]')?.addEventListener(
    'click',
    (e) => {
      const a = (e.target as Element).closest<HTMLElement>('[data-nav-link]');
      if (!a) return;
      a.removeAttribute('data-picked');
      void a.offsetWidth; // restart the animation on a repeat click
      a.setAttribute('data-picked', '');
      a.addEventListener('animationend', () => a.removeAttribute('data-picked'), { once: true });
    },
    { signal },
  );
}

/** Once the cover has scrolled under the header, the header turns to glass. */
function initHeroState(signal: AbortSignal) {
  const header = document.querySelector<HTMLElement>('[data-header]');
  const hero = document.getElementById('top');
  if (!header) return;
  if (!hero || !('IntersectionObserver' in window)) return header.setAttribute('data-past-hero', '');
  const io = new IntersectionObserver(([e]) => header.toggleAttribute('data-past-hero', !e.isIntersecting), {
    // The cover counts as gone once its last 80px slide under the header.
    rootMargin: `-${header.offsetHeight + 80}px 0px 0px 0px`,
  });
  io.observe(hero);
  signal.addEventListener('abort', () => io.disconnect());
}

export function initHeader(): () => void {
  const ac = new AbortController();
  initMenu(ac.signal);
  initSound(ac.signal);
  initProgress(ac.signal);
  initActiveSection(ac.signal, initMarker(ac.signal));
  initPick(ac.signal);
  initHeroState(ac.signal);
  return () => ac.abort();
}
