// Contenido literal de Servicios.dc.html (plantilla) y Home.dc.html (tarjetas).
export type ServiceArea = "presencia" | "automatizacion" | "diagnostico" | "contenido";
export type ServiceSlug = "presencia-digital" | "automatizacion" | "diagnostico" | "contenido-visual";

export type Service = {
  slug: ServiceSlug;
  /** Valor del select "¿Qué te interesa?" del formulario. */
  area: ServiceArea;
  n: string;
  name: string;
  teaser: string;
  h1: string;
  sub: string;
  time: string;
  /** Precio orientativo (p. ej. "desde 890 €"). */
  price: string;
  /** Aclaración del precio: qué incluye, cuotas o descuentos. */
  priceNote: string;
  benefit: string;
  before: string[];
  after: string[];
  painTitle: string;
  pains: { t: string; d: string }[];
  includes: { t: string; d: string }[];
  sectors: { s: string; a: string; b: string }[];
  outcomes: { t: string; d: string }[];
  steps: { time: string; t: string; d: string }[];
  need: string[];
  get: string[];
  faqs: { q: string; a: string }[];
  ctaTitle: string;
  placeholder: string;
  /** Tarjeta de la home. */
  home: { summary: string; bullets: string[]; homeBenefit: string };
};

export const services: Service[] = [
  {
    "slug": "presencia-digital",
    "area": "presencia",
    "n": "01",
    "name": "Presencia digital",
    "teaser": "Una web clara que te hace visible en Google y convierte visitas en clientes.",
    "h1": "Una web que trabaja por ti las 24 horas y te trae clientes nuevos.",
    "sub": "Diseñamos tu web, la preparamos para que Google te encuentre y la pensamos para que quien entra acabe llamando, reservando o pidiendo presupuesto.",
    "time": "3 a 5 semanas",
    "price": "desde 890 €",
    "priceNote": "Web completa de 4 a 6 páginas. Una página única de captación, desde 490 €. Dominio y alojamiento aparte.",
    "benefit": "más clientes nuevos, cada mes",
    "before": [
      "Web antigua o ninguna",
      "No apareces cuando te buscan",
      "Visitas que se van sin contactar",
      "Todo depende del boca a boca"
    ],
    "after": [
      "Web que se entiende en 10 segundos",
      "Apareces en Google en tu zona",
      "Botones directos para llamar o reservar",
      "Contactos nuevos que llegan solos"
    ],
    "painTitle": "Tu negocio es bueno. El problema es que en internet no se nota.",
    "pains": [
      {
        "t": "Te buscan y encuentran a la competencia.",
        "d": "Alguien escribe “restaurante cerca” o “reformas en mi barrio” y tú no apareces. Ese cliente ya no es tuyo."
      },
      {
        "t": "Tu web no dice lo bueno que eres.",
        "d": "Está desactualizada, no se ve bien en el móvil o no explica qué haces ni por qué elegirte."
      },
      {
        "t": "No sabes si te trae algo.",
        "d": "Pagas un dominio cada año pero no tienes ni idea de cuánta gente entra ni si alguno acaba siendo cliente."
      }
    ],
    "includes": [
      {
        "t": "Diseño a medida",
        "d": "Nada de plantillas genéricas. Tu web refleja cómo es tu negocio y transmite confianza desde el primer vistazo."
      },
      {
        "t": "Textos que venden",
        "d": "Los escribimos nosotros después de hablar contigo. Claros, cercanos y pensados para que el visitante dé el paso."
      },
      {
        "t": "Perfecta en el móvil",
        "d": "La mayoría de tus clientes te visitará desde el teléfono. La diseñamos primero para ellos."
      },
      {
        "t": "Aparecer en Google",
        "d": "Preparamos cada página para las búsquedas que te interesan y optimizamos tu ficha de Google para búsquedas locales."
      },
      {
        "t": "Páginas de captación",
        "d": "Landing pages para una campaña, una temporada o un servicio concreto, pensadas para convertir."
      },
      {
        "t": "Medición clara",
        "d": "Sabrás cuántas personas entran, de dónde vienen y cuántas te contactan. Sin informes imposibles de leer."
      }
    ],
    "sectors": [
      {
        "s": "Restaurantes y hostelería",
        "a": "Carta en PDF, sin reservas online y horarios desactualizados.",
        "b": "Carta visible, botón de reservar y cómo llegar en un toque."
      },
      {
        "s": "Comercios de barrio",
        "a": "Solo te conocen quienes pasan por delante.",
        "b": "Apareces cuando buscan lo que vendes en tu zona."
      },
      {
        "s": "Clínicas y despachos",
        "a": "Web fría que no genera confianza ni citas.",
        "b": "Una imagen profesional con cita previa directa."
      },
      {
        "s": "Reformas y oficios",
        "a": "Presupuestos solo por recomendación.",
        "b": "Galería de trabajos y solicitudes de presupuesto cada semana."
      }
    ],
    "outcomes": [
      {
        "t": "Más clientes nuevos.",
        "d": "Gente que no te conocía te encuentra, entiende lo que ofreces y te contacta."
      },
      {
        "t": "Una imagen a la altura de tu negocio.",
        "d": "Transmites la misma calidad que das en persona, antes incluso de que te conozcan."
      },
      {
        "t": "Menos llamadas para preguntar lo mismo.",
        "d": "Horarios, servicios y ubicación resueltos en la web. Las llamadas que recibes son para contratar."
      }
    ],
    "steps": [
      {
        "time": "Semana 1",
        "t": "Entendemos tu negocio",
        "d": "Una reunión para conocer a tus clientes, qué te diferencia y qué quieres conseguir con la web."
      },
      {
        "time": "Semanas 1–2",
        "t": "Estructura y textos",
        "d": "Te presentamos el esquema de páginas y los textos. Lo revisas y lo ajustamos contigo."
      },
      {
        "time": "Semanas 2–4",
        "t": "Diseño y construcción",
        "d": "Diseñamos y montamos la web. Puedes verla avanzar en un enlace privado."
      },
      {
        "time": "Semanas 4–5",
        "t": "Publicación y Google",
        "d": "La publicamos, la damos de alta en Google y te enseñamos a hacer cambios sencillos."
      }
    ],
    "need": [
      "Una hora para contarnos tu negocio",
      "Tu logo y fotos, si las tienes (si no, te orientamos)",
      "Revisar y aprobar en dos momentos clave",
      "Acceso a tu dominio, si ya tienes uno"
    ],
    "get": [
      "Tu web publicada y funcionando",
      "Dominio y accesos a tu nombre",
      "Guía sencilla para cambiar textos y fotos",
      "Informe inicial de tu visibilidad en Google"
    ],
    "faqs": [
      {
        "q": "¿Podré cambiar yo los textos y las fotos?",
        "a": "Sí. Te dejamos un panel sencillo y una guía paso a paso. Para cambios más grandes, estamos a un mensaje."
      },
      {
        "q": "Ya tengo web. ¿Hay que empezar de cero?",
        "a": "No necesariamente. La revisamos primero y te decimos qué merece la pena conservar. Si ya tienes posiciones en Google, las protegemos durante el cambio."
      },
      {
        "q": "¿Cuándo empezaré a aparecer en Google?",
        "a": "Las búsquedas por tu nombre y tu ficha local suelen mejorar en pocas semanas. Posicionar búsquedas más competidas lleva meses y te lo explicamos con honestidad desde el principio."
      },
      {
        "q": "¿Hay que pagar algo cada mes o cada año?",
        "a": "El dominio y el alojamiento de la web tienen un coste anual. Te lo detallamos en el presupuesto para que no haya sorpresas."
      },
      {
        "q": "¿Me escribís vosotros los textos?",
        "a": "Sí, están incluidos. Tú nos cuentas y nosotros lo convertimos en textos claros que venden. Siempre los apruebas antes de publicar."
      },
      {
        "q": "¿Puedo vender online desde la web?",
        "a": "Sí, si tu negocio lo necesita. Lo valoramos en la primera reunión y lo incluimos en el presupuesto como una fase aparte."
      }
    ],
    "ctaTitle": "¿Hablamos de tu nueva web?",
    "placeholder": "A qué te dedicas, si ya tienes web y qué te gustaría conseguir.",
    "home": {
      "summary": "Que quien te busque te encuentre y entienda en diez segundos por qué elegirte. Una web clara, rápida y pensada para que llamen o reserven.",
      "bullets": [
        "Web corporativa y páginas de captación",
        "Aparecer en Google por lo que te interesa",
        "Textos y estructura orientados a la venta"
      ],
      "homeBenefit": "más clientes nuevos."
    }
  },
  {
    "slug": "automatizacion",
    "area": "automatizacion",
    "n": "02",
    "name": "Automatización",
    "teaser": "Respuestas, reservas y seguimiento que funcionan solos, también fuera de horario.",
    "h1": "Tu negocio responde, agenda y hace seguimiento aunque tú no estés.",
    "sub": "Automatizamos las tareas que te roban horas cada semana: contestar lo mismo por WhatsApp, apuntar reservas, recordar citas o perseguir presupuestos.",
    "time": "2 a 4 semanas",
    "price": "desde 690 €",
    "priceNote": "Puesta en marcha desde 690 €, más una cuota de mantenimiento y herramientas desde 49 €/mes. Los mensajes de WhatsApp que cobra Meta van según el uso.",
    "benefit": "horas libres cada semana",
    "before": [
      "WhatsApp lleno de preguntas repetidas",
      "Reservas en libreta y llamadas perdidas",
      "Clientes que no vuelven porque nadie les avisa",
      "Datos repartidos en mil sitios"
    ],
    "after": [
      "Respuesta al momento, de día y de noche",
      "Reservas que se apuntan solas",
      "Recordatorios y seguimiento automáticos",
      "Todos tus clientes en un mismo lugar"
    ],
    "painTitle": "Tu negocio funciona, pero a costa de tu tiempo.",
    "pains": [
      {
        "t": "Contestas lo mismo veinte veces al día.",
        "d": "Horarios, precios, disponibilidad. Cada mensaje te interrumpe y ninguno es para cerrar una venta."
      },
      {
        "t": "Pierdes reservas fuera de horario.",
        "d": "Te escriben a las once de la noche, contestas a la mañana siguiente y ya han reservado en otro sitio."
      },
      {
        "t": "Los presupuestos se quedan en el aire.",
        "d": "Envías el presupuesto y no hay tiempo para hacer seguimiento. Muchos se enfrían sin respuesta."
      }
    ],
    "includes": [
      {
        "t": "Asistente de WhatsApp",
        "d": "Responde a las preguntas habituales con tu tono, a cualquier hora, y pasa la conversación a una persona cuando hace falta."
      },
      {
        "t": "Reservas y citas",
        "d": "Tus clientes eligen día y hora sin llamarte. Todo queda en una agenda que consultas desde el móvil."
      },
      {
        "t": "Recordatorios automáticos",
        "d": "Un aviso antes de cada cita o reserva. Menos ausencias y menos huecos vacíos en la agenda."
      },
      {
        "t": "Ficha de cada cliente",
        "d": "Qué pidió, cuándo vino y cuándo conviene volver a contactarle. Todo en un solo sitio, sin hojas de cálculo."
      },
      {
        "t": "Seguimiento de presupuestos",
        "d": "Mensajes de seguimiento que salen solos en el momento adecuado para que ninguna oportunidad se enfríe."
      },
      {
        "t": "Avisos para tu equipo",
        "d": "Cuando entra una reserva o un cliente importante, la persona adecuada se entera al momento."
      }
    ],
    "sectors": [
      {
        "s": "Restaurantes",
        "a": "Teléfono sonando en pleno servicio para reservar mesa.",
        "b": "Reservas por WhatsApp confirmadas solas, con recordatorio el mismo día."
      },
      {
        "s": "Clínicas, estética y peluquerías",
        "a": "Citas olvidadas y huecos sin cubrir.",
        "b": "Agenda online, recordatorios y lista de espera automática."
      },
      {
        "s": "Inmobiliarias",
        "a": "Interesados sin atender a tiempo.",
        "b": "Respuesta inmediata, datos recogidos y visita agendada."
      },
      {
        "s": "Talleres y servicios técnicos",
        "a": "Llamadas preguntando si ya está listo.",
        "b": "Aviso automático de cada fase y de la recogida."
      }
    ],
    "outcomes": [
      {
        "t": "Menos tiempo perdido.",
        "d": "Las tareas repetitivas desaparecen de tu día y de el de tu equipo. Ese tiempo vuelve al negocio."
      },
      {
        "t": "Ningún cliente sin respuesta.",
        "d": "Quien escribe recibe respuesta en el momento, aunque sea domingo o estés en plena jornada."
      },
      {
        "t": "Más ventas con los mismos clientes.",
        "d": "Recordatorios y seguimiento hacen que vuelvan más y que los presupuestos se cierren."
      }
    ],
    "steps": [
      {
        "time": "Semana 1",
        "t": "Mapa de tareas",
        "d": "Vemos contigo qué se repite cada día y cuánto tiempo te cuesta. Elegimos qué automatizar primero."
      },
      {
        "time": "Semanas 1–2",
        "t": "Diseño del flujo",
        "d": "Te enseñamos, en un esquema sencillo, qué pasará en cada caso. Lo validas antes de montar nada."
      },
      {
        "time": "Semanas 2–4",
        "t": "Montaje y pruebas",
        "d": "Lo construimos y lo probamos con casos reales de tu negocio hasta que responde como tú quieres."
      },
      {
        "time": "Semana 4",
        "t": "Puesta en marcha",
        "d": "Lo activamos, formamos a tu equipo y lo ajustamos durante las primeras semanas de uso."
      }
    ],
    "need": [
      "Las preguntas que más te hacen y cómo las respondes",
      "Tu número de WhatsApp Business o ayuda para crearlo",
      "Cómo gestionas hoy reservas y clientes",
      "Una persona de referencia en tu equipo"
    ],
    "get": [
      "Automatizaciones funcionando en tu negocio",
      "Un panel para ver conversaciones y reservas",
      "Formación para ti y tu equipo",
      "Ajustes incluidos durante el primer mes"
    ],
    "faqs": [
      {
        "q": "¿Mis clientes sabrán que hablan con un asistente?",
        "a": "Sí, siempre de forma transparente. Y en cualquier momento pueden pedir hablar con una persona de tu equipo."
      },
      {
        "q": "¿Tengo que cambiar mi número de teléfono?",
        "a": "Normalmente no. Trabajamos con tu número de WhatsApp Business. Si hace falta algún cambio, te lo explicamos antes."
      },
      {
        "q": "¿Qué pasa si el asistente no sabe responder?",
        "a": "Te pasa la conversación a ti o a quien decidas, con todo el contexto, para que el cliente no tenga que repetir nada."
      },
      {
        "q": "¿Funciona con el programa que ya uso?",
        "a": "En la mayoría de casos sí. Lo revisamos en la primera reunión y, si no es posible, te proponemos la alternativa más sencilla."
      },
      {
        "q": "¿Qué pasa con los datos de mis clientes?",
        "a": "Se tratan cumpliendo la normativa de protección de datos (RGPD) y siguen siendo tuyos en todo momento."
      },
      {
        "q": "¿Tiene algún coste mensual?",
        "a": "Sí: desde 49 €/mes por el mantenimiento y las herramientas, más los mensajes de WhatsApp que cobra Meta según el uso. Te lo detallamos en el presupuesto antes de empezar, sin sorpresas."
      }
    ],
    "ctaTitle": "¿Cuántas horas quieres recuperar cada semana?",
    "placeholder": "Qué tareas te quitan más tiempo y cómo gestionas hoy reservas y mensajes.",
    "home": {
      "summary": "Las tareas que repites cada día pasan a hacerse solas. Tus clientes reciben respuesta al momento, también un domingo por la noche.",
      "bullets": [
        "Atención automática por WhatsApp",
        "Reservas, citas y avisos sin llamadas",
        "Todos tus contactos en un mismo sitio"
      ],
      "homeBenefit": "menos tiempo perdido."
    }
  },
  {
    "slug": "diagnostico",
    "area": "diagnostico",
    "n": "03",
    "name": "Diagnóstico",
    "teaser": "Descubre dónde te conviene invertir y qué puntos débiles proteger antes de gastar.",
    "h1": "Antes de invertir un euro, descubre exactamente dónde te conviene hacerlo.",
    "sub": "Revisamos tu negocio con ojos de fuera: dónde la inteligencia artificial te ahorra tiempo y dinero, y qué puntos débiles pueden ponerte en riesgo. Te lo entregamos por escrito, claro y ordenado por prioridad.",
    "time": "unas 2 semanas",
    "price": "390 €",
    "priceNote": "Precio cerrado. Si después nos encargas lo que recomendamos, te descontamos el diagnóstico.",
    "benefit": "decidir con criterio y menos riesgo",
    "before": [
      "Oyes hablar de IA pero no sabes si es para ti",
      "Proveedores que te quieren vender de todo",
      "Contraseñas y copias de seguridad sin revisar",
      "Decisiones tomadas a ojo"
    ],
    "after": [
      "Un mapa claro de oportunidades",
      "Prioridades ordenadas por impacto",
      "Puntos débiles detectados y cómo cerrarlos",
      "Un plan que puedes ejecutar con quien quieras"
    ],
    "painTitle": "Todos te dicen qué comprar. Nadie te dice qué necesitas.",
    "pains": [
      {
        "t": "Te hablan de IA, pero nadie te dice para qué.",
        "d": "Sabes que puede ayudarte, pero no sabes en qué parte de tu negocio ni si merece la pena."
      },
      {
        "t": "No sabes si estás expuesto.",
        "d": "Un correo suplantado o una web caída pueden costarte clientes y dinero. Y casi nunca avisan."
      },
      {
        "t": "Miedo a gastar en algo que no sirva.",
        "d": "Has visto negocios invertir en herramientas que acabaron sin usar. No quieres ser uno de ellos."
      }
    ],
    "includes": [
      {
        "t": "Entrevista y día a día",
        "d": "Hablamos contigo y con tu equipo y observamos cómo trabajáis para entender dónde se pierde tiempo."
      },
      {
        "t": "Oportunidades con IA",
        "d": "Detectamos las tareas donde la inteligencia artificial te ahorra horas de verdad, con ejemplos concretos."
      },
      {
        "t": "Revisión de seguridad",
        "d": "Comprobamos lo básico que más problemas da: web, correo, contraseñas, accesos y copias de seguridad."
      },
      {
        "t": "Estimación de ahorro",
        "d": "Para cada propuesta, cuánto tiempo o dinero te puede ahorrar y cuánto costaría aplicarla."
      },
      {
        "t": "Informe sin tecnicismos",
        "d": "Un documento claro, ordenado por prioridad, que entiendes sin necesidad de ser técnico."
      },
      {
        "t": "Reunión de presentación",
        "d": "Te lo explicamos en persona o por videollamada y resolvemos todas tus dudas."
      }
    ],
    "sectors": [
      {
        "s": "Negocios que quieren crecer",
        "a": "Más trabajo significa contratar más.",
        "b": "Saber qué tareas se pueden aligerar antes de ampliar plantilla."
      },
      {
        "s": "Clínicas, despachos y asesorías",
        "a": "Datos sensibles de clientes sin revisar.",
        "b": "Riesgos identificados y protegidos con un plan claro."
      },
      {
        "s": "Comercios con venta online",
        "a": "Una web de la que depende tu facturación.",
        "b": "Puntos débiles detectados antes de que fallen."
      },
      {
        "s": "Negocios que ya se llevaron un susto",
        "a": "Un correo hackeado o una web caída.",
        "b": "Entender qué pasó y que no vuelva a ocurrir."
      }
    ],
    "outcomes": [
      {
        "t": "Decidir con criterio.",
        "d": "Sabes qué hacer, en qué orden y por qué. Sin depender de lo que te quiera vender cada proveedor."
      },
      {
        "t": "Menos riesgo.",
        "d": "Los puntos débiles más habituales quedan identificados, con pasos concretos para cerrarlos."
      },
      {
        "t": "Cada euro donde más rinde.",
        "d": "Inviertes primero en lo que más tiempo o dinero te devuelve."
      }
    ],
    "steps": [
      {
        "time": "Día 1",
        "t": "Entrevista",
        "d": "Una o dos horas contigo para entender tu negocio, tus herramientas y lo que te preocupa."
      },
      {
        "time": "Semana 1",
        "t": "Análisis",
        "d": "Revisamos procesos, herramientas y seguridad con los permisos que nos des, sin tocar nada."
      },
      {
        "time": "Semana 2",
        "t": "Informe",
        "d": "Preparamos el documento con oportunidades, riesgos y prioridades, explicado en lenguaje claro."
      },
      {
        "time": "Semana 2",
        "t": "Presentación",
        "d": "Te lo explicamos y te dejamos una hoja de ruta. Tú decides qué hacer y con quién."
      }
    ],
    "need": [
      "Una o dos horas de tu tiempo",
      "Acceso de consulta a tu web y herramientas",
      "La lista de programas que usáis",
      "Una persona de contacto para dudas"
    ],
    "get": [
      "Informe con oportunidades y prioridades",
      "Lista de riesgos ordenada por gravedad",
      "Hoja de ruta para los próximos meses",
      "Reunión para resolver todas tus dudas"
    ],
    "faqs": [
      {
        "q": "¿Estoy obligado a contratar lo que recomendéis?",
        "a": "No. El informe es tuyo y puedes aplicarlo con nosotros, con otro proveedor o por tu cuenta."
      },
      {
        "q": "¿Vais a tocar mis sistemas?",
        "a": "No. Solo revisamos, siempre con tu permiso y sin modificar nada. Cualquier cambio lo decides tú después."
      },
      {
        "q": "¿Tiene sentido para un negocio pequeño?",
        "a": "Sí, y sobre todo para él: con pocos recursos, acertar en qué invertir primero marca la diferencia."
      },
      {
        "q": "¿Qué pasa si encontráis algo grave?",
        "a": "Te avisamos en el momento, sin esperar al informe, y te decimos qué hacer de inmediato."
      },
      {
        "q": "¿Es confidencial?",
        "a": "Totalmente. Firmamos un acuerdo de confidencialidad si lo necesitas y la información solo se usa para tu diagnóstico."
      },
      {
        "q": "¿Necesito saber algo de tecnología?",
        "a": "Nada. Te preguntamos por tu negocio, no por tus sistemas. La parte técnica es cosa nuestra."
      }
    ],
    "ctaTitle": "¿Quieres saber por dónde empezar?",
    "placeholder": "A qué te dedicas, qué herramientas usas y qué te preocupa.",
    "home": {
      "summary": "Antes de invertir, saber. Revisamos tu negocio y te decimos con claridad qué conviene hacer, en qué orden y qué puntos débiles proteger.",
      "bullets": [
        "Dónde te ahorra trabajo la inteligencia artificial",
        "Revisión de la seguridad de tus sistemas",
        "Informe con prioridades, sin tecnicismos"
      ],
      "homeBenefit": "decidir con criterio."
    }
  },
  {
    "slug": "contenido-visual",
    "area": "contenido",
    "n": "04",
    "name": "Contenido visual",
    "teaser": "Vídeos creados a partir de tus fotos para inmuebles, restaurantes y productos.",
    "h1": "Tus fotos convertidas en vídeos que hacen que quieran verlo en persona.",
    "sub": "A partir de las fotografías que ya tienes creamos vídeos que recorren un espacio, lucen un plato o presentan un producto. Sin rodaje, sin equipo de grabación y listos para publicar.",
    "time": "5 a 7 días",
    "price": "desde 120 €/vídeo",
    "priceNote": "Pack de 5 vídeos por 500 €. Antes de encargar nada, te enviamos gratis una muestra de 5 segundos hecha con tus fotos.",
    "benefit": "más visitas y consultas de calidad",
    "before": [
      "Fotos sueltas que nadie mira",
      "Anuncios iguales a los de la competencia",
      "Grabar un vídeo parece caro y lento",
      "Consultas de gente que no encaja"
    ],
    "after": [
      "Vídeos que retienen la atención",
      "Anuncios que destacan en portales y redes",
      "Entrega en días, sin rodaje",
      "Consultas de gente realmente interesada"
    ],
    "painTitle": "Lo que vendes es mejor de lo que parece en tus fotos.",
    "pains": [
      {
        "t": "En un portal, tu anuncio es uno más.",
        "d": "Decenas de pisos, alojamientos o productos con fotos parecidas. El cliente pasa de largo en segundos."
      },
      {
        "t": "Las fotos no transmiten lo que se siente.",
        "d": "La amplitud de un salón, el ambiente de una sala o el detalle de un producto se pierden en una imagen fija."
      },
      {
        "t": "Rodar un vídeo no te compensa.",
        "d": "Coordinar grabación, equipo y edición cuesta tiempo y dinero que no siempre tienes."
      }
    ],
    "includes": [
      {
        "t": "Recorridos de inmuebles",
        "d": "Un paseo por la vivienda o el local que ayuda a imaginarse dentro antes de pedir visita."
      },
      {
        "t": "Alojamientos turísticos",
        "d": "Vídeos que muestran habitaciones, zonas comunes y entorno para destacar en plataformas de reserva."
      },
      {
        "t": "Restaurantes y cafeterías",
        "d": "Platos, sala y ambiente en movimiento para tu web, tu ficha de Google y tus redes."
      },
      {
        "t": "Cualquier producto",
        "d": "Presentaciones de producto para tiendas y marcas: detalles, usos y variantes en pocos segundos."
      },
      {
        "t": "Formato para cada canal",
        "d": "Vertical para redes sociales y horizontal para web y portales, listos para subir."
      },
      {
        "t": "Acabado profesional",
        "d": "Textos en pantalla, tu logo y música con licencia de uso comercial incluidos."
      }
    ],
    "sectors": [
      {
        "s": "Inmobiliarias",
        "a": "Visitas de curiosos que no encajan con el inmueble.",
        "b": "Interesados que ya han visto el recorrido y llegan decididos."
      },
      {
        "s": "Alojamientos turísticos",
        "a": "Un anuncio más entre cientos.",
        "b": "Un vídeo que destaca y transmite la experiencia."
      },
      {
        "s": "Restaurantes",
        "a": "Fotos de la carta que no abren el apetito.",
        "b": "Platos y ambiente que invitan a reservar."
      },
      {
        "s": "Tiendas y marcas",
        "a": "Productos que se entienden a medias.",
        "b": "Vídeos que enseñan el producto como en la mano."
      }
    ],
    "outcomes": [
      {
        "t": "Más visitas de calidad.",
        "d": "Quien te contacta ya ha visto lo que ofreces y viene con interés real."
      },
      {
        "t": "Destacas frente a la competencia.",
        "d": "El vídeo capta la atención donde todos los demás solo tienen fotos."
      },
      {
        "t": "Publicas más rápido.",
        "d": "De las fotos al vídeo en días, sin organizar ninguna grabación."
      }
    ],
    "steps": [
      {
        "time": "Día 1",
        "t": "Nos envías las fotos",
        "d": "Nos mandas las imágenes y los datos clave. Si hace falta, te orientamos para mejorarlas."
      },
      {
        "time": "Días 1–2",
        "t": "Guion",
        "d": "Decidimos el orden, el ritmo y los textos que acompañarán al vídeo."
      },
      {
        "time": "Días 2–5",
        "t": "Montaje",
        "d": "Creamos el vídeo con movimiento, textos, música y tu marca."
      },
      {
        "time": "Días 5–7",
        "t": "Entrega y ajustes",
        "d": "Te lo entregamos en todos los formatos. Si quieres algún cambio, lo ajustamos."
      }
    ],
    "need": [
      "Fotos en buena resolución (te decimos cómo hacerlas con el móvil)",
      "Los datos clave: metros, precio, platos o características",
      "Tu logo",
      "Dónde vas a publicarlo"
    ],
    "get": [
      "El vídeo final en los formatos que necesitas",
      "Una versión corta para redes sociales",
      "Una ronda de cambios incluida",
      "Derechos de uso para tus canales"
    ],
    "faqs": [
      {
        "q": "¿Puedo ver cómo quedaría antes de pagar?",
        "a": "Sí. Nos mandas unas fotos y te enviamos gratis una muestra de 5 segundos. Si te convence, hacemos el vídeo completo."
      },
      {
        "q": "¿Sirven fotos hechas con el móvil?",
        "a": "Sí, si tienen buena luz y resolución. Antes de empezar te enviamos unas pautas sencillas para sacarles el máximo partido."
      },
      {
        "q": "¿Cuántas fotos necesitáis?",
        "a": "Depende de lo que queramos contar. Para un inmueble suelen bastar entre 10 y 20; para un plato o un producto, menos. Te lo indicamos en cada caso."
      },
      {
        "q": "¿Puedo usar el vídeo en portales y redes sociales?",
        "a": "Sí. Lo entregamos en los formatos adecuados para portales inmobiliarios, plataformas de alojamiento, tu web y redes sociales."
      },
      {
        "q": "¿Hacéis también las fotografías?",
        "a": "Consúltanos. Según tu zona y el tipo de proyecto podemos orientarte o coordinarlo, y se presupuesta aparte."
      },
      {
        "q": "¿Tenéis opciones para varios inmuebles o productos?",
        "a": "Sí. Si trabajas con volumen, preparamos un presupuesto por paquete con un estilo común para todos tus vídeos."
      },
      {
        "q": "¿Puedo pedir cambios?",
        "a": "Sí, una ronda de cambios está incluida. Si necesitas más, te lo indicamos antes de hacerlos."
      }
    ],
    "ctaTitle": "¿Qué te gustaría convertir en vídeo?",
    "placeholder": "Qué quieres mostrar (inmueble, alojamiento, restaurante o producto), cuántos vídeos y dónde los publicarás.",
    "home": {
      "summary": "Convertimos tus fotografías en vídeos que enseñan lo que vendes. Un espacio, un plato o un producto se entiende mejor en treinta segundos que en veinte fotos.",
      "bullets": [
        "Vídeo a partir de tus fotos, sin rodaje",
        "Inmuebles, alojamientos, restaurantes y cualquier producto",
        "Formatos listos para web, portales y redes"
      ],
      "homeBenefit": "más visitas de calidad."
    }
  }
];

export const commitments: { t: string; d: string }[] = [
  {
    "t": "Presupuesto cerrado",
    "d": "Sabes lo que pagas antes de empezar. Si algo cambia, lo hablamos primero."
  },
  {
    "t": "Todo es tuyo",
    "d": "Accesos, contenidos y datos a tu nombre desde el primer día."
  },
  {
    "t": "Lenguaje claro",
    "d": "Te explicamos cada decisión sin tecnicismos. Si no se entiende, es culpa nuestra."
  },
  {
    "t": "Acompañamiento",
    "d": "Te formamos para usarlo y seguimos a tu lado después de la entrega."
  }
];

export const DEFAULT_SERVICE: ServiceSlug = "presencia-digital";

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
