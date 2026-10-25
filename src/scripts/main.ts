// Client entry point. The site is one page, so everything initialises once.
import { initDialogs } from './dialogs';
import { initCopyEmail } from './contact';
import { initTypingTest } from './typing-test';
import { initReveals, playIntro } from './motion';
import { initScroll, initTitleBlock } from './scroll';

function initTheme() {
  const root = document.documentElement;

  const sync = () => {
    const theme = root.dataset.theme === 'dark' ? 'dark' : 'light';
    document.querySelectorAll<HTMLButtonElement>('[data-set-theme]').forEach((b) =>
      b.setAttribute('aria-pressed', String(b.dataset.setTheme === theme)),
    );
    document
      .querySelector('[data-theme-toggle]')
      ?.setAttribute('aria-label', theme === 'dark' ? 'Switch to Day set' : 'Switch to Night set');
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

  document
    .querySelector('[data-theme-toggle]')
    ?.addEventListener('click', () => set(root.dataset.theme === 'dark' ? 'light' : 'dark'));
  document.querySelectorAll<HTMLButtonElement>('[data-set-theme]').forEach((b) =>
    b.addEventListener('click', () => set(b.dataset.setTheme === 'dark' ? 'dark' : 'light')),
  );
  sync();
}

export function boot() {
  initTheme();
  initDialogs();
  initCopyEmail();
  initTypingTest();
  initScroll();
  initTitleBlock();
  playIntro();
  initReveals();
  (window as Window & { __motionReady?: boolean }).__motionReady = true;
}
