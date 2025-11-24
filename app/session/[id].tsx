// app/session/[id].tsx

import { COLORS } from '@/app/constants/colors';
import { SPACING } from '@/app/constants/spacing';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function SessionDetailsScreen() {
  const params = useLocalSearchParams<{
    id?: string;
    type?: string;
    accuracy?: string;
    lastSession?: string;
  }>();

  const { id, type, accuracy, lastSession } = params;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.label}>Training type</Text>
      <Text style={styles.value}>{type ?? 'Unknown'}</Text>

      <Text style={styles.label}>Accuracy</Text>
      <Text style={styles.value}>
        {accuracy ? `${accuracy}%` : 'Not measured'}
      </Text>

      <Text style={styles.label}>Notes / Description</Text>
      <Text style={styles.description}>
        {lastSession ?? 'No notes provided.'}
      </Text>

      <View style={styles.sectionDivider} />

      <Text style={styles.label}>Session ID</Text>
      <Text style={styles.value}>{id ?? '—'}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: SPACING.lg,
    gap: SPACING.sm,
    paddingBottom: SPACING.xl,
  },
  label: {
    fontSize: 13,
    fontWeight: '500',
    color: COLORS.textSecondary,
  },
  value: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  sectionDivider: {
    height: 1,
    backgroundColor: COLORS.border ?? 'rgba(148, 163, 184, 0.4)',
    marginVertical: SPACING.md,
  },
});
