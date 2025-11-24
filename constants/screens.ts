export const SCREENS = {
  TABS_HOME: 'index',
  TABS_NEW_TRAINING: 'new-training',
  TABS_HISTORY: 'history',
  TABS_STATS: 'stats',
  TABS_PROFILE: 'profile',
  SESSION_DETAILS: 'session/[id]',
} as const;

export type ScreenName = (typeof SCREENS)[keyof typeof SCREENS];
