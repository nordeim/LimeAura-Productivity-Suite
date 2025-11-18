#!/bin/bash

# =====================================================
# Database Backup Script
# Usage: ./backup.sh
# =====================================================

set -e

TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="./backups"
DB_NAME="limeaura"
CONTAINER_NAME="limeaura_postgres"

# Ensure backup directory exists
mkdir -p "$BACKUP_DIR"

echo "Starting backup for $DB_NAME at $TIMESTAMP..."

# Create dump from Docker container
docker exec -t "$CONTAINER_NAME" pg_dump -U postgres "$DB_NAME" | gzip > "$BACKUP_DIR/${DB_NAME}_${TIMESTAMP}.sql.gz"

echo "Backup created successfully: $BACKUP_DIR/${DB_NAME}_${TIMESTAMP}.sql.gz"

# Retention policy: Delete backups older than 7 days
find "$BACKUP_DIR" -name "${DB_NAME}_*.sql.gz" -mtime +7 -delete

echo "Old backups cleaned up."
