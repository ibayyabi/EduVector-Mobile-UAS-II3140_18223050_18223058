import React, { useState, useCallback } from 'react';
import { View, StyleSheet, LayoutChangeEvent, TouchableOpacity, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Spacing, FontSizes } from '@/constants/theme';
import Card from '@/components/Card';
import GridBackground from '@/components/GridBackground';
import { useProjectileMotion } from '@/hooks/useProjectileMotion';
import { ProyektorCanvas } from '@/components/simulation/ProyektorCanvas';
import { SimulationHeader } from '@/components/simulation/SimulationHeader';
import { CopilotStep, CopilotProvider, walkthroughable, useCopilot } from 'react-native-copilot';
import ContentContainer from '@/components/ContentContainer';

// Create walkthroughable wrapper for CopilotStep
const CopilotView = walkthroughable(View);

function ProyektorScreenContent() {
  const [canvasSize, setCanvasSize] = useState({ width: 300, height: 400 });
  const [vectorInfo, setVectorInfo] = useState({ x: 0, y: 0, mag: 0, angle: 0 });
  
  const {
    projectile,
    trails,
    launchProjectile,
    reset
  } = useProjectileMotion({
    canvasWidth: canvasSize.width,
    canvasHeight: canvasSize.height
  });

  const onLayout = useCallback((e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;
    setCanvasSize({ width, height });
  }, []);

  const handleDrag = useCallback((info: { x: number, y: number, mag: number, angle: number }) => {
    setVectorInfo(info);
  }, []);

  const handleReset = useCallback(() => {
    reset();
    setVectorInfo({ x: 0, y: 0, mag: 0, angle: 0 });
  }, [reset]);

  return (
    <GridBackground>
      <SafeAreaView style={styles.container} edges={['top']}>
        <SimulationHeader 
            title="Proyektor Vektor" 
            subtitle="Tarik dan lepas untuk meluncurkan" 
        />
        <ContentContainer>

          <View style={styles.canvasContainer} onLayout={onLayout}>
            {canvasSize.width > 0 && (
              <ProyektorCanvas
                width={canvasSize.width}
                height={canvasSize.height}
                projectile={projectile}
                trails={trails}
                onLaunch={launchProjectile}
                onDrag={handleDrag}
              />
            )}
          </View>

          <View style={styles.infoContainer}>
              <Card>
                  <Text style={styles.cardTitle}>Informasi Vektor</Text>
                  <Text style={styles.infoText}>V = ({vectorInfo.x}, {vectorInfo.y})</Text>
                  <Text style={styles.infoText}>||V|| = {vectorInfo.mag}</Text>
                  <Text style={styles.infoText}>θ = {vectorInfo.angle}°</Text>
                  
                  <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
                      <Text style={styles.resetButtonText}>Reset</Text>
                  </TouchableOpacity>
              </Card>
          </View>
        </ContentContainer>
      </SafeAreaView>
    </GridBackground>
  );
}

export default function ProyektorScreen() {
  return (
    <CopilotProvider stopOnOutsideClick androidStatusBarVisible>
      <ProyektorScreenContent />
    </CopilotProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  canvasContainer: { flex: 1, margin: Spacing.lg, borderRadius: 8, overflow: 'hidden' },
  infoContainer: { padding: Spacing.lg },
  cardTitle: { fontSize: FontSizes.lg, fontWeight: '600', color: Colors.primary, marginBottom: Spacing.md },
  infoText: { fontFamily: 'Courier', fontSize: FontSizes.base, color: Colors.textPrimary, marginBottom: 4 },
  resetButton: { marginTop: Spacing.lg, backgroundColor: Colors.error, padding: Spacing.md, borderRadius: 8, alignItems: 'center' },
  resetButtonText: { color: '#fff', fontWeight: '600', fontSize: FontSizes.base },
});
