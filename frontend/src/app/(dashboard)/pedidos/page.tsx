import { createClient } from "@/utils/supabase/server";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PackageOpen, Clock, Printer, CheckCircle2, User } from "lucide-react";
import { CreateOrderModal } from "@/components/CreateOrderModal";
import { OrderCardMenu } from "@/components/OrderCardMenu";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

// Definição das colunas do Kanban
const KANBAN_COLUMNS = [
  {
    key: "quote_pending",
    title: "📋 Orçamentos",
    description: "Aguardando aprovação do cliente",
    icon: Clock,
    accentColor: "border-l-zinc-500",
    badgeClass: "text-zinc-400 border-zinc-700/50 bg-zinc-800/50",
    badgeText: "Orçamento",
    headerBg: "bg-zinc-800/30",
    countBg: "bg-zinc-700/50 text-zinc-300",
  },
  {
    key: "printing",
    title: "🖨️ Produção",
    description: "Impressora trabalhando",
    icon: Printer,
    accentColor: "border-l-blue-500",
    badgeClass: "text-blue-400 border-blue-900/50 bg-blue-500/10",
    badgeText: "Produzindo",
    headerBg: "bg-blue-500/5",
    countBg: "bg-blue-500/20 text-blue-300",
  },
  {
    key: "completed",
    title: "✅ Concluídos",
    description: "Pronto para entrega",
    icon: CheckCircle2,
    accentColor: "border-l-emerald-500",
    badgeClass: "text-emerald-400 border-emerald-900/50 bg-emerald-500/10",
    badgeText: "Concluído",
    headerBg: "bg-emerald-500/5",
    countBg: "bg-emerald-500/20 text-emerald-300",
  },
];

export default async function PedidosPage() {
  const supabase = await createClient();
  const { data: printers } = await supabase.from("printers").select("*");
  const { data: materials } = await supabase.from("materials").select("*");
  const { data: orders } = await supabase
    .from("orders")
    .select("*, printers(name), materials(name), customers(name, phone)")
    .order("created_at", { ascending: false });

  const allOrders = orders || [];

  return (
    <div className="p-8 max-w-[1440px] mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-zinc-100 flex items-center gap-3">
            <PackageOpen className="w-8 h-8 text-blue-500" />
            Pedidos & CRM
          </h1>
          <p className="text-zinc-500 mt-2">Gestão visual de orçamentos e fila de produção.</p>
        </div>
        
        <CreateOrderModal printers={printers || []} materials={materials || []} />
      </div>

      {allOrders.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-16 border border-dashed border-zinc-800 rounded-xl bg-zinc-900/50">
          <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center mb-4">
            <PackageOpen className="w-8 h-8 text-blue-500" />
          </div>
          <h3 className="text-xl font-medium text-zinc-200 mb-2">CRM Vazio</h3>
          <p className="text-zinc-500 text-center max-w-[300px] mb-6">
            Crie seu primeiro orçamento agora usando a calculadora paramétrica.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {KANBAN_COLUMNS.map((column) => {
            const columnOrders = allOrders.filter(o => o.status === column.key);
            return (
              <div key={column.key} className="flex flex-col">
                {/* Header da Coluna */}
                <div className={cn("rounded-t-xl px-4 py-3 border border-b-0 border-zinc-800", column.headerBg)}>
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-zinc-200 text-sm">{column.title}</h3>
                    <span className={cn("text-xs font-bold px-2 py-0.5 rounded-full", column.countBg)}>
                      {columnOrders.length}
                    </span>
                  </div>
                  <p className="text-zinc-500 text-[11px] mt-0.5">{column.description}</p>
                </div>

                {/* Corpo da Coluna */}
                <div className="flex-1 bg-zinc-900/30 border border-zinc-800 rounded-b-xl p-3 space-y-3 min-h-[200px]">
                  {columnOrders.length === 0 ? (
                    <div className="flex items-center justify-center h-full min-h-[150px] text-zinc-600 text-sm">
                      Nenhum pedido aqui
                    </div>
                  ) : (
                    columnOrders.map((order) => (
                      <div
                        key={order.id}
                        className={cn(
                          "p-4 rounded-lg border border-zinc-800 bg-zinc-950/80 flex flex-col gap-2.5 border-l-[3px] transition-all hover:border-zinc-700 hover:bg-zinc-950",
                          column.accentColor
                        )}
                      >
                        {/* Topo: Título + Menu */}
                        <div className="flex justify-between items-start gap-2">
                          <h4 className="font-semibold text-zinc-100 text-sm truncate">{order.title}</h4>
                          <OrderCardMenu
                            order={order}
                            printers={printers || []}
                            materials={materials || []}
                            customerPhone={order.customers?.phone}
                            customerName={order.customers?.name}
                          />
                        </div>

                        {/* Nome do Cliente */}
                        {order.customers?.name && (
                          <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                            <User className="w-3 h-3" />
                            <span className="truncate">{order.customers.name}</span>
                          </div>
                        )}

                        {/* Detalhes */}
                        <div className="text-[11px] text-zinc-500 space-y-0.5">
                          <p>🖨️ {order.printers?.name || '—'}</p>
                          <p>🧵 {order.materials?.name || '—'}</p>
                          <p>⏳ {order.estimated_time_hours}h | ⚖️ {order.estimated_weight_grams}g</p>
                        </div>

                        {/* Rodapé: Custo + Venda */}
                        <div className="mt-auto pt-2.5 border-t border-zinc-800/60 flex justify-between items-end">
                          <div>
                            <p className="text-[9px] text-zinc-600 uppercase tracking-wider font-bold">Custo</p>
                            <p className="text-zinc-400 text-xs">R$ {Number(order.total_cost).toFixed(2)}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-[9px] text-emerald-500/70 uppercase tracking-wider font-bold">Venda</p>
                            <p className="text-emerald-400 font-bold text-base">R$ {Number(order.final_price).toFixed(2)}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
