// app/constants/theme.ts
import { COLORS } from './colors';

const lightColors = {
  text: COLORS.textPrimary,
  background: COLORS.background,
  tint: COLORS.primary,
  tabIconDefault: '#9CA3AF',   // gray
  tabIconSelected: COLORS.primary,
};

const darkColors = {
  text: COLORS.surface,
  background: '#020617',       // near-black
  tint: COLORS.primary,
  tabIconDefault: '#6B7280',
  tabIconSelected: COLORS.primary,
};

export const Colors = {
  light: lightColors,
  dark: darkColors,
};

