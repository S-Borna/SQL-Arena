export interface Exercise {
  id: string;
  level: number;
  category: ExerciseCategory;
  title: string;
  brief: string;
  database: DatabaseType;
  expectedColumns?: string[];
  expectedRowCount?: number;
  validationQuery?: string;
  hints: string[];
  solution?: string;
  courseGoals: number[];
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'boss';
}

export type ExerciseCategory =
  | 'select'
  | 'where'
  | 'order'
  | 'aggregate'
  | 'group'
  | 'join'
  | 'subquery'
  | 'ddl'
  | 'dml'
  | 'transaction'
  | 'index'
  | 'normalization';

export type DatabaseType = 'ecommerce' | 'chinook' | 'hanukkah' | 'school';

export interface QueryResult {
  columns: string[];
  values: unknown[][];
  rowCount: number;
  executionTime: number;
  error?: string;
}

export interface DiagnosticResult {
  passed: boolean;
  label: string;
  message: string;
  severity: 'error' | 'warning' | 'info';
  ruleId: string;
}

export interface SessionState {
  currentRep: number;
  totalReps: number;
  streak: number;
  currentLevel: number;
  completedExercises: string[];
  failedAttempts: Map<string, number>;
  currentDatabase: DatabaseType;
  mode: 'sprint' | 'roadmap' | 'lab' | 'design';
}

export interface CourseGoal {
  id: number;
  title: string;
  description: string;
  category: 'core' | 'optimization' | 'design' | 'python' | 'cloud';
}

export interface RoadmapBlock {
  id: number;
  title: string;
  hours: number;
  description: string;
  courseGoals: number[];
  exercises: string[];
  caseStudies: CaseStudy[];
  checkpoint: Checkpoint;
}

export interface CaseStudy {
  id: string;
  title: string;
  description: string;
  tasks: string[];
}

export interface Checkpoint {
  id: string;
  title: string;
  questions: CheckpointQuestion[];
  passingScore: number;
}

export interface CheckpointQuestion {
  id: string;
  question: string;
  type: 'sql' | 'multiple_choice' | 'design';
  correctAnswer?: string;
  options?: string[];
}

export interface NormalizationExercise {
  id: string;
  title: string;
  description: string;
  initialTable: TableDefinition;
  targetForm: '1NF' | '2NF' | '3NF';
  expectedTables: TableDefinition[];
  courseGoals: number[];
}

export interface TableDefinition {
  name: string;
  columns: ColumnDefinition[];
  primaryKey: string[];
  foreignKeys: ForeignKeyDefinition[];
  sampleData: Record<string, unknown>[];
}

export interface ColumnDefinition {
  name: string;
  type: string;
  nullable: boolean;
  unique?: boolean;
}

export interface ForeignKeyDefinition {
  column: string;
  references: {
    table: string;
    column: string;
  };
}

export interface PerformanceMetrics {
  queryTime: number;
  rowsScanned: number;
  indexUsed: boolean;
  explainPlan: string[];
}

export type ViewType = 'arena' | 'roadmap' | 'labs' | 'design' | 'hanukkah';
