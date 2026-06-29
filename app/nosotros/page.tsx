import type { Metadata } from "next";
import { SiteShell } from "@/components/site/SiteShell";
import { PageHero } from "@/components/site/PageHero";
import { Nosotros } from "@/components/site/Nosotros";
import { getSitio, getNosotros } from "@/lib/content";

export const revalidate = 60;
export const metadata: Metadata = {
  title: "Quiénes somos · Fundación Manos Extendidas",
};

export default async function NosotrosPage() {
  const [sitio, nosotros] = await Promise.all([getSitio(), getNosotros()]);
  return (
    <SiteShell sitio={sitio}>
      <PageHero
        eyebrow="La fundación"
        title="Quiénes somos"
        subtitle="23 años transformando la vulnerabilidad en desarrollo integral en la Comuna 5."
      />
      <Nosotros nosotros={nosotros} />
    </SiteShell>
  );
}
