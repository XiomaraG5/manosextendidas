"use client";

import { useEffect, useState } from "react";
import { Check, Loader2, Plus, Save, Trash2 } from "lucide-react";
import { getSitio, saveSitio } from "@/lib/content";
import { SITIO_DEFAULT } from "@/lib/defaults";
import type { Sitio } from "@/lib/types";
import { AreaTexto, Boton, Campo, Tarjeta, Texto } from "./ui";

export function SitioForm() {
  const [data, setData] = useState<Sitio>(SITIO_DEFAULT);
  const [cargando, setCargando] = useState(true);
  const [estado, setEstado] = useState<"idle" | "guardando" | "ok">("idle");

  useEffect(() => {
    getSitio().then((d) => {
      setData(d);
      setCargando(false);
    });
  }, []);

  function set<K extends keyof Sitio>(key: K, value: Sitio[K]) {
    setData((d) => ({ ...d, [key]: value }));
    setEstado("idle");
  }

  async function guardar() {
    setEstado("guardando");
    try {
      await saveSitio(data);
      setEstado("ok");
      setTimeout(() => setEstado("idle"), 2500);
    } catch (e) {
      alert("No se pudo guardar: " + (e as Error).message);
      setEstado("idle");
    }
  }

  if (cargando) {
    return <Cargando />;
  }

  return (
    <div className="space-y-6">
      <Tarjeta titulo="Identidad" descripcion="El nombre y la frase que aparecen en todo el sitio.">
        <Campo label="Nombre de la fundación">
          <Texto value={data.nombre} onChange={(e) => set("nombre", e.target.value)} />
        </Campo>
        <Campo label="Frase corta (lema)" ayuda="Aparece bajo el nombre y en el menú.">
          <Texto value={data.lema} onChange={(e) => set("lema", e.target.value)} />
        </Campo>
      </Tarjeta>

      <Tarjeta titulo="Portada (Inicio)" descripcion="El mensaje principal que ve la gente al entrar.">
        <Campo label="Título grande">
          <Texto value={data.heroTitulo} onChange={(e) => set("heroTitulo", e.target.value)} />
        </Campo>
        <Campo label="Texto de presentación">
          <AreaTexto value={data.heroTexto} onChange={(e) => set("heroTexto", e.target.value)} />
        </Campo>
        <Campo label="Cifras de impacto" ayuda="Los números destacados (ej. +50.000 personas).">
          <div className="space-y-2">
            {data.cifras.map((c, i) => (
              <div key={i} className="flex gap-2">
                <Texto
                  placeholder="+50.000"
                  value={c.numero}
                  onChange={(e) => {
                    const cifras = [...data.cifras];
                    cifras[i] = { ...cifras[i], numero: e.target.value };
                    set("cifras", cifras);
                  }}
                  className="!w-32"
                />
                <Texto
                  placeholder="personas impactadas"
                  value={c.etiqueta}
                  onChange={(e) => {
                    const cifras = [...data.cifras];
                    cifras[i] = { ...cifras[i], etiqueta: e.target.value };
                    set("cifras", cifras);
                  }}
                />
                <button
                  onClick={() => set("cifras", data.cifras.filter((_, j) => j !== i))}
                  className="shrink-0 rounded-xl px-3 text-red-500 hover:bg-red-50"
                  aria-label="Quitar"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            ))}
            {data.cifras.length < 4 && (
              <Boton
                variante="secundario"
                onClick={() => set("cifras", [...data.cifras, { numero: "", etiqueta: "" }])}
              >
                <Plus className="size-4" /> Agregar cifra
              </Boton>
            )}
          </div>
        </Campo>
      </Tarjeta>

      <Tarjeta titulo="Donaciones" descripcion="Los datos para que la gente pueda donar.">
        <Campo label="Título de la sección">
          <Texto value={data.donarTitulo} onChange={(e) => set("donarTitulo", e.target.value)} />
        </Campo>
        <Campo label="Texto invitando a donar">
          <AreaTexto value={data.donarTexto} onChange={(e) => set("donarTexto", e.target.value)} />
        </Campo>
        <div className="grid gap-5 sm:grid-cols-2">
          <Campo label="Banco y tipo de cuenta" ayuda="Ej. Bancolombia Ahorros">
            <Texto value={data.donarBanco} onChange={(e) => set("donarBanco", e.target.value)} />
          </Campo>
          <Campo label="Número de cuenta">
            <Texto value={data.donarCuenta} onChange={(e) => set("donarCuenta", e.target.value)} />
          </Campo>
          <Campo label="Número Nequi / Daviplata">
            <Texto value={data.donarNequi} onChange={(e) => set("donarNequi", e.target.value)} />
          </Campo>
          <Campo label="Titular de la cuenta">
            <Texto value={data.donarTitular} onChange={(e) => set("donarTitular", e.target.value)} />
          </Campo>
        </div>
        <Campo label="Nota adicional" ayuda="Instrucciones extra (opcional).">
          <AreaTexto value={data.donarNota} onChange={(e) => set("donarNota", e.target.value)} />
        </Campo>
      </Tarjeta>

      <Tarjeta titulo="Contacto y redes" descripcion="Cómo te pueden ubicar.">
        <div className="grid gap-5 sm:grid-cols-2">
          <Campo label="Dirección">
            <Texto value={data.direccion} onChange={(e) => set("direccion", e.target.value)} />
          </Campo>
          <Campo label="Ciudad">
            <Texto value={data.ciudad} onChange={(e) => set("ciudad", e.target.value)} />
          </Campo>
          <Campo label="Teléfono">
            <Texto value={data.telefono} onChange={(e) => set("telefono", e.target.value)} />
          </Campo>
          <Campo label="Correo electrónico">
            <Texto value={data.email} onChange={(e) => set("email", e.target.value)} />
          </Campo>
          <Campo label="WhatsApp" ayuda="Con indicativo, ej. 573001234567">
            <Texto value={data.whatsapp} onChange={(e) => set("whatsapp", e.target.value)} />
          </Campo>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <Campo label="Enlace de Facebook">
            <Texto value={data.facebook} onChange={(e) => set("facebook", e.target.value)} placeholder="https://facebook.com/..." />
          </Campo>
          <Campo label="Enlace de Instagram">
            <Texto value={data.instagram} onChange={(e) => set("instagram", e.target.value)} placeholder="https://instagram.com/..." />
          </Campo>
        </div>
      </Tarjeta>

      <BarraGuardar estado={estado} onGuardar={guardar} />
    </div>
  );
}

export function Cargando() {
  return (
    <div className="flex items-center justify-center py-20 text-slate-400">
      <Loader2 className="size-6 animate-spin" />
    </div>
  );
}

export function BarraGuardar({
  estado,
  onGuardar,
}: {
  estado: "idle" | "guardando" | "ok";
  onGuardar: () => void;
}) {
  return (
    <div className="sticky bottom-4 z-30 flex items-center justify-end gap-3 rounded-2xl border border-slate-200 bg-white/95 p-3 shadow-lg backdrop-blur">
      {estado === "ok" && (
        <span className="flex items-center gap-1.5 text-sm font-medium text-emerald-600">
          <Check className="size-4" /> Cambios guardados
        </span>
      )}
      <Boton onClick={onGuardar} disabled={estado === "guardando"}>
        {estado === "guardando" ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <Save className="size-4" />
        )}
        Guardar cambios
      </Boton>
    </div>
  );
}
