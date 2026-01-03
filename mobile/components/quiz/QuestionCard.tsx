import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, Spacing, FontSizes, BorderRadius } from '@/constants/theme';
import type { QuizQuestion } from '@/data/quizData';

interface QuestionCardProps {
  question: QuizQuestion;
  index: number;
  userAnswer: string | undefined;
  isSubmitted: boolean;
  onAnswerChange: (option: string) => void;
}

export const QuestionCard = ({
  question,
  index,
  userAnswer,
  isSubmitted,
  onAnswerChange
}: QuestionCardProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>{index + 1}. {question.question}</Text>
      <View>
        {question.options.map(option => {
          const isSelected = userAnswer === option;
          let optionBgStyle = styles.optionDefault;
          let optionTextStyle = styles.optionTextDefault;

          if (isSubmitted) {
            if (option === question.answer) {
              optionBgStyle = styles.optionCorrect;
              optionTextStyle = styles.optionTextCorrect;
            } else if (isSelected) {
              optionBgStyle = styles.optionWrong;
              optionTextStyle = styles.optionTextWrong;
            }
          } else if (isSelected) {
            optionBgStyle = styles.optionSelected;
            optionTextStyle = styles.optionTextSelected;
          }

          return (
            <TouchableOpacity
              key={option}
              style={[styles.optionButton, optionBgStyle]}
              onPress={() => onAnswerChange(option)}
              disabled={isSubmitted}
            >
              <Text style={optionTextStyle}>{option}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: Spacing.md,
    borderRadius: BorderRadius.xl,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  questionText: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  optionButton: {
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.xs,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  optionDefault: {
    backgroundColor: Colors.background,
  },
  optionSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  optionCorrect: {
    backgroundColor: '#dcfce7', // green-100
    borderColor: '#22c55e',    // green-500
  },
  optionWrong: {
    backgroundColor: '#fee2e2', // red-100
    borderColor: '#ef4444',    // red-500
  },
  optionTextDefault: {
    color: Colors.textPrimary,
  },
  optionTextSelected: {
    color: 'white',
    fontWeight: 'bold',
  },
  optionTextCorrect: {
    color: '#166534', // green-800
    fontWeight: 'bold',
  },
  optionTextWrong: {
    color: '#991b1b', // red-800
  },
});
