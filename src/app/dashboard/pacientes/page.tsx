import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { buttonPrimary } from "@/lib/ui";
import { tagColor } from "@/lib/tags";
import { UsersIcon } from "@/components/icons";

export default async function PacientesPage() {
  const supabase = await createClient();
  const { data: pacientes } = await supabase
    .from("pacientes")
    .select("id, nome_completo, telefone, convenio, status")
    .order("nome_completo");

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-[19px] font-semibold text-ink">Pacientes</h2>
        <Link href="/dashboard/pacientes/novo" className={buttonPrimary}>
          Novo paciente
        </Link>
      </div>

      {(pacientes ?? []).length === 0 && (
        <div className="rounded-2xl border border-border bg-surface p-6 text-[13px] text-ink-soft shadow-[var(--shadow-card)]">
          Nenhum paciente cadastrado ainda.
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        {(pacientes ?? []).map((p) => {
          const tone = tagColor(p.id);
          return (
            <Link
              key={p.id}
              href={`/dashboard/pacientes/${p.id}`}
              className="flex items-center gap-3 overflow-hidden rounded-2xl border border-border bg-surface py-3 pr-4 shadow-[var(--shadow-card)] transition-transform hover:-translate-y-0.5"
              style={{ borderLeft: `4px solid ${tone.bar}` }}
            >
              <span
                className="ml-3.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                style={{ background: tone.soft, color: tone.ink }}
              >
                <UsersIcon className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] font-semibold text-ink">{p.nome_completo}</p>
                <p className="flex items-center gap-1.5 truncate text-[12px] text-ink-soft">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: tone.bar }} />
                  {p.telefone ?? "sem telefone"} · {p.convenio}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
