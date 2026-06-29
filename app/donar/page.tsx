import type { Metadata } from "next";
import { SiteShell } from "@/components/site/SiteShell";
import { PageHero } from "@/components/site/PageHero";
import { Donar } from "@/components/site/Donar";
import { getSitio } from "@/lib/content";

export const revalidate = 60;
export const metadata: Metadata = {
  title: "Donar · Fundación Manos Extendidas",
};

export default async function DonarPage() {
  const sitio = await getSitio();
  return (
    <SiteShell sitio={sitio}>
      <PageHero
        eyebrow="Apóyanos"
        title={sitio.donarTitulo}
        subtitle={sitio.donarTexto}
      />
      <Donar sitio={sitio} />
    </SiteShell>
  );
}
