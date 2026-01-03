import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, FontSizes, BorderRadius } from '@/constants/theme';

interface TabButtonProps {
  title: string;
  isActive: boolean;
  onPress: () => void;
}

export const TabButton = ({ title, isActive, onPress }: TabButtonProps) => (
  <TouchableOpacity 
    onPress={onPress} 
    style={[
      styles.tabButton, 
      isActive && styles.tabButtonActive
    ]}
  >
    <Text style={[
      styles.tabText, 
      isActive && styles.tabTextActive
    ]}>
      {title}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
  },
  tabButtonActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  tabText: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  tabTextActive: {
    color: 'white',
  },
});
