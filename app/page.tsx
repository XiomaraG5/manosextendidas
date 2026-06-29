import { SiteShell } from "@/components/site/SiteShell";
import { Hero } from "@/components/site/Hero";
import { Teaser } from "@/components/site/Teaser";
import { getSitio } from "@/lib/content";

export const revalidate = 60;

export default async function HomePage() {
  const sitio = await getSitio();
  return (
    <SiteShell sitio={sitio}>
      <Hero sitio={sitio} />
      <Teaser />
    </SiteShell>
  );
}
