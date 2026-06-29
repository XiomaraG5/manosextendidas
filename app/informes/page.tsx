import type { Metadata } from "next";
import { SiteShell } from "@/components/site/SiteShell";
import { PageHero } from "@/components/site/PageHero";
import { Informes } from "@/components/site/Informes";
import { getSitio, getInformes, getInformesInfo } from "@/lib/content";

export const revalidate = 60;
export const metadata: Metadata = {
  title: "Informes · Fundación Manos Extendidas",
};

export default async function InformesPage() {
  const [sitio, info, informes] = await Promise.all([
    getSitio(),
    getInformesInfo(),
    getInformes(),
  ]);
  return (
    <SiteShell sitio={sitio}>
      <PageHero
        eyebrow="Transparencia"
        title={info.titulo}
        subtitle={info.descripcion}
      />
      <Informes informes={informes} />
    </SiteShell>
  );
}
