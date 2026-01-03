import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';

interface ContentContainerProps {
  children: React.ReactNode;
  maxWidth?: number;
}

/**
 * ContentContainer component that constrains the width of content
 * on web platforms to prevent UI elements from stretching edge-to-edge.
 * On mobile, it renders children without constraints.
 */
export default function ContentContainer({ 
  children, 
  maxWidth = 900 
}: ContentContainerProps) {
  return (
    <View style={[styles.container, Platform.OS === 'web' && { maxWidth }]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignSelf: 'center',
  },
});
