import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { updateLancamento } from "../../actions";
import { card, field, label as labelClass, buttonPrimary } from "@/lib/ui";

export default async function EditarLancamentoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: lancamento } = await supabase
    .from("financeiro_lancamentos")
    .select("*")
    .eq("id", id)
    .single();

  if (!lancamento) notFound();

  const updateWithId = updateLancamento.bind(null, id);

  return (
    <div className="max-w-xl">
      <h2 className="mb-8 text-[19px] font-semibold text-ink">Editar lançamento</h2>

      <form action={updateWithId} className={`${card} p-6`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass} htmlFor="tipo">Tipo *</label>
            <select id="tipo" name="tipo" defaultValue={lancamento.tipo} className={field}>
              <option value="receita">Receita</option>
              <option value="despesa">Despesa</option>
            </select>
          </div>
          <div>
            <label className={labelClass} htmlFor="categoria">Categoria</label>
            <input id="categoria" name="categoria" defaultValue={lancamento.categoria} className={field} />
          </div>
        </div>

        <label className={labelClass} htmlFor="descricao">Descrição</label>
        <input id="descricao" name="descricao" defaultValue={lancamento.descricao ?? ""} className={field} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass} htmlFor="valor">Valor (R$) *</label>
            <input
              id="valor"
              name="valor"
              type="number"
              step="0.01"
              required
              defaultValue={lancamento.valor}
              className={field}
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="data_vencimento">Vencimento</label>
            <input
              id="data_vencimento"
              name="data_vencimento"
              type="date"
              defaultValue={lancamento.data_vencimento ?? ""}
              className={field}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass} htmlFor="forma_pagamento">Forma de pagamento</label>
            <select
              id="forma_pagamento"
              name="forma_pagamento"
              defaultValue={lancamento.forma_pagamento ?? ""}
              className={field}
            >
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
            <select id="status" name="status" defaultValue={lancamento.status} className={field}>
              <option value="pendente">Pendente</option>
              <option value="pago">Pago</option>
              <option value="atrasado">Atrasado</option>
              <option value="cancelado">Cancelado</option>
            </select>
          </div>
        </div>

        <button type="submit" className={buttonPrimary}>
          Salvar alterações
        </button>
      </form>
    </div>
  );
}
