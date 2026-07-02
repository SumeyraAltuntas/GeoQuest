import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  XP: 'geoquest_xp',
  STREAK: 'geoquest_streak',
  BEST_STREAK: 'geoquest_best_streak',
  TOTAL_CORRECT: 'geoquest_total_correct',
  TOTAL_ANSWERED: 'geoquest_total_answered',
  LEARNED_ITEMS: 'geoquest_learned_items',
  DAILY_COMPLETED: 'geoquest_daily_completed',
  DAILY_DATE: 'geoquest_daily_date',
  DIFFICULTY: 'geoquest_difficulty',
  CONTINENT: 'geoquest_continent',
};

const VALID_DIFFICULTIES = ['easy', 'medium', 'hard'];

/** Parse a stored int defensively — corrupted values become the fallback, never NaN. */
function toInt(raw: string | null, fallback = 0): number {
  const n = parseInt(raw ?? '', 10);
  return Number.isFinite(n) && n >= 0 ? n : fallback;
}

function toStringArray(raw: string | null): string[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((x): x is string => typeof x === 'string') : [];
  } catch {
    return [];
  }
}

export interface SavedState {
  xp: number;
  streak: number;
  bestStreak: number;
  totalCorrect: number;
  totalAnswered: number;
  learnedItems: string[];
  dailyCompleted: boolean;
  dailyDate: string;
  difficulty: string;
  selectedContinent: string;
}

export async function loadGameState(): Promise<SavedState> {
  try {
    const [xp, streak, bestStreak, totalCorrect, totalAnswered, learnedItems, dailyCompleted, dailyDate, difficulty, continent] = await AsyncStorage.multiGet([
      KEYS.XP, KEYS.STREAK, KEYS.BEST_STREAK, KEYS.TOTAL_CORRECT, KEYS.TOTAL_ANSWERED,
      KEYS.LEARNED_ITEMS, KEYS.DAILY_COMPLETED, KEYS.DAILY_DATE, KEYS.DIFFICULTY, KEYS.CONTINENT,
    ]);
    const storedDifficulty = difficulty[1] || 'easy';
    return {
      xp: toInt(xp[1]),
      streak: toInt(streak[1]),
      bestStreak: toInt(bestStreak[1]),
      totalCorrect: toInt(totalCorrect[1]),
      totalAnswered: toInt(totalAnswered[1]),
      learnedItems: toStringArray(learnedItems[1]),
      dailyCompleted: dailyCompleted[1] === 'true',
      dailyDate: dailyDate[1] || '',
      // Validate instead of trusting storage — an unknown value would crash
      // DIFFICULTIES[difficulty] lookups downstream.
      difficulty: VALID_DIFFICULTIES.includes(storedDifficulty) ? storedDifficulty : 'easy',
      selectedContinent: continent[1] || 'All',
    };
  } catch {
    return { xp: 0, streak: 0, bestStreak: 0, totalCorrect: 0, totalAnswered: 0, learnedItems: [], dailyCompleted: false, dailyDate: '', difficulty: 'easy', selectedContinent: 'All' };
  }
}

export async function saveValue(key: keyof typeof KEYS, value: string | number | boolean | string[]): Promise<void> {
  try {
    const storageKey = KEYS[key];
    const val = typeof value === 'object' ? JSON.stringify(value) : String(value);
    await AsyncStorage.setItem(storageKey, val);
  } catch {}
}

export { KEYS };
