import React from 'react';
import { SafeAreaView, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { colors } from '../theme';

export function LoadingScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <Text style={styles.emoji}>🌍</Text>
      <Text style={styles.title}>GeoQuest</Text>
      <ActivityIndicator size="large" color={colors.primary} style={styles.spinner} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: { fontSize: 48, marginBottom: 12 },
  title: { fontSize: 24, fontWeight: '800', color: colors.primary },
  spinner: { marginTop: 20 },
});
