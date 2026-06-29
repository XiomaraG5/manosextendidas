"use client";

import { useEffect, useState } from "react";
import {
  Calendar,
  ExternalLink,
  FileText,
  Loader2,
  Pencil,
  Plus,
  Save,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import {
  deleteInforme,
  getInformes,
  getInformesInfo,
  saveInforme,
  saveInformesInfo,
  subirPdf,
} from "@/lib/content";
import { INFORMES_INFO_DEFAULT } from "@/lib/defaults";
import type { Informe, InformeInput, InformesInfo } from "@/lib/types";
import { AreaTexto, Boton, Campo, Tarjeta, Texto } from "./ui";
import { BarraGuardar, Cargando } from "./SitioForm";

const INFORME_VACIO: InformeInput = {
  titulo: "",
  fecha: "",
  descripcion: "",
  pdfUrl: "",
  orden: 0,
};

export function InformesManager() {
  // Texto del hero (editable).
  const [info, setInfo] = useState<InformesInfo>(INFORMES_INFO_DEFAULT);
  const [cargandoInfo, setCargandoInfo] = useState(true);
  const [estadoInfo, setEstadoInfo] = useState<"idle" | "guardando" | "ok">("idle");
  // Lista de informes.
  const [informes, setInformes] = useState<Informe[]>([]);
  const [cargandoLista, setCargandoLista] = useState(true);
  const [editando, setEditando] = useState<Informe | "nuevo" | null>(null);

  useEffect(() => {
    getInformesInfo().then((d) => {
      setInfo(d);
      setCargandoInfo(false);
    });
  }, []);

  async function recargar() {
    setInformes(await getInformes());
    setCargandoLista(false);
  }
  useEffect(() => {
    recargar();
  }, []);

  async function guardarInfo() {
    setEstadoInfo("guardando");
    try {
      await saveInformesInfo(info);
      setEstadoInfo("ok");
      setTimeout(() => setEstadoInfo("idle"), 2500);
    } catch (e) {
      alert("No se pudo guardar: " + (e as Error).message);
      setEstadoInfo("idle");
    }
  }

  if (cargandoInfo || cargandoLista) return <Cargando />;

  if (editando) {
    return (
      <InformeEditor
        informe={editando === "nuevo" ? null : editando}
        onCerrar={() => setEditando(null)}
        onGuardado={async () => {
          setEditando(null);
          await recargar();
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      <Tarjeta titulo="Texto de la página" descripcion="El título y la bajada que se ven arriba en Informes.">
        <Campo label="Título">
          <Texto
            value={info.titulo}
            onChange={(e) => {
              setInfo({ ...info, titulo: e.target.value });
              setEstadoInfo("idle");
            }}
          />
        </Campo>
        <Campo label="Bajada">
          <AreaTexto
            value={info.descripcion}
            onChange={(e) => {
              setInfo({ ...info, descripcion: e.target.value });
              setEstadoInfo("idle");
            }}
          />
        </Campo>
        <BarraGuardar estado={estadoInfo} onGuardar={guardarInfo} />
      </Tarjeta>

      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500">
          {informes.length === 0
            ? "Aún no hay informes."
            : `${informes.length} informe${informes.length === 1 ? "" : "s"} publicado${informes.length === 1 ? "" : "s"}.`}
        </p>
        <Boton onClick={() => setEditando("nuevo")}>
          <Plus className="size-4" /> Agregar informe
        </Boton>
      </div>

      <div className="space-y-3">
        {informes.map((inf) => (
          <div
            key={inf.id}
            className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm"
          >
            <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-light text-brand">
              <FileText className="size-6" />
            </span>
            <div className="min-w-0 flex-1">
              <h3 className="truncate font-semibold text-slate-800">{inf.titulo}</h3>
              {inf.fecha && (
                <p className="mt-0.5 flex items-center gap-1 text-xs text-slate-400">
                  <Calendar className="size-3" /> {inf.fecha}
                </p>
              )}
            </div>
            <div className="flex shrink-0 gap-1">
              <button
                onClick={() => setEditando(inf)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-brand"
                aria-label="Editar"
              >
                <Pencil className="size-4" />
              </button>
              <button
                onClick={async () => {
                  if (!confirm(`¿Eliminar el informe "${inf.titulo}"?`)) return;
                  await deleteInforme(inf.id);
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

function InformeEditor({
  informe,
  onCerrar,
  onGuardado,
}: {
  informe: Informe | null;
  onCerrar: () => void;
  onGuardado: () => void;
}) {
  const [data, setData] = useState<InformeInput>(
    informe ?? { ...INFORME_VACIO, orden: Date.now() },
  );
  const [subiendo, setSubiendo] = useState(false);
  const [guardando, setGuardando] = useState(false);

  function set<K extends keyof InformeInput>(key: K, value: InformeInput[K]) {
    setData((d) => ({ ...d, [key]: value }));
  }

  async function subirElPdf(file: File | undefined) {
    if (!file) return;
    setSubiendo(true);
    try {
      set("pdfUrl", await subirPdf(file));
    } catch (e) {
      alert("No se pudo subir el PDF: " + (e as Error).message);
    } finally {
      setSubiendo(false);
    }
  }

  async function guardar() {
    if (!data.titulo.trim()) {
      alert("Ponle un título al informe.");
      return;
    }
    if (!data.pdfUrl) {
      alert("Sube el archivo PDF del informe.");
      return;
    }
    setGuardando(true);
    try {
      await saveInforme(data, informe?.id);
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
          {informe ? "Editar informe" : "Nuevo informe"}
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
        <Campo label="Título del informe">
          <Texto value={data.titulo} onChange={(e) => set("titulo", e.target.value)} placeholder="Informe de gestión 2025" />
        </Campo>
        <Campo label="Fecha">
          <Texto type="date" value={data.fecha} onChange={(e) => set("fecha", e.target.value)} />
        </Campo>
        <Campo label="Descripción" ayuda="Opcional.">
          <AreaTexto value={data.descripcion} onChange={(e) => set("descripcion", e.target.value)} placeholder="Un resumen breve del informe (opcional)…" />
        </Campo>

        <Campo label="Archivo PDF">
          <div className="flex flex-wrap items-center gap-3">
            {data.pdfUrl && (
              <a
                href={data.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-brand hover:bg-slate-100"
              >
                <FileText className="size-4" /> Ver PDF actual
                <ExternalLink className="size-3.5 text-slate-400" />
              </a>
            )}
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border-2 border-dashed border-slate-200 px-4 py-2 text-sm font-medium text-slate-500 hover:border-brand hover:text-brand">
              {subiendo ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Upload className="size-4" />
              )}
              {data.pdfUrl ? "Reemplazar PDF" : "Subir PDF"}
              <input
                type="file"
                accept="application/pdf"
                className="hidden"
                disabled={subiendo}
                onChange={(e) => subirElPdf(e.target.files?.[0])}
              />
            </label>
          </div>
        </Campo>
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <Boton variante="secundario" onClick={onCerrar}>
          Cancelar
        </Boton>
        <Boton onClick={guardar} disabled={guardando || subiendo}>
          {guardando ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
          Guardar informe
        </Boton>
      </div>
    </div>
  );
}
