import { COUNTRIES_CAPITALS } from '../data/countries';
import { MOUNTAINS } from '../data/mountains';
import { RIVERS } from '../data/rivers';
import { LAKES } from '../data/lakes';
import { shuffle } from './helpers';
import type { LessonId } from './questions';

export interface LearnCard {
  id: string;
  front: string;
  back: string;
  detail: string;
}

const DECK_SIZE = 20;

function filterByContinent<T extends { continent: string }>(items: readonly T[], continent: string): T[] {
  if (continent === 'All') return [...items];
  const filtered = items.filter(item => item.continent === continent);
  // A deck needs enough cards to be worthwhile; widen to the full set if a
  // continent is too sparse for this lesson.
  return filtered.length >= 4 ? filtered : [...items];
}

/** Builds a shuffled flashcard deck for a lesson, optionally scoped to a continent. */
export function buildLearnCards(lesson: LessonId, continent: string): LearnCard[] {
  switch (lesson) {
    case 'capitals':
      return shuffle(filterByContinent(COUNTRIES_CAPITALS, continent))
        .slice(0, DECK_SIZE)
        .map(c => ({
          id: c.country,
          front: `${c.flag} ${c.country}`,
          back: c.capital,
          detail: `Continent: ${c.continent}`,
        }));
    case 'flags':
      return shuffle(filterByContinent(COUNTRIES_CAPITALS, continent))
        .slice(0, DECK_SIZE)
        .map(c => ({
          id: c.country,
          front: c.flag,
          back: c.country,
          detail: `Continent: ${c.continent}`,
        }));
    case 'mountains':
      return shuffle(filterByContinent(MOUNTAINS, continent))
        .slice(0, DECK_SIZE)
        .map(m => ({ id: m.name, front: m.name, back: `${m.height}\n${m.range}`, detail: m.fact }));
    case 'rivers':
      return shuffle(filterByContinent(RIVERS, continent))
        .slice(0, DECK_SIZE)
        .map(r => ({ id: r.name, front: r.name, back: `${r.length}\n${r.country}`, detail: r.fact }));
    case 'lakes':
      return shuffle(filterByContinent(LAKES, continent))
        .slice(0, DECK_SIZE)
        .map(l => ({ id: l.name, front: l.name, back: `${l.area}\n${l.country}`, detail: l.fact }));
    default:
      return [];
  }
}
