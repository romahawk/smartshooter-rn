import PrimaryButton from '@/components/PrimaryButton';
import StepperInput from '@/components/StepperInput';
import { COLORS } from '@/constants/colors';
import { SPACING } from '@/constants/spacing';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function NewTrainingScreen() {
  const [attempts, setAttempts] = useState(100);
  const [madeShots, setMadeShots] = useState(73);

  // later we'll make this a real picker
  const trainingType = 'Catch & Shoot';

  const handleSave = () => {
    // TODO: integrate with History / API later
    console.log('Save session', { trainingType, attempts, madeShots });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>New Training</Text>

      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Training type</Text>
        <View style={styles.fakeSelect}>
          <Text style={styles.fakeSelectText}>{trainingType}</Text>
          <Text style={styles.fakeSelectChevron}>⌄</Text>
        </View>
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
