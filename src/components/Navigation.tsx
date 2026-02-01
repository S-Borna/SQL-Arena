import { useState, useEffect } from 'react';
import type { ViewType } from '../types';
import { UserMenu } from '../auth';
import { CheatSheet } from './CheatSheet';

interface NavigationProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
  streak: number;
  onLogoClick?: () => void;
}

// SVG icon components for cleaner code
const ArenaIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>
);
const RoadmapIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" /></svg>
);
const LabsIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" /></svg>
);
const DesignIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" /></svg>
);
const MysteryIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2c.55 0 1 .45 1 1v2h-2V3c0-.55.45-1 1-1zM4 4c.55 0 1 .45 1 1v2H3V5c0-.55.45-1 1-1zm16 0c.55 0 1 .45 1 1v2h-2V5c0-.55.45-1 1-1zM7 4c.55 0 1 .45 1 1v2H6V5c0-.55.45-1 1-1zm10 0c.55 0 1 .45 1 1v2h-2V5c0-.55.45-1 1-1zM9.5 4c.55 0 1 .45 1 1v2h-2V5c0-.55.45-1 1-1zm5 0c.55 0 1 .45 1 1v2h-2V5c0-.55.45-1 1-1zM3 8h18v2H3V8zm1 4h16v1c0 2.21-1.79 4-4 4h-2v3h-4v-3H8c-2.21 0-4-1.79-4-4v-1z" /></svg>
);

const getNavIcon = (id: ViewType) => {
  switch (id) {
    case 'arena': return <ArenaIcon />;
    case 'roadmap': return <RoadmapIcon />;
    case 'labs': return <LabsIcon />;
    case 'design': return <DesignIcon />;
    case 'hanukkah': return <MysteryIcon />;
    default: return <ArenaIcon />;
  }
};

const navItems: { id: ViewType; label: string }[] = [
  { id: 'arena', label: 'Arena' },
  { id: 'roadmap', label: 'Roadmap' },
  { id: 'labs', label: 'Labs' },
  { id: 'design', label: 'Design Studio' },
  { id: 'hanukkah', label: 'Hanukkah of Data' }
];

export function Navigation({ currentView, onViewChange, streak, onLogoClick }: NavigationProps) {
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
      <header className="border-b border-white/5 bg-[#0a0a0f]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2 group cursor-pointer" onClick={() => onLogoClick?.()}>
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-500/20 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
                  <svg viewBox="0 0 64 64" className="relative w-8 h-8 text-blue-400 group-hover:drop-shadow-[0_0_8px_rgba(217,70,239,0.5)] transition-all" fill="currentColor">
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
                        ? 'text-blue-400'
                        : 'text-zinc-400 hover:text-white'
                      }
                    `}
                  >
                    {currentView === item.id && (
                      <div className="absolute inset-0 bg-blue-500/10 border border-blue-500/20 rounded-xl" />
                    )}
                    <span className="relative flex items-center gap-2">
                      {getNavIcon(item.id)}
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
                className="flex items-center gap-2 px-3 py-2 bg-white/[0.02] border border-white/[0.05] text-zinc-400 hover:text-blue-400 rounded-xl text-sm font-medium transition-all hover:border-blue-500/30"
                title="SQL Cheat Sheet"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>
                Cheat Sheet
              </button>

              {streak > 0 && (
                <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-orange-500/10 to-amber-500/10 border border-orange-500/20 rounded-full">
                  <svg className="w-4 h-4 text-orange-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 23a7.5 7.5 0 01-5.138-12.963C8.204 8.774 11.5 6.5 11 1.5c6 4 9 8 3 14 1 0 2.5 0 5-2.47.27.773.5 1.604.5 2.47A7.5 7.5 0 0112 23z" /></svg>
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
