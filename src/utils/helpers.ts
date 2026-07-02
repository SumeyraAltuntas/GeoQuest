import { LEVELS } from '../data/levels';
import type { Level } from '../data/levels';

/** Fisher–Yates shuffle. Returns a new array; never mutates the input. */
export function shuffle<T>(arr: readonly T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function getLevel(xp: number): Level {
  let current = LEVELS[0];
  for (const level of LEVELS) {
    if (xp >= level.minXP) current = level;
  }
  return current;
}

export function getNextLevel(xp: number): Level | null {
  return LEVELS.find(level => xp < level.minXP) ?? null;
}

export function getLevelIndex(xp: number): number {
  let index = 0;
  for (let i = 0; i < LEVELS.length; i++) {
    if (xp >= LEVELS[i].minXP) index = i;
  }
  return index;
}

/** Date key used to detect "a new day" for the daily challenge (local time). */
export function getDailySeed(): string {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

/**
 * Deterministic PRNG (Park–Miller) seeded from a string.
 *
 * Bug fix: the previous implementation could produce a NEGATIVE internal
 * state (string hash overflows to a negative 32-bit int), which made the
 * returned values negative. Downstream code did `array[Math.floor(rng() * n)]`
 * and read `array[-1]` -> undefined -> null questions -> blank screen on
 * certain dates. We now force the state into the valid [1, 2^31 - 2] range.
 */
export function seededRandom(seed: string): () => number {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = (h << 5) - h + seed.charCodeAt(i);
    h |= 0;
  }
  // Normalize into [1, 2147483646] — Park–Miller requires a positive, non-zero state.
  let state = Math.abs(h) % 2147483646;
  if (state === 0) state = 1;
  return () => {
    state = (state * 16807) % 2147483647;
    return (state - 1) / 2147483646;
  };
}

/** Clamp a number into [min, max]. */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}
