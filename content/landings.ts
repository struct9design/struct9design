import type { Faq } from "./faqs";
import type { ServiceSlug } from "./services";

/**
 * Páginas de aterrizaje para búsquedas concretas (local y nicho inmobiliario).
 * Cada una apunta a su servicio y a los artículos del blog relacionados.
 */
export type LandingSlug = "diseno-web-sevilla" | "automatizacion-inmobiliarias" | "videos-inmobiliarias";

export type Landing = {
  slug: LandingSlug;
  /** Título para Google (~50 caracteres sin " · struct9"). */
  seoTitle: string;
  /** Texto corto del enlace en el pie. */
  label: string;
  metaDescription: string;
  eyebrow: string;
  h1: string;
  intro: string;
  sections: { heading?: string; content: string }[];
  faqs: Faq[];
  /** Servicio que se ofrece en la llamada final. */
  service: ServiceSlug;
  /** Artículos del blog relacionados (slugs). */
  articles: string[];
  ctaTitle: string;
};

export const landings: Landing[] = [
  {
    slug: "diseno-web-sevilla",
    label: "Diseño web en Sevilla",
    seoTitle: "Diseño web y automatización en Sevilla",
    metaDescription:
      "Diseño de páginas web y automatización para negocios de Sevilla y Andalucía. Reunión en persona, presupuesto cerrado y gratuito, y una web que te trae clientes.",
    eyebrow: "Sevilla · Andalucía",
    h1: "Diseño web y automatización para negocios en Sevilla y Andalucía",
    intro:
      "Webs que te traen clientes y procesos que funcionan solos, para negocios de Sevilla y del resto de Andalucía. Nos sentamos contigo, te lo explicamos en lenguaje normal y te damos un presupuesto cerrado y gratuito.",
    sections: [
      {
        content:
          "En Sevilla, la mayoría de clientes nuevos empiezan en el móvil: buscan «cerca de mí», miran la ficha de Google, entran en la web y deciden en segundos si llaman o pasan al siguiente. Si tu negocio no aparece, o aparece con una web que no se entiende, ese cliente se va a la competencia aunque tú seas mejor.\n\nEn struct9 nos encargamos de esa parte digital: la web, aparecer en Google en tu zona y los procesos que hacen que ningún contacto se quede sin respuesta.",
      },
      {
        heading: "Qué hacemos por los negocios de Sevilla",
        content:
          "Diseño de páginas web: a medida, perfectas en el móvil, con los textos escritos por nosotros y preparadas para aparecer en las búsquedas de tu zona.\n\nAutomatización: los contactos de la web, el correo, las redes o los portales en un solo sitio, respuesta al momento, citas que se agendan solas y seguimiento de presupuestos.\n\nDiagnóstico digital: revisamos tu negocio con ojos de fuera y te decimos por escrito dónde te conviene invertir primero, incluida la inteligencia artificial.\n\nVídeos a partir de fotos: recorridos de inmuebles, platos, alojamientos o productos, sin rodaje y listos para publicar.",
      },
      {
        heading: "Aparecer cuando te buscan en Sevilla",
        content:
          "Para un negocio local, Google tiene dos escaparates: el mapa con las fichas de empresa y los resultados normales. Trabajamos los dos.\n\n— Optimizamos tu ficha de Google: categorías, horarios, fotos, servicios y cómo pedir reseñas a tus clientes.\n\n— Preparamos cada página de tu web para lo que busca la gente de tu zona: tu servicio, tu barrio y tu ciudad.\n\n— Lo medimos: sabrás cuántas personas te encuentran, desde dónde y cuántas acaban contactando.\n\nLas búsquedas por tu nombre y tu ficha local suelen mejorar en pocas semanas. Las búsquedas más competidas llevan meses, y te lo decimos con honestidad desde el principio.",
      },
      {
        heading: "Pensado para el tejido de negocios de Sevilla",
        content:
          "Restaurantes y hostelería que necesitan carta visible y reservas sin teléfono. Alojamientos turísticos que quieren destacar en las plataformas. Inmobiliarias que reciben contactos de los portales a cualquier hora. Clínicas, estética y peluquerías con agenda que se llena y se vacía sola. Comercios de barrio, despachos, reformas y oficios que hoy viven solo del boca a boca.",
      },
      {
        heading: "Cómo trabajamos",
        content:
          "1. Primera conversación gratuita, en persona en Sevilla o por videollamada si te viene mejor.\n\n2. Presupuesto cerrado y por escrito, con el alcance, el plazo y el precio. Sin letra pequeña.\n\n3. Construimos por fases y puedes ver el avance en todo momento.\n\n4. Te entregamos todo con sus accesos y su documentación. Lo que montamos es tuyo.",
      },
      {
        heading: "Fuera de Sevilla",
        content:
          "Trabajamos con negocios de toda Andalucía: Málaga, Cádiz, Huelva, Córdoba, Granada, Jaén y Almería. Y con el resto de España lo hacemos en remoto, por videollamada y WhatsApp, con el mismo proceso y los mismos plazos.",
      },
    ],
    faqs: [
      {
        q: "¿Podemos reunirnos en persona?",
        a: "Sí. En Sevilla nos vemos en tu negocio o donde te venga mejor. Si prefieres no desplazarte, lo hacemos por videollamada sin ningún problema.",
      },
      {
        q: "¿Cuánto cuesta una página web para un negocio en Sevilla?",
        a: "Depende del número de páginas, de si necesitas textos y fotos y de las integraciones (reservas, formularios, tienda). Por eso no publicamos tarifas: tras una primera conversación gratuita recibes un presupuesto cerrado y por escrito.",
      },
      {
        q: "¿Me ayudáis a salir en Google Maps?",
        a: "Sí. Optimizamos tu ficha de Google para búsquedas locales y te explicamos cómo conseguir reseñas de tus clientes, que es lo que más pesa en el mapa.",
      },
      {
        q: "Ya tengo web. ¿Hay que empezar de cero?",
        a: "No necesariamente. La revisamos primero y te decimos qué merece la pena conservar. Si ya tienes posiciones en Google, las protegemos durante el cambio.",
      },
    ],
    service: "presencia-digital",
    articles: ["responder-contactos-inmobiliaria", "videos-inmobiliaria-a-partir-de-fotos"],
    ctaTitle: "Cuéntanos tu negocio y te damos un presupuesto en 24 horas.",
  },
  {
    slug: "automatizacion-inmobiliarias",
    label: "Automatización para inmobiliarias",
    seoTitle: "Automatización para inmobiliarias, sin bots",
    metaDescription:
      "Responde al momento a los contactos de los portales, agenda visitas y haz seguimiento sin estar pegado al móvil. Sin bots en tu WhatsApp. Sevilla y toda España.",
    eyebrow: "Para inmobiliarias",
    h1: "Automatización para inmobiliarias: ningún contacto sin respuesta, y sin bots",
    intro:
      "Quien pregunta por un piso escribe a varias inmobiliarias a la vez, y la primera que responde se lleva la visita. Montamos el sistema que responde al momento, agenda la visita y te avisa, mientras tú sigues enseñando pisos.",
    sections: [
      {
        heading: "El problema: los contactos llegan cuando no puedes atenderlos",
        content:
          "Un interesado pide información por un piso un domingo por la tarde, mientras estás con otra visita o a las once de la noche. Cuando le respondes al día siguiente, ya ha quedado con otra agencia.\n\nNo es falta de ganas ni de trabajo: es que los contactos llegan por los portales, la web, el correo y las redes, cada uno a su manera, y nadie puede estar pendiente de todo a la vez.",
      },
      {
        heading: "Qué montamos",
        content:
          "Todos los contactos en un solo sitio. Lo que llega de los portales, tu web, el correo o Instagram entra solo en un único lugar, con el inmueble por el que pregunta, su nombre, teléfono y mensaje.\n\nRespuesta al momento. El interesado recibe enseguida un mensaje con lo básico del inmueble y un enlace para elegir día y hora de visita.\n\nVisitas que se agendan solas. Solo puede elegir horas en las que de verdad puedes ir, y le llega un recordatorio antes de la cita.\n\nAvisos para tu equipo. El agente adecuado recibe un aviso en el móvil con todo el contexto para llamar cuando pueda.\n\nSeguimiento automático. Si nadie le ha atendido en 24 horas, el sistema te lo recuerda. Si visitó el piso y no se decide, se le escribe unos días después.",
      },
      {
        heading: "Por qué sin bots en tu WhatsApp",
        content:
          "Muchas soluciones conectan un bot a tu WhatsApp para que «hable» con los clientes. El riesgo es serio: Meta tiene normas muy estrictas y una conexión que no las cumple puede acabar con tu número bloqueado, el mismo número que tus clientes llevan años guardando.\n\nNosotros no instalamos bots en tu WhatsApp. Te dejamos bien configuradas las herramientas oficiales y gratuitas de WhatsApp Business (respuestas rápidas, mensajes de ausencia, etiquetas y catálogo) y montamos la automatización alrededor, sin poner tu número en riesgo. Y nada de robots haciéndose pasar por ti: cuando hace falta, el cliente habla con una persona de tu equipo.",
      },
      {
        heading: "Cómo lo ponemos en marcha",
        content:
          "1. Mapa de contactos: vemos contigo por dónde te llegan hoy los interesados y cuánto tardas en responder.\n\n2. Diseño del flujo: te enseñamos en un esquema sencillo qué pasará en cada caso y lo validas antes de montar nada.\n\n3. Montaje y pruebas con contactos reales de tu inmobiliaria.\n\n4. Puesta en marcha, formación de tu equipo y ajustes durante las primeras semanas.\n\nTodo el proceso suele llevar entre dos y cuatro semanas.",
      },
      {
        heading: "¿Compensa en una inmobiliaria pequeña?",
        content:
          "Depende de cuántos contactos recibes y de cuántos se te escapan. Una prueba sencilla: durante dos semanas, apunta cuántos contactos llegan, cuánto tardas en responder y cuántos acaban en visita. Si muchos llegan fuera de horario o tardas más de unas horas, suele compensar pronto: cada visita que no se pierde cuenta.",
      },
    ],
    faqs: [
      {
        q: "¿Funciona con los portales y el programa que ya uso?",
        a: "En la mayoría de casos sí. Lo revisamos en la primera reunión y, si alguna conexión no es posible, te proponemos la alternativa más sencilla.",
      },
      {
        q: "¿Mis clientes notarán que es automático?",
        a: "Las respuestas son claras, útiles y en tu tono, y siempre llevan a una persona de tu equipo cuando hace falta. Los textos los preparamos contigo.",
      },
      {
        q: "¿Qué pasa con los datos de los interesados?",
        a: "Se tratan cumpliendo el RGPD, se guardan con seguridad y siguen siendo tuyos en todo momento.",
      },
      {
        q: "¿Tiene coste mensual?",
        a: "Depende de lo que montemos. Si alguna herramienta tiene cuota o quieres mantenimiento, te detallamos el importe mensual en el presupuesto antes de empezar.",
      },
    ],
    service: "automatizacion",
    articles: ["responder-contactos-inmobiliaria"],
    ctaTitle: "Cuéntanos cómo te llegan hoy los contactos y te decimos qué automatizar primero.",
  },
  {
    slug: "videos-inmobiliarias",
    label: "Vídeos para inmobiliarias",
    seoTitle: "Vídeos inmobiliarios a partir de fotos",
    metaDescription:
      "Convertimos las fotos de tus inmuebles en vídeos para portales y redes, sin grabar. Formato horizontal y vertical, tu marca y una muestra gratis de 5 segundos.",
    eyebrow: "Para inmobiliarias",
    h1: "Vídeos inmobiliarios a partir de las fotos que ya tienes",
    intro:
      "Recorridos en vídeo de tus pisos y locales, hechos con tus fotos: sin volver al inmueble, sin coordinar al propietario y sin equipo de grabación. Listos para portales, tu web y redes sociales.",
    sections: [
      {
        heading: "Por qué un vídeo vende más que diez fotos",
        content:
          "En un portal, tu anuncio compite con decenas de pisos con fotos parecidas. Un recorrido en movimiento hace que el interesado se detenga en el tuyo y entienda la luz, la amplitud y la distribución de un vistazo.\n\nY filtra las visitas: quien pide verlo después del vídeo ya sabe cómo es el inmueble. Llegan menos curiosos y más personas que de verdad encajan.",
      },
      {
        heading: "Qué incluye cada vídeo",
        content:
          "— Recorrido con movimiento suave por cada estancia y transiciones de una a otra.\n\n— Textos en pantalla con los datos clave: metros, habitaciones, precio y zona.\n\n— Tu logo y música con licencia de uso comercial.\n\n— Formato horizontal para portales y web, y vertical para redes sociales.\n\n— Una ronda de cambios incluida.",
      },
      {
        heading: "Fiel al inmueble, siempre",
        content:
          "Trabajamos solo con lo que aparece en tus fotos: no añadimos estancias, muebles ni vistas que no existen. El movimiento y el montaje sirven para enseñar mejor el inmueble, no para enseñar otro. Un vídeo que embellece de más acaba en visitas decepcionadas.",
      },
      {
        heading: "Cómo funciona",
        content:
          "1. Nos envías entre 10 y 20 fotos del inmueble y sus datos clave. Sirven las del móvil si tienen buena luz; te mandamos unas pautas sencillas.\n\n2. Preparamos el guion: orden del recorrido, ritmo y textos.\n\n3. Montamos el vídeo con tu marca.\n\n4. Te lo entregamos en todos los formatos en un plazo de 5 a 7 días.",
      },
      {
        heading: "Muestra gratis y precio por volumen",
        content:
          "Antes de encargar nada, mándanos unas fotos de uno de tus inmuebles y te enviamos gratis una muestra de 5 segundos. Si te convence, hacemos el vídeo completo.\n\nSi trabajas con varios inmuebles, te preparamos un presupuesto por paquete: cada vídeo sale más barato y todos mantienen el mismo estilo, así tus anuncios se reconocen de un vistazo.",
      },
    ],
    faqs: [
      {
        q: "¿Sirven fotos hechas con el móvil?",
        a: "Sí, si tienen buena luz y resolución. Antes de empezar te enviamos unas pautas para sacarles el máximo partido.",
      },
      {
        q: "¿Puedo subir el vídeo a los portales inmobiliarios?",
        a: "Sí. Lo entregamos en los formatos adecuados para portales, tu web, tu ficha de Google y redes sociales.",
      },
      {
        q: "¿Hacéis también alojamientos turísticos?",
        a: "Sí. Habitaciones, zonas comunes y entorno, para destacar en las plataformas de reserva. Funciona igual que con un piso.",
      },
    ],
    service: "contenido-visual",
    articles: ["videos-inmobiliaria-a-partir-de-fotos"],
    ctaTitle: "Mándanos unas fotos y te enviamos una muestra gratis.",
  },
];

export function getLanding(slug: LandingSlug): Landing {
  return landings.find((l) => l.slug === slug)!;
}
