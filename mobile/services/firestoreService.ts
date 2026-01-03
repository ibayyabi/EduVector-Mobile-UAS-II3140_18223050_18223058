import { db } from '@/firebaseConfig';
import { collection, query, where, orderBy, getDocs, Timestamp } from 'firebase/firestore';

export interface QuizAttempt {
  id: string;
  userId: string;
  quizId: string;
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  timestamp: Timestamp;
}

/**
 * Mengambil semua riwayat pengerjaan kuis untuk pengguna tertentu.
 * @param {string} userId - UID pengguna.
 * @returns {Promise<QuizAttempt[]>} Array berisi objek riwayat pengerjaan kuis.
 */
export const getQuizAttemptsByUserId = async (userId: string): Promise<QuizAttempt[]> => {
  if (!userId) return [];
  
  try {
    const quizAttemptsRef = collection(db, 'quiz_attempts');
    const q = query(
      quizAttemptsRef,
      where('userId', '==', userId),
      orderBy('timestamp', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as QuizAttempt));
  } catch (error) {
    console.error('Error fetching quiz attempts:', error);
    return [];
  }
};
