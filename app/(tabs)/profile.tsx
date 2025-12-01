import PrimaryButton from '@/app/components/PrimaryButton';
import ProfileHeader from '@/app/components/ProfileHeader';
import ProgressBar from '@/app/components/ProgressBar';
import { COLORS } from '@/app/constants/colors';
import { SPACING } from '@/app/constants/spacing';
import { useTheme } from '@/app/context/ThemeContext';
import React from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

export default function ProfileScreen() {
  const { isDark, toggleTheme } = useTheme();

  // derive theme-aware colors
  const backgroundColor = isDark ? '#020617' : '#F9FAFB';       // dark blue vs light gray
  const cardBackground = isDark ? '#0B1120' : COLORS.surface;   // darker card in dark mode
  const borderColor = isDark ? '#1E293B' : COLORS.border;
  const textPrimary = isDark ? '#F9FAFB' : COLORS.textPrimary;
  const textSecondary = isDark ? '#CBD5F5' : COLORS.textSecondary;

  return (
    <ScrollView
      style={[styles.container, { backgroundColor }]}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <ProfileHeader
        name="Alex Player"
        tagline="SmartShooter beta user"
      />

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: textPrimary }]}>
          Player Bio
        </Text>
        <TextInput
          style={[
            styles.bioInput,
            {
              backgroundColor: cardBackground,
              borderColor,
              color: textPrimary,
            },
          ]}
          multiline
          placeholder="Write something about your playing style, goals, and level..."
          placeholderTextColor={textSecondary}
        />
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: textPrimary }]}>
          Player Level
        </Text>
        <ProgressBar progress={0.6} style={{ marginTop: SPACING.sm }} />
        <Text style={[styles.levelText, { color: textSecondary }]}>
          Level 6 · 60% to next level
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: textPrimary }]}>
          Theme
        </Text>
        <PrimaryButton
          title={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
          onPress={toggleTheme}
          style={{ marginTop: SPACING.sm }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // real background is set via inline style from theme
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
    // color overridden by theme
  },
  bioInput: {
    minHeight: 100,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    fontSize: 14,
    textAlignVertical: 'top',
  },
  levelText: {
    marginTop: SPACING.sm,
    fontSize: 12,
  },
});
