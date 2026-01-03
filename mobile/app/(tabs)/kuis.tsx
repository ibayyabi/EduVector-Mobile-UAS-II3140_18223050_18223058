import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import GridBackground from '@/components/GridBackground';
import StatistikUtama from '@/components/StatistikUtama';
import { Colors, Spacing, FontSizes } from '@/constants/theme';
import { useQuiz } from '@/hooks/useQuiz';
import { QuestionCard } from '@/components/quiz/QuestionCard';
import { QuizResult } from '@/components/quiz/QuizResult';
import ContentContainer from '@/components/ContentContainer';

export default function KuisScreen() {
    const {
        questions,
        answers,
        score,
        isSubmitted,
        isSaving,
        attempts,
        currentUser,
        handleAnswerChange,
        handleSubmit,
        startQuiz
    } = useQuiz();

    return (
        <GridBackground>
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{
                    padding: Spacing.lg,
                    backgroundColor: Colors.backgroundCard,
                    borderBottomWidth: 1,
                    borderBottomColor: Colors.border,
                }}>
                    <Text style={{
                        fontSize: FontSizes['2xl'],
                        fontWeight: 'bold',
                        color: Colors.textPrimary,
                        marginBottom: 4,
                    }}>Kuis Pemahaman Vektor</Text>
                    <Text style={{
                        fontSize: FontSizes.sm,
                        color: Colors.textSecondary,
                    }}>
                        Uji kemampuan Anda dalam menyelesaikan soal vektor
                    </Text>
                </View>

                <ContentContainer>
                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: Spacing.lg, paddingBottom: 20 }}>
                    {currentUser && <StatistikUtama attempts={attempts} />}

                    {isSubmitted && score !== null && (
                        <QuizResult 
                            score={score} 
                            totalQuestions={questions.length} 
                            onRetry={startQuiz} 
                        />
                    )}

                    {questions.map((q, index) => (
                        <QuestionCard
                            key={index}
                            question={q}
                            index={index}
                            userAnswer={answers[index]}
                            isSubmitted={isSubmitted}
                            onAnswerChange={(option) => handleAnswerChange(index, option)}
                        />
                    ))}

                    {!isSubmitted && (
                        <TouchableOpacity
                            style={{
                                padding: Spacing.md,
                                borderRadius: 12, // User rounded-xl in original, roughly 12
                                marginTop: Spacing.md,
                                backgroundColor: Object.keys(answers).length === questions.length ? Colors.primary : '#d1d5db',
                            }}
                            onPress={handleSubmit}
                            disabled={Object.keys(answers).length !== questions.length || isSaving}
                        >
                            {isSaving ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold', fontSize: FontSizes.lg }}>
                                    Kumpulkan Jawaban
                                </Text>
                            )}
                        </TouchableOpacity>
                    )}
                    </ScrollView>
                </ContentContainer>
            </SafeAreaView>
        </GridBackground>
    );
}
