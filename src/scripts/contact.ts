// Copy-to-clipboard for the email dialog, with a visible and announced result.
export function initCopyEmail(): () => void {
  const btn = document.querySelector<HTMLButtonElement>('#copy-email-btn');
  const status = document.querySelector<HTMLElement>('#copy-status');
  if (!btn) return () => {};
  const ac = new AbortController();
  let reset: number | undefined;

  btn.addEventListener(
    'click',
    async () => {
      const email = btn.dataset.email ?? '';
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
      if (status) status.textContent = ok ? 'Email copied to clipboard.' : 'Could not copy. Select the address and copy it manually.';
      window.clearTimeout(reset);
      reset = window.setTimeout(() => {
        delete btn.dataset.state;
        if (status) status.textContent = '';
      }, 2000);
    },
    { signal: ac.signal },
  );

  return () => {
    window.clearTimeout(reset);
    ac.abort();
  };
}
