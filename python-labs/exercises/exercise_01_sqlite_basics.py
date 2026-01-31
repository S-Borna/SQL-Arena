"""
SQL Arena - Python Lab Exercise 1: SQLite Basics
Covers course goals: 8, 14

This exercise teaches you the fundamentals of working with SQLite in Python.
You will learn to:
- Connect to a SQLite database
- Execute SELECT queries
- Fetch and process results
"""

import sqlite3
from typing import List, Tuple, Any


def create_connection(database_path: str) -> sqlite3.Connection:
    """
    Create a connection to a SQLite database.

    Args:
        database_path: Path to the SQLite database file.
                      Use ':memory:' for an in-memory database.

    Returns:
        A sqlite3.Connection object.

    Example:
        connection = create_connection(':memory:')
    """
    connection = sqlite3.connect(database_path)
    return connection


def execute_query(connection: sqlite3.Connection, query: str) -> List[Tuple[Any, ...]]:
    """
    Execute a SELECT query and return all results.

    Args:
        connection: An active SQLite connection.
        query: The SQL query to execute.

    Returns:
        A list of tuples containing the query results.

    Example:
        results = execute_query(connection, "SELECT * FROM products")
    """
    cursor = connection.cursor()
    cursor.execute(query)
    results = cursor.fetchall()
    cursor.close()
    return results


def get_column_names(connection: sqlite3.Connection, query: str) -> List[str]:
    """
    Execute a query and return the column names from the result.

    Args:
        connection: An active SQLite connection.
        query: The SQL query to execute.

    Returns:
        A list of column names.

    Example:
        columns = get_column_names(connection, "SELECT * FROM products")
    """
    cursor = connection.cursor()
    cursor.execute(query)
    column_names = [description[0] for description in cursor.description]
    cursor.close()
    return column_names


def count_rows(connection: sqlite3.Connection, table_name: str) -> int:
    """
    Count the number of rows in a table.

    Args:
        connection: An active SQLite connection.
        table_name: Name of the table to count rows from.

    Returns:
        The number of rows in the table.

    Example:
        count = count_rows(connection, "products")
    """
    cursor = connection.cursor()
    cursor.execute(f"SELECT COUNT(*) FROM {table_name}")
    result = cursor.fetchone()
    cursor.close()
    return result[0] if result else 0


def get_products_by_category(
    connection: sqlite3.Connection,
    category: str
) -> List[Tuple[Any, ...]]:
    """
    Retrieve all products in a specific category using parameterized queries.

    Args:
        connection: An active SQLite connection.
        category: The category to filter by.

    Returns:
        A list of tuples containing product data.

    Important: Always use parameterized queries to prevent SQL injection!

    Example:
        products = get_products_by_category(connection, "Electronics")
    """
    cursor = connection.cursor()
    cursor.execute(
        "SELECT product_id, product_name, price FROM products WHERE category = ?",
        (category,)
    )
    results = cursor.fetchall()
    cursor.close()
    return results


def setup_sample_database(connection: sqlite3.Connection) -> None:
    """
    Create sample tables and insert test data.
    Used for testing and demonstration purposes.
    """
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
            email TEXT UNIQUE NOT NULL
        )
    """)

    sample_products = [
        (1, 'Laptop Pro', 'Electronics', 12999.00, 25),
        (2, 'Wireless Mouse', 'Electronics', 299.00, 150),
        (3, 'SQL Fundamentals', 'Books', 349.00, 75),
        (4, 'Python Programming', 'Books', 399.00, 65),
        (5, 'Running Shoes', 'Sports', 999.00, 70)
    ]

    cursor.executemany(
        "INSERT OR REPLACE INTO products VALUES (?, ?, ?, ?, ?)",
        sample_products
    )

    sample_customers = [
        (1, 'Anna Andersson', 'anna@example.com'),
        (2, 'Erik Eriksson', 'erik@example.com'),
        (3, 'Maria Johansson', 'maria@example.com')
    ]

    cursor.executemany(
        "INSERT OR REPLACE INTO customers VALUES (?, ?, ?)",
        sample_customers
    )

    connection.commit()
    cursor.close()


if __name__ == "__main__":
    print("SQL Arena - Exercise 1: SQLite Basics")
    print("=" * 50)

    connection = create_connection(':memory:')
    setup_sample_database(connection)

    print("\n1. Counting rows in products table:")
    product_count = count_rows(connection, "products")
    print(f"   Number of products: {product_count}")

    print("\n2. Getting all products:")
    all_products = execute_query(connection, "SELECT * FROM products")
    column_names = get_column_names(connection, "SELECT * FROM products")
    print(f"   Columns: {column_names}")
    for product in all_products:
        print(f"   {product}")

    print("\n3. Filtering products by category:")
    electronics = get_products_by_category(connection, "Electronics")
    print(f"   Electronics products: {len(electronics)}")
    for product in electronics:
        print(f"   {product}")

    connection.close()
    print("\n" + "=" * 50)
    print("Exercise completed successfully!")
