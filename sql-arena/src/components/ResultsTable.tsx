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
          <div className="w-5 h-5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
          <span className="font-mono text-sm">Kör fråga...</span>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="flex items-center justify-center h-full text-zinc-500">
        <div className="text-center">
          <div className="text-3xl mb-2 opacity-50">⬡</div>
          <p className="font-mono text-sm">Kör en fråga för att se resultat</p>
          <p className="text-xs mt-1 text-zinc-600">Ctrl+Enter eller klicka Kör</p>
        </div>
      </div>
    );
  }

  if (result.error) {
    return (
      <div className="p-4">
        <div className="bg-red-950/30 border border-red-900/50 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <span className="text-red-400 text-lg">✕</span>
            <div>
              <p className="text-red-400 font-medium text-sm">SQL-fel</p>
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
        <div className="bg-green-950/30 border border-green-900/50 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <span className="text-green-400 text-lg">✓</span>
            <div>
              <p className="text-green-400 font-medium text-sm">Frågan kördes</p>
              <p className="text-zinc-400 text-xs mt-1">
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
      <div className="px-4 py-2 border-b border-zinc-800 flex items-center justify-between">
        <span className="text-xs text-zinc-500 font-mono">
          {result.rowCount} {result.rowCount === 1 ? 'rad' : 'rader'}
        </span>
        <span className="text-xs text-zinc-600 font-mono">
          {result.executionTime.toFixed(1)} ms
        </span>
      </div>
      <div className="flex-1 overflow-auto scrollbar-thin">
        <table className="result-table w-full border-collapse">
          <thead>
            <tr>
              {result.columns.map((column, index) => (
                <th
                  key={index}
                  className="px-4 py-2 text-left text-xs font-semibold text-zinc-300 border-b border-zinc-800"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {result.values.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-b border-zinc-800/50">
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className="px-4 py-2 text-sm text-zinc-300"
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
