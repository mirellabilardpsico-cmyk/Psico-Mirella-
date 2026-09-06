import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { MarkPagoButton } from "./mark-pago-button";
import { card, badge, buttonPrimary, pageTitle } from "@/lib/ui";

export default async function FinanceiroPage() {
  const supabase = await createClient();
  const { data: lancamentos } = await supabase
    .from("financeiro_lancamentos")
    .select("id, tipo, categoria, descricao, valor, status, data_vencimento")
    .order("data_vencimento", { ascending: true, nullsFirst: false });

  const totalReceitaPaga = (lancamentos ?? [])
    .filter((l) => l.tipo === "receita" && l.status === "pago")
    .reduce((acc, l) => acc + Number(l.valor), 0);
  const totalPendente = (lancamentos ?? [])
    .filter((l) => l.tipo === "receita" && l.status !== "pago" && l.status !== "cancelado")
    .reduce((acc, l) => acc + Number(l.valor), 0);
  const totalDespesas = (lancamentos ?? [])
    .filter((l) => l.tipo === "despesa")
    .reduce((acc, l) => acc + Number(l.valor), 0);

  const statTone = (s: string) => (s === "pago" ? "accent" : s === "atrasado" ? "danger" : "neutral");

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className={pageTitle}>Financeiro</h2>
        <Link href="/dashboard/financeiro/novo" className={buttonPrimary}>
          Novo lançamento
        </Link>
      </div>

      <div className="mb-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className={`${card} p-4`}>
          <p className="text-[12px] text-ink-faint">Recebido</p>
          <p className="text-[22px] font-semibold text-accent">
            {totalReceitaPaga.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
          </p>
        </div>
        <div className={`${card} p-4`}>
          <p className="text-[12px] text-ink-faint">A receber</p>
          <p className="text-[22px] font-semibold text-ink">
            {totalPendente.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
          </p>
        </div>
        <div className={`${card} p-4`}>
          <p className="text-[12px] text-ink-faint">Despesas</p>
          <p className="text-[22px] font-semibold text-ink">
            {totalDespesas.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
          </p>
        </div>
      </div>

      <div className={`${card} overflow-hidden`}>
        {(lancamentos ?? []).length === 0 && (
          <p className="p-4 text-[13px] text-ink-soft">Nenhum lançamento registrado.</p>
        )}
        {(lancamentos ?? []).map((l) => (
          <div
            key={l.id}
            className="flex items-center justify-between border-b border-border-soft px-4 py-3 last:border-0"
          >
            <div>
              <p className="text-[13px] font-medium text-ink">
                {l.descricao ?? l.categoria}{" "}
                <span className="text-[12px] font-normal text-ink-faint">({l.tipo})</span>
              </p>
              <p className="text-[12px] text-ink-soft">
                {l.data_vencimento
                  ? new Date(l.data_vencimento).toLocaleDateString("pt-BR")
                  : "sem vencimento"}{" "}
                ·{" "}
                {Number(l.valor).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className={badge(statTone(l.status))}>{l.status}</span>
              {l.status !== "pago" && l.tipo === "receita" && <MarkPagoButton id={l.id} />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
