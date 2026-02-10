#!/usr/bin/env bash
set -euo pipefail

# Restaura um arquivo de dump gzip para o PostgreSQL
# USO: ./restore_postgres.sh <postgres_url> <dump_file.sql.gz>

PG_URL="${1:-}"
DUMP_FILE="${2:-}"

if [ -z "$PG_URL" ] || [ -z "$DUMP_FILE" ]; then
  echo "Uso: $0 <postgres_url> <dump_file.sql.gz>"
  exit 1
fi

if [ ! -f "$DUMP_FILE" ]; then
  echo "Arquivo $DUMP_FILE não encontrado" >&2
  exit 2
fi

echo "Restaurando $DUMP_FILE para $PG_URL"
gunzip -c "$DUMP_FILE" | psql "$PG_URL"

echo "Restauração concluída"
