import Image from "next/image";
import Link from "next/link";
import { Layers, Printer, BarChart3, MessageCircle, Shield, Zap, CheckCircle2, ArrowRight, Star, ChevronRight } from "lucide-react";

export const metadata = {
  title: "PrintFlow AI — Sistema Operacional para Fazendas 3D",
  description: "Gerencie orçamentos, produção e clientes da sua fazenda de impressão 3D com inteligência. CRM + Kanban + Calculadora de Custos + WhatsApp integrado.",
};

const FEATURES = [
  {
    icon: BarChart3,
    title: "Motor de Precificação",
    description: "Calculadora paramétrica que considera material, energia, desgaste da máquina e margem de risco. Nunca mais cobre errado.",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
  },
  {
    icon: Layers,
    title: "Kanban Visual",
    description: "Gerencie orçamentos, produção e entregas em colunas visuais estilo Trello. Veja tudo de um olhar só.",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp 1-Click",
    description: "Avise o cliente que a peça ficou pronta com um clique. Mensagem formatada com nome, peça e valor.",
    color: "text-green-400",
    bg: "bg-green-500/10",
    border: "border-green-500/20",
  },
  {
    icon: Printer,
    title: "Gestão de Máquinas",
    description: "Cadastre suas impressoras com custo de energia e depreciação. O sistema calcula automaticamente a hora-máquina.",
    color: "text-orange-400",
    bg: "bg-orange-500/10",
    border: "border-orange-500/20",
  },
  {
    icon: Shield,
    title: "Multi-Tenant Seguro",
    description: "Cada empresa tem seus dados 100% isolados. Segurança de banco via Row Level Security (RLS).",
    color: "text-violet-400",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
  },
  {
    icon: Zap,
    title: "Dashboard em Tempo Real",
    description: "KPIs de receita, lucro e produtividade atualizados automaticamente. Tome decisões com dados, não com achismo.",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
  },
];

const STEPS = [
  { step: "01", title: "Cadastre sua Fazenda", description: "Registre impressoras, materiais e custos de energia em minutos." },
  { step: "02", title: "Crie Orçamentos", description: "Use a calculadora paramétrica para gerar preços justos e lucrativos." },
  { step: "03", title: "Gerencie no Kanban", description: "Arraste pedidos entre Orçamento, Produção e Concluído." },
  { step: "04", title: "Avise o Cliente", description: "Com um clique, envie uma mensagem no WhatsApp com todos os dados." },
];

const PLANS = [
  {
    name: "Básico",
    price: "97",
    period: "/mês",
    description: "Para makers e pequenas fazendas",
    features: [
      "Até 3 impressoras",
      "Kanban de pedidos ilimitado",
      "Motor de precificação",
      "WhatsApp 1-Click (manual)",
      "Dashboard com KPIs",
      "Suporte por e-mail",
    ],
    cta: "Começar Agora",
    popular: false,
    accent: "border-zinc-700",
    btnClass: "bg-zinc-800 hover:bg-zinc-700 text-zinc-100",
  },
  {
    name: "Profissional",
    price: "197",
    period: "/mês",
    description: "Para fazendas em crescimento",
    features: [
      "Impressoras ilimitadas",
      "Tudo do plano Básico",
      "WhatsApp automático (API)",
      "Relatórios avançados",
      "Multi-usuários (equipe)",
      "Suporte prioritário",
    ],
    cta: "Escolher Profissional",
    popular: true,
    accent: "border-blue-500",
    btnClass: "bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_30px_rgba(37,99,235,0.3)]",
  },
  {
    name: "Enterprise",
    price: "Sob consulta",
    period: "",
    description: "Para operações em escala",
    features: [
      "Tudo do Profissional",
      "API personalizada",
      "Integração com ERP",
      "SLA garantido",
      "Onboarding dedicado",
      "White-label disponível",
    ],
    cta: "Falar com Vendas",
    popular: false,
    accent: "border-zinc-700",
    btnClass: "bg-zinc-800 hover:bg-zinc-700 text-zinc-100",
  },
];

const TESTIMONIALS = [
  {
    name: "Lucas R.",
    role: "Fazenda 3D • São Paulo",
    text: "Antes eu usava planilha pra tudo. Agora em 2 cliques eu sei exatamente quanto cobrar e aviso o cliente no Zap. Mudou minha operação.",
    stars: 5,
  },
  {
    name: "Ana C.",
    role: "MakerSpace • Curitiba",
    text: "O motor de precificação é genial. Eu estava cobrando errado há meses. O PrintFlow me mostrou que eu tinha 23% de prejuízo em algumas peças.",
    stars: 5,
  },
  {
    name: "Pedro M.",
    role: "3D Print Lab • BH",
    text: "Visual incrível, parece um sistema de empresa grande. Meus clientes ficam impressionados quando eu mando o orçamento detalhado.",
    stars: 5,
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 overflow-x-hidden">

      {/* ─── NAVBAR ─── */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-black text-xl tracking-tighter">
            <Layers className="text-blue-500 w-6 h-6" />
            <span>PRINT<span className="text-blue-500">FLOW</span> <span className="text-zinc-500 font-normal text-sm">AI</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-zinc-400">
            <a href="#features" className="hover:text-zinc-100 transition-colors">Funcionalidades</a>
            <a href="#pricing" className="hover:text-zinc-100 transition-colors">Planos</a>
            <a href="#how" className="hover:text-zinc-100 transition-colors">Como funciona</a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm text-zinc-400 hover:text-zinc-100 transition-colors hidden sm:block">
              Entrar
            </Link>
            <Link href="/login" className="text-sm bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-medium transition-all shadow-[0_0_20px_rgba(37,99,235,0.2)] hover:shadow-[0_0_30px_rgba(37,99,235,0.4)]">
              Começar grátis
            </Link>
          </div>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section className="pt-32 pb-20 px-6 relative">
        {/* Glow effects */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-40 left-1/4 w-[300px] h-[300px] bg-violet-500/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium mb-8">
            <Zap className="w-3.5 h-3.5" />
            Sistema Operacional para Fazendas 3D
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight leading-[1.1] max-w-4xl mx-auto">
            Pare de{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">
              adivinhar
            </span>{" "}
            seus lucros.
          </h1>
          
          <p className="text-lg md:text-xl text-zinc-400 mt-6 max-w-2xl mx-auto leading-relaxed">
            O PrintFlow AI calcula custos, gera orçamentos e gerencia sua fila de impressão 3D. 
            Tudo num painel dark premium que seus clientes vão invejar.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <Link
              href="/login"
              className="group flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-3.5 rounded-xl font-semibold text-lg transition-all shadow-[0_0_40px_rgba(37,99,235,0.3)] hover:shadow-[0_0_60px_rgba(37,99,235,0.5)] hover:scale-[1.02]"
            >
              Testar Grátis por 14 Dias
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a href="#how" className="text-zinc-400 hover:text-zinc-200 text-sm flex items-center gap-1 transition-colors">
              Ver como funciona <ChevronRight className="w-4 h-4" />
            </a>
          </div>

          {/* Hero Image */}
          <div className="mt-16 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent z-10 pointer-events-none" />
            <div className="rounded-xl overflow-hidden border border-zinc-800 shadow-[0_20px_80px_rgba(0,0,0,0.5)] mx-auto max-w-5xl">
              <Image
                src="/hero-dashboard.png"
                alt="PrintFlow AI Dashboard - Kanban de pedidos com motor de precificação"
                width={1920}
                height={1080}
                className="w-full h-auto"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── SOCIAL PROOF BAR ─── */}
      <section className="border-y border-zinc-800/50 bg-zinc-900/30 py-8 px-6">
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-x-12 gap-y-4 text-zinc-500 text-sm">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>Setup em 5 minutos</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>Sem cartão de crédito</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>Dados 100% isolados</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>Suporte em português</span>
          </div>
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black tracking-tight">
              Tudo que sua fazenda{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">precisa</span>
            </h2>
            <p className="text-zinc-500 mt-4 max-w-xl mx-auto">
              Do orçamento ao aviso no WhatsApp. Uma plataforma completa para quem leva impressão 3D a sério.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className={`group p-6 rounded-xl border ${feature.border} ${feature.bg} bg-opacity-50 hover:bg-opacity-100 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg`}
                >
                  <div className={`w-10 h-10 rounded-lg ${feature.bg} flex items-center justify-center mb-4`}>
                    <Icon className={`w-5 h-5 ${feature.color}`} />
                  </div>
                  <h3 className="text-lg font-semibold text-zinc-100 mb-2">{feature.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section id="how" className="py-24 px-6 bg-zinc-900/30 border-y border-zinc-800/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black tracking-tight">
              4 passos para{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400">lucrar mais</span>
            </h2>
            <p className="text-zinc-500 mt-4">Comece a usar em menos de 5 minutos.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {STEPS.map((step, i) => (
              <div key={step.step} className="flex gap-5 group">
                <div className="shrink-0 w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center font-black text-blue-400 text-sm group-hover:bg-blue-500/20 transition-colors">
                  {step.step}
                </div>
                <div>
                  <h3 className="font-semibold text-zinc-100 mb-1">{step.title}</h3>
                  <p className="text-zinc-500 text-sm">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black tracking-tight">
              Quem usa,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">recomenda</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="p-6 rounded-xl border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-900 transition-colors">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-zinc-300 text-sm leading-relaxed mb-4">&quot;{t.text}&quot;</p>
                <div className="border-t border-zinc-800 pt-4">
                  <p className="font-semibold text-zinc-200 text-sm">{t.name}</p>
                  <p className="text-zinc-500 text-xs">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PRICING ─── */}
      <section id="pricing" className="py-24 px-6 bg-zinc-900/30 border-y border-zinc-800/50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black tracking-tight">
              Planos que{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">cabem no bolso</span>
            </h2>
            <p className="text-zinc-500 mt-4">Comece grátis. Escale quando precisar.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {PLANS.map((plan) => (
              <div
                key={plan.name}
                className={`relative p-6 rounded-xl border-2 ${plan.accent} bg-zinc-950 flex flex-col transition-all hover:scale-[1.02] ${
                  plan.popular ? "shadow-[0_0_40px_rgba(37,99,235,0.15)]" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-4 py-1 rounded-full">
                    Mais Popular
                  </div>
                )}
                <h3 className="text-xl font-bold text-zinc-100">{plan.name}</h3>
                <p className="text-zinc-500 text-sm mt-1 mb-6">{plan.description}</p>

                <div className="mb-6">
                  {plan.price === "Sob consulta" ? (
                    <p className="text-2xl font-black text-zinc-100">{plan.price}</p>
                  ) : (
                    <div className="flex items-baseline gap-1">
                      <span className="text-zinc-500 text-sm">R$</span>
                      <span className="text-4xl font-black text-zinc-100">{plan.price}</span>
                      <span className="text-zinc-500 text-sm">{plan.period}</span>
                    </div>
                  )}
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/login"
                  className={`w-full text-center py-3 rounded-lg font-semibold transition-all ${plan.btnClass}`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="py-24 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-blue-950/10 to-zinc-950 pointer-events-none" />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
            Sua fazenda merece um{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-violet-400 to-emerald-400">
              sistema de verdade
            </span>
          </h2>
          <p className="text-zinc-400 mt-6 text-lg">
            Chega de planilha. Chega de cobrar no achismo. O PrintFlow AI é o copiloto financeiro que faltava na sua operação 3D.
          </p>
          <Link
            href="/login"
            className="group inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-10 py-4 rounded-xl font-semibold text-lg mt-10 transition-all shadow-[0_0_40px_rgba(37,99,235,0.3)] hover:shadow-[0_0_60px_rgba(37,99,235,0.5)] hover:scale-[1.02]"
          >
            Começar Agora — É Grátis
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <p className="text-zinc-600 text-xs mt-4">Sem cartão de crédito • Setup em 5 min • Cancele quando quiser</p>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-zinc-800/50 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 font-black text-lg tracking-tighter">
            <Layers className="text-blue-500 w-5 h-5" />
            <span>PRINT<span className="text-blue-500">FLOW</span> <span className="text-zinc-600 font-normal text-xs">AI</span></span>
          </div>
          <div className="flex items-center gap-6 text-sm text-zinc-500">
            <a href="#features" className="hover:text-zinc-300 transition-colors">Funcionalidades</a>
            <a href="#pricing" className="hover:text-zinc-300 transition-colors">Planos</a>
            <a href="#how" className="hover:text-zinc-300 transition-colors">Como funciona</a>
          </div>
          <p className="text-zinc-600 text-xs">
            © 2026 PrintFlow AI. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
