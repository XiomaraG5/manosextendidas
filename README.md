# Fundación Manos Extendidas — Sitio web

Página pública de la fundación + un **panel de administración** sencillo (`/panel`)
para editar misión, visión, valores, datos de donación, contacto y eventos, sin
tocar código.

- **Tecnología:** Next.js + Firebase (Auth con Google + Firestore) + Cloudinary (imágenes).
- **Costo:** 100% gratis y sin tarjeta (Firestore plan Spark + Cloudinary plan gratis).

---

## 1. Configurar Firebase (una sola vez)

1. Entra a <https://console.firebase.google.com> y crea un proyecto
   (ej. `manos-extendidas`).
2. **Authentication** → *Comenzar* → pestaña *Sign-in method* → activa **Google**.
3. **Firestore Database** → *Crear base de datos* → modo *Producción* → elige región
   (ej. `southamerica-east1`).
4. **Configuración del proyecto** (⚙️) → *Tus apps* → ícono **Web** `</>` → registra
   una app. Copia los valores del objeto `firebaseConfig`.

> Las imágenes **no** usan Firebase Storage: van a Cloudinary (paso 1.b), así el
> proyecto queda gratis y sin tarjeta.

### 1.b Cloudinary (imágenes de eventos)

1. Crea una cuenta gratis en <https://cloudinary.com>.
2. En **Settings → Upload → Upload presets** crea un preset **Unsigned** y anota
   su nombre. En ese preset deja el tipo de recurso en **Auto** para que acepte
   tanto **imágenes como videos** (el estudio permite ambos).
3. Tu **Cloud name** aparece en el panel principal (Dashboard).

> En el plan gratis de Cloudinary los videos tienen un límite de tamaño (≈100 MB
> por archivo). Para clips largos, conviene subir un video corto de muestra.

> **PDF (Informes):** Cloudinary bloquea por defecto la entrega de PDF. Activa
> **Settings → Security → "Allow delivery of PDF and ZIP files"** para que los
> informes se puedan abrir/descargar; si no, el enlace del PDF dará error.

### Pega las claves

En el archivo `.env.local` (ya existe en el proyecto) completa:

```
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...

# Correos de Gmail autorizados a entrar al panel (separados por coma)
NEXT_PUBLIC_ADMIN_EMAILS=tucorreo@gmail.com,otrocorreo@gmail.com

# Cloudinary (imágenes)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=...
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=...
```

---

## 2. Reglas de seguridad (¡importante!)

Las reglas definen quién puede editar. El archivo `firestore.rules` ya está listo:
**solo debes cambiar la lista de correos** para que coincida con
`NEXT_PUBLIC_ADMIN_EMAILS`.

- En la consola de Firebase: **Firestore → Reglas** → pega el contenido de
  `firestore.rules` → *Publicar*.

> Aunque cualquiera puede iniciar sesión con Google, **solo los correos de la lista
> pueden ver y editar el panel**. Cambiar la lista en el `.env` cambia quién entra a
> la interfaz; cambiarla en las reglas cambia quién puede guardar de verdad. Mantén
> ambas listas iguales.

---

## 3. Probar en el computador

```bash
npm install
npm run dev
```

- Sitio público: <http://localhost:3000>
- Panel: <http://localhost:3000/panel>

El sitio funciona aunque Firebase no esté configurado: muestra un contenido por
defecto hasta que lo edites desde el panel.

---

## 4. Publicar en internet (Vercel, gratis)

1. Sube el proyecto a GitHub.
2. Entra a <https://vercel.com>, *Add New → Project*, importa el repositorio.
3. En **Environment Variables** pega las mismas variables del `.env.local`.
4. *Deploy*. Vercel te dará una URL pública.
5. En Firebase → **Authentication → Settings → Authorized domains**, agrega el
   dominio de Vercel (ej. `manos-extendidas.vercel.app`) para que el login con
   Google funcione en producción.

---

## Cómo se edita el contenido (para el equipo)

1. Entra a `tudominio.com/panel`.
2. *Entrar con Google* (con un correo autorizado).
3. Tres pestañas:
   - **Inicio y donación:** textos de portada, cifras, datos para donar y contacto.
   - **Quiénes somos:** misión, visión, historia y valores.
   - **Eventos:** agregar/editar/eliminar jornadas con sus fotos.
4. Pulsa **Guardar** en cada sección. Los cambios aparecen en el sitio en menos de
   un minuto.

---

## Estructura del proyecto

```
app/                  Páginas (sitio público y /panel)
components/site/      Secciones de la página pública
components/panel/     Formularios del panel de administración
lib/firebase.ts       Conexión con Firebase (Auth + Firestore)
lib/cloudinary.ts     Subida de imágenes a Cloudinary
lib/content.ts        Leer y guardar contenido
lib/defaults.ts       Contenido inicial (tomado de los documentos)
lib/types.ts          Estructura de los datos
firestore.rules       Permisos de la base de datos
```
