// app/(tabs)/new-training.tsx
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch } from 'react-redux';

import PrimaryButton from '@/app/components/PrimaryButton';
import StepperInput from '@/app/components/StepperInput';
import { COLORS } from '@/app/constants/colors';
import { SPACING } from '@/app/constants/spacing';
import { useTheme } from '@/app/context/ThemeContext';

import { createSession } from '@/app/api/api';
import { addSession } from '@/app/store/trainingSessionsSlice';

const TRAINING_TYPES = [
  'Catch & Shoot',
  'Spot Shooting',
  'Half Court Sprints',
  'Off the Dribble',
];

export default function NewTrainingScreen() {
  const { isDark } = useTheme();
  const dispatch = useDispatch();
  const router = useRouter();

  const [trainingType, setTrainingType] = useState<string>('Catch & Shoot');
  const [pickerOpen, setPickerOpen] = useState<boolean>(false);

  const [attempts, setAttempts] = useState<number>(100);
  const [madeShots, setMadeShots] = useState<number>(73);

  const backgroundStyle = {
    backgroundColor: isDark ? COLORS.darkBackground : COLORS.background,
  };

  const titleColor = {
    color: isDark ? COLORS.darkTextPrimary : COLORS.textPrimary,
  };

  const labelColor = {
    color: isDark ? COLORS.darkTextSecondary : COLORS.textSecondary,
  };

  const inputCardStyle = {
    backgroundColor: isDark ? COLORS.darkSurface : COLORS.surface,
    borderColor: isDark ? COLORS.darkBorder : COLORS.border,
  };

  const accuracy =
    attempts === 0 ? 0 : Math.round((madeShots / attempts) * 100);

  const handleSelectType = (type: string) => {
    setTrainingType(type);
    setPickerOpen(false);
  };

  // гарантуємо: madeShots <= attempts
  const handleChangeAttempts = (value: number) => {
    setAttempts(value);
    if (madeShots > value) {
      setMadeShots(value);
    }
  };

  const handleSave = async () => {
    try {
      const acc =
        attempts === 0 ? 0 : Math.round((madeShots / attempts) * 100);

      const today = new Date().toISOString().split('T')[0];

      // 1) створюємо сесію на backendʼі
      const created = await createSession({
        title: trainingType,
        accuracy: acc,
        lastSessionDate: today,
        notes: `${trainingType}: ${madeShots}/${attempts} made shots (${acc}%)`,
      });

      // 2) синхронізуємо Redux-стан
      dispatch(addSession(created));

      // 3) переходимо до History
      router.push('/history');
    } catch (error) {
      console.error('Failed to save session', error);
      Alert.alert(
        'Error',
        'Could not save the training session. Please try again.'
      );
    }
  };

  return (
    <ScrollView
      style={[styles.container, backgroundStyle]}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={[styles.title, titleColor]}>New Training</Text>

      {/* Training type */}
      <View style={[styles.card, inputCardStyle]}>
        <Text style={[styles.label, labelColor]}>Training type</Text>

        <TouchableOpacity
          style={[
            styles.fakeSelect,
            {
              borderColor: isDark ? COLORS.darkBorder : COLORS.border,
            },
          ]}
          onPress={() => setPickerOpen((prev) => !prev)}
        >
          <Text style={[styles.fakeSelectText, titleColor]}>
            {trainingType}
          </Text>
        </TouchableOpacity>

        {pickerOpen && (
          <View
            style={[
              styles.dropdown,
              {
                borderColor: isDark ? COLORS.darkBorder : COLORS.border,
              },
            ]}
          >
            {TRAINING_TYPES.map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.dropdownItem,
                  {
                    backgroundColor: isDark
                      ? COLORS.darkSurface
                      : COLORS.surface,
                  },
                ]}
                onPress={() => handleSelectType(type)}
              >
                <Text
                  style={[
                    styles.dropdownItemText,
                    {
                      color: isDark
                        ? COLORS.darkTextPrimary
                        : COLORS.textPrimary,
                    },
                    type === trainingType &&
                      styles.dropdownItemTextActive,
                  ]}
                >
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      {/* Attempts */}
      <View style={[styles.card, inputCardStyle]}>
        <StepperInput
          label="Attempts"
          value={attempts}
          onChange={handleChangeAttempts}
          min={1}
          max={500}
        />
      </View>

      {/* Made shots */}
      <View style={[styles.card, inputCardStyle]}>
        <StepperInput
          label="Made Shots"
          value={madeShots}
          onChange={setMadeShots}
          min={0}
          max={attempts}
        />
      </View>

      {/* Accuracy */}
      <View style={[styles.card, inputCardStyle]}>
        <Text style={[styles.label, labelColor]}>Accuracy</Text>
        <Text style={[styles.accuracyValue, titleColor]}>
          {accuracy}%
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
    paddingHorizontal: SPACING.md,
    justifyContent: 'center',
  },
  fakeSelectText: {
    fontSize: 14,
  },
  dropdown: {
    marginTop: SPACING.sm,
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
  },
  dropdownItem: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
  },
  dropdownItemText: {
    fontSize: 14,
  },
  dropdownItemTextActive: {
    fontWeight: '700',
  },
  accuracyValue: {
    fontSize: 24,
    fontWeight: '700',
  },
  saveButton: {
    marginTop: SPACING.xl * 1.2,
  },
});
