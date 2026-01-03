import { TouchableOpacity, Text, ActivityIndicator, StyleSheet, TouchableOpacityProps, View } from 'react-native';
import Colors from '@/constants/Colors';

interface ButtonProps extends TouchableOpacityProps {
    title: string;
    variant?: 'primary' | 'outline' | 'ghost' | 'google';
    loading?: boolean;
    icon?: React.ReactNode;
}

export default function Button({ title, variant = 'primary', loading, icon, style, ...props }: ButtonProps) {
    const getBackgroundColor = () => {
        if (props.disabled) return '#94a3b8';
        switch (variant) {
            case 'primary': return Colors.light.primary;
            case 'outline': return 'transparent';
            case 'ghost': return 'transparent';
            case 'google': return '#fff';
            default: return Colors.light.primary;
        }
    };

    const getTextColor = () => {
        if (props.disabled) return '#fff';
        switch (variant) {
            case 'primary': return '#fff';
            case 'outline': return Colors.light.primary;
            case 'ghost': return Colors.light.primary;
            case 'google': return '#212529';
            default: return '#fff';
        }
    };

    const getBorderColor = () => {
        if (variant === 'google') return '#dee2e6';
        if (variant === 'outline') return Colors.light.primary;
        return 'transparent';
    };

    return (
        <TouchableOpacity
            style={[
                styles.button,
                { backgroundColor: getBackgroundColor(), borderColor: getBorderColor(), borderWidth: variant === 'outline' || variant === 'google' ? 1 : 0 },
                style
            ]}
            activeOpacity={0.8}
            disabled={loading || props.disabled}
            {...props}
        >
            {loading ? (
                <ActivityIndicator color={getTextColor()} />
            ) : (
                <>
                    {icon && <View style={{ marginRight: 10 }}>{icon}</View>}
                    <Text style={[styles.text, { color: getTextColor(), fontWeight: variant === 'ghost' ? '500' : '600' }]}>
                        {title}
                    </Text>
                </>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 16,
        textAlign: 'center',
    }
});
