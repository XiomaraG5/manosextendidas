// Contenido por defecto, extraído del relato institucional, el pitch y el
// storytelling de la Fundación. Se muestra mientras no se edite en el panel,
// así el sitio nunca aparece vacío.
import type { Sitio, Nosotros, Evento, Estudio } from "./types";

export const SITIO_DEFAULT: Sitio = {
  nombre: "Fundación Manos Extendidas",
  lema: "23 años transformando la vulnerabilidad en desarrollo integral.",
  heroTitulo: "Creemos en el potencial donde otros solo ven carencia",
  heroTexto:
    "Somos una comunidad cristiana que durante 23 años ha servido de manera ininterrumpida en la Comuna 5 (Castilla), Medellín. Hemos impactado positivamente la vida de más de 50.000 personas, transformando la vulnerabilidad en capacidad y autonomía para las familias de nuestro territorio.",
  cifras: [
    { numero: "+50.000", etiqueta: "personas impactadas" },
    { numero: "23", etiqueta: "años de servicio continuo" },
    { numero: "Comuna 5", etiqueta: "Castilla, Medellín" },
  ],
  direccion: "Barrio Castilla, Comuna 5",
  ciudad: "Medellín, Colombia",
  telefono: "",
  email: "",
  whatsapp: "",
  facebook: "",
  instagram: "",
  donarTitulo: "Tu ayuda extiende más manos",
  donarTexto:
    "Cada aporte sostiene nuestras jornadas de salud, los programas de bienestar familiar y el acompañamiento a las familias de la Comuna 5. Con tu donación, la esperanza llega más lejos.",
  donarBanco: "",
  donarCuenta: "",
  donarNequi: "",
  donarTitular: "Fundación Manos Extendidas",
  donarNota:
    "Si deseas tu certificado de donación o donar en especie, escríbenos y con gusto te orientamos.",
};

export const NOSOTROS_DEFAULT: Nosotros = {
  mision:
    "Transformamos la vulnerabilidad en desarrollo integral, respaldados por valores cristianos y 23 años de experiencia, activando el potencial de cada persona para que lidere su propio crecimiento y el de su familia.",
  vision:
    "Consolidarnos como la organización líder en transformación social en los territorios desde la Comuna 5, reconocida por nuestra capacidad de movilización masiva y nuestra efectividad en convertir la asistencia en autonomía ciudadana.",
  historia:
    "La Fundación Manos Extendidas nace del corazón de una comunidad cristiana que, durante 23 años, ha servido de manera ininterrumpida a la sociedad. Nuestra labor ha transformado la vida de más de 50.000 personas a través de jornadas de salud, brigadas de bienestar familiar y el fortalecimiento de valores. No solo asistimos comunidades: somos el puente entre la exclusión y el desarrollo sostenible de las familias.",
  valores: [
    {
      titulo: "Fe",
      descripcion:
        "Los valores cristianos son el fundamento de cada acción que emprendemos en el territorio.",
    },
    {
      titulo: "Dignidad",
      descripcion:
        "Creemos en el potencial de cada persona y trabajamos para que sea protagonista de su propio crecimiento.",
    },
    {
      titulo: "Comunidad",
      descripcion:
        "Servimos a las familias de la Comuna 5 construyendo autonomía y tejido social, no dependencia.",
    },
    {
      titulo: "Compromiso",
      descripcion:
        "23 años de servicio continuo que respaldan cada jornada de salud, familia y bienestar.",
    },
  ],
};

export const ESTUDIO_DEFAULT: Estudio = {
  titulo: "Casa de Contenidos",
  descripcion:
    "Nuestro estudio profesional de grabación en el corazón de la Comuna 5. Lo alquilamos para tus proyectos de música, podcast y video con tecnología de alta gama. Cada reserva sostiene la labor social de la Fundación: al grabar aquí, ayudas a que la esperanza llegue más lejos.",
  usos: [
    {
      titulo: "Música",
      descripcion:
        "Graba tus canciones y maquetas con equipos profesionales y un espacio acondicionado.",
    },
    {
      titulo: "Podcast",
      descripcion:
        "Set listo para podcasts, entrevistas y programas, con audio de calidad.",
    },
    {
      titulo: "Influencers y video",
      descripcion:
        "Set profesional para creadores de contenido: reels, videos y producciones.",
    },
    {
      titulo: "Productores locales",
      descripcion:
        "Apoyamos el talento del territorio con acceso a tecnología de punta.",
    },
  ],
  media: [],
  nota: "Escríbenos para conocer disponibilidad y tarifas. Reservar es muy fácil.",
};

// El sitio arranca sin eventos cargados; se agregan desde el panel.
export const EVENTOS_DEFAULT: Evento[] = [];
