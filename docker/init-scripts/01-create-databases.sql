-- SQL Arena MariaDB Initialization Script
-- Creates ecommerce and chinook databases with sample data

-- Create ecommerce database
CREATE DATABASE IF NOT EXISTS ecommerce;
USE ecommerce;

-- Customers table
CREATE TABLE customers (
    customer_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(50),
    address VARCHAR(255),
    city VARCHAR(100),
    country VARCHAR(100) DEFAULT 'Sweden',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products table
CREATE TABLE products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
    stock_quantity INT NOT NULL DEFAULT 0,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_category (category)
);

-- Orders table
CREATE TABLE orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    order_date DATE NOT NULL,
    status ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
    shipping_address VARCHAR(255),
    total_amount DECIMAL(10,2) DEFAULT 0,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id),
    INDEX idx_customer (customer_id),
    INDEX idx_date (order_date)
);

-- Order items table
CREATE TABLE order_items (
    item_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL CHECK (quantity > 0),
    unit_price DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id),
    INDEX idx_order (order_id),
    INDEX idx_product (product_id)
);

-- Insert sample customers
INSERT INTO customers (customer_name, email, phone, address, city) VALUES
    ('Anna Andersson', 'anna.andersson@email.se', '070-123-4567', 'Storgatan 1', 'Stockholm'),
    ('Erik Eriksson', 'erik.eriksson@email.se', '070-234-5678', 'Kungsgatan 15', 'Göteborg'),
    ('Maria Johansson', 'maria.johansson@email.se', '070-345-6789', 'Drottninggatan 22', 'Malmö'),
    ('Johan Nilsson', 'johan.nilsson@email.se', '070-456-7890', 'Vasagatan 8', 'Uppsala'),
    ('Sofia Lindberg', 'sofia.lindberg@email.se', '070-567-8901', 'Sveavägen 44', 'Stockholm'),
    ('Peter Svensson', 'peter.svensson@email.se', '070-678-9012', 'Östra Hamngatan 5', 'Göteborg'),
    ('Lisa Karlsson', 'lisa.karlsson@email.se', '070-789-0123', 'Amiralsgatan 12', 'Malmö'),
    ('Anders Berg', 'anders.berg@email.se', '070-890-1234', 'Fyrisgatan 30', 'Uppsala'),
    ('Emma Larsson', 'emma.larsson@email.se', '070-901-2345', 'Birger Jarlsgatan 18', 'Stockholm'),
    ('Oscar Holm', 'oscar.holm@email.se', '070-012-3456', 'Linnégatan 7', 'Göteborg');

-- Insert sample products
INSERT INTO products (product_name, category, price, stock_quantity, description) VALUES
    ('Laptop Pro 15', 'Electronics', 12999.00, 25, 'High-performance laptop with 15-inch display'),
    ('Wireless Mouse', 'Electronics', 299.00, 150, 'Ergonomic wireless mouse'),
    ('USB-C Hub', 'Electronics', 599.00, 80, '7-in-1 USB-C hub'),
    ('Mechanical Keyboard', 'Electronics', 1299.00, 45, 'RGB mechanical keyboard'),
    ('Monitor 27 inch', 'Electronics', 3499.00, 30, '4K IPS monitor'),
    ('SQL Fundamentals', 'Books', 349.00, 75, 'Complete guide to SQL'),
    ('Database Design Patterns', 'Books', 449.00, 50, 'Best practices for database design'),
    ('Python Programming', 'Books', 399.00, 65, 'Learn Python from scratch'),
    ('Cotton T-Shirt', 'Clothing', 199.00, 200, 'Comfortable cotton t-shirt'),
    ('Jeans Classic', 'Clothing', 599.00, 120, 'Classic fit jeans'),
    ('Running Shoes', 'Sports', 999.00, 70, 'Professional running shoes'),
    ('Yoga Mat', 'Sports', 299.00, 90, 'Non-slip yoga mat'),
    ('Coffee Maker', 'Home', 1299.00, 50, 'Programmable coffee maker'),
    ('Desk Lamp', 'Home', 349.00, 85, 'LED desk lamp with dimmer'),
    ('Plant Pot Set', 'Home', 199.00, 100, 'Set of 3 ceramic plant pots');

-- Insert sample orders
INSERT INTO orders (customer_id, order_date, status, shipping_address, total_amount) VALUES
    (1, '2024-01-15', 'delivered', 'Storgatan 1, Stockholm', 13298.00),
    (2, '2024-01-18', 'delivered', 'Kungsgatan 15, Göteborg', 898.00),
    (3, '2024-01-20', 'delivered', 'Drottninggatan 22, Malmö', 2148.00),
    (4, '2024-01-22', 'shipped', 'Vasagatan 8, Uppsala', 5398.00),
    (5, '2024-01-25', 'processing', 'Sveavägen 44, Stockholm', 749.00),
    (1, '2024-02-01', 'delivered', 'Storgatan 1, Stockholm', 3798.00),
    (6, '2024-02-05', 'delivered', 'Östra Hamngatan 5, Göteborg', 1598.00),
    (7, '2024-02-08', 'delivered', 'Amiralsgatan 12, Malmö', 4998.00),
    (8, '2024-02-10', 'shipped', 'Fyrisgatan 30, Uppsala', 898.00),
    (9, '2024-02-15', 'delivered', 'Birger Jarlsgatan 18, Stockholm', 2797.00);

-- Insert sample order items
INSERT INTO order_items (order_id, product_id, quantity, unit_price) VALUES
    (1, 1, 1, 12999.00),
    (1, 2, 1, 299.00),
    (2, 3, 1, 599.00),
    (2, 2, 1, 299.00),
    (3, 7, 1, 1899.00),
    (3, 15, 1, 199.00),
    (4, 8, 1, 4999.00),
    (4, 10, 1, 399.00),
    (5, 6, 1, 349.00),
    (5, 10, 1, 399.00),
    (6, 5, 1, 3499.00),
    (6, 2, 1, 299.00),
    (7, 4, 1, 1299.00),
    (7, 2, 1, 299.00),
    (8, 8, 1, 4999.00),
    (9, 3, 1, 599.00),
    (9, 2, 1, 299.00),
    (10, 11, 1, 2499.00),
    (10, 12, 1, 299.00);

-- Create chinook database
CREATE DATABASE IF NOT EXISTS chinook;
USE chinook;

-- Artists table
CREATE TABLE artists (
    ArtistId INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255) NOT NULL
);

-- Albums table
CREATE TABLE albums (
    AlbumId INT AUTO_INCREMENT PRIMARY KEY,
    Title VARCHAR(255) NOT NULL,
    ArtistId INT NOT NULL,
    FOREIGN KEY (ArtistId) REFERENCES artists(ArtistId),
    INDEX idx_artist (ArtistId)
);

-- Genres table
CREATE TABLE genres (
    GenreId INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(120) NOT NULL
);

-- Tracks table
CREATE TABLE tracks (
    TrackId INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(200) NOT NULL,
    AlbumId INT,
    GenreId INT,
    Composer VARCHAR(220),
    Milliseconds INT NOT NULL,
    Bytes INT,
    UnitPrice DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (AlbumId) REFERENCES albums(AlbumId),
    FOREIGN KEY (GenreId) REFERENCES genres(GenreId),
    INDEX idx_album (AlbumId),
    INDEX idx_genre (GenreId)
);

-- Insert sample artists
INSERT INTO artists (Name) VALUES
    ('AC/DC'),
    ('Accept'),
    ('Aerosmith'),
    ('Led Zeppelin'),
    ('Metallica'),
    ('Nirvana'),
    ('Pearl Jam'),
    ('Pink Floyd'),
    ('Queen'),
    ('The Beatles');

-- Insert sample genres
INSERT INTO genres (Name) VALUES
    ('Rock'),
    ('Jazz'),
    ('Metal'),
    ('Alternative'),
    ('Classical'),
    ('Blues'),
    ('Electronic'),
    ('Pop');

-- Insert sample albums
INSERT INTO albums (Title, ArtistId) VALUES
    ('Back in Black', 1),
    ('Highway to Hell', 1),
    ('Balls to the Wall', 2),
    ('Get Your Wings', 3),
    ('Led Zeppelin IV', 4),
    ('Physical Graffiti', 4),
    ('Master of Puppets', 5),
    ('Ride the Lightning', 5),
    ('Nevermind', 6),
    ('In Utero', 6),
    ('Ten', 7),
    ('Vs.', 7),
    ('The Dark Side of the Moon', 8),
    ('Wish You Were Here', 8),
    ('A Night at the Opera', 9),
    ('News of the World', 9),
    ('Abbey Road', 10),
    ('Sgt. Peppers', 10);

-- Insert sample tracks
INSERT INTO tracks (Name, AlbumId, GenreId, Composer, Milliseconds, Bytes, UnitPrice) VALUES
    ('Back In Black', 1, 1, 'Angus Young, Malcolm Young, Brian Johnson', 255227, 5510424, 0.99),
    ('Hells Bells', 1, 1, 'Angus Young, Malcolm Young, Brian Johnson', 312292, 6742728, 0.99),
    ('Highway to Hell', 2, 1, 'Angus Young, Malcolm Young, Bon Scott', 208400, 4507296, 0.99),
    ('Stairway to Heaven', 5, 1, 'Jimmy Page, Robert Plant', 482830, 10413904, 0.99),
    ('Black Dog', 5, 1, 'Jimmy Page, Robert Plant, John Paul Jones', 296672, 6412672, 0.99),
    ('Master of Puppets', 7, 3, 'James Hetfield, Lars Ulrich, Kirk Hammett, Cliff Burton', 515539, 11114828, 0.99),
    ('Battery', 7, 3, 'James Hetfield, Lars Ulrich', 312325, 6745416, 0.99),
    ('Smells Like Teen Spirit', 9, 4, 'Kurt Cobain', 301296, 6507968, 0.99),
    ('Come as You Are', 9, 4, 'Kurt Cobain', 219219, 4736820, 0.99),
    ('Alive', 11, 1, 'Eddie Vedder, Stone Gossard', 341482, 7376368, 0.99),
    ('Even Flow', 11, 1, 'Eddie Vedder, Stone Gossard', 293720, 6346372, 0.99),
    ('Money', 13, 1, 'Roger Waters', 382830, 8269064, 0.99),
    ('Time', 13, 1, 'David Gilmour, Roger Waters, Richard Wright, Nick Mason', 413947, 8943892, 0.99),
    ('Bohemian Rhapsody', 15, 1, 'Freddie Mercury', 354947, 7667260, 0.99),
    ('We Will Rock You', 16, 1, 'Brian May', 122000, 2636636, 0.99),
    ('Come Together', 17, 1, 'John Lennon, Paul McCartney', 260000, 5619432, 0.99),
    ('Here Comes the Sun', 17, 1, 'George Harrison', 185000, 3997480, 0.99);

-- Grant privileges
GRANT ALL PRIVILEGES ON ecommerce.* TO 'arena_user'@'%';
GRANT ALL PRIVILEGES ON chinook.* TO 'arena_user'@'%';
FLUSH PRIVILEGES;
