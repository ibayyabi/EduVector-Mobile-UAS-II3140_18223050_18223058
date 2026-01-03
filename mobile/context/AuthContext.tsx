import React, { useContext, useState, useEffect, useRef } from 'react';
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
    const [loading, setLoading] = useState(false); // Indicates action in progress (login/register)
    const [initialized, setInitialized] = useState(false); // Indicates initial auth check is done
    const [error, setError] = useState<string | null>(null);

    function logout() {
        return logoutUser();
    }


    // Helper to extract error code from various error object shapes
    const getErrorCode = (e: any): string | null => {
        if (e.code) return e.code;
        
        // Try to regex extract from message if code is missing
        // Matches pattern like (auth/invalid-credential)
        if (e.message) {
            const match = e.message.match(/\((auth\/[a-z-]+)\)/);
            if (match && match[1]) return match[1];
        }
        
        return null;
    };

    async function loginWithEmail(email: string, password: string) {
        setLoading(true);
        setError(null);
        try {
            console.log("Attempting login with:", email);
            await loginEmail(email, password);
            console.log("Login successful");
        } catch (e: any) {
            console.error("Login Error:", e);
            const errorCode = getErrorCode(e);
            console.error("Login Error Code (Extracted):", errorCode);
            
            // Store error code if available, otherwise fallback to message or generic
            setError(errorCode || e.message || 'Failed to login');
            throw e;
        } finally {
            setLoading(false);
        }
    }

    async function register(email: string, password: string) {
        setLoading(true);
        setError(null);
        isRegistering.current = true; // Set flag
        try {
            console.log("Attempting registration with:", email);
            await registerWithEmail(email, password);
            console.log("Registration successful - Logging out to enforce manual login");
            await logout(); // Immediately logout
        } catch (e: any) {
            console.error("Registration Error:", e);
            const errorCode = getErrorCode(e);
            console.error("Registration Error Code (Extracted):", errorCode);

            setError(errorCode || e.message || 'Failed to register');
            throw e;
        } finally {
            isRegistering.current = false; // Reset flag
            setLoading(false);
        }
    }

    const value = { currentUser, logout, loginWithEmail, register, loading, error };

    const isRegistering = React.useRef(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(user => {
            // If we are in the middle of a registration flow, ignore the auto-login event
            // The register function will handle logging out manually
            if (isRegistering.current && user) {
                console.log("Ignoring auto-login during registration");
                return;
            }
            setCurrentUser(user);
            setInitialized(true);
        });
        return unsubscribe;
    }, []);

    return (
        <AuthContext.Provider value={value}>
            {initialized ? children : null}
        </AuthContext.Provider>
    );
}
