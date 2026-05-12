"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Loader2 } from "lucide-react";
import { addPrinter } from "@/app/actions";

export function AddPrinterModal() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    try {
      await addPrinter(formData);
      setOpen(false);
    } catch (error) {
      alert("Erro ao salvar impressora.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={
        <Button className="bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_15px_rgba(37,99,235,0.3)] transition-all">
          <Plus className="w-4 h-4 mr-2" /> Nova Impressora
        </Button>
      } />
      <DialogContent className="bg-zinc-950 border-zinc-800 text-zinc-100">
        <DialogHeader>
          <DialogTitle>Cadastrar Nova Impressora</DialogTitle>
          <DialogDescription className="text-zinc-500">
            Insira os dados técnicos para o motor de custos.
          </DialogDescription>
        </DialogHeader>
        <form action={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="name">Modelo da Impressora (ex: BambuLab P1S)</Label>
            <Input id="name" name="name" required className="bg-zinc-900 border-zinc-800" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="energy">Consumo (kW)</Label>
              <Input id="energy" name="energy" type="number" step="0.001" defaultValue="0.120" required className="bg-zinc-900 border-zinc-800" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="depreciation">Depreciação/Hora (R$)</Label>
              <Input id="depreciation" name="depreciation" type="number" step="0.01" defaultValue="0.50" required className="bg-zinc-900 border-zinc-800" />
            </div>
          </div>
          <div className="flex justify-end pt-4">
            <Button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-500 text-white">
              {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              Salvar Impressora
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
