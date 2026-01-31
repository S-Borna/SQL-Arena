// Global state manager for persisting editor content across views
import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { ReactNode } from 'react';

interface EditorState {
  arenaQuery: string;
  arenaExerciseIndex: number;
  labsQuery: string;
  hanukkahQuery: string;
  hanukkahPuzzleIndex: number;
}

interface EditorStateContextType {
  state: EditorState;
  setArenaQuery: (query: string) => void;
  setArenaExerciseIndex: (index: number) => void;
  setLabsQuery: (query: string) => void;
  setHanukkahQuery: (query: string) => void;
  setHanukkahPuzzleIndex: (index: number) => void;
  saveToLocalStorage: () => void;
}

const STORAGE_KEY = 'sql-arena-editor-state';

const defaultState: EditorState = {
  arenaQuery: '',
  arenaExerciseIndex: 0,
  labsQuery: '',
  hanukkahQuery: '',
  hanukkahPuzzleIndex: 0,
};

const EditorStateContext = createContext<EditorStateContextType | null>(null);

export function EditorStateProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<EditorState>(() => {
    // Load from localStorage on init
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...defaultState, ...JSON.parse(saved) };
      }
    } catch {
      // Ignore errors
    }
    return defaultState;
  });

  // Auto-save to localStorage whenever state changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      } catch {
        // Ignore errors (e.g., quota exceeded)
      }
    }, 500); // Debounce saves

    return () => clearTimeout(timeoutId);
  }, [state]);

  const setArenaQuery = useCallback((query: string) => {
    setState(prev => ({ ...prev, arenaQuery: query }));
  }, []);

  const setArenaExerciseIndex = useCallback((index: number) => {
    setState(prev => ({ ...prev, arenaExerciseIndex: index }));
  }, []);

  const setLabsQuery = useCallback((query: string) => {
    setState(prev => ({ ...prev, labsQuery: query }));
  }, []);

  const setHanukkahQuery = useCallback((query: string) => {
    setState(prev => ({ ...prev, hanukkahQuery: query }));
  }, []);

  const setHanukkahPuzzleIndex = useCallback((index: number) => {
    setState(prev => ({ ...prev, hanukkahPuzzleIndex: index }));
  }, []);

  const saveToLocalStorage = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Ignore errors
    }
  }, [state]);

  return (
    <EditorStateContext.Provider value={{
      state,
      setArenaQuery,
      setArenaExerciseIndex,
      setLabsQuery,
      setHanukkahQuery,
      setHanukkahPuzzleIndex,
      saveToLocalStorage,
    }}>
      {children}
    </EditorStateContext.Provider>
  );
}

export function useEditorState() {
  const context = useContext(EditorStateContext);
  if (!context) {
    throw new Error('useEditorState must be used within EditorStateProvider');
  }
  return context;
}
