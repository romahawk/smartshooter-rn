import { COLORS } from '@/constants/colors';
import { SPACING } from '@/constants/spacing';
import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ViewStyle,
} from 'react-native';

type StepperInputProps = {
  label: string;
  value: number;
  onChange: (newValue: number) => void;
  min?: number;
  max?: number;
  style?: ViewStyle;
};

export default function StepperInput({
  label,
  value,
  onChange,
  min = 0,
  max = Number.MAX_SAFE_INTEGER,
  style,
}: StepperInputProps) {
  const handleDecrease = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const handleIncrease = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.controls}>
        <TouchableOpacity
          style={[styles.button, value <= min && styles.buttonDisabled]}
          onPress={handleDecrease}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>–</Text>
        </TouchableOpacity>

        <Text style={styles.value}>{value}</Text>

        <TouchableOpacity
          style={[styles.button, value >= max && styles.buttonDisabled]}
          onPress={handleIncrease}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const BUTTON_SIZE = 32;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.textPrimary,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  button: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.surface,
  },
  buttonDisabled: {
    opacity: 0.4,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  value: {
    minWidth: 40,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
});
