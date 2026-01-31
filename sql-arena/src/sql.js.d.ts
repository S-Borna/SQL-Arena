declare module 'sql.js' {
  export interface SqlJsStatic {
    Database: new (data?: ArrayLike<number> | Buffer | null) => Database;
  }

  export interface Database {
    run(sql: string, params?: unknown[]): Database;
    exec(sql: string, params?: unknown[]): QueryExecResult[];
    each(sql: string, params: unknown[], callback: (row: unknown) => void, done: () => void): void;
    prepare(sql: string): Statement;
    export(): Uint8Array;
    close(): void;
    getRowsModified(): number;
  }

  export interface QueryExecResult {
    columns: string[];
    values: unknown[][];
  }

  export interface Statement {
    bind(params?: unknown[]): boolean;
    step(): boolean;
    getColumnNames(): string[];
    get(params?: unknown[]): unknown[];
    getAsObject(params?: unknown[]): Record<string, unknown>;
    run(params?: unknown[]): void;
    reset(): void;
    free(): boolean;
  }

  export interface SqlJsConfig {
    locateFile?: (filename: string) => string;
  }

  export default function initSqlJs(config?: SqlJsConfig): Promise<SqlJsStatic>;
}
