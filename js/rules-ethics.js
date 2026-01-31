// =============================================================================
// RULES-ETHICS.JS - Regler, Etik och Best Practices för Produktion
// VIKTIGT för varje utvecklare att känna till!
// =============================================================================

const SQL_RULES = {
    // =========================================================================
    // TURORDNING - SQL:s körningsordning (KRITISKT att memorisera!)
    // =========================================================================
    executionOrder: {
        title: "🧠 SQL Turordning - MEMORISERA DETTA!",
        subtitle: "Ordningen SQL faktiskt körs i (inte samma som du skriver!)",
        content: `
            <div class="rules-section">
                <div class="warning-box big">
                    <h3>⚠️ VIKTIGT!</h3>
                    <p>SQL körs INTE i den ordning du skriver! Memorisera denna ordning:</p>
                </div>

                <div class="execution-order">
                    <div class="order-item">
                        <span class="order-number">1</span>
                        <span class="order-keyword">FROM</span>
                        <span class="order-desc">Välj tabell(er)</span>
                    </div>
                    <div class="order-item">
                        <span class="order-number">2</span>
                        <span class="order-keyword">JOIN</span>
                        <span class="order-desc">Koppla ihop tabeller</span>
                    </div>
                    <div class="order-item">
                        <span class="order-number">3</span>
                        <span class="order-keyword">WHERE</span>
                        <span class="order-desc">Filtrera rader</span>
                    </div>
                    <div class="order-item">
                        <span class="order-number">4</span>
                        <span class="order-keyword">GROUP BY</span>
                        <span class="order-desc">Gruppera</span>
                    </div>
                    <div class="order-item">
                        <span class="order-number">5</span>
                        <span class="order-keyword">HAVING</span>
                        <span class="order-desc">Filtrera grupper</span>
                    </div>
                    <div class="order-item">
                        <span class="order-number">6</span>
                        <span class="order-keyword">SELECT</span>
                        <span class="order-desc">Välj kolumner</span>
                    </div>
                    <div class="order-item">
                        <span class="order-number">7</span>
                        <span class="order-keyword">DISTINCT</span>
                        <span class="order-desc">Ta bort dubletter</span>
                    </div>
                    <div class="order-item">
                        <span class="order-number">8</span>
                        <span class="order-keyword">ORDER BY</span>
                        <span class="order-desc">Sortera</span>
                    </div>
                    <div class="order-item">
                        <span class="order-number">9</span>
                        <span class="order-keyword">LIMIT</span>
                        <span class="order-desc">Begränsa antal</span>
                    </div>
                </div>

                <div class="mnemonic-box">
                    <h4>📝 Minnesregel (engelska):</h4>
                    <p><strong>F</strong>rom <strong>J</strong>apan, <strong>W</strong>here <strong>G</strong>ood <strong>H</strong>eroes <strong>S</strong>ave <strong>D</strong>ragons <strong>O</strong>n <strong>L</strong>and</p>
                    <h4>📝 Minnesregel (svenska):</h4>
                    <p><strong>F</strong>rån <strong>J</strong>önköping <strong>W</strong>ar <strong>G</strong>amla <strong>H</strong>errar <strong>S</strong>jöng <strong>D</strong>åligt <strong>O</strong>ch <strong>L</strong>jöd</p>
                </div>

                <div class="info-box">
                    <h4>💡 Varför är detta viktigt?</h4>
                    <ul>
                        <li>Du kan inte använda en kolumn-alias från SELECT i WHERE (den finns inte än!)</li>
                        <li>HAVING filtrerar efter GROUP BY, WHERE filtrerar före</li>
                        <li>ORDER BY kan använda alias från SELECT (den körs efter)</li>
                    </ul>
                </div>
            </div>
        `
    },

    // =========================================================================
    // HORROR STORIES - Verkliga katastrofer
    // =========================================================================
    horrorStories: {
        title: "💀 Horror Stories - Verkliga SQL-katastrofer",
        subtitle: "Lär dig av andras misstag så du slipper göra dem själv",
        content: `
            <div class="rules-section">
                <div class="horror-story">
                    <h3>🔥 DROP TABLE utan WHERE</h3>
                    <div class="story-box disaster">
                        <p><strong>Vad hände:</strong> En utvecklare ville ta bort testdata och körde:</p>
                        <pre>DELETE FROM users;</pre>
                        <p>Istället för:</p>
                        <pre>DELETE FROM users WHERE environment = 'test';</pre>
                        <p><strong>Resultat:</strong> 10 miljoner användarkonton raderade. 48 timmar att återställa.</p>
                        <p><strong>Kostnad:</strong> ~2 miljoner kronor i förlorad arbetstid och kundkompensation.</p>
                    </div>
                </div>

                <div class="horror-story">
                    <h3>💥 GitLab-incidenten 2017</h3>
                    <div class="story-box disaster">
                        <p><strong>Vad hände:</strong> En trött systemadministratör körde <code>rm -rf</code> på fel server.</p>
                        <p><strong>Resultat:</strong> 300GB produktionsdata förlorad. 18 timmar nedtid.</p>
                        <p><strong>Lärdomar:</strong></p>
                        <ul>
                            <li>Testa ALLTID backups regelbundet</li>
                            <li>Ha en "är du säker?"-process för destruktiva kommandon</li>
                            <li>Kör aldrig destruktiva kommandon när du är trött</li>
                        </ul>
                    </div>
                </div>

                <div class="horror-story">
                    <h3>⚡ UPDATE utan WHERE</h3>
                    <div class="story-box disaster">
                        <p><strong>Vad hände:</strong> En utvecklare ville uppdatera sin egen lön i testmiljön:</p>
                        <pre>UPDATE employees SET salary = 999999;</pre>
                        <p>Men var kopplad till produktion...</p>
                        <p><strong>Resultat:</strong> Alla 5000 anställda fick samma lön i lönesystemet.</p>
                    </div>
                </div>

                <div class="horror-story">
                    <h3>🗑️ DROP TABLE produktionen</h3>
                    <div class="story-box disaster">
                        <p><strong>Vad hände:</strong> Någon körde migreringsscript mot fel databas:</p>
                        <pre>DROP TABLE orders;
DROP TABLE customers;
DROP TABLE products;</pre>
                        <p><strong>Resultat:</strong> E-handelsplattform helt nere i 6 timmar. Förlorade ordrar för 500 000 kr.</p>
                    </div>
                </div>

                <div class="lesson-box">
                    <h3>📚 Lärdomar från katastroferna:</h3>
                    <ol>
                        <li><strong>ALLTID</strong> kör SELECT först för att se vad som påverkas</li>
                        <li><strong>ALLTID</strong> dubbelkolla vilken databas/miljö du är kopplad till</li>
                        <li><strong>ALDRIG</strong> kör DELETE/UPDATE/DROP utan WHERE (utom om du VERKLIGEN menar alla rader)</li>
                        <li><strong>ALLTID</strong> ha backups och TESTA att de fungerar</li>
                        <li><strong>ALLTID</strong> använd transaktioner för kritiska ändringar</li>
                    </ol>
                </div>
            </div>
        `
    },

    // =========================================================================
    // PRODUKTION - Best Practices
    // =========================================================================
    productionRules: {
        title: "🏭 Produktionsregler - Best Practices",
        subtitle: "Regler som alla professionella utvecklare följer",
        content: `
            <div class="rules-section">
                <div class="rule-category">
                    <h3>🔒 Innan du kör något i produktion</h3>
                    <div class="checklist">
                        <div class="check-item">
                            <span class="check-box">☑️</span>
                            <span>Dubbelkolla vilken databas du är kopplad till</span>
                        </div>
                        <div class="check-item">
                            <span class="check-box">☑️</span>
                            <span>Kör SELECT först för att se vad som påverkas</span>
                        </div>
                        <div class="check-item">
                            <span class="check-box">☑️</span>
                            <span>Använd BEGIN TRANSACTION för ändringar</span>
                        </div>
                        <div class="check-item">
                            <span class="check-box">☑️</span>
                            <span>Ha en backup innan stora ändringar</span>
                        </div>
                        <div class="check-item">
                            <span class="check-box">☑️</span>
                            <span>Låt en kollega granska din query</span>
                        </div>
                    </div>
                </div>

                <div class="rule-category">
                    <h3>🛡️ Säkra DELETE och UPDATE</h3>
                    <pre>-- ❌ FARLIGT! Påverkar ALLA rader
DELETE FROM users;
UPDATE products SET price = 0;

-- ✅ SÄKERT! Kontrollera först med SELECT
SELECT * FROM users WHERE status = 'inactive';
-- Ser bra ut? Då kan du köra:
DELETE FROM users WHERE status = 'inactive';

-- ✅ ÄNNU SÄKRARE! Använd transaktioner
BEGIN TRANSACTION;
DELETE FROM users WHERE status = 'inactive';
-- Kontrollera resultatet, sedan:
COMMIT;  -- eller ROLLBACK; om något gick fel</pre>
                </div>

                <div class="rule-category">
                    <h3>📋 Code Review för SQL</h3>
                    <ul>
                        <li>ALDRIG pusha databasändringar utan code review</li>
                        <li>Alla migreringar ska granskas av minst en person</li>
                        <li>Testa på staging/test-miljö först</li>
                        <li>Dokumentera vad ändringen gör och varför</li>
                    </ul>
                </div>

                <div class="rule-category">
                    <h3>⏰ När du INTE ska köra queries</h3>
                    <ul>
                        <li>❌ Fredag eftermiddag (ingen vill felsöka över helgen)</li>
                        <li>❌ När du är trött eller stressad</li>
                        <li>❌ Mitt i peak hours (hög trafik)</li>
                        <li>❌ Utan backup</li>
                        <li>✅ Tisdag-torsdag morgon är bäst</li>
                    </ul>
                </div>
            </div>
        `
    },

    // =========================================================================
    // SAFE PATTERNS - Säkra mönster
    // =========================================================================
    safePatterns: {
        title: "✅ Säkra mönster - Copy-Paste dessa!",
        subtitle: "Använd dessa mallar för att undvika misstag",
        content: `
            <div class="rules-section">
                <div class="pattern-box">
                    <h3>🔍 Säker DELETE</h3>
                    <pre>-- Steg 1: Se vad som kommer raderas
SELECT * FROM tabell WHERE villkor;

-- Steg 2: Räkna hur många rader
SELECT COUNT(*) FROM tabell WHERE villkor;

-- Steg 3: Radera med transaktion
BEGIN TRANSACTION;
DELETE FROM tabell WHERE villkor;
-- Kontrollera att det blev rätt antal rader
-- COMMIT; eller ROLLBACK;</pre>
                </div>

                <div class="pattern-box">
                    <h3>📝 Säker UPDATE</h3>
                    <pre>-- Steg 1: Se nuvarande värden
SELECT id, kolumn_att_ändra FROM tabell WHERE villkor;

-- Steg 2: Testa med transaktion
BEGIN TRANSACTION;
UPDATE tabell SET kolumn = nytt_värde WHERE villkor;
-- Se resultatet
SELECT * FROM tabell WHERE villkor;
-- COMMIT; eller ROLLBACK;</pre>
                </div>

                <div class="pattern-box">
                    <h3>🏗️ Säker ALTER TABLE</h3>
                    <pre>-- Steg 1: Ta backup först!
-- Steg 2: Kör i test-miljö först
-- Steg 3: I produktion, använd:

BEGIN TRANSACTION;
ALTER TABLE tabell ADD COLUMN ny_kolumn TEXT;
-- Kontrollera schema
PRAGMA table_info(tabell);
-- COMMIT; eller ROLLBACK;</pre>
                </div>

                <div class="pattern-box">
                    <h3>🚀 Säker migrering</h3>
                    <pre>-- migrations/001_add_user_status.sql
-- Beskrivning: Lägger till status-kolumn för användare
-- Författare: Ditt namn
-- Datum: 2024-01-15
-- Testad: ✅ Lokal, ✅ Test, ⏳ Produktion

BEGIN TRANSACTION;

-- Lägg till kolumnen
ALTER TABLE users ADD COLUMN status TEXT DEFAULT 'active';

-- Uppdatera befintliga användare
UPDATE users SET status = 'active' WHERE status IS NULL;

COMMIT;

-- Rollback-script (spara separat!):
-- ALTER TABLE users DROP COLUMN status;</pre>
                </div>
            </div>
        `
    },

    // =========================================================================
    // SQL INJECTION - Säkerhet
    // =========================================================================
    sqlInjection: {
        title: "🔐 SQL Injection - Förstå hotet",
        subtitle: "Hur hackare utnyttjar osäkra queries och hur du skyddar dig",
        content: `
            <div class="rules-section">
                <div class="warning-box big">
                    <h3>⚠️ Vad är SQL Injection?</h3>
                    <p>SQL Injection är när en angripare kan köra sin egen SQL-kod genom att manipulera input-fält.</p>
                </div>

                <div class="example-box danger">
                    <h3>❌ Sårbar kod (ALDRIG gör så här!)</h3>
                    <pre>// JavaScript - DÅLIGT!
const query = "SELECT * FROM users WHERE name = '" + userInput + "'";

// Om användaren skriver: ' OR '1'='1
// Blir queryn: SELECT * FROM users WHERE name = '' OR '1'='1'
// Detta returnerar ALLA användare!</pre>
                </div>

                <div class="example-box danger">
                    <h3>💀 Ännu värre: Data destruction</h3>
                    <pre>// Om användaren skriver: '; DROP TABLE users; --
// Blir queryn: SELECT * FROM users WHERE name = ''; DROP TABLE users; --'
// Hela user-tabellen raderas!</pre>
                </div>

                <div class="example-box success">
                    <h3>✅ Säker kod (Prepared statements)</h3>
                    <pre>// JavaScript med prepared statements - BRA!
const query = "SELECT * FROM users WHERE name = ?";
db.run(query, [userInput]);

// Python
cursor.execute("SELECT * FROM users WHERE name = ?", (user_input,))

// Användarens input behandlas som DATA, inte som SQL-kod!</pre>
                </div>

                <div class="rule-category">
                    <h3>🛡️ Skydda dig mot SQL Injection</h3>
                    <ol>
                        <li><strong>ALLTID</strong> använd prepared statements / parameterized queries</li>
                        <li><strong>ALDRIG</strong> konkatenera (sätt ihop) user input direkt i SQL</li>
                        <li>Validera och sanera all input</li>
                        <li>Använd minsta möjliga databasbehörighet</li>
                        <li>Håll databasmjukvara uppdaterad</li>
                    </ol>
                </div>

                <div class="info-box">
                    <h4>🎯 Testa din kunskap</h4>
                    <p>Webbplatser som <a href="https://portswigger.net/web-security/sql-injection" target="_blank">PortSwigger</a> har övningar där du kan träna på att hitta och utnyttja SQL injection (lagligt, i deras testmiljö).</p>
                </div>
            </div>
        `
    },

    // =========================================================================
    // PERFORMANCE - Prestanda
    // =========================================================================
    performance: {
        title: "⚡ Performance - Snabba queries",
        subtitle: "Skriv queries som inte gör databasen långsam",
        content: `
            <div class="rules-section">
                <div class="comparison-box">
                    <div class="bad-example">
                        <h4>❌ Långsamt</h4>
                        <pre>SELECT * FROM orders
WHERE YEAR(order_date) = 2024;</pre>
                        <p>Funktioner på kolumner förhindrar index-användning</p>
                    </div>
                    <div class="good-example">
                        <h4>✅ Snabbt</h4>
                        <pre>SELECT * FROM orders
WHERE order_date >= '2024-01-01'
  AND order_date < '2025-01-01';</pre>
                        <p>Index kan användas!</p>
                    </div>
                </div>

                <div class="comparison-box">
                    <div class="bad-example">
                        <h4>❌ Långsamt</h4>
                        <pre>SELECT * FROM products;</pre>
                        <p>Hämtar ALLA kolumner även om du bara behöver några</p>
                    </div>
                    <div class="good-example">
                        <h4>✅ Snabbt</h4>
                        <pre>SELECT id, name, price
FROM products;</pre>
                        <p>Hämta bara det du behöver!</p>
                    </div>
                </div>

                <div class="comparison-box">
                    <div class="bad-example">
                        <h4>❌ Långsamt</h4>
                        <pre>SELECT * FROM users
WHERE email LIKE '%@gmail.com';</pre>
                        <p>Wildcard i början = full table scan</p>
                    </div>
                    <div class="good-example">
                        <h4>✅ Snabbare</h4>
                        <pre>SELECT * FROM users
WHERE email LIKE 'anna%';</pre>
                        <p>Wildcard i slutet = index kan användas</p>
                    </div>
                </div>

                <div class="tip-box">
                    <h3>💡 Performance-tips</h3>
                    <ul>
                        <li>Skapa index på kolumner du ofta söker/filtrerar på</li>
                        <li>Undvik <code>SELECT *</code> - välj bara kolumner du behöver</li>
                        <li>Använd <code>LIMIT</code> för att begränsa resultat</li>
                        <li>Använd <code>EXPLAIN</code> för att analysera din query</li>
                        <li>Undvik funktioner på indexerade kolumner i WHERE</li>
                    </ul>
                </div>
            </div>
        `
    }
};

// =========================================================================
// CHEAT SHEET - Snabbreferens
// =========================================================================
const SQL_CHEATSHEET = {
    basics: {
        emoji: "📋",
        title: "Grundläggande SQL",
        commands: [
            { syntax: "SELECT * FROM tabell", description: "Hämta alla kolumner från en tabell" },
            { syntax: "SELECT kolumn1, kolumn2 FROM tabell", description: "Hämta specifika kolumner" },
            { syntax: "SELECT DISTINCT kolumn FROM tabell", description: "Hämta unika värden (inga dubbletter)" },
            { syntax: "SELECT kolumn AS alias FROM tabell", description: "Ge kolumnen ett annat namn" },
            { syntax: "SELECT * FROM tabell LIMIT 10", description: "Begränsa till 10 rader" }
        ]
    },
    filtering: {
        emoji: "🔍",
        title: "Filtrera med WHERE",
        commands: [
            { syntax: "WHERE kolumn = 'värde'", description: "Lika med (text kräver citattecken)" },
            { syntax: "WHERE kolumn > 100", description: "Större än (siffror utan citattecken)" },
            { syntax: "WHERE kolumn >= 100", description: "Större än eller lika med" },
            { syntax: "WHERE kolumn < 100", description: "Mindre än" },
            { syntax: "WHERE kolumn <= 100", description: "Mindre än eller lika med" },
            { syntax: "WHERE kolumn != 'värde'", description: "Inte lika med" },
            { syntax: "WHERE kolumn BETWEEN 10 AND 100", description: "Mellan två värden (inklusive)" },
            { syntax: "WHERE kolumn IN ('a', 'b', 'c')", description: "Matchar något i listan" },
            { syntax: "WHERE kolumn LIKE 'A%'", description: "Börjar på A (% = wildcard)" },
            { syntax: "WHERE kolumn LIKE '%son'", description: "Slutar på 'son'" },
            { syntax: "WHERE kolumn IS NULL", description: "Är tomt/saknas" },
            { syntax: "WHERE kolumn IS NOT NULL", description: "Har ett värde" }
        ]
    },
    combining: {
        emoji: "🔗",
        title: "Kombinera villkor",
        commands: [
            { syntax: "WHERE a = 1 AND b = 2", description: "Båda villkoren måste stämma" },
            { syntax: "WHERE a = 1 OR b = 2", description: "Minst ett villkor måste stämma" },
            { syntax: "WHERE NOT a = 1", description: "Villkoret får INTE stämma" },
            { syntax: "WHERE (a = 1 OR b = 2) AND c = 3", description: "Parenteser för gruppering" }
        ]
    },
    sorting: {
        emoji: "📑",
        title: "Sortera & Begränsa",
        commands: [
            { syntax: "ORDER BY kolumn", description: "Sortera stigande (A-Z, 0-9)" },
            { syntax: "ORDER BY kolumn ASC", description: "Samma som ovan (ASC = stigande)" },
            { syntax: "ORDER BY kolumn DESC", description: "Sortera fallande (Z-A, 9-0)" },
            { syntax: "ORDER BY a DESC, b ASC", description: "Sortera på flera kolumner" },
            { syntax: "LIMIT 10", description: "Visa max 10 rader" },
            { syntax: "LIMIT 10 OFFSET 20", description: "Hoppa över 20, visa 10" }
        ]
    },
    aggregates: {
        emoji: "📊",
        title: "Aggregatfunktioner",
        commands: [
            { syntax: "SELECT COUNT(*) FROM tabell", description: "Räkna antal rader" },
            { syntax: "SELECT COUNT(kolumn) FROM tabell", description: "Räkna icke-NULL värden" },
            { syntax: "SELECT SUM(kolumn) FROM tabell", description: "Summera alla värden" },
            { syntax: "SELECT AVG(kolumn) FROM tabell", description: "Beräkna medelvärde" },
            { syntax: "SELECT MIN(kolumn) FROM tabell", description: "Hitta minsta värdet" },
            { syntax: "SELECT MAX(kolumn) FROM tabell", description: "Hitta största värdet" }
        ]
    },
    grouping: {
        emoji: "📦",
        title: "Gruppera data",
        commands: [
            { syntax: "GROUP BY kolumn", description: "Gruppera rader med samma värde" },
            { syntax: "SELECT stad, COUNT(*) FROM kunder GROUP BY stad", description: "Räkna kunder per stad" },
            { syntax: "HAVING COUNT(*) > 5", description: "Filtrera grupper (efter GROUP BY)" },
            { syntax: "SELECT kategori, AVG(pris) FROM produkter GROUP BY kategori HAVING AVG(pris) > 100", description: "Kategorier med snittpris > 100" }
        ]
    },
    joins: {
        emoji: "🔗",
        title: "JOINs - Koppla tabeller",
        commands: [
            { syntax: "FROM a INNER JOIN b ON a.id = b.a_id", description: "Endast matchande rader" },
            { syntax: "FROM a LEFT JOIN b ON a.id = b.a_id", description: "Alla från vänster + matchande" },
            { syntax: "FROM a RIGHT JOIN b ON a.id = b.a_id", description: "Alla från höger + matchande" },
            { syntax: "FROM a CROSS JOIN b", description: "Alla kombinationer (kartesisk produkt)" }
        ]
    },
    modify: {
        emoji: "✏️",
        title: "Modifiera data",
        commands: [
            { syntax: "INSERT INTO tabell (a, b) VALUES (1, 2)", description: "Lägg till en ny rad" },
            { syntax: "INSERT INTO tabell (a, b) VALUES (1, 2), (3, 4)", description: "Lägg till flera rader" },
            { syntax: "UPDATE tabell SET kolumn = 'nytt' WHERE id = 1", description: "Uppdatera befintlig rad" },
            { syntax: "DELETE FROM tabell WHERE id = 1", description: "Radera rad (ALLTID med WHERE!)" }
        ]
    },
    tables: {
        emoji: "🏗️",
        title: "Skapa tabeller",
        commands: [
            { syntax: "CREATE TABLE namn (id INTEGER PRIMARY KEY, ...)", description: "Skapa ny tabell" },
            { syntax: "kolumn TEXT NOT NULL", description: "Text som måste ha värde" },
            { syntax: "kolumn INTEGER DEFAULT 0", description: "Heltal med standardvärde" },
            { syntax: "kolumn TEXT UNIQUE", description: "Värdet måste vara unikt" },
            { syntax: "FOREIGN KEY (kund_id) REFERENCES kunder(id)", description: "Referens till annan tabell" },
            { syntax: "DROP TABLE tabell", description: "Radera tabell (FÖRSIKTIGT!)" },
            { syntax: "ALTER TABLE t ADD kolumn TEXT", description: "Lägg till kolumn" }
        ]
    },
    transactions: {
        emoji: "🔄",
        title: "Transaktioner",
        commands: [
            { syntax: "BEGIN TRANSACTION;", description: "Starta transaktion" },
            { syntax: "COMMIT;", description: "Spara alla ändringar" },
            { syntax: "ROLLBACK;", description: "Ångra alla ändringar" }
        ]
    }
};

// =========================================================================
// Hjälpfunktioner
// =========================================================================
function getRulesSection(sectionId) {
    return SQL_RULES[sectionId];
}

function getAllRulesSections() {
    return Object.keys(SQL_RULES);
}

function getCheatsheetSection(sectionId) {
    return SQL_CHEATSHEET[sectionId];
}

function getAllCheatsheetSections() {
    return Object.keys(SQL_CHEATSHEET);
}

// Export
if (typeof window !== 'undefined') {
    window.SQL_RULES = SQL_RULES;
    window.SQL_CHEATSHEET = SQL_CHEATSHEET;
    window.getRulesSection = getRulesSection;
    window.getAllRulesSections = getAllRulesSections;
    window.getCheatsheetSection = getCheatsheetSection;
    window.getAllCheatsheetSections = getAllCheatsheetSections;
}
