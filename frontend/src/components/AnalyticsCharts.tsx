"use client";

import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell, PieChart, Pie, Legend
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ChartData {
  name: string;
  revenue: number;
  profit: number;
}

interface PrinterStats {
  name: string;
  count: number;
}

interface CostDistribution {
  name: string;
  value: number;
  color: string;
}

interface AnalyticsChartsProps {
  financialData: ChartData[];
  printerData: PrinterStats[];
  costDistribution: CostDistribution[];
}

export function AnalyticsCharts({ financialData, printerData, costDistribution }: AnalyticsChartsProps) {
  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444'];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de Desempenho Financeiro */}
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-zinc-100">Tendência Financeira (R$)</CardTitle>
            <p className="text-xs text-zinc-500">Receita Bruta vs Lucro Líquido</p>
          </CardHeader>
          <CardContent className="h-[300px] w-full">
            <div className="h-full w-full min-h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={financialData}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorProf" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                  <XAxis dataKey="name" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `R$${v}`} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px' }}
                    formatter={(v: any) => [`R$ ${Number(v).toFixed(2)}`, '']}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} fill="url(#colorRev)" name="Receita" />
                  <Area type="monotone" dataKey="profit" stroke="#10b981" strokeWidth={2} fill="url(#colorProf)" name="Lucro" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Gráfico de Ocupação por Impressora */}
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-zinc-100">Uso de Maquinário</CardTitle>
            <p className="text-xs text-zinc-500">Pedidos por máquina</p>
          </CardHeader>
          <CardContent className="h-[300px] w-full">
            <div className="h-full w-full min-h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={printerData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" horizontal={false} />
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" stroke="#71717a" fontSize={12} width={100} tickLine={false} axisLine={false} />
                  <Tooltip cursor={{ fill: '#27272a', opacity: 0.4 }} contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a' }} />
                  <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                    {printerData.map((e, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gráfico de Distribuição de Custos */}
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-zinc-100">Distribuição de Custos Globais</CardTitle>
          <p className="text-xs text-zinc-500">Onde está concentrado o seu gasto de operação</p>
        </CardHeader>
        <CardContent className="h-[350px] w-full">
          <div className="h-full w-full min-h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={costDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {costDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px' }}
                  formatter={(v: any) => [`R$ ${Number(v).toFixed(2)}`, '']}
                />
                <Legend iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
