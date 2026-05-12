# PrintFlow AI - Task Plan

## Fases
- Fase 0: Inicialização e Planejamento (Atual)
- Fase 1: Visão e Estruturação de Dados
- Fase 2: Link (Validação de Integrações)
- Fase 3: Arquitetura (A.N.T. e Camadas)
- Fase 4: Estilo (Interface e Design System)
- Fase 5: Gatilhos e Automações

## Roadmap

### MVP 1
- [ ] Upload de Imagens e STLs (como referência/anexo do pedido)
- [ ] Orçamento Parametrizado Manual (Maker insere peso/tempo, sistema detalha custos instantaneamente)
- [ ] Gestão Operacional (CRM/Kanban de pedidos)
- [ ] Automações WhatsApp (Envio de link de aprovação, status)

### MVP 2
- [ ] IA para detecção de riscos no STL
- [ ] Preview 3D do STL
- [ ] Fila de impressão automática

### MVP 3
- [ ] Suporte multiusuário
- [ ] Analytics avançado
- [ ] Gestão de fazendas de impressão (múltiplas impressoras)
- [ ] IA operacional avançada

## Entregas
- Interface frontend responsiva com React/Tailwind/Shadcn UI.
- Backend escalável no Supabase (Auth, PostgreSQL, Storage).
- Ferramentas de análise STL em Python.
- Integrações com WhatsApp, Stripe/Mercado Pago, Klipper/Octoprint.

## Checklist Técnico
- [ ] Configurar repositório e pasta `printflow-ai`
- [ ] Definir schemas principais
- [ ] Criar projeto Supabase
- [ ] Inicializar frontend (Next.js/Vite, Tailwind, Shadcn)
- [ ] Implementar auth
- [ ] Implementar fluxo de upload
- [ ] Implementar motor de cálculo determinístico
- [ ] Validar disparo de WhatsApp
- [ ] Criar views do dashboard

## Prioridades MVP
O foco absoluto é a automação operacional para que o maker consiga gerar orçamentos instantaneamente e gerenciar pedidos sem planilhas.

## Backlog
- Ajuste fino da IA de riscos
- Integração nativa de câmeras Klipper
- Expansão de relatórios PDF
