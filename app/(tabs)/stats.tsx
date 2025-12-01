// app/(tabs)/stats.tsx
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import StatsCard from '@/app/components/StatsCard';
import { COLORS } from '@/app/constants/colors';
import { SPACING } from '@/app/constants/spacing';
import { useTheme } from '@/app/context/ThemeContext';

export default function StatsScreen() {
  const { isDark } = useTheme();

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.sectionTitle, isDark && styles.sectionTitleDark]}>
          Accuracy Chart
        </Text>
        <StatsCard
          title="Accuracy Trend"
          subtitle="Last 10 sessions"
        />

        <Text
          style={[
            styles.sectionTitle,
            styles.sectionTitleSpacing,
            isDark && styles.sectionTitleDark,
          ]}
        >
          Heatmap
        </Text>
        <StatsCard
          title="Shot Heatmap"
          subtitle="Zones by accuracy"
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  containerDark: {
    backgroundColor: '#02041b',
  },
  content: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.xl,
    rowGap: SPACING.lg,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  sectionTitleDark: {
    color: '#E5E7EB',
  },
  sectionTitleSpacing: {
    marginTop: SPACING.lg,
  },
});
