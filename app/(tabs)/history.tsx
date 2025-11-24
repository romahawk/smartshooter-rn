// app/(tabs)/history.tsx

import { ApiSession, fetchSessions } from '@/app/api/api';
import TrainingCard from '@/app/components/TrainingCard';
import { COLORS } from '@/app/constants/colors';
import { SCREENS } from '@/app/constants/screens';
import { SPACING } from '@/app/constants/spacing';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';

export default function HistoryScreen() {
  const { width } = useWindowDimensions();
  const router = useRouter();

  const [sessions, setSessions] = useState<ApiSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const horizontalPadding = SPACING.lg * 2;
  const gap = SPACING.md;
  const cardWidth = (width - horizontalPadding - gap) / 2;

  useEffect(() => {
    fetchSessions()
      .then((result: ApiSession[]) => {
        // Limit to first 20 items to keep UI readable
        setSessions(result.slice(0, 20));
      })
      .catch(() => {
        setError('Failed to load sessions. Please try again later.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>Loading sessions...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={sessions}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          // Map API data → SmartShooter training card
          const accuracy = Math.floor(Math.random() * 21) + 60; // 60–80%

          const shortTitle =
            item.title.length > 22 ? item.title.slice(0, 22) + '…' : item.title;

          return (
            <TrainingCard
              type={shortTitle}
              accuracy={accuracy}
              lastSession="API session"
              style={{ width: cardWidth }}
              onPress={() =>
                router.push({
                  pathname: `/${SCREENS.SESSION_DETAILS}`,
                  params: {
                    id: String(item.id),
                    type: item.title,
                    accuracy: String(accuracy),
                    lastSession: item.body, // full text as notes
                  },
                })
              }
            />
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  listContent: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.xl,
  },
  center: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.lg,
  },
  loadingText: {
    marginTop: SPACING.md,
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  errorText: {
    fontSize: 14,
    color: '#EF4444', // fixed: don't rely on COLORS.error
    textAlign: 'center',
  },
});
