import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Colors, Spacing, FontSizes } from '@/constants/theme';
import GridBackground from '@/components/GridBackground';
import SimulationCard from '@/components/SimulationCard';
import { CopilotStep, CopilotProvider, walkthroughable, useCopilot } from 'react-native-copilot';
import { TouchableOpacity } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

// Create walkthroughable wrapper for CopilotStep
const CopilotView = walkthroughable(View);
import ContentContainer from '@/components/ContentContainer';


function SimulasiIndexScreenContent() {
  const router = useRouter();
  const { start } = useCopilot();

  return (
    <GridBackground>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={styles.title}>Simulasi Interaktif</Text>
            <Text style={styles.subtitle}>
              Pilih jenis simulasi yang ingin Anda coba
            </Text>
          </View>
          <TouchableOpacity onPress={() => {
            console.log('Help button pressed in simulasi index...');
            start();
          }} style={styles.helpButton}>
            <FontAwesome name="question-circle" size={24} color={Colors.primary} />
          </TouchableOpacity>
        </View>

        <ContentContainer>
          <ScrollView 
            style={styles.content}
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}
          >
          <CopilotStep 
            text="Visualisasi penjumlahan vektor 2D dengan drag & drop. Cocok untuk memahami konsep dasar penjumlahan vektor." 
            order={1} 
            name="vektorKartesius"
          >
            <CopilotView style={{ width: '100%' }} collapsable={false}>
              <SimulationCard
                icon="cube"
                title="Vektor Kartesius"
                description="Visualisasi penjumlahan vektor 2D dengan drag & drop"
                color="#8b5cf6"
                onPress={() => router.push('/(tabs)/simulasi/vektor-kartesius')}
              />
            </CopilotView>
          </CopilotStep>

          <CopilotStep 
            text="Eksplorasi operasi vektor dalam ruang warna RGB. Lihat bagaimana operasi vektor menghasilkan warna baru." 
            order={2} 
            name="paletRGB"
          >
            <CopilotView style={{ width: '100%' }} collapsable={false}>
              <SimulationCard
                icon="tint"
                title="Palet RGB"
                description="Eksplorasi operasi vektor dalam ruang warna RGB"
                color="#ec4899"
                onPress={() => router.push('/(tabs)/simulasi/palet-rgb')}
              />
            </CopilotView>
          </CopilotStep>

          <CopilotStep 
            text="Simulasi gerak parabola peluru dengan fisika. Tarik dan lepas untuk meluncurkan proyektil." 
            order={3} 
            name="proyektorVektor"
          >
            <CopilotView style={{ width: '100%' }} collapsable={false}>
              <SimulationCard
                icon="rocket"
                title="Proyektor Vektor"
                description="Simulasi gerak parabola peluru dengan fisika"
                color="#f59e0b"
                onPress={() => router.push('/(tabs)/simulasi/proyektor-vektor')}
              />
            </CopilotView>
          </CopilotStep>
        </ScrollView>
        </ContentContainer>
      </SafeAreaView>
    </GridBackground>
  );
}

export default function SimulasiIndexScreen() {
  return (
    <CopilotProvider stopOnOutsideClick androidStatusBarVisible>
      <SimulasiIndexScreenContent />
    </CopilotProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: Spacing.lg,
    backgroundColor: Colors.backgroundCard,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerContent: {
    flex: 1,
  },
  title: {
    fontSize: FontSizes['2xl'],
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: Spacing.lg,
  },
  helpButton: {
    padding: Spacing.sm,
  },
});
