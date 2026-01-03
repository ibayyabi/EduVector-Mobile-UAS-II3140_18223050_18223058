import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { type RGB, toHex } from '@/utils/vectorMath';
import { Colors, Spacing, FontSizes, BorderRadius } from '@/constants/theme';
import Card from '@/components/Card';

interface ResultCardProps {
  color: RGB;
}

export const ResultCard = ({ color }: ResultCardProps) => {
  const hexColor = toHex(color);
  
  return (
    <Card>
      <Text style={styles.cardTitle}>Hasil</Text>
      <View style={[styles.colorPreview, { backgroundColor: hexColor }]} />
      <Text style={styles.resultText}>
        R={color.r} G={color.g} B={color.b}
      </Text>
      <Text style={styles.hexText}>{hexColor}</Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  cardTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: Colors.primary,
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  colorPreview: {
    width: '100%',
    height: 60,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.sm,
  },
  resultText: {
    fontFamily: 'RobotoMono_400Regular',
    fontSize: FontSizes.sm,
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  hexText: {
    fontFamily: 'RobotoMono_700Bold',
    fontSize: FontSizes.lg,
    color: Colors.primary,
    textAlign: 'center',
    marginTop: 4,
  },
});
