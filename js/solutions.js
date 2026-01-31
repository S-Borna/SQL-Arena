// ===== SQL Quest - Solutions with Explanations =====
// Färdiga lösningar med detaljerade kommentarer för varje övning

const solutions = {
    // ========== DAG 1 ==========
    day1: [
        {
            // Övning 1: Hämta alla kunder
            code: `-- Hämta ALLA kolumner från tabellen 'kunder'
SELECT * FROM kunder;`,
            explanation: `
                <h5>🔍 Förklaring steg för steg:</h5>
                <div class="solution-step">
                    <span class="step-number">1</span>
                    <div class="step-content">
                        <code>SELECT</code> - Nyckelord som säger "hämta data"
                    </div>
                </div>
                <div class="solution-step">
                    <span class="step-number">2</span>
                    <div class="step-content">
                        <code>*</code> - Asterisken betyder "alla kolumner". Du kan läsa det som "allt".
                    </div>
                </div>
                <div class="solution-step">
                    <span class="step-number">3</span>
                    <div class="step-content">
                        <code>FROM kunder</code> - Anger VILKEN tabell vi hämtar från.
                    </div>
                </div>
                <div class="solution-tip">
                    <strong>💡 Tips:</strong> SELECT * är bra för att utforska data, men i produktion bör du ange specifika kolumner för bättre prestanda.
                </div>
            `
        },
        {
            // Övning 2: Välj specifika kolumner
            code: `-- Hämta endast förnamn och efternamn
SELECT fornamn, efternamn
FROM kunder;`,
            explanation: `
                <h5>🔍 Förklaring:</h5>
                <div class="solution-step">
                    <span class="step-number">1</span>
                    <div class="step-content">
                        <code>SELECT fornamn, efternamn</code> - Istället för * anger vi exakt vilka kolumner vi vill ha, separerade med komma.
                    </div>
                </div>
                <div class="solution-step">
                    <span class="step-number">2</span>
                    <div class="step-content">
                        <code>FROM kunder</code> - Fortfarande från kunder-tabellen.
                    </div>
                </div>
                <div class="solution-tip">
                    <strong>💡 Varför göra så?</strong>
                    <ul>
                        <li>Snabbare - databasen behöver inte hämta onödig data</li>
                        <li>Tydligare - du ser exakt vad du får</li>
                        <li>Säkrare - undviker att visa känslig data av misstag</li>
                    </ul>
                </div>
            `
        },
        {
            // Övning 3: Se alla produkter
            code: `-- Visa alla produkter
SELECT * FROM produkter;`,
            explanation: `
                <h5>🔍 Förklaring:</h5>
                <p>Samma princip som övning 1, men nu från en annan tabell!</p>
                <div class="solution-step">
                    <span class="step-number">1</span>
                    <div class="step-content">
                        Varje tabell i databasen har sitt eget namn. Här heter den <code>produkter</code>.
                    </div>
                </div>
                <div class="solution-tip">
                    <strong>💡 Titta på schemat:</strong> I högra panelen kan du alltid se vilka tabeller och kolumner som finns!
                </div>
            `
        },
        {
            // Övning 4: Kunder i Stockholm
            code: `-- Filtrera kunder som bor i Stockholm
SELECT *
FROM kunder
WHERE stad = 'Stockholm';`,
            explanation: `
                <h5>🔍 Förklaring:</h5>
                <div class="solution-step">
                    <span class="step-number">1</span>
                    <div class="step-content">
                        <code>WHERE</code> - Filtrerar vilka rader som returneras. Tänk på det som ett "villkor".
                    </div>
                </div>
                <div class="solution-step">
                    <span class="step-number">2</span>
                    <div class="step-content">
                        <code>stad = 'Stockholm'</code> - Villkoret: kolumnen "stad" ska vara exakt "Stockholm".
                    </div>
                </div>
                <div class="solution-warning">
                    <strong>⚠️ Viktigt om citattecken:</strong>
                    <ul>
                        <li>Text/strängar måste vara inom <code>'enkla citattecken'</code></li>
                        <li>Siffror behöver INTE citattecken: <code>WHERE pris = 100</code></li>
                    </ul>
                </div>
            `
        },
        {
            // Övning 5: Dyra produkter
            code: `-- Produkter som kostar mer än 1000 kr
SELECT namn, pris
FROM produkter
WHERE pris > 1000;`,
            explanation: `
                <h5>🔍 Förklaring:</h5>
                <div class="solution-step">
                    <span class="step-number">1</span>
                    <div class="step-content">
                        <code>SELECT namn, pris</code> - Vi väljer bara kolumnerna vi behöver.
                    </div>
                </div>
                <div class="solution-step">
                    <span class="step-number">2</span>
                    <div class="step-content">
                        <code>WHERE pris > 1000</code> - Större än-operatorn. Inga citattecken runt siffran!
                    </div>
                </div>
                <div class="solution-tip">
                    <strong>💡 Jämförelseoperatorer:</strong>
                    <table class="mini-table">
                        <tr><td><code>=</code></td><td>Lika med</td></tr>
                        <tr><td><code>></code></td><td>Större än</td></tr>
                        <tr><td><code><</code></td><td>Mindre än</td></tr>
                        <tr><td><code>>=</code></td><td>Större eller lika</td></tr>
                        <tr><td><code><=</code></td><td>Mindre eller lika</td></tr>
                        <tr><td><code>!= eller <></code></td><td>Inte lika med</td></tr>
                    </table>
                </div>
            `
        },
        {
            // Övning 6: IT-anställda
            code: `-- Anställda på IT-avdelningen
SELECT fornamn, efternamn, lon
FROM anstalda
WHERE avdelning = 'IT';`,
            explanation: `
                <h5>🔍 Förklaring:</h5>
                <div class="solution-step">
                    <span class="step-number">1</span>
                    <div class="step-content">
                        Vi kombinerar nu allt du lärt dig: specifika kolumner + filtrering!
                    </div>
                </div>
                <div class="solution-step">
                    <span class="step-number">2</span>
                    <div class="step-content">
                        <code>avdelning = 'IT'</code> - Filtrerar på textkolumnen "avdelning".
                    </div>
                </div>
                <div class="solution-tip">
                    <strong>💡 SQL är inte skiftlägeskänsligt för nyckelord:</strong><br>
                    <code>SELECT</code>, <code>select</code>, <code>SeLeCt</code> fungerar likadant.<br>
                    Men textvärden SOM 'IT' måste matcha exakt!
                </div>
            `
        },
        {
            // Övning 7: Lågt lager
            code: `-- Produkter med lager 30 eller mindre
SELECT *
FROM produkter
WHERE lager_antal <= 30;`,
            explanation: `
                <h5>🔍 Förklaring:</h5>
                <div class="solution-step">
                    <span class="step-number">1</span>
                    <div class="step-content">
                        <code><=</code> betyder "mindre än ELLER lika med". Så 30 inkluderas.
                    </div>
                </div>
                <div class="solution-tip">
                    <strong>💡 Skillnaden:</strong>
                    <ul>
                        <li><code>< 30</code> = 0, 1, 2... 29 (inte 30)</li>
                        <li><code><= 30</code> = 0, 1, 2... 29, 30 (inkluderar 30)</li>
                    </ul>
                </div>
            `
        }
    ],

    // ========== DAG 2 ==========
    day2: [
        {
            code: `-- Sortera produkter efter pris (billigast först)
SELECT *
FROM produkter
ORDER BY pris ASC;`,
            explanation: `
                <h5>🔍 Förklaring:</h5>
                <div class="solution-step">
                    <span class="step-number">1</span>
                    <div class="step-content">
                        <code>ORDER BY pris</code> - Sorterar resultatet efter kolumnen "pris".
                    </div>
                </div>
                <div class="solution-step">
                    <span class="step-number">2</span>
                    <div class="step-content">
                        <code>ASC</code> - Ascending (stigande ordning). 1, 2, 3... eller A, B, C...
                    </div>
                </div>
                <div class="solution-tip">
                    <strong>💡 Tips:</strong> ASC är standard, så du kan skriva bara <code>ORDER BY pris</code>!
                </div>
            `
        },
        {
            code: `-- Topp 5 dyraste produkterna
SELECT namn, pris
FROM produkter
ORDER BY pris DESC
LIMIT 5;`,
            explanation: `
                <h5>🔍 Förklaring:</h5>
                <div class="solution-step">
                    <span class="step-number">1</span>
                    <div class="step-content">
                        <code>ORDER BY pris DESC</code> - Descending = fallande. Högst först!
                    </div>
                </div>
                <div class="solution-step">
                    <span class="step-number">2</span>
                    <div class="step-content">
                        <code>LIMIT 5</code> - Returnera endast de 5 första raderna.
                    </div>
                </div>
                <div class="solution-tip">
                    <strong>💡 Kombinationen ORDER BY + LIMIT:</strong><br>
                    Perfekt för "topp X"-frågor! Sortera först, begränsa sedan.
                </div>
            `
        },
        {
            code: `-- Kunder vars namn börjar på M
SELECT *
FROM kunder
WHERE fornamn LIKE 'M%';`,
            explanation: `
                <h5>🔍 Förklaring:</h5>
                <div class="solution-step">
                    <span class="step-number">1</span>
                    <div class="step-content">
                        <code>LIKE</code> - Används för mönstermatchning i text.
                    </div>
                </div>
                <div class="solution-step">
                    <span class="step-number">2</span>
                    <div class="step-content">
                        <code>'M%'</code> - M följt av vad som helst. % = "wildcard" för 0 eller fler tecken.
                    </div>
                </div>
                <div class="solution-tip">
                    <strong>💡 LIKE-mönster:</strong>
                    <table class="mini-table">
                        <tr><td><code>'M%'</code></td><td>Börjar med M</td></tr>
                        <tr><td><code>'%son'</code></td><td>Slutar med "son"</td></tr>
                        <tr><td><code>'%an%'</code></td><td>Innehåller "an"</td></tr>
                        <tr><td><code>'_ars'</code></td><td>Ett tecken + "ars" (ex: "Lars")</td></tr>
                    </table>
                </div>
            `
        },
        {
            code: `-- Produkter som kostar mellan 500 och 2000
SELECT *
FROM produkter
WHERE pris BETWEEN 500 AND 2000;`,
            explanation: `
                <h5>🔍 Förklaring:</h5>
                <div class="solution-step">
                    <span class="step-number">1</span>
                    <div class="step-content">
                        <code>BETWEEN 500 AND 2000</code> - Inklusive båda gränserna!
                    </div>
                </div>
                <div class="solution-tip">
                    <strong>💡 Alternativ syntax:</strong><br>
                    <code>WHERE pris >= 500 AND pris <= 2000</code><br>
                    Gör samma sak, men BETWEEN är mer läsbart!
                </div>
            `
        },
        {
            code: `-- Kunder i storstäderna
SELECT *
FROM kunder
WHERE stad IN ('Stockholm', 'Göteborg', 'Malmö');`,
            explanation: `
                <h5>🔍 Förklaring:</h5>
                <div class="solution-step">
                    <span class="step-number">1</span>
                    <div class="step-content">
                        <code>IN (...)</code> - Kontrollerar om värdet finns i listan.
                    </div>
                </div>
                <div class="solution-tip">
                    <strong>💡 IN vs OR:</strong><br>
                    <code>WHERE stad IN ('A', 'B', 'C')</code><br>
                    är samma som:<br>
                    <code>WHERE stad = 'A' OR stad = 'B' OR stad = 'C'</code><br>
                    Men IN är mycket lättare att läsa!
                </div>
            `
        },
        {
            code: `-- Elektronik under 1000 kr
SELECT *
FROM produkter
WHERE kategori = 'Elektronik'
  AND pris < 1000;`,
            explanation: `
                <h5>🔍 Förklaring:</h5>
                <div class="solution-step">
                    <span class="step-number">1</span>
                    <div class="step-content">
                        <code>AND</code> - BÅDA villkoren måste vara sanna.
                    </div>
                </div>
                <div class="solution-tip">
                    <strong>💡 AND vs OR:</strong>
                    <ul>
                        <li><code>AND</code> - Båda måste stämma (striktare)</li>
                        <li><code>OR</code> - Minst ett måste stämma (vidare)</li>
                    </ul>
                </div>
            `
        },
        {
            code: `-- Sök efter email-domän, sorterat
SELECT *
FROM kunder
WHERE email LIKE '%@email.se'
ORDER BY efternamn;`,
            explanation: `
                <h5>🔍 Förklaring:</h5>
                <div class="solution-step">
                    <span class="step-number">1</span>
                    <div class="step-content">
                        <code>'%@email.se'</code> - % i början = "vad som helst" följt av "@email.se".
                    </div>
                </div>
                <div class="solution-step">
                    <span class="step-number">2</span>
                    <div class="step-content">
                        <code>ORDER BY efternamn</code> - Sorterar alfabetiskt på efternamn.
                    </div>
                </div>
            `
        }
    ],

    // ========== DAG 3 ==========
    day3: [
        {
            code: `-- Räkna totalt antal kunder
SELECT COUNT(*) FROM kunder;`,
            explanation: `
                <h5>🔍 Förklaring:</h5>
                <div class="solution-step">
                    <span class="step-number">1</span>
                    <div class="step-content">
                        <code>COUNT(*)</code> - Aggregatfunktion som räknar antal rader.
                    </div>
                </div>
                <div class="solution-tip">
                    <strong>💡 Aggregatfunktioner:</strong><br>
                    Tar MÅNGA rader och returnerar ETT värde.
                </div>
            `
        },
        {
            code: `-- Summa av alla produktpriser
SELECT SUM(pris) FROM produkter;`,
            explanation: `
                <h5>🔍 Förklaring:</h5>
                <div class="solution-step">
                    <span class="step-number">1</span>
                    <div class="step-content">
                        <code>SUM(pris)</code> - Adderar alla värden i pris-kolumnen.
                    </div>
                </div>
            `
        },
        {
            code: `-- Genomsnittlig lön
SELECT AVG(lon) FROM anstalda;`,
            explanation: `
                <h5>🔍 Förklaring:</h5>
                <div class="solution-step">
                    <span class="step-number">1</span>
                    <div class="step-content">
                        <code>AVG(lon)</code> - Average = medelvärde.
                    </div>
                </div>
            `
        },
        {
            code: `-- Lägsta och högsta pris
SELECT MIN(pris), MAX(pris) FROM produkter;`,
            explanation: `
                <h5>🔍 Förklaring:</h5>
                <div class="solution-step">
                    <span class="step-number">1</span>
                    <div class="step-content">
                        <code>MIN()</code> och <code>MAX()</code> i samma SELECT.
                    </div>
                </div>
                <div class="solution-tip">
                    <strong>💡 Du kan ha flera aggregatfunktioner!</strong>
                </div>
            `
        },
        {
            code: `-- Produkter per kategori
SELECT kategori, COUNT(*) as antal
FROM produkter
GROUP BY kategori;`,
            explanation: `
                <h5>🔍 Förklaring:</h5>
                <div class="solution-step">
                    <span class="step-number">1</span>
                    <div class="step-content">
                        <code>GROUP BY kategori</code> - Grupperar rader med samma kategori.
                    </div>
                </div>
                <div class="solution-step">
                    <span class="step-number">2</span>
                    <div class="step-content">
                        <code>COUNT(*)</code> räknar nu per grupp, inte totalt!
                    </div>
                </div>
                <div class="solution-step">
                    <span class="step-number">3</span>
                    <div class="step-content">
                        <code>as antal</code> - Ger kolumnen ett alias (smeknamn).
                    </div>
                </div>
            `
        },
        {
            code: `-- Kunder per stad, sorterat
SELECT stad, COUNT(*) as antal
FROM kunder
GROUP BY stad
ORDER BY antal DESC;`,
            explanation: `
                <h5>🔍 Förklaring:</h5>
                <div class="solution-step">
                    <span class="step-number">1</span>
                    <div class="step-content">
                        Kombination: GROUP BY + ORDER BY.
                    </div>
                </div>
                <div class="solution-step">
                    <span class="step-number">2</span>
                    <div class="step-content">
                        <code>ORDER BY antal DESC</code> - Använder aliaset!
                    </div>
                </div>
            `
        },
        {
            code: `-- Avdelningar med snittlön över 50000
SELECT avdelning, AVG(lon) as snittlon
FROM anstalda
GROUP BY avdelning
HAVING AVG(lon) > 50000;`,
            explanation: `
                <h5>🔍 Förklaring:</h5>
                <div class="solution-step">
                    <span class="step-number">1</span>
                    <div class="step-content">
                        <code>HAVING</code> - Filtrerar EFTER gruppering (WHERE gör det innan).
                    </div>
                </div>
                <div class="solution-warning">
                    <strong>⚠️ WHERE vs HAVING:</strong>
                    <ul>
                        <li>WHERE - filtrerar rader INNAN gruppering</li>
                        <li>HAVING - filtrerar grupper EFTER gruppering</li>
                    </ul>
                </div>
            `
        }
    ],

    // ========== DAG 4 ==========
    day4: [
        {
            code: `-- Kunder med ordrar (INNER JOIN)
SELECT kunder.fornamn, ordrar.order_datum
FROM kunder
INNER JOIN ordrar
  ON kunder.kund_id = ordrar.kund_id;`,
            explanation: `
                <h5>🔍 Förklaring:</h5>
                <div class="solution-step">
                    <span class="step-number">1</span>
                    <div class="step-content">
                        <code>INNER JOIN</code> - Kombinerar rader från två tabeller där villkoret matchar.
                    </div>
                </div>
                <div class="solution-step">
                    <span class="step-number">2</span>
                    <div class="step-content">
                        <code>ON kunder.kund_id = ordrar.kund_id</code> - Kopplingen! Matcha på samma kund_id.
                    </div>
                </div>
                <div class="solution-tip">
                    <strong>💡 INNER JOIN:</strong> Endast rader som har matchning i BÅDA tabellerna visas.
                </div>
            `
        },
        {
            code: `-- Ordrar med kundinfo
SELECT ordrar.order_id, kunder.fornamn, kunder.efternamn
FROM ordrar
INNER JOIN kunder
  ON ordrar.kund_id = kunder.kund_id;`,
            explanation: `
                <h5>🔍 Förklaring:</h5>
                <p>Samma princip, men vi börjar från ordrar-tabellen istället.</p>
                <div class="solution-tip">
                    <strong>💡 Tips:</strong> Ordningen på tabellerna spelar inte så stor roll för INNER JOIN.
                </div>
            `
        },
        {
            code: `-- Alla kunder, även utan ordrar (LEFT JOIN)
SELECT kunder.fornamn, kunder.efternamn, ordrar.order_id
FROM kunder
LEFT JOIN ordrar
  ON kunder.kund_id = ordrar.kund_id;`,
            explanation: `
                <h5>🔍 Förklaring:</h5>
                <div class="solution-step">
                    <span class="step-number">1</span>
                    <div class="step-content">
                        <code>LEFT JOIN</code> - Alla rader från VÄNSTER tabell behålls, även utan matchning.
                    </div>
                </div>
                <div class="solution-step">
                    <span class="step-number">2</span>
                    <div class="step-content">
                        Kunder utan ordrar får <code>NULL</code> i order_id.
                    </div>
                </div>
            `
        },
        {
            code: `-- Anställda med chefer (self-join)
SELECT a1.fornamn as anstalld, a2.fornamn as chef
FROM anstalda a1
LEFT JOIN anstalda a2
  ON a1.chef_id = a2.anstalld_id;`,
            explanation: `
                <h5>🔍 Förklaring:</h5>
                <div class="solution-step">
                    <span class="step-number">1</span>
                    <div class="step-content">
                        <code>Self-join</code> - Tabellen joins med sig själv!
                    </div>
                </div>
                <div class="solution-step">
                    <span class="step-number">2</span>
                    <div class="step-content">
                        <code>a1</code> och <code>a2</code> är alias för samma tabell.
                    </div>
                </div>
                <div class="solution-tip">
                    <strong>💡 Alias krävs:</strong> När du joinar en tabell med sig själv MÅSTE du använda olika alias!
                </div>
            `
        },
        {
            code: `-- Orderdetaljer med produktnamn
SELECT orderrader.order_id, produkter.namn, orderrader.antal
FROM orderrader
INNER JOIN produkter
  ON orderrader.produkt_id = produkter.produkt_id;`,
            explanation: `
                <h5>🔍 Förklaring:</h5>
                <p>Kopplar orderrader till produkter för att se produktnamn istället för bara ID.</p>
            `
        },
        {
            code: `-- Komplett orderöversikt (3 JOINs!)
SELECT k.fornamn, o.order_datum, p.namn
FROM kunder k
INNER JOIN ordrar o ON k.kund_id = o.kund_id
INNER JOIN orderrader r ON o.order_id = r.order_id
INNER JOIN produkter p ON r.produkt_id = p.produkt_id;`,
            explanation: `
                <h5>🔍 Förklaring:</h5>
                <div class="solution-step">
                    <span class="step-number">1</span>
                    <div class="step-content">
                        Vi kedjar tre JOINs: kunder → ordrar → orderrader → produkter
                    </div>
                </div>
                <div class="solution-step">
                    <span class="step-number">2</span>
                    <div class="step-content">
                        Korta alias (k, o, r, p) gör koden mer läsbar.
                    </div>
                </div>
                <div class="solution-tip">
                    <strong>💡 Tänk på det som en kedja:</strong> Varje JOIN lägger till mer information.
                </div>
            `
        },
        {
            code: `-- Antal ordrar per kund
SELECT k.fornamn, COUNT(o.order_id) as antal_ordrar
FROM kunder k
LEFT JOIN ordrar o ON k.kund_id = o.kund_id
GROUP BY k.kund_id
ORDER BY antal_ordrar DESC;`,
            explanation: `
                <h5>🔍 Förklaring:</h5>
                <p>Kombination av JOIN + GROUP BY + ORDER BY!</p>
                <div class="solution-tip">
                    <strong>💡 LEFT JOIN här:</strong> Så att kunder utan ordrar också visas (med 0).
                </div>
            `
        }
    ],

    // ========== DAG 5 ==========
    day5: [
        {
            code: `-- Skapa en enkel tabell
CREATE TABLE test_tabell (
    id INTEGER PRIMARY KEY,
    namn TEXT
);`,
            explanation: `
                <h5>🔍 Förklaring:</h5>
                <div class="solution-step">
                    <span class="step-number">1</span>
                    <div class="step-content">
                        <code>CREATE TABLE</code> - Skapar en ny tabell.
                    </div>
                </div>
                <div class="solution-step">
                    <span class="step-number">2</span>
                    <div class="step-content">
                        <code>INTEGER PRIMARY KEY</code> - Unik identifierare för varje rad.
                    </div>
                </div>
            `
        },
        {
            code: `-- Lägg till en ny kund
INSERT INTO kunder (fornamn, efternamn, stad)
VALUES ('Test', 'Testsson', 'Teststad');`,
            explanation: `
                <h5>🔍 Förklaring:</h5>
                <div class="solution-step">
                    <span class="step-number">1</span>
                    <div class="step-content">
                        <code>INSERT INTO tabell (kolumner)</code> - Ange vilka kolumner.
                    </div>
                </div>
                <div class="solution-step">
                    <span class="step-number">2</span>
                    <div class="step-content">
                        <code>VALUES (...)</code> - Värdena i samma ordning som kolumnerna.
                    </div>
                </div>
            `
        },
        {
            code: `-- Lägg till ny produkt
INSERT INTO produkter (namn, kategori, pris)
VALUES ('Testprodukt', 'Test', 123.50);`,
            explanation: `
                <h5>🔍 Förklaring:</h5>
                <p>Samma princip - ange kolumner och värden.</p>
            `
        },
        {
            code: `-- Uppdatera ett pris
UPDATE produkter
SET pris = 349
WHERE namn = 'Trådlös Mus';`,
            explanation: `
                <h5>🔍 Förklaring:</h5>
                <div class="solution-step">
                    <span class="step-number">1</span>
                    <div class="step-content">
                        <code>UPDATE tabell SET kolumn = värde</code>
                    </div>
                </div>
                <div class="solution-warning">
                    <strong>⚠️ KRITISKT:</strong> WHERE-satsen avgör VILKA rader som uppdateras. Utan WHERE ändras ALLA rader!
                </div>
            `
        },
        {
            code: `-- Ge löneökning
UPDATE anstalda
SET lon = lon + 5000
WHERE avdelning = 'IT';`,
            explanation: `
                <h5>🔍 Förklaring:</h5>
                <div class="solution-step">
                    <span class="step-number">1</span>
                    <div class="step-content">
                        <code>lon = lon + 5000</code> - Du kan använda det nuvarande värdet i beräkningen!
                    </div>
                </div>
            `
        },
        {
            code: `-- Ta bort testdata
DELETE FROM kunder
WHERE fornamn = 'Test';`,
            explanation: `
                <h5>🔍 Förklaring:</h5>
                <div class="solution-warning">
                    <strong>⚠️ VARNING:</strong> DELETE utan WHERE tar bort ALLT! Dubbelkolla alltid WHERE-satsen.
                </div>
            `
        },
        {
            code: `-- Tabell med constraints
CREATE TABLE projekt (
    projekt_id INTEGER PRIMARY KEY,
    namn TEXT NOT NULL,
    budget DECIMAL,
    start_datum DATE DEFAULT CURRENT_DATE
);`,
            explanation: `
                <h5>🔍 Förklaring:</h5>
                <div class="solution-step">
                    <span class="step-number">1</span>
                    <div class="step-content">
                        <code>NOT NULL</code> - Kolumnen MÅSTE ha ett värde.
                    </div>
                </div>
                <div class="solution-step">
                    <span class="step-number">2</span>
                    <div class="step-content">
                        <code>DEFAULT CURRENT_DATE</code> - Automatiskt dagens datum om inget anges.
                    </div>
                </div>
            `
        }
    ],

    // ========== DAG 6 & 7 - Kortare format ==========
    day6: [
        { code: `SELECT namn, kategori FROM produkter WHERE kategori = 'Elektronik';`, explanation: `<p>Problemet: Om "Elektronik" stavas fel någonstans hittas det inte. Bättre med en separat kategorier-tabell!</p>` },
        { code: `SELECT * FROM kategorier;`, explanation: `<p>Normaliserad tabell med kategori_id som referens.</p>` },
        { code: `SELECT COUNT(DISTINCT stad) FROM kunder;`, explanation: `<p>DISTINCT räknar endast unika värden.</p>` },
        { code: `SELECT * FROM stader WHERE befolkning > 200000;`, explanation: `<p>Normaliserad städer-tabell med extra information.</p>` },
        { code: `CREATE TABLE kund_stad (kund_id INTEGER, stad_id INTEGER, FOREIGN KEY (kund_id) REFERENCES kunder(kund_id), FOREIGN KEY (stad_id) REFERENCES stader(stad_id));`, explanation: `<p>Mellantabell för att koppla kunder till normaliserade städer.</p>` },
        { code: `SELECT k.fornamn, k.efternamn, s.befolkning FROM kunder k INNER JOIN stader s ON k.stad = s.namn;`, explanation: `<p>JOIN baserat på stadsnamnet (onormaliserat) mot normaliserad tabell.</p>` },
        { code: `SELECT o.order_id, COUNT(r.rad_id) as antal_produkter FROM ordrar o LEFT JOIN orderrader r ON o.order_id = r.order_id GROUP BY o.order_id;`, explanation: `<p>Visar hur N:M-relationen ordrar↔produkter fungerar via mellantabellen orderrader.</p>` }
    ],

    day7: [
        { code: `SELECT * FROM produkter WHERE pris > (SELECT AVG(pris) FROM produkter);`, explanation: `<p>Subquery beräknar genomsnittet, yttre query jämför mot det.</p>` },
        { code: `SELECT avdelning, MAX(lon) as hogsta_lon FROM anstalda GROUP BY avdelning;`, explanation: `<p>MAX() ger högsta värdet per grupp.</p>` },
        { code: `SELECT namn, pris, CASE WHEN pris < 500 THEN 'Billig' WHEN pris <= 2000 THEN 'Medium' ELSE 'Dyr' END as prisklass FROM produkter;`, explanation: `<p>CASE skapar villkorlig logik direkt i SELECT.</p>` },
        { code: `CREATE VIEW aktiva_ordrar AS SELECT * FROM ordrar WHERE status IN ('behandlas', 'väntande');`, explanation: `<p>VIEW är en sparad query som beter sig som en tabell.</p>` },
        { code: `SELECT COUNT(*) FROM aktiva_ordrar;`, explanation: `<p>Använd VIEW precis som en vanlig tabell!</p>` },
        { code: `SELECT k.fornamn, k.efternamn, COUNT(o.order_id) as antal_ordrar FROM kunder k LEFT JOIN ordrar o ON k.kund_id = o.kund_id GROUP BY k.kund_id ORDER BY antal_ordrar DESC LIMIT 3;`, explanation: `<p>Kombinerar JOIN, GROUP BY, ORDER BY och LIMIT för en komplex fråga.</p>` },
        { code: `SELECT p.kategori, SUM(r.antal * r.pris_per_enhet) as total_forsaljning FROM orderrader r INNER JOIN produkter p ON r.produkt_id = p.produkt_id GROUP BY p.kategori ORDER BY total_forsaljning DESC;`, explanation: `<p>Beräknar total försäljning genom att multiplicera antal med pris och summera per kategori.</p>` }
    ]
};

// Hämta lösning för specifik övning
function getSolution(day, exerciseIndex) {
    const daySolutions = solutions[`day${day}`];
    if (!daySolutions || !daySolutions[exerciseIndex]) {
        return null;
    }
    return daySolutions[exerciseIndex];
}

// Visa lösning i modal
function showSolution() {
    const solution = getSolution(currentDay, currentExercise);
    if (!solution) {
        showNotification('Ingen lösning tillgänglig för denna övning', 'warning');
        return;
    }

    const codeElement = document.getElementById('solution-code');
    const explanationElement = document.getElementById('solution-explanation');

    if (codeElement) {
        codeElement.textContent = solution.code;
    }

    if (explanationElement) {
        explanationElement.innerHTML = solution.explanation;
    }

    showModal('solution-modal');
}

// Kopiera lösning till editor
function copySolutionToEditor() {
    const solution = getSolution(currentDay, currentExercise);
    if (!solution) return;

    const editor = document.getElementById('sql-editor');
    if (editor) {
        editor.value = solution.code;
        updateLineNumbers();
    }

    closeModal('solution-modal');
    showNotification('Lösning kopierad till editorn', 'info');
}

// Exportera
window.solutions = solutions;
window.getSolution = getSolution;
window.showSolution = showSolution;
window.copySolutionToEditor = copySolutionToEditor;
