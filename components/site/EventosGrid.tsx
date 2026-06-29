"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  ImageIcon,
  X,
} from "lucide-react";
import type { Evento } from "@/lib/types";

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

function formatearHora(hora: string): string {
  if (!hora) return "";
  const d = new Date(`2000-01-01T${hora}`);
  if (isNaN(d.getTime())) return hora;
  return d.toLocaleTimeString("es-CO", { hour: "numeric", minute: "2-digit" });
}

function fechaYHora(fecha: string, hora: string): string {
  return [formatearFecha(fecha), formatearHora(hora)].filter(Boolean).join(" · ");
}

export function EventosGrid({ eventos }: { eventos: Evento[] }) {
  // Lightbox: fotos del evento abierto + índice actual.
  const [fotos, setFotos] = useState<string[] | null>(null);
  const [idx, setIdx] = useState(0);

  const cerrar = useCallback(() => setFotos(null), []);
  const mover = useCallback(
    (d: number) =>
      setIdx((i) => (fotos ? (i + d + fotos.length) % fotos.length : i)),
    [fotos],
  );

  useEffect(() => {
    if (!fotos) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") cerrar();
      if (e.key === "ArrowRight") mover(1);
      if (e.key === "ArrowLeft") mover(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [fotos, cerrar, mover]);

  function abrir(evento: Evento) {
    if (!evento.fotos?.length) return;
    setIdx(0);
    setFotos(evento.fotos);
  }

  return (
    <>
      <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {eventos.map((evento) => (
          <article
            key={evento.id}
            className="group flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-shadow hover:shadow-md"
          >
            <button
              onClick={() => abrir(evento)}
              disabled={!evento.fotos?.length}
              className="relative aspect-[4/3] bg-slate-100 text-left disabled:cursor-default"
              aria-label={evento.fotos?.length ? "Ver fotos" : evento.titulo}
            >
              {evento.fotos?.[0] ? (
                <Image
                  src={evento.fotos[0]}
                  alt={evento.titulo}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-slate-300">
                  <ImageIcon className="size-10" />
                </div>
              )}
              {evento.fotos?.length > 1 && (
                <span className="absolute bottom-2 right-2 rounded-full bg-black/60 px-2.5 py-1 text-xs font-medium text-white">
                  +{evento.fotos.length - 1} fotos
                </span>
              )}
            </button>
            <div className="flex flex-1 flex-col p-5">
              {(evento.fecha || evento.hora) && (
                <span className="flex items-center gap-1.5 text-xs font-medium text-accent-dark">
                  <Calendar className="size-3.5" />
                  {fechaYHora(evento.fecha, evento.hora)}
                </span>
              )}
              <h3 className="mt-1.5 text-lg font-bold text-brand-dark">
                {evento.titulo}
              </h3>
              <p className="mt-2 line-clamp-4 text-sm leading-relaxed text-slate-600">
                {evento.descripcion}
              </p>
            </div>
          </article>
        ))}
      </div>

      {fotos && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 sm:p-8"
          onClick={cerrar}
        >
          <button
            onClick={cerrar}
            className="absolute right-4 top-4 flex size-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            aria-label="Cerrar"
          >
            <X className="size-6" />
          </button>

          {fotos.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  mover(-1);
                }}
                className="absolute left-3 flex size-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:left-6"
                aria-label="Anterior"
              >
                <ChevronLeft className="size-6" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  mover(1);
                }}
                className="absolute right-3 flex size-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:right-6"
                aria-label="Siguiente"
              >
                <ChevronRight className="size-6" />
              </button>
              <span className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-3 py-1 text-sm text-white">
                {idx + 1} / {fotos.length}
              </span>
            </>
          )}

          <div className="max-h-full" onClick={(e) => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={fotos[idx]}
              alt="Foto del evento"
              className="max-h-[85vh] w-auto rounded-xl object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}
