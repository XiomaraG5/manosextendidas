import Link from "next/link";
import { ArrowUpRight, CalendarHeart, HandHeart, Mic, Users } from "lucide-react";

const items = [
  {
    href: "/nosotros",
    icon: Users,
    titulo: "Quiénes somos",
    texto: "Nuestra misión, visión, valores y 23 años de historia al servicio de la comunidad.",
  },
  {
    href: "/estudio",
    icon: Mic,
    titulo: "Estudio de grabación",
    texto: "Alquila nuestra Casa de Contenidos para música, podcast y video. Grabar aquí sostiene la causa.",
  },
  {
    href: "/eventos",
    icon: CalendarHeart,
    titulo: "Nuestros eventos",
    texto: "Jornadas de salud, familia y bienestar que llevamos al corazón de la Comuna 5.",
  },
  {
    href: "/donar",
    icon: HandHeart,
    titulo: "Cómo ayudar",
    texto: "Tu aporte sostiene cada jornada. Conoce las formas de donar y acompañarnos.",
  },
];

export function Teaser() {
  return (
    <section className="bg-cream px-4 pb-16 pt-6 sm:px-6">
      <div className="mx-auto grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((it) => (
          <Link
            key={it.href}
            href={it.href}
            className="group rounded-[1.75rem] border border-brand/10 bg-white p-7 transition-colors hover:border-brand/30"
          >
            <div className="flex items-center justify-between">
              <span className="flex size-12 items-center justify-center rounded-2xl bg-brand-light text-brand">
                <it.icon className="size-6" />
              </span>
              <ArrowUpRight className="size-5 text-slate-300 transition-colors group-hover:text-accent" />
            </div>
            <h3 className="mt-5 text-lg font-bold text-brand-dark">{it.titulo}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-500">{it.texto}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
