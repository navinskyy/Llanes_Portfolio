---
name: Navin Byron Llanes, Portfolio
description: A keyboard kit you can type on. Colorway NAVIN/92.
colors:
  alpha: "#e4e7eb"
  alpha-2: "#f1f3f5"
  panel: "#f8f9fa"
  modifier: "#343b47"
  modifier-2: "#4a5260"
  legend: "#14171c"
  legend-muted: "#4c5562"
  legend-on-mod: "#eef0f3"
  rule: "#c5cad1"
  accent: "#f0532d"
  accent-ink: "#14171c"
  accent-on-mod: "#ff9273"
  wrong: "#c2321b"
  cap-lip: "#b9bec6"
  lip-modifier: "#1d222a"
  lip-accent: "#b53718"
typography:
  display:
    fontFamily: "Michroma, Arial, sans-serif"
    fontSize: "clamp(3rem, 1rem + 8vw, 6rem)"
    fontWeight: 400
    lineHeight: 0.95
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Michroma, Arial, sans-serif"
    fontSize: "clamp(1.75rem, 1.2rem + 2vw, 2.5rem)"
    fontWeight: 400
    lineHeight: 1.15
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Michroma, Arial, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 400
    lineHeight: 1.15
    letterSpacing: "-0.01em"
  title-sm:
    fontFamily: "Michroma, Arial, sans-serif"
    fontSize: "1.1875rem"
    fontWeight: 400
    lineHeight: 1.15
  body-lg:
    fontFamily: "Public Sans, system-ui, sans-serif"
    fontSize: "1.1875rem"
    fontWeight: 400
    lineHeight: 1.65
  body:
    fontFamily: "Public Sans, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  body-sm:
    fontFamily: "Public Sans, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.6
  action:
    fontFamily: "Public Sans, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 700
    letterSpacing: "0"
  label:
    fontFamily: "Michroma, Arial, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 400
    letterSpacing: "0.04em"
  data:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.3
    fontFeature: "\"tnum\" 1"
rounded:
  sm: "6px"
  cap: "10px"
  panel: "14px"
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
  gutter: "clamp(1rem, 0.5rem + 2.5vw, 3rem)"
  measure: "66ch"
components:
  cap:
    backgroundColor: "{colors.alpha-2}"
    textColor: "{colors.legend}"
    typography: "{typography.label}"
    rounded: "{rounded.cap}"
    padding: "8px 16px 11px"
    height: "44px"
  cap-hover:
    backgroundColor: "{colors.panel}"
  cap-mod:
    backgroundColor: "{colors.modifier}"
    textColor: "{colors.legend-on-mod}"
    rounded: "{rounded.cap}"
    padding: "8px 16px 11px"
    height: "44px"
  cap-mod-hover:
    backgroundColor: "{colors.modifier-2}"
  cap-accent:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.accent-ink}"
    typography: "{typography.action}"
    rounded: "{rounded.cap}"
    padding: "8px 16px 11px"
    height: "44px"
  cap-square:
    backgroundColor: "{colors.alpha-2}"
    textColor: "{colors.legend}"
    rounded: "{rounded.cap}"
    padding: "8px 12px 11px"
    width: "44px"
    height: "44px"
  section-key:
    backgroundColor: "{colors.alpha-2}"
    textColor: "{colors.legend}"
    rounded: "{rounded.cap}"
    padding: "4px 16px 8px"
    width: "7.5rem"
  section-key-current:
    backgroundColor: "{colors.modifier}"
    textColor: "{colors.legend-on-mod}"
  sheet:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.legend}"
    rounded: "{rounded.panel}"
    padding: "24px"
  printed-legend:
    backgroundColor: "{colors.alpha}"
    textColor: "{colors.legend}"
    rounded: "{rounded.sm}"
    padding: "8px 12px"
  spec-field:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.legend}"
    rounded: "{rounded.cap}"
    padding: "12px 16px"
---

# Design System: Navin Byron Llanes, Portfolio

## Overview

**Creative North Star: "The Keycap Kit Sheet"**

The site is a keycap set laid out on its printed kit sheet, colorway NAVIN/92. Everything you can press is a sculpted keycap: a 1px hairline-bordered cap that sits on a bottom lip and drops 3px when struck, by mouse or by the matching physical key. Everything you read is printed flat on the sheet: hairline-ruled rows, flat panels, and spec fields in which a wide mechanical legend labels a value. The ground is a pale, cool grey plastic; slate modifier keys carry weight; one signal-orange key carries the primary action.

Density is moderate and calm. Content runs on a 1240px board with fluid gutters, prose is held to a 60–66ch measure, and lists are ruled rows rather than card grids. Motion is mechanical and short. Keys depress in 120ms. The home name types in letter by letter as keystrokes (85ms stagger, outExpo), and list rows settle upward on scroll. With reduced motion, everything is visible and still.

There are two colorways, Day (light, the default) and Night (dark, which follows the OS until the visitor picks one). A visible "Colorway NAVIN/92" legend with swatch chips in the footer switches between them. Both colorways share one structure; only the plastic changes.

**Key Characteristics:**
- Pressable things are lipped keycaps. Readable things are printed flat.
- One orange key per context. Slate marks the current position.
- A wide mechanical legend face (Michroma) for keys, labels and display. A workhorse sans (Public Sans) for prose and action legends. Mono (JetBrains Mono, tabular) for measured data.
- Hairline 1px rules in `rule` grey frame every panel, field and list row.
- Physical keyboard shortcuts (H, P, E, S, C, T) press the on-screen cap.

## Colors

A cool-grey plastic palette with a single hot signal orange. Every neutral leans slightly blue (hue around 255–260 in OKLCH), and the orange is the only saturated hue on any screen.

### Primary
- **Signal Orange** (accent): the race key, the primary action key inside each dialog ("Open email app", "Try again"), the next-key highlight on the virtual keyboard, the typing caret, the focus ring, text selection, the period after NAVIN, and the hover tint on index arrows. Legends on it are always near-black `accent-ink`, never white.
- **Orange Lip** (lip-accent): the darker bottom lip under orange caps. In the Day colorway it also colors the "won" result title, where the base orange would be too light to read as text.
- **Orange on Slate** (accent-on-mod): accent-colored legends printed on slate keys, such as the current section letter, the brand period and the active H sub-legend. It holds 5.2:1 contrast on `modifier`.

### Neutral
- **Alpha Plastic** (alpha): the page ground, and the well behind fields (the email field, printed legends, the certificate image well).
- **Raised Alpha** (alpha-2): the default keycap face, the footer band and row hover.
- **Sheet White** (panel): flat printed panels, dialogs, spec-field boxes, cap hover and the pressed colorway chip.
- **Slate Modifier** (modifier): modifier keys (brand, Email me), the current section key, the portrait frame and the "Present" tag.
- **Slate Hover** (modifier-2): the hover state of modifier keys and the scrollbar thumb.
- **Modifier Lip** (lip-modifier): the bottom lip under slate caps and the portrait frame.
- **Legend Black** (legend): primary text and legends.
- **Muted Legend** (legend-muted): secondary text, spec-field labels (dt), counts' units and hints.
- **Legend on Slate** (legend-on-mod): text on modifier surfaces.
- **Hairline** (rule): every 1px border and divider.
- **Cap Lip** (cap-lip): the bottom lip under neutral caps.
- **Mistype Red** (wrong): incorrect characters and words in the typing race. It is used only there.

### Night colorway
The Night values override the same tokens under `[data-theme='dark']`: alpha `#171b21`, alpha-2 `#1d222a`, panel `#222831`, modifier `#2e3540`, modifier-2 `#3a4250`, legend `#e8ebef`, legend-muted `#a3acb8`, legend-on-mod `#e8ebef`, rule `#343c48`, accent `#ff6a45`, wrong `#ff7a66`, cap-lip `#0e1115`, and a pure-black cap shadow. The accent is lifted slightly (from `#f0532d` to `#ff6a45`) to hold contrast on slate.

### Named Rules
**The One Orange Key Rule.** Within any one context (the hero, the board, a dialog), orange fills exactly one key, and that key is the primary action. Every other use of orange is a thin signal: a ring, caret, period or arrow tint. Orange never fills a panel, a row or a heading background.

**The Slate Means Here Rule.** The current page is shown by turning its section key slate (`modifier`) with an orange-on-slate letter. Orange is not used for the current page.

## Typography

**Display Font:** Michroma (with Arial, sans-serif), self-hosted, weight 400 only
**Body Font:** Public Sans (with system-ui, sans-serif), weights 400–700
**Label/Mono Font:** JetBrains Mono (with ui-monospace, monospace), weights 400 and 600

**Character:** Michroma is the legend printed on the caps. It is wide, squared and mechanical, and it sets the name, the headings and the small spec labels. Public Sans does the honest work: prose, roles, and the bold legends on action keys. Mono appears only where a value is measured or counted.

### Hierarchy
- **Display** (400, clamp(3rem, 1rem + 8vw, 6rem), 0.95): only the home name, NAVIN, with an orange period. It types in as keystrokes.
- **Headline** (400, clamp(1.75rem, 1.2rem + 2vw, 2.5rem), 1.15): inner page titles at the head of each page.
- **Title** (400, 1.5rem, 1.15): project names, dialog titles and the hero surname line (in `legend-muted`).
- **Title small** (400, 1.1875rem): section titles ("On the board") and experience role titles. Stack group names step down to 1rem.
- **Body large** (Public Sans 400, 1.1875rem, 1.65): the hero bio, max 60ch. It drops to 1rem below 900px.
- **Body** (Public Sans 400, 1rem, 1.6): prose, max `measure` (66ch).
- **Body small** (Public Sans 400/600, 0.875rem): metadata, hints, categories (600, muted) and printed legends (600).
- **Action legend** (Public Sans 700, 0.875–1rem, letter-spacing 0): text on action keys (Race, Email me, View code, Open email app, Try again).
- **Label** (Michroma 400, 0.75rem, 0.04em): default cap legends, spec-field labels (dt) and the colorway legend.
- **Data** (JetBrains Mono 600, tabular-nums, 1.5rem in stat fields, smaller inline): wpm, accuracy, seconds, counts padded to two digits ("04 projects"), dates and the phone number.

### Named Rules
**The Measured-in-Mono Rule.** Mono with tabular figures is for quantities and dates (wpm, %, s, counts, issue dates, phone digits). Prose, names and labels are never set in mono.

**The Single-Weight Legend Rule.** Michroma ships at 400 only. Hierarchy in the legend face comes from size and color, never from bold or synthetic weight. There is no `text-transform` anywhere. Uppercase comes from the content itself (NAVIN, key letters).

## Layout

Everything sits on one centered board, max-width 1240px, with fluid side gutters (clamp(1rem, 0.5rem + 2.5vw, 3rem)) and 96px of bottom padding on main. Spacing follows a 4px unit (4, 8, 12, 16, 24, 32, 48, 64, 96). Inner pages open with a page head (48px above, 32px below, max 66ch).

- **The board** is a sticky top bar: a three-column grid (brand cap | centered section keys | race and theme caps) on a translucent alpha ground, blurred 10px, with a hairline underneath. Below 900px the section keys wrap to a second row as a four-column grid. Below 520px the key labels shrink to 12px and the sub-legends hide.
- **The hero** is a two-column grid (text | portrait, minmax(280px, 420px)) with a 64px gap. Below 900px it stacks and the portrait becomes a 16:10 crop.
- **Lists are ruled rows**, not card grids. Projects, experience and the home index run between 1px hairlines, with 24–32px block padding per row and a fixed left column (15rem for experience and the stack label column, 13rem right rail for project figures). Rows collapse to one column at 700–760px.
- **Panels** (stack groups, certificate plates, dialogs) are used where content is a grouped set. Certificates tile in an auto-fill grid (min 280px, 24px gap).

Breakpoints in use: 900px (board and hero), 760px (projects, stack), 700px (experience), 600px (typing dialog), 520px (board compaction), 420px (hero actions go full width). Hover-only hints hide under `(hover: none)`.

## Elevation & Depth

Depth belongs only to the caps. The sheet itself is flat: panels, fields and rows have no shadow and are separated by hairlines and by tonal steps (alpha, then alpha-2, then panel). A keycap reads as raised because of an inset bottom lip plus a soft, offset ambient shadow. Pressing it shortens the lip and moves the cap down 3px. Two other things float: the portrait frame, which is a large slate "cap" with a deep lip, and modal dialogs.

### Shadow Vocabulary
- **Cap at rest** (`box-shadow: inset 0 -4px 0 var(--cap-lip), 0 2px 3px rgb(20 23 28 / 0.12), 0 6px 12px -6px rgb(20 23 28 / 0.25)`): every keycap, index key and virtual-keyboard key.
- **Cap down** (`box-shadow: inset 0 -1px 0 var(--cap-lip), 0 1px 1px rgb(20 23 28 / 0.12)`): pressed, active, `.is-down` from a physical shortcut, and index-row hover.
- **Portrait frame** (`box-shadow: inset 0 -6px 0 #1d222a, 0 18px 40px -18px rgb(20 23 28 / 0.45)`): the hero portrait only.
- **Dialog lift** (`box-shadow: 0 16px 28px -10px rgb(0 0 0 / 0.3)`): modal panels over a `rgb(10 12 15 / 0.55)` backdrop.

### Named Rules
**The Actions-Are-Keys Rule.** The lipped cap shadow marks something you can press, plus the decorative virtual keyboard in the race. Content items such as skills, tags, figures and certificate plates are printed flat with a hairline and never get a lip.

**The Flat Sheet Rule.** A panel that does not float (one that is not a dialog) carries no shadow. It is separated by a 1px `rule` hairline and a tonal step.

## Shapes

Shapes are softly squared, like keycaps. There are three radii: 10px on caps, fields, spec boxes and colorway buttons; 14px on sheet panels, stack groups and the portrait image, with the portrait frame at 18px; and 6px on printed legends, certificate plates and the focus outline. Small inline key hints (`kbd`) use 4–5px, and virtual keys use 8px. Borders are always 1px solid `rule`. Dashed hairlines mark placeholder or secondary separators (the "Repository not public" slot, and the mobile date band on experience). Images inside frames are clipped to the frame's inner radius.

## Components

### Keycap (button / link)
Tactile and literal. A key sits on a lip and goes down when struck.
- **Shape:** 10px radius, 1px border, minimum 44×44px. The bottom padding is 3px deeper than the top to leave room for the lip.
- **Default (alpha cap):** the alpha-2 face, legend text and the Michroma label legend. Hover moves to the panel face.
- **Modifier (slate cap):** the modifier face, legend-on-mod text and the modifier lip. Hover moves to modifier-2. Used for the brand key and "Email me".
- **Accent (orange cap):** the accent face, accent-ink text, the orange lip and the bold Public Sans action legend. Hover mixes 12% white into the face. One per context.
- **Square:** a 44px icon-only cap for theme, close, copy and the social links. It holds an 18px stroke icon.
- **Press:** `translateY(3px)` plus the cap-down shadow, 120ms `cubic-bezier(0.16, 1, 0.3, 1)`. Physical shortcuts add `.is-down` for 140ms.
- **Focus:** a 2px accent outline, 3px offset, 6px radius (global).

### Section Keys (navigation)
- Caps 7.5rem wide, with the letter printed top-left in Michroma and the label beneath in Public Sans 600 at 14px.
- **Current page:** the cap turns slate and the letter turns orange-on-slate.
- **Mobile:** a four-column key row under the brand and tools. At 520px and below, legends center and labels drop to 12px.

### Sheet Panel (card / container)
- **Corner Style:** 14px (6px for certificate plates).
- **Background:** panel, on the alpha ground.
- **Shadow Strategy:** none (Flat Sheet Rule). Dialogs are the exception.
- **Border:** 1px rule.
- **Internal Padding:** 24px (16px on mobile). Dialogs use 32px top and 24px sides.

### Spec Fields
A printed data block. A Michroma 12px muted label (dt) sits over or beside a mono tabular value (dd, 600). The variants are a three-up stat strip (wpm / accuracy / time left) divided by hairlines inside a 10px-radius frame, a two-column dt/dd ruled list under certificate plates (5.5rem label column), and the project figure box (a panel face with a 10px radius and the value at 1.5rem).

### Printed Legends (chips)
- **Style:** an alpha face, a 1px rule border, 6px radius, 8×12px padding, Public Sans 600 at 14px.
- **State:** none. They are flat and not pressable, by the Actions-Are-Keys Rule.

### Inputs / Fields
- **Email field:** an alpha well, a 1px rule border, 10px radius, the address in body small with `user-select: all`, and a square copy cap inside. On success, the copy icon swaps to an accent check and a polite status line appears.
- **Typing input:** visually hidden. The visible field is the word track: mono at 1.375rem, two 48px lines, muted until typed. Correct characters turn to legend, mistakes turn `wrong` and are underlined, and the caret is a 2px blinking orange bar.

### Index Row (home)
A ruled row that works as a link: a 44px index keycap, a Michroma label, a muted sample line (ellipsized), a mono count padded to two digits with a muted unit, and a 20px arrow. On hover, the row tints alpha-2, the keycap depresses, and the arrow nudges 2px up-right in orange.

### Colorway Switch (signature)
A fieldset legend reads "Colorway NAVIN/92". The Day and Night buttons each show three overlapping 16px swatch chips (ground, modifier, accent) and a name. The pressed option gets a legend-colored border and a panel face.

### Virtual Keyboard (race dialog)
QWERTY rows of 40px keys with an 8px radius and the cap-at-rest shadow (28×34px on mobile). The next key to type turns orange with the orange lip. Pressed keys take the cap-down shadow.

### Icons
A single inline-SVG set: 24px viewBox, 1.75 stroke, round caps and joins, `currentColor`. Brand marks (GitHub, LinkedIn, Instagram) are the only filled glyphs. Icons render at 16px inline and 18px in caps.

## Do's and Don'ts

### Do:
- **Do** make every action a keycap (`cap`, `cap--mod`, `cap--accent`, `cap--square`) with the cap-at-rest lip, 44px minimum, and the 3px press at 120ms.
- **Do** give each context exactly one orange key, and make it the primary action.
- **Do** mark the current location with a slate key and an orange-on-slate letter.
- **Do** print content flat on panel or ruled rows with 1px `rule` hairlines. Separate with tonal steps (alpha, alpha-2, panel), not shadows.
- **Do** set quantities, dates and counts in JetBrains Mono with tabular figures, and pad counts to two digits.
- **Do** use Michroma at 400 for display, headings and small spec labels. Use Public Sans 700 for legends on action keys.
- **Do** define both colorways for any new color, and keep the footer swatches in step with the tokens.

### Don't:
- **Don't** put the lipped cap shadow on non-interactive content: tags, skills, figures and plates stay flat.
- **Don't** fill a second element with orange in the same context, and don't use orange as a panel or section background.
- **Don't** bold Michroma or apply `text-transform`. It ships at one weight.
- **Don't** set prose, names or labels in mono.
- **Don't** add shadows to static panels. Only caps, the portrait frame and dialogs carry depth.
- **Don't** use white legends on the orange key. Its legend is `accent-ink`.
