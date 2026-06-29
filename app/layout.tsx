import type { Metadata } from "next";
import { Inter, Anton } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const anton = Anton({
  variable: "--font-display",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fundación Manos Extendidas",
  description:
    "23 años transformando la vulnerabilidad en desarrollo integral en la Comuna 5, Medellín. Más de 50.000 personas impactadas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${anton.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-cream">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
