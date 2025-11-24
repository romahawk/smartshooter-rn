// app/(tabs)/_layout.tsx
import { COLORS } from '@/constants/colors';
import { SCREENS } from '@/constants/screens';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Tabs } from 'expo-router';
import React from 'react';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerTitleAlign: 'center',
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textSecondary,
      }}
    >
      <Tabs.Screen
        name={SCREENS.TABS_HOME}
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="home" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name={SCREENS.TABS_NEW_TRAINING}
        options={{
          title: '+ Training',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="plus-square" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name={SCREENS.TABS_HISTORY}
        options={{
          title: 'History',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="history" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name={SCREENS.TABS_STATS}
        options={{
          title: 'Stats',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="chart-line" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name={SCREENS.TABS_PROFILE}
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="user" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
