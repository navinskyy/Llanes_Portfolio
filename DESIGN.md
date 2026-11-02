---
name: Navin Llanes, Player's Guide
description: The portfolio as the instruction manual from a game cartridge box, on midnight stock.
colors:
  bg: "#0f1020"
  bg-deep: "#0a0b17"
  panel: "#161830"
  panel-2: "#1d2040"
  fg: "#efe6d2"
  muted: "#b0a993"
  faint: "#7d7867"
  frame: "#3a3e6b"
  frame-hi: "#5a5f9a"
  amber: "#f2b84b"
  green: "#7fd68f"
  red: "#e86f5f"
  blue: "#7fb2ff"
  violet: "#9b7bff"
  violet-deep: "#2c2260"
typography:
  pixel: "Pixelify Sans, ui-monospace, monospace"
  sans: "Geist, system-ui, sans-serif"
  mono: "Geist Mono, ui-monospace, monospace"
rounded:
  base: "0"
spacing:
  unit: "4px (one art pixel)"
  header: "64px"
  wrap: "1160px"
---

# Design System: Navin Llanes, Player's Guide

## Overview

One continuous page read like a game's printed guide: a cover (title, player status window, PRESS START), then chapters with game names and plain subtitles (Player profile / About me, Inventory / Selected projects, World map / Experience & education, Loadout / Skills, Side quests / Learning, Continue? / Contact). Pixel detail is concentrated in a few places: the lettering, the avatar and item icons, the notched windows. Reading text stays in a clean sans.

## Colors

- **bg / bg-deep / panel / panel-2**: booklet stock, the cover and footer, inside a window, slots and hovered rows.
- **fg / muted / faint**: print, secondary print (7.9:1), non-essential metadata only.
- **frame / frame-hi**: every window border and dashed rule; hovered frames.
- Accents have fixed jobs and never fill large areas:
  - **amber**: cursor, progress meter, current chapter, primary key, the surname on the cover.
  - **green**: live / cleared, the terminal text.
  - **red**: in progress.
  - **blue**: links and research.
  - **violet / violet-deep**: the cover only: the space scene's planet, the character stage's glow and floor, hard pixel shadows on the title.

## Typography

- **Pixelify Sans** (400–700): cover title, chapter titles, project and quest names, small uppercase tags, keys.
- **Geist**: all paragraphs and descriptions.
- **Geist Mono**: dates, page numbers, handles, the status line and terminal.
- No eyebrow labels above headings; a plain subtitle sits beside each chapter title.

## Components

- **Window** (`.win`): 2px frame with its four corner pixels removed (a 16-bit menu box), optional `.win-bar` title row. It's the only boxed element on the page.
- **Key** (`.key`): notched pixel button, pixel label, presses down 2px. `.key--primary` is amber.
- **Status** (`.status`): an 8px square lamp plus a pixel label; the colour comes from the state.
- **Pixel art**: `PixelAvatar` (48×48 bust drawn from Navin's photo with a mirrored, symmetric face, blinks every ~5 s; `crop="head"` gives a 34×34 head shot for small spots; show either at whole multiples of its grid), `PixelIcon` (12×12 item and stat icons) and `SpaceScene` (the cover's stars, planet, ship and hills, generated from a fixed seed). All are SVG grids built with `toRects` in `src/lib/pixels.ts`; edit the character rows to redraw.
- **Cover**: a character select screen. Title letters step in one by one; the menu puts PRESS START on its own row with a soft amber pulse, the other options show a pixel selection cursor on hover/focus. The character panel has a name plate, a stage (corner brackets, sparkles, scanlines, violet glow) where the sprite is drawn in top to bottom and idles with a 1px breath, five stat rows with icons, and a status line that types through `person.status`.
- **Header**: chapter index with numbers matching the chapter page numbers, sound switch (labelled, default off), and a 25-cell amber meter that fills in whole cells as you read.

## The world (chapter scenery)

The page is one pixel world crossed top to bottom; every chapter has a scene behind it in `src/components/scenes/`:

| Chapter | Scene | Identity |
| --- | --- | --- |
| Cover | `Space` | stars and constellations, ringed planet, ship, shooting stars, hills |
| About | `HomeBase` | far settlement, domed hall with antenna, floating interface frames, rails |
| Projects | `PixelCity` | street grid, two lit skylines with neon and beacons, margin towers, drones |
| Journey | `WorldMap` | map grid, two map regions (peaks, pines, castle, houses, tower) on dotted paths with glowing checkpoints, clouds, hills |
| Skills | `Workshop` | circuit traces, server racks with LEDs, terminal monitor, floating code glyphs, bench |
| Learning | `Exploration` | stars, moon, small planet, uneven snow-capped ranges with a flag on the highest peak, signpost, fireflies |
| Contact | `FinalDestination` | the city at night: horizon glow, moon, full skyline, the lit tower with a goal marker |

- **One world:** colours come only from `world` in `src/lib/sprites.ts`; art pixels are 3px (distance) or 4px (near). Every scene starts from the page colour at its top and ends on a dark ground, so chapters join cleanly.
- **Building blocks:** `Scene` (backdrop, tint, faint texture), `Strip` (full-width repeating band: hills, skylines), `Sprite` (one placed prop). Generators (`skylineTile`, `ridgeTile`, `starTile`, `disk`, `mountain`, `compose`) live in `src/lib/pixels.ts` and are seeded.
- **Placement:** `.edge` props live in the margins and only show at ≥1440px, anchored to `--side` so they stay beside the content on ultrawide screens; `.wide` props show from 861px. Phones get the grounds, skylines and textures only.
- **Restraint:** scenery stays darker than content; dimness lives in colour so pulses can animate opacity.

## Layout

- Content width 1160px, fluid gutters. Chapters are separated by a dashed rule and 96px of space (64px on phones).
- Projects: a project with a real screenshot is featured (shot left, spec right); the others are rows in one item list with a drawn icon slot.
- Journey: a dashed path with square level nodes (amber = current), beside the education window and certificates.
- Below 860px the nav folds into a menu and every grid becomes one column.

## Motion and sound

- Anime.js with stepped easing: the cover steps in (title letter by letter, portrait wiped in), the status line cycles through its lines, the cover's floats, drift, breath and PRESS START glow loop only while the cover is on screen; each chapter block steps in once; item rows follow in sequence.
- CSS: blinking cursor and PRESS START triangle, avatar blink, stepped hover changes.
- Scenery (`initScenes`): each scene's loops (`data-float`, `data-drift`, `data-blink`, `data-pulse`, `data-rise`, `data-shoot`) are built the first time it scrolls into view and pause whenever it leaves; chapter scenes fade in once and their ground rises. `data-depth` layers drift with scroll in 4px steps on large screens with a mouse only. Sprites are SVG, so motion uses `translateX/Y`, never the `x/y` shorthands.
- Reduced motion: no smooth scroll, no reveals, no typing, no blinking, no scenery motion (scenes simply show; particles and shooting stars stay hidden).
- Sound: Web Audio chiptune blips (select, open/close, coin on copy, start). Off until the visitor turns it on; the choice is saved.

## Do / Don't

- Do keep pixel art to the avatar, icons, lettering and frames; paragraphs stay in the sans.
- Do label every game term with its plain meaning nearby.
- Don't add percentage bars, invented stats, fake loading screens or forms that don't send.
