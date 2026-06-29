import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import type { Sitio } from "@/lib/types";

export function Contacto({ sitio }: { sitio: Sitio }) {
  const items = [
    sitio.direccion && {
      icon: MapPin,
      label: "Dónde estamos",
      value: [sitio.direccion, sitio.ciudad].filter(Boolean).join(", "),
    },
    sitio.telefono && { icon: Phone, label: "Teléfono", value: sitio.telefono },
    sitio.email && { icon: Mail, label: "Correo", value: sitio.email },
  ].filter(Boolean) as { icon: typeof Mail; label: string; value: string }[];

  const wpp = sitio.whatsapp.replace(/\D/g, "");

  return (
    <section id="contacto" className="bg-cream">
      <div className="mx-auto max-w-6xl px-4 pb-20 pt-12 sm:px-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it) => (
            <div
              key={it.label}
              className="rounded-2xl border border-slate-100 bg-white p-6"
            >
              <it.icon className="size-7 text-accent" />
              <h3 className="mt-3 text-sm font-semibold uppercase tracking-wide text-slate-400">
                {it.label}
              </h3>
              <p className="mt-1 text-brand-dark font-medium">{it.value}</p>
            </div>
          ))}
        </div>

        {wpp && (
          <a
            href={`https://wa.me/${wpp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-emerald-500 px-7 py-3.5 text-base font-semibold text-white hover:bg-emerald-600 transition-colors"
          >
            <MessageCircle className="size-5" /> Escríbenos por WhatsApp
          </a>
        )}
      </div>
    </section>
  );
}
