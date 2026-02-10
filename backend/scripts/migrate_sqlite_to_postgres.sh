#!/usr/bin/env bash
set -euo pipefail

# Script para migrar um banco SQLite para PostgreSQL.
# Usa `pgloader` quando disponível. Caso contrário, imprime instruções.

SQLITE_DB="${1:-./backend_data/database.db}"
PG_URL="${2:-}" # ex: postgres://user:pass@host:5432/dbname

if [ -z "$PG_URL" ]; then
  echo "Uso: $0 [sqlite_db_path] <postgres_url>"
  echo "Ex: $0 ./backend_data/database.db postgres://user:pass@localhost:5432/leidy"
  exit 1
fi

if ! command -v pgloader >/dev/null 2>&1; then
  echo "pgloader não encontrado. Recomendo instalar e rodar:" >&2
  echo "  sudo apt install -y pgloader"
  echo "Ou usar o container oficial: docker run --rm --network host dimitri/pgloader:latest pgloader sqlite:///$SQLITE_DB $PG_URL"
  echo "Saindo." >&2
  exit 2
fi

echo "Iniciando migração de $SQLITE_DB para $PG_URL"
pgloader "sqlite:///$SQLITE_DB" "$PG_URL"

echo "Migração concluída. Verifique integridade e índices no PostgreSQL."
