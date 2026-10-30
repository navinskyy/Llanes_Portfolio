// Sticky header behaviour: mobile menu, sound switch, the stepped reading
// meter, and highlighting the chapter in view.
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

function initActiveSection(signal: AbortSignal) {
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
    },
    // A thin band a third of the way down the viewport.
    { rootMargin: '-33% 0px -66% 0px' },
  );
  targets.forEach((t) => io.observe(t));
  signal.addEventListener('abort', () => io.disconnect());
}

export function initHeader(): () => void {
  const ac = new AbortController();
  initMenu(ac.signal);
  initSound(ac.signal);
  initProgress(ac.signal);
  initActiveSection(ac.signal);
  return () => ac.abort();
}
