#!/usr/bin/env bash
set -euo pipefail

# Executa um conjunto de checagens de segurança locais: npm audit, semgrep e trufflehog

echo "1) npm audit"
npm audit --audit-level=moderate || true

if command -v semgrep >/dev/null 2>&1; then
  echo "2) semgrep -- rodando regras básicas"
  semgrep --config=p/ci || true
else
  echo "semgrep não instalado. Para instalar: pip3 install semgrep" >&2
fi

if command -v trufflehog >/dev/null 2>&1; then
  echo "3) trufflehog scanning (repo)"
  trufflehog filesystem --entropy=False ./ || true
else
  echo "trufflehog não instalado. Para instalar: pipx install trufflehog" >&2
fi

echo "Audit completo. Verifique os relatórios e corrija as findings críticas."
