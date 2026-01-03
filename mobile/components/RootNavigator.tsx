import React, { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, useRouter, useSegments } from 'expo-router';
import { useAuth, AuthProvider } from '@/context/AuthContext';
import { useColorScheme } from '@/hooks/useColorScheme';
import '../global.css';

function InnerNavigator() {
  const colorScheme = useColorScheme();
  const { currentUser, loading } = useAuth();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (loading) return; // Tunggu sampai status login dicek

    const inAuthGroup = segments[0] === '(auth)';

    if (!currentUser && !inAuthGroup) {
      // Kalau BELUM login dan tidak sedang di halaman login -> Lempar ke Login
      router.replace('/(auth)/login');
    } else if (currentUser && inAuthGroup) {
      // Kalau SUDAH login tapi masih di halaman login -> Lempar ke Home
      router.replace('/(tabs)');
    }
  }, [currentUser, loading, segments]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="landing" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
        </Stack>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

export default function RootNavigator() {
  return (
    <AuthProvider>
      <InnerNavigator />
    </AuthProvider>
  );
}
