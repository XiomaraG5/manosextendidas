import type { Metadata } from "next";
import { SiteShell } from "@/components/site/SiteShell";
import { PageHero } from "@/components/site/PageHero";
import { Estudio } from "@/components/site/Estudio";
import { getSitio, getEstudio } from "@/lib/content";

export const revalidate = 60;
export const metadata: Metadata = {
  title: "Estudio de grabación · Fundación Manos Extendidas",
};

export default async function EstudioPage() {
  const [sitio, estudio] = await Promise.all([getSitio(), getEstudio()]);
  return (
    <SiteShell sitio={sitio}>
      <PageHero
        eyebrow="Casa de Contenidos"
        title={estudio.titulo}
        subtitle="Alquila nuestro estudio de grabación y ayuda a sostener la labor social."
      />
      <Estudio estudio={estudio} sitio={sitio} />
    </SiteShell>
  );
}
