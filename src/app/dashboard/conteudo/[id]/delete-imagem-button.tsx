"use client";

import { useTransition } from "react";
import { deleteImagem } from "../actions";

export function DeleteImagemButton({
  imagemId,
  postId,
  storagePath,
}: {
  imagemId: string;
  postId: string;
  storagePath: string;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={() => startTransition(() => deleteImagem(imagemId, postId, storagePath))}
      className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-plum/70 text-[12px] text-white opacity-0 transition-opacity group-hover:opacity-100 disabled:opacity-50"
      title="Remover imagem"
    >
      ×
    </button>
  );
}
