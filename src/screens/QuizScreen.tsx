import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet, Animated, StyleProp, ViewStyle } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import type { Question } from '../utils/questions';
import { DIFFICULTIES } from '../data/levels';
import type { DifficultyKey } from '../data/levels';
import { ProgressBar } from '../components/shared';
import { colors, categoryColors, radii } from '../theme';

const MAX_HEARTS = 5;

interface QuizScreenProps {
  questions: Question[];
  currentIndex: number;
  selected: string | null;
  showResult: boolean;
  isCorrect: boolean;
  hearts: number;
  sessionScore: number;
  comboCount: number;
  activeLesson: string;
  difficulty: DifficultyKey;
  fadeAnim: Animated.Value;
  shakeAnim: Animated.Value;
  scaleAnim: Animated.Value;
  onAnswer: (answer: string) => void;
  onNext: () => void;
  onExit: () => void;
}

export function QuizScreen(props: QuizScreenProps) {
  const {
    questions, currentIndex, selected, showResult, isCorrect, hearts,
    sessionScore, comboCount, activeLesson, difficulty,
    fadeAnim, shakeAnim, scaleAnim, onAnswer, onNext, onExit,
  } = props;

  const question = questions[currentIndex];
  const total = questions.length;
  const isLast = currentIndex >= total - 1;
  const catColor = categoryColors[activeLesson] ?? colors.primary;

  // Defensive guard: if state is ever inconsistent, recover to Home instead of
  // rendering nothing (the old code returned null here — a blank white page).
  // The side effect lives in useEffect, never in render.
  useEffect(() => {
    if (!question) onExit();
  }, [question, onExit]);
  if (!question) return null; // one frame at most; useEffect navigates away

  const progress = ((currentIndex + (showResult ? 1 : 0)) / total) * 100;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <TouchableOpacity
            onPress={onExit}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            accessibilityRole="button"
            accessibilityLabel="Exit quiz"
          >
            <Text style={styles.closeBtn}>✕</Text>
          </TouchableOpacity>
          <View style={styles.hearts} accessibilityLabel={`${hearts} of ${MAX_HEARTS} hearts remaining`}>
            {Array.from({ length: MAX_HEARTS }, (_, i) => (
              <Text key={i} style={[styles.heart, i >= hearts && styles.heartLost]}>
                ❤️
              </Text>
            ))}
          </View>
          <Text style={[styles.score, { color: catColor }]}>{sessionScore} XP</Text>
        </View>
        <ProgressBar progress={progress} color={catColor} style={styles.progress} />
        <View style={styles.metaRow}>
          <Text style={styles.meta}>{currentIndex + 1}/{total}</Text>
          {comboCount >= 2 && <Text style={styles.combo}>🔥 {comboCount}x Combo</Text>}
          <Text style={styles.meta}>{DIFFICULTIES[difficulty].label}</Text>
        </View>
      </View>

      <Animated.ScrollView contentContainerStyle={styles.body} style={{ opacity: fadeAnim }}>
        <Animated.View
          style={[styles.questionWrap, { transform: [{ translateX: shakeAnim }, { scale: scaleAnim }] }]}
        >
          <Text style={styles.questionText}>{question.question}</Text>
        </Animated.View>

        <View style={styles.options}>
          {question.options.map((option, i) => {
            const isSelected = selected === option;
            const isAnswer = option === question.answer;

            let optionStyle: StyleProp<ViewStyle> = styles.optionDefault;
            let textColor: string = colors.textPrimary;
            let indexBg: string = colors.surfaceMuted;
            let indexContent: string = String.fromCharCode(65 + i);
            let indexTextColor: string = colors.textPrimary;

            if (showResult && isAnswer) {
              optionStyle = styles.optionCorrect;
              textColor = colors.successDark;
              indexBg = colors.success;
              indexContent = '✓';
              indexTextColor = 'white';
            } else if (showResult && isSelected && !isAnswer) {
              optionStyle = styles.optionWrong;
              textColor = colors.dangerDark;
              indexBg = colors.danger;
              indexContent = '✕';
              indexTextColor = 'white';
            } else if (isSelected) {
              optionStyle = styles.optionSelected;
              textColor = colors.accent;
            }

            return (
              <TouchableOpacity
                key={`${currentIndex}-${i}`}
                style={[styles.optionBtn, optionStyle]}
                onPress={() => onAnswer(option)}
                disabled={showResult}
                accessibilityRole="button"
                accessibilityLabel={`Option ${String.fromCharCode(65 + i)}: ${option}`}
              >
                <View style={styles.optionInner}>
                  <View style={[styles.optionIndex, { backgroundColor: indexBg }]}>
                    <Text style={[styles.optionIndexText, { color: indexTextColor }]}>{indexContent}</Text>
                  </View>
                  <Text style={[styles.optionText, { color: textColor }]}>{option}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </Animated.ScrollView>

      {/* Result footer */}
      {showResult && (
        <View style={[styles.footer, isCorrect ? styles.footerCorrect : styles.footerWrong]}>
          <View style={styles.footerHead}>
            <Text style={styles.footerEmoji}>{isCorrect ? '🎉' : '😔'}</Text>
            <View>
              <Text style={[styles.footerTitle, { color: isCorrect ? colors.successDark : colors.dangerDark }]}>
                {isCorrect ? 'Correct!' : 'Wrong!'}
              </Text>
              {!isCorrect && <Text style={styles.footerAnswer}>Answer: {question.answer}</Text>}
            </View>
          </View>
          <Text style={[styles.footerFact, { color: isCorrect ? colors.successDark : colors.textSecondary }]}>
            {question.fact}
          </Text>
          <TouchableOpacity
            style={[styles.continueBtn, { backgroundColor: isCorrect ? colors.success : colors.danger }]}
            onPress={onNext}
            accessibilityRole="button"
          >
            <Text style={styles.continueText}>
              {hearts <= 0 ? 'See Results' : isLast ? 'Finish!' : 'Continue'}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: {
    backgroundColor: colors.surface,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  closeBtn: { fontSize: 22, color: colors.textPrimary },
  hearts: { flexDirection: 'row', gap: 3 },
  heart: { fontSize: 18 },
  heartLost: { opacity: 0.2 },
  score: { fontSize: 14, fontWeight: '700' },
  progress: { marginTop: 8 },
  metaRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 },
  meta: { fontSize: 11, color: colors.textSecondary, fontWeight: '600' },
  combo: { fontSize: 11, fontWeight: '700', color: colors.warning },

  body: { padding: 20 },
  questionWrap: { alignItems: 'center', marginBottom: 20 },
  questionText: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.textPrimary,
    textAlign: 'center',
    lineHeight: 28,
  },

  options: { gap: 8 },
  optionBtn: { padding: 14, borderRadius: radii.md, borderWidth: 2.5 },
  optionDefault: { backgroundColor: colors.surface, borderColor: colors.border },
  optionSelected: { backgroundColor: colors.accentSoft, borderColor: colors.accent },
  optionCorrect: { backgroundColor: colors.successSoft, borderColor: colors.success },
  optionWrong: { backgroundColor: colors.dangerSoft, borderColor: colors.danger },
  optionInner: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  optionIndex: { width: 26, height: 26, borderRadius: 7, alignItems: 'center', justifyContent: 'center' },
  optionIndexText: { fontSize: 14, fontWeight: '800' },
  optionText: { fontSize: 15, fontWeight: '600', flex: 1 },

  footer: { padding: 16, paddingBottom: 24, borderTopWidth: 3 },
  footerCorrect: { backgroundColor: colors.successSoft, borderTopColor: colors.success },
  footerWrong: { backgroundColor: colors.dangerSoft, borderTopColor: colors.danger },
  footerHead: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 4 },
  footerEmoji: { fontSize: 24 },
  footerTitle: { fontSize: 16, fontWeight: '800' },
  footerAnswer: { fontSize: 13, color: '#666' },
  footerFact: { fontSize: 12, marginBottom: 10 },
  continueBtn: { padding: 16, borderRadius: radii.md, alignItems: 'center' },
  continueText: { color: 'white', fontSize: 16, fontWeight: '700' },
});
