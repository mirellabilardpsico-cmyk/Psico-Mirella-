"use client";

import { useTransition } from "react";
import { deletePaciente } from "../actions";
import { TrashIcon } from "@/components/icons";
import { buttonSecondary } from "@/lib/ui";

export function DeletePacienteButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    if (
      !window.confirm(
        "Excluir este paciente? Sessões, evoluções e documentos ligados a ele também serão apagados. Essa ação não pode ser desfeita.",
      )
    ) {
      return;
    }
    startTransition(() => deletePaciente(id));
  }

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={handleClick}
      className={`${buttonSecondary} text-danger`}
    >
      <TrashIcon className="h-3.5 w-3.5" />
      {isPending ? "Excluindo..." : "Excluir"}
    </button>
  );
}
