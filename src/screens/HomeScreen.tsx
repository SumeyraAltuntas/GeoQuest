import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { COUNTRIES_CAPITALS } from '../data/countries';
import { MOUNTAINS } from '../data/mountains';
import { RIVERS } from '../data/rivers';
import { LAKES } from '../data/lakes';
import { CONTINENTS, CONTINENT_ICONS, DIFFICULTIES } from '../data/levels';
import type { Level, DifficultyKey } from '../data/levels';
import type { LessonId } from '../utils/questions';
import { ProgressBar } from '../components/shared';
import { colors, cardShadow, radii } from '../theme';

interface LessonMeta {
  id: LessonId;
  icon: string;
  title: string;
  desc: string;
}

const LESSONS: LessonMeta[] = [
  { id: 'capitals', icon: '🏛️', title: 'Capital Cities', desc: `${COUNTRIES_CAPITALS.length} countries to master` },
  { id: 'flags', icon: '🏁', title: 'Flags', desc: `${COUNTRIES_CAPITALS.length} flags to identify` },
  { id: 'mountains', icon: '⛰️', title: 'Mountains', desc: `${MOUNTAINS.length} peaks to conquer` },
  { id: 'rivers', icon: '🌊', title: 'Rivers', desc: `${RIVERS.length} rivers to explore` },
  { id: 'lakes', icon: '💧', title: 'Lakes', desc: `${LAKES.length} lakes to discover` },
];

interface HomeScreenProps {
  level: Level;
  nextLevel: Level | null;
  xp: number;
  streak: number;
  bestStreak: number;
  totalCorrect: number;
  totalAnswered: number;
  learnedCount: number;
  levelProgress: number;
  difficulty: DifficultyKey;
  selectedContinent: string;
  dailyCompleted: boolean;
  onSelectDifficulty: (d: DifficultyKey) => void;
  onSelectContinent: (c: string) => void;
  onStartQuiz: (lesson: LessonId) => void;
  onStartDaily: () => void;
  onStartLearn: (lesson: LessonId) => void;
  onOpenLevels: () => void;
}

export function HomeScreen(props: HomeScreenProps) {
  const {
    level, nextLevel, xp, streak, bestStreak, totalCorrect, totalAnswered,
    learnedCount, levelProgress, difficulty, selectedContinent, dailyCompleted,
    onSelectDifficulty, onSelectContinent, onStartQuiz, onStartDaily, onStartLearn, onOpenLevels,
  } = props;

  const accuracy = totalAnswered > 0 ? `${Math.round((totalCorrect / totalAnswered) * 100)}%` : '—';
  const stats = [
    { label: 'Best Streak', value: `🔥 ${bestStreak}` },
    { label: 'Accuracy', value: accuracy },
    { label: 'Learned', value: `${learnedCount}` },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.topBar}>
        <Text style={styles.appTitle}>GeoQuest</Text>
        <View style={styles.topBarStats}>
          <Text style={styles.statText}>🔥 {streak}</Text>
          <Text style={styles.statText}>{xp} XP</Text>
        </View>
      </View>

      {/* Hero banner */}
      <View style={styles.heroBanner}>
        <View style={styles.heroRow}>
          <TouchableOpacity
            onPress={onOpenLevels}
            style={styles.heroIcon}
            accessibilityRole="button"
            accessibilityLabel="View level roadmap"
          >
            <Text style={styles.heroIconText}>{level.icon}</Text>
          </TouchableOpacity>
          <View style={styles.heroInfo}>
            <Text style={styles.heroTitle}>{level.name}</Text>
            <Text style={styles.heroSub}>{learnedCount} items learned</Text>
            <ProgressBar
              progress={levelProgress}
              color="white"
              height={7}
              style={styles.heroProgress}
            />
            <Text style={styles.heroNextLvl}>
              {nextLevel ? `${nextLevel.minXP - xp} XP to ${nextLevel.name}` : 'Max level!'}
            </Text>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Stats */}
        <View style={styles.statsRow}>
          {stats.map(s => (
            <View key={s.label} style={styles.statCard}>
              <Text style={styles.statCardValue}>{s.value}</Text>
              <Text style={styles.statCardLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        {/* Daily challenge */}
        <TouchableOpacity
          style={[styles.card, styles.dailyCard, dailyCompleted && styles.dailyDone]}
          onPress={onStartDaily}
          disabled={dailyCompleted}
          accessibilityRole="button"
          accessibilityLabel={dailyCompleted ? 'Daily challenge completed' : 'Play the daily challenge'}
        >
          <Text style={styles.dailyIcon}>{dailyCompleted ? '✅' : '📅'}</Text>
          <View style={styles.flex1}>
            <Text style={styles.cardTitle}>Daily Challenge</Text>
            <Text style={styles.cardSub}>{dailyCompleted ? 'Completed today!' : 'Mixed quiz · New every day'}</Text>
          </View>
          {!dailyCompleted && <Text style={styles.dailyPlay}>Play</Text>}
        </TouchableOpacity>

        {/* Difficulty */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Difficulty</Text>
          <View style={styles.diffRow}>
            {(Object.entries(DIFFICULTIES) as [DifficultyKey, (typeof DIFFICULTIES)[DifficultyKey]][]).map(([key, d]) => {
              const active = difficulty === key;
              return (
                <TouchableOpacity
                  key={key}
                  style={[styles.diffBtn, active ? styles.diffBtnActive : styles.diffBtnInactive]}
                  onPress={() => onSelectDifficulty(key)}
                  accessibilityRole="button"
                  accessibilityState={{ selected: active }}
                >
                  <Text style={styles.diffIcon}>{d.icon}</Text>
                  <Text style={[styles.diffLabel, { color: active ? colors.accent : colors.textPrimary }]}>{d.label}</Text>
                  <Text style={styles.diffDetail}>{`${d.choices} choices`}</Text>
                  <Text style={styles.diffXP}>{d.xpMult}x XP</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Region */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Region</Text>
          <View style={styles.regionWrap}>
            {CONTINENTS.map(c => {
              const active = selectedContinent === c;
              return (
                <TouchableOpacity
                  key={c}
                  style={[styles.regionBtn, active ? styles.regionBtnActive : styles.regionBtnInactive]}
                  onPress={() => onSelectContinent(c)}
                  accessibilityRole="button"
                  accessibilityState={{ selected: active }}
                >
                  <Text style={[styles.regionText, { color: active ? colors.accent : colors.textPrimary }]}>
                    {CONTINENT_ICONS[c]} {c}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Lessons */}
        <View style={[styles.card, styles.lessonsCard]}>
          <View style={styles.lessonsHeader}>
            <Text style={styles.sectionTitle}>Lessons</Text>
          </View>
          {LESSONS.map((lesson, i) => (
            <View key={lesson.id} style={i < LESSONS.length - 1 ? styles.lessonRowDivider : undefined}>
              <View style={styles.lessonRow}>
                <View style={styles.lessonIcon}>
                  <Text style={styles.lessonIconText}>{lesson.icon}</Text>
                </View>
                <View style={styles.flex1}>
                  <Text style={styles.lessonTitle}>{lesson.title}</Text>
                  <Text style={styles.lessonDesc}>{lesson.desc}</Text>
                </View>
              </View>
              <View style={styles.lessonActions}>
                <TouchableOpacity
                  style={styles.learnBtn}
                  onPress={() => onStartLearn(lesson.id)}
                  accessibilityRole="button"
                  accessibilityLabel={`Learn ${lesson.title}`}
                >
                  <Text style={styles.learnBtnText}>Learn</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.quizBtn}
                  onPress={() => onStartQuiz(lesson.id)}
                  accessibilityRole="button"
                  accessibilityLabel={`Start ${lesson.title} quiz`}
                >
                  <Text style={styles.quizBtnText}>Quiz</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  flex1: { flex: 1 },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  appTitle: { fontSize: 15, fontWeight: '800', color: colors.textPrimary },
  topBarStats: { flexDirection: 'row', gap: 12 },
  statText: { fontSize: 14, fontWeight: '600', color: colors.textPrimary },

  heroBanner: { backgroundColor: colors.primary, paddingHorizontal: 20, paddingBottom: 20, paddingTop: 8 },
  heroRow: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  heroIcon: {
    width: 56,
    height: 56,
    borderRadius: radii.lg,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroIconText: { fontSize: 44 },
  heroInfo: { flex: 1 },
  heroTitle: { fontSize: 22, fontWeight: '800', color: 'white' },
  heroSub: { fontSize: 12, color: 'rgba(255,255,255,0.9)' },
  heroProgress: { backgroundColor: 'rgba(255,255,255,0.3)', marginTop: 6 },
  heroNextLvl: { fontSize: 11, color: 'rgba(255,255,255,0.75)', marginTop: 3 },

  scrollContent: { padding: 16, paddingBottom: 100 },

  statsRow: { flexDirection: 'row', gap: 10, marginBottom: 16 },
  statCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    padding: 12,
    alignItems: 'center',
    ...cardShadow,
  },
  statCardValue: { fontSize: 20, fontWeight: '800', color: colors.textPrimary },
  statCardLabel: { fontSize: 10, color: colors.textSecondary, fontWeight: '700', textTransform: 'uppercase' },

  card: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    padding: 18,
    marginBottom: 12,
    ...cardShadow,
  },
  cardTitle: { fontSize: 16, fontWeight: '800', color: colors.textPrimary },
  cardSub: { fontSize: 12, color: colors.textSecondary },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 10,
  },

  dailyCard: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  dailyDone: { opacity: 0.6 },
  dailyIcon: { fontSize: 36 },
  dailyPlay: { fontSize: 14, fontWeight: '700', color: colors.warning },

  diffRow: { flexDirection: 'row', gap: 8 },
  diffBtn: { flex: 1, padding: 10, borderRadius: 12, borderWidth: 2, alignItems: 'center' },
  diffBtnActive: { borderColor: colors.accent, backgroundColor: colors.accentSoft },
  diffBtnInactive: { borderColor: colors.border, backgroundColor: colors.surface },
  diffIcon: { fontSize: 22 },
  diffLabel: { fontSize: 12, fontWeight: '700', marginTop: 2 },
  diffDetail: { fontSize: 10, color: colors.textSecondary },
  diffXP: { fontSize: 10, color: colors.warning, fontWeight: '700' },

  regionWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 7 },
  regionBtn: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: radii.pill, borderWidth: 2 },
  regionBtnActive: { borderColor: colors.accent, backgroundColor: colors.accentSoft },
  regionBtnInactive: { borderColor: colors.border, backgroundColor: colors.surface },
  regionText: { fontSize: 13, fontWeight: '600' },

  lessonsCard: { padding: 0, overflow: 'hidden' },
  lessonsHeader: { padding: 14, paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: colors.surfaceMuted },
  lessonRowDivider: { borderBottomWidth: 1, borderBottomColor: colors.surfaceMuted },
  lessonRow: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 12, paddingHorizontal: 18 },
  lessonIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: colors.surfaceMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lessonIconText: { fontSize: 26 },
  lessonTitle: { fontSize: 15, fontWeight: '700', color: colors.textPrimary },
  lessonDesc: { fontSize: 12, color: colors.textSecondary },
  lessonActions: { flexDirection: 'row', gap: 8, paddingHorizontal: 18, paddingBottom: 12, marginLeft: 56 },
  learnBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: radii.sm,
    borderWidth: 2,
    borderColor: colors.accent,
  },
  learnBtnText: { fontSize: 13, fontWeight: '700', color: colors.accent },
  quizBtn: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: radii.sm, backgroundColor: colors.accent },
  quizBtnText: { fontSize: 13, fontWeight: '700', color: 'white' },
});
