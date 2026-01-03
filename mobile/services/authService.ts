import { auth } from '../firebaseConfig';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged as onFirebaseAuthStateChanged,
    User
} from 'firebase/auth';

export const loginWithEmail = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
};

export const registerWithEmail = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
};

export const signInWithGoogle = async () => {
    console.warn("Google Sign-In requires native setup via expo-auth-session or @react-native-google-signin/google-signin");
    return null;
};

export const logout = () => {
    return signOut(auth);
};

export const onAuthStateChanged = (callback: (user: User | null) => void) => {
    return onFirebaseAuthStateChanged(auth, callback);
};
