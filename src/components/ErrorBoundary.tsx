import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, radii } from '../theme';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
}

/**
 * Last line of defense: if anything throws during render, the user sees a
 * friendly recovery screen with a "Try Again" button instead of a frozen
 * white page (which is exactly what a crash looks like in a release build).
 */
export class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // Hook up a crash-reporting service (e.g. Sentry) here in production.
    console.error('GeoQuest crashed:', error, info.componentStack);
  }

  private handleReset = () => this.setState({ hasError: false });

  render() {
    if (!this.state.hasError) return this.props.children;
    return (
      <View style={styles.container}>
        <Text style={styles.emoji}>🌍</Text>
        <Text style={styles.title}>Oops, something went wrong</Text>
        <Text style={styles.subtitle}>Your progress is saved. Tap below to get back to the quiz.</Text>
        <TouchableOpacity style={styles.button} onPress={this.handleReset}>
          <Text style={styles.buttonText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  emoji: { fontSize: 56, marginBottom: 12 },
  title: { fontSize: 20, fontWeight: '800', color: colors.textPrimary, textAlign: 'center' },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 24,
  },
  button: {
    backgroundColor: colors.primary,
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: radii.md,
  },
  buttonText: { color: 'white', fontSize: 16, fontWeight: '700' },
});
