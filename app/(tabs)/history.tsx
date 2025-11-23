import TrainingCard from '@/components/TrainingCard';
import { COLORS } from '@/constants/colors';
import { SPACING } from '@/constants/spacing';
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
        renderItem={({ item }) => (
          <TrainingCard
            type={item.type}
            accuracy={item.accuracy}
            lastSession={item.lastSession}
            style={{ width: cardWidth }}
            onPress={() => {}}
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
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
  },
});
