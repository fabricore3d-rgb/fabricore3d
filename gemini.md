# PrintFlow AI - CONSTITUIÇÃO (A Lei do Sistema)

## Missão
PrintFlow AI é um microSaaS de automação operacional de impressão 3D (ERP maker, CRM, Fila, Orçamento automático, Automações WhatsApp, Dashboard). É o "sistema operacional da impressão 3D".

## Regras Críticas e Invariantes
1. **Lógica Financeira Determinística**: Nenhuma lógica financeira pode ser probabilística. A IA apenas sugere. Cálculos são 100% determinísticos.
2. **Independência da IA**: O sistema deve funcionar sem IA. A IA é uma camada adicional (ex: detecção de riscos).
3. **Atomicidade de Ferramentas**: Toda ferramenta deve ter UMA e apenas UMA responsabilidade.
4. **Pasta Temporária**: Toda operação intermediária de arquivos (STL, renders) deve usar a pasta `.tmp/`.
5. **Segurança**: Tokens e segredos devem residir exclusivamente no arquivo `.env`.

## Arquitetura: A.N.T.
- **A (Architecture)**: Camada de POPs (Procedimentos Operacionais Padrão).
- **N (Navigation)**: O Fluxo (Upload -> Analyze -> Quote -> Preview -> Approval -> Queue -> Dashboard).
- **T (Tools)**: Ferramentas atômicas em Python/Node.

## Estrutura de Diretórios
```
printflow-ai/
├── gemini.md
├── task_plan.md
├── findings.md
├── progress.md
├── .env
├── architecture/
├── tools/
├── frontend/
├── backend/
└── .tmp/
```

## Schemas de Dados (Fonte da Verdade)

### STLUploadSchema
```json
{
  "project_id": "uuid",
  "user_id": "uuid",
  "file_name": "string",
  "material": "PLA",
  "printer_id": "string",
  "quality_profile": "string"
}
```

### STLAnalysisSchema
```json
{
  "weight_grams": 0,
  "estimated_hours": 0,
  "support_percentage": 0,
  "volume_cm3": 0,
  "bounding_box": {
    "x": 0,
    "y": 0,
    "z": 0
  },
  "risk_score": 0
}
```

### QuoteSchema
Fórmula de Custo Final: `(Material + Energia + Depreciação + Mão de obra + Margem de Falha) * Margem de lucro`

```json
{
  "material_cost": 0,
  "energy_cost": 0,
  "machine_depreciation": 0,
  "failure_margin": 0,
  "labor_cost": 0,
  "final_price": 0
}
```

### QueueSchema
```json
{
  "queue_id": "uuid",
  "printer_id": "string",
  "status": "pending",
  "estimated_finish": "datetime"
}
```

## Dados Iniciais de Impressoras

| Impressora | Energia | Depreciação/h |
|---|---|---|
| Ender 3 | 0.120 | 0.40 |
| Ender 3 V3 SE | 0.120 | 0.475 |
| BambuLab A1 | 0.120 | 0.875 |
| BambuLab P1S | 0.200 | 1.37 |
