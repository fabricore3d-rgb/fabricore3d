import { createClient } from "@/utils/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Printer, TrendingUp, DollarSign, Activity } from "lucide-react";
import { AnalyticsCharts } from "@/components/AnalyticsCharts";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: orders } = await supabase.from("orders").select("*, printers(name)");
  const { data: printers } = await supabase.from("printers").select("*");

  const totalOrders = orders?.length || 0;
  const activeOrders = orders?.filter(o => o.status !== "completed").length || 0;
  const completedOrders = orders?.filter(o => o.status === "completed").length || 0;
  
  const expectedRevenue = orders?.reduce((acc, o) => acc + Number(o.final_price), 0) || 0;
  const expectedProfit = orders?.reduce((acc, o) => acc + (Number(o.final_price) - Number(o.total_cost)), 0) || 0;
  const totalPrinters = printers?.length || 0;

  // Processamento de dados para os gráficos
  // Agrupar por dia (últimos 7 dias ou conforme dados disponíveis)
  const financialData = orders ? Object.entries(
    orders.reduce((acc: any, o) => {
      const date = new Date(o.created_at).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
      if (!acc[date]) acc[date] = { name: date, revenue: 0, profit: 0 };
      acc[date].revenue += Number(o.final_price);
      acc[date].profit += (Number(o.final_price) - Number(o.total_cost));
      return acc;
    }, {})
  ).map(([_, val]) => val as any).sort((a, b) => a.name.localeCompare(b.name)) : [];

  // Agrupar por impressora
  const printerData = printers ? printers.map(p => ({
    name: p.name,
    count: orders?.filter(o => o.printer_id === p.id).length || 0
  })).sort((a, b) => b.count - a.count) : [];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-black tracking-tight text-zinc-100 flex items-center gap-3">
          <Activity className="w-8 h-8 text-blue-500" />
          Dashboard Operacional
        </h1>
        <p className="text-zinc-500 mt-2">Visão geral do desempenho da sua fazenda de impressão.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-zinc-900 border-zinc-800 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-zinc-400">Receita Total</CardTitle>
            <DollarSign className="w-4 h-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-zinc-100">R$ {expectedRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
            <p className="text-xs text-zinc-500 mt-1">Bruto total esperado</p>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-zinc-400">Lucro Estimado</CardTitle>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-400">R$ {expectedProfit.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
            <p className="text-xs text-zinc-500 mt-1">Margem aplicada</p>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-zinc-400">Fila Ativa</CardTitle>
            <Package className="w-4 h-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-zinc-100">{activeOrders} <span className="text-sm font-normal text-zinc-500">pedidos</span></div>
            <p className="text-xs text-zinc-500 mt-1">{completedOrders} concluídos</p>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-zinc-400">Maquinário</CardTitle>
            <Printer className="w-4 h-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-zinc-100">{totalPrinters} <span className="text-sm font-normal text-zinc-500">ativas</span></div>
            <p className="text-xs text-zinc-500 mt-1">Na fazenda</p>
          </CardContent>
        </Card>
      </div>

      <AnalyticsCharts financialData={financialData} printerData={printerData} />
    </div>
  );
}
