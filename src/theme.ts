import { Platform } from 'react-native';

/**
 * Central design tokens. Every color, shadow, and category accent lives here
 * so the UI stays consistent and can be re-themed in one place.
 */
export const colors = {
  background: '#F2F2F7',
  surface: '#FFFFFF',
  surfaceMuted: '#F2F2F7',
  border: '#E5E5EA',
  textPrimary: '#1C1C1E',
  textSecondary: '#8E8E93',
  primary: '#22943F',
  accent: '#007AFF',
  accentSoft: '#E8F0FE',
  success: '#34C759',
  successSoft: '#E8F8EE',
  successDark: '#1B7A3D',
  danger: '#FF3B30',
  dangerSoft: '#FFF0F0',
  dangerDark: '#CC0000',
  warning: '#FF9500',
} as const;

/** Accent color per quiz category (also used on the results banner). */
export const categoryColors: Record<string, string> = {
  capitals: '#22943F',
  flags: '#E91E63',
  mountains: '#FF9500',
  rivers: '#007AFF',
  lakes: '#00BCD4',
  daily: '#AF52DE',
};

export const categoryLabels: Record<string, string> = {
  capitals: 'Capitals',
  flags: 'Flags',
  mountains: 'Mountains',
  rivers: 'Rivers',
  lakes: 'Lakes',
  daily: 'Daily',
};

/** Cross-platform card shadow (iOS shadow / Android elevation). */
export const cardShadow = Platform.select({
  ios: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
  },
  android: { elevation: 2 },
  default: {},
});

export const radii = {
  sm: 10,
  md: 14,
  lg: 16,
  xl: 20,
  pill: 100,
} as const;
