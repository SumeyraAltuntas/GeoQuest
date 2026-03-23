import { LEVELS } from '../data/levels';
import type { Level } from '../data/levels';

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function getLevel(xp: number): Level {
  let l = LEVELS[0];
  for (const v of LEVELS) if (xp >= v.minXP) l = v;
  return l;
}

export function getNextLevel(xp: number): Level | null {
  for (const l of LEVELS) if (xp < l.minXP) return l;
  return null;
}

export function getLevelIndex(xp: number): number {
  let i = 0;
  for (let j = 0; j < LEVELS.length; j++) if (xp >= LEVELS[j].minXP) i = j;
  return i;
}

export function getDailySeed(): string {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}

export function seededRandom(seed: string): () => number {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = ((h << 5) - h) + seed.charCodeAt(i);
    h |= 0;
  }
  return () => {
    h = (h * 16807) % 2147483647;
    return (h - 1) / 2147483646;
  };
}
