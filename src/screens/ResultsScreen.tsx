import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import type { Level } from '../data/levels';
import { colors, categoryLabels, cardShadow, radii } from '../theme';

interface ResultsScreenProps {
  sessionCorrect: number;
  /** Actual number of questions in the finished quiz (may be < 10 on sparse pools). */
  quizLength: number;
  sessionScore: number;
  bestCombo: number;
  hearts: number;
  xp: number;
  level: Level;
  activeLesson: string;
  onPlayAgain: () => void;
  onHome: () => void;
}

export function ResultsScreen(props: ResultsScreenProps) {
  const {
    sessionCorrect, quizLength, sessionScore, bestCombo, hearts,
    xp, level, activeLesson, onPlayAgain, onHome,
  } = props;

  // Guard against divide-by-zero if a quiz somehow ended with no questions.
  const pct = quizLength > 0 ? Math.round((sessionCorrect / quizLength) * 100) : 0;
  const stars = pct >= 90 ? 3 : pct >= 60 ? 2 : pct >= 30 ? 1 : 0;
  const emoji = pct >= 80 ? '🏆' : pct >= 60 ? '🎉' : pct >= 30 ? '💪' : '📚';
  const title =
    hearts <= 0 ? 'Out of Hearts!'
    : pct >= 80 ? 'Amazing!'
    : pct >= 60 ? 'Great Job!'
    : pct >= 30 ? 'Good Try!'
    : 'Keep Learning!';

  const stats = [
    { icon: '✅', label: 'Correct', value: `${sessionCorrect}/${quizLength}` },
    { icon: '⚡', label: 'XP Earned', value: `${sessionScore}` },
    { icon: '🔥', label: 'Best Combo', value: `${bestCombo}x` },
    { icon: '📊', label: 'Accuracy', value: `${pct}%` },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={[styles.banner, { backgroundColor: pct >= 60 ? colors.primary : colors.dangerDark }]}>
        <Text style={styles.catLabel}>{categoryLabels[activeLesson] ?? 'Quiz'} Complete</Text>
        <Text style={styles.bannerEmoji}>{emoji}</Text>
        <Text style={styles.bannerTitle}>{title}</Text>
        <Text style={styles.stars}>
          {Array.from({ length: 3 }, (_, i) => (i < stars ? '⭐' : '☆')).join(' ')}
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.body}>
        <View style={[styles.levelCard, { backgroundColor: `${level.color}11` }]}>
          <Text style={styles.levelIcon}>{level.icon}</Text>
          <View style={styles.flex1}>
            <Text style={styles.levelName}>{level.name}</Text>
          </View>
          <Text style={[styles.levelXP, { color: level.color }]}>{xp} XP</Text>
        </View>

        <View style={styles.grid}>
          {stats.map(s => (
            <View key={s.label} style={styles.statCard}>
              <Text style={styles.statIcon}>{s.icon}</Text>
              <Text style={styles.statValue}>{s.value}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.playAgainBtn} onPress={onPlayAgain} accessibilityRole="button">
            <Text style={styles.playAgainText}>Play Again</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.homeBtn} onPress={onHome} accessibilityRole="button">
            <Text style={styles.homeText}>Home</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  flex1: { flex: 1 },
  banner: { paddingVertical: 40, paddingHorizontal: 20, alignItems: 'center' },
  catLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.85)',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  bannerEmoji: { fontSize: 52, marginTop: 6 },
  bannerTitle: { fontSize: 26, fontWeight: '900', color: 'white', marginTop: 6 },
  stars: { fontSize: 48, letterSpacing: 6, marginTop: 4 },

  body: { padding: 20, paddingBottom: 100 },
  levelCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    borderRadius: radii.lg,
    padding: 18,
    marginBottom: 12,
    ...cardShadow,
  },
  levelIcon: { fontSize: 36 },
  levelName: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.textSecondary,
    textTransform: 'uppercase',
  },
  levelXP: { fontSize: 18, fontWeight: '800' },

  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  statCard: {
    flexBasis: '47%',
    flexGrow: 1,
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    padding: 14,
    alignItems: 'center',
    ...cardShadow,
  },
  statIcon: { fontSize: 24 },
  statValue: { fontSize: 20, fontWeight: '800', color: colors.textPrimary, marginTop: 2 },
  statLabel: { fontSize: 10, color: colors.textSecondary, fontWeight: '600', textTransform: 'uppercase' },

  actions: { gap: 10, marginTop: 16 },
  playAgainBtn: { backgroundColor: colors.primary, padding: 16, borderRadius: radii.md, alignItems: 'center' },
  playAgainText: { color: 'white', fontSize: 16, fontWeight: '700' },
  homeBtn: { backgroundColor: colors.surfaceMuted, padding: 16, borderRadius: radii.md, alignItems: 'center' },
  homeText: { color: colors.textPrimary, fontSize: 16, fontWeight: '700' },
});
