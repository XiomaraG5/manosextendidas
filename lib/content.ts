// Helpers de contenido. Las lecturas corren en el servidor (páginas públicas)
// y en el cliente (panel). Las escrituras solo en el cliente autenticado.
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { db } from "./firebase";
import { subirArchivo } from "./cloudinary";
import {
  ESTUDIO_DEFAULT,
  EVENTOS_DEFAULT,
  INFORMES_DEFAULT,
  INFORMES_INFO_DEFAULT,
  NOSOTROS_DEFAULT,
  SITIO_DEFAULT,
} from "./defaults";
import type {
  Estudio,
  Evento,
  EventoInput,
  Informe,
  InformeInput,
  InformesInfo,
  MediaItem,
  Nosotros,
  Sitio,
} from "./types";

// ---------- Lecturas (con fallback a contenido por defecto) ----------

export async function getSitio(): Promise<Sitio> {
  if (!db) return SITIO_DEFAULT;
  try {
    const snap = await getDoc(doc(db, "contenido", "sitio"));
    return snap.exists()
      ? { ...SITIO_DEFAULT, ...(snap.data() as Partial<Sitio>) }
      : SITIO_DEFAULT;
  } catch {
    return SITIO_DEFAULT;
  }
}

export async function getNosotros(): Promise<Nosotros> {
  if (!db) return NOSOTROS_DEFAULT;
  try {
    const snap = await getDoc(doc(db, "contenido", "nosotros"));
    return snap.exists()
      ? { ...NOSOTROS_DEFAULT, ...(snap.data() as Partial<Nosotros>) }
      : NOSOTROS_DEFAULT;
  } catch {
    return NOSOTROS_DEFAULT;
  }
}

export async function getEstudio(): Promise<Estudio> {
  if (!db) return ESTUDIO_DEFAULT;
  try {
    const snap = await getDoc(doc(db, "contenido", "estudio"));
    return snap.exists()
      ? { ...ESTUDIO_DEFAULT, ...(snap.data() as Partial<Estudio>) }
      : ESTUDIO_DEFAULT;
  } catch {
    return ESTUDIO_DEFAULT;
  }
}

export async function getEventos(): Promise<Evento[]> {
  if (!db) return EVENTOS_DEFAULT;
  try {
    const snap = await getDocs(collection(db, "eventos"));
    const eventos = snap.docs.map((d) => ({
      id: d.id,
      ...(d.data() as EventoInput),
    }));
    // Más recientes / próximos primero (por fecha). Sin fecha, al final.
    return eventos.sort((a, b) => (b.fecha || "").localeCompare(a.fecha || ""));
  } catch {
    return EVENTOS_DEFAULT;
  }
}

// ---------- Escrituras (panel, requieren admin autenticado) ----------

export async function saveSitio(data: Sitio): Promise<void> {
  if (!db) throw new Error("Firebase no está configurado.");
  await setDoc(doc(db, "contenido", "sitio"), data, { merge: true });
}

export async function saveNosotros(data: Nosotros): Promise<void> {
  if (!db) throw new Error("Firebase no está configurado.");
  await setDoc(doc(db, "contenido", "nosotros"), data, { merge: true });
}

export async function saveEstudio(data: Estudio): Promise<void> {
  if (!db) throw new Error("Firebase no está configurado.");
  await setDoc(doc(db, "contenido", "estudio"), data, { merge: true });
}

export async function saveEvento(
  input: EventoInput,
  id?: string,
): Promise<string> {
  if (!db) throw new Error("Firebase no está configurado.");
  const docRef = id
    ? doc(db, "eventos", id)
    : doc(collection(db, "eventos"));
  await setDoc(docRef, input, { merge: true });
  return docRef.id;
}

export async function deleteEvento(id: string): Promise<void> {
  if (!db) throw new Error("Firebase no está configurado.");
  await deleteDoc(doc(db, "eventos", id));
}

// ---------- Informes (PDFs) ----------

export async function getInformesInfo(): Promise<InformesInfo> {
  if (!db) return INFORMES_INFO_DEFAULT;
  try {
    const snap = await getDoc(doc(db, "contenido", "informes"));
    return snap.exists()
      ? { ...INFORMES_INFO_DEFAULT, ...(snap.data() as Partial<InformesInfo>) }
      : INFORMES_INFO_DEFAULT;
  } catch {
    return INFORMES_INFO_DEFAULT;
  }
}

export async function saveInformesInfo(data: InformesInfo): Promise<void> {
  if (!db) throw new Error("Firebase no está configurado.");
  await setDoc(doc(db, "contenido", "informes"), data, { merge: true });
}

export async function getInformes(): Promise<Informe[]> {
  if (!db) return INFORMES_DEFAULT;
  try {
    const snap = await getDocs(collection(db, "informes"));
    const informes = snap.docs.map((d) => ({
      id: d.id,
      ...(d.data() as InformeInput),
    }));
    // Más recientes primero (por fecha).
    return informes.sort((a, b) => (b.fecha || "").localeCompare(a.fecha || ""));
  } catch {
    return INFORMES_DEFAULT;
  }
}

export async function saveInforme(
  input: InformeInput,
  id?: string,
): Promise<string> {
  if (!db) throw new Error("Firebase no está configurado.");
  const docRef = id ? doc(db, "informes", id) : doc(collection(db, "informes"));
  await setDoc(docRef, input, { merge: true });
  return docRef.id;
}

export async function deleteInforme(id: string): Promise<void> {
  if (!db) throw new Error("Firebase no está configurado.");
  await deleteDoc(doc(db, "informes", id));
}

/** Sube un PDF y devuelve su URL. */
export async function subirPdf(file: File): Promise<string> {
  const { url } = await subirArchivo(file, "manos-extendidas/informes");
  return url;
}

// ---------- Imágenes y videos (Cloudinary) ----------

/** Sube una imagen y devuelve su URL (eventos: solo imágenes). */
export async function subirFoto(file: File): Promise<string> {
  const { url } = await subirArchivo(file, "manos-extendidas/eventos");
  return url;
}

/** Sube una imagen o video (estudio) y devuelve {url, tipo}. */
export async function subirMedia(file: File): Promise<MediaItem> {
  return subirArchivo(file, "manos-extendidas/estudio");
}

// Borrar de Cloudinary requiere firma del lado del servidor; aquí solo se
// quita el archivo del contenido. Queda en Cloudinary (sin costo relevante)
// pero deja de mostrarse en el sitio.
export async function borrarFoto(_url: string): Promise<void> {
  return;
}
