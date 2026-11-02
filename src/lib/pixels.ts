// Pixel-art helpers. Art is written as character grids (one character per art
// pixel) or generated here; everything renders as SVG rects with crisp edges.
// Generators are seeded, so scenery is identical on every build.
export interface PixelRect {
  x: number;
  y: number;
  w: number;
  /** Height in art pixels; 1 when omitted. */
  h?: number;
  fill: string;
}

/** A finished piece of pixel art: its size in art pixels and its rects. */
export interface Pic {
  w: number;
  h: number;
  rects: PixelRect[];
}

/** Character grid → rects. Horizontal runs of one colour merge into one rect;
 *  characters missing from the palette are transparent. */
export function toRects(art: string[], palette: Record<string, string>): PixelRect[] {
  const rects: PixelRect[] = [];
  art.forEach((row, y) => {
    let x = 0;
    while (x < row.length) {
      const ch = row[x];
      let w = 1;
      while (row[x + w] === ch) w++;
      if (palette[ch]) rects.push({ x, y, w, fill: palette[ch] });
      x += w;
    }
  });
  return rects;
}

export function toPic(art: string[], palette: Record<string, string>): Pic {
  return { w: Math.max(...art.map((r) => r.length)), h: art.length, rects: toRects(art, palette) };
}

/** Small deterministic PRNG so generated scenery is identical on every build. */
export function seeded(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 2 ** 32;
  };
}

/** Stamps several pieces into one picture, later pieces on top. */
export function compose(w: number, h: number, parts: { pic: Pic; x: number; y: number }[], extra: PixelRect[] = []): Pic {
  const rects = parts.flatMap(({ pic, x, y }) => pic.rects.map((r) => ({ ...r, x: r.x + x, y: r.y + y })));
  return { w, h, rects: [...rects, ...extra] };
}

/** Pixels along a straight line (Bresenham), every `step`-th one kept. */
export function line(x0: number, y0: number, x1: number, y1: number, fill: string, step = 1): PixelRect[] {
  const out: PixelRect[] = [];
  const dx = Math.abs(x1 - x0);
  const dy = -Math.abs(y1 - y0);
  const sx = x0 < x1 ? 1 : -1;
  const sy = y0 < y1 ? 1 : -1;
  let err = dx + dy;
  let i = 0;
  for (;;) {
    if (i++ % step === 0) out.push({ x: x0, y: y0, w: 1, fill });
    if (x0 === x1 && y0 === y1) break;
    const e2 = 2 * err;
    if (e2 >= dy) {
      err += dy;
      x0 += sx;
    }
    if (e2 <= dx) {
      err += dx;
      y0 += sy;
    }
  }
  return out;
}

/** A shaded disk (moons, planets): lit from the upper left. */
export function disk(r: number, c: { fill: string; light: string; shade: string; crater?: string }, seed = 1): Pic {
  const size = r * 2;
  const rand = seeded(seed);
  const rects: PixelRect[] = [];
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const dx = x + 0.5 - r;
      const dy = y + 0.5 - r;
      const d = Math.hypot(dx, dy);
      if (d > r) continue;
      let fill = c.fill;
      if (dx + dy > r * 0.7) fill = c.shade;
      else if (dx + dy < -r * 0.9) fill = c.light;
      if (c.crater && d < r - 2 && rand() < 0.07) fill = c.crater;
      rects.push({ x, y, w: 1, fill });
    }
  }
  return { w: size, h: size, rects };
}

/** A pixel ring (HUD decoration). */
export function ring(r: number, fill: string, gap = 0): Pic {
  const size = r * 2 + 1;
  const rects: PixelRect[] = [];
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const d = Math.hypot(x - r, y - r);
      if (Math.abs(d - r) < 0.5 && (!gap || (x + y) % gap !== 0)) rects.push({ x, y, w: 1, fill });
    }
  }
  return { w: size, h: size, rects };
}

/** A snow-capped mountain, lit on its left face. */
export function mountain(h: number, c: { lit: string; shade: string; snow?: string }): Pic {
  const w = h * 2 - 1;
  const rects: PixelRect[] = [];
  for (let y = 0; y < h; y++) {
    const half = y;
    const mid = h - 1;
    const snow = c.snow && y < Math.max(2, Math.round(h / 4));
    rects.push({ x: mid - half, y, w: half + 1, fill: snow ? c.snow! : c.lit });
    if (half) rects.push({ x: mid + 1, y, w: half, fill: snow ? c.snow! : c.shade });
  }
  return { w, h, rects };
}

// ---------- repeating tiles (CSS backgrounds) ----------

function svg(w: number, h: number, rects: PixelRect[]) {
  const body = rects
    .map((r) => `<rect x='${r.x}' y='${r.y}' width='${r.w}' height='${r.h ?? 1}' fill='${r.fill}'/>`)
    .join('');
  return `<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}' shape-rendering='crispEdges'>${body}</svg>`;
}

/** A tile as a CSS url() plus its size in art pixels. */
export interface Tile {
  url: string;
  w: number;
  h: number;
}

export function tile(w: number, h: number, rects: PixelRect[]): Tile {
  // Escape only what a data URI needs; full URI-encoding nearly doubles it.
  const data = svg(w, h, rects).replace(/[<>#%"]/g, encodeURIComponent);
  return { url: `url("data:image/svg+xml,${data}")`, w, h };
}

/** Rolling hills or jagged peaks that repeat seamlessly. Peaks get their own
 *  heights from `seed`; `extra` can add details that sit on the ridge (it is
 *  given each column's height). */
export function ridgeTile(o: {
  w?: number;
  h: number;
  base: number;
  amp: number;
  phase?: number;
  fill: string;
  peaks?: number;
  snow?: string;
  seed?: number;
  extra?: (heights: number[]) => PixelRect[];
}): Tile {
  const { w = 64, h, base, amp, phase = 0, fill, peaks, snow, seed = 1, extra } = o;
  const rand = seeded(seed);
  const peakAmp = Array.from({ length: peaks ?? 0 }, () => amp * (0.5 + 0.5 * rand()));
  const rects: PixelRect[] = [];
  const heights: number[] = [];
  for (let x = 0; x < w; x++) {
    const t = (x / w) * Math.PI * 2;
    let ht: number;
    if (peaks) {
      const pos = (x / w) * peaks + phase;
      const f = pos % 1;
      const a = peakAmp[Math.floor(pos) % peaks];
      ht = Math.round(base + a * (1 - Math.abs(2 * f - 1)) + Math.sin(t * 7 + phase) * 1.2);
    } else {
      ht = Math.round(base + amp * Math.sin(t + phase) + (amp / 2) * Math.sin(3 * t + phase * 2));
    }
    ht = Math.min(h, Math.max(1, ht));
    heights.push(ht);
    rects.push({ x, y: h - ht, w: 1, h: ht, fill });
    const cap = Math.min(3, ht - (base + amp * 0.62));
    if (snow && cap > 0) rects.push({ x, y: h - ht, w: 1, h: Math.ceil(cap), fill: snow });
  }
  if (extra) rects.push(...extra(heights));
  return tile(w, h, rects);
}

/** A row of buildings with lit windows that repeats seamlessly. */
export function skylineTile(o: {
  seed: number;
  w?: number;
  h: number;
  min: number;
  max: number;
  body: string;
  edge?: string;
  windows: string[];
  lit?: number;
  beacon?: string;
  neon?: string[];
}): Tile {
  const { seed, w = 96, h, min, max, body, edge, windows, lit = 0.25, beacon, neon = [] } = o;
  const rand = seeded(seed);
  const rects: PixelRect[] = [];
  let x = 0;
  while (x < w) {
    const bw = Math.min(w - x, 5 + Math.floor(rand() * 8));
    const bh = min + Math.floor(rand() * (max - min));
    const top = h - bh;
    rects.push({ x, y: top, w: bw, h: bh, fill: body });
    if (edge) rects.push({ x, y: top, w: bw, fill: edge });
    // A setback on top of some towers.
    if (bw >= 8 && rand() < 0.35) {
      const sh = 2 + Math.floor(rand() * 3);
      rects.push({ x: x + 2, y: top - sh, w: bw - 4, h: sh, fill: body });
    }
    // An antenna with a beacon pixel.
    if (beacon && bw >= 6 && rand() < 0.3) {
      const ax = x + Math.floor(bw / 2);
      rects.push({ x: ax, y: top - 4, w: 1, h: 4, fill: body }, { x: ax, y: top - 5, w: 1, fill: beacon });
    }
    // A neon strip along the roofline.
    if (neon.length && rand() < 0.25) {
      rects.push({ x: x + 1, y: top + 2, w: Math.max(2, bw - 2), fill: neon[Math.floor(rand() * neon.length)] });
    }
    for (let wy = top + 4; wy < h - 2; wy += 3) {
      for (let wx = x + 1; wx < x + bw - 1; wx += 2) {
        if (rand() < lit) rects.push({ x: wx, y: wy, w: 1, fill: windows[Math.floor(rand() * windows.length)] });
      }
    }
    x += bw + (rand() < 0.3 ? 1 : 0);
  }
  return tile(w, h, rects);
}

/** Sparse stars: single pixels plus a few plus-shaped bright ones. */
export function starTile(o: { seed: number; size?: number; count: number; colors: string[]; bright?: string }): Tile {
  const { seed, size = 96, count, colors, bright } = o;
  const rand = seeded(seed);
  const rects: PixelRect[] = [];
  for (let i = 0; i < count; i++) {
    rects.push({ x: Math.floor(rand() * size), y: Math.floor(rand() * size), w: 1, fill: colors[i % colors.length] });
  }
  if (bright) {
    for (let i = 0; i < 2; i++) {
      const x = 2 + Math.floor(rand() * (size - 4));
      const y = 2 + Math.floor(rand() * (size - 4));
      rects.push({ x: x - 1, y, w: 3, fill: bright }, { x, y: y - 1, w: 1, h: 3, fill: bright });
    }
  }
  return tile(size, size, rects);
}
