import { View, Text, ScrollView, StyleSheet, Image, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Colors, Spacing, FontSizes, BorderRadius } from '@/constants/theme';
import { Shadows } from '@/constants/shadows';
import NavCard from '@/components/NavCard';
import StatCard from '@/components/StatCard';
import { CopilotStep, CopilotProvider, walkthroughable, useCopilot } from 'react-native-copilot';
import { TouchableOpacity } from 'react-native';

// Create a walkthroughable wrapper for CopilotStep
const CopilotView = walkthroughable(View);

import GridBackground from '@/components/GridBackground';
import ContentContainer from '@/components/ContentContainer';


import { useUserStats } from '@/hooks/useUserStats';
import { useFocusEffect } from 'expo-router';
import { useCallback } from 'react';

function HomeScreenContent() {
  const { currentUser } = useAuth();
  const router = useRouter();
  const { start } = useCopilot();
  const { passedQuizzes, completedMaterials, totalMaterials, loading, refreshStats } = useUserStats();

  // Refresh stats whenever screen comes into focus
  useFocusEffect(
    useCallback(() => {
      refreshStats();
    }, [refreshStats])
  );

  return (
    <GridBackground animated>
      <SafeAreaView style={styles.container}>
        <ContentContainer>
          <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Hero Section */}
          <View style={styles.hero}>
            <View style={styles.headerRow}>
               <Image 
                source={require('@/assets/logo.png')} 
                style={styles.logo} 
                resizeMode="contain"
              />
              <TouchableOpacity onPress={() => {
                 console.log('Help button pressed, starting copilot...');
                 start();
               }} style={styles.helpButton}>
                <FontAwesome name="question-circle" size={24} color={Colors.primary} />
              </TouchableOpacity>
            </View>
            <Text style={styles.heroTitle}>Selamat Datang di EduVector</Text>
            <Text style={styles.heroSubtitle}>
              Platform pembelajaran vektor interaktif
            </Text>
            
            <View style={styles.userGreeting}>
              <FontAwesome name="user-circle" size={16} color={Colors.primary} style={{ marginRight: 6 }} />
              <Text style={styles.userEmail}>{currentUser?.email}</Text>
            </View>
          </View>

          {/* Stats Row */}
          <View style={styles.statsRow}>
            <StatCard 
              icon="check-circle" 
              label="Materi Selesai" 
              value={`${completedMaterials}/${totalMaterials}`} 
              color={Colors.success}
            />
            <StatCard 
              icon="trophy" 
              label="Kuis Lulus" 
              value={passedQuizzes.toString()} 
              color={Colors.warning}
            />
          </View>

          <Text style={styles.sectionTitle}>Menu Utama</Text>

          {/* Navigation Grid */}
          <View style={styles.navGrid}>
            <CopilotStep text="Mulai belajar di sini! Pelajari teori vektor dari dasar." order={1} name="materi">
              <CopilotView>
                <NavCard
                  icon="book"
                  title="Materi Vektor"
                  desc="Pelajari teori dari dasar"
                  route="/(tabs)/materi"
                  color={Colors.primary}
                />
              </CopilotView>
            </CopilotStep>

            <CopilotStep text="Coba simulasi interaktif untuk memvisualisasikan vektor." order={2} name="simulasi">
              <CopilotView>
                <NavCard
                  icon="cube"
                  title="Simulasi"
                  desc="Fitur Interaktif dari vektor"
                  route="/(tabs)/simulasi"
                  color="#8b5cf6"
                />
              </CopilotView>
            </CopilotStep>

            <CopilotStep text="Uji pemahaman Anda dengan kuis." order={3} name="kuis">
              <CopilotView>
                <NavCard
                  icon="question-circle"
                  title="Kuis"
                  desc="Uji pemahaman Anda"
                  route="/(tabs)/kuis"
                  color={Colors.accent}
                />
              </CopilotView>
            </CopilotStep>
          </View>
          
          <View style={{ height: 20 }} />
        </ScrollView>
        </ContentContainer>
      </SafeAreaView>
    </GridBackground>
  );
}

export default function HomeScreen() {
  return (
    <CopilotProvider stopOnOutsideClick androidStatusBarVisible>
      <HomeScreenContent />
    </CopilotProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // Background handled by GridBackground
  },
  scrollContent: {
    padding: Spacing.lg,
  },
  hero: {
    alignItems: 'center',
    marginBottom: Spacing['2xl'],
    marginTop: Spacing.md,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    position: 'relative',
    marginBottom: 0,
  },
  helpButton: {
    position: 'absolute',
    right: 0,
    top: 10,
    padding: 10,
  },
  logo: {
    width: 150,
    height: 120,
    marginBottom: 0,
  },
  heroTitle: {
    fontSize: FontSizes['2xl'],
    fontWeight: 'bold',
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: Spacing.xs,
  },
  heroSubtitle: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },
  userGreeting: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.backgroundCard,
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  userEmail: {
    fontSize: FontSizes.xs,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  statsRow: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginBottom: Spacing['2xl'],
  },
  sectionTitle: {
    fontSize: FontSizes.lg,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },
  navGrid: {
    gap: Spacing.sm,
  },
});
