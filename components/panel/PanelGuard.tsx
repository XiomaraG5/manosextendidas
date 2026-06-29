"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AlertTriangle,
  HeartHandshake,
  LogOut,
  ShieldX,
} from "lucide-react";
import { useAuth } from "@/lib/auth";
import { Boton } from "./ui";

export function PanelGuard({ children }: { children: ReactNode }) {
  const { user, cargando, esAdmin, configurado, entrar, salir } = useAuth();

  // Firebase aún no configurado (faltan variables de entorno).
  if (!configurado) {
    return (
      <Centro>
        <AlertTriangle className="size-12 text-amber-500" />
        <h1 className="mt-4 text-xl font-bold text-slate-800">
          Falta configurar Firebase
        </h1>
        <p className="mt-2 max-w-sm text-slate-500">
          Agrega las variables de Firebase en el archivo{" "}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm">
            .env.local
          </code>{" "}
          y vuelve a cargar la página.
        </p>
      </Centro>
    );
  }

  if (cargando) {
    return (
      <Centro>
        <div className="size-8 animate-spin rounded-full border-3 border-brand/30 border-t-brand" />
        <p className="mt-4 text-slate-400">Cargando…</p>
      </Centro>
    );
  }

  // Sin sesión: mostrar botón de entrar con Google.
  if (!user) {
    return (
      <Centro>
        <HeartHandshake className="size-12 text-brand" />
        <h1 className="mt-4 text-2xl font-bold text-brand-dark">
          Panel de administración
        </h1>
        <p className="mt-2 text-slate-500">Inicia sesión para editar el sitio.</p>
        <Boton onClick={() => entrar()} className="mt-6">
          <GoogleIcon /> Entrar con Google
        </Boton>
        <Link href="/" className="mt-6 text-sm text-slate-400 hover:text-brand">
          ← Volver al sitio
        </Link>
      </Centro>
    );
  }

  // Con sesión pero sin permiso.
  if (!esAdmin) {
    return (
      <Centro>
        <ShieldX className="size-12 text-red-500" />
        <h1 className="mt-4 text-xl font-bold text-slate-800">Acceso restringido</h1>
        <p className="mt-2 max-w-sm text-slate-500">
          La cuenta <span className="font-medium">{user.email}</span> no está
          autorizada para administrar el sitio.
        </p>
        <Boton variante="secundario" onClick={() => salir()} className="mt-6">
          <LogOut className="size-4" /> Cerrar sesión
        </Boton>
      </Centro>
    );
  }

  // Autorizado: render del panel con barra superior.
  return (
    <div className="min-h-full bg-slate-50">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center gap-2 font-bold text-brand-dark">
            <HeartHandshake className="size-6 text-brand" />
            <span className="hidden sm:inline">Administración</span>
          </Link>
          <div className="flex items-center gap-3">
            {user.photoURL && (
              <Image
                src={user.photoURL}
                alt=""
                width={32}
                height={32}
                className="rounded-full"
              />
            )}
            <span className="hidden text-sm text-slate-500 sm:inline">
              {user.email}
            </span>
            <button
              onClick={() => salir()}
              className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              aria-label="Cerrar sesión"
            >
              <LogOut className="size-5" />
            </button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-4xl px-4 py-8">{children}</main>
    </div>
  );
}

function Centro({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      {children}
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg className="size-4" viewBox="0 0 24 24">
      <path
        fill="#fff"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z"
      />
      <path
        fill="#fff"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z"
        opacity=".85"
      />
      <path
        fill="#fff"
        d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84z"
        opacity=".6"
      />
      <path
        fill="#fff"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"
        opacity=".4"
      />
    </svg>
  );
}
