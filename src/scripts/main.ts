// Client entry point, loaded on every page.
import { initCopyEmail } from './contact';
import { initHeader } from './header';
import { initReveals, playIntro } from './motion';

export function boot() {
  initHeader();
  initCopyEmail();
  playIntro();
  initReveals();
  (window as Window & { __motionReady?: boolean }).__motionReady = true;
}
