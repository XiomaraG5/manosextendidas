"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Calendar,
  ImagePlus,
  Loader2,
  Pencil,
  Plus,
  Save,
  Star,
  Trash2,
  X,
} from "lucide-react";
import {
  borrarFoto,
  deleteEvento,
  getEventos,
  saveEvento,
  subirFoto,
} from "@/lib/content";
import type { Evento, EventoInput } from "@/lib/types";
import { AreaTexto, Boton, Campo, Texto } from "./ui";
import { Cargando } from "./SitioForm";

const EVENTO_VACIO: EventoInput = {
  titulo: "",
  fecha: "",
  hora: "",
  descripcion: "",
  fotos: [],
  destacado: false,
  orden: 0,
};

export function EventosManager() {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [cargando, setCargando] = useState(true);
  const [editando, setEditando] = useState<Evento | "nuevo" | null>(null);

  async function recargar() {
    setEventos(await getEventos());
    setCargando(false);
  }

  useEffect(() => {
    recargar();
  }, []);

  if (cargando) return <Cargando />;

  if (editando) {
    return (
      <EventoEditor
        evento={editando === "nuevo" ? null : editando}
        onCerrar={() => setEditando(null)}
        onGuardado={async () => {
          setEditando(null);
          await recargar();
        }}
      />
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500">
          {eventos.length === 0
            ? "Aún no hay eventos."
            : `${eventos.length} evento${eventos.length === 1 ? "" : "s"} publicado${eventos.length === 1 ? "" : "s"}.`}
        </p>
        <Boton onClick={() => setEditando("nuevo")}>
          <Plus className="size-4" /> Agregar evento
        </Boton>
      </div>

      <div className="space-y-3">
        {eventos.map((ev) => (
          <div
            key={ev.id}
            className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-3 shadow-sm"
          >
            <div className="relative size-20 shrink-0 overflow-hidden rounded-xl bg-slate-100">
              {ev.fotos?.[0] ? (
                <Image src={ev.fotos[0]} alt="" fill sizes="80px" className="object-cover" />
              ) : (
                <div className="flex h-full items-center justify-center text-slate-300">
                  <ImagePlus className="size-6" />
                </div>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                {ev.destacado && <Star className="size-4 fill-accent text-accent" />}
                <h3 className="truncate font-semibold text-slate-800">{ev.titulo}</h3>
              </div>
              {ev.fecha && (
                <p className="mt-0.5 flex items-center gap-1 text-xs text-slate-400">
                  <Calendar className="size-3" /> {ev.fecha}
                </p>
              )}
              <p className="mt-0.5 truncate text-sm text-slate-500">{ev.descripcion}</p>
            </div>
            <div className="flex shrink-0 gap-1">
              <button
                onClick={() => setEditando(ev)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-brand"
                aria-label="Editar"
              >
                <Pencil className="size-4" />
              </button>
              <button
                onClick={async () => {
                  if (!confirm(`¿Eliminar el evento "${ev.titulo}"?`)) return;
                  await deleteEvento(ev.id);
                  await recargar();
                }}
                className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600"
                aria-label="Eliminar"
              >
                <Trash2 className="size-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function EventoEditor({
  evento,
  onCerrar,
  onGuardado,
}: {
  evento: Evento | null;
  onCerrar: () => void;
  onGuardado: () => void;
}) {
  const [data, setData] = useState<EventoInput>(
    evento ?? { ...EVENTO_VACIO, orden: Date.now() },
  );
  const [subiendo, setSubiendo] = useState(false);
  const [guardando, setGuardando] = useState(false);

  function set<K extends keyof EventoInput>(key: K, value: EventoInput[K]) {
    setData((d) => ({ ...d, [key]: value }));
  }

  async function agregarFotos(files: FileList | null) {
    if (!files?.length) return;
    setSubiendo(true);
    try {
      const urls: string[] = [];
      for (const file of Array.from(files)) {
        urls.push(await subirFoto(file));
      }
      set("fotos", [...data.fotos, ...urls]);
    } catch (e) {
      alert("No se pudo subir la imagen: " + (e as Error).message);
    } finally {
      setSubiendo(false);
    }
  }

  async function quitarFoto(url: string) {
    set("fotos", data.fotos.filter((f) => f !== url));
    await borrarFoto(url);
  }

  async function guardar() {
    if (!data.titulo.trim()) {
      alert("Ponle un título al evento.");
      return;
    }
    setGuardando(true);
    try {
      await saveEvento(data, evento?.id);
      onGuardado();
    } catch (e) {
      alert("No se pudo guardar: " + (e as Error).message);
      setGuardando(false);
    }
  }

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-brand-dark">
          {evento ? "Editar evento" : "Nuevo evento"}
        </h2>
        <button
          onClick={onCerrar}
          className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
          aria-label="Cerrar"
        >
          <X className="size-5" />
        </button>
      </div>

      <div className="mt-5 space-y-5">
        <Campo label="Título del evento">
          <Texto value={data.titulo} onChange={(e) => set("titulo", e.target.value)} placeholder="Jornada navideña 2025" />
        </Campo>
        <div className="grid grid-cols-2 gap-4">
          <Campo label="Fecha">
            <Texto type="date" value={data.fecha} onChange={(e) => set("fecha", e.target.value)} />
          </Campo>
          <Campo label="Hora" ayuda="Opcional.">
            <Texto type="time" value={data.hora} onChange={(e) => set("hora", e.target.value)} />
          </Campo>
        </div>
        <Campo label="Descripción">
          <AreaTexto value={data.descripcion} onChange={(e) => set("descripcion", e.target.value)} placeholder="Cuéntale a la comunidad de qué se trató…" />
        </Campo>

        <Campo label="Fotos del evento" ayuda="La primera (⭐ Portada) es la que se ve en la tarjeta. Usa la estrella para elegir otra.">
          <div className="flex flex-wrap gap-3">
            {data.fotos.map((url, i) => (
              <div
                key={url}
                className={`relative size-24 overflow-hidden rounded-xl border-2 ${
                  i === 0 ? "border-accent" : "border-slate-200"
                }`}
              >
                <Image src={url} alt="" fill sizes="96px" className="object-cover" />
                {i === 0 ? (
                  <span className="absolute bottom-1 left-1 flex items-center gap-1 rounded bg-accent px-1.5 py-0.5 text-[10px] font-bold text-brand-dark">
                    <Star className="size-3 fill-brand-dark" /> Portada
                  </span>
                ) : (
                  <button
                    onClick={() =>
                      set("fotos", [url, ...data.fotos.filter((f) => f !== url)])
                    }
                    className="absolute bottom-1 left-1 flex items-center gap-1 rounded bg-black/60 px-1.5 py-0.5 text-[10px] font-medium text-white hover:bg-black/80"
                  >
                    <Star className="size-3" /> Portada
                  </button>
                )}
                <button
                  onClick={() => quitarFoto(url)}
                  className="absolute right-1 top-1 rounded-full bg-black/60 p-1 text-white hover:bg-black/80"
                  aria-label="Quitar foto"
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
                  <ImagePlus className="size-5" />
                  <span className="text-xs">Subir</span>
                </>
              )}
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                disabled={subiendo}
                onChange={(e) => agregarFotos(e.target.files)}
              />
            </label>
          </div>
        </Campo>

        <label className="flex items-center gap-2.5 text-sm text-slate-700">
          <input
            type="checkbox"
            checked={data.destacado}
            onChange={(e) => set("destacado", e.target.checked)}
            className="size-4 rounded border-slate-300 text-brand focus:ring-brand"
          />
          Marcar como destacado
        </label>
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <Boton variante="secundario" onClick={onCerrar}>
          Cancelar
        </Boton>
        <Boton onClick={guardar} disabled={guardando || subiendo}>
          {guardando ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
          Guardar evento
        </Boton>
      </div>
    </div>
  );
}
