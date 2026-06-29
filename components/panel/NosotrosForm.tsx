"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { getNosotros, saveNosotros } from "@/lib/content";
import { NOSOTROS_DEFAULT } from "@/lib/defaults";
import type { Nosotros } from "@/lib/types";
import { AreaTexto, Boton, Campo, Tarjeta, Texto } from "./ui";
import { BarraGuardar, Cargando } from "./SitioForm";

export function NosotrosForm() {
  const [data, setData] = useState<Nosotros>(NOSOTROS_DEFAULT);
  const [cargando, setCargando] = useState(true);
  const [estado, setEstado] = useState<"idle" | "guardando" | "ok">("idle");

  useEffect(() => {
    getNosotros().then((d) => {
      setData(d);
      setCargando(false);
    });
  }, []);

  function set<K extends keyof Nosotros>(key: K, value: Nosotros[K]) {
    setData((d) => ({ ...d, [key]: value }));
    setEstado("idle");
  }

  async function guardar() {
    setEstado("guardando");
    try {
      await saveNosotros(data);
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
      <Tarjeta titulo="Historia" descripcion="El párrafo que presenta a la fundación.">
        <Campo label="Reseña / historia">
          <AreaTexto value={data.historia} onChange={(e) => set("historia", e.target.value)} />
        </Campo>
      </Tarjeta>

      <Tarjeta titulo="Misión y visión">
        <Campo label="Misión">
          <AreaTexto value={data.mision} onChange={(e) => set("mision", e.target.value)} />
        </Campo>
        <Campo label="Visión">
          <AreaTexto value={data.vision} onChange={(e) => set("vision", e.target.value)} />
        </Campo>
      </Tarjeta>

      <Tarjeta titulo="Valores" descripcion="Los principios que guían a la fundación.">
        <div className="space-y-4">
          {data.valores.map((v, i) => (
            <div key={i} className="rounded-xl border border-slate-100 bg-slate-50 p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-500">
                  Valor {i + 1}
                </span>
                <button
                  onClick={() => set("valores", data.valores.filter((_, j) => j !== i))}
                  className="rounded-lg p-1.5 text-red-500 hover:bg-red-100"
                  aria-label="Quitar valor"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
              <div className="mt-3 space-y-3">
                <Texto
                  placeholder="Título (ej. Fe)"
                  value={v.titulo}
                  onChange={(e) => {
                    const valores = [...data.valores];
                    valores[i] = { ...valores[i], titulo: e.target.value };
                    set("valores", valores);
                  }}
                />
                <AreaTexto
                  placeholder="Descripción del valor"
                  value={v.descripcion}
                  onChange={(e) => {
                    const valores = [...data.valores];
                    valores[i] = { ...valores[i], descripcion: e.target.value };
                    set("valores", valores);
                  }}
                />
              </div>
            </div>
          ))}
          <Boton
            variante="secundario"
            onClick={() =>
              set("valores", [...data.valores, { titulo: "", descripcion: "" }])
            }
          >
            <Plus className="size-4" /> Agregar valor
          </Boton>
        </div>
      </Tarjeta>

      <BarraGuardar estado={estado} onGuardar={guardar} />
    </div>
  );
}
