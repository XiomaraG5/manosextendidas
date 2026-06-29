"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import type { MediaItem } from "@/lib/types";

export function EstudioGaleria({ media }: { media: MediaItem[] }) {
  const [abierto, setAbierto] = useState<number | null>(null);

  const cerrar = useCallback(() => setAbierto(null), []);
  const mover = useCallback(
    (d: number) =>
      setAbierto((i) => (i === null ? i : (i + d + media.length) % media.length)),
    [media.length],
  );

  useEffect(() => {
    if (abierto === null) return;
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
  }, [abierto, cerrar, mover]);

  if (!media?.length) return null;

  const actual = abierto !== null ? media[abierto] : null;

  return (
    <>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {media.map((m, i) => (
          <button
            key={m.url}
            onClick={() => setAbierto(i)}
            className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-900"
            aria-label={m.tipo === "video" ? "Ver video" : "Ver foto"}
          >
            {m.tipo === "video" ? (
              <>
                <video
                  src={m.url}
                  muted
                  playsInline
                  preload="metadata"
                  className="h-full w-full object-cover"
                />
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="flex size-12 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-sm transition-transform group-hover:scale-110">
                    <Play className="size-6 translate-x-0.5" />
                  </span>
                </span>
              </>
            ) : (
              <Image
                src={m.url}
                alt="Estudio de grabación"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            )}
          </button>
        ))}
      </div>

      {actual && (
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

          {media.length > 1 && (
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
            </>
          )}

          <div
            className="max-h-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            {actual.tipo === "video" ? (
              <video
                src={actual.url}
                controls
                autoPlay
                playsInline
                className="max-h-[85vh] w-auto rounded-xl"
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={actual.url}
                alt="Estudio de grabación"
                className="max-h-[85vh] w-auto rounded-xl object-contain"
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}
