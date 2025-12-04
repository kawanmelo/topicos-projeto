import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Admin, LoginCredentials } from '../types/admin';
import { adminService } from '../services/adminService';

interface AuthContextType {
    admin: Admin | null;
    login: (credentials: LoginCredentials) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [admin, setAdmin] = useState<Admin | null>(() => {
        const stored = localStorage.getItem('admin');
        return stored ? JSON.parse(stored) : null;
    });

    const login = async (credentials: LoginCredentials) => {
        const loggedAdmin = await adminService.login(credentials);
        setAdmin(loggedAdmin);
        localStorage.setItem('admin', JSON.stringify(loggedAdmin));
    };

    const logout = () => {
        setAdmin(null);
        localStorage.removeItem('admin');
    };

    return (
        <AuthContext.Provider value={{ admin, login, logout, isAuthenticated: !!admin }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};
