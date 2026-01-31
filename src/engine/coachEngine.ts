import type { DiagnosticResult, Exercise } from '../types';

interface DiagnosticRule {
  id: string;
  label: string;
  check: (query: string, exercise?: Exercise) => DiagnosticResult | null;
}

const diagnosticRules: DiagnosticRule[] = [
  {
    id: 'missing-select',
    label: 'Saknar SELECT',
    check: (query: string) => {
      const normalized = query.trim().toUpperCase();
      if (!normalized.startsWith('SELECT') &&
          !normalized.startsWith('INSERT') &&
          !normalized.startsWith('UPDATE') &&
          !normalized.startsWith('DELETE') &&
          !normalized.startsWith('CREATE') &&
          !normalized.startsWith('ALTER') &&
          !normalized.startsWith('DROP') &&
          !normalized.startsWith('EXPLAIN') &&
          !normalized.startsWith('PRAGMA')) {
        return {
          passed: false,
          label: 'Saknar SELECT',
          message: 'Din fråga behöver börja med SELECT för att hämta data.',
          severity: 'error',
          ruleId: 'missing-select'
        };
      }
      return null;
    }
  },
  {
    id: 'missing-from',
    label: 'Saknar FROM',
    check: (query: string) => {
      const normalized = query.trim().toUpperCase();
      if (normalized.startsWith('SELECT') && !normalized.includes('FROM')) {
        return {
          passed: false,
          label: 'Saknar FROM',
          message: 'Lägg till FROM följt av tabellnamnet du vill hämta data från.',
          severity: 'error',
          ruleId: 'missing-from'
        };
      }
      return null;
    }
  },
  {
    id: 'missing-where',
    label: 'WHERE krävs',
    check: (query: string, exercise?: Exercise) => {
      if (!exercise) return null;
      const normalized = query.trim().toUpperCase();

      const needsWhere = exercise.category === 'where' ||
        exercise.brief.toLowerCase().includes('filter') ||
        exercise.brief.toLowerCase().includes('hitta') ||
        exercise.brief.toLowerCase().includes('visa') && exercise.brief.toLowerCase().includes('som');

      if (needsWhere && normalized.startsWith('SELECT') && !normalized.includes('WHERE')) {
        return {
          passed: false,
          label: 'WHERE krävs',
          message: 'Uppgiften kräver filtrering. Lägg till WHERE-sats för att begränsa resultatet.',
          severity: 'warning',
          ruleId: 'missing-where'
        };
      }
      return null;
    }
  },
  {
    id: 'join-missing-on',
    label: 'JOIN saknar ON',
    check: (query: string) => {
      const normalized = query.trim().toUpperCase();
      const hasJoin = normalized.includes(' JOIN ');
      const hasOn = normalized.includes(' ON ');

      if (hasJoin && !hasOn) {
        return {
          passed: false,
          label: 'JOIN saknar ON',
          message: 'En JOIN behöver en ON-sats för att specificera hur tabellerna kopplas.',
          severity: 'error',
          ruleId: 'join-missing-on'
        };
      }
      return null;
    }
  },
  {
    id: 'aggregate-without-group',
    label: 'Aggregat utan GROUP BY',
    check: (query: string) => {
      const normalized = query.trim().toUpperCase();
      const hasAggregate = /\b(COUNT|SUM|AVG|MAX|MIN)\s*\(/i.test(query);
      const hasGroupBy = normalized.includes('GROUP BY');
      const hasNonAggregateColumns = /SELECT\s+(?!.*\bCOUNT\b|\bSUM\b|\bAVG\b|\bMAX\b|\bMIN\b)[a-z_]+\s*,/i.test(query);

      if (hasAggregate && hasNonAggregateColumns && !hasGroupBy) {
        return {
          passed: false,
          label: 'Aggregat utan GROUP BY',
          message: 'Du har både vanliga kolumner och aggregatfunktioner. Lägg till GROUP BY.',
          severity: 'error',
          ruleId: 'aggregate-without-group'
        };
      }
      return null;
    }
  },
  {
    id: 'having-without-group',
    label: 'HAVING utan GROUP BY',
    check: (query: string) => {
      const normalized = query.trim().toUpperCase();
      if (normalized.includes('HAVING') && !normalized.includes('GROUP BY')) {
        return {
          passed: false,
          label: 'HAVING utan GROUP BY',
          message: 'HAVING kan bara användas tillsammans med GROUP BY.',
          severity: 'error',
          ruleId: 'having-without-group'
        };
      }
      return null;
    }
  },
  {
    id: 'wrong-clause-order',
    label: 'Fel klausulordning',
    check: (query: string) => {
      const normalized = query.trim().toUpperCase();
      const clauses = ['SELECT', 'FROM', 'WHERE', 'GROUP BY', 'HAVING', 'ORDER BY', 'LIMIT'];
      const positions: number[] = [];

      for (const clause of clauses) {
        const pos = normalized.indexOf(clause);
        if (pos !== -1) {
          positions.push(pos);
        }
      }

      for (let i = 1; i < positions.length; i++) {
        if (positions[i] < positions[i - 1]) {
          return {
            passed: false,
            label: 'Fel klausulordning',
            message: 'Klausulerna måste komma i ordningen: SELECT, FROM, WHERE, GROUP BY, HAVING, ORDER BY, LIMIT.',
            severity: 'error',
            ruleId: 'wrong-clause-order'
          };
        }
      }
      return null;
    }
  },
  {
    id: 'unknown-column-hint',
    label: 'Kontrollera kolumnnamn',
    check: (query: string) => {
      const normalized = query.trim().toUpperCase();
      if (normalized.includes('SELECT *')) {
        return null;
      }

      const commonMisspellings: Record<string, string> = {
        'PRODCUT': 'product',
        'CUSOTMER': 'customer',
        'ODER': 'order',
        'CATEGROY': 'category',
        'QUANTIY': 'quantity',
        'PIRCE': 'price',
        'NAEM': 'name'
      };

      for (const [wrong, correct] of Object.entries(commonMisspellings)) {
        if (normalized.includes(wrong)) {
          return {
            passed: false,
            label: 'Kontrollera kolumnnamn',
            message: `Du har skrivit "${wrong.toLowerCase()}" - menade du "${correct}"?`,
            severity: 'warning',
            ruleId: 'unknown-column-hint'
          };
        }
      }
      return null;
    }
  },
  {
    id: 'select-star-warning',
    label: 'SELECT * otillåtet',
    check: (query: string, exercise?: Exercise) => {
      if (!exercise) return null;
      const normalized = query.trim().toUpperCase();

      if (normalized.includes('SELECT *') && exercise.expectedColumns &&
          exercise.expectedColumns.length > 0 &&
          !exercise.expectedColumns.includes('*')) {
        return {
          passed: false,
          label: 'SELECT * otillåtet',
          message: 'Uppgiften kräver specifika kolumner. Ange kolumnnamnen explicit.',
          severity: 'warning',
          ruleId: 'select-star-warning'
        };
      }
      return null;
    }
  },
  {
    id: 'missing-alias',
    label: 'Alias saknas',
    check: (query: string) => {
      const normalized = query.trim().toUpperCase();
      const hasAggregate = /\b(COUNT|SUM|AVG|MAX|MIN)\s*\(/i.test(query);

      if (hasAggregate && !normalized.includes(' AS ')) {
        return {
          passed: false,
          label: 'Alias saknas',
          message: 'Ge dina aggregerade kolumner tydliga namn med AS.',
          severity: 'info',
          ruleId: 'missing-alias'
        };
      }
      return null;
    }
  },
  {
    id: 'destructive-arena-drop',
    label: 'DROP blockerat',
    check: (query: string) => {
      const normalized = query.trim().toUpperCase();
      if (normalized.startsWith('DROP')) {
        return {
          passed: false,
          label: 'DROP blockerat',
          message: 'DROP-satser är inte tillåtna i Arena. Använd Sandbox Lab för DDL-övningar.',
          severity: 'error',
          ruleId: 'destructive-arena-drop'
        };
      }
      return null;
    }
  },
  {
    id: 'destructive-arena-delete',
    label: 'DELETE utan WHERE',
    check: (query: string) => {
      const normalized = query.trim().toUpperCase();
      if (normalized.startsWith('DELETE') && !normalized.includes('WHERE')) {
        return {
          passed: false,
          label: 'DELETE utan WHERE',
          message: 'DELETE utan WHERE skulle radera alla rader. Detta är blockerat.',
          severity: 'error',
          ruleId: 'destructive-arena-delete'
        };
      }
      return null;
    }
  },
  {
    id: 'destructive-arena-alter',
    label: 'ALTER blockerat',
    check: (query: string) => {
      const normalized = query.trim().toUpperCase();
      if (normalized.startsWith('ALTER')) {
        return {
          passed: false,
          label: 'ALTER blockerat',
          message: 'ALTER-satser är inte tillåtna i Arena. Använd Sandbox Lab.',
          severity: 'error',
          ruleId: 'destructive-arena-alter'
        };
      }
      return null;
    }
  },
  {
    id: 'semicolon-reminder',
    label: 'Semikolon saknas',
    check: (query: string) => {
      const trimmed = query.trim();
      if (trimmed.length > 0 && !trimmed.endsWith(';')) {
        return {
          passed: true,
          label: 'Semikolon saknas',
          message: 'Tips: Avsluta dina SQL-satser med semikolon för tydlighet.',
          severity: 'info',
          ruleId: 'semicolon-reminder'
        };
      }
      return null;
    }
  },
  {
    id: 'string-quotes',
    label: 'Felaktiga citattecken',
    check: (query: string) => {
      if (query.includes('"') && !query.includes("'")) {
        const hasTextComparison = /WHERE\s+\w+\s*=\s*"/i.test(query) ||
                                   /LIKE\s*"/i.test(query);
        if (hasTextComparison) {
          return {
            passed: false,
            label: 'Felaktiga citattecken',
            message: 'SQL använder enkla citattecken för textvärden. Använd \'text\' istället för "text".',
            severity: 'warning',
            ruleId: 'string-quotes'
          };
        }
      }
      return null;
    }
  },
  {
    id: 'missing-comparison-value',
    label: 'Saknar jämförelsevärde',
    check: (query: string) => {
      const incompleteComparison = /WHERE\s+\w+\s*[=<>!]+\s*$/i.test(query.trim()) ||
                                    /WHERE\s+\w+\s*[=<>!]+\s*;?\s*$/i.test(query.trim());
      if (incompleteComparison) {
        return {
          passed: false,
          label: 'Saknar jämförelsevärde',
          message: 'Din WHERE-sats saknar ett värde att jämföra med.',
          severity: 'error',
          ruleId: 'missing-comparison-value'
        };
      }
      return null;
    }
  }
];

export function runDiagnostics(query: string, exercise?: Exercise, isArenaMode: boolean = true): DiagnosticResult[] {
  const results: DiagnosticResult[] = [];
  const trimmedQuery = query.trim();

  if (trimmedQuery.length === 0) {
    return [];
  }

  for (const rule of diagnosticRules) {
    if (!isArenaMode && rule.id.startsWith('destructive-arena')) {
      continue;
    }

    const result = rule.check(trimmedQuery, exercise);
    if (result) {
      results.push(result);
    }
  }

  return results;
}

export function hasBlockingErrors(diagnostics: DiagnosticResult[]): boolean {
  return diagnostics.some(d => d.severity === 'error' && !d.passed);
}

export function getFirstBlockingError(diagnostics: DiagnosticResult[]): DiagnosticResult | undefined {
  return diagnostics.find(d => d.severity === 'error' && !d.passed);
}

export function validateQueryResult(
  result: { columns: string[]; values: unknown[][]; rowCount: number },
  exercise: Exercise
): { valid: boolean; message: string } {
  if (exercise.expectedColumns && exercise.expectedColumns.length > 0) {
    const normalizedResultColumns = result.columns.map(c => c.toLowerCase());
    const normalizedExpectedColumns = exercise.expectedColumns.map(c => c.toLowerCase());

    for (const expected of normalizedExpectedColumns) {
      if (!normalizedResultColumns.includes(expected)) {
        const matchingColumn = normalizedResultColumns.find(col =>
          col.includes(expected) || expected.includes(col)
        );

        if (!matchingColumn) {
          return {
            valid: false,
            message: `Resultatet saknar kolumnen: ${expected}`
          };
        }
      }
    }
  }

  if (exercise.expectedRowCount !== undefined) {
    if (result.rowCount !== exercise.expectedRowCount) {
      return {
        valid: false,
        message: `Förväntat ${exercise.expectedRowCount} rader, fick ${result.rowCount}`
      };
    }
  }

  return { valid: true, message: 'Korrekt!' };
}

export function getHintForExercise(exercise: Exercise, attemptCount: number): string | null {
  if (exercise.hints.length === 0) return null;

  if (exercise.difficulty === 'boss') {
    return null;
  }

  const hintIndex = Math.min(attemptCount - 1, exercise.hints.length - 1);
  if (attemptCount > 0 && hintIndex >= 0) {
    return exercise.hints[hintIndex];
  }

  return null;
}
