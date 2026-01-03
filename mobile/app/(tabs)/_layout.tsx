import { Tabs, useRouter, useSegments } from 'expo-router';
import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useAuth } from '@/context/AuthContext';
import { Shadows } from '@/constants/shadows';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { currentUser, loading } = useAuth();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (loading) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (!currentUser && !inAuthGroup) {
      router.replace('/(auth)/login');
    } else if (currentUser && inAuthGroup) {
      router.replace('/(tabs)');
    }
  }, [currentUser, loading, segments]);

  if (loading) {
    return null; // Or a loading spinner
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textSecondary,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
             backgroundColor: Colors.backgroundCard,
            borderTopColor: Colors.border,
            ...Shadows.md,
          },
          default: {
             backgroundColor: Colors.backgroundCard,
            borderTopColor: Colors.border,
            borderTopWidth: 1,
            paddingTop: 8,
            paddingBottom: 8,
            height: 65,
            ...Shadows.md,
          },
        }),
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginBottom: Platform.OS === 'android' ? 4 : 0,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Beranda',
          tabBarIcon: ({ color }) => <FontAwesome size={24} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="materi"
        options={{
          title: 'Materi',
          tabBarIcon: ({ color }) => <FontAwesome size={24} name="book" color={color} />,
        }}
      />
      <Tabs.Screen
        name="simulasi"
        options={{
          title: 'Simulasi',
          tabBarIcon: ({ color }) => <FontAwesome size={24} name="flask" color={color} />,
        }}
      />
      <Tabs.Screen
        name="kuis"
        options={{
          title: 'Kuis',
          tabBarIcon: ({ color }) => <FontAwesome size={24} name="pencil" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profil',
          tabBarIcon: ({ color }) => <FontAwesome size={24} name="user" color={color} />,
        }}
      />
    </Tabs>
  );
}
