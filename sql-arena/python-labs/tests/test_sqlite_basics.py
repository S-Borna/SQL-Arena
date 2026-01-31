"""
SQL Arena - Test Suite for Exercise 1: SQLite Basics
Run with: pytest tests/test_sqlite_basics.py -v
"""

import sqlite3
import pytest
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'exercises'))

from exercise_01_sqlite_basics import (
    create_connection,
    execute_query,
    get_column_names,
    count_rows,
    get_products_by_category,
    setup_sample_database
)


@pytest.fixture
def database_connection():
    """Create an in-memory database with sample data for testing."""
    connection = create_connection(':memory:')
    setup_sample_database(connection)
    yield connection
    connection.close()


class TestCreateConnection:
    """Tests for the create_connection function."""

    def test_creates_valid_connection(self):
        """Should create a valid SQLite connection."""
        connection = create_connection(':memory:')
        assert connection is not None
        assert isinstance(connection, sqlite3.Connection)
        connection.close()

    def test_connection_is_usable(self):
        """Should be able to execute queries on the connection."""
        connection = create_connection(':memory:')
        cursor = connection.cursor()
        cursor.execute("SELECT 1")
        result = cursor.fetchone()
        assert result[0] == 1
        cursor.close()
        connection.close()


class TestExecuteQuery:
    """Tests for the execute_query function."""

    def test_returns_list(self, database_connection):
        """Should return a list of tuples."""
        results = execute_query(database_connection, "SELECT * FROM products")
        assert isinstance(results, list)
        assert all(isinstance(row, tuple) for row in results)

    def test_returns_correct_data(self, database_connection):
        """Should return correct data from the database."""
        results = execute_query(
            database_connection,
            "SELECT product_name FROM products WHERE product_id = 1"
        )
        assert len(results) == 1
        assert results[0][0] == 'Laptop Pro'

    def test_empty_result(self, database_connection):
        """Should return empty list for no matches."""
        results = execute_query(
            database_connection,
            "SELECT * FROM products WHERE product_id = 9999"
        )
        assert results == []


class TestGetColumnNames:
    """Tests for the get_column_names function."""

    def test_returns_column_names(self, database_connection):
        """Should return the correct column names."""
        columns = get_column_names(
            database_connection,
            "SELECT product_id, product_name FROM products"
        )
        assert columns == ['product_id', 'product_name']

    def test_handles_all_columns(self, database_connection):
        """Should return all column names for SELECT *."""
        columns = get_column_names(database_connection, "SELECT * FROM products")
        assert 'product_id' in columns
        assert 'product_name' in columns
        assert 'price' in columns


class TestCountRows:
    """Tests for the count_rows function."""

    def test_counts_products(self, database_connection):
        """Should correctly count rows in products table."""
        count = count_rows(database_connection, "products")
        assert count == 5

    def test_counts_customers(self, database_connection):
        """Should correctly count rows in customers table."""
        count = count_rows(database_connection, "customers")
        assert count == 3


class TestGetProductsByCategory:
    """Tests for the get_products_by_category function."""

    def test_filters_by_category(self, database_connection):
        """Should return only products in the specified category."""
        products = get_products_by_category(database_connection, "Electronics")
        assert len(products) == 2

    def test_returns_correct_columns(self, database_connection):
        """Should return product_id, product_name, and price."""
        products = get_products_by_category(database_connection, "Books")
        assert len(products) == 2
        for product in products:
            assert len(product) == 3

    def test_no_matches(self, database_connection):
        """Should return empty list for non-existent category."""
        products = get_products_by_category(database_connection, "NonExistent")
        assert products == []

    def test_prevents_sql_injection(self, database_connection):
        """Should safely handle potentially dangerous input."""
        malicious_input = "'; DROP TABLE products; --"
        products = get_products_by_category(database_connection, malicious_input)
        assert products == []
        count = count_rows(database_connection, "products")
        assert count == 5


class TestSetupSampleDatabase:
    """Tests for the setup_sample_database function."""

    def test_creates_products_table(self):
        """Should create the products table."""
        connection = create_connection(':memory:')
        setup_sample_database(connection)

        cursor = connection.cursor()
        cursor.execute(
            "SELECT name FROM sqlite_master WHERE type='table' AND name='products'"
        )
        result = cursor.fetchone()
        assert result is not None
        cursor.close()
        connection.close()

    def test_creates_customers_table(self):
        """Should create the customers table."""
        connection = create_connection(':memory:')
        setup_sample_database(connection)

        cursor = connection.cursor()
        cursor.execute(
            "SELECT name FROM sqlite_master WHERE type='table' AND name='customers'"
        )
        result = cursor.fetchone()
        assert result is not None
        cursor.close()
        connection.close()

    def test_inserts_sample_data(self):
        """Should insert sample data into tables."""
        connection = create_connection(':memory:')
        setup_sample_database(connection)

        product_count = count_rows(connection, "products")
        customer_count = count_rows(connection, "customers")

        assert product_count > 0
        assert customer_count > 0
        connection.close()


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
