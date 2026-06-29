"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export function CopyButton({ value }: { value: string }) {
  const [copiado, setCopiado] = useState(false);

  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setCopiado(true);
          setTimeout(() => setCopiado(false), 1800);
        } catch {
          /* ignorar */
        }
      }}
      className="shrink-0 rounded-lg p-2 text-slate-400 hover:bg-white hover:text-brand transition-colors"
      aria-label="Copiar"
    >
      {copiado ? (
        <Check className="size-4 text-emerald-600" />
      ) : (
        <Copy className="size-4" />
      )}
    </button>
  );
}
