# Auditoria de Segurança (Automatizada)

Este documento descreve como rodar verificações automatizadas locais e em CI.

Locais:
- `security/run_security_audit.sh` — executa `npm audit`, `semgrep` e `trufflehog` (se instalados)

CI Recommendations:
- Executar `npm audit --audit-level=moderate` e falhar build em findings críticas
- Rodar `semgrep` com política customizada e bloquear PRs com issues críticas
- Rodar trufflehog ou outros scanners de secrets nas mudanças de PR

Pentest / PCI:
- Agendar pentest com fornecedor qualificado
- Documentar escopo e evidências
- Gerar relatório e corrigir findings críticos
