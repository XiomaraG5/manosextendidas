// Tipos del contenido editable del sitio.

export type Valor = {
  titulo: string;
  descripcion: string;
};

export type Cifra = {
  numero: string; // ej. "50.000+", "23"
  etiqueta: string; // ej. "personas impactadas"
};

/** Documento: contenido/sitio — textos generales y contacto. */
export type Sitio = {
  nombre: string;
  lema: string; // frase corta bajo el nombre
  heroTitulo: string;
  heroTexto: string;
  cifras: Cifra[];
  // Contacto
  direccion: string;
  ciudad: string;
  telefono: string;
  email: string;
  whatsapp: string; // solo números, ej. 573001234567
  facebook: string;
  instagram: string;
  // Invitación a donar
  donarTitulo: string;
  donarTexto: string;
  donarBanco: string; // ej. "Bancolombia Ahorros"
  donarCuenta: string;
  donarNequi: string;
  donarTitular: string;
  donarNota: string; // texto libre / instrucciones extra
};

/** Documento: contenido/nosotros — misión, visión, valores, historia. */
export type Nosotros = {
  mision: string;
  vision: string;
  historia: string;
  valores: Valor[];
};

export type UsoEstudio = {
  titulo: string;
  descripcion: string;
};

/** Imagen o video alojado en Cloudinary. */
export type MediaItem = {
  url: string;
  tipo: "imagen" | "video";
};

/** Documento: contenido/estudio — la Casa de Contenidos (estudio de grabación). */
export type Estudio = {
  titulo: string;
  descripcion: string;
  usos: UsoEstudio[];
  media: MediaItem[]; // imágenes y videos en Cloudinary
  nota: string; // tarifas / disponibilidad / instrucciones
};

/** Colección: eventos — cada jornada o actividad. */
export type Evento = {
  id: string;
  titulo: string;
  fecha: string; // ISO yyyy-mm-dd
  hora: string; // HH:mm (opcional; vacío = sin hora)
  descripcion: string;
  fotos: string[]; // URLs en Firebase Storage
  destacado: boolean;
  orden: number; // para ordenar manualmente
};

export type EventoInput = Omit<Evento, "id">;

/** Colección: informes — documentos PDF descargables. */
export type Informe = {
  id: string;
  titulo: string;
  fecha: string; // ISO yyyy-mm-dd
  descripcion: string; // opcional
  pdfUrl: string; // URL del PDF en Cloudinary
  orden: number;
};

export type InformeInput = Omit<Informe, "id">;

/** Documento: contenido/informes — texto editable del hero de Informes. */
export type InformesInfo = {
  titulo: string;
  descripcion: string;
};
