"use client";

import { useState } from "react";
import { buttonSecondary } from "@/lib/ui";

export function CopyLegendaButton({ legenda }: { legenda: string }) {
  const [copiado, setCopiado] = useState(false);

  return (
    <button
      type="button"
      className={buttonSecondary}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(legenda);
          setCopiado(true);
          setTimeout(() => setCopiado(false), 2000);
        } catch {
          // clipboard indisponível — ignora silenciosamente
        }
      }}
    >
      {copiado ? "Copiada!" : "Copiar legenda"}
    </button>
  );
}
