import { Building2, Smartphone } from "lucide-react";
import { CopyButton } from "./CopyButton";
import type { Sitio } from "@/lib/types";

export function Donar({ sitio }: { sitio: Sitio }) {
  const tieneDatos = sitio.donarBanco || sitio.donarCuenta || sitio.donarNequi;

  return (
    <section id="donar" className="bg-cream">
      <div className="mx-auto max-w-2xl px-4 pb-20 pt-12 sm:px-6">
        <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm">
          <h2 className="text-lg font-bold text-brand-dark">Datos para tu donación</h2>

          {!tieneDatos ? (
            <p className="mt-4 text-sm text-slate-500">
              Pronto publicaremos nuestros datos para recibir donaciones.
            </p>
          ) : (
            <div className="mt-5 space-y-4">
              {(sitio.donarBanco || sitio.donarCuenta) && (
                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-brand">
                    <Building2 className="size-4" /> Transferencia bancaria
                  </div>
                  {sitio.donarBanco && (
                    <p className="mt-2 text-sm text-slate-600">{sitio.donarBanco}</p>
                  )}
                  {sitio.donarCuenta && (
                    <div className="mt-1 flex items-center justify-between gap-2">
                      <span className="font-mono text-lg font-bold text-brand-dark">
                        {sitio.donarCuenta}
                      </span>
                      <CopyButton value={sitio.donarCuenta} />
                    </div>
                  )}
                </div>
              )}

              {sitio.donarNequi && (
                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-brand">
                    <Smartphone className="size-4" /> Nequi / Daviplata
                  </div>
                  <div className="mt-1 flex items-center justify-between gap-2">
                    <span className="font-mono text-lg font-bold text-brand-dark">
                      {sitio.donarNequi}
                    </span>
                    <CopyButton value={sitio.donarNequi} />
                  </div>
                </div>
              )}

              {sitio.donarTitular && (
                <p className="text-xs text-slate-500">
                  Titular: <span className="font-medium">{sitio.donarTitular}</span>
                </p>
              )}
            </div>
          )}
        </div>

        {sitio.donarNota && (
          <p className="mt-6 text-center text-sm text-slate-500">{sitio.donarNota}</p>
        )}
      </div>
    </section>
  );
}
