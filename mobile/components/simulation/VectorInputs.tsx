import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

interface VectorInfoDisplayProps {
    label: string;
    color: string;
    x: number;
    y: number;
}

export const VectorInfoDisplay = ({ label, color, x, y }: VectorInfoDisplayProps) => {
    const magnitude = Math.sqrt(x * x + y * y).toFixed(1);
    const angle = (Math.atan2(y, x) * (180 / Math.PI)).toFixed(1);

    return (
        <View style={styles.container}>
            <Text style={[styles.label, { color }]}>{label}</Text>
            <View style={styles.infoGroup}>
                <Text style={styles.infoText}>x: {x.toFixed(1)}, y: {y.toFixed(1)}</Text>
                <Text style={styles.infoText}>|M|: {magnitude}</Text>
                <Text style={styles.infoText}>θ: {angle}°</Text>
            </View>
        </View>
    );
};

interface ManualInputProps {
    label: string;
    x: number;
    y: number;
    onUpdate: (x: number, y: number) => void;
}

export const ManualInput = ({ label, x, y, onUpdate }: ManualInputProps) => {
    const [xInput, setXInput] = React.useState(x.toString());
    const [yInput, setYInput] = React.useState(y.toString());

    const handleXSubmit = () => {
        const newX = parseFloat(xInput) || 0;
        onUpdate(newX, y);
    };

    const handleYSubmit = () => {
        const newY = parseFloat(yInput) || 0;
        onUpdate(x, newY);
    };

    // Update local state when props change (from drag)
    React.useEffect(() => {
        setXInput(x.toString());
        setYInput(y.toString());
    }, [x, y]);

    return (
        <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>{label}:</Text>
            <View style={styles.inputRow}>
                <Text style={styles.coordLabel}>x:</Text>
                <TextInput
                    style={styles.input}
                    value={xInput}
                    onChangeText={setXInput}
                    onSubmitEditing={handleXSubmit}
                    onBlur={handleXSubmit}
                    keyboardType="numeric"
                    returnKeyType="done"
                />
                <Text style={styles.coordLabel}>y:</Text>
                <TextInput
                    style={styles.input}
                    value={yInput}
                    onChangeText={setYInput}
                    onSubmitEditing={handleYSubmit}
                    onBlur={handleYSubmit}
                    keyboardType="numeric"
                    returnKeyType="done"
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f1f5f9',
    },
    label: {
        fontWeight: '600',
        fontSize: 16,
        marginBottom: 4,
    },
    infoGroup: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    infoText: {
        fontFamily: 'Courier',
        color: '#334155',
        fontSize: 14,
    },
    inputContainer: {
        marginBottom: 16,
    },
    inputLabel: {
        fontWeight: '600',
        fontSize: 14,
        marginBottom: 8,
        color: '#1e293b',
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    coordLabel: {
        fontWeight: '500',
        color: '#64748b',
        minWidth: 15,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#cbd5e1',
        borderRadius: 6,
        padding: 10,
        fontSize: 16,
        backgroundColor: '#fff',
    },
});
