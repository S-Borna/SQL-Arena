import initSqlJs from 'sql.js';
import type { Database, SqlJsStatic } from 'sql.js';
import type { QueryResult, DatabaseType, PerformanceMetrics } from '../types';

import ecommerceSql from '../data/seeds/ecommerce.sql?raw';
import chinookSql from '../data/seeds/chinook.sql?raw';
import hanukkahSql from '../data/seeds/hanukkah.sql?raw';
import schoolSql from '../data/seeds/school.sql?raw';

let SQL: SqlJsStatic | null = null;

const databases: Map<DatabaseType, Database> = new Map();
const sandboxDatabases: Map<DatabaseType, Database> = new Map();
let customDatabase: Database | null = null;

const seedSql: Record<DatabaseType, string> = {
  ecommerce: ecommerceSql,
  chinook: chinookSql,
  hanukkah: hanukkahSql,
  school: schoolSql
};

export async function initializeSqlJs(): Promise<void> {
  if (SQL) return;

  SQL = await initSqlJs({
    locateFile: (file: string) => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.3/${file}`
  });
}

export async function getDatabase(type: DatabaseType): Promise<Database> {
  await initializeSqlJs();

  if (!databases.has(type)) {
    const db = new SQL!.Database();
    db.run(seedSql[type]);
    databases.set(type, db);
  }

  return databases.get(type)!;
}

export async function getSandboxDatabase(type: DatabaseType): Promise<Database> {
  await initializeSqlJs();

  if (!sandboxDatabases.has(type)) {
    const db = new SQL!.Database();
    db.run(seedSql[type]);
    sandboxDatabases.set(type, db);
  }

  return sandboxDatabases.get(type)!;
}

export async function resetSandboxDatabase(type: DatabaseType): Promise<void> {
  await initializeSqlJs();

  const existingDb = sandboxDatabases.get(type);
  if (existingDb) {
    existingDb.close();
  }

  const db = new SQL!.Database();
  db.run(seedSql[type]);
  sandboxDatabases.set(type, db);
}

export async function executeQuery(
  query: string,
  databaseType: DatabaseType,
  useSandbox: boolean = false
): Promise<QueryResult> {
  const startTime = performance.now();

  try {
    const db = useSandbox
      ? await getSandboxDatabase(databaseType)
      : await getDatabase(databaseType);

    const results = db.exec(query);
    const executionTime = performance.now() - startTime;

    if (results.length === 0) {
      return {
        columns: [],
        values: [],
        rowCount: 0,
        executionTime
      };
    }

    const result = results[0];
    return {
      columns: result.columns,
      values: result.values,
      rowCount: result.values.length,
      executionTime
    };
  } catch (error) {
    const executionTime = performance.now() - startTime;
    return {
      columns: [],
      values: [],
      rowCount: 0,
      executionTime,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}

export async function executeMultipleStatements(
  statements: string,
  databaseType: DatabaseType | 'custom',
  useSandbox: boolean = true
): Promise<QueryResult[]> {
  const results: QueryResult[] = [];
  let db: Database;

  if (databaseType === 'custom') {
    db = await getCustomDatabase();
  } else if (useSandbox) {
    db = await getSandboxDatabase(databaseType);
  } else {
    db = await getDatabase(databaseType);
  }

  const statementList = statements
    .split(';')
    .map(s => s.trim())
    .filter(s => s.length > 0);

  for (const statement of statementList) {
    const startTime = performance.now();

    try {
      const execResults = db.exec(statement);
      const executionTime = performance.now() - startTime;

      if (execResults.length === 0) {
        results.push({
          columns: [],
          values: [],
          rowCount: 0,
          executionTime
        });
      } else {
        const result = execResults[0];
        results.push({
          columns: result.columns,
          values: result.values,
          rowCount: result.values.length,
          executionTime
        });
      }
    } catch (error) {
      const executionTime = performance.now() - startTime;
      results.push({
        columns: [],
        values: [],
        rowCount: 0,
        executionTime,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      });
    }
  }

  return results;
}

export async function getExplainPlan(
  query: string,
  databaseType: DatabaseType
): Promise<PerformanceMetrics> {
  const startTime = performance.now();
  const db = await getDatabase(databaseType);

  try {
    const explainResults = db.exec(`EXPLAIN QUERY PLAN ${query}`);
    const queryResults = db.exec(query);
    const executionTime = performance.now() - startTime;

    const explainPlan: string[] = [];
    let indexUsed = false;
    let rowsScanned = 0;

    if (explainResults.length > 0) {
      for (const row of explainResults[0].values) {
        const detail = String(row[3] || row[2] || '');
        explainPlan.push(detail);

        if (detail.toLowerCase().includes('using index') ||
          detail.toLowerCase().includes('using covering index')) {
          indexUsed = true;
        }

        if (detail.toLowerCase().includes('scan')) {
          rowsScanned += 100;
        }
      }
    }

    if (queryResults.length > 0) {
      rowsScanned = Math.max(rowsScanned, queryResults[0].values.length);
    }

    return {
      queryTime: executionTime,
      rowsScanned,
      indexUsed,
      explainPlan
    };
  } catch (error) {
    return {
      queryTime: performance.now() - startTime,
      rowsScanned: 0,
      indexUsed: false,
      explainPlan: [error instanceof Error ? error.message : 'Error analyzing query']
    };
  }
}

export async function exportDatabase(databaseType: DatabaseType): Promise<Uint8Array> {
  const db = await getSandboxDatabase(databaseType);
  return db.export();
}

// Export as SQL text for different formats
export async function exportDatabaseAsSql(
  databaseType: DatabaseType | 'custom',
  format: 'sqlite' | 'mysql' | 'postgres' = 'sqlite'
): Promise<string> {
  let db: Database;
  if (databaseType === 'custom') {
    if (!customDatabase) throw new Error('No custom database exists');
    db = customDatabase;
  } else {
    db = await getSandboxDatabase(databaseType);
  }

  // Get all tables
  const tablesResult = db.exec("SELECT name, sql FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'");
  if (tablesResult.length === 0) return '-- No tables found';

  let output = `-- Database export\n-- Format: ${format.toUpperCase()}\n-- Generated: ${new Date().toISOString()}\n\n`;

  for (const row of tablesResult[0].values) {
    const tableName = String(row[0]);
    let createSql = String(row[1]);

    // Modify syntax based on format
    if (format === 'mysql') {
      createSql = createSql
        .replace(/AUTOINCREMENT/gi, 'AUTO_INCREMENT')
        .replace(/INTEGER PRIMARY KEY/gi, 'INT PRIMARY KEY AUTO_INCREMENT')
        .replace(/TEXT/gi, 'VARCHAR(255)');
    } else if (format === 'postgres') {
      createSql = createSql
        .replace(/INTEGER PRIMARY KEY AUTOINCREMENT/gi, 'SERIAL PRIMARY KEY')
        .replace(/INTEGER/gi, 'INTEGER')
        .replace(/TEXT/gi, 'TEXT');
    }

    output += `-- Table: ${tableName}\n`;
    output += createSql + ';\n\n';

    // Get data
    const dataResult = db.exec(`SELECT * FROM "${tableName}"`);
    if (dataResult.length > 0 && dataResult[0].values.length > 0) {
      const columns = dataResult[0].columns;

      for (const dataRow of dataResult[0].values) {
        const values = dataRow.map(v => {
          if (v === null) return 'NULL';
          if (typeof v === 'string') return `'${v.replace(/'/g, "''")}'`;
          return String(v);
        });
        output += `INSERT INTO "${tableName}" (${columns.join(', ')}) VALUES (${values.join(', ')});\n`;
      }
      output += '\n';
    }
  }

  return output;
}

// Create an empty custom database
export async function createEmptyDatabase(): Promise<void> {
  await initializeSqlJs();

  if (customDatabase) {
    customDatabase.close();
  }

  customDatabase = new SQL!.Database();
}

// Get the custom database
export async function getCustomDatabase(): Promise<Database> {
  await initializeSqlJs();

  if (!customDatabase) {
    customDatabase = new SQL!.Database();
  }

  return customDatabase;
}

export async function importDatabase(data: Uint8Array, databaseType: DatabaseType): Promise<void> {
  await initializeSqlJs();

  const existingDb = sandboxDatabases.get(databaseType);
  if (existingDb) {
    existingDb.close();
  }

  const db = new SQL!.Database(data);
  sandboxDatabases.set(databaseType, db);
}

export async function getTableList(databaseType: DatabaseType | 'custom'): Promise<string[]> {
  let db: Database;
  if (databaseType === 'custom') {
    db = await getCustomDatabase();
  } else {
    db = await getSandboxDatabase(databaseType);
  }
  const results = db.exec(
    "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name"
  );

  if (results.length === 0) return [];
  return results[0].values.map(row => String(row[0]));
}

export async function getTableSchema(
  tableName: string,
  databaseType: DatabaseType | 'custom'
): Promise<{ name: string; type: string; notnull: boolean; pk: boolean }[]> {
  let db: Database;
  if (databaseType === 'custom') {
    db = await getCustomDatabase();
  } else {
    db = await getSandboxDatabase(databaseType);
  }
  const results = db.exec(`PRAGMA table_info("${tableName}")`);

  if (results.length === 0) return [];

  return results[0].values.map(row => ({
    name: String(row[1]),
    type: String(row[2]),
    notnull: Boolean(row[3]),
    pk: Boolean(row[5])
  }));
}

export async function getIndexList(
  tableName: string,
  databaseType: DatabaseType
): Promise<{ name: string; unique: boolean; columns: string[] }[]> {
  const db = await getDatabase(databaseType);
  const indexResults = db.exec(`PRAGMA index_list("${tableName}")`);

  if (indexResults.length === 0) return [];

  const indexes: { name: string; unique: boolean; columns: string[] }[] = [];

  for (const row of indexResults[0].values) {
    const indexName = String(row[1]);
    const unique = Boolean(row[2]);

    const columnResults = db.exec(`PRAGMA index_info("${indexName}")`);
    const columns = columnResults.length > 0
      ? columnResults[0].values.map(col => String(col[2]))
      : [];

    indexes.push({ name: indexName, unique, columns });
  }

  return indexes;
}
