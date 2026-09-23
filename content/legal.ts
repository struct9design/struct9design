/**
 * Documentos legales (base literal de Legal.dc.html, ampliada para Google Analytics,
 * el píxel de Meta y los proveedores concretos).
 *
 * Formato de cada párrafo:
 *  - "• " al principio  → viñeta
 *  - *texto*            → negrita
 *  - {campo}            → dato de content/site.ts (titular, dni, domicilio, email, telefono)
 * Si un párrafo usa un campo vacío, el párrafo entero no se muestra.
 * `when` → el párrafo solo se muestra si se cumple la condición:
 *   provisional  site.documentoProvisional activo
 *   tracking     hay alguna herramienta de medición (GA o Meta)
 *   noTracking   no hay ninguna
 *   ga / meta    Google Analytics / píxel de Meta configurado
 *   noMeta       hay medición, pero sin píxel de Meta
 */
export type LegalSlug = "aviso-legal" | "privacidad" | "cookies";

export type LegalCondition = "provisional" | "tracking" | "noTracking" | "ga" | "meta" | "noMeta";

export type LegalPara = string | { text: string; when: LegalCondition };

export type LegalDoc = {
  slug: LegalSlug;
  label: string;
  title: string;
  description: string;
  sections: { title: string; paras: LegalPara[] }[];
};

export const legalDocs: LegalDoc[] = [
  {
    slug: "aviso-legal",
    label: "Aviso legal",
    title: "Aviso legal",
    description: "Datos del titular y condiciones de uso del sitio web de struct9.",
    sections: [
      {
        title: "Titular del sitio web",
        paras: [
          "En cumplimiento de la Ley 34/2002, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI), te informamos de los datos del titular de este sitio web:",
          "• *Titular:* {titular}",
          "• *DNI/NIF:* {dni}",
          "• *Domicilio:* {domicilio}",
          "• *Correo electrónico:* {email}",
          "• *Nombre comercial:* struct9",
          {
            text: "struct9 se encuentra en fase de puesta en marcha. Cuando la actividad quede dada de alta, este apartado se actualizará con los datos fiscales y registrales correspondientes.",
            when: "provisional",
          },
        ],
      },
      {
        title: "Objeto",
        paras: [
          "Este sitio web ofrece información sobre los servicios de digitalización de struct9: presencia digital, automatización, diagnóstico y contenido visual.",
          "Acceder y navegar por la web te otorga la condición de usuario e implica la aceptación de este aviso legal.",
        ],
      },
      {
        title: "Condiciones de uso",
        paras: [
          "Te comprometes a utilizar la web y sus contenidos de forma lícita y respetuosa, y a no emplearlos para actividades contrarias a la ley, a la buena fe o al orden público.",
          "No está permitido introducir virus, intentar acceder a zonas restringidas ni realizar acciones que puedan dañar el funcionamiento de la web.",
        ],
      },
      {
        title: "Propiedad intelectual e industrial",
        paras: [
          "El nombre y el logotipo de struct9, así como los textos, diseños, gráficos y el código de esta web, pertenecen a su titular o se usan con autorización.",
          "No está permitida su reproducción, distribución o transformación sin autorización previa por escrito.",
        ],
      },
      {
        title: "Presupuestos y contratación",
        paras: [
          "La información de esta web tiene carácter orientativo y no constituye una oferta vinculante.",
          "Cada servicio se contrata mediante un presupuesto personalizado y por escrito, que recoge el alcance, los plazos, el precio y las condiciones aplicables.",
        ],
      },
      {
        title: "Responsabilidad",
        paras: [
          "Trabajamos para que la información sea correcta y esté actualizada, pero no podemos garantizar la ausencia total de errores ni de interrupciones del servicio.",
          "Esta web puede incluir enlaces a sitios de terceros. No somos responsables de sus contenidos ni de sus políticas.",
        ],
      },
      {
        title: "Legislación aplicable",
        paras: [
          "Este aviso legal se rige por la legislación española. Para cualquier controversia, las partes se someten a los juzgados y tribunales que correspondan conforme a la normativa aplicable.",
        ],
      },
    ],
  },
  {
    slug: "privacidad",
    label: "Política de privacidad",
    title: "Política de privacidad",
    description: "Cómo trata struct9 los datos que nos envías a través del formulario de contacto.",
    sections: [
      {
        title: "Responsable del tratamiento",
        paras: [
          "• *Responsable:* {titular}",
          "• *DNI/NIF:* {dni}",
          "• *Domicilio:* {domicilio}",
          "• *Contacto:* {email}",
          "Tratamos tus datos conforme al Reglamento General de Protección de Datos (RGPD) y a la Ley Orgánica 3/2018 de Protección de Datos Personales (LOPDGDD).",
        ],
      },
      {
        title: "Qué datos recogemos",
        paras: [
          "Cuando rellenas el formulario de contacto recogemos:",
          "• Nombre y apellidos",
          "• Nombre de tu negocio",
          "• Correo electrónico",
          "• Teléfono, si decides indicarlo",
          "• El área que te interesa y el mensaje que nos escribes",
          "No te pedimos datos especialmente sensibles. Te rogamos que no los incluyas en el mensaje.",
        ],
      },
      {
        title: "Para qué los usamos",
        paras: [
          "Usamos tus datos únicamente para responder a tu consulta, preparar tu presupuesto y, si lo solicitas, prestarte el servicio.",
          "No te enviaremos comunicaciones comerciales salvo que nos lo pidas expresamente.",
        ],
      },
      {
        title: "Base legal",
        paras: [
          "• *Tu consentimiento*, que nos das al marcar la casilla del formulario.",
          "• *La aplicación de medidas precontractuales* a petición tuya, como preparar un presupuesto.",
          {
            text: "• *Tu consentimiento en el aviso de cookies*, para la analítica y la publicidad. Puedes retirarlo cuando quieras desde «Configurar cookies».",
            when: "tracking",
          },
        ],
      },
      {
        title: "Cuánto tiempo los guardamos",
        paras: [
          "Conservamos tus datos el tiempo necesario para atender tu solicitud. Si no llegamos a trabajar juntos, los eliminamos en un plazo máximo de 12 meses.",
          "Si te convertimos en cliente, los conservaremos durante la relación y los plazos legales que correspondan.",
        ],
      },
      {
        title: "Con quién los compartimos",
        paras: [
          "No vendemos ni cedemos tus datos a terceros.",
          "Algunos proveedores nos ayudan a prestar el servicio y acceden a los datos solo para ese fin, como encargados del tratamiento y con las garantías que exige la ley:",
          "• *Vercel Inc.* · Alojamiento de la web",
          "• *Google (Google Workspace)* · Correo electrónico",
          "• *Supabase* · Base de datos donde guardamos las solicitudes de contacto",
          "• *Resend* · Envío de los mensajes del formulario de contacto",
          "• *Stripe* · Cobro de los servicios contratados, si pagas con tarjeta",
          "Algunos de estos proveedores pueden tratar datos fuera del Espacio Económico Europeo, principalmente en Estados Unidos. En ese caso lo hacen con las garantías adecuadas previstas en el RGPD: el Marco de Privacidad de Datos UE-EE. UU. o cláusulas contractuales tipo aprobadas por la Comisión Europea.",
        ],
      },
      {
        title: "Cookies y medición",
        paras: [
          {
            text: "Si aceptas las cookies opcionales, se recogen datos de tu navegación en esta web (páginas que visitas, dispositivo, navegador e identificadores de las cookies). Tienes el detalle en la política de cookies.",
            when: "tracking",
          },
          {
            text: "• *Google Analytics* (Google Ireland Ltd.): estadísticas de uso de la web, solo si aceptas las cookies de análisis.",
            when: "ga",
          },
          {
            text: "• *Píxel de Meta* (Meta Platforms Ireland Ltd.): medición de nuestros anuncios en Facebook e Instagram, solo si aceptas las cookies publicitarias.",
            when: "meta",
          },
          {
            text: "En el caso del píxel de Meta, somos corresponsables con Meta Platforms Ireland Ltd. de la recogida de esos datos en nuestra web y de su envío a Meta. Lo que Meta haga después con ellos se rige por su propia política de privacidad (facebook.com/privacy/policy).",
            when: "meta",
          },
          {
            text: "Google y Meta pueden tratar estos datos en Estados Unidos; ambas empresas están adheridas al Marco de Privacidad de Datos UE-EE. UU.",
            when: "tracking",
          },
          {
            text: "Ahora mismo esta web no utiliza herramientas de analítica ni de publicidad.",
            when: "noTracking",
          },
        ],
      },
      {
        title: "Tus derechos",
        paras: [
          "Puedes ejercer en cualquier momento tus derechos de acceso, rectificación, supresión, oposición, limitación del tratamiento y portabilidad, así como retirar tu consentimiento.",
          "Para hacerlo, escríbenos a {email} indicando qué derecho quieres ejercer.",
          "Si consideras que no hemos tratado tus datos correctamente, puedes presentar una reclamación ante la Agencia Española de Protección de Datos (aepd.es).",
        ],
      },
      {
        title: "Seguridad",
        paras: [
          "Aplicamos medidas técnicas y organizativas razonables para proteger tus datos frente a accesos no autorizados, pérdida o alteración.",
        ],
      },
    ],
  },
  {
    slug: "cookies",
    label: "Política de cookies",
    title: "Política de cookies",
    description: "Qué cookies usa la web de struct9 y cómo puedes gestionarlas.",
    sections: [
      {
        title: "Qué son las cookies",
        paras: [
          "Las cookies son pequeños archivos que una web guarda en tu navegador para recordar información sobre tu visita, como tus preferencias.",
        ],
      },
      {
        title: "Qué cookies usamos",
        paras: [
          {
            text: "Ahora mismo esta web no instala cookies de análisis ni publicitarias, así que no necesitamos pedirte consentimiento.",
            when: "noTracking",
          },
          {
            text: "*Necesarias* (siempre activas). Permiten que la web funcione y recuerdan tu elección sobre cookies.",
            when: "tracking",
          },
          { text: "• *s9-consent* · Propia · Guarda tus preferencias de cookies · 12 meses", when: "tracking" },
          {
            text: "*De análisis* (solo si las aceptas). Nos ayudan a saber qué páginas son útiles, de forma agregada.",
            when: "ga",
          },
          { text: "• *_ga* · Google Analytics (tercero) · Distingue a los visitantes · 2 años", when: "ga" },
          { text: "• *_ga_…* · Google Analytics (tercero) · Mantiene el estado de la visita · 2 años", when: "ga" },
          {
            text: "*Publicitarias* (solo si las aceptas). Nos permiten medir si nuestros anuncios en Facebook e Instagram funcionan y mostrarlos a personas que ya conocen la web.",
            when: "meta",
          },
          { text: "• *_fbp* · Píxel de Meta (tercero) · Identifica el navegador para medir los anuncios · 3 meses", when: "meta" },
          { text: "• *_fbc* · Píxel de Meta (tercero) · Guarda el anuncio desde el que llegaste, si es el caso · 3 meses", when: "meta" },
          { text: "No utilizamos cookies publicitarias.", when: "noMeta" },
        ],
      },
      {
        title: "Cómo gestionarlas",
        paras: [
          {
            text: "Cuando entras por primera vez te mostramos un aviso para que aceptes, rechaces o configures las cookies. Puedes cambiar tu elección en cualquier momento con el botón «Configurar cookies» que encontrarás al final de esta página y en el pie de la web.",
            when: "tracking",
          },
          "También puedes bloquear o eliminar las cookies desde la configuración de tu navegador. Si bloqueas las necesarias, es posible que algunas partes de la web no funcionen correctamente.",
        ],
      },
      {
        title: "Cambios en esta política",
        paras: [
          "Si cambiamos las cookies que utilizamos, actualizaremos esta política y te volveremos a pedir tu consentimiento cuando sea necesario.",
        ],
      },
    ],
  },
];

export function getLegalDoc(slug: LegalSlug) {
  return legalDocs.find((d) => d.slug === slug)!;
}
