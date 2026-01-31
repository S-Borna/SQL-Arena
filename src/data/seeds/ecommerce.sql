-- E-Commerce Database Schema and Seed Data
-- Covers course goals: 1, 2, 5, 9, 10, 12

-- Customers table
CREATE TABLE customers (
    customer_id INTEGER PRIMARY KEY,
    customer_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    address TEXT,
    city TEXT,
    country TEXT DEFAULT 'Sweden',
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Products table
CREATE TABLE products (
    product_id INTEGER PRIMARY KEY,
    product_name TEXT NOT NULL,
    category TEXT NOT NULL,
    price REAL NOT NULL CHECK (price >= 0),
    stock_quantity INTEGER NOT NULL DEFAULT 0,
    description TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Orders table
CREATE TABLE orders (
    order_id INTEGER PRIMARY KEY,
    customer_id INTEGER NOT NULL,
    order_date TEXT NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
    shipping_address TEXT,
    total_amount REAL DEFAULT 0,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);

-- Order items table
CREATE TABLE order_items (
    item_id INTEGER PRIMARY KEY,
    order_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    unit_price REAL NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

-- Categories table for normalization examples
CREATE TABLE categories (
    category_id INTEGER PRIMARY KEY,
    category_name TEXT UNIQUE NOT NULL,
    description TEXT
);

-- Insert categories
INSERT INTO categories (category_name, description) VALUES
    ('Electronics', 'Electronic devices and accessories'),
    ('Books', 'Physical and digital books'),
    ('Clothing', 'Apparel and fashion items'),
    ('Home', 'Home and garden products'),
    ('Sports', 'Sports equipment and accessories');

-- Insert customers
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
    ('Oscar Holm', 'oscar.holm@email.se', '070-012-3456', 'Linnégatan 7', 'Göteborg'),
    ('Ida Fransson', 'ida.fransson@email.se', '070-111-2222', 'Norra Vallgatan 3', 'Malmö'),
    ('Viktor Sandström', 'viktor.sandstrom@email.se', '070-222-3333', 'Dragarbrunnsgatan 55', 'Uppsala'),
    ('Clara Nyström', 'clara.nystrom@email.se', '070-333-4444', 'Hornsgatan 82', 'Stockholm'),
    ('Marcus Lindgren', 'marcus.lindgren@email.se', '070-444-5555', 'Haga Nygata 11', 'Göteborg'),
    ('Elin Bergman', 'elin.bergman@email.se', '070-555-6666', 'Lilla Torg 9', 'Malmö');

-- Insert products
INSERT INTO products (product_name, category, price, stock_quantity, description) VALUES
    ('Laptop Pro 15', 'Electronics', 12999.00, 25, 'High-performance laptop with 15-inch display'),
    ('Wireless Mouse', 'Electronics', 299.00, 150, 'Ergonomic wireless mouse'),
    ('USB-C Hub', 'Electronics', 599.00, 8, '7-in-1 USB-C hub'),
    ('Mechanical Keyboard', 'Electronics', 1299.00, 12, 'RGB mechanical keyboard'),
    ('Monitor 27 inch', 'Electronics', 3499.00, 5, '4K IPS monitor'),
    ('Webcam HD', 'Electronics', 799.00, 60, '1080p webcam with microphone'),
    ('Headphones Wireless', 'Electronics', 1899.00, 15, 'Noise-cancelling wireless headphones'),
    ('Tablet 10 inch', 'Electronics', 4999.00, 35, '10-inch tablet with stylus'),
    ('Smart Watch', 'Electronics', 2499.00, 55, 'Fitness tracking smart watch'),
    ('Portable Charger', 'Electronics', 399.00, 100, '20000mAh portable charger'),
    ('SQL Fundamentals', 'Books', 349.00, 75, 'Complete guide to SQL'),
    ('Database Design Patterns', 'Books', 449.00, 50, 'Best practices for database design'),
    ('Python Programming', 'Books', 399.00, 65, 'Learn Python from scratch'),
    ('Web Development Guide', 'Books', 379.00, 55, 'Modern web development techniques'),
    ('Data Science Handbook', 'Books', 499.00, 18, 'Introduction to data science'),
    ('Clean Code', 'Books', 429.00, 60, 'Writing maintainable code'),
    ('System Design', 'Books', 549.00, 7, 'Large-scale system design'),
    ('Algorithms Explained', 'Books', 469.00, 45, 'Common algorithms and data structures'),
    ('Cloud Architecture', 'Books', 529.00, 3, 'Designing cloud-native applications'),
    ('DevOps Practices', 'Books', 419.00, 50, 'Modern DevOps workflows'),
    ('JavaScript Mastery', 'Books', 389.00, 40, 'Advanced JavaScript techniques'),
    ('Linux Administration', 'Books', 459.00, 35, 'System administration guide'),
    ('Machine Learning Intro', 'Books', 519.00, 30, 'Getting started with ML'),
    ('Git Version Control', 'Books', 299.00, 55, 'Complete Git handbook'),
    ('Docker Containers', 'Books', 479.00, 25, 'Container orchestration guide'),
    ('Kubernetes in Action', 'Books', 559.00, 20, 'K8s deployment strategies'),
    ('Cotton T-Shirt', 'Clothing', 199.00, 200, 'Comfortable cotton t-shirt'),
    ('Jeans Classic', 'Clothing', 599.00, 120, 'Classic fit jeans'),
    ('Hoodie Premium', 'Clothing', 449.00, 80, 'Soft premium hoodie'),
    ('Sports Jacket', 'Clothing', 899.00, 45, 'Lightweight sports jacket'),
    ('Winter Coat', 'Clothing', 1499.00, 10, 'Warm winter coat'),
    ('Running Shoes', 'Sports', 999.00, 70, 'Professional running shoes'),
    ('Yoga Mat', 'Sports', 299.00, 90, 'Non-slip yoga mat'),
    ('Dumbbell Set', 'Sports', 799.00, 19, 'Adjustable dumbbell set'),
    ('Tennis Racket', 'Sports', 649.00, 35, 'Professional tennis racket'),
    ('Soccer Ball', 'Sports', 249.00, 60, 'Official size soccer ball'),
    ('Coffee Maker', 'Home', 1299.00, 50, 'Programmable coffee maker'),
    ('Desk Lamp', 'Home', 349.00, 85, 'LED desk lamp with dimmer'),
    ('Plant Pot Set', 'Home', 199.00, 100, 'Set of 3 ceramic plant pots'),
    ('Kitchen Scale', 'Home', 249.00, 75, 'Digital kitchen scale'),
    ('Throw Blanket', 'Home', 299.00, 65, 'Soft fleece throw blanket');

-- Insert orders
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
    (9, '2024-02-15', 'delivered', 'Birger Jarlsgatan 18, Stockholm', 2797.00),
    (2, '2024-02-18', 'delivered', 'Kungsgatan 15, Göteborg', 699.00),
    (10, '2024-02-20', 'processing', 'Linnégatan 7, Göteborg', 1948.00),
    (3, '2024-02-22', 'delivered', 'Drottninggatan 22, Malmö', 3997.00),
    (11, '2024-02-25', 'shipped', 'Norra Vallgatan 3, Malmö', 2098.00),
    (12, '2024-02-28', 'delivered', 'Dragarbrunnsgatan 55, Uppsala', 799.00),
    (4, '2024-03-01', 'delivered', 'Vasagatan 8, Uppsala', 1547.00),
    (13, '2024-03-05', 'processing', 'Hornsgatan 82, Stockholm', 6498.00),
    (14, '2024-03-08', 'pending', 'Haga Nygata 11, Göteborg', 998.00),
    (5, '2024-03-10', 'delivered', 'Sveavägen 44, Stockholm', 2398.00),
    (15, '2024-03-12', 'shipped', 'Lilla Torg 9, Malmö', 1297.00),
    (1, '2024-03-15', 'delivered', 'Storgatan 1, Stockholm', 2499.00),
    (2, '2024-03-18', 'delivered', 'Kungsgatan 15, Göteborg', 1299.00),
    (1, '2024-03-20', 'processing', 'Storgatan 1, Stockholm', 799.00),
    (3, '2024-03-22', 'shipped', 'Drottninggatan 22, Malmö', 549.00);

-- Insert order items
INSERT INTO order_items (order_id, product_id, quantity, unit_price) VALUES
    (1, 1, 1, 12999.00),
    (1, 2, 1, 299.00),
    (2, 3, 1, 599.00),
    (2, 2, 1, 299.00),
    (3, 7, 1, 1899.00),
    (3, 33, 1, 199.00),
    (3, 35, 1, 299.00),
    (4, 8, 1, 4999.00),
    (4, 10, 1, 399.00),
    (5, 11, 1, 349.00),
    (5, 10, 1, 399.00),
    (6, 5, 1, 3499.00),
    (6, 2, 1, 299.00),
    (7, 4, 1, 1299.00),
    (7, 2, 1, 299.00),
    (8, 8, 1, 4999.00),
    (9, 3, 1, 599.00),
    (9, 2, 1, 299.00),
    (10, 9, 1, 2499.00),
    (10, 27, 1, 299.00),
    (11, 12, 1, 449.00),
    (11, 34, 1, 249.00),
    (12, 6, 1, 799.00),
    (12, 32, 1, 349.00),
    (12, 10, 2, 399.00),
    (13, 5, 1, 3499.00),
    (13, 34, 2, 249.00),
    (14, 7, 1, 1899.00),
    (14, 21, 1, 199.00),
    (15, 6, 1, 799.00),
    (16, 13, 1, 399.00),
    (16, 14, 1, 379.00),
    (16, 15, 1, 499.00),
    (16, 33, 1, 199.00),
    (17, 1, 1, 12999.00),
    (17, 4, 1, 1299.00),
    (17, 3, 1, 599.00),
    (18, 26, 1, 999.00),
    (19, 7, 1, 1899.00),
    (19, 10, 1, 399.00),
    (20, 31, 1, 1299.00),
    (21, 9, 1, 2499.00),
    (22, 4, 1, 1299.00),
    (23, 6, 1, 799.00),
    (24, 17, 1, 549.00);

-- Create indexes for common queries
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_orders_customer ON orders(customer_id);
CREATE INDEX idx_orders_date ON orders(order_date);
CREATE INDEX idx_order_items_order ON order_items(order_id);
CREATE INDEX idx_order_items_product ON order_items(product_id);
