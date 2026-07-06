import { COUNTRIES_CAPITALS } from '../data/countries';
import { MOUNTAINS } from '../data/mountains';
import { RIVERS } from '../data/rivers';
import { LAKES } from '../data/lakes';
import { shuffle } from './helpers';

import type { CountryCapital } from '../data/countries';
import type { Mountain } from '../data/mountains';
import type { River } from '../data/rivers';
import type { Lake } from '../data/lakes';

export interface Question {
  question: string;
  options: string[];
  answer: string;
  fact: string;
  id: string;
}

export type LessonId = 'capitals' | 'flags' | 'mountains' | 'rivers' | 'lakes';
export type DifficultyId = 'easy' | 'medium' | 'hard';

const WRONG_COUNT: Record<DifficultyId, number> = { easy: 3, medium: 4, hard: 5 };
/** A question is still playable with fewer distractors than requested — never crash over it. */
const MIN_WRONG_COUNT = 2;

interface HasContinent {
  continent: string;
}

/** One way of asking about an item (e.g. "capital of country" vs "country of capital"). */
interface QuestionVariant<T> {
  /** Extracts the option text for this variant (used for both answer and distractors). */
  display: (item: T) => string;
  prompt: (item: T) => string;
  fact: (item: T) => string;
}

interface GeneratorConfig<T extends HasContinent> {
  pool: readonly T[];
  idOf: (item: T) => string;
  variants: QuestionVariant<T>[];
}

/**
 * Picks up to `count` items whose display value is unique and differs from the
 * correct answer. May return fewer than `count` — the caller decides what to do.
 */
function pickDistractors<T>(
  pool: readonly T[],
  correctValue: string,
  display: (item: T) => string,
  count: number,
): T[] {
  const seen = new Set<string>([correctValue]);
  const result: T[] = [];
  for (const item of shuffle(pool)) {
    const value = display(item);
    if (!seen.has(value)) {
      seen.add(value);
      result.push(item);
      if (result.length === count) break;
    }
  }
  return result;
}

/**
 * Generic question generator.
 *
 * Design goals (these fixed the production white-screen crashes):
 * 1. NEVER recurse unboundedly. We try each variant at most once per candidate
 *    item, in random order, and simply move on if one can't be built.
 * 2. NEVER return null just because a small continent ran out of unseen items
 *    mid-quiz. When the exclusion set exhausts the pool, we allow repeats —
 *    a repeated question is a far better experience than a crash.
 * 3. Gracefully shrink the number of distractors (down to MIN_WRONG_COUNT)
 *    when a dataset doesn't have enough unique values, instead of failing.
 */
function generateQuestion<T extends HasContinent>(
  config: GeneratorConfig<T>,
  continent: string,
  excludeIds: Set<string>,
  difficulty: DifficultyId,
): Question | null {
  const { pool, idOf, variants } = config;

  const continentPool = continent === 'All' ? [...pool] : pool.filter(item => item.continent === continent);
  // If a continent has too little data, quietly widen to the full dataset.
  const basePool = continentPool.length >= 4 ? continentPool : [...pool];

  // Prefer unseen items, but fall back to repeats rather than failing (goal #2).
  const unseen = basePool.filter(item => !excludeIds.has(idOf(item)));
  const candidates = shuffle(unseen.length > 0 ? unseen : basePool);

  const targetWrong = WRONG_COUNT[difficulty];
  // Harder difficulties on "All" draw distractors from the same continent so
  // options are plausible; easy mode uses the selected pool as-is.
  const distractorPoolFor = (correct: T): readonly T[] => {
    if (difficulty !== 'easy' && continent === 'All') {
      const sameContinent = pool.filter(
        item => item.continent === correct.continent && idOf(item) !== idOf(correct),
      );
      if (sameContinent.length >= targetWrong) return sameContinent;
    }
    return basePool.filter(item => idOf(item) !== idOf(correct));
  };

  // Bounded search: a handful of candidate items x each variant once (goal #1).
  const MAX_CANDIDATES = 8;
  for (const correct of candidates.slice(0, MAX_CANDIDATES)) {
    for (const variant of shuffle(variants)) {
      const correctValue = variant.display(correct);

      let distractors = pickDistractors(distractorPoolFor(correct), correctValue, variant.display, targetWrong);
      if (distractors.length < targetWrong) {
        // Widen to the entire dataset before shrinking the option count.
        distractors = pickDistractors(
          pool.filter(item => idOf(item) !== idOf(correct)),
          correctValue,
          variant.display,
          targetWrong,
        );
      }
      if (distractors.length < MIN_WRONG_COUNT) continue; // this variant can't work for this item

      return {
        question: variant.prompt(correct),
        options: shuffle([correctValue, ...distractors.map(variant.display)]),
        answer: correctValue,
        fact: variant.fact(correct),
        id: idOf(correct),
      };
    }
  }

  // Genuinely impossible (dataset-wide). Callers filter nulls before starting a quiz.
  return null;
}

// ── Capitals ────────────────────────────────────────────────────────────────

const capitalConfig: GeneratorConfig<CountryCapital> = {
  pool: COUNTRIES_CAPITALS,
  idOf: c => c.country,
  variants: [
    {
      display: c => c.capital,
      prompt: c => `What is the capital of ${c.country}?`,
      fact: c => c.fact,
    },
    {
      display: c => c.country,
      prompt: c => `${c.capital} is the capital of?`,
      fact: c => c.fact,
    },
  ],
};

export function genCapitalQ(
  continent = 'All',
  excludeIds: Set<string> = new Set(),
  difficulty: DifficultyId = 'easy',
): Question | null {
  return generateQuestion(capitalConfig, continent, excludeIds, difficulty);
}

// ── Flags ───────────────────────────────────────────────────────────────────

const flagConfig: GeneratorConfig<CountryCapital> = {
  pool: COUNTRIES_CAPITALS,
  idOf: c => c.country,
  variants: [
    {
      display: c => c.country,
      prompt: c => `Which country does this flag belong to? ${c.flag}`,
      fact: c => c.fact,
    },
  ],
};

export function genFlagQ(
  continent = 'All',
  excludeIds: Set<string> = new Set(),
  difficulty: DifficultyId = 'easy',
): Question | null {
  return generateQuestion(flagConfig, continent, excludeIds, difficulty);
}

// ── Mountains ───────────────────────────────────────────────────────────────

const mountainConfig: GeneratorConfig<Mountain> = {
  pool: MOUNTAINS,
  idOf: m => m.name,
  variants: [
    {
      display: m => m.country,
      prompt: m => `Where is ${m.name} located?`,
      fact: m => `${m.name} is located in ${m.country}`,
    },
    {
      display: m => m.height,
      prompt: m => `How tall is ${m.name}?`,
      fact: m => `${m.name} stands at ${m.height}`,
    },
    {
      display: m => m.range,
      prompt: m => `${m.name} belongs to which range?`,
      fact: m => `${m.name} is part of the ${m.range}`,
    },
    {
      display: m => m.name,
      prompt: m => `Which mountain: "${m.fact}"?`,
      fact: m => m.fact,
    },
  ],
};

export function genMountainQ(
  continent = 'All',
  excludeIds: Set<string> = new Set(),
  difficulty: DifficultyId = 'easy',
): Question | null {
  return generateQuestion(mountainConfig, continent, excludeIds, difficulty);
}

// ── Rivers ──────────────────────────────────────────────────────────────────

const riverConfig: GeneratorConfig<River> = {
  pool: RIVERS,
  idOf: r => r.name,
  variants: [
    {
      display: r => r.country,
      prompt: r => `Which country does the ${r.name} flow through?`,
      fact: r => `The ${r.name} flows through ${r.country}`,
    },
    {
      display: r => r.length,
      prompt: r => `How long is the ${r.name}?`,
      fact: r => `The ${r.name} is ${r.length} long`,
    },
    {
      display: r => r.city,
      prompt: r => `The ${r.name} flows through which city?`,
      fact: r => `The ${r.name} flows through ${r.city}`,
    },
    {
      display: r => r.name,
      prompt: r => `Which river: "${r.fact}"?`,
      fact: r => r.fact,
    },
  ],
};

export function genRiverQ(
  continent = 'All',
  excludeIds: Set<string> = new Set(),
  difficulty: DifficultyId = 'easy',
): Question | null {
  return generateQuestion(riverConfig, continent, excludeIds, difficulty);
}

// ── Lakes ───────────────────────────────────────────────────────────────────

const lakeConfig: GeneratorConfig<Lake> = {
  pool: LAKES,
  idOf: l => l.name,
  variants: [
    {
      display: l => l.country,
      prompt: l => `Which country contains ${l.name}?`,
      fact: l => l.fact,
    },
    {
      display: l => l.area,
      prompt: l => `What is the area of ${l.name}?`,
      fact: l => l.fact,
    },
    // Note: no `type` variant — lakes have only two types (Freshwater/Saltwater),
    // which can't produce enough wrong answers for a full multiple-choice question.
    {
      display: l => l.name,
      prompt: l => `Which lake: "${l.fact}"?`,
      fact: l => l.fact,
    },
  ],
};

export function genLakeQ(
  continent = 'All',
  excludeIds: Set<string> = new Set(),
  difficulty: DifficultyId = 'easy',
): Question | null {
  return generateQuestion(lakeConfig, continent, excludeIds, difficulty);
}

// ── Quiz builder ────────────────────────────────────────────────────────────

const GENERATORS: Record<LessonId, typeof genCapitalQ> = {
  capitals: genCapitalQ,
  flags: genFlagQ,
  mountains: genMountainQ,
  rivers: genRiverQ,
  lakes: genLakeQ,
};

export const LESSON_IDS = Object.keys(GENERATORS) as LessonId[];

/**
 * Builds a complete quiz of up to `length` questions, guaranteed null-free.
 *
 * This replaces the old inline loop in App.tsx that pushed raw generator
 * results (including nulls) into state — the direct cause of the blank-screen
 * crash on small continent pools (e.g. South America has 12 countries; by
 * question 9 the exclusion set left < 4 unseen items and the quiz screen
 * rendered null).
 */
export function buildQuiz(
  lesson: LessonId,
  continent: string,
  difficulty: DifficultyId,
  length: number,
  pickLesson?: () => LessonId, // supplied for the mixed daily quiz
): Question[] {
  const questions: Question[] = [];
  const usedIds = new Set<string>();
  let attempts = 0;
  const maxAttempts = length * 3; // hard upper bound; never spin forever

  while (questions.length < length && attempts < maxAttempts) {
    attempts++;
    const activeLesson = pickLesson ? pickLesson() : lesson;
    const generator = GENERATORS[activeLesson] ?? genCapitalQ;
    const question = generator(continent, usedIds, difficulty);
    if (question) {
      usedIds.add(question.id);
      questions.push(question);
    } else {
      // Pool exhausted for unique items — allow repeats so the quiz still fills.
      usedIds.clear();
    }
  }
  return questions;
}
