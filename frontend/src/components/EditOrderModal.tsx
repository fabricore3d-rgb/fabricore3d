"use client";

import { useState, useMemo } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Calculator } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { updateOrder } from "@/app/actions";

interface EditOrderModalProps {
  order: any;
  printers: any[];
  materials: any[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditOrderModal({ order, printers, materials, open, onOpenChange }: EditOrderModalProps) {
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState(order.title || "");
  const [weight, setWeight] = useState(order.estimated_weight_grams || 0);
  const [time, setTime] = useState(order.estimated_time_hours || 0);
  const [printerId, setPrinterId] = useState(order.printer_id || "");
  const [materialId, setMaterialId] = useState(order.material_id || "");
  const [profitMargin, setProfitMargin] = useState(order.profit_margin_multiplier || 2.0);
  const [riskMargin, setRiskMargin] = useState(10);

  const breakdown = useMemo(() => {
    const printer = printers.find(p => p.id === printerId);
    const material = materials.find(m => m.id === materialId);

    if (!printer || !material || weight <= 0 || time <= 0) {
      return null;
    }

    const price_kwh = 0.95;
    const cost_material = (weight / 1000) * Number(material.price_per_kg);
    const cost_energy = time * Number(printer.energy_consumption_kw) * price_kwh;
    const cost_depreciation = time * Number(printer.depreciation_per_hour);
    const margin_risk_value = (cost_material + cost_energy) * (riskMargin / 100);
    
    const total_cost = cost_material + cost_energy + cost_depreciation + margin_risk_value;
    const final_price = total_cost * profitMargin;

    return {
      cost_material,
      cost_energy,
      cost_depreciation,
      margin_risk_value,
      total_cost,
      final_price
    };
  }, [weight, time, printerId, materialId, profitMargin, riskMargin, printers, materials]);

  async function handleSave() {
    if (!breakdown || !title) return;
    setLoading(true);
    try {
      await updateOrder(order.id, {
        title,
        estimated_weight_grams: weight,
        estimated_time_hours: time,
        printer_id: printerId,
        material_id: materialId,
        cost_material: breakdown.cost_material,
        cost_energy: breakdown.cost_energy,
        cost_depreciation: breakdown.cost_depreciation,
        margin_risk: breakdown.margin_risk_value,
        total_cost: breakdown.total_cost,
        profit_margin_multiplier: profitMargin,
        final_price: breakdown.final_price,
      });
      onOpenChange(false);
    } catch (error) {
      alert("Erro ao salvar alterações.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-zinc-950 border-zinc-800 text-zinc-100 sm:max-w-3xl w-[95vw] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar Pedido</DialogTitle>
          <DialogDescription className="text-zinc-500">
            Altere os parâmetros e o custo será recalculado em tempo real.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid md:grid-cols-2 gap-6 pt-4">
          {/* Lado Esquerdo: Inputs */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Nome da Peça/Pedido</Label>
              <Input value={title} onChange={e => setTitle(e.target.value)} className="bg-zinc-900 border-zinc-800" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Peso Estimado (g)</Label>
                <Input type="number" value={weight || ""} onChange={e => setWeight(Number(e.target.value))} className="bg-zinc-900 border-zinc-800" />
              </div>
              <div className="space-y-2">
                <Label>Tempo (Horas)</Label>
                <Input type="number" step="0.5" value={time || ""} onChange={e => setTime(Number(e.target.value))} className="bg-zinc-900 border-zinc-800" />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Impressora Alvo</Label>
              <Select value={printerId} onValueChange={(v) => setPrinterId(v ?? "")}>
                <SelectTrigger className="bg-zinc-900 border-zinc-800">
                  <span className="truncate">
                    {printerId ? printers.find(p => p.id === printerId)?.name : "Selecione..."}
                  </span>
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-zinc-800 text-zinc-100">
                  {printers.map(p => <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Material</Label>
              <Select value={materialId} onValueChange={(v) => setMaterialId(v ?? "")}>
                <SelectTrigger className="bg-zinc-900 border-zinc-800">
                  <span className="truncate">
                    {materialId ? materials.find(m => m.id === materialId)?.name : "Selecione..."}
                  </span>
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-zinc-800 text-zinc-100">
                  {materials.map(m => <SelectItem key={m.id} value={m.id}>{m.name} (R${m.price_per_kg}/kg)</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2 border-t border-zinc-800">
              <div className="space-y-2">
                <Label>Margem de Lucro (x)</Label>
                <Input type="number" step="0.1" value={profitMargin} onChange={e => setProfitMargin(Number(e.target.value))} className="bg-zinc-900 border-zinc-800" />
              </div>
              <div className="space-y-2">
                <Label>Margem Risco (%)</Label>
                <Input type="number" value={riskMargin} onChange={e => setRiskMargin(Number(e.target.value))} className="bg-zinc-900 border-zinc-800" />
              </div>
            </div>
          </div>

          {/* Lado Direito: O Motor de Cálculo */}
          <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800 flex flex-col">
            <h3 className="font-medium text-zinc-300 flex items-center gap-2 mb-6">
              <Calculator className="w-5 h-5 text-emerald-500" /> Breakdown de Custos
            </h3>
            
            {!breakdown ? (
              <div className="flex-1 flex items-center justify-center text-center text-zinc-500 text-sm">
                Preencha todos os campos à esquerda para visualizar o cálculo.
              </div>
            ) : (
              <div className="space-y-3 text-sm flex-1">
                <div className="flex justify-between text-zinc-400">
                  <span>Custo Material:</span>
                  <span className="text-zinc-200">R$ {breakdown.cost_material.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Custo Energia:</span>
                  <span className="text-zinc-200">R$ {breakdown.cost_energy.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Desgaste Máquina:</span>
                  <span className="text-zinc-200">R$ {breakdown.cost_depreciation.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Risco ({riskMargin}%):</span>
                  <span className="text-orange-400">R$ {breakdown.margin_risk_value.toFixed(2)}</span>
                </div>
                
                <div className="pt-3 border-t border-zinc-800 flex justify-between font-medium">
                  <span className="text-zinc-300">Custo Base:</span>
                  <span className="text-zinc-100">R$ {breakdown.total_cost.toFixed(2)}</span>
                </div>

                <div className="pt-6 mt-auto">
                  <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-md p-4 text-center">
                    <p className="text-emerald-500/70 text-xs uppercase tracking-wider font-bold mb-1">Preço Final</p>
                    <p className="text-3xl font-black text-emerald-400">R$ {breakdown.final_price.toFixed(2)}</p>
                    <p className="text-emerald-500/50 text-xs mt-1">Lucro: R$ {(breakdown.final_price - breakdown.total_cost).toFixed(2)}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex justify-end pt-6 mt-4 border-t border-zinc-800">
          <Button onClick={handleSave} disabled={loading || !breakdown || !title} className="bg-blue-600 hover:bg-blue-500 text-white w-full md:w-auto">
            {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
            Salvar Alterações
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
