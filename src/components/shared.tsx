import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { colors, radii } from '../theme';
import type { Level } from '../data/levels';

// ── TopBar ──────────────────────────────────────────────────────────────────

interface TopBarProps {
  title: string;
  onBack?: () => void;
}

/** Standard screen header with an optional back button, balanced for centering. */
export function TopBar({ title, onBack }: TopBarProps) {
  return (
    <View style={styles.topBar}>
      {onBack ? (
        <TouchableOpacity
          onPress={onBack}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <Text style={styles.backBtn}>{'‹'}</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.sideSpacer} />
      )}
      <Text style={styles.topBarTitle}>{title}</Text>
      <View style={styles.sideSpacer} />
    </View>
  );
}

// ── ProgressBar ─────────────────────────────────────────────────────────────

interface ProgressBarProps {
  /** 0–100 */
  progress: number;
  color: string;
  height?: number;
  style?: object;
}

export function ProgressBar({ progress, color, height = 8, style }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, progress));
  return (
    <View style={[styles.progressBg, { height }, style]}>
      <View style={[styles.progressFill, { width: `${clamped}%`, backgroundColor: color }]} />
    </View>
  );
}

// ── LevelUpModal ────────────────────────────────────────────────────────────

interface LevelUpModalProps {
  level: Level | null;
  visible: boolean;
  onClose: () => void;
}

export function LevelUpModal({ level, visible, onClose }: LevelUpModalProps) {
  if (!level) return null;
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={[styles.modalLabel, { color: level.color }]}>LEVEL UP!</Text>
          <Text style={styles.modalIcon}>{level.icon}</Text>
          <Text style={styles.modalName}>{level.name}</Text>
          <Text style={styles.modalDesc}>{level.desc}</Text>
          <View style={[styles.badgeRow, { backgroundColor: `${level.color}22` }]}>
            <Text style={[styles.badgeText, { color: level.color }]}>{level.badge} Badge Unlocked</Text>
          </View>
          <TouchableOpacity style={styles.modalBtn} onPress={onClose}>
            <Text style={styles.modalBtnText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
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
  backBtn: { fontSize: 28, color: colors.accent, fontWeight: '600', lineHeight: 28 },
  topBarTitle: { fontSize: 17, fontWeight: '700', color: colors.textPrimary },
  sideSpacer: { width: 50 },

  progressBg: {
    backgroundColor: colors.border,
    borderRadius: radii.pill,
    overflow: 'hidden',
  },
  progressFill: { height: '100%', borderRadius: radii.pill },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.65)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: colors.surface,
    borderRadius: 28,
    padding: 36,
    width: '85%',
    alignItems: 'center',
  },
  modalLabel: { fontSize: 14, fontWeight: '800', textTransform: 'uppercase', letterSpacing: 2 },
  modalIcon: { fontSize: 80, marginVertical: 4 },
  modalName: { fontSize: 34, fontWeight: '900', color: colors.textPrimary },
  modalDesc: {
    fontSize: 15,
    color: colors.textSecondary,
    marginTop: 6,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  badgeRow: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: radii.pill,
    marginTop: 12,
  },
  badgeText: { fontSize: 14, fontWeight: '700' },
  modalBtn: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: radii.md,
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  modalBtnText: { color: 'white', fontSize: 16, fontWeight: '700' },
});
