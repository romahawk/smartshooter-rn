// app/(tabs)/history.tsx
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import TrainingCard from '@/app/components/TrainingCard';
import { COLORS } from '@/app/constants/colors';
import { SCREENS } from '@/app/constants/screens';
import { SPACING } from '@/app/constants/spacing';
import { useTheme } from '@/app/context/ThemeContext';

import type { ApiSession } from '@/app/api/api';
import { fetchSessions } from '@/app/api/api';
import type { RootState } from '@/app/store/store';
import { setSessions } from '@/app/store/trainingSessionsSlice';

// same dark palette as Profile
const DARK_BACKGROUND = '#020617';
const DARK_TEXT_SECONDARY = '#9CA3AF';

export default function HistoryScreen() {
  const { isDark } = useTheme();
  const router = useRouter();
  const dispatch = useDispatch();

  const sessions = useSelector(
    (state: RootState) => state.trainingSessions.sessions
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError(null);
        const data: ApiSession[] = await fetchSessions();
        dispatch(setSessions(data));
      } catch (err) {
        console.error(err);
        setError('Failed to load sessions from API');
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [dispatch]);

  const renderItem = ({ item }: { item: ApiSession }) => (
    <View style={styles.cardWrapper}>
      <TrainingCard
        title={item.title}
        accuracy={item.accuracy}
        lastSessionLabel={item.lastSessionDate}
        isDark={isDark}
        onPress={() =>
          router.push({
            pathname: SCREENS.SESSION_DETAILS,
            params: { id: String(item.id) },
          })
        }
      />
    </View>
  );

  if (loading) {
    return (
      <View
        style={[
          styles.loadingContainer,
          isDark && styles.loadingContainerDark,
        ]}
      >
        <ActivityIndicator size="large" color={COLORS.accent} />
        <Text
          style={[styles.loadingText, isDark && styles.loadingTextDark]}
        >
          Loading sessions…
        </Text>
      </View>
    );
  }

  if (error) {
    return (
      <View
        style={[
          styles.loadingContainer,
          isDark && styles.loadingContainerDark,
        ]}
      >
        <Text style={[styles.errorText, isDark && styles.errorTextDark]}>
          {error}
        </Text>
      </View>
    );
  }

  return (
    <View
      style={[styles.container, isDark && styles.containerDark]}
    >
      <FlatList
        data={sessions}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  containerDark: {
    backgroundColor: DARK_BACKGROUND,
  },
  listContent: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.xl * 2,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: SPACING.lg,
  },
  cardWrapper: {
    width: '48%',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.background,
  },
  loadingContainerDark: {
    backgroundColor: DARK_BACKGROUND,
  },
  loadingText: {
    marginTop: SPACING.md,
    color: COLORS.textSecondary,
  },
  loadingTextDark: {
    color: DARK_TEXT_SECONDARY,
  },
  errorText: {
    color: COLORS.accent, // use accent as "error" color here
    textAlign: 'center',
    paddingHorizontal: SPACING.lg,
  },
  errorTextDark: {
    color: COLORS.accent,
  },
});
