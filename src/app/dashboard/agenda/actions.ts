"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function createAgendamento(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const data = String(formData.get("data") ?? "");
  const hora = String(formData.get("hora") ?? "");

  const { error } = await supabase.from("agendamentos").insert({
    user_id: user.id,
    paciente_id: String(formData.get("paciente_id") ?? ""),
    data_hora_inicio: new Date(`${data}T${hora}`).toISOString(),
    tipo: String(formData.get("tipo") ?? "presencial"),
    valor: formData.get("valor") ? Number(formData.get("valor")) : null,
    observacoes: String(formData.get("observacoes") ?? "") || null,
  });

  if (error) throw new Error(error.message);

  revalidatePath("/dashboard/agenda");
  redirect("/dashboard/agenda");
}

export async function updateAgendamentoStatus(id: string, status: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("agendamentos").update({ status }).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/dashboard/agenda");
}
