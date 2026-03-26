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

/** Pick N items from pool whose displayValue is unique and different from correctValue */
function pickUniqueOthers<T>(
  pool: T[],
  correctValue: string,
  displayFn: (item: T) => string,
  count: number,
): T[] {
  const seen = new Set<string>([correctValue]);
  const result: T[] = [];
  const shuffled = shuffle(pool);
  for (const item of shuffled) {
    const val = displayFn(item);
    if (!seen.has(val)) {
      seen.add(val);
      result.push(item);
      if (result.length === count) break;
    }
  }
  return result;
}

function wrongCount(difficulty: string): number {
  if (difficulty === 'hard') return 5;
  if (difficulty === 'medium') return 4;
  return 3;
}

export function genCapitalQ(continent: string = 'All', excludeIds: Set<string> = new Set(), difficulty: string = 'easy'): Question | null {
  const pool: CountryCapital[] =
    continent === 'All'
      ? COUNTRIES_CAPITALS
      : COUNTRIES_CAPITALS.filter(c => c.continent === continent);

  const available = pool.filter(c => !excludeIds.has(c.country));
  if (available.length < 4) return null;

  const types = ['capitalOfCountry', 'countryOfCapital'] as const;
  const type = types[Math.floor(Math.random() * types.length)];
  const correct = available[Math.floor(Math.random() * available.length)];

  const optionValue = (c: CountryCapital): string => {
    switch (type) {
      case 'capitalOfCountry': return c.capital;
      default: return c.country;
    }
  };

  const wCount = wrongCount(difficulty);

  // Medium/hard on 'All': prefer same-continent wrong answers for trickier options
  const sameContPool = (difficulty !== 'easy' && continent === 'All')
    ? COUNTRIES_CAPITALS.filter(c => c.continent === correct.continent && c.country !== correct.country)
    : pool.filter(c => c.country !== correct.country);

  let others = pickUniqueOthers(sameContPool, optionValue(correct), optionValue, wCount);

  // Fallback to global pool if same-continent doesn't have enough
  if (others.length < wCount) {
    others = pickUniqueOthers(
      COUNTRIES_CAPITALS.filter(c => c.country !== correct.country),
      optionValue(correct),
      optionValue,
      wCount,
    );
  }

  if (others.length < wCount) return genCapitalQ(continent, excludeIds, difficulty);

  const options = shuffle([optionValue(correct), ...others.map(o => optionValue(o))]);

  const qMap: Record<string, { q: string; ans: string; fact: string }> = {
    capitalOfCountry: {
      q: `What is the capital of ${correct.country}?`,
      ans: correct.capital,
      fact: correct.fact,
    },
    countryOfCapital: {
      q: `${correct.capital} is the capital of?`,
      ans: correct.country,
      fact: correct.fact,
    },
  };

  const m = qMap[type];
  return { question: m.q, options, answer: m.ans, fact: m.fact, id: correct.country };
}

export function genFlagQ(continent: string = 'All', excludeIds: Set<string> = new Set(), difficulty: string = 'easy'): Question | null {
  const pool: CountryCapital[] =
    continent === 'All'
      ? COUNTRIES_CAPITALS
      : COUNTRIES_CAPITALS.filter(c => c.continent === continent);

  const available = pool.filter(c => !excludeIds.has(c.country));
  if (available.length < 4) return null;

  const correct = available[Math.floor(Math.random() * available.length)];
  const wCount = wrongCount(difficulty);

  const sameContPool = (difficulty !== 'easy' && continent === 'All')
    ? COUNTRIES_CAPITALS.filter(c => c.continent === correct.continent && c.country !== correct.country)
    : pool.filter(c => c.country !== correct.country);

  let others = pickUniqueOthers(sameContPool, correct.country, (c) => c.country, wCount);

  if (others.length < wCount) {
    others = pickUniqueOthers(
      COUNTRIES_CAPITALS.filter(c => c.country !== correct.country),
      correct.country,
      (c) => c.country,
      wCount,
    );
  }

  if (others.length < wCount) return genFlagQ(continent, excludeIds, difficulty);

  const options = shuffle([correct.country, ...others.map(o => o.country)]);

  return {
    question: `Which country does this flag belong to? ${correct.flag}`,
    options,
    answer: correct.country,
    fact: correct.fact,
    id: correct.country,
  };
}

export function genMountainQ(continent: string = 'All', excludeIds: Set<string> = new Set(), difficulty: string = 'easy'): Question | null {
  const pool: Mountain[] =
    continent === 'All'
      ? MOUNTAINS
      : MOUNTAINS.filter(m => m.continent === continent);

  const available = pool.filter(m => !excludeIds.has(m.name));
  if (available.length < 4) return null;

  const types = ['countryOfMountain', 'heightOfMountain', 'rangeOfMountain', 'mountainOfFact'] as const;
  const type = types[Math.floor(Math.random() * types.length)];
  const correct = available[Math.floor(Math.random() * available.length)];
  const wCount = wrongCount(difficulty);

  const displayFn = (m: Mountain): string => {
    switch (type) {
      case 'countryOfMountain': return m.country;
      case 'heightOfMountain': return m.height;
      case 'rangeOfMountain': return m.range;
      default: return m.name;
    }
  };

  const sameContPool = (difficulty !== 'easy' && continent === 'All')
    ? MOUNTAINS.filter(m => m.continent === correct.continent && m.name !== correct.name)
    : pool.filter(m => m.name !== correct.name);

  let others = pickUniqueOthers(sameContPool, displayFn(correct), displayFn, wCount);

  if (others.length < wCount) {
    others = pickUniqueOthers(
      MOUNTAINS.filter(m => m.name !== correct.name),
      displayFn(correct),
      displayFn,
      wCount,
    );
  }

  if (others.length < wCount) return genMountainQ(continent, excludeIds, difficulty);

  switch (type) {
    case 'countryOfMountain':
      return {
        question: `Where is ${correct.name} located?`,
        options: shuffle([correct.country, ...others.map(o => o.country)]),
        answer: correct.country,
        fact: `${correct.name} is located in ${correct.country}`,
        id: correct.name,
      };
    case 'heightOfMountain':
      return {
        question: `How tall is ${correct.name}?`,
        options: shuffle([correct.height, ...others.map(o => o.height)]),
        answer: correct.height,
        fact: `${correct.name} stands at ${correct.height}`,
        id: correct.name,
      };
    case 'rangeOfMountain':
      return {
        question: `${correct.name} belongs to which range?`,
        options: shuffle([correct.range, ...others.map(o => o.range)]),
        answer: correct.range,
        fact: `${correct.name} is part of the ${correct.range}`,
        id: correct.name,
      };
    case 'mountainOfFact':
      return {
        question: `Which mountain: "${correct.fact}"?`,
        options: shuffle([correct.name, ...others.map(o => o.name)]),
        answer: correct.name,
        fact: correct.fact,
        id: correct.name,
      };
    default:
      return genMountainQ(continent, excludeIds, difficulty);
  }
}

export function genRiverQ(continent: string = 'All', excludeIds: Set<string> = new Set(), difficulty: string = 'easy'): Question | null {
  const pool: River[] =
    continent === 'All'
      ? RIVERS
      : RIVERS.filter(r => r.continent === continent);

  const available = pool.filter(r => !excludeIds.has(r.name));
  if (available.length < 4) return null;

  const types = ['countryOfRiver', 'lengthOfRiver', 'cityOnRiver', 'riverOfFact'] as const;
  const type = types[Math.floor(Math.random() * types.length)];
  const correct = available[Math.floor(Math.random() * available.length)];
  const wCount = wrongCount(difficulty);

  const displayFn = (r: River): string => {
    switch (type) {
      case 'countryOfRiver': return r.country;
      case 'lengthOfRiver': return r.length;
      case 'cityOnRiver': return r.city;
      default: return r.name;
    }
  };

  const sameContPool = (difficulty !== 'easy' && continent === 'All')
    ? RIVERS.filter(r => r.continent === correct.continent && r.name !== correct.name)
    : pool.filter(r => r.name !== correct.name);

  let others = pickUniqueOthers(sameContPool, displayFn(correct), displayFn, wCount);

  if (others.length < wCount) {
    others = pickUniqueOthers(
      RIVERS.filter(r => r.name !== correct.name),
      displayFn(correct),
      displayFn,
      wCount,
    );
  }

  if (others.length < wCount) return genRiverQ(continent, excludeIds, difficulty);

  switch (type) {
    case 'countryOfRiver':
      return {
        question: `Which country does the ${correct.name} flow through?`,
        options: shuffle([correct.country, ...others.map(o => o.country)]),
        answer: correct.country,
        fact: `The ${correct.name} flows through ${correct.country}`,
        id: correct.name,
      };
    case 'lengthOfRiver':
      return {
        question: `How long is the ${correct.name}?`,
        options: shuffle([correct.length, ...others.map(o => o.length)]),
        answer: correct.length,
        fact: `The ${correct.name} is ${correct.length} long`,
        id: correct.name,
      };
    case 'cityOnRiver':
      return {
        question: `The ${correct.name} flows through which city?`,
        options: shuffle([correct.city, ...others.map(o => o.city)]),
        answer: correct.city,
        fact: `The ${correct.name} flows through ${correct.city}`,
        id: correct.name,
      };
    case 'riverOfFact':
      return {
        question: `Which river: "${correct.fact}"?`,
        options: shuffle([correct.name, ...others.map(o => o.name)]),
        answer: correct.name,
        fact: correct.fact,
        id: correct.name,
      };
    default:
      return genRiverQ(continent, excludeIds, difficulty);
  }
}

export function genLakeQ(continent: string = 'All', excludeIds: Set<string> = new Set(), difficulty: string = 'easy'): Question | null {
  const pool: Lake[] =
    continent === 'All'
      ? LAKES
      : LAKES.filter(l => l.continent === continent);

  const available = pool.filter(l => !excludeIds.has(l.name));
  if (available.length < 4) return null;

  const types = ['countryOfLake', 'areaOfLake', 'typeOfLake', 'lakeOfFact'] as const;
  const type = types[Math.floor(Math.random() * types.length)];
  const correct = available[Math.floor(Math.random() * available.length)];
  const wCount = wrongCount(difficulty);

  const displayFn = (l: Lake): string => {
    switch (type) {
      case 'countryOfLake': return l.country;
      case 'areaOfLake': return l.area;
      case 'typeOfLake': return l.type;
      default: return l.name;
    }
  };

  const sameContPool = (difficulty !== 'easy' && continent === 'All')
    ? LAKES.filter(l => l.continent === correct.continent && l.name !== correct.name)
    : pool.filter(l => l.name !== correct.name);

  let others = pickUniqueOthers(sameContPool, displayFn(correct), displayFn, wCount);

  if (others.length < wCount) {
    others = pickUniqueOthers(
      LAKES.filter(l => l.name !== correct.name),
      displayFn(correct),
      displayFn,
      wCount,
    );
  }

  if (others.length < wCount) return genLakeQ(continent, excludeIds, difficulty);

  switch (type) {
    case 'countryOfLake':
      return {
        question: `Which country contains ${correct.name}?`,
        options: shuffle([correct.country, ...others.map(o => o.country)]),
        answer: correct.country,
        fact: correct.fact,
        id: correct.name,
      };
    case 'areaOfLake':
      return {
        question: `What is the area of ${correct.name}?`,
        options: shuffle([correct.area, ...others.map(o => o.area)]),
        answer: correct.area,
        fact: correct.fact,
        id: correct.name,
      };
    case 'typeOfLake':
      return {
        question: `${correct.name} is a __ lake?`,
        options: shuffle([correct.type, ...others.map(o => o.type)]),
        answer: correct.type,
        fact: correct.fact,
        id: correct.name,
      };
    case 'lakeOfFact':
      return {
        question: `Which lake: "${correct.fact}"?`,
        options: shuffle([correct.name, ...others.map(o => o.name)]),
        answer: correct.name,
        fact: correct.fact,
        id: correct.name,
      };
    default:
      return genLakeQ(continent, excludeIds, difficulty);
  }
}
