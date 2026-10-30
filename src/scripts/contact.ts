import { play } from '../lib/sound';

// Copy-to-clipboard for the email address, with a visible and announced result.
// Any button with [data-copy-email="<address>"] works; [data-copy-status="<id>"]
// names the live region that announces the result.
export function initCopyEmail(): () => void {
  const ac = new AbortController();
  const timers = new Map<HTMLElement, number>();

  document.querySelectorAll<HTMLButtonElement>('[data-copy-email]').forEach((btn) =>
    btn.addEventListener(
      'click',
      async () => {
        const email = btn.dataset.copyEmail ?? '';
        const status = btn.dataset.copyStatus ? document.getElementById(btn.dataset.copyStatus) : null;
        let ok = true;
        try {
          await navigator.clipboard.writeText(email);
        } catch {
          // Fallback for browsers or contexts without the async clipboard API.
          const ta = document.createElement('textarea');
          ta.value = email;
          ta.setAttribute('readonly', '');
          ta.style.position = 'fixed';
          ta.style.opacity = '0';
          document.body.appendChild(ta);
          ta.select();
          ok = document.execCommand('copy');
          ta.remove();
        }
        btn.dataset.state = ok ? 'copied' : 'error';
        if (ok) play('coin');
        if (status) status.textContent = ok ? 'Email copied to clipboard.' : 'Could not copy. Select the address and copy it manually.';
        window.clearTimeout(timers.get(btn));
        timers.set(
          btn,
          window.setTimeout(() => {
            delete btn.dataset.state;
            if (status) status.textContent = '';
          }, 2000),
        );
      },
      { signal: ac.signal },
    ),
  );

  return () => {
    timers.forEach((t) => window.clearTimeout(t));
    ac.abort();
  };
}
