import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { StatusSelect } from "../status-select";
import { DeleteImagemButton } from "./delete-imagem-button";
import { DeletePostButton } from "./delete-post-button";
import { CopyLegendaButton } from "./copy-legenda-button";
import { uploadImagens } from "../actions";
import { card, field, buttonPrimary, buttonGhost } from "@/lib/ui";
import { DownloadIcon, EditIcon } from "@/components/icons";

const FORMATO_LABEL: Record<string, string> = {
  carrossel: "Carrossel",
  reels: "Reels",
  stories: "Stories",
  imagem: "Imagem única",
  texto: "Texto",
};

export default async function PostDetalhePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const [{ data: post }, { data: imagens }] = await Promise.all([
    supabase.from("conteudo_posts").select("*").eq("id", id).single(),
    supabase
      .from("conteudo_imagens")
      .select("id, storage_path, nome_arquivo, ordem")
      .eq("post_id", id)
      .order("ordem", { ascending: true }),
  ]);

  if (!post) notFound();

  const imagensComUrl = await Promise.all(
    (imagens ?? []).map(async (img) => {
      const [{ data: view }, { data: download }] = await Promise.all([
        supabase.storage.from("conteudo-imagens").createSignedUrl(img.storage_path, 3600),
        supabase.storage
          .from("conteudo-imagens")
          .createSignedUrl(img.storage_path, 3600, { download: img.nome_arquivo ?? true }),
      ]);
      return { ...img, url: view?.signedUrl ?? null, downloadUrl: download?.signedUrl ?? null };
    }),
  );

  const uploadWithId = uploadImagens.bind(null, id);

  return (
    <div className="max-w-3xl">
      <Link href="/dashboard/conteudo" className={`${buttonGhost} mb-4 -ml-3`}>
        ← Conteúdo
      </Link>

      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-[19px] font-semibold text-ink">{post.titulo}</h2>
          <p className="mt-1 text-[13px] text-ink-soft">
            {new Date(`${post.data}T00:00:00`).toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "long",
              weekday: "long",
            })}{" "}
            · {FORMATO_LABEL[post.formato] ?? post.formato}
            {post.pilar ? ` · ${post.pilar}` : ""}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Link href={`/dashboard/conteudo/${post.id}/editar`} className={buttonGhost}>
            <EditIcon className="h-3.5 w-3.5" />
            Editar
          </Link>
          <StatusSelect id={post.id} status={post.status} />
          <DeletePostButton id={post.id} />
        </div>
      </div>

      {post.legenda && (
        <div className={`${card} mb-8 p-4`}>
          <div className="mb-1.5 flex items-center justify-between gap-3">
            <p className="text-[12px] font-medium text-ink-faint">Legenda / observações</p>
            <CopyLegendaButton legenda={post.legenda} />
          </div>
          <p className="text-[14px] whitespace-pre-wrap text-ink">{post.legenda}</p>
        </div>
      )}

      <h3 className="mb-1 text-[14px] font-semibold text-ink">Imagens</h3>
      <p className="mb-3 text-[12px] text-ink-soft">
        Prontas pra Mirella baixar e postar no Instagram — passe o mouse sobre a imagem.
      </p>

      {imagensComUrl.length > 0 && (
        <div className="mb-5 grid grid-cols-3 gap-3 sm:grid-cols-4">
          {imagensComUrl.map((img) => (
            <div key={img.id} className="group relative aspect-square overflow-hidden rounded-xl border border-border bg-surface-sunken">
              {img.url && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={img.url} alt={img.nome_arquivo ?? ""} className="h-full w-full object-cover" />
              )}
              <DeleteImagemButton imagemId={img.id} postId={post.id} storagePath={img.storage_path} />
              {img.downloadUrl && (
                <a
                  href={img.downloadUrl}
                  download={img.nome_arquivo ?? undefined}
                  title="Baixar imagem"
                  className="absolute bottom-1.5 right-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-plum/70 text-white opacity-0 transition-opacity group-hover:opacity-100"
                >
                  <DownloadIcon className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
          ))}
        </div>
      )}

      <form action={uploadWithId} className={`${card} p-4`}>
        <label className="mb-2 block text-[13px] font-medium text-ink-soft" htmlFor="imagens">
          Subir imagens
        </label>
        <input
          id="imagens"
          name="imagens"
          type="file"
          accept="image/*"
          multiple
          required
          className={`${field} !mb-3 file:mr-3 file:rounded-full file:border-0 file:bg-accent-soft file:px-3 file:py-1.5 file:text-[12px] file:font-medium file:text-accent-soft-ink`}
        />
        <button type="submit" className={buttonPrimary}>
          Enviar imagens
        </button>
      </form>
    </div>
  );
}
