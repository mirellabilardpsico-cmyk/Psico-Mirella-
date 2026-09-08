import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { addEvolucao } from "../actions";
import { DeletePacienteButton } from "./delete-paciente-button";
import { card, field, buttonPrimary, buttonGhost } from "@/lib/ui";
import { EditIcon } from "@/components/icons";

export default async function FichaPacientePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const [{ data: paciente }, { data: evolucoes }, { data: agendamentos }] = await Promise.all([
    supabase.from("pacientes").select("*").eq("id", id).single(),
    supabase
      .from("evolucoes")
      .select("id, data, conteudo, status")
      .eq("paciente_id", id)
      .order("data", { ascending: false }),
    supabase
      .from("agendamentos")
      .select("id, data_hora_inicio, status")
      .eq("paciente_id", id)
      .order("data_hora_inicio", { ascending: false })
      .limit(5),
  ]);

  if (!paciente) notFound();

  const addEvolucaoWithId = addEvolucao.bind(null, id);

  return (
    <div className="max-w-3xl">
      <div className="mb-1 flex flex-wrap items-start justify-between gap-3">
        <h2 className="text-[19px] font-semibold text-ink">{paciente.nome_completo}</h2>
        <div className="flex items-center gap-2">
          <Link href={`/dashboard/pacientes/${paciente.id}/editar`} className={buttonGhost}>
            <EditIcon className="h-3.5 w-3.5" />
            Editar
          </Link>
          <DeletePacienteButton id={paciente.id} />
        </div>
      </div>
      <p className="mb-8 text-[14px] text-ink-soft">
        {paciente.telefone ?? "sem telefone"} · {paciente.email ?? "sem email"} · {paciente.convenio}
      </p>

      <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className={`${card} p-5`}>
          <h3 className="mb-3 text-[13px] font-semibold text-ink">Últimas sessões</h3>
          {(agendamentos ?? []).length === 0 && (
            <p className="text-[14px] text-ink-soft">Nenhuma sessão registrada.</p>
          )}
          {(agendamentos ?? []).map((a) => (
            <p key={a.id} className="text-[14px] text-ink-soft">
              {new Date(a.data_hora_inicio).toLocaleDateString("pt-BR")} — {a.status}
            </p>
          ))}
        </div>
        <div className={`${card} p-5`}>
          <h3 className="mb-3 text-[13px] font-semibold text-ink">Dados</h3>
          <p className="text-[14px] text-ink-soft">
            Valor padrão:{" "}
            {paciente.valor_sessao_padrao
              ? Number(paciente.valor_sessao_padrao).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })
              : "não definido"}
          </p>
          <p className="text-[14px] text-ink-soft">Status: {paciente.status}</p>
        </div>
      </div>

      <h3 className="mb-3 text-[14px] font-semibold text-ink">Prontuário / evolução</h3>

      <form action={addEvolucaoWithId} className={`${card} mb-6 p-4`}>
        <textarea
          name="conteudo"
          required
          rows={4}
          placeholder="Registrar evolução da sessão..."
          className={`${field} mb-3`}
        />
        <button type="submit" className={buttonPrimary}>
          Salvar registro
        </button>
      </form>

      <div className="space-y-3">
        {(evolucoes ?? []).length === 0 && (
          <p className="text-[14px] text-ink-soft">Nenhum registro ainda.</p>
        )}
        {(evolucoes ?? []).map((e) => (
          <div key={e.id} className={`${card} p-4`}>
            <p className="mb-1 text-[12px] text-ink-faint">
              {new Date(e.data).toLocaleDateString("pt-BR")}
            </p>
            <p className="text-[14px] whitespace-pre-wrap text-ink">{e.conteudo}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
