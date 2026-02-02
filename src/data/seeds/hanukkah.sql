-- Hanukkah of Data Mystery Database
-- This is a placeholder schema - the full database is loaded from /noahs.sqlite
-- Official data from https://hanukkah.bluebird.sh/5784/
-- Password to unlock: 5777

-- Note: This file is NOT used for Hanukkah puzzles
-- The full 27MB database is loaded dynamically from public/noahs.sqlite

-- Schema reference only:
-- customers (customerid, name, address, citystatezip, birthdate, phone, timezone, lat, long)
-- products (sku, desc, wholesale_cost, dims_cm)
-- orders (orderid, customerid, ordered, shipped, total, items)
-- orders_items (orderid, sku, qty, unit_price)

-- Empty placeholder to prevent import errors
CREATE TABLE _placeholder (id INTEGER);
