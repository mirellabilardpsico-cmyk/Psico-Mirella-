"use client";

import { useTransition } from "react";
import { updateAgendamentoStatus } from "./actions";

const STATUS_OPTIONS = ["agendado", "confirmado", "realizado", "cancelado", "falta"];

export function StatusSelect({ id, status }: { id: string; status: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <select
      defaultValue={status}
      disabled={isPending}
      onChange={(e) => startTransition(() => updateAgendamentoStatus(id, e.target.value))}
      className="rounded-full border border-border bg-surface px-3 py-1.5 text-[12px] text-ink-soft outline-none focus:border-accent disabled:opacity-50"
    >
      {STATUS_OPTIONS.map((s) => (
        <option key={s} value={s}>
          {s}
        </option>
      ))}
    </select>
  );
}
