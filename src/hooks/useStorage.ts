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
    return {
      xp: parseInt(xp[1] || '0', 10),
      streak: parseInt(streak[1] || '0', 10),
      bestStreak: parseInt(bestStreak[1] || '0', 10),
      totalCorrect: parseInt(totalCorrect[1] || '0', 10),
      totalAnswered: parseInt(totalAnswered[1] || '0', 10),
      learnedItems: learnedItems[1] ? JSON.parse(learnedItems[1]) : [],
      dailyCompleted: dailyCompleted[1] === 'true',
      dailyDate: dailyDate[1] || '',
      difficulty: difficulty[1] || 'easy',
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
