"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, X } from "lucide-react";
import { Logo } from "./Logo";

const navLinks = [
  { href: "/nosotros", l: "Nosotros" },
  { href: "/estudio", l: "Estudio" },
  { href: "/eventos", l: "Eventos" },
  { href: "/informes", l: "Informes" },
  { href: "/donar", l: "Donar" },
  { href: "/contacto", l: "Contacto" },
];

export function SiteHeader({ nombre = "Fundación Manos Extendidas" }: { nombre?: string }) {
  const [menu, setMenu] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-brand/10 bg-cream/85 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center">
          <Logo className="h-14 w-28 text-[#10b2f0]" />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((e) => {
            const activo = pathname === e.href;
            return (
              <Link
                key={e.href}
                href={e.href}
                className={`text-sm font-semibold transition-colors ${
                  activo ? "text-brand" : "text-slate-500 hover:text-brand"
                }`}
              >
                {e.l}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/donar"
            className="group hidden items-center gap-2 rounded-full bg-accent py-2 pl-2 pr-4 text-sm font-bold text-brand-dark transition-colors hover:bg-accent-dark hover:text-white sm:flex"
          >
            <span className="flex size-7 items-center justify-center rounded-full bg-brand-dark text-white transition-transform group-hover:translate-x-0.5">
              <ArrowRight className="size-4" />
            </span>
            Donar
          </Link>
          <button
            onClick={() => setMenu((v) => !v)}
            className="flex size-10 items-center justify-center rounded-full bg-brand/5 text-brand-dark md:hidden"
            aria-label="Menú"
          >
            {menu ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {menu && (
        <div className="border-t border-brand/10 bg-cream px-4 py-3 md:hidden">
          <nav className="grid gap-1">
            {navLinks.map((e) => (
              <Link
                key={e.href}
                href={e.href}
                onClick={() => setMenu(false)}
                className="rounded-xl px-3 py-2.5 font-semibold text-slate-700 hover:bg-brand/5"
              >
                {e.l}
              </Link>
            ))}
            <Link
              href="/donar"
              onClick={() => setMenu(false)}
              className="mt-1 rounded-full bg-accent px-3 py-2.5 text-center font-bold text-brand-dark"
            >
              Donar
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
