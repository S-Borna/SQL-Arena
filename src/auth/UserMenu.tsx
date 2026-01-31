import { useState } from 'react';
import { useAuth } from './AuthContext';
import { AuthModal } from './AuthModal';

export function UserMenu() {
    const { user, logout, progress } = useAuth();
    const [showModal, setShowModal] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);

    const completedCount = progress.filter(p => p.completed).length;

    if (!user) {
        return (
            <>
                <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Logga in
                </button>
                <AuthModal isOpen={showModal} onClose={() => setShowModal(false)} />
            </>
        );
    }

    return (
        <div className="relative">
            <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-3 bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-lg transition-colors"
            >
                <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                    {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="text-left">
                    <div className="text-white font-medium">{user.name}</div>
                    <div className="text-xs text-zinc-400">{completedCount} övningar klara</div>
                </div>
                <svg className="w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {showDropdown && (
                <div className="absolute right-0 mt-2 w-56 bg-zinc-800 border border-zinc-700 rounded-lg shadow-xl z-50">
                    <div className="p-4 border-b border-zinc-700">
                        <div className="text-white font-medium">{user.name}</div>
                        <div className="text-sm text-zinc-400">{user.email}</div>
                    </div>

                    <div className="p-2">
                        <div className="px-3 py-2 text-sm text-zinc-400">
                            <div className="flex justify-between">
                                <span>Slutförda övningar</span>
                                <span className="text-cyan-400 font-mono">{completedCount}</span>
                            </div>
                            <div className="w-full bg-zinc-700 rounded-full h-2 mt-2">
                                <div
                                    className="bg-gradient-to-r from-cyan-500 to-blue-600 h-2 rounded-full transition-all"
                                    style={{ width: `${Math.min((completedCount / 50) * 100, 100)}%` }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-zinc-700 p-2">
                        <button
                            onClick={() => {
                                logout();
                                setShowDropdown(false);
                            }}
                            className="w-full text-left px-3 py-2 text-red-400 hover:bg-zinc-700 rounded-lg transition-colors"
                        >
                            Logga ut
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
