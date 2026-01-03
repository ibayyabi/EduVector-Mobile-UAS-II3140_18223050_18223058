import React, { useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, logout as logoutUser, loginWithEmail as loginEmail, registerWithEmail } from '../services/authService';
import { User } from 'firebase/auth';

interface AuthContextType {
    currentUser: User | null;
    logout: () => Promise<void>;
    loginWithEmail: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string) => Promise<void>;
    loading: boolean;
    error: string | null;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    function logout() {
        return logoutUser();
    }



    async function loginWithEmail(email: string, password: string) {
        setLoading(true);
        setError(null);
        try {
            console.log("Attempting login with:", email);
            await loginEmail(email, password);
            console.log("Login successful");
        } catch (e: any) {
            console.error("Login Error:", e);
            console.error("Login Error Code:", e.code);
            console.error("Login Error Message:", e.message);
            setError(e.message || 'Failed to login');
            throw e;
        } finally {
            setLoading(false);
        }
    }

    async function register(email: string, password: string) {
        setLoading(true);
        setError(null);
        try {
            console.log("Attempting registration with:", email);
            await registerWithEmail(email, password);
             console.log("Registration successful");
        } catch (e: any) {
            console.error("Registration Error:", e);
            console.error("Registration Error Code:", e.code);
            console.error("Registration Error Message:", e.message);
            setError(e.message || 'Failed to register');
            throw e;
        } finally {
            setLoading(false);
        }
    }

    const value = { currentUser, logout, loginWithEmail, register, loading, error };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
