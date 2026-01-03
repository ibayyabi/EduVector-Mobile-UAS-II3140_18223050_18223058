import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Link, useRouter } from 'expo-router';
import AnimatedBackground from '@/components/AnimatedBackground';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LandingScreen() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <AnimatedBackground />
            <SafeAreaView style={styles.contentContainer}>
                <View style={styles.card}>
                    <Image 
                        source={require('@/assets/logo.png')}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                    <Text style={styles.title}>Selamat Datang di EduVector</Text>
                    <Text style={styles.description}>
                        Platform pembelajaran vektor interaktif Anda. Pelajari teori, visualisasikan konsep, dan uji pemahaman Anda, semuanya di satu tempat.
                    </Text>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => router.push('/(auth)/login')}
                    >
                        <Text style={styles.buttonText}>Mulai Sekarang</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    card: {
        backgroundColor: 'white',
        padding: 30,
        borderRadius: 8,
        width: '100%',
        maxWidth: 400,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    logo: {
        width: 700,
        height: 700,
        marginBottom: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#004aaa', // primary-dark
        marginBottom: 20,
        textAlign: 'center',
    },
    description: {
        fontSize: 16,
        color: '#212529',
        textAlign: 'center',
        marginBottom: 30,
        lineHeight: 24,
    },
    button: {
        backgroundColor: '#3b82f6',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 5,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
    },
});
