import type { DiagnosticResult } from '../types';

interface DiagnosticsPanelProps {
  diagnostics: DiagnosticResult[];
  hint: string | null;
  validationMessage: string | null;
  isCorrect: boolean;
}

export function DiagnosticsPanel({ diagnostics, hint, validationMessage, isCorrect }: DiagnosticsPanelProps) {
  const errors = diagnostics.filter(d => d.severity === 'error' && !d.passed);
  const warnings = diagnostics.filter(d => d.severity === 'warning');
  const infos = diagnostics.filter(d => d.severity === 'info');

  if (isCorrect) {
    return (
      <div className="p-3 bg-green-950/30 border border-green-900/50 rounded-lg animate-slide-up">
        <div className="flex items-center gap-2">
          <span className="text-green-400 text-lg">✓</span>
          <span className="text-green-400 font-medium text-sm">Korrekt!</span>
        </div>
      </div>
    );
  }

  if (errors.length === 0 && warnings.length === 0 && !hint && !validationMessage) {
    return null;
  }

  return (
    <div className="space-y-2 animate-slide-up">
      {errors.map((error, index) => (
        <div
          key={`error-${index}`}
          className="p-3 bg-red-950/30 border border-red-900/50 rounded-lg"
        >
          <div className="flex items-start gap-2">
            <span className="text-red-400 font-semibold text-xs uppercase tracking-wide">
              {error.label}
            </span>
          </div>
          <p className="text-red-300/80 text-sm mt-1">{error.message}</p>
        </div>
      ))}

      {warnings.map((warning, index) => (
        <div
          key={`warning-${index}`}
          className="p-3 bg-yellow-950/30 border border-yellow-900/50 rounded-lg"
        >
          <div className="flex items-start gap-2">
            <span className="text-yellow-400 font-semibold text-xs uppercase tracking-wide">
              {warning.label}
            </span>
          </div>
          <p className="text-yellow-300/80 text-sm mt-1">{warning.message}</p>
        </div>
      ))}

      {validationMessage && !isCorrect && (
        <div className="p-3 bg-orange-950/30 border border-orange-900/50 rounded-lg">
          <div className="flex items-start gap-2">
            <span className="text-orange-400 font-semibold text-xs uppercase tracking-wide">
              Resultat
            </span>
          </div>
          <p className="text-orange-300/80 text-sm mt-1">{validationMessage}</p>
        </div>
      )}

      {hint && (
        <div className="p-3 bg-blue-950/30 border border-blue-900/50 rounded-lg">
          <div className="flex items-start gap-2">
            <span className="text-blue-400 font-semibold text-xs uppercase tracking-wide">
              Tips
            </span>
          </div>
          <p className="text-blue-300/80 text-sm mt-1">{hint}</p>
        </div>
      )}

      {infos.map((info, index) => (
        <div
          key={`info-${index}`}
          className="p-3 bg-zinc-800/50 border border-zinc-700/50 rounded-lg"
        >
          <div className="flex items-start gap-2">
            <span className="text-zinc-400 font-semibold text-xs uppercase tracking-wide">
              {info.label}
            </span>
          </div>
          <p className="text-zinc-400 text-sm mt-1">{info.message}</p>
        </div>
      ))}
    </div>
  );
}
