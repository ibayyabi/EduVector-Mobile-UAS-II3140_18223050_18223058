import { initializeApp } from 'firebase/app';
import { initializeAuth, GoogleAuthProvider, browserLocalPersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { Platform } from 'react-native';

const firebaseConfig = {
    apiKey: process.env.EXPO_PUBLIC_API_KEY,
    authDomain: process.env.EXPO_PUBLIC_AUTH_DOMAIN,
    projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
    storageBucket: process.env.EXPO_PUBLIC_STORAGE_BUCKET,
    messagingSenderId: process.env.EXPO_PUBLIC_MESSAGING_SENDER_ID,
    appId: process.env.EXPO_PUBLIC_APP_ID,
    measurementId: process.env.EXPO_PUBLIC_MEASUREMENT_ID
};

if (!firebaseConfig.apiKey) {
    console.error("Firebase API Key is missing! Please check your .env file.");
}

const app = initializeApp(firebaseConfig);

// Platform-specific persistence
let authInstance;
if (Platform.OS === 'web') {
    // Web uses browser persistence
    authInstance = initializeAuth(app, {
        persistence: browserLocalPersistence
    });
} else {
    // Mobile uses React Native persistence
    const { getReactNativePersistence } = require('firebase/auth');
    const AsyncStorage = require('@react-native-async-storage/async-storage').default;
    
    authInstance = initializeAuth(app, {
        persistence: getReactNativePersistence(AsyncStorage)
    });
}

export const auth = authInstance;
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
