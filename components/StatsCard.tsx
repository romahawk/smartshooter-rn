import { COLORS } from '@/constants/colors';
import { SPACING } from '@/constants/spacing';
import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';

type StatsCardProps = {
  title: string;
  value?: string;
  subtitle?: string;
  children?: React.ReactNode; // for chart placeholder etc.
  style?: ViewStyle;
};

export default function StatsCard({
  title,
  value,
  subtitle,
  children,
  style,
}: StatsCardProps) {
  return (
    <View style={[styles.card, style]}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {value && <Text style={styles.value}>{value}</Text>}
      </View>

      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}

      <View style={styles.body}>
        {children ?? (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>Chart placeholder</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    padding: SPACING.md,
    marginBottom: SPACING.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  value: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  subtitle: {
    fontSize: 11,
    color: COLORS.textSecondary,
    marginBottom: SPACING.sm,
  },
  body: {
    height: 160,
    borderRadius: 16,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholder: {
    paddingHorizontal: SPACING.md,
  },
  placeholderText: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
});
