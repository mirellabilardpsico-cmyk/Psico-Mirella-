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

export async function uploadImagens(postId: string, formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const arquivos = formData.getAll("imagens").filter((f): f is File => f instanceof File && f.size > 0);

  const { count } = await supabase
    .from("conteudo_imagens")
    .select("*", { count: "exact", head: true })
    .eq("post_id", postId);
  let ordem = count ?? 0;

  for (const arquivo of arquivos) {
    const path = `${user.id}/${postId}/${crypto.randomUUID()}-${arquivo.name}`;

    const { error: uploadError } = await supabase.storage
      .from("conteudo-imagens")
      .upload(path, arquivo, { contentType: arquivo.type });
    if (uploadError) throw new Error(uploadError.message);

    const { error: insertError } = await supabase.from("conteudo_imagens").insert({
      user_id: user.id,
      post_id: postId,
      storage_path: path,
      nome_arquivo: arquivo.name,
      ordem: ordem++,
    });
    if (insertError) throw new Error(insertError.message);
  }

  revalidatePath(`/dashboard/conteudo/${postId}`);
}

export async function deleteImagem(imagemId: string, postId: string, storagePath: string) {
  const supabase = await createClient();

  await supabase.storage.from("conteudo-imagens").remove([storagePath]);

  const { error } = await supabase.from("conteudo_imagens").delete().eq("id", imagemId);
  if (error) throw new Error(error.message);

  revalidatePath(`/dashboard/conteudo/${postId}`);
}
