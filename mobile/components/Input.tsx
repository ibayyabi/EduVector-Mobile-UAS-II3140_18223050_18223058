import { View, Text, TextInput, TextInputProps, StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';

interface InputProps extends TextInputProps {
    label?: string;
    error?: string;
}

export default function Input({ label, error, style, ...props }: InputProps) {
    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}
            <TextInput
                style={[
                    styles.input,
                    error ? styles.inputError : null,
                    style
                ]}
                placeholderTextColor="#94a3b8"
                {...props}
            />
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    label: {
        marginBottom: 8,
        fontWeight: '600',
        color: '#475569',
        fontSize: 14,
    },
    input: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#cbd5e1',
        padding: 12,
        borderRadius: 8,
        fontSize: 16,
        color: '#334155',
    },
    inputError: {
        borderColor: '#ef4444',
    },
    errorText: {
        color: '#ef4444',
        fontSize: 12,
        marginTop: 4,
    }
});
