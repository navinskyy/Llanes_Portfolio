// The world's shared palette and props. Every scene draws from these, so the
// whole page reads as one game: same night colours, same art-pixel size.
import { disk, mountain, ring, toPic, type Pic } from './pixels';

/** Scenery colours. Dark and low in contrast so content always reads first. */
export const world = {
  ground: '#0b0c19',
  sil: '#101124', // nearest silhouettes
  sil2: '#15162e', // middle distance
  sil3: '#1b1c3a', // far distance
  edge: '#24254a', // lit rooftops and ridges
  stone: '#2a2550',
  stoneHi: '#3a3370',
  pine: '#18323a',
  pineHi: '#21464d',
  snow: '#5a5f9a',
  violet: '#9b7bff',
  violetDim: '#4a3a9a',
  blue: '#7fb2ff',
  blueDim: '#34507f',
  amber: '#f2b84b',
  amberDim: '#7d5f2a',
  green: '#7fd68f',
  greenDim: '#2f5a3a',
  red: '#e86f5f',
  cream: '#efe6d2',
  frame: '#3a3e6b',
  frameHi: '#5a5f9a',
} as const;
const W = world;

export const pine = toPic(
  ['..g..', '.gGg.', '..g..', '.ggg.', 'gGggg', '.ggg.', 'ggggG', '..t..', '..t..'],
  { g: W.pine, G: W.pineHi, t: W.stone },
);

export const castle = toPic(
  [
    '......ff.....',
    '......fff....',
    '......p......',
    'k.k..kkk..k.k',
    'kkk..kKk..kkk',
    'kKk.kkkkk.kKk',
    'kkkkkkkkkkkkk',
    'kkkkkkdkkkkkk',
    'kKkkkkkkkkkKk',
    'kkkkkgggkkkkk',
    'kkkkkgggkkkkk',
    'kkkkkgggkkkkk',
  ],
  { k: W.stone, K: W.stoneHi, d: W.amberDim, f: W.amber, p: W.frameHi, g: W.ground },
);

export const house = toPic(
  ['....r....', '...rrr...', '..rrrrr..', '.rrrrrrr.', 'rrrrrrrrr', '.kkkkkkk.', '.kdkkkgk.', '.kkkkkgk.'],
  { r: W.violetDim, k: W.stone, d: W.amberDim, g: W.ground },
);

export const watchtower = toPic(
  [
    '...a...',
    '..kkk..',
    '.kkkkk.',
    'kkkkkkk',
    '.kdkdk.',
    '.kkkkk.',
    '..kkk..',
    '..kdk..',
    '..kkk..',
    '..kkk..',
    '..kdk..',
    '..kkk..',
    '.kkkkk.',
    'kkkkkkk',
  ],
  { k: W.stone, d: W.amberDim, a: W.amber },
);

export const checkpoint = toPic(['..a..', '.aAa.', 'aAAAa', '.aAa.', '..a..'], { a: W.amberDim, A: W.amber });

export const flag = toPic(['pfff..', 'pffff.', 'pfff..', 'p.....', 'p.....', 'p.....', 'p.....', 'pp....'], {
  p: W.frameHi,
  f: W.violet,
});

export const signpost = toPic(['ssssss.', 'sssssss', 'ssssss.', '..p....', '..p....', '..p....', '.ppp...'], {
  s: W.stoneHi,
  p: W.stone,
});

export const cloud = toPic(
  ['....CCCC........', '..CCccccCC..CC..', '.Cccccccccccccc.', 'cccccccccccccccc', '.cccccccccccccc.'],
  { C: '#25234a', c: '#1a1936' },
);

export const ship = toPic(
  ['....oo........', '....owoo......', '.ooooswwoooo..', 'eaowwwwwwvvwo.', 'eaoswwwwwwwwwo', '.ooooswwoooo..', '....owoo......', '....oo........'],
  { o: '#0a0b17', w: '#cfd3e8', s: '#8b8fb0', v: W.blue, a: W.amber, e: W.red },
);

export const drone = toPic(['k.....k', 'kkkkkkk', '.kbbbk.', '..kak..'], { k: W.stoneHi, b: W.blueDim, a: W.red });

export const streak = toPic(['c.........', '.cc.......', '...ccc....', '......ccWW'], { c: W.frameHi, W: W.cream });

export const crosshair = toPic(['...v...', '.......', '...v...', 'v.vvv.v', '...v...', '.......', '...v...'], {
  v: W.violetDim,
});

export const moon = disk(7, { fill: '#cfc8b4', light: '#e6dfcb', shade: '#8f8977', crater: '#b2ab97' }, 7);
export const smallMoon = disk(4, { fill: '#7a5fd6', light: '#b49cff', shade: '#3b2f73' }, 3);
export const halo = ring(10, W.violetDim, 3);

export const peak = (h: number) => mountain(h, { lit: W.stoneHi, shade: W.stone, snow: W.snow });

// ---------- workshop ----------
export const monitor = toPic(
  [
    'kkkkkkkkkkkkkkkk',
    'kssssssssssssssk',
    'ksggsggggsggsssk',
    'kssssssssssssssk',
    'ksssggggsgggsssk',
    'kssssssssssssssk',
    'ksgggggsggsggggk',
    'kssssssssssssssk',
    'ksaasssssssssssk',
    'kssssssssssssssk',
    'kkkkkkkkkkkkkkkk',
    '......kkkk......',
    '....kkkkkkkk....',
  ],
  { k: '#2a2c45', s: '#0b1a16', g: W.greenDim, a: W.amber },
);

const rackRows = ['kkkkkkkkkk'];
for (let u = 0; u < 5; u++) rackRows.push('krrrrrrrrk', u % 2 ? 'krbrgrdddk' : 'kraraddddk', 'kkkkkkkkkk');
rackRows.push('.k......k.');
export const rack = toPic(rackRows, { k: '#2a2c45', r: '#171a2e', d: '#0e1020', g: W.green, a: W.amber, b: W.blue });

export const glyphCode = toPic(
  ['......b....', '..b...b.b..', '.b...b...b.', 'b....b....b', '.b..b....b.', '..b.b...b..', '....b......'],
  { b: W.blueDim },
);
export const glyphBraces = toPic(
  ['.bb...bb.', '.b.....b.', '.b.....b.', 'b.......b', '.b.....b.', '.b.....b.', '.bb...bb.'],
  { b: W.violetDim },
);
export const glyphPrompt = toPic(['g........', '.g.......', '..g......', '.g.......', 'g........', '.........', '....ggggg'], {
  g: W.greenDim,
});
export const glyphLock = toPic(['..vvv..', '.v...v.', '.v...v.', 'vvvvvvv', 'vVVaVVv', 'vVVaVVv', 'vvvvvvv'], {
  v: W.violetDim,
  V: '#2c2260',
  a: W.amberDim,
});

/** The home base: a domed hall with a lit ring of windows and an antenna. */
export const dome: Pic = (() => {
  const art: string[] = [];
  const w = 25;
  const c = 12;
  art.push(' '.repeat(c) + 'a' + ' '.repeat(c), ...Array(3).fill(' '.repeat(c) + 'p' + ' '.repeat(c)));
  for (let y = 0; y < 8; y++) {
    let row = '';
    for (let x = 0; x < w; x++) {
      const inside = Math.hypot(x - c, 8 - y) <= 9;
      row += !inside ? ' ' : y === 5 && x % 3 === 0 ? 'd' : y < 2 ? 'K' : 'k';
    }
    art.push(row);
  }
  for (let y = 0; y < 5; y++) {
    let row = '';
    for (let x = 0; x < w; x++) row += y === 2 && x % 4 === 2 ? 'd' : y === 0 ? 'K' : 'k';
    art.push(row);
  }
  return toPic(art, { k: W.sil3, K: W.edge, d: W.amberDim, p: W.frame, a: W.red });
})();
