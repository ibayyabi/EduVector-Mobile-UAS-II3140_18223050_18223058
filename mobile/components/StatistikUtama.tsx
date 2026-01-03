import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import StatCard from './StatCard';
import { QuizAttempt } from '@/services/firestoreService';

interface StatistikUtamaProps {
  attempts: QuizAttempt[];
}

/**
 * Komponen untuk menampilkan statistik utama dari riwayat pengerjaan kuis.
 * Menampilkan skor tertinggi, rata-rata skor, dan jumlah pengerjaan.
 */
export default function StatistikUtama({ attempts }: StatistikUtamaProps) {
  if (!attempts || attempts.length === 0) {
    return null;
  }

  // Hitung skor tertinggi
  const highScore = Math.max(...attempts.map(a => a.score));
  
  // Hitung rata-rata skor
  const averageScore = attempts.reduce((sum, a) => sum + a.score, 0) / attempts.length;
  
  // Hitung jumlah pengerjaan
  const attemptCount = attempts.length;

  return (
    <View className="mb-6">
      <Text className="text-lg font-bold text-font mb-3">Statistik Anda</Text>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 12 }}
      >
        <View style={{ width: 180 }}>
          <StatCard
            icon="trophy"
            label="Skor Tertinggi"
            value={`${highScore.toFixed(1)}%`}
            color="#FFD700"
          />
        </View>
        <View style={{ width: 180 }}>
          <StatCard
            icon="line-chart"
            label="Rata-rata Skor"
            value={`${averageScore.toFixed(1)}%`}
            color="#4CAF50"
          />
        </View>
        <View style={{ width: 180 }}>
          <StatCard
            icon="check-circle"
            label="Jumlah Pengerjaan"
            value={attemptCount.toString()}
            color="#2196F3"
          />
        </View>
      </ScrollView>
    </View>
  );
}
