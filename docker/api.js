const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const poolConfig = {
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT || '3306'),
  user: process.env.DATABASE_USER || 'arena_user',
  password: process.env.DATABASE_PASSWORD || 'arena_password',
  database: process.env.DATABASE_NAME || 'sql_arena',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
};

let pool;

async function initializePool() {
  try {
    pool = mysql.createPool(poolConfig);
    const connection = await pool.getConnection();
    console.log('Database connection established successfully');
    connection.release();
  } catch (error) {
    console.error('Failed to initialize database pool:', error);
    process.exit(1);
  }
}

app.get('/health', async (request, response) => {
  try {
    const connection = await pool.getConnection();
    await connection.query('SELECT 1');
    connection.release();
    response.json({ status: 'healthy', database: 'connected' });
  } catch (error) {
    response.status(503).json({ status: 'unhealthy', error: error.message });
  }
});

app.post('/execute', async (request, response) => {
  const { query, database } = request.body;

  if (!query || typeof query !== 'string') {
    return response.status(400).json({ error: 'Query parameter is required and must be a string' });
  }

  const trimmedQuery = query.trim().toUpperCase();
  const isDangerous = trimmedQuery.startsWith('DROP') ||
                      trimmedQuery.startsWith('TRUNCATE') ||
                      (trimmedQuery.startsWith('DELETE') && !trimmedQuery.includes('WHERE'));

  if (isDangerous && !request.body.allowDestructive) {
    return response.status(403).json({
      error: 'Destructive queries are not allowed. Use the sandbox mode for DDL operations.'
    });
  }

  const startTime = Date.now();

  try {
    const connection = await pool.getConnection();

    if (database) {
      await connection.query(`USE ${mysql.escapeId(database)}`);
    }

    const [rows, fields] = await connection.query(query);
    connection.release();

    const executionTime = Date.now() - startTime;

    if (Array.isArray(rows)) {
      const columns = fields ? fields.map(field => field.name) : [];
      const values = rows.map(row => columns.map(col => row[col]));

      response.json({
        columns,
        values,
        rowCount: rows.length,
        executionTime
      });
    } else {
      response.json({
        columns: [],
        values: [],
        rowCount: rows.affectedRows || 0,
        executionTime,
        affectedRows: rows.affectedRows,
        insertId: rows.insertId
      });
    }
  } catch (error) {
    response.json({
      columns: [],
      values: [],
      rowCount: 0,
      executionTime: Date.now() - startTime,
      error: error.message
    });
  }
});

app.post('/explain', async (request, response) => {
  const { query, database } = request.body;

  if (!query) {
    return response.status(400).json({ error: 'Query parameter is required' });
  }

  try {
    const connection = await pool.getConnection();

    if (database) {
      await connection.query(`USE ${mysql.escapeId(database)}`);
    }

    const [explainRows] = await connection.query(`EXPLAIN ${query}`);

    const startTime = Date.now();
    const [queryRows] = await connection.query(query);
    const executionTime = Date.now() - startTime;

    connection.release();

    let indexUsed = false;
    let rowsScanned = 0;
    const explainPlan = [];

    for (const row of explainRows) {
      const planLine = `${row.select_type || ''} ${row.table || ''}: ${row.type || ''} (${row.key || 'no index'})`;
      explainPlan.push(planLine);

      if (row.key) {
        indexUsed = true;
      }
      rowsScanned += row.rows || 0;
    }

    response.json({
      queryTime: executionTime,
      rowsScanned,
      indexUsed,
      explainPlan
    });
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

app.get('/tables', async (request, response) => {
  const { database } = request.query;

  try {
    const connection = await pool.getConnection();

    if (database) {
      await connection.query(`USE ${mysql.escapeId(database)}`);
    }

    const [rows] = await connection.query('SHOW TABLES');
    connection.release();

    const tables = rows.map(row => Object.values(row)[0]);
    response.json({ tables });
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

app.get('/schema/:table', async (request, response) => {
  const { table } = request.params;
  const { database } = request.query;

  try {
    const connection = await pool.getConnection();

    if (database) {
      await connection.query(`USE ${mysql.escapeId(database)}`);
    }

    const [columns] = await connection.query(`DESCRIBE ${mysql.escapeId(table)}`);
    const [indexes] = await connection.query(`SHOW INDEX FROM ${mysql.escapeId(table)}`);

    connection.release();

    response.json({
      columns: columns.map(col => ({
        name: col.Field,
        type: col.Type,
        nullable: col.Null === 'YES',
        key: col.Key,
        default: col.Default
      })),
      indexes: indexes.map(idx => ({
        name: idx.Key_name,
        column: idx.Column_name,
        unique: idx.Non_unique === 0
      }))
    });
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

app.post('/sandbox/create', async (request, response) => {
  const sandboxName = `sandbox_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;

  try {
    const connection = await pool.getConnection();
    await connection.query(`CREATE DATABASE ${mysql.escapeId(sandboxName)}`);
    connection.release();

    response.json({ sandboxName, message: 'Sandbox database created successfully' });
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

app.delete('/sandbox/:name', async (request, response) => {
  const { name } = request.params;

  if (!name.startsWith('sandbox_')) {
    return response.status(403).json({ error: 'Can only delete sandbox databases' });
  }

  try {
    const connection = await pool.getConnection();
    await connection.query(`DROP DATABASE IF EXISTS ${mysql.escapeId(name)}`);
    connection.release();

    response.json({ message: 'Sandbox database deleted successfully' });
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3001;

initializePool().then(() => {
  app.listen(PORT, () => {
    console.log(`SQL Arena API server running on port ${PORT}`);
  });
});
