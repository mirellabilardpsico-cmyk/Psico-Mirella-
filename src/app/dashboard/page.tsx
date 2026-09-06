import { createClient } from "@/lib/supabase/server";
import { card, badge, pageTitle, sectionTitle } from "@/lib/ui";
import { UsersIcon, CalendarIcon, WalletIcon } from "@/components/icons";

export default async function DashboardPage() {
  const supabase = await createClient();

  const hoje = new Date();
  const inicioHoje = new Date(hoje.setHours(0, 0, 0, 0)).toISOString();
  const fimHoje = new Date(hoje.setHours(23, 59, 59, 999)).toISOString();

  const [{ count: pacientesAtivos }, { data: agendamentosHoje }, { data: pendencias }] =
    await Promise.all([
      supabase.from("pacientes").select("*", { count: "exact", head: true }).eq("status", "ativo"),
      supabase
        .from("agendamentos")
        .select("id, data_hora_inicio, status, pacientes(nome_completo)")
        .gte("data_hora_inicio", inicioHoje)
        .lte("data_hora_inicio", fimHoje)
        .order("data_hora_inicio"),
      supabase
        .from("financeiro_lancamentos")
        .select("id, valor, status")
        .in("status", ["pendente", "atrasado"]),
    ]);

  const totalPendente = (pendencias ?? []).reduce((acc, l) => acc + Number(l.valor), 0);

  const stats = [
    { label: "Pacientes ativos", value: String(pacientesAtivos ?? 0), icon: UsersIcon },
    { label: "Sessões hoje", value: String(agendamentosHoje?.length ?? 0), icon: CalendarIcon },
    {
      label: "A receber",
      value: totalPendente.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }),
      icon: WalletIcon,
    },
  ];

  return (
    <div>
      <div className="mb-6">
        <h2 className={pageTitle}>Visão geral</h2>
        <p className="text-[13px] text-ink-soft">
          {hoje.toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long" })}
        </p>
      </div>

      <div className="mb-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((s) => (
          <div key={s.label} className={`${card} p-5`}>
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-accent-soft text-accent-soft-ink">
              <s.icon className="h-4 w-4" />
            </div>
            <p className="text-[12px] text-ink-soft">{s.label}</p>
            <p className="mt-0.5 text-[22px] font-semibold text-ink">{s.value}</p>
          </div>
        ))}
      </div>

      <h3 className={`${sectionTitle} mb-2`}>Agenda de hoje</h3>
      <div className={card}>
        {(agendamentosHoje ?? []).length === 0 && (
          <p className="p-4 text-[13px] text-ink-soft">Nenhuma sessão marcada para hoje.</p>
        )}
        {(agendamentosHoje ?? []).map((a) => (
          <div
            key={a.id}
            className="flex items-center justify-between border-b border-border-soft px-4 py-3 last:border-0"
          >
            <span className="text-[13px] text-ink">
              <span className="font-medium">
                {new Date(a.data_hora_inicio).toLocaleTimeString("pt-BR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>{" "}
              — {(a.pacientes as unknown as { nome_completo: string } | null)?.nome_completo}
            </span>
            <span className={badge("neutral")}>{a.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
