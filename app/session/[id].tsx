// app/session/[id].tsx
import { COLORS } from '@/constants/colors';
import { SPACING } from '@/constants/spacing';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function SessionDetailsScreen() {
  const params = useLocalSearchParams<{
    id?: string;
    type?: string;
    accuracy?: string;
    lastSession?: string;
  }>();

  const { id, type, accuracy, lastSession } = params;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Training type</Text>
      <Text style={styles.value}>{type ?? 'Unknown'}</Text>

      <Text style={styles.label}>Accuracy</Text>
      <Text style={styles.value}>{accuracy ? `${accuracy}%` : '—'}</Text>

      <Text style={styles.label}>Last session date</Text>
      <Text style={styles.value}>{lastSession ?? '—'}</Text>

      <Text style={styles.label}>Session ID</Text>
      <Text style={styles.value}>{id ?? '—'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: SPACING.lg,
    gap: SPACING.sm,
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
});
