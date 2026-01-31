// ===== SQL Quest - Exercises & Learning Content =====

// All exercises organized by day
const exercises = {
    // ========== DAG 1: GRUNDER & SELECT ==========
    day1: {
        title: "Grunder & SELECT",
        description: "Lär dig grunderna i SQL och hur man hämtar data från databaser",
        theory: `
            <h4>📚 Dag 1: Välkommen till SQL!</h4>

            <div class="concept-box">
                <h5>Vad är SQL?</h5>
                <p>SQL (Structured Query Language) är ett språk för att kommunicera med databaser.
                Det används för att hämta, lägga till, uppdatera och ta bort data.</p>
            </div>

            <h5>🗃️ Vad är en databas?</h5>
            <p>En databas är som ett digitalt arkivskåp där data organiseras i <strong>tabeller</strong>.
            Varje tabell har:</p>
            <ul>
                <li><strong>Kolumner</strong> - Definierar vilken typ av data (t.ex. namn, email)</li>
                <li><strong>Rader</strong> - Varje rad är en post med data</li>
            </ul>

            <h5>🔍 SELECT - Hämta data</h5>
            <p>SELECT är det vanligaste SQL-kommandot. Det används för att hämta data från en tabell.</p>

            <pre><code>-- Hämta alla kolumner
SELECT * FROM tabellnamn;

-- Hämta specifika kolumner
SELECT kolumn1, kolumn2 FROM tabellnamn;</code></pre>

            <div class="concept-box">
                <h5>⭐ Viktigt att komma ihåg</h5>
                <ul>
                    <li><code>*</code> betyder "alla kolumner"</li>
                    <li>Varje SQL-sats avslutas med semikolon <code>;</code></li>
                    <li>SQL är INTE skiftlägeskänsligt (SELECT = select = SeLeCt)</li>
                </ul>
            </div>

            <h5>🎯 WHERE - Filtrera resultat</h5>
            <p>WHERE används för att filtrera vilka rader som returneras:</p>

            <pre><code>SELECT * FROM kunder
WHERE stad = 'Stockholm';</code></pre>

            <h5>Jämförelseoperatorer:</h5>
            <ul>
                <li><code>=</code> Lika med</li>
                <li><code>!=</code> eller <code><></code> Inte lika med</li>
                <li><code>></code> Större än</li>
                <li><code><</code> Mindre än</li>
                <li><code>>=</code> Större än eller lika med</li>
                <li><code><=</code> Mindre än eller lika med</li>
            </ul>
        `,
        exercises: [
            {
                id: 1,
                title: "Hämta alla kunder",
                difficulty: "easy",
                description: "Skriv en SQL-fråga som hämtar ALLA kolumner från tabellen 'kunder'.",
                hint: "Använd SELECT * för att hämta alla kolumner. Tabellen heter 'kunder'.",
                solution: "SELECT * FROM kunder",
                validate: (result) => {
                    if (result.error) return false;
                    return result.columns && result.columns.includes('kund_id') &&
                        result.columns.includes('fornamn') && result.rowCount >= 10;
                }
            },
            {
                id: 2,
                title: "Välj specifika kolumner",
                difficulty: "easy",
                description: "Hämta endast förnamn och efternamn från tabellen 'kunder'.",
                hint: "Skriv kolumnnamnen separerade med komma efter SELECT.",
                solution: "SELECT fornamn, efternamn FROM kunder",
                validate: (result) => {
                    if (result.error) return false;
                    return result.columns &&
                        result.columns.length === 2 &&
                        result.columns.includes('fornamn') &&
                        result.columns.includes('efternamn');
                }
            },
            {
                id: 3,
                title: "Se alla produkter",
                difficulty: "easy",
                description: "Visa alla produkter och deras information.",
                hint: "Tabellen med produkter heter 'produkter'.",
                solution: "SELECT * FROM produkter",
                validate: (result) => {
                    if (result.error) return false;
                    return result.columns && result.columns.includes('produkt_id') &&
                        result.columns.includes('namn') && result.rowCount >= 10;
                }
            },
            {
                id: 4,
                title: "Kunder i Stockholm",
                difficulty: "easy",
                description: "Hitta alla kunder som bor i Stockholm.",
                hint: "Använd WHERE för att filtrera på stad. Tänk på att textvärden ska vara inom citattecken.",
                solution: "SELECT * FROM kunder WHERE stad = 'Stockholm'",
                validate: (result) => {
                    if (result.error) return false;
                    if (!result.values) return false;
                    // Check all results are from Stockholm
                    const stadIndex = result.columns.indexOf('stad');
                    return result.values.every(row => row[stadIndex] === 'Stockholm');
                }
            },
            {
                id: 5,
                title: "Dyra produkter",
                difficulty: "medium",
                description: "Hitta alla produkter som kostar mer än 1000 kr. Visa produktnamn och pris.",
                hint: "Använd WHERE med > operatorn för att jämföra priser.",
                solution: "SELECT namn, pris FROM produkter WHERE pris > 1000",
                validate: (result) => {
                    if (result.error) return false;
                    if (!result.values || result.values.length === 0) return false;
                    const prisIndex = result.columns.indexOf('pris');
                    return result.values.every(row => row[prisIndex] > 1000);
                }
            },
            {
                id: 6,
                title: "Anställda på IT-avdelningen",
                difficulty: "medium",
                description: "Lista alla anställda som arbetar på IT-avdelningen. Visa deras förnamn, efternamn och lön.",
                hint: "Tabellen heter 'anstalda' och kolumnen för avdelning heter 'avdelning'.",
                solution: "SELECT fornamn, efternamn, lon FROM anstalda WHERE avdelning = 'IT'",
                validate: (result) => {
                    if (result.error) return false;
                    return result.columns &&
                        result.columns.includes('fornamn') &&
                        result.columns.includes('efternamn') &&
                        result.columns.includes('lon') &&
                        result.rowCount >= 3;
                }
            },
            {
                id: 7,
                title: "Produkter med lågt lager",
                difficulty: "medium",
                description: "Hitta produkter där lagerantal är 30 eller mindre.",
                hint: "Använd <= operatorn. Kolumnen heter 'lager_antal'.",
                solution: "SELECT * FROM produkter WHERE lager_antal <= 30",
                validate: (result) => {
                    if (result.error) return false;
                    if (!result.values) return false;
                    const lagerIndex = result.columns.indexOf('lager_antal');
                    return result.values.every(row => row[lagerIndex] <= 30) && result.rowCount > 0;
                }
            }
        ]
    },

    // ========== DAG 2: FILTRERA & SORTERA ==========
    day2: {
        title: "Filtrera & Sortera",
        description: "Lär dig avancerad filtrering och sortering av data",
        theory: `
            <h4>📚 Dag 2: Filtrera & Sortera</h4>

            <h5>🔀 ORDER BY - Sortera resultat</h5>
            <p>ORDER BY sorterar resultatet efter en eller flera kolumner:</p>

            <pre><code>-- Sortera stigande (A-Ö, 1-100)
SELECT * FROM produkter
ORDER BY pris ASC;

-- Sortera fallande (Ö-A, 100-1)
SELECT * FROM produkter
ORDER BY pris DESC;</code></pre>

            <div class="concept-box">
                <h5>💡 Tips</h5>
                <p>ASC är standard om du inte anger något. DESC för fallande ordning.</p>
            </div>

            <h5>🔢 LIMIT - Begränsa antal</h5>
            <p>LIMIT begränsar hur många rader som returneras:</p>

            <pre><code>-- Visa endast 5 första
SELECT * FROM kunder
LIMIT 5;

-- Kombinera med ORDER BY
SELECT * FROM produkter
ORDER BY pris DESC
LIMIT 3;</code></pre>

            <h5>🔍 LIKE - Sök med mönster</h5>
            <p>LIKE används för att söka efter mönster i text:</p>

            <pre><code>-- % = valfritt antal tecken
SELECT * FROM kunder
WHERE fornamn LIKE 'A%';  -- Börjar med A

SELECT * FROM kunder
WHERE email LIKE '%@email.se';  -- Slutar med @email.se

-- _ = exakt ett tecken
SELECT * FROM produkter
WHERE namn LIKE '_aptop%';  -- Andra bokstaven är 'a'</code></pre>

            <h5>📋 IN - Flera värden</h5>
            <p>IN kontrollerar om värdet finns i en lista:</p>

            <pre><code>SELECT * FROM kunder
WHERE stad IN ('Stockholm', 'Göteborg', 'Malmö');</code></pre>

            <h5>📏 BETWEEN - Intervall</h5>
            <p>BETWEEN väljer värden inom ett intervall (inklusive gränserna):</p>

            <pre><code>SELECT * FROM produkter
WHERE pris BETWEEN 500 AND 1500;</code></pre>

            <h5>🔗 AND, OR, NOT - Kombinera villkor</h5>
            <pre><code>-- Båda villkoren måste vara sanna
SELECT * FROM produkter
WHERE kategori = 'Elektronik' AND pris > 1000;

-- Minst ett villkor måste vara sant
SELECT * FROM kunder
WHERE stad = 'Stockholm' OR stad = 'Göteborg';

-- Negera ett villkor
SELECT * FROM produkter
WHERE NOT kategori = 'Möbler';</code></pre>
        `,
        exercises: [
            {
                id: 1,
                title: "Billigaste produkterna först",
                difficulty: "easy",
                description: "Visa alla produkter sorterade efter pris, från billigast till dyrast.",
                hint: "Använd ORDER BY pris ASC (eller bara ORDER BY pris).",
                solution: "SELECT * FROM produkter ORDER BY pris ASC",
                validate: (result) => {
                    if (result.error || !result.values || result.values.length < 2) return false;
                    const prisIndex = result.columns.indexOf('pris');
                    for (let i = 1; i < result.values.length; i++) {
                        if (result.values[i][prisIndex] < result.values[i - 1][prisIndex]) return false;
                    }
                    return true;
                }
            },
            {
                id: 2,
                title: "Topp 5 dyraste produkterna",
                difficulty: "easy",
                description: "Visa de 5 dyraste produkterna (namn och pris).",
                hint: "Kombinera ORDER BY DESC med LIMIT.",
                solution: "SELECT namn, pris FROM produkter ORDER BY pris DESC LIMIT 5",
                validate: (result) => {
                    if (result.error) return false;
                    return result.rowCount === 5 &&
                        result.columns.includes('namn') &&
                        result.columns.includes('pris');
                }
            },
            {
                id: 3,
                title: "Kunder vars namn börjar på 'M'",
                difficulty: "easy",
                description: "Hitta alla kunder vars förnamn börjar på bokstaven M.",
                hint: "Använd LIKE med % efter M.",
                solution: "SELECT * FROM kunder WHERE fornamn LIKE 'M%'",
                validate: (result) => {
                    if (result.error || !result.values) return false;
                    const fornamnIndex = result.columns.indexOf('fornamn');
                    return result.values.every(row => row[fornamnIndex].startsWith('M')) && result.rowCount > 0;
                }
            },
            {
                id: 4,
                title: "Produkter i prisintervall",
                difficulty: "medium",
                description: "Hitta produkter som kostar mellan 500 och 2000 kr.",
                hint: "Använd BETWEEN för att ange intervallet.",
                solution: "SELECT * FROM produkter WHERE pris BETWEEN 500 AND 2000",
                validate: (result) => {
                    if (result.error || !result.values) return false;
                    const prisIndex = result.columns.indexOf('pris');
                    return result.values.every(row => row[prisIndex] >= 500 && row[prisIndex] <= 2000) && result.rowCount > 0;
                }
            },
            {
                id: 5,
                title: "Storstads-kunder",
                difficulty: "medium",
                description: "Visa kunder som bor i Stockholm, Göteborg eller Malmö.",
                hint: "Använd IN för att välja från en lista med städer.",
                solution: "SELECT * FROM kunder WHERE stad IN ('Stockholm', 'Göteborg', 'Malmö')",
                validate: (result) => {
                    if (result.error || !result.values) return false;
                    const stadIndex = result.columns.indexOf('stad');
                    const validStader = ['Stockholm', 'Göteborg', 'Malmö'];
                    return result.values.every(row => validStader.includes(row[stadIndex])) && result.rowCount > 0;
                }
            },
            {
                id: 6,
                title: "Elektronik under 1000 kr",
                difficulty: "medium",
                description: "Hitta elektronikprodukter som kostar under 1000 kr.",
                hint: "Kombinera två villkor med AND.",
                solution: "SELECT * FROM produkter WHERE kategori = 'Elektronik' AND pris < 1000",
                validate: (result) => {
                    if (result.error || !result.values) return false;
                    const katIndex = result.columns.indexOf('kategori');
                    const prisIndex = result.columns.indexOf('pris');
                    return result.values.every(row =>
                        row[katIndex] === 'Elektronik' && row[prisIndex] < 1000
                    ) && result.rowCount > 0;
                }
            },
            {
                id: 7,
                title: "Sök efter email-domän",
                difficulty: "hard",
                description: "Hitta alla kunder vars email slutar på '@email.se'. Sortera efter efternamn.",
                hint: "Använd LIKE med % i början och kombinera med ORDER BY.",
                solution: "SELECT * FROM kunder WHERE email LIKE '%@email.se' ORDER BY efternamn",
                validate: (result) => {
                    if (result.error || !result.values) return false;
                    const emailIndex = result.columns.indexOf('email');
                    return result.values.every(row => row[emailIndex].endsWith('@email.se')) && result.rowCount > 0;
                }
            }
        ]
    },

    // ========== DAG 3: AGGREGERING ==========
    day3: {
        title: "Aggregering",
        description: "Lär dig räkna, summera och gruppera data",
        theory: `
            <h4>📚 Dag 3: Aggregatfunktioner</h4>

            <p>Aggregatfunktioner utför beräkningar på flera rader och returnerar ett enda värde.</p>

            <h5>📊 De vanligaste funktionerna</h5>

            <pre><code>-- COUNT - Räkna antal rader
SELECT COUNT(*) FROM kunder;

-- SUM - Summera värden
SELECT SUM(pris) FROM produkter;

-- AVG - Beräkna medelvärde
SELECT AVG(lon) FROM anstalda;

-- MIN/MAX - Hitta lägsta/högsta
SELECT MIN(pris), MAX(pris) FROM produkter;</code></pre>

            <div class="concept-box">
                <h5>💡 COUNT-varianter</h5>
                <ul>
                    <li><code>COUNT(*)</code> - Räknar alla rader</li>
                    <li><code>COUNT(kolumn)</code> - Räknar rader där kolumnen INTE är NULL</li>
                    <li><code>COUNT(DISTINCT kolumn)</code> - Räknar unika värden</li>
                </ul>
            </div>

            <h5>👥 GROUP BY - Gruppera resultat</h5>
            <p>GROUP BY grupperar rader med samma värde och tillåter aggregering per grupp:</p>

            <pre><code>-- Räkna produkter per kategori
SELECT kategori, COUNT(*) as antal
FROM produkter
GROUP BY kategori;

-- Genomsnittslön per avdelning
SELECT avdelning, AVG(lon) as snittlon
FROM anstalda
GROUP BY avdelning;</code></pre>

            <h5>🎯 HAVING - Filtrera grupper</h5>
            <p>HAVING är som WHERE, men för grupperade resultat:</p>

            <pre><code>-- Kategorier med mer än 2 produkter
SELECT kategori, COUNT(*) as antal
FROM produkter
GROUP BY kategori
HAVING COUNT(*) > 2;</code></pre>

            <div class="concept-box">
                <h5>⚠️ WHERE vs HAVING</h5>
                <ul>
                    <li><strong>WHERE</strong> - Filtrerar INNAN gruppering</li>
                    <li><strong>HAVING</strong> - Filtrerar EFTER gruppering</li>
                </ul>
            </div>

            <h5>🏷️ AS - Ge alias till kolumner</h5>
            <pre><code>SELECT
    COUNT(*) AS antal_kunder,
    AVG(pris) AS genomsnittspris
FROM produkter;</code></pre>
        `,
        exercises: [
            {
                id: 1,
                title: "Räkna alla kunder",
                difficulty: "easy",
                description: "Hur många kunder finns det totalt i databasen?",
                hint: "Använd COUNT(*) för att räkna alla rader.",
                solution: "SELECT COUNT(*) FROM kunder",
                validate: (result) => {
                    if (result.error || !result.values) return false;
                    return result.values[0][0] >= 10;
                }
            },
            {
                id: 2,
                title: "Total produktvärde",
                difficulty: "easy",
                description: "Vad är det totala värdet av alla produkter (summan av alla priser)?",
                hint: "Använd SUM() på pris-kolumnen.",
                solution: "SELECT SUM(pris) FROM produkter",
                validate: (result) => {
                    if (result.error || !result.values) return false;
                    return result.values[0][0] > 0;
                }
            },
            {
                id: 3,
                title: "Genomsnittlig lön",
                difficulty: "easy",
                description: "Vad är genomsnittslönen för alla anställda?",
                hint: "Använd AVG() funktionen.",
                solution: "SELECT AVG(lon) FROM anstalda",
                validate: (result) => {
                    if (result.error || !result.values) return false;
                    return result.values[0][0] > 40000 && result.values[0][0] < 60000;
                }
            },
            {
                id: 4,
                title: "Dyraste och billigaste",
                difficulty: "easy",
                description: "Visa det högsta och lägsta priset bland alla produkter.",
                hint: "Använd MIN() och MAX() i samma SELECT.",
                solution: "SELECT MIN(pris), MAX(pris) FROM produkter",
                validate: (result) => {
                    if (result.error || !result.values) return false;
                    return result.columns.length === 2 && result.values[0][0] < result.values[0][1];
                }
            },
            {
                id: 5,
                title: "Produkter per kategori",
                difficulty: "medium",
                description: "Räkna hur många produkter det finns i varje kategori.",
                hint: "Använd GROUP BY tillsammans med COUNT().",
                solution: "SELECT kategori, COUNT(*) FROM produkter GROUP BY kategori",
                validate: (result) => {
                    if (result.error || !result.values) return false;
                    return result.columns.includes('kategori') && result.rowCount >= 4;
                }
            },
            {
                id: 6,
                title: "Kunder per stad",
                difficulty: "medium",
                description: "Visa antal kunder per stad, sorterat från flest till minst.",
                hint: "Kombinera GROUP BY med ORDER BY DESC.",
                solution: "SELECT stad, COUNT(*) as antal FROM kunder GROUP BY stad ORDER BY antal DESC",
                validate: (result) => {
                    if (result.error || !result.values) return false;
                    // Check that it's sorted descending
                    for (let i = 1; i < result.values.length; i++) {
                        if (result.values[i][1] > result.values[i - 1][1]) return false;
                    }
                    return true;
                }
            },
            {
                id: 7,
                title: "Avdelningar med hög snittlön",
                difficulty: "hard",
                description: "Visa avdelningar där genomsnittslönen är över 50000 kr.",
                hint: "Använd GROUP BY och filtrera med HAVING på AVG(lon).",
                solution: "SELECT avdelning, AVG(lon) as snittlon FROM anstalda GROUP BY avdelning HAVING AVG(lon) > 50000",
                validate: (result) => {
                    if (result.error || !result.values) return false;
                    return result.values.every(row => row[1] > 50000) && result.rowCount > 0;
                }
            }
        ]
    },

    // ========== DAG 4: RELATIONER & JOINs ==========
    day4: {
        title: "Relationer & JOINs",
        description: "Lär dig kombinera data från flera tabeller",
        theory: `
            <h4>📚 Dag 4: JOINs - Kombinera tabeller</h4>

            <p>I relationsdatabaser är data uppdelad i flera tabeller. JOINs används för att kombinera dem.</p>

            <h5>🔑 Nycklar och Relationer</h5>
            <div class="concept-box">
                <h5>Primary Key (PK)</h5>
                <p>En unik identifierare för varje rad. Exempel: <code>kund_id</code></p>

                <h5>Foreign Key (FK)</h5>
                <p>En kolumn som refererar till en annan tabells primary key. Exempel: <code>kund_id</code> i ordrar-tabellen.</p>
            </div>

            <h5>🔗 INNER JOIN</h5>
            <p>Returnerar endast rader där det finns matchning i BÅDA tabellerna:</p>

            <pre><code>SELECT kunder.fornamn, ordrar.order_datum
FROM kunder
INNER JOIN ordrar ON kunder.kund_id = ordrar.kund_id;</code></pre>

            <h5>⬅️ LEFT JOIN</h5>
            <p>Returnerar ALLA rader från vänster tabell, även om det inte finns matchning:</p>

            <pre><code>-- Alla kunder, även de utan ordrar
SELECT kunder.fornamn, ordrar.order_id
FROM kunder
LEFT JOIN ordrar ON kunder.kund_id = ordrar.kund_id;</code></pre>

            <h5>➡️ RIGHT JOIN</h5>
            <p>Returnerar ALLA rader från höger tabell (inte alltid stött i SQLite).</p>

            <h5>🏷️ Tabell-alias</h5>
            <p>Förkorta tabellnamn för läsbarhet:</p>

            <pre><code>SELECT k.fornamn, o.order_datum
FROM kunder AS k
INNER JOIN ordrar AS o ON k.kund_id = o.kund_id;</code></pre>

            <h5>🔗 Flera JOINs</h5>
            <p>Du kan kedja flera JOINs:</p>

            <pre><code>SELECT k.fornamn, p.namn as produkt
FROM kunder k
INNER JOIN ordrar o ON k.kund_id = o.kund_id
INNER JOIN orderrader r ON o.order_id = r.order_id
INNER JOIN produkter p ON r.produkt_id = p.produkt_id;</code></pre>
        `,
        exercises: [
            {
                id: 1,
                title: "Kunder med ordrar",
                difficulty: "easy",
                description: "Visa kundernas förnamn och deras orderdatum. Använd INNER JOIN.",
                hint: "JOIN kunder och ordrar på kund_id.",
                solution: "SELECT kunder.fornamn, ordrar.order_datum FROM kunder INNER JOIN ordrar ON kunder.kund_id = ordrar.kund_id",
                validate: (result) => {
                    if (result.error || !result.values) return false;
                    return result.columns.includes('fornamn') &&
                        result.columns.includes('order_datum') &&
                        result.rowCount > 5;
                }
            },
            {
                id: 2,
                title: "Ordrar med kundinfo",
                difficulty: "easy",
                description: "Visa order_id, kundens förnamn och efternamn för alla ordrar.",
                hint: "SELECT specifika kolumner från båda tabellerna.",
                solution: "SELECT ordrar.order_id, kunder.fornamn, kunder.efternamn FROM ordrar INNER JOIN kunder ON ordrar.kund_id = kunder.kund_id",
                validate: (result) => {
                    if (result.error || !result.values) return false;
                    return result.columns.includes('order_id') &&
                        result.columns.includes('fornamn');
                }
            },
            {
                id: 3,
                title: "Alla kunder (även utan ordrar)",
                difficulty: "medium",
                description: "Visa alla kunder och deras ordrar (om de har några). Kunder utan ordrar ska också visas.",
                hint: "Använd LEFT JOIN istället för INNER JOIN.",
                solution: "SELECT kunder.fornamn, kunder.efternamn, ordrar.order_id FROM kunder LEFT JOIN ordrar ON kunder.kund_id = ordrar.kund_id",
                validate: (result) => {
                    if (result.error || !result.values) return false;
                    // Should have 12 customers, some with NULL order_id
                    return result.columns.includes('fornamn') && result.rowCount >= 12;
                }
            },
            {
                id: 4,
                title: "Anställda med chefer",
                difficulty: "medium",
                description: "Visa anställdas namn och deras chefs namn (self-join på anstalda-tabellen).",
                hint: "JOIN anstalda med sig själv: a1.chef_id = a2.anstalld_id",
                solution: "SELECT a1.fornamn as anstalld, a2.fornamn as chef FROM anstalda a1 LEFT JOIN anstalda a2 ON a1.chef_id = a2.anstalld_id",
                validate: (result) => {
                    if (result.error || !result.values) return false;
                    return result.rowCount >= 8;
                }
            },
            {
                id: 5,
                title: "Orderdetaljer",
                difficulty: "medium",
                description: "Visa order_id, produktnamn och antal för varje orderrad.",
                hint: "JOIN orderrader med produkter.",
                solution: "SELECT orderrader.order_id, produkter.namn, orderrader.antal FROM orderrader INNER JOIN produkter ON orderrader.produkt_id = produkter.produkt_id",
                validate: (result) => {
                    if (result.error || !result.values) return false;
                    return result.columns.includes('order_id') &&
                        result.columns.includes('namn') &&
                        result.columns.includes('antal');
                }
            },
            {
                id: 6,
                title: "Komplett orderöversikt",
                difficulty: "hard",
                description: "Visa kundens förnamn, order_datum och produktnamn för alla ordrar. (Kräver 3 JOINs!)",
                hint: "Kedja: kunder -> ordrar -> orderrader -> produkter",
                solution: "SELECT k.fornamn, o.order_datum, p.namn FROM kunder k INNER JOIN ordrar o ON k.kund_id = o.kund_id INNER JOIN orderrader r ON o.order_id = r.order_id INNER JOIN produkter p ON r.produkt_id = p.produkt_id",
                validate: (result) => {
                    if (result.error || !result.values) return false;
                    return result.columns.includes('fornamn') &&
                        result.columns.includes('order_datum') &&
                        result.columns.includes('namn') &&
                        result.rowCount > 10;
                }
            },
            {
                id: 7,
                title: "Ordersummering per kund",
                difficulty: "hard",
                description: "Visa kundens förnamn och totalt antal ordrar de gjort. Sortera från flest till minst.",
                hint: "Kombinera JOIN med GROUP BY och COUNT().",
                solution: "SELECT k.fornamn, COUNT(o.order_id) as antal_ordrar FROM kunder k LEFT JOIN ordrar o ON k.kund_id = o.kund_id GROUP BY k.kund_id ORDER BY antal_ordrar DESC",
                validate: (result) => {
                    if (result.error || !result.values) return false;
                    return result.columns.length === 2 && result.rowCount >= 10;
                }
            }
        ]
    },

    // ========== DAG 5: SKAPA & MODIFIERA ==========
    day5: {
        title: "Skapa & Modifiera",
        description: "Lär dig skapa tabeller och ändra data",
        theory: `
            <h4>📚 Dag 5: CREATE, INSERT, UPDATE, DELETE</h4>

            <h5>🏗️ CREATE TABLE</h5>
            <p>Skapa en ny tabell med definierade kolumner:</p>

            <pre><code>CREATE TABLE min_tabell (
    id INTEGER PRIMARY KEY,
    namn TEXT NOT NULL,
    pris DECIMAL(10,2),
    aktiv BOOLEAN DEFAULT true
);</code></pre>

            <div class="concept-box">
                <h5>Vanliga datatyper</h5>
                <ul>
                    <li><code>INTEGER</code> - Heltal</li>
                    <li><code>TEXT</code> - Text/strängar</li>
                    <li><code>DECIMAL(p,s)</code> - Decimaltal</li>
                    <li><code>DATE</code> - Datum</li>
                    <li><code>BOOLEAN</code> - Sant/Falskt</li>
                </ul>
            </div>

            <h5>Kolumnbegränsningar (Constraints)</h5>
            <ul>
                <li><code>PRIMARY KEY</code> - Unik identifierare</li>
                <li><code>NOT NULL</code> - Får inte vara tom</li>
                <li><code>UNIQUE</code> - Måste vara unikt</li>
                <li><code>DEFAULT värde</code> - Standardvärde</li>
                <li><code>FOREIGN KEY</code> - Referens till annan tabell</li>
            </ul>

            <h5>➕ INSERT INTO</h5>
            <p>Lägg till nya rader:</p>

            <pre><code>-- Specificera kolumner
INSERT INTO kunder (fornamn, efternamn, email)
VALUES ('Test', 'Testsson', 'test@test.se');

-- Flera rader samtidigt
INSERT INTO produkter (namn, pris) VALUES
    ('Produkt A', 100),
    ('Produkt B', 200);</code></pre>

            <h5>✏️ UPDATE</h5>
            <p>Uppdatera befintliga rader:</p>

            <pre><code>UPDATE produkter
SET pris = 999
WHERE produkt_id = 1;

-- ⚠️ VIKTIGT: Utan WHERE uppdateras ALLA rader!
UPDATE produkter SET pris = 0;  -- Farligt!</code></pre>

            <h5>🗑️ DELETE</h5>
            <p>Ta bort rader:</p>

            <pre><code>DELETE FROM kunder
WHERE kund_id = 5;

-- ⚠️ Utan WHERE raderas ALLT!
DELETE FROM kunder;  -- Tar bort alla kunder!</code></pre>

            <div class="concept-box">
                <h5>⚠️ Varning!</h5>
                <p>Glöm ALDRIG WHERE-satsen vid UPDATE och DELETE om du inte vill påverka alla rader!</p>
            </div>
        `,
        exercises: [
            {
                id: 1,
                title: "Skapa en enkel tabell",
                difficulty: "easy",
                description: "Skapa en tabell 'test_tabell' med kolumnerna: id (INTEGER PRIMARY KEY) och namn (TEXT).",
                hint: "Använd CREATE TABLE med kolumndefinitioner.",
                solution: "CREATE TABLE test_tabell (id INTEGER PRIMARY KEY, namn TEXT)",
                validate: (result) => {
                    if (result.error) return false;
                    // Verify table exists
                    const check = executeSQL("SELECT name FROM sqlite_master WHERE type='table' AND name='test_tabell'");
                    return check.values && check.values.length > 0;
                }
            },
            {
                id: 2,
                title: "Lägg till en ny kund",
                difficulty: "easy",
                description: "Lägg till en ny kund: förnamn 'Test', efternamn 'Testsson', stad 'Teststad'.",
                hint: "Använd INSERT INTO med VALUES.",
                solution: "INSERT INTO kunder (fornamn, efternamn, stad) VALUES ('Test', 'Testsson', 'Teststad')",
                validate: (result) => {
                    if (result.error) return false;
                    const check = executeSQL("SELECT * FROM kunder WHERE fornamn = 'Test' AND efternamn = 'Testsson'");
                    return check.values && check.values.length > 0;
                }
            },
            {
                id: 3,
                title: "Lägg till ny produkt",
                difficulty: "easy",
                description: "Lägg till produkten 'Testprodukt' i kategorin 'Test' med priset 123.50.",
                hint: "INSERT INTO produkter med namn, kategori och pris.",
                solution: "INSERT INTO produkter (namn, kategori, pris) VALUES ('Testprodukt', 'Test', 123.50)",
                validate: (result) => {
                    if (result.error) return false;
                    const check = executeSQL("SELECT * FROM produkter WHERE namn = 'Testprodukt'");
                    return check.values && check.values.length > 0;
                }
            },
            {
                id: 4,
                title: "Uppdatera produktpris",
                difficulty: "medium",
                description: "Uppdatera priset på 'Trådlös Mus' till 349 kr.",
                hint: "Använd UPDATE med SET och WHERE.",
                solution: "UPDATE produkter SET pris = 349 WHERE namn = 'Trådlös Mus'",
                validate: (result) => {
                    if (result.error) return false;
                    const check = executeSQL("SELECT pris FROM produkter WHERE namn = 'Trådlös Mus'");
                    return check.values && check.values[0][0] === 349;
                }
            },
            {
                id: 5,
                title: "Ge alla IT-anställda löneökning",
                difficulty: "medium",
                description: "Öka lönen med 5000 kr för alla anställda på IT-avdelningen.",
                hint: "UPDATE med SET lon = lon + 5000 WHERE avdelning = 'IT'.",
                solution: "UPDATE anstalda SET lon = lon + 5000 WHERE avdelning = 'IT'",
                validate: (result) => {
                    if (result.error) return false;
                    return result.changes > 0;
                }
            },
            {
                id: 6,
                title: "Ta bort testdata",
                difficulty: "medium",
                description: "Ta bort kunden med förnamn 'Test' (som du skapade tidigare).",
                hint: "Använd DELETE FROM med WHERE.",
                solution: "DELETE FROM kunder WHERE fornamn = 'Test'",
                validate: (result) => {
                    if (result.error) return false;
                    const check = executeSQL("SELECT * FROM kunder WHERE fornamn = 'Test'");
                    return check.values && check.values.length === 0;
                }
            },
            {
                id: 7,
                title: "Skapa tabell med constraints",
                difficulty: "hard",
                description: "Skapa tabellen 'projekt' med: projekt_id (INTEGER PRIMARY KEY), namn (TEXT NOT NULL), budget (DECIMAL), start_datum (DATE DEFAULT CURRENT_DATE).",
                hint: "Kombinera flera constraints i CREATE TABLE.",
                solution: "CREATE TABLE projekt (projekt_id INTEGER PRIMARY KEY, namn TEXT NOT NULL, budget DECIMAL, start_datum DATE DEFAULT CURRENT_DATE)",
                validate: (result) => {
                    if (result.error) return false;
                    const check = executeSQL("SELECT name FROM sqlite_master WHERE type='table' AND name='projekt'");
                    return check.values && check.values.length > 0;
                }
            }
        ]
    },

    // ========== DAG 6: NORMALISERING ==========
    day6: {
        title: "Normalisering",
        description: "Lär dig designa effektiva databaser",
        theory: `
            <h4>📚 Dag 6: Normalisering & Databasdesign</h4>

            <p>Normalisering är processen att organisera data för att minimera redundans och förbättra dataintegritet.</p>

            <h5>❌ Varför inte ha allt i en tabell?</h5>
            <pre><code>-- DÅLIGT: Redundant data
| order_id | kund_namn | kund_email | produkt | pris |
|----------|-----------|------------|---------|------|
| 1        | Anna      | anna@...   | Laptop  | 12999|
| 2        | Anna      | anna@...   | Mus     | 299  |
-- "Anna" och email upprepas!</code></pre>

            <h5>✅ 1NF - Första Normalformen</h5>
            <div class="concept-box">
                <h5>Regler:</h5>
                <ul>
                    <li>Varje cell innehåller ETT värde (atomärt)</li>
                    <li>Varje rad är unik (har en primärnyckel)</li>
                    <li>Inga upprepande grupper</li>
                </ul>
            </div>

            <pre><code>-- DÅLIGT (inte 1NF):
| kund | telefoner          |
|------|-------------------|
| Anna | 070-123, 073-456  |  -- Flera värden!

-- BRA (1NF):
| kund | telefon   |
|------|-----------|
| Anna | 070-123   |
| Anna | 073-456   |</code></pre>

            <h5>✅ 2NF - Andra Normalformen</h5>
            <div class="concept-box">
                <h5>Regler:</h5>
                <ul>
                    <li>Uppfyller 1NF</li>
                    <li>Alla icke-nyckelkolumner beror på HELA primärnyckeln</li>
                </ul>
            </div>

            <pre><code>-- DÅLIGT (inte 2NF):
| order_id | produkt_id | produkt_namn | antal |
-- produkt_namn beror bara på produkt_id, inte order_id!

-- BRA (2NF): Separera till två tabeller
Ordrar: | order_id | produkt_id | antal |
Produkter: | produkt_id | produkt_namn |</code></pre>

            <h5>✅ 3NF - Tredje Normalformen</h5>
            <div class="concept-box">
                <h5>Regler:</h5>
                <ul>
                    <li>Uppfyller 2NF</li>
                    <li>Inga transitiva beroenden (A → B → C)</li>
                </ul>
            </div>

            <pre><code>-- DÅLIGT (inte 3NF):
| anstalld_id | avdelning | avdelnings_chef |
-- avdelnings_chef beror på avdelning, inte anstalld_id!

-- BRA (3NF):
Anstalda: | anstalld_id | avdelning_id |
Avdelningar: | avdelning_id | namn | chef_id |</code></pre>

            <h5>🔗 Relationstyper</h5>
            <ul>
                <li><strong>1:1</strong> - En kund har ett kundkonto</li>
                <li><strong>1:N</strong> - En kund kan ha många ordrar</li>
                <li><strong>N:M</strong> - Produkter kan finnas i många ordrar, ordrar kan ha många produkter (kräver mellantabell)</li>
            </ul>
        `,
        exercises: [
            {
                id: 1,
                title: "Identifiera problemet",
                difficulty: "easy",
                description: "Kör denna fråga och fundera: Vad är problemet med att lagra 'kategori' som text i produkter-tabellen?\n\nSELECT namn, kategori FROM produkter WHERE kategori = 'Elektronik';",
                hint: "Tänk på vad som händer om du stavar fel på 'Elektronik' någonstans.",
                solution: "SELECT namn, kategori FROM produkter WHERE kategori = 'Elektronik'",
                validate: (result) => {
                    if (result.error) return false;
                    return result.values && result.values.length > 0;
                }
            },
            {
                id: 2,
                title: "Se kategorier-tabellen",
                difficulty: "easy",
                description: "Vi har redan en normaliserad kategorier-tabell! Visa alla kategorier.",
                hint: "SELECT * FROM kategorier",
                solution: "SELECT * FROM kategorier",
                validate: (result) => {
                    if (result.error) return false;
                    return result.columns.includes('kategori_id') && result.rowCount >= 4;
                }
            },
            {
                id: 3,
                title: "Räkna unika städer",
                difficulty: "easy",
                description: "Hur många unika städer finns bland kunderna? (Hint: Onormaliserat - stad är text)",
                hint: "Använd COUNT(DISTINCT stad).",
                solution: "SELECT COUNT(DISTINCT stad) FROM kunder",
                validate: (result) => {
                    if (result.error) return false;
                    return result.values && result.values[0][0] >= 5;
                }
            },
            {
                id: 4,
                title: "Jämför med städer-tabellen",
                difficulty: "medium",
                description: "Vi har en normaliserad städer-tabell med extra info. Visa alla städer med befolkning över 200000.",
                hint: "SELECT från stader WHERE befolkning > 200000.",
                solution: "SELECT * FROM stader WHERE befolkning > 200000",
                validate: (result) => {
                    if (result.error) return false;
                    return result.values && result.values.every(row => {
                        const befIndex = result.columns.indexOf('befolkning');
                        return row[befIndex] > 200000;
                    });
                }
            },
            {
                id: 5,
                title: "Skapa normaliserad koppling",
                difficulty: "medium",
                description: "Skapa en tabell 'kund_stad' som kopplar kund_id till stad_id (för framtida normalisering).",
                hint: "CREATE TABLE med två kolumner som båda är foreign keys.",
                solution: "CREATE TABLE kund_stad (kund_id INTEGER, stad_id INTEGER, FOREIGN KEY (kund_id) REFERENCES kunder(kund_id), FOREIGN KEY (stad_id) REFERENCES stader(stad_id))",
                validate: (result) => {
                    if (result.error) return false;
                    const check = executeSQL("SELECT name FROM sqlite_master WHERE type='table' AND name='kund_stad'");
                    return check.values && check.values.length > 0;
                }
            },
            {
                id: 6,
                title: "Hitta redundans",
                difficulty: "hard",
                description: "Hitta kunder som bor i städer som FINNS i städer-tabellen. Visa kundens namn och stadens befolkning.",
                hint: "JOIN kunder med stader där kunder.stad = stader.namn.",
                solution: "SELECT k.fornamn, k.efternamn, s.befolkning FROM kunder k INNER JOIN stader s ON k.stad = s.namn",
                validate: (result) => {
                    if (result.error) return false;
                    return result.columns.includes('fornamn') &&
                        result.columns.includes('befolkning') &&
                        result.rowCount > 0;
                }
            },
            {
                id: 7,
                title: "Analysera orderstruktur",
                difficulty: "hard",
                description: "Vår ordrar/orderrader-struktur är normaliserad (N:M). Visa hur många produktrader varje order har.",
                hint: "JOIN ordrar med orderrader och GROUP BY order_id.",
                solution: "SELECT o.order_id, COUNT(r.rad_id) as antal_produkter FROM ordrar o LEFT JOIN orderrader r ON o.order_id = r.order_id GROUP BY o.order_id",
                validate: (result) => {
                    if (result.error) return false;
                    return result.columns.includes('order_id') && result.rowCount > 0;
                }
            }
        ]
    },

    // ========== DAG 7: AVANCERAT ==========
    day7: {
        title: "Avancerat & Projekt",
        description: "Subqueries, Views, och avancerade tekniker",
        theory: `
            <h4>📚 Dag 7: Avancerade Tekniker</h4>

            <h5>🔄 Subqueries (Underfrågor)</h5>
            <p>En query inuti en annan query:</p>

            <pre><code>-- Hitta produkter dyrare än genomsnittet
SELECT namn, pris FROM produkter
WHERE pris > (SELECT AVG(pris) FROM produkter);

-- Subquery i FROM (derived table)
SELECT avd, snitt FROM (
    SELECT avdelning as avd, AVG(lon) as snitt
    FROM anstalda GROUP BY avdelning
) WHERE snitt > 50000;</code></pre>

            <div class="concept-box">
                <h5>Subquery-typer</h5>
                <ul>
                    <li><strong>Scalar</strong> - Returnerar ett värde</li>
                    <li><strong>Row</strong> - Returnerar en rad</li>
                    <li><strong>Table</strong> - Returnerar flera rader/kolumner</li>
                </ul>
            </div>

            <h5>👁️ VIEWS</h5>
            <p>En sparad query som fungerar som en virtuell tabell:</p>

            <pre><code>-- Skapa en view
CREATE VIEW order_summering AS
SELECT k.fornamn, COUNT(o.order_id) as antal
FROM kunder k
LEFT JOIN ordrar o ON k.kund_id = o.kund_id
GROUP BY k.kund_id;

-- Använd view som en tabell
SELECT * FROM order_summering WHERE antal > 1;</code></pre>

            <h5>📊 CASE - Villkorlig logik</h5>
            <pre><code>SELECT namn, pris,
    CASE
        WHEN pris < 500 THEN 'Billig'
        WHEN pris < 2000 THEN 'Medium'
        ELSE 'Dyr'
    END as prisklass
FROM produkter;</code></pre>

            <h5>🔢 Fönsterfunktioner (Window Functions)</h5>
            <pre><code>-- Ranking
SELECT namn, pris,
    RANK() OVER (ORDER BY pris DESC) as rank
FROM produkter;

-- Running total
SELECT order_id, total_summa,
    SUM(total_summa) OVER (ORDER BY order_datum) as running_total
FROM ordrar;</code></pre>

            <h5>⚡ INDEX - Snabbare sökningar</h5>
            <pre><code>-- Skapa index
CREATE INDEX idx_kund_stad ON kunder(stad);

-- Index snabbar upp WHERE-satser på den kolumnen</code></pre>

            <h5>💡 Tips för optimering</h5>
            <ul>
                <li>Använd INDEX på kolumner du ofta söker på</li>
                <li>Undvik SELECT * i produktion</li>
                <li>Använd EXPLAIN för att analysera queries</li>
            </ul>
        `,
        exercises: [
            {
                id: 1,
                title: "Produkter över genomsnitt",
                difficulty: "medium",
                description: "Hitta alla produkter som kostar mer än genomsnittspriset.",
                hint: "Använd en subquery: WHERE pris > (SELECT AVG(pris) ...)",
                solution: "SELECT * FROM produkter WHERE pris > (SELECT AVG(pris) FROM produkter)",
                validate: (result) => {
                    if (result.error || !result.values) return false;
                    const avgResult = executeSQL("SELECT AVG(pris) FROM produkter");
                    const avg = avgResult.values[0][0];
                    const prisIndex = result.columns.indexOf('pris');
                    return result.values.every(row => row[prisIndex] > avg);
                }
            },
            {
                id: 2,
                title: "Bäst betalda per avdelning",
                difficulty: "medium",
                description: "Visa den högsta lönen per avdelning.",
                hint: "GROUP BY avdelning med MAX(lon).",
                solution: "SELECT avdelning, MAX(lon) as hogsta_lon FROM anstalda GROUP BY avdelning",
                validate: (result) => {
                    if (result.error) return false;
                    return result.columns.includes('avdelning') && result.rowCount >= 3;
                }
            },
            {
                id: 3,
                title: "Klassificera produkter",
                difficulty: "medium",
                description: "Använd CASE för att klassificera produkter som 'Billig' (< 500), 'Medium' (500-2000), eller 'Dyr' (> 2000). Visa namn, pris och prisklass.",
                hint: "CASE WHEN pris < 500 THEN 'Billig' ... END as prisklass",
                solution: "SELECT namn, pris, CASE WHEN pris < 500 THEN 'Billig' WHEN pris <= 2000 THEN 'Medium' ELSE 'Dyr' END as prisklass FROM produkter",
                validate: (result) => {
                    if (result.error) return false;
                    return result.columns.includes('prisklass') && result.rowCount > 0;
                }
            },
            {
                id: 4,
                title: "Skapa en View",
                difficulty: "hard",
                description: "Skapa en view 'aktiva_ordrar' som visar ordrar med status 'behandlas' eller 'väntande'.",
                hint: "CREATE VIEW ... AS SELECT ... WHERE status IN (...)",
                solution: "CREATE VIEW aktiva_ordrar AS SELECT * FROM ordrar WHERE status IN ('behandlas', 'väntande')",
                validate: (result) => {
                    if (result.error) return false;
                    const check = executeSQL("SELECT * FROM aktiva_ordrar");
                    return !check.error && check.values && check.values.length > 0;
                }
            },
            {
                id: 5,
                title: "Använd din View",
                difficulty: "easy",
                description: "Använd view:en 'aktiva_ordrar' för att räkna hur många aktiva ordrar det finns.",
                hint: "SELECT COUNT(*) FROM aktiva_ordrar",
                solution: "SELECT COUNT(*) FROM aktiva_ordrar",
                validate: (result) => {
                    if (result.error) return false;
                    return result.values && result.values[0][0] > 0;
                }
            },
            {
                id: 6,
                title: "Kunder med flest ordrar",
                difficulty: "hard",
                description: "Hitta topp 3 kunder med flest ordrar. Visa förnamn, efternamn och antal ordrar.",
                hint: "JOIN + GROUP BY + ORDER BY + LIMIT.",
                solution: "SELECT k.fornamn, k.efternamn, COUNT(o.order_id) as antal_ordrar FROM kunder k LEFT JOIN ordrar o ON k.kund_id = o.kund_id GROUP BY k.kund_id ORDER BY antal_ordrar DESC LIMIT 3",
                validate: (result) => {
                    if (result.error) return false;
                    return result.rowCount === 3 && result.columns.includes('fornamn');
                }
            },
            {
                id: 7,
                title: "Total försäljning per kategori",
                difficulty: "hard",
                description: "Beräkna total försäljning (antal * pris) per produktkategori. Visa kategori och total.",
                hint: "JOIN orderrader med produkter, GROUP BY kategori, SUM(antal * pris_per_enhet).",
                solution: "SELECT p.kategori, SUM(r.antal * r.pris_per_enhet) as total_forsaljning FROM orderrader r INNER JOIN produkter p ON r.produkt_id = p.produkt_id GROUP BY p.kategori ORDER BY total_forsaljning DESC",
                validate: (result) => {
                    if (result.error) return false;
                    return result.columns.includes('kategori') && result.rowCount >= 3;
                }
            }
        ]
    }
};

// Get exercises for a specific day
function getDayExercises(day) {
    return exercises[`day${day}`] || null;
}

// Get specific exercise
function getExercise(day, exerciseIndex) {
    const dayData = getDayExercises(day);
    if (!dayData || !dayData.exercises[exerciseIndex]) return null;
    return dayData.exercises[exerciseIndex];
}

// Get theory for a day
function getDayTheory(day) {
    const dayData = getDayExercises(day);
    return dayData ? dayData.theory : null;
}

// Export
window.exercises = exercises;
window.getDayExercises = getDayExercises;
window.getExercise = getExercise;
window.getDayTheory = getDayTheory;
