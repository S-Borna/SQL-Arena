"""
SQL Arena - Python Lab Exercise 2: Transactions
Covers course goals: 8, 11, 14

This exercise teaches you about transactions in SQLite:
- Beginning and committing transactions
- Rolling back on errors
- Ensuring data integrity
"""

import sqlite3
from typing import Optional


def transfer_inventory(
    connection: sqlite3.Connection,
    from_product_id: int,
    to_product_id: int,
    quantity: int
) -> bool:
    """
    Transfer inventory between two products using a transaction.

    This demonstrates atomic operations: either both updates succeed,
    or neither does.

    Args:
        connection: An active SQLite connection.
        from_product_id: Product to reduce inventory from.
        to_product_id: Product to add inventory to.
        quantity: Amount to transfer.

    Returns:
        True if the transfer was successful, False otherwise.

    Example:
        success = transfer_inventory(connection, 1, 2, 10)
    """
    cursor = connection.cursor()

    try:
        cursor.execute("BEGIN TRANSACTION")

        cursor.execute(
            "SELECT stock_quantity FROM products WHERE product_id = ?",
            (from_product_id,)
        )
        result = cursor.fetchone()

        if result is None or result[0] < quantity:
            cursor.execute("ROLLBACK")
            return False

        cursor.execute(
            "UPDATE products SET stock_quantity = stock_quantity - ? WHERE product_id = ?",
            (quantity, from_product_id)
        )

        cursor.execute(
            "UPDATE products SET stock_quantity = stock_quantity + ? WHERE product_id = ?",
            (quantity, to_product_id)
        )

        cursor.execute("COMMIT")
        return True

    except sqlite3.Error as error:
        cursor.execute("ROLLBACK")
        print(f"Transaction failed: {error}")
        return False

    finally:
        cursor.close()


def create_order_with_items(
    connection: sqlite3.Connection,
    customer_id: int,
    items: list[tuple[int, int, float]]
) -> Optional[int]:
    """
    Create a new order with multiple items in a single transaction.

    Args:
        connection: An active SQLite connection.
        customer_id: The ID of the customer placing the order.
        items: List of tuples (product_id, quantity, unit_price).

    Returns:
        The new order_id if successful, None otherwise.

    Example:
        order_id = create_order_with_items(
            connection,
            customer_id=1,
            items=[(1, 2, 12999.00), (2, 1, 299.00)]
        )
    """
    cursor = connection.cursor()

    try:
        cursor.execute("BEGIN TRANSACTION")

        total_amount = sum(quantity * price for _, quantity, price in items)

        cursor.execute(
            """
            INSERT INTO orders (customer_id, order_date, status, total_amount)
            VALUES (?, DATE('now'), 'pending', ?)
            """,
            (customer_id, total_amount)
        )

        order_id = cursor.lastrowid

        for product_id, quantity, unit_price in items:
            cursor.execute(
                """
                INSERT INTO order_items (order_id, product_id, quantity, unit_price)
                VALUES (?, ?, ?, ?)
                """,
                (order_id, product_id, quantity, unit_price)
            )

            cursor.execute(
                """
                UPDATE products
                SET stock_quantity = stock_quantity - ?
                WHERE product_id = ? AND stock_quantity >= ?
                """,
                (quantity, product_id, quantity)
            )

            if cursor.rowcount == 0:
                cursor.execute("ROLLBACK")
                return None

        cursor.execute("COMMIT")
        return order_id

    except sqlite3.Error as error:
        cursor.execute("ROLLBACK")
        print(f"Order creation failed: {error}")
        return None

    finally:
        cursor.close()


def safe_update_with_savepoint(
    connection: sqlite3.Connection,
    updates: list[tuple[int, int]]
) -> int:
    """
    Perform multiple updates with savepoints for partial rollback.

    Args:
        connection: An active SQLite connection.
        updates: List of tuples (product_id, new_quantity).

    Returns:
        Number of successful updates.

    Example:
        count = safe_update_with_savepoint(connection, [(1, 100), (2, 50)])
    """
    cursor = connection.cursor()
    successful_updates = 0

    cursor.execute("BEGIN TRANSACTION")

    for product_id, new_quantity in updates:
        savepoint_name = f"sp_{product_id}"

        try:
            cursor.execute(f"SAVEPOINT {savepoint_name}")

            cursor.execute(
                "UPDATE products SET stock_quantity = ? WHERE product_id = ?",
                (new_quantity, product_id)
            )

            if cursor.rowcount == 0:
                cursor.execute(f"ROLLBACK TO {savepoint_name}")
            else:
                cursor.execute(f"RELEASE {savepoint_name}")
                successful_updates += 1

        except sqlite3.Error:
            cursor.execute(f"ROLLBACK TO {savepoint_name}")

    cursor.execute("COMMIT")
    cursor.close()

    return successful_updates


def setup_sample_database(connection: sqlite3.Connection) -> None:
    """Create sample tables for testing transactions."""
    cursor = connection.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS products (
            product_id INTEGER PRIMARY KEY,
            product_name TEXT NOT NULL,
            category TEXT NOT NULL,
            price REAL NOT NULL,
            stock_quantity INTEGER DEFAULT 0
        )
    """)

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS customers (
            customer_id INTEGER PRIMARY KEY,
            customer_name TEXT NOT NULL,
            email TEXT NOT NULL
        )
    """)

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS orders (
            order_id INTEGER PRIMARY KEY,
            customer_id INTEGER NOT NULL,
            order_date TEXT NOT NULL,
            status TEXT DEFAULT 'pending',
            total_amount REAL DEFAULT 0,
            FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
        )
    """)

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS order_items (
            item_id INTEGER PRIMARY KEY,
            order_id INTEGER NOT NULL,
            product_id INTEGER NOT NULL,
            quantity INTEGER NOT NULL,
            unit_price REAL NOT NULL,
            FOREIGN KEY (order_id) REFERENCES orders(order_id),
            FOREIGN KEY (product_id) REFERENCES products(product_id)
        )
    """)

    sample_products = [
        (1, 'Laptop Pro', 'Electronics', 12999.00, 25),
        (2, 'Wireless Mouse', 'Electronics', 299.00, 150),
        (3, 'SQL Fundamentals', 'Books', 349.00, 75)
    ]

    cursor.executemany(
        "INSERT OR REPLACE INTO products VALUES (?, ?, ?, ?, ?)",
        sample_products
    )

    cursor.execute(
        "INSERT OR REPLACE INTO customers VALUES (1, 'Test Customer', 'test@example.com')"
    )

    connection.commit()
    cursor.close()


if __name__ == "__main__":
    print("SQL Arena - Exercise 2: Transactions")
    print("=" * 50)

    connection = sqlite3.connect(':memory:')
    setup_sample_database(connection)

    print("\n1. Testing inventory transfer:")
    cursor = connection.cursor()
    cursor.execute("SELECT product_name, stock_quantity FROM products WHERE product_id IN (1, 2)")
    print(f"   Before: {cursor.fetchall()}")

    success = transfer_inventory(connection, 2, 1, 10)
    print(f"   Transfer result: {'Success' if success else 'Failed'}")

    cursor.execute("SELECT product_name, stock_quantity FROM products WHERE product_id IN (1, 2)")
    print(f"   After: {cursor.fetchall()}")

    print("\n2. Testing order creation with transaction:")
    order_id = create_order_with_items(
        connection,
        customer_id=1,
        items=[(1, 1, 12999.00), (2, 2, 299.00)]
    )
    print(f"   Created order ID: {order_id}")

    if order_id:
        cursor.execute("SELECT * FROM order_items WHERE order_id = ?", (order_id,))
        print(f"   Order items: {cursor.fetchall()}")

    cursor.close()
    connection.close()

    print("\n" + "=" * 50)
    print("Exercise completed successfully!")
