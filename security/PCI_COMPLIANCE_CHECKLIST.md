# PCI Compliance Checklist (resumo)

Este arquivo lista passos e artefatos necessários para avançar rumo à conformidade PCI.

- [ ] Inventário de fluxos de pagamento (onde os dados do cartão transitam)
- [ ] Remover / evitar armazenamento de dados sensíveis (PAN, CVV)
- [ ] TLS estrito em todas as conexões
- [ ] Logging limitado e mascaramento de PII
- [ ] Testes de penetração por empresa certificada
- [ ] Relatórios e políticas de retenção
- [ ] Criptografia de dados em repouso e em trânsito
- [ ] Configuração de WAF e proteção contra bots
- [ ] Processo de resposta a incidentes

Observação: A implementação de pagamentos por PIX não lida com dados de cartão, mas qualquer integração futura com gateways de cartão deverá seguir PCI.
