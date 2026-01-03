import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, Spacing, FontSizes, BorderRadius } from '@/constants/theme';

interface QuizResultProps {
  score: number;
  totalQuestions: number;
  onRetry: () => void;
}

export const QuizResult = ({ score, totalQuestions, onRetry }: QuizResultProps) => {
  const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Skor Anda</Text>
      <Text style={styles.percentage}>{percentage}</Text>
      <Text style={styles.details}>({score} dari {totalQuestions} benar)</Text>
      <TouchableOpacity onPress={onRetry} style={styles.button}>
        <Text style={styles.buttonText}>Coba Lagi</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: Spacing.lg,
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.lg,
    alignItems: 'center',
  },
  title: {
    fontSize: FontSizes.xl,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  percentage: {
    fontSize: 48, // 4xl
    fontWeight: 'bold',
    color: Colors.warning, // Using accent color for score
    marginVertical: Spacing.xs,
  },
  details: {
    fontSize: FontSizes.base,
    color: Colors.textSecondary,
    marginBottom: Spacing.md,
  },
  button: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.xs + 4,
    borderRadius: BorderRadius.lg,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: FontSizes.base,
  },
});
