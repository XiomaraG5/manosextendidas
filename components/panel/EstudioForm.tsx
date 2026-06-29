"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Loader2, Plus, Trash2, Upload, X } from "lucide-react";
import { getEstudio, saveEstudio, subirMedia } from "@/lib/content";
import { ESTUDIO_DEFAULT } from "@/lib/defaults";
import type { Estudio } from "@/lib/types";
import { AreaTexto, Boton, Campo, Tarjeta, Texto } from "./ui";
import { BarraGuardar, Cargando } from "./SitioForm";

export function EstudioForm() {
  const [data, setData] = useState<Estudio>(ESTUDIO_DEFAULT);
  const [cargando, setCargando] = useState(true);
  const [subiendo, setSubiendo] = useState(false);
  const [estado, setEstado] = useState<"idle" | "guardando" | "ok">("idle");

  useEffect(() => {
    getEstudio().then((d) => {
      setData(d);
      setCargando(false);
    });
  }, []);

  function set<K extends keyof Estudio>(key: K, value: Estudio[K]) {
    setData((d) => ({ ...d, [key]: value }));
    setEstado("idle");
  }

  async function agregarMedia(files: FileList | null) {
    if (!files?.length) return;
    setSubiendo(true);
    try {
      const nuevos = [];
      for (const file of Array.from(files)) nuevos.push(await subirMedia(file));
      set("media", [...data.media, ...nuevos]);
    } catch (e) {
      alert("No se pudo subir el archivo: " + (e as Error).message);
    } finally {
      setSubiendo(false);
    }
  }

  async function guardar() {
    setEstado("guardando");
    try {
      await saveEstudio(data);
      setEstado("ok");
      setTimeout(() => setEstado("idle"), 2500);
    } catch (e) {
      alert("No se pudo guardar: " + (e as Error).message);
      setEstado("idle");
    }
  }

  if (cargando) return <Cargando />;

  return (
    <div className="space-y-6">
      <Tarjeta titulo="El estudio" descripcion="La Casa de Contenidos que la gente puede alquilar.">
        <Campo label="Título">
          <Texto value={data.titulo} onChange={(e) => set("titulo", e.target.value)} />
        </Campo>
        <Campo label="Descripción">
          <AreaTexto value={data.descripcion} onChange={(e) => set("descripcion", e.target.value)} />
        </Campo>
        <Campo label="Nota (tarifas / disponibilidad)" ayuda="Aparece junto al botón de reservar.">
          <AreaTexto value={data.nota} onChange={(e) => set("nota", e.target.value)} />
        </Campo>
      </Tarjeta>

      <Tarjeta titulo="¿Para qué sirve?" descripcion="Los usos que se muestran como tarjetas (música, podcast, etc.).">
        <div className="space-y-4">
          {data.usos.map((u, i) => (
            <div key={i} className="rounded-xl border border-slate-100 bg-slate-50 p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-500">Uso {i + 1}</span>
                <button
                  onClick={() => set("usos", data.usos.filter((_, j) => j !== i))}
                  className="rounded-lg p-1.5 text-red-500 hover:bg-red-100"
                  aria-label="Quitar"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
              <div className="mt-3 space-y-3">
                <Texto
                  placeholder="Título (ej. Música)"
                  value={u.titulo}
                  onChange={(e) => {
                    const usos = [...data.usos];
                    usos[i] = { ...usos[i], titulo: e.target.value };
                    set("usos", usos);
                  }}
                />
                <AreaTexto
                  placeholder="Descripción"
                  value={u.descripcion}
                  onChange={(e) => {
                    const usos = [...data.usos];
                    usos[i] = { ...usos[i], descripcion: e.target.value };
                    set("usos", usos);
                  }}
                />
              </div>
            </div>
          ))}
          <Boton
            variante="secundario"
            onClick={() => set("usos", [...data.usos, { titulo: "", descripcion: "" }])}
          >
            <Plus className="size-4" /> Agregar uso
          </Boton>
        </div>
      </Tarjeta>

      <Tarjeta titulo="Fotos y videos del estudio" descripcion="Imágenes y videos del espacio (opcional).">
        <div className="flex flex-wrap gap-3">
          {data.media.map((m) => (
            <div key={m.url} className="relative size-24 overflow-hidden rounded-xl border border-slate-200 bg-slate-900">
              {m.tipo === "video" ? (
                <video src={m.url} className="h-full w-full object-cover" muted playsInline preload="metadata" />
              ) : (
                <Image src={m.url} alt="" fill sizes="96px" className="object-cover" />
              )}
              {m.tipo === "video" && (
                <span className="absolute bottom-1 left-1 rounded bg-black/60 px-1 text-[10px] font-medium text-white">
                  video
                </span>
              )}
              <button
                onClick={() => set("media", data.media.filter((x) => x.url !== m.url))}
                className="absolute right-1 top-1 rounded-full bg-black/60 p-1 text-white hover:bg-black/80"
                aria-label="Quitar"
              >
                <X className="size-3.5" />
              </button>
            </div>
          ))}
          <label className="flex size-24 cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-slate-200 text-slate-400 hover:border-brand hover:text-brand">
            {subiendo ? (
              <Loader2 className="size-5 animate-spin" />
            ) : (
              <>
                <Upload className="size-5" />
                <span className="text-center text-[11px] leading-tight">Foto o video</span>
              </>
            )}
            <input
              type="file"
              accept="image/*,video/*"
              multiple
              className="hidden"
              disabled={subiendo}
              onChange={(e) => agregarMedia(e.target.files)}
            />
          </label>
        </div>
      </Tarjeta>

      <BarraGuardar estado={estado} onGuardar={guardar} />
    </div>
  );
}
