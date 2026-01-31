import { useState, useEffect } from 'react';
import type { ViewType } from '../types';
import { UserMenu } from '../auth';
import { CheatSheet } from './CheatSheet';

interface NavigationProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
  streak: number;
}

const navItems: { id: ViewType; label: string; icon: string }[] = [
  { id: 'arena', label: 'Arena', icon: '⚡' },
  { id: 'roadmap', label: 'Roadmap', icon: '🗺' },
  { id: 'labs', label: 'Labs', icon: '🧪' },
  { id: 'design', label: 'Design Studio', icon: '📐' },
  { id: 'hanukkah', label: 'Hanukkah Mystery', icon: '🕎' }
];

export function Navigation({ currentView, onViewChange, streak }: NavigationProps) {
  const [showCheatSheet, setShowCheatSheet] = useState(false);

  // Close on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowCheatSheet(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <header className="border-b border-white/5 bg-[#050508]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2 group cursor-pointer" onClick={() => onViewChange('arena')}>
                <div className="relative">
                  <div className="absolute inset-0 bg-cyan-500/20 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
                  <svg viewBox="0 0 64 64" className="relative w-8 h-8 text-cyan-400 group-hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.5)] transition-all" fill="currentColor">
                    <path d="M32 4C18.7 4 8 9.4 8 16v32c0 6.6 10.7 12 24 12s24-5.4 24-12V16c0-6.6-10.7-12-24-12zm0 4c11.6 0 20 4.5 20 8s-8.4 8-20 8-20-4.5-20-8 8.4-8 20-8zm20 40c0 3.5-8.4 8-20 8s-20-4.5-20-8v-6.2c4.3 3.4 11.6 5.2 20 5.2s15.7-1.8 20-5.2V48zm0-12c0 3.5-8.4 8-20 8s-20-4.5-20-8v-6.2c4.3 3.4 11.6 5.2 20 5.2s15.7-1.8 20-5.2V36zm0-12c0 3.5-8.4 8-20 8s-20-4.5-20-8v-6.2c4.3 3.4 11.6 5.2 20 5.2s15.7-1.8 20-5.2V24z" />
                  </svg>
                </div>
                <span className="font-bold text-lg tracking-tight text-white">SQL Arena</span>
              </div>

              <nav className="flex items-center gap-1">
                {navItems.map(item => (
                  <button
                    key={item.id}
                    onClick={() => onViewChange(item.id)}
                    className={`
                      relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200
                      ${currentView === item.id
                        ? 'text-cyan-400'
                        : 'text-zinc-400 hover:text-white'
                      }
                    `}
                  >
                    {currentView === item.id && (
                      <div className="absolute inset-0 bg-white/5 border border-white/10 rounded-xl" />
                    )}
                    <span className="relative flex items-center gap-2">
                      <span>{item.icon}</span>
                      {item.label}
                    </span>
                  </button>
                ))}
              </nav>
            </div>

            <div className="flex items-center gap-3">
              {/* Cheat Sheet Button */}
              <button
                onClick={() => setShowCheatSheet(true)}
                className="px-3 py-2 glass-card text-zinc-400 hover:text-cyan-400 rounded-xl text-sm font-medium transition-all hover:border-cyan-500/30"
                title="SQL Cheat Sheet"
              >
                📋 Cheat Sheet
              </button>

              {streak > 0 && (
                <div className="flex items-center gap-2 px-3 py-2 glass-card rounded-full">
                  <span className="text-orange-400 animate-pulse">🔥</span>
                  <span className="text-sm font-semibold text-white">{streak}</span>
                </div>
              )}
              <UserMenu />
            </div>
          </div>
        </div>
      </header>

      <CheatSheet isOpen={showCheatSheet} onClose={() => setShowCheatSheet(false)} />
    </>
  );
}
