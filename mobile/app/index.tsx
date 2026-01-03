import { Redirect } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import { View, ActivityIndicator } from 'react-native';

export default function Index() {
    const { currentUser, loading } = useAuth();

    if (loading) {
        return <View className="flex-1 justify-center items-center bg-secondary"><ActivityIndicator size="large" color="#005fdb" /></View>;
    }

    if (currentUser) {
        return <Redirect href="/(tabs)" />;
    }

    return <Redirect href="/landing" />;
}
