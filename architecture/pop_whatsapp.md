# POP: Automação WhatsApp

## Objetivo
Manter o cliente informado sobre o status do pedido automaticamente, usando Evolution API ou similar.

## Gatilhos Padrões
1. **Orçamento Gerado**: Envia link de aprovação.
2. **Aprovação/Pagamento**: Confirmação "Entrou na Fila".
3. **Impressão Iniciada**: Atualização "Na mesa de impressão".
4. **Impressão Finalizada**: Alerta de conclusão e preparo de entrega.

## Regras
- Comunicação transparente e sem valores abertos via texto (sempre via link seguro, exceto se configurado).
- Logs de disparo salvos no banco de dados.
