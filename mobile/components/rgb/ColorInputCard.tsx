import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import { Colors, Spacing, FontSizes, BorderRadius } from '@/constants/theme';
import Card from '@/components/Card';
import type { RGB } from '@/utils/vectorMath';
import { toHex } from '@/utils/vectorMath';

interface ColorInputCardProps {
  label: string;
  color: RGB;
  onColorChange: (color: RGB) => void;
}

export const ColorInputCard = ({ label, color, onColorChange }: ColorInputCardProps) => {
  const hexColor = toHex(color);

  const handleRChange = (value: number) => {
    onColorChange({ ...color, r: Math.round(value) });
  };

  const handleGChange = (value: number) => {
    onColorChange({ ...color, g: Math.round(value) });
  };

  const handleBChange = (value: number) => {
    onColorChange({ ...color, b: Math.round(value) });
  };

  return (
    <Card>
      <Text style={styles.title}>{label}</Text>
      
      {/* Color Preview */}
      <View style={[styles.preview, { backgroundColor: hexColor }]} />
      
      {/* RGB Values Display */}
      <View style={styles.valuesContainer}>
        <Text style={styles.hexText}>{hexColor}</Text>
        <Text style={styles.rgbText}>R={color.r} G={color.g} B={color.b}</Text>
      </View>

      {/* R Slider */}
      <View style={styles.sliderContainer}>
        <View style={styles.sliderHeader}>
          <Text style={[styles.label, { color: '#ef4444' }]}>R</Text>
          <Text style={styles.value}>{color.r}</Text>
        </View>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={255}
          step={1}
          value={color.r}
          onValueChange={handleRChange}
          minimumTrackTintColor="#ef4444"
          maximumTrackTintColor="#cbd5e1"
          thumbTintColor="#ef4444"
        />
      </View>

      {/* G Slider */}
      <View style={styles.sliderContainer}>
        <View style={styles.sliderHeader}>
          <Text style={[styles.label, { color: '#10b981' }]}>G</Text>
          <Text style={styles.value}>{color.g}</Text>
        </View>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={255}
          step={1}
          value={color.g}
          onValueChange={handleGChange}
          minimumTrackTintColor="#10b981"
          maximumTrackTintColor="#cbd5e1"
          thumbTintColor="#10b981"
        />
      </View>

      {/* B Slider */}
      <View style={styles.sliderContainer}>
        <View style={styles.sliderHeader}>
          <Text style={[styles.label, { color: '#3b82f6' }]}>B</Text>
          <Text style={styles.value}>{color.b}</Text>
        </View>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={255}
          step={1}
          value={color.b}
          onValueChange={handleBChange}
          minimumTrackTintColor="#3b82f6"
          maximumTrackTintColor="#cbd5e1"
          thumbTintColor="#3b82f6"
        />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: Colors.primary,
    marginBottom: Spacing.md,
  },
  preview: {
    width: '100%',
    height: 80,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.md,
  },
  valuesContainer: {
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  hexText: {
    fontFamily: 'Courier',
    fontSize: FontSizes.xl,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  rgbText: {
    fontFamily: 'Courier',
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
  sliderContainer: {
    marginBottom: Spacing.md,
  },
  sliderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  label: {
    fontSize: FontSizes.base,
    fontWeight: '600',
  },
  value: {
    fontFamily: 'Courier',
    fontSize: FontSizes.base,
    color: Colors.textPrimary,
    fontWeight: '500',
  },
  slider: {
    width: '100%',
    height: 40,
  },
});
