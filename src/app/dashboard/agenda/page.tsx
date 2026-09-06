import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { StatusSelect } from "./status-select";
import { buttonPrimary } from "@/lib/ui";
import { tagColor } from "@/lib/tags";

export default async function AgendaPage() {
  const supabase = await createClient();
  const { data: agendamentos } = await supabase
    .from("agendamentos")
    .select("id, paciente_id, data_hora_inicio, tipo, status, valor, pacientes(nome_completo)")
    .order("data_hora_inicio", { ascending: true });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-[19px] font-semibold text-ink">Agenda</h2>
        <Link href="/dashboard/agenda/novo" className={buttonPrimary}>
          Novo agendamento
        </Link>
      </div>

      {(agendamentos ?? []).length === 0 && (
        <div className="rounded-2xl border border-border bg-surface p-6 text-[13px] text-ink-soft shadow-[var(--shadow-card)]">
          Nenhuma sessão agendada.
        </div>
      )}

      <div className="space-y-2.5">
        {(agendamentos ?? []).map((a) => {
          const paciente = a.pacientes as unknown as { nome_completo: string } | null;
          const tone = tagColor(a.paciente_id);
          return (
            <div
              key={a.id}
              className="flex items-center justify-between rounded-2xl border border-border bg-surface py-3 pr-4 shadow-[var(--shadow-card)]"
              style={{ borderLeft: `4px solid ${tone.bar}` }}
            >
              <div className="ml-3.5">
                <p className="text-[13px] font-semibold text-ink">
                  {new Date(a.data_hora_inicio).toLocaleString("pt-BR", {
                    dateStyle: "short",
                    timeStyle: "short",
                  })}{" "}
                  — {paciente?.nome_completo}
                </p>
                <p className="text-[12px] text-ink-soft">
                  {a.tipo}
                  {a.valor
                    ? ` · ${Number(a.valor).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`
                    : ""}
                </p>
              </div>
              <StatusSelect id={a.id} status={a.status} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
