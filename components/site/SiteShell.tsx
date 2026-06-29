import type { ReactNode } from "react";
import { SiteHeader } from "./SiteHeader";
import { Footer } from "./Footer";
import type { Sitio } from "@/lib/types";

// Marco común de todas las páginas públicas: encabezado + contenido + pie.
export function SiteShell({
  sitio,
  children,
}: {
  sitio: Sitio;
  children: ReactNode;
}) {
  return (
    <>
      <SiteHeader nombre={sitio.nombre} />
      <main className="flex-1">{children}</main>
      <Footer sitio={sitio} />
    </>
  );
}
