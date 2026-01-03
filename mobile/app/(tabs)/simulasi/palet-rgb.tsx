import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Spacing, FontSizes } from '@/constants/theme';
import { ColorInputCard } from '@/components/rgb/ColorInputCard';
import { OperationsCard } from '@/components/rgb/OperationsCard';
import { ResultCard } from '@/components/rgb/ResultCard';
import { TabButton } from '@/components/rgb/TabButton';
import GridBackground from '@/components/GridBackground';
import { useRGBPalette } from '@/hooks/useRGBPalette';
import { SimulationHeader } from '@/components/simulation/SimulationHeader';
import { CopilotStep, CopilotProvider, walkthroughable, useCopilot } from 'react-native-copilot';
import ContentContainer from '@/components/ContentContainer';

// Create walkthroughable wrapper for CopilotStep
const CopilotView = walkthroughable(View);

function RGBScreenContent() {
  const {
    vectorA,
    setVectorA,
    vectorB,
    setVectorB,
    resultVector,
    scalar,
    setScalar,
    interpolation,
    setInterpolation,
    activeTab,
    setActiveTab,
    handleAdd,
    handleSubtract,
    handleScale,
    handleInterpolate
  } = useRGBPalette();

  return (
    <GridBackground>
      <SafeAreaView style={styles.container} edges={['top']}>
        <SimulationHeader title="Palet Vektor RGB" />
        <ContentContainer>

        <View style={styles.fixedContent}>
             <ResultCard color={resultVector} />
        </View>

        <View style={styles.tabContainer}>
            <TabButton 
                title="Vektor A" 
                isActive={activeTab === 'A'} 
                onPress={() => setActiveTab('A')} 
            />
            <TabButton 
                title="Vektor B" 
                isActive={activeTab === 'B'} 
                onPress={() => setActiveTab('B')} 
            />
             <TabButton 
                title="Operasi" 
                isActive={activeTab === 'OPS'} 
                onPress={() => setActiveTab('OPS')} 
            />
        </View>

        <ScrollView 
            style={styles.content} 
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}
        >
            {activeTab === 'A' && (
                <ColorInputCard 
                    label="Konfigurasi Vektor A" 
                    color={vectorA} 
                    onColorChange={setVectorA} 
                />
            )}

            {activeTab === 'B' && (
                <ColorInputCard 
                    label="Konfigurasi Vektor B" 
                    color={vectorB} 
                    onColorChange={setVectorB} 
                />
            )}

            {activeTab === 'OPS' && (
                <OperationsCard
                    scalar={scalar}
                    interpolation={interpolation}
                    onAdd={handleAdd}
                    onSubtract={handleSubtract}
                    onScale={handleScale}
                    onInterpolate={handleInterpolate}
                    onScalarChange={setScalar}
                    onInterpolationChange={setInterpolation}
                />
            )}
        </ScrollView>
        </ContentContainer>
      </SafeAreaView>
    </GridBackground>
  );
}

export default function RGBScreen() {
  return (
    <CopilotProvider stopOnOutsideClick androidStatusBarVisible>
      <RGBScreenContent />
    </CopilotProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fixedContent: {
    padding: Spacing.md,
    paddingBottom: 0,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.md,
    marginVertical: Spacing.md,
    gap: Spacing.sm,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: Spacing.md,
    paddingTop: 0,
  },
});
