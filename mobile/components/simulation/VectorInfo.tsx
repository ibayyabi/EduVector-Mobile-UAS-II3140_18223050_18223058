import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SharedValue, useDerivedValue } from 'react-native-reanimated';

interface VectorInfoProps {
    vec: SharedValue<{ x: number, y: number }>;
    label: string;
    color: string;
}

// Helper to calculate magnitude and angle
const calculateVectorInfo = (x: number, y: number) => {
    'worklet';
    const magnitude = Math.sqrt(x * x + y * y);
    const angle = Math.atan2(y, x) * (180 / Math.PI);
    return {
        x: x.toFixed(1),
        y: y.toFixed(1),
        magnitude: magnitude.toFixed(1),
        angle: angle.toFixed(1)
    };
};

export const VectorInfo = ({ vec, label, color }: VectorInfoProps) => {
    // For now, we'll use a simple approach - just display static info
    // Real-time updates would require re-render or ReText from react-native-redash
    
    return (
        <View style={styles.container}>
            <Text style={[styles.label, { color }]}>{label}:</Text>
            <Text style={styles.value}>
                Drag vector endpoint to update
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#f1f5f9',
    },
    label: {
        fontWeight: '600',
    },
    value: {
        fontFamily: 'Courier',
        color: '#334155',
    }
});
