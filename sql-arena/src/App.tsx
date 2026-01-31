import { useState, useEffect } from 'react';
import { initializeSqlJs } from './engine/sqlRunner';
import { Navigation } from './components/Navigation';
import { ArenaView } from './views/ArenaView';
import { RoadmapView } from './views/RoadmapView';
import { LabsView } from './views/LabsView';
import { DesignStudioView } from './views/DesignStudioView';
import { HanukkahView } from './views/HanukkahView';
import { LandingPage } from './views/LandingPage';
import { useAuth } from './auth';
import type { ViewType, DatabaseType } from './types';
import './App.css';

function App() {
  const [showLanding, setShowLanding] = useState(true);
  const [currentView, setCurrentView] = useState<ViewType>('arena');
  const [currentDatabase, setCurrentDatabase] = useState<DatabaseType>('ecommerce');
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [streak, setStreak] = useState(0);
  const { user } = useAuth();

  // Check if user has visited before
  useEffect(() => {
    const hasVisited = localStorage.getItem('sql-arena-visited');
    if (hasVisited || user) {
      setShowLanding(false);
    }
  }, [user]);

  const handleStartTraining = () => {
    localStorage.setItem('sql-arena-visited', 'true');
    setShowLanding(false);
  };

  useEffect(() => {
    const loadSqlJs = async () => {
      try {
        await initializeSqlJs();
        setIsLoading(false);
      } catch (error) {
        setLoadError(error instanceof Error ? error.message : 'Failed to initialize SQL engine');
        setIsLoading(false);
      }
    };
    loadSqlJs();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-zinc-400 font-mono">Laddar SQL Arena...</p>
        </div>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950">
        <div className="text-center max-w-md">
          <div className="text-red-400 text-5xl mb-4">!</div>
          <h1 className="text-xl font-semibold text-zinc-100 mb-2">Kunde inte ladda SQL Arena</h1>
          <p className="text-zinc-400 mb-4">{loadError}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-cyan-500 text-zinc-950 font-semibold rounded-lg hover:bg-cyan-400 transition-colors"
          >
            Försök igen
          </button>
        </div>
      </div>
    );
  }

  // Show landing page for new visitors
  if (showLanding) {
    return <LandingPage onStart={handleStartTraining} />;
  }

  const renderView = () => {
    switch (currentView) {
      case 'arena':
        return (
          <ArenaView
            currentDatabase={currentDatabase}
            onDatabaseChange={setCurrentDatabase}
            streak={streak}
            onStreakChange={setStreak}
          />
        );
      case 'roadmap':
        return <RoadmapView onNavigateToArena={() => setCurrentView('arena')} />;
      case 'labs':
        return (
          <LabsView
            currentDatabase={currentDatabase}
            onDatabaseChange={setCurrentDatabase}
          />
        );
      case 'design':
        return <DesignStudioView />;
      case 'hanukkah':
        return <HanukkahView />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col">
      <Navigation
        currentView={currentView}
        onViewChange={setCurrentView}
        streak={streak}
      />
      <main className="flex-1 flex flex-col">
        {renderView()}
      </main>
    </div>
  );
}

export default App;
