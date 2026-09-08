"use client";

import { useTransition } from "react";
import { deleteLancamento } from "./actions";
import { TrashIcon } from "@/components/icons";

export function DeleteLancamentoButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    if (!window.confirm("Excluir este lançamento?")) return;
    startTransition(() => deleteLancamento(id));
  }

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={handleClick}
      title="Excluir lançamento"
      className="flex h-7 w-7 items-center justify-center rounded-full text-ink-faint transition-colors hover:bg-danger-soft hover:text-danger disabled:opacity-50"
    >
      <TrashIcon className="h-4 w-4" />
    </button>
  );
}
