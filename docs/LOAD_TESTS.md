# Testes de Carga (k6)

Arquivos:
- `load/k6/pix_load_test.js` — cenário k6 para endpoints PIX
- `load/run_load_test.sh` — wrapper para executar localmente

Execução local:
```
./load/run_load_test.sh http://localhost:3000
```

Recomendações:
- Ajustar `stages` do script `pix_load_test.js` conforme necessidade
- Rodar em CI separado (runners com capacidade suficiente)
- Capture métricas: P95, erros, timeouts e throughput
