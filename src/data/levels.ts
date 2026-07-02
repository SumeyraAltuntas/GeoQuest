export interface Level {
  name: string;
  minXP: number;
  color: string;
  icon: string;
  badge: string;
  desc: string;
}

export interface Difficulty {
  label: string;
  choices: number;
  icon: string;
  xpMult: number;
}

export const LEVELS: Level[] = [
  { name: "Beginner", minXP: 0, color: "#A8D8A8", icon: "🌱", badge: "Seed", desc: "Every journey starts with a single step" },
  { name: "Learner", minXP: 100, color: "#7EC87E", icon: "🌿", badge: "Sprout", desc: "You're growing your knowledge!" },
  { name: "Explorer", minXP: 300, color: "#4FC1E9", icon: "🧭", badge: "Compass", desc: "Charting new territories" },
  { name: "Traveler", minXP: 600, color: "#FFCE54", icon: "✈️", badge: "Passport", desc: "You've been around the world" },
  { name: "Navigator", minXP: 1000, color: "#FC6E51", icon: "🗺️", badge: "Map", desc: "You know your way around" },
  { name: "Scholar", minXP: 1600, color: "#AC92EC", icon: "🎓", badge: "Globe", desc: "Your knowledge is impressive" },
  { name: "Geographer", minXP: 2500, color: "#48CFAD", icon: "🌍", badge: "Atlas", desc: "A walking encyclopedia" },
  { name: "Expert", minXP: 4000, color: "#ED5565", icon: "🏅", badge: "Medal", desc: "Among the best in the world" },
  { name: "Master", minXP: 6000, color: "#5D9CEC", icon: "💎", badge: "Diamond", desc: "Brilliant geographical mind" },
  { name: "Legend", minXP: 10000, color: "#E8CE4D", icon: "👑", badge: "Crown", desc: "The pinnacle of geography mastery" },
];

export const CONTINENTS = ["All", "Europe", "Asia", "Africa", "North America", "South America", "Oceania"] as const;
export type Continent = typeof CONTINENTS[number];

export const CONTINENT_ICONS: Record<string, string> = {
  All: "🌐", Europe: "🏰", Asia: "⛩️", Africa: "🌍",
  "North America": "🗽", "South America": "💃", Oceania: "🏝️",
};

export const DIFFICULTY_KEYS = ['easy', 'medium', 'hard'] as const;
export type DifficultyKey = typeof DIFFICULTY_KEYS[number];

export const DIFFICULTIES: Record<DifficultyKey, Difficulty> = {
  easy: { label: "Easy", choices: 4, icon: "😊", xpMult: 1 },
  medium: { label: "Medium", choices: 5, icon: "🤔", xpMult: 1.5 },
  hard: { label: "Hard", choices: 6, icon: "🤯", xpMult: 2.5 },
};
