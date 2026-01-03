import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';

interface WebLayoutProps {
  children: React.ReactNode;
}

/**
 * WebLayout component that constrains the width on web platforms
 * to prevent the app from stretching too wide on desktop browsers.
 * On mobile, it renders children without any constraints.
 */
export default function WebLayout({ children }: WebLayoutProps) {
  if (Platform.OS === 'web') {
    return (
      <View style={styles.webContainer}>
        {children}
      </View>
    );
  }

  // On mobile, just render children as-is
  return <>{children}</>;
}

const styles = StyleSheet.create({
  webContainer: {
    maxWidth: 500,
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    backgroundColor: '#ffffff',
    // Add subtle shadow for depth
    ...(Platform.OS === 'web' && {
      boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
    }),
  },
});
