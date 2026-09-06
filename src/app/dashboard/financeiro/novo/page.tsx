import { createLancamento } from "../actions";
import { card, field, label as labelClass, buttonPrimary } from "@/lib/ui";

export default function NovoLancamentoPage() {
  return (
    <div className="max-w-xl">
      <h2 className="mb-8 text-[19px] font-semibold text-ink">Novo lançamento</h2>

      <form action={createLancamento} className={`${card} p-6`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass} htmlFor="tipo">Tipo *</label>
            <select id="tipo" name="tipo" defaultValue="receita" className={field}>
              <option value="receita">Receita</option>
              <option value="despesa">Despesa</option>
            </select>
          </div>
          <div>
            <label className={labelClass} htmlFor="categoria">Categoria</label>
            <input id="categoria" name="categoria" defaultValue="sessao" className={field} />
          </div>
        </div>

        <label className={labelClass} htmlFor="descricao">Descrição</label>
        <input id="descricao" name="descricao" className={field} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass} htmlFor="valor">Valor (R$) *</label>
            <input id="valor" name="valor" type="number" step="0.01" required className={field} />
          </div>
          <div>
            <label className={labelClass} htmlFor="data_vencimento">Vencimento</label>
            <input id="data_vencimento" name="data_vencimento" type="date" className={field} />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass} htmlFor="forma_pagamento">Forma de pagamento</label>
            <select id="forma_pagamento" name="forma_pagamento" defaultValue="" className={field}>
              <option value="">Não definida</option>
              <option value="pix">Pix</option>
              <option value="dinheiro">Dinheiro</option>
              <option value="cartao">Cartão</option>
              <option value="transferencia">Transferência</option>
              <option value="boleto">Boleto</option>
            </select>
          </div>
          <div>
            <label className={labelClass} htmlFor="status">Status</label>
            <select id="status" name="status" defaultValue="pendente" className={field}>
              <option value="pendente">Pendente</option>
              <option value="pago">Pago</option>
              <option value="atrasado">Atrasado</option>
              <option value="cancelado">Cancelado</option>
            </select>
          </div>
        </div>

        <button type="submit" className={buttonPrimary}>
          Salvar lançamento
        </button>
      </form>
    </div>
  );
}
