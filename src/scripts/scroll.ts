// One scroll axis drives the whole set.
//
// Lenis smooths the wheel; every frame, a single `update(y)` reads the scroll
// position and writes everything that depends on it: the current sheet in the
// index, the blue progress line, each sheet's drafting rule, the pinned
// projects track and the title block's sheet number. Under reduced motion
// there is no smoothing, no pinning and no drawing; the page is a plain,
// fully visible document that still marks the current sheet.
import Lenis from 'lenis';
import { prefersReducedMotion } from './motion-prefs';

const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));

export function initScroll(): () => void {
  const root = document.documentElement;
  const reduced = prefersReducedMotion();
  const ac = new AbortController();
  const { signal } = ac;

  const index = document.querySelector<HTMLElement>('[data-index]');
  const indexNav = index?.querySelector<HTMLElement>('nav');
  const links = [...document.querySelectorAll<HTMLAnchorElement>('[data-sheet-link]')];
  const sheets = [...document.querySelectorAll<HTMLElement>('[data-sheet]')];
  const rules = [...document.querySelectorAll<HTMLElement>('[data-draw]')];
  const tbSheet = document.querySelector<HTMLElement>('[data-tb-sheet]');

  // Offset of the fixed frame + index bar: where a sheet's top "lands".
  let landing = 0;
  const readLanding = () => {
    landing = index ? index.getBoundingClientRect().bottom : 0;
  };

  // ---- the pinned projects sheet ----
  const pinSection = document.querySelector<HTMLElement>('[data-pin]');
  const pinFrame = pinSection?.querySelector<HTMLElement>('[data-pin-frame]');
  const pinViewport = pinSection?.querySelector<HTMLElement>('[data-pin-viewport]');
  const pinTrack = pinSection?.querySelector<HTMLElement>('[data-pin-track]');
  const pinCount = pinSection?.querySelector<HTMLElement>('[data-pin-count]');
  const pinBar = pinSection?.querySelector<HTMLElement>('[data-pin-bar]');
  const pinItems = pinTrack ? [...pinTrack.children].filter((c): c is HTMLElement => c instanceof HTMLElement) : [];
  const pinQuery = matchMedia('(min-width: 900px) and (min-height: 560px)');
  let pinned = false;
  let pinTop = 0;
  let pinSpan = 0;

  function measurePin() {
    if (!pinSection || !pinFrame || !pinViewport || !pinTrack) return;
    pinned = !reduced && pinQuery.matches;
    root.classList.toggle('is-pinned', pinned);
    if (!pinned) {
      pinSection.style.height = '';
      pinTrack.style.transform = '';
      return;
    }
    const pad = parseFloat(getComputedStyle(pinViewport).paddingLeft) || 0;
    pinSpan = Math.max(0, pinTrack.scrollWidth - pinViewport.clientWidth + pad * 2);
    pinSection.style.height = `${pinFrame.offsetHeight + pinSpan}px`;
    pinTop = pinSection.getBoundingClientRect().top + window.scrollY - landing;
  }

  // ---- per-frame update ----
  let current = '';
  function update(y: number) {
    const vh = window.innerHeight;
    const max = Math.max(1, root.scrollHeight - vh);
    index?.style.setProperty('--progress', String(clamp(y / max)));

    // Current sheet: the last one whose top has passed 40% of the viewport.
    let here = sheets[0]?.dataset.sheet ?? '';
    for (const s of sheets) if (s.getBoundingClientRect().top <= vh * 0.4) here = s.dataset.sheet ?? here;
    if (y >= max - 2) here = sheets[sheets.length - 1]?.dataset.sheet ?? here;
    if (here !== current) {
      current = here;
      const at = links.findIndex((l) => l.dataset.sheetLink === here);
      links.forEach((l, i) => {
        if (i === at) l.setAttribute('aria-current', 'true');
        else l.removeAttribute('aria-current');
        l.dataset.state = i < at ? 'behind' : i === at + 1 ? 'ahead' : '';
      });
      const link = links[at];
      if (tbSheet && link) tbSheet.textContent = link.querySelector('.index-no')?.textContent ?? '';
      if (indexNav && link && indexNav.scrollWidth > indexNav.clientWidth) {
        indexNav.scrollTo({ left: link.parentElement!.offsetLeft - 8, behavior: reduced ? 'auto' : 'smooth' });
      }
    }

    // Drafting rules draw in as their sheet arrives.
    if (!reduced) {
      for (const r of rules) {
        const top = r.getBoundingClientRect().top;
        const t = clamp((vh - top) / (vh * 0.55));
        r.style.setProperty('--draw', t.toFixed(4));
        r.style.setProperty('--draw-end', t >= 0.999 ? '1' : '0');
      }
    }

    // Projects slide sideways 1:1 with vertical scroll while pinned.
    if (pinned && pinTrack) {
      const p = pinSpan > 0 ? clamp((y - pinTop) / pinSpan) : 0;
      pinTrack.style.transform = `translate3d(${(-p * pinSpan).toFixed(2)}px, 0, 0)`;
      pinBar?.style.setProperty('--pin', p.toFixed(4));
      if (pinCount) pinCount.textContent = String(Math.round(p * (pinItems.length - 1)) + 1).padStart(2, '0');
    }
  }

  // ---- smoothing ----
  let lenis: Lenis | null = null;
  let raf = 0;
  if (!reduced) {
    lenis = new Lenis({
      lerp: 0.11,
      smoothWheel: true,
      anchors: { offset: 0 },
      // Dialogs and the index scroll on their own.
      prevent: (node) => node.closest?.('dialog, [data-index]') != null,
    });
    lenis.on('scroll', ({ scroll }: { scroll: number }) => update(scroll));
    const loop = (t: number) => {
      lenis!.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
  } else {
    let queued = false;
    window.addEventListener(
      'scroll',
      () => {
        if (queued) return;
        queued = true;
        requestAnimationFrame(() => {
          queued = false;
          update(window.scrollY);
        });
      },
      { passive: true, signal },
    );
  }

  // Pause smoothing while a modal dialog holds focus.
  document.addEventListener('dialog:open', () => lenis?.stop(), { signal });
  document.addEventListener('dialog:close', () => lenis?.start(), { signal });

  // Keyboard users tabbing through pinned projects: scroll so the focused
  // detail sheet is the one in view.
  pinTrack?.addEventListener(
    'focusin',
    (e) => {
      if (!pinned) return;
      const item = (e.target as HTMLElement).closest<HTMLElement>('.proj');
      if (!item) return;
      const target = pinTop + clamp(item.offsetLeft - pinTrack.offsetLeft, 0, pinSpan);
      if (lenis) lenis.scrollTo(target, { immediate: true });
      else window.scrollTo(0, target);
    },
    { signal },
  );

  // ---- measure now, after fonts, and on resize ----
  const relayout = () => {
    readLanding();
    measurePin();
    lenis?.resize();
    update(window.scrollY);
  };
  relayout();
  document.fonts?.ready.then(relayout);
  const ro = new ResizeObserver(() => relayout());
  ro.observe(document.body);
  pinQuery.addEventListener('change', relayout, { signal });

  // Land on a deep link (/#projects) after the pin has its height.
  if (location.hash) {
    const el = document.getElementById(location.hash.slice(1));
    if (el) requestAnimationFrame(() => (lenis ? lenis.scrollTo(el, { immediate: true }) : el.scrollIntoView()));
  }

  return () => {
    ac.abort();
    ro.disconnect();
    cancelAnimationFrame(raf);
    lenis?.destroy();
  };
}

/** Shows the compact title block on every sheet between the two full title
 *  blocks (the cover's and the contact sheet's), and never on top of either. */
export function initTitleBlock(): () => void {
  const tb = document.querySelector<HTMLElement>('[data-title-block]');
  const watched = [...document.querySelectorAll('[data-cover-tb], [data-contact-tb]')];
  if (!tb || !watched.length || !('IntersectionObserver' in window)) return () => {};
  // Content scrolling under the fixed index bar is not on screen.
  const top = document.querySelector('[data-index]')?.getBoundingClientRect().bottom ?? 0;
  const visible = new Set<Element>();
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) e.isIntersecting ? visible.add(e.target) : visible.delete(e.target);
      if (visible.size) tb.removeAttribute('data-shown');
      else tb.setAttribute('data-shown', '');
    },
    { rootMargin: `-${Math.round(top)}px 0px 0px 0px` },
  );
  watched.forEach((el) => io.observe(el));
  return () => io.disconnect();
}
