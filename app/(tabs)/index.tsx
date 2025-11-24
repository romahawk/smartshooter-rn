import PrimaryButton from '@/app/components/PrimaryButton';
import { COLORS } from '@/app/constants/colors';
import { SCREENS } from '@/app/constants/screens';
import { SPACING } from '@/app/constants/spacing';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Welcome back, 🏀 Alex!</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Shooting Accuracy</Text>
        <Text style={styles.cardValue}>62%</Text>
        <Text style={styles.cardSubtitle}>Last session: Nov 2, 2025</Text>
      </View>

      <PrimaryButton
        title="Start Training"
        onPress={() => {
          // navigate to "+ Training" tab
          router.push(`/${SCREENS.TABS_NEW_TRAINING}`);
          // if SCREENS is not set up, you can also use: router.push('/new-training');
        }}
        style={styles.startButton}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xl,
  },
  greeting: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.lg,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    padding: SPACING.lg,
    marginBottom: SPACING.xl,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  cardValue: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: SPACING.sm,
  },
  cardSubtitle: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  startButton: {
    marginTop: SPACING.lg,
  },
});

