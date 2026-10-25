---
name: Navin Byron Llanes, Portfolio
description: A construction drawing set. Six sheets, one title block, one blue line.
colors:
  paper: "#fbfbfa"
  paper-2: "#f0f1f0"
  ink: "#121314"
  ink-2: "#55585c"
  hair: "#c9cbcd"
  blue: "#2b4cff"
  blue-press: "#1e38d6"
  on-blue: "#ffffff"
  scrim: "rgb(10 11 12 / 0.6)"
  night-paper: "#111315"
  night-paper-2: "#1a1d20"
  night-ink: "#e9eaeb"
  night-ink-2: "#a3a7ac"
  night-hair: "#34383d"
  night-blue: "#8196ff"
  night-blue-press: "#a2b1ff"
  night-on-blue: "#0a0d1f"
  night-scrim: "rgb(0 0 0 / 0.7)"
typography:
  display:
    fontFamily: "Archivo, Arial, sans-serif"
    fontSize: "clamp(5rem, 0.5rem + 15vw, 14rem)"
    fontWeight: 800
    lineHeight: 0.82
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Archivo, Arial, sans-serif"
    fontSize: "clamp(2.75rem, 1rem + 5.4vw, 6rem)"
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: "-0.04em"
  title:
    fontFamily: "Archivo, Arial, sans-serif"
    fontSize: "clamp(2rem, 1.1rem + 2.6vw, 3.5rem)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.035em"
  title-sm:
    fontFamily: "Archivo, Arial, sans-serif"
    fontSize: "1.625rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  subhead:
    fontFamily: "Archivo, Arial, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.015em"
  body-lg:
    fontFamily: "Archivo, Arial, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 400
    lineHeight: 1.55
  body:
    fontFamily: "Archivo, Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    fontFeature: "\"tnum\" 1"
  body-sm:
    fontFamily: "Archivo, Arial, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.35
  button:
    fontFamily: "Archivo, Arial, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 600
    lineHeight: 1.2
  label:
    fontFamily: "Archivo Narrow, Arial Narrow, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.6
    letterSpacing: "0.06em"
rounded:
  none: "0px"
spacing:
  s-1: "4px"
  s-2: "8px"
  s-3: "12px"
  s-4: "16px"
  s-6: "24px"
  s-8: "32px"
  s-12: "48px"
  s-16: "64px"
  s-24: "96px"
  s-32: "128px"
  frame: "clamp(8px, 1.4vw, 20px)"
  bar: "48px"
  pad: "clamp(1rem, 0.4rem + 2.6vw, 3rem)"
components:
  button-primary:
    backgroundColor: "{colors.blue}"
    textColor: "{colors.on-blue}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: "0 24px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.blue-press}"
    textColor: "{colors.on-blue}"
  button-line:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: "0 24px"
    height: "48px"
  button-line-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  button-quiet:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    height: "48px"
  button-quiet-hover:
    backgroundColor: "{colors.paper-2}"
    textColor: "{colors.ink}"
  button-icon:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    size: "48px"
  sheet-index:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink-2}"
    typography: "{typography.body-sm}"
    height: "{spacing.bar}"
  title-block-cell:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.body-sm}"
    padding: "12px 16px"
  dialog-panel:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "32px 24px 24px"
    width: "min(440px, calc(100vw - 2rem))"
  key-next:
    backgroundColor: "{colors.blue}"
    textColor: "{colors.on-blue}"
    rounded: "{rounded.none}"
    size: "40px"
---

# Design System: Navin Byron Llanes, Portfolio

## Overview

**Creative North Star: "The Drawing Set"**

The site is a construction drawing set. Every section is one sheet (A-001 to A-501), the viewport is the sheet, and a fixed frame with grid-reference ticks holds every sheet the same way. The reader moves through the set on one scroll axis: the sheet index along the top edge marks where they are, a drafting rule draws itself under each sheet title, and a title block carrying name, sheet number and the two actions (race, email) travels with them between the cover and the contact sheet.

The material is paper and linework. A near-white sheet, near-black ink, grey hairlines for secondary lines, and one blueprint blue. Depth comes only from line weight: a heavy 2px border line for the frame, index bar, title blocks and dialogs; 1px ink object lines for sheets, tables and buttons; grey hairlines for cell divisions. There are no shadows, no gradients and no rounded corners. Type is one grotesk family (Archivo) set very heavy for titles, with its narrow cut (Archivo Narrow) in small caps-style uppercase for annotation notes, and tabular figures everywhere so sheet numbers, dates and counts align like a schedule.

Density is drafting-office: generous sheet margins, tight cell grids inside them. Every record carries its spec beside it (projects, certificates, title block cells), each sheet has one loudest fragment (the heavy sheet title or the name), and the Night set is the same drawing on an ink-dark sheet with pale linework and a lifted blue.

**Key Characteristics:**
- Fixed sheet frame (2px) inset from the viewport, with A–F grid-reference letters and ticks in both side margins.
- Sheet index rail across the top: sheet number + label, current sheet underlined in blue, scroll progress as a 1px blue line.
- Title blocks: cell grids with narrow uppercase notes over 600-weight values, bordered top and left with the heavy line.
- Heavy Archivo 800 titles at tight negative tracking; Archivo Narrow 600 uppercase notes.
- Line weight is the only depth cue. Square everything.
- One blue, and it always means "act here", "you are here", or "this is wrong".

## Colors

A monochrome drafting palette (warm-neutral paper, cool near-black ink, grey hairline) with a single saturated blueprint blue.

### Primary
- **Blueprint Blue** (blue; Night: night-blue): the primary action fill (Race my 92 wpm, Open email app, Try again, skip link), the current sheet's 3px underline in the index, the 1px scroll-progress line and the pinned-projects meter, the redline for race mistakes (wrong characters underlined, wrong words struck through), the caret, the next key on the race keyboard, a won race's title, focus outlines, text selection, and the contact email on hover.
- **Pressed Blue** (blue-press; Night: night-blue-press): hover/press state of primary buttons only.
- **On Blue** (on-blue; Night: night-on-blue): text and icons on a blue fill.

### Neutral
- **Drafting Paper** (paper; Night: night-paper): the sheet itself, and the fill behind every fixed element (index bar, title block, dialogs, dimension label) so linework reads as drawn on the same sheet.
- **Well Grey** (paper-2; Night: night-paper-2): the only tonal shift. Row and link hover, quiet-button hover, certificate plate image wells.
- **Drawing Ink** (ink; Night: night-ink): text and all structural linework. The `--line` token is the same value as ink; use it for borders so linework and text can diverge later without a rename.
- **Note Grey** (ink-2; Night: night-ink-2): secondary text, notes, schedule periods and places, past sheets in the index, counts. 7:1 on paper.
- **Hairline Grey** (hair; Night: night-hair): secondary lines only, never text. Cell divisions inside title blocks, spec columns, schedule rows, legend columns, unpressed keys.
- **Scrim** (scrim; Night: night-scrim): dialog backdrop.

### Named Rules
**The One Blue Rule.** Blue means one of three things: the primary action, where you are in the set (current sheet, progress), or a redline (a mistake in the race). It never decorates, never fills a section, and never appears as a second accent tint.

**The Hairline Is Not Ink Rule.** Hairline grey draws divisions inside a component; ink draws the component's outline. Text is never set in hairline grey.

## Typography

**Display Font:** Archivo (with Arial, sans-serif), self-hosted, weights 400–900
**Body Font:** Archivo (same family)
**Label Font:** Archivo Narrow (with Arial Narrow, sans-serif), weights 400–700

**Character:** One grotesk at every size, driven by weight rather than family changes: 800 with tight negative tracking for titles, 600 for values and buttons, 400 for reading. The narrow cut is the lettering of a drawing's notes. Tabular figures are on globally (`font-variant-numeric: tabular-nums`).

### Hierarchy
- **Display** (800, clamp 5rem–14rem, 0.82, -0.04em): the cover name only, one letter per mask so it can rise from its baseline.
- **Headline** (800, clamp 2.75rem–6rem, 0.95, -0.04em): sheet titles in every sheet head, and the 404 title.
- **Title** (800, clamp 2rem–3.5rem, 1, -0.035em): project names on detail sheets.
- **Title Small** (700, 1.625rem, 1.2, -0.02em): experience roles, spec-column figures, dialog titles (800, -0.03em), race stats.
- **Subhead** (700, 1.25rem, -0.015em): legend group heads, certificate subsections, plate titles.
- **Body Large** (400, 1.25rem, 1.55): cover bio (max 54ch), contact race line (max 44ch).
- **Body** (400, 1rem, 1.6): running text; project descriptions at 1.0625rem in note grey, max 58ch. Global measure token 66ch.
- **Body Small / Value** (600, 0.875rem, 1.35): title-block and spec values, index labels (400), sheet notes.
- **Label / Note** (Archivo Narrow 600, 0.75rem, 0.06em, uppercase, note grey): every `dt` in a cell grid, schedule column heads, figure captions, sheet numbers.

### Named Rules
**The Weight Not Family Rule.** Hierarchy is made with Archivo's weight axis and size, never by introducing a second display family. The only other face is Archivo Narrow, and only for notes, sheet numbers, periods and counts.

**The Note Sits In Its Cell Rule.** Uppercase narrow notes label a value directly beneath them in the same cell (title blocks, specs, schedules). They are not floated above headings as section kickers.

## Layout

The viewport is the sheet. A fixed frame is inset by `frame` on all sides (2px heavy line), with paper filling the margin so content scrolling past is masked at the border. The sheet index bar (48px) is fixed along the top inner edge; `main` is padded to clear frame and bar, and `scroll-padding-top` matches so anchors land below the bar. Grid-reference letters A–F sit evenly down both side margins at 10px Archivo Narrow with an 8px ink tick crossing into the sheet; they hide below 760px.

Sheets are full-width sections divided by a 1px ink top border, with horizontal `pad` and block padding of 128px top / 64px bottom (96px / 48px under 900px). Each opens with a sheet head. Inside sheets, structure is cell grids rather than cards: 4-column title-block cells (1fr 1.6fr 1fr 1fr), a 4-column legend, a 2-column plate grid, a 5-column certificate list row, a 4-column contact cell grid. These collapse to 2 columns at 1100px and to 1 at 760px; the schedule table becomes stacked blocks at 760px.

The cover is a two-column grid (name and bio left, framed portrait right at clamp 240–400px) with the title block flush to the frame's lower-right corner. Under 900px the order becomes name, title block, portrait; under 480px the title block's actions move first so race and email sit in the first screen.

The projects sheet pins (sticky below the bar) at min-width 900px and min-height 560px, and its detail sheets (min(68vw, 940px) wide) slide sideways 1:1 with vertical scroll, with a count and blue meter below. Elsewhere the detail sheets stack vertically.

Spacing is a 4px unit (s-1 to s-32). Gaps inside components are 8, 12, 16 or 24px; between blocks 32 or 48px; between sheets 96–128px.

## Elevation & Depth

Flat. There is no `box-shadow` anywhere in the system and no tonal layering beyond the single well grey. Depth is conveyed by line weight alone: the heavy 2px border line marks the things that sit on top of or frame the set (sheet frame, index bar, title blocks, dialog panels); 1px ink object lines outline sheets, project detail sheets, tables, buttons and plates; grey hairlines divide cells. Fixed elements (index, title block, dialogs) are filled with paper so they occlude what passes under them, which is enough to read them as being on top.

### Named Rules
**The Line Weight Is Depth Rule.** If something needs to read as above the sheet, give it paper fill and the 2px heavy line. Never a shadow, blur or glow.

## Shapes

Square. Every container, button, input, key, image frame and dialog has 0 radius; there is no radius token above `none`. Forms are rectangles assembled from lines: open-sided title blocks (heavy top and left border only, closing against the frame), spec columns separated by a 1px ink vertical, and drafting devices built from lines and ticks: the dimension line under the cover name (1px line, 17px end ticks, label knocked out on paper) and the drafting rule under each sheet title (1px line, 13px end ticks). The portrait sits in a 1px ink frame with 8px paper inset. Icons are a single 1.75 stroke set, with brand marks filled; their own internal corners are glyph geometry, not a container radius.

## Components

### Buttons
Square and line-drawn; they fill on hover like a key being inked.
- **Shape:** square (0px), min-height 48px, 24px horizontal padding, 1px border, Archivo 600 at 0.9375rem, 8px icon gap with 18px icons.
- **Primary:** blue fill and border, on-blue text. Hover moves to pressed blue. Used once per context for the main action (race, open email app, try again).
- **Line (default):** transparent with a 1px ink border and ink text; hover inverts to an ink fill with paper text.
- **Quiet:** transparent border; hover fills well grey. Used for the theme toggle, dialog close and the Day/Night set switch (the pressed set gains the ink border).
- **Icon:** 48px square, no padding. Socials and copy.
- **Active:** translateY(1px). **Focus:** 2px blue outline offset 3px (global).
- Transitions on background, color and border at 140ms ease.

### Sheet Index (navigation)
The site navigation and the scroll rail, fixed across the top edge of the frame.
- **Style:** 48px bar, paper fill, 2px heavy border; one cell per sheet divided by hairlines, each cell an Archivo Narrow 600 sheet number plus a 0.875rem label in note grey.
- **States:** hover fills well grey and inks the label; the current sheet is ink 700 with a 3px blue underline; the next sheet ahead is printed at full ink, past sheets stay grey. A 1px blue progress line along the bottom edge scales with total scroll.
- **Theme toggle:** quiet icon button at the right end with a 1px ink divider.
- **Mobile (under 760px):** cells stop stretching, only the current sheet keeps its label, and the bar scrolls horizontally to keep the current sheet in view.

### Title Block
The signature component. Present as a full block on the cover and on the contact sheet, and as a compact block fixed in the frame's lower-right corner on every sheet between them.
- **Cover title block:** heavy top and left border, a 4-column cell grid (Role, School, Location, Phone) with hairline divisions and narrow notes over 600-weight values, then an action row (primary race button, line email button, icon socials) and "Sheet A-001 of 06" pushed right.
- **Compact title block:** paper fill, heavy top and left border, cells for "Drawn by" and the live sheet number (the "of 06" in note grey 400), and the race and email buttons at 44px. It slides up from below the frame (520ms ease-out) when neither full title block is in view and hides when either is. Under 760px it spans the frame width; under 420px email collapses to its icon.

### Sheet Head
One per sheet: the Archivo Narrow sheet number in ink, the heavy headline title, a note-grey 0.875rem note right-aligned, and a 1px ink drafting rule along the bottom with 13px end ticks. The rule scales from the left as the sheet arrives (scroll-scrubbed), and its right tick appears only when the line is complete. Under 600px the note drops to its own row, left-aligned.

### Cards / Containers (detail sheets and plates)
- **Corner Style:** square (0px).
- **Background:** paper; plate image wells in well grey with 16px inset.
- **Shadow Strategy:** none (see Elevation & Depth).
- **Border:** 1px ink outline; internal divisions 1px ink (spec column, plate image) or hairline (spec rows).
- **Project detail sheet:** main column (title, note-grey description, actions pinned to the bottom) beside a 200–240px spec column of note/value cells (Detail number, Type, an optional large figure at 1.625rem 800, Source, Demo). Under 900px the spec moves below as a 2-column grid, 1 column under 480px.
- **Certificate plate:** image well, then a caption row with a 700 title and inline note/value spec. Image scales to 1.025 on hover (600ms ease-out).
- **Internal Padding:** 32px for detail sheets (24/16 on phones), 12px 16px for spec cells, 16px for plates.

### Schedules and Legends (tables and lists)
- **Experience schedule:** a real table. Narrow uppercase column heads over a 1px ink rule; rows divided by hairlines with 24px block padding; period in Archivo Narrow note grey with "Present" in ink 700; role at Title Small; organisation 500; place note grey. Rows hover to well grey. Stacks per row under 760px.
- **Stack legend:** 4 columns divided by hairlines; each group head is a 700 subhead with a narrow note-grey count, over a 1px ink rule; items are hairline-divided rows.
- **Certificate list:** a row grid (96×68 thumbnail with hairline border, 600 title, kind, date, arrow), hairline-divided under a 1px ink top rule. Hover fills well grey and nudges the arrow up-right 2px.

### Inputs / Fields
- **Style:** the email field in the email dialog is a 1px ink box holding the address (600, 0.875rem, select-all) with a 1px-ink-divided icon copy button.
- **Focus:** global 2px blue outline.
- **Status:** copy confirmation in note grey via a polite live region; the copy icon swaps to a check.

### Dialogs
A loose sheet laid over the set: paper panel, 2px heavy border, 0 radius, no shadow, over the scrim. 440px wide (email, result) or 760px (race). Title at 1.625rem 800, note-grey sub, quiet close button top-right. Smooth scrolling pauses while a dialog is open.

### Typing Race
- **Stats:** a 1px ink box of three hairline-divided cells, narrow uppercase labels over 800 figures, units in note grey.
- **Track:** 1.375rem words in note grey at 0.75 opacity; correct characters ink; mistakes redlined in blue with underline (characters) or strike-through (words) so the cue never rests on colour; a 2px blue blinking caret.
- **Keyboard in plan:** 40px square hairline keys in Archivo Narrow; the next key filled blue, a pressed key filled ink. 28×34px on phones.
- **Result:** a won race sets the result title in blue.

### Motion
- **Intro (cover, once):** name letters rise from a baseline mask (105% to 0, 900ms, 70ms stagger, expo out); the dimension line draws outward from its centre (scaleX 0 to 1, 900ms, in-out expo); bio, portrait and title block fade up 14px in a 70ms stagger.
- **Scroll-scrubbed:** index progress line, sheet-head drafting rules, the pinned projects track and meter, all written from one per-frame update driven by Lenis smoothing (lerp 0.11).
- **List reveals (once, on entry):** rows settle up 14px with fade (640ms, stagger capped at 480ms total); certificate plates wipe down by clip-path like a sheet being printed (1000ms, 120ms stagger).
- **State transitions:** 140ms ease for colour; 240ms ease-out for movement; 520ms ease-out for the title block.
- **Reduced motion:** no smoothing, no pinning, no drawing; rules render fully drawn and all content is visible from the start. Pre-hiding only applies when JS has run and motion is welcome, with a 3s safety release.

## Do's and Don'ts

### Do:
- **Do** frame every page in the fixed sheet frame with the sheet index across the top; a new page is a new sheet with its own A-number (404 links back to the home sheets).
- **Do** open each sheet with a sheet head: sheet number, heavy headline title, a note, and the drafting rule with end ticks.
- **Do** carry spec beside every record as note/value cells (narrow uppercase note over a 600 value), divided by hairlines.
- **Do** use the 2px heavy line only for the frame, index bar, title blocks and dialog panels; 1px ink for object outlines; hairline grey for internal divisions.
- **Do** keep blue to primary actions, current-sheet and progress marks, and redlines; pair any blue error cue with underline or strike-through.
- **Do** give every reveal a visible default: content must be fully present without JS and under reduced motion.
- **Do** keep tabular figures on for sheet numbers, dates, counts and stats.

### Don't:
- **Don't** add shadows, blurs, glows or gradients; depth is line weight and paper fill only.
- **Don't** round corners on any container, button, field, key or image frame.
- **Don't** introduce a second accent colour or tint blue into backgrounds or section fills.
- **Don't** set text in hairline grey or use hairlines as the outline of a component.
- **Don't** add a display family beside Archivo, or use Archivo Narrow for anything other than notes, sheet numbers, periods, counts and keys.
- **Don't** float uppercase notes above headings as section kickers; notes belong inside cells and sheet heads.
- **Don't** wrap records in cards with fills; use outlined detail sheets, cell grids and schedules.
