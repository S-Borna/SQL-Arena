// ===== SQL Quest - Komplett Övningsbank =====
// 100+ övningar från nybörjare till avancerad
// Baserat på Coursera, universitetsstrukturer och industristandards

const EXERCISES_COMPLETE = {
    // ===== DAG 1: GRUNDER & SELECT (15 övningar) =====
    1: {
        title: "Dag 1: Introduktion till Databaser & SELECT",
        description: "Lär dig grunderna i databaser och dina första SELECT-frågor",
        exercises: [
            // 1.1 - Enklaste SELECT
            {
                id: "1-1",
                title: "Din första SELECT",
                difficulty: "easy",
                description: "Hämta ALLA kolumner från tabellen 'kunder'.",
                hint: "Använd SELECT * FROM för att hämta allt.",
                solution: "SELECT * FROM kunder;",
                concept: "SELECT *",
                validate: (result) => {
                    return result.columns &&
                        result.columns.includes('id') &&
                        result.columns.includes('namn') &&
                        result.rowCount >= 1;
                }
            },
            // 1.2 - Specifika kolumner
            {
                id: "1-2",
                title: "Välj specifika kolumner",
                difficulty: "easy",
                description: "Hämta endast 'namn' och 'email' från tabellen 'kunder'.",
                hint: "Lista kolumnerna du vill ha efter SELECT, separerade med komma.",
                solution: "SELECT namn, email FROM kunder;",
                concept: "SELECT kolumner",
                validate: (result) => {
                    return result.columns &&
                        result.columns.length === 2 &&
                        result.columns.includes('namn') &&
                        result.columns.includes('email');
                }
            },
            // 1.3 - WHERE med text
            {
                id: "1-3",
                title: "Filtrera med WHERE",
                difficulty: "easy",
                description: "Hämta alla kunder som bor i 'Stockholm'.",
                hint: "Använd WHERE stad = 'Stockholm'. Glöm inte citattecken runt textvärden!",
                solution: "SELECT * FROM kunder WHERE stad = 'Stockholm';",
                concept: "WHERE text",
                validate: (result) => {
                    if (!result.values || result.rowCount === 0) return false;
                    return result.values.every(row => {
                        const stadIndex = result.columns.indexOf('stad');
                        return row[stadIndex] === 'Stockholm';
                    });
                }
            },
            // 1.4 - WHERE med nummer
            {
                id: "1-4",
                title: "Filtrera med nummer",
                difficulty: "easy",
                description: "Hämta alla produkter som kostar mer än 100 kr.",
                hint: "Använd WHERE pris > 100. Nummer behöver inga citattecken.",
                solution: "SELECT * FROM produkter WHERE pris > 100;",
                concept: "WHERE nummer",
                validate: (result) => {
                    if (!result.values || result.rowCount === 0) return false;
                    const prisIndex = result.columns.indexOf('pris');
                    return result.values.every(row => row[prisIndex] > 100);
                }
            },
            // 1.5 - WHERE med AND
            {
                id: "1-5",
                title: "Kombinera villkor med AND",
                difficulty: "easy",
                description: "Hämta produkter som kostar mer än 50 kr OCH har mer än 10 i lager.",
                hint: "Använd AND för att kombinera villkor: WHERE pris > 50 AND lager > 10",
                solution: "SELECT * FROM produkter WHERE pris > 50 AND lager > 10;",
                concept: "WHERE AND",
                validate: (result) => {
                    if (!result.values || result.rowCount === 0) return false;
                    const prisIndex = result.columns.indexOf('pris');
                    const lagerIndex = result.columns.indexOf('lager');
                    return result.values.every(row => row[prisIndex] > 50 && row[lagerIndex] > 10);
                }
            },
            // 1.6 - WHERE med OR
            {
                id: "1-6",
                title: "Kombinera villkor med OR",
                difficulty: "easy",
                description: "Hämta kunder som bor i 'Stockholm' ELLER 'Göteborg'.",
                hint: "Använd OR: WHERE stad = 'Stockholm' OR stad = 'Göteborg'",
                solution: "SELECT * FROM kunder WHERE stad = 'Stockholm' OR stad = 'Göteborg';",
                concept: "WHERE OR",
                validate: (result) => {
                    if (!result.values || result.rowCount === 0) return false;
                    const stadIndex = result.columns.indexOf('stad');
                    return result.values.every(row =>
                        row[stadIndex] === 'Stockholm' || row[stadIndex] === 'Göteborg'
                    );
                }
            },
            // 1.7 - DISTINCT
            {
                id: "1-7",
                title: "Unika värden med DISTINCT",
                difficulty: "easy",
                description: "Lista alla UNIKA städer som kunderna bor i (inga dubbletter).",
                hint: "Använd SELECT DISTINCT kolumn FROM tabell",
                solution: "SELECT DISTINCT stad FROM kunder;",
                concept: "DISTINCT",
                validate: (result) => {
                    if (!result.columns) return false;
                    return result.columns.length === 1 &&
                        result.columns[0] === 'stad' &&
                        new Set(result.values.map(r => r[0])).size === result.rowCount;
                }
            },
            // 1.8 - Alias
            {
                id: "1-8",
                title: "Kolumnalias med AS",
                difficulty: "easy",
                description: "Hämta produktnamn och pris, men döp om kolumnerna till 'produkt' och 'kostnad'.",
                hint: "Använd AS: SELECT kolumn AS nyttnamn",
                solution: "SELECT namn AS produkt, pris AS kostnad FROM produkter;",
                concept: "AS alias",
                validate: (result) => {
                    return result.columns &&
                        result.columns.includes('produkt') &&
                        result.columns.includes('kostnad');
                }
            },
            // 1.9 - Större/mindre än eller lika
            {
                id: "1-9",
                title: "Jämförelseoperatorer",
                difficulty: "easy",
                description: "Hämta alla anställda med lön på minst 35000 kr (35000 eller mer).",
                hint: "Använd >= för 'större än eller lika med'",
                solution: "SELECT * FROM anstalda WHERE lon >= 35000;",
                concept: ">=",
                validate: (result) => {
                    if (!result.values) return false;
                    const lonIndex = result.columns.indexOf('lon');
                    return result.values.every(row => row[lonIndex] >= 35000);
                }
            },
            // 1.10 - Inte lika med
            {
                id: "1-10",
                title: "Inte lika med",
                difficulty: "medium",
                description: "Hämta alla kunder som INTE bor i 'Stockholm'.",
                hint: "Använd != eller <> för 'inte lika med'",
                solution: "SELECT * FROM kunder WHERE stad != 'Stockholm';",
                concept: "!=",
                validate: (result) => {
                    if (!result.values) return false;
                    const stadIndex = result.columns.indexOf('stad');
                    return result.values.every(row => row[stadIndex] !== 'Stockholm');
                }
            },
            // 1.11 - Hämta alla produkter
            {
                id: "1-11",
                title: "Produktkatalog",
                difficulty: "easy",
                description: "Visa alla produkter med deras namn, pris och lagersaldo.",
                hint: "SELECT de tre kolumnerna du behöver från produkter",
                solution: "SELECT namn, pris, lager FROM produkter;",
                concept: "SELECT specifika kolumner",
                validate: (result) => {
                    return result.columns &&
                        result.columns.includes('namn') &&
                        result.columns.includes('pris') &&
                        result.columns.includes('lager') &&
                        result.columns.length === 3;
                }
            },
            // 1.12 - Hitta billiga produkter
            {
                id: "1-12",
                title: "Budgetprodukter",
                difficulty: "easy",
                description: "Hitta alla produkter som kostar 100 kr eller mindre.",
                hint: "Använd WHERE pris <= 100",
                solution: "SELECT * FROM produkter WHERE pris <= 100;",
                concept: "WHERE <=",
                validate: (result) => {
                    if (!result.values) return false;
                    const prisIndex = result.columns.indexOf('pris');
                    return result.values.every(row => row[prisIndex] <= 100);
                }
            },
            // 1.13 - Kombinera tre villkor
            {
                id: "1-13",
                title: "Komplex filtrering",
                difficulty: "medium",
                description: "Hitta produkter som kostar mellan 50 och 200 kr OCH har mer än 5 i lager.",
                hint: "Kombinera tre villkor med AND: pris >= 50 AND pris <= 200 AND lager > 5",
                solution: "SELECT * FROM produkter WHERE pris >= 50 AND pris <= 200 AND lager > 5;",
                concept: "Flera AND",
                validate: (result) => {
                    if (!result.values) return false;
                    const prisIndex = result.columns.indexOf('pris');
                    const lagerIndex = result.columns.indexOf('lager');
                    return result.values.every(row =>
                        row[prisIndex] >= 50 && row[prisIndex] <= 200 && row[lagerIndex] > 5
                    );
                }
            },
            // 1.14 - Anställda
            {
                id: "1-14",
                title: "Personalregister",
                difficulty: "easy",
                description: "Hämta namn och avdelning för alla anställda.",
                hint: "SELECT namn, avdelning FROM anstalda",
                solution: "SELECT namn, avdelning FROM anstalda;",
                concept: "SELECT från anstalda",
                validate: (result) => {
                    return result.columns &&
                        result.columns.includes('namn') &&
                        result.columns.includes('avdelning') &&
                        result.columns.length === 2;
                }
            },
            // 1.15 - Räkna rader
            {
                id: "1-15",
                title: "Antal kunder",
                difficulty: "medium",
                description: "Räkna hur många kunder som finns i databasen.",
                hint: "Använd COUNT(*) för att räkna antal rader",
                solution: "SELECT COUNT(*) FROM kunder;",
                concept: "COUNT(*)",
                validate: (result) => {
                    return result.values &&
                        result.values.length === 1 &&
                        result.values[0][0] >= 1;
                }
            }
        ]
    },

    // ===== DAG 2: FILTRERA & SORTERA (15 övningar) =====
    2: {
        title: "Dag 2: Filtrera & Sortera Data",
        description: "Lär dig ORDER BY, LIMIT, LIKE och mer",
        exercises: [
            // 2.1 - ORDER BY enkel
            {
                id: "2-1",
                title: "Sortera efter pris",
                difficulty: "easy",
                description: "Lista alla produkter sorterade efter pris (billigast först).",
                hint: "Använd ORDER BY pris (ASC är standard)",
                solution: "SELECT * FROM produkter ORDER BY pris;",
                concept: "ORDER BY",
                validate: (result) => {
                    if (!result.values || result.rowCount < 2) return false;
                    const prisIndex = result.columns.indexOf('pris');
                    for (let i = 1; i < result.values.length; i++) {
                        if (result.values[i][prisIndex] < result.values[i - 1][prisIndex]) return false;
                    }
                    return true;
                }
            },
            // 2.2 - ORDER BY DESC
            {
                id: "2-2",
                title: "Sortera fallande",
                difficulty: "easy",
                description: "Lista alla produkter sorterade efter pris (dyrast först).",
                hint: "Lägg till DESC efter ORDER BY kolumn",
                solution: "SELECT * FROM produkter ORDER BY pris DESC;",
                concept: "ORDER BY DESC",
                validate: (result) => {
                    if (!result.values || result.rowCount < 2) return false;
                    const prisIndex = result.columns.indexOf('pris');
                    for (let i = 1; i < result.values.length; i++) {
                        if (result.values[i][prisIndex] > result.values[i - 1][prisIndex]) return false;
                    }
                    return true;
                }
            },
            // 2.3 - LIMIT
            {
                id: "2-3",
                title: "Begränsa resultat",
                difficulty: "easy",
                description: "Hämta de 5 första kunderna i tabellen.",
                hint: "Använd LIMIT 5 i slutet av frågan",
                solution: "SELECT * FROM kunder LIMIT 5;",
                concept: "LIMIT",
                validate: (result) => result.rowCount === 5
            },
            // 2.4 - ORDER BY + LIMIT (Top N)
            {
                id: "2-4",
                title: "Topp 3 dyraste",
                difficulty: "easy",
                description: "Hitta de 3 dyraste produkterna.",
                hint: "Kombinera ORDER BY pris DESC med LIMIT 3",
                solution: "SELECT * FROM produkter ORDER BY pris DESC LIMIT 3;",
                concept: "Top N query",
                validate: (result) => {
                    if (result.rowCount !== 3) return false;
                    const prisIndex = result.columns.indexOf('pris');
                    for (let i = 1; i < result.values.length; i++) {
                        if (result.values[i][prisIndex] > result.values[i - 1][prisIndex]) return false;
                    }
                    return true;
                }
            },
            // 2.5 - LIKE %
            {
                id: "2-5",
                title: "Sök med LIKE (börjar med)",
                difficulty: "easy",
                description: "Hitta alla kunder vars namn börjar på 'A'.",
                hint: "Använd LIKE 'A%' - procent matchar vad som helst efter A",
                solution: "SELECT * FROM kunder WHERE namn LIKE 'A%';",
                concept: "LIKE %",
                validate: (result) => {
                    if (!result.values) return false;
                    const namnIndex = result.columns.indexOf('namn');
                    return result.values.every(row => row[namnIndex].startsWith('A'));
                }
            },
            // 2.6 - LIKE % (slutar med)
            {
                id: "2-6",
                title: "Sök med LIKE (slutar med)",
                difficulty: "easy",
                description: "Hitta alla kunder vars namn slutar på 'sson'.",
                hint: "Använd LIKE '%sson' - procent i början matchar allt före",
                solution: "SELECT * FROM kunder WHERE namn LIKE '%sson';",
                concept: "LIKE %text",
                validate: (result) => {
                    if (!result.values) return false;
                    const namnIndex = result.columns.indexOf('namn');
                    return result.values.every(row => row[namnIndex].endsWith('sson'));
                }
            },
            // 2.7 - LIKE % (innehåller)
            {
                id: "2-7",
                title: "Sök med LIKE (innehåller)",
                difficulty: "medium",
                description: "Hitta alla produkter vars namn innehåller ordet 'Laptop' eller 'laptop'.",
                hint: "Använd LIKE '%laptop%' (SQLite är case-insensitive med LIKE)",
                solution: "SELECT * FROM produkter WHERE namn LIKE '%laptop%';",
                concept: "LIKE %text%",
                validate: (result) => {
                    if (!result.values) return false;
                    const namnIndex = result.columns.indexOf('namn');
                    return result.values.every(row =>
                        row[namnIndex].toLowerCase().includes('laptop')
                    );
                }
            },
            // 2.8 - IN
            {
                id: "2-8",
                title: "Flera värden med IN",
                difficulty: "easy",
                description: "Hämta kunder som bor i Stockholm, Göteborg eller Malmö.",
                hint: "Använd IN ('värde1', 'värde2', 'värde3')",
                solution: "SELECT * FROM kunder WHERE stad IN ('Stockholm', 'Göteborg', 'Malmö');",
                concept: "IN",
                validate: (result) => {
                    if (!result.values) return false;
                    const stadIndex = result.columns.indexOf('stad');
                    const allowed = ['Stockholm', 'Göteborg', 'Malmö'];
                    return result.values.every(row => allowed.includes(row[stadIndex]));
                }
            },
            // 2.9 - BETWEEN
            {
                id: "2-9",
                title: "Intervall med BETWEEN",
                difficulty: "easy",
                description: "Hitta produkter som kostar mellan 100 och 500 kr (inklusive).",
                hint: "Använd BETWEEN 100 AND 500",
                solution: "SELECT * FROM produkter WHERE pris BETWEEN 100 AND 500;",
                concept: "BETWEEN",
                validate: (result) => {
                    if (!result.values) return false;
                    const prisIndex = result.columns.indexOf('pris');
                    return result.values.every(row => row[prisIndex] >= 100 && row[prisIndex] <= 500);
                }
            },
            // 2.10 - NOT IN
            {
                id: "2-10",
                title: "Exkludera värden",
                difficulty: "medium",
                description: "Hämta kunder som INTE bor i Stockholm eller Göteborg.",
                hint: "Använd NOT IN eller kombinera med != och AND",
                solution: "SELECT * FROM kunder WHERE stad NOT IN ('Stockholm', 'Göteborg');",
                concept: "NOT IN",
                validate: (result) => {
                    if (!result.values) return false;
                    const stadIndex = result.columns.indexOf('stad');
                    return result.values.every(row =>
                        row[stadIndex] !== 'Stockholm' && row[stadIndex] !== 'Göteborg'
                    );
                }
            },
            // 2.11 - Sortera på flera kolumner
            {
                id: "2-11",
                title: "Sortera på två kolumner",
                difficulty: "medium",
                description: "Lista kunder sorterade först efter stad (A-Ö), sen efter namn (A-Ö).",
                hint: "ORDER BY stad, namn - flera kolumner separeras med komma",
                solution: "SELECT * FROM kunder ORDER BY stad, namn;",
                concept: "ORDER BY flera",
                validate: (result) => {
                    if (!result.values || result.rowCount < 2) return true;
                    const stadIndex = result.columns.indexOf('stad');
                    const namnIndex = result.columns.indexOf('namn');
                    for (let i = 1; i < result.values.length; i++) {
                        const curr = result.values[i];
                        const prev = result.values[i - 1];
                        if (curr[stadIndex] < prev[stadIndex]) return false;
                        if (curr[stadIndex] === prev[stadIndex] && curr[namnIndex] < prev[namnIndex]) return false;
                    }
                    return true;
                }
            },
            // 2.12 - LIMIT med OFFSET
            {
                id: "2-12",
                title: "Pagination",
                difficulty: "medium",
                description: "Hämta kunder 6-10 (hoppa över de 5 första, visa 5 nästa). Tips för pagination!",
                hint: "Använd LIMIT 5 OFFSET 5 eller LIMIT 5, 5",
                solution: "SELECT * FROM kunder LIMIT 5 OFFSET 5;",
                concept: "LIMIT OFFSET",
                validate: (result) => result.rowCount <= 5
            },
            // 2.13 - Kombinera allt
            {
                id: "2-13",
                title: "Komplex sökning",
                difficulty: "hard",
                description: "Hitta produkter under 200 kr som har 'er' i namnet, sorterade efter pris (lägst först), visa max 5.",
                hint: "Kombinera WHERE, LIKE, ORDER BY och LIMIT",
                solution: "SELECT * FROM produkter WHERE pris < 200 AND namn LIKE '%er%' ORDER BY pris LIMIT 5;",
                concept: "Kombinera",
                validate: (result) => {
                    if (!result.values) return true;
                    if (result.rowCount > 5) return false;
                    const prisIndex = result.columns.indexOf('pris');
                    const namnIndex = result.columns.indexOf('namn');
                    return result.values.every(row =>
                        row[prisIndex] < 200 && row[namnIndex].toLowerCase().includes('er')
                    );
                }
            },
            // 2.14 - NOT LIKE
            {
                id: "2-14",
                title: "Exkludera mönster",
                difficulty: "medium",
                description: "Hitta alla kunder vars email INTE slutar på '@gmail.com'.",
                hint: "Använd NOT LIKE '%@gmail.com'",
                solution: "SELECT * FROM kunder WHERE email NOT LIKE '%@gmail.com';",
                concept: "NOT LIKE",
                validate: (result) => {
                    if (!result.values) return true;
                    const emailIndex = result.columns.indexOf('email');
                    return result.values.every(row => !row[emailIndex].endsWith('@gmail.com'));
                }
            },
            // 2.15 - Bäst säljande pris
            {
                id: "2-15",
                title: "Billigaste produkten",
                difficulty: "medium",
                description: "Hitta den allra billigaste produkten (endast 1 resultat).",
                hint: "Sortera efter pris ASC och ta LIMIT 1",
                solution: "SELECT * FROM produkter ORDER BY pris ASC LIMIT 1;",
                concept: "Min värde",
                validate: (result) => result.rowCount === 1
            }
        ]
    },

    // ===== DAG 3: AGGREGERING (15 övningar) =====
    3: {
        title: "Dag 3: Aggregering & Gruppering",
        description: "Lär dig COUNT, SUM, AVG, GROUP BY och HAVING",
        exercises: [
            // 3.1 - COUNT(*)
            {
                id: "3-1",
                title: "Räkna alla produkter",
                difficulty: "easy",
                description: "Räkna hur många produkter som finns i tabellen.",
                hint: "Använd COUNT(*) FROM produkter",
                solution: "SELECT COUNT(*) FROM produkter;",
                concept: "COUNT(*)",
                validate: (result) => result.values && result.values.length === 1 && result.values[0][0] >= 1
            },
            // 3.2 - COUNT med WHERE
            {
                id: "3-2",
                title: "Räkna med villkor",
                difficulty: "easy",
                description: "Räkna hur många kunder som bor i Stockholm.",
                hint: "Kombinera COUNT(*) med WHERE",
                solution: "SELECT COUNT(*) FROM kunder WHERE stad = 'Stockholm';",
                concept: "COUNT + WHERE",
                validate: (result) => result.values && result.values.length === 1
            },
            // 3.3 - SUM
            {
                id: "3-3",
                title: "Summera lagervärde",
                difficulty: "easy",
                description: "Beräkna det totala lagervärdet (summan av pris * lager för alla produkter).",
                hint: "Använd SUM(pris * lager)",
                solution: "SELECT SUM(pris * lager) FROM produkter;",
                concept: "SUM",
                validate: (result) => result.values && result.values.length === 1 && result.values[0][0] > 0
            },
            // 3.4 - AVG
            {
                id: "3-4",
                title: "Genomsnittspris",
                difficulty: "easy",
                description: "Beräkna det genomsnittliga priset på produkterna.",
                hint: "Använd AVG(pris)",
                solution: "SELECT AVG(pris) FROM produkter;",
                concept: "AVG",
                validate: (result) => result.values && result.values.length === 1 && result.values[0][0] > 0
            },
            // 3.5 - MIN och MAX
            {
                id: "3-5",
                title: "Min och Max pris",
                difficulty: "easy",
                description: "Hitta det lägsta och högsta priset bland produkterna.",
                hint: "Använd MIN(pris) och MAX(pris) i samma SELECT",
                solution: "SELECT MIN(pris), MAX(pris) FROM produkter;",
                concept: "MIN/MAX",
                validate: (result) => result.values && result.columns.length === 2
            },
            // 3.6 - GROUP BY enkel
            {
                id: "3-6",
                title: "Kunder per stad",
                difficulty: "easy",
                description: "Räkna hur många kunder som bor i varje stad.",
                hint: "Använd GROUP BY stad tillsammans med COUNT(*)",
                solution: "SELECT stad, COUNT(*) FROM kunder GROUP BY stad;",
                concept: "GROUP BY",
                validate: (result) => {
                    return result.columns &&
                        result.columns.includes('stad') &&
                        result.values.length >= 1;
                }
            },
            // 3.7 - GROUP BY med alias
            {
                id: "3-7",
                title: "Gruppera med alias",
                difficulty: "easy",
                description: "Räkna kunder per stad och döp count-kolumnen till 'antal_kunder'.",
                hint: "Använd AS för att ge kolumnen ett namn: COUNT(*) AS antal_kunder",
                solution: "SELECT stad, COUNT(*) AS antal_kunder FROM kunder GROUP BY stad;",
                concept: "GROUP BY + AS",
                validate: (result) => result.columns && result.columns.includes('antal_kunder')
            },
            // 3.8 - GROUP BY med SUM
            {
                id: "3-8",
                title: "Totalt per kategori",
                difficulty: "medium",
                description: "Beräkna totalt lagervärde (pris * lager) per kategori_id.",
                hint: "GROUP BY kategori_id med SUM(pris * lager)",
                solution: "SELECT kategori_id, SUM(pris * lager) AS total_varulager FROM produkter GROUP BY kategori_id;",
                concept: "GROUP BY + SUM",
                validate: (result) => result.columns && result.columns.includes('kategori_id')
            },
            // 3.9 - HAVING
            {
                id: "3-9",
                title: "Filtrera grupper",
                difficulty: "medium",
                description: "Visa städer som har fler än 1 kund.",
                hint: "Använd HAVING COUNT(*) > 1 efter GROUP BY",
                solution: "SELECT stad, COUNT(*) AS antal FROM kunder GROUP BY stad HAVING COUNT(*) > 1;",
                concept: "HAVING",
                validate: (result) => {
                    if (!result.values) return false;
                    const antalIndex = result.columns.indexOf('antal') !== -1 ? result.columns.indexOf('antal') : 1;
                    return result.values.every(row => row[antalIndex] > 1);
                }
            },
            // 3.10 - WHERE + GROUP BY
            {
                id: "3-10",
                title: "Filtrera före gruppering",
                difficulty: "medium",
                description: "Räkna antal produkter per kategori, men endast produkter som kostar över 50 kr.",
                hint: "WHERE kommer före GROUP BY",
                solution: "SELECT kategori_id, COUNT(*) AS antal FROM produkter WHERE pris > 50 GROUP BY kategori_id;",
                concept: "WHERE + GROUP BY",
                validate: (result) => result.columns && result.columns.includes('kategori_id')
            },
            // 3.11 - COUNT(DISTINCT)
            {
                id: "3-11",
                title: "Räkna unika",
                difficulty: "medium",
                description: "Räkna hur många unika städer kunderna bor i.",
                hint: "Använd COUNT(DISTINCT stad)",
                solution: "SELECT COUNT(DISTINCT stad) FROM kunder;",
                concept: "COUNT DISTINCT",
                validate: (result) => result.values && result.values.length === 1 && result.values[0][0] >= 1
            },
            // 3.12 - Snittlön per avdelning
            {
                id: "3-12",
                title: "Snittlön per avdelning",
                difficulty: "medium",
                description: "Beräkna genomsnittslönen per avdelning för de anställda.",
                hint: "GROUP BY avdelning med AVG(lon)",
                solution: "SELECT avdelning, AVG(lon) AS snittlon FROM anstalda GROUP BY avdelning;",
                concept: "AVG + GROUP BY",
                validate: (result) => result.columns && result.columns.includes('avdelning')
            },
            // 3.13 - ORDER BY med aggregering
            {
                id: "3-13",
                title: "Sortera grupperat resultat",
                difficulty: "medium",
                description: "Visa antal produkter per kategori, sorterat efter antal (mest först).",
                hint: "Lägg till ORDER BY efter GROUP BY",
                solution: "SELECT kategori_id, COUNT(*) AS antal FROM produkter GROUP BY kategori_id ORDER BY antal DESC;",
                concept: "GROUP BY + ORDER BY",
                validate: (result) => {
                    if (!result.values || result.rowCount < 2) return true;
                    const antalIndex = result.columns.indexOf('antal') !== -1 ? result.columns.indexOf('antal') : 1;
                    for (let i = 1; i < result.values.length; i++) {
                        if (result.values[i][antalIndex] > result.values[i - 1][antalIndex]) return false;
                    }
                    return true;
                }
            },
            // 3.14 - Komplex aggregering
            {
                id: "3-14",
                title: "Fullständig statistik",
                difficulty: "hard",
                description: "Per kategori: visa antal produkter, genomsnittspris och totalt lagervärde.",
                hint: "Flera aggregeringsfunktioner i samma SELECT med GROUP BY",
                solution: "SELECT kategori_id, COUNT(*) AS antal, AVG(pris) AS snittpris, SUM(pris * lager) AS lagerv FROM produkter GROUP BY kategori_id;",
                concept: "Flera aggregeringar",
                validate: (result) => result.columns && result.columns.length >= 4
            },
            // 3.15 - HAVING med AVG
            {
                id: "3-15",
                title: "Lönsamma avdelningar",
                difficulty: "hard",
                description: "Visa avdelningar där genomsnittslönen är över 35000 kr.",
                hint: "HAVING AVG(lon) > 35000",
                solution: "SELECT avdelning, AVG(lon) AS snittlon FROM anstalda GROUP BY avdelning HAVING AVG(lon) > 35000;",
                concept: "HAVING + AVG",
                validate: (result) => {
                    if (!result.values) return true;
                    const lonIndex = result.columns.indexOf('snittlon') !== -1 ? result.columns.indexOf('snittlon') : 1;
                    return result.values.every(row => row[lonIndex] > 35000);
                }
            }
        ]
    },

    // ===== DAG 4: JOINs (10 övningar) =====
    4: {
        title: "Dag 4: Relationer & JOINs",
        description: "Lär dig INNER JOIN, LEFT JOIN och kombinera tabeller",
        exercises: [
            {
                id: "4-1",
                title: "Första INNER JOIN",
                difficulty: "easy",
                description: "Koppla ihop ordrar med kunder. Visa orderns datum och kundens namn.",
                hint: "JOIN ordrar med kunder på kund_id = id",
                solution: "SELECT o.datum, k.namn FROM ordrar o INNER JOIN kunder k ON o.kund_id = k.id;",
                concept: "INNER JOIN",
                validate: (result) => result.columns && result.columns.includes('datum') && result.columns.includes('namn')
            },
            {
                id: "4-2",
                title: "JOIN med alla kolumner",
                difficulty: "easy",
                description: "Hämta all information från ordrar tillsammans med kundnamn.",
                hint: "SELECT o.*, k.namn FROM ordrar o INNER JOIN ...",
                solution: "SELECT o.*, k.namn FROM ordrar o INNER JOIN kunder k ON o.kund_id = k.id;",
                concept: "JOIN med *",
                validate: (result) => result.columns && result.columns.includes('namn') && result.columns.includes('totalt')
            },
            {
                id: "4-3",
                title: "LEFT JOIN",
                difficulty: "medium",
                description: "Lista ALLA kunder med deras ordrar (även kunder utan ordrar).",
                hint: "Använd LEFT JOIN istället för INNER JOIN",
                solution: "SELECT k.namn, o.datum, o.totalt FROM kunder k LEFT JOIN ordrar o ON k.id = o.kund_id;",
                concept: "LEFT JOIN",
                validate: (result) => result.columns && result.columns.includes('namn')
            },
            {
                id: "4-4",
                title: "Hitta kunder utan ordrar",
                difficulty: "medium",
                description: "Hitta kunder som INTE har gjort någon order.",
                hint: "Använd LEFT JOIN och WHERE o.id IS NULL",
                solution: "SELECT k.* FROM kunder k LEFT JOIN ordrar o ON k.id = o.kund_id WHERE o.id IS NULL;",
                concept: "LEFT JOIN + IS NULL",
                validate: (result) => result.columns && result.columns.includes('namn')
            },
            {
                id: "4-5",
                title: "Produkter med kategorier",
                difficulty: "medium",
                description: "Lista produkter med deras kategorinamn.",
                hint: "JOIN produkter med kategorier på kategori_id",
                solution: "SELECT p.namn, p.pris, k.namn AS kategori FROM produkter p INNER JOIN kategorier k ON p.kategori_id = k.id;",
                concept: "JOIN kategorier",
                validate: (result) => result.columns && result.columns.includes('kategori')
            },
            {
                id: "4-6",
                title: "Tre tabeller",
                difficulty: "hard",
                description: "Visa orderrader med produktnamn och orderdatum.",
                hint: "Kedja två JOINs: orderrader -> ordrar -> produkter",
                solution: "SELECT or2.antal, p.namn, o.datum FROM orderrader or2 INNER JOIN ordrar o ON or2.order_id = o.id INNER JOIN produkter p ON or2.produkt_id = p.id;",
                concept: "Flera JOINs",
                validate: (result) => result.columns && result.columns.includes('namn') && result.columns.includes('datum')
            },
            {
                id: "4-7",
                title: "JOIN med aggregering",
                difficulty: "hard",
                description: "Räkna antal ordrar per kund (visa kundnamn och antal).",
                hint: "Kombinera JOIN med GROUP BY",
                solution: "SELECT k.namn, COUNT(o.id) AS antal_ordrar FROM kunder k LEFT JOIN ordrar o ON k.id = o.kund_id GROUP BY k.id;",
                concept: "JOIN + GROUP BY",
                validate: (result) => result.columns && result.columns.includes('antal_ordrar')
            },
            {
                id: "4-8",
                title: "Total per kund",
                difficulty: "hard",
                description: "Beräkna varje kunds totala inköpssumma.",
                hint: "JOIN kunder med ordrar och SUM(totalt)",
                solution: "SELECT k.namn, SUM(o.totalt) AS total_kopt FROM kunder k INNER JOIN ordrar o ON k.id = o.kund_id GROUP BY k.id;",
                concept: "JOIN + SUM",
                validate: (result) => result.columns && result.columns.includes('total_kopt')
            },
            {
                id: "4-9",
                title: "Populäraste produkten",
                difficulty: "hard",
                description: "Hitta vilken produkt som sålts i flest orderrader.",
                hint: "JOIN orderrader med produkter, GROUP BY, ORDER BY DESC, LIMIT 1",
                solution: "SELECT p.namn, COUNT(*) AS antal FROM orderrader or2 INNER JOIN produkter p ON or2.produkt_id = p.id GROUP BY p.id ORDER BY antal DESC LIMIT 1;",
                concept: "Komplex JOIN",
                validate: (result) => result.rowCount === 1
            },
            {
                id: "4-10",
                title: "Komplett orderinfo",
                difficulty: "hard",
                description: "Visa: kundnamn, orderdatum, produktnamn, antal och radpris för alla orderrader.",
                hint: "Fyra tabeller: kunder, ordrar, orderrader, produkter",
                solution: "SELECT k.namn AS kund, o.datum, p.namn AS produkt, or2.antal, or2.pris FROM orderrader or2 JOIN ordrar o ON or2.order_id = o.id JOIN kunder k ON o.kund_id = k.id JOIN produkter p ON or2.produkt_id = p.id;",
                concept: "Stor JOIN",
                validate: (result) => result.columns && result.columns.includes('kund') && result.columns.includes('produkt')
            }
        ]
    },

    // ===== DAG 5: CREATE, INSERT, UPDATE, DELETE (10 övningar) =====
    5: {
        title: "Dag 5: Skapa & Modifiera Data",
        description: "Lär dig CREATE TABLE, INSERT, UPDATE och DELETE",
        exercises: [
            {
                id: "5-1",
                title: "Skapa en tabell",
                difficulty: "medium",
                description: "Skapa en tabell 'recensioner' med: id (primärnyckel), produkt_id, betyg (1-5), kommentar.",
                hint: "CREATE TABLE recensioner (id INTEGER PRIMARY KEY, ...)",
                solution: "CREATE TABLE recensioner (id INTEGER PRIMARY KEY, produkt_id INTEGER, betyg INTEGER, kommentar TEXT);",
                concept: "CREATE TABLE",
                validate: (result) => !result.error
            },
            {
                id: "5-2",
                title: "Lägg till data",
                difficulty: "easy",
                description: "Lägg till en recension: produkt_id 1, betyg 5, kommentar 'Fantastisk produkt!'",
                hint: "INSERT INTO recensioner (produkt_id, betyg, kommentar) VALUES (...)",
                solution: "INSERT INTO recensioner (produkt_id, betyg, kommentar) VALUES (1, 5, 'Fantastisk produkt!');",
                concept: "INSERT",
                validate: (result) => !result.error
            },
            {
                id: "5-3",
                title: "Lägg till flera rader",
                difficulty: "medium",
                description: "Lägg till tre recensioner på en gång för produkt 2 med betyg 3, 4 och 5.",
                hint: "INSERT INTO ... VALUES (...), (...), (...);",
                solution: "INSERT INTO recensioner (produkt_id, betyg, kommentar) VALUES (2, 3, 'Okej'), (2, 4, 'Bra'), (2, 5, 'Toppen');",
                concept: "INSERT flera",
                validate: (result) => !result.error
            },
            {
                id: "5-4",
                title: "Uppdatera data",
                difficulty: "easy",
                description: "Ändra betyget till 4 för recensionen med id 1.",
                hint: "UPDATE recensioner SET betyg = 4 WHERE id = 1",
                solution: "UPDATE recensioner SET betyg = 4 WHERE id = 1;",
                concept: "UPDATE",
                validate: (result) => !result.error
            },
            {
                id: "5-5",
                title: "Uppdatera produkt",
                difficulty: "medium",
                description: "Höj priset med 10% på alla produkter i kategori 1.",
                hint: "UPDATE produkter SET pris = pris * 1.1 WHERE kategori_id = 1",
                solution: "UPDATE produkter SET pris = pris * 1.1 WHERE kategori_id = 1;",
                concept: "UPDATE beräkning",
                validate: (result) => !result.error
            },
            {
                id: "5-6",
                title: "Ta bort data",
                difficulty: "easy",
                description: "Ta bort recensionen med id 1.",
                hint: "DELETE FROM recensioner WHERE id = 1",
                solution: "DELETE FROM recensioner WHERE id = 1;",
                concept: "DELETE",
                validate: (result) => !result.error
            },
            {
                id: "5-7",
                title: "Ta bort med villkor",
                difficulty: "medium",
                description: "Ta bort alla recensioner med betyg under 3.",
                hint: "DELETE FROM recensioner WHERE betyg < 3",
                solution: "DELETE FROM recensioner WHERE betyg < 3;",
                concept: "DELETE villkor",
                validate: (result) => !result.error
            },
            {
                id: "5-8",
                title: "Lägg till kolumn",
                difficulty: "medium",
                description: "Lägg till en kolumn 'datum' (TEXT) i recensioner-tabellen.",
                hint: "ALTER TABLE recensioner ADD COLUMN datum TEXT",
                solution: "ALTER TABLE recensioner ADD COLUMN datum TEXT;",
                concept: "ALTER TABLE",
                validate: (result) => !result.error
            },
            {
                id: "5-9",
                title: "INSERT med datum",
                difficulty: "medium",
                description: "Lägg till en recension med dagens datum (2024-01-15).",
                hint: "Inkludera datum i VALUES",
                solution: "INSERT INTO recensioner (produkt_id, betyg, kommentar, datum) VALUES (3, 5, 'Bra!', '2024-01-15');",
                concept: "INSERT datum",
                validate: (result) => !result.error
            },
            {
                id: "5-10",
                title: "Säker radering",
                difficulty: "hard",
                description: "Visa först vilka produkter som har lager = 0, sedan ta bort dem.",
                hint: "Kör SELECT först för att verifiera, sedan DELETE med samma WHERE",
                solution: "DELETE FROM produkter WHERE lager = 0;",
                concept: "Säker DELETE",
                validate: (result) => !result.error
            }
        ]
    },

    // ===== DAG 6: NORMALISERING (7 övningar) =====
    6: {
        title: "Dag 6: Normalisering & Design",
        description: "Lär dig databasdesign och normalformer",
        exercises: [
            {
                id: "6-1",
                title: "Identifiera redundans",
                difficulty: "medium",
                description: "Skapa en vy som visar alla kunder grupperade per stad med antal kunder.",
                hint: "CREATE VIEW stad_statistik AS SELECT ...",
                solution: "CREATE VIEW stad_statistik AS SELECT stad, COUNT(*) AS antal FROM kunder GROUP BY stad;",
                concept: "CREATE VIEW",
                validate: (result) => !result.error
            },
            {
                id: "6-2",
                title: "Använd vyn",
                difficulty: "easy",
                description: "Hämta data från vyn stad_statistik.",
                hint: "SELECT * FROM stad_statistik",
                solution: "SELECT * FROM stad_statistik;",
                concept: "SELECT VIEW",
                validate: (result) => result.columns && result.columns.includes('stad')
            },
            {
                id: "6-3",
                title: "Designa normaliserat",
                difficulty: "hard",
                description: "Skapa en separat tabell 'taggar' med id och taggnamn för framtida produkttaggar.",
                hint: "CREATE TABLE taggar (id INTEGER PRIMARY KEY, namn TEXT UNIQUE)",
                solution: "CREATE TABLE taggar (id INTEGER PRIMARY KEY, namn TEXT UNIQUE NOT NULL);",
                concept: "Normaliserad design",
                validate: (result) => !result.error
            },
            {
                id: "6-4",
                title: "Kopplingstabell",
                difficulty: "hard",
                description: "Skapa kopplingstabell 'produkt_taggar' för many-to-many relation.",
                hint: "Tabell med produkt_id och tagg_id som främmande nycklar",
                solution: "CREATE TABLE produkt_taggar (produkt_id INTEGER, tagg_id INTEGER, PRIMARY KEY (produkt_id, tagg_id));",
                concept: "Many-to-many",
                validate: (result) => !result.error
            },
            {
                id: "6-5",
                title: "Infoga taggar",
                difficulty: "medium",
                description: "Lägg till taggarna: 'Elektronik', 'Kontor', 'Gaming'.",
                hint: "INSERT INTO taggar (namn) VALUES ...",
                solution: "INSERT INTO taggar (namn) VALUES ('Elektronik'), ('Kontor'), ('Gaming');",
                concept: "INSERT taggar",
                validate: (result) => !result.error
            },
            {
                id: "6-6",
                title: "Koppla produkt till tagg",
                difficulty: "medium",
                description: "Koppla produkt 1 till tagg 1 och 2.",
                hint: "INSERT INTO produkt_taggar VALUES (1, 1), (1, 2)",
                solution: "INSERT INTO produkt_taggar VALUES (1, 1), (1, 2);",
                concept: "Many-to-many data",
                validate: (result) => !result.error
            },
            {
                id: "6-7",
                title: "Hämta med taggar",
                difficulty: "hard",
                description: "Visa produktnamn med deras taggar (JOIN genom kopplingstabell).",
                hint: "JOIN produkter -> produkt_taggar -> taggar",
                solution: "SELECT p.namn, t.namn AS tagg FROM produkter p JOIN produkt_taggar pt ON p.id = pt.produkt_id JOIN taggar t ON pt.tagg_id = t.id;",
                concept: "Many-to-many JOIN",
                validate: (result) => result.columns && result.columns.includes('tagg')
            }
        ]
    },

    // ===== DAG 7: AVANCERAT (10 övningar) =====
    7: {
        title: "Dag 7: Avancerad SQL & DevOps",
        description: "Subqueries, transaktioner, index och backup",
        exercises: [
            {
                id: "7-1",
                title: "Subquery i WHERE",
                difficulty: "medium",
                description: "Hitta produkter som kostar mer än genomsnittspriset.",
                hint: "WHERE pris > (SELECT AVG(pris) FROM produkter)",
                solution: "SELECT * FROM produkter WHERE pris > (SELECT AVG(pris) FROM produkter);",
                concept: "Subquery",
                validate: (result) => result.values && result.values.length >= 0
            },
            {
                id: "7-2",
                title: "Subquery med IN",
                difficulty: "medium",
                description: "Hitta kunder som har gjort minst en order.",
                hint: "WHERE id IN (SELECT kund_id FROM ordrar)",
                solution: "SELECT * FROM kunder WHERE id IN (SELECT DISTINCT kund_id FROM ordrar);",
                concept: "IN subquery",
                validate: (result) => result.columns && result.columns.includes('namn')
            },
            {
                id: "7-3",
                title: "Subquery som tabell",
                difficulty: "hard",
                description: "Beräkna snittorder per kund, sen hitta kunder över snittet.",
                hint: "Nästlad SELECT med FROM (SELECT...)",
                solution: "SELECT * FROM (SELECT kund_id, AVG(totalt) AS snitt FROM ordrar GROUP BY kund_id) WHERE snitt > 500;",
                concept: "Derived table",
                validate: (result) => result.columns && result.columns.includes('snitt')
            },
            {
                id: "7-4",
                title: "CASE WHEN",
                difficulty: "medium",
                description: "Klassificera produkter: 'Billig' (under 100), 'Medium' (100-500), 'Dyr' (över 500).",
                hint: "SELECT namn, CASE WHEN pris < 100 THEN 'Billig' ... END AS prisklass",
                solution: "SELECT namn, pris, CASE WHEN pris < 100 THEN 'Billig' WHEN pris <= 500 THEN 'Medium' ELSE 'Dyr' END AS prisklass FROM produkter;",
                concept: "CASE WHEN",
                validate: (result) => result.columns && result.columns.includes('prisklass')
            },
            {
                id: "7-5",
                title: "Skapa index",
                difficulty: "easy",
                description: "Skapa ett index på kolumnen 'stad' i kundtabellen för snabbare sökningar.",
                hint: "CREATE INDEX idx_stad ON kunder(stad)",
                solution: "CREATE INDEX idx_stad ON kunder(stad);",
                concept: "CREATE INDEX",
                validate: (result) => !result.error
            },
            {
                id: "7-6",
                title: "Transaktion",
                difficulty: "hard",
                description: "Starta en transaktion, uppdatera ett pris, och committa.",
                hint: "BEGIN TRANSACTION; UPDATE...; COMMIT;",
                solution: "BEGIN TRANSACTION; UPDATE produkter SET pris = pris + 10 WHERE id = 1; COMMIT;",
                concept: "Transaction",
                validate: (result) => !result.error
            },
            {
                id: "7-7",
                title: "COALESCE",
                difficulty: "medium",
                description: "Visa ordrar med kundnamn, ersätt NULL med 'Okänd kund'.",
                hint: "COALESCE(kolumn, 'standardvärde')",
                solution: "SELECT o.*, COALESCE(k.namn, 'Okänd kund') AS kund FROM ordrar o LEFT JOIN kunder k ON o.kund_id = k.id;",
                concept: "COALESCE",
                validate: (result) => result.columns && result.columns.includes('kund')
            },
            {
                id: "7-8",
                title: "EXISTS",
                difficulty: "hard",
                description: "Hitta kunder som har ordrar med EXISTS.",
                hint: "WHERE EXISTS (SELECT 1 FROM ordrar WHERE ...)",
                solution: "SELECT * FROM kunder k WHERE EXISTS (SELECT 1 FROM ordrar o WHERE o.kund_id = k.id);",
                concept: "EXISTS",
                validate: (result) => result.columns && result.columns.includes('namn')
            },
            {
                id: "7-9",
                title: "Komplex vy",
                difficulty: "hard",
                description: "Skapa en vy 'order_summering' som visar: kundnamn, antal ordrar, total summa.",
                hint: "CREATE VIEW med JOIN och GROUP BY",
                solution: "CREATE VIEW order_summering AS SELECT k.namn, COUNT(o.id) AS antal_ordrar, SUM(o.totalt) AS total_summa FROM kunder k LEFT JOIN ordrar o ON k.id = o.kund_id GROUP BY k.id;",
                concept: "Komplex VIEW",
                validate: (result) => !result.error
            },
            {
                id: "7-10",
                title: "Slutprojekt",
                difficulty: "hard",
                description: "Hitta topp 3 kunder (efter total inköpssumma) som bor i Stockholm eller Göteborg.",
                hint: "Kombinera JOIN, WHERE, GROUP BY, ORDER BY, LIMIT",
                solution: "SELECT k.namn, SUM(o.totalt) AS total FROM kunder k JOIN ordrar o ON k.id = o.kund_id WHERE k.stad IN ('Stockholm', 'Göteborg') GROUP BY k.id ORDER BY total DESC LIMIT 3;",
                concept: "Allt tillsammans",
                validate: (result) => result.rowCount <= 3
            }
        ]
    },

    // ===== BONUS: HANUKKAH MYSTERIES (Kräver Hanukkah-databasen) =====
    8: {
        title: "🕎 Hanukkah Mysteries",
        description: "Lös mysterier för att hitta Noahs försvunna matta! Byt till Hanukkah-databasen först.",
        requiresDatabase: "hanukkah",
        exercises: [
            {
                id: "8-1",
                title: "🕯️ Mysterium 1: Privatdetektiven",
                difficulty: "medium",
                description: "En kund är privatdetektiv och har ett telefonnummer som 'stavar' deras efternamn. På gamla telefoner hade varje siffra bokstäver (2=ABC, 3=DEF, 4=GHI, 5=JKL, 6=MNO, 7=PQRS, 8=TUV, 9=WXYZ). Hitta kunden vars efternamn matchar deras telefonnummer!",
                hint: "Tänk på att K=5, N=6, O=6, P=7, P=7... Leta efter någon vars efternamn 'översätts' till deras telefonnummer.",
                solution: "SELECT * FROM customers WHERE phone = '726-567-7';",
                concept: "WHERE med mönster",
                validate: (result) => result.rowCount >= 1 && result.values.some(row => row.includes('Sam Knopp'))
            },
            {
                id: "8-2",
                title: "🕯️ Mysterium 2: Kontraktorn",
                difficulty: "medium",
                description: "Mattan lämnades in på kemtvätten 2017. Kontraktorn som hämtade den har initialerna 'JP' och köpte rengöringsmedel på Noah's Market samma år. Hitta denna person!",
                hint: "Sök efter en kund vars namn börjar med 'J' och efternamn med 'P', som hade ordrar 2017 med rengöringsprodukter (DRY-).",
                solution: "SELECT c.* FROM customers c JOIN orders o ON c.customerid = o.customerid JOIN orders_items oi ON o.orderid = oi.orderid WHERE c.name LIKE 'J% P%' AND o.ordered LIKE '2017%' AND oi.sku LIKE 'DRY%';",
                concept: "JOIN + WHERE + LIKE",
                validate: (result) => result.rowCount >= 1 && result.values.some(row => row.includes('Jeremy Pollock'))
            },
            {
                id: "8-3",
                title: "🕯️ Mysterium 3: Kattälskaren",
                difficulty: "medium",
                description: "Det finns en kund som ÄLSKAR katter och köper kattmat regelbundet. Hitta kunden som köpt mest kattrelaterade produkter (PET- kategorin)!",
                hint: "Använd JOIN mellan customers, orders och orders_items. Filtrera på sku LIKE 'PET%' och räkna totala kvantiteten.",
                solution: "SELECT c.name, SUM(oi.qty) as total_pet_items FROM customers c JOIN orders o ON c.customerid = o.customerid JOIN orders_items oi ON o.orderid = oi.orderid WHERE oi.sku LIKE 'PET%' GROUP BY c.customerid ORDER BY total_pet_items DESC LIMIT 1;",
                concept: "JOIN + GROUP BY + ORDER BY",
                validate: (result) => result.rowCount >= 1
            },
            {
                id: "8-4",
                title: "🕯️ Mysterium 4: Äldsta kunden",
                difficulty: "easy",
                description: "Hitta den äldsta kunden i databasen (baserat på födelsedatum).",
                hint: "ORDER BY birthdate och LIMIT 1 för att få den äldsta.",
                solution: "SELECT * FROM customers ORDER BY birthdate ASC LIMIT 1;",
                concept: "ORDER BY + LIMIT",
                validate: (result) => result.rowCount === 1
            },
            {
                id: "8-5",
                title: "🕯️ Mysterium 5: Bagel-entusiasten",
                difficulty: "medium",
                description: "Vem har köpt flest bagels (alla typer)? Hitta kundens namn och totala antal bagels köpta.",
                hint: "Filtrera orders_items på sku LIKE 'BKY%' (bagels är i BaKerY-kategorin). Summera qty per kund.",
                solution: "SELECT c.name, SUM(oi.qty) as total_bagels FROM customers c JOIN orders o ON c.customerid = o.customerid JOIN orders_items oi ON o.orderid = oi.orderid WHERE oi.sku LIKE 'BKY%' GROUP BY c.customerid ORDER BY total_bagels DESC LIMIT 1;",
                concept: "JOIN + GROUP BY + Aggregering",
                validate: (result) => result.rowCount >= 1
            },
            {
                id: "8-6",
                title: "🕯️ Mysterium 6: Dyra vanor",
                difficulty: "medium",
                description: "Vilken produkt har genererat mest intäkter totalt? (qty * unit_price)",
                hint: "SUM(qty * unit_price) grupperat på sku, med JOIN till products för att få produktnamn.",
                solution: "SELECT p.desc, SUM(oi.qty * oi.unit_price) as total_revenue FROM products p JOIN orders_items oi ON p.sku = oi.sku GROUP BY p.sku ORDER BY total_revenue DESC LIMIT 1;",
                concept: "JOIN + Beräkningar i SUM",
                validate: (result) => result.rowCount === 1
            },
            {
                id: "8-7",
                title: "🕯️ Mysterium 7: Brooklyn-borna",
                difficulty: "easy",
                description: "Hur många kunder bor i Brooklyn?",
                hint: "Använd COUNT och WHERE med LIKE för att hitta 'Brooklyn' i citystatezip.",
                solution: "SELECT COUNT(*) as brooklyn_customers FROM customers WHERE citystatezip LIKE '%Brooklyn%';",
                concept: "COUNT + WHERE LIKE",
                validate: (result) => result.rowCount === 1
            },
            {
                id: "8-8",
                title: "🕯️ Mysterium 8: Mattan är hittad!",
                difficulty: "hard",
                description: "Slutuppdraget! Hitta alla kunder som: (1) köpt rengöringsprodukter (DRY-), (2) har ordrar från 2017, OCH (3) bor i Brooklyn. En av dessa kan ha mattan!",
                hint: "Kombinera flera JOIN och WHERE-villkor. Använd DISTINCT för att undvika dubbletter.",
                solution: "SELECT DISTINCT c.* FROM customers c JOIN orders o ON c.customerid = o.customerid JOIN orders_items oi ON o.orderid = oi.orderid WHERE oi.sku LIKE 'DRY%' AND o.ordered LIKE '2017%' AND c.citystatezip LIKE '%Brooklyn%';",
                concept: "Komplex fråga med allt!",
                validate: (result) => result.rowCount >= 0
            }
        ]
    }
};

// Få övningar för en dag
function getDayExercises(day) {
    return EXERCISES_COMPLETE[day] || null;
}

// Få specifik övning
function getExercise(day, index) {
    const dayData = EXERCISES_COMPLETE[day];
    if (!dayData || !dayData.exercises[index]) return null;
    return dayData.exercises[index];
}

// Total antal övningar
function getTotalExercises() {
    return Object.values(EXERCISES_COMPLETE).reduce((sum, day) => sum + day.exercises.length, 0);
}

// Exportera
window.EXERCISES_COMPLETE = EXERCISES_COMPLETE;
window.getDayExercises = getDayExercises;
window.getExercise = getExercise;
window.getTotalExercises = getTotalExercises;
