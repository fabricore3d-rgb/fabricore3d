import { createClient } from "@/utils/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Package, Printer, TrendingUp, DollarSign, Activity } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: orders } = await supabase.from("orders").select("*");
  const { data: printers } = await supabase.from("printers").select("*");

  const totalOrders = orders?.length || 0;
  const activeOrders = orders?.filter(o => o.status !== "completed").length || 0;
  const completedOrders = orders?.filter(o => o.status === "completed").length || 0;
  
  const expectedRevenue = orders?.reduce((acc, o) => acc + Number(o.final_price), 0) || 0;
  const expectedProfit = orders?.reduce((acc, o) => acc + (Number(o.final_price) - Number(o.total_cost)), 0) || 0;
  const totalPrinters = printers?.length || 0;

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
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-zinc-400">Receita Acumulada</CardTitle>
            <DollarSign className="w-4 h-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-zinc-100">R$ {expectedRevenue.toFixed(2)}</div>
            <p className="text-xs text-zinc-500 mt-1">Bruto total esperado</p>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-zinc-400">Lucro Estimado</CardTitle>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-400">R$ {expectedProfit.toFixed(2)}</div>
            <p className="text-xs text-zinc-500 mt-1">Margem aplicada</p>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-zinc-400">Fila Ativa</CardTitle>
            <Package className="w-4 h-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-zinc-100">{activeOrders} <span className="text-sm font-normal text-zinc-500">pedidos</span></div>
            <p className="text-xs text-zinc-500 mt-1">{completedOrders} concluídos</p>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Call to actions or charts could go here */}
        <Card className="bg-zinc-900/50 border-zinc-800 border-dashed flex flex-col items-center justify-center p-12 text-center h-full">
          <BarChart3 className="w-12 h-12 text-zinc-700 mb-4" />
          <h3 className="text-lg font-medium text-zinc-300">Inteligência de Dados</h3>
          <p className="text-sm text-zinc-500 max-w-sm mt-2 mb-6">
            Conforme você utiliza o CRM, os gráficos de desempenho mensal e ocupação das impressoras aparecerão aqui automaticamente.
          </p>
          <Link href="/pedidos">
            <Button className="bg-blue-600 hover:bg-blue-500 text-white">
              Ir para o Kanban
            </Button>
          </Link>
        </Card>
      </div>
    </div>
  );
}
