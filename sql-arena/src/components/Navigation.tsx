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
      <header className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <span className="text-2xl">⬡</span>
                <span className="font-semibold text-lg tracking-tight">SQL Arena</span>
              </div>

              <nav className="flex items-center gap-1">
                {navItems.map(item => (
                  <button
                    key={item.id}
                    onClick={() => onViewChange(item.id)}
                    className={`
                      px-4 py-2 rounded-lg text-sm font-medium transition-all
                      ${currentView === item.id
                        ? 'bg-zinc-800 text-cyan-400'
                        : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
                      }
                    `}
                  >
                    <span className="mr-2">{item.icon}</span>
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>

            <div className="flex items-center gap-4">
              {/* Cheat Sheet Button */}
              <button
                onClick={() => setShowCheatSheet(true)}
                className="px-3 py-1.5 bg-zinc-800/50 text-zinc-400 hover:text-cyan-400 hover:bg-zinc-800 rounded-lg text-sm font-medium transition-colors"
                title="SQL Cheat Sheet"
              >
                📋 Cheat Sheet
              </button>

              {streak > 0 && (
                <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-800/50 rounded-full">
                  <span className="text-orange-400">🔥</span>
                  <span className="text-sm font-medium text-zinc-300">{streak} streak</span>
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
