// Typing test ("type-check"): a 30-second race against Navin's own run.
// Ported from the original script.js. Call `initTypingTest()` once per page
// load; it returns a cleanup function that removes every listener and timer.
import { typingBenchmark } from '../data/site';
import { wordPool } from './word-pool';
import { closeDialog, openDialog } from './dialogs';

const { wpm: NAVIN_WPM, accuracy: NAVIN_ACC, durationSeconds: TEST_DURATION } = typingBenchmark;

export function initTypingTest(): () => void {
  const dialog = document.querySelector<HTMLDialogElement>('#typing-dialog');
  const resultDialog = document.querySelector<HTMLDialogElement>('#result-dialog');
  const trackEl = document.querySelector<HTMLElement>('#tt-track');
  const inputEl = document.querySelector<HTMLInputElement>('#tt-input');
  const wpmEl = document.querySelector<HTMLElement>('#tt-wpm');
  const accEl = document.querySelector<HTMLElement>('#tt-acc');
  const timeEl = document.querySelector<HTMLElement>('#tt-time');
  if (!dialog || !resultDialog || !trackEl || !inputEl || !wpmEl || !accEl || !timeEl) return () => {};

  const ac = new AbortController();
  const { signal } = ac;

  let words: string[] = [];
  let finished: ('correct' | 'wrong' | null)[] = [];
  let wordIndex = 0;
  let startTime: number | null = null;
  let timer: number | undefined;
  let correctChars = 0;
  let typedChars = 0;
  let lastWpm = 0;
  let lastAcc = 100;

  const keyEls = new Map<string, HTMLElement>();
  dialog.querySelectorAll<HTMLElement>('[data-key]').forEach((k) => keyEls.set(k.dataset.key!, k));

  const randomWords = (n: number) =>
    Array.from({ length: n }, () => wordPool[Math.floor(Math.random() * wordPool.length)]);

  function targetChar(): string | null {
    const word = words[wordIndex];
    if (!word) return null;
    const typed = inputEl!.value;
    return typed.length >= word.length ? ' ' : word[typed.length];
  }

  function renderKeyboard() {
    const target = targetChar();
    keyEls.forEach((el, key) => el.classList.toggle('is-next', key === target));
  }

  function renderTrack() {
    const typed = inputEl!.value;
    const frag = document.createDocumentFragment();
    words.forEach((w, wi) => {
      const span = document.createElement('span');
      span.className = 'word';
      if (finished[wi]) span.classList.add(`is-${finished[wi]}`);
      if (wi === wordIndex) {
        [...w].forEach((ch, ci) => {
          const c = document.createElement('span');
          c.className = 'char';
          c.textContent = ch;
          if (ci < typed.length) c.classList.add(typed[ci] === ch ? 'is-correct' : 'is-incorrect');
          if (ci === typed.length) c.classList.add('is-caret');
          span.appendChild(c);
        });
        if (typed.length >= w.length) {
          const caret = document.createElement('span');
          caret.className = 'char is-caret';
          span.appendChild(caret);
        }
      } else {
        span.textContent = w;
      }
      frag.appendChild(span);
    });
    trackEl!.replaceChildren(frag);
    renderKeyboard();
    // Pin the row holding the current word to the top of the viewport,
    // measured from real layout rather than a guessed line height.
    const current = trackEl!.children[wordIndex] as HTMLElement | undefined;
    if (current) trackEl!.style.transform = `translateY(-${current.offsetTop}px)`;
  }

  function setAcc(value: number) {
    accEl!.textContent = String(value);
  }

  function updateStats() {
    if (!startTime) return;
    const elapsedMs = Date.now() - startTime;
    const remaining = Math.max(0, TEST_DURATION - Math.floor(elapsedMs / 1000));
    timeEl!.textContent = String(remaining);
    const minutes = elapsedMs / 60000;
    lastWpm = minutes > 0 ? Math.round(correctChars / 5 / minutes) : 0;
    lastAcc = typedChars > 0 ? Math.round((correctChars / typedChars) * 100) : 100;
    wpmEl!.textContent = String(lastWpm);
    setAcc(lastAcc);
    if (remaining <= 0) finish();
  }

  function stopTimer() {
    if (timer !== undefined) window.clearInterval(timer);
    timer = undefined;
  }

  function start() {
    stopTimer();
    words = randomWords(45);
    finished = new Array(words.length).fill(null);
    wordIndex = 0;
    startTime = null;
    correctChars = 0;
    typedChars = 0;
    lastWpm = 0;
    lastAcc = 100;
    inputEl!.value = '';
    inputEl!.disabled = false;
    wpmEl!.textContent = '0';
    setAcc(100);
    timeEl!.textContent = String(TEST_DURATION);
    trackEl!.style.transition = 'none';
    trackEl!.style.transform = 'translateY(0)';
    requestAnimationFrame(() => (trackEl!.style.transition = ''));
    renderTrack();
  }

  function finish() {
    stopTimer();
    inputEl!.disabled = true;
    inputEl!.blur();
    const won = lastWpm >= NAVIN_WPM && lastAcc >= NAVIN_ACC;
    resultDialog!.dataset.outcome = won ? 'won' : 'lost';
    resultDialog!.querySelector('#result-title')!.textContent = won ? 'You beat Navin!' : 'You lost to Navin!';
    resultDialog!.querySelector('#result-sub')!.textContent = won
      ? `Navin runs at ${NAVIN_WPM} wpm / ${NAVIN_ACC}% acc — you just topped that.`
      : `Navin types ${NAVIN_WPM} wpm at ${NAVIN_ACC}% accuracy. Give it another go.`;
    resultDialog!.querySelector('#result-wpm')!.textContent = String(lastWpm);
    resultDialog!.querySelector('#result-acc')!.textContent = String(lastAcc);
    // The test closes fully before the result card takes its place.
    closeDialog(dialog!).then(() => openDialog(resultDialog!));
  }

  function openTest() {
    openDialog(dialog!);
    start();
    inputEl!.focus();
  }

  document.querySelectorAll<HTMLElement>('[data-open="typing"]').forEach((btn) =>
    btn.addEventListener('click', openTest, { signal }),
  );

  resultDialog.querySelector('#result-retry')?.addEventListener(
    'click',
    () => closeDialog(resultDialog).then(openTest),
    { signal },
  );

  // Advance only when space is pressed.
  inputEl.addEventListener(
    'input',
    () => {
      if (!startTime) {
        startTime = Date.now();
        timer = window.setInterval(updateStats, 250);
      }
      const val = inputEl.value;
      if (val.endsWith(' ')) {
        finished[wordIndex] = val.trim() === words[wordIndex] ? 'correct' : 'wrong';
        wordIndex++;
        inputEl.value = '';
        // Keep a buffer of upcoming words so the line scrolls forever.
        if (words.length - wordIndex < 15) {
          const more = randomWords(30);
          words = words.concat(more);
          finished = finished.concat(new Array(more.length).fill(null));
        }
      }
      renderTrack();
    },
    { signal },
  );

  // Every keystroke counts at the moment it is pressed, so a typo fixed
  // with backspace still counts against accuracy.
  inputEl.addEventListener(
    'keydown',
    (e) => {
      if (e.key === 'Tab') {
        e.preventDefault();
        start();
        return;
      }
      if (e.key.length !== 1 || e.key === ' ') return;
      const target = words[wordIndex];
      if (!target) return;
      typedChars++;
      if (target[inputEl.value.length] === e.key) correctChars++;
    },
    { signal },
  );

  // On-screen key press feedback.
  const pressKey = (e: KeyboardEvent, on: boolean) => {
    if (!dialog.open) return;
    keyEls.get(e.key.toLowerCase())?.classList.toggle('is-pressed', on);
  };
  document.addEventListener('keydown', (e) => pressKey(e, true), { signal });
  document.addEventListener('keyup', (e) => pressKey(e, false), { signal });

  // Clicking anywhere on the card returns focus to the hidden input.
  dialog.addEventListener(
    'mousedown',
    (e) => {
      const t = e.target as HTMLElement;
      if (t.closest('.tt-card') && !t.closest('[data-close]')) {
        e.preventDefault();
        inputEl.focus();
      }
    },
    { signal },
  );

  dialog.addEventListener('close', stopTimer, { signal });

  return () => {
    stopTimer();
    ac.abort();
  };
}
