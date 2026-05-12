# POP: Sistema de Fila (Queue Manager)

## Objetivo
Organizar trabalhos (STLs) nas impressoras ativas.

## Fluxo
1. **Entrada**: Arquivo aprovado recebe status `pending` em `QueueSchema`.
2. **Alocação**: Sistema checa fila da impressora solicitada (`printer_id`).
3. **Execução**: Se ociosa, muda para `printing`. Se ocupada, calcula `estimated_finish` acumulativo.
4. **Conclusão**: Impressora volta a `idle` e puxa o próximo da fila.

## Permissões
- Administrador pode forçar override de prioridade (furar fila).
