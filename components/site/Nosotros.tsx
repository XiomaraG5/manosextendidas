import { Compass, Target } from "lucide-react";
import type { Nosotros as NosotrosType } from "@/lib/types";

export function Nosotros({ nosotros }: { nosotros: NosotrosType }) {
  return (
    <section id="nosotros" className="bg-cream">
      <div className="mx-auto max-w-6xl px-4 pb-20 pt-12 sm:px-6">
        <div className="max-w-3xl">
          <p className="text-lg leading-relaxed text-slate-600">
            {nosotros.historia}
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl bg-white p-8 shadow-sm border border-slate-100">
            <Target className="size-9 text-accent" />
            <h3 className="mt-4 text-xl font-bold text-brand-dark">Misión</h3>
            <p className="mt-2 text-slate-600 leading-relaxed">{nosotros.mision}</p>
          </div>
          <div className="rounded-2xl bg-white p-8 shadow-sm border border-slate-100">
            <Compass className="size-9 text-accent" />
            <h3 className="mt-4 text-xl font-bold text-brand-dark">Visión</h3>
            <p className="mt-2 text-slate-600 leading-relaxed">{nosotros.vision}</p>
          </div>
        </div>

        {nosotros.valores?.length > 0 && (
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-brand-dark">Nuestros valores</h3>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {nosotros.valores.map((v, i) => (
                <div key={i} className="rounded-2xl border border-slate-100 bg-white p-6">
                  <div className="flex size-10 items-center justify-center rounded-full bg-brand-light text-lg font-bold text-brand">
                    {i + 1}
                  </div>
                  <h4 className="mt-4 font-bold text-brand-dark">{v.titulo}</h4>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    {v.descripcion}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
