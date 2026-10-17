// Client entry point.
//
// Lifecycle with Astro's <ClientRouter />: this module runs once, but the page
// DOM is swapped on every navigation. Everything that touches page elements is
// therefore (re)initialised on `astro:page-load` and torn down on
// `astro:before-swap`, so listeners, observers and animations never duplicate.
import { initDialogs } from './dialogs';
import { initCopyEmail } from './contact';
import { initTypingTest } from './typing-test';
import { initReveals, playIntro, pressCap } from './motion';
import { navigate } from 'astro:transitions/client';

type Cleanup = () => void;

function initTheme(): Cleanup {
  const ac = new AbortController();
  const root = document.documentElement;

  const sync = () => {
    const theme = root.dataset.theme === 'dark' ? 'dark' : 'light';
    document.querySelectorAll<HTMLButtonElement>('[data-set-theme]').forEach((b) =>
      b.setAttribute('aria-pressed', String(b.dataset.setTheme === theme)),
    );
    document
      .querySelector('[data-theme-toggle]')
      ?.setAttribute('aria-label', theme === 'dark' ? 'Switch to Day colorway' : 'Switch to Night colorway');
  };
  const set = (theme: 'light' | 'dark') => {
    root.dataset.theme = theme;
    try {
      localStorage.setItem('theme', theme);
    } catch {
      /* storage blocked: theme still applies for this visit */
    }
    sync();
  };

  document.querySelector('[data-theme-toggle]')?.addEventListener(
    'click',
    () => set(root.dataset.theme === 'dark' ? 'light' : 'dark'),
    { signal: ac.signal },
  );
  document.querySelectorAll<HTMLButtonElement>('[data-set-theme]').forEach((b) =>
    b.addEventListener('click', () => set(b.dataset.setTheme === 'dark' ? 'dark' : 'light'), { signal: ac.signal }),
  );
  sync();
  return () => ac.abort();
}

/** Single-key shortcuts: H/P/E/S/C navigate, T opens the race. */
function initShortcuts(): Cleanup {
  const ac = new AbortController();
  document.addEventListener(
    'keydown',
    (e) => {
      if (e.defaultPrevented || e.repeat || e.ctrlKey || e.metaKey || e.altKey) return;
      const t = e.target as HTMLElement;
      if (t.closest('input, textarea, select, [contenteditable]') || document.querySelector('dialog[open]')) return;
      const cap = document.querySelector<HTMLElement>(`[data-shortcut="${e.key.toLowerCase()}"]`);
      if (!cap) return;
      e.preventDefault();
      pressCap(cap).then(() => {
        if (cap instanceof HTMLAnchorElement) navigate(cap.href);
        else cap.click();
      });
    },
    { signal: ac.signal },
  );
  return () => ac.abort();
}

export function boot() {
  let cleanups: Cleanup[] = [];

  document.addEventListener('astro:page-load', () => {
    cleanups.forEach((fn) => fn());
    cleanups = [initTheme(), initShortcuts(), initDialogs(), initCopyEmail(), initTypingTest(), playIntro(), initReveals()];
    (window as Window & { __motionReady?: boolean }).__motionReady = true;
  });

  document.addEventListener('astro:before-swap', () => {
    cleanups.forEach((fn) => fn());
    cleanups = [];
  });
}
