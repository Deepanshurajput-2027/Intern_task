import { createContext, useState, useEffect, useContext, useCallback } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const restoreSession = useCallback(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                // Parse JWT Payload
                const payload = JSON.parse(atob(token.split('.')[1]));
                // Basic expiration check (if exp exists)
                if (payload.exp && payload.exp * 1000 < Date.now()) {
                    throw new Error('Token expired');
                }
                setUser({
                    id: payload.id,
                    role: payload.role
                });
            } catch (e) {
                console.warn('Invalid token on bootstrap', e);
                // Token is malformed or expired
                localStorage.removeItem('token');
                setUser(null);
            }
        } else {
            setUser(null);
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        restoreSession();
        
        // Listen to storage events to handle multi-tab logout/login
        const handleStorageChange = (e) => {
            if (e.key === 'token') {
                restoreSession();
            }
        };
        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, [restoreSession]);

    const login = (token) => {
        localStorage.setItem('token', token);
        restoreSession();
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    const isAuthenticated = () => {
        return !!user;
    };

    const hasRole = (role) => {
        return user?.role === role;
    };

    return (
        <AuthContext.Provider value={{ 
            user, 
            loading, 
            login, 
            logout, 
            restoreSession, 
            isAuthenticated, 
            hasRole 
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
