#!/usr/bin/env bash
set -euo pipefail

SCRIPT="load/k6/pix_load_test.js"

if ! command -v k6 >/dev/null 2>&1; then
  echo "k6 não encontrado. Instale com: sudo apt install k6 ou veja https://k6.io/docs/getting-started/installation/"
  exit 1
fi

BASE_URL="${1:-http://localhost:3000}"

echo "Rodando k6 contra $BASE_URL"
BASE_URL="$BASE_URL" k6 run "$SCRIPT"
