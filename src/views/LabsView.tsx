import { useState, useCallback, useEffect } from 'react';
import { SqlEditor } from '../components/SqlEditor';
import { ResultsTable } from '../components/ResultsTable';
import {
  executeMultipleStatements,
  resetSandboxDatabase,
  getTableList,
  getTableSchema,
  exportDatabaseAsSql,
  createEmptyDatabase
} from '../engine/sqlRunner';
import { useEditorState } from '../state/EditorState';
import type { DatabaseType, QueryResult } from '../types';

interface LabsViewProps {
  currentDatabase: DatabaseType;
  onDatabaseChange: (db: DatabaseType) => void;
}

type LabMode = 'sandbox' | 'build' | 'learn';

export function LabsView({ currentDatabase, onDatabaseChange }: LabsViewProps) {
  const { state: editorState, setLabsQuery } = useEditorState();
  const [mode, setMode] = useState<LabMode>('sandbox');
  const [query, setQuery] = useState(editorState.labsQuery);
  const [results, setResults] = useState<QueryResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [tables, setTables] = useState<string[]>([]);
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [tableSchema, setTableSchema] = useState<{ name: string; type: string; pk: boolean }[]>([]);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [customDbName, setCustomDbName] = useState('my_database');
  const [useCustomDb, setUseCustomDb] = useState(false);
  const [exportFormat, setExportFormat] = useState<'sqlite' | 'mysql' | 'postgres'>('sqlite');
  const [showExampleModal, setShowExampleModal] = useState(false);

  // Sync query to global state for persistence
  useEffect(() => {
    setLabsQuery(query);
  }, [query, setLabsQuery]);

  const loadTables = useCallback(async () => {
    const db = useCustomDb ? 'custom' : currentDatabase;
    const tableList = await getTableList(db);
    setTables(tableList);
    if (tableList.length > 0 && !selectedTable) {
      setSelectedTable(tableList[0]);
    }
  }, [currentDatabase, useCustomDb, selectedTable]);

  const loadTableSchema = useCallback(async (tableName: string) => {
    const db = useCustomDb ? 'custom' : currentDatabase;
    const schema = await getTableSchema(tableName, db);
    setTableSchema(schema);
    setSelectedTable(tableName);
  }, [currentDatabase, useCustomDb]);

  useEffect(() => {
    loadTables();
  }, [loadTables]);

  const handleExecute = useCallback(async () => {
    if (!query.trim()) return;

    setIsLoading(true);
    const db = useCustomDb ? 'custom' : currentDatabase;
    const queryResults = await executeMultipleStatements(query, db);
    setResults(queryResults);
    setIsLoading(false);

    // Refresh tables after execution
    await loadTables();
  }, [query, currentDatabase, useCustomDb, loadTables]);

  const handleReset = async () => {
    if (useCustomDb) {
      await createEmptyDatabase();
    } else {
      await resetSandboxDatabase(currentDatabase);
    }
    setShowResetConfirm(false);
    setResults([]);
    setQuery('');
    await loadTables();
  };

  const handleExport = async () => {
    const db = useCustomDb ? 'custom' : currentDatabase;
    const sql = await exportDatabaseAsSql(db, exportFormat);

    // Create download
    const blob = new Blob([sql], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${useCustomDb ? customDbName : currentDatabase}_export.sql`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCreateNewDb = async () => {
    await createEmptyDatabase();
    setUseCustomDb(true);
    setTables([]);
    setSelectedTable(null);
    setTableSchema([]);
    setResults([]);
    setQuery('');
    setShowExampleModal(true);
  };

  // Learn mode content
  const learnContent = {
    ddl: {
      title: 'DDL - Data Definition Language',
      description: 'Kommandon för att skapa och ändra databasstrukturen (tabeller, index, etc.)',
      commands: [
        { name: 'CREATE TABLE', desc: 'Skapar en ny tabell', example: 'CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT);' },
        { name: 'ALTER TABLE', desc: 'Ändrar en tabell', example: 'ALTER TABLE users ADD COLUMN age INTEGER;' },
        { name: 'DROP TABLE', desc: 'Tar bort en tabell', example: 'DROP TABLE users;' },
        { name: 'CREATE INDEX', desc: 'Skapar ett index', example: 'CREATE INDEX idx_name ON users(name);' },
      ]
    },
    dml: {
      title: 'DML - Data Manipulation Language',
      description: 'Kommandon för att hantera data i tabeller',
      commands: [
        { name: 'INSERT', desc: 'Lägger till nya rader', example: "INSERT INTO users (name) VALUES ('Anna');" },
        { name: 'UPDATE', desc: 'Uppdaterar befintliga rader', example: "UPDATE users SET name = 'Erik' WHERE id = 1;" },
        { name: 'DELETE', desc: 'Tar bort rader', example: 'DELETE FROM users WHERE id = 1;' },
        { name: 'SELECT', desc: 'Hämtar data', example: 'SELECT * FROM users WHERE age > 18;' },
      ]
    }
  };

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-56px)]">
      {/* Header */}
      <div className="border-b border-zinc-800 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Mode selector */}
            <button
              onClick={() => setMode('sandbox')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${mode === 'sandbox'
                ? 'bg-fuchsia-500/20 text-fuchsia-400 border border-fuchsia-500/50'
                : 'bg-zinc-800 text-zinc-400 hover:text-zinc-200'
                }`}
            >
              Sandbox
            </button>
            <button
              onClick={() => setMode('build')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${mode === 'build'
                ? 'bg-green-500/20 text-green-400 border border-green-500/50'
                : 'bg-zinc-800 text-zinc-400 hover:text-zinc-200'
                }`}
            >
              Bygg Databas
            </button>
          </div>

          <div className="flex items-center gap-3">
            {mode !== 'learn' && (
              <>
                {!useCustomDb && (
                  <select
                    value={currentDatabase}
                    onChange={(e) => onDatabaseChange(e.target.value as DatabaseType)}
                    className="bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-1.5 text-sm font-medium text-zinc-200 [&>option]:bg-zinc-900 [&>option]:text-white"
                  >
                    <option value="ecommerce">E-commerce</option>
                    <option value="chinook">Chinook</option>
                    <option value="school">School</option>
                  </select>
                )}
                {useCustomDb && (
                  <span className="text-fuchsia-400 text-sm font-medium px-3 py-1.5 bg-fuchsia-500/20 rounded-lg">
                    {customDbName}
                  </span>
                )}
                <button
                  onClick={() => setShowResetConfirm(true)}
                  className="px-3 py-1.5 bg-red-900/50 text-red-400 border border-red-800 rounded-lg text-sm font-medium hover:bg-red-900/70 transition-colors"
                >
                  Återställ
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Learn Mode */}
      {mode === 'learn' && (
        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">SQL Grunderna</h1>
              <p className="text-zinc-400">Förstå de viktigaste SQL-koncepten</p>
            </div>

            {Object.entries(learnContent).map(([key, section]) => (
              <div key={key} className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
                <h2 className="text-xl font-bold text-fuchsia-400 mb-2">{section.title}</h2>
                <p className="text-zinc-400 mb-4">{section.description}</p>

                <div className="space-y-3">
                  {section.commands.map((cmd, i) => (
                    <div key={i} className="bg-zinc-800/50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-green-400 font-semibold">{cmd.name}</span>
                        <span className="text-zinc-500 text-sm">{cmd.desc}</span>
                      </div>
                      <pre className="bg-zinc-950 rounded p-3 text-sm font-mono text-zinc-300 overflow-x-auto">
                        {cmd.example}
                      </pre>
                      <button
                        onClick={() => {
                          setQuery(cmd.example);
                          setMode('sandbox');
                        }}
                        className="mt-2 text-xs text-fuchsia-400 hover:text-fuchsia-300"
                      >
                        → Testa i Sandbox
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Build Mode */}
      {mode === 'build' && (
        <div className="flex-1 flex">
          {/* Left: Controls */}
          <div className="w-80 border-r border-zinc-800 flex flex-col">
            <div className="p-4 border-b border-zinc-800">
              <h2 className="text-lg font-semibold text-white mb-4">Bygg din databas</h2>

              {!useCustomDb ? (
                <button
                  onClick={handleCreateNewDb}
                  className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-lg hover:from-green-400 hover:to-emerald-500 transition-all"
                >
                  + Skapa ny databas
                </button>
              ) : (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={customDbName}
                    onChange={(e) => setCustomDbName(e.target.value)}
                    placeholder="Databasnamn"
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white"
                  />
                  <button
                    onClick={() => setUseCustomDb(false)}
                    className="w-full py-2 text-zinc-400 hover:text-zinc-200 text-sm"
                  >
                    ← Tillbaka till fördefinierade databaser
                  </button>
                </div>
              )}
            </div>

            {/* Tables */}
            <div className="flex-1 overflow-auto p-4">
              <h3 className="text-sm font-semibold text-zinc-400 mb-3">TABELLER</h3>
              {tables.length === 0 ? (
                <p className="text-zinc-500 text-sm">Inga tabeller ännu. Skapa din första!</p>
              ) : (
                <div className="space-y-1">
                  {tables.map(table => (
                    <button
                      key={table}
                      onClick={() => loadTableSchema(table)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${selectedTable === table
                        ? 'bg-fuchsia-500/20 text-fuchsia-400'
                        : 'text-zinc-300 hover:bg-zinc-800'
                        }`}
                    >
                      {table}
                    </button>
                  ))}
                </div>
              )}

              {/* Schema */}
              {selectedTable && tableSchema.length > 0 && (
                <div className="mt-4 p-3 bg-zinc-800/50 rounded-lg">
                  <h4 className="text-xs font-semibold text-zinc-500 mb-2">KOLUMNER</h4>
                  {tableSchema.map(col => (
                    <div key={col.name} className="flex justify-between text-xs py-1">
                      <span className={`font-mono ${col.pk ? 'text-yellow-400' : 'text-zinc-300'}`}>
                        {col.pk && ''}{col.name}
                      </span>
                      <span className="text-zinc-500">{col.type}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Export */}
            <div className="p-4 border-t border-zinc-800">
              <h3 className="text-sm font-semibold text-zinc-400 mb-3">EXPORTERA</h3>
              <div className="flex gap-2 mb-3">
                {(['sqlite', 'mysql', 'postgres'] as const).map(fmt => (
                  <button
                    key={fmt}
                    onClick={() => setExportFormat(fmt)}
                    className={`flex-1 py-1.5 text-xs rounded ${exportFormat === fmt
                      ? 'bg-fuchsia-500/20 text-fuchsia-400 border border-fuchsia-500/50'
                      : 'bg-zinc-800 text-zinc-400'
                      }`}
                  >
                    {fmt.toUpperCase()}
                  </button>
                ))}
              </div>
              <button
                onClick={handleExport}
                disabled={tables.length === 0}
                className="w-full py-2 bg-zinc-700 text-white rounded-lg hover:bg-zinc-600 disabled:opacity-50 text-sm"
              >
                ⬇ Ladda ner .sql
              </button>
            </div>
          </div>

          {/* Right: Editor and Results */}
          <div className="flex-1 flex flex-col">
            <div className="flex-1 flex flex-col">
              <SqlEditor value={query} onChange={setQuery} onExecute={handleExecute} />

              <div className="p-3 border-t border-zinc-800 flex items-center gap-3">
                <button
                  onClick={handleExecute}
                  disabled={isLoading || !query.trim()}
                  className="flex-1 py-2 bg-fuchsia-500 text-zinc-950 font-semibold rounded-lg hover:bg-fuchsia-400 disabled:opacity-50 transition-colors"
                >
                  {isLoading ? 'Kör...' : 'Kör (Ctrl+Enter)'}
                </button>

                {/* Result indicator */}
                {results.length > 0 && (
                  <div className={`px-3 py-2 rounded-lg text-sm font-medium ${results.some(r => r.error)
                    ? 'bg-red-500/20 text-red-400'
                    : 'bg-green-500/20 text-green-400'
                    }`}>
                    {results.some(r => r.error)
                      ? `❌ ${results.filter(r => r.error).length} fel`
                      : `✓ ${results.length} queries OK`}
                  </div>
                )}
              </div>
            </div>

            {/* Results */}
            <div className="h-64 border-t border-zinc-800 overflow-auto">
              {results.length > 0 ? (
                <div className="p-4 space-y-3">
                  {results.map((res, i) => (
                    <div key={i} className={`rounded-lg border ${res.error ? 'border-red-500/50 bg-red-500/10' : 'border-green-500/50 bg-green-500/10'
                      } p-3`}>
                      {res.error ? (
                        <div className="text-red-400 text-sm">
                          <span className="font-semibold">❌ Fel:</span> {res.error}
                        </div>
                      ) : (
                        <div>
                          <div className="text-green-400 text-sm mb-2">
                            ✓ OK{res.rowCount > 0 ? ` — ${res.rowCount} rad${res.rowCount > 1 ? 'er' : ''}, ${res.columns.length} kolumn${res.columns.length > 1 ? 'er' : ''}` : ''}
                          </div>
                          {res.columns.length > 0 && res.values.length > 0 && (
                            <div className="overflow-auto max-h-32">
                              <ResultsTable result={res} isLoading={false} />
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-zinc-500">
                  Skriv SQL ovan och klicka Kör för att se resultat
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Sandbox Mode */}
      {mode === 'sandbox' && (
        <div className="flex-1 flex">
          {/* Left: Tables */}
          <div className="w-64 border-r border-zinc-800 flex flex-col">
            <div className="p-4 border-b border-zinc-800">
              <button
                onClick={loadTables}
                className="w-full py-2 bg-fuchsia-500/20 text-fuchsia-400 border border-fuchsia-500/50 rounded-lg text-sm font-medium hover:bg-fuchsia-500/30"
              >
                🔄 Ladda tabeller
              </button>
            </div>

            <div className="flex-1 overflow-auto p-3">
              <h3 className="text-xs font-semibold text-zinc-500 uppercase mb-2">Tabeller</h3>
              {tables.map(table => (
                <button
                  key={table}
                  onClick={() => loadTableSchema(table)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${selectedTable === table
                    ? 'bg-fuchsia-500/20 text-fuchsia-400'
                    : 'text-zinc-300 hover:bg-zinc-800'
                    }`}
                >
                  {table}
                </button>
              ))}
            </div>

            {selectedTable && tableSchema.length > 0 && (
              <div className="p-3 border-t border-zinc-800">
                <h4 className="text-xs font-semibold text-zinc-500 mb-2">{selectedTable}</h4>
                {tableSchema.map(col => (
                  <div key={col.name} className="flex justify-between text-xs py-1">
                    <span className="font-mono text-zinc-300">{col.name}</span>
                    <span className="text-zinc-500">{col.type}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right: Editor + Results */}
          <div className="flex-1 flex flex-col">
            <div className="flex-1">
              <SqlEditor value={query} onChange={setQuery} onExecute={handleExecute} />
            </div>

            <div className="p-3 border-t border-zinc-800 flex items-center gap-3">
              <button
                onClick={handleExecute}
                disabled={isLoading || !query.trim()}
                className="flex-1 py-2 bg-fuchsia-500 text-zinc-950 font-semibold rounded-lg hover:bg-fuchsia-400 disabled:opacity-50"
              >
                {isLoading ? 'Kör...' : 'Kör (Ctrl+Enter)'}
              </button>

              {results.length > 0 && (
                <div className={`px-3 py-2 rounded-lg text-sm font-medium ${results.some(r => r.error)
                  ? 'bg-red-500/20 text-red-400'
                  : 'bg-green-500/20 text-green-400'
                  }`}>
                  {results.some(r => r.error) ? '❌ Fel' : '✓ OK'}
                </div>
              )}
            </div>

            <div className="h-64 border-t border-zinc-800 overflow-auto">
              {results.length > 0 && (
                <div className="p-4 space-y-3">
                  {results.map((res, i) => (
                    <div key={i}>
                      {res.error ? (
                        <div className="text-red-400 text-sm p-3 bg-red-500/10 rounded-lg">
                          ❌ {res.error}
                        </div>
                      ) : (
                        <ResultsTable result={res} isLoading={false} />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Reset Confirm Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-6 max-w-sm">
            <h3 className="text-lg font-semibold text-white mb-2">Återställ databas?</h3>
            <p className="text-zinc-400 text-sm mb-4">
              {useCustomDb
                ? 'Detta tar bort all data i din skapade databas.'
                : 'Detta återställer databasen till ursprungligt skick.'}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 py-2 bg-zinc-700 text-white rounded-lg"
              >
                Avbryt
              </button>
              <button
                onClick={handleReset}
                className="flex-1 py-2 bg-red-600 text-white rounded-lg"
              >
                Återställ
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Example Modal - visas efter att man skapar ny databas */}
      {showExampleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-6 max-w-lg">
            <h3 className="text-lg font-semibold text-white mb-2">Tom databas skapad!</h3>
            <p className="text-zinc-400 text-sm mb-4">
              Du har nu en tom databas. Börja med att skapa tabeller med CREATE TABLE.
            </p>

            <div className="bg-zinc-800 rounded-lg p-4 mb-4">
              <p className="text-xs text-zinc-500 mb-2">Exempel på hur du skapar en tabell:</p>
              <pre className="text-sm font-mono text-green-400 whitespace-pre-wrap">{`CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE
);`}</pre>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowExampleModal(false)}
                className="flex-1 py-2 bg-zinc-700 text-white rounded-lg hover:bg-zinc-600"
              >
                Börja från tom
              </button>
              <button
                onClick={() => {
                  setQuery(`-- Skapa en tabell
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE
);

-- Lägg till data
INSERT INTO users (name, email) VALUES ('Anna', 'anna@example.com');

-- Visa data
SELECT * FROM users;`);
                  setShowExampleModal(false);
                }}
                className="flex-1 py-2 bg-fuchsia-500 text-zinc-950 font-semibold rounded-lg hover:bg-fuchsia-400"
              >
                Använd exempel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
