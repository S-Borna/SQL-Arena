// ===== SQL Quest - DevOps Bonus Content =====
// Specifikt för DevOps-studenter: Backup, Säkerhet, Monitoring, Automation

const DEVOPS_CONTENT = {
    // ===== BACKUP & RESTORE =====
    backup: {
        title: "Backup & Restore",
        icon: "💾",
        description: "3-2-1 regeln och praktiska backup-strategier",
        content: `
            <div class="devops-section">
                <h3>💾 3-2-1 Backup-regeln</h3>
                <div class="highlight-box">
                    <p class="big-text">3 kopior - 2 olika media - 1 offsite</p>
                </div>

                <h4>Varför 3-2-1?</h4>
                <ul>
                    <li><strong>3 kopior:</strong> Original + 2 backups</li>
                    <li><strong>2 media:</strong> T.ex. SSD + extern disk</li>
                    <li><strong>1 offsite:</strong> Minst en backup på annan plats (cloud)</li>
                </ul>

                <h4>📋 Backup-typer</h4>
                <div class="code-example">
                    <h5>Full Backup</h5>
                    <pre>-- SQLite: Kopiera hela filen
cp database.db backup_$(date +%Y%m%d).db

-- PostgreSQL
pg_dump -U user -d dbname > backup.sql

-- MySQL
mysqldump -u user -p dbname > backup.sql</pre>
                </div>

                <div class="code-example">
                    <h5>Inkrementell Backup (endast ändringar)</h5>
                    <pre>-- PostgreSQL WAL archiving
archive_mode = on
archive_command = 'cp %p /backup/wal/%f'

-- MySQL binlog
mysqlbinlog mysql-bin.000001 > changes.sql</pre>
                </div>

                <h4>⏰ Automatiserad Backup med Cron</h4>
                <pre># Daglig backup kl 02:00
0 2 * * * /usr/local/bin/backup-db.sh

# Veckovis full backup söndag kl 03:00
0 3 * * 0 /usr/local/bin/full-backup.sh</pre>

                <h4>🔄 Restore-procedur</h4>
                <pre># SQLite
cp backup.db database.db

# PostgreSQL
psql -U user -d dbname < backup.sql

# MySQL
mysql -u user -p dbname < backup.sql</pre>

                <div class="warning-box">
                    <h5>⚠️ VIKTIGT: Testa dina backups!</h5>
                    <p>En backup du aldrig testat är ingen backup. Schemalägg regelbundna restore-tester.</p>
                </div>
            </div>
        `
    },

    // ===== SÄKERHET =====
    security: {
        title: "Databassäkerhet",
        icon: "🔐",
        description: "SQL Injection, behörigheter och kryptering",
        content: `
            <div class="devops-section">
                <h3>🔐 SQL Injection Prevention</h3>

                <div class="danger-box">
                    <h4>❌ ALDRIG så här!</h4>
                    <pre>// FARLIGT - SQL Injection möjlig
const query = "SELECT * FROM users WHERE name = '" + userName + "'";

// Angripare kan skicka: ' OR '1'='1
// Resultat: SELECT * FROM users WHERE name = '' OR '1'='1'
// = Returnerar ALLA användare!</pre>
                </div>

                <div class="success-box">
                    <h4>✅ ALLTID så här!</h4>
                    <pre>// SÄKERT - Prepared statements
const query = "SELECT * FROM users WHERE name = ?";
db.get(query, [userName]);

// Python
cursor.execute("SELECT * FROM users WHERE name = %s", (userName,))

// Node.js med pg
client.query('SELECT * FROM users WHERE name = $1', [userName])</pre>
                </div>

                <h4>👤 Behörighetshantering (Principle of Least Privilege)</h4>
                <pre>-- Skapa användare med begränsade rättigheter
CREATE USER app_user WITH PASSWORD 'secure_password';

-- Ge endast SELECT på specifika tabeller
GRANT SELECT ON products, categories TO app_user;

-- Ge INSERT/UPDATE men inte DELETE
GRANT INSERT, UPDATE ON orders TO app_user;

-- För admin-uppgifter - separat användare
CREATE USER admin_user WITH PASSWORD 'admin_secure';
GRANT ALL PRIVILEGES ON ALL TABLES TO admin_user;</pre>

                <h4>🔒 Kryptering</h4>
                <pre>-- Kryptera känslig data
-- PostgreSQL pgcrypto
CREATE EXTENSION pgcrypto;
INSERT INTO users (email, password)
VALUES ('user@test.com', crypt('password', gen_salt('bf')));

-- Verifiera lösenord
SELECT * FROM users
WHERE email = 'user@test.com'
AND password = crypt('password', password);</pre>

                <h4>📊 Audit Logging</h4>
                <pre>-- Skapa audit-tabell
CREATE TABLE audit_log (
    id INTEGER PRIMARY KEY,
    table_name TEXT,
    action TEXT,
    old_data TEXT,
    new_data TEXT,
    user_name TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Trigger för automatisk loggning
CREATE TRIGGER audit_customers
AFTER UPDATE ON customers
BEGIN
    INSERT INTO audit_log (table_name, action, old_data, new_data, user_name)
    VALUES ('customers', 'UPDATE',
            json(OLD), json(NEW),
            current_user);
END;</pre>
            </div>
        `
    },

    // ===== MONITORING =====
    monitoring: {
        title: "Monitoring & Performance",
        icon: "📊",
        description: "Övervaka och optimera din databas",
        content: `
            <div class="devops-section">
                <h3>📊 Databasövervakning</h3>

                <h4>🔍 Viktiga metriker att övervaka</h4>
                <ul>
                    <li><strong>Connections:</strong> Aktiva/max anslutningar</li>
                    <li><strong>Query time:</strong> Genomsnittlig frågetid</li>
                    <li><strong>Disk usage:</strong> Lagringsutrymme</li>
                    <li><strong>Buffer hit ratio:</strong> Cache-effektivitet</li>
                    <li><strong>Replication lag:</strong> Fördröjning vid replikering</li>
                </ul>

                <h4>📈 PostgreSQL Performance Queries</h4>
                <pre>-- Långsamma queries (kräver pg_stat_statements)
SELECT query, calls, mean_time, total_time
FROM pg_stat_statements
ORDER BY mean_time DESC
LIMIT 10;

-- Tabellstorlekar
SELECT relname, pg_size_pretty(pg_total_relation_size(relid))
FROM pg_catalog.pg_statio_user_tables
ORDER BY pg_total_relation_size(relid) DESC;

-- Index usage
SELECT schemaname, tablename, indexname, idx_scan
FROM pg_stat_user_indexes
ORDER BY idx_scan ASC;  -- Låga skanningar = kanske onödigt index</pre>

                <h4>🛠️ EXPLAIN ANALYZE</h4>
                <pre>-- Se hur databasen kör din query
EXPLAIN ANALYZE SELECT * FROM orders
JOIN customers ON orders.customer_id = customers.id
WHERE customers.city = 'Stockholm';

-- Output visar:
-- - Seq Scan vs Index Scan
-- - Estimated vs Actual rows
-- - Execution time</pre>

                <h4>⚡ Query Optimization Tips</h4>
                <div class="code-example">
                    <pre>-- ❌ Långsam: Funktion på kolumn
SELECT * FROM orders WHERE YEAR(created_at) = 2024;

-- ✅ Snabb: Jämför direkt
SELECT * FROM orders
WHERE created_at >= '2024-01-01'
AND created_at < '2025-01-01';

-- ❌ Långsam: SELECT *
SELECT * FROM large_table;

-- ✅ Snabb: Specifika kolumner
SELECT id, name, email FROM large_table;

-- ❌ Långsam: LIKE med ledande %
SELECT * FROM products WHERE name LIKE '%laptop%';

-- ✅ Snabbare: Full-text search
SELECT * FROM products
WHERE to_tsvector('swedish', name) @@ to_tsquery('laptop');</pre>
                </div>
            </div>
        `
    },

    // ===== AUTOMATION =====
    automation: {
        title: "Database Automation",
        icon: "🤖",
        description: "CI/CD för databaser och migrations",
        content: `
            <div class="devops-section">
                <h3>🤖 Database DevOps</h3>

                <h4>📦 Database Migrations</h4>
                <p>Versionskontrollera dina databasändringar:</p>
                <pre># Migrations-struktur
migrations/
├── 001_create_users.sql
├── 002_add_email_column.sql
├── 003_create_orders.sql
└── 004_add_index_email.sql

# Varje migration har UP och DOWN
-- 002_add_email_column.sql
-- UP
ALTER TABLE users ADD COLUMN email TEXT;

-- DOWN
ALTER TABLE users DROP COLUMN email;</pre>

                <h4>🔄 Populära Migration Tools</h4>
                <pre># Python - Alembic
alembic upgrade head
alembic downgrade -1

# Node.js - Knex
npx knex migrate:latest
npx knex migrate:rollback

# Ruby - ActiveRecord
rails db:migrate
rails db:rollback

# Golang - goose
goose up
goose down</pre>

                <h4>🚀 CI/CD Pipeline för Databas</h4>
                <pre># GitHub Actions exempel
name: Database CI/CD

on: [push]

jobs:
  test:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_PASSWORD: test
        ports:
          - 5432:5432

    steps:
      - uses: actions/checkout@v3

      - name: Run migrations
        run: |
          psql -h localhost -U postgres -c "CREATE DATABASE testdb"
          for f in migrations/*.sql; do
            psql -h localhost -U postgres -d testdb -f "$f"
          done

      - name: Run tests
        run: npm test

      - name: Validate schema
        run: |
          pg_dump -h localhost -U postgres -d testdb --schema-only > current.sql
          diff expected_schema.sql current.sql</pre>

                <h4>🐳 Docker för Databaser</h4>
                <pre># docker-compose.yml
version: '3.8'
services:
  db:
    image: postgres:15
    volumes:
      - pgdata:/var/lib/postgresql/data
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql
    environment:
      POSTGRES_PASSWORD: secure_password
      POSTGRES_DB: myapp
    ports:
      - "5432:5432"
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 5s
      timeout: 5s
      retries: 5

volumes:
  pgdata:</pre>

                <h4>☁️ Infrastructure as Code</h4>
                <pre># Terraform - AWS RDS
resource "aws_db_instance" "main" {
  identifier           = "myapp-db"
  engine              = "postgres"
  engine_version      = "15.4"
  instance_class      = "db.t3.micro"
  allocated_storage   = 20

  db_name             = "myapp"
  username            = "admin"
  password            = var.db_password

  backup_retention_period = 7
  backup_window          = "03:00-04:00"

  multi_az               = true  # High availability

  tags = {
    Environment = "production"
  }
}</pre>
            </div>
        `
    },

    // ===== REPLIKERING =====
    replication: {
        title: "Replikering & High Availability",
        icon: "🔄",
        description: "Bygga robusta databassystem",
        content: `
            <div class="devops-section">
                <h3>🔄 Database Replication</h3>

                <h4>📊 Replikeringstyper</h4>
                <div class="grid-2">
                    <div class="card">
                        <h5>Primary-Replica (Master-Slave)</h5>
                        <ul>
                            <li>Writes → Primary</li>
                            <li>Reads → Replicas</li>
                            <li>Async eller Sync</li>
                        </ul>
                    </div>
                    <div class="card">
                        <h5>Multi-Primary</h5>
                        <ul>
                            <li>Writes → Alla noder</li>
                            <li>Konflikthantering krävs</li>
                            <li>Mer komplext</li>
                        </ul>
                    </div>
                </div>

                <h4>⚡ PostgreSQL Streaming Replication</h4>
                <pre># Primary (postgresql.conf)
wal_level = replica
max_wal_senders = 3
wal_keep_size = 256MB

# Primary (pg_hba.conf)
host replication replica_user 192.168.1.0/24 md5

# Replica setup
pg_basebackup -h primary_host -D /var/lib/postgresql/data -U replica_user -P

# Replica (postgresql.conf)
primary_conninfo = 'host=primary_host user=replica_user password=xxx'</pre>

                <h4>🎯 Load Balancing</h4>
                <pre># PgBouncer config (connection pooler)
[databases]
mydb = host=primary_host dbname=mydb
mydb_ro = host=replica_host dbname=mydb

[pgbouncer]
pool_mode = transaction
max_client_conn = 1000
default_pool_size = 20

# Application connection
# Write queries → mydb
# Read queries → mydb_ro</pre>

                <h4>🔥 Failover Strategier</h4>
                <ul>
                    <li><strong>Manual failover:</strong> Driftsätt manuellt promoverar replica</li>
                    <li><strong>Automatic failover:</strong> Patroni, repmgr, eller cloud-managed</li>
                    <li><strong>Cloud managed:</strong> AWS RDS Multi-AZ, Azure HA</li>
                </ul>

                <div class="info-box">
                    <h5>💡 RTO vs RPO</h5>
                    <p><strong>RTO (Recovery Time Objective):</strong> Hur snabbt måste vi vara online igen?</p>
                    <p><strong>RPO (Recovery Point Objective):</strong> Hur mycket data har vi råd att förlora?</p>
                </div>
            </div>
        `
    },

    // ===== CLOUD DATABASES =====
    cloud: {
        title: "Cloud Databases",
        icon: "☁️",
        description: "AWS, Azure, GCP och Supabase",
        content: `
            <div class="devops-section">
                <h3>☁️ Cloud Database Services</h3>

                <h4>🏢 Managed Database Services</h4>
                <div class="grid-3">
                    <div class="card">
                        <h5>AWS</h5>
                        <ul>
                            <li>RDS (relational)</li>
                            <li>Aurora (MySQL/PostgreSQL)</li>
                            <li>DynamoDB (NoSQL)</li>
                        </ul>
                    </div>
                    <div class="card">
                        <h5>Azure</h5>
                        <ul>
                            <li>Azure SQL</li>
                            <li>Cosmos DB</li>
                            <li>PostgreSQL Flexible</li>
                        </ul>
                    </div>
                    <div class="card">
                        <h5>GCP</h5>
                        <ul>
                            <li>Cloud SQL</li>
                            <li>Cloud Spanner</li>
                            <li>Firestore</li>
                        </ul>
                    </div>
                </div>

                <h4>🚀 Supabase - Open Source Firebase Alternative</h4>
                <pre>// Supabase setup (det vi använder i SQL Quest!)
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://xxx.supabase.co',
  'your-anon-key'
)

// Query data
const { data, error } = await supabase
  .from('users')
  .select('*')
  .eq('city', 'Stockholm')

// Insert data
const { data, error } = await supabase
  .from('users')
  .insert([{ name: 'Anna', email: 'anna@test.se' }])

// Real-time subscriptions
supabase
  .channel('orders')
  .on('postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'orders' },
      payload => console.log('New order:', payload)
  )
  .subscribe()</pre>

                <h4>💰 Kostnadstips</h4>
                <ul>
                    <li>Använd <strong>reserved instances</strong> för produktionsdatabaser (30-60% besparing)</li>
                    <li><strong>Right-size</strong> - överdimensionera inte</li>
                    <li>Använd <strong>read replicas</strong> för att avlasta primary</li>
                    <li><strong>Connection pooling</strong> minskar antal connections</li>
                    <li>Schemalägg <strong>non-prod databases</strong> att stängas av nattetid</li>
                </ul>

                <h4>🔒 Cloud Security Best Practices</h4>
                <pre>-- Aldrig exponera databas publikt
-- Använd VPC/Private endpoints
-- Kryptera data at rest och in transit
-- Aktivera audit logging
-- Använd IAM-roller istället för lösenord där möjligt

# AWS exempel - IAM authentication
aws rds generate-db-auth-token \\
    --hostname mydb.xxx.region.rds.amazonaws.com \\
    --port 5432 \\
    --username mydbuser</pre>
            </div>
        `
    }
};

// DevOps Quiz
const DEVOPS_QUIZ = [
    {
        question: "Vad står 3-2-1 regeln för?",
        options: [
            "3 databaser, 2 servrar, 1 backup",
            "3 kopior, 2 olika media, 1 offsite",
            "3 användare, 2 lösenord, 1 admin",
            "3 tabeller, 2 index, 1 nyckel"
        ],
        correct: 1
    },
    {
        question: "Vilket är det SÄKRASTE sättet att hantera user input i SQL?",
        options: [
            "Escape:a specialtecken",
            "Validera input med regex",
            "Använda prepared statements/parameterized queries",
            "Köra input genom en sanitize-funktion"
        ],
        correct: 2
    },
    {
        question: "Vad är skillnaden mellan RTO och RPO?",
        options: [
            "RTO = backup-frekvens, RPO = restore-tid",
            "RTO = hur snabbt återställa, RPO = hur mycket data kan förloras",
            "RTO = replikering, RPO = partitionering",
            "Det finns ingen skillnad"
        ],
        correct: 1
    },
    {
        question: "När bör du INTE använda ett index?",
        options: [
            "På kolumner du ofta söker på",
            "På kolumner du joinar på",
            "På tabeller med väldigt få rader som ändras ofta",
            "På primärnycklar"
        ],
        correct: 2
    },
    {
        question: "Vad är fördelen med connection pooling?",
        options: [
            "Snabbare queries",
            "Återanvänder databasanslutningar istället för att skapa nya",
            "Krypterar datan",
            "Automatisk backup"
        ],
        correct: 1
    }
];

// Exportera
window.DEVOPS_CONTENT = DEVOPS_CONTENT;
window.DEVOPS_QUIZ = DEVOPS_QUIZ;
