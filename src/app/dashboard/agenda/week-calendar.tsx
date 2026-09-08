"use client";

import { useMemo, useState } from "react";
import { tagColor } from "@/lib/tags";

type Agendamento = {
  id: string;
  paciente_id: string;
  data_hora_inicio: string;
  data_hora_fim: string | null;
  tipo: string;
  status: string;
  valor: number | null;
  nome: string;
};

const DIA_LABEL = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const HORA_INICIO = 7;
const HORA_FIM = 20;
const PX_POR_HORA = 52;

const STATUS_COR: Record<string, string> = {
  agendado: "#9C8AA0",
  confirmado: "#BD7C4F",
  realizado: "#5E7A6B",
  cancelado: "#9C4A3C",
  falta: "#9C4A3C",
};

function startOfWeek(d: Date) {
  const date = new Date(d);
  date.setDate(date.getDate() - date.getDay());
  date.setHours(0, 0, 0, 0);
  return date;
}

function addDays(d: Date, n: number) {
  const date = new Date(d);
  date.setDate(date.getDate() + n);
  return date;
}

function sameDay(a: Date, b: Date) {
  return a.toDateString() === b.toDateString();
}

export function WeekCalendar({ agendamentos }: { agendamentos: Agendamento[] }) {
  const [anchor, setAnchor] = useState(() => startOfWeek(new Date()));
  const hoje = new Date();

  const dias = useMemo(() => Array.from({ length: 7 }, (_, i) => addDays(anchor, i)), [anchor]);

  const porDia = useMemo(
    () => dias.map((dia) => agendamentos.filter((a) => sameDay(new Date(a.data_hora_inicio), dia))),
    [dias, agendamentos],
  );

  const totalMinutos = (HORA_FIM - HORA_INICIO) * 60;
  const alturaGrade = (HORA_FIM - HORA_INICIO) * PX_POR_HORA;

  const rangeLabel = useMemo(() => {
    const inicio = dias[0];
    const fim = dias[6];
    const mesInicio = inicio.toLocaleDateString("pt-BR", { month: "short" }).replace(".", "");
    const mesFimLongo = fim.toLocaleDateString("pt-BR", { month: "long" });
    if (inicio.getMonth() === fim.getMonth()) {
      return `${inicio.getDate()}–${fim.getDate()} de ${mesFimLongo}`;
    }
    return `${inicio.getDate()} ${mesInicio} – ${fim.getDate()} ${mesFimLongo}`;
  }, [dias]);

  return (
    <div className="mb-8">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setAnchor((a) => addDays(a, -7))}
            aria-label="Semana anterior"
            className="flex h-8 w-8 items-center justify-center rounded-full text-[15px] text-ink-soft transition-colors hover:bg-surface-sunken"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={() => setAnchor(startOfWeek(new Date()))}
            className="rounded-full border border-border bg-surface px-3 py-1 text-[12px] font-medium text-ink-soft transition-colors hover:bg-surface-sunken"
          >
            Hoje
          </button>
          <button
            type="button"
            onClick={() => setAnchor((a) => addDays(a, 7))}
            aria-label="Próxima semana"
            className="flex h-8 w-8 items-center justify-center rounded-full text-[15px] text-ink-soft transition-colors hover:bg-surface-sunken"
          >
            ›
          </button>
        </div>
        <p className="text-[13px] font-medium capitalize text-ink-soft">{rangeLabel}</p>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-border bg-surface shadow-[var(--shadow-card)]">
        <div className="grid min-w-[640px] grid-cols-[44px_repeat(7,1fr)]">
          <div />
          {dias.map((dia, i) => {
            const isHoje = sameDay(dia, hoje);
            return (
              <div
                key={i}
                className={`border-l border-border-soft py-2 text-center ${isHoje ? "bg-accent-soft/40" : ""}`}
              >
                <p className="text-[10px] uppercase tracking-wide text-ink-faint">{DIA_LABEL[dia.getDay()]}</p>
                <p className={`text-[14px] font-semibold ${isHoje ? "text-accent" : "text-ink"}`}>
                  {dia.getDate()}
                </p>
              </div>
            );
          })}

          <div className="relative border-t border-border-soft" style={{ height: alturaGrade }}>
            {Array.from({ length: HORA_FIM - HORA_INICIO }, (_, i) => (
              <span
                key={i}
                className="absolute right-1.5 -translate-y-1/2 text-[10px] text-ink-faint"
                style={{ top: i * PX_POR_HORA }}
              >
                {HORA_INICIO + i}h
              </span>
            ))}
          </div>

          {porDia.map((itens, colIndex) => (
            <div key={colIndex} className="relative border-l border-t border-border-soft" style={{ height: alturaGrade }}>
              {Array.from({ length: HORA_FIM - HORA_INICIO }, (_, i) => (
                <div
                  key={i}
                  className="absolute left-0 right-0 border-t border-border-soft/60"
                  style={{ top: i * PX_POR_HORA }}
                />
              ))}

              {itens.map((a) => {
                const inicio = new Date(a.data_hora_inicio);
                const fim = a.data_hora_fim
                  ? new Date(a.data_hora_fim)
                  : new Date(inicio.getTime() + 50 * 60000);
                const minutosInicio = (inicio.getHours() - HORA_INICIO) * 60 + inicio.getMinutes();
                if (minutosInicio < 0 || minutosInicio > totalMinutos) return null;

                const minutosDuracao = Math.max((fim.getTime() - inicio.getTime()) / 60000, 20);
                const top = (minutosInicio / totalMinutos) * alturaGrade;
                const height = Math.max((minutosDuracao / totalMinutos) * alturaGrade, 18);
                const tone = tagColor(a.paciente_id);
                const corStatus = STATUS_COR[a.status] ?? STATUS_COR.agendado;
                const hora = inicio.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });

                return (
                  <div
                    key={a.id}
                    title={`${hora} — ${a.nome} (${a.status})`}
                    className="absolute left-0.5 right-0.5 overflow-hidden rounded-md px-1.5 py-0.5 text-[10.5px] leading-tight"
                    style={{
                      top,
                      height,
                      background: tone.soft,
                      color: tone.ink,
                      borderLeft: `2.5px solid ${corStatus}`,
                    }}
                  >
                    <span className="font-semibold">{hora}</span> {a.nome}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
