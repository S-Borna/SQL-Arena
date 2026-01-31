.PHONY: install dev build preview docker-up docker-down test lint clean backup

# Node.js commands
install:
	npm install

dev:
	npm run dev

build:
	npm run build

preview:
	npm run preview

lint:
	npm run lint

# Docker commands
docker-up:
	cd docker && docker compose up -d

docker-down:
	cd docker && docker compose down

docker-logs:
	cd docker && docker compose logs -f

docker-reset:
	cd docker && docker compose down -v && docker compose up -d

# Python commands
python-install:
	cd python-labs && pip install -r requirements.txt

test:
	cd python-labs && python -m pytest tests/ -v

test-coverage:
	cd python-labs && python -m pytest tests/ -v --cov=exercises

python-report:
	cd python-labs && python report_cli.py --help

# Database commands
backup-sqlite:
	@echo "SQLite backup is handled in the browser via export button"

backup-mariadb:
	docker exec sql-arena-mariadb mysqldump -u arena_user -parena_password ecommerce > backup_ecommerce.sql
	docker exec sql-arena-mariadb mysqldump -u arena_user -parena_password chinook > backup_chinook.sql
	@echo "Backups saved to backup_ecommerce.sql and backup_chinook.sql"

restore-mariadb:
	docker exec -i sql-arena-mariadb mysql -u arena_user -parena_password ecommerce < backup_ecommerce.sql
	docker exec -i sql-arena-mariadb mysql -u arena_user -parena_password chinook < backup_chinook.sql
	@echo "Databases restored from backup files"

# Cloud storage (MinIO)
upload-backup:
	mc alias set myminio http://localhost:9000 minioadmin minioadmin123
	mc cp backup_ecommerce.sql myminio/sql-arena-backups/
	mc cp backup_chinook.sql myminio/sql-arena-backups/
	@echo "Backups uploaded to MinIO"

list-backups:
	mc alias set myminio http://localhost:9000 minioadmin minioadmin123
	mc ls myminio/sql-arena-backups/

# Utility
clean:
	rm -rf node_modules dist .vite
	rm -f backup_*.sql
	cd python-labs && rm -rf __pycache__ .pytest_cache .coverage

help:
	@echo "SQL Arena - Available commands:"
	@echo ""
	@echo "  make install        - Install Node.js dependencies"
	@echo "  make dev           - Start development server"
	@echo "  make build         - Build for production"
	@echo "  make preview       - Preview production build"
	@echo ""
	@echo "  make docker-up     - Start Docker services (MariaDB, MinIO)"
	@echo "  make docker-down   - Stop Docker services"
	@echo "  make docker-reset  - Reset Docker services (deletes data)"
	@echo ""
	@echo "  make python-install - Install Python dependencies"
	@echo "  make test          - Run Python tests"
	@echo "  make python-report - Show report CLI help"
	@echo ""
	@echo "  make backup-mariadb  - Backup MariaDB databases"
	@echo "  make restore-mariadb - Restore MariaDB databases"
	@echo "  make upload-backup   - Upload backups to MinIO"
	@echo ""
	@echo "  make clean         - Clean build artifacts"
