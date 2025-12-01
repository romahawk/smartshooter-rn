// app/(tabs)/new-training.tsx
import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import PrimaryButton from '@/app/components/PrimaryButton';
import StepperInput from '@/app/components/StepperInput';
import { COLORS } from '@/app/constants/colors';
import { SPACING } from '@/app/constants/spacing';
import { useTheme } from '@/app/context/ThemeContext';

const TRAINING_TYPES = [
  'Spot Shooting',
  'Catch & Shoot',
  'Free Throws',
  'Off the Dribble',
];

export default function NewTrainingScreen() {
  const { isDark } = useTheme();

  const [trainingType] = useState<string>('Catch & Shoot');
  const [attempts, setAttempts] = useState<number>(100);
  const [madeShots, setMadeShots] = useState<number>(73);

  const backgroundStyle = {
    backgroundColor: isDark ? '#020617' : COLORS.background,
  };

  const titleColor = {
    color: isDark ? COLORS.textPrimary : COLORS.textPrimary,
  };

  const labelColor = {
    color: isDark ? COLORS.textSecondary : COLORS.textSecondary,
  };

  const inputCardStyle = {
    backgroundColor: isDark ? '#02091f' : COLORS.surface,
    borderColor: isDark ? '#1f2937' : COLORS.border,
  };

  const trainingTypeAccuracy =
    attempts === 0 ? 0 : Math.round((madeShots / attempts) * 100);

  const handleSave = () => {
    console.log('Saved session:', {
      trainingType,
      attempts,
      madeShots,
      accuracy: trainingTypeAccuracy,
    });
  };

  return (
    <ScrollView
      style={[styles.container, backgroundStyle]}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={[styles.title, titleColor]}>New Training</Text>

      <View style={[styles.card, inputCardStyle]}>
        <Text style={[styles.label, labelColor]}>Training type</Text>

        {/* Simple fake select for now */}
        <TouchableOpacity style={styles.fakeSelect}>
          <Text style={[styles.fakeSelectText, titleColor]}>
            {trainingType}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.card, inputCardStyle]}>
        <StepperInput
          label="Attempts"
          value={attempts}
          onChange={setAttempts}
          min={1}
          max={500}
        />
      </View>

      <View style={[styles.card, inputCardStyle]}>
        <StepperInput
          label="Made Shots"
          value={madeShots}
          onChange={setMadeShots}
          min={0}
          max={attempts}
        />
      </View>

      <View style={[styles.card, inputCardStyle]}>
        <Text style={[styles.label, labelColor]}>Accuracy</Text>
        <Text style={[styles.accuracyValue, titleColor]}>
          {trainingTypeAccuracy}%
        </Text>
      </View>

      <PrimaryButton
        title="Save Session"
        onPress={handleSave}
        style={styles.saveButton}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.xl * 2,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: SPACING.xl,
  },
  card: {
    borderRadius: 16,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
    borderWidth: 1,
  },
  label: {
    fontSize: 14,
    marginBottom: SPACING.sm,
    fontWeight: '500',
  },
  fakeSelect: {
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: SPACING.md,
    justifyContent: 'center',
  },
  fakeSelectText: {
    fontSize: 14,
  },
  accuracyValue: {
    fontSize: 24,
    fontWeight: '700',
  },
  saveButton: {
    marginTop: SPACING.xl * 1.2,
  },
});
