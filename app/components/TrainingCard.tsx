// app/components/TrainingCard.tsx
import { COLORS } from '@/app/constants/colors';
import { RADIUS } from '@/app/constants/radius';
import { SHADOW } from '@/app/constants/shadows';
import { SPACING } from '@/app/constants/spacing';
import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

// Simple dark palette (like Profile screen)
const DARK_BACKGROUND = '#020617';
const DARK_TEXT_PRIMARY = '#E5E7EB';
const DARK_TEXT_SECONDARY = '#9CA3AF';

type TrainingCardProps = {
  title: string;
  accuracy: number;
  lastSessionLabel: string;
  onPress: () => void;
  isDark?: boolean;
};

export default function TrainingCard({
  title,
  accuracy,
  lastSessionLabel,
  onPress,
  isDark = false,
}: TrainingCardProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        isDark && styles.cardDark,
        pressed && styles.cardPressed,
      ]}
    >
      <View style={styles.iconWrapper}>
        <Text style={styles.iconText}>🏀</Text>
      </View>

      <View style={styles.textBlock}>
        <Text
          style={[styles.title, isDark && styles.titleDark]}
          numberOfLines={2}
        >
          {title}
        </Text>

        <Text style={[styles.accuracy, isDark && styles.accuracyDark]}>
          {accuracy}%
        </Text>

        <Text style={[styles.meta, isDark && styles.metaDark]}>
          Last session: {lastSessionLabel}
        </Text>
      </View>
    </Pressable>
  );
}

type Styles = {
  card: ViewStyle;
  cardDark: ViewStyle;
  cardPressed: ViewStyle;
  iconWrapper: ViewStyle;
  iconText: TextStyle;
  textBlock: ViewStyle;
  title: TextStyle;
  titleDark: TextStyle;
  accuracy: TextStyle;
  accuracyDark: TextStyle;
  meta: TextStyle;
  metaDark: TextStyle;
};

const styles = StyleSheet.create<Styles>({
  card: {
    flex: 1,
    borderRadius: RADIUS.card,
    padding: SPACING.md,
    backgroundColor: COLORS.surface,
    ...SHADOW.card,
  },
  cardDark: {
    backgroundColor: DARK_BACKGROUND,
  },
  cardPressed: {
    transform: [{ scale: 0.98 }],
  },
  iconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 16,
    // ⬇️ fixed: use existing accent color
    backgroundColor: COLORS.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.xs,
  },
  iconText: {
    fontSize: 18,
  },
  textBlock: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  titleDark: {
    color: DARK_TEXT_PRIMARY,
  },
  accuracy: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.accent,
  },
  accuracyDark: {
    color: COLORS.accent,
  },
  meta: {
    marginTop: 4,
    fontSize: 11,
    color: COLORS.textSecondary,
  },
  metaDark: {
    color: DARK_TEXT_SECONDARY,
  },
});
