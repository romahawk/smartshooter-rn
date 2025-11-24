// app/_layout.tsx
import { SCREENS } from '@/app/constants/screens';
import { Stack } from 'expo-router';
import React from 'react';

export default function RootLayout() {
  return (
    <Stack>
      {/* Main tab navigator */}
      <Stack.Screen
        name="(tabs)"
        options={{ headerShown: false }}
      />

      {/* Session details (pushed from History) */}
      <Stack.Screen
        name={SCREENS.SESSION_DETAILS}
        options={{
          title: 'Session details',
          headerBackTitle: 'Back',
        }}
      />
    </Stack>
  );
}
