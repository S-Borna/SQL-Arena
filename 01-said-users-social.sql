-- =========================================
-- Ansvarig: Said
-- Tabeller: Users (5.2) och Social (5.7)
-- =========================================


-- USERS-TABELL (krav 5.2.1)
-- Här registrerar sig användare med användarnamn, lösenord och email.
-- Användarnamn och email måste vara unika.
-- email_confirmed visar om användaren har bekräftat sin email.

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    email_confirmed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- ADDRESSES-TABELL (krav 5.2.2)
-- När en användare handlar behöver de ange en fakturaadress och en leveransadress.
-- address_type kan vara 'billing' eller 'delivery'.
-- user_id pekar på vilken användare adressen tillhör.

CREATE TABLE addresses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    address_type VARCHAR(20) NOT NULL,
    street VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    postal_code VARCHAR(20) NOT NULL,
    country VARCHAR(100) DEFAULT 'Sweden',
    FOREIGN KEY (user_id) REFERENCES users(id)
);


-- MESSAGES-TABELL (krav 5.7.1 och 5.7.2)
-- Användare kan skicka meddelanden till varandra.
-- sender_id = vem som skickar, receiver_id = vem som tar emot.
-- parent_id används för att skapa trådar:
--   Om parent_id är NULL så är det ett nytt meddelande.
--   Om parent_id har ett värde så är det ett svar på det meddelandet.

CREATE TABLE messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sender_id INT NOT NULL,
    receiver_id INT NOT NULL,
    parent_id INT DEFAULT NULL,
    subject VARCHAR(255) DEFAULT NULL,
    body TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES users(id),
    FOREIGN KEY (receiver_id) REFERENCES users(id),
    FOREIGN KEY (parent_id) REFERENCES messages(id)
);


-- =========================================
-- VIEWS
-- =========================================


-- Visar bara användare som har bekräftat sin email.
-- Smidigt om man bara vill jobba med aktiva konton.

CREATE VIEW v_confirmed_users AS
SELECT id, username, email, created_at
FROM users
WHERE email_confirmed = TRUE;


-- Visar användare ihop med deras adresser.
-- LEFT JOIN gör att även användare utan adress syns med.

CREATE VIEW v_user_addresses AS
SELECT
    u.id AS user_id,
    u.username,
    u.email,
    a.address_type,
    a.street,
    a.city,
    a.postal_code,
    a.country
FROM users u
LEFT JOIN addresses a ON u.id = a.user_id;


-- Visar meddelanden med användarnamn istället för bara id-nummer.
-- Mycket lättare att läsa vem som skickat till vem.

CREATE VIEW v_message_threads AS
SELECT
    m.id AS message_id,
    s.username AS sender,
    r.username AS receiver,
    m.subject,
    m.body,
    m.is_read,
    m.sent_at,
    m.parent_id
FROM messages m
JOIN users s ON m.sender_id = s.id
JOIN users r ON m.receiver_id = r.id;


-- =========================================
-- TESTDATA
-- =========================================


-- Alla i grupp 1 som testanvändare
INSERT INTO users (username, password_hash, email, email_confirmed) VALUES
('said', 'pwd123', 'said@chasacademy.se', TRUE),
('axel', 'pwd123', 'axel@chasacademy.se', TRUE),
('mika', 'pwd123', 'mika@chasacademy.se', FALSE),
('alexander', 'pwd123', 'alexander@chasacademy.se', TRUE),
('cebrail', 'pwd123', 'cebrail@chasacademy.se', TRUE);


-- Testadresser, blandar billing och delivery
INSERT INTO addresses (user_id, address_type, street, city, postal_code) VALUES
(1, 'billing', 'Kungsgatan 10', 'Stockholm', '111 43'),
(1, 'delivery', 'Sveavägen 25', 'Stockholm', '111 34'),
(2, 'billing', 'Vasagatan 5', 'Göteborg', '411 24'),
(2, 'delivery', 'Vasagatan 5', 'Göteborg', '411 24'),
(4, 'billing', 'Storgatan 12', 'Malmö', '211 42'),
(5, 'delivery', 'Drottninggatan 3', 'Uppsala', '753 10');


-- Testmeddelanden, några nya trådar och några svar
INSERT INTO messages (sender_id, receiver_id, parent_id, subject, body) VALUES
(1, 2, NULL, 'Hej!', 'Tjena Axel, hur går det med tabellerna?'),
(2, 1, 1, NULL, 'Bra! Jobbar på shop-tabellerna nu.'),
(1, 4, NULL, 'Foreign keys', 'Alexander, kan vi synka våra foreign keys?'),
(4, 1, 3, NULL, 'Absolut, jag har orders-tabellen redo.'),
(5, 1, NULL, 'Fråga', 'Said, hur kopplar vi warehouse till orders?');


-- =========================================
-- Testa att allt funkar genom att köra:
--   SELECT * FROM v_confirmed_users;
--   SELECT * FROM v_user_addresses;
--   SELECT * FROM v_message_threads;
-- =========================================
