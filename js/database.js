// ===== SQL Quest - Database Setup =====
// Uses SQL.js to run SQLite directly in the browser

let db = null;
let SQL = null;

// Initialize SQL.js
async function initDatabase() {
    try {
        SQL = await initSqlJs({
            locateFile: file => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/${file}`
        });

        db = new SQL.Database();

        // Create our learning database with realistic Swedish data
        createTables();
        insertSampleData();

        console.log('✅ Databas initierad!');
        updateSchemaPanel();
        return true;
    } catch (error) {
        console.error('❌ Kunde inte initiera databas:', error);
        return false;
    }
}

// Create all tables for learning
function createTables() {
    // Kunder (Customers)
    db.run(`
        CREATE TABLE kunder (
            kund_id INTEGER PRIMARY KEY,
            fornamn TEXT NOT NULL,
            efternamn TEXT NOT NULL,
            email TEXT UNIQUE,
            telefon TEXT,
            stad TEXT,
            registrerad DATE
        )
    `);

    // Produkter (Products)
    db.run(`
        CREATE TABLE produkter (
            produkt_id INTEGER PRIMARY KEY,
            namn TEXT NOT NULL,
            kategori TEXT,
            pris DECIMAL(10,2),
            lager_antal INTEGER DEFAULT 0,
            beskrivning TEXT
        )
    `);

    // Ordrar (Orders)
    db.run(`
        CREATE TABLE ordrar (
            order_id INTEGER PRIMARY KEY,
            kund_id INTEGER,
            order_datum DATE,
            status TEXT DEFAULT 'väntande',
            total_summa DECIMAL(10,2),
            FOREIGN KEY (kund_id) REFERENCES kunder(kund_id)
        )
    `);

    // Orderrader (Order Items)
    db.run(`
        CREATE TABLE orderrader (
            rad_id INTEGER PRIMARY KEY,
            order_id INTEGER,
            produkt_id INTEGER,
            antal INTEGER,
            pris_per_enhet DECIMAL(10,2),
            FOREIGN KEY (order_id) REFERENCES ordrar(order_id),
            FOREIGN KEY (produkt_id) REFERENCES produkter(produkt_id)
        )
    `);

    // Anställda (Employees)
    db.run(`
        CREATE TABLE anstalda (
            anstalld_id INTEGER PRIMARY KEY,
            fornamn TEXT NOT NULL,
            efternamn TEXT NOT NULL,
            email TEXT,
            avdelning TEXT,
            lon DECIMAL(10,2),
            chef_id INTEGER,
            anstallnings_datum DATE,
            FOREIGN KEY (chef_id) REFERENCES anstalda(anstalld_id)
        )
    `);

    // Kategorier (Categories) - för normalisering
    db.run(`
        CREATE TABLE kategorier (
            kategori_id INTEGER PRIMARY KEY,
            namn TEXT NOT NULL,
            beskrivning TEXT
        )
    `);

    // Städer (Cities) - för normalisering och JOINs
    db.run(`
        CREATE TABLE stader (
            stad_id INTEGER PRIMARY KEY,
            namn TEXT NOT NULL,
            lan TEXT,
            befolkning INTEGER
        )
    `);
}

// Insert realistic Swedish sample data
function insertSampleData() {
    // Kunder
    db.run(`
        INSERT INTO kunder (fornamn, efternamn, email, telefon, stad, registrerad) VALUES
        ('Anna', 'Andersson', 'anna.andersson@email.se', '070-1234567', 'Stockholm', '2024-01-15'),
        ('Erik', 'Eriksson', 'erik.eriksson@email.se', '070-2345678', 'Göteborg', '2024-02-20'),
        ('Maria', 'Lindqvist', 'maria.lindqvist@email.se', '070-3456789', 'Malmö', '2024-01-08'),
        ('Johan', 'Svensson', 'johan.svensson@email.se', '070-4567890', 'Uppsala', '2024-03-12'),
        ('Sara', 'Johansson', 'sara.johansson@email.se', '070-5678901', 'Stockholm', '2024-02-28'),
        ('Lars', 'Nilsson', 'lars.nilsson@email.se', '070-6789012', 'Göteborg', '2024-04-05'),
        ('Emma', 'Karlsson', 'emma.karlsson@email.se', '070-7890123', 'Linköping', '2024-01-22'),
        ('Anders', 'Olsson', 'anders.olsson@email.se', '070-8901234', 'Stockholm', '2024-05-10'),
        ('Lisa', 'Persson', 'lisa.persson@email.se', '070-9012345', 'Malmö', '2024-03-18'),
        ('Magnus', 'Berg', 'magnus.berg@email.se', '070-0123456', 'Västerås', '2024-04-25'),
        ('Karin', 'Holm', 'karin.holm@email.se', '073-1112233', 'Örebro', '2024-06-01'),
        ('Peter', 'Lindberg', 'peter.lindberg@email.se', '076-2223344', 'Norrköping', '2024-05-15')
    `);

    // Produkter
    db.run(`
        INSERT INTO produkter (namn, kategori, pris, lager_antal, beskrivning) VALUES
        ('Laptop Pro 15', 'Elektronik', 12999.00, 25, 'Kraftfull laptop för professionellt bruk'),
        ('Trådlös Mus', 'Elektronik', 299.00, 150, 'Ergonomisk trådlös mus'),
        ('Mekaniskt Tangentbord', 'Elektronik', 899.00, 45, 'RGB-belyst mekaniskt tangentbord'),
        ('27" Monitor', 'Elektronik', 3499.00, 30, '4K monitor med IPS-panel'),
        ('USB-C Hub', 'Tillbehör', 599.00, 80, '7-i-1 USB-C dockningsstation'),
        ('Laptop Väska', 'Tillbehör', 449.00, 60, 'Vattenavvisande väska för 15" laptop'),
        ('Webbkamera HD', 'Elektronik', 799.00, 40, '1080p webbkamera med mikrofon'),
        ('Hörlurar Bluetooth', 'Ljud', 1299.00, 55, 'Trådlösa hörlurar med brusreducering'),
        ('Skrivbordslampa LED', 'Kontor', 349.00, 70, 'Justerbar LED-lampa'),
        ('Stående Skrivbord', 'Möbler', 4999.00, 15, 'Elektriskt höj- och sänkbart skrivbord'),
        ('Kontorsstol Ergonomisk', 'Möbler', 3999.00, 20, 'Ergonomisk kontorsstol'),
        ('Musmatta XL', 'Tillbehör', 199.00, 100, 'Extra stor musmatta'),
        ('Extern SSD 1TB', 'Lagring', 999.00, 35, 'Snabb extern SSD-lagring'),
        ('Bildskärmsarm', 'Tillbehör', 699.00, 25, 'Justerbar arm för monitor'),
        ('Kabelhantering Kit', 'Tillbehör', 149.00, 90, 'Set för att organisera kablar')
    `);

    // Ordrar
    db.run(`
        INSERT INTO ordrar (kund_id, order_datum, status, total_summa) VALUES
        (1, '2024-06-01', 'levererad', 13298.00),
        (2, '2024-06-03', 'levererad', 899.00),
        (3, '2024-06-05', 'levererad', 4798.00),
        (1, '2024-06-10', 'skickad', 1598.00),
        (4, '2024-06-12', 'skickad', 12999.00),
        (5, '2024-06-15', 'behandlas', 3499.00),
        (6, '2024-06-18', 'väntande', 8998.00),
        (2, '2024-06-20', 'behandlas', 449.00),
        (7, '2024-06-22', 'levererad', 2098.00),
        (8, '2024-06-25', 'skickad', 5998.00),
        (3, '2024-06-28', 'väntande', 699.00),
        (9, '2024-07-01', 'behandlas', 1299.00),
        (10, '2024-07-05', 'väntande', 4999.00),
        (1, '2024-07-08', 'levererad', 299.00),
        (11, '2024-07-10', 'skickad', 999.00)
    `);

    // Orderrader
    db.run(`
        INSERT INTO orderrader (order_id, produkt_id, antal, pris_per_enhet) VALUES
        (1, 1, 1, 12999.00),
        (1, 2, 1, 299.00),
        (2, 3, 1, 899.00),
        (3, 8, 2, 1299.00),
        (3, 12, 1, 199.00),
        (4, 7, 2, 799.00),
        (5, 1, 1, 12999.00),
        (6, 4, 1, 3499.00),
        (7, 10, 1, 4999.00),
        (7, 11, 1, 3999.00),
        (8, 6, 1, 449.00),
        (9, 3, 1, 899.00),
        (9, 8, 1, 1199.00),
        (10, 10, 1, 4999.00),
        (10, 13, 1, 999.00),
        (11, 14, 1, 699.00),
        (12, 8, 1, 1299.00),
        (13, 10, 1, 4999.00),
        (14, 2, 1, 299.00),
        (15, 13, 1, 999.00)
    `);

    // Anställda
    db.run(`
        INSERT INTO anstalda (fornamn, efternamn, email, avdelning, lon, chef_id, anstallnings_datum) VALUES
        ('Eva', 'Lundgren', 'eva.lundgren@foretag.se', 'Ledning', 85000.00, NULL, '2018-03-01'),
        ('Karl', 'Bergström', 'karl.bergstrom@foretag.se', 'IT', 55000.00, 1, '2019-06-15'),
        ('Malin', 'Ström', 'malin.strom@foretag.se', 'IT', 52000.00, 2, '2020-02-10'),
        ('Oscar', 'Ekberg', 'oscar.ekberg@foretag.se', 'IT', 48000.00, 2, '2021-09-01'),
        ('Ida', 'Henriksson', 'ida.henriksson@foretag.se', 'Försäljning', 58000.00, 1, '2019-01-20'),
        ('Viktor', 'Lindgren', 'viktor.lindgren@foretag.se', 'Försäljning', 45000.00, 5, '2022-04-15'),
        ('Elin', 'Sandberg', 'elin.sandberg@foretag.se', 'Försäljning', 46000.00, 5, '2021-11-01'),
        ('Henrik', 'Norberg', 'henrik.norberg@foretag.se', 'Support', 42000.00, 1, '2020-08-20'),
        ('Lina', 'Björk', 'lina.bjork@foretag.se', 'Support', 40000.00, 8, '2023-01-15'),
        ('David', 'Forsberg', 'david.forsberg@foretag.se', 'IT', 50000.00, 2, '2022-07-01')
    `);

    // Kategorier
    db.run(`
        INSERT INTO kategorier (namn, beskrivning) VALUES
        ('Elektronik', 'Elektroniska produkter och gadgets'),
        ('Tillbehör', 'Tillbehör och komplement'),
        ('Ljud', 'Ljudutrustning och hörlurar'),
        ('Kontor', 'Kontorsutrustning'),
        ('Möbler', 'Kontorsmöbler'),
        ('Lagring', 'Lagringslösningar och hårddiskar')
    `);

    // Städer
    db.run(`
        INSERT INTO stader (namn, lan, befolkning) VALUES
        ('Stockholm', 'Stockholms län', 975904),
        ('Göteborg', 'Västra Götalands län', 583056),
        ('Malmö', 'Skåne län', 347949),
        ('Uppsala', 'Uppsala län', 177074),
        ('Linköping', 'Östergötlands län', 161499),
        ('Västerås', 'Västmanlands län', 127799),
        ('Örebro', 'Örebro län', 155696),
        ('Norrköping', 'Östergötlands län', 141676),
        ('Helsingborg', 'Skåne län', 149280),
        ('Jönköping', 'Jönköpings län', 141081)
    `);
}

// Execute SQL query
function executeSQL(query) {
    if (!db) {
        return { error: 'Databasen är inte initierad' };
    }

    try {
        // Clean up the query
        query = query.trim();

        // Handle multiple statements
        const statements = query.split(';').filter(s => s.trim());
        let results = [];
        let lastResult = null;

        for (const stmt of statements) {
            if (!stmt.trim()) continue;

            const upperStmt = stmt.trim().toUpperCase();

            if (upperStmt.startsWith('SELECT') || upperStmt.startsWith('PRAGMA')) {
                // SELECT returns data
                const result = db.exec(stmt);
                if (result.length > 0) {
                    lastResult = {
                        columns: result[0].columns,
                        values: result[0].values,
                        rowCount: result[0].values.length
                    };
                } else {
                    lastResult = {
                        columns: [],
                        values: [],
                        rowCount: 0
                    };
                }
            } else {
                // Other statements (INSERT, UPDATE, DELETE, CREATE, etc.)
                db.run(stmt);
                const changes = db.getRowsModified();
                lastResult = {
                    message: `Frågan kördes! ${changes} rad(er) påverkades.`,
                    changes: changes
                };
            }
            results.push(lastResult);
        }

        return results.length === 1 ? results[0] : results;
    } catch (error) {
        return { error: error.message };
    }
}

// Get database schema for display
function getSchema() {
    const schema = {
        kunder: {
            columns: [
                { name: 'kund_id', type: 'INTEGER', pk: true },
                { name: 'fornamn', type: 'TEXT' },
                { name: 'efternamn', type: 'TEXT' },
                { name: 'email', type: 'TEXT' },
                { name: 'telefon', type: 'TEXT' },
                { name: 'stad', type: 'TEXT' },
                { name: 'registrerad', type: 'DATE' }
            ]
        },
        produkter: {
            columns: [
                { name: 'produkt_id', type: 'INTEGER', pk: true },
                { name: 'namn', type: 'TEXT' },
                { name: 'kategori', type: 'TEXT' },
                { name: 'pris', type: 'DECIMAL' },
                { name: 'lager_antal', type: 'INTEGER' },
                { name: 'beskrivning', type: 'TEXT' }
            ]
        },
        ordrar: {
            columns: [
                { name: 'order_id', type: 'INTEGER', pk: true },
                { name: 'kund_id', type: 'INTEGER', fk: 'kunder' },
                { name: 'order_datum', type: 'DATE' },
                { name: 'status', type: 'TEXT' },
                { name: 'total_summa', type: 'DECIMAL' }
            ]
        },
        orderrader: {
            columns: [
                { name: 'rad_id', type: 'INTEGER', pk: true },
                { name: 'order_id', type: 'INTEGER', fk: 'ordrar' },
                { name: 'produkt_id', type: 'INTEGER', fk: 'produkter' },
                { name: 'antal', type: 'INTEGER' },
                { name: 'pris_per_enhet', type: 'DECIMAL' }
            ]
        },
        anstalda: {
            columns: [
                { name: 'anstalld_id', type: 'INTEGER', pk: true },
                { name: 'fornamn', type: 'TEXT' },
                { name: 'efternamn', type: 'TEXT' },
                { name: 'email', type: 'TEXT' },
                { name: 'avdelning', type: 'TEXT' },
                { name: 'lon', type: 'DECIMAL' },
                { name: 'chef_id', type: 'INTEGER', fk: 'anstalda' },
                { name: 'anstallnings_datum', type: 'DATE' }
            ]
        },
        kategorier: {
            columns: [
                { name: 'kategori_id', type: 'INTEGER', pk: true },
                { name: 'namn', type: 'TEXT' },
                { name: 'beskrivning', type: 'TEXT' }
            ]
        },
        stader: {
            columns: [
                { name: 'stad_id', type: 'INTEGER', pk: true },
                { name: 'namn', type: 'TEXT' },
                { name: 'lan', type: 'TEXT' },
                { name: 'befolkning', type: 'INTEGER' }
            ]
        }
    };

    return schema;
}

// Update schema panel UI
function updateSchemaPanel() {
    const tablesList = document.getElementById('tables-list');
    if (!tablesList) return;

    const schema = getSchema();
    let html = '';

    for (const [tableName, tableInfo] of Object.entries(schema)) {
        html += `
            <div class="table-item" onclick="toggleTable(this)">
                <div class="table-header">
                    <span class="table-name">
                        <i class="fas fa-table"></i>
                        ${tableName}
                    </span>
                    <i class="fas fa-chevron-down table-toggle"></i>
                </div>
                <div class="table-columns">
                    ${tableInfo.columns.map(col => `
                        <div class="column-item">
                            <span class="column-name ${col.pk ? 'pk' : ''}">${col.name}</span>
                            <span class="column-type">${col.type}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    tablesList.innerHTML = html;
}

function toggleTable(element) {
    element.classList.toggle('expanded');
}

// Reset database to initial state
function resetDatabase() {
    if (db) {
        db.close();
    }
    db = new SQL.Database();
    createTables();
    insertSampleData();
    console.log('🔄 Databas återställd!');
}

// Export for use in other files
window.initDatabase = initDatabase;
window.executeSQL = executeSQL;
window.getSchema = getSchema;
window.resetDatabase = resetDatabase;
window.updateSchemaPanel = updateSchemaPanel;
