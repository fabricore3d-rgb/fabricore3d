import { createClient } from "@/utils/supabase/server";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus, Power, Server, Printer, Package } from "lucide-react";
import { AddPrinterModal } from "@/components/AddPrinterModal";
import { AddMaterialModal } from "@/components/AddMaterialModal";

// Forçamos que a página seja dinâmica já que ela lê do banco de dados em tempo real
export const dynamic = "force-dynamic";

export default async function FazendaPage() {
  const supabase = await createClient();
  // Busca as impressoras e materiais no banco via Supabase (Server Side Rendering)
  const { data: printers, error: errPrinters } = await supabase.from("printers").select("*").order("created_at");
  const { data: materials, error: errMaterials } = await supabase.from("materials").select("*").order("created_at");

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-black tracking-tight text-zinc-100 flex items-center gap-3">
          <Server className="w-8 h-8 text-blue-500" />
          Fazenda de Impressão
        </h1>
        <p className="text-zinc-500 mt-2">Gerencie seus equipamentos e o estoque de materiais base.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        
        {/* Card de Impressoras */}
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-xl text-zinc-100">Equipamentos</CardTitle>
              <CardDescription className="text-zinc-500">Impressoras da sua fazenda</CardDescription>
            </div>
            <AddPrinterModal />
          </CardHeader>
          <CardContent>
            {errPrinters ? (
              <p className="text-red-400 text-sm">Erro ao carregar impressoras.</p>
            ) : printers?.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-10 border border-dashed border-zinc-800 rounded-lg mt-4 bg-zinc-900/50">
                <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-4">
                  <Printer className="w-6 h-6 text-blue-500" />
                </div>
                <h3 className="text-lg font-medium text-zinc-200 mb-2">Pare de adivinhar seus lucros</h3>
                <p className="text-zinc-500 text-sm text-center max-w-[250px] mb-6">
                  Cadastre sua primeira impressora e descubra o custo exato da sua hora-máquina.
                </p>
                <AddPrinterModal />
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="border-zinc-800 hover:bg-transparent">
                    <TableHead className="text-zinc-400">Modelo</TableHead>
                    <TableHead className="text-zinc-400 text-right">Consumo (kW)</TableHead>
                    <TableHead className="text-zinc-400 text-right">Depreciação/h</TableHead>
                    <TableHead className="text-zinc-400 text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {printers?.map((p) => (
                    <TableRow key={p.id} className="border-zinc-800 hover:bg-zinc-800/50">
                      <TableCell className="font-medium text-zinc-300">{p.name}</TableCell>
                      <TableCell className="text-right text-zinc-400">{p.energy_consumption_kw}kW</TableCell>
                      <TableCell className="text-right text-zinc-400">${p.depreciation_per_hour}</TableCell>
                      <TableCell className="text-right">
                        <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium ${
                          p.status === 'idle' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 
                          p.status === 'printing' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 
                          'bg-orange-500/10 text-orange-400 border border-orange-500/20'
                        }`}>
                          <Power className="w-3 h-3" />
                          {p.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* Card de Materiais */}
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-xl text-zinc-100">Estoque de Materiais</CardTitle>
              <CardDescription className="text-zinc-500">Filamentos e resinas cadastrados</CardDescription>
            </div>
            <AddMaterialModal />
          </CardHeader>
          <CardContent>
            {errMaterials ? (
              <p className="text-red-400 text-sm">Erro ao carregar materiais.</p>
            ) : materials?.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-10 border border-dashed border-zinc-800 rounded-lg mt-4 bg-zinc-900/50">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center mb-4">
                  <Package className="w-6 h-6 text-emerald-500" />
                </div>
                <h3 className="text-lg font-medium text-zinc-200 mb-2">Sem material, sem impressão</h3>
                <p className="text-zinc-500 text-sm text-center max-w-[250px] mb-6">
                  Mapeie o custo do seu filamento/resina para o motor calcular o orçamento automaticamente.
                </p>
                <AddMaterialModal />
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="border-zinc-800 hover:bg-transparent">
                    <TableHead className="text-zinc-400">Material</TableHead>
                    <TableHead className="text-zinc-400">Cor</TableHead>
                    <TableHead className="text-zinc-400 text-right">Preço por KG</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {materials?.map((m) => (
                    <TableRow key={m.id} className="border-zinc-800 hover:bg-zinc-800/50">
                      <TableCell className="font-medium text-zinc-300">{m.name}</TableCell>
                      <TableCell className="text-zinc-400">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: m.color || '#fff' }}></div>
                          {m.color || 'Padrão'}
                        </div>
                      </TableCell>
                      <TableCell className="text-right text-emerald-400 font-mono">
                        R$ {Number(m.price_per_kg).toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
