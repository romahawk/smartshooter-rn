import PrimaryButton from '@/app/components/PrimaryButton';
import StepperInput from '@/app/components/StepperInput';
import { COLORS } from '@/app/constants/colors';
import { SCREENS } from '@/app/constants/screens';
import { SPACING } from '@/app/constants/spacing';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const TRAINING_TYPES = ['Catch & Shoot', 'Free Throws', 'Spot Shooting'];

export default function NewTrainingScreen() {
  const router = useRouter();

  const [attempts, setAttempts] = useState(100);
  const [madeShots, setMadeShots] = useState(73);
  const [trainingType, setTrainingType] = useState(TRAINING_TYPES[0]);

  // simple cycling selector – every tap switches to the next type
  const handleChangeTrainingType = () => {
    const currentIndex = TRAINING_TYPES.indexOf(trainingType);
    const nextIndex = (currentIndex + 1) % TRAINING_TYPES.length;
    setTrainingType(TRAINING_TYPES[nextIndex]);
  };

  const handleSave = () => {
    // later we can push this into global state / API
    console.log('Save session', { trainingType, attempts, madeShots });

    // for this homework: navigate to History tab after "saving"
    router.push(`/${SCREENS.TABS_HISTORY}`);
    // or router.push('/history') if needed
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>New Training</Text>

      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Training type</Text>
        <TouchableOpacity
          style={styles.fakeSelect}
          onPress={handleChangeTrainingType}
          activeOpacity={0.8}
        >
          <Text style={styles.fakeSelectText}>{trainingType}</Text>
          <Text style={styles.fakeSelectChevron}>⌄</Text>
        </TouchableOpacity>
      </View>

      <StepperInput
        label="Attempts"
        value={attempts}
        onChange={setAttempts}
        min={0}
        style={{ marginTop: SPACING.lg }}
      />

      <StepperInput
        label="Made Shots"
        value={madeShots}
        onChange={setMadeShots}
        min={0}
        max={attempts}
      />

      <PrimaryButton
        title="Save Session"
        onPress={handleSave}
        style={styles.saveButton}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xl,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.lg,
    textAlign: 'center',
  },
  fieldGroup: {
    marginBottom: SPACING.md,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  fakeSelect: {
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    paddingHorizontal: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  fakeSelectText: {
    fontSize: 14,
    color: COLORS.textPrimary,
  },
  fakeSelectChevron: {
    fontSize: 18,
    color: COLORS.textSecondary,
  },
  saveButton: {
    marginTop: SPACING.xl * 1.2,
  },
});

