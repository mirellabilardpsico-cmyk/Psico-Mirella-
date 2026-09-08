import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { updatePost } from "../../actions";
import { card, field, label as labelClass, buttonPrimary } from "@/lib/ui";

const PILARES = [
  "Ansiedade & regulação",
  "Autoestima & autoconhecimento",
  "Relacionamentos & vínculos",
  "Cada fase, seu tempo",
  "Por trás da terapia",
];

export default async function EditarPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: post } = await supabase.from("conteudo_posts").select("*").eq("id", id).single();

  if (!post) notFound();

  const updateWithId = updatePost.bind(null, id);

  return (
    <div className="max-w-xl">
      <h2 className="mb-8 text-[19px] font-semibold text-ink">Editar post</h2>

      <form action={updateWithId} className={`${card} p-6`}>
        <label className={labelClass} htmlFor="titulo">Título / gancho *</label>
        <input
          id="titulo"
          name="titulo"
          type="text"
          required
          defaultValue={post.titulo}
          className={field}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass} htmlFor="data">Data *</label>
            <input id="data" name="data" type="date" required defaultValue={post.data} className={field} />
          </div>
          <div>
            <label className={labelClass} htmlFor="formato">Formato</label>
            <select id="formato" name="formato" defaultValue={post.formato} className={field}>
              <option value="carrossel">Carrossel</option>
              <option value="reels">Reels</option>
              <option value="stories">Stories</option>
              <option value="imagem">Imagem única</option>
              <option value="texto">Texto</option>
            </select>
          </div>
        </div>

        <label className={labelClass} htmlFor="pilar">Pilar</label>
        <select id="pilar" name="pilar" defaultValue={post.pilar ?? ""} className={field}>
          <option value="">Selecione...</option>
          {PILARES.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>

        <label className={labelClass} htmlFor="legenda">Legenda / observações</label>
        <textarea
          id="legenda"
          name="legenda"
          rows={4}
          defaultValue={post.legenda ?? ""}
          className={field}
        />

        <button type="submit" className={buttonPrimary}>
          Salvar alterações
        </button>
      </form>
    </div>
  );
}
