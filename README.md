# Navin Byron Llanes — portfolio

A single-page portfolio built with [Astro](https://astro.build) 7, styled as a retro game's player's guide: midnight background, pixel lettering, an original pixel-art avatar and item icons. Fully static, no UI framework; [Anime.js](https://animejs.com) handles the stepped entrance and scroll reveals.

Chapters: cover → player profile (about) → inventory (projects) → world map (experience & education) → loadout (skills) → side quests (learning) → continue? (contact). The sticky header links to each one, smooth-scrolls there, highlights the chapter in view and fills a progress meter. Optional chiptune interface sounds stay off until the visitor turns them on.

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

Everything lives in **`src/data/site.ts`**:

- `person`: name, headline, statement, the cover's typed `status` line, contact details, and `resume`.
- `projects`: problem, description, status, stack, role, icon, screenshot, links. A link only appears when its `url`/`demo` is set.
- `story` and `profile` (About), `experience`, `education`, `honors`, `certificates`, `skills`, `quests`.

Common tasks:

- **Add a project screenshot**: put the image in `src/assets/projects/`, import it at the top of `site.ts`, and set `image: { src, alt }` on the project. A project with a screenshot gets the wide, featured layout.
- **Add your résumé**: save it as `public/resume.pdf` and set `resume: '/resume.pdf'` in `person`. The Contact section then shows a download link.
- **Change the photo**: change the import at the top of `src/components/sections/Profile.astro` (and the Open Graph image in `src/layouts/Base.astro`).
- **Redraw the pixel art**: the avatar and icons are character grids in `src/components/PixelAvatar.astro` and `PixelIcon.astro`; each character is one pixel.

Images in `src/assets/` are resized and converted to AVIF/WebP at build time.

## Structure

```
src/
  data/site.ts              content (single source of truth)
  layouts/Base.astro        <head>/SEO, theme bootstrap, header, footer
  components/
    Header.astro            sticky header, mobile menu, sound switch, progress meter
    PixelAvatar.astro, PixelIcon.astro   original pixel art (SVG grids)
    Footer.astro, Icon.astro
    sections/               Cover, Profile, Inventory, Journey, Loadout, SideQuests, Continue, ChapterHead
  lib/sound.ts              Web Audio interface sounds (off by default)
  scripts/                  header, copy-email, motion
  pages/                    index, 404, robots.txt
```

## Accessibility and motion

- Skip link, semantic landmarks, visible amber focus rings, keyboard support for the menu (Esc closes it).
- Content is visible without JavaScript. With `prefers-reduced-motion`, smooth scrolling, reveals, typing and blinking are all turned off.
- Sound is synthesised in the browser (no audio files). Nothing plays until the visitor presses **Sound off** to turn it on; the choice is saved in `localStorage`.

## Deploying (Vercel or Netlify)

Both detect Astro automatically: build command `npm run build`, output `dist`. Set `SITE_URL` to the final domain.
