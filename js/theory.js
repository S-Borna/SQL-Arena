// ===== SQL Quest - Komplett Teori =====
// Den mest omfattande SQL-guiden på svenska

const THEORY = {
    // ===== DAG 1: GRUNDER & SELECT =====
    1: `
        <div class="theory-day">
            <h2>📚 Dag 1: Introduktion till Databaser & SELECT</h2>

            <div class="theory-section">
                <h3>🎯 Dagens mål</h3>
                <ul>
                    <li>Förstå vad en databas är och varför vi behöver dem</li>
                    <li>Känna till skillnaden mellan SQL och NoSQL</li>
                    <li>Skriva dina första SELECT-frågor</li>
                    <li>Filtrera data med WHERE</li>
                </ul>
            </div>

            <div class="theory-section">
                <h3>📖 Vad är en databas?</h3>
                <p>En <strong>databas</strong> är ett organiserat system för att lagra, hantera och hämta data.
                Tänk på det som ett digitalt arkivskåp där information sparas strukturerat.</p>

                <div class="analogy-box">
                    <h4>🏛️ Analogi: Biblioteket</h4>
                    <table class="analogy-table">
                        <tr><td>Bibliotek</td><td>=</td><td>Databas</td></tr>
                        <tr><td>Bokhyllor</td><td>=</td><td>Tabeller</td></tr>
                        <tr><td>Böcker</td><td>=</td><td>Rader (records)</td></tr>
                        <tr><td>Bokens egenskaper</td><td>=</td><td>Kolumner</td></tr>
                        <tr><td>Bibliotekarie</td><td>=</td><td>Databashanterare (DBMS)</td></tr>
                    </table>
                </div>
            </div>

            <div class="theory-section">
                <h3>❓ Varför behöver vi databaser?</h3>
                <table class="comparison-table">
                    <thead>
                        <tr><th>Problem utan databas</th><th>Lösning med databas</th></tr>
                    </thead>
                    <tbody>
                        <tr><td>Data i textfiler blir rörigt</td><td>Strukturerad lagring i tabeller</td></tr>
                        <tr><td>Svårt att söka i stora datamängder</td><td>Snabb sökning med index</td></tr>
                        <tr><td>Risk för dubbletter</td><td>Unika nycklar förhindrar dubletter</td></tr>
                        <tr><td>Ingen säkerhet</td><td>Behörighetskontroll</td></tr>
                        <tr><td>Data kan gå förlorad</td><td>Backup och återställning</td></tr>
                    </tbody>
                </table>
            </div>

            <div class="theory-section">
                <h3>🔄 SQL vs NoSQL</h3>

                <h4>SQL-databaser (Relationsdatabaser)</h4>
                <p><strong>SQL</strong> = Structured Query Language</p>
                <p>Organiserar data i <strong>tabeller med rader och kolumner</strong>, precis som Excel.</p>

                <div class="info-box">
                    <h5>Populära SQL-databaser:</h5>
                    <ul>
                        <li><strong>MySQL / MariaDB</strong> - Mest använda, gratis</li>
                        <li><strong>PostgreSQL</strong> - Kraftfull, avancerad</li>
                        <li><strong>SQLite</strong> - Enkel fil-databas (vi använder denna!)</li>
                        <li><strong>Microsoft SQL Server</strong> - Företagsmiljöer</li>
                        <li><strong>Oracle</strong> - Stora företag</li>
                    </ul>
                </div>

                <h4>NoSQL-databaser</h4>
                <p><strong>NoSQL</strong> = "Not Only SQL" - lagrar data på andra sätt än tabeller.</p>

                <table class="comparison-table">
                    <thead>
                        <tr><th>Typ</th><th>Beskrivning</th><th>Exempel</th></tr>
                    </thead>
                    <tbody>
                        <tr><td>Dokument</td><td>JSON/BSON-dokument</td><td>MongoDB, CouchDB</td></tr>
                        <tr><td>Nyckel-värde</td><td>Key:value lagring</td><td>Redis, Memcached</td></tr>
                        <tr><td>Kolumn</td><td>Kolumnfamiljer</td><td>Cassandra, HBase</td></tr>
                        <tr><td>Graf</td><td>Noder och relationer</td><td>Neo4j</td></tr>
                    </tbody>
                </table>
            </div>

            <div class="theory-section">
                <h3>⚡ ACID vs BASE</h3>

                <div class="concept-box acid">
                    <h4>ACID (SQL-databaser)</h4>
                    <p>Garanterar tillförlitliga transaktioner:</p>
                    <ul>
                        <li><strong>A</strong>tomicity - Allt eller inget</li>
                        <li><strong>C</strong>onsistency - Data alltid giltigt</li>
                        <li><strong>I</strong>solation - Transaktioner påverkar inte varandra</li>
                        <li><strong>D</strong>urability - Sparad data försvinner inte</li>
                    </ul>
                </div>

                <div class="concept-box base">
                    <h4>BASE (NoSQL-databaser)</h4>
                    <ul>
                        <li><strong>B</strong>asically <strong>A</strong>vailable - Alltid tillgänglig</li>
                        <li><strong>S</strong>oft state - Data kan vara tillfälligt inkonsistent</li>
                        <li><strong>E</strong>ventually consistent - Blir konsistent så småningom</li>
                    </ul>
                </div>
            </div>

            <div class="theory-section">
                <h3>🔍 SELECT - Hämta data</h3>
                <p>SELECT är den mest grundläggande SQL-kommandot. Det låter dig hämta data från tabeller.</p>

                <div class="syntax-box">
                    <h4>Grundläggande syntax:</h4>
                    <pre><code>SELECT kolumn1, kolumn2 FROM tabell;</code></pre>
                </div>

                <div class="example-box">
                    <h4>Exempel:</h4>
                    <pre><code>-- Hämta alla kolumner
SELECT * FROM kunder;

-- Hämta specifika kolumner
SELECT namn, email FROM kunder;

-- Hämta med alias
SELECT namn AS kundnamn FROM kunder;</code></pre>
                </div>

                <div class="tip-box">
                    <strong>💡 Tips:</strong> Använd <code>*</code> för att hämta alla kolumner,
                    men i produktion är det bättre att specificera exakt vilka kolumner du behöver.
                </div>
            </div>

            <div class="theory-section">
                <h3>🎯 WHERE - Filtrera resultat</h3>
                <p>WHERE låter dig filtrera vilka rader som returneras.</p>

                <div class="syntax-box">
                    <pre><code>SELECT * FROM tabell WHERE villkor;</code></pre>
                </div>

                <h4>Jämförelseoperatorer:</h4>
                <table class="operators-table">
                    <tr><td><code>=</code></td><td>Lika med</td></tr>
                    <tr><td><code>&lt;&gt;</code> eller <code>!=</code></td><td>Inte lika med</td></tr>
                    <tr><td><code>&lt;</code></td><td>Mindre än</td></tr>
                    <tr><td><code>&gt;</code></td><td>Större än</td></tr>
                    <tr><td><code>&lt;=</code></td><td>Mindre än eller lika med</td></tr>
                    <tr><td><code>&gt;=</code></td><td>Större än eller lika med</td></tr>
                </table>

                <div class="example-box">
                    <h4>Exempel:</h4>
                    <pre><code>-- Kunder från Stockholm
SELECT * FROM kunder WHERE stad = 'Stockholm';

-- Produkter som kostar mer än 100kr
SELECT * FROM produkter WHERE pris > 100;

-- Kombinera villkor med AND/OR
SELECT * FROM produkter
WHERE pris > 50 AND kategori_id = 1;</code></pre>
                </div>
            </div>

            <div class="theory-section">
                <h3>🔢 DISTINCT - Unika värden</h3>
                <p>DISTINCT tar bort dubbletter från resultatet.</p>

                <div class="example-box">
                    <pre><code>-- Lista alla unika städer
SELECT DISTINCT stad FROM kunder;

-- Antal unika städer
SELECT COUNT(DISTINCT stad) FROM kunder;</code></pre>
                </div>
            </div>

            <div class="theory-section">
                <h3>📊 Tabellstruktur i SQL Quest</h3>
                <p>I denna kurs arbetar vi med en svensk e-handelsdatabas:</p>

                <div class="schema-overview">
                    <div class="table-card">
                        <h5>👥 kunder</h5>
                        <p>id, namn, email, stad, registrerad</p>
                    </div>
                    <div class="table-card">
                        <h5>📦 produkter</h5>
                        <p>id, namn, pris, kategori_id, lager</p>
                    </div>
                    <div class="table-card">
                        <h5>🛒 ordrar</h5>
                        <p>id, kund_id, datum, totalt</p>
                    </div>
                    <div class="table-card">
                        <h5>📋 orderrader</h5>
                        <p>id, order_id, produkt_id, antal, pris</p>
                    </div>
                    <div class="table-card">
                        <h5>👔 anstalda</h5>
                        <p>id, namn, avdelning, lon, chef_id</p>
                    </div>
                </div>
            </div>

            <div class="practice-callout">
                <h3>🏋️ Dags att öva!</h3>
                <p>Du har nu grunderna - börja med övningarna till höger.
                Kom ihåg: det bästa sättet att lära sig SQL är att <strong>skriva SQL</strong>!</p>
            </div>
        </div>
    `,

    // ===== DAG 2: FILTRERA & SORTERA =====
    2: `
        <div class="theory-day">
            <h2>📚 Dag 2: Filtrera & Sortera Data</h2>

            <div class="theory-section">
                <h3>🎯 Dagens mål</h3>
                <ul>
                    <li>Sortera resultat med ORDER BY</li>
                    <li>Begränsa resultat med LIMIT</li>
                    <li>Söka med mönster (LIKE)</li>
                    <li>Använda IN, BETWEEN, och NULL</li>
                </ul>
            </div>

            <div class="theory-section">
                <h3>📊 ORDER BY - Sortera resultat</h3>
                <p>ORDER BY sorterar ditt resultat i stigande (ASC) eller fallande (DESC) ordning.</p>

                <div class="syntax-box">
                    <pre><code>SELECT * FROM tabell ORDER BY kolumn [ASC|DESC];</code></pre>
                </div>

                <div class="example-box">
                    <h4>Exempel:</h4>
                    <pre><code>-- Sortera efter pris (billigast först - standard ASC)
SELECT * FROM produkter ORDER BY pris;

-- Dyrast först
SELECT * FROM produkter ORDER BY pris DESC;

-- Sortera på flera kolumner
SELECT * FROM kunder ORDER BY stad, namn;</code></pre>
                </div>

                <div class="tip-box">
                    <strong>💡 Tips:</strong> ASC (ascending) är standard. Du behöver bara skriva DESC om du vill ha fallande ordning.
                </div>
            </div>

            <div class="theory-section">
                <h3>🔢 LIMIT - Begränsa antal</h3>
                <p>LIMIT begränsar hur många rader som returneras. Perfekt för "topp 10"-listor!</p>

                <div class="syntax-box">
                    <pre><code>SELECT * FROM tabell LIMIT antal;
SELECT * FROM tabell LIMIT offset, antal;</code></pre>
                </div>

                <div class="example-box">
                    <pre><code>-- Top 5 dyraste produkterna
SELECT * FROM produkter ORDER BY pris DESC LIMIT 5;

-- Hoppa över 10 första, visa nästa 5 (pagination)
SELECT * FROM produkter LIMIT 10, 5;</code></pre>
                </div>
            </div>

            <div class="theory-section">
                <h3>🔍 LIKE - Mönstermatchning</h3>
                <p>LIKE låter dig söka med mönster istället för exakta värden.</p>

                <div class="info-box">
                    <h4>Wildcards (jokertecken):</h4>
                    <table>
                        <tr><td><code>%</code></td><td>Matchar noll eller fler tecken</td></tr>
                        <tr><td><code>_</code></td><td>Matchar exakt ett tecken</td></tr>
                    </table>
                </div>

                <div class="example-box">
                    <pre><code>-- Namn som börjar på 'A'
SELECT * FROM kunder WHERE namn LIKE 'A%';

-- Namn som slutar på 'sson'
SELECT * FROM kunder WHERE namn LIKE '%sson';

-- Namn som innehåller 'berg'
SELECT * FROM kunder WHERE namn LIKE '%berg%';

-- Email med exakt 5 tecken före @
SELECT * FROM kunder WHERE email LIKE '_____@%';</code></pre>
                </div>
            </div>

            <div class="theory-section">
                <h3>📋 IN - Flera värden</h3>
                <p>IN är en smidig förkortning för flera OR-villkor.</p>

                <div class="example-box">
                    <pre><code>-- Istället för:
SELECT * FROM kunder
WHERE stad = 'Stockholm' OR stad = 'Göteborg' OR stad = 'Malmö';

-- Använd IN:
SELECT * FROM kunder
WHERE stad IN ('Stockholm', 'Göteborg', 'Malmö');</code></pre>
                </div>
            </div>

            <div class="theory-section">
                <h3>↔️ BETWEEN - Intervall</h3>
                <p>BETWEEN matchar värden inom ett intervall (inklusive gränserna).</p>

                <div class="example-box">
                    <pre><code>-- Produkter mellan 50-150 kr
SELECT * FROM produkter WHERE pris BETWEEN 50 AND 150;

-- Ordrar från januari 2024
SELECT * FROM ordrar
WHERE datum BETWEEN '2024-01-01' AND '2024-01-31';</code></pre>
                </div>

                <div class="warning-box">
                    <strong>⚠️ OBS:</strong> BETWEEN inkluderar både start- och slutvärdet!
                </div>
            </div>

            <div class="theory-section">
                <h3>❓ NULL - Saknade värden</h3>
                <p>NULL representerar ett saknat eller okänt värde. Det är <strong>inte</strong> samma som 0 eller tom sträng!</p>

                <div class="syntax-box">
                    <pre><code>-- Hitta NULL-värden
SELECT * FROM tabell WHERE kolumn IS NULL;

-- Hitta icke-NULL-värden
SELECT * FROM tabell WHERE kolumn IS NOT NULL;</code></pre>
                </div>

                <div class="warning-box">
                    <strong>⚠️ Vanligt misstag:</strong> Använd ALDRIG <code>= NULL</code>.
                    Det fungerar inte! Använd alltid <code>IS NULL</code>.
                </div>
            </div>

            <div class="theory-section">
                <h3>🔗 Kombinera villkor</h3>
                <p>Använd AND, OR och parenteser för komplexa villkor.</p>

                <div class="example-box">
                    <pre><code>-- AND: båda villkoren måste vara sanna
SELECT * FROM produkter
WHERE pris > 100 AND lager > 0;

-- OR: minst ett villkor måste vara sant
SELECT * FROM produkter
WHERE kategori_id = 1 OR kategori_id = 2;

-- Parenteser för att gruppera
SELECT * FROM produkter
WHERE (kategori_id = 1 OR kategori_id = 2)
  AND pris < 200;</code></pre>
                </div>

                <div class="tip-box">
                    <strong>💡 Tips:</strong> AND har högre prioritet än OR.
                    Använd parenteser för att göra din avsikt tydlig!
                </div>
            </div>

            <div class="practice-callout">
                <h3>🏋️ Övningstid!</h3>
                <p>Nu kan du filtrera och sortera data på avancerade sätt. Testa dina kunskaper!</p>
            </div>
        </div>
    `,

    // ===== DAG 3: AGGREGERING =====
    3: `
        <div class="theory-day">
            <h2>📚 Dag 3: Aggregering & Gruppering</h2>

            <div class="theory-section">
                <h3>🎯 Dagens mål</h3>
                <ul>
                    <li>Använda aggregeringsfunktioner (COUNT, SUM, AVG, MIN, MAX)</li>
                    <li>Gruppera data med GROUP BY</li>
                    <li>Filtrera grupper med HAVING</li>
                    <li>Kombinera aggregering med andra koncept</li>
                </ul>
            </div>

            <div class="theory-section">
                <h3>📊 Aggregeringsfunktioner</h3>
                <p>Aggregeringsfunktioner räknar ut ett enda värde från flera rader.</p>

                <table class="functions-table">
                    <thead>
                        <tr><th>Funktion</th><th>Beskrivning</th><th>Exempel</th></tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><code>COUNT()</code></td>
                            <td>Räknar antal rader</td>
                            <td><code>COUNT(*)</code> eller <code>COUNT(kolumn)</code></td>
                        </tr>
                        <tr>
                            <td><code>SUM()</code></td>
                            <td>Summerar värden</td>
                            <td><code>SUM(pris)</code></td>
                        </tr>
                        <tr>
                            <td><code>AVG()</code></td>
                            <td>Beräknar medelvärde</td>
                            <td><code>AVG(pris)</code></td>
                        </tr>
                        <tr>
                            <td><code>MIN()</code></td>
                            <td>Hittar lägsta värdet</td>
                            <td><code>MIN(pris)</code></td>
                        </tr>
                        <tr>
                            <td><code>MAX()</code></td>
                            <td>Hittar högsta värdet</td>
                            <td><code>MAX(pris)</code></td>
                        </tr>
                    </tbody>
                </table>

                <div class="example-box">
                    <h4>Exempel:</h4>
                    <pre><code>-- Antal produkter
SELECT COUNT(*) FROM produkter;

-- Total försäljning
SELECT SUM(totalt) FROM ordrar;

-- Genomsnittspris
SELECT AVG(pris) FROM produkter;

-- Prisintervall
SELECT MIN(pris) AS billigast, MAX(pris) AS dyrast
FROM produkter;</code></pre>
                </div>
            </div>

            <div class="theory-section">
                <h3>👥 GROUP BY - Gruppera data</h3>
                <p>GROUP BY grupperar rader med samma värde och låter dig köra aggregeringsfunktioner per grupp.</p>

                <div class="syntax-box">
                    <pre><code>SELECT kolumn, AGGREGERING(kolumn2)
FROM tabell
GROUP BY kolumn;</code></pre>
                </div>

                <div class="example-box">
                    <pre><code>-- Antal kunder per stad
SELECT stad, COUNT(*) AS antal_kunder
FROM kunder
GROUP BY stad;

-- Total försäljning per kund
SELECT kund_id, SUM(totalt) AS total_kopt
FROM ordrar
GROUP BY kund_id;

-- Snittlön per avdelning
SELECT avdelning, AVG(lon) AS snittlon
FROM anstalda
GROUP BY avdelning;</code></pre>
                </div>

                <div class="warning-box">
                    <strong>⚠️ Viktigt:</strong> Alla kolumner i SELECT som INTE är aggregeringsfunktioner
                    MÅSTE finnas i GROUP BY!
                </div>
            </div>

            <div class="theory-section">
                <h3>🎯 HAVING - Filtrera grupper</h3>
                <p>HAVING filtrerar <strong>efter</strong> grupperingen (till skillnad från WHERE som filtrerar innan).</p>

                <div class="comparison-box">
                    <div class="compare-item">
                        <h5>WHERE</h5>
                        <p>Filtrerar <strong>rader</strong> innan gruppering</p>
                    </div>
                    <div class="compare-item">
                        <h5>HAVING</h5>
                        <p>Filtrerar <strong>grupper</strong> efter gruppering</p>
                    </div>
                </div>

                <div class="example-box">
                    <pre><code>-- Städer med mer än 2 kunder
SELECT stad, COUNT(*) AS antal
FROM kunder
GROUP BY stad
HAVING COUNT(*) > 2;

-- Avdelningar med snittlön över 40000
SELECT avdelning, AVG(lon) AS snittlon
FROM anstalda
GROUP BY avdelning
HAVING AVG(lon) > 40000;

-- Kombinera WHERE och HAVING
SELECT kategori_id, AVG(pris) AS snittpris
FROM produkter
WHERE lager > 0          -- Filtrera rader först
GROUP BY kategori_id
HAVING AVG(pris) > 100;  -- Filtrera grupper sedan</code></pre>
                </div>
            </div>

            <div class="theory-section">
                <h3>📝 SQL-frågans ordning</h3>
                <p>Det är viktigt att förstå i vilken ordning SQL processar en fråga:</p>

                <div class="order-box">
                    <ol>
                        <li><strong>FROM</strong> - Vilken tabell?</li>
                        <li><strong>WHERE</strong> - Filtrera rader</li>
                        <li><strong>GROUP BY</strong> - Gruppera</li>
                        <li><strong>HAVING</strong> - Filtrera grupper</li>
                        <li><strong>SELECT</strong> - Välj kolumner</li>
                        <li><strong>ORDER BY</strong> - Sortera</li>
                        <li><strong>LIMIT</strong> - Begränsa</li>
                    </ol>
                </div>
            </div>

            <div class="theory-section">
                <h3>🔢 COUNT-varianter</h3>

                <div class="example-box">
                    <pre><code>-- COUNT(*) - räknar alla rader (inklusive NULL)
SELECT COUNT(*) FROM kunder;

-- COUNT(kolumn) - räknar icke-NULL värden
SELECT COUNT(email) FROM kunder;

-- COUNT(DISTINCT kolumn) - räknar unika värden
SELECT COUNT(DISTINCT stad) FROM kunder;</code></pre>
                </div>
            </div>

            <div class="practice-callout">
                <h3>🏋️ Aggregera loss!</h3>
                <p>Aggregering är nyckeln till dataanalys. Öva tills du känner dig bekväm med alla funktioner!</p>
            </div>
        </div>
    `,

    // ===== DAG 4: JOINs =====
    4: `
        <div class="theory-day">
            <h2>📚 Dag 4: Relationer & JOINs</h2>

            <div class="theory-section">
                <h3>🎯 Dagens mål</h3>
                <ul>
                    <li>Förstå relationer mellan tabeller</li>
                    <li>Använda INNER JOIN för att kombinera data</li>
                    <li>Använda LEFT/RIGHT JOIN för inkluderande kopplingar</li>
                    <li>Skriva komplexa frågor med flera JOINs</li>
                </ul>
            </div>

            <div class="theory-section">
                <h3>🔗 Relationer i databaser</h3>
                <p>I relationsdatabaser lagrar vi data i separata tabeller och kopplar ihop dem med <strong>nycklar</strong>.</p>

                <div class="info-box">
                    <h4>Nyckeltyper:</h4>
                    <ul>
                        <li><strong>Primärnyckel (PRIMARY KEY)</strong> - Unikt ID för varje rad</li>
                        <li><strong>Främmande nyckel (FOREIGN KEY)</strong> - Referens till annan tabell</li>
                    </ul>
                </div>

                <div class="relation-example">
                    <pre>
┌─────────────────┐         ┌─────────────────┐
│     kunder      │         │     ordrar      │
├─────────────────┤         ├─────────────────┤
│ id (PK)         │◄────────│ kund_id (FK)    │
│ namn            │         │ id (PK)         │
│ email           │         │ datum           │
│ stad            │         │ totalt          │
└─────────────────┘         └─────────────────┘
                    </pre>
                </div>
            </div>

            <div class="theory-section">
                <h3>⚡ INNER JOIN</h3>
                <p>INNER JOIN returnerar endast rader som har matchning i <strong>båda</strong> tabellerna.</p>

                <div class="syntax-box">
                    <pre><code>SELECT kolumner
FROM tabell1
INNER JOIN tabell2 ON tabell1.kolumn = tabell2.kolumn;</code></pre>
                </div>

                <div class="example-box">
                    <pre><code>-- Kunder med deras ordrar
SELECT kunder.namn, ordrar.datum, ordrar.totalt
FROM kunder
INNER JOIN ordrar ON kunder.id = ordrar.kund_id;

-- Med alias (kortare)
SELECT k.namn, o.datum, o.totalt
FROM kunder k
INNER JOIN ordrar o ON k.id = o.kund_id;</code></pre>
                </div>

                <div class="visual-box">
                    <h4>Visualisering:</h4>
                    <pre>
    Kunder          Ordrar           INNER JOIN
   ┌───┐           ┌───┐            ┌───┐
   │ A │           │ 1 │──A         │A-1│
   │ B │           │ 2 │──B         │B-2│
   │ C │           │ 3 │──B         │B-3│
   └───┘           └───┘            └───┘
     ↑               ↑
   Kund C har      Order utan      Endast matchande
   inga ordrar     koppling         rader visas
                    </pre>
                </div>
            </div>

            <div class="theory-section">
                <h3>⬅️ LEFT JOIN</h3>
                <p>LEFT JOIN returnerar alla rader från vänster tabell, plus matchande från höger.
                Saknas match blir det NULL.</p>

                <div class="example-box">
                    <pre><code>-- ALLA kunder, även de utan ordrar
SELECT k.namn, o.datum, o.totalt
FROM kunder k
LEFT JOIN ordrar o ON k.id = o.kund_id;

-- Hitta kunder UTAN ordrar
SELECT k.namn
FROM kunder k
LEFT JOIN ordrar o ON k.id = o.kund_id
WHERE o.id IS NULL;</code></pre>
                </div>

                <div class="visual-box">
                    <pre>
    LEFT JOIN
   ┌────────┐
   │A - 1   │
   │B - 2   │
   │B - 3   │
   │C - NULL│  ← Kund C inkluderas trots inga ordrar
   └────────┘
                    </pre>
                </div>
            </div>

            <div class="theory-section">
                <h3>➡️ RIGHT JOIN</h3>
                <p>RIGHT JOIN är motsatsen - alla från höger tabell, matchande från vänster.</p>

                <div class="tip-box">
                    <strong>💡 Tips:</strong> RIGHT JOIN används sällan. De flesta skriver om frågan
                    så att LEFT JOIN kan användas istället - det är lättare att läsa.
                </div>
            </div>

            <div class="theory-section">
                <h3>🔄 Flera JOINs</h3>
                <p>Du kan kedja flera JOINs för att kombinera många tabeller.</p>

                <div class="example-box">
                    <pre><code>-- Ordrar med kundnamn och produktnamn
SELECT
    k.namn AS kund,
    o.datum,
    p.namn AS produkt,
    or.antal,
    or.pris
FROM ordrar o
INNER JOIN kunder k ON o.kund_id = k.id
INNER JOIN orderrader or ON o.id = or.order_id
INNER JOIN produkter p ON or.produkt_id = p.id;</code></pre>
                </div>
            </div>

            <div class="theory-section">
                <h3>🆚 JOIN-jämförelse</h3>

                <table class="comparison-table">
                    <thead>
                        <tr><th>JOIN-typ</th><th>Returnerar</th><th>Användning</th></tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>INNER JOIN</td>
                            <td>Endast matchande rader</td>
                            <td>Standard, mest vanlig</td>
                        </tr>
                        <tr>
                            <td>LEFT JOIN</td>
                            <td>Alla från vänster + matchande</td>
                            <td>Hitta saknade relationer</td>
                        </tr>
                        <tr>
                            <td>RIGHT JOIN</td>
                            <td>Alla från höger + matchande</td>
                            <td>Sällan använd</td>
                        </tr>
                        <tr>
                            <td>FULL OUTER JOIN</td>
                            <td>Alla från båda</td>
                            <td>SQLite stödjer ej</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="practice-callout">
                <h3>🏋️ JOIN-träning!</h3>
                <p>JOINs är avgörande för verklig databasanvändning. Öva på att kombinera tabeller!</p>
            </div>
        </div>
    `,

    // ===== DAG 5: CREATE, INSERT, UPDATE, DELETE =====
    5: `
        <div class="theory-day">
            <h2>📚 Dag 5: Skapa & Modifiera Data</h2>

            <div class="theory-section">
                <h3>🎯 Dagens mål</h3>
                <ul>
                    <li>Skapa tabeller med CREATE TABLE</li>
                    <li>Lägga till data med INSERT</li>
                    <li>Uppdatera data med UPDATE</li>
                    <li>Ta bort data med DELETE</li>
                    <li>Förstå datatyper och constraints</li>
                </ul>
            </div>

            <div class="theory-section">
                <h3>🏗️ CREATE TABLE</h3>
                <p>CREATE TABLE skapar en ny tabell med definierade kolumner och datatyper.</p>

                <div class="syntax-box">
                    <pre><code>CREATE TABLE tabellnamn (
    kolumn1 DATATYP CONSTRAINT,
    kolumn2 DATATYP CONSTRAINT,
    ...
);</code></pre>
                </div>

                <h4>Vanliga datatyper (SQLite):</h4>
                <table class="datatypes-table">
                    <tr><td><code>INTEGER</code></td><td>Heltal</td></tr>
                    <tr><td><code>REAL</code></td><td>Decimaltal</td></tr>
                    <tr><td><code>TEXT</code></td><td>Text/strängar</td></tr>
                    <tr><td><code>BLOB</code></td><td>Binär data</td></tr>
                    <tr><td><code>NULL</code></td><td>Inget värde</td></tr>
                </table>

                <h4>Vanliga constraints:</h4>
                <table class="constraints-table">
                    <tr><td><code>PRIMARY KEY</code></td><td>Unik identifierare</td></tr>
                    <tr><td><code>NOT NULL</code></td><td>Måste ha värde</td></tr>
                    <tr><td><code>UNIQUE</code></td><td>Måste vara unikt</td></tr>
                    <tr><td><code>DEFAULT</code></td><td>Standardvärde</td></tr>
                    <tr><td><code>FOREIGN KEY</code></td><td>Referens till annan tabell</td></tr>
                </table>

                <div class="example-box">
                    <pre><code>CREATE TABLE bocker (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titel TEXT NOT NULL,
    forfattare TEXT NOT NULL,
    pris REAL DEFAULT 0,
    publicerad DATE,
    lager INTEGER DEFAULT 0
);</code></pre>
                </div>
            </div>

            <div class="theory-section">
                <h3>➕ INSERT - Lägg till data</h3>
                <p>INSERT lägger till nya rader i en tabell.</p>

                <div class="syntax-box">
                    <pre><code>-- Specificera kolumner
INSERT INTO tabell (kol1, kol2) VALUES ('val1', 'val2');

-- Alla kolumner (måste matcha ordningen)
INSERT INTO tabell VALUES (val1, val2, val3);

-- Flera rader samtidigt
INSERT INTO tabell (kol1, kol2) VALUES
    ('val1', 'val2'),
    ('val3', 'val4');</code></pre>
                </div>

                <div class="example-box">
                    <pre><code>-- Lägg till en bok
INSERT INTO bocker (titel, forfattare, pris, lager)
VALUES ('Pippi Långstrump', 'Astrid Lindgren', 149.00, 25);

-- Lägg till flera böcker
INSERT INTO bocker (titel, forfattare, pris) VALUES
    ('Mio min Mio', 'Astrid Lindgren', 129.00),
    ('Ronja Rövardotter', 'Astrid Lindgren', 159.00);</code></pre>
                </div>
            </div>

            <div class="theory-section">
                <h3>✏️ UPDATE - Uppdatera data</h3>
                <p>UPDATE ändrar befintliga värden i tabellen.</p>

                <div class="syntax-box">
                    <pre><code>UPDATE tabell
SET kolumn1 = värde1, kolumn2 = värde2
WHERE villkor;</code></pre>
                </div>

                <div class="warning-box">
                    <strong>⚠️ KRITISKT:</strong> Glöm ALDRIG WHERE-satsen! Utan den uppdateras ALLA rader!
                </div>

                <div class="example-box">
                    <pre><code>-- Uppdatera pris på en specifik bok
UPDATE bocker SET pris = 169.00 WHERE id = 1;

-- Uppdatera flera kolumner
UPDATE bocker
SET pris = 199.00, lager = 30
WHERE titel = 'Pippi Långstrump';

-- Öka lagret med 10 för alla böcker
UPDATE bocker SET lager = lager + 10;</code></pre>
                </div>
            </div>

            <div class="theory-section">
                <h3>🗑️ DELETE - Ta bort data</h3>
                <p>DELETE tar bort rader från tabellen.</p>

                <div class="syntax-box">
                    <pre><code>DELETE FROM tabell WHERE villkor;</code></pre>
                </div>

                <div class="warning-box">
                    <strong>⚠️ KRITISKT:</strong> Utan WHERE tas ALLA rader bort!
                    Det går inte att ångra i produktion!
                </div>

                <div class="example-box">
                    <pre><code>-- Ta bort en specifik bok
DELETE FROM bocker WHERE id = 5;

-- Ta bort böcker utan lager
DELETE FROM bocker WHERE lager = 0;

-- TA BORT ALLT (farligt!)
DELETE FROM bocker;  -- Raderar alla böcker!</code></pre>
                </div>
            </div>

            <div class="theory-section">
                <h3>🛡️ Säker datahantering</h3>

                <div class="best-practices">
                    <h4>Best Practices:</h4>
                    <ol>
                        <li><strong>Testa med SELECT först</strong> - Kör en SELECT med samma WHERE innan UPDATE/DELETE</li>
                        <li><strong>Använd transaktioner</strong> - BEGIN, COMMIT, ROLLBACK</li>
                        <li><strong>Ta backup</strong> - Innan stora ändringar</li>
                        <li><strong>Begränsa med LIMIT</strong> - För extra säkerhet</li>
                    </ol>
                </div>

                <div class="example-box">
                    <pre><code>-- Säkert mönster: SELECT först
SELECT * FROM bocker WHERE pris > 200;
-- Kontrollera resultatet...
DELETE FROM bocker WHERE pris > 200;

-- Med transaktion
BEGIN TRANSACTION;
DELETE FROM bocker WHERE lager = 0;
-- Om allt ser bra ut:
COMMIT;
-- Annars:
ROLLBACK;</code></pre>
                </div>
            </div>

            <div class="theory-section">
                <h3>🔧 ALTER TABLE & DROP</h3>

                <div class="example-box">
                    <pre><code>-- Lägg till kolumn
ALTER TABLE bocker ADD COLUMN isbn TEXT;

-- Ta bort hela tabellen
DROP TABLE bocker;

-- Ta bort endast om den finns
DROP TABLE IF EXISTS bocker;</code></pre>
                </div>
            </div>

            <div class="practice-callout">
                <h3>🏋️ Dags att bygga!</h3>
                <p>Nu kan du skapa och modifiera data. Var försiktig med UPDATE och DELETE!</p>
            </div>
        </div>
    `,

    // ===== DAG 6: NORMALISERING =====
    6: `
        <div class="theory-day">
            <h2>📚 Dag 6: Normalisering & Databasdesign</h2>

            <div class="theory-section">
                <h3>🎯 Dagens mål</h3>
                <ul>
                    <li>Förstå varför normalisering behövs</li>
                    <li>Känna till normalformerna (1NF, 2NF, 3NF)</li>
                    <li>Designa effektiva databasscheman</li>
                    <li>Balansera normalisering och prestanda</li>
                </ul>
            </div>

            <div class="theory-section">
                <h3>❓ Varför normalisering?</h3>
                <p>Normalisering är processen att organisera data för att minimera redundans och beroenden.</p>

                <div class="problem-box">
                    <h4>Problem utan normalisering:</h4>
                    <ul>
                        <li><strong>Redundans</strong> - Samma data lagras flera gånger</li>
                        <li><strong>Uppdateringsanomalier</strong> - Måste uppdatera på flera ställen</li>
                        <li><strong>Insättningsanomalier</strong> - Kan inte lägga till data utan annan data</li>
                        <li><strong>Borttagningsanomalier</strong> - Tar bort data du vill behålla</li>
                    </ul>
                </div>

                <div class="example-box bad">
                    <h4>❌ Dålig design (onormaliserad):</h4>
                    <pre>
┌────────────────────────────────────────────────────────────┐
│ order_id │ kund_namn │ kund_stad │ produkt │ pris │ antal │
├──────────┼───────────┼───────────┼─────────┼──────┼───────┤
│ 1        │ Anna      │ Stockholm │ Laptop  │ 9999 │ 1     │
│ 2        │ Anna      │ Stockholm │ Mus     │ 299  │ 2     │
│ 3        │ Erik      │ Göteborg  │ Laptop  │ 9999 │ 1     │
└────────────────────────────────────────────────────────────┘
                    </pre>
                    <p>Problem: "Anna" och "Stockholm" lagras flera gånger!</p>
                </div>
            </div>

            <div class="theory-section">
                <h3>1️⃣ Första normalformen (1NF)</h3>
                <p>Krav för 1NF:</p>
                <ul>
                    <li>Varje cell innehåller endast ETT värde (atomärt)</li>
                    <li>Varje rad är unik</li>
                    <li>Ingen ordning på rader/kolumner</li>
                </ul>

                <div class="example-box bad">
                    <h4>❌ Bryter mot 1NF:</h4>
                    <pre>
│ id │ namn │ telefon              │
│ 1  │ Anna │ 070-123, 08-456      │  ← Flera värden i en cell!
                    </pre>
                </div>

                <div class="example-box good">
                    <h4>✅ 1NF:</h4>
                    <pre>
│ id │ namn │ telefon  │
│ 1  │ Anna │ 070-123  │
│ 1  │ Anna │ 08-456   │
                    </pre>
                    <p>Eller bättre: separat telefontabell</p>
                </div>
            </div>

            <div class="theory-section">
                <h3>2️⃣ Andra normalformen (2NF)</h3>
                <p>Krav för 2NF:</p>
                <ul>
                    <li>Uppfyller 1NF</li>
                    <li>Alla icke-nyckelattribut beror på HELA primärnyckeln</li>
                </ul>

                <div class="example-box bad">
                    <h4>❌ Bryter mot 2NF:</h4>
                    <pre>
Primärnyckel: (order_id, produkt_id)

│ order_id │ produkt_id │ kund_namn │ produkt_namn │
│ 1        │ 10         │ Anna      │ Laptop       │

kund_namn beror bara på order_id, inte produkt_id!
                    </pre>
                </div>

                <div class="example-box good">
                    <h4>✅ 2NF: Dela upp i separata tabeller</h4>
                    <pre>
ordrar: (order_id, kund_id)
orderrader: (order_id, produkt_id, antal)
                    </pre>
                </div>
            </div>

            <div class="theory-section">
                <h3>3️⃣ Tredje normalformen (3NF)</h3>
                <p>Krav för 3NF:</p>
                <ul>
                    <li>Uppfyller 2NF</li>
                    <li>Inga transitiva beroenden (A → B → C)</li>
                </ul>

                <div class="example-box bad">
                    <h4>❌ Bryter mot 3NF:</h4>
                    <pre>
│ kund_id │ kund_namn │ stad       │ postnummer │

postnummer → stad (transitiv!)
Om vi ändrar stad för ett postnummer måste vi ändra överallt.
                    </pre>
                </div>

                <div class="example-box good">
                    <h4>✅ 3NF:</h4>
                    <pre>
kunder: (kund_id, kund_namn, postnummer)
postnummer: (postnummer, stad)
                    </pre>
                </div>
            </div>

            <div class="theory-section">
                <h3>⚖️ Normalisering vs Denormalisering</h3>

                <table class="comparison-table">
                    <thead>
                        <tr><th>Normalisering</th><th>Denormalisering</th></tr>
                    </thead>
                    <tbody>
                        <tr><td>Mindre redundans</td><td>Snabbare läsning</td></tr>
                        <tr><td>Enklare uppdateringar</td><td>Färre JOINs</td></tr>
                        <tr><td>Mer JOINs krävs</td><td>Mer lagringsutrymme</td></tr>
                        <tr><td>Bättre dataintegritet</td><td>Risk för inkonsistens</td></tr>
                    </tbody>
                </table>

                <div class="tip-box">
                    <strong>💡 Tumregel:</strong> Normalisera först (3NF), denormalisera sedan om prestanda kräver det.
                </div>
            </div>

            <div class="theory-section">
                <h3>🎨 Databasdesign - Processen</h3>
                <ol>
                    <li><strong>Identifiera entiteter</strong> - Vad ska lagras? (kunder, produkter, ordrar)</li>
                    <li><strong>Definiera attribut</strong> - Vilka egenskaper har varje entitet?</li>
                    <li><strong>Bestäm relationer</strong> - Hur hänger entiteterna ihop?</li>
                    <li><strong>Välj primärnycklar</strong> - Vad identifierar varje rad unikt?</li>
                    <li><strong>Normalisera</strong> - Applicera normalformerna</li>
                </ol>
            </div>

            <div class="practice-callout">
                <h3>🏋️ Design-övningar!</h3>
                <p>Att designa databaser kräver övning. Analysera verkliga scenarion!</p>
            </div>
        </div>
    `,

    // ===== DAG 7: AVANCERAT =====
    7: `
        <div class="theory-day">
            <h2>📚 Dag 7: Avancerad SQL & DevOps</h2>

            <div class="theory-section">
                <h3>🎯 Dagens mål</h3>
                <ul>
                    <li>Skriva subqueries (nästlade frågor)</li>
                    <li>Skapa och använda Views</li>
                    <li>Förstå transaktioner och ACID</li>
                    <li>Optimera med Index</li>
                    <li>Backup och säkerhet (DevOps-fokus)</li>
                </ul>
            </div>

            <div class="theory-section">
                <h3>🔄 Subqueries (Nästlade frågor)</h3>
                <p>En subquery är en SELECT inuti en annan SQL-fråga.</p>

                <div class="example-box">
                    <pre><code>-- Hitta produkter dyrare än genomsnittet
SELECT * FROM produkter
WHERE pris > (SELECT AVG(pris) FROM produkter);

-- Kunder som har gjort ordrar
SELECT * FROM kunder
WHERE id IN (SELECT DISTINCT kund_id FROM ordrar);

-- Subquery som tabell
SELECT avg_order.kund_id, avg_order.snitt
FROM (
    SELECT kund_id, AVG(totalt) AS snitt
    FROM ordrar
    GROUP BY kund_id
) AS avg_order
WHERE avg_order.snitt > 1000;</code></pre>
                </div>
            </div>

            <div class="theory-section">
                <h3>👁️ Views - Virtuella tabeller</h3>
                <p>En View är en sparad fråga som beter sig som en tabell.</p>

                <div class="syntax-box">
                    <pre><code>CREATE VIEW vynamn AS
SELECT ...;

-- Använd som vanlig tabell
SELECT * FROM vynamn;</code></pre>
                </div>

                <div class="example-box">
                    <pre><code>-- Skapa en vy för kundstatistik
CREATE VIEW kund_statistik AS
SELECT
    k.id,
    k.namn,
    COUNT(o.id) AS antal_ordrar,
    SUM(o.totalt) AS total_kopt
FROM kunder k
LEFT JOIN ordrar o ON k.id = o.kund_id
GROUP BY k.id;

-- Använd vyn
SELECT * FROM kund_statistik WHERE total_kopt > 5000;</code></pre>
                </div>

                <div class="info-box">
                    <h4>Fördelar med Views:</h4>
                    <ul>
                        <li>Förenklar komplexa frågor</li>
                        <li>Säkerhet - visa bara vissa kolumner</li>
                        <li>Abstraktion - dölja komplex logik</li>
                    </ul>
                </div>
            </div>

            <div class="theory-section">
                <h3>💼 Transaktioner</h3>
                <p>En transaktion är en grupp operationer som måste lyckas tillsammans.</p>

                <div class="syntax-box">
                    <pre><code>BEGIN TRANSACTION;

-- Dina SQL-operationer här

COMMIT;    -- Spara ändringarna
-- eller
ROLLBACK;  -- Ångra allt</code></pre>
                </div>

                <div class="example-box">
                    <pre><code>-- Överföring mellan konton
BEGIN TRANSACTION;

UPDATE konton SET saldo = saldo - 1000 WHERE id = 1;
UPDATE konton SET saldo = saldo + 1000 WHERE id = 2;

-- Om båda lyckades:
COMMIT;
-- Om något gick fel:
-- ROLLBACK;</code></pre>
                </div>

                <div class="concept-box acid">
                    <h4>ACID-egenskaper:</h4>
                    <ul>
                        <li><strong>Atomicity</strong> - Allt eller inget</li>
                        <li><strong>Consistency</strong> - Giltigt före och efter</li>
                        <li><strong>Isolation</strong> - Transaktioner stör inte varandra</li>
                        <li><strong>Durability</strong> - Committat data försvinner inte</li>
                    </ul>
                </div>
            </div>

            <div class="theory-section">
                <h3>🚀 Index - Optimera prestanda</h3>
                <p>Index gör sökningar snabbare, som ett index i en bok.</p>

                <div class="syntax-box">
                    <pre><code>-- Skapa index
CREATE INDEX idx_namn ON tabell(kolumn);

-- Unikt index
CREATE UNIQUE INDEX idx_email ON kunder(email);

-- Kombinerat index
CREATE INDEX idx_stad_namn ON kunder(stad, namn);

-- Ta bort index
DROP INDEX idx_namn;</code></pre>
                </div>

                <div class="warning-box">
                    <strong>⚠️ Trade-off:</strong> Index snabbar upp SELECT men saktar ner INSERT/UPDATE/DELETE.
                    Indexera inte allt!
                </div>
            </div>

            <div class="theory-section">
                <h3>💾 Backup & Restore (DevOps)</h3>
                <p>Som DevOps-ingenjör är backup kritiskt!</p>

                <div class="code-box">
                    <h4>SQLite Backup:</h4>
                    <pre><code># Skapa backup (dump till SQL)
sqlite3 databas.db .dump > backup.sql

# Återställ
sqlite3 ny_databas.db < backup.sql</code></pre>
                </div>

                <div class="code-box">
                    <h4>MariaDB/MySQL Backup:</h4>
                    <pre><code># Skapa backup
mysqldump -u user -p databas > backup.sql

# Återställ
mysql -u user -p databas < backup.sql</code></pre>
                </div>

                <div class="important-box">
                    <h4>🔥 3-2-1 Regeln:</h4>
                    <ul>
                        <li><strong>3</strong> kopior av din data</li>
                        <li><strong>2</strong> olika lagringsmedier</li>
                        <li><strong>1</strong> kopia off-site (annan plats)</li>
                    </ul>
                </div>

                <div class="warning-box">
                    <strong>⚠️ Gyllene regeln:</strong> Du har INGEN backup förrän du har testat att återställa den!
                </div>
            </div>

            <div class="theory-section">
                <h3>🔒 Säkerhet</h3>

                <div class="security-tips">
                    <h4>SQL Injection - Största hotet!</h4>
                    <pre><code>-- ❌ ALDRIG göra (sårbart):
query = "SELECT * FROM users WHERE name = '" + user_input + "'"

-- ✅ Använd parametriserade frågor:
cursor.execute("SELECT * FROM users WHERE name = ?", (user_input,))</code></pre>
                </div>

                <div class="info-box">
                    <h4>Säkerhetstips:</h4>
                    <ul>
                        <li>Använd ALLTID parametriserade frågor</li>
                        <li>Ge användare minsta möjliga behörighet</li>
                        <li>Kryptera känslig data</li>
                        <li>Logga alla databasoperationer</li>
                        <li>Håll databasen uppdaterad</li>
                    </ul>
                </div>
            </div>

            <div class="theory-section">
                <h3>🐍 Python + Databaser</h3>

                <div class="example-box">
                    <pre><code>import sqlite3

# Anslut
conn = sqlite3.connect('databas.db')
cursor = conn.cursor()

# Kör fråga (säkert med parametrar!)
cursor.execute(
    "SELECT * FROM kunder WHERE stad = ?",
    ('Stockholm',)
)
resultat = cursor.fetchall()

# Stäng
conn.close()</code></pre>
                </div>
            </div>

            <div class="graduation-box">
                <h3>🎓 Grattis!</h3>
                <p>Du har nu gått igenom alla 7 dagar och har en solid grund i SQL!</p>
                <p>Fortsätt öva med:</p>
                <ul>
                    <li><a href="https://hanukkah.bluebird.sh/" target="_blank">Hanukkah of Data</a> - Spännande SQL-pussel</li>
                    <li><a href="https://sqlzoo.net/" target="_blank">SQLZoo</a> - Interaktiva övningar</li>
                    <li><a href="https://leetcode.com/problemset/database/" target="_blank">LeetCode Database</a> - Utmaningar</li>
                </ul>
            </div>
        </div>
    `
};

// Hämta teori för en specifik dag
function getDayTheory(day) {
    return THEORY[day] || '<p>Teori för dag ' + day + ' kommer snart!</p>';
}

// Exportera
window.getDayTheory = getDayTheory;
window.THEORY = THEORY;
