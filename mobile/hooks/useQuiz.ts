import { useState, useEffect, useCallback } from 'react';
import { Alert } from 'react-native';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/firebaseConfig';
import { useAuth } from '@/context/AuthContext';
import { questionBank, getShuffledQuestions, type QuizQuestion } from '@/data/quizData';
import { getQuizAttemptsByUserId, type QuizAttempt } from '@/services/firestoreService';

export const useQuiz = () => {
    const { currentUser } = useAuth();
    const [questions, setQuestions] = useState<QuizQuestion[]>([]);
    const [answers, setAnswers] = useState<{ [key: number]: string }>({});
    const [score, setScore] = useState<number | null>(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [attempts, setAttempts] = useState<QuizAttempt[]>([]);

    const fetchAttempts = useCallback(async () => {
        if (!currentUser) return;
        try {
            const fetchedAttempts = await getQuizAttemptsByUserId(currentUser.uid);
            setAttempts(fetchedAttempts);
        } catch (error) {
            console.error('Error fetching quiz attempts:', error);
        }
    }, [currentUser]);

    const startQuiz = useCallback(() => {
        setQuestions(getShuffledQuestions(questionBank, 5));
        setAnswers({});
        setScore(null);
        setIsSubmitted(false);
        setIsSaving(false);
    }, []);

    useEffect(() => {
        startQuiz();
        fetchAttempts();
    }, [startQuiz, fetchAttempts]);

    const handleAnswerChange = useCallback((qIndex: number, option: string) => {
        if (isSubmitted) return;
        setAnswers(prev => ({ ...prev, [qIndex]: option }));
    }, [isSubmitted]);

    const handleSubmit = useCallback(async () => {
        let correctAnswers = 0;
        questions.forEach((q, index) => {
            if (answers[index] === q.answer) {
                correctAnswers++;
            }
        });

        const finalScore = (correctAnswers / questions.length) * 100;
        setScore(correctAnswers);
        setIsSubmitted(true);

        if (currentUser) {
            setIsSaving(true);
            try {
                await addDoc(collection(db, 'quiz_attempts'), {
                    userId: currentUser.uid,
                    quizId: 'vektor_dasar_1',
                    score: finalScore,
                    correctAnswers: correctAnswers,
                    totalQuestions: questions.length,
                    timestamp: serverTimestamp()
                });
                // Refresh attempts after saving
                await fetchAttempts();
                Alert.alert("Hasil Disimpan", `Skor Anda: ${correctAnswers} dari ${questions.length}`);
            } catch (error) {
                console.error("Error saving quiz attempt: ", error);
                Alert.alert("Eror", "Gagal menyimpan hasil kuis.");
            } finally {
                setIsSaving(false);
            }
        }
    }, [questions, answers, currentUser, fetchAttempts]);

    return {
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
    };
};
