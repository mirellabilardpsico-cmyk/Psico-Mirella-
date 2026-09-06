import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { StatusSelect } from "./status-select";
import { card, buttonPrimary, pageTitle } from "@/lib/ui";
import { tagColor } from "@/lib/tags";

const FORMATO_LABEL: Record<string, string> = {
  carrossel: "Carrossel",
  reels: "Reels",
  stories: "Stories",
  imagem: "Imagem única",
  texto: "Texto",
};

export default async function ConteudoPage() {
  const supabase = await createClient();
  const { data: posts } = await supabase
    .from("conteudo_posts")
    .select("id, data, formato, pilar, titulo, legenda, status")
    .order("data", { ascending: true });

  const lista = posts ?? [];
  const totalPlanejados = lista.filter((p) => p.status === "planejado").length;
  const totalPublicados = lista.filter((p) => p.status === "publicado").length;

  const grupos = new Map<string, typeof lista>();
  for (const p of lista) {
    const label = new Date(`${p.data}T00:00:00`).toLocaleDateString("pt-BR", {
      month: "long",
      year: "numeric",
    });
    const key = label.charAt(0).toUpperCase() + label.slice(1);
    if (!grupos.has(key)) grupos.set(key, []);
    grupos.get(key)!.push(p);
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className={pageTitle}>Conteúdo</h2>
        <Link href="/dashboard/conteudo/novo" className={buttonPrimary}>
          Novo post
        </Link>
      </div>

      <div className="mb-8 grid grid-cols-2 gap-3">
        <div className={`${card} p-4`}>
          <p className="text-[12px] text-ink-faint">Planejados</p>
          <p className="text-[22px] font-semibold text-ink">{totalPlanejados}</p>
        </div>
        <div className={`${card} p-4`}>
          <p className="text-[12px] text-ink-faint">Publicados</p>
          <p className="text-[22px] font-semibold text-accent">{totalPublicados}</p>
        </div>
      </div>

      {lista.length === 0 && (
        <div className="rounded-2xl border border-border bg-surface p-6 text-[13px] text-ink-soft shadow-[var(--shadow-card)]">
          Nenhum post na pauta ainda.
        </div>
      )}

      {Array.from(grupos.entries()).map(([mes, items]) => (
        <div key={mes} className="mb-8">
          <h3 className="mb-2 text-[14px] font-semibold text-ink">{mes}</h3>
          <div className="space-y-2.5">
            {items.map((p) => {
              const tone = tagColor(p.pilar || p.formato);
              return (
                <div
                  key={p.id}
                  className="flex items-center justify-between rounded-2xl border border-border bg-surface py-3 pr-4 shadow-[var(--shadow-card)]"
                  style={{ borderLeft: `4px solid ${tone.bar}` }}
                >
                  <div className="ml-3.5">
                    <p className="text-[13px] font-semibold text-ink">
                      {new Date(`${p.data}T00:00:00`).toLocaleDateString("pt-BR", {
                        day: "2-digit",
                        weekday: "short",
                      })}{" "}
                      — {p.titulo}
                    </p>
                    <p className="text-[12px] text-ink-soft">
                      {FORMATO_LABEL[p.formato] ?? p.formato}
                      {p.pilar ? ` · ${p.pilar}` : ""}
                    </p>
                  </div>
                  <StatusSelect id={p.id} status={p.status} />
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
