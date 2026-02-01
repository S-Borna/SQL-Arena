import { useState, useCallback } from 'react';
import type { NormalizationExercise, TableDefinition } from '../types';

interface DesignStudioViewProps {}

const normalizationExercises: NormalizationExercise[] = [
  {
    id: 'norm-001',
    title: '1NF: Uppdelning av sammansatta värden',
    description: 'Denna tabell bryter mot 1NF genom att ha flera värden i en cell. Din uppgift är att normalisera den till 1NF.',
    initialTable: {
      name: 'student_courses_raw',
      columns: [
        { name: 'student_id', type: 'INTEGER', nullable: false },
        { name: 'student_name', type: 'TEXT', nullable: false },
        { name: 'courses', type: 'TEXT', nullable: false }
      ],
      primaryKey: ['student_id'],
      foreignKeys: [],
      sampleData: [
        { student_id: 1, student_name: 'Anna', courses: 'Matematik, Fysik, Kemi' },
        { student_id: 2, student_name: 'Erik', courses: 'Matematik, Historia' },
        { student_id: 3, student_name: 'Sara', courses: 'Fysik, Biologi, Kemi' }
      ]
    },
    targetForm: '1NF',
    expectedTables: [
      {
        name: 'students',
        columns: [
          { name: 'student_id', type: 'INTEGER', nullable: false },
          { name: 'student_name', type: 'TEXT', nullable: false }
        ],
        primaryKey: ['student_id'],
        foreignKeys: [],
        sampleData: []
      },
      {
        name: 'student_courses',
        columns: [
          { name: 'student_id', type: 'INTEGER', nullable: false },
          { name: 'course_name', type: 'TEXT', nullable: false }
        ],
        primaryKey: ['student_id', 'course_name'],
        foreignKeys: [{ column: 'student_id', references: { table: 'students', column: 'student_id' } }],
        sampleData: []
      }
    ],
    courseGoals: [7, 12]
  },
  {
    id: 'norm-002',
    title: '1NF: Ta bort upprepande grupper',
    description: 'Denna tabell har upprepande kolumner för samma typ av data. Normalisera till 1NF.',
    initialTable: {
      name: 'orders_raw',
      columns: [
        { name: 'order_id', type: 'INTEGER', nullable: false },
        { name: 'customer_name', type: 'TEXT', nullable: false },
        { name: 'product1', type: 'TEXT', nullable: true },
        { name: 'product2', type: 'TEXT', nullable: true },
        { name: 'product3', type: 'TEXT', nullable: true }
      ],
      primaryKey: ['order_id'],
      foreignKeys: [],
      sampleData: [
        { order_id: 1, customer_name: 'Johan', product1: 'Laptop', product2: 'Mus', product3: null },
        { order_id: 2, customer_name: 'Lisa', product1: 'Tangentbord', product2: null, product3: null },
        { order_id: 3, customer_name: 'Kalle', product1: 'Skärm', product2: 'Mus', product3: 'Headset' }
      ]
    },
    targetForm: '1NF',
    expectedTables: [
      {
        name: 'orders',
        columns: [
          { name: 'order_id', type: 'INTEGER', nullable: false },
          { name: 'customer_name', type: 'TEXT', nullable: false }
        ],
        primaryKey: ['order_id'],
        foreignKeys: [],
        sampleData: []
      },
      {
        name: 'order_products',
        columns: [
          { name: 'order_id', type: 'INTEGER', nullable: false },
          { name: 'product_name', type: 'TEXT', nullable: false }
        ],
        primaryKey: ['order_id', 'product_name'],
        foreignKeys: [{ column: 'order_id', references: { table: 'orders', column: 'order_id' } }],
        sampleData: []
      }
    ],
    courseGoals: [7, 12]
  },
  {
    id: 'norm-003',
    title: '2NF: Partiella beroenden',
    description: 'Denna tabell är i 1NF men har partiella beroenden. Normalisera till 2NF.',
    initialTable: {
      name: 'order_items_raw',
      columns: [
        { name: 'order_id', type: 'INTEGER', nullable: false },
        { name: 'product_id', type: 'INTEGER', nullable: false },
        { name: 'product_name', type: 'TEXT', nullable: false },
        { name: 'product_category', type: 'TEXT', nullable: false },
        { name: 'quantity', type: 'INTEGER', nullable: false },
        { name: 'unit_price', type: 'REAL', nullable: false }
      ],
      primaryKey: ['order_id', 'product_id'],
      foreignKeys: [],
      sampleData: [
        { order_id: 1, product_id: 101, product_name: 'Laptop', product_category: 'Electronics', quantity: 1, unit_price: 12999 },
        { order_id: 1, product_id: 102, product_name: 'Mus', product_category: 'Electronics', quantity: 2, unit_price: 299 },
        { order_id: 2, product_id: 101, product_name: 'Laptop', product_category: 'Electronics', quantity: 1, unit_price: 12999 }
      ]
    },
    targetForm: '2NF',
    expectedTables: [
      {
        name: 'products',
        columns: [
          { name: 'product_id', type: 'INTEGER', nullable: false },
          { name: 'product_name', type: 'TEXT', nullable: false },
          { name: 'product_category', type: 'TEXT', nullable: false }
        ],
        primaryKey: ['product_id'],
        foreignKeys: [],
        sampleData: []
      },
      {
        name: 'order_items',
        columns: [
          { name: 'order_id', type: 'INTEGER', nullable: false },
          { name: 'product_id', type: 'INTEGER', nullable: false },
          { name: 'quantity', type: 'INTEGER', nullable: false },
          { name: 'unit_price', type: 'REAL', nullable: false }
        ],
        primaryKey: ['order_id', 'product_id'],
        foreignKeys: [{ column: 'product_id', references: { table: 'products', column: 'product_id' } }],
        sampleData: []
      }
    ],
    courseGoals: [7, 12]
  },
  {
    id: 'norm-004',
    title: '2NF: Kursinformation',
    description: 'En tabell med kursinformation som har partiella beroenden. Normalisera till 2NF.',
    initialTable: {
      name: 'enrollments_raw',
      columns: [
        { name: 'student_id', type: 'INTEGER', nullable: false },
        { name: 'course_id', type: 'INTEGER', nullable: false },
        { name: 'course_name', type: 'TEXT', nullable: false },
        { name: 'instructor', type: 'TEXT', nullable: false },
        { name: 'enrollment_date', type: 'TEXT', nullable: false },
        { name: 'grade', type: 'TEXT', nullable: true }
      ],
      primaryKey: ['student_id', 'course_id'],
      foreignKeys: [],
      sampleData: [
        { student_id: 1, course_id: 101, course_name: 'SQL Basics', instructor: 'Anna', enrollment_date: '2024-01-15', grade: 'A' },
        { student_id: 2, course_id: 101, course_name: 'SQL Basics', instructor: 'Anna', enrollment_date: '2024-01-16', grade: 'B' },
        { student_id: 1, course_id: 102, course_name: 'Advanced SQL', instructor: 'Erik', enrollment_date: '2024-02-01', grade: null }
      ]
    },
    targetForm: '2NF',
    expectedTables: [
      {
        name: 'courses',
        columns: [
          { name: 'course_id', type: 'INTEGER', nullable: false },
          { name: 'course_name', type: 'TEXT', nullable: false },
          { name: 'instructor', type: 'TEXT', nullable: false }
        ],
        primaryKey: ['course_id'],
        foreignKeys: [],
        sampleData: []
      },
      {
        name: 'enrollments',
        columns: [
          { name: 'student_id', type: 'INTEGER', nullable: false },
          { name: 'course_id', type: 'INTEGER', nullable: false },
          { name: 'enrollment_date', type: 'TEXT', nullable: false },
          { name: 'grade', type: 'TEXT', nullable: true }
        ],
        primaryKey: ['student_id', 'course_id'],
        foreignKeys: [{ column: 'course_id', references: { table: 'courses', column: 'course_id' } }],
        sampleData: []
      }
    ],
    courseGoals: [7, 12]
  },
  {
    id: 'norm-005',
    title: '3NF: Transitiva beroenden',
    description: 'Denna tabell är i 2NF men har transitiva beroenden. Normalisera till 3NF.',
    initialTable: {
      name: 'employees_raw',
      columns: [
        { name: 'employee_id', type: 'INTEGER', nullable: false },
        { name: 'employee_name', type: 'TEXT', nullable: false },
        { name: 'department_id', type: 'INTEGER', nullable: false },
        { name: 'department_name', type: 'TEXT', nullable: false },
        { name: 'department_location', type: 'TEXT', nullable: false }
      ],
      primaryKey: ['employee_id'],
      foreignKeys: [],
      sampleData: [
        { employee_id: 1, employee_name: 'Anna', department_id: 10, department_name: 'IT', department_location: 'Stockholm' },
        { employee_id: 2, employee_name: 'Erik', department_id: 10, department_name: 'IT', department_location: 'Stockholm' },
        { employee_id: 3, employee_name: 'Sara', department_id: 20, department_name: 'HR', department_location: 'Göteborg' }
      ]
    },
    targetForm: '3NF',
    expectedTables: [
      {
        name: 'departments',
        columns: [
          { name: 'department_id', type: 'INTEGER', nullable: false },
          { name: 'department_name', type: 'TEXT', nullable: false },
          { name: 'department_location', type: 'TEXT', nullable: false }
        ],
        primaryKey: ['department_id'],
        foreignKeys: [],
        sampleData: []
      },
      {
        name: 'employees',
        columns: [
          { name: 'employee_id', type: 'INTEGER', nullable: false },
          { name: 'employee_name', type: 'TEXT', nullable: false },
          { name: 'department_id', type: 'INTEGER', nullable: false }
        ],
        primaryKey: ['employee_id'],
        foreignKeys: [{ column: 'department_id', references: { table: 'departments', column: 'department_id' } }],
        sampleData: []
      }
    ],
    courseGoals: [7, 12, 13]
  },
  {
    id: 'norm-006',
    title: 'Many-to-Many: Kopplingstabell',
    description: 'Designa en many-to-many relation mellan författare och böcker med kopplingstabell.',
    initialTable: {
      name: 'books_authors_raw',
      columns: [
        { name: 'book_title', type: 'TEXT', nullable: false },
        { name: 'isbn', type: 'TEXT', nullable: false },
        { name: 'authors', type: 'TEXT', nullable: false },
        { name: 'publisher', type: 'TEXT', nullable: false }
      ],
      primaryKey: ['isbn'],
      foreignKeys: [],
      sampleData: [
        { book_title: 'SQL Mastery', isbn: '123-456', authors: 'Anna Svensson, Erik Berg', publisher: 'TechBooks' },
        { book_title: 'Database Design', isbn: '789-012', authors: 'Anna Svensson', publisher: 'TechBooks' },
        { book_title: 'Python Programming', isbn: '345-678', authors: 'Erik Berg, Sara Holm', publisher: 'CodePress' }
      ]
    },
    targetForm: '3NF',
    expectedTables: [
      {
        name: 'books',
        columns: [
          { name: 'isbn', type: 'TEXT', nullable: false },
          { name: 'book_title', type: 'TEXT', nullable: false },
          { name: 'publisher', type: 'TEXT', nullable: false }
        ],
        primaryKey: ['isbn'],
        foreignKeys: [],
        sampleData: []
      },
      {
        name: 'authors',
        columns: [
          { name: 'author_id', type: 'INTEGER', nullable: false },
          { name: 'author_name', type: 'TEXT', nullable: false }
        ],
        primaryKey: ['author_id'],
        foreignKeys: [],
        sampleData: []
      },
      {
        name: 'book_authors',
        columns: [
          { name: 'isbn', type: 'TEXT', nullable: false },
          { name: 'author_id', type: 'INTEGER', nullable: false }
        ],
        primaryKey: ['isbn', 'author_id'],
        foreignKeys: [
          { column: 'isbn', references: { table: 'books', column: 'isbn' } },
          { column: 'author_id', references: { table: 'authors', column: 'author_id' } }
        ],
        sampleData: []
      }
    ],
    courseGoals: [5, 7, 12, 13]
  }
];

interface UserTable {
  name: string;
  columns: { name: string; type: string; isPK: boolean; isFK: boolean; fkRef?: string }[];
}

export function DesignStudioView({}: DesignStudioViewProps) {
  const [selectedExercise, setSelectedExercise] = useState<NormalizationExercise>(normalizationExercises[0]);
  const [userTables, setUserTables] = useState<UserTable[]>([]);
  const [newTableName, setNewTableName] = useState('');
  const [motivation, setMotivation] = useState('');
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);

  const addTable = useCallback(() => {
    if (!newTableName.trim()) return;
    setUserTables(prev => [...prev, { name: newTableName.trim().toLowerCase(), columns: [] }]);
    setNewTableName('');
  }, [newTableName]);

  const removeTable = useCallback((tableName: string) => {
    setUserTables(prev => prev.filter(t => t.name !== tableName));
  }, []);

  const addColumn = useCallback((tableName: string, columnName: string, columnType: string, isPK: boolean, isFK: boolean, fkRef?: string) => {
    setUserTables(prev => prev.map(t => {
      if (t.name === tableName) {
        return {
          ...t,
          columns: [...t.columns, { name: columnName, type: columnType, isPK, isFK, fkRef }]
        };
      }
      return t;
    }));
  }, []);

  const removeColumn = useCallback((tableName: string, columnName: string) => {
    setUserTables(prev => prev.map(t => {
      if (t.name === tableName) {
        return {
          ...t,
          columns: t.columns.filter(c => c.name !== columnName)
        };
      }
      return t;
    }));
  }, []);

  const validateDesign = useCallback(() => {
    const expected = selectedExercise.expectedTables;
    const errors: string[] = [];

    if (userTables.length !== expected.length) {
      errors.push(`Förväntat ${expected.length} tabeller, du har ${userTables.length}`);
    }

    for (const exp of expected) {
      const userTable = userTables.find(t => t.name.toLowerCase() === exp.name.toLowerCase());
      if (!userTable) {
        errors.push(`Saknar tabell: ${exp.name}`);
        continue;
      }

      const pkCols = userTable.columns.filter(c => c.isPK);
      if (pkCols.length === 0) {
        errors.push(`${exp.name}: Saknar primärnyckel`);
      }

      for (const expFk of exp.foreignKeys) {
        const fkCol = userTable.columns.find(c => c.name.toLowerCase() === expFk.column.toLowerCase() && c.isFK);
        if (!fkCol) {
          errors.push(`${exp.name}: Saknar foreign key på ${expFk.column}`);
        }
      }
    }

    if (errors.length === 0) {
      setFeedback({ type: 'success', message: 'Din design uppfyller normalformskraven!' });
    } else {
      setFeedback({ type: 'error', message: errors.join('. ') });
    }
  }, [userTables, selectedExercise]);

  const renderSampleData = (table: TableDefinition) => {
    if (table.sampleData.length === 0) return null;

    return (
      <div className="mt-3 overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-zinc-700">
              {table.columns.map(col => (
                <th key={col.name} className="px-2 py-1 text-left text-zinc-400 font-medium">
                  {col.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.sampleData.map((row, i) => (
              <tr key={i} className="border-b border-zinc-800/50">
                {table.columns.map(col => (
                  <td key={col.name} className="px-2 py-1 text-zinc-300 font-mono">
                    {row[col.name] === null ? <span className="text-zinc-600">NULL</span> : String(row[col.name])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="flex-1 flex h-[calc(100vh-56px)]">
      <div className="w-64 border-r border-zinc-800 flex flex-col">
        <div className="px-4 py-3 border-b border-zinc-800">
          <h3 className="text-sm font-semibold text-zinc-300">Övningar</h3>
        </div>
        <div className="flex-1 overflow-auto p-3 space-y-1">
          {normalizationExercises.map(ex => (
            <button
              key={ex.id}
              onClick={() => {
                setSelectedExercise(ex);
                setUserTables([]);
                setMotivation('');
                setFeedback(null);
              }}
              className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                selectedExercise.id === ex.id
                  ? 'bg-blue-500/20 text-blue-400'
                  : 'text-zinc-400 hover:bg-zinc-800'
              }`}
            >
              <p className="text-sm font-medium">{ex.title}</p>
              <p className="text-xs text-zinc-500 mt-0.5">{ex.targetForm}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 flex">
        <div className="flex-1 p-6 overflow-auto border-r border-zinc-800">
          <div className="max-w-2xl">
            <div className="mb-6">
              <h1 className="text-xl font-bold text-zinc-100 mb-2">{selectedExercise.title}</h1>
              <p className="text-zinc-400">{selectedExercise.description}</p>
              <div className="flex gap-2 mt-3">
                {selectedExercise.courseGoals.map(id => (
                  <span key={id} className="px-2 py-0.5 bg-zinc-800 text-blue-400 text-xs rounded font-mono">
                    Kursmål {id}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-6 p-4 bg-zinc-900 border border-zinc-800 rounded-xl">
              <h2 className="text-sm font-semibold text-zinc-300 mb-3">Ursprunglig tabell</h2>
              <div className="font-mono text-sm">
                <p className="text-yellow-400 mb-2">{selectedExercise.initialTable.name}</p>
                <div className="space-y-1">
                  {selectedExercise.initialTable.columns.map(col => (
                    <div key={col.name} className="flex items-center gap-2">
                      <span className={selectedExercise.initialTable.primaryKey.includes(col.name) ? 'text-yellow-400' : 'text-zinc-300'}>
                        {col.name}
                      </span>
                      <span className="text-zinc-600">{col.type}</span>
                      {selectedExercise.initialTable.primaryKey.includes(col.name) && (
                        <span className="text-yellow-400 text-xs">PK</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              {renderSampleData(selectedExercise.initialTable)}
            </div>

            <div className="mb-6">
              <h2 className="text-sm font-semibold text-zinc-300 mb-3">Din design</h2>

              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={newTableName}
                  onChange={(e) => setNewTableName(e.target.value)}
                  placeholder="Tabellnamn"
                  className="flex-1 px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onKeyDown={(e) => e.key === 'Enter' && addTable()}
                />
                <button
                  onClick={addTable}
                  className="px-4 py-2 bg-blue-500 text-zinc-950 font-semibold rounded-lg hover:bg-blue-400 transition-colors"
                >
                  Lägg till tabell
                </button>
              </div>

              <div className="space-y-4">
                {userTables.map(table => (
                  <TableEditor
                    key={table.name}
                    table={table}
                    allTables={userTables}
                    onAddColumn={(name, type, isPK, isFK, fkRef) => addColumn(table.name, name, type, isPK, isFK, fkRef)}
                    onRemoveColumn={(name) => removeColumn(table.name, name)}
                    onRemoveTable={() => removeTable(table.name)}
                  />
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-sm font-semibold text-zinc-300 mb-3">Motivera din design (Kursmål 13)</h2>
              <textarea
                value={motivation}
                onChange={(e) => setMotivation(e.target.value)}
                placeholder="Förklara varför du valde denna design. Hur eliminerar den redundans? Vilka beroenden har du identifierat?"
                className="w-full h-32 px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-200 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {feedback && (
              <div className={`mb-6 p-4 rounded-lg border ${
                feedback.type === 'success'
                  ? 'bg-green-950/30 border-green-900/50 text-green-400'
                  : feedback.type === 'error'
                  ? 'bg-red-950/30 border-red-900/50 text-red-400'
                  : 'bg-blue-950/30 border-blue-900/50 text-blue-400'
              }`}>
                <p className="text-sm">{feedback.message}</p>
              </div>
            )}

            <button
              onClick={validateDesign}
              className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-500 transition-colors"
            >
              Validera design
            </button>
          </div>
        </div>

        <div className="w-80 p-4 bg-zinc-900/30 overflow-auto">
          <h3 className="text-sm font-semibold text-zinc-300 mb-4">Referens</h3>

          <div className="space-y-4 text-xs">
            <div className="p-3 bg-zinc-800/50 rounded-lg">
              <h4 className="font-semibold text-blue-400 mb-2">1NF (Första normalformen)</h4>
              <ul className="space-y-1 text-zinc-400">
                <li>• Atomära värden (inga listor i celler)</li>
                <li>• Inga upprepande kolumngrupper</li>
                <li>• Varje rad är unik (primärnyckel)</li>
              </ul>
            </div>

            <div className="p-3 bg-zinc-800/50 rounded-lg">
              <h4 className="font-semibold text-blue-400 mb-2">2NF (Andra normalformen)</h4>
              <ul className="space-y-1 text-zinc-400">
                <li>• Uppfyller 1NF</li>
                <li>• Inga partiella beroenden</li>
                <li>• Alla icke-nyckelattribut beror på hela nyckeln</li>
              </ul>
            </div>

            <div className="p-3 bg-zinc-800/50 rounded-lg">
              <h4 className="font-semibold text-blue-400 mb-2">3NF (Tredje normalformen)</h4>
              <ul className="space-y-1 text-zinc-400">
                <li>• Uppfyller 2NF</li>
                <li>• Inga transitiva beroenden</li>
                <li>• Icke-nyckelattribut beror endast på nyckeln</li>
              </ul>
            </div>

            <div className="p-3 bg-zinc-800/50 rounded-lg">
              <h4 className="font-semibold text-purple-400 mb-2">Many-to-Many</h4>
              <ul className="space-y-1 text-zinc-400">
                <li>• Kräver kopplingstabell</li>
                <li>• Kopplingstabellen har FK till båda</li>
                <li>• Primärnyckel är ofta sammansatt</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface TableEditorProps {
  table: UserTable;
  allTables: UserTable[];
  onAddColumn: (name: string, type: string, isPK: boolean, isFK: boolean, fkRef?: string) => void;
  onRemoveColumn: (name: string) => void;
  onRemoveTable: () => void;
}

function TableEditor({ table, allTables, onAddColumn, onRemoveColumn, onRemoveTable }: TableEditorProps) {
  const [newColName, setNewColName] = useState('');
  const [newColType, setNewColType] = useState('TEXT');
  const [isPK, setIsPK] = useState(false);
  const [isFK, setIsFK] = useState(false);
  const [fkRef, setFkRef] = useState('');

  const handleAdd = () => {
    if (!newColName.trim()) return;
    onAddColumn(newColName.trim().toLowerCase(), newColType, isPK, isFK, isFK ? fkRef : undefined);
    setNewColName('');
    setIsPK(false);
    setIsFK(false);
    setFkRef('');
  };

  return (
    <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-mono text-yellow-400">{table.name}</h3>
        <button
          onClick={onRemoveTable}
          className="text-red-400 hover:text-red-300 text-sm"
        >
          Ta bort
        </button>
      </div>

      <div className="space-y-1 mb-3">
        {table.columns.map(col => (
          <div key={col.name} className="flex items-center justify-between py-1 px-2 bg-zinc-800/50 rounded">
            <div className="flex items-center gap-2 font-mono text-sm">
              <span className={col.isPK ? 'text-yellow-400' : 'text-zinc-300'}>{col.name}</span>
              <span className="text-zinc-600">{col.type}</span>
              {col.isPK && <span className="text-yellow-400 text-xs">PK</span>}
              {col.isFK && <span className="text-blue-400 text-xs">FK → {col.fkRef}</span>}
            </div>
            <button
              onClick={() => onRemoveColumn(col.name)}
              className="text-zinc-500 hover:text-red-400 text-xs"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 items-center">
        <input
          type="text"
          value={newColName}
          onChange={(e) => setNewColName(e.target.value)}
          placeholder="Kolumnnamn"
          className="flex-1 min-w-[120px] px-2 py-1 bg-zinc-800 border border-zinc-700 rounded text-sm text-zinc-200"
        />
        <select
          value={newColType}
          onChange={(e) => setNewColType(e.target.value)}
          className="px-2 py-1 bg-zinc-800 border border-zinc-700 rounded text-sm text-zinc-200"
        >
          <option value="INTEGER">INTEGER</option>
          <option value="TEXT">TEXT</option>
          <option value="REAL">REAL</option>
        </select>
        <label className="flex items-center gap-1 text-xs text-zinc-400">
          <input
            type="checkbox"
            checked={isPK}
            onChange={(e) => setIsPK(e.target.checked)}
            className="rounded border-zinc-600"
          />
          PK
        </label>
        <label className="flex items-center gap-1 text-xs text-zinc-400">
          <input
            type="checkbox"
            checked={isFK}
            onChange={(e) => setIsFK(e.target.checked)}
            className="rounded border-zinc-600"
          />
          FK
        </label>
        {isFK && (
          <select
            value={fkRef}
            onChange={(e) => setFkRef(e.target.value)}
            className="px-2 py-1 bg-zinc-800 border border-zinc-700 rounded text-xs text-zinc-200"
          >
            <option value="">Välj tabell</option>
            {allTables.filter(t => t.name !== table.name).map(t => (
              <option key={t.name} value={t.name}>{t.name}</option>
            ))}
          </select>
        )}
        <button
          onClick={handleAdd}
          className="px-2 py-1 bg-blue-500 text-zinc-950 font-medium rounded text-sm hover:bg-blue-400"
        >
          +
        </button>
      </div>
    </div>
  );
}
