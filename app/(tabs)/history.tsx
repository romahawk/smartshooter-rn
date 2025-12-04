// app/(tabs)/history.tsx
import dayjs from 'dayjs';
import { useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
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
import { SPACING } from '@/app/constants/spacing';
import { useTheme } from '@/app/context/ThemeContext';

import type { ApiSession } from '@/app/api/api';
import { fetchSessions } from '@/app/api/api';
import type { RootState } from '@/app/store/store';
import { setSessions } from '@/app/store/trainingSessionsSlice';

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
    let isMounted = true;

    async function load() {
      try {
        setLoading(true);
        setError(null);
        const data: ApiSession[] = await fetchSessions();
        if (isMounted) {
          dispatch(setSessions(data));
        }
      } catch (err) {
        console.error('Failed to load sessions', err);
        if (isMounted) {
          setError('Failed to load sessions. Please try again.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    // фетчимо тільки коли в сторі ще немає сесій
    if (sessions.length === 0) {
      load();
    }

    return () => {
      isMounted = false;
    };
  }, [dispatch, sessions.length]);

  const renderItem = useCallback(
  ({ item }: { item: ApiSession }) => {
    const formattedDate = dayjs(item.lastSessionDate).format('DD.MM.YYYY');

    return (
      <View style={styles.cardWrapper}>
        <TrainingCard
          title={item.title}
          accuracy={item.accuracy}
          lastSessionLabel={formattedDate}
          isDark={isDark}
          onPress={() =>
            router.push({
              pathname: '/training/[id]',
              params: { id: String(item.id) },
            })
          }
        />
      </View>
    );
  },
  [isDark, router]
  );


  if (loading && sessions.length === 0) {
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

  if (error && sessions.length === 0) {
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
      style={[
        styles.container,
        isDark && styles.containerDark,
      ]}
    >
      <Text style={styles.title}>Training History</Text>

      <FlatList
        data={sessions}
        keyExtractor={(item) => String(item.id)}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.row}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text
            style={[
              styles.emptyText,
              isDark && styles.emptyTextDark,
            ]}
          >
            No sessions yet. Start a new training!
          </Text>
        }
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
  title: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: SPACING.xl,
    marginBottom: SPACING.md,
    color: COLORS.textPrimary,
  },
  listContent: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xl * 2,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: SPACING.lg,
  },
  cardWrapper: {
    flex: 1,
    marginHorizontal: SPACING.xs,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: SPACING.xl,
    color: COLORS.textSecondary,
  },
  emptyTextDark: {
    color: DARK_TEXT_SECONDARY,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    color: COLORS.accent,
    textAlign: 'center',
    paddingHorizontal: SPACING.lg,
  },
  errorTextDark: {
    color: COLORS.accent,
  },
});
