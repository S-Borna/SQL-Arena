import { useState, useEffect } from 'react';

interface CheatSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

type ViewMode = 'read' | 'flashcard' | 'quiz';

interface CheatItem {
  syntax: string;
  description: string;
  explanation: string;
  examples: string[];
  commonMistakes?: string;
  flashcardQ: string;
  flashcardA: string;
  quizQ: string;
  quizOptions: string[];
  quizCorrect: number;
}

interface CheatCategory {
  name: string;
  icon: string;
  items: CheatItem[];
}

const cheatSheetData: CheatCategory[] = [
  {
    name: 'SELECT Grunderna',
    icon: 'select',
    items: [
      {
        syntax: 'SELECT kolumn FROM tabell',
        description: 'Hämtar data från en tabell',
        explanation: 'SELECT är det mest grundläggande kommandot i SQL. Du anger vilka kolumner du vill ha, och från vilken tabell. Databasen returnerar alla rader som matchar.',
        examples: [
          'SELECT name FROM users;',
          'SELECT name, email FROM users;',
          'SELECT * FROM products;'
        ],
        commonMistakes: 'Glöm inte semikolon i slutet. SELECT utan FROM ger fel.',
        flashcardQ: 'Hur hämtar du kolumnerna "name" och "email" från tabellen "users"?',
        flashcardA: 'SELECT name, email FROM users;',
        quizQ: 'Vilken SQL-sats hämtar alla kolumner från tabellen "products"?',
        quizOptions: [
          'SELECT * FROM products;',
          'GET ALL FROM products;',
          'SELECT products FROM *;',
          'FETCH * FROM products;'
        ],
        quizCorrect: 0
      },
      {
        syntax: 'SELECT DISTINCT',
        description: 'Returnerar endast unika värden',
        explanation: 'DISTINCT filtrerar bort dubbletter från resultatet. Användbart när du vill se alla unika värden i en kolumn, exempelvis alla städer där du har kunder.',
        examples: [
          'SELECT DISTINCT city FROM customers;',
          'SELECT DISTINCT category FROM products;',
          'SELECT DISTINCT country, city FROM customers;'
        ],
        commonMistakes: 'DISTINCT appliceras på hela raden, inte bara första kolumnen.',
        flashcardQ: 'Hur listar du alla unika kategorier från products-tabellen?',
        flashcardA: 'SELECT DISTINCT category FROM products;',
        quizQ: 'Vad gör DISTINCT i en SELECT-sats?',
        quizOptions: [
          'Sorterar resultatet alfabetiskt',
          'Tar bort dubbletter från resultatet',
          'Begränsar antalet rader',
          'Väljer slumpmässiga rader'
        ],
        quizCorrect: 1
      },
      {
        syntax: 'AS (Alias)',
        description: 'Ger kolumn eller tabell ett tillfälligt namn',
        explanation: 'Alias gör resultatet mer läsbart och förenklar långa tabellnamn vid JOINs. Aliaset existerar bara under frågan.',
        examples: [
          'SELECT name AS customer_name FROM customers;',
          'SELECT COUNT(*) AS total_orders FROM orders;',
          'SELECT p.name, c.name FROM products p, categories c;'
        ],
        flashcardQ: 'Hur ger du kolumnen "name" aliaset "product_name" i resultatet?',
        flashcardA: 'SELECT name AS product_name FROM products;',
        quizQ: 'Vad gör AS i SQL?',
        quizOptions: [
          'Skapar en permanent kolumn',
          'Ger ett tillfälligt alias till kolumn eller tabell',
          'Filtrerar resultatet',
          'Sorterar i stigande ordning'
        ],
        quizCorrect: 1
      }
    ]
  },
  {
    name: 'WHERE Filtrering',
    icon: 'filter',
    items: [
      {
        syntax: 'WHERE villkor',
        description: 'Filtrerar rader baserat på villkor',
        explanation: 'WHERE begränsar vilka rader som returneras. Endast rader där villkoret är sant inkluderas. Villkoret kan använda jämförelseoperatorer som =, >, <, >=, <=, != eller <>.',
        examples: [
          "SELECT * FROM products WHERE price > 100;",
          "SELECT * FROM users WHERE country = 'Sweden';",
          "SELECT * FROM orders WHERE status != 'cancelled';"
        ],
        commonMistakes: "Textvärden måste omges av citattecken: 'värde'. Siffror ska inte ha citattecken.",
        flashcardQ: 'Hur hämtar du alla produkter där priset är över 100?',
        flashcardA: 'SELECT * FROM products WHERE price > 100;',
        quizQ: 'Vilken operator använder du för "inte lika med" i SQL?',
        quizOptions: [
          '==',
          '!= eller <>',
          '!==',
          'NOT EQUAL'
        ],
        quizCorrect: 1
      },
      {
        syntax: 'AND / OR',
        description: 'Kombinerar flera villkor',
        explanation: 'AND kräver att båda villkoren är sanna. OR kräver att minst ett villkor är sant. Använd parenteser för att gruppera villkor och undvika oväntade resultat.',
        examples: [
          "SELECT * FROM products WHERE category = 'Electronics' AND price < 500;",
          "SELECT * FROM users WHERE country = 'Sweden' OR country = 'Norway';",
          "SELECT * FROM orders WHERE (status = 'pending' OR status = 'processing') AND total > 1000;"
        ],
        commonMistakes: 'Utan parenteser kan AND/OR-prioritet ge oväntade resultat. AND utvärderas före OR.',
        flashcardQ: 'Hur kombinerar du två villkor där båda måste vara sanna?',
        flashcardA: 'Använd AND: WHERE villkor1 AND villkor2',
        quizQ: 'Vad returnerar: WHERE A AND B OR C?',
        quizOptions: [
          '(A AND B) OR C - pga AND utvärderas först',
          'A AND (B OR C)',
          'Alla tre måste vara sanna',
          'Syntax error'
        ],
        quizCorrect: 0
      },
      {
        syntax: 'IN (lista)',
        description: 'Matchar mot flera värden',
        explanation: 'IN är ett smidigare alternativ till flera OR-villkor. Du anger en lista med värden, och rader som matchar något av värdena inkluderas.',
        examples: [
          "SELECT * FROM products WHERE category IN ('Books', 'Music', 'Movies');",
          "SELECT * FROM orders WHERE status IN ('pending', 'processing');",
          "SELECT * FROM users WHERE id IN (1, 5, 10, 15);"
        ],
        flashcardQ: 'Hur skriver du om: category = "A" OR category = "B" OR category = "C"?',
        flashcardA: "WHERE category IN ('A', 'B', 'C')",
        quizQ: 'Vilken sats motsvarar: WHERE id = 1 OR id = 2 OR id = 3?',
        quizOptions: [
          'WHERE id IN (1, 2, 3)',
          'WHERE id BETWEEN 1 AND 3',
          'WHERE id = (1, 2, 3)',
          'WHERE id MATCH (1, 2, 3)'
        ],
        quizCorrect: 0
      },
      {
        syntax: 'BETWEEN min AND max',
        description: 'Värde inom intervall (inklusivt)',
        explanation: 'BETWEEN matchar värden från och med min till och med max. Fungerar på tal, datum och text. Gränsvärdena är inkluderade.',
        examples: [
          "SELECT * FROM products WHERE price BETWEEN 50 AND 100;",
          "SELECT * FROM orders WHERE order_date BETWEEN '2024-01-01' AND '2024-12-31';",
          "SELECT * FROM employees WHERE salary BETWEEN 30000 AND 50000;"
        ],
        flashcardQ: 'Hur hämtar du produkter med pris från 50 till 100 (inklusivt)?',
        flashcardA: 'SELECT * FROM products WHERE price BETWEEN 50 AND 100;',
        quizQ: 'Inkluderar BETWEEN gränsvärdena?',
        quizOptions: [
          'Ja, båda gränsvärdena inkluderas',
          'Nej, endast värden mellan exkluderas',
          'Bara det lägre värdet inkluderas',
          'Bara det högre värdet inkluderas'
        ],
        quizCorrect: 0
      },
      {
        syntax: 'LIKE med % och _',
        description: 'Mönstermatchning för text',
        explanation: '% matchar noll eller flera tecken. _ matchar exakt ett tecken. Case-sensitive i de flesta databaser (använd ILIKE i PostgreSQL för case-insensitive).',
        examples: [
          "SELECT * FROM users WHERE name LIKE 'A%';       -- Börjar med A",
          "SELECT * FROM products WHERE name LIKE '%phone%'; -- Innehåller phone",
          "SELECT * FROM codes WHERE code LIKE 'A_B';       -- A[ett tecken]B"
        ],
        commonMistakes: '% är inte samma som * i filsystem. _ är för exakt ett tecken.',
        flashcardQ: 'Hur hittar du alla namn som börjar med bokstaven S?',
        flashcardA: "SELECT * FROM users WHERE name LIKE 'S%';",
        quizQ: 'Vad matchar mönstret "A_C"?',
        quizOptions: [
          'ABC, ADC, AEC (exakt ett tecken mellan)',
          'AC, ABC, ABBC (noll eller flera tecken)',
          'Bara exakt "A_C"',
          'Alla som börjar med A och slutar med C'
        ],
        quizCorrect: 0
      },
      {
        syntax: 'IS NULL / IS NOT NULL',
        description: 'Kontrollerar saknade värden',
        explanation: 'NULL representerar ett okänt eller saknat värde. Du kan inte använda = för att jämföra med NULL, utan måste använda IS NULL eller IS NOT NULL.',
        examples: [
          "SELECT * FROM users WHERE phone IS NULL;",
          "SELECT * FROM orders WHERE shipped_date IS NOT NULL;",
          "SELECT * FROM products WHERE description IS NULL;"
        ],
        commonMistakes: 'WHERE column = NULL fungerar INTE. NULL är inte ett värde, det är avsaknad av värde.',
        flashcardQ: 'Hur hittar du rader där kolumnen email saknar värde?',
        flashcardA: 'SELECT * FROM users WHERE email IS NULL;',
        quizQ: 'Varför fungerar inte WHERE column = NULL?',
        quizOptions: [
          'NULL är inte ett värde, det är avsaknad av värde',
          'Man måste skriva NULL med små bokstäver',
          'Det fungerar, men bara i MySQL',
          '= kan bara användas med siffror'
        ],
        quizCorrect: 0
      }
    ]
  },
  {
    name: 'Sortering & Paginering',
    icon: 'sort',
    items: [
      {
        syntax: 'ORDER BY kolumn [ASC|DESC]',
        description: 'Sorterar resultatet',
        explanation: 'ORDER BY sorterar resultatet efter en eller flera kolumner. ASC (ascending) är stigande ordning (standard). DESC (descending) är fallande ordning.',
        examples: [
          'SELECT * FROM products ORDER BY price ASC;',
          'SELECT * FROM products ORDER BY price DESC;',
          'SELECT * FROM users ORDER BY country ASC, name ASC;'
        ],
        flashcardQ: 'Hur sorterar du produkter efter pris, dyrast först?',
        flashcardA: 'SELECT * FROM products ORDER BY price DESC;',
        quizQ: 'Vad är standardordningen om du inte anger ASC eller DESC?',
        quizOptions: [
          'ASC (stigande)',
          'DESC (fallande)',
          'Slumpmässig ordning',
          'Ordningen data lades in'
        ],
        quizCorrect: 0
      },
      {
        syntax: 'LIMIT antal',
        description: 'Begränsar antal returnerade rader',
        explanation: 'LIMIT sätter ett tak på hur många rader som returneras. Användbart för paginering och för att undvika att hämta för mycket data.',
        examples: [
          'SELECT * FROM products ORDER BY price DESC LIMIT 10;',
          'SELECT * FROM orders LIMIT 100;',
          'SELECT * FROM logs ORDER BY created_at DESC LIMIT 1;'
        ],
        flashcardQ: 'Hur hämtar du de 5 dyraste produkterna?',
        flashcardA: 'SELECT * FROM products ORDER BY price DESC LIMIT 5;',
        quizQ: 'Vad returnerar: SELECT * FROM users LIMIT 1?',
        quizOptions: [
          'Exakt en rad (den första i resultatet)',
          'Alla rader utom den första',
          'En slumpmässig rad',
          'Fel - LIMIT kräver ORDER BY'
        ],
        quizCorrect: 0
      },
      {
        syntax: 'OFFSET antal',
        description: 'Hoppar över de första raderna',
        explanation: 'OFFSET hoppar över ett antal rader innan LIMIT börjar räkna. Används för paginering: OFFSET (sida-1)*per_sida.',
        examples: [
          'SELECT * FROM products LIMIT 10 OFFSET 0;   -- Sida 1',
          'SELECT * FROM products LIMIT 10 OFFSET 10;  -- Sida 2',
          'SELECT * FROM products LIMIT 10 OFFSET 20;  -- Sida 3'
        ],
        commonMistakes: 'OFFSET utan LIMIT kan ge oväntade resultat. Använd alltid tillsammans.',
        flashcardQ: 'Hur hämtar du rad 11-20 (sida 2 med 10 per sida)?',
        flashcardA: 'SELECT * FROM products LIMIT 10 OFFSET 10;',
        quizQ: 'För sida 3 med 10 rader per sida, vad är OFFSET?',
        quizOptions: [
          '20 (eftersom sida 1=0, sida 2=10, sida 3=20)',
          '30',
          '3',
          '21'
        ],
        quizCorrect: 0
      }
    ]
  },
  {
    name: 'Aggregatfunktioner',
    icon: 'aggregate',
    items: [
      {
        syntax: 'COUNT(*) / COUNT(kolumn)',
        description: 'Räknar antal rader',
        explanation: 'COUNT(*) räknar alla rader, inklusive NULL. COUNT(kolumn) räknar rader där kolumnen inte är NULL. Ofta kombinerat med GROUP BY.',
        examples: [
          'SELECT COUNT(*) FROM orders;                        -- Alla ordrar',
          'SELECT COUNT(email) FROM users;                     -- Användare med email',
          'SELECT COUNT(DISTINCT category) FROM products;      -- Antal unika kategorier'
        ],
        flashcardQ: 'Hur räknar du antal unika kategorier i products?',
        flashcardA: 'SELECT COUNT(DISTINCT category) FROM products;',
        quizQ: 'Vad är skillnaden mellan COUNT(*) och COUNT(email)?',
        quizOptions: [
          'COUNT(*) räknar alla rader, COUNT(email) hoppar över NULL',
          'Ingen skillnad',
          'COUNT(*) är snabbare',
          'COUNT(email) räknar unika värden'
        ],
        quizCorrect: 0
      },
      {
        syntax: 'SUM(kolumn)',
        description: 'Summerar numeriska värden',
        explanation: 'SUM adderar alla värden i en kolumn. NULL-värden ignoreras. Fungerar endast på numeriska kolumner.',
        examples: [
          'SELECT SUM(quantity) FROM order_items;',
          'SELECT SUM(price * quantity) AS total FROM order_items;',
          'SELECT customer_id, SUM(total) FROM orders GROUP BY customer_id;'
        ],
        flashcardQ: 'Hur beräknar du totalt värde (pris × antal) för alla orderrader?',
        flashcardA: 'SELECT SUM(price * quantity) FROM order_items;',
        quizQ: 'Vad händer om SUM() appliceras på en kolumn med bara NULL-värden?',
        quizOptions: [
          'Returnerar NULL',
          'Returnerar 0',
          'Ger ett felmeddelande',
          'Returnerar antalet rader'
        ],
        quizCorrect: 0
      },
      {
        syntax: 'AVG(kolumn)',
        description: 'Beräknar medelvärde',
        explanation: 'AVG returnerar aritmetiskt medelvärde. NULL-värden exkluderas från både täljare och nämnare.',
        examples: [
          'SELECT AVG(price) FROM products;',
          'SELECT category, AVG(price) FROM products GROUP BY category;',
          'SELECT AVG(rating) FROM reviews WHERE product_id = 5;'
        ],
        flashcardQ: 'Hur beräknar du genomsnittspriset för alla produkter?',
        flashcardA: 'SELECT AVG(price) FROM products;',
        quizQ: 'Om du har värden 10, 20, NULL, 30 - vad ger AVG?',
        quizOptions: [
          '20 (NULL exkluderas, 60/3=20)',
          '15 (60/4=15 med NULL som 0)',
          'NULL',
          'Error'
        ],
        quizCorrect: 0
      },
      {
        syntax: 'MIN(kolumn) / MAX(kolumn)',
        description: 'Lägsta respektive högsta värde',
        explanation: 'MIN och MAX hittar extremvärden. Fungerar på tal, datum och text (alfabetisk ordning för text).',
        examples: [
          'SELECT MIN(price), MAX(price) FROM products;',
          'SELECT MIN(order_date), MAX(order_date) FROM orders;',
          'SELECT category, MAX(stock) FROM products GROUP BY category;'
        ],
        flashcardQ: 'Hur hittar du det högsta och lägsta priset i products?',
        flashcardA: 'SELECT MIN(price), MAX(price) FROM products;',
        quizQ: 'Fungerar MIN/MAX på text?',
        quizOptions: [
          'Ja, sorterar alfabetiskt (A är min, Ö är max)',
          'Nej, endast numeriska kolumner',
          'Ja, men baserat på textlängd',
          'Endast i PostgreSQL'
        ],
        quizCorrect: 0
      },
      {
        syntax: 'GROUP BY kolumn',
        description: 'Grupperar rader för aggregering',
        explanation: 'GROUP BY samlar rader med samma värde i en kolumn. Aggregatfunktioner (COUNT, SUM, etc.) beräknas sedan per grupp istället för hela tabellen.',
        examples: [
          'SELECT category, COUNT(*) FROM products GROUP BY category;',
          'SELECT customer_id, SUM(total) FROM orders GROUP BY customer_id;',
          'SELECT strftime("%Y", order_date), COUNT(*) FROM orders GROUP BY strftime("%Y", order_date);'
        ],
        commonMistakes: 'Alla kolumner i SELECT som inte är aggregat måste finnas i GROUP BY.',
        flashcardQ: 'Hur räknar du antal produkter per kategori?',
        flashcardA: 'SELECT category, COUNT(*) FROM products GROUP BY category;',
        quizQ: 'Vad händer om du SELECT:ar en kolumn som inte är i GROUP BY eller aggregat?',
        quizOptions: [
          'Fel i de flesta databaser (undefined behavior)',
          'Den första raden i gruppen väljs',
          'Alla värden konkateneras',
          'NULL returneras'
        ],
        quizCorrect: 0
      },
      {
        syntax: 'HAVING villkor',
        description: 'Filtrerar grupper efter aggregering',
        explanation: 'HAVING filtrerar grupper baserat på aggregatvärden. WHERE filtrerar före gruppering, HAVING filtrerar efter.',
        examples: [
          'SELECT category, COUNT(*) FROM products GROUP BY category HAVING COUNT(*) > 5;',
          'SELECT customer_id, SUM(total) FROM orders GROUP BY customer_id HAVING SUM(total) > 1000;',
          'SELECT city, AVG(salary) FROM employees GROUP BY city HAVING AVG(salary) > 50000;'
        ],
        commonMistakes: 'WHERE kan inte använda aggregat. Använd HAVING för att filtrera på COUNT, SUM, etc.',
        flashcardQ: 'Hur visar du kategorier med fler än 10 produkter?',
        flashcardA: 'SELECT category, COUNT(*) FROM products GROUP BY category HAVING COUNT(*) > 10;',
        quizQ: 'Vad är skillnaden mellan WHERE och HAVING?',
        quizOptions: [
          'WHERE filtrerar före gruppering, HAVING efter',
          'Ingen skillnad, de är utbytbara',
          'HAVING är snabbare',
          'WHERE fungerar bara med text'
        ],
        quizCorrect: 0
      }
    ]
  },
  {
    name: 'JOINs',
    icon: 'join',
    items: [
      {
        syntax: 'INNER JOIN',
        description: 'Endast matchande rader från båda tabeller',
        explanation: 'INNER JOIN returnerar rader där det finns matchning i båda tabellerna. Rader utan matchning exkluderas. Detta är den vanligaste typen av JOIN.',
        examples: [
          'SELECT orders.id, customers.name FROM orders INNER JOIN customers ON orders.customer_id = customers.id;',
          'SELECT products.name, categories.name FROM products INNER JOIN categories ON products.category_id = categories.id;'
        ],
        flashcardQ: 'Vad händer med rader som inte har matchning vid INNER JOIN?',
        flashcardA: 'De exkluderas helt från resultatet.',
        quizQ: 'Om tabell A har 100 rader och tabell B har 50 rader, vad begränsar INNER JOIN-resultatet vid 1:1-relation?',
        quizOptions: [
          'Antal matchande rader (max 50 vid 1:1)',
          'Alltid 100 rader',
          'Alltid 150 rader',
          'Alltid 5000 rader (kartesisk produkt)'
        ],
        quizCorrect: 0
      },
      {
        syntax: 'LEFT JOIN',
        description: 'Alla från vänster tabell + matchande från höger',
        explanation: 'LEFT JOIN behåller alla rader från vänster tabell. Om ingen matchning finns i höger tabell fylls kolumnerna med NULL.',
        examples: [
          'SELECT customers.name, orders.id FROM customers LEFT JOIN orders ON customers.id = orders.customer_id;',
          'SELECT products.name, order_items.quantity FROM products LEFT JOIN order_items ON products.id = order_items.product_id;'
        ],
        commonMistakes: 'Tabellordningen spelar roll! A LEFT JOIN B ≠ B LEFT JOIN A',
        flashcardQ: 'Hur hittar du kunder som inte har lagt några ordrar?',
        flashcardA: 'SELECT customers.* FROM customers LEFT JOIN orders ON customers.id = orders.customer_id WHERE orders.id IS NULL;',
        quizQ: 'Vid LEFT JOIN, vad fylls höger tabells kolumner med om ingen matchning finns?',
        quizOptions: [
          'NULL',
          '0 eller tom sträng',
          'Raden exkluderas',
          'Error'
        ],
        quizCorrect: 0
      },
      {
        syntax: 'RIGHT JOIN',
        description: 'Alla från höger tabell + matchande från vänster',
        explanation: 'RIGHT JOIN är motsatsen till LEFT JOIN. Alla rader från höger tabell behålls. Kan alltid skrivas om som LEFT JOIN genom att byta tabellordning.',
        examples: [
          'SELECT orders.id, customers.name FROM orders RIGHT JOIN customers ON orders.customer_id = customers.id;',
          '-- Samma som: SELECT orders.id, customers.name FROM customers LEFT JOIN orders ON customers.id = orders.customer_id;'
        ],
        flashcardQ: 'Hur skriver du om A RIGHT JOIN B som en LEFT JOIN?',
        flashcardA: 'B LEFT JOIN A (byt ordning på tabellerna)',
        quizQ: 'Varför används RIGHT JOIN sällan i praktiken?',
        quizOptions: [
          'Kan alltid skrivas som LEFT JOIN med omvänd tabellordning',
          'Det är långsammare',
          'Stöds inte av alla databaser',
          'Ger oftast fel resultat'
        ],
        quizCorrect: 0
      },
      {
        syntax: 'FULL OUTER JOIN',
        description: 'Alla rader från båda tabeller',
        explanation: 'FULL OUTER JOIN kombinerar LEFT och RIGHT JOIN. Alla rader från båda tabeller inkluderas. NULL fylls i där matchning saknas. SQLite stöder inte detta direkt.',
        examples: [
          'SELECT * FROM employees FULL OUTER JOIN departments ON employees.dept_id = departments.id;',
          '-- SQLite-alternativ: LEFT JOIN UNION RIGHT JOIN'
        ],
        flashcardQ: 'Hur simulerar du FULL OUTER JOIN i SQLite?',
        flashcardA: 'Kombinera LEFT JOIN och RIGHT JOIN med UNION.',
        quizQ: 'Stöder SQLite FULL OUTER JOIN?',
        quizOptions: [
          'Nej, måste simuleras med UNION av LEFT och RIGHT JOIN',
          'Ja, fullt stöd',
          'Endast med extension',
          'Ja, men det heter FULL JOIN'
        ],
        quizCorrect: 0
      },
      {
        syntax: 'Self JOIN',
        description: 'Tabell joinas med sig själv',
        explanation: 'Self JOIN används när du behöver jämföra rader inom samma tabell. Kräver tabellalias för att skilja på de två "kopiorna".',
        examples: [
          'SELECT e1.name AS employee, e2.name AS manager FROM employees e1 JOIN employees e2 ON e1.manager_id = e2.id;',
          'SELECT c1.name, c2.name FROM customers c1 JOIN customers c2 ON c1.city = c2.city AND c1.id < c2.id;'
        ],
        flashcardQ: 'När behöver du self JOIN?',
        flashcardA: 'När du jämför rader inom samma tabell, t.ex. anställd → chef relationer.',
        quizQ: 'Varför behövs tabellalias vid self JOIN?',
        quizOptions: [
          'För att skilja på de två referenserna till samma tabell',
          'Det är bara konvention',
          'För bättre prestanda',
          'Self JOIN fungerar utan alias'
        ],
        quizCorrect: 0
      }
    ]
  },
  {
    name: 'Subqueries',
    icon: '🔄',
    items: [
      {
        syntax: 'Subquery i WHERE',
        description: 'Använder en frågas resultat som filter',
        explanation: 'En subquery är en SELECT inne i en annan query. I WHERE används den för att filtrera mot ett dynamiskt beräknat värde.',
        examples: [
          'SELECT * FROM products WHERE price > (SELECT AVG(price) FROM products);',
          "SELECT * FROM customers WHERE id IN (SELECT customer_id FROM orders WHERE total > 1000);",
          "SELECT * FROM products WHERE category_id = (SELECT id FROM categories WHERE name = 'Electronics');"
        ],
        flashcardQ: 'Hur hittar du produkter som kostar mer än genomsnittet?',
        flashcardA: 'SELECT * FROM products WHERE price > (SELECT AVG(price) FROM products);',
        quizQ: 'När måste subquery returnera exakt ett värde?',
        quizOptions: [
          'Vid jämförelse med = eller > (skalär subquery)',
          'Alltid',
          'Aldrig, kan alltid returnera flera',
          'Endast vid EXISTS'
        ],
        quizCorrect: 0
      },
      {
        syntax: 'EXISTS / NOT EXISTS',
        description: 'Testar om subquery returnerar några rader',
        explanation: 'EXISTS returnerar TRUE om subqueryn ger minst en rad, annars FALSE. Ofta snabbare än IN för stora dataset. Korrelerad subquery kollar per rad i yttre query.',
        examples: [
          'SELECT * FROM customers c WHERE EXISTS (SELECT 1 FROM orders WHERE customer_id = c.id);',
          'SELECT * FROM products p WHERE NOT EXISTS (SELECT 1 FROM order_items WHERE product_id = p.id);'
        ],
        flashcardQ: 'Hur hittar du kunder som har lagt minst en order?',
        flashcardA: 'SELECT * FROM customers c WHERE EXISTS (SELECT 1 FROM orders WHERE customer_id = c.id);',
        quizQ: 'Varför skriver man ofta SELECT 1 i EXISTS-subquery?',
        quizOptions: [
          'Kolumnerna spelar ingen roll, bara om rader finns',
          'Det är snabbare än SELECT *',
          'Det krävs av SQL-standarden',
          'För att undvika NULL-problem'
        ],
        quizCorrect: 0
      },
      {
        syntax: 'Korrelerad subquery',
        description: 'Subquery som refererar till yttre query',
        explanation: 'En korrelerad subquery kör en gång per rad i yttre query. Den refererar till kolumner från yttre query. Kan vara långsam på stora dataset.',
        examples: [
          'SELECT * FROM products p WHERE price > (SELECT AVG(price) FROM products WHERE category = p.category);',
          'SELECT name, (SELECT COUNT(*) FROM orders WHERE customer_id = c.id) AS order_count FROM customers c;'
        ],
        flashcardQ: 'Vad skiljer korrelerad subquery från vanlig subquery?',
        flashcardA: 'Korrelerad refererar till yttre query och körs en gång per rad.',
        quizQ: 'Hur många gånger körs en korrelerad subquery om yttre query har 100 rader?',
        quizOptions: [
          '100 gånger (en gång per rad)',
          '1 gång',
          'Beror på index',
          'Optimeras alltid till 1 gång'
        ],
        quizCorrect: 0
      }
    ]
  },
  {
    name: 'Datatyper',
    icon: 'subquery',
    items: [
      {
        syntax: 'INTEGER / INT',
        description: 'Heltal utan decimaler',
        explanation: 'INTEGER lagrar heltal. Storlek varierar: TINYINT (1 byte), SMALLINT (2), INT (4), BIGINT (8). SQLite har bara INTEGER som anpassar sig automatiskt.',
        examples: [
          'CREATE TABLE users (id INTEGER PRIMARY KEY, age INTEGER);',
          'CREATE TABLE products (id INT, quantity SMALLINT, views BIGINT);'
        ],
        flashcardQ: 'Vilken datatyp passar för ett användar-ID?',
        flashcardA: 'INTEGER eller INT (BIGINT för mycket stora system)',
        quizQ: 'Hur många bytes använder INT vanligtvis?',
        quizOptions: [
          '4 bytes (ca ±2 miljarder)',
          '2 bytes',
          '8 bytes',
          'Varierar med värdet'
        ],
        quizCorrect: 0
      },
      {
        syntax: 'DECIMAL(p,s) / NUMERIC',
        description: 'Exakta decimaltal',
        explanation: 'DECIMAL lagrar tal med exakt precision. p = totalt antal siffror, s = decimaler. Använd för pengar och värden där avrundningsfel är oacceptabla.',
        examples: [
          'CREATE TABLE products (price DECIMAL(10,2));  -- Max 99999999.99',
          'CREATE TABLE accounts (balance DECIMAL(15,2));',
          'CREATE TABLE measurements (value NUMERIC(8,4));'
        ],
        commonMistakes: 'Använd aldrig FLOAT för pengar! Avrundningsfel kan ackumuleras.',
        flashcardQ: 'Vilken datatyp ska du använda för pengar?',
        flashcardA: 'DECIMAL(precision, scale), t.ex. DECIMAL(10,2) för belopp upp till 99999999.99',
        quizQ: 'Vad betyder DECIMAL(10,2)?',
        quizOptions: [
          '10 siffror totalt, varav 2 decimaler',
          '10 heltal, 2 decimaler separat',
          'Max värde 10.2',
          '10 bytes med 2 bytes för decimaler'
        ],
        quizCorrect: 0
      },
      {
        syntax: 'FLOAT / REAL / DOUBLE',
        description: 'Flyttal med approximativ precision',
        explanation: 'FLOAT lagrar decimaltal med flyttalsprecision. Snabbt men kan ha avrundningsfel. Bra för vetenskapliga beräkningar där liten avvikelse accepteras.',
        examples: [
          'CREATE TABLE sensors (temperature FLOAT, humidity REAL);',
          'CREATE TABLE coordinates (latitude DOUBLE, longitude DOUBLE);'
        ],
        commonMistakes: '0.1 + 0.2 kan bli 0.30000000000000004 med FLOAT. Aldrig för pengar!',
        flashcardQ: 'Varför ska du undvika FLOAT för priser?',
        flashcardA: 'FLOAT har avrundningsfel som kan ackumuleras, t.ex. 0.1+0.2 ≠ 0.3 exakt.',
        quizQ: 'När är FLOAT lämpligt?',
        quizOptions: [
          'Vetenskapliga mätningar där liten avvikelse accepteras',
          'Prisberäkningar',
          'Banktransaktioner',
          'Lagersaldo'
        ],
        quizCorrect: 0
      },
      {
        syntax: 'VARCHAR(n) / TEXT',
        description: 'Textsträngar',
        explanation: 'VARCHAR(n) har maxlängd n. TEXT har ingen explicit gräns (databasberoende). VARCHAR kan vara snabbare för korta strängar. SQLite behandlar alla som TEXT.',
        examples: [
          'CREATE TABLE users (name VARCHAR(100), email VARCHAR(255));',
          'CREATE TABLE posts (title VARCHAR(200), content TEXT);',
          'CREATE TABLE codes (code CHAR(5));  -- Alltid exakt 5 tecken'
        ],
        flashcardQ: 'Vad är skillnaden mellan VARCHAR(100) och TEXT?',
        flashcardA: 'VARCHAR(100) begränsar till max 100 tecken. TEXT har ingen explicit gräns.',
        quizQ: 'Vad händer om du infogar 150 tecken i VARCHAR(100)?',
        quizOptions: [
          'Fel kastas (de flesta databaser) eller trunkering',
          'Texten sparas ändå',
          'Kolumnen utökas automatiskt',
          'NULL sparas istället'
        ],
        quizCorrect: 0
      },
      {
        syntax: 'DATE / TIME / DATETIME / TIMESTAMP',
        description: 'Datum och tid',
        explanation: 'DATE lagrar datum (YYYY-MM-DD). TIME lagrar tid (HH:MM:SS). DATETIME/TIMESTAMP kombinerar båda. TIMESTAMP kan automatiskt uppdateras.',
        examples: [
          'CREATE TABLE orders (order_date DATE, order_time TIME);',
          'CREATE TABLE events (start_at DATETIME, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);',
          "INSERT INTO orders (order_date) VALUES ('2024-06-15');"
        ],
        flashcardQ: 'Vilken datatyp passar för "när skapades denna rad"?',
        flashcardA: 'TIMESTAMP med DEFAULT CURRENT_TIMESTAMP för automatisk ifyllning.',
        quizQ: 'Vad är skillnaden mellan DATETIME och TIMESTAMP i MySQL?',
        quizOptions: [
          'TIMESTAMP konverterar till UTC, DATETIME sparar som det är',
          'Ingen skillnad',
          'TIMESTAMP har högre precision',
          'DATETIME stöder inte tidszoner'
        ],
        quizCorrect: 0
      },
      {
        syntax: 'BOOLEAN / BOOL',
        description: 'Sant eller falskt',
        explanation: 'BOOLEAN lagrar TRUE/FALSE. SQLite har ingen riktig BOOLEAN, använder INTEGER (0=false, 1=true). MySQL har TINYINT(1) som BOOL.',
        examples: [
          'CREATE TABLE users (active BOOLEAN DEFAULT TRUE);',
          'CREATE TABLE products (is_available BOOL);',
          'SELECT * FROM users WHERE active = TRUE;'
        ],
        flashcardQ: 'Hur representeras BOOLEAN i SQLite?',
        flashcardA: 'Som INTEGER där 0 = false och 1 = true.',
        quizQ: 'Vilken är SQLites inbyggda BOOLEAN-typ?',
        quizOptions: [
          'SQLite har ingen, använder INTEGER (0/1)',
          'BOOL',
          'BOOLEAN',
          'BIT'
        ],
        quizCorrect: 0
      }
    ]
  },
  {
    name: 'Constraints',
    icon: 'constraint',
    items: [
      {
        syntax: 'PRIMARY KEY',
        description: 'Unik identifierare för varje rad',
        explanation: 'PRIMARY KEY identifierar varje rad unikt. Kan inte vara NULL och måste vara unik. En tabell har exakt en PRIMARY KEY, som kan bestå av en eller flera kolumner.',
        examples: [
          'CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT);',
          'CREATE TABLE order_items (order_id INT, product_id INT, PRIMARY KEY (order_id, product_id));'
        ],
        flashcardQ: 'Kan en PRIMARY KEY vara NULL?',
        flashcardA: 'Nej, PRIMARY KEY är alltid NOT NULL och UNIQUE automatiskt.',
        quizQ: 'Vad kallas en PRIMARY KEY som består av flera kolumner?',
        quizOptions: [
          'Composite key (sammansatt nyckel)',
          'Foreign key',
          'Candidate key',
          'Super key'
        ],
        quizCorrect: 0
      },
      {
        syntax: 'FOREIGN KEY',
        description: 'Referens till annan tabell',
        explanation: 'FOREIGN KEY skapar en relation mellan tabeller. Värdet måste finnas i den refererade tabellens PRIMARY KEY (eller UNIQUE). Upprätthåller referentiell integritet.',
        examples: [
          'CREATE TABLE orders (id INTEGER PRIMARY KEY, customer_id INTEGER REFERENCES customers(id));',
          'CREATE TABLE order_items (product_id INTEGER, FOREIGN KEY (product_id) REFERENCES products(id));'
        ],
        commonMistakes: 'SQLite kräver PRAGMA foreign_keys = ON för att aktivera FK-kontroller.',
        flashcardQ: 'Vad händer om du försöker sätta in en FOREIGN KEY som inte finns i refererad tabell?',
        flashcardA: 'Databasen ger fel och INSERT/UPDATE misslyckas (om FK är aktiverat).',
        quizQ: 'Hur aktiverar du FOREIGN KEY-kontroller i SQLite?',
        quizOptions: [
          'PRAGMA foreign_keys = ON;',
          'SET FOREIGN_KEYS = TRUE;',
          'De är alltid aktiva',
          'ALTER DATABASE ENABLE FOREIGN_KEYS;'
        ],
        quizCorrect: 0
      },
      {
        syntax: 'ON DELETE / ON UPDATE',
        description: 'Beteende vid radering/uppdatering av refererad rad',
        explanation: 'Definierar vad som händer med beroende rader. CASCADE = radera/uppdatera automatiskt. SET NULL = sätt till NULL. RESTRICT/NO ACTION = blockera operationen.',
        examples: [
          'FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE',
          'FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL',
          'FOREIGN KEY (dept_id) REFERENCES departments(id) ON DELETE RESTRICT'
        ],
        flashcardQ: 'Vad gör ON DELETE CASCADE?',
        flashcardA: 'Raderar automatiskt alla beroende rader när den refererade raden raderas.',
        quizQ: 'Om en produkt raderas och order_items har ON DELETE SET NULL på product_id, vad händer?',
        quizOptions: [
          'product_id sätts till NULL i berörda order_items',
          'Order_items raderas också',
          'Raderingen blockeras',
          'Error kastas'
        ],
        quizCorrect: 0
      },
      {
        syntax: 'UNIQUE',
        description: 'Kolumnvärdet måste vara unikt',
        explanation: 'UNIQUE garanterar att inga dubbletter finns. Skillnad från PRIMARY KEY: kan ha flera UNIQUE per tabell, och UNIQUE tillåter (en) NULL.',
        examples: [
          'CREATE TABLE users (id INTEGER PRIMARY KEY, email TEXT UNIQUE);',
          'CREATE TABLE products (sku VARCHAR(50) UNIQUE, barcode VARCHAR(20) UNIQUE);'
        ],
        flashcardQ: 'Kan en UNIQUE-kolumn innehålla NULL?',
        flashcardA: 'Ja, UNIQUE tillåter en NULL (eller flera, databasberoende).',
        quizQ: 'Hur många UNIQUE constraints kan en tabell ha?',
        quizOptions: [
          'Obegränsat antal',
          'Endast en',
          'Max 3',
          'Lika många som kolumner'
        ],
        quizCorrect: 0
      },
      {
        syntax: 'NOT NULL',
        description: 'Kolumnen måste ha ett värde',
        explanation: 'NOT NULL förhindrar NULL-värden. Varje INSERT/UPDATE måste ange ett värde för kolumnen (eller ha DEFAULT).',
        examples: [
          'CREATE TABLE users (id INTEGER PRIMARY KEY, email TEXT NOT NULL);',
          'CREATE TABLE products (name VARCHAR(100) NOT NULL, price DECIMAL(10,2) NOT NULL);'
        ],
        flashcardQ: 'Vad händer om du försöker INSERT:a NULL i en NOT NULL-kolumn?',
        flashcardA: 'Databasen ger fel och INSERT misslyckas.',
        quizQ: 'Kan PRIMARY KEY vara NULL?',
        quizOptions: [
          'Nej, PRIMARY KEY är implicit NOT NULL',
          'Ja, om inte NOT NULL anges explicit',
          'Endast i SQLite',
          'Endast den första kolumnen'
        ],
        quizCorrect: 0
      },
      {
        syntax: 'DEFAULT värde',
        description: 'Standardvärde om inget anges',
        explanation: 'DEFAULT används när INSERT inte anger värde för kolumnen. Kan vara konstant, funktion som CURRENT_TIMESTAMP, eller uttryck.',
        examples: [
          'CREATE TABLE users (created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);',
          'CREATE TABLE products (stock INTEGER DEFAULT 0, active BOOLEAN DEFAULT TRUE);',
          "CREATE TABLE orders (status VARCHAR(20) DEFAULT 'pending');"
        ],
        flashcardQ: 'Hur sätter du automatisk tidsstämpel vid INSERT?',
        flashcardA: 'DEFAULT CURRENT_TIMESTAMP på TIMESTAMP/DATETIME-kolumn.',
        quizQ: 'Vad händer med DEFAULT om du explicit INSERT:ar NULL?',
        quizOptions: [
          'NULL sparas (DEFAULT används bara om kolumn utelämnas)',
          'DEFAULT-värdet används ändå',
          'Error kastas',
          'Beror på databasen'
        ],
        quizCorrect: 0
      },
      {
        syntax: 'CHECK (villkor)',
        description: 'Validerar värden mot villkor',
        explanation: 'CHECK säkerställer att data uppfyller ett villkor. INSERT/UPDATE misslyckas om villkoret är falskt.',
        examples: [
          'CREATE TABLE products (price DECIMAL(10,2) CHECK (price >= 0));',
          'CREATE TABLE users (age INTEGER CHECK (age >= 0 AND age <= 150));',
          "CREATE TABLE orders (status TEXT CHECK (status IN ('pending', 'shipped', 'delivered')));"
        ],
        flashcardQ: 'Hur säkerställer du att pris aldrig är negativt?',
        flashcardA: 'CHECK (price >= 0) på kolumndefinitionen.',
        quizQ: 'När utvärderas CHECK constraint?',
        quizOptions: [
          'Vid INSERT och UPDATE',
          'Endast vid INSERT',
          'Endast vid SELECT',
          'Vid skapande av tabell'
        ],
        quizCorrect: 0
      }
    ]
  },
  {
    name: 'Index & Prestanda',
    icon: 'index',
    items: [
      {
        syntax: 'CREATE INDEX',
        description: 'Snabbar upp sökning på kolumn',
        explanation: 'Index är en datastruktur som snabbar upp SELECT med WHERE/JOIN på indexerad kolumn. Trade-off: snabbare läsning, långsammare skrivning, mer lagring.',
        examples: [
          'CREATE INDEX idx_users_email ON users(email);',
          'CREATE INDEX idx_orders_customer ON orders(customer_id);',
          'CREATE INDEX idx_products_category_price ON products(category, price);'
        ],
        flashcardQ: 'Varför skapar man index?',
        flashcardA: 'För att snabba upp SELECT-frågor som filtrerar/sorterar på den kolumnen.',
        quizQ: 'Vad är nackdelen med för många index?',
        quizOptions: [
          'Långsammare INSERT/UPDATE/DELETE och mer lagring',
          'Långsammare SELECT',
          'Databasen kan krascha',
          'Index kan bara finnas på PRIMARY KEY'
        ],
        quizCorrect: 0
      },
      {
        syntax: 'UNIQUE INDEX',
        description: 'Index som även garanterar unikhet',
        explanation: 'UNIQUE INDEX kombinerar snabb sökning med unikhetskontroll. Skapas automatiskt för PRIMARY KEY och UNIQUE constraints.',
        examples: [
          'CREATE UNIQUE INDEX idx_users_email ON users(email);',
          'CREATE UNIQUE INDEX idx_products_sku ON products(sku);'
        ],
        flashcardQ: 'Vad är skillnaden mellan INDEX och UNIQUE INDEX?',
        flashcardA: 'UNIQUE INDEX tillåter inte dubbletter, vanligt INDEX gör det.',
        quizQ: 'Skapas index automatiskt för PRIMARY KEY?',
        quizOptions: [
          'Ja, ett unikt index skapas automatiskt',
          'Nej, måste skapas manuellt',
          'Endast i MySQL',
          'Endast om tabellen är stor'
        ],
        quizCorrect: 0
      },
      {
        syntax: 'Composite Index',
        description: 'Index på flera kolumner',
        explanation: 'Composite index indexerar flera kolumner tillsammans. Ordningen spelar roll! Index (a, b) hjälper queries på a, eller a+b, men INTE bara b.',
        examples: [
          'CREATE INDEX idx_orders_status_date ON orders(status, order_date);',
          '-- Hjälper: WHERE status = "shipped" AND order_date > "2024-01-01"',
          '-- Hjälper: WHERE status = "shipped"',
          '-- Hjälper INTE: WHERE order_date > "2024-01-01" (utan status)'
        ],
        flashcardQ: 'Om du har INDEX (a, b), hjälper det WHERE b = 5?',
        flashcardA: 'Nej, composite index kräver att vänstra kolumner används först.',
        quizQ: 'Med INDEX (country, city), vilken query får INTE hjälp av indexet?',
        quizOptions: [
          "WHERE city = 'Stockholm' (saknar country)",
          "WHERE country = 'Sweden'",
          "WHERE country = 'Sweden' AND city = 'Stockholm'",
          'ORDER BY country, city'
        ],
        quizCorrect: 0
      },
      {
        syntax: 'EXPLAIN / EXPLAIN ANALYZE',
        description: 'Visar hur databasen kör frågan',
        explanation: 'EXPLAIN visar query execution plan utan att köra frågan. EXPLAIN ANALYZE kör frågan och visar faktisk prestanda. Användbart för optimering.',
        examples: [
          'EXPLAIN SELECT * FROM users WHERE email = "test@test.com";',
          'EXPLAIN QUERY PLAN SELECT * FROM products WHERE category = "Electronics";',
          'EXPLAIN ANALYZE SELECT * FROM orders JOIN customers ON orders.customer_id = customers.id;'
        ],
        flashcardQ: 'Hur ser du om en query använder index?',
        flashcardA: 'EXPLAIN visar query plan inklusive vilka index som används.',
        quizQ: 'Vad betyder "SCAN" i SQLites EXPLAIN output?',
        quizOptions: [
          'Full table scan - läser alla rader (långsamt)',
          'Index scan - använder index (snabbt)',
          'Temporär tabell skapas',
          'Query är optimerad'
        ],
        quizCorrect: 0
      }
    ]
  },
  {
    name: 'DDL - Tabeller',
    icon: 'ddl',
    items: [
      {
        syntax: 'CREATE TABLE',
        description: 'Skapar en ny tabell',
        explanation: 'CREATE TABLE definierar tabellstruktur med kolumner, datatyper och constraints. Tabellnamn bör vara plural och beskrivande.',
        examples: [
          `CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  name VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`,
          `CREATE TABLE orders (
  id INTEGER PRIMARY KEY,
  customer_id INTEGER NOT NULL REFERENCES customers(id),
  total DECIMAL(10,2) NOT NULL,
  status VARCHAR(20) DEFAULT 'pending'
);`
        ],
        flashcardQ: 'Hur skapar du en tabell med auto-increment ID i SQLite?',
        flashcardA: 'INTEGER PRIMARY KEY ger automatiskt auto-increment i SQLite.',
        quizQ: 'Vad krävs minimum för CREATE TABLE?',
        quizOptions: [
          'Tabellnamn och minst en kolumn med datatyp',
          'Tabellnamn, PRIMARY KEY och minst en kolumn',
          'Bara tabellnamn',
          'Tabellnamn och minst två kolumner'
        ],
        quizCorrect: 0
      },
      {
        syntax: 'ALTER TABLE',
        description: 'Ändrar befintlig tabellstruktur',
        explanation: 'ALTER TABLE modifierar en tabell: lägg till/ta bort kolumner, ändra constraints. SQLite har begränsat stöd - ofta måste du återskapa tabellen.',
        examples: [
          'ALTER TABLE users ADD COLUMN phone VARCHAR(20);',
          'ALTER TABLE products DROP COLUMN old_price;',
          'ALTER TABLE users ALTER COLUMN name VARCHAR(200);',
          'ALTER TABLE orders ADD CONSTRAINT fk_customer FOREIGN KEY (customer_id) REFERENCES customers(id);'
        ],
        commonMistakes: 'SQLite stöder bara ADD COLUMN. För andra ändringar: skapa ny tabell, kopiera data, döp om.',
        flashcardQ: 'Kan du ta bort en kolumn med ALTER TABLE i SQLite?',
        flashcardA: 'Nej, SQLite stöder bara ADD COLUMN. Måste återskapa tabellen.',
        quizQ: 'Hur lägger du till en kolumn "age" i tabellen "users"?',
        quizOptions: [
          'ALTER TABLE users ADD COLUMN age INTEGER;',
          'UPDATE TABLE users ADD age INTEGER;',
          'MODIFY TABLE users ADD age INTEGER;',
          'INSERT COLUMN age INTO users;'
        ],
        quizCorrect: 0
      },
      {
        syntax: 'DROP TABLE',
        description: 'Tar bort en tabell helt',
        explanation: 'DROP TABLE raderar tabellen och all data permanent. IF EXISTS förhindrar fel om tabellen inte finns. CASCADE kan behövas om andra tabeller refererar till den.',
        examples: [
          'DROP TABLE users;',
          'DROP TABLE IF EXISTS temp_orders;',
          'DROP TABLE orders CASCADE;  -- Raderar även beroende objekt'
        ],
        commonMistakes: 'DROP är permanent! Ingen UNDO. Testa alltid i utvecklingsmiljö först.',
        flashcardQ: 'Hur undviker du fel om tabellen inte finns vid DROP?',
        flashcardA: 'DROP TABLE IF EXISTS tabellnamn;',
        quizQ: 'Vad gör DROP TABLE CASCADE?',
        quizOptions: [
          'Raderar tabellen och alla objekt som beror på den',
          'Raderar bara tomma tabeller',
          'Raderar alla tabeller i databasen',
          'Raderar tabellen men behåller data'
        ],
        quizCorrect: 0
      }
    ]
  },
  {
    name: 'DML - Data',
    icon: 'dml',
    items: [
      {
        syntax: 'INSERT INTO',
        description: 'Lägger till nya rader',
        explanation: 'INSERT lägger till en eller flera rader. Du kan ange vilka kolumner som ska fyllas - resten får DEFAULT eller NULL.',
        examples: [
          "INSERT INTO users (name, email) VALUES ('Anna', 'anna@test.se');",
          "INSERT INTO users (name, email) VALUES ('Erik', 'erik@test.se'), ('Sara', 'sara@test.se');",
          "INSERT INTO orders (customer_id, total) SELECT id, 0 FROM customers WHERE status = 'new';"
        ],
        flashcardQ: 'Hur infogar du flera rader med en INSERT?',
        flashcardA: 'INSERT INTO tabell (kolumner) VALUES (rad1), (rad2), (rad3);',
        quizQ: 'Vad händer om du inte anger en kolumn med NOT NULL och utan DEFAULT?',
        quizOptions: [
          'INSERT misslyckas med fel',
          'NULL sätts automatiskt',
          '0 eller tom sträng sätts',
          'Kolumnen hoppas över'
        ],
        quizCorrect: 0
      },
      {
        syntax: 'UPDATE',
        description: 'Ändrar befintliga rader',
        explanation: 'UPDATE modifierar data i befintliga rader. WHERE är kritiskt - utan det uppdateras ALLA rader! Testa alltid med SELECT först.',
        examples: [
          "UPDATE users SET email = 'ny@email.se' WHERE id = 1;",
          "UPDATE products SET price = price * 1.1;  -- OBS: alla rader!",
          "UPDATE orders SET status = 'shipped', shipped_at = CURRENT_TIMESTAMP WHERE id = 5;"
        ],
        commonMistakes: 'UPDATE utan WHERE ändrar ALLA rader. Kör SELECT med samma WHERE först för att verifiera.',
        flashcardQ: 'Hur uppdaterar du flera kolumner samtidigt?',
        flashcardA: "UPDATE tabell SET kolumn1 = värde1, kolumn2 = värde2 WHERE villkor;",
        quizQ: 'Vad händer vid UPDATE utan WHERE?',
        quizOptions: [
          'ALLA rader i tabellen uppdateras',
          'Ingenting händer',
          'Fel kastas',
          'Första raden uppdateras'
        ],
        quizCorrect: 0
      },
      {
        syntax: 'DELETE FROM',
        description: 'Tar bort rader',
        explanation: 'DELETE raderar rader som matchar WHERE. Utan WHERE raderas ALLA rader. Använd TRUNCATE för att snabbt tömma hela tabellen.',
        examples: [
          "DELETE FROM users WHERE id = 1;",
          "DELETE FROM orders WHERE status = 'cancelled' AND order_date < '2024-01-01';",
          "DELETE FROM logs;  -- OBS: raderar allt!"
        ],
        commonMistakes: 'DELETE utan WHERE tömmer hela tabellen. TRUNCATE är snabbare för att tömma, men kan inte filtreras.',
        flashcardQ: 'Hur raderar du alla inaktiva användare?',
        flashcardA: 'DELETE FROM users WHERE active = FALSE;',
        quizQ: 'Vad är skillnaden mellan DELETE och TRUNCATE?',
        quizOptions: [
          'DELETE kan ha WHERE och loggas, TRUNCATE tömmer allt snabbt',
          'Ingen skillnad',
          'TRUNCATE är säkrare',
          'DELETE är snabbare'
        ],
        quizCorrect: 0
      }
    ]
  },
  {
    name: 'SQLite-specifikt',
    icon: '🪶',
    items: [
      {
        syntax: 'INTEGER PRIMARY KEY',
        description: 'Auto-increment i SQLite',
        explanation: 'I SQLite ger INTEGER PRIMARY KEY automatisk auto-increment. AUTOINCREMENT nyckelordet garanterar att ID aldrig återanvänds, men är långsammare.',
        examples: [
          'CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT);  -- Auto-increment',
          'CREATE TABLE logs (id INTEGER PRIMARY KEY AUTOINCREMENT, message TEXT);  -- Garanterat unik'
        ],
        flashcardQ: 'Vad är skillnaden mellan INTEGER PRIMARY KEY och AUTOINCREMENT i SQLite?',
        flashcardA: 'AUTOINCREMENT garanterar att raderade IDs aldrig återanvänds, men är långsammare.',
        quizQ: 'I SQLite, vad ger automatisk ID-generering?',
        quizOptions: [
          'INTEGER PRIMARY KEY',
          'INT AUTO_INCREMENT',
          'SERIAL',
          'ID IDENTITY'
        ],
        quizCorrect: 0
      },
      {
        syntax: 'PRAGMA',
        description: 'SQLite-konfiguration och metadata',
        explanation: 'PRAGMA är SQLite-specifikt för att konfigurera databasen och hämta metadata. Vanliga: table_info, foreign_keys, database_list.',
        examples: [
          'PRAGMA table_info(users);           -- Visar kolumninfo',
          'PRAGMA foreign_keys = ON;           -- Aktiverar FK-kontroller',
          'PRAGMA database_list;               -- Visar anslutna databaser'
        ],
        flashcardQ: 'Hur ser du alla kolumner i en tabell i SQLite?',
        flashcardA: 'PRAGMA table_info(tabellnamn);',
        quizQ: 'Vad är PRAGMA specifikt för?',
        quizOptions: [
          'SQLite',
          'Alla SQL-databaser',
          'MySQL',
          'PostgreSQL'
        ],
        quizCorrect: 0
      },
      {
        syntax: 'Dynamisk typning',
        description: 'SQLite är flexibel med datatyper',
        explanation: 'SQLite har "type affinity" - kolumner har preferens men accepterar vilken typ som helst. En INTEGER-kolumn kan lagra text. Var försiktig!',
        examples: [
          "INSERT INTO users (age) VALUES ('tjugo');  -- Fungerar i SQLite!",
          "SELECT typeof(age) FROM users;  -- Visar faktisk typ"
        ],
        commonMistakes: 'SQLites flexibilitet kan dölja buggar. Validera data i applikationen.',
        flashcardQ: 'Kan du lagra text i en INTEGER-kolumn i SQLite?',
        flashcardA: 'Ja, SQLite har dynamisk typning och accepterar det (men det är dålig praxis).',
        quizQ: 'Vad är "type affinity" i SQLite?',
        quizOptions: [
          'Kolumner har typpreferens men accepterar andra typer',
          'Strikt typkontroll som andra databaser',
          'Automatisk typkonvertering till rätt typ',
          'Typer bestäms vid första INSERT'
        ],
        quizCorrect: 0
      }
    ]
  },
  {
    name: 'Normalformer',
    icon: 'normal',
    items: [
      {
        syntax: '1NF - Första normalformen',
        description: 'Atomära värden, inga upprepande grupper',
        explanation: 'Varje cell ska ha ett enda värde (atomärt). Inga listor eller komma-separerade värden. Varje rad ska vara unik (PRIMARY KEY).',
        examples: [
          '-- FEL: hobbies = "läsa, simma, koda"',
          '-- RÄTT: separat hobbies-tabell med en rad per hobby',
          '-- FEL: phone1, phone2, phone3 kolumner',
          '-- RÄTT: separat phone_numbers-tabell'
        ],
        flashcardQ: 'Vad är ett atomärt värde?',
        flashcardA: 'Ett värde som inte kan delas upp ytterligare, t.ex. ett telefonnummer (inte en lista med flera).',
        quizQ: 'Vilken tabell bryter mot 1NF?',
        quizOptions: [
          'users med kolumn tags = "admin,editor,user"',
          'users med kolumner id, name, email',
          'orders med kolumner id, customer_id, total',
          'products med kolumner id, name, price'
        ],
        quizCorrect: 0
      },
      {
        syntax: '2NF - Andra normalformen',
        description: 'Inga partiella beroenden',
        explanation: 'Uppfyller 1NF + alla icke-nyckel-kolumner beror på hela primärnyckeln. Relevant vid composite key - inga kolumner får bero på bara en del av nyckeln.',
        examples: [
          '-- FEL: (student_id, course_id) PK, men student_name beror bara på student_id',
          '-- RÄTT: Separera till students-tabell och enrollments-tabell'
        ],
        flashcardQ: 'När är 2NF relevant?',
        flashcardA: 'Vid composite primary key - kontrollera att inget beror på bara en del av nyckeln.',
        quizQ: 'Om PK är (A, B) och kolumn C beror bara på A, vilken normalform bryts?',
        quizOptions: [
          '2NF (partiellt beroende)',
          '1NF',
          '3NF',
          'Ingen, det är ok'
        ],
        quizCorrect: 0
      },
      {
        syntax: '3NF - Tredje normalformen',
        description: 'Inga transitiva beroenden',
        explanation: 'Uppfyller 2NF + icke-nyckel-kolumner får inte bero på andra icke-nyckel-kolumner. Om A → B → C, ska B separeras till egen tabell.',
        examples: [
          '-- FEL: employees med dept_id, dept_name (dept_name beror på dept_id, inte employee)',
          '-- RÄTT: Separera till departments-tabell, employees har bara dept_id'
        ],
        flashcardQ: 'Vad är ett transitivt beroende?',
        flashcardA: 'När A → B → C, dvs C beror på A via B. B bör separeras till egen tabell.',
        quizQ: 'employees har zip_code och city där city beror på zip_code. Vilken normalform bryts?',
        quizOptions: [
          '3NF (transitivt beroende)',
          '1NF',
          '2NF',
          'Ingen normalform bryts'
        ],
        quizCorrect: 0
      }
    ]
  }
];

// Flatten all items for flashcard/quiz modes
const getAllItems = (): { category: string; item: CheatItem }[] => {
  return cheatSheetData.flatMap(cat =>
    cat.items.map(item => ({ category: cat.name, item }))
  );
};

// Shuffle array helper
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export function CheatSheet({ isOpen, onClose }: CheatSheetProps) {
  const [activeCategory, setActiveCategory] = useState(cheatSheetData[0].name);
  const [viewMode, setViewMode] = useState<ViewMode>('read');
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizAnswered, setQuizAnswered] = useState(0);
  const [shuffledQuizItems, setShuffledQuizItems] = useState<{ category: string; item: CheatItem }[]>([]);

  const allItems = getAllItems();

  // Initialize shuffled quiz items
  useEffect(() => {
    setShuffledQuizItems(shuffleArray(allItems));
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (viewMode === 'flashcard') {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          if (showAnswer) {
            setShowAnswer(false);
            setFlashcardIndex((prev) => (prev + 1) % allItems.length);
          } else {
            setShowAnswer(true);
          }
        }
        if (e.key === 'ArrowLeft') {
          setFlashcardIndex((prev) => (prev - 1 + allItems.length) % allItems.length);
          setShowAnswer(false);
        }
        if (e.key === 'ArrowRight') {
          setFlashcardIndex((prev) => (prev + 1) % allItems.length);
          setShowAnswer(false);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [viewMode, showAnswer, allItems.length, onClose]);

  const handleQuizAnswer = (index: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(index);
    setQuizAnswered(prev => prev + 1);
    if (index === shuffledQuizItems[quizIndex]?.item.quizCorrect) {
      setQuizScore(prev => prev + 1);
    }
  };

  const nextQuizQuestion = () => {
    setSelectedAnswer(null);
    if (quizIndex + 1 >= shuffledQuizItems.length) {
      // Quiz complete, reshuffle
      setShuffledQuizItems(shuffleArray(allItems));
      setQuizIndex(0);
    } else {
      setQuizIndex((prev) => prev + 1);
    }
  };

  const resetQuiz = () => {
    setQuizScore(0);
    setQuizAnswered(0);
    setQuizIndex(0);
    setSelectedAnswer(null);
    setShuffledQuizItems(shuffleArray(allItems));
  };

  if (!isOpen) return null;

  const currentCategory = cheatSheetData.find(c => c.name === activeCategory);
  const currentQuizItem = shuffledQuizItems[quizIndex];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-zinc-900 border border-zinc-700 rounded-2xl w-[95vw] max-w-6xl h-[90vh] flex flex-col shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-700 bg-zinc-800/50 rounded-t-2xl">
          <div className="flex items-center gap-4">
            <span className="text-3xl">📋</span>
            <div>
              <h2 className="text-xl font-bold text-white">SQL Cheat Sheet</h2>
              <p className="text-zinc-400 text-sm">Referens • Flashcards • Quiz</p>
            </div>
          </div>

          {/* Mode switcher */}
          <div className="flex items-center gap-2 bg-zinc-800 rounded-lg p-1">
            <button
              onClick={() => setViewMode('read')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${viewMode === 'read' ? 'bg-fuchsia-500 text-white' : 'text-zinc-400 hover:text-white'
                }`}
            >
              📖 Läs
            </button>
            <button
              onClick={() => { setViewMode('flashcard'); setShowAnswer(false); }}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${viewMode === 'flashcard' ? 'bg-amber-500 text-white' : 'text-zinc-400 hover:text-white'
                }`}
            >
              🃏 Flashcards
            </button>
            <button
              onClick={() => { setViewMode('quiz'); resetQuiz(); }}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${viewMode === 'quiz' ? 'bg-green-500 text-white' : 'text-zinc-400 hover:text-white'
                }`}
            >
              ❓ Quiz
            </button>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white flex items-center justify-center transition-colors text-xl"
          >
            ×
          </button>
        </div>

        {/* Content */}
        {viewMode === 'read' && (
          <div className="flex-1 flex overflow-hidden">
            {/* Category sidebar */}
            <div className="w-64 border-r border-zinc-700 p-3 bg-zinc-900/50 flex-shrink-0">
              {cheatSheetData.map((category) => (
                <button
                  key={category.name}
                  onClick={() => setActiveCategory(category.name)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all mb-1 ${activeCategory === category.name
                      ? 'bg-gradient-to-r from-fuchsia-500/20 to-pink-500/20 text-fuchsia-400 border border-fuchsia-500/30'
                      : 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'
                    }`}
                >
                  <span className="mr-2">{category.icon}</span>
                  {category.name}
                </button>
              ))}
            </div>

            {/* Items list */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="max-w-4xl">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <span>{currentCategory?.icon}</span>
                  {currentCategory?.name}
                </h3>

                <div className="space-y-6">
                  {currentCategory?.items.map((item, index) => (
                    <div
                      key={index}
                      className="bg-zinc-800/50 border border-zinc-700 rounded-xl p-5 hover:border-zinc-600 transition-colors"
                    >
                      {/* Syntax header */}
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <code className="text-fuchsia-400 font-mono font-bold text-lg">
                          {item.syntax}
                        </code>
                        <span className="text-zinc-400 text-sm bg-zinc-700/50 px-3 py-1 rounded-full whitespace-nowrap">
                          {item.description}
                        </span>
                      </div>

                      {/* Explanation */}
                      <p className="text-zinc-300 mb-4 leading-relaxed">
                        {item.explanation}
                      </p>

                      {/* Examples */}
                      <div className="space-y-2">
                        {item.examples.map((example, i) => (
                          <pre key={i} className="bg-zinc-900 rounded-lg p-3 text-sm text-green-400 font-mono overflow-x-auto whitespace-pre-wrap">
                            {example}
                          </pre>
                        ))}
                      </div>

                      {/* Common mistakes */}
                      {item.commonMistakes && (
                        <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                          <span className="text-red-400 text-sm font-medium">⚠️ Vanligt misstag: </span>
                          <span className="text-red-300 text-sm">{item.commonMistakes}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {viewMode === 'flashcard' && (
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="w-full max-w-2xl">
              {/* Progress */}
              <div className="text-center mb-6">
                <span className="text-zinc-500 text-sm">
                  Kort {flashcardIndex + 1} av {allItems.length}
                </span>
                <span className="text-zinc-600 mx-2">•</span>
                <span className="text-fuchsia-500 text-sm">{allItems[flashcardIndex].category}</span>
              </div>

              {/* Card */}
              <div
                className={`bg-gradient-to-br ${showAnswer ? 'from-green-900/30 to-emerald-900/30 border-green-500/30' : 'from-amber-900/30 to-orange-900/30 border-amber-500/30'} border rounded-2xl p-8 min-h-[300px] flex flex-col justify-center cursor-pointer transition-all hover:scale-[1.01]`}
                onClick={() => setShowAnswer(!showAnswer)}
              >
                {!showAnswer ? (
                  <div className="text-center">
                    <p className="text-amber-200 text-xl leading-relaxed mb-6">
                      {allItems[flashcardIndex].item.flashcardQ}
                    </p>
                    <span className="text-amber-500/50 text-sm">Klicka eller tryck mellanslag för svar</span>
                  </div>
                ) : (
                  <div className="text-center">
                    <pre className="text-green-200 text-lg font-mono leading-relaxed mb-6 whitespace-pre-wrap">
                      {allItems[flashcardIndex].item.flashcardA}
                    </pre>
                    <span className="text-green-500/50 text-sm">Klicka för nästa kort</span>
                  </div>
                )}
              </div>

              {/* Navigation */}
              <div className="flex justify-between items-center mt-6">
                <button
                  onClick={() => { setFlashcardIndex((prev) => (prev - 1 + allItems.length) % allItems.length); setShowAnswer(false); }}
                  className="px-4 py-2 text-zinc-400 hover:text-white transition-colors flex items-center gap-2"
                >
                  <span>←</span> Föregående
                </button>
                <button
                  onClick={() => { setFlashcardIndex(Math.floor(Math.random() * allItems.length)); setShowAnswer(false); }}
                  className="px-4 py-2 bg-zinc-800 rounded-lg text-zinc-300 hover:bg-zinc-700 transition-colors"
                >
                  🎲 Slumpa
                </button>
                <button
                  onClick={() => { setFlashcardIndex((prev) => (prev + 1) % allItems.length); setShowAnswer(false); }}
                  className="px-4 py-2 text-zinc-400 hover:text-white transition-colors flex items-center gap-2"
                >
                  Nästa <span>→</span>
                </button>
              </div>

              {/* Keyboard hints */}
              <div className="text-center mt-4 text-zinc-600 text-xs">
                Tangentbord: ← → för navigation • Mellanslag för att vända kort
              </div>
            </div>
          </div>
        )}

        {viewMode === 'quiz' && currentQuizItem && (
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="w-full max-w-2xl">
              {/* Score */}
              <div className="text-center mb-6">
                <span className="text-zinc-500 text-sm">
                  Fråga {quizAnswered + (selectedAnswer === null ? 1 : 0)} av {shuffledQuizItems.length}
                </span>
                <span className="text-zinc-600 mx-2">•</span>
                <span className="text-green-400 text-sm font-medium">
                  {quizScore} rätt
                </span>
                {quizAnswered > 0 && (
                  <span className="text-zinc-500 text-sm ml-1">
                    ({Math.round((quizScore / quizAnswered) * 100)}%)
                  </span>
                )}
              </div>

              {/* Question */}
              <div className="bg-zinc-800/50 border border-zinc-700 rounded-2xl p-6 mb-6">
                <p className="text-fuchsia-500 text-sm mb-2 font-medium">{currentQuizItem.category}</p>
                <p className="text-white text-lg leading-relaxed">
                  {currentQuizItem.item.quizQ}
                </p>
              </div>

              {/* Options */}
              <div className="space-y-3">
                {currentQuizItem.item.quizOptions.map((option, index) => {
                  const isCorrect = index === currentQuizItem.item.quizCorrect;
                  const isSelected = selectedAnswer === index;
                  let className = 'w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3 ';

                  if (selectedAnswer === null) {
                    className += 'bg-zinc-800/50 border-zinc-700 hover:border-fuchsia-500/50 hover:bg-zinc-800 text-zinc-300 cursor-pointer';
                  } else if (isCorrect) {
                    className += 'bg-green-500/20 border-green-500 text-green-300';
                  } else if (isSelected) {
                    className += 'bg-red-500/20 border-red-500 text-red-300';
                  } else {
                    className += 'bg-zinc-800/30 border-zinc-700/50 text-zinc-500';
                  }

                  return (
                    <button
                      key={index}
                      onClick={() => handleQuizAnswer(index)}
                      disabled={selectedAnswer !== null}
                      className={className}
                    >
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${selectedAnswer === null
                          ? 'bg-zinc-700 text-zinc-400'
                          : isCorrect
                            ? 'bg-green-500 text-white'
                            : isSelected
                              ? 'bg-red-500 text-white'
                              : 'bg-zinc-700/50 text-zinc-500'
                        }`}>
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span className="flex-1">{option}</span>
                      {selectedAnswer !== null && isCorrect && <span className="text-green-400">✓</span>}
                      {selectedAnswer !== null && isSelected && !isCorrect && <span className="text-red-400">✗</span>}
                    </button>
                  );
                })}
              </div>

              {/* Explanation after answer */}
              {selectedAnswer !== null && (
                <div className="mt-6 p-4 bg-zinc-800/50 border border-zinc-700 rounded-xl">
                  <p className="text-zinc-400 text-sm mb-2 font-medium">Förklaring:</p>
                  <p className="text-zinc-300 text-sm">{currentQuizItem.item.explanation}</p>
                </div>
              )}

              {/* Next button */}
              {selectedAnswer !== null && (
                <div className="flex justify-center mt-6">
                  <button
                    onClick={nextQuizQuestion}
                    className="px-8 py-3 bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white font-semibold rounded-xl hover:from-fuchsia-400 hover:to-pink-400 transition-all shadow-lg shadow-fuchsia-500/20"
                  >
                    Nästa fråga →
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="px-6 py-3 border-t border-zinc-700 text-xs text-zinc-500 flex justify-between bg-zinc-800/30 rounded-b-2xl">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            {allItems.length} koncept • {cheatSheetData.length} kategorier
          </span>
          <span>
            {viewMode === 'read' && 'Välj kategori till vänster'}
            {viewMode === 'flashcard' && 'Mellanslag = visa svar • Piltangenter = navigera'}
            {viewMode === 'quiz' && 'Klicka på ett alternativ för att svara'}
          </span>
          <span>ESC för att stänga</span>
        </div>
      </div>
    </div>
  );
}
