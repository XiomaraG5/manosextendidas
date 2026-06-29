import { Logo } from "./Logo";

// Lóbulo EXACTO de la portada. En el banner se voltea con un transform para
// "morder" hacia adentro el borde inferior (cóncavo), sin recalcular curvas
// ni distorsionarse: es un detalle de tamaño fijo que escala parejo.
const LOBULO =
  "M272 404 A22 22 0 0 0 250 426 L250 432 A22 22 0 0 1 228 454 " +
  "L80 454 A22 22 0 0 1 58 432 L58 426 A22 22 0 0 0 36 404 Z";

export function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="px-2 pt-4 sm:px-4">
      <div className="relative mx-auto max-w-[1380px] overflow-hidden rounded-[2rem] bg-brand-dark px-7 py-12 text-white sm:px-12 sm:py-16">
        {/* Detalle del logo (tenue) */}
        <Logo
          aria-hidden
          className="pointer-events-none absolute -right-4 -top-4 h-24 w-48 text-white/[0.06] sm:-right-6 sm:-top-6 sm:h-40 sm:w-80"
        />

        {/* Mordida cóncava abajo-derecha */}
        <svg
          viewBox="0 0 236 60"
          preserveAspectRatio="xMidYMax meet"
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 right-8 z-[1] h-9 w-36 sm:right-14 sm:h-11 sm:w-44"
        >
          <path
            transform="translate(-36 464) scale(1 -1)"
            d={LOBULO}
            style={{ fill: "var(--color-cream)" }}
          />
        </svg>

        {/* Contenido */}
        <div className="relative z-10">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent-soft">
            {eyebrow}
          </span>
          <h1 className="mt-2 text-3xl font-extrabold leading-tight sm:text-5xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-3 max-w-2xl text-base text-white/70 sm:text-lg">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
