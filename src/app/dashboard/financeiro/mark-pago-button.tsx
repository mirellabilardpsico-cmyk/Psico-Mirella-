"use client";

import { useTransition } from "react";
import { markAsPago } from "./actions";

export function MarkPagoButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      disabled={isPending}
      onClick={() => startTransition(() => markAsPago(id))}
      className="rounded-full border border-border bg-surface px-3 py-1.5 text-[12px] font-medium text-ink-soft transition-colors hover:bg-surface-sunken disabled:opacity-50"
    >
      Marcar como pago
    </button>
  );
}
