import type { QueryResult } from '../types';

interface ResultsTableProps {
  result: QueryResult | null;
  isLoading: boolean;
}

export function ResultsTable({ result, isLoading }: ResultsTableProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="flex items-center gap-3 text-zinc-400">
          <div className="relative">
            <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-md" />
            <div className="relative w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
          </div>
          <span className="font-mono text-sm">Kör fråga...</span>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="flex items-center justify-center h-full text-zinc-500">
        <div className="text-center">
          <svg viewBox="0 0 64 64" className="w-12 h-12 text-zinc-700 mx-auto mb-3" fill="currentColor">
            <path d="M32 4C18.7 4 8 9.4 8 16v32c0 6.6 10.7 12 24 12s24-5.4 24-12V16c0-6.6-10.7-12-24-12zm0 4c11.6 0 20 4.5 20 8s-8.4 8-20 8-20-4.5-20-8 8.4-8 20-8z" />
          </svg>
          <p className="font-medium text-sm">Kör en fråga</p>
          <p className="text-xs mt-1 text-zinc-600 font-mono">Ctrl+Enter</p>
        </div>
      </div>
    );
  }

  if (result.error) {
    return (
      <div className="p-4">
        <div className="glass-card border-l-4 border-l-red-500 p-4">
          <div className="flex items-start gap-3">
            <span className="text-red-400 text-lg">✕</span>
            <div>
              <p className="text-red-400 font-bold text-sm">SQL-fel</p>
              <p className="text-red-300/80 font-mono text-sm mt-1">{result.error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (result.columns.length === 0) {
    return (
      <div className="p-4">
        <div className="glass-card border-l-4 border-l-green-500 p-4">
          <div className="flex items-center gap-3">
            <span className="text-green-400 text-lg">✓</span>
            <div>
              <p className="text-green-400 font-bold text-sm">Frågan kördes</p>
              <p className="text-zinc-500 text-xs mt-1 font-mono">
                {result.executionTime.toFixed(1)} ms
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="px-4 py-2 border-b border-white/5 flex items-center justify-between bg-black/20">
        <span className="text-xs text-zinc-500 font-mono">
          {result.rowCount} {result.rowCount === 1 ? 'rad' : 'rader'}
        </span>
        <span className="text-xs text-cyan-400/50 font-mono">
          {result.executionTime.toFixed(1)} ms
        </span>
      </div>
      <div className="flex-1 overflow-auto scrollbar-thin">
        <table className="result-table w-full border-collapse">
          <thead>
            <tr className="bg-white/5">
              {result.columns.map((column, index) => (
                <th
                  key={index}
                  className="px-4 py-3 text-left text-xs font-bold text-cyan-400 border-b border-white/10 uppercase tracking-wide"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {result.values.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className="px-4 py-2.5 text-sm text-zinc-300 font-mono"
                  >
                    {cell === null ? (
                      <span className="text-zinc-600 italic">NULL</span>
                    ) : (
                      String(cell)
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
