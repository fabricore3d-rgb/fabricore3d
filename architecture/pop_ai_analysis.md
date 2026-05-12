# POP: Análise de IA e Risco (AI Failure Detector)

## Objetivo
Atuar como um copiloto técnico para o maker, detectando riscos na geometria antes da impressão. Não altera valores financeiros, apenas o `risk_score`.

## Pontos de Verificação
- **Warping Risk**: Superfície de contato vs volume total.
- **Support Excess**: Necessidade extrema de suportes estruturais.
- **Spaghetti Risk**: Geometrias finas/altas com baixa base de ancoragem.
- **Overhangs**: Ângulos muito agudos ou pontes sem suporte.

## Fluxo
1. Após análise determinística (peso, volume), o modelo/imagem ou métricas são passados para a IA.
2. IA devolve um JSON com `risk_score` (0 a 100) e alertas específicos.
3. Se risco alto, alerta vermelho no Dashboard para o administrador.
