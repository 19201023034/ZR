import { readFile } from 'fs/promises';
import path from 'path';

/**
 * Anton, read from disk so OG rendering never depends on a network fetch.
 * Cached across invocations in the same lambda.
 */
let antonPromise;

export function loadAnton() {
  antonPromise ??= readFile(path.join(process.cwd(), 'assets', 'fonts', 'Anton-Regular.ttf'));
  return antonPromise;
}

// Brand tokens, inlined — the OG runtime can't read CSS variables.
export const OG = {
  bg: '#0C0A08',
  surface: '#151109',
  gold: '#FCCC00',
  goldDim: '#C09C18',
  text: '#F5F1E8',
  body: '#D8D2C4',
  muted: '#9A9484',
  line: '#2C2618',
  size: { width: 1200, height: 630 },
};
