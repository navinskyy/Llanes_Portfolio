// Client entry point, loaded on every page.
import { initCopyEmail } from './contact';
import { initHeader } from './header';
import { initReveals, initScenes, playIntro } from './motion';

export function boot() {
  initHeader();
  initCopyEmail();
  playIntro();
  initReveals();
  initScenes();
  (window as Window & { __motionReady?: boolean }).__motionReady = true;
}
