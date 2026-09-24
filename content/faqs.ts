export type Faq = { q: string; a: string };

/** Preguntas frecuentes de la home. Las de cada servicio están en services.ts. */
export const homeFaqs: Faq[] = [
  {
    q: "¿Cuánto cuesta?",
    a: "Como orientación: una web completa desde 890 €, una automatización desde 690 € (más una cuota desde 49 €/mes), el diagnóstico 390 € y los vídeos desde 120 € cada uno. Como ninguna panadería necesita lo mismo que una inmobiliaria, tras la primera conversación recibes un presupuesto cerrado con el alcance, el plazo y el precio por escrito. Sin letra pequeña.",
  },
  {
    q: "No entiendo de tecnología. ¿Es un problema?",
    a: "Al contrario: es lo habitual entre nuestros clientes. Tú conoces tu negocio y nosotros la parte digital. Te explicamos todo en lenguaje normal y solo te pedimos decisiones que tú puedes tomar.",
  },
  {
    q: "¿Tengo que cambiar cómo trabajo ahora?",
    a: "Lo mínimo imprescindible. Partimos de lo que ya te funciona y ordenamos alrededor. Si hay que cambiar algo, lo hacemos por fases y te formamos antes de ponerlo en marcha.",
  },
  {
    q: "¿Cuánto se tarda?",
    a: "Una web sencilla suele estar lista entre tres y cinco semanas. Una automatización, entre dos y cuatro. En la propuesta verás las fechas concretas de cada fase.",
  },
  {
    q: "¿Puedo empezar por algo pequeño?",
    a: "Sí, y es lo que recomendamos: empezar por lo que más te aprieta, comprobar resultados y crecer desde ahí. Todo lo que montamos está pensado para ampliarse después sin rehacerlo.",
  },
  {
    q: "¿Qué pasa cuando termina el proyecto?",
    a: "Lo que construimos es tuyo, con sus accesos y su documentación. Si quieres, seguimos con mantenimiento y mejoras; si no, te queda todo en orden y funcionando.",
  },
];
