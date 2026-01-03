import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';
import { db } from '@/firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { MATERI_LIST } from '@/assets/data/materiData';

export function useUserStats() {
  const { currentUser } = useAuth();
  const [passedQuizzes, setPassedQuizzes] = useState(0);
  const [completedMaterials, setCompletedMaterials] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchStats = useCallback(async () => {
    if (!currentUser) {
      setPassedQuizzes(0);
      setCompletedMaterials(0);
      setLoading(false);
      return;
    }

    try {
      // 1. Fetch Quiz Stats (Score > 70)
      // Note: This matches simple count. For unique quizzes passed, logic needs to be robust, 
      // but for now, passing 'a quiz' is counted.
      const quizQuery = query(
        collection(db, 'quiz_attempts'),
        where('userId', '==', currentUser.uid),
        where('score', '>=', 70)
      );
      const quizSnapshot = await getDocs(quizQuery);
      setPassedQuizzes(quizSnapshot.size);

      // 2. Fetch Material Stats
      const materialQuery = query(
        collection(db, 'material_completion'),
        where('userId', '==', currentUser.uid)
      );
      const materialSnapshot = await getDocs(materialQuery);
      setCompletedMaterials(materialSnapshot.size);

    } catch (error) {
      console.error('Error fetching user stats:', error);
    } finally {
      setLoading(false);
    }
  }, [currentUser]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  // Expose refresh function so UI can update after actions
  return {
    passedQuizzes,
    completedMaterials,
    totalMaterials: MATERI_LIST.length,
    loading,
    refreshStats: fetchStats
  };
}
