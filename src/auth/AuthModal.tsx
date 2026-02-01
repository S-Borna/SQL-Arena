import { useState } from 'react';
import { useAuth } from './AuthContext';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
    const [mode, setMode] = useState<'login' | 'register'>('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login, register } = useAuth();

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (mode === 'login') {
                await login(email, password);
            } else {
                await register(email, password, name);
            }
            onClose();
            setEmail('');
            setPassword('');
            setName('');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Något gick fel');
        }
        setLoading(false);
    };

    return (
        <div
            className="fixed top-0 left-0 right-0 bottom-0 w-screen h-screen bg-black/90 backdrop-blur-md flex items-center justify-center"
            style={{ zIndex: 99999 }}
            onClick={onClose}
        >
            <div
                className="bg-gradient-to-br from-zinc-800 via-zinc-900 to-zinc-950 rounded-2xl p-8 w-full max-w-md border border-fuchsia-500/30 shadow-[0_0_60px_rgba(0,200,255,0.15)] mx-4"
                style={{ marginTop: '-10vh' }}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-white">
                            {mode === 'login' ? 'Logga in' : 'Skapa konto'}
                        </h2>
                        <p className="text-zinc-500 text-sm mt-1">SQL Arena</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white flex items-center justify-center transition-colors"
                    >
                        ×
                    </button>
                </div>

                {error && (
                    <div className="bg-red-500/20 border border-red-500 text-red-400 px-4 py-2 rounded-lg mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {mode === 'register' && (
                        <div>
                            <label className="block text-zinc-400 mb-2">Namn</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-fuchsia-500"
                                placeholder="Ditt namn"
                                required
                            />
                        </div>
                    )}

                    <div>
                        <label className="block text-zinc-400 mb-2">E-post</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-fuchsia-500"
                            placeholder="din@email.se"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-zinc-400 mb-2">Lösenord</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-fuchsia-500"
                            placeholder="••••••••"
                            required
                            minLength={6}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-fuchsia-500 to-pink-600 text-white py-3 rounded-lg font-semibold hover:from-fuchsia-600 hover:to-pink-700 disabled:opacity-50 transition-all"
                    >
                        {loading ? 'Laddar...' : mode === 'login' ? 'Logga in' : 'Skapa konto'}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <button
                        onClick={() => {
                            setMode(mode === 'login' ? 'register' : 'login');
                            setError('');
                        }}
                        className="text-fuchsia-400 hover:text-fuchsia-300"
                    >
                        {mode === 'login'
                            ? 'Har du inget konto? Skapa ett här'
                            : 'Har du redan ett konto? Logga in'}
                    </button>
                </div>
            </div>
        </div>
    );
}
