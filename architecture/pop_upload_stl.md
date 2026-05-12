# POP: Upload STL

## Objetivo
Padronizar o processo de recebimento, validação e armazenamento de arquivos STL enviados pelo cliente.

## Fluxo Operacional
1. **Upload**: Cliente seleciona o arquivo STL na interface (Dashboard/Widget).
2. **Validação**: Frontend valida extensão (`.stl`), tamanho máximo e envia payload inicial (`STLUploadSchema`) ao backend.
3. **Storage**: Backend (Supabase) salva o arquivo na pasta `.tmp/` (local ou storage temporário) e move para o bucket definitivo após sucesso.
4. **Análise**: Dispara webhook ou rotina para iniciar o processamento e extrair metadados (peso, volume, bbox).

## Ferramentas Envolvidas
- Supabase Storage
- Função de upload frontend
- `analyze_stl.py` (ou equivalente)
