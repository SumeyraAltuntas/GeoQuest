import { COUNTRIES_CAPITALS } from '../data/countries';
import { MOUNTAINS } from '../data/mountains';
import { RIVERS } from '../data/rivers';
import { shuffle } from './helpers';

import type { CountryCapital } from '../data/countries';
import type { Mountain } from '../data/mountains';
import type { River } from '../data/rivers';

export interface Question {
  question: string;
  options: string[];
  answer: string;
  fact: string;
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

export function genCapitalQ(continent: string = 'All'): Question | null {
  const pool: CountryCapital[] =
    continent === 'All'
      ? COUNTRIES_CAPITALS
      : COUNTRIES_CAPITALS.filter(c => c.continent === continent);

  if (pool.length < 4) return null;

  const types = ['capitalOfCountry', 'countryOfCapital'] as const;
  const type = types[Math.floor(Math.random() * types.length)];
  const correct = pool[Math.floor(Math.random() * pool.length)];

  const optionValue = (c: CountryCapital): string => {
    switch (type) {
      case 'capitalOfCountry': return c.capital;
      default: return c.country;
    }
  };

  const others = pickUniqueOthers(
    pool.filter(c => c.country !== correct.country),
    optionValue(correct),
    optionValue,
    3,
  );

  if (others.length < 3) return genCapitalQ(continent);

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
  return { question: m.q, options, answer: m.ans, fact: m.fact };
}

export function genFlagQ(continent: string = 'All'): Question | null {
  const pool: CountryCapital[] =
    continent === 'All'
      ? COUNTRIES_CAPITALS
      : COUNTRIES_CAPITALS.filter(c => c.continent === continent);

  if (pool.length < 4) return null;

  const correct = pool[Math.floor(Math.random() * pool.length)];

  const others = pickUniqueOthers(
    pool.filter(c => c.country !== correct.country),
    correct.country,
    (c) => c.country,
    3,
  );

  if (others.length < 3) return genFlagQ(continent);

  const options = shuffle([correct.country, ...others.map(o => o.country)]);

  return {
    question: `Which country does this flag belong to? ${correct.flag}`,
    options,
    answer: correct.country,
    fact: correct.fact,
  };
}

export function genMountainQ(continent: string = 'All'): Question | null {
  const pool: Mountain[] =
    continent === 'All'
      ? MOUNTAINS
      : MOUNTAINS.filter(m => m.continent === continent);

  if (pool.length < 4) return null;

  const types = ['countryOfMountain', 'heightOfMountain', 'rangeOfMountain', 'mountainOfFact'] as const;
  const type = types[Math.floor(Math.random() * types.length)];
  const correct = pool[Math.floor(Math.random() * pool.length)];
  const rest = pool.filter(m => m.name !== correct.name);

  const displayFn = (m: Mountain): string => {
    switch (type) {
      case 'countryOfMountain': return m.country;
      case 'heightOfMountain': return m.height;
      case 'rangeOfMountain': return m.range;
      default: return m.name;
    }
  };

  const others = pickUniqueOthers(rest, displayFn(correct), displayFn, 3);
  if (others.length < 3) return genMountainQ(continent);

  switch (type) {
    case 'countryOfMountain':
      return {
        question: `Where is ${correct.name} located?`,
        options: shuffle([correct.country, ...others.map(o => o.country)]),
        answer: correct.country,
        fact: `${correct.name} is located in ${correct.country}`,
      };
    case 'heightOfMountain':
      return {
        question: `How tall is ${correct.name}?`,
        options: shuffle([correct.height, ...others.map(o => o.height)]),
        answer: correct.height,
        fact: `${correct.name} stands at ${correct.height}`,
      };
    case 'rangeOfMountain':
      return {
        question: `${correct.name} belongs to which range?`,
        options: shuffle([correct.range, ...others.map(o => o.range)]),
        answer: correct.range,
        fact: `${correct.name} is part of the ${correct.range}`,
      };
    case 'mountainOfFact':
      return {
        question: `Which mountain: "${correct.fact}"?`,
        options: shuffle([correct.name, ...others.map(o => o.name)]),
        answer: correct.name,
        fact: correct.fact,
      };
    default:
      return genMountainQ(continent);
  }
}

export function genRiverQ(continent: string = 'All'): Question | null {
  const pool: River[] =
    continent === 'All'
      ? RIVERS
      : RIVERS.filter(r => r.continent === continent);

  if (pool.length < 4) return null;

  const types = ['countryOfRiver', 'lengthOfRiver', 'cityOnRiver', 'riverOfFact'] as const;
  const type = types[Math.floor(Math.random() * types.length)];
  const correct = pool[Math.floor(Math.random() * pool.length)];
  const rest = pool.filter(r => r.name !== correct.name);

  const displayFn = (r: River): string => {
    switch (type) {
      case 'countryOfRiver': return r.country;
      case 'lengthOfRiver': return r.length;
      case 'cityOnRiver': return r.city;
      default: return r.name;
    }
  };

  const others = pickUniqueOthers(rest, displayFn(correct), displayFn, 3);
  if (others.length < 3) return genRiverQ(continent);

  switch (type) {
    case 'countryOfRiver':
      return {
        question: `Which country does the ${correct.name} flow through?`,
        options: shuffle([correct.country, ...others.map(o => o.country)]),
        answer: correct.country,
        fact: `The ${correct.name} flows through ${correct.country}`,
      };
    case 'lengthOfRiver':
      return {
        question: `How long is the ${correct.name}?`,
        options: shuffle([correct.length, ...others.map(o => o.length)]),
        answer: correct.length,
        fact: `The ${correct.name} is ${correct.length} long`,
      };
    case 'cityOnRiver':
      return {
        question: `The ${correct.name} flows through which city?`,
        options: shuffle([correct.city, ...others.map(o => o.city)]),
        answer: correct.city,
        fact: `The ${correct.name} flows through ${correct.city}`,
      };
    case 'riverOfFact':
      return {
        question: `Which river: "${correct.fact}"?`,
        options: shuffle([correct.name, ...others.map(o => o.name)]),
        answer: correct.name,
        fact: correct.fact,
      };
    default:
      return genRiverQ(continent);
  }
}
