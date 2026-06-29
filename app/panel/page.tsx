"use client";

import { useState } from "react";
import { CalendarHeart, FileText, Home, Mic, Users } from "lucide-react";
import { PanelGuard } from "@/components/panel/PanelGuard";
import { SitioForm } from "@/components/panel/SitioForm";
import { NosotrosForm } from "@/components/panel/NosotrosForm";
import { EstudioForm } from "@/components/panel/EstudioForm";
import { EventosManager } from "@/components/panel/EventosManager";
import { InformesManager } from "@/components/panel/InformesManager";

const tabs = [
  { id: "sitio", label: "Inicio y donación", icon: Home },
  { id: "nosotros", label: "Quiénes somos", icon: Users },
  { id: "estudio", label: "Estudio", icon: Mic },
  { id: "eventos", label: "Eventos", icon: CalendarHeart },
  { id: "informes", label: "Informes", icon: FileText },
] as const;

type TabId = (typeof tabs)[number]["id"];

export default function PanelPage() {
  const [tab, setTab] = useState<TabId>("sitio");

  return (
    <PanelGuard>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-extrabold text-brand-dark">
            Editar el sitio
          </h1>
          <p className="mt-1 text-slate-500">
            Cambia los textos, las fotos y los eventos. Recuerda guardar cada
            sección.
          </p>
        </div>

        <div className="flex gap-2 overflow-x-auto rounded-2xl bg-white p-1.5 shadow-sm">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors ${
                tab === t.id
                  ? "bg-brand text-white"
                  : "text-slate-500 hover:bg-slate-50"
              }`}
            >
              <t.icon className="size-4" />
              {t.label}
            </button>
          ))}
        </div>

        {tab === "sitio" && <SitioForm />}
        {tab === "nosotros" && <NosotrosForm />}
        {tab === "estudio" && <EstudioForm />}
        {tab === "eventos" && <EventosManager />}
        {tab === "informes" && <InformesManager />}
      </div>
    </PanelGuard>
  );
}
