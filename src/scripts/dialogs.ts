// Native <dialog> helpers with Anime.js open/close motion.
// <dialog>.showModal() gives focus trapping, Esc to close and an inert page for free.
import { animate } from 'animejs';
import { prefersReducedMotion } from './motion-prefs';

const panelOf = (d: HTMLDialogElement) => d.querySelector<HTMLElement>('[data-panel]') ?? d;

export function openDialog(dialog: HTMLDialogElement): Promise<void> {
  if (dialog.open) return Promise.resolve();
  dialog.showModal();
  document.dispatchEvent(new CustomEvent('dialog:open'));
  const reduced = prefersReducedMotion();
  return new Promise((resolve) => {
    animate(panelOf(dialog), {
      opacity: [0, 1],
      y: reduced ? 0 : [16, 0],
      duration: reduced ? 120 : 420,
      ease: 'outExpo',
    }).then(() => resolve());
  });
}

export function closeDialog(dialog: HTMLDialogElement): Promise<void> {
  if (!dialog.open) return Promise.resolve();
  const reduced = prefersReducedMotion();
  return new Promise((resolve) => {
    // Exit is faster than entrance.
    animate(panelOf(dialog), {
      opacity: 0,
      y: reduced ? 0 : 8,
      duration: reduced ? 80 : 180,
      ease: 'inQuad',
    }).then(() => {
      dialog.close();
      if (!document.querySelector('dialog[open]')) document.dispatchEvent(new CustomEvent('dialog:close'));
      resolve();
    });
  });
}

/** Wires [data-open="<id>"] triggers, [data-close] buttons, backdrop clicks and Esc. */
export function initDialogs(): () => void {
  const ac = new AbortController();
  const { signal } = ac;

  document.querySelectorAll<HTMLDialogElement>('dialog[data-dialog]').forEach((dialog) => {
    dialog.querySelectorAll('[data-close]').forEach((btn) =>
      btn.addEventListener('click', () => closeDialog(dialog), { signal }),
    );
    // Click on the backdrop (the dialog element itself, outside the panel).
    dialog.addEventListener(
      'click',
      (e) => {
        if (e.target === dialog) closeDialog(dialog);
      },
      { signal },
    );
    // Replace the instant native Esc close with the animated one.
    dialog.addEventListener(
      'cancel',
      (e) => {
        e.preventDefault();
        closeDialog(dialog);
      },
      { signal },
    );
  });

  document.querySelectorAll<HTMLElement>('[data-open="email"]').forEach((btn) =>
    btn.addEventListener(
      'click',
      (e) => {
        e.preventDefault();
        const d = document.querySelector<HTMLDialogElement>('#email-dialog');
        if (d) openDialog(d);
      },
      { signal },
    ),
  );

  return () => ac.abort();
}
