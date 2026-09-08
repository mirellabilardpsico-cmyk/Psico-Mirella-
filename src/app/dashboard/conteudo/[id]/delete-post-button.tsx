"use client";

import { useTransition } from "react";
import { deletePost } from "../actions";
import { TrashIcon } from "@/components/icons";
import { buttonSecondary } from "@/lib/ui";

export function DeletePostButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    if (!window.confirm("Excluir este post e todas as imagens dele? Essa ação não pode ser desfeita.")) {
      return;
    }
    startTransition(() => deletePost(id));
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
