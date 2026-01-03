import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@/context/AuthContext';

export default function ProfileScreen() {
    const { currentUser, logout } = useAuth();

    const handleLogout = async () => {
        try {
            await logout();
        } catch (e: any) {
            Alert.alert("Error", e.message);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-secondary p-4">
            <View className="bg-white p-6 rounded-xl shadow-sm mb-6 items-center">
                <View className="w-20 h-20 bg-primary-dark rounded-full mb-4 items-center justify-center">
                    <Text className="text-white text-2xl font-bold">{currentUser?.email?.charAt(0).toUpperCase()}</Text>
                </View>
                <Text className="text-xl font-bold">{currentUser?.email}</Text>
            </View>

            <TouchableOpacity
                className="bg-red-500 p-4 rounded-lg"
                onPress={handleLogout}
            >
                <Text className="text-white text-center font-bold">Logout</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}
