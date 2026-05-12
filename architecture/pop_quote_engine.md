# POP: Quote Engine (Motor de Orçamento)

## Objetivo
Gerar o custo final de impressão de forma 100% determinística.

## Regra de Negócio e Fórmula
**Custo Final = (Material + Energia + Depreciação + Mão de Obra + Margem de Falha) × Margem de Lucro**

### Variáveis da Fórmula
- **Material**: (Peso em gramas / 1000) * Preço do Kilo.
- **Energia**: Horas Estimadas * Consumo (kW) * Preço kWh.
- **Depreciação**: Horas Estimadas * Valor de Depreciação por Hora da Impressora.
- **Mão de Obra**: Horas de interação * Valor Hora Homem.
- **Margem de Falha**: (Material + Energia) * % Risco.
- **Margem de Lucro**: Fator multiplicador (ex: 2.0).

## Tabela de Custos Iniciais (Hardcoded MVP)
| Impressora | Energia (kW) | Depreciação/h ($) |
|---|---|---|
| Ender 3 | 0.120 | 0.40 |
| Ender 3 V3 SE | 0.120 | 0.475 |
| BambuLab A1 | 0.120 | 0.875 |
| BambuLab P1S | 0.200 | 1.37 |

## Ferramentas Envolvidas
- `calculate_quote.py`
