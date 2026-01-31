// Auth context and hooks for SQL Arena
import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

interface User {
    id: string;
    email: string;
    name: string;
    avatarUrl?: string;
}

interface Progress {
    exerciseId: string;
    completed: boolean;
    attempts: number;
    completedAt?: string;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string, name: string) => Promise<void>;
    logout: () => Promise<void>;
    progress: Progress[];
    saveProgress: (exerciseId: string, completed: boolean, solution?: string) => Promise<void>;
    refreshProgress: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

const API_BASE = '/api';

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState<Progress[]>([]);

    const getSessionId = () => localStorage.getItem('sql-arena-session');
    const setSessionId = (id: string | null) => {
        if (id) {
            localStorage.setItem('sql-arena-session', id);
        } else {
            localStorage.removeItem('sql-arena-session');
        }
    };

    const fetchWithAuth = async (path: string, options: RequestInit = {}) => {
        const sessionId = getSessionId();
        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            ...(options.headers || {}),
        };

        if (sessionId) {
            (headers as Record<string, string>)['Authorization'] = `Bearer ${sessionId}`;
        }

        return fetch(`${API_BASE}${path}`, {
            ...options,
            headers,
        });
    };

    // Check if user is logged in on mount
    useEffect(() => {
        const checkAuth = async () => {
            const sessionId = getSessionId();
            if (!sessionId) {
                setLoading(false);
                return;
            }

            try {
                const res = await fetchWithAuth('/auth/me');
                if (res.ok) {
                    const data = await res.json();
                    setUser(data.user);
                    await refreshProgress();
                } else {
                    setSessionId(null);
                }
            } catch {
                setSessionId(null);
            }
            setLoading(false);
        };

        checkAuth();
    }, []);

    const login = async (email: string, password: string) => {
        const res = await fetchWithAuth('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        });

        if (!res.ok) {
            const data = await res.json();
            throw new Error(data.error || 'Inloggning misslyckades');
        }

        const data = await res.json();
        setSessionId(data.sessionId);
        setUser(data.user);
        await refreshProgress();
    };

    const register = async (email: string, password: string, name: string) => {
        const res = await fetchWithAuth('/auth/register', {
            method: 'POST',
            body: JSON.stringify({ email, password, name }),
        });

        if (!res.ok) {
            const data = await res.json();
            throw new Error(data.error || 'Registrering misslyckades');
        }

        const data = await res.json();
        setSessionId(data.sessionId);
        setUser(data.user);
    };

    const logout = async () => {
        await fetchWithAuth('/auth/logout', { method: 'POST' });
        setSessionId(null);
        setUser(null);
        setProgress([]);
    };

    const refreshProgress = async () => {
        try {
            const res = await fetchWithAuth('/progress');
            if (res.ok) {
                const data = await res.json();
                setProgress(data.progress.map((p: any) => ({
                    exerciseId: p.exercise_id,
                    completed: p.completed,
                    attempts: p.attempts,
                    completedAt: p.completed_at,
                })));
            }
        } catch {
            // Ignore errors
        }
    };

    const saveProgress = async (exerciseId: string, completed: boolean, solution?: string) => {
        if (!user) return;

        await fetchWithAuth('/progress', {
            method: 'POST',
            body: JSON.stringify({ exerciseId, completed, solution }),
        });

        await refreshProgress();
    };

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            login,
            register,
            logout,
            progress,
            saveProgress,
            refreshProgress,
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
}
