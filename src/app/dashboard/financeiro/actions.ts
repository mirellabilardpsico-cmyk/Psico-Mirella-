"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function createLancamento(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { error } = await supabase.from("financeiro_lancamentos").insert({
    user_id: user.id,
    tipo: String(formData.get("tipo") ?? "receita"),
    categoria: String(formData.get("categoria") ?? "sessao"),
    descricao: String(formData.get("descricao") ?? "") || null,
    valor: Number(formData.get("valor") ?? 0),
    forma_pagamento: String(formData.get("forma_pagamento") ?? "") || null,
    status: String(formData.get("status") ?? "pendente"),
    data_vencimento: String(formData.get("data_vencimento") ?? "") || null,
  });

  if (error) throw new Error(error.message);

  revalidatePath("/dashboard/financeiro");
  redirect("/dashboard/financeiro");
}

export async function markAsPago(id: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("financeiro_lancamentos")
    .update({ status: "pago", data_pagamento: new Date().toISOString().slice(0, 10) })
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/dashboard/financeiro");
}

export async function updateLancamento(id: string, formData: FormData) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("financeiro_lancamentos")
    .update({
      tipo: String(formData.get("tipo") ?? "receita"),
      categoria: String(formData.get("categoria") ?? "sessao"),
      descricao: String(formData.get("descricao") ?? "") || null,
      valor: Number(formData.get("valor") ?? 0),
      forma_pagamento: String(formData.get("forma_pagamento") ?? "") || null,
      status: String(formData.get("status") ?? "pendente"),
      data_vencimento: String(formData.get("data_vencimento") ?? "") || null,
    })
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/dashboard/financeiro");
  redirect("/dashboard/financeiro");
}

export async function deleteLancamento(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("financeiro_lancamentos").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/dashboard/financeiro");
}
