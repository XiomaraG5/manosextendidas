import type { Metadata } from "next";
import { SiteShell } from "@/components/site/SiteShell";
import { PageHero } from "@/components/site/PageHero";
import { Contacto } from "@/components/site/Contacto";
import { getSitio } from "@/lib/content";

export const revalidate = 60;
export const metadata: Metadata = {
  title: "Contacto · Fundación Manos Extendidas",
};

export default async function ContactoPage() {
  const sitio = await getSitio();
  return (
    <SiteShell sitio={sitio}>
      <PageHero
        eyebrow="Hablemos"
        title="Contáctanos"
        subtitle="Estamos para servirte. Escríbenos o visítanos en la Comuna 5."
      />
      <Contacto sitio={sitio} />
    </SiteShell>
  );
}
