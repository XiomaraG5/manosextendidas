import type { Metadata } from "next";

// El panel no debe aparecer en buscadores.
export const metadata: Metadata = {
  title: "Administración · Manos Extendidas",
  robots: { index: false, follow: false },
};

export default function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
