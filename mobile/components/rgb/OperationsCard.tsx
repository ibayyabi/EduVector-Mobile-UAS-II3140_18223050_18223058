import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import { Colors, Spacing, FontSizes, BorderRadius } from '@/constants/theme';
import Card from '@/components/Card';

interface OperationsCardProps {
  scalar: number;
  interpolation: number;
  onAdd: () => void;
  onSubtract: () => void;
  onScale: () => void;
  onInterpolate: () => void;
  onScalarChange: (value: number) => void;
  onInterpolationChange: (value: number) => void;
}

export const OperationsCard = ({
  scalar,
  interpolation,
  onAdd,
  onSubtract,
  onScale,
  onInterpolate,
  onScalarChange,
  onInterpolationChange,
}: OperationsCardProps) => {
  return (
    <Card>
      <Text style={styles.title}>Operasi Vektor</Text>

      {/* Basic Operations */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Operasi Dasar</Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={[styles.button, styles.addButton]} onPress={onAdd}>
            <Text style={styles.buttonText}>A + B</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.subtractButton]} onPress={onSubtract}>
            <Text style={styles.buttonText}>A - B</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Scalar Multiplication */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Perkalian Skalar</Text>
        <View style={styles.sliderContainer}>
          <View style={styles.sliderHeader}>
            <Text style={styles.label}>Skalar:</Text>
            <Text style={styles.value}>{scalar.toFixed(2)}</Text>
          </View>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={2}
            step={0.1}
            value={scalar}
            onValueChange={onScalarChange}
            minimumTrackTintColor={Colors.primary}
            maximumTrackTintColor="#cbd5e1"
            thumbTintColor={Colors.primary}
          />
        </View>
        <TouchableOpacity style={[styles.button, styles.scaleButton]} onPress={onScale}>
          <Text style={styles.buttonText}>A × {scalar.toFixed(1)}</Text>
        </TouchableOpacity>
      </View>

      {/* Interpolation */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Interpolasi</Text>
        <View style={styles.sliderContainer}>
          <View style={styles.sliderHeader}>
            <Text style={styles.label}>t:</Text>
            <Text style={styles.value}>{interpolation.toFixed(2)}</Text>
          </View>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={1}
            step={0.01}
            value={interpolation}
            onValueChange={onInterpolationChange}
            minimumTrackTintColor={Colors.primary}
            maximumTrackTintColor="#cbd5e1"
            thumbTintColor={Colors.primary}
          />
        </View>
        <Text style={styles.formula}>
          (1-t)×A + t×B
        </Text>
        <TouchableOpacity style={[styles.button, styles.interpolateButton]} onPress={onInterpolate}>
          <Text style={styles.buttonText}>Interpolasi</Text>
        </TouchableOpacity>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: Colors.primary,
    marginBottom: Spacing.lg,
  },
  section: {
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontSize: FontSizes.base,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  button: {
    flex: 1,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButton: {
    backgroundColor: Colors.success,
  },
  subtractButton: {
    backgroundColor: Colors.error,
  },
  scaleButton: {
    backgroundColor: Colors.primary,
  },
  interpolateButton: {
    backgroundColor: Colors.warning,
  },
  buttonText: {
    color: '#fff',
    fontSize: FontSizes.base,
    fontWeight: '600',
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
    fontWeight: '500',
    color: Colors.textSecondary,
  },
  value: {
    fontFamily: 'Courier',
    fontSize: FontSizes.base,
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  formula: {
    fontFamily: 'Courier',
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
});
