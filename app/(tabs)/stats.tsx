import StatsCard from '@/components/StatsCard';
import { COLORS } from '@/constants/colors';
import { SPACING } from '@/constants/spacing';
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

export default function StatsScreen() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <StatsCard
        title="Accuracy Trend"
        value="Avg 62%"
        subtitle="Last 6 sessions"
      />

      <StatsCard
        title="Court Heatmap"
        subtitle="Zones with best & worst accuracy"
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.xl,
  },
});
