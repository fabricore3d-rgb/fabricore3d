"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Loader2 } from "lucide-react";
import { addMaterial } from "@/app/actions";

export function AddMaterialModal() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    try {
      await addMaterial(formData);
      setOpen(false);
    } catch (error) {
      alert("Erro ao salvar material.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={
        <Button className="bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_0_15px_rgba(5,150,105,0.3)] transition-all text-zinc-950 font-semibold">
          <Plus className="w-4 h-4 mr-2" /> Novo Material
        </Button>
      } />
      <DialogContent className="bg-zinc-950 border-zinc-800 text-zinc-100">
        <DialogHeader>
          <DialogTitle>Adicionar Material</DialogTitle>
          <DialogDescription className="text-zinc-500">
            Cadastre os custos de filamentos e resinas.
          </DialogDescription>
        </DialogHeader>
        <form action={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome do Material (ex: PLA Silk, PETG)</Label>
            <Input id="name" name="name" required className="bg-zinc-900 border-zinc-800" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Preço por KG (R$)</Label>
              <Input id="price" name="price" type="number" step="0.01" placeholder="95.00" required className="bg-zinc-900 border-zinc-800" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="color">Cor (Hexadecimal)</Label>
              <Input id="color" name="color" type="color" defaultValue="#ffffff" className="h-10 bg-zinc-900 border-zinc-800 p-1 w-full" />
            </div>
          </div>
          <div className="flex justify-end pt-4">
            <Button type="submit" disabled={loading} className="bg-emerald-600 hover:bg-emerald-500 text-zinc-950 font-bold">
              {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              Salvar Material
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
