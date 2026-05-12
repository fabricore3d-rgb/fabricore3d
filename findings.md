# PrintFlow AI - Findings

## Pesquisas e Benchmarks
- Concorrentes atuais são majoritariamente focados em fatiamento (slicers) ou em calculadoras estáticas via planilhas.
- PrintFlow foca na **operação end-to-end**, sendo o sistema operacional completo.

## Bibliotecas e APIs Identificadas
- **Frontend**: React, Next.js ou Vite, Tailwind CSS, Shadcn/UI (Radix UI), Three.js (para preview de STL).
- **Backend/Database**: Supabase (PostgreSQL, Storage, Edge Functions ou backend separado em Node/Python).
- **Processamento de STL**: Bibliotecas Python (`trimesh`, `numpy-stl`) para análise geométrica do arquivo (peso, volume, bounding box).
- **Comunicações**: Evolution API (WhatsApp) ou Twilio, Resend (Email).
- **Pagamentos**: Stripe, Mercado Pago API.
- **Impressão**: APIs de Octoprint e Moonraker (Klipper) para extração de tempo/G-code e status.

## Limitações Conhecidas
- Extração de dados exatos do G-code depende do fatiador utilizado. Para o MVP, a análise pode se basear em estimativas geométricas do STL, refinadas via integração com slicers de linha de comando ou Octoprint.

## Decisões Arquiteturais
- **Backend**: Supabase como fonte única da verdade (PostgreSQL).
- **Cálculos Financeiros**: 100% determinísticos. A IA apenas alerta para riscos de impressão, mas o preço provém de fórmula rígida baseada no schema.
- **Lógica de Fila**: `QueueManager` gerenciando impressoras individualmente de forma atômica.
- **Tools**: Isoladas em `/tools/` (Python/Node) com responsabilidades atômicas.
