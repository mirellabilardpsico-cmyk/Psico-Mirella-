import { createClient } from "@/lib/supabase/server";
import { createAgendamento } from "../actions";
import { card, field, label as labelClass, buttonPrimary } from "@/lib/ui";

export default async function NovoAgendamentoPage() {
  const supabase = await createClient();
  const { data: pacientes } = await supabase
    .from("pacientes")
    .select("id, nome_completo, valor_sessao_padrao")
    .eq("status", "ativo")
    .order("nome_completo");

  return (
    <div className="max-w-xl">
      <h2 className="mb-8 text-[19px] font-semibold text-ink">Novo agendamento</h2>

      <form action={createAgendamento} className={`${card} p-6`}>
        <label className={labelClass} htmlFor="paciente_id">Paciente *</label>
        <select id="paciente_id" name="paciente_id" required className={field}>
          <option value="">Selecione...</option>
          {(pacientes ?? []).map((p) => (
            <option key={p.id} value={p.id}>
              {p.nome_completo}
            </option>
          ))}
        </select>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass} htmlFor="data">Data *</label>
            <input id="data" name="data" type="date" required className={field} />
          </div>
          <div>
            <label className={labelClass} htmlFor="hora">Hora *</label>
            <input id="hora" name="hora" type="time" required className={field} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass} htmlFor="tipo">Tipo</label>
            <select id="tipo" name="tipo" defaultValue="presencial" className={field}>
              <option value="presencial">Presencial</option>
              <option value="online">Online</option>
            </select>
          </div>
          <div>
            <label className={labelClass} htmlFor="valor">Valor (R$)</label>
            <input id="valor" name="valor" type="number" step="0.01" className={field} />
          </div>
        </div>

        <label className={labelClass} htmlFor="observacoes">Observações</label>
        <textarea id="observacoes" name="observacoes" rows={2} className={field} />

        <button type="submit" className={buttonPrimary}>
          Agendar
        </button>
      </form>
    </div>
  );
}
