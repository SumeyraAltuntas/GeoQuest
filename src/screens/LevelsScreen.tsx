import React from 'react';
import { View, Text, ScrollView, SafeAreaView, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LEVELS } from '../data/levels';
import type { Level } from '../data/levels';
import { TopBar } from '../components/shared';
import { colors, radii } from '../theme';

interface LevelsScreenProps {
  xp: number;
  level: Level;
  nextLevel: Level | null;
  levelIndex: number;
  onExit: () => void;
}

export function LevelsScreen({ xp, level, nextLevel, levelIndex, onExit }: LevelsScreenProps) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <TopBar title="Level Roadmap" onBack={onExit} />
      <ScrollView contentContainerStyle={styles.body}>
        <View style={[styles.header, { backgroundColor: `${level.color}22` }]}>
          <Text style={styles.headerIcon}>{level.icon}</Text>
          <Text style={styles.headerName}>{level.name}</Text>
          <Text style={[styles.headerXP, { color: level.color }]}>{xp} XP</Text>
          {nextLevel && <Text style={styles.headerNext}>{nextLevel.minXP - xp} XP to {nextLevel.name}</Text>}
        </View>

        {LEVELS.map((l, i) => {
          const unlocked = xp >= l.minXP;
          const isCurrent = i === levelIndex;
          return (
            <View key={l.name}>
              {i > 0 && (
                <View style={styles.connectorWrap}>
                  <View style={[styles.connector, { backgroundColor: unlocked ? l.color : colors.border }]} />
                </View>
              )}
              <View
                style={[
                  styles.row,
                  {
                    borderColor: isCurrent ? l.color : colors.border,
                    backgroundColor: isCurrent ? `${l.color}15` : colors.surface,
                    opacity: unlocked ? 1 : 0.5,
                  },
                ]}
              >
                <Text style={styles.rowIcon}>{l.icon}</Text>
                <View style={styles.rowInfo}>
                  <View style={styles.rowTitleWrap}>
                    <Text style={[styles.rowName, { color: unlocked ? colors.textPrimary : colors.textSecondary }]}>
                      {l.name}
                    </Text>
                    {isCurrent && (
                      <View style={[styles.currentBadge, { backgroundColor: l.color }]}>
                        <Text style={styles.currentBadgeText}>CURRENT</Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.rowXP}>{l.minXP} XP</Text>
                </View>
                {unlocked && <Text style={styles.check}>✅</Text>}
              </View>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  body: { padding: 16, paddingBottom: 40 },
  header: { borderRadius: radii.xl, padding: 24, alignItems: 'center', marginBottom: 20 },
  headerIcon: { fontSize: 64 },
  headerName: { fontSize: 26, fontWeight: '900', color: colors.textPrimary, marginTop: 6 },
  headerXP: { fontSize: 20, fontWeight: '800', marginTop: 4 },
  headerNext: { fontSize: 13, color: colors.textSecondary, marginTop: 6 },
  connectorWrap: { alignItems: 'center' },
  connector: { width: 3, height: 24 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    paddingHorizontal: 16,
    borderRadius: radii.md,
    borderWidth: 2,
  },
  rowIcon: { fontSize: 36 },
  rowInfo: { flex: 1 },
  rowTitleWrap: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  rowName: { fontSize: 16, fontWeight: '800' },
  rowXP: { fontSize: 12, color: colors.textSecondary },
  currentBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: radii.pill },
  currentBadgeText: { fontSize: 10, fontWeight: '700', color: 'white' },
  check: { fontSize: 18 },
});
