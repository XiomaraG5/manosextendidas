import { Calendar, Download, FileText } from "lucide-react";
import type { Informe } from "@/lib/types";

function formatearFecha(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso + "T00:00:00");
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("es-CO", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function Informes({ informes }: { informes: Informe[] }) {
  return (
    <section className="bg-cream">
      <div className="mx-auto max-w-6xl px-4 pb-20 pt-12 sm:px-6">
        {informes.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-12 text-center text-slate-500">
            <FileText className="mx-auto size-10 text-slate-300" />
            <p className="mt-3">Pronto publicaremos nuestros informes.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {informes.map((informe) => (
              <article
                key={informe.id}
                className="flex flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex items-start gap-3">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-light text-brand">
                    <FileText className="size-6" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-bold leading-snug text-brand-dark">
                      {informe.titulo}
                    </h3>
                    {informe.fecha && (
                      <span className="mt-1 flex items-center gap-1.5 text-xs font-medium text-accent-dark">
                        <Calendar className="size-3.5" />
                        {formatearFecha(informe.fecha)}
                      </span>
                    )}
                  </div>
                </div>

                {informe.descripcion && (
                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-600">
                    {informe.descripcion}
                  </p>
                )}

                {informe.pdfUrl && (
                  <a
                    href={informe.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group mt-5 inline-flex items-center gap-2 self-start rounded-full py-2 pl-2 pr-4 text-sm font-bold text-white transition-colors"
                    style={{ backgroundColor: "#0e6ba8" }}
                  >
                    <span className="flex size-6 items-center justify-center rounded-full bg-white/20">
                      <Download className="size-3.5" />
                    </span>
                    Ver informe
                  </a>
                )}
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
