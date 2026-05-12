"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";

export async function addPrinter(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Não autorizado");

  const name = formData.get("name") as string;
  const energy = parseFloat(formData.get("energy") as string);
  const depreciation = parseFloat(formData.get("depreciation") as string);

  const { error } = await supabase.from("printers").insert([
    {
      name,
      energy_consumption_kw: energy,
      depreciation_per_hour: depreciation,
      status: "idle",
      user_id: user.id
    },
  ]);

  if (error) {
    console.error("Erro ao adicionar impressora:", error);
    throw new Error("Falha ao salvar a impressora.");
  }

  revalidatePath("/fazenda");
}

export async function addMaterial(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Não autorizado");

  const name = formData.get("name") as string;
  const color = formData.get("color") as string;
  const price = parseFloat(formData.get("price") as string);

  const { error } = await supabase.from("materials").insert([
    {
      name,
      color,
      price_per_kg: price,
      user_id: user.id
    },
  ]);

  if (error) {
    console.error("Erro ao adicionar material:", error);
    throw new Error("Falha ao salvar o material.");
  }

  revalidatePath("/fazenda");
}

export async function createOrder(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Não autorizado");

  // 1. Criar ou encontrar cliente
  let customerId = null;
  const customerName = formData.get("customerName") as string;
  const customerPhone = formData.get("customerPhone") as string;
  
  if (customerName && customerPhone) {
    const { data: customerData, error: customerError } = await supabase
      .from("customers")
      .insert([{ name: customerName, phone: customerPhone, user_id: user.id }])
      .select("id")
      .single();
      
    if (!customerError && customerData) {
      customerId = customerData.id;
    }
  }

  // 2. Criar Pedido
  const { error } = await supabase.from("orders").insert([
    {
      customer_id: customerId,
      user_id: user.id,
      title: formData.get("title"),
      estimated_weight_grams: Number(formData.get("weight")),
      estimated_time_hours: Number(formData.get("time")),
      printer_id: formData.get("printerId"),
      material_id: formData.get("materialId"),
      cost_material: Number(formData.get("cost_material")),
      cost_energy: Number(formData.get("cost_energy")),
      cost_depreciation: Number(formData.get("cost_depreciation")),
      margin_risk: Number(formData.get("margin_risk")),
      total_cost: Number(formData.get("total_cost")),
      profit_margin_multiplier: Number(formData.get("profit_margin_multiplier")),
      final_price: Number(formData.get("final_price")),
      status: "quote_pending"
    },
  ]);

  if (error) {
    console.error("Erro ao adicionar pedido:", error);
    throw new Error("Falha ao salvar o pedido.");
  }

  revalidatePath("/pedidos");
}

export async function updateOrder(orderId: string, updates: {
  title?: string;
  estimated_weight_grams?: number;
  estimated_time_hours?: number;
  printer_id?: string;
  material_id?: string;
  cost_material?: number;
  cost_energy?: number;
  cost_depreciation?: number;
  margin_risk?: number;
  total_cost?: number;
  profit_margin_multiplier?: number;
  final_price?: number;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Não autorizado");

  const { error } = await supabase.from("orders").update(updates).eq("id", orderId);
  if (error) {
    console.error("Erro ao editar pedido:", error);
    throw new Error("Falha ao editar o pedido.");
  }

  revalidatePath("/pedidos");
}

export async function updateOrderStatus(orderId: string, status: string) {
  const supabase = await createClient();
  // 1. Atualizar o status
  const { error } = await supabase.from("orders").update({ status }).eq("id", orderId);
  if (error) {
    console.error("Erro ao atualizar status:", error);
    throw new Error("Falha ao atualizar status.");
  }
  
  revalidatePath("/pedidos");
}

export async function deleteOrder(orderId: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("orders").delete().eq("id", orderId);
  if (error) {
    console.error("Erro ao deletar pedido:", error);
    throw new Error("Falha ao deletar pedido.");
  }
  revalidatePath("/pedidos");
}
