#!/usr/bin/env bash
set -euo pipefail

# Faz dump do PostgreSQL e opcionalmente envia para S3
# USO: ./backup_postgres.sh <postgres_url> <output_dir> [s3://bucket/path]

PG_URL="${1:-}"
OUT_DIR="${2:-./backups}"
S3_DEST="${3:-}"

if [ -z "$PG_URL" ]; then
  echo "Uso: $0 <postgres_url> <output_dir> [s3://bucket/path]"
  exit 1
fi

mkdir -p "$OUT_DIR"
TS=$(date -u +"%Y%m%dT%H%M%SZ")
OUT_FILE="$OUT_DIR/backup_$TS.sql.gz"

echo "Fazendo pg_dump para $OUT_FILE"
pg_dump "$PG_URL" | gzip > "$OUT_FILE"

echo "Dump criado: $OUT_FILE"

if [ -n "$S3_DEST" ]; then
  if ! command -v aws >/dev/null 2>&1; then
    echo "aws cli não encontrado. Instale awscli ou faça upload manualmente." >&2
    exit 2
  fi
  echo "Enviando para S3: $S3_DEST"
  aws s3 cp "$OUT_FILE" "$S3_DEST/$(basename "$OUT_FILE")"
  echo "Upload concluído"
fi

echo "Backup finalizado"
