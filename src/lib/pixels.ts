// Character-grid pixel art → SVG rects. Each character is one art pixel;
// horizontal runs of one colour merge into a single rect. Characters missing
// from the palette are transparent.
export interface PixelRect {
  x: number;
  y: number;
  w: number;
  fill: string;
}

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

/** Small deterministic PRNG so generated scenery is identical on every build. */
export function seeded(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 2 ** 32;
  };
}
