import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Fotos de eventos almacenadas en Cloudinary.
      { protocol: "https", hostname: "res.cloudinary.com" },
      // Fotos de perfil de Google (avatares en el panel).
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
    ],
  },
};

export default nextConfig;
