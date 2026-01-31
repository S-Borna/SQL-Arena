// ===== SQL Quest - Kompletta Lösningar med Detaljerade Förklaringar =====
// Facit för alla 82 övningar med steg-för-steg genomgångar

const SOLUTIONS_COMPLETE = {
    // ===== DAG 1 =====
    "1-1": {
        title: "Din första SELECT",
        solution: "SELECT * FROM kunder;",
        explanation: `
            <div class="solution-breakdown">
                <h4>🔍 Steg-för-steg förklaring:</h4>
                <div class="code-breakdown">
                    <code>SELECT</code> - Kommandot som säger "hämta data"<br>
                    <code>*</code> - Asterisk betyder "alla kolumner"<br>
                    <code>FROM kunder</code> - Från vilken tabell vi hämtar
                </div>

                <h4>💡 Bra att veta:</h4>
                <ul>
                    <li>SELECT * är snabbt att skriva men kan vara ineffektivt i produktion</li>
                    <li>I riktiga applikationer - välj specifika kolumner du behöver</li>
                    <li>Perfekt för att utforska en tabell du inte känner till</li>
                </ul>

                <h4>🎯 Alternativa lösningar:</h4>
                <pre>-- Också korrekt (explicit alla kolumner):
SELECT id, namn, email, stad FROM kunder;</pre>
            </div>
        `
    },
    "1-2": {
        title: "Välj specifika kolumner",
        solution: "SELECT namn, email FROM kunder;",
        explanation: `
            <div class="solution-breakdown">
                <h4>🔍 Steg-för-steg:</h4>
                <div class="code-breakdown">
                    <code>SELECT namn, email</code> - Endast dessa två kolumner<br>
                    <code>FROM kunder</code> - Från kundtabellen
                </div>

                <h4>💡 Best Practice:</h4>
                <ul>
                    <li>Välj ALLTID specifika kolumner i produktionskod</li>
                    <li>Sparar bandbredd och minne</li>
                    <li>Tydligare kod - man ser exakt vad som hämtas</li>
                </ul>

                <h4>⚡ Prestandatips:</h4>
                <p>En tabell med 50 kolumner och 1 miljon rader:
                <br>SELECT * = ~500MB data
                <br>SELECT namn, email = ~20MB data</p>
            </div>
        `
    },
    "1-3": {
        title: "Filtrera med WHERE",
        solution: "SELECT * FROM kunder WHERE stad = 'Stockholm';",
        explanation: `
            <div class="solution-breakdown">
                <h4>🔍 Anatomin av WHERE:</h4>
                <div class="code-breakdown">
                    <code>WHERE</code> - Nyckelord som startar filtreringen<br>
                    <code>stad = 'Stockholm'</code> - Villkoret som måste vara sant<br>
                    <code>'Stockholm'</code> - Text MÅSTE ha citattecken!
                </div>

                <h4>⚠️ Vanliga fel:</h4>
                <ul>
                    <li>❌ WHERE stad = Stockholm (saknar citattecken)</li>
                    <li>❌ WHERE stad == 'Stockholm' (dubbelt likhetstecken)</li>
                    <li>✅ WHERE stad = 'Stockholm' (korrekt!)</li>
                </ul>

                <h4>🎯 Jämförelseoperatorer:</h4>
                <pre>= lika med
!= eller <> inte lika med
> större än
< mindre än
>= större än eller lika
<= mindre än eller lika</pre>
            </div>
        `
    },
    "1-4": {
        title: "Filtrera med nummer",
        solution: "SELECT * FROM produkter WHERE pris > 100;",
        explanation: `
            <div class="solution-breakdown">
                <h4>🔍 Nummer vs Text:</h4>
                <div class="code-breakdown">
                    <code>pris > 100</code> - Numeriskt värde, INGA citattecken!
                </div>

                <h4>💡 Regel att komma ihåg:</h4>
                <ul>
                    <li>Text = 'citattecken' (enkel eller dubbel)</li>
                    <li>Nummer = inga citattecken</li>
                    <li>NULL = inget citattecken (specialvärde)</li>
                </ul>

                <h4>✅ Fler exempel:</h4>
                <pre>WHERE pris >= 100   -- 100 eller mer
WHERE pris < 50     -- under 50
WHERE pris != 0     -- inte gratis</pre>
            </div>
        `
    },
    "1-5": {
        title: "Kombinera villkor med AND",
        solution: "SELECT * FROM produkter WHERE pris > 50 AND lager > 10;",
        explanation: `
            <div class="solution-breakdown">
                <h4>🔍 AND betyder BÅDA måste vara sanna:</h4>
                <div class="code-breakdown">
                    <code>pris > 50</code> - Första villkoret<br>
                    <code>AND</code> - Båda måste gälla<br>
                    <code>lager > 10</code> - Andra villkoret
                </div>

                <h4>📊 Sanningstabell för AND:</h4>
                <pre>SANT AND SANT = SANT ✅
SANT AND FALSKT = FALSKT ❌
FALSKT AND SANT = FALSKT ❌
FALSKT AND FALSKT = FALSKT ❌</pre>

                <h4>💡 Praktiskt exempel:</h4>
                <p>Du vill ha produkter att sälja (i lager) som ger bra marginal (pris > 50). Båda villkoren måste uppfyllas!</p>
            </div>
        `
    },
    "1-6": {
        title: "Kombinera villkor med OR",
        solution: "SELECT * FROM kunder WHERE stad = 'Stockholm' OR stad = 'Göteborg';",
        explanation: `
            <div class="solution-breakdown">
                <h4>🔍 OR betyder MINST ETT måste vara sant:</h4>
                <div class="code-breakdown">
                    <code>stad = 'Stockholm'</code> - Första alternativet<br>
                    <code>OR</code> - Eller<br>
                    <code>stad = 'Göteborg'</code> - Andra alternativet
                </div>

                <h4>📊 Sanningstabell för OR:</h4>
                <pre>SANT OR SANT = SANT ✅
SANT OR FALSKT = SANT ✅
FALSKT OR SANT = SANT ✅
FALSKT OR FALSKT = FALSKT ❌</pre>

                <h4>🎯 Smartare alternativ med IN:</h4>
                <pre>SELECT * FROM kunder
WHERE stad IN ('Stockholm', 'Göteborg');

-- Samma resultat, renare syntax!</pre>
            </div>
        `
    },
    "1-7": {
        title: "Unika värden med DISTINCT",
        solution: "SELECT DISTINCT stad FROM kunder;",
        explanation: `
            <div class="solution-breakdown">
                <h4>🔍 DISTINCT tar bort dubbletter:</h4>
                <div class="code-breakdown">
                    <code>SELECT DISTINCT</code> - Hämta endast unika värden<br>
                    <code>stad</code> - Från denna kolumn<br>
                </div>

                <h4>📊 Exempel:</h4>
                <pre>Utan DISTINCT:     Med DISTINCT:
Stockholm          Stockholm
Göteborg           Göteborg
Stockholm          Malmö
Malmö              Uppsala
Stockholm
Uppsala</pre>

                <h4>💡 Användningsområden:</h4>
                <ul>
                    <li>Lista alla kategorier som används</li>
                    <li>Hitta unika statusvärden</li>
                    <li>Undersöka datakvalitet</li>
                </ul>
            </div>
        `
    },
    "1-8": {
        title: "Kolumnalias med AS",
        solution: "SELECT namn AS produkt, pris AS kostnad FROM produkter;",
        explanation: `
            <div class="solution-breakdown">
                <h4>🔍 AS ger kolumnen ett nytt namn:</h4>
                <div class="code-breakdown">
                    <code>namn AS produkt</code> - Döp om 'namn' till 'produkt'<br>
                    <code>pris AS kostnad</code> - Döp om 'pris' till 'kostnad'
                </div>

                <h4>💡 När använda alias:</h4>
                <ul>
                    <li>Mer beskrivande namn i rapporter</li>
                    <li>När du gör beräkningar (pris * 1.25 AS pris_med_moms)</li>
                    <li>Vid JOINs för att skilja på kolumner</li>
                </ul>

                <h4>🎯 Bonus - AS är valfritt:</h4>
                <pre>-- Dessa är ekvivalenta:
SELECT namn AS produkt FROM produkter;
SELECT namn produkt FROM produkter;</pre>
            </div>
        `
    },
    "1-9": {
        title: "Jämförelseoperatorer",
        solution: "SELECT * FROM anstalda WHERE lon >= 35000;",
        explanation: `
            <div class="solution-breakdown">
                <h4>🔍 >= betyder "större än eller lika med":</h4>
                <div class="code-breakdown">
                    <code>lon >= 35000</code> - Lön på 35000 eller högre
                </div>

                <h4>📊 Alla jämförelseoperatorer:</h4>
                <pre>=   Lika med
!=  Inte lika med (eller <>)
>   Större än
<   Mindre än
>=  Större än eller lika med
<=  Mindre än eller lika med</pre>

                <h4>💡 Skillnaden:</h4>
                <pre>lon > 35000  → 35001, 36000, 40000... (inte 35000)
lon >= 35000 → 35000, 35001, 36000... (inkluderar 35000)</pre>
            </div>
        `
    },
    "1-10": {
        title: "Inte lika med",
        solution: "SELECT * FROM kunder WHERE stad != 'Stockholm';",
        explanation: `
            <div class="solution-breakdown">
                <h4>🔍 != betyder "inte lika med":</h4>
                <div class="code-breakdown">
                    <code>stad != 'Stockholm'</code> - Alla städer UTOM Stockholm
                </div>

                <h4>🎯 Två sätt att skriva samma sak:</h4>
                <pre>WHERE stad != 'Stockholm'  -- Vanligast
WHERE stad <> 'Stockholm'  -- SQL-standard

-- Båda fungerar identiskt!</pre>

                <h4>⚠️ OBS om NULL:</h4>
                <pre>-- Detta hittar INTE NULL-värden:
WHERE stad != 'Stockholm'

-- För att inkludera NULL:
WHERE stad != 'Stockholm' OR stad IS NULL</pre>
            </div>
        `
    },

    // ===== DAG 2 =====
    "2-1": {
        title: "Sortera efter pris",
        solution: "SELECT * FROM produkter ORDER BY pris;",
        explanation: `
            <div class="solution-breakdown">
                <h4>🔍 ORDER BY sorterar resultatet:</h4>
                <div class="code-breakdown">
                    <code>ORDER BY pris</code> - Sortera efter pris<br>
                    <code>(ASC)</code> - Stigande ordning är standard
                </div>

                <h4>📊 Sorteringsordning:</h4>
                <pre>ASC (standard):  1, 2, 3, 4, 5 (lägst till högst)
DESC:            5, 4, 3, 2, 1 (högst till lägst)</pre>

                <h4>💡 Tips:</h4>
                <ul>
                    <li>ORDER BY kommer ALLTID sist i frågan (före LIMIT)</li>
                    <li>Text sorteras alfabetiskt (A-Ö)</li>
                    <li>NULL-värden kommer först vid ASC, sist vid DESC</li>
                </ul>
            </div>
        `
    },
    "2-2": {
        title: "Sortera fallande",
        solution: "SELECT * FROM produkter ORDER BY pris DESC;",
        explanation: `
            <div class="solution-breakdown">
                <h4>🔍 DESC = Descending (fallande):</h4>
                <div class="code-breakdown">
                    <code>ORDER BY pris DESC</code> - Högst pris först
                </div>

                <h4>🎯 Praktiska användningsfall:</h4>
                <pre>-- Senaste ordrar först:
ORDER BY datum DESC

-- Dyraste produkter först:
ORDER BY pris DESC

-- Bästa betyg först:
ORDER BY betyg DESC</pre>
            </div>
        `
    },
    "2-3": {
        title: "Begränsa resultat",
        solution: "SELECT * FROM kunder LIMIT 5;",
        explanation: `
            <div class="solution-breakdown">
                <h4>🔍 LIMIT begränsar antal rader:</h4>
                <div class="code-breakdown">
                    <code>LIMIT 5</code> - Returnera max 5 rader
                </div>

                <h4>💡 Varför använda LIMIT:</h4>
                <ul>
                    <li>Testa frågor utan att hämta miljontals rader</li>
                    <li>Pagination i webbapplikationer</li>
                    <li>Top N-frågor (topp 10, topp 100)</li>
                </ul>

                <h4>⚠️ Databasvarianter:</h4>
                <pre>SQLite/MySQL: LIMIT 5
SQL Server: TOP 5
Oracle: FETCH FIRST 5 ROWS ONLY</pre>
            </div>
        `
    },
    "2-4": {
        title: "Topp 3 dyraste",
        solution: "SELECT * FROM produkter ORDER BY pris DESC LIMIT 3;",
        explanation: `
            <div class="solution-breakdown">
                <h4>🔍 Top N-mönstret:</h4>
                <div class="code-breakdown">
                    <code>ORDER BY pris DESC</code> - Sortera dyrast först<br>
                    <code>LIMIT 3</code> - Ta endast de 3 första
                </div>

                <h4>🎯 Andra Top N-exempel:</h4>
                <pre>-- Topp 5 säljare:
SELECT * FROM anstalda
ORDER BY forsaljning DESC LIMIT 5;

-- 3 senaste ordrar:
SELECT * FROM ordrar
ORDER BY datum DESC LIMIT 3;</pre>
            </div>
        `
    },
    "2-5": {
        title: "Sök med LIKE (börjar med)",
        solution: "SELECT * FROM kunder WHERE namn LIKE 'A%';",
        explanation: `
            <div class="solution-breakdown">
                <h4>🔍 LIKE med wildcard %:</h4>
                <div class="code-breakdown">
                    <code>LIKE 'A%'</code> - Börjar på 'A', följt av vad som helst
                </div>

                <h4>📊 Wildcard-tecken:</h4>
                <pre>%  = Matchar 0 eller fler tecken
_  = Matchar exakt 1 tecken

'A%'    → Anna, Anders, Alex
'%son'  → Andersson, Svensson
'%an%'  → Anna, Anders, Hansen
'_nna'  → Anna, Inna (4 bokstäver, slutar på nna)</pre>

                <h4>💡 Case sensitivity:</h4>
                <p>I SQLite är LIKE case-insensitive för ASCII. 'a%' matchar 'Anna'.</p>
            </div>
        `
    },
    "2-8": {
        title: "Flera värden med IN",
        solution: "SELECT * FROM kunder WHERE stad IN ('Stockholm', 'Göteborg', 'Malmö');",
        explanation: `
            <div class="solution-breakdown">
                <h4>🔍 IN - elegant för flera värden:</h4>
                <div class="code-breakdown">
                    <code>WHERE stad IN (...)</code> - Matchar vilket som av värdena
                </div>

                <h4>📊 IN vs OR:</h4>
                <pre>-- Med OR (långt):
WHERE stad = 'Stockholm'
   OR stad = 'Göteborg'
   OR stad = 'Malmö'

-- Med IN (snyggt):
WHERE stad IN ('Stockholm', 'Göteborg', 'Malmö')</pre>

                <h4>🎯 NOT IN:</h4>
                <pre>-- Alla UTOM dessa städer:
WHERE stad NOT IN ('Stockholm', 'Göteborg')</pre>
            </div>
        `
    },
    "2-9": {
        title: "Intervall med BETWEEN",
        solution: "SELECT * FROM produkter WHERE pris BETWEEN 100 AND 500;",
        explanation: `
            <div class="solution-breakdown">
                <h4>🔍 BETWEEN för intervall:</h4>
                <div class="code-breakdown">
                    <code>BETWEEN 100 AND 500</code> - Från 100 till 500, INKLUSIVE!
                </div>

                <h4>⚠️ Viktigt: BETWEEN är INKLUSIVT!</h4>
                <pre>BETWEEN 100 AND 500
= pris >= 100 AND pris <= 500
= Inkluderar 100 och 500</pre>

                <h4>🎯 Fungerar även med datum:</h4>
                <pre>WHERE datum BETWEEN '2024-01-01' AND '2024-12-31'</pre>
            </div>
        `
    },

    // ===== DAG 3 =====
    "3-1": {
        title: "Räkna alla produkter",
        solution: "SELECT COUNT(*) FROM produkter;",
        explanation: `
            <div class="solution-breakdown">
                <h4>🔍 COUNT(*) räknar ALLA rader:</h4>
                <div class="code-breakdown">
                    <code>COUNT(*)</code> - Antal rader i tabellen<br>
                    <code>*</code> - Räknar alla rader, inklusive NULL
                </div>

                <h4>📊 COUNT varianter:</h4>
                <pre>COUNT(*)        - Alla rader (även med NULL)
COUNT(kolumn)   - Rader där kolumnen INTE är NULL
COUNT(DISTINCT) - Antal UNIKA värden</pre>

                <h4>💡 Praktiskt exempel:</h4>
                <pre>SELECT
    COUNT(*) as totalt,
    COUNT(email) as har_email,
    COUNT(DISTINCT stad) as antal_stader
FROM kunder;</pre>
            </div>
        `
    },
    "3-4": {
        title: "Genomsnittspris",
        solution: "SELECT AVG(pris) FROM produkter;",
        explanation: `
            <div class="solution-breakdown">
                <h4>🔍 AVG beräknar medelvärde:</h4>
                <div class="code-breakdown">
                    <code>AVG(pris)</code> - Genomsnitt av alla priser
                </div>

                <h4>⚠️ AVG ignorerar NULL:</h4>
                <pre>Värden: 100, 200, NULL, 300
AVG = (100 + 200 + 300) / 3 = 200
(NULL räknas inte med)</pre>

                <h4>🎯 Avrunda resultatet:</h4>
                <pre>SELECT ROUND(AVG(pris), 2) AS snittpris
FROM produkter;
-- Ger: 149.99 istället för 149.9876543</pre>
            </div>
        `
    },
    "3-6": {
        title: "Kunder per stad",
        solution: "SELECT stad, COUNT(*) FROM kunder GROUP BY stad;",
        explanation: `
            <div class="solution-breakdown">
                <h4>🔍 GROUP BY samlar ihop rader:</h4>
                <div class="code-breakdown">
                    <code>GROUP BY stad</code> - Skapa en grupp per stad<br>
                    <code>COUNT(*)</code> - Räkna antal i varje grupp
                </div>

                <h4>📊 Hur GROUP BY fungerar:</h4>
                <pre>Innan GROUP BY:    Efter GROUP BY:
Stockholm          Stockholm: 3
Göteborg           Göteborg: 2
Stockholm          Malmö: 1
Malmö
Stockholm
Göteborg</pre>

                <h4>⚠️ Regel:</h4>
                <p>Kolumner i SELECT måste antingen vara i GROUP BY eller i en aggregatfunktion!</p>
            </div>
        `
    },
    "3-9": {
        title: "Filtrera grupper",
        solution: "SELECT stad, COUNT(*) AS antal FROM kunder GROUP BY stad HAVING COUNT(*) > 1;",
        explanation: `
            <div class="solution-breakdown">
                <h4>🔍 HAVING filtrerar EFTER gruppering:</h4>
                <div class="code-breakdown">
                    <code>GROUP BY stad</code> - Gruppera först<br>
                    <code>HAVING COUNT(*) > 1</code> - Behåll grupper med >1
                </div>

                <h4>📊 WHERE vs HAVING:</h4>
                <pre>WHERE  - Filtrerar FÖRE gruppering (enskilda rader)
HAVING - Filtrerar EFTER gruppering (grupper)

-- Filtera rader:
WHERE pris > 100

-- Filtrera grupper:
HAVING COUNT(*) > 5</pre>

                <h4>🎯 Komplett ordning:</h4>
                <pre>SELECT ... FROM ...
WHERE ...      (filtrera rader)
GROUP BY ...   (gruppera)
HAVING ...     (filtrera grupper)
ORDER BY ...   (sortera)
LIMIT ...      (begränsa)</pre>
            </div>
        `
    },

    // ===== DAG 4 =====
    "4-1": {
        title: "Första INNER JOIN",
        solution: "SELECT o.datum, k.namn FROM ordrar o INNER JOIN kunder k ON o.kund_id = k.id;",
        explanation: `
            <div class="solution-breakdown">
                <h4>🔍 INNER JOIN kombinerar tabeller:</h4>
                <div class="code-breakdown">
                    <code>FROM ordrar o</code> - Första tabellen med alias 'o'<br>
                    <code>INNER JOIN kunder k</code> - Andra tabellen med alias 'k'<br>
                    <code>ON o.kund_id = k.id</code> - Kopplingen mellan dem
                </div>

                <h4>📊 Visualisering:</h4>
                <pre>ordrar:              kunder:
id | kund_id | datum   id | namn
1  | 1       | 2024    1  | Anna
2  | 2       | 2024    2  | Erik

Resultat INNER JOIN:
datum | namn
2024  | Anna
2024  | Erik</pre>

                <h4>💡 Tabellalias:</h4>
                <p>o och k är korta alias som gör frågan mer läsbar. Du slipper skriva "ordrar.datum" varje gång.</p>
            </div>
        `
    },
    "4-3": {
        title: "LEFT JOIN",
        solution: "SELECT k.namn, o.datum, o.totalt FROM kunder k LEFT JOIN ordrar o ON k.id = o.kund_id;",
        explanation: `
            <div class="solution-breakdown">
                <h4>🔍 LEFT JOIN behåller ALLA från vänster:</h4>
                <div class="code-breakdown">
                    <code>FROM kunder k</code> - Vänster tabell (alla behålls)<br>
                    <code>LEFT JOIN ordrar o</code> - Höger tabell<br>
                    <code>ON k.id = o.kund_id</code> - Kopplingen
                </div>

                <h4>📊 INNER vs LEFT JOIN:</h4>
                <pre>INNER JOIN:              LEFT JOIN:
Endast matchningar       ALLA kunder,
                         även utan ordrar

Anna | 2024              Anna | 2024
Erik | 2024              Erik | 2024
                         Lisa | NULL ← ingen order</pre>

                <h4>🎯 Hitta kunder UTAN ordrar:</h4>
                <pre>SELECT k.* FROM kunder k
LEFT JOIN ordrar o ON k.id = o.kund_id
WHERE o.id IS NULL;</pre>
            </div>
        `
    },
    "4-6": {
        title: "Tre tabeller",
        solution: "SELECT or2.antal, p.namn, o.datum FROM orderrader or2 INNER JOIN ordrar o ON or2.order_id = o.id INNER JOIN produkter p ON or2.produkt_id = p.id;",
        explanation: `
            <div class="solution-breakdown">
                <h4>🔍 Kedjade JOINs:</h4>
                <div class="code-breakdown">
                    <code>FROM orderrader or2</code> - Starttabell<br>
                    <code>JOIN ordrar o ON ...</code> - Första JOIN<br>
                    <code>JOIN produkter p ON ...</code> - Andra JOIN
                </div>

                <h4>📊 Relationskedja:</h4>
                <pre>orderrader ←→ ordrar ←→ kunder
     ↓
 produkter

orderrader.order_id → ordrar.id
orderrader.produkt_id → produkter.id</pre>

                <h4>💡 Tips:</h4>
                <p>Rita alltid ett diagram över tabellrelationerna när du skriver komplexa JOINs!</p>
            </div>
        `
    },

    // ===== DAG 5 =====
    "5-1": {
        title: "Skapa en tabell",
        solution: "CREATE TABLE recensioner (id INTEGER PRIMARY KEY, produkt_id INTEGER, betyg INTEGER, kommentar TEXT);",
        explanation: `
            <div class="solution-breakdown">
                <h4>🔍 CREATE TABLE syntax:</h4>
                <div class="code-breakdown">
                    <code>CREATE TABLE recensioner</code> - Skapa ny tabell<br>
                    <code>id INTEGER PRIMARY KEY</code> - Unik identifierare<br>
                    <code>produkt_id INTEGER</code> - Främmande nyckel<br>
                    <code>betyg INTEGER</code> - Numeriskt värde<br>
                    <code>kommentar TEXT</code> - Fritext
                </div>

                <h4>📊 Vanliga datatyper i SQLite:</h4>
                <pre>INTEGER - Heltal (1, 42, -17)
REAL    - Decimaltal (3.14, 99.99)
TEXT    - Text/strängar
BLOB    - Binärdata (bilder etc)
NULL    - Inget värde</pre>

                <h4>🎯 Med constraints:</h4>
                <pre>CREATE TABLE recensioner (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    produkt_id INTEGER NOT NULL,
    betyg INTEGER CHECK(betyg >= 1 AND betyg <= 5),
    kommentar TEXT,
    FOREIGN KEY (produkt_id) REFERENCES produkter(id)
);</pre>
            </div>
        `
    },
    "5-2": {
        title: "Lägg till data",
        solution: "INSERT INTO recensioner (produkt_id, betyg, kommentar) VALUES (1, 5, 'Fantastisk produkt!');",
        explanation: `
            <div class="solution-breakdown">
                <h4>🔍 INSERT INTO syntax:</h4>
                <div class="code-breakdown">
                    <code>INSERT INTO recensioner</code> - Vilken tabell<br>
                    <code>(produkt_id, betyg, kommentar)</code> - Vilka kolumner<br>
                    <code>VALUES (1, 5, '...')</code> - Värdena att infoga
                </div>

                <h4>💡 Varför ange kolumner?</h4>
                <ul>
                    <li>Tydligare vad som sätts</li>
                    <li>Fungerar även om nya kolumner läggs till</li>
                    <li>Kan hoppa över kolumner med DEFAULT/NULL</li>
                </ul>

                <h4>⚠️ Utan kolumnlista:</h4>
                <pre>INSERT INTO tabell VALUES (1, 2, 'text');
-- Kräver ALLA kolumner i rätt ordning!</pre>
            </div>
        `
    },
    "5-4": {
        title: "Uppdatera data",
        solution: "UPDATE recensioner SET betyg = 4 WHERE id = 1;",
        explanation: `
            <div class="solution-breakdown">
                <h4>🔍 UPDATE syntax:</h4>
                <div class="code-breakdown">
                    <code>UPDATE recensioner</code> - Vilken tabell<br>
                    <code>SET betyg = 4</code> - Vad som ska ändras<br>
                    <code>WHERE id = 1</code> - VILKEN rad (VIKTIGT!)
                </div>

                <h4>⚠️ KRITISKT: Glöm aldrig WHERE!</h4>
                <pre>-- FARLIGT! Uppdaterar ALLA rader:
UPDATE kunder SET stad = 'Stockholm';

-- SÄKERT! Uppdaterar EN rad:
UPDATE kunder SET stad = 'Stockholm' WHERE id = 1;</pre>

                <h4>🎯 Uppdatera flera kolumner:</h4>
                <pre>UPDATE recensioner
SET betyg = 4,
    kommentar = 'Uppdaterad recension'
WHERE id = 1;</pre>
            </div>
        `
    },
    "5-6": {
        title: "Ta bort data",
        solution: "DELETE FROM recensioner WHERE id = 1;",
        explanation: `
            <div class="solution-breakdown">
                <h4>🔍 DELETE syntax:</h4>
                <div class="code-breakdown">
                    <code>DELETE FROM recensioner</code> - Vilken tabell<br>
                    <code>WHERE id = 1</code> - VILKEN rad (VIKTIGT!)
                </div>

                <h4>⚠️ KRITISKT: Glöm aldrig WHERE!</h4>
                <pre>-- FARLIGT! Raderar ALLT i tabellen:
DELETE FROM kunder;

-- SÄKERT! Raderar EN rad:
DELETE FROM kunder WHERE id = 1;</pre>

                <h4>🎯 Best Practice:</h4>
                <pre>-- Steg 1: Verifiera vad som tas bort
SELECT * FROM kunder WHERE id = 1;

-- Steg 2: Ta bort (om rätt)
DELETE FROM kunder WHERE id = 1;</pre>
            </div>
        `
    },

    // ===== DAG 6 =====
    "6-1": {
        title: "Identifiera redundans",
        solution: "CREATE VIEW stad_statistik AS SELECT stad, COUNT(*) AS antal FROM kunder GROUP BY stad;",
        explanation: `
            <div class="solution-breakdown">
                <h4>🔍 VIEW - en sparad fråga:</h4>
                <div class="code-breakdown">
                    <code>CREATE VIEW stad_statistik AS</code> - Skapa vy<br>
                    <code>SELECT stad, COUNT(*)...</code> - Frågan som sparas
                </div>

                <h4>💡 Varför använda VIEWs:</h4>
                <ul>
                    <li>Förenkla komplexa frågor</li>
                    <li>Säkerhet - begränsa åtkomst till vissa kolumner</li>
                    <li>Konsistens - alla använder samma definition</li>
                </ul>

                <h4>🎯 Använda vyn:</h4>
                <pre>-- Nu kan du köra:
SELECT * FROM stad_statistik;
SELECT * FROM stad_statistik WHERE antal > 2;</pre>
            </div>
        `
    },
    "6-4": {
        title: "Kopplingstabell",
        solution: "CREATE TABLE produkt_taggar (produkt_id INTEGER, tagg_id INTEGER, PRIMARY KEY (produkt_id, tagg_id));",
        explanation: `
            <div class="solution-breakdown">
                <h4>🔍 Many-to-Many relation:</h4>
                <div class="code-breakdown">
                    <code>produkt_id INTEGER</code> - FK till produkter<br>
                    <code>tagg_id INTEGER</code> - FK till taggar<br>
                    <code>PRIMARY KEY (produkt_id, tagg_id)</code> - Sammansatt nyckel
                </div>

                <h4>📊 Varför kopplingstabell?</h4>
                <pre>produkter:     taggar:
1 - Laptop     1 - Elektronik
2 - Mus        2 - Kontor

produkt_taggar:
produkt_id | tagg_id
1          | 1        ← Laptop är Elektronik
1          | 2        ← Laptop är Kontor
2          | 1        ← Mus är Elektronik
2          | 2        ← Mus är Kontor</pre>

                <h4>💡 Sammansatt PK förhindrar dubbletter:</h4>
                <p>Du kan inte koppla samma produkt till samma tagg två gånger!</p>
            </div>
        `
    },

    // ===== DAG 7 =====
    "7-1": {
        title: "Subquery i WHERE",
        solution: "SELECT * FROM produkter WHERE pris > (SELECT AVG(pris) FROM produkter);",
        explanation: `
            <div class="solution-breakdown">
                <h4>🔍 Subquery (underfråga):</h4>
                <div class="code-breakdown">
                    <code>(SELECT AVG(pris) FROM produkter)</code> - Inre fråga<br>
                    <code>WHERE pris > ...</code> - Yttre fråga använder resultatet
                </div>

                <h4>📊 Hur det fungerar:</h4>
                <pre>Steg 1: Beräkna AVG(pris) = 150
Steg 2: Kör: SELECT * WHERE pris > 150</pre>

                <h4>🎯 Typer av subqueries:</h4>
                <pre>-- Skalär (ett värde):
WHERE pris > (SELECT AVG(pris)...)

-- Lista (flera värden):
WHERE id IN (SELECT produkt_id FROM...)

-- Tabell (flera rader/kolumner):
FROM (SELECT ... GROUP BY ...) AS sub</pre>
            </div>
        `
    },
    "7-4": {
        title: "CASE WHEN",
        solution: "SELECT namn, pris, CASE WHEN pris < 100 THEN 'Billig' WHEN pris <= 500 THEN 'Medium' ELSE 'Dyr' END AS prisklass FROM produkter;",
        explanation: `
            <div class="solution-breakdown">
                <h4>🔍 CASE = IF-ELSE i SQL:</h4>
                <div class="code-breakdown">
                    <code>CASE</code> - Starta villkorlig logik<br>
                    <code>WHEN pris < 100 THEN 'Billig'</code> - Första villkoret<br>
                    <code>WHEN pris <= 500 THEN 'Medium'</code> - Andra villkoret<br>
                    <code>ELSE 'Dyr'</code> - Om inget annat matchar<br>
                    <code>END AS prisklass</code> - Avsluta och namnge
                </div>

                <h4>📊 Resultat:</h4>
                <pre>namn        | pris | prisklass
Mus         | 50   | Billig
Tangentbord | 200  | Medium
Laptop      | 8000 | Dyr</pre>

                <h4>💡 Vanliga användningsfall:</h4>
                <ul>
                    <li>Kategorisera data</li>
                    <li>Beräkna villkorliga rabatter</li>
                    <li>Formatera output</li>
                </ul>
            </div>
        `
    },
    "7-5": {
        title: "Skapa index",
        solution: "CREATE INDEX idx_stad ON kunder(stad);",
        explanation: `
            <div class="solution-breakdown">
                <h4>🔍 Index = snabbare sökningar:</h4>
                <div class="code-breakdown">
                    <code>CREATE INDEX idx_stad</code> - Skapa index med namn<br>
                    <code>ON kunder(stad)</code> - På kolumn i tabell
                </div>

                <h4>📊 Hur index hjälper:</h4>
                <pre>Utan index: Skanna ALLA rader (långsamt)
Med index:  Hoppa direkt till matchande rader

Tänk det som ett index i en bok - du slipper
läsa varje sida för att hitta ett ord!</pre>

                <h4>🎯 DevOps-tips:</h4>
                <pre>-- Skapa index på kolumner som du ofta:
-- - Söker på (WHERE)
-- - Sorterar på (ORDER BY)
-- - Joinar på (JOIN ON)

-- Men: Index tar plats och gör INSERT/UPDATE långsammare</pre>
            </div>
        `
    },
    "7-6": {
        title: "Transaktion",
        solution: "BEGIN TRANSACTION; UPDATE produkter SET pris = pris + 10 WHERE id = 1; COMMIT;",
        explanation: `
            <div class="solution-breakdown">
                <h4>🔍 Transaktioner = allt eller inget:</h4>
                <div class="code-breakdown">
                    <code>BEGIN TRANSACTION;</code> - Starta transaktion<br>
                    <code>UPDATE...</code> - Dina ändringar<br>
                    <code>COMMIT;</code> - Spara permanent
                </div>

                <h4>📊 ACID-egenskaper:</h4>
                <pre>Atomicity   - Allt eller inget genomförs
Consistency - Databasen förblir konsistent
Isolation   - Transaktioner påverkar inte varandra
Durability  - Committade ändringar överlever krasch</pre>

                <h4>🎯 ROLLBACK vid fel:</h4>
                <pre>BEGIN TRANSACTION;
UPDATE konton SET saldo = saldo - 1000 WHERE id = 1;
UPDATE konton SET saldo = saldo + 1000 WHERE id = 2;
-- Om något går fel:
ROLLBACK;  -- Ångra allt!
-- Om allt gick bra:
COMMIT;    -- Spara!</pre>
            </div>
        `
    },
    "7-10": {
        title: "Slutprojekt",
        solution: "SELECT k.namn, SUM(o.totalt) AS total FROM kunder k JOIN ordrar o ON k.id = o.kund_id WHERE k.stad IN ('Stockholm', 'Göteborg') GROUP BY k.id ORDER BY total DESC LIMIT 3;",
        explanation: `
            <div class="solution-breakdown">
                <h4>🔍 Allt kombinerat - SQL Master Level!</h4>
                <div class="code-breakdown">
                    <code>JOIN</code> - Kombinera tabeller<br>
                    <code>WHERE ... IN</code> - Filtrera städer<br>
                    <code>GROUP BY</code> - Gruppera per kund<br>
                    <code>SUM()</code> - Beräkna total<br>
                    <code>ORDER BY DESC</code> - Sortera fallande<br>
                    <code>LIMIT 3</code> - Endast topp 3
                </div>

                <h4>📊 Exekveringsordning:</h4>
                <pre>1. FROM kunder k JOIN ordrar o...
2. WHERE stad IN (...)
3. GROUP BY k.id
4. SELECT k.namn, SUM(...)
5. ORDER BY total DESC
6. LIMIT 3</pre>

                <h4>🎉 Grattis!</h4>
                <p>Du har nu kunskapen att skriva komplexa SQL-frågor som kombinerar flera tekniker. Du är redo för verkliga databasprojekt!</p>
            </div>
        `
    }
};

// Hämta lösning för övning
function getSolution(exerciseId) {
    return SOLUTIONS_COMPLETE[exerciseId] || null;
}

// Hämta förklaring
function getExplanation(exerciseId) {
    const solution = SOLUTIONS_COMPLETE[exerciseId];
    return solution ? solution.explanation : null;
}

// Exportera
window.SOLUTIONS_COMPLETE = SOLUTIONS_COMPLETE;
window.getSolution = getSolution;
window.getExplanation = getExplanation;
