"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function createPaciente(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { error } = await supabase.from("pacientes").insert({
    user_id: user.id,
    nome_completo: String(formData.get("nome_completo") ?? ""),
    telefone: String(formData.get("telefone") ?? "") || null,
    email: String(formData.get("email") ?? "") || null,
    data_nascimento: String(formData.get("data_nascimento") ?? "") || null,
    convenio: String(formData.get("convenio") ?? "particular"),
    valor_sessao_padrao: formData.get("valor_sessao_padrao")
      ? Number(formData.get("valor_sessao_padrao"))
      : null,
    observacoes: String(formData.get("observacoes") ?? "") || null,
  });

  if (error) throw new Error(error.message);

  revalidatePath("/dashboard/pacientes");
  redirect("/dashboard/pacientes");
}

export async function addEvolucao(pacienteId: string, formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { error } = await supabase.from("evolucoes").insert({
    user_id: user.id,
    paciente_id: pacienteId,
    conteudo: String(formData.get("conteudo") ?? ""),
    status: "confirmado",
  });

  if (error) throw new Error(error.message);

  revalidatePath(`/dashboard/pacientes/${pacienteId}`);
}
