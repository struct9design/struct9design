export interface BlogSection {
  heading?: string
  content: string
}

export interface Article {
  slug: string
  title: string
  /** Título para Google si `title` es demasiado largo (~50 caracteres, sin contar " · struct9"). */
  seoTitle?: string
  excerpt: string
  /** Meta description si `excerpt` supera los ~160 caracteres. */
  metaDescription?: string
  date: string
  readTime: number
  category: string
  sections: BlogSection[]
}

export const articles: Article[] = [
  {
    slug: 'videos-inmobiliaria-a-partir-de-fotos',
    title: 'Vídeos para inmobiliarias a partir de fotos: cómo destacar tus pisos sin grabar',
    seoTitle: 'Vídeos para inmobiliarias hechos con fotos',
    metaDescription: 'Convierte las fotos de tus pisos en vídeos que destacan en los portales y filtran visitas, sin grabar nada. Cómo funciona y cómo pedir una muestra gratis.',
    excerpt: 'En un portal inmobiliario, tu anuncio compite con decenas de pisos con fotos parecidas. Un vídeo hecho con las fotos que ya tienes ayuda a que se detengan en el tuyo y a que quien pide visita llegue con interés real. Te contamos cómo funciona.',
    date: '2026-09-24',
    readTime: 6,
    category: 'Contenido visual',
    sections: [
      {
        content: 'Quien busca piso pasa por decenas de anuncios en pocos minutos. Casi todos tienen lo mismo: una foto del salón, otra de la cocina, otra del baño. Si tu anuncio no llama la atención en esos segundos, el interesado sigue bajando, aunque tu inmueble sea justo lo que busca.\n\nEl vídeo cambia eso. Un recorrido en movimiento transmite la amplitud, la luz y la distribución de una forma que las fotos sueltas no consiguen. El problema es que grabar cada inmueble cuesta tiempo y dinero. Por eso hacemos los vídeos a partir de las fotos que ya tienes.',
      },
      {
        heading: 'Qué es un vídeo a partir de fotos',
        content: 'Tomamos las fotografías del inmueble y las convertimos en un vídeo con movimiento: recorridos suaves por cada estancia, transiciones de una habitación a otra, textos con los datos clave (metros, habitaciones, precio, zona), tu logo y música con licencia para uso comercial.\n\nEl resultado se ve como un paseo por la vivienda, pero sin organizar ninguna grabación: no hace falta volver al piso, coordinar al propietario ni contratar a un equipo.',
      },
      {
        heading: 'Por qué ayuda a vender o alquilar',
        content: 'Destaca entre anuncios iguales. En un listado lleno de fotos parecidas, un vídeo llama la atención y hace que el interesado se quede más tiempo en tu anuncio.\n\nSe entiende la distribución. Ver cómo se pasa del salón a la cocina o qué hay al final del pasillo resuelve dudas que las fotos dejan abiertas.\n\nFiltra las visitas. Quien pide visita después de ver el recorrido ya sabe cómo es el inmueble. Llegan menos curiosos y más personas que de verdad encajan, y eso ahorra desplazamientos y horas a tu equipo.\n\nSirve en todas partes. El mismo vídeo funciona en los portales, en tu web, en tu ficha de Google y en redes sociales, donde el formato vertical es el que más se ve.\n\nTambién te ayuda a captar. Enseñar a un propietario cómo presentarás su inmueble, con vídeo incluido, es un argumento más para que te confíe la venta.',
      },
      {
        heading: 'Cómo trabajamos, paso a paso',
        content: '1. Nos envías las fotos y los datos clave del inmueble. Para una vivienda suelen bastar entre 10 y 20 fotos.\n\n2. Preparamos el guion: el orden del recorrido, el ritmo y los textos que aparecerán.\n\n3. Montamos el vídeo con movimiento, textos, música y tu marca.\n\n4. Te lo entregamos en formato horizontal para portales y web, y en vertical para redes. Incluye una ronda de cambios.\n\nTodo el proceso lleva entre 5 y 7 días.',
      },
      {
        heading: 'Fiel al inmueble, siempre',
        content: 'Un vídeo que embellece de más acaba en visitas decepcionadas. Por eso trabajamos solo con lo que aparece en tus fotos: no añadimos estancias, muebles ni vistas que no existen, ni cambiamos cómo es el inmueble. El movimiento y el montaje sirven para enseñarlo mejor, no para enseñar otra cosa.',
      },
      {
        heading: 'Cómo sacar buenas fotos con el móvil',
        content: 'No hacen falta fotos profesionales, pero sí unas pautas básicas:\n\n— Haz las fotos de día, con persianas subidas y todas las luces encendidas.\n\n— Ordena y despeja: fuera objetos personales, cables y cosas en las encimeras.\n\n— Sujeta el móvil en horizontal y a la altura del pecho, sin inclinarlo hacia arriba ni hacia abajo.\n\n— Dispara desde las esquinas para que se vea la estancia entera.\n\n— Haz varias fotos de cada espacio: nos da más opciones para el recorrido.\n\nAntes de empezar te enviamos estas pautas por escrito para que cualquiera de tu equipo pueda hacerlo.',
      },
      {
        heading: 'Presupuesto y muestra gratis',
        content: 'Cada encargo se presupuesta según el número de vídeos: si trabajas con varios inmuebles, cada vídeo sale más barato y todos mantienen el mismo estilo, así tus anuncios se reconocen de un vistazo.\n\nY antes de encargar nada, puedes verlo con tus propios inmuebles: mándanos unas fotos y te enviamos gratis una muestra de 5 segundos. Si te convence, hacemos el vídeo completo.',
      },
      {
        heading: 'No solo para inmobiliarias',
        content: 'Lo mismo funciona para alojamientos turísticos que quieren destacar en las plataformas de reserva, para restaurantes que quieren enseñar sus platos y su sala, y para tiendas que quieren presentar un producto. Si tienes buenas fotos de lo que vendes, podemos convertirlas en vídeo.\n\n¿Quieres ver cómo quedaría uno de tus inmuebles? Escríbenos con unas fotos y te preparamos la muestra.',
      },
    ],
  },
  {
    slug: 'responder-contactos-inmobiliaria',
    title: 'Cómo responder al momento a los contactos de tu inmobiliaria (y no perder visitas)',
    seoTitle: 'Responder al momento a los contactos inmobiliarios',
    metaDescription: 'Los contactos de los portales se enfrían en horas. Cómo recogerlos en un solo sitio, responder al momento y agendar la visita sin estar pegado al móvil.',
    excerpt: 'Quien pregunta por un piso suele escribir a varias inmobiliarias a la vez, y la primera que responde se lleva la visita. Te contamos cómo responder al momento sin estar pegado al móvil, qué necesitas y qué errores evitar.',
    date: '2026-10-20',
    readTime: 5,
    category: 'Automatización',
    sections: [
      {
        content: 'Un domingo por la tarde, alguien ve uno de tus pisos en un portal y pide información. Ese mismo rato escribe también por otros tres pisos parecidos, de otras inmobiliarias. El lunes a media mañana, cuando por fin le respondes, ya tiene visitas cerradas con quien contestó antes.\n\nNo es falta de interés ni de trabajo: es que los contactos llegan cuando estás enseñando un piso, conduciendo o fuera de horario. Automatizar la primera respuesta resuelve justo eso, sin cambiar cómo trabajas el resto del día.',
      },
      {
        heading: 'Por qué la velocidad importa tanto',
        content: 'Quien busca piso compara muchas opciones a la vez y se queda con las que le dan respuesta rápida y clara. Un contacto recién llegado está caliente; al cabo de unas horas ya ha hablado con otros y tu piso compite en desventaja.\n\nResponder en minutos, aunque sea con un primer mensaje, te pone por delante. Y si en ese mensaje ya le ofreces horas para visitar el piso, mejor todavía.',
      },
      {
        heading: 'Cómo funciona, paso a paso',
        content: '1. Llega un contacto desde un portal, tu web, el correo o Instagram.\n\n2. Se guarda solo en un único sitio, con el piso por el que pregunta, su nombre, teléfono y mensaje. Nada de copiar y pegar.\n\n3. Recibe al momento una respuesta por correo con lo básico del piso y un enlace para elegir día y hora de visita.\n\n4. Tu equipo recibe un aviso en el móvil para llamarle cuando pueda, con todo el contexto delante.\n\n5. Si en 24 horas nadie le ha atendido, el sistema te lo recuerda. Y si visita el piso y no se decide, se le hace seguimiento unos días después.',
      },
      {
        heading: 'Qué necesitas para empezar',
        content: 'Saber por dónde te llegan hoy los contactos: portales, web, correo, redes. Casi siempre se pueden recoger todos en el mismo sitio.\n\nUn lugar donde ver a todos tus clientes. Puede ser el programa que ya usas o una herramienta sencilla que se monta para ti.\n\nTu agenda de visitas, para que el cliente solo pueda elegir horas en las que de verdad puedes ir.\n\nLos textos de respuesta: qué le dices a quien pregunta por un piso, en tu tono. Los preparamos contigo.',
      },
      {
        heading: 'Errores que conviene evitar',
        content: 'Respuestas automáticas frías o genéricas. El primer mensaje tiene que sonar a tu inmobiliaria y dar algo útil: datos del piso, horas de visita, a quién llamar.\n\nTener los contactos repartidos. Si unos están en el correo, otros en el móvil y otros en el portal, alguno se perderá. Todo a un único sitio.\n\nMeter bots no oficiales en tu WhatsApp. Meta puede bloquear el número si una conexión no cumple sus normas, y perder el número de siempre es mucho peor que tardar un poco en contestar.\n\nOlvidar los datos personales. Nombres, teléfonos y correos están protegidos por el RGPD: hay que informar de para qué se usan y guardarlos con seguridad.',
      },
      {
        heading: '¿Merece la pena para una inmobiliaria pequeña?',
        content: 'Depende de cuántos contactos recibes y de cuántos se te escapan. Una forma sencilla de saberlo: durante dos semanas, apunta cuántos contactos llegan, cuánto tardas en responder y cuántos acaban en visita. Si muchos llegan fuera de horario o tardas más de unas horas en contestar, la automatización suele compensar pronto: cada visita que no se pierde cuenta.',
      },
      {
        heading: 'En resumen',
        content: 'Automatizar la primera respuesta no es poner un robot a hablar con tus clientes, sino conseguir que ninguno se quede sin respuesta mientras tú enseñas pisos. Tus clientes reciben atención al momento y tú llamas con todo el contexto delante.\n\nEn struct9 montamos este tipo de sistemas para inmobiliarias y otros negocios que viven de los contactos. Si quieres ver cómo encajaría en el tuyo, escríbenos y lo vemos juntos.',
      },
    ],
  },
]

export function getArticle(slug: string): Article | undefined {
  return articles.find(a => a.slug === slug)
}
