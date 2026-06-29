import { ImageIcon } from "lucide-react";
import { EventosGrid } from "./EventosGrid";
import type { Evento } from "@/lib/types";

export function Eventos({ eventos }: { eventos: Evento[] }) {
  return (
    <section id="eventos">
      <div className="mx-auto max-w-6xl px-4 pb-20 pt-12 sm:px-6">
        {eventos.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-12 text-center text-slate-500">
            <ImageIcon className="mx-auto size-10 text-slate-300" />
            <p className="mt-3">Pronto publicaremos nuestras próximas jornadas.</p>
          </div>
        ) : (
          <EventosGrid eventos={eventos} />
        )}
      </div>
    </section>
  );
}
