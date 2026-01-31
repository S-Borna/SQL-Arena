-- Hanukkah of Data Mystery Database
-- Based on the official Hanukkah of Data puzzle: https://hanukkah.bluebird.sh/5784/
-- Schema matches the original Noah's Market database exactly
-- Covers course goals: 1, 5, 6

-- Customers table (exact original schema)
CREATE TABLE customers (
    customerid INTEGER PRIMARY KEY,
    name TEXT,
    address TEXT,
    citystatezip TEXT,
    birthdate TEXT,
    phone TEXT,
    timezone TEXT,
    lat DECIMAL(10,5),
    long DECIMAL(10,5)
);

-- Products table (exact original schema)
CREATE TABLE products (
    sku TEXT PRIMARY KEY,
    desc TEXT,
    wholesale_cost DECIMAL(10,2),
    dims_cm TEXT
);

-- Orders table (exact original schema)
CREATE TABLE orders (
    orderid INTEGER PRIMARY KEY,
    customerid INTEGER,
    ordered TEXT,
    shipped TEXT,
    total DECIMAL(10,2),
    items TEXT
);

-- Order items table (exact original schema)
CREATE TABLE orders_items (
    orderid INTEGER,
    sku TEXT,
    qty INTEGER,
    unit_price DECIMAL(10,2)
);

-- Sample customers (Noah's Market style data)
INSERT INTO customers (customerid, name, address, citystatezip, birthdate, phone, timezone, lat, long) VALUES
    (1001, 'Jacqueline Alvarez', '105N Elizabeth St', 'Manhattan, NY 10013', '1958-01-23', '315-377-5031', 'America/New_York', 40.71817, -73.99747),
    (1002, 'Julie Howell', '185-1 Linden St', 'Brooklyn, NY 11221', '1956-12-03', '680-537-8725', 'America/New_York', 40.69426, -73.92167),
    (1003, 'Christopher Ali', '174-28 Baisley Blvd', 'Jamaica, NY 11434', '2001-09-20', '315-846-6054', 'America/New_York', 40.68902, -73.77347),
    (1004, 'David Cohen', '123 Menorah Lane', 'Brooklyn, NY 11201', '1985-12-15', '212-555-2024', 'America/New_York', 40.69120, -73.99000),
    (1005, 'Sarah Goldstein', '456 Dreidel Drive', 'Manhattan, NY 10001', '1990-06-22', '212-555-3456', 'America/New_York', 40.75020, -73.99700),
    (1006, 'Michael Levy', '789 Latke Street', 'Queens, NY 11375', '1988-03-08', '718-555-4567', 'America/New_York', 40.72150, -73.84500),
    (1007, 'Rachel Shapiro', '321 Candle Court', 'Brooklyn, NY 11215', '1992-09-14', '347-555-5678', 'America/New_York', 40.66200, -73.98600),
    (1008, 'Benjamin Katz', '654 Festival Way', 'Bronx, NY 10451', '1978-11-30', '929-555-6789', 'America/New_York', 40.82000, -73.92200),
    (1009, 'Hannah Rosen', '987 Light Avenue', 'Manhattan, NY 10016', '1995-04-18', '212-555-7890', 'America/New_York', 40.74600, -73.97800),
    (1010, 'Joshua Friedman', '147 Gelt Grove', 'Staten Island, NY 10301', '1982-07-25', '718-555-8901', 'America/New_York', 40.64300, -74.07700),
    (1011, 'Miriam Schwartz', '258 Miracle Mile', 'Brooklyn, NY 11201', '1987-01-03', '347-555-9012', 'America/New_York', 40.69500, -73.99100),
    (1012, 'Aaron Weiss', '369 Temple Terrace', 'Queens, NY 11375', '1993-08-11', '718-555-0123', 'America/New_York', 40.72300, -73.84700),
    (1013, 'Leah Kaplan', '741 Star Street', 'Manhattan, NY 10022', '1989-12-25', '212-555-1234', 'America/New_York', 40.75800, -73.96700),
    (1014, 'Daniel Stern', '852 Holiday Heights', 'Brooklyn, NY 11238', '1991-05-07', '347-555-2345', 'America/New_York', 40.67900, -73.96100),
    (1015, 'Rebecca Klein', '963 Blessing Blvd', 'Bronx, NY 10467', '1986-02-19', '929-555-3456', 'America/New_York', 40.87900, -73.87100),
    (1016, 'Isaac Abraham', '159 Oil Lane', 'Manhattan, NY 10001', '1994-10-31', '212-555-4567', 'America/New_York', 40.74800, -73.99300),
    (1017, 'Esther Bloom', '753 Tradition Trail', 'Queens, NY 11432', '1983-06-14', '718-555-5678', 'America/New_York', 40.71600, -73.79300),
    (1018, 'Nathan Wolf', '486 Heritage Hill', 'Brooklyn, NY 11215', '1997-03-21', '347-555-6789', 'America/New_York', 40.66500, -73.98200),
    (1019, 'Ruth Diamond', '624 Celebration Circle', 'Staten Island, NY 10305', '1980-09-09', '718-555-7890', 'America/New_York', 40.59700, -74.07500),
    (1020, 'Eli Green', '135 Joyful Junction', 'Manhattan, NY 10016', '1996-12-08', '212-555-8901', 'America/New_York', 40.74400, -73.98000);

-- Sample products (Noah's Market style - pet store items)
INSERT INTO products (sku, desc, wholesale_cost, dims_cm) VALUES
    ('PET0002', 'Wet Cat Food, Tuna & Tuna', 0.89, '16.1|5.5|3.2'),
    ('PET0006', 'Vegan Adult Cat Food, Chicken & Chicken', 1.41, '19.9|16.9|0.3'),
    ('PET0019', 'Dry Senior Cat Food, Tuna & Tuna', 0.89, '18.6|8.7|7.2'),
    ('PET0101', 'Premium Dog Food, Beef', 2.50, '20.0|15.0|8.0'),
    ('PET0205', 'Cat Treats, Salmon', 1.25, '10.0|5.0|3.0'),
    ('TOY0001', 'Squeaky Ball', 3.00, '8.0|8.0|8.0'),
    ('TOY0015', 'Catnip Mouse', 2.50, '12.0|5.0|4.0'),
    ('TOY7498', 'Interactive Puzzle Feeder', 12.51, '25.0|20.0|10.0'),
    ('COL0001', 'Dog Collar, Medium', 5.00, '40.0|2.5|0.5'),
    ('COL0025', 'Cat Collar with Bell', 3.50, '30.0|1.5|0.3'),
    ('BED0010', 'Pet Bed, Small', 15.00, '50.0|40.0|15.0'),
    ('BED0020', 'Pet Bed, Large', 25.00, '80.0|60.0|20.0'),
    ('HKW0001', 'Menorah Candles, 44 Pack', 4.00, '15.0|10.0|5.0'),
    ('HKW0002', 'Dreidel Set, Wooden', 5.00, '10.0|10.0|5.0'),
    ('HKW0010', 'Chocolate Gelt, Large Bag', 3.00, '20.0|15.0|5.0'),
    ('HKW0015', 'Latke Mix', 2.50, '18.0|12.0|6.0'),
    ('HKW0020', 'Olive Oil, Extra Virgin', 6.00, '25.0|8.0|8.0'),
    ('HKW0025', 'Sufganiyot Mix', 3.50, '18.0|12.0|6.0'),
    ('PET4491', 'Gourmet Cat Food, Duck', 1.08, '16.0|5.5|3.0'),
    ('PET4571', 'Budget Cat Food, Fish', 0.99, '15.0|5.0|3.0');

-- Sample orders (Noah's Market style with timestamps)
INSERT INTO orders (orderid, customerid, ordered, shipped, total, items) VALUES
    (1001, 1004, '2017-01-31 02:56:45', '2017-01-31 09:00:00', 0.99, NULL),
    (1002, 1005, '2017-01-31 04:13:35', '2017-01-31 12:15:00', 13.59, NULL),
    (1003, 1006, '2017-01-31 04:45:12', '2017-01-31 10:45:00', 1.23, NULL),
    (1004, 1007, '2017-02-15 14:30:00', '2017-02-16 09:00:00', 25.50, NULL),
    (1005, 1008, '2017-03-10 10:15:00', '2017-03-11 11:00:00', 45.99, NULL),
    (1006, 1009, '2017-04-05 22:45:00', '2017-04-06 14:30:00', 18.75, NULL),
    (1007, 1010, '2017-05-20 16:20:00', '2017-05-21 10:00:00', 32.40, NULL),
    (1008, 1011, '2017-06-12 09:00:00', '2017-06-12 15:30:00', 67.25, NULL),
    (1009, 1012, '2017-07-28 23:10:00', '2017-07-29 11:45:00', 12.99, NULL),
    (1010, 1013, '2017-08-14 11:30:00', '2017-08-15 09:00:00', 89.50, NULL),
    (1011, 1014, '2017-09-03 15:45:00', '2017-09-04 10:30:00', 23.75, NULL),
    (1012, 1015, '2017-10-22 22:30:00', '2017-10-23 14:00:00', 156.00, NULL),
    (1013, 1016, '2017-11-18 13:00:00', '2017-11-19 09:30:00', 45.25, NULL),
    (1014, 1017, '2017-12-10 17:20:00', '2017-12-11 11:00:00', 78.99, NULL),
    (1015, 1018, '2017-12-15 10:00:00', '2017-12-16 09:00:00', 34.50, NULL),
    (1016, 1019, '2017-12-18 21:15:00', '2017-12-19 10:30:00', 92.75, NULL),
    (1017, 1020, '2017-12-20 14:45:00', '2017-12-21 09:00:00', 28.99, NULL),
    (1018, 1004, '2018-01-05 08:30:00', '2018-01-05 14:00:00', 55.50, NULL),
    (1019, 1005, '2018-02-14 22:00:00', '2018-02-15 11:30:00', 124.75, NULL),
    (1020, 1006, '2018-03-22 12:30:00', '2018-03-23 09:00:00', 67.25, NULL),
    (1021, 1007, '2018-04-10 16:00:00', '2018-04-11 10:00:00', 43.99, NULL),
    (1022, 1008, '2018-05-28 14:00:00', '2018-05-29 09:30:00', 189.50, NULL),
    (1023, 1009, '2018-06-15 09:30:00', '2018-06-16 11:00:00', 36.75, NULL),
    (1024, 1010, '2018-07-04 23:15:00', '2018-07-05 14:00:00', 78.25, NULL),
    (1025, 1011, '2018-08-20 11:00:00', '2018-08-21 09:00:00', 112.00, NULL),
    (1026, 1012, '2018-09-08 15:30:00', '2018-09-09 10:30:00', 25.99, NULL),
    (1027, 1013, '2018-10-31 22:45:00', '2018-11-01 14:00:00', 145.50, NULL),
    (1028, 1014, '2018-11-22 10:15:00', '2018-11-23 09:00:00', 89.75, NULL),
    (1029, 1015, '2018-12-08 14:30:00', '2018-12-09 11:30:00', 234.00, NULL),
    (1030, 1016, '2018-12-18 17:00:00', '2018-12-19 09:00:00', 67.50, NULL);

-- Sample order items
INSERT INTO orders_items (orderid, sku, qty, unit_price) VALUES
    (1001, 'PET4571', 1, 0.99),
    (1002, 'PET4491', 1, 1.08),
    (1002, 'TOY7498', 1, 12.51),
    (1003, 'PET0002', 1, 0.89),
    (1003, 'PET0019', 1, 0.34),
    (1004, 'TOY0001', 2, 6.00),
    (1004, 'TOY0015', 3, 7.50),
    (1004, 'COL0025', 2, 7.00),
    (1005, 'BED0010', 1, 30.00),
    (1005, 'PET0101', 5, 12.50),
    (1006, 'HKW0001', 2, 8.00),
    (1006, 'HKW0010', 1, 6.00),
    (1007, 'HKW0002', 2, 10.00),
    (1007, 'HKW0015', 3, 7.50),
    (1008, 'BED0020', 1, 50.00),
    (1008, 'COL0001', 2, 10.00),
    (1009, 'PET0205', 4, 5.00),
    (1010, 'HKW0020', 3, 18.00),
    (1010, 'HKW0025', 4, 14.00),
    (1010, 'PET0006', 2, 2.82),
    (1011, 'TOY0001', 3, 9.00),
    (1011, 'TOY0015', 2, 5.00),
    (1012, 'BED0020', 2, 100.00),
    (1012, 'BED0010', 1, 30.00),
    (1013, 'HKW0001', 3, 12.00),
    (1013, 'HKW0002', 2, 10.00),
    (1014, 'PET0101', 10, 25.00),
    (1014, 'PET0205', 8, 10.00),
    (1015, 'HKW0010', 3, 9.00),
    (1015, 'HKW0015', 2, 5.00),
    (1016, 'BED0010', 2, 60.00),
    (1016, 'TOY7498', 1, 25.00),
    (1017, 'COL0001', 2, 10.00),
    (1017, 'COL0025', 3, 10.50),
    (1018, 'PET0002', 10, 8.90),
    (1018, 'PET0019', 15, 13.35),
    (1019, 'HKW0020', 5, 30.00),
    (1019, 'HKW0025', 6, 21.00),
    (1019, 'BED0010', 1, 30.00),
    (1020, 'TOY0001', 5, 15.00),
    (1020, 'TOY0015', 4, 10.00),
    (1021, 'PET0101', 5, 12.50),
    (1021, 'PET0205', 6, 7.50),
    (1022, 'BED0020', 2, 100.00),
    (1022, 'BED0010', 2, 60.00),
    (1023, 'HKW0001', 3, 12.00),
    (1023, 'HKW0010', 2, 6.00),
    (1024, 'COL0001', 4, 20.00),
    (1024, 'COL0025', 5, 17.50),
    (1025, 'PET0006', 20, 28.20),
    (1025, 'PET0002', 30, 26.70),
    (1026, 'TOY0015', 4, 10.00),
    (1026, 'PET0205', 5, 6.25),
    (1027, 'HKW0020', 4, 24.00),
    (1027, 'HKW0025', 5, 17.50),
    (1027, 'BED0020', 1, 50.00),
    (1028, 'PET0101', 12, 30.00),
    (1028, 'TOY0001', 6, 18.00),
    (1029, 'BED0020', 3, 150.00),
    (1029, 'BED0010', 2, 60.00),
    (1030, 'HKW0001', 5, 20.00),
    (1030, 'HKW0002', 4, 20.00),
    (1030, 'HKW0010', 3, 9.00);
