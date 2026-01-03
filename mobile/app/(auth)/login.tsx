import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Colors, Spacing, FontSizes, BorderRadius } from '@/constants/theme';
import { Shadows } from '@/constants/shadows';
import { LinearGradient } from 'expo-linear-gradient';
import AnimatedBackground from '@/components/AnimatedBackground';

export default function LoginScreen() {
    const { loginWithEmail, register, loading, error } = useAuth();
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegisterMode, setIsRegisterMode] = useState(false);


// Helper untuk validasi email
    const isValidEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Helper untuk mapping error Firebase ke Bahasa Indonesia yang ramah
    const getFriendlyErrorMessage = (errorCode: string) => {
        switch (errorCode) {
            case 'auth/invalid-email':
                return 'Format email tidak valid.';
            case 'auth/user-disabled':
                return 'Akun ini telah dinonaktifkan.';
            case 'auth/user-not-found':
            case 'auth/invalid-credential':
                return 'Email atau password salah.';
            case 'auth/wrong-password':
                return 'Email atau password salah.';
            case 'auth/email-already-in-use':
                return 'Email ini sudah terdaftar. Silakan login.';
            case 'auth/weak-password':
                return 'Password terlalu lemah. Gunakan minimal 6 karakter.';
            case 'auth/network-request-failed':
                return 'Koneksi internet bermasalah. Cek jaringan Anda.';
            case 'auth/too-many-requests':
                return 'Terlalu banyak percobaan gagal. Coba lagi nanti.';
            default:
                return 'Terjadi kesalahan. Silakan coba lagi.';
        }
    };

    const validateInputs = () => {
        if (!email.trim()) {
            return 'Email tidak boleh kosong.';
        }
        if (!isValidEmail(email)) {
            return 'Format email tidak valid (contoh: user@email.com).';
        }
        if (!password) {
            return 'Password tidak boleh kosong.';
        }
        if (isRegisterMode && password.length < 6) {
            return 'Password harus minimal 6 karakter.';
        }
        return null;
    };

    const handleEmailLogin = async () => {
        const validationError = validateInputs();
        if (validationError) {
             setLocalError(validationError);
             return;
        }

        setLocalError(null); // Clear local error

        try {
            if (isRegisterMode) {
                await register(email, password);
            } else {
                await loginWithEmail(email, password);
            }
        } catch (error: any) {
            console.error(error);
        }
    };

    // State lokal untuk validasi instan sebelum hit firebase
    const [localError, setLocalError] = useState<string | null>(null);

    // Gabungkan error dari context dan local
    const displayError = localError || (error ? getFriendlyErrorMessage(error) : null);




    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient
                colors={['#dbeafe', '#f8fafc']}
                style={StyleSheet.absoluteFill}
            />
            <AnimatedBackground />
            
            <KeyboardAvoidingView 
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    {/* Branding Section */}
                    <View style={styles.brandingSection}>
                        <View style={styles.logoContainer}>
                            <Image 
                                source={require('@/assets/logo.png')} 
                                style={styles.logo} 
                                resizeMode="contain"
                            />
                        </View>
                        <Text style={styles.appName}>EduVector</Text>
                        <Text style={styles.tagline}>
                            Platform Pembelajaran Vektor Interaktif
                        </Text>
                    </View>

                    {/* Login Card */}
                    <View style={styles.loginCard}>
                        <Text style={styles.welcomeText}>Selamat Datang</Text>
                        <Text style={styles.instructionText}>
                            {isRegisterMode ? 'Buat akun baru untuk memulai' : 'Masuk untuk melanjutkan petualangan belajar Anda'}
                        </Text>

                        {displayError && (
                            <View style={styles.errorContainer}>
                                <Text style={styles.errorText}>{displayError}</Text>
                            </View>
                        )}

                        {/* Email Input */}
                        <View style={styles.inputContainer}>
                            <FontAwesome name="envelope" size={16} color={Colors.textSecondary} style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Email"
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                editable={!loading}
                            />
                        </View>

                        {/* Password Input */}
                        <View style={styles.inputContainer}>
                            <FontAwesome name="lock" size={16} color={Colors.textSecondary} style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Password"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                                editable={!loading}
                            />
                        </View>

                        {/* Email Login Button */}
                        <TouchableOpacity
                            style={[styles.emailButton, (!email || !password) && styles.buttonDisabled]}
                            onPress={handleEmailLogin}
                            disabled={loading || !email || !password}
                        >
                            <Text style={styles.emailButtonText}>
                                {loading ? 'Loading...' : (isRegisterMode ? 'Daftar' : 'Masuk')}
                            </Text>
                        </TouchableOpacity>

                        {/* Toggle Register/Login */}
                        <TouchableOpacity onPress={() => setIsRegisterMode(!isRegisterMode)} disabled={loading}>
                            <Text style={styles.toggleText}>
                                {isRegisterMode ? 'Sudah punya akun? Masuk' : 'Belum punya akun? Daftar'}
                            </Text>
                        </TouchableOpacity>



                        <Text style={styles.privacyText}>
                            Dengan masuk, Anda menyetujui Syarat dan Ketentuan layanan kami.
                        </Text>
                    </View>

                    {/* Feature Highlights */}
                    <View style={styles.featuresContainer}>
                        <View style={styles.featureItem}>
                            <View style={[styles.featureIcon, { backgroundColor: '#eff6ff' }]}>
                                 <FontAwesome name="book" size={16} color={Colors.primary} />
                            </View>
                            <Text style={styles.featureText}>Materi Lengkap</Text>
                        </View>
                        <View style={styles.featureItem}>
                            <View style={[styles.featureIcon, { backgroundColor: '#f0fdf4' }]}>
                                 <FontAwesome name="cube" size={16} color={Colors.success} />
                            </View>
                            <Text style={styles.featureText}>Simulasi Interaktif</Text>
                        </View>
                        <View style={styles.featureItem}>
                            <View style={[styles.featureIcon, { backgroundColor: '#fff7ed' }]}>
                                 <FontAwesome name="trophy" size={16} color={Colors.warning} />
                            </View>
                            <Text style={styles.featureText}>Kuis & Latihan</Text>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: Spacing.xl,
    },
    brandingSection: {
        alignItems: 'center',
        marginBottom: Spacing['2xl'],
    },
    logoContainer: {
        width: 100,
        height: 100,
        marginBottom: Spacing.md,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 10,
        ...Shadows.md,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 80,
        height: 80,
    },
    appName: {
        fontSize: 32,
        // fontWeight: 'bold', // Removed to avoid conflict with RobotoMono_700Bold
        color: Colors.primaryDark,
        marginBottom: Spacing.xs,
        fontFamily: 'RobotoMono_700Bold',
    },
    tagline: {
        fontSize: FontSizes.base,
        color: Colors.textSecondary,
        textAlign: 'center',
    },
    loginCard: {
        backgroundColor: Colors.backgroundCard,
        borderRadius: BorderRadius.xl,
        padding: Spacing['2xl'],
        borderWidth: 1,
        borderColor: Colors.border,
        ...Shadows.lg,
        marginBottom: Spacing['2xl'],
    },
    welcomeText: {
        fontSize: FontSizes['2xl'],
        fontWeight: 'bold',
        color: Colors.textPrimary,
        marginBottom: Spacing.sm,
        textAlign: 'center',
    },
    instructionText: {
        fontSize: FontSizes.sm,
        color: Colors.textSecondary,
        textAlign: 'center',
        marginBottom: Spacing.lg,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f8fafc',
        borderRadius: BorderRadius.lg,
        borderWidth: 1,
        borderColor: Colors.border,
        paddingHorizontal: Spacing.md,
        marginBottom: Spacing.md,
    },
    inputIcon: {
        marginRight: Spacing.sm,
    },
    input: {
        flex: 1,
        paddingVertical: 12,
        fontSize: FontSizes.base,
        color: Colors.textPrimary,
    },
    emailButton: {
        backgroundColor: Colors.primaryDark,
        paddingVertical: 14,
        paddingHorizontal: 24,
        borderRadius: BorderRadius.lg,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginTop: Spacing.sm,
        ...Shadows.md,
    },
    buttonDisabled: {
        opacity: 0.5,
    },
    emailButtonText: {
        color: 'white',
        fontSize: FontSizes.base,
        fontWeight: '600',
    },
    toggleText: {
        color: Colors.primary,
        fontSize: FontSizes.sm,
        textAlign: 'center',
        marginTop: Spacing.md,
        fontWeight: '500',
    },
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: Spacing.lg,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: Colors.border,
    },
    dividerText: {
        marginHorizontal: Spacing.md,
        color: Colors.textSecondary,
        fontSize: FontSizes.sm,
    },
    googleButton: {
        flexDirection: 'row',
        backgroundColor: Colors.primary,
        paddingVertical: 14,
        paddingHorizontal: 24,
        borderRadius: BorderRadius.lg,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        ...Shadows.md,
    },
    googleButtonText: {
        color: 'white',
        fontSize: FontSizes.base,
        fontWeight: '600',
    },
    errorContainer: {
        backgroundColor: '#fee2e2',
        padding: 10,
        borderRadius: 8,
        marginBottom: 15,
        width: '100%',
    },
    errorText: {
        color: '#ef4444',
        textAlign: 'center',
        fontSize: 12,
    },
    privacyText: {
        fontSize: 10,
        color: Colors.textSecondary,
        textAlign: 'center',
        marginTop: Spacing.lg,
        lineHeight: 14,
    },
    featuresContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: Spacing.sm,
    },
    featureItem: {
        alignItems: 'center',
    },
    featureIcon: {
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 6,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    featureText: {
        fontSize: 10,
        fontWeight: '600',
        color: Colors.textSecondary,
    },
});