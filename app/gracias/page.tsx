import { TrackLead } from "@/components/cookies/TrackLead";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ButtonLink } from "@/components/ui/Button";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Mensaje recibido",
  description: "Gracias por contarnos tu caso. Te respondemos en menos de 24 horas laborables.",
  path: "/gracias",
  noindex: true,
});

const up = (delay: number) => ({ className: "animate-s9-up", style: { animationDelay: `${delay}ms` } });

const steps = [
  { t: "Leemos tu mensaje", d: " con calma para entender tu negocio." },
  { t: "Te respondemos", d: " por correo o por teléfono, como prefieras." },
  { t: "Si encaja", d: ", hablamos 30 minutos y te preparamos un presupuesto cerrado." },
];

export default function GraciasPage() {
  return (
    <>
      <TrackLead />
      <Header minimal />

      <main className="gutter flex min-h-[calc(100vh-140px)] items-center py-[clamp(36px,8vw,96px)]">
        <div className="mx-auto w-full max-w-[720px]">
          {/* Línea que termina en nodo con la marca de verificación */}
          <svg viewBox="0 0 240 48" aria-hidden="true" className="block h-auto w-[200px] overflow-visible">
            <path
              d="M4 24 H196"
              stroke="#2F6BFF"
              strokeWidth="1.6"
              fill="none"
              strokeLinecap="round"
              style={{ strokeDasharray: 300, animation: "s9draw 1.1s cubic-bezier(.22,.61,.36,1) .1s both" }}
            />
            <g
              style={{
                transformBox: "fill-box",
                transformOrigin: "center",
                animation: "s9pop .5s cubic-bezier(.34,1.4,.64,1) 1s both",
              }}
            >
              <circle cx="216" cy="24" r="20" fill="#13294B" />
              <path
                d="M207 24.5 L213.5 31 L225 18.5"
                stroke="#FFFFFF"
                strokeWidth="2.4"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
            <circle cx="4" cy="24" r="4" fill="#2F6BFF" />
          </svg>

          <h1
            {...up(300)}
            className="animate-s9-up mt-[34px] font-display text-[clamp(2.1rem,5vw,3.4rem)] leading-[1.06] font-extrabold tracking-[-.03em] text-tinta"
          >
            Mensaje recibido. Ya estamos conectados.
          </h1>
          <p
            {...up(400)}
            className="animate-s9-up mt-[18px] max-w-[52ch] text-[clamp(1.02rem,1.4vw,1.18rem)] leading-[1.65] text-pizarra"
          >
            Gracias por contarnos tu caso. Te respondemos en menos de 24 horas laborables con una primera orientación,
            sin compromiso.
          </p>

          <section {...up(500)} aria-labelledby="ahora" className="animate-s9-up mt-10 border-t border-niebla">
            <h2
              id="ahora"
              className="mt-[22px] font-display text-[12.5px] font-bold tracking-[.12em] text-senal uppercase"
            >
              Qué pasa ahora
            </h2>
            <ol className="mt-[18px] grid gap-4">
              {steps.map((s, i) => (
                <li key={s.t} className="grid grid-cols-[34px_1fr] gap-3">
                  <span className="font-display text-sm font-extrabold text-senal">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-[15.5px] leading-[1.6] text-grafito">
                    <strong className="text-tinta">{s.t}</strong>
                    {s.d}
                  </p>
                </li>
              ))}
            </ol>
          </section>

          <div {...up(600)} className="animate-s9-up mt-[38px] flex flex-wrap gap-3">
            <ButtonLink href="/" className="px-6 py-3.5 shadow-none hover:shadow-none">
              Volver al inicio
            </ButtonLink>
            <ButtonLink href="/servicios" variant="secondary" className="px-6 py-3.5 hover:bg-transparent">
              Ver servicios
            </ButtonLink>
          </div>
          <p className="mt-[26px] text-sm text-pizarra">
            ¿Es urgente? Escríbenos a{" "}
            <a href={`mailto:${site.email}`} className="font-semibold">
              {site.email}
            </a>
          </p>
        </div>
      </main>

      <Footer variant="compact" cookieSettings={false} />
    </>
  );
}
