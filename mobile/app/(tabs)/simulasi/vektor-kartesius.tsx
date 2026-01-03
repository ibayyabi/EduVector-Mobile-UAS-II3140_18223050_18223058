import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, LayoutChangeEvent, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { GestureDetector } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useVectorGesture } from '@/hooks/useVectorGesture';
import { VectorInfoDisplay, ManualInput } from '@/components/simulation/VectorInputs';
import Card from '@/components/Card';
import { SimulationHeader } from '@/components/simulation/SimulationHeader';
import { CopilotStep, CopilotProvider, walkthroughable, useCopilot } from 'react-native-copilot';
import ContentContainer from '@/components/ContentContainer';
// Platform-specific canvas imports
// SimulasiCanvas (Skia) is only loaded on native platforms to avoid web initialization issues
import SimulasiCanvasSvg from '@/components/simulation/SimulasiCanvasSvg';
const SimulasiCanvas = Platform.OS !== 'web' ? require('@/components/simulation/SimulasiCanvas').default : null;

// Create walkthroughable wrapper for CopilotStep
const CopilotView = walkthroughable(View);


function SimulasiScreenContent() {
    const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
    
    // State to track vector values for display
    const [vecAState, setVecAState] = useState({ x: 50, y: 100 });
    const [vecBState, setVecBState] = useState({ x: 150, y: -50 });

    // Callback when vectors change (from drag or manual input)
    const handleVectorChange = useCallback((a: {x: number, y: number}, b: {x: number, y: number}) => {
        setVecAState(a);
        setVecBState(b);
    }, []);

    const { gesture, vecA, vecB, resultant, centerX, centerY, setVecA, setVecB } = useVectorGesture({ 
        canvasSize, 
        onVectorChange: handleVectorChange 
    });

    const onLayout = (event: LayoutChangeEvent) => {
        const { width, height } = event.nativeEvent.layout;
        setCanvasSize({ width, height });
    };

    return (
        <SafeAreaView style={styles.container}>
            <SimulationHeader 
                title="Lab Virtual Vektor" 
                subtitle="Geser ujung vektor untuk mengubah besar dan arah." 
            />
            <ContentContainer>

            <View style={styles.canvasContainer} onLayout={onLayout}>
                {canvasSize.width > 0 && (
                    <GestureDetector gesture={gesture}>
                        <View style={{ flex: 1 }}>
                            {Platform.OS === 'web' ? (
                                <SimulasiCanvasSvg
                                    width={canvasSize.width}
                                    height={canvasSize.height}
                                    centerX={centerX}
                                    centerY={centerY}
                                    vecA={vecA}
                                    vecB={vecB}
                                    resultant={resultant}
                                />
                            ) : (
                                <SimulasiCanvas
                                    width={canvasSize.width}
                                    height={canvasSize.height}
                                    centerX={centerX}
                                    centerY={centerY}
                                    vecA={vecA}
                                    vecB={vecB}
                                    resultant={resultant}
                                />
                            )}
                        </View>
                    </GestureDetector>
                )}
            </View>

            <ScrollView style={styles.controls} contentContainerStyle={{ gap: 15 }}>
                <Card>
                    <Text style={styles.cardTitle}>Informasi Vektor</Text>
                    
                    <VectorInfoDisplay 
                        label="Vektor A" 
                        color="#ef4444"
                        x={vecAState.x} 
                        y={vecAState.y} 
                    />
                    <VectorInfoDisplay 
                        label="Vektor B" 
                        color="#3b82f6"
                        x={vecBState.x} 
                        y={vecBState.y} 
                    />
                    <VectorInfoDisplay 
                        label="Resultant R" 
                        color="#10b981"
                        x={vecAState.x + vecBState.x} 
                        y={vecAState.y + vecBState.y} 
                    />
                </Card>
                
                <Card>
                    <Text style={styles.cardTitle}>Kontrol Manual</Text>
                    <ManualInput 
                        label="Vektor A" 
                        x={vecAState.x} 
                        y={vecAState.y}
                        onUpdate={(x, y) => setVecA(x, y)} 
                    />
                    <ManualInput 
                        label="Vektor B" 
                        x={vecBState.x} 
                        y={vecBState.y}
                        onUpdate={(x, y) => setVecB(x, y)} 
                    />
                    <TouchableOpacity 
                        style={styles.resetButton}
                        onPress={() => {
                            setVecA(50, 100);
                            setVecB(150, -50);
                        }}
                    >
                        <Text style={styles.resetButtonText}>Reset</Text>
                    </TouchableOpacity>
                </Card>
            </ScrollView>
            </ContentContainer>
        </SafeAreaView>
    );
}

export default function SimulasiScreen() {
    return (
        <CopilotProvider stopOnOutsideClick androidStatusBarVisible>
            <SimulasiScreenContent />
        </CopilotProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8fafc',
    },
    canvasContainer: {
        height: 350, // Fixed height for simulation area
        backgroundColor: '#fff',
        margin: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#e2e8f0',
        overflow: 'hidden',
    },
    controls: {
        flex: 1,
        paddingHorizontal: 16,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 10,
    },
    resetButton: {
        marginTop: 16,
        backgroundColor: '#ef4444',
        padding: 14,
        borderRadius: 8,
        alignItems: 'center',
    },
    resetButtonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    },
});
