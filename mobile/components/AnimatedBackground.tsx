import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';

// Only import VectorField on native platforms (it uses Skia which doesn't work on web)
const VectorField = Platform.OS !== 'web' ? require('@/components/simulation/VectorField').default : null;

export default function AnimatedBackground() {
    // Don't render on web since VectorField uses Skia
    if (Platform.OS === 'web' || !VectorField) {
        return null;
    }
    
    return (
        <View style={StyleSheet.absoluteFill} pointerEvents="none">
            <VectorField />
        </View>
    );
}
