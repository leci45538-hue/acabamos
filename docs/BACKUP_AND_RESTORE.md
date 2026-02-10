# Backup e Restore (PostgreSQL)

Scripts disponíveis em `backend/backup/`:

- `backup_postgres.sh <postgres_url> <output_dir> [s3://bucket/path]` — faz `pg_dump` + gzip e opcionalmente envia para S3
- `restore_postgres.sh <postgres_url> <dump_file.sql.gz>` — restaura um dump gzip para o banco

Recomendações:
- Agendar `backup_postgres.sh` via cron (exemplo abaixo)
- Testar restauras mensalmente em um ambiente de staging

Exemplo de cron (diário às 03:30):
```
30 3 * * * /workspaces/por-fim/backend/backup/backup_postgres.sh "$DATABASE_URL" /var/backups/leidy s3://my-bucket/leidy/backups/
```

Política de retenção recomendada:
- Últimos 7 dias: cópia diária
- Últimos 30 dias: conservar 1 por dia
- Últimos 12 meses: conservar 1 por semana
