// app/training/[id].tsx
import {
  useLocalSearchParams,
  useRouter,
} from 'expo-router';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import type { ApiSession } from '@/app/api/api';
import { COLORS } from '@/app/constants/colors';
import { SPACING } from '@/app/constants/spacing';
import { useTheme } from '@/app/context/ThemeContext';
import type { RootState } from '@/app/store/store';
import {
  deleteSession,
  updateSession,
} from '@/app/store/trainingSessionsSlice';

export default function TrainingDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { isDark } = useTheme();
  const dispatch = useDispatch();

  const numericId = Number(id);

  const session = useSelector((state: RootState) =>
    state.trainingSessions.sessions.find((s) => s.id === numericId)
  );

  const [isEditing, setIsEditing] = useState(false);
  const [local, setLocal] = useState<ApiSession | null>(
    session ?? null
  );

  const backgroundStyle = {
    backgroundColor: isDark ? '#020617' : COLORS.background,
  };

  const titleColor = {
    color: COLORS.textPrimary,
  };

  const textSecondary = {
    color: COLORS.textSecondary,
  };

  if (!session || !local) {
    return (
      <View style={[styles.container, backgroundStyle]}>
        <Text style={[styles.title, titleColor]}>
          Session not found
        </Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>Go back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleSave = () => {
    if (!local) return;
    dispatch(updateSession(local));
    setIsEditing(false);
  };

  // ВАЖЛИВО: без Alert, просто видаляємо й повертаємось
  const handleDelete = () => {
    dispatch(deleteSession(session.id));
    router.back();
  };

  return (
    <View style={[styles.container, backgroundStyle]}>
      <Text style={[styles.title, titleColor]}>
        {session.title}
      </Text>

      <View style={styles.card}>
        <Text style={[styles.label, textSecondary]}>Title</Text>
        {isEditing ? (
          <TextInput
            style={[styles.input, titleColor]}
            value={local.title}
            onChangeText={(text) =>
              setLocal((prev) =>
                prev ? { ...prev, title: text } : prev
              )
            }
          />
        ) : (
          <Text style={[styles.value, titleColor]}>
            {session.title}
          </Text>
        )}

        <Text
          style={[
            styles.label,
            textSecondary,
            { marginTop: SPACING.lg },
          ]}
        >
          Accuracy (%)
        </Text>
        {isEditing ? (
          <TextInput
            style={[styles.input, titleColor]}
            keyboardType="numeric"
            value={String(local.accuracy)}
            onChangeText={(text) =>
              setLocal((prev) =>
                prev
                  ? {
                      ...prev,
                      accuracy: Number(text) || 0,
                    }
                  : prev
              )
            }
          />
        ) : (
          <Text style={[styles.value, titleColor]}>
            {session.accuracy}%
          </Text>
        )}

        <Text
          style={[
            styles.label,
            textSecondary,
            { marginTop: SPACING.lg },
          ]}
        >
          Last session date
        </Text>
        {isEditing ? (
          <TextInput
            style={[styles.input, titleColor]}
            value={local.lastSessionDate}
            onChangeText={(text) =>
              setLocal((prev) =>
                prev ? { ...prev, lastSessionDate: text } : prev
              )
            }
          />
        ) : (
          <Text style={[styles.valueSmall, titleColor]}>
            {session.lastSessionDate}
          </Text>
        )}

        <Text
          style={[
            styles.label,
            textSecondary,
            { marginTop: SPACING.lg },
          ]}
        >
          Notes
        </Text>
        {isEditing ? (
          <TextInput
            style={[
              styles.input,
              styles.notesInput,
              titleColor,
            ]}
            multiline
            value={local.notes}
            onChangeText={(text) =>
              setLocal((prev) =>
                prev ? { ...prev, notes: text } : prev
              )
            }
          />
        ) : (
          <Text style={[styles.notes, titleColor]}>
            {session.notes}
          </Text>
        )}
      </View>

      <View style={styles.actionsRow}>
        <TouchableOpacity
          style={[styles.actionButton, styles.deleteButton]}
          onPress={handleDelete}
        >
          <Text style={styles.actionButtonText}>Delete</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.editButton]}
          onPress={() =>
            isEditing ? handleSave() : setIsEditing(true)
          }
        >
          <Text style={styles.actionButtonText}>
            {isEditing ? 'Save changes' : 'Edit'}
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Text style={styles.backButtonText}>Back to History</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xl * 1.5,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: SPACING.xl,
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    padding: SPACING.lg,
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
  },
  value: {
    fontSize: 20,
    fontWeight: '600',
  },
  valueSmall: {
    fontSize: 16,
    fontWeight: '500',
  },
  notes: {
    fontSize: 14,
    marginTop: SPACING.sm,
    lineHeight: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    fontSize: 14,
    marginTop: 2,
  },
  notesInput: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SPACING.xl,
  },
  actionButton: {
    flex: 1,
    paddingVertical: SPACING.md,
    borderRadius: 999,
    alignItems: 'center',
    marginHorizontal: SPACING.xs,
  },
  editButton: {
    backgroundColor: COLORS.accent,
  },
  deleteButton: {
    backgroundColor: '#EF4444',
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  backButton: {
    marginTop: SPACING.lg,
    alignSelf: 'center',
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.md,
    borderRadius: 999,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  backButtonText: {
    color: COLORS.textPrimary,
    fontWeight: '600',
  },
});
