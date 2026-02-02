import type { Exercise } from '../types';

export const exercises: Exercise[] = [
  // LEVEL 1: SELECT Basics (10 exercises)
  {
    id: 'select-001',
    level: 1,
    category: 'select',
    title: 'Alla produkter',
    brief: 'Hämta alla kolumner från products-tabellen.',
    database: 'ecommerce',
    expectedColumns: ['product_id', 'product_name', 'category', 'price', 'stock_quantity'],
    hints: ['Använd SELECT * för att hämta alla kolumner', 'Tabellen heter products'],
    solution: 'SELECT * FROM products',
    courseGoals: [1, 2],
    difficulty: 'beginner'
  },
  {
    id: 'select-002',
    level: 1,
    category: 'select',
    title: 'Produktnamn',
    brief: 'Hämta endast product_name från products.',
    database: 'ecommerce',
    expectedColumns: ['product_name'],
    hints: ['Ange specifik kolumn istället för *', 'Skriv kolumnnamnet direkt efter SELECT'],
    solution: 'SELECT product_name FROM products',
    courseGoals: [1],
    difficulty: 'beginner'
  },
  {
    id: 'select-003',
    level: 1,
    category: 'select',
    title: 'Flera kolumner',
    brief: 'Hämta product_name och price från products.',
    database: 'ecommerce',
    expectedColumns: ['product_name', 'price'],
    hints: ['Separera kolumnnamn med komma', 'Du kan välja flera kolumner: SELECT a, b FROM tabell'],
    solution: 'SELECT product_name, price FROM products',
    courseGoals: [1],
    difficulty: 'beginner'
  },
  {
    id: 'select-004',
    level: 1,
    category: 'select',
    title: 'Alla kunder',
    brief: 'Lista alla kunder med namn och email.',
    database: 'ecommerce',
    expectedColumns: ['customer_name', 'email'],
    hints: ['Tabellen heter customers', 'Kolumnerna heter customer_name och email'],
    solution: 'SELECT customer_name, email FROM customers',
    courseGoals: [1],
    difficulty: 'beginner'
  },
  {
    id: 'select-005',
    level: 1,
    category: 'select',
    title: 'Unika kategorier',
    brief: 'Visa alla unika produktkategorier.',
    database: 'ecommerce',
    expectedColumns: ['category'],
    hints: ['Använd DISTINCT för att ta bort dubbletter', 'DISTINCT placeras direkt efter SELECT'],
    solution: 'SELECT DISTINCT category FROM products',
    courseGoals: [1],
    difficulty: 'beginner'
  },
  {
    id: 'select-006',
    level: 1,
    category: 'select',
    title: 'Alla ordrar',
    brief: 'Hämta order_id och order_date från orders.',
    database: 'ecommerce',
    expectedColumns: ['order_id', 'order_date'],
    hints: ['Tabellen heter orders', 'Välj två kolumner: order_id och order_date'],
    solution: 'SELECT order_id, order_date FROM orders',
    courseGoals: [1],
    difficulty: 'beginner'
  },
  {
    id: 'select-007',
    level: 1,
    category: 'select',
    title: 'Lagerantal',
    brief: 'Visa product_name och stock_quantity för alla produkter.',
    database: 'ecommerce',
    expectedColumns: ['product_name', 'stock_quantity'],
    hints: ['Välj två kolumner från products-tabellen', 'Kolumnen för lagerantal heter stock_quantity'],
    solution: 'SELECT product_name, stock_quantity FROM products',
    courseGoals: [1],
    difficulty: 'beginner'
  },
  {
    id: 'select-008',
    level: 1,
    category: 'select',
    title: 'Artister',
    brief: 'Lista alla artistnamn från artists-tabellen.',
    database: 'chinook',
    expectedColumns: ['Name'],
    hints: ['Chinook använder CamelCase: Name (inte name)', 'Tabellen heter artists'],
    solution: 'SELECT Name FROM artists',
    courseGoals: [1, 2],
    difficulty: 'beginner'
  },
  {
    id: 'select-009',
    level: 1,
    category: 'select',
    title: 'Album',
    brief: 'Hämta Title och ArtistId från albums.',
    database: 'chinook',
    expectedColumns: ['Title', 'ArtistId'],
    hints: ['Chinook använder CamelCase för kolumnnamn', 'Tabellen heter albums'],
    solution: 'SELECT Title, ArtistId FROM albums',
    courseGoals: [1, 2],
    difficulty: 'beginner'
  },
  {
    id: 'select-010',
    level: 1,
    category: 'select',
    title: 'Boss: Komplett produktlista',
    brief: 'Visa product_id, product_name, category och price för alla produkter.',
    database: 'ecommerce',
    expectedColumns: ['product_id', 'product_name', 'category', 'price'],
    hints: ['Välj fyra specifika kolumner från products'],
    solution: 'SELECT product_id, product_name, category, price FROM products',
    courseGoals: [1],
    difficulty: 'boss'
  },

  // LEVEL 2: WHERE Filtering (10 exercises)
  {
    id: 'where-001',
    level: 2,
    category: 'where',
    title: 'Dyra produkter',
    brief: 'Hämta produkter med pris över 100.',
    database: 'ecommerce',
    expectedColumns: ['product_name', 'price'],
    hints: ['Använd WHERE för filtrering', 'Jämförelseoperator: price > 100'],
    solution: 'SELECT product_name, price FROM products WHERE price > 100',
    courseGoals: [1],
    difficulty: 'beginner'
  },
  {
    id: 'where-002',
    level: 2,
    category: 'where',
    title: 'Elektronik',
    brief: 'Visa alla produkter i kategorin Electronics.',
    database: 'ecommerce',
    expectedColumns: ['product_name', 'category'],
    hints: ['Textvärden ska omges av citattecken', 'Använd enkla citattecken runt textvärdet'],
    solution: "SELECT product_name, category FROM products WHERE category = 'Electronics'",
    courseGoals: [1],
    difficulty: 'beginner'
  },
  {
    id: 'where-003',
    level: 2,
    category: 'where',
    title: 'Lågt lager',
    brief: 'Hitta produkter med stock_quantity under 20.',
    database: 'ecommerce',
    expectedColumns: ['product_name', 'stock_quantity'],
    hints: ['Använd < för mindre än', 'Filtrera på stock_quantity-kolumnen'],
    solution: 'SELECT product_name, stock_quantity FROM products WHERE stock_quantity < 20',
    courseGoals: [1],
    difficulty: 'beginner'
  },
  {
    id: 'where-004',
    level: 2,
    category: 'where',
    title: 'Prisintervall',
    brief: 'Hämta produkter med pris mellan 50 och 150.',
    database: 'ecommerce',
    expectedColumns: ['product_name', 'price'],
    hints: ['Använd BETWEEN ... AND ...', 'Alternativt: price >= 50 AND price <= 150'],
    solution: 'SELECT product_name, price FROM products WHERE price BETWEEN 50 AND 150',
    courseGoals: [1],
    difficulty: 'intermediate'
  },
  {
    id: 'where-005',
    level: 2,
    category: 'where',
    title: 'Flera kategorier',
    brief: 'Visa produkter som är Electronics eller Books.',
    database: 'ecommerce',
    expectedColumns: ['product_name', 'category'],
    hints: ['Använd IN för att matcha flera värden', 'IN tar en lista med värden inom parenteser'],
    solution: "SELECT product_name, category FROM products WHERE category IN ('Electronics', 'Books')",
    courseGoals: [1],
    difficulty: 'intermediate'
  },
  {
    id: 'where-006',
    level: 2,
    category: 'where',
    title: 'Namnmatchning',
    brief: 'Hitta produkter vars namn börjar med bokstaven S.',
    database: 'ecommerce',
    expectedColumns: ['product_name'],
    hints: ['Använd LIKE med wildcard %', '% matchar noll eller flera tecken'],
    solution: "SELECT product_name FROM products WHERE product_name LIKE 'S%'",
    courseGoals: [1],
    difficulty: 'intermediate'
  },
  {
    id: 'where-007',
    level: 2,
    category: 'where',
    title: 'Rockmusik',
    brief: 'Hämta alla spår i genren Rock (GenreId = 1).',
    database: 'chinook',
    expectedColumns: ['Name'],
    hints: ['Tabellen heter tracks', 'GenreId för Rock är 1'],
    solution: 'SELECT Name FROM tracks WHERE GenreId = 1',
    courseGoals: [1, 2],
    difficulty: 'intermediate'
  },
  {
    id: 'where-008',
    level: 2,
    category: 'where',
    title: 'Långa låtar',
    brief: 'Hitta spår längre än 5 minuter (300000 millisekunder).',
    database: 'chinook',
    expectedColumns: ['Name', 'Milliseconds'],
    hints: ['Kolumnen Milliseconds innehåller längden', '5 minuter = 300000 ms'],
    solution: 'SELECT Name, Milliseconds FROM tracks WHERE Milliseconds > 300000',
    courseGoals: [1],
    difficulty: 'intermediate'
  },
  {
    id: 'where-009',
    level: 2,
    category: 'where',
    title: 'Exkludera kategori',
    brief: 'Visa produkter som INTE är i kategorin Clothing.',
    database: 'ecommerce',
    expectedColumns: ['product_name', 'category'],
    hints: ['Använd != eller <> för "inte lika med"', 'Båda operatorerna fungerar likadant'],
    solution: "SELECT product_name, category FROM products WHERE category != 'Clothing'",
    courseGoals: [1],
    difficulty: 'intermediate'
  },
  {
    id: 'where-010',
    level: 2,
    category: 'where',
    title: 'Boss: Komplex filtrering',
    brief: 'Hitta Electronics-produkter med pris över 80 och lager över 10.',
    database: 'ecommerce',
    expectedColumns: ['product_name', 'price', 'stock_quantity'],
    hints: ['Kombinera flera villkor med AND', 'Tre villkor: category, price, stock_quantity'],
    solution: "SELECT product_name, price, stock_quantity FROM products WHERE category = 'Electronics' AND price > 80 AND stock_quantity > 10",
    courseGoals: [1],
    difficulty: 'boss'
  },

  // LEVEL 3: ORDER BY and LIMIT (10 exercises)
  {
    id: 'order-001',
    level: 3,
    category: 'order',
    title: 'Pris stigande',
    brief: 'Sortera produkter efter pris, billigast först.',
    database: 'ecommerce',
    expectedColumns: ['product_name', 'price'],
    hints: ['Använd ORDER BY kolumn ASC', 'ASC är default och kan utelämnas'],
    solution: 'SELECT product_name, price FROM products ORDER BY price ASC',
    courseGoals: [1],
    difficulty: 'beginner'
  },
  {
    id: 'order-002',
    level: 3,
    category: 'order',
    title: 'Pris fallande',
    brief: 'Visa produkter sorterade efter pris, dyrast först.',
    database: 'ecommerce',
    expectedColumns: ['product_name', 'price'],
    hints: ['Använd DESC för fallande ordning', 'DESC = descending (fallande)'],
    solution: 'SELECT product_name, price FROM products ORDER BY price DESC',
    courseGoals: [1],
    difficulty: 'beginner'
  },
  {
    id: 'order-003',
    level: 3,
    category: 'order',
    title: 'Topp 5',
    brief: 'Hämta de 5 dyraste produkterna.',
    database: 'ecommerce',
    expectedColumns: ['product_name', 'price'],
    expectedRowCount: 5,
    hints: ['Kombinera ORDER BY DESC med LIMIT', 'LIMIT begränsar antalet rader i resultatet'],
    solution: 'SELECT product_name, price FROM products ORDER BY price DESC LIMIT 5',
    courseGoals: [1],
    difficulty: 'beginner'
  },
  {
    id: 'order-004',
    level: 3,
    category: 'order',
    title: 'Alfabetisk ordning',
    brief: 'Lista produktnamn i alfabetisk ordning.',
    database: 'ecommerce',
    expectedColumns: ['product_name'],
    hints: ['ORDER BY fungerar även på text', 'Sortera på product_name'],
    solution: 'SELECT product_name FROM products ORDER BY product_name ASC',
    courseGoals: [1],
    difficulty: 'beginner'
  },
  {
    id: 'order-005',
    level: 3,
    category: 'order',
    title: 'Senaste ordrar',
    brief: 'Visa de 10 senaste ordrarna sorterade efter datum.',
    database: 'ecommerce',
    expectedColumns: ['order_id', 'order_date'],
    expectedRowCount: 10,
    hints: ['Sortera på order_date i fallande ordning', 'Nyast först = DESC'],
    solution: 'SELECT order_id, order_date FROM orders ORDER BY order_date DESC LIMIT 10',
    courseGoals: [1],
    difficulty: 'intermediate'
  },
  {
    id: 'order-006',
    level: 3,
    category: 'order',
    title: 'Dubbel sortering',
    brief: 'Sortera produkter efter kategori, sedan efter pris inom varje kategori.',
    database: 'ecommerce',
    expectedColumns: ['category', 'product_name', 'price'],
    hints: ['Ange flera kolumner i ORDER BY', 'Sortering sker i ordningen du anger kolumnerna'],
    solution: 'SELECT category, product_name, price FROM products ORDER BY category ASC, price ASC',
    courseGoals: [1],
    difficulty: 'intermediate'
  },
  {
    id: 'order-007',
    level: 3,
    category: 'order',
    title: 'Längsta låtarna',
    brief: 'Hitta de 10 längsta spåren i databasen.',
    database: 'chinook',
    expectedColumns: ['Name', 'Milliseconds'],
    expectedRowCount: 10,
    hints: ['Sortera på Milliseconds i fallande ordning', 'Tabellen heter tracks'],
    solution: 'SELECT Name, Milliseconds FROM tracks ORDER BY Milliseconds DESC LIMIT 10',
    courseGoals: [1, 2],
    difficulty: 'intermediate'
  },
  {
    id: 'order-008',
    level: 3,
    category: 'order',
    title: 'Skip och take',
    brief: 'Hämta produkt 6-10 sorterade efter pris (hoppa över de 5 första).',
    database: 'ecommerce',
    expectedColumns: ['product_name', 'price'],
    expectedRowCount: 5,
    hints: ['Använd LIMIT med OFFSET', 'OFFSET hoppar över de första raderna'],
    solution: 'SELECT product_name, price FROM products ORDER BY price ASC LIMIT 5 OFFSET 5',
    courseGoals: [1],
    difficulty: 'intermediate'
  },
  {
    id: 'order-009',
    level: 3,
    category: 'order',
    title: 'Billigaste elektroniken',
    brief: 'Visa de 3 billigaste produkterna i kategorin Electronics.',
    database: 'ecommerce',
    expectedColumns: ['product_name', 'price'],
    expectedRowCount: 3,
    hints: ['Kombinera WHERE, ORDER BY och LIMIT', 'Filtrera först, sortera sedan, begränsa sist'],
    solution: "SELECT product_name, price FROM products WHERE category = 'Electronics' ORDER BY price ASC LIMIT 3",
    courseGoals: [1],
    difficulty: 'intermediate'
  },
  {
    id: 'order-010',
    level: 3,
    category: 'order',
    title: 'Boss: Paginering',
    brief: 'Hämta produkter 11-15 i kategorin Books, sorterade efter pris fallande.',
    database: 'ecommerce',
    expectedColumns: ['product_name', 'price'],
    expectedRowCount: 5,
    hints: ['WHERE + ORDER BY + LIMIT + OFFSET', 'OFFSET 10 för att hoppa över de första 10'],
    solution: "SELECT product_name, price FROM products WHERE category = 'Books' ORDER BY price DESC LIMIT 5 OFFSET 10",
    courseGoals: [1],
    difficulty: 'boss'
  },

  // LEVEL 4: Aggregate Functions and GROUP BY (10 exercises)
  {
    id: 'aggregate-001',
    level: 4,
    category: 'aggregate',
    title: 'Antal produkter',
    brief: 'Räkna totalt antal produkter i databasen.',
    database: 'ecommerce',
    expectedColumns: ['count'],
    hints: ['Använd COUNT(*) aggregatfunktion', 'Ge kolumnen alias med AS count'],
    solution: 'SELECT COUNT(*) AS count FROM products',
    courseGoals: [1],
    difficulty: 'beginner'
  },
  {
    id: 'aggregate-002',
    level: 4,
    category: 'aggregate',
    title: 'Högsta pris',
    brief: 'Hitta det högsta produktpriset.',
    database: 'ecommerce',
    expectedColumns: ['max_price'],
    hints: ['Använd MAX-funktionen på price', 'MAX() returnerar högsta värdet i en kolumn'],
    solution: 'SELECT MAX(price) AS max_price FROM products',
    courseGoals: [1],
    difficulty: 'beginner'
  },
  {
    id: 'aggregate-003',
    level: 4,
    category: 'aggregate',
    title: 'Snittpris',
    brief: 'Beräkna genomsnittspriset för alla produkter.',
    database: 'ecommerce',
    expectedColumns: ['avg_price'],
    hints: ['Använd AVG-funktionen på price', 'AVG() beräknar medelvärdet'],
    solution: 'SELECT AVG(price) AS avg_price FROM products',
    courseGoals: [1],
    difficulty: 'beginner'
  },
  {
    id: 'aggregate-004',
    level: 4,
    category: 'group',
    title: 'Produkter per kategori',
    brief: 'Räkna antal produkter i varje kategori.',
    database: 'ecommerce',
    expectedColumns: ['category', 'count'],
    hints: ['Använd GROUP BY category', 'COUNT(*) räknar per grupp'],
    solution: 'SELECT category, COUNT(*) AS count FROM products GROUP BY category',
    courseGoals: [1],
    difficulty: 'intermediate'
  },
  {
    id: 'aggregate-005',
    level: 4,
    category: 'group',
    title: 'Snittpris per kategori',
    brief: 'Beräkna genomsnittspris för varje produktkategori.',
    database: 'ecommerce',
    expectedColumns: ['category', 'avg_price'],
    hints: ['Kombinera AVG med GROUP BY', 'GROUP BY skapar grupper som aggregat beräknas på'],
    solution: 'SELECT category, AVG(price) AS avg_price FROM products GROUP BY category',
    courseGoals: [1],
    difficulty: 'intermediate'
  },
  {
    id: 'aggregate-006',
    level: 4,
    category: 'group',
    title: 'Kategorier med många produkter',
    brief: 'Visa kategorier som har mer än 5 produkter.',
    database: 'ecommerce',
    expectedColumns: ['category', 'count'],
    hints: ['Använd HAVING för att filtrera efter aggregering', 'HAVING COUNT(*) > 5'],
    solution: 'SELECT category, COUNT(*) AS count FROM products GROUP BY category HAVING COUNT(*) > 5',
    courseGoals: [1],
    difficulty: 'intermediate'
  },
  {
    id: 'aggregate-007',
    level: 4,
    category: 'group',
    title: 'Totalt lagervärde',
    brief: 'Beräkna totalt lagervärde (pris gånger antal) per kategori.',
    database: 'ecommerce',
    expectedColumns: ['category', 'total_value'],
    hints: ['Multiplicera price * stock_quantity', 'Summera med SUM()'],
    solution: 'SELECT category, SUM(price * stock_quantity) AS total_value FROM products GROUP BY category',
    courseGoals: [1],
    difficulty: 'intermediate'
  },
  {
    id: 'aggregate-008',
    level: 4,
    category: 'group',
    title: 'Album per artist',
    brief: 'Räkna antal album för varje ArtistId.',
    database: 'chinook',
    expectedColumns: ['ArtistId', 'album_count'],
    hints: ['GROUP BY ArtistId på albums-tabellen', 'COUNT(*) AS album_count'],
    solution: 'SELECT ArtistId, COUNT(*) AS album_count FROM albums GROUP BY ArtistId',
    courseGoals: [1, 2],
    difficulty: 'intermediate'
  },
  {
    id: 'aggregate-009',
    level: 4,
    category: 'group',
    title: 'Ordervärde',
    brief: 'Beräkna totalt värde för varje order baserat på order_items.',
    database: 'ecommerce',
    expectedColumns: ['order_id', 'total_value'],
    hints: ['Tabellen order_items har quantity och unit_price', 'SUM(quantity * unit_price) GROUP BY order_id'],
    solution: 'SELECT order_id, SUM(quantity * unit_price) AS total_value FROM order_items GROUP BY order_id',
    courseGoals: [1],
    difficulty: 'advanced'
  },
  {
    id: 'aggregate-010',
    level: 4,
    category: 'group',
    title: 'Boss: Toppkategorier',
    brief: 'Visa de 3 kategorier med högst totalt lagervärde, sorterat fallande.',
    database: 'ecommerce',
    expectedColumns: ['category', 'total_value'],
    expectedRowCount: 3,
    hints: ['GROUP BY + SUM + ORDER BY + LIMIT', 'Lagervärde = price * stock_quantity'],
    solution: 'SELECT category, SUM(price * stock_quantity) AS total_value FROM products GROUP BY category ORDER BY total_value DESC LIMIT 3',
    courseGoals: [1],
    difficulty: 'boss'
  },

  // LEVEL 5: JOINs (10 exercises)
  {
    id: 'join-001',
    level: 5,
    category: 'join',
    title: 'Ordrar med kundnamn',
    brief: 'Visa order_id och customer_name för alla ordrar.',
    database: 'ecommerce',
    expectedColumns: ['order_id', 'customer_name'],
    hints: ['JOIN orders med customers', 'Kopplingsnyckel: customer_id'],
    solution: 'SELECT orders.order_id, customers.customer_name FROM orders JOIN customers ON orders.customer_id = customers.customer_id',
    courseGoals: [1, 5],
    difficulty: 'beginner'
  },
  {
    id: 'join-002',
    level: 5,
    category: 'join',
    title: 'Orderdetaljer',
    brief: 'Visa order_id, product_name och quantity för alla orderrader.',
    database: 'ecommerce',
    expectedColumns: ['order_id', 'product_name', 'quantity'],
    hints: ['JOIN order_items med products', 'Kopplingsnyckel: product_id'],
    solution: 'SELECT order_items.order_id, products.product_name, order_items.quantity FROM order_items JOIN products ON order_items.product_id = products.product_id',
    courseGoals: [1, 5],
    difficulty: 'beginner'
  },
  {
    id: 'join-003',
    level: 5,
    category: 'join',
    title: 'Album med artistnamn',
    brief: 'Lista albumtitlar tillsammans med artistnamn.',
    database: 'chinook',
    expectedColumns: ['Title', 'Name'],
    hints: ['JOIN albums med artists', 'Kopplingsnyckel: ArtistId'],
    solution: 'SELECT albums.Title, artists.Name FROM albums JOIN artists ON albums.ArtistId = artists.ArtistId',
    courseGoals: [1, 2, 5],
    difficulty: 'beginner'
  },
  {
    id: 'join-004',
    level: 5,
    category: 'join',
    title: 'Spår med genre',
    brief: 'Visa spårnamn och genrenamn för alla spår.',
    database: 'chinook',
    expectedColumns: ['Name', 'GenreName'],
    hints: ['JOIN tracks med genres', 'Kopplingsnyckel: GenreId'],
    solution: 'SELECT tracks.Name, genres.Name AS GenreName FROM tracks JOIN genres ON tracks.GenreId = genres.GenreId',
    courseGoals: [1, 5],
    difficulty: 'intermediate'
  },
  {
    id: 'join-005',
    level: 5,
    category: 'join',
    title: 'Komplett orderinfo',
    brief: 'Visa order_id, customer_name, product_name och quantity.',
    database: 'ecommerce',
    expectedColumns: ['order_id', 'customer_name', 'product_name', 'quantity'],
    hints: ['Koppla fyra tabeller: orders, customers, order_items, products', 'Tre JOIN-satser behövs för att länka alla tabeller'],
    solution: 'SELECT orders.order_id, customers.customer_name, products.product_name, order_items.quantity FROM orders JOIN customers ON orders.customer_id = customers.customer_id JOIN order_items ON orders.order_id = order_items.order_id JOIN products ON order_items.product_id = products.product_id',
    courseGoals: [1, 5],
    difficulty: 'intermediate'
  },
  {
    id: 'join-006',
    level: 5,
    category: 'join',
    title: 'Kunder utan ordrar',
    brief: 'Hitta kunder som inte har lagt några ordrar.',
    database: 'ecommerce',
    expectedColumns: ['customer_name'],
    hints: ['Använd LEFT JOIN', 'Filtrera WHERE orders.order_id IS NULL'],
    solution: 'SELECT customers.customer_name FROM customers LEFT JOIN orders ON customers.customer_id = orders.customer_id WHERE orders.order_id IS NULL',
    courseGoals: [1, 5],
    difficulty: 'intermediate'
  },
  {
    id: 'join-007',
    level: 5,
    category: 'join',
    title: 'Produkter utan ordrar',
    brief: 'Visa produkter som aldrig har beställts.',
    database: 'ecommerce',
    expectedColumns: ['product_name'],
    hints: ['LEFT JOIN products med order_items', 'WHERE order_items.product_id IS NULL'],
    solution: 'SELECT products.product_name FROM products LEFT JOIN order_items ON products.product_id = order_items.product_id WHERE order_items.product_id IS NULL',
    courseGoals: [1, 5],
    difficulty: 'intermediate'
  },
  {
    id: 'join-008',
    level: 5,
    category: 'join',
    title: 'Spår med album och artist',
    brief: 'Visa spårnamn, albumtitel och artistnamn.',
    database: 'chinook',
    expectedColumns: ['TrackName', 'AlbumTitle', 'ArtistName'],
    hints: ['Tre tabeller: tracks -> albums -> artists', 'Kedja av JOINs'],
    solution: 'SELECT tracks.Name AS TrackName, albums.Title AS AlbumTitle, artists.Name AS ArtistName FROM tracks JOIN albums ON tracks.AlbumId = albums.AlbumId JOIN artists ON albums.ArtistId = artists.ArtistId',
    courseGoals: [1, 2, 5],
    difficulty: 'advanced'
  },
  {
    id: 'join-009',
    level: 5,
    category: 'join',
    title: 'Kundens totala ordervärde',
    brief: 'Beräkna totalt ordervärde per kund.',
    database: 'ecommerce',
    expectedColumns: ['customer_name', 'total_spent'],
    hints: ['JOIN tre tabeller: customers, orders, order_items', 'SUM(quantity * unit_price) och GROUP BY customer_id'],
    solution: 'SELECT customers.customer_name, SUM(order_items.quantity * order_items.unit_price) AS total_spent FROM customers JOIN orders ON customers.customer_id = orders.customer_id JOIN order_items ON orders.order_id = order_items.order_id GROUP BY customers.customer_id, customers.customer_name',
    courseGoals: [1, 5],
    difficulty: 'advanced'
  },
  {
    id: 'join-010',
    level: 5,
    category: 'join',
    title: 'Boss: Försäljningsrapport',
    brief: 'Visa topp 5 kunder med högst totalvärde, inkludera namn och antal ordrar.',
    database: 'ecommerce',
    expectedColumns: ['customer_name', 'order_count', 'total_spent'],
    expectedRowCount: 5,
    hints: ['JOIN tre tabeller: customers, orders, order_items', 'COUNT(DISTINCT order_id) för antal ordrar, SUM för totalvärde'],
    solution: 'SELECT customers.customer_name, COUNT(DISTINCT orders.order_id) AS order_count, SUM(order_items.quantity * order_items.unit_price) AS total_spent FROM customers JOIN orders ON customers.customer_id = orders.customer_id JOIN order_items ON orders.order_id = order_items.order_id GROUP BY customers.customer_id, customers.customer_name ORDER BY total_spent DESC LIMIT 5',
    courseGoals: [1, 5],
    difficulty: 'boss'
  },

  // LEVEL 6: Subqueries and Advanced (10 exercises)
  {
    id: 'subquery-001',
    level: 6,
    category: 'subquery',
    title: 'Över snittpris',
    brief: 'Hitta produkter som kostar mer än genomsnittet.',
    database: 'ecommerce',
    expectedColumns: ['product_name', 'price'],
    hints: ['Använd subquery för att beräkna AVG(price)', 'WHERE price > (SELECT AVG(price) ...)'],
    solution: 'SELECT product_name, price FROM products WHERE price > (SELECT AVG(price) FROM products)',
    courseGoals: [1],
    difficulty: 'intermediate'
  },
  {
    id: 'subquery-002',
    level: 6,
    category: 'subquery',
    title: 'Dyraste per kategori',
    brief: 'Visa den dyraste produkten i varje kategori.',
    database: 'ecommerce',
    expectedColumns: ['category', 'product_name', 'price'],
    hints: ['Korrelerad subquery eller GROUP BY med MAX', 'Jämför med max-pris i samma kategori'],
    solution: 'SELECT p1.category, p1.product_name, p1.price FROM products p1 WHERE p1.price = (SELECT MAX(p2.price) FROM products p2 WHERE p2.category = p1.category)',
    courseGoals: [1],
    difficulty: 'advanced'
  },
  {
    id: 'subquery-003',
    level: 6,
    category: 'subquery',
    title: 'Kunder med stora ordrar',
    brief: 'Hitta kunder som har minst en order över 500 i värde.',
    database: 'ecommerce',
    expectedColumns: ['customer_name'],
    hints: ['Använd EXISTS med en subquery', 'Beräkna ordervärde med SUM i subqueryn och HAVING för att filtrera'],
    solution: 'SELECT DISTINCT customers.customer_name FROM customers WHERE EXISTS (SELECT 1 FROM orders JOIN order_items ON orders.order_id = order_items.order_id WHERE orders.customer_id = customers.customer_id GROUP BY orders.order_id HAVING SUM(order_items.quantity * order_items.unit_price) > 500)',
    courseGoals: [1],
    difficulty: 'advanced'
  },
  {
    id: 'subquery-004',
    level: 6,
    category: 'subquery',
    title: 'Artister med många album',
    brief: 'Lista artister som har fler än 5 album.',
    database: 'chinook',
    expectedColumns: ['Name', 'album_count'],
    hints: ['JOIN artists med albums', 'GROUP BY + HAVING COUNT(*) > 5'],
    solution: 'SELECT artists.Name, COUNT(*) AS album_count FROM artists JOIN albums ON artists.ArtistId = albums.ArtistId GROUP BY artists.ArtistId, artists.Name HAVING COUNT(*) > 5',
    courseGoals: [1, 2],
    difficulty: 'intermediate'
  },
  {
    id: 'subquery-005',
    level: 6,
    category: 'subquery',
    title: 'Produktranking',
    brief: 'Visa produkter med deras pris-ranking inom sin kategori.',
    database: 'ecommerce',
    expectedColumns: ['product_name', 'category', 'price', 'price_rank'],
    hints: ['Korrelerad subquery för ranking', 'Räkna produkter med högre pris i samma kategori'],
    solution: 'SELECT p1.product_name, p1.category, p1.price, (SELECT COUNT(*) + 1 FROM products p2 WHERE p2.category = p1.category AND p2.price > p1.price) AS price_rank FROM products p1 ORDER BY p1.category, price_rank',
    courseGoals: [1, 6],
    difficulty: 'advanced'
  },
  {
    id: 'subquery-006',
    level: 6,
    category: 'subquery',
    title: 'Mest sålda produkten',
    brief: 'Hitta produkten med högst total såld kvantitet.',
    database: 'ecommerce',
    expectedColumns: ['product_name', 'total_quantity'],
    hints: ['JOIN products med order_items', 'SUM(quantity) GROUP BY product_id, ORDER BY DESC LIMIT 1'],
    solution: 'SELECT products.product_name, SUM(order_items.quantity) AS total_quantity FROM products JOIN order_items ON products.product_id = order_items.product_id GROUP BY products.product_id, products.product_name ORDER BY total_quantity DESC LIMIT 1',
    courseGoals: [1],
    difficulty: 'advanced'
  },
  {
    id: 'subquery-007',
    level: 6,
    category: 'subquery',
    title: 'Återkommande kunder',
    brief: 'Lista kunder som har lagt mer än 2 ordrar.',
    database: 'ecommerce',
    expectedColumns: ['customer_name', 'order_count'],
    hints: ['JOIN customers med orders', 'GROUP BY customer_id och HAVING COUNT(*) > 2'],
    solution: 'SELECT customers.customer_name, COUNT(*) AS order_count FROM customers JOIN orders ON customers.customer_id = orders.customer_id GROUP BY customers.customer_id, customers.customer_name HAVING COUNT(*) > 2',
    courseGoals: [1],
    difficulty: 'intermediate'
  },
  {
    id: 'subquery-008',
    level: 6,
    category: 'subquery',
    title: 'Genre med flest spår',
    brief: 'Hitta genren som har flest spår.',
    database: 'chinook',
    expectedColumns: ['Name', 'track_count'],
    hints: ['JOIN genres med tracks på GenreId', 'GROUP BY genre och ORDER BY antal DESC med LIMIT 1'],
    solution: 'SELECT genres.Name, COUNT(*) AS track_count FROM genres JOIN tracks ON genres.GenreId = tracks.GenreId GROUP BY genres.GenreId, genres.Name ORDER BY track_count DESC LIMIT 1',
    courseGoals: [1, 2],
    difficulty: 'intermediate'
  },
  {
    id: 'subquery-009',
    level: 6,
    category: 'subquery',
    title: 'Produkter över kategorisnitt',
    brief: 'Visa produkter där lagret är högre än kategorins snitt.',
    database: 'ecommerce',
    expectedColumns: ['product_name', 'category', 'stock_quantity'],
    hints: ['Korrelerad subquery för kategorisnitt', 'Jämför stock_quantity med AVG i samma kategori'],
    solution: 'SELECT p1.product_name, p1.category, p1.stock_quantity FROM products p1 WHERE p1.stock_quantity > (SELECT AVG(p2.stock_quantity) FROM products p2 WHERE p2.category = p1.category)',
    courseGoals: [1, 6],
    difficulty: 'advanced'
  },
  {
    id: 'subquery-010',
    level: 6,
    category: 'subquery',
    title: 'Boss: Komplett analys',
    brief: 'Visa kategorier där snittpriset överstiger det totala snittpriset, med antal produkter och total försäljning.',
    database: 'ecommerce',
    expectedColumns: ['category', 'product_count', 'avg_price', 'total_sales'],
    hints: ['Subquery för att beräkna totalt snittpris', 'LEFT JOIN products med order_items för försäljningsdata', 'GROUP BY category och HAVING för att filtrera på snittpris'],
    solution: 'SELECT products.category, COUNT(DISTINCT products.product_id) AS product_count, AVG(products.price) AS avg_price, COALESCE(SUM(order_items.quantity * order_items.unit_price), 0) AS total_sales FROM products LEFT JOIN order_items ON products.product_id = order_items.product_id GROUP BY products.category HAVING AVG(products.price) > (SELECT AVG(price) FROM products)',
    courseGoals: [1, 6],
    difficulty: 'boss'
  },

  // SCHOOL DATABASE EXERCISES
  // Level 1: SELECT Basics
  {
    id: 'school-select-001',
    level: 1,
    category: 'select',
    title: 'Alla studenter',
    brief: 'Lista alla studenters för- och efternamn.',
    database: 'school',
    expectedColumns: ['first_name', 'last_name'],
    hints: ['Tabellen heter students', 'Välj kolumnerna first_name och last_name'],
    solution: 'SELECT first_name, last_name FROM students',
    courseGoals: [1],
    difficulty: 'beginner'
  },
  {
    id: 'school-select-002',
    level: 1,
    category: 'select',
    title: 'Kurslista',
    brief: 'Visa alla kurser med kurskod och kursnamn.',
    database: 'school',
    expectedColumns: ['course_code', 'course_name'],
    hints: ['Tabellen heter courses', 'Kolumnerna heter course_code och course_name'],
    solution: 'SELECT course_code, course_name FROM courses',
    courseGoals: [1],
    difficulty: 'beginner'
  },
  {
    id: 'school-select-003',
    level: 1,
    category: 'select',
    title: 'Lärare',
    brief: 'Hämta alla lärares namn och avdelning.',
    database: 'school',
    expectedColumns: ['first_name', 'last_name', 'department'],
    hints: ['Tabellen heter teachers', 'Välj tre kolumner'],
    solution: 'SELECT first_name, last_name, department FROM teachers',
    courseGoals: [1],
    difficulty: 'beginner'
  },
  {
    id: 'school-select-004',
    level: 1,
    category: 'select',
    title: 'Program',
    brief: 'Visa alla program med namn och längd i år.',
    database: 'school',
    expectedColumns: ['program_name', 'duration_years'],
    hints: ['Tabellen heter programs', 'Kolumnen för längd heter duration_years'],
    solution: 'SELECT program_name, duration_years FROM programs',
    courseGoals: [1],
    difficulty: 'beginner'
  },
  // Level 2: WHERE
  {
    id: 'school-where-001',
    level: 2,
    category: 'where',
    title: 'Kurser med många poäng',
    brief: 'Hitta kurser som ger fler än 5 poäng.',
    database: 'school',
    expectedColumns: ['course_name', 'credits'],
    hints: ['Filtrera på credits-kolumnen', 'Använd > för större än'],
    solution: 'SELECT course_name, credits FROM courses WHERE credits > 5',
    courseGoals: [1],
    difficulty: 'beginner'
  },
  {
    id: 'school-where-002',
    level: 2,
    category: 'where',
    title: 'IT-avdelningen',
    brief: 'Lista lärare som arbetar på IT-avdelningen.',
    database: 'school',
    expectedColumns: ['first_name', 'last_name'],
    hints: ['Filtrera på department', 'Textvärden ska vara inom citattecken'],
    solution: "SELECT first_name, last_name FROM teachers WHERE department = 'IT'",
    courseGoals: [1],
    difficulty: 'beginner'
  },
  {
    id: 'school-where-003',
    level: 2,
    category: 'where',
    title: 'Nyare studenter',
    brief: 'Hitta studenter som enrollade efter 2023-01-01.',
    database: 'school',
    expectedColumns: ['first_name', 'last_name', 'enrollment_date'],
    hints: ['Filtrera på enrollment_date', 'Datum jämförs som text i SQLite'],
    solution: "SELECT first_name, last_name, enrollment_date FROM students WHERE enrollment_date > '2023-01-01'",
    courseGoals: [1],
    difficulty: 'intermediate'
  },
  // Level 3: ORDER BY
  {
    id: 'school-order-001',
    level: 3,
    category: 'order',
    title: 'Lärarlöner',
    brief: 'Visa lärare sorterade efter lön, högst först.',
    database: 'school',
    expectedColumns: ['first_name', 'last_name', 'salary'],
    hints: ['Sortera på salary med DESC', 'ORDER BY kommer efter FROM'],
    solution: 'SELECT first_name, last_name, salary FROM teachers ORDER BY salary DESC',
    courseGoals: [1],
    difficulty: 'beginner'
  },
  {
    id: 'school-order-002',
    level: 3,
    category: 'order',
    title: 'Topp 5 kurser',
    brief: 'Hämta de 5 kurser som ger flest poäng.',
    database: 'school',
    expectedColumns: ['course_name', 'credits'],
    expectedRowCount: 5,
    hints: ['Kombinera ORDER BY DESC med LIMIT', 'Sortera på credits'],
    solution: 'SELECT course_name, credits FROM courses ORDER BY credits DESC LIMIT 5',
    courseGoals: [1],
    difficulty: 'beginner'
  },
  // Level 4: GROUP BY
  {
    id: 'school-group-001',
    level: 4,
    category: 'group',
    title: 'Studenter per program',
    brief: 'Räkna antal studenter i varje program.',
    database: 'school',
    expectedColumns: ['program_id', 'student_count'],
    hints: ['GROUP BY program_id', 'Använd COUNT(*) för att räkna'],
    solution: 'SELECT program_id, COUNT(*) AS student_count FROM students GROUP BY program_id',
    courseGoals: [1],
    difficulty: 'intermediate'
  },
  {
    id: 'school-group-002',
    level: 4,
    category: 'aggregate',
    title: 'Snittlön per avdelning',
    brief: 'Beräkna genomsnittslön för varje avdelning.',
    database: 'school',
    expectedColumns: ['department', 'avg_salary'],
    hints: ['Använd AVG() och GROUP BY', 'Gruppera på department'],
    solution: 'SELECT department, AVG(salary) AS avg_salary FROM teachers GROUP BY department',
    courseGoals: [1],
    difficulty: 'intermediate'
  },
  // Level 5: JOIN
  {
    id: 'school-join-001',
    level: 5,
    category: 'join',
    title: 'Kurser med lärare',
    brief: 'Visa kursnamn tillsammans med lärarens namn.',
    database: 'school',
    expectedColumns: ['course_name', 'first_name', 'last_name'],
    hints: ['JOIN courses med teachers', 'Kopplingsnyckel: teacher_id'],
    solution: 'SELECT courses.course_name, teachers.first_name, teachers.last_name FROM courses JOIN teachers ON courses.teacher_id = teachers.teacher_id',
    courseGoals: [1, 5],
    difficulty: 'beginner'
  },
  {
    id: 'school-join-002',
    level: 5,
    category: 'join',
    title: 'Studenters betyg',
    brief: 'Visa studentnamn, kursnamn och betyg.',
    database: 'school',
    expectedColumns: ['first_name', 'last_name', 'course_name', 'grade'],
    hints: ['Tre tabeller: students, enrollments, courses', 'Två JOIN behövs'],
    solution: 'SELECT students.first_name, students.last_name, courses.course_name, enrollments.grade FROM students JOIN enrollments ON students.student_id = enrollments.student_id JOIN courses ON enrollments.course_id = courses.course_id',
    courseGoals: [1, 5],
    difficulty: 'intermediate'
  },
  {
    id: 'school-join-003',
    level: 5,
    category: 'join',
    title: 'Studenter med program',
    brief: 'Lista studenter med deras programnamn.',
    database: 'school',
    expectedColumns: ['first_name', 'last_name', 'program_name'],
    hints: ['JOIN students med programs', 'Koppla via program_id'],
    solution: 'SELECT students.first_name, students.last_name, programs.program_name FROM students JOIN programs ON students.program_id = programs.program_id',
    courseGoals: [1, 5],
    difficulty: 'beginner'
  },
  // Level 6: Advanced
  {
    id: 'school-advanced-001',
    level: 6,
    category: 'subquery',
    title: 'Lärare över snitt',
    brief: 'Hitta lärare som tjänar mer än genomsnittet.',
    database: 'school',
    expectedColumns: ['first_name', 'last_name', 'salary'],
    hints: ['Subquery för att beräkna AVG(salary)', 'WHERE salary > (SELECT ...)'],
    solution: 'SELECT first_name, last_name, salary FROM teachers WHERE salary > (SELECT AVG(salary) FROM teachers)',
    courseGoals: [1],
    difficulty: 'intermediate'
  },
  {
    id: 'school-advanced-002',
    level: 6,
    category: 'subquery',
    title: 'Boss: Kursstatistik',
    brief: 'Visa kurser med antal inskrivna studenter och snittbetyg.',
    database: 'school',
    expectedColumns: ['course_name', 'student_count', 'avg_grade'],
    hints: ['JOIN courses med enrollments', 'COUNT och AVG med GROUP BY'],
    solution: 'SELECT courses.course_name, COUNT(enrollments.student_id) AS student_count, AVG(CASE WHEN enrollments.grade = "A" THEN 5 WHEN enrollments.grade = "B" THEN 4 WHEN enrollments.grade = "C" THEN 3 WHEN enrollments.grade = "D" THEN 2 WHEN enrollments.grade = "F" THEN 1 ELSE NULL END) AS avg_grade FROM courses LEFT JOIN enrollments ON courses.course_id = enrollments.course_id GROUP BY courses.course_id, courses.course_name',
    courseGoals: [1, 5],
    difficulty: 'boss'
  }
];

export const hanukkahMysteries: Exercise[] = [
  // LEVEL 1: SELECT Basics för Hanukkah (Official Schema)
  {
    id: 'hanukkah-select-001',
    level: 1,
    category: 'select',
    title: 'Alla kunder',
    brief: 'Lista alla kunder med namn och telefonnummer.',
    database: 'hanukkah',
    expectedColumns: ['name', 'phone'],
    hints: ['Välj kolumnerna name och phone', 'Tabellen heter customers'],
    solution: 'SELECT name, phone FROM customers',
    courseGoals: [1],
    difficulty: 'beginner'
  },
  {
    id: 'hanukkah-select-002',
    level: 1,
    category: 'select',
    title: 'Produktlista',
    brief: 'Visa alla produkter med SKU och beskrivning (desc).',
    database: 'hanukkah',
    expectedColumns: ['sku', 'desc'],
    hints: ['Kolumnerna heter sku och desc', 'Tabellen heter products'],
    solution: 'SELECT sku, desc FROM products',
    courseGoals: [1],
    difficulty: 'beginner'
  },
  {
    id: 'hanukkah-select-003',
    level: 1,
    category: 'select',
    title: 'Alla ordrar',
    brief: 'Hämta orderid och ordered (tidpunkt) från orders-tabellen.',
    database: 'hanukkah',
    expectedColumns: ['orderid', 'ordered'],
    hints: ['Välj orderid och ordered', 'Tabellen heter orders'],
    solution: 'SELECT orderid, ordered FROM orders',
    courseGoals: [1],
    difficulty: 'beginner'
  },
  // LEVEL 2: WHERE för Hanukkah
  {
    id: 'hanukkah-where-001',
    level: 2,
    category: 'where',
    title: 'Kunder i Brooklyn',
    brief: 'Hitta alla kunder som bor i Brooklyn (citystatezip innehåller Brooklyn).',
    database: 'hanukkah',
    expectedColumns: ['name', 'citystatezip'],
    hints: ['Använd WHERE med LIKE för att filtrera', 'citystatezip innehåller stad, stat och postnummer'],
    solution: "SELECT name, citystatezip FROM customers WHERE citystatezip LIKE '%Brooklyn%'",
    courseGoals: [1],
    difficulty: 'beginner'
  },
  {
    id: 'hanukkah-where-002',
    level: 2,
    category: 'where',
    title: 'Telefonnummer som börjar med 212',
    brief: 'Hitta kunder vars telefonnummer börjar med 212.',
    database: 'hanukkah',
    expectedColumns: ['name', 'phone'],
    hints: ['Använd LIKE för mönstermatchning', '% matchar noll eller flera tecken'],
    solution: "SELECT name, phone FROM customers WHERE phone LIKE '212%'",
    courseGoals: [1],
    difficulty: 'beginner'
  },
  // LEVEL 3: Hanukkah Mystery - Ljus 1-2
  {
    id: 'hanukkah-001',
    level: 3,
    category: 'where',
    title: 'Ljus 1: Manhattan-kunder',
    brief: 'Hitta alla kunder vars telefonnummer börjar med riktnummer 212 (Manhattan).',
    database: 'hanukkah',
    expectedColumns: ['name', 'phone'],
    hints: ['Använd LIKE med % i slutet för att matcha början', 'Mönster: 212%'],
    solution: "SELECT name, phone FROM customers WHERE phone LIKE '212%'",
    courseGoals: [1],
    difficulty: 'beginner'
  },
  {
    id: 'hanukkah-002',
    level: 3,
    category: 'where',
    title: 'Ljus 2: Den generösa givaren',
    brief: 'Hitta kunden som spenderat mest totalt.',
    database: 'hanukkah',
    expectedColumns: ['name', 'total_spent'],
    hints: ['JOIN customers med orders och orders_items', 'Använd SUM för att summera, GROUP BY för att gruppera', 'ORDER BY DESC LIMIT 1 för att få högsta värdet'],
    solution: 'SELECT customers.name, SUM(orders_items.qty * orders_items.unit_price) AS total_spent FROM customers JOIN orders ON customers.customerid = orders.customerid JOIN orders_items ON orders.orderid = orders_items.orderid GROUP BY customers.customerid, customers.name ORDER BY total_spent DESC LIMIT 1',
    courseGoals: [1, 5],
    difficulty: 'beginner'
  },
  // LEVEL 4: Hanukkah Mystery - Ljus 3-5
  {
    id: 'hanukkah-003',
    level: 4,
    category: 'join',
    title: 'Ljus 3: Nattugglans köp',
    brief: 'Hitta ordrar som gjorts efter klockan 22:00 (ordered innehåller timestamp).',
    database: 'hanukkah',
    expectedColumns: ['orderid', 'customerid', 'ordered'],
    hints: ['Kolumnen ordered innehåller datum och tid som timestamp', 'Använd TIME() för att extrahera tiden', 'Filtrera med WHERE TIME(ordered) > "22:00"'],
    solution: "SELECT orderid, customerid, ordered FROM orders WHERE TIME(ordered) > '22:00'",
    courseGoals: [1],
    difficulty: 'intermediate'
  },
  {
    id: 'hanukkah-004',
    level: 4,
    category: 'join',
    title: 'Ljus 4: Samma adress',
    brief: 'Hitta par av kunder som bor på samma adress.',
    database: 'hanukkah',
    expectedColumns: ['customer1', 'customer2', 'address'],
    hints: ['Self-join: joina customers med sig själv', 'Använd alias som c1 och c2', 'Villkor: c1.address = c2.address AND c1.customerid < c2.customerid'],
    solution: 'SELECT c1.name AS customer1, c2.name AS customer2, c1.address FROM customers c1 JOIN customers c2 ON c1.address = c2.address AND c1.customerid < c2.customerid',
    courseGoals: [1, 5],
    difficulty: 'intermediate'
  },
  {
    id: 'hanukkah-005',
    level: 4,
    category: 'aggregate',
    title: 'Ljus 5: Den populära produkten',
    brief: 'Hitta produkten som sålts i flest olika ordrar.',
    database: 'hanukkah',
    expectedColumns: ['desc', 'order_count'],
    hints: ['JOIN products med orders_items på sku', 'COUNT(DISTINCT orderid) räknar unika ordrar', 'GROUP BY product och ORDER BY DESC LIMIT 1'],
    solution: 'SELECT products.desc, COUNT(DISTINCT orders_items.orderid) AS order_count FROM products JOIN orders_items ON products.sku = orders_items.sku GROUP BY products.sku, products.desc ORDER BY order_count DESC LIMIT 1',
    courseGoals: [1],
    difficulty: 'intermediate'
  },
  // LEVEL 5: Hanukkah Mystery - Ljus 6-7
  {
    id: 'hanukkah-006',
    level: 5,
    category: 'subquery',
    title: 'Ljus 6: Ensamma köparen',
    brief: 'Hitta kunden som är ensam om att ha köpt en specifik produkt.',
    database: 'hanukkah',
    expectedColumns: ['customer_name', 'product_desc'],
    hints: ['Hitta produkter som bara köpts av en kund', 'Subquery med HAVING COUNT(DISTINCT customerid) = 1', 'JOIN för att få kund- och produktnamn'],
    solution: 'SELECT customers.name AS customer_name, products.desc AS product_desc FROM customers JOIN orders ON customers.customerid = orders.customerid JOIN orders_items ON orders.orderid = orders_items.orderid JOIN products ON orders_items.sku = products.sku WHERE orders_items.sku IN (SELECT sku FROM orders_items JOIN orders ON orders_items.orderid = orders.orderid GROUP BY sku HAVING COUNT(DISTINCT customerid) = 1)',
    courseGoals: [1],
    difficulty: 'advanced'
  },
  {
    id: 'hanukkah-007',
    level: 5,
    category: 'join',
    title: 'Ljus 7: Grannarnas köp',
    brief: 'Lista kunder i samma stad (extrahera från citystatezip).',
    database: 'hanukkah',
    expectedColumns: ['customer1', 'customer2', 'city'],
    hints: ['citystatezip har format: "City, ST ZIP"', 'Använd SUBSTR för att extrahera stad', 'Self-join där staden matchar'],
    solution: "SELECT c1.name AS customer1, c2.name AS customer2, SUBSTR(c1.citystatezip, 1, INSTR(c1.citystatezip, ',') - 1) AS city FROM customers c1 JOIN customers c2 ON SUBSTR(c1.citystatezip, 1, INSTR(c1.citystatezip, ',') - 1) = SUBSTR(c2.citystatezip, 1, INSTR(c2.citystatezip, ',') - 1) AND c1.customerid < c2.customerid",
    courseGoals: [1],
    difficulty: 'advanced'
  },
  // LEVEL 6: Hanukkah Mystery - Ljus 8 (Boss)
  {
    id: 'hanukkah-008',
    level: 6,
    category: 'subquery',
    title: 'Ljus 8: Shamash - Final Mystery',
    brief: 'Hitta kunden vars köpmönster avslöjar mysteriet. Ledtråd: Födelsedatum och första bokstaven.',
    database: 'hanukkah',
    expectedColumns: ['customer_name', 'clue'],
    hints: ['Kombinera SUBSTR på namn med datum-information', 'Titta på birthdate-kolumnen', 'GROUP BY kan avslöja mönster'],
    solution: "SELECT name AS customer_name, SUBSTR(name, 1, 1) || ' - ' || birthdate AS clue FROM customers WHERE SUBSTR(birthdate, 6, 5) = '12-25'",
    courseGoals: [1, 6],
    difficulty: 'boss'
  }
];

export function getExercisesByLevel(level: number): Exercise[] {
  return exercises.filter(exercise => exercise.level === level);
}

export function getExercisesByCategory(category: Exercise['category']): Exercise[] {
  return exercises.filter(exercise => exercise.category === category);
}

export function getAvailableLevelsForDatabase(database: string): number[] {
  const levels = new Set<number>();
  allExercises
    .filter(e => e.database === database)
    .forEach(e => levels.add(e.level));
  return Array.from(levels).sort((a, b) => a - b);
}

export function getExerciseCountByLevelAndDatabase(level: number, database: string): number {
  return allExercises.filter(e => e.level === level && e.database === database && e.difficulty !== 'boss').length;
}

// Combined list of all exercises
export const allExercises = [...exercises, ...hanukkahMysteries];

export function getExerciseById(id: string): Exercise | undefined {
  return allExercises.find(exercise => exercise.id === id);
}

export function getBossExercise(level: number): Exercise | undefined {
  return allExercises.find(exercise => exercise.level === level && exercise.difficulty === 'boss');
}

export function getBossExerciseForDatabase(level: number, database: string): Exercise | undefined {
  return allExercises.find(exercise =>
    exercise.level === level &&
    exercise.difficulty === 'boss' &&
    exercise.database === database
  ) || allExercises.find(exercise => exercise.level === level && exercise.difficulty === 'boss');
}

export function getRandomExercises(level: number, count: number, excludeIds: string[] = [], database?: string): Exercise[] {
  let available = allExercises.filter(
    exercise => exercise.level === level &&
      exercise.difficulty !== 'boss' &&
      !excludeIds.includes(exercise.id)
  );

  // Filter by database if specified
  if (database) {
    const dbFiltered = available.filter(exercise => exercise.database === database);
    if (dbFiltered.length > 0) {
      available = dbFiltered;
    }
  }

  const shuffled = available.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}
