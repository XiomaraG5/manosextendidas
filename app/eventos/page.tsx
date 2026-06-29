import type { Metadata } from "next";
import { SiteShell } from "@/components/site/SiteShell";
import { PageHero } from "@/components/site/PageHero";
import { Eventos } from "@/components/site/Eventos";
import { getSitio, getEventos } from "@/lib/content";

export const revalidate = 60;
export const metadata: Metadata = {
  title: "Eventos · Fundación Manos Extendidas",
};

export default async function EventosPage() {
  const [sitio, eventos] = await Promise.all([getSitio(), getEventos()]);
  return (
    <SiteShell sitio={sitio}>
      <PageHero
        eyebrow="Comunidad"
        title="Nuestros eventos"
        subtitle="Jornadas de salud, familia y bienestar que llevamos al corazón de la Comuna 5."
      />
      <Eventos eventos={eventos} />
    </SiteShell>
  );
}
