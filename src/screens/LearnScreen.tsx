import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as Haptics from 'expo-haptics';
import type { LearnCard } from '../utils/learn';
import { TopBar, ProgressBar } from '../components/shared';
import { colors, cardShadow, radii } from '../theme';

interface LearnScreenProps {
  cards: LearnCard[];
  index: number;
  flipped: boolean;
  onFlip: () => void;
  onPrev: () => void;
  onNext: () => void;
  onDone: () => void;
  onExit: () => void;
}

export function LearnScreen(props: LearnScreenProps) {
  const { cards, index, flipped, onFlip, onPrev, onNext, onDone, onExit } = props;
  const card = cards[index];
  const isLast = index >= cards.length - 1;

  // Old code called setScreen('home') directly inside render when the deck was
  // empty — a state update during render, which React forbids. Navigation now
  // happens in an effect.
  useEffect(() => {
    if (!card) onExit();
  }, [card, onExit]);
  if (!card) return null;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <TopBar title={`Learn ${index + 1}/${cards.length}`} onBack={onExit} />
      <ProgressBar
        progress={((index + 1) / cards.length) * 100}
        color={colors.success}
        style={styles.progress}
      />
      <ScrollView contentContainerStyle={styles.body}>
        <TouchableOpacity
          style={[styles.card, flipped && styles.cardFlipped]}
          onPress={() => {
            onFlip();
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
          }}
          activeOpacity={0.8}
          accessibilityRole="button"
          accessibilityLabel={flipped ? 'Card answer, tap to see question' : 'Card question, tap to reveal answer'}
        >
          {!flipped ? (
            <>
              <Text style={styles.label}>QUESTION</Text>
              <Text style={styles.front}>{card.front}</Text>
              <Text style={styles.tapHint}>Tap to reveal</Text>
            </>
          ) : (
            <>
              <Text style={[styles.label, styles.labelFlipped]}>ANSWER</Text>
              <Text style={[styles.front, styles.frontFlipped]}>{card.back}</Text>
              <Text style={styles.detail}>{card.detail}</Text>
            </>
          )}
        </TouchableOpacity>

        <View style={styles.navRow}>
          <TouchableOpacity
            style={[styles.navBtn, index === 0 && styles.navBtnDisabled]}
            disabled={index === 0}
            onPress={onPrev}
            accessibilityRole="button"
          >
            <Text style={styles.navBtnText}>Back</Text>
          </TouchableOpacity>
          {!isLast ? (
            <TouchableOpacity style={[styles.navBtn, styles.nextBtn]} onPress={onNext} accessibilityRole="button">
              <Text style={[styles.navBtnText, styles.navBtnTextLight]}>Next</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={[styles.navBtn, styles.doneBtn]} onPress={onDone} accessibilityRole="button">
              <Text style={[styles.navBtnText, styles.navBtnTextLight]}>Done</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  progress: { marginHorizontal: 16, marginTop: 8 },
  body: { padding: 20, alignItems: 'center' },
  card: {
    width: '100%',
    minHeight: 260,
    borderRadius: radii.xl,
    padding: 32,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    ...cardShadow,
  },
  cardFlipped: { backgroundColor: colors.success },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  labelFlipped: { color: 'rgba(255,255,255,0.8)' },
  front: { fontSize: 32, fontWeight: '800', lineHeight: 42, textAlign: 'center', marginTop: 8, color: colors.textPrimary },
  frontFlipped: { color: 'white' },
  detail: { fontSize: 14, fontStyle: 'italic', marginTop: 16, textAlign: 'center', color: 'rgba(255,255,255,0.85)' },
  tapHint: { fontSize: 13, color: colors.textSecondary, marginTop: 20 },
  navRow: { flexDirection: 'row', gap: 12, marginTop: 28, width: '100%' },
  navBtn: { flex: 1, padding: 14, borderRadius: radii.md, backgroundColor: colors.border, alignItems: 'center' },
  navBtnDisabled: { opacity: 0.4 },
  nextBtn: { backgroundColor: colors.primary },
  doneBtn: { backgroundColor: colors.accent },
  navBtnText: { fontSize: 15, fontWeight: '700', color: colors.textPrimary },
  navBtnTextLight: { color: 'white' },
});
