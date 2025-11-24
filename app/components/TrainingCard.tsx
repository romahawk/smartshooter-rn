import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ViewStyle,
} from 'react-native';

import { COLORS } from '@/app/constants/colors';
import { RADIUS } from '@/app/constants/radius';
import { SHADOW } from '@/app/constants/shadows';
import { SPACING } from '@/app/constants/spacing';


type TrainingCardProps = {
  type: string;
  accuracy: number;
  lastSession: string;
  style?: ViewStyle;
  onPress?: () => void;
};

export default function TrainingCard({
  type,
  accuracy,
  lastSession,
  style,
  onPress,
}: TrainingCardProps) {
  return (
    <TouchableOpacity style={[styles.card, style]} onPress={onPress}>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>🏀</Text>
      </View>

      <Text style={styles.title}>{type}</Text>
      <Text style={styles.accuracy}>{accuracy}%</Text>
      <Text style={styles.date}>Last session: {lastSession}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.card,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    ...SHADOW.card,
  },
  badge: {
    width: 32,
    height: 32,
    borderRadius: RADIUS.badge,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.sm,
  },
  badgeText: {
    fontSize: 18,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  accuracy: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: 4,
  },
  date: {
    fontSize: 11,
    color: COLORS.textSecondary,
  },
});
