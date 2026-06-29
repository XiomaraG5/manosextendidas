import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { Logo } from "./Logo";
import type { Sitio } from "@/lib/types";

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07c0 6 3.93 11.05 9.1 12V15.5H6.5v-3.43h2.56V9.84c0-2.55 1.5-3.96 3.82-3.96 1.1 0 2.26.2 2.26.2v2.5h-1.27c-1.26 0-1.65.79-1.65 1.6v1.9h2.8l-.45 3.43h-2.35V24C20.07 23.12 24 18.07 24 12.07z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <line x1="17.5" y1="6.5" x2="17.5" y2="6.5" />
    </svg>
  );
}

export function Footer({ sitio }: { sitio: Sitio }) {
  return (
    <footer className="bg-brand-dark text-white/90">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 grid gap-8 sm:grid-cols-2 md:grid-cols-3">
        <div>
          <Logo className="h-16 w-32 text-white" />
          <p className="mt-3 text-sm text-white/70 max-w-xs">{sitio.lema}</p>
        </div>

        <div className="text-sm space-y-2">
          <h3 className="font-semibold text-white mb-3">Contacto</h3>
          {(sitio.direccion || sitio.ciudad) && (
            <p className="flex items-start gap-2">
              <MapPin className="size-4 mt-0.5 shrink-0 text-accent" />
              <span>
                {sitio.direccion}
                {sitio.direccion && sitio.ciudad ? ", " : ""}
                {sitio.ciudad}
              </span>
            </p>
          )}
          {sitio.telefono && (
            <p className="flex items-center gap-2">
              <Phone className="size-4 text-accent" /> {sitio.telefono}
            </p>
          )}
          {sitio.email && (
            <p className="flex items-center gap-2">
              <Mail className="size-4 text-accent" /> {sitio.email}
            </p>
          )}
        </div>

        <div className="text-sm">
          <h3 className="font-semibold text-white mb-3">Síguenos</h3>
          <div className="flex gap-3">
            {sitio.facebook && (
              <a href={sitio.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="rounded-full bg-white/10 p-2.5 hover:bg-white/20 transition-colors">
                <FacebookIcon className="size-5" />
              </a>
            )}
            {sitio.instagram && (
              <a href={sitio.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="rounded-full bg-white/10 p-2.5 hover:bg-white/20 transition-colors">
                <InstagramIcon className="size-5" />
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/50">
          <span>
            © {new Date().getFullYear()} {sitio.nombre}. Todos los derechos reservados.
          </span>
          <Link href="/panel" className="hover:text-white/80 transition-colors">
            Administración
          </Link>
        </div>
      </div>
    </footer>
  );
}
