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

## Typography

- **Pixelify Sans** (400–700): cover title, chapter titles, project and quest names, small uppercase tags, keys.
- **Geist**: all paragraphs and descriptions.
- **Geist Mono**: dates, page numbers, handles, the status line and terminal.
- No eyebrow labels above headings; a plain subtitle sits beside each chapter title.

## Components

- **Window** (`.win`): 2px frame with its four corner pixels removed (a 16-bit menu box), optional `.win-bar` title row. It's the only boxed element on the page.
- **Key** (`.key`): notched pixel button, pixel label, presses down 2px. `.key--primary` is amber.
- **Status** (`.status`): an 8px square lamp plus a pixel label; the colour comes from the state.
- **Pixel art**: `PixelAvatar` (24×24 bust drawn from Navin's photo, blinks every ~5 s) and `PixelIcon` (12×12 item icons). Both are SVG grids; edit the character rows to redraw.
- **Header**: chapter index with numbers matching the chapter page numbers, sound switch (labelled, default off), and a 25-cell amber meter that fills in whole cells as you read.

## Layout

- Content width 1160px, fluid gutters. Chapters are separated by a dashed rule and 96px of space (64px on phones).
- Projects: a project with a real screenshot is featured (shot left, spec right); the others are rows in one item list with a drawn icon slot.
- Journey: a dashed path with square level nodes (amber = current), beside the education window and certificates.
- Below 860px the nav folds into a menu and every grid becomes one column.

## Motion and sound

- Anime.js with stepped easing: the cover steps in and the status line types once; each chapter block steps in once; item rows follow in sequence.
- CSS: blinking cursor and PRESS START triangle, avatar blink, stepped hover changes.
- Reduced motion: no smooth scroll, no reveals, no typing, no blinking.
- Sound: Web Audio chiptune blips (select, open/close, coin on copy, start). Off until the visitor turns it on; the choice is saved.

## Do / Don't

- Do keep pixel art to the avatar, icons, lettering and frames; paragraphs stay in the sans.
- Do label every game term with its plain meaning nearby.
- Don't add percentage bars, invented stats, fake loading screens or forms that don't send.
