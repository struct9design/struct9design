# struct9 · Rebranding de la web

Propuesta de nueva web para **struct9design.com**. Es el mismo proyecto que `struct9design/web-struct9design`
(mismo panel, misma base de datos, mismas APIs) con la parte pública rehecha sobre el nuevo diseño
y el panel `/panel` adaptado a la nueva marca.

> El panel funciona igual que ahora: misma contraseña (`PANEL_PASSWORD`), misma sesión y mismas tablas de Supabase.

## Qué cambia

| Zona | Antes | Ahora |
|---|---|---|
| Marca | Negro y dorado | Tinta `#13294B` + azul señal `#2F6BFF`, tipografías Manrope e Inter, logo e isotipo nuevos |
| Home | Web antigua | Hero con circuito animado, problema, 4 áreas, proceso, FAQ y formulario |
| Servicios | Una página | 4 páginas: `/servicios/presencia-digital`, `automatizacion`, `diagnostico`, `contenido-visual` |
| Contacto | `/api/contacto` | Server Action con validación (Zod), honeypot y límite por IP. **Sigue guardando el lead en `contacts`** y avisando por correo con Resend |
| Legal | — | `/aviso-legal`, `/privacidad`, `/cookies` + aviso de cookies (Rechazar / Configurar / Aceptar) |
| Panel `/panel` | Tema oscuro | Tema claro con la nueva marca. **Sin cambios de lógica** |
| Catálogo CRM | Web, chatbot, voz | Las 4 áreas nuevas (los proyectos antiguos conservan su servicio) |
| Blog | Estilo antiguo | Mismos artículos y URLs, estilo nuevo |
| Gestor de paquetes | npm | pnpm |

También hay 404 propia, página `/gracias`, `sitemap.xml`, `robots.txt` (bloquea `/panel` y `/api`), datos
estructurados JSON-LD y animaciones que respetan `prefers-reduced-motion`.

## Arrancarlo en local

```bash
pnpm install
cp .env.local.example .env.local   # y rellena los valores (los mismos que en Vercel)
pnpm dev
```

- Web: http://localhost:3000
- Panel: http://localhost:3000/panel

> Ojo: con las claves reales de Supabase en `.env.local`, enviar el formulario crea un lead de verdad.
> Para probar sin tocar datos, deja vacías las tres variables de Supabase: el lead se imprime en la consola.

## Variables de entorno

No hace falta ninguna variable nueva: las que ya hay en Vercel sirven tal cual.

| Variable | Uso | ¿Nueva? |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` | CRM y leads | No |
| `PANEL_PASSWORD`, `PANEL_SESSION_SECRET` | Login del panel | No |
| `RESEND_API_KEY`, `ADMIN_EMAIL` | Aviso por correo de cada lead | No |
| `NEXT_PUBLIC_SITE_URL` | Canonical, sitemap y enlaces de los correos | No |
| `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET` | Cobros desde el panel | No |
| `CONTACT_FROM_EMAIL` | Remitente de los avisos (por defecto `noreply@struct9design.com`) | Sí, opcional |
| `NEXT_PUBLIC_GA_ID` | Google Analytics. Si está vacío no se carga ni aparece el aviso de cookies | Sí, opcional |
| `NEXT_PUBLIC_META_PIXEL_ID` | Píxel de Meta. Igual: solo con ID y tras consentimiento | Sí, opcional |

## Dónde se edita cada texto

| Qué | Archivo |
|---|---|
| Datos de contacto, titular, teléfono, horario | `content/site.ts` |
| Textos de la home | `content/home.ts` |
| Los 4 servicios (todo su contenido) y compromisos | `content/services.ts` |
| Preguntas frecuentes de la home | `content/faqs.ts` |
| Opciones del formulario y "Qué pasa después" | `content/contact.ts` |
| Aviso legal, privacidad y cookies | `content/legal.ts` |
| Artículos del blog | `lib/blog.ts` |
| Casos de éxito (preparado, aún sin mostrar) | `content/cases.ts` |
| Colores, tipografías y animaciones | `app/globals.css` (`@theme`) |

## Para publicarlo

1. **Deploys bloqueados en Vercel.** El proyecto está en un plan Hobby y Vercel bloquea los despliegues de
   commits cuyo autor no es el dueño de la cuenta (`hola@struct9design.com`). Hay que desplegar con la CLI
   desde esa cuenta (`vercel deploy --prod`) o pasar a Pro.
2. **Antes de desplegar con la CLI**, crea un `.vercelignore` con `.env*` para que no se suba `.env.local`
   (la CLI no lee el `.gitignore`).
3. **pnpm:** añade `ENABLE_EXPERIMENTAL_COREPACK=1` en las variables de Vercel para que compile con la
   versión exacta de `packageManager`.
4. **Legal pendiente:** los datos del titular (nombre, NIF, domicilio) están vacíos en `content/site.ts`.
   La LSSI (art. 10) y el RGPD (art. 13) exigen mostrarlos; en cuanto se rellenan, los textos legales
   los muestran solos.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript estricto · Tailwind CSS v4 · Framer Motion (solo el hero) ·
Supabase · Stripe · Resend · Zod · dnd-kit (Kanban del panel).

El circuito del hero parte de [`@componentry/circuit-board`](https://componentry.dev) (licencia MIT, © Harsh Jadhav),
adaptado a la marca.
