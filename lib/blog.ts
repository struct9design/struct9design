export interface BlogSection {
  heading?: string
  content: string
}

export interface Article {
  slug: string
  title: string
  excerpt: string
  date: string
  readTime: number
  category: string
  sections: BlogSection[]
}

export const articles: Article[] = [
  {
    slug: 'videos-inmobiliaria-a-partir-de-fotos',
    title: 'Vídeos para inmobiliarias a partir de fotos: cómo destacar tus pisos sin grabar',
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
        heading: 'Precio y muestra gratis',
        content: 'Cada vídeo cuesta desde 120 €. Si trabajas con varios inmuebles, el pack de 5 vídeos sale por 500 € y todos mantienen el mismo estilo, así tus anuncios se reconocen de un vistazo.\n\nY antes de encargar nada, puedes verlo con tus propios inmuebles: mándanos unas fotos y te enviamos gratis una muestra de 5 segundos. Si te convence, hacemos el vídeo completo.',
      },
      {
        heading: 'No solo para inmobiliarias',
        content: 'Lo mismo funciona para alojamientos turísticos que quieren destacar en las plataformas de reserva, para restaurantes que quieren enseñar sus platos y su sala, y para tiendas que quieren presentar un producto. Si tienes buenas fotos de lo que vendes, podemos convertirlas en vídeo.\n\n¿Quieres ver cómo quedaría uno de tus inmuebles? Escríbenos con unas fotos y te preparamos la muestra.',
      },
    ],
  },
  {
    slug: 'reservas-whatsapp-restaurante',
    title: 'Cómo automatizar las reservas por WhatsApp en un restaurante',
    excerpt: 'Si tus clientes ya te escriben por WhatsApp para reservar, no hace falta que les obligues a llamar ni a descargarse nada. Te contamos cómo funciona una reserva automática, qué necesitas y qué errores evitar.',
    date: '2026-09-24',
    readTime: 6,
    category: 'Automatización',
    sections: [
      {
        content: 'Es viernes a las nueve de la noche, la sala está llena y el teléfono no para de sonar. Quien atiende deja una mesa a medias para apuntar una reserva en la libreta, y los mensajes de WhatsApp que llegan mientras tanto se quedan sin contestar hasta el día siguiente. Para entonces, parte de esa gente ya ha reservado en otro sitio.\n\nNo es un problema de organización: es que las reservas llegan justo cuando menos tiempo tienes para atenderlas. Automatizarlas por WhatsApp resuelve precisamente eso, sin cambiar la forma en que tus clientes ya se comunican contigo.',
      },
      {
        heading: 'Por qué WhatsApp y no una app o un formulario',
        content: 'En España casi todo el mundo usa WhatsApp a diario y está acostumbrado a escribir a los negocios por ahí. Pedirle a un cliente que descargue una app o que rellene un formulario largo es ponerle una barrera; escribirte un mensaje, no.\n\nAdemás, WhatsApp te permite hacer algo que una llamada no: responder al momento, a cualquier hora, sin que nadie de tu equipo tenga que dejar lo que está haciendo.',
      },
      {
        heading: 'Cómo funciona una reserva automática, paso a paso',
        content: '1. El cliente escribe, por ejemplo: "¿Tenéis mesa para cuatro el sábado a las nueve?".\n\n2. El asistente entiende la petición, consulta la disponibilidad real de tu agenda de reservas y responde con las opciones: "Tenemos mesa a las 21:00 o a las 21:30, ¿cuál prefieres?".\n\n3. El cliente elige, deja su nombre y, si hace falta, algún detalle (una trona, una alergia, una celebración).\n\n4. La reserva queda apuntada en la agenda, el cliente recibe la confirmación y tu equipo la ve al instante desde el móvil o el ordenador.\n\n5. Unas horas antes, el cliente recibe un recordatorio con la opción de confirmar o cancelar. Si cancela, la mesa vuelve a quedar libre.\n\nSi alguien pregunta algo que el asistente no sabe resolver, como un menú especial para un grupo grande, la conversación pasa a una persona de tu equipo con todo lo hablado hasta ese momento.',
      },
      {
        heading: 'Qué necesitas para empezar',
        content: 'Un número con WhatsApp Business. Puede ser el que ya usas; no hace falta cambiar de número ni avisar a tus clientes.\n\nUna agenda de reservas. Si ya usas un programa de reservas, lo normal es conectarlo; si todo está en papel, se monta una agenda digital sencilla que puedes consultar desde el móvil.\n\nTus reglas del día a día: horarios, turnos, cuántas mesas y de qué tamaño, con cuánta antelación se puede reservar y qué haces con los grupos grandes.\n\nLas preguntas que más te hacen: si hay terraza, si se admiten perros, si tenéis opciones sin gluten, dónde aparcar. El asistente las responde también, y eso ya quita muchos mensajes.',
      },
      {
        heading: 'Errores que conviene evitar',
        content: 'Esconder que es un asistente. El cliente debe saber que habla con un sistema automático y poder pedir una persona en cualquier momento. Es más honesto y genera más confianza.\n\nDejar la disponibilidad desactualizada. Si las reservas por teléfono o las que llegan de otras plataformas no pasan por la misma agenda, acabarás con mesas dobles. Todo tiene que ir a un único sitio.\n\nQuerer automatizarlo todo desde el primer día. Empieza por lo que más se repite, que casi siempre son las reservas y las preguntas habituales, y amplía cuando veas que funciona.\n\nOlvidar los datos personales. Nombres y teléfonos de clientes son datos protegidos por el RGPD: hay que informar de para qué se usan y guardarlos con seguridad.',
      },
      {
        heading: '¿Merece la pena para un restaurante pequeño?',
        content: 'Depende de cuántas reservas y mensajes recibes. Si son pocos a la semana, probablemente te basta con las respuestas rápidas gratuitas de WhatsApp Business. Si el teléfono y el WhatsApp te interrumpen varias veces por servicio, o notas que pierdes reservas por no contestar a tiempo, la automatización suele compensar pronto: cada mesa que no se pierde y cada ausencia que se evita con un recordatorio cuenta.\n\nUna forma sencilla de saberlo: durante una semana, apunta cuántas reservas y preguntas te llegan y cuántas contestas tarde. Con ese número delante, la decisión es mucho más fácil.',
      },
      {
        heading: 'En resumen',
        content: 'Automatizar las reservas por WhatsApp no consiste en poner un robot a hablar con tus clientes, sino en que ninguna reserva se quede sin respuesta mientras tú atiendes la sala. Tus clientes siguen escribiendo donde ya escriben, y tú recuperas el control de la agenda.\n\nEn struct9 montamos este tipo de sistemas para restaurantes y otros negocios con citas o reservas. Si quieres ver cómo encajaría en el tuyo, escríbenos y lo vemos juntos.',
      },
    ],
  },
]

export function getArticle(slug: string): Article | undefined {
  return articles.find(a => a.slug === slug)
}
