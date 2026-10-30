// Tiny chiptune interface sounds, synthesised with the Web Audio API (no audio
// files, nothing to license). Muted by default: nothing plays until the
// visitor turns sound on, and the AudioContext is only created after that
// click, which also satisfies browser autoplay rules.

export type Sfx = 'select' | 'start' | 'coin' | 'open' | 'close' | 'on';

const KEY = 'sound';
let enabled = false;
let ctx: AudioContext | null = null;
const lastPlayed = new Map<Sfx, number>();

try {
  enabled = localStorage.getItem(KEY) === 'on';
} catch {}

export const isSoundOn = () => enabled;

export function setSound(on: boolean) {
  enabled = on;
  try {
    localStorage.setItem(KEY, on ? 'on' : 'off');
  } catch {}
}

// Each sound is a short list of notes: [frequency Hz, start s, length s].
const recipes: Record<Sfx, { wave: OscillatorType; notes: [number, number, number][]; gain: number }> = {
  select: { wave: 'square', gain: 0.035, notes: [[880, 0, 0.05]] },
  open: { wave: 'square', gain: 0.03, notes: [[523, 0, 0.05], [784, 0.05, 0.06]] },
  close: { wave: 'square', gain: 0.03, notes: [[784, 0, 0.05], [523, 0.05, 0.06]] },
  coin: { wave: 'square', gain: 0.035, notes: [[988, 0, 0.07], [1319, 0.07, 0.18]] },
  start: { wave: 'triangle', gain: 0.08, notes: [[523, 0, 0.08], [659, 0.08, 0.08], [784, 0.16, 0.08], [1047, 0.24, 0.2]] },
  on: { wave: 'triangle', gain: 0.08, notes: [[659, 0, 0.07], [988, 0.07, 0.14]] },
};

export function play(name: Sfx) {
  if (!enabled) return;
  const now = performance.now();
  // Debounce: the same sound at most every 80 ms.
  if (now - (lastPlayed.get(name) ?? 0) < 80) return;
  lastPlayed.set(name, now);
  try {
    ctx ??= new AudioContext();
    if (ctx.state === 'suspended') void ctx.resume();
    const { wave, notes, gain } = recipes[name];
    const t0 = ctx.currentTime + 0.01;
    for (const [freq, start, len] of notes) {
      const osc = ctx.createOscillator();
      const amp = ctx.createGain();
      osc.type = wave;
      osc.frequency.value = freq;
      amp.gain.setValueAtTime(gain, t0 + start);
      amp.gain.exponentialRampToValueAtTime(0.0001, t0 + start + len);
      osc.connect(amp).connect(ctx.destination);
      osc.start(t0 + start);
      osc.stop(t0 + start + len + 0.02);
    }
  } catch {
    // Audio is optional; never let it break the page.
  }
}
