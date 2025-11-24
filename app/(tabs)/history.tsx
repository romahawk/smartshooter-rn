import TrainingCard from '@/components/TrainingCard';
import { COLORS } from '@/constants/colors';
import { SCREENS } from '@/constants/screens';
import { SPACING } from '@/constants/spacing';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  FlatList,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';

const MOCK_SESSIONS = [
  { id: '1', type: 'Spot Shooting', accuracy: 62, lastSession: 'Nov 2, 2025' },
  { id: '2', type: 'Free Throws', accuracy: 81, lastSession: 'Oct 30, 2025' },
  { id: '3', type: 'Catch & Shoot', accuracy: 68, lastSession: 'Oct 28, 2025' },
  { id: '4', type: 'Diamond Drills', accuracy: 74, lastSession: 'Oct 27, 2025' },
];

export default function HistoryScreen() {
  const { width } = useWindowDimensions();
  const router = useRouter();

  const horizontalPadding = SPACING.lg * 2;
  const gap = SPACING.md;
  const cardWidth = (width - horizontalPadding - gap) / 2;

  return (
    <View style={styles.container}>
      <FlatList
        data={MOCK_SESSIONS}
        numColumns={2}
        keyExtractor={(item) => item.id}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <TrainingCard
            type={item.type}
            accuracy={item.accuracy}
            lastSession={item.lastSession}
            style={{ width: cardWidth }}
            onPress={() =>
              router.push({
                pathname: `/${SCREENS.SESSION_DETAILS}`,
                params: {
                  id: item.id,
                  type: item.type,
                  accuracy: String(item.accuracy),
                  lastSession: item.lastSession,
                },
              })
            }
          />
        )}
        showsVerticalScrollIndicator={false}
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
});
