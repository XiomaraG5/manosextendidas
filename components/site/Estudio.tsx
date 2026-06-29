import { ArrowRight, Mic, Music, Sparkles, Users, Video } from "lucide-react";
import { EstudioGaleria } from "./EstudioGaleria";
import type { Estudio as EstudioType, Sitio } from "@/lib/types";

const iconos = [Music, Mic, Video, Users, Sparkles];

export function Estudio({
  estudio,
  sitio,
}: {
  estudio: EstudioType;
  sitio: Sitio;
}) {
  const wpp = sitio.whatsapp.replace(/\D/g, "");
  const reservarHref = wpp
    ? `https://wa.me/${wpp}?text=${encodeURIComponent(
        "Hola, quiero reservar la Casa de Contenidos (estudio de grabación).",
      )}`
    : "/contacto";

  return (
    <section className="bg-cream">
      <div className="mx-auto max-w-6xl px-4 pb-20 pt-12 sm:px-6">
        <p className="max-w-3xl text-lg leading-relaxed text-slate-600">
          {estudio.descripcion}
        </p>

        {estudio.usos?.length > 0 && (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {estudio.usos.map((uso, i) => {
              const Icono = iconos[i % iconos.length];
              return (
                <div
                  key={i}
                  className="rounded-2xl border border-brand/10 bg-white p-6"
                >
                  <span className="flex size-11 items-center justify-center rounded-xl bg-brand-light text-brand">
                    <Icono className="size-5" />
                  </span>
                  <h3 className="mt-4 font-bold text-brand-dark">{uso.titulo}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-500">
                    {uso.descripcion}
                  </p>
                </div>
              );
            })}
          </div>
        )}

        <EstudioGaleria media={estudio.media} />

        <div className="mt-12 flex flex-col items-start gap-4 rounded-3xl bg-brand-dark p-8 text-white sm:flex-row sm:items-center sm:justify-between sm:p-10">
          <div>
            <h3 className="text-xl font-bold sm:text-2xl">¿Quieres grabar con nosotros?</h3>
            {estudio.nota && (
              <p className="mt-2 max-w-xl text-white/70">{estudio.nota}</p>
            )}
          </div>
          <a
            href={reservarHref}
            target={wpp ? "_blank" : undefined}
            rel={wpp ? "noopener noreferrer" : undefined}
            className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-white py-3 pl-3 pr-6 text-base font-bold text-brand-dark transition-colors hover:bg-accent-soft"
          >
            <span className="flex size-8 items-center justify-center rounded-full bg-accent text-brand-dark transition-transform group-hover:translate-x-0.5">
              <ArrowRight className="size-4" />
            </span>
            <span>Reservar el estudio</span>
          </a>
        </div>
      </div>
    </section>
  );
}
