// =============================================================================
// WARMUP.JS - Uppvärmningsövningar för varje SQL-koncept
// Små, enkla övningar där man bara upprepar tills det sitter!
// =============================================================================

const WARMUP_EXERCISES = {
    // =========================================================================
    // SELECT - Hämta data
    // =========================================================================
    SELECT: {
        title: "SELECT - Hämta data",
        emoji: "📊",
        description: "SELECT används för att hämta data från en tabell. Det är det absolut vanligaste kommandot i SQL!",
        syntax: "SELECT kolumn1, kolumn2 FROM tabell;",
        explanation: `
            <div class="concept-box">
                <h4>🎯 Vad gör SELECT?</h4>
                <p>SELECT betyder "välj" på engelska. Du <strong>väljer</strong> vilka kolumner du vill se.</p>

                <h4>📝 Syntax</h4>
                <pre>SELECT kolumn FROM tabell;</pre>

                <h4>💡 Tips</h4>
                <ul>
                    <li><code>SELECT *</code> = Hämta ALLA kolumner</li>
                    <li><code>SELECT namn</code> = Hämta bara namn-kolumnen</li>
                    <li><code>SELECT namn, pris</code> = Hämta namn och pris</li>
                </ul>

                <h4>🔥 Kom ihåg</h4>
                <p>SELECT är alltid FÖRST i en SQL-fråga!</p>
            </div>
        `,
        exercises: [
            {
                id: "warmup_select_1",
                task: "Hämta ALLA kolumner från tabellen 'produkter'",
                hint: "Använd * för att hämta alla kolumner",
                solution: "SELECT * FROM produkter;",
                validate: (result) => result && result.columns && result.columns.length >= 4
            },
            {
                id: "warmup_select_2",
                task: "Hämta bara kolumnen 'namn' från tabellen 'produkter'",
                hint: "Skriv kolumnnamnet istället för *",
                solution: "SELECT namn FROM produkter;",
                validate: (result) => result && result.columns && result.columns.length === 1 && result.columns[0].toLowerCase() === 'namn'
            },
            {
                id: "warmup_select_3",
                task: "Hämta kolumnerna 'namn' och 'pris' från 'produkter'",
                hint: "Separera kolumnnamn med komma",
                solution: "SELECT namn, pris FROM produkter;",
                validate: (result) => result && result.columns && result.columns.length === 2
            },
            {
                id: "warmup_select_4",
                task: "Hämta alla kolumner från tabellen 'kunder'",
                hint: "Samma som övning 1, men annan tabell",
                solution: "SELECT * FROM kunder;",
                validate: (result) => result && result.values && result.values.length > 0
            },
            {
                id: "warmup_select_5",
                task: "Hämta 'namn' och 'email' från 'kunder'",
                hint: "Två kolumner, separerade med komma",
                solution: "SELECT namn, email FROM kunder;",
                validate: (result) => result && result.columns && result.columns.length === 2
            }
        ]
    },

    // =========================================================================
    // FROM - Från vilken tabell
    // =========================================================================
    FROM: {
        title: "FROM - Vilken tabell?",
        emoji: "📁",
        description: "FROM anger vilken tabell du vill hämta data ifrån.",
        syntax: "SELECT kolumn FROM tabellnamn;",
        explanation: `
            <div class="concept-box">
                <h4>🎯 Vad gör FROM?</h4>
                <p>FROM betyder "från" på engelska. Du anger <strong>från vilken tabell</strong> du vill hämta data.</p>

                <h4>📝 Syntax</h4>
                <pre>SELECT * FROM tabellnamn;</pre>

                <h4>💡 Tabeller i databasen</h4>
                <ul>
                    <li><code>produkter</code> - Alla produkter i butiken</li>
                    <li><code>kunder</code> - Alla kunder</li>
                    <li><code>ordrar</code> - Alla ordrar</li>
                    <li><code>anstalda</code> - Alla anställda</li>
                    <li><code>kategorier</code> - Produktkategorier</li>
                </ul>

                <h4>🔥 Kom ihåg</h4>
                <p>FROM kommer alltid EFTER SELECT!</p>
            </div>
        `,
        exercises: [
            {
                id: "warmup_from_1",
                task: "Hämta allt från tabellen 'kategorier'",
                hint: "SELECT * FROM ...",
                solution: "SELECT * FROM kategorier;",
                validate: (result) => result && result.values && result.values.length > 0
            },
            {
                id: "warmup_from_2",
                task: "Hämta allt från tabellen 'anstalda'",
                hint: "Byt ut tabellnamnet",
                solution: "SELECT * FROM anstalda;",
                validate: (result) => result && result.values && result.values.length > 0
            },
            {
                id: "warmup_from_3",
                task: "Hämta allt från tabellen 'ordrar'",
                hint: "SELECT * FROM ordrar",
                solution: "SELECT * FROM ordrar;",
                validate: (result) => result && result.values && result.values.length > 0
            },
            {
                id: "warmup_from_4",
                task: "Hämta namn från produkter",
                hint: "SELECT namn FROM produkter",
                solution: "SELECT namn FROM produkter;",
                validate: (result) => result && result.columns && result.columns[0].toLowerCase() === 'namn'
            },
            {
                id: "warmup_from_5",
                task: "Hämta stad från kunder",
                hint: "SELECT stad FROM kunder",
                solution: "SELECT stad FROM kunder;",
                validate: (result) => result && result.columns && result.columns[0].toLowerCase() === 'stad'
            }
        ]
    },

    // =========================================================================
    // WHERE - Filtrera data
    // =========================================================================
    WHERE: {
        title: "WHERE - Filtrera",
        emoji: "🔍",
        description: "WHERE filtrerar resultatet så du bara får de rader som uppfyller ett villkor.",
        syntax: "SELECT * FROM tabell WHERE villkor;",
        explanation: `
            <div class="concept-box">
                <h4>🎯 Vad gör WHERE?</h4>
                <p>WHERE betyder "där" på engelska. Du filtrerar och får bara rader <strong>där</strong> villkoret stämmer.</p>

                <h4>📝 Syntax</h4>
                <pre>SELECT * FROM tabell WHERE kolumn = värde;</pre>

                <h4>💡 Operatorer</h4>
                <ul>
                    <li><code>=</code> Lika med</li>
                    <li><code>></code> Större än</li>
                    <li><code><</code> Mindre än</li>
                    <li><code>>=</code> Större eller lika</li>
                    <li><code><=</code> Mindre eller lika</li>
                    <li><code>!=</code> eller <code><></code> Inte lika med</li>
                </ul>

                <h4>⚠️ Viktigt!</h4>
                <p>Text måste vara inom citattecken: <code>WHERE namn = 'Anna'</code></p>
                <p>Siffror utan citattecken: <code>WHERE pris > 100</code></p>
            </div>
        `,
        exercises: [
            {
                id: "warmup_where_1",
                task: "Hämta produkter där pris är större än 1000",
                hint: "WHERE pris > 1000",
                solution: "SELECT * FROM produkter WHERE pris > 1000;",
                validate: (result) => result && result.values && result.values.every(row => row[2] > 1000)
            },
            {
                id: "warmup_where_2",
                task: "Hämta kunder från Stockholm",
                hint: "WHERE stad = 'Stockholm' (med citattecken!)",
                solution: "SELECT * FROM kunder WHERE stad = 'Stockholm';",
                validate: (result) => result && result.values && result.values.length > 0
            },
            {
                id: "warmup_where_3",
                task: "Hämta produkter där lager är mindre än 50",
                hint: "WHERE lager < 50",
                solution: "SELECT * FROM produkter WHERE lager < 50;",
                validate: (result) => result && result.values && result.values.every(row => row[3] < 50)
            },
            {
                id: "warmup_where_4",
                task: "Hämta produkter där pris är exakt 299",
                hint: "WHERE pris = 299",
                solution: "SELECT * FROM produkter WHERE pris = 299;",
                validate: (result) => result && result.values && result.values.length > 0
            },
            {
                id: "warmup_where_5",
                task: "Hämta anställda i avdelningen 'IT'",
                hint: "WHERE avdelning = 'IT'",
                solution: "SELECT * FROM anstalda WHERE avdelning = 'IT';",
                validate: (result) => result && result.values && result.values.length > 0
            }
        ]
    },

    // =========================================================================
    // AND/OR - Kombinera villkor
    // =========================================================================
    AND_OR: {
        title: "AND & OR - Kombinera",
        emoji: "🔗",
        description: "AND och OR låter dig kombinera flera villkor i WHERE.",
        syntax: "WHERE villkor1 AND villkor2",
        explanation: `
            <div class="concept-box">
                <h4>🎯 Vad gör AND och OR?</h4>
                <p><strong>AND</strong> = Båda villkoren måste stämma</p>
                <p><strong>OR</strong> = Minst ett villkor måste stämma</p>

                <h4>📝 Exempel</h4>
                <pre>-- AND: Båda måste stämma
SELECT * FROM produkter
WHERE pris > 500 AND lager > 20;

-- OR: Ett av dem räcker
SELECT * FROM produkter
WHERE pris < 300 OR lager > 100;</pre>

                <h4>💡 Tänk så här</h4>
                <ul>
                    <li><strong>AND</strong> = "och" → Striktare filter (färre resultat)</li>
                    <li><strong>OR</strong> = "eller" → Bredare filter (fler resultat)</li>
                </ul>
            </div>
        `,
        exercises: [
            {
                id: "warmup_andor_1",
                task: "Hämta produkter där pris > 500 AND lager > 20",
                hint: "Kombinera med AND",
                solution: "SELECT * FROM produkter WHERE pris > 500 AND lager > 20;",
                validate: (result) => result && result.values && result.values.every(row => row[2] > 500 && row[3] > 20)
            },
            {
                id: "warmup_andor_2",
                task: "Hämta kunder från Stockholm OR Göteborg",
                hint: "stad = 'Stockholm' OR stad = 'Göteborg'",
                solution: "SELECT * FROM kunder WHERE stad = 'Stockholm' OR stad = 'Göteborg';",
                validate: (result) => result && result.values && result.values.length > 0
            },
            {
                id: "warmup_andor_3",
                task: "Hämta produkter där pris < 500 AND lager > 50",
                hint: "Två villkor med AND",
                solution: "SELECT * FROM produkter WHERE pris < 500 AND lager > 50;",
                validate: (result) => result && result.values && result.values.every(row => row[2] < 500 && row[3] > 50)
            },
            {
                id: "warmup_andor_4",
                task: "Hämta anställda i IT OR Försäljning",
                hint: "avdelning = 'IT' OR avdelning = 'Försäljning'",
                solution: "SELECT * FROM anstalda WHERE avdelning = 'IT' OR avdelning = 'Försäljning';",
                validate: (result) => result && result.values && result.values.length > 0
            },
            {
                id: "warmup_andor_5",
                task: "Hämta produkter med pris mellan 300 och 1000 (använd AND)",
                hint: "pris >= 300 AND pris <= 1000",
                solution: "SELECT * FROM produkter WHERE pris >= 300 AND pris <= 1000;",
                validate: (result) => result && result.values && result.values.every(row => row[2] >= 300 && row[2] <= 1000)
            }
        ]
    },

    // =========================================================================
    // ORDER BY - Sortera
    // =========================================================================
    ORDER_BY: {
        title: "ORDER BY - Sortera",
        emoji: "📑",
        description: "ORDER BY sorterar resultatet i stigande (ASC) eller fallande (DESC) ordning.",
        syntax: "SELECT * FROM tabell ORDER BY kolumn ASC/DESC;",
        explanation: `
            <div class="concept-box">
                <h4>🎯 Vad gör ORDER BY?</h4>
                <p>ORDER BY sorterar dina resultat. Som att sortera en lista!</p>

                <h4>📝 Syntax</h4>
                <pre>SELECT * FROM tabell ORDER BY kolumn;       -- Stigande (A-Z, 1-10)
SELECT * FROM tabell ORDER BY kolumn ASC;   -- Samma sak
SELECT * FROM tabell ORDER BY kolumn DESC;  -- Fallande (Z-A, 10-1)</pre>

                <h4>💡 Tips</h4>
                <ul>
                    <li><strong>ASC</strong> = Ascending = Stigande = A→Z, 1→10</li>
                    <li><strong>DESC</strong> = Descending = Fallande = Z→A, 10→1</li>
                    <li>ASC är default (behöver inte skrivas)</li>
                </ul>

                <h4>🔥 ORDER BY kommer SIST!</h4>
                <pre>SELECT * FROM produkter WHERE pris > 100 ORDER BY pris DESC;</pre>
            </div>
        `,
        exercises: [
            {
                id: "warmup_orderby_1",
                task: "Hämta produkter sorterade efter pris (lägst först)",
                hint: "ORDER BY pris eller ORDER BY pris ASC",
                solution: "SELECT * FROM produkter ORDER BY pris;",
                validate: (result) => result && result.values && result.values.length > 1
            },
            {
                id: "warmup_orderby_2",
                task: "Hämta produkter sorterade efter pris (högst först)",
                hint: "ORDER BY pris DESC",
                solution: "SELECT * FROM produkter ORDER BY pris DESC;",
                validate: (result) => result && result.values && result.values[0][2] >= result.values[1][2]
            },
            {
                id: "warmup_orderby_3",
                task: "Hämta kunder sorterade efter namn (A-Ö)",
                hint: "ORDER BY namn",
                solution: "SELECT * FROM kunder ORDER BY namn;",
                validate: (result) => result && result.values && result.values.length > 1
            },
            {
                id: "warmup_orderby_4",
                task: "Hämta anställda sorterade efter lön (högst först)",
                hint: "ORDER BY lon DESC",
                solution: "SELECT * FROM anstalda ORDER BY lon DESC;",
                validate: (result) => result && result.values && result.values.length > 1
            },
            {
                id: "warmup_orderby_5",
                task: "Hämta produkter där pris > 500, sorterat efter lager (mest först)",
                hint: "Kombinera WHERE och ORDER BY",
                solution: "SELECT * FROM produkter WHERE pris > 500 ORDER BY lager DESC;",
                validate: (result) => result && result.values && result.values.every(row => row[2] > 500)
            }
        ]
    },

    // =========================================================================
    // LIMIT - Begränsa antal
    // =========================================================================
    LIMIT: {
        title: "LIMIT - Begränsa antal",
        emoji: "✂️",
        description: "LIMIT begränsar hur många rader du får tillbaka.",
        syntax: "SELECT * FROM tabell LIMIT antal;",
        explanation: `
            <div class="concept-box">
                <h4>🎯 Vad gör LIMIT?</h4>
                <p>LIMIT sätter en gräns för hur många rader du vill ha. Perfekt för att visa "Top 5" eller "De 10 senaste"!</p>

                <h4>📝 Syntax</h4>
                <pre>SELECT * FROM tabell LIMIT 5;          -- Bara 5 rader
SELECT * FROM tabell LIMIT 10;         -- Bara 10 rader
SELECT * FROM tabell LIMIT 1;          -- Bara 1 rad</pre>

                <h4>💡 Kombinera med ORDER BY</h4>
                <pre>-- De 3 dyraste produkterna
SELECT * FROM produkter ORDER BY pris DESC LIMIT 3;

-- De 5 billigaste produkterna
SELECT * FROM produkter ORDER BY pris ASC LIMIT 5;</pre>

                <h4>🔥 LIMIT kommer ALLRA SIST!</h4>
                <p>Ordningen: SELECT → FROM → WHERE → ORDER BY → LIMIT</p>
            </div>
        `,
        exercises: [
            {
                id: "warmup_limit_1",
                task: "Hämta de 5 första produkterna",
                hint: "LIMIT 5",
                solution: "SELECT * FROM produkter LIMIT 5;",
                validate: (result) => result && result.values && result.values.length === 5
            },
            {
                id: "warmup_limit_2",
                task: "Hämta de 3 dyraste produkterna",
                hint: "ORDER BY pris DESC LIMIT 3",
                solution: "SELECT * FROM produkter ORDER BY pris DESC LIMIT 3;",
                validate: (result) => result && result.values && result.values.length === 3
            },
            {
                id: "warmup_limit_3",
                task: "Hämta den billigaste produkten",
                hint: "ORDER BY pris LIMIT 1",
                solution: "SELECT * FROM produkter ORDER BY pris LIMIT 1;",
                validate: (result) => result && result.values && result.values.length === 1
            },
            {
                id: "warmup_limit_4",
                task: "Hämta de 3 kunderna som registrerades senast",
                hint: "ORDER BY id DESC LIMIT 3",
                solution: "SELECT * FROM kunder ORDER BY id DESC LIMIT 3;",
                validate: (result) => result && result.values && result.values.length === 3
            },
            {
                id: "warmup_limit_5",
                task: "Hämta topp 5 anställda med högst lön",
                hint: "ORDER BY lon DESC LIMIT 5",
                solution: "SELECT * FROM anstalda ORDER BY lon DESC LIMIT 5;",
                validate: (result) => result && result.values && result.values.length === 5
            }
        ]
    },

    // =========================================================================
    // COUNT - Räkna rader
    // =========================================================================
    COUNT: {
        title: "COUNT - Räkna",
        emoji: "🔢",
        description: "COUNT räknar hur många rader som matchar.",
        syntax: "SELECT COUNT(*) FROM tabell;",
        explanation: `
            <div class="concept-box">
                <h4>🎯 Vad gör COUNT?</h4>
                <p>COUNT räknar antal rader. Istället för att få alla rader får du bara en siffra!</p>

                <h4>📝 Syntax</h4>
                <pre>SELECT COUNT(*) FROM tabell;              -- Räkna alla rader
SELECT COUNT(kolumn) FROM tabell;         -- Räkna icke-NULL värden
SELECT COUNT(*) FROM tabell WHERE villkor; -- Räkna med filter</pre>

                <h4>💡 Exempel</h4>
                <pre>-- Hur många produkter finns?
SELECT COUNT(*) FROM produkter;

-- Hur många kunder i Stockholm?
SELECT COUNT(*) FROM kunder WHERE stad = 'Stockholm';</pre>

                <h4>🔥 COUNT är en AGGREGATFUNKTION</h4>
                <p>Den "sammanfattar" många rader till ett värde.</p>
            </div>
        `,
        exercises: [
            {
                id: "warmup_count_1",
                task: "Räkna hur många produkter som finns",
                hint: "SELECT COUNT(*) FROM produkter",
                solution: "SELECT COUNT(*) FROM produkter;",
                validate: (result) => result && result.values && result.values[0][0] > 0
            },
            {
                id: "warmup_count_2",
                task: "Räkna hur många kunder som finns",
                hint: "COUNT(*) FROM kunder",
                solution: "SELECT COUNT(*) FROM kunder;",
                validate: (result) => result && result.values && result.values[0][0] > 0
            },
            {
                id: "warmup_count_3",
                task: "Räkna produkter där pris > 1000",
                hint: "COUNT(*) med WHERE",
                solution: "SELECT COUNT(*) FROM produkter WHERE pris > 1000;",
                validate: (result) => result && result.values && result.values[0][0] >= 0
            },
            {
                id: "warmup_count_4",
                task: "Räkna kunder i Stockholm",
                hint: "WHERE stad = 'Stockholm'",
                solution: "SELECT COUNT(*) FROM kunder WHERE stad = 'Stockholm';",
                validate: (result) => result && result.values && result.values[0][0] > 0
            },
            {
                id: "warmup_count_5",
                task: "Räkna hur många ordrar som finns",
                hint: "COUNT(*) FROM ordrar",
                solution: "SELECT COUNT(*) FROM ordrar;",
                validate: (result) => result && result.values && result.values[0][0] > 0
            }
        ]
    },

    // =========================================================================
    // SUM/AVG - Summa och medelvärde
    // =========================================================================
    SUM_AVG: {
        title: "SUM & AVG - Summa & Medel",
        emoji: "➕",
        description: "SUM adderar alla värden, AVG beräknar medelvärdet.",
        syntax: "SELECT SUM(kolumn), AVG(kolumn) FROM tabell;",
        explanation: `
            <div class="concept-box">
                <h4>🎯 Vad gör SUM och AVG?</h4>
                <p><strong>SUM</strong> = Adderar alla värden (totalsumma)</p>
                <p><strong>AVG</strong> = Beräknar medelvärdet (average)</p>

                <h4>📝 Syntax</h4>
                <pre>SELECT SUM(pris) FROM produkter;    -- Total summa av alla priser
SELECT AVG(pris) FROM produkter;    -- Genomsnittspriset
SELECT SUM(lager) FROM produkter;   -- Totalt antal i lager</pre>

                <h4>💡 Exempel</h4>
                <pre>-- Totala lönesumman
SELECT SUM(lon) FROM anstalda;

-- Genomsnittslönen
SELECT AVG(lon) FROM anstalda;

-- Kombinera flera
SELECT SUM(pris), AVG(pris) FROM produkter;</pre>
            </div>
        `,
        exercises: [
            {
                id: "warmup_sumavg_1",
                task: "Beräkna totala värdet av alla produkter (summa av pris)",
                hint: "SELECT SUM(pris) FROM produkter",
                solution: "SELECT SUM(pris) FROM produkter;",
                validate: (result) => result && result.values && result.values[0][0] > 0
            },
            {
                id: "warmup_sumavg_2",
                task: "Beräkna genomsnittspriset på produkter",
                hint: "SELECT AVG(pris) FROM produkter",
                solution: "SELECT AVG(pris) FROM produkter;",
                validate: (result) => result && result.values && result.values[0][0] > 0
            },
            {
                id: "warmup_sumavg_3",
                task: "Beräkna totalt antal produkter i lager (summa av lager)",
                hint: "SUM(lager)",
                solution: "SELECT SUM(lager) FROM produkter;",
                validate: (result) => result && result.values && result.values[0][0] > 0
            },
            {
                id: "warmup_sumavg_4",
                task: "Beräkna genomsnittslönen för anställda",
                hint: "AVG(lon) FROM anstalda",
                solution: "SELECT AVG(lon) FROM anstalda;",
                validate: (result) => result && result.values && result.values[0][0] > 0
            },
            {
                id: "warmup_sumavg_5",
                task: "Beräkna totala ordervärdet (summa av totalt i ordrar)",
                hint: "SUM(totalt) FROM ordrar",
                solution: "SELECT SUM(totalt) FROM ordrar;",
                validate: (result) => result && result.values && result.values[0][0] > 0
            }
        ]
    },

    // =========================================================================
    // MIN/MAX - Minsta och största
    // =========================================================================
    MIN_MAX: {
        title: "MIN & MAX - Minsta & Största",
        emoji: "📏",
        description: "MIN hittar minsta värdet, MAX hittar största värdet.",
        syntax: "SELECT MIN(kolumn), MAX(kolumn) FROM tabell;",
        explanation: `
            <div class="concept-box">
                <h4>🎯 Vad gör MIN och MAX?</h4>
                <p><strong>MIN</strong> = Hittar det minsta värdet</p>
                <p><strong>MAX</strong> = Hittar det största värdet</p>

                <h4>📝 Syntax</h4>
                <pre>SELECT MIN(pris) FROM produkter;  -- Billigaste priset
SELECT MAX(pris) FROM produkter;  -- Dyraste priset
SELECT MIN(lon), MAX(lon) FROM anstalda; -- Lägsta och högsta lön</pre>

                <h4>💡 Fungerar även på text!</h4>
                <pre>SELECT MIN(namn) FROM kunder;  -- Första alfabetiskt (A...)
SELECT MAX(namn) FROM kunder;  -- Sista alfabetiskt (...Ö)</pre>
            </div>
        `,
        exercises: [
            {
                id: "warmup_minmax_1",
                task: "Hitta det lägsta produktpriset",
                hint: "SELECT MIN(pris) FROM produkter",
                solution: "SELECT MIN(pris) FROM produkter;",
                validate: (result) => result && result.values && result.values[0][0] > 0
            },
            {
                id: "warmup_minmax_2",
                task: "Hitta det högsta produktpriset",
                hint: "SELECT MAX(pris) FROM produkter",
                solution: "SELECT MAX(pris) FROM produkter;",
                validate: (result) => result && result.values && result.values[0][0] > 0
            },
            {
                id: "warmup_minmax_3",
                task: "Hitta både lägsta och högsta priset i samma fråga",
                hint: "SELECT MIN(pris), MAX(pris) FROM produkter",
                solution: "SELECT MIN(pris), MAX(pris) FROM produkter;",
                validate: (result) => result && result.columns && result.columns.length === 2
            },
            {
                id: "warmup_minmax_4",
                task: "Hitta den lägsta lönen bland anställda",
                hint: "MIN(lon) FROM anstalda",
                solution: "SELECT MIN(lon) FROM anstalda;",
                validate: (result) => result && result.values && result.values[0][0] > 0
            },
            {
                id: "warmup_minmax_5",
                task: "Hitta den högsta lönen bland anställda",
                hint: "MAX(lon) FROM anstalda",
                solution: "SELECT MAX(lon) FROM anstalda;",
                validate: (result) => result && result.values && result.values[0][0] > 0
            }
        ]
    },

    // =========================================================================
    // GROUP BY - Gruppera
    // =========================================================================
    GROUP_BY: {
        title: "GROUP BY - Gruppera",
        emoji: "📦",
        description: "GROUP BY grupperar rader med samma värde och låter dig använda aggregatfunktioner per grupp.",
        syntax: "SELECT kolumn, COUNT(*) FROM tabell GROUP BY kolumn;",
        explanation: `
            <div class="concept-box">
                <h4>🎯 Vad gör GROUP BY?</h4>
                <p>GROUP BY samlar ihop rader med samma värde i en kolumn till grupper.</p>

                <h4>📝 Syntax</h4>
                <pre>SELECT stad, COUNT(*)
FROM kunder
GROUP BY stad;</pre>

                <h4>💡 Tänk så här</h4>
                <p>"För varje stad, räkna antalet kunder"</p>
                <p>"För varje kategori, beräkna genomsnittspriset"</p>

                <h4>⚠️ Viktigt!</h4>
                <p>Kolumner i SELECT måste antingen:</p>
                <ul>
                    <li>Vara med i GROUP BY, eller</li>
                    <li>Vara i en aggregatfunktion (COUNT, SUM, AVG, etc.)</li>
                </ul>
            </div>
        `,
        exercises: [
            {
                id: "warmup_groupby_1",
                task: "Räkna antal kunder per stad",
                hint: "SELECT stad, COUNT(*) FROM kunder GROUP BY stad",
                solution: "SELECT stad, COUNT(*) FROM kunder GROUP BY stad;",
                validate: (result) => result && result.columns && result.columns.length === 2
            },
            {
                id: "warmup_groupby_2",
                task: "Räkna antal anställda per avdelning",
                hint: "SELECT avdelning, COUNT(*) FROM anstalda GROUP BY avdelning",
                solution: "SELECT avdelning, COUNT(*) FROM anstalda GROUP BY avdelning;",
                validate: (result) => result && result.columns && result.columns.length === 2
            },
            {
                id: "warmup_groupby_3",
                task: "Beräkna genomsnittslön per avdelning",
                hint: "SELECT avdelning, AVG(lon) FROM anstalda GROUP BY avdelning",
                solution: "SELECT avdelning, AVG(lon) FROM anstalda GROUP BY avdelning;",
                validate: (result) => result && result.columns && result.columns.length === 2
            },
            {
                id: "warmup_groupby_4",
                task: "Räkna antal produkter per kategori_id",
                hint: "GROUP BY kategori_id",
                solution: "SELECT kategori_id, COUNT(*) FROM produkter GROUP BY kategori_id;",
                validate: (result) => result && result.columns && result.columns.length === 2
            },
            {
                id: "warmup_groupby_5",
                task: "Beräkna totalt lagervärde per kategori (SUM(lager))",
                hint: "SELECT kategori_id, SUM(lager) FROM produkter GROUP BY kategori_id",
                solution: "SELECT kategori_id, SUM(lager) FROM produkter GROUP BY kategori_id;",
                validate: (result) => result && result.columns && result.columns.length === 2
            }
        ]
    },

    // =========================================================================
    // LIKE - Mönstermatchning
    // =========================================================================
    LIKE: {
        title: "LIKE - Mönstermatchning",
        emoji: "🔎",
        description: "LIKE söker efter mönster i text. % matchar vad som helst, _ matchar ett tecken.",
        syntax: "SELECT * FROM tabell WHERE kolumn LIKE 'mönster';",
        explanation: `
            <div class="concept-box">
                <h4>🎯 Vad gör LIKE?</h4>
                <p>LIKE låter dig söka efter mönster i text. Perfekt när du inte vet exakt vad du söker!</p>

                <h4>📝 Wildcards (jokertecken)</h4>
                <ul>
                    <li><code>%</code> = Matchar vad som helst (0 eller fler tecken)</li>
                    <li><code>_</code> = Matchar exakt ETT tecken</li>
                </ul>

                <h4>💡 Exempel</h4>
                <pre>WHERE namn LIKE 'A%'      -- Börjar på A
WHERE namn LIKE '%son'    -- Slutar på son
WHERE namn LIKE '%an%'    -- Innehåller "an"
WHERE namn LIKE '_nna'    -- ? + nna (4 tecken totalt)</pre>

                <h4>🔥 Case-insensitive i SQLite!</h4>
                <p>I SQLite spelar stora/små bokstäver ingen roll för LIKE.</p>
            </div>
        `,
        exercises: [
            {
                id: "warmup_like_1",
                task: "Hitta produkter vars namn börjar på 'L'",
                hint: "WHERE namn LIKE 'L%'",
                solution: "SELECT * FROM produkter WHERE namn LIKE 'L%';",
                validate: (result) => result && result.values && result.values.length > 0
            },
            {
                id: "warmup_like_2",
                task: "Hitta kunder vars namn slutar på 'sson'",
                hint: "WHERE namn LIKE '%sson'",
                solution: "SELECT * FROM kunder WHERE namn LIKE '%sson';",
                validate: (result) => result && result.values && result.values.length > 0
            },
            {
                id: "warmup_like_3",
                task: "Hitta produkter som innehåller 'USB' i namnet",
                hint: "WHERE namn LIKE '%USB%'",
                solution: "SELECT * FROM produkter WHERE namn LIKE '%USB%';",
                validate: (result) => result && result.values && result.values.length > 0
            },
            {
                id: "warmup_like_4",
                task: "Hitta kunder med gmail-adress",
                hint: "WHERE email LIKE '%gmail%'",
                solution: "SELECT * FROM kunder WHERE email LIKE '%gmail%';",
                validate: (result) => result && result.values && result.values.length > 0
            },
            {
                id: "warmup_like_5",
                task: "Hitta alla kunder vars namn börjar på 'A' eller 'E'",
                hint: "Använd OR: LIKE 'A%' OR LIKE 'E%'",
                solution: "SELECT * FROM kunder WHERE namn LIKE 'A%' OR namn LIKE 'E%';",
                validate: (result) => result && result.values && result.values.length > 0
            }
        ]
    }
};

// =========================================================================
// Hjälpfunktioner
// =========================================================================

function getWarmupCategories() {
    return Object.keys(WARMUP_EXERCISES);
}

function getWarmupCategory(category) {
    return WARMUP_EXERCISES[category];
}

function getWarmupExercise(category, index) {
    const cat = WARMUP_EXERCISES[category];
    if (cat && cat.exercises && cat.exercises[index]) {
        return cat.exercises[index];
    }
    return null;
}

function getTotalWarmupExercises() {
    return Object.values(WARMUP_EXERCISES).reduce((sum, cat) => sum + cat.exercises.length, 0);
}

// Export
if (typeof window !== 'undefined') {
    window.WARMUP_EXERCISES = WARMUP_EXERCISES;
    window.getWarmupCategories = getWarmupCategories;
    window.getWarmupCategory = getWarmupCategory;
    window.getWarmupExercise = getWarmupExercise;
    window.getTotalWarmupExercises = getTotalWarmupExercises;
}
