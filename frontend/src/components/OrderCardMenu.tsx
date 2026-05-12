"use client";

import { useState } from "react";
import { MoreVertical, CheckCircle2, PlayCircle, Trash2, Clock, Pencil } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuGroup } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { updateOrderStatus, deleteOrder } from "@/app/actions";
import { EditOrderModal } from "./EditOrderModal";

// Ícone customizado do WhatsApp
const WhatsappIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
  </svg>
);

interface OrderCardMenuProps {
  order: any;
  printers: any[];
  materials: any[];
  customerPhone?: string;
  customerName?: string;
}

export function OrderCardMenu({ order, printers, materials, customerPhone, customerName }: OrderCardMenuProps) {
  const [loading, setLoading] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  async function handleStatusChange(newStatus: string) {
    setLoading(true);
    try {
      await updateOrderStatus(order.id, newStatus);
    } catch (e) {
      alert("Erro ao mudar status");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (confirm("Tem certeza que deseja excluir este pedido? Esta ação não pode ser desfeita.")) {
      setLoading(true);
      try {
        await deleteOrder(order.id);
      } catch (e) {
        alert("Erro ao excluir pedido");
      } finally {
        setLoading(false);
      }
    }
  }

  function handleWhatsApp() {
    if (!customerPhone) {
      alert("Este pedido não tem um telefone vinculado.");
      return;
    }
    const safePrice = order.final_price ? Number(order.final_price).toFixed(2) : "0.00";
    const msg = `Olá *${customerName || 'Cliente'}*! 👋\nSua peça em 3D (*${order.title || 'Pedido'}*) acabou de ficar pronta!\n\nO valor final ficou em *R$ ${safePrice}*.\n\nComo deseja fazer a retirada?`;
    
    let cleanPhone = customerPhone.replace(/\D/g, '');
    if (!cleanPhone.startsWith('55')) {
      cleanPhone = '55' + cleanPhone;
    }
    
    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`, '_blank');
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger render={
          <Button variant="ghost" className="h-7 w-7 p-0 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800" disabled={loading}>
            <MoreVertical className="h-4 w-4" />
          </Button>
        } />
        <DropdownMenuContent align="end" className="bg-zinc-900 border-zinc-800 text-zinc-100 w-48">
          <DropdownMenuGroup>
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => setEditOpen(true)} className="cursor-pointer">
              <Pencil className="mr-2 h-4 w-4 text-blue-400" /> Editar Pedido
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator className="bg-zinc-800" />

          <DropdownMenuGroup>
            <DropdownMenuLabel>Mover no Funil</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => handleStatusChange("quote_pending")} disabled={order.status === "quote_pending"} className="cursor-pointer">
              <Clock className="mr-2 h-4 w-4 text-zinc-400" /> Orçamento
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleStatusChange("printing")} disabled={order.status === "printing"} className="cursor-pointer">
              <PlayCircle className="mr-2 h-4 w-4 text-blue-400" /> Em Produção
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleStatusChange("completed")} disabled={order.status === "completed"} className="cursor-pointer">
              <CheckCircle2 className="mr-2 h-4 w-4 text-emerald-400" /> Concluído
            </DropdownMenuItem>
          </DropdownMenuGroup>

          {order.status === "completed" && (
            <>
              <DropdownMenuSeparator className="bg-zinc-800" />
              <DropdownMenuItem onClick={handleWhatsApp} className="cursor-pointer text-emerald-400 focus:bg-emerald-400/10 focus:text-emerald-400">
                <WhatsappIcon className="mr-2 h-4 w-4" /> Avisar no WhatsApp
              </DropdownMenuItem>
            </>
          )}

          <DropdownMenuSeparator className="bg-zinc-800" />
          <DropdownMenuItem onClick={handleDelete} className="cursor-pointer text-red-400 focus:bg-red-400/10 focus:text-red-400">
            <Trash2 className="mr-2 h-4 w-4" /> Excluir
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <EditOrderModal
        order={order}
        printers={printers}
        materials={materials}
        open={editOpen}
        onOpenChange={setEditOpen}
      />
    </>
  );
}
