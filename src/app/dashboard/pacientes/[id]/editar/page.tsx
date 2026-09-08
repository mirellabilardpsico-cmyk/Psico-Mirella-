import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { updatePaciente } from "../../actions";
import { card, field, label as labelClass, buttonPrimary } from "@/lib/ui";

export default async function EditarPacientePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: paciente } = await supabase.from("pacientes").select("*").eq("id", id).single();

  if (!paciente) notFound();

  const updateWithId = updatePaciente.bind(null, id);

  return (
    <div className="max-w-xl">
      <h2 className="mb-8 text-[19px] font-semibold text-ink">Editar paciente</h2>

      <form action={updateWithId} className={`${card} p-6`}>
        <label className={labelClass} htmlFor="nome_completo">Nome completo *</label>
        <input
          id="nome_completo"
          name="nome_completo"
          required
          defaultValue={paciente.nome_completo}
          className={field}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass} htmlFor="telefone">Telefone</label>
            <input id="telefone" name="telefone" defaultValue={paciente.telefone ?? ""} className={field} />
          </div>
          <div>
            <label className={labelClass} htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              defaultValue={paciente.email ?? ""}
              className={field}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass} htmlFor="data_nascimento">Data de nascimento</label>
            <input
              id="data_nascimento"
              name="data_nascimento"
              type="date"
              defaultValue={paciente.data_nascimento ?? ""}
              className={field}
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="valor_sessao_padrao">Valor da sessão (R$)</label>
            <input
              id="valor_sessao_padrao"
              name="valor_sessao_padrao"
              type="number"
              step="0.01"
              defaultValue={paciente.valor_sessao_padrao ?? ""}
              className={field}
            />
          </div>
        </div>

        <label className={labelClass} htmlFor="convenio">Convênio</label>
        <input id="convenio" name="convenio" defaultValue={paciente.convenio} className={field} />

        <label className={labelClass} htmlFor="observacoes">Observações</label>
        <textarea
          id="observacoes"
          name="observacoes"
          rows={3}
          defaultValue={paciente.observacoes ?? ""}
          className={field}
        />

        <button type="submit" className={buttonPrimary}>
          Salvar alterações
        </button>
      </form>
    </div>
  );
}
