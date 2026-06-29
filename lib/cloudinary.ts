// Subida de archivos a Cloudinary mediante "unsigned upload preset".
// Usa /auto/upload, que detecta solo si es imagen o video. No requiere
// servidor ni tarjeta; la seguridad la da el preset (carpeta + límites).
import type { MediaItem } from "./types";

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

export const cloudinaryConfigured = Boolean(CLOUD_NAME && UPLOAD_PRESET);

export async function subirArchivo(
  file: File,
  folder = "manos-extendidas",
): Promise<MediaItem> {
  if (!CLOUD_NAME || !UPLOAD_PRESET) {
    throw new Error("Cloudinary no está configurado (.env.local).");
  }
  const form = new FormData();
  form.append("file", file);
  form.append("upload_preset", UPLOAD_PRESET);
  form.append("folder", folder);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`,
    { method: "POST", body: form },
  );
  if (!res.ok) {
    throw new Error("No se pudo subir el archivo a Cloudinary.");
  }
  const data = (await res.json()) as {
    secure_url: string;
    resource_type: string;
  };
  return {
    url: data.secure_url,
    tipo: data.resource_type === "video" ? "video" : "imagen",
  };
}
