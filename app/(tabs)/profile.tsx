import ProfileHeader from '@/app/components/ProfileHeader';
import ProgressBar from '@/app/components/ProgressBar';
import { COLORS } from '@/app/constants/colors';
import { SPACING } from '@/app/constants/spacing';
import React from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

export default function ProfileScreen() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <ProfileHeader
        name="Alex Player"
        tagline="SmartShooter beta user"
      />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Player Bio</Text>
        <TextInput
          style={styles.bioInput}
          multiline
          placeholder="Write something about your playing style, goals, and level..."
          placeholderTextColor={COLORS.textSecondary}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Player Level</Text>
        <ProgressBar progress={0.6} style={{ marginTop: SPACING.sm }} />
        <Text style={styles.levelText}>Level 6 · 60% to next level</Text>
      </View>
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
  section: {
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  bioInput: {
    minHeight: 100,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    fontSize: 14,
    color: COLORS.textPrimary,
    textAlignVertical: 'top',
  },
  levelText: {
    marginTop: SPACING.sm,
    fontSize: 12,
    color: COLORS.textSecondary,
  },
});
