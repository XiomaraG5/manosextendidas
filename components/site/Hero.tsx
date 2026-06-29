import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Logo } from "./Logo";
import type { Sitio } from "@/lib/types";

// Silueta: cuerpo redondeado + un único lóbulo "mordido" abajo-izquierda
// para el botón. El logo y la navegación viven en el encabezado.
const SILUETA =
  "M26 0 L654 0 A26 26 0 0 1 680 26 L680 378 A26 26 0 0 1 654 404 " +
  "L272 404 A22 22 0 0 0 250 426 L250 432 A22 22 0 0 1 228 454 L80 454 " +
  "A22 22 0 0 1 58 432 L58 426 A22 22 0 0 0 36 404 L26 404 A26 26 0 0 1 0 378 " +
  "L0 26 A26 26 0 0 1 26 0 Z";

// En móvil el lóbulo va centrado y más ancho, para que el botón quepa.
const SILUETA_MOVIL =
  "M26 0 L654 0 A26 26 0 0 1 680 26 L680 378 A26 26 0 0 1 654 404 " +
  "L570 404 A22 22 0 0 0 548 426 L548 432 A22 22 0 0 1 526 454 L154 454 " +
  "A22 22 0 0 1 132 432 L132 426 A22 22 0 0 0 110 404 L26 404 A26 26 0 0 1 0 378 " +
  "L0 26 A26 26 0 0 1 26 0 Z";

const AZUL = "#084273";

export function Hero({ sitio }: { sitio: Sitio }) {
  const cifra = sitio.cifras?.[0];
  const otras = sitio.cifras?.slice(1, 3) ?? [];

  return (
    <section className="bg-cream px-2 pb-8 pt-4 sm:px-4">
      <DesktopHero sitio={sitio} cifra={cifra} otras={otras} />
      <MobileHero sitio={sitio} cifra={cifra} />
    </section>
  );
}

type Props = {
  sitio: Sitio;
  cifra?: Sitio["cifras"][number];
  otras?: Sitio["cifras"];
};

/* ───────── Escritorio ───────── */
function DesktopHero({ sitio, cifra, otras }: Props) {
  return (
    <div
      className="relative mx-auto hidden w-full max-w-[1380px] text-white md:block"
      style={{ aspectRatio: "680 / 420", containerType: "size" }}
    >
      <svg
        viewBox="0 0 680 460"
        className="absolute inset-0 z-0 h-full w-full"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d={SILUETA} fill={AZUL} />
      </svg>

      {/* Logo de la fundación como protagonista */}
      <div
        className="pointer-events-none absolute left-1/2 z-10 -translate-x-1/2"
        style={{ top: "6%", width: "60cqw" }}
      >
        <Logo className="w-full text-white drop-shadow-[0_10px_28px_rgba(0,0,0,0.30)]" />
      </div>

      {/* Panel: enganche + tarjeta de impacto */}
      <div
        className="absolute z-10 grid items-center rounded-[2cqw] bg-white/10 backdrop-blur-sm"
        style={{
          left: "3.5%",
          right: "3.5%",
          top: "53%",
          bottom: "18%",
          gridTemplateColumns: "1.4fr 1fr",
          gap: "2.8cqw",
          padding: "2.4cqw 3cqw",
        }}
      >
        <div>
          <span
            className="font-bold uppercase tracking-[0.18em] text-accent-soft"
            style={{ fontSize: "1.15cqw" }}
          >
            Fundación · Comuna 5
          </span>
          <p
            className="font-semibold leading-snug"
            style={{ fontSize: "2.3cqw", marginTop: "0.7cqw" }}
          >
            {sitio.heroTitulo}
          </p>
        </div>

        {cifra && (
          <div className="rounded-[1.4cqw] bg-white text-ink" style={{ padding: "1.8cqw" }}>
            <div
              className="font-extrabold leading-none text-brand"
              style={{ fontSize: "3.8cqw" }}
            >
              {cifra.numero}
            </div>
            <div
              className="font-medium text-slate-500"
              style={{ fontSize: "1.2cqw", marginTop: "0.5cqw" }}
            >
              {cifra.etiqueta}
            </div>
            {otras && otras.length > 0 && (
              <div
                className="flex flex-wrap border-t border-slate-100"
                style={{ gap: "1.6cqw", marginTop: "1.2cqw", paddingTop: "1.1cqw" }}
              >
                {otras.map((c, k) => (
                  <div key={k}>
                    <div className="font-bold text-brand-dark" style={{ fontSize: "1.6cqw" }}>
                      {c.numero}
                    </div>
                    <div className="text-slate-400" style={{ fontSize: "1cqw" }}>
                      {c.etiqueta}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Botón en el lóbulo inferior izquierdo */}
      <Link
        href="/donar"
        className="group absolute z-20 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 whitespace-nowrap rounded-full py-2.5 pl-2.5 pr-5 text-sm font-bold shadow-lg lg:text-base"
        style={{ left: "22.6%", top: "92.5%", backgroundColor: "#10b2f0", color: "#084273" }}
      >
        <span
          className="flex size-7 items-center justify-center rounded-full text-white transition-transform group-hover:translate-x-0.5 lg:size-8"
          style={{ backgroundColor: "#084273" }}
        >
          <ArrowRight className="size-4" />
        </span>
        Quiero ayudar
      </Link>
    </div>
  );
}

/* ───────── Móvil (conserva la silueta mordida) ───────── */
function MobileHero({ sitio, cifra }: Props) {
  return (
    <div className="relative text-white md:hidden">
      <svg
        viewBox="0 0 680 460"
        className="absolute inset-0 z-0 h-full w-full"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d={SILUETA_MOVIL} fill={AZUL} />
      </svg>

      <div className="relative z-10 px-6 pb-24 pt-7">
        <div className="flex justify-center">
          <Logo className="w-[82%] text-white drop-shadow-[0_8px_20px_rgba(0,0,0,0.3)]" />
        </div>

        <div className="mt-6 rounded-2xl bg-white/10 p-5">
          <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-accent-soft">
            Fundación · Comuna 5
          </span>
          <p className="mt-1.5 text-lg font-semibold leading-snug">{sitio.heroTitulo}</p>
        </div>

        {cifra && (
          <div className="mt-3 rounded-2xl bg-white p-5 text-ink">
            <div className="text-3xl font-extrabold text-brand">{cifra.numero}</div>
            <div className="text-sm font-medium text-slate-500">{cifra.etiqueta}</div>
          </div>
        )}
      </div>

      {/* Botón centrado en el lóbulo inferior */}
      <Link
        href="/donar"
        className="group absolute bottom-3 left-1/2 z-20 inline-flex -translate-x-1/2 items-center gap-2 rounded-full py-2.5 pl-2.5 pr-5 text-sm font-bold shadow-lg"
        style={{ backgroundColor: "#10b2f0", color: "#084273" }}
      >
        <span
          className="flex size-7 items-center justify-center rounded-full text-white"
          style={{ backgroundColor: "#084273" }}
        >
          <ArrowRight className="size-4" />
        </span>
        Donar
      </Link>
    </div>
  );
}
