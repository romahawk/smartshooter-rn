import { COLORS } from '@/app/constants/colors';
import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

type ProgressBarProps = {
  progress: number; // 0..1
  style?: ViewStyle;
};

export default function ProgressBar({ progress, style }: ProgressBarProps) {
  const clamped = Math.min(1, Math.max(0, progress));

  return (
    <View style={[styles.track, style]}>
      <View style={[styles.fill, { flexBasis: `${clamped * 100}%` }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    height: 8,
    borderRadius: 999,
    backgroundColor: COLORS.border,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    backgroundColor: COLORS.primary,
  },
});
