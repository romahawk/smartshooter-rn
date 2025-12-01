// app/_layout.tsx
import { Stack } from 'expo-router';
import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';

import { ThemeProvider } from './context/ThemeContext';
import { store } from './store/store';

export default function RootLayout() {
  return (
    <ReduxProvider store={store}>
      <ThemeProvider>
        <Stack>
          {/* Main tab navigator */}
          <Stack.Screen
            name="(tabs)"
            options={{ headerShown: false }}
          />

          {/* Session details (navigated from History) */}
          <Stack.Screen
            name="session/[id]"
            options={{ title: 'Session details' }}
          />
        </Stack>
      </ThemeProvider>
    </ReduxProvider>
  );
}
