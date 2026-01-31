#!/usr/bin/env python3
"""
SQL Arena - Mini Project: Report CLI
Covers course goals: 8, 14

A command-line tool that generates various reports from the database.
This demonstrates a complete Python application that works with databases.

Usage:
    python report_cli.py --help
    python report_cli.py products --category Electronics
    python report_cli.py sales --start 2024-01-01 --end 2024-12-31
    python report_cli.py inventory --low-stock 20
"""

import sqlite3
import argparse
from typing import List, Dict, Any
from datetime import datetime

try:
    from tabulate import tabulate
    TABULATE_AVAILABLE = True
except ImportError:
    TABULATE_AVAILABLE = False


def create_sample_database() -> sqlite3.Connection:
    """Create an in-memory database with sample data for demonstration."""
    connection = sqlite3.connect(':memory:')
    cursor = connection.cursor()

    cursor.execute("""
        CREATE TABLE products (
            product_id INTEGER PRIMARY KEY,
            product_name TEXT NOT NULL,
            category TEXT NOT NULL,
            price REAL NOT NULL,
            stock_quantity INTEGER DEFAULT 0
        )
    """)

    cursor.execute("""
        CREATE TABLE orders (
            order_id INTEGER PRIMARY KEY,
            customer_name TEXT NOT NULL,
            order_date TEXT NOT NULL,
            total_amount REAL
        )
    """)

    cursor.execute("""
        CREATE TABLE order_items (
            item_id INTEGER PRIMARY KEY,
            order_id INTEGER,
            product_id INTEGER,
            quantity INTEGER,
            unit_price REAL,
            FOREIGN KEY (order_id) REFERENCES orders(order_id),
            FOREIGN KEY (product_id) REFERENCES products(product_id)
        )
    """)

    products = [
        (1, 'Laptop Pro 15', 'Electronics', 12999.00, 25),
        (2, 'Wireless Mouse', 'Electronics', 299.00, 150),
        (3, 'USB-C Hub', 'Electronics', 599.00, 80),
        (4, 'Mechanical Keyboard', 'Electronics', 1299.00, 45),
        (5, 'Monitor 27 inch', 'Electronics', 3499.00, 15),
        (6, 'SQL Fundamentals', 'Books', 349.00, 75),
        (7, 'Database Design Patterns', 'Books', 449.00, 50),
        (8, 'Python Programming', 'Books', 399.00, 5),
        (9, 'Cotton T-Shirt', 'Clothing', 199.00, 200),
        (10, 'Jeans Classic', 'Clothing', 599.00, 12),
        (11, 'Running Shoes', 'Sports', 999.00, 8),
        (12, 'Yoga Mat', 'Sports', 299.00, 90)
    ]
    cursor.executemany("INSERT INTO products VALUES (?, ?, ?, ?, ?)", products)

    orders = [
        (1, 'Anna Andersson', '2024-01-15', 13298.00),
        (2, 'Erik Eriksson', '2024-01-18', 898.00),
        (3, 'Maria Johansson', '2024-01-20', 2148.00),
        (4, 'Johan Nilsson', '2024-02-01', 5398.00),
        (5, 'Sofia Lindberg', '2024-02-10', 749.00),
        (6, 'Peter Svensson', '2024-02-15', 3798.00),
        (7, 'Lisa Karlsson', '2024-03-01', 1598.00),
        (8, 'Anders Berg', '2024-03-10', 2997.00)
    ]
    cursor.executemany("INSERT INTO orders VALUES (?, ?, ?, ?)", orders)

    order_items = [
        (1, 1, 1, 1, 12999.00),
        (2, 1, 2, 1, 299.00),
        (3, 2, 3, 1, 599.00),
        (4, 2, 2, 1, 299.00),
        (5, 3, 4, 1, 1299.00),
        (6, 3, 6, 1, 349.00),
        (7, 3, 12, 2, 299.00),
        (8, 4, 5, 1, 3499.00),
        (9, 4, 7, 1, 449.00),
        (10, 4, 8, 1, 399.00),
        (11, 5, 6, 1, 349.00),
        (12, 5, 8, 1, 399.00),
        (13, 6, 5, 1, 3499.00),
        (14, 6, 2, 1, 299.00),
        (15, 7, 4, 1, 1299.00),
        (16, 7, 2, 1, 299.00),
        (17, 8, 11, 2, 999.00),
        (18, 8, 12, 3, 299.00)
    ]
    cursor.executemany("INSERT INTO order_items VALUES (?, ?, ?, ?, ?)", order_items)

    connection.commit()
    cursor.close()
    return connection


def format_output(headers: List[str], rows: List[tuple], title: str = "") -> str:
    """Format query results for display."""
    if title:
        output = f"\n{title}\n{'=' * len(title)}\n"
    else:
        output = ""

    if TABULATE_AVAILABLE:
        output += tabulate(rows, headers=headers, tablefmt="simple")
    else:
        header_line = " | ".join(f"{h:>15}" for h in headers)
        output += header_line + "\n"
        output += "-" * len(header_line) + "\n"
        for row in rows:
            output += " | ".join(f"{str(v):>15}" for v in row) + "\n"

    return output


def products_report(connection: sqlite3.Connection, category: str = None) -> str:
    """Generate a products report."""
    cursor = connection.cursor()

    if category:
        cursor.execute("""
            SELECT product_id, product_name, category, price, stock_quantity
            FROM products
            WHERE category = ?
            ORDER BY product_name
        """, (category,))
        title = f"Products Report - Category: {category}"
    else:
        cursor.execute("""
            SELECT product_id, product_name, category, price, stock_quantity
            FROM products
            ORDER BY category, product_name
        """)
        title = "Products Report - All Categories"

    rows = cursor.fetchall()
    cursor.close()

    headers = ["ID", "Product Name", "Category", "Price", "Stock"]
    return format_output(headers, rows, title)


def sales_report(
    connection: sqlite3.Connection,
    start_date: str,
    end_date: str
) -> str:
    """Generate a sales report for a date range."""
    cursor = connection.cursor()

    cursor.execute("""
        SELECT
            p.category,
            COUNT(DISTINCT o.order_id) AS orders,
            SUM(oi.quantity) AS items_sold,
            ROUND(SUM(oi.quantity * oi.unit_price), 2) AS revenue
        FROM orders o
        JOIN order_items oi ON o.order_id = oi.order_id
        JOIN products p ON oi.product_id = p.product_id
        WHERE o.order_date BETWEEN ? AND ?
        GROUP BY p.category
        ORDER BY revenue DESC
    """, (start_date, end_date))

    category_rows = cursor.fetchall()

    cursor.execute("""
        SELECT
            COUNT(DISTINCT order_id) AS total_orders,
            ROUND(SUM(total_amount), 2) AS total_revenue,
            ROUND(AVG(total_amount), 2) AS avg_order_value
        FROM orders
        WHERE order_date BETWEEN ? AND ?
    """, (start_date, end_date))

    summary = cursor.fetchone()
    cursor.close()

    output = f"\nSales Report: {start_date} to {end_date}\n"
    output += "=" * 50 + "\n\n"

    output += "By Category:\n"
    headers = ["Category", "Orders", "Items Sold", "Revenue"]
    output += format_output(headers, category_rows) + "\n"

    output += f"\nSummary:\n"
    output += f"  Total Orders: {summary[0]}\n"
    output += f"  Total Revenue: {summary[1]} SEK\n"
    output += f"  Average Order Value: {summary[2]} SEK\n"

    return output


def inventory_report(connection: sqlite3.Connection, low_stock_threshold: int = 20) -> str:
    """Generate an inventory report highlighting low stock items."""
    cursor = connection.cursor()

    cursor.execute("""
        SELECT product_id, product_name, category, stock_quantity, price,
               ROUND(stock_quantity * price, 2) AS inventory_value
        FROM products
        WHERE stock_quantity <= ?
        ORDER BY stock_quantity ASC
    """, (low_stock_threshold,))

    low_stock_rows = cursor.fetchall()

    cursor.execute("""
        SELECT
            category,
            SUM(stock_quantity) AS total_units,
            ROUND(SUM(stock_quantity * price), 2) AS total_value
        FROM products
        GROUP BY category
        ORDER BY total_value DESC
    """)

    category_rows = cursor.fetchall()
    cursor.close()

    output = f"\nInventory Report\n"
    output += "=" * 50 + "\n\n"

    output += f"Low Stock Items (threshold: {low_stock_threshold} units):\n"
    if low_stock_rows:
        headers = ["ID", "Product", "Category", "Stock", "Price", "Value"]
        output += format_output(headers, low_stock_rows) + "\n"
    else:
        output += "  No items below threshold.\n"

    output += "\nInventory by Category:\n"
    headers = ["Category", "Total Units", "Total Value"]
    output += format_output(headers, category_rows) + "\n"

    return output


def top_products_report(connection: sqlite3.Connection, limit: int = 5) -> str:
    """Generate a report of top-selling products."""
    cursor = connection.cursor()

    cursor.execute("""
        SELECT
            p.product_name,
            p.category,
            SUM(oi.quantity) AS units_sold,
            ROUND(SUM(oi.quantity * oi.unit_price), 2) AS revenue
        FROM order_items oi
        JOIN products p ON oi.product_id = p.product_id
        GROUP BY p.product_id
        ORDER BY revenue DESC
        LIMIT ?
    """, (limit,))

    rows = cursor.fetchall()
    cursor.close()

    title = f"Top {limit} Products by Revenue"
    headers = ["Product", "Category", "Units Sold", "Revenue"]
    return format_output(headers, rows, title)


def main():
    """Main entry point for the CLI."""
    parser = argparse.ArgumentParser(
        description="SQL Arena Report CLI - Generate database reports",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python report_cli.py products
  python report_cli.py products --category Electronics
  python report_cli.py sales --start 2024-01-01 --end 2024-12-31
  python report_cli.py inventory --low-stock 20
  python report_cli.py top-products --limit 10
        """
    )

    subparsers = parser.add_subparsers(dest="command", help="Report type")

    products_parser = subparsers.add_parser("products", help="Products report")
    products_parser.add_argument(
        "--category", "-c",
        help="Filter by category"
    )

    sales_parser = subparsers.add_parser("sales", help="Sales report")
    sales_parser.add_argument(
        "--start", "-s",
        default="2024-01-01",
        help="Start date (YYYY-MM-DD)"
    )
    sales_parser.add_argument(
        "--end", "-e",
        default=datetime.now().strftime("%Y-%m-%d"),
        help="End date (YYYY-MM-DD)"
    )

    inventory_parser = subparsers.add_parser("inventory", help="Inventory report")
    inventory_parser.add_argument(
        "--low-stock", "-l",
        type=int,
        default=20,
        help="Low stock threshold"
    )

    top_parser = subparsers.add_parser("top-products", help="Top products report")
    top_parser.add_argument(
        "--limit", "-n",
        type=int,
        default=5,
        help="Number of products to show"
    )

    args = parser.parse_args()

    if not args.command:
        parser.print_help()
        return

    connection = create_sample_database()

    try:
        if args.command == "products":
            print(products_report(connection, args.category))
        elif args.command == "sales":
            print(sales_report(connection, args.start, args.end))
        elif args.command == "inventory":
            print(inventory_report(connection, args.low_stock))
        elif args.command == "top-products":
            print(top_products_report(connection, args.limit))
    finally:
        connection.close()


if __name__ == "__main__":
    main()
