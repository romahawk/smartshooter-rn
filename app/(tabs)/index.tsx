// app/(tabs)/index.tsx
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import PrimaryButton from '@/app/components/PrimaryButton';
import ProgressBar from '@/app/components/ProgressBar';
import { COLORS } from '@/app/constants/colors';
import { SPACING } from '@/app/constants/spacing';
import { useTheme } from '@/app/context/ThemeContext';

export default function HomeScreen() {
  const router = useRouter();
  const { isDark } = useTheme();

  const backgroundStyle = {
    backgroundColor: isDark ? '#020617' : COLORS.background,
  };

  const titleColor = {
    color: isDark ? COLORS.textPrimary : COLORS.textPrimary,
  };

  const subtitleColor = {
    color: isDark ? COLORS.textSecondary : COLORS.textSecondary,
  };

  const cardStyle = {
    backgroundColor: isDark ? '#02091f' : COLORS.surface,
  };

  return (
    <ScrollView
      style={[styles.container, backgroundStyle]}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={[styles.title, titleColor]}>Welcome back, Alex 👋</Text>
      <Text style={[styles.subtitle, subtitleColor]}>
        Track your basketball shooting progress and keep your streak alive.
      </Text>

      <View style={[styles.card, cardStyle]}>
        <Text style={[styles.cardTitle, titleColor]}>Current streak</Text>
        <Text style={[styles.cardValue, titleColor]}>5 days</Text>
        <ProgressBar progress={0.6} />
        <Text style={[styles.cardHint, subtitleColor]}>
          3 more days to reach a new personal best.
        </Text>
      </View>

      <View style={[styles.card, cardStyle]}>
        <Text style={[styles.cardTitle, titleColor]}>Last session</Text>
        <Text style={[styles.cardValue, titleColor]}>73% accuracy</Text>
        <Text style={[styles.cardHint, subtitleColor]}>
          Nice work! Try to beat 75% today.
        </Text>
      </View>

      <PrimaryButton
        title="+ Start Training"
        onPress={() => router.push('/(tabs)/new-training')}
        style={styles.startButton}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.xl * 2,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: SPACING.xs,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: SPACING.xl,
  },
  card: {
    borderRadius: 16,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  cardTitle: {
    fontSize: 14,
    marginBottom: SPACING.xs,
    fontWeight: '500',
  },
  cardValue: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: SPACING.sm,
  },
  cardHint: {
    fontSize: 12,
    marginTop: SPACING.sm,
  },
  startButton: {
    marginTop: SPACING.xl,
  },
});
