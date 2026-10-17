# navin. — portfolio

Personal portfolio of Navin Byron Llanes, built with [Astro](https://astro.build) 7 and [Anime.js](https://animejs.com) 4. The site is fully static: every page is pre-rendered HTML, and the only client JavaScript handles the interactive parts (typing race, dialogs, theme, keyboard shortcuts, motion).

## Commands

Requires Node.js 22.22 or newer (Astro 7 requirement).

| Command | What it does |
| --- | --- |
| `npm install` | Install dependencies |
| `npm run dev` | Dev server at http://localhost:4321 |
| `npm run check` | Astro + TypeScript diagnostics |
| `npm run build` | Type check, then build the static site into `dist/` |
| `npm run preview` | Serve the built `dist/` locally |
| `npm run lint:design` | Impeccable design anti-pattern scan of `src/` |

## Editing content

All text, links, and images live in **`src/data/site.ts`**: projects, experience, stack, certificates, contact details, and the typing-test benchmark (92 wpm / 97%).

- A project link or certificate **Verify** link only appears when its `url` / `verifyUrl` is set. Leave it `undefined` to hide it.
- Certificate and photo images go in `src/assets/`. Astro resizes them and converts them to WebP/AVIF at build time.

## Deploying (Vercel or Netlify)

Both platforms detect Astro automatically. The build command is `npm run build` and the output directory is `dist`.

Set the `SITE_URL` environment variable to the final domain (see `.env.example`). It is used for canonical URLs, Open Graph tags, `robots.txt`, and `sitemap-index.xml`. Without it, a placeholder domain is used.

## Structure

```
src/
  data/site.ts          content (single source of truth)
  layouts/Base.astro    <head>/SEO, theme bootstrapping, board, footer, dialogs
  components/           Board (keycap nav), Footer, EmailDialog, TypingTest, Icon
  pages/                /, /projects, /experience, /stack, /certifications, 404, robots.txt
  scripts/              client modules (see below)
  styles/global.css     design tokens ("NAVIN/92" colorway), keycap component, base styles
```

### Client scripts and the page lifecycle

The site uses Astro's `<ClientRouter />` for smooth page swaps. The client bundle (`src/scripts/main.ts`) therefore runs **once**, while the page DOM is replaced on every navigation. Every module that touches the page exports an `init…()` function that returns a cleanup function:

- `astro:page-load`: run all `init…()` functions.
- `astro:before-swap`: run every cleanup. It aborts listeners via `AbortController`, disconnects observers, and reverts Anime.js animations.

This prevents duplicate listeners and lingering animations after navigation. The theme and the `motion-ok` class are copied onto the incoming document in `astro:before-swap` (inline script in `Base.astro`), so there is no flash between pages.

### Motion

- **Intro**: on the home page, NAVIN types in letter by letter, then the rest settles (`playIntro`, Anime.js timeline).
- **Reveals**: lists (projects, roles, stack groups, certificates, home index) stagger in when they scroll into view, using IntersectionObserver plus Anime.js.
- **Dialogs**: open and close with Anime.js. They are native `<dialog>` elements, which provide focus trapping and Esc handling.
- **Keycaps**: press feedback is CSS. Keyboard shortcuts (H, P, E, S, C, T) press the matching on-screen key before navigating.

Content is visible by default. Elements are pre-hidden only when `<html class="motion-ok">` is set, which happens only when JavaScript runs and the visitor hasn't asked for reduced motion. If the motion bundle fails to boot, a 3-second failsafe shows everything. With `prefers-reduced-motion`, the intro and reveals are skipped and dialogs use short fades.

## Design notes

`PRODUCT.md` records the product facts. `.impeccable/` holds the direction contract used during the redesign with the [Impeccable](https://impeccable.style) design skill.
