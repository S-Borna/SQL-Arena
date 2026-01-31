import { useState, useCallback, useEffect } from 'react';
import { SqlEditor } from '../components/SqlEditor';
import { ResultsTable } from '../components/ResultsTable';
import { executeQuery, getTableList, getTableSchema } from '../engine/sqlRunner';
import { validateQueryResult } from '../engine/coachEngine';
import { allExercises } from '../data/exercises';
import { useAuth } from '../auth';
import { useEditorState } from '../state/EditorState';
import type { DatabaseType, QueryResult, Exercise } from '../types';

interface ArenaViewProps {
  currentDatabase: DatabaseType;
  onDatabaseChange: (db: DatabaseType) => void;
  streak: number;
  onStreakChange: (streak: number) => void;
}

// Map category to readable Swedish
const categoryNames: Record<string, string> = {
  'select': 'SELECT',
  'where': 'WHERE',
  'orderby': 'ORDER BY',
  'groupby': 'GROUP BY',
  'join': 'JOIN',
  'aggregate': 'GROUP BY + Aggregering',
  'subquery': 'Subqueries'
};

export function ArenaView({ currentDatabase, onDatabaseChange }: ArenaViewProps) {
  const { state: editorState, setArenaQuery, setArenaExerciseIndex } = useEditorState();
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [currentIndex, setCurrentIndex] = useState(editorState.arenaExerciseIndex);
  const [currentExercise, setCurrentExercise] = useState<Exercise | null>(null);
  const [query, setQuery] = useState(editorState.arenaQuery);
  const [result, setResult] = useState<QueryResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [showAnswerConfirm, setShowAnswerConfirm] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showSchema, setShowSchema] = useState(false);
  const [schemaInfo, setSchemaInfo] = useState<{ tables: string[], columns: Record<string, { name: string, type: string }[]> }>({ tables: [], columns: {} });
  const { user, saveProgress } = useAuth();

  // Sync query to global state for persistence
  useEffect(() => {
    setArenaQuery(query);
  }, [query, setArenaQuery]);

  // Sync exercise index to global state
  useEffect(() => {
    setArenaExerciseIndex(currentIndex);
  }, [currentIndex, setArenaExerciseIndex]);

  // Filter exercises by current database
  useEffect(() => {
    const filtered = allExercises.filter(e => e.database === currentDatabase);
    setExercises(filtered);
    // Only reset index if we're switching databases
    const savedIndex = editorState.arenaExerciseIndex;
    const indexToUse = savedIndex < filtered.length ? savedIndex : 0;
    setCurrentIndex(indexToUse);
    setCurrentExercise(filtered[indexToUse] || null);
    // Don't reset query if we have a saved one for the same exercise
  }, [currentDatabase]);

  // Load schema
  useEffect(() => {
    const loadSchema = async () => {
      const tableList = await getTableList(currentDatabase);
      const columns: Record<string, { name: string, type: string }[]> = {};
      for (const table of tableList) {
        const schema = await getTableSchema(table, currentDatabase);
        columns[table] = schema.map(s => ({ name: s.name, type: s.type }));
      }
      setSchemaInfo({ tables: tableList, columns });
    };
    loadSchema();
  }, [currentDatabase]);

  const resetState = (preserveQuery = false) => {
    if (!preserveQuery) setQuery('');
    setResult(null);
    setIsCorrect(false);
    setErrorMessage(null);
    setShowHint(false);
    setShowAnswer(false);
    setShowAnswerConfirm(false);
  };

  const handleExecute = useCallback(async () => {
    if (!currentExercise || !query.trim()) return;

    setIsLoading(true);
    setErrorMessage(null);

    const queryResult = await executeQuery(query, currentExercise.database);
    setResult(queryResult);
    setIsLoading(false);

    if (queryResult.error) {
      setIsCorrect(false);
      setErrorMessage(queryResult.error);
      return;
    }

    const validation = validateQueryResult(queryResult, currentExercise);
    setIsCorrect(validation.valid);

    if (!validation.valid) {
      setErrorMessage(validation.message || 'Inte riktigt rätt. Försök igen!');
    } else {
      // Save progress
      if (user && currentExercise) {
        try {
          await saveProgress(currentExercise.id, true, query);
        } catch { /* ignore */ }
      }
    }
  }, [query, currentExercise, user, saveProgress]);

  const handleNextExercise = useCallback(() => {
    if (currentIndex < exercises.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      setCurrentExercise(exercises[nextIndex]);
      resetState();
    }
  }, [currentIndex, exercises]);

  const handlePrevExercise = useCallback(() => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      setCurrentExercise(exercises[prevIndex]);
      resetState();
    }
  }, [currentIndex, exercises]);

  // Sample answer generator (simplified)
  const getSampleAnswer = (exercise: Exercise): string => {
    // This would ideally come from the exercise data
    const hints = exercise.hints || [];
    const cols = exercise.expectedColumns?.join(', ') || '*';

    // Try to generate a reasonable answer based on category
    switch (exercise.category) {
      case 'select':
        return `SELECT ${cols}\nFROM ${exercise.database === 'hanukkah' ? 'customers' : 'products'};`;
      case 'where':
        return `SELECT ${cols}\nFROM customers\nWHERE -- din filter här;`;
      case 'join':
        return `SELECT ${cols}\nFROM orders\nJOIN customers ON orders.customer_id = customers.customer_id;`;
      default:
        return hints[hints.length - 1] || `SELECT ${cols} FROM ...`;
    }
  };

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-64px)] bg-[#050508]">
      {/* Header */}
      <div className="border-b border-white/5 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <select
              value={currentDatabase}
              onChange={(e) => onDatabaseChange(e.target.value as DatabaseType)}
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm font-medium text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
            >
              <option value="ecommerce">E-commerce</option>
              <option value="chinook">Chinook (Musik)</option>
              <option value="school">School</option>
            </select>

            <button
              onClick={() => setShowSchema(!showSchema)}
              className={`px-4 py-2.5 text-sm font-medium rounded-xl transition-all ${showSchema
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50'
                : 'glass-card text-zinc-400 hover:text-white hover:border-white/20'
                }`}
            >
              📋 Schema
            </button>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <button
              onClick={handlePrevExercise}
              disabled={currentIndex === 0}
              className="px-3 py-2 glass-card rounded-xl disabled:opacity-30 hover:border-white/20 disabled:hover:border-white/10 transition-all"
            >
              ←
            </button>
            <span className="px-3 py-2 glass-card rounded-xl text-zinc-300">
              <span className="text-cyan-400 font-bold">{currentIndex + 1}</span>
              <span className="text-zinc-500"> / {exercises.length}</span>
            </span>
            <button
              onClick={handleNextExercise}
              disabled={currentIndex >= exercises.length - 1}
              className="px-3 py-2 glass-card rounded-xl disabled:opacity-30 hover:border-white/20 disabled:hover:border-white/10 transition-all"
            >
              →
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Schema Panel */}
        {showSchema && (
          <div className="w-72 border-r border-white/5 flex flex-col bg-black/20 backdrop-blur-sm overflow-hidden">
            <div className="px-4 py-4 border-b border-white/5">
              <h3 className="text-sm font-bold text-white">Tabeller</h3>
            </div>
            <div className="flex-1 overflow-auto p-4">
              {schemaInfo.tables.map(table => (
                <div key={table} className="mb-5">
                  <h4 className="text-cyan-400 font-mono text-sm font-bold mb-2">{table}</h4>
                  <div className="space-y-1 pl-3 border-l-2 border-cyan-500/30">
                    {schemaInfo.columns[table]?.map(col => (
                      <div key={col.name} className="flex justify-between text-xs">
                        <span className="text-zinc-300 font-mono">{col.name}</span>
                        <span className="text-zinc-600">{col.type}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Question Card */}
          {currentExercise && (
            <div className="border-b border-white/5 p-6">
              <div className="max-w-4xl">
                {/* Category tag */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1.5 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 text-xs font-bold rounded-full uppercase tracking-wide border border-cyan-500/30">
                    {categoryNames[currentExercise.category] || currentExercise.category}
                  </span>
                  {currentExercise.difficulty === 'boss' && (
                    <span className="px-3 py-1.5 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-400 text-xs font-bold rounded-full border border-purple-500/30">
                      👑 BOSS
                    </span>
                  )}
                </div>

                {/* Title */}
                <h1 className="text-2xl font-bold text-white mb-3">
                  {currentExercise.title}
                </h1>

                {/* Question */}
                <p className="text-lg text-zinc-300 mb-5 leading-relaxed">
                  {currentExercise.brief}
                </p>

                {/* Hint & Answer buttons */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setShowHint(!showHint)}
                    className={`px-4 py-2.5 text-sm font-medium rounded-xl transition-all ${showHint
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/50'
                      : 'glass-card text-zinc-400 hover:text-amber-400 hover:border-amber-500/30'
                      }`}
                  >
                    💡 Ledtråd
                  </button>

                  <button
                    onClick={() => setShowAnswerConfirm(true)}
                    className="px-4 py-2.5 text-sm font-medium glass-card text-zinc-400 rounded-xl hover:text-white hover:border-white/20 transition-all"
                  >
                    📝 Visa facit
                  </button>
                </div>

                {/* Hint content */}
                {showHint && currentExercise.hints && currentExercise.hints.length > 0 && (
                  <div className="mt-5 p-4 glass-card border-l-4 border-l-amber-500/50 rounded-xl">
                    <p className="text-amber-200 text-sm">
                      <strong>Tips:</strong> Här använder vi <code className="bg-amber-500/20 px-1.5 py-0.5 rounded font-mono">{categoryNames[currentExercise.category] || currentExercise.category}</code>
                    </p>
                    <p className="text-amber-200/70 text-sm mt-2">
                      {currentExercise.hints[0]}
                    </p>
                  </div>
                )}

                {/* Answer content */}
                {showAnswer && (
                  <div className="mt-5 p-4 glass-card border-l-4 border-l-green-500/50 rounded-xl">
                    <p className="text-zinc-400 text-xs mb-2 font-medium">Exempellösning:</p>
                    <pre className="text-green-400 font-mono text-sm whitespace-pre-wrap">
                      {getSampleAnswer(currentExercise)}
                    </pre>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Editor + Results */}
          <div className="flex-1 grid grid-cols-2 gap-0 min-h-0">
            {/* Editor */}
            <div className="flex flex-col border-r border-white/5">
              <div className="flex-1 min-h-0">
                <SqlEditor
                  value={query}
                  onChange={setQuery}
                  onExecute={handleExecute}
                  placeholder="Skriv din SQL-fråga här..."
                />
              </div>

              {/* Run button + status */}
              <div className="p-4 border-t border-white/5 bg-black/20">
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleExecute}
                    disabled={isLoading || !query.trim()}
                    className="flex-1 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-xl hover:from-cyan-400 hover:to-blue-400 disabled:opacity-50 transition-all shadow-lg shadow-cyan-500/20"
                  >
                    {isLoading ? 'Kör...' : '▶ Kör (Ctrl+Enter)'}
                  </button>

                  {isCorrect && (
                    <button
                      onClick={handleNextExercise}
                      disabled={currentIndex >= exercises.length - 1}
                      className="px-6 py-3.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-xl hover:from-green-400 hover:to-emerald-400 disabled:opacity-50 transition-all shadow-lg shadow-green-500/20"
                    >
                      Nästa →
                    </button>
                  )}
                </div>

                {/* Feedback */}
                {(isCorrect || errorMessage) && (
                  <div className={`mt-4 p-4 rounded-xl border-l-4 ${isCorrect
                    ? 'glass-card border-l-green-500'
                    : 'glass-card border-l-red-500'
                    }`}>
                    {isCorrect ? (
                      <p className="text-green-400 font-bold flex items-center gap-2">
                        <span className="text-xl">✓</span> Korrekt! Bra jobbat!
                      </p>
                    ) : (
                      <p className="text-red-400 text-sm">{errorMessage}</p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Results */}
            <div className="flex flex-col bg-black/20">
              <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between">
                <span className="text-sm font-bold text-white">Resultat</span>
                {result && !result.error && (
                  <span className="text-xs text-zinc-500 font-mono">
                    {result.rowCount} rad{result.rowCount !== 1 ? 'er' : ''} × {result.columns.length} kol
                  </span>
                )}
              </div>
              <div className="flex-1 min-h-0 overflow-auto">
                <ResultsTable result={result} isLoading={isLoading} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Answer Confirm Modal */}
      {showAnswerConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="glass-card rounded-2xl p-6 max-w-sm mx-4 border border-white/10">
            <h3 className="text-lg font-bold text-white mb-2">Visa facit?</h3>
            <p className="text-zinc-400 text-sm mb-6">
              Är du säker att du inte vill testa igen innan?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowAnswerConfirm(false)}
                className="flex-1 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-xl hover:from-cyan-400 hover:to-blue-400 transition-all"
              >
                Testa igen
              </button>
              <button
                onClick={() => {
                  setShowAnswerConfirm(false);
                  setShowAnswer(true);
                }}
                className="flex-1 py-3 glass-card text-white font-medium rounded-xl hover:border-white/20 transition-all"
              >
                Visa facit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
