// app/session/[id].tsx
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

import { COLORS } from '@/app/constants/colors';
import { SPACING } from '@/app/constants/spacing';
import { useTheme } from '@/app/context/ThemeContext';
import type { RootState } from '@/app/store/store';

const DARK_BACKGROUND = '#020617';
const DARK_TEXT_PRIMARY = '#E5E7EB';
const DARK_TEXT_SECONDARY = '#9CA3AF';

export default function SessionDetailsScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { isDark } = useTheme();

  const numericId = Number(id);

  const session = useSelector((state: RootState) =>
    state.trainingSessions.sessions.find((s) => s.id === numericId)
  );

  const backgroundStyle = {
    backgroundColor: isDark ? DARK_BACKGROUND : COLORS.background,
  };

  const textPrimary = {
    color: isDark ? DARK_TEXT_PRIMARY : COLORS.textPrimary,
  };

  const textSecondary = {
    color: isDark ? DARK_TEXT_SECONDARY : COLORS.textSecondary,
  };

  return (
    <ScrollView style={[styles.container, backgroundStyle]}>
      <View style={styles.section}>
        <Text style={[styles.label, textSecondary]}>Training type</Text>
        <Text style={[styles.value, textPrimary]}>
          {session?.title ?? 'Unknown'}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.label, textSecondary]}>Accuracy</Text>
        <Text style={[styles.value, textPrimary]}>
          {session ? `${session.accuracy}%` : 'Not measured'}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.label, textSecondary]}>Notes / Description</Text>
        <Text style={[styles.value, textPrimary]}>
          {session?.notes ?? 'No notes provided.'}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.label, textSecondary]}>Last session</Text>
        <Text style={[styles.value, textPrimary]}>
          {session?.lastSessionDate ?? 'API session'}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.label, textSecondary]}>Session ID</Text>
        <Text style={[styles.value, textPrimary]}>{id}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACING.lg,
  },
  section: {
    marginBottom: SPACING.lg,
  },
  label: {
    fontSize: 12,
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    fontWeight: '500',
  },
});
