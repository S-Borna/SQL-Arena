"""
SQL Arena - Python Lab Exercise 3: MySQL/MariaDB Connector
Covers course goals: 2, 8, 14

This exercise teaches you to work with MySQL/MariaDB from Python:
- Connection pooling
- Prepared statements
- Error handling
"""

import os
from typing import List, Tuple, Any, Optional
from contextlib import contextmanager

try:
    import mysql.connector
    from mysql.connector import pooling, Error
    MYSQL_AVAILABLE = True
except ImportError:
    MYSQL_AVAILABLE = False
    print("MySQL connector not installed. Run: pip install mysql-connector-python")


class DatabaseConnection:
    """
    A class that manages database connections with connection pooling.

    Connection pooling improves performance by reusing connections
    instead of creating new ones for each query.
    """

    def __init__(
        self,
        host: str = "localhost",
        port: int = 3306,
        user: str = "arena_user",
        password: str = "arena_password",
        database: str = "ecommerce",
        pool_size: int = 5
    ):
        """
        Initialize the database connection pool.

        Args:
            host: Database server hostname.
            port: Database server port.
            user: Database username.
            password: Database password.
            database: Default database name.
            pool_size: Number of connections to maintain in the pool.
        """
        if not MYSQL_AVAILABLE:
            raise RuntimeError("MySQL connector is not installed")

        self.pool_config = {
            "pool_name": "sql_arena_pool",
            "pool_size": pool_size,
            "host": host,
            "port": port,
            "user": user,
            "password": password,
            "database": database,
            "autocommit": False
        }

        self._pool: Optional[pooling.MySQLConnectionPool] = None

    def initialize_pool(self) -> None:
        """Create the connection pool."""
        self._pool = pooling.MySQLConnectionPool(**self.pool_config)

    @contextmanager
    def get_connection(self):
        """
        Get a connection from the pool using a context manager.

        Usage:
            with db.get_connection() as connection:
                cursor = connection.cursor()
                cursor.execute("SELECT * FROM products")
        """
        if self._pool is None:
            self.initialize_pool()

        connection = self._pool.get_connection()
        try:
            yield connection
        finally:
            connection.close()

    def execute_query(
        self,
        query: str,
        params: Optional[Tuple] = None
    ) -> List[Tuple[Any, ...]]:
        """
        Execute a SELECT query using prepared statements.

        Args:
            query: SQL query with %s placeholders for parameters.
            params: Tuple of parameter values.

        Returns:
            List of result rows.

        Example:
            results = db.execute_query(
                "SELECT * FROM products WHERE category = %s",
                ("Electronics",)
            )
        """
        with self.get_connection() as connection:
            cursor = connection.cursor(prepared=True)
            try:
                cursor.execute(query, params or ())
                results = cursor.fetchall()
                return results
            finally:
                cursor.close()

    def execute_many(
        self,
        query: str,
        data: List[Tuple]
    ) -> int:
        """
        Execute a query multiple times with different parameters.

        Useful for bulk inserts.

        Args:
            query: SQL query with %s placeholders.
            data: List of tuples containing parameter values.

        Returns:
            Number of affected rows.

        Example:
            affected = db.execute_many(
                "INSERT INTO products (name, price) VALUES (%s, %s)",
                [("Product 1", 100), ("Product 2", 200)]
            )
        """
        with self.get_connection() as connection:
            cursor = connection.cursor(prepared=True)
            try:
                cursor.executemany(query, data)
                connection.commit()
                return cursor.rowcount
            except Error:
                connection.rollback()
                raise
            finally:
                cursor.close()

    def call_procedure(
        self,
        procedure_name: str,
        params: Optional[Tuple] = None
    ) -> List[List[Tuple]]:
        """
        Call a stored procedure.

        Args:
            procedure_name: Name of the stored procedure.
            params: Tuple of input parameters.

        Returns:
            List of result sets from the procedure.
        """
        with self.get_connection() as connection:
            cursor = connection.cursor()
            try:
                cursor.callproc(procedure_name, params or ())
                results = []
                for result in cursor.stored_results():
                    results.append(result.fetchall())
                return results
            finally:
                cursor.close()


def get_products_with_pagination(
    db: 'DatabaseConnection',
    page: int = 1,
    page_size: int = 10,
    category: Optional[str] = None
) -> Tuple[List[Tuple], int]:
    """
    Fetch products with pagination support.

    Args:
        db: DatabaseConnection instance.
        page: Page number (1-indexed).
        page_size: Number of items per page.
        category: Optional category filter.

    Returns:
        Tuple of (products list, total count).

    Example:
        products, total = get_products_with_pagination(db, page=2, page_size=10)
    """
    offset = (page - 1) * page_size

    if category:
        count_query = "SELECT COUNT(*) FROM products WHERE category = %s"
        count_result = db.execute_query(count_query, (category,))

        query = """
            SELECT product_id, product_name, category, price, stock_quantity
            FROM products
            WHERE category = %s
            ORDER BY product_id
            LIMIT %s OFFSET %s
        """
        products = db.execute_query(query, (category, page_size, offset))
    else:
        count_query = "SELECT COUNT(*) FROM products"
        count_result = db.execute_query(count_query)

        query = """
            SELECT product_id, product_name, category, price, stock_quantity
            FROM products
            ORDER BY product_id
            LIMIT %s OFFSET %s
        """
        products = db.execute_query(query, (page_size, offset))

    total = count_result[0][0] if count_result else 0
    return products, total


def generate_sales_report(
    db: 'DatabaseConnection',
    start_date: str,
    end_date: str
) -> List[dict]:
    """
    Generate a sales report for a date range.

    Args:
        db: DatabaseConnection instance.
        start_date: Start date in YYYY-MM-DD format.
        end_date: End date in YYYY-MM-DD format.

    Returns:
        List of dictionaries containing report data.
    """
    query = """
        SELECT
            p.category,
            COUNT(DISTINCT o.order_id) AS order_count,
            SUM(oi.quantity) AS total_quantity,
            SUM(oi.quantity * oi.unit_price) AS total_revenue
        FROM orders o
        JOIN order_items oi ON o.order_id = oi.order_id
        JOIN products p ON oi.product_id = p.product_id
        WHERE o.order_date BETWEEN %s AND %s
        GROUP BY p.category
        ORDER BY total_revenue DESC
    """

    results = db.execute_query(query, (start_date, end_date))

    report = []
    for row in results:
        report.append({
            'category': row[0],
            'order_count': row[1],
            'total_quantity': row[2],
            'total_revenue': float(row[3]) if row[3] else 0.0
        })

    return report


if __name__ == "__main__":
    print("SQL Arena - Exercise 3: MySQL/MariaDB Connector")
    print("=" * 50)

    if not MYSQL_AVAILABLE:
        print("\nMySQL connector not installed.")
        print("Install with: pip install mysql-connector-python")
        print("\nTo run this exercise, start the Docker environment:")
        print("  cd docker && docker compose up -d")
        exit(0)

    host = os.getenv("DATABASE_HOST", "localhost")
    port = int(os.getenv("DATABASE_PORT", "3306"))

    print(f"\nConnecting to MariaDB at {host}:{port}...")

    try:
        db = DatabaseConnection(host=host, port=port)
        db.initialize_pool()

        print("\n1. Testing connection and basic query:")
        products = db.execute_query("SELECT * FROM products LIMIT 5")
        print(f"   Found {len(products)} products")
        for product in products:
            print(f"   {product}")

        print("\n2. Testing pagination:")
        page_results, total = get_products_with_pagination(db, page=1, page_size=3)
        print(f"   Page 1 of products (total: {total})")
        for product in page_results:
            print(f"   {product}")

        print("\nConnection test successful!")

    except Exception as error:
        print(f"\nConnection failed: {error}")
        print("\nMake sure the Docker environment is running:")
        print("  cd docker && docker compose up -d")

    print("\n" + "=" * 50)
    print("Exercise completed!")
