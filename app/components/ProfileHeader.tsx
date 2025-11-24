import { COLORS } from '@/app/constants/colors';
import { SPACING } from '@/app/constants/spacing';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type ProfileHeaderProps = {
  name: string;
  tagline?: string;
};

export default function ProfileHeader({ name, tagline }: ProfileHeaderProps) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{initials}</Text>
      </View>

      <View style={styles.textBlock}>
        <Text style={styles.name}>{name}</Text>
        {tagline && <Text style={styles.tagline}>{tagline}</Text>}
      </View>
    </View>
  );
}

const AVATAR_SIZE = 64;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.primary,
  },
  textBlock: {
    marginLeft: SPACING.md,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  tagline: {
    marginTop: 4,
    fontSize: 12,
    color: COLORS.textSecondary,
  },
});
