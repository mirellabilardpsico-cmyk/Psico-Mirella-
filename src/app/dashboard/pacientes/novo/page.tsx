import { createPaciente } from "../actions";
import { card, field, label as labelClass, buttonPrimary } from "@/lib/ui";

export default function NovoPacientePage() {
  return (
    <div className="max-w-xl">
      <h2 className="mb-8 text-[19px] font-semibold text-ink">Novo paciente</h2>

      <form action={createPaciente} className={`${card} p-6`}>
        <label className={labelClass} htmlFor="nome_completo">Nome completo *</label>
        <input id="nome_completo" name="nome_completo" required className={field} />

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass} htmlFor="telefone">Telefone</label>
            <input id="telefone" name="telefone" className={field} />
          </div>
          <div>
            <label className={labelClass} htmlFor="email">Email</label>
            <input id="email" name="email" type="email" className={field} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass} htmlFor="data_nascimento">Data de nascimento</label>
            <input id="data_nascimento" name="data_nascimento" type="date" className={field} />
          </div>
          <div>
            <label className={labelClass} htmlFor="valor_sessao_padrao">Valor da sessão (R$)</label>
            <input
              id="valor_sessao_padrao"
              name="valor_sessao_padrao"
              type="number"
              step="0.01"
              className={field}
            />
          </div>
        </div>

        <label className={labelClass} htmlFor="convenio">Convênio</label>
        <input id="convenio" name="convenio" defaultValue="particular" className={field} />

        <label className={labelClass} htmlFor="observacoes">Observações</label>
        <textarea id="observacoes" name="observacoes" rows={3} className={field} />

        <button type="submit" className={buttonPrimary}>
          Salvar paciente
        </button>
      </form>
    </div>
  );
}
