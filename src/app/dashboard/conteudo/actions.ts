"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function createPost(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { error } = await supabase.from("conteudo_posts").insert({
    user_id: user.id,
    data: String(formData.get("data") ?? ""),
    formato: String(formData.get("formato") ?? "carrossel"),
    pilar: String(formData.get("pilar") ?? "") || null,
    titulo: String(formData.get("titulo") ?? ""),
    legenda: String(formData.get("legenda") ?? "") || null,
  });

  if (error) throw new Error(error.message);

  revalidatePath("/dashboard/conteudo");
  redirect("/dashboard/conteudo");
}

export async function updatePostStatus(id: string, status: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("conteudo_posts").update({ status }).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/dashboard/conteudo");
}
