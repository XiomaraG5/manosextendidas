"use client";

import type { ReactNode } from "react";

export function Campo({
  label,
  ayuda,
  children,
}: {
  label: string;
  ayuda?: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-sm font-semibold text-slate-700">{label}</span>
      {ayuda && <span className="block text-xs text-slate-400 mt-0.5">{ayuda}</span>}
      <div className="mt-1.5">{children}</div>
    </label>
  );
}

const baseInput =
  "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-slate-800 outline-none transition-colors placeholder:text-slate-300 focus:border-brand focus:ring-2 focus:ring-brand/20";

export function Texto(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={baseInput} />;
}

export function AreaTexto(
  props: React.TextareaHTMLAttributes<HTMLTextAreaElement>,
) {
  return <textarea {...props} className={`${baseInput} min-h-28 resize-y`} />;
}

export function Boton({
  children,
  variante = "primario",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variante?: "primario" | "secundario" | "peligro";
}) {
  const estilos = {
    primario: "bg-brand text-white hover:bg-brand-dark",
    secundario: "border border-slate-200 text-slate-700 hover:bg-slate-50",
    peligro: "border border-red-200 text-red-600 hover:bg-red-50",
  }[variante];
  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${estilos} ${props.className ?? ""}`}
    >
      {children}
    </button>
  );
}

export function Tarjeta({
  titulo,
  descripcion,
  children,
}: {
  titulo: string;
  descripcion?: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-bold text-brand-dark">{titulo}</h2>
      {descripcion && <p className="mt-1 text-sm text-slate-500">{descripcion}</p>}
      <div className="mt-5 space-y-5">{children}</div>
    </section>
  );
}
