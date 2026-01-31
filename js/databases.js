// =============================================================================
// DATABASES.JS - Flera databaser att välja mellan
// =============================================================================

const DATABASES = {
    // =========================================================================
    // STANDARD E-HANDEL (Default) - Svensk webbutik
    // =========================================================================
    ecommerce: {
        id: 'ecommerce',
        name: '🛒 E-handel (Standard)',
        description: 'Svensk webbutik med produkter, kunder och ordrar. Perfekt för nybörjare!',
        difficulty: 'Nybörjare',
        tables: ['produkter', 'kunder', 'ordrar', 'orderrader', 'kategorier', 'anstalda'],
        setup: `
            -- Kategorier
            CREATE TABLE kategorier (
                id INTEGER PRIMARY KEY,
                namn TEXT NOT NULL,
                beskrivning TEXT
            );
            INSERT INTO kategorier VALUES
                (1, 'Elektronik', 'Datorer, mobiler och tillbehör'),
                (2, 'Kontor', 'Kontorsmöbler och tillbehör'),
                (3, 'Tillbehör', 'Kablar, adaptrar och småprylar'),
                (4, 'Gaming', 'Spel och gaming-utrustning'),
                (5, 'Hem', 'Hemprodukter och inredning');

            -- Produkter
            CREATE TABLE produkter (
                id INTEGER PRIMARY KEY,
                namn TEXT NOT NULL,
                pris REAL NOT NULL,
                lager INTEGER DEFAULT 0,
                kategori_id INTEGER,
                beskrivning TEXT,
                skapad DATE DEFAULT CURRENT_DATE,
                FOREIGN KEY (kategori_id) REFERENCES kategorier(id)
            );
            INSERT INTO produkter VALUES
                (1, 'Laptop Pro 15', 12999, 25, 1, 'Kraftfull laptop för proffs', '2024-01-01'),
                (2, 'Trådlös mus', 299, 150, 3, 'Ergonomisk trådlös mus', '2024-01-02'),
                (3, 'Mekaniskt tangentbord', 899, 45, 1, 'RGB-belysning', '2024-01-03'),
                (4, 'USB-C Hub', 449, 80, 3, '7-i-1 hub', '2024-01-04'),
                (5, 'Skrivbordslampa LED', 349, 60, 2, 'Dimbar LED-lampa', '2024-01-05'),
                (6, 'Ergonomisk stol', 4999, 15, 2, 'Kontorsstol med ländstöd', '2024-01-06'),
                (7, 'Bildskärm 27"', 3499, 30, 1, '4K IPS-panel', '2024-01-07'),
                (8, 'Webbkamera HD', 599, 90, 1, '1080p med mikrofon', '2024-01-08'),
                (9, 'Headset Gaming', 799, 40, 4, 'Surroundljud 7.1', '2024-01-09'),
                (10, 'Musmatta XL', 149, 200, 3, 'Stor musmatta för gaming', '2024-01-10'),
                (11, 'Smartphone X', 9999, 50, 1, 'Senaste modellen', '2024-01-11'),
                (12, 'Tablet Pro', 7999, 35, 1, '12.9 tum skärm', '2024-01-12'),
                (13, 'Skrivbord höj/sänk', 5999, 20, 2, 'Elektriskt höj- och sänkbart', '2024-01-13'),
                (14, 'Bokhylla', 1299, 25, 5, '5 hyllplan i ek', '2024-01-14'),
                (15, 'Gaming PC', 18999, 10, 4, 'RTX 4080, i9', '2024-01-15');

            -- Kunder
            CREATE TABLE kunder (
                id INTEGER PRIMARY KEY,
                namn TEXT NOT NULL,
                email TEXT UNIQUE,
                telefon TEXT,
                stad TEXT,
                adress TEXT,
                postnummer TEXT,
                registrerad DATE DEFAULT CURRENT_DATE
            );
            INSERT INTO kunder VALUES
                (1, 'Anna Andersson', 'anna@example.com', '070-1234567', 'Stockholm', 'Storgatan 1', '11122', '2024-01-01'),
                (2, 'Erik Eriksson', 'erik@example.com', '070-2345678', 'Göteborg', 'Avenyn 42', '41101', '2024-01-02'),
                (3, 'Maria Nilsson', 'maria@example.com', '070-3456789', 'Stockholm', 'Drottninggatan 5', '11151', '2024-01-03'),
                (4, 'Johan Svensson', 'johan@example.com', '070-4567890', 'Malmö', 'Södergatan 8', '21134', '2024-01-04'),
                (5, 'Lisa Larsson', 'lisa@example.com', '070-5678901', 'Uppsala', 'Kungsgatan 12', '75320', '2024-01-05'),
                (6, 'Anders Olsson', 'anders@example.com', '070-6789012', 'Stockholm', 'Vasagatan 22', '11120', '2024-01-06'),
                (7, 'Sara Persson', 'sara@example.com', '070-7890123', 'Göteborg', 'Linnégatan 3', '41304', '2024-01-07'),
                (8, 'Mikael Berg', 'mikael@gmail.com', '070-8901234', 'Lund', 'Stora Södergatan 1', '22223', '2024-01-08'),
                (9, 'Emma Johansson', 'emma@example.com', '070-9012345', 'Örebro', 'Storgatan 15', '70210', '2024-01-09'),
                (10, 'Oscar Lindgren', 'oscar@example.com', '070-0123456', 'Västerås', 'Vasagatan 5', '72215', '2024-01-10');

            -- Anställda
            CREATE TABLE anstalda (
                id INTEGER PRIMARY KEY,
                namn TEXT NOT NULL,
                email TEXT,
                avdelning TEXT,
                lon REAL,
                chef_id INTEGER,
                anstallningsdatum DATE,
                FOREIGN KEY (chef_id) REFERENCES anstalda(id)
            );
            INSERT INTO anstalda VALUES
                (1, 'Karl Chef', 'karl@foretaget.se', 'Ledning', 65000, NULL, '2020-01-15'),
                (2, 'Eva Utvecklare', 'eva@foretaget.se', 'IT', 48000, 1, '2021-03-01'),
                (3, 'Per Programmerare', 'per@foretaget.se', 'IT', 45000, 1, '2021-06-15'),
                (4, 'Stina Säljare', 'stina@foretaget.se', 'Försäljning', 42000, 1, '2022-01-10'),
                (5, 'Olle Kundtjänst', 'olle@foretaget.se', 'Support', 38000, 1, '2022-04-01'),
                (6, 'Nina Designer', 'nina@foretaget.se', 'Design', 44000, 1, '2022-08-15'),
                (7, 'Marcus Marknadsförare', 'marcus@foretaget.se', 'Marknadsföring', 46000, 1, '2023-01-02'),
                (8, 'Linda Lagerarbetare', 'linda@foretaget.se', 'Lager', 35000, 1, '2023-03-15');

            -- Ordrar
            CREATE TABLE ordrar (
                id INTEGER PRIMARY KEY,
                kund_id INTEGER,
                datum DATE,
                status TEXT DEFAULT 'Pending',
                totalt REAL,
                leveransadress TEXT,
                FOREIGN KEY (kund_id) REFERENCES kunder(id)
            );
            INSERT INTO ordrar VALUES
                (1, 1, '2024-01-15', 'Levererad', 13298, 'Storgatan 1, Stockholm'),
                (2, 2, '2024-01-16', 'Levererad', 1198, 'Avenyn 42, Göteborg'),
                (3, 1, '2024-01-17', 'Skickad', 449, 'Storgatan 1, Stockholm'),
                (4, 3, '2024-01-18', 'Levererad', 3499, 'Drottninggatan 5, Stockholm'),
                (5, 4, '2024-01-19', 'Skickad', 5898, 'Södergatan 8, Malmö'),
                (6, 5, '2024-01-20', 'Pending', 12999, 'Kungsgatan 12, Uppsala'),
                (7, 2, '2024-01-21', 'Levererad', 799, 'Avenyn 42, Göteborg'),
                (8, 6, '2024-01-22', 'Skickad', 18999, 'Vasagatan 22, Stockholm'),
                (9, 7, '2024-01-23', 'Pending', 4999, 'Linnégatan 3, Göteborg'),
                (10, 8, '2024-01-24', 'Levererad', 7999, 'Stora Södergatan 1, Lund');

            -- Orderrader
            CREATE TABLE orderrader (
                id INTEGER PRIMARY KEY,
                order_id INTEGER,
                produkt_id INTEGER,
                antal INTEGER,
                pris REAL,
                FOREIGN KEY (order_id) REFERENCES ordrar(id),
                FOREIGN KEY (produkt_id) REFERENCES produkter(id)
            );
            INSERT INTO orderrader VALUES
                (1, 1, 1, 1, 12999),
                (2, 1, 2, 1, 299),
                (3, 2, 3, 1, 899),
                (4, 2, 2, 1, 299),
                (5, 3, 4, 1, 449),
                (6, 4, 7, 1, 3499),
                (7, 5, 6, 1, 4999),
                (8, 5, 3, 1, 899),
                (9, 6, 1, 1, 12999),
                (10, 7, 9, 1, 799),
                (11, 8, 15, 1, 18999),
                (12, 9, 6, 1, 4999),
                (13, 10, 12, 1, 7999);
        `
    },

    // =========================================================================
    // CHINOOK - Klassisk musikdatabas
    // =========================================================================
    chinook: {
        id: 'chinook',
        name: '🎵 Chinook (Musik)',
        description: 'Klassisk övningsdatabas med artister, album, låtar och kunder. Används på universitet världen över!',
        difficulty: 'Nybörjare-Medel',
        tables: ['artists', 'albums', 'tracks', 'genres', 'customers', 'invoices', 'invoice_items', 'employees'],
        setup: `
            -- Artists
            CREATE TABLE artists (
                ArtistId INTEGER PRIMARY KEY,
                Name TEXT NOT NULL
            );
            INSERT INTO artists VALUES
                (1, 'AC/DC'),
                (2, 'Accept'),
                (3, 'Aerosmith'),
                (4, 'Alanis Morissette'),
                (5, 'Alice In Chains'),
                (6, 'ABBA'),
                (7, 'Robyn'),
                (8, 'Avicii'),
                (9, 'Swedish House Mafia'),
                (10, 'Roxette'),
                (11, 'Europe'),
                (12, 'The Beatles'),
                (13, 'Queen'),
                (14, 'Pink Floyd'),
                (15, 'Led Zeppelin');

            -- Albums
            CREATE TABLE albums (
                AlbumId INTEGER PRIMARY KEY,
                Title TEXT NOT NULL,
                ArtistId INTEGER,
                FOREIGN KEY (ArtistId) REFERENCES artists(ArtistId)
            );
            INSERT INTO albums VALUES
                (1, 'Back in Black', 1),
                (2, 'Highway to Hell', 1),
                (3, 'Restless and Wild', 2),
                (4, 'Jagged Little Pill', 4),
                (5, 'Dirt', 5),
                (6, 'Gold: Greatest Hits', 6),
                (7, 'Robyn', 7),
                (8, 'True', 8),
                (9, 'Until Now', 9),
                (10, 'Joyride', 10),
                (11, 'The Final Countdown', 11),
                (12, 'Abbey Road', 12),
                (13, 'A Night at the Opera', 13),
                (14, 'The Dark Side of the Moon', 14),
                (15, 'Led Zeppelin IV', 15);

            -- Genres
            CREATE TABLE genres (
                GenreId INTEGER PRIMARY KEY,
                Name TEXT NOT NULL
            );
            INSERT INTO genres VALUES
                (1, 'Rock'),
                (2, 'Pop'),
                (3, 'Metal'),
                (4, 'Alternative'),
                (5, 'Electronic'),
                (6, 'Jazz'),
                (7, 'Blues'),
                (8, 'Classical'),
                (9, 'Hip Hop'),
                (10, 'Country');

            -- Tracks
            CREATE TABLE tracks (
                TrackId INTEGER PRIMARY KEY,
                Name TEXT NOT NULL,
                AlbumId INTEGER,
                GenreId INTEGER,
                Milliseconds INTEGER,
                Price REAL DEFAULT 0.99,
                FOREIGN KEY (AlbumId) REFERENCES albums(AlbumId),
                FOREIGN KEY (GenreId) REFERENCES genres(GenreId)
            );
            INSERT INTO tracks VALUES
                (1, 'Back In Black', 1, 1, 255000, 0.99),
                (2, 'Hells Bells', 1, 1, 312000, 0.99),
                (3, 'Highway to Hell', 2, 1, 208000, 0.99),
                (4, 'You Shook Me All Night Long', 1, 1, 210000, 0.99),
                (5, 'Dancing Queen', 6, 2, 231000, 0.99),
                (6, 'Mamma Mia', 6, 2, 212000, 0.99),
                (7, 'Wake Me Up', 8, 5, 247000, 1.29),
                (8, 'Levels', 8, 5, 203000, 1.29),
                (9, 'The Final Countdown', 11, 1, 308000, 0.99),
                (10, 'Bohemian Rhapsody', 13, 1, 354000, 1.29),
                (11, 'We Will Rock You', 13, 1, 122000, 0.99),
                (12, 'Stairway to Heaven', 15, 1, 482000, 1.29),
                (13, 'Hey Jude', 12, 1, 431000, 1.29),
                (14, 'Come Together', 12, 1, 259000, 0.99),
                (15, 'Money', 14, 1, 382000, 0.99);

            -- Customers
            CREATE TABLE customers (
                CustomerId INTEGER PRIMARY KEY,
                FirstName TEXT NOT NULL,
                LastName TEXT NOT NULL,
                Email TEXT,
                Country TEXT,
                City TEXT
            );
            INSERT INTO customers VALUES
                (1, 'Luís', 'Gonçalves', 'luisg@embraer.com.br', 'Brazil', 'São Paulo'),
                (2, 'Leonie', 'Köhler', 'leonekohler@surfeu.de', 'Germany', 'Stuttgart'),
                (3, 'François', 'Tremblay', 'ftremblay@gmail.com', 'Canada', 'Montréal'),
                (4, 'Bjørn', 'Hansen', 'bjorn.hansen@yahoo.no', 'Norway', 'Oslo'),
                (5, 'Anna', 'Svensson', 'anna.svensson@gmail.com', 'Sweden', 'Stockholm'),
                (6, 'Erik', 'Lindqvist', 'erik.lindqvist@outlook.com', 'Sweden', 'Göteborg'),
                (7, 'John', 'Smith', 'john.smith@gmail.com', 'USA', 'New York'),
                (8, 'Emma', 'Johnson', 'emma.j@yahoo.com', 'UK', 'London'),
                (9, 'Carlos', 'García', 'carlos.garcia@hotmail.com', 'Spain', 'Madrid'),
                (10, 'Sophie', 'Martin', 'sophie.martin@orange.fr', 'France', 'Paris');

            -- Invoices
            CREATE TABLE invoices (
                InvoiceId INTEGER PRIMARY KEY,
                CustomerId INTEGER,
                InvoiceDate DATE,
                Total REAL,
                FOREIGN KEY (CustomerId) REFERENCES customers(CustomerId)
            );
            INSERT INTO invoices VALUES
                (1, 1, '2024-01-01', 5.94),
                (2, 2, '2024-01-02', 3.96),
                (3, 3, '2024-01-03', 8.91),
                (4, 5, '2024-01-04', 15.86),
                (5, 6, '2024-01-05', 9.90),
                (6, 7, '2024-01-06', 11.94),
                (7, 8, '2024-01-07', 7.92),
                (8, 9, '2024-01-08', 4.95),
                (9, 10, '2024-01-09', 12.87),
                (10, 5, '2024-01-10', 25.86);

            -- Invoice Items
            CREATE TABLE invoice_items (
                InvoiceLineId INTEGER PRIMARY KEY,
                InvoiceId INTEGER,
                TrackId INTEGER,
                UnitPrice REAL,
                Quantity INTEGER,
                FOREIGN KEY (InvoiceId) REFERENCES invoices(InvoiceId),
                FOREIGN KEY (TrackId) REFERENCES tracks(TrackId)
            );
            INSERT INTO invoice_items VALUES
                (1, 1, 1, 0.99, 2),
                (2, 1, 5, 0.99, 4),
                (3, 2, 3, 0.99, 4),
                (4, 3, 7, 1.29, 3),
                (5, 3, 8, 1.29, 4),
                (6, 4, 10, 1.29, 5),
                (7, 4, 12, 1.29, 8),
                (8, 5, 6, 0.99, 10),
                (9, 6, 13, 1.29, 5),
                (10, 6, 14, 0.99, 6);

            -- Employees
            CREATE TABLE employees (
                EmployeeId INTEGER PRIMARY KEY,
                FirstName TEXT,
                LastName TEXT,
                Title TEXT,
                ReportsTo INTEGER,
                HireDate DATE,
                FOREIGN KEY (ReportsTo) REFERENCES employees(EmployeeId)
            );
            INSERT INTO employees VALUES
                (1, 'Andrew', 'Adams', 'General Manager', NULL, '2020-01-01'),
                (2, 'Nancy', 'Edwards', 'Sales Manager', 1, '2020-03-15'),
                (3, 'Jane', 'Peacock', 'Sales Support', 2, '2021-01-02'),
                (4, 'Margaret', 'Park', 'Sales Support', 2, '2021-06-01'),
                (5, 'Steve', 'Johnson', 'IT Manager', 1, '2020-06-01'),
                (6, 'Michael', 'Mitchell', 'IT Staff', 5, '2022-01-15');
        `
    },

    // =========================================================================
    // 🕎 HANUKKAH OF DATA - Mysterier att lösa!
    // =========================================================================
    hanukkah: {
        id: 'hanukkah',
        name: '🕎 Hanukkah of Data',
        description: 'Lös 8 mysterier för att hitta Noahs försvunna matta! Baserad på det berömda "Hanukkah of Data" från hanukkah.bluebird.sh',
        difficulty: 'Medel-Avancerad',
        tables: ['customers', 'orders', 'orders_items', 'products'],
        mysteries: true,
        setup: `
            -- Noah's Market Database (inspirerad av Hanukkah of Data)
            -- En livsmedelsbutik i New York med kunder, ordrar och produkter
            
            -- Kunder
            CREATE TABLE customers (
                customerid INTEGER PRIMARY KEY,
                name TEXT NOT NULL,
                address TEXT,
                citystatezip TEXT,
                birthdate DATE,
                phone TEXT
            );
            INSERT INTO customers VALUES
                (1, 'Sam Amber', '123 Main St', 'New York, NY 10001', '1985-03-15', '212-555-0101'),
                (2, 'Jonathan Parker', '456 Oak Ave', 'Brooklyn, NY 11201', '1978-07-22', '718-555-0102'),
                (3, 'Emily Chen', '789 Pine Rd', 'Queens, NY 11354', '1990-12-01', '917-555-0103'),
                (4, 'David Cohen', '321 Elm St', 'Manhattan, NY 10002', '1982-06-10', '646-555-0104'),
                (5, 'Rachel Green', '654 Maple Dr', 'Bronx, NY 10451', '1988-09-25', '347-555-0105'),
                (6, 'Michael Berg', '987 Cedar Ln', 'Staten Island, NY 10301', '1975-01-30', '718-555-0106'),
                (7, 'Sarah Miller', '147 Birch Way', 'Brooklyn, NY 11215', '1992-04-18', '917-555-0107'),
                (8, 'Joshua Levy', '258 Spruce Ct', 'Queens, NY 11375', '1980-11-05', '718-555-0108'),
                (9, 'Rebecca Gold', '369 Willow Pl', 'Manhattan, NY 10003', '1995-02-28', '212-555-0109'),
                (10, 'Daniel Ross', '741 Ash Blvd', 'Brooklyn, NY 11238', '1987-08-12', '347-555-0110'),
                (11, 'Lisa Katz', '852 Poplar St', 'Bronx, NY 10452', '1979-05-20', '718-555-0111'),
                (12, 'Aaron Fish', '963 Hickory Ave', 'Manhattan, NY 10004', '1993-10-08', '646-555-0112'),
                (13, 'Naomi Pearl', '159 Chestnut Rd', 'Queens, NY 11355', '1984-07-14', '917-555-0113'),
                (14, 'Robert Stone', '267 Sycamore Dr', 'Brooklyn, NY 11216', '1976-03-03', '718-555-0114'),
                (15, 'Hannah Wolf', '378 Magnolia Ln', 'Staten Island, NY 10302', '1991-12-22', '347-555-0115'),
                -- Mysterium 1: Privatdetektiven - namn som matchar telefonnummer
                (16, 'Sam Knopp', '500 5th Ave', 'Manhattan, NY 10110', '1970-08-15', '726-567-7'),
                -- Mysterium 2: Kontraktorn - initialer JP, köpte 2017
                (17, 'Jeremy Pollock', '42 Bagel Lane', 'Brooklyn, NY 11230', '1965-04-10', '718-555-2017'),
                -- Mysterium 3: Katten som älskar katter
                (18, 'Catherine Cat', '99 Feline St', 'Queens, NY 11356', '1989-01-01', '917-555-0118'),
                -- Mysterium 4: Äldsta kunden från visst postnummer
                (19, 'Old Timer', '1 Elder Rd', 'Manhattan, NY 10001', '1940-01-01', '212-555-1940'),
                -- Fler kunder för realism
                (20, 'Adam Silver', '100 Court St', 'Brooklyn, NY 11201', '1983-06-15', '718-555-0120');

            -- Produkter
            CREATE TABLE products (
                sku TEXT PRIMARY KEY,
                desc TEXT NOT NULL,
                wholesale_cost REAL
            );
            INSERT INTO products VALUES
                ('BKY-001', 'Bagel Plain', 0.50),
                ('BKY-002', 'Bagel Everything', 0.75),
                ('BKY-003', 'Croissant', 1.25),
                ('BKY-004', 'Muffin Blueberry', 1.00),
                ('COF-001', 'Coffee Regular', 1.50),
                ('COF-002', 'Coffee Large', 2.00),
                ('COF-003', 'Latte', 3.50),
                ('COF-004', 'Cappuccino', 3.25),
                ('DRY-001', 'Cleaning Supplies Kit', 45.00),
                ('DRY-002', 'Carpet Cleaner Pro', 89.00),
                ('PET-001', 'Cat Food Premium', 25.00),
                ('PET-002', 'Cat Toy Mouse', 5.00),
                ('PET-003', 'Cat Litter', 15.00),
                ('GRO-001', 'Milk 1L', 2.50),
                ('GRO-002', 'Bread Whole Wheat', 3.00),
                ('GRO-003', 'Eggs Dozen', 4.50),
                ('GRO-004', 'Butter', 5.00),
                ('GRO-005', 'Cheese Cheddar', 6.50);

            -- Ordrar
            CREATE TABLE orders (
                orderid INTEGER PRIMARY KEY,
                customerid INTEGER,
                ordered DATE,
                shipped DATE,
                total REAL,
                FOREIGN KEY (customerid) REFERENCES customers(customerid)
            );
            INSERT INTO orders VALUES
                (1, 1, '2024-01-15', '2024-01-15', 15.50),
                (2, 2, '2024-01-16', '2024-01-16', 8.25),
                (3, 3, '2024-01-17', '2024-01-17', 45.00),
                (4, 16, '2024-01-18', '2024-01-18', 12.00),
                (5, 17, '2017-03-15', '2017-03-16', 134.00),
                (6, 17, '2017-03-20', '2017-03-21', 89.00),
                (7, 18, '2024-01-20', '2024-01-20', 45.00),
                (8, 18, '2024-01-25', '2024-01-25', 25.00),
                (9, 4, '2024-01-21', '2024-01-21', 22.50),
                (10, 5, '2024-01-22', '2024-01-22', 18.75),
                (11, 6, '2024-01-23', '2024-01-23', 33.00),
                (12, 7, '2024-01-24', '2024-01-24', 27.25),
                (13, 8, '2024-01-25', '2024-01-25', 41.50),
                (14, 9, '2024-01-26', '2024-01-26', 19.00),
                (15, 10, '2024-01-27', '2024-01-27', 56.75);

            -- Orderrader
            CREATE TABLE orders_items (
                orderid INTEGER,
                sku TEXT,
                qty INTEGER,
                unit_price REAL,
                FOREIGN KEY (orderid) REFERENCES orders(orderid),
                FOREIGN KEY (sku) REFERENCES products(sku)
            );
            INSERT INTO orders_items VALUES
                (1, 'BKY-001', 6, 1.00),
                (1, 'COF-001', 2, 2.50),
                (1, 'COF-002', 2, 3.00),
                (2, 'BKY-002', 3, 1.25),
                (2, 'COF-003', 1, 4.50),
                (3, 'DRY-001', 1, 45.00),
                (4, 'BKY-001', 4, 1.00),
                (4, 'COF-002', 2, 3.00),
                (4, 'COF-004', 1, 4.00),
                (5, 'DRY-001', 1, 45.00),
                (5, 'DRY-002', 1, 89.00),
                (6, 'DRY-002', 1, 89.00),
                (7, 'PET-001', 1, 25.00),
                (7, 'PET-002', 4, 5.00),
                (8, 'PET-001', 1, 25.00),
                (9, 'GRO-001', 2, 3.50),
                (9, 'GRO-002', 2, 4.00),
                (9, 'GRO-003', 1, 5.50),
                (10, 'COF-003', 3, 4.50),
                (10, 'BKY-003', 3, 2.25);
        `
    },

    // =========================================================================
    // SKOLA - Enkel databas för övning
    // =========================================================================
    school: {
        id: 'school',
        name: '🎓 Skola',
        description: 'Enkel databas med elever, kurser och betyg. Perfekt för att öva grunderna!',
        difficulty: 'Nybörjare',
        tables: ['elever', 'kurser', 'betyg', 'larare'],
        setup: `
            -- Lärare
            CREATE TABLE larare (
                id INTEGER PRIMARY KEY,
                namn TEXT NOT NULL,
                amne TEXT,
                email TEXT
            );
            INSERT INTO larare VALUES
                (1, 'Anna Lärare', 'Matematik', 'anna@skolan.se'),
                (2, 'Erik Professor', 'Fysik', 'erik@skolan.se'),
                (3, 'Maria Magister', 'Kemi', 'maria@skolan.se'),
                (4, 'Johan Doktor', 'Biologi', 'johan@skolan.se'),
                (5, 'Lisa Lektor', 'Svenska', 'lisa@skolan.se');

            -- Elever
            CREATE TABLE elever (
                id INTEGER PRIMARY KEY,
                namn TEXT NOT NULL,
                email TEXT,
                klass TEXT,
                fodelsedatum DATE
            );
            INSERT INTO elever VALUES
                (1, 'Alice Alm', 'alice@elev.se', '9A', '2010-03-15'),
                (2, 'Bob Berg', 'bob@elev.se', '9A', '2010-05-22'),
                (3, 'Clara Ceder', 'clara@elev.se', '9B', '2010-01-08'),
                (4, 'David Dahl', 'david@elev.se', '9B', '2010-08-30'),
                (5, 'Eva Ek', 'eva@elev.se', '9A', '2010-11-12'),
                (6, 'Filip Falk', 'filip@elev.se', '9B', '2010-04-25'),
                (7, 'Greta Gran', 'greta@elev.se', '9A', '2010-07-18'),
                (8, 'Hugo Hägg', 'hugo@elev.se', '9B', '2010-02-14');

            -- Kurser
            CREATE TABLE kurser (
                id INTEGER PRIMARY KEY,
                namn TEXT NOT NULL,
                larare_id INTEGER,
                poang INTEGER,
                FOREIGN KEY (larare_id) REFERENCES larare(id)
            );
            INSERT INTO kurser VALUES
                (1, 'Matematik 1', 1, 100),
                (2, 'Fysik 1', 2, 100),
                (3, 'Kemi 1', 3, 100),
                (4, 'Biologi 1', 4, 100),
                (5, 'Svenska 1', 5, 100);

            -- Betyg
            CREATE TABLE betyg (
                id INTEGER PRIMARY KEY,
                elev_id INTEGER,
                kurs_id INTEGER,
                betyg TEXT,
                datum DATE,
                FOREIGN KEY (elev_id) REFERENCES elever(id),
                FOREIGN KEY (kurs_id) REFERENCES kurser(id)
            );
            INSERT INTO betyg VALUES
                (1, 1, 1, 'A', '2024-06-10'),
                (2, 1, 2, 'B', '2024-06-10'),
                (3, 2, 1, 'C', '2024-06-10'),
                (4, 2, 3, 'B', '2024-06-10'),
                (5, 3, 1, 'A', '2024-06-10'),
                (6, 3, 4, 'A', '2024-06-10'),
                (7, 4, 2, 'D', '2024-06-10'),
                (8, 4, 5, 'B', '2024-06-10'),
                (9, 5, 1, 'B', '2024-06-10'),
                (10, 5, 5, 'A', '2024-06-10');
        `
    },

    // =========================================================================
    // FÖRETAG - HR och organisation
    // =========================================================================
    company: {
        id: 'company',
        name: '🏢 Företag (HR)',
        description: 'Företagsdatabas med avdelningar, anställda, projekt och löner. Bra för JOINs!',
        difficulty: 'Medel',
        tables: ['avdelningar', 'anstallda', 'projekt', 'projekt_deltagare', 'lonehistorik'],
        setup: `
            -- Avdelningar
            CREATE TABLE avdelningar (
                id INTEGER PRIMARY KEY,
                namn TEXT NOT NULL,
                budget REAL,
                chef_id INTEGER
            );
            INSERT INTO avdelningar VALUES
                (1, 'IT', 5000000, 1),
                (2, 'Försäljning', 3000000, 4),
                (3, 'HR', 1500000, 7),
                (4, 'Marknadsföring', 2500000, 9),
                (5, 'Ekonomi', 2000000, 11);

            -- Anställda
            CREATE TABLE anstallda (
                id INTEGER PRIMARY KEY,
                fornamn TEXT NOT NULL,
                efternamn TEXT NOT NULL,
                email TEXT,
                avdelning_id INTEGER,
                chef_id INTEGER,
                anstallningsdatum DATE,
                lon REAL,
                FOREIGN KEY (avdelning_id) REFERENCES avdelningar(id),
                FOREIGN KEY (chef_id) REFERENCES anstallda(id)
            );
            INSERT INTO anstallda VALUES
                (1, 'Magnus', 'Magnusson', 'magnus@foretag.se', 1, NULL, '2018-01-15', 75000),
                (2, 'Sara', 'Sarasson', 'sara@foretag.se', 1, 1, '2019-03-01', 55000),
                (3, 'Patrik', 'Patriksson', 'patrik@foretag.se', 1, 1, '2020-06-15', 52000),
                (4, 'Linda', 'Lindqvist', 'linda@foretag.se', 2, NULL, '2017-08-01', 70000),
                (5, 'Martin', 'Martinsson', 'martin@foretag.se', 2, 4, '2021-01-10', 48000),
                (6, 'Elin', 'Elinsdotter', 'elin@foretag.se', 2, 4, '2022-04-01', 45000),
                (7, 'Jonas', 'Jonsson', 'jonas@foretag.se', 3, NULL, '2019-02-15', 60000),
                (8, 'Karin', 'Karinsdotter', 'karin@foretag.se', 3, 7, '2021-09-01', 42000),
                (9, 'Fredrik', 'Fredriksson', 'fredrik@foretag.se', 4, NULL, '2018-11-01', 65000),
                (10, 'Anna', 'Annasdotter', 'anna@foretag.se', 4, 9, '2022-02-15', 47000),
                (11, 'Robert', 'Robertson', 'robert@foretag.se', 5, NULL, '2016-05-01', 72000),
                (12, 'Maria', 'Mariasdotter', 'maria@foretag.se', 5, 11, '2020-08-15', 50000);

            -- Projekt
            CREATE TABLE projekt (
                id INTEGER PRIMARY KEY,
                namn TEXT NOT NULL,
                budget REAL,
                startdatum DATE,
                slutdatum DATE,
                status TEXT
            );
            INSERT INTO projekt VALUES
                (1, 'Ny webbplats', 500000, '2024-01-01', '2024-06-30', 'Pågående'),
                (2, 'CRM Implementation', 800000, '2024-02-01', '2024-12-31', 'Pågående'),
                (3, 'Marknadsföringskampanj', 200000, '2024-03-01', '2024-05-31', 'Avslutad'),
                (4, 'Systemuppdatering', 150000, '2024-04-01', '2024-07-31', 'Pågående'),
                (5, 'Rekryteringsprojekt', 100000, '2024-01-15', '2024-04-15', 'Avslutad');

            -- Projekt-deltagare
            CREATE TABLE projekt_deltagare (
                id INTEGER PRIMARY KEY,
                projekt_id INTEGER,
                anstallda_id INTEGER,
                roll TEXT,
                timmar INTEGER,
                FOREIGN KEY (projekt_id) REFERENCES projekt(id),
                FOREIGN KEY (anstallda_id) REFERENCES anstallda(id)
            );
            INSERT INTO projekt_deltagare VALUES
                (1, 1, 1, 'Projektledare', 200),
                (2, 1, 2, 'Utvecklare', 400),
                (3, 1, 3, 'Utvecklare', 350),
                (4, 2, 1, 'Teknisk rådgivare', 50),
                (5, 2, 5, 'Projektledare', 300),
                (6, 2, 6, 'Säljare', 150),
                (7, 3, 9, 'Projektledare', 200),
                (8, 3, 10, 'Marknadsförare', 300),
                (9, 4, 2, 'Utvecklare', 100),
                (10, 5, 7, 'Projektledare', 150),
                (11, 5, 8, 'HR-specialist', 200);

            -- Lönehistorik
            CREATE TABLE lonehistorik (
                id INTEGER PRIMARY KEY,
                anstallda_id INTEGER,
                lon REAL,
                fran_datum DATE,
                till_datum DATE,
                FOREIGN KEY (anstallda_id) REFERENCES anstallda(id)
            );
            INSERT INTO lonehistorik VALUES
                (1, 1, 60000, '2018-01-15', '2020-01-14'),
                (2, 1, 68000, '2020-01-15', '2022-01-14'),
                (3, 1, 75000, '2022-01-15', NULL),
                (4, 2, 45000, '2019-03-01', '2021-03-01'),
                (5, 2, 50000, '2021-03-02', '2023-03-01'),
                (6, 2, 55000, '2023-03-02', NULL);
        `
    }
};

// =========================================================================
// Hjälpfunktioner
// =========================================================================

function getDatabaseList() {
    return Object.values(DATABASES).map(db => ({
        id: db.id,
        name: db.name,
        emoji: db.name.split(' ')[0], // Extrahera emoji från namn
        description: db.description,
        difficulty: db.difficulty,
        tables: db.tables,
        tableCount: db.tables.length
    }));
}

function getDatabaseById(id) {
    return DATABASES[id] || DATABASES.ecommerce;
}

function getDatabaseSetupSQL(id) {
    const db = getDatabaseById(id);
    return db.setup;
}

// Export för global användning
if (typeof window !== 'undefined') {
    window.DATABASES = DATABASES;
    window.getDatabaseList = getDatabaseList;
    window.getDatabaseById = getDatabaseById;
    window.getDatabaseSetupSQL = getDatabaseSetupSQL;
}
