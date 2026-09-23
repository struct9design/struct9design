import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Eyebrow } from "@/components/ui/Eyebrow";

export const metadata: Metadata = {
  title: "Página no encontrada",
  robots: { index: false, follow: true },
};

const up = (delay: number) => ({ style: { animationDelay: `${delay}ms` } });

const paths = [
  { href: "/", label: "Inicio" },
  { href: "/servicios", label: "Servicios" },
  { href: "/contacto", label: "Contacto" },
];

export default function NotFound() {
  return (
    <>
      <Header minimal cta={{ href: "/contacto", label: "Pide tu presupuesto" }} />

      <main className="gutter flex min-h-[calc(100vh-150px)] items-center py-[clamp(48px,8vw,96px)]">
        <div className="wrap grid w-full grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] items-center gap-[clamp(36px,5vw,72px)]">
          <div>
            <div {...up(0)} className="animate-s9-up">
              <Eyebrow>Error 404</Eyebrow>
            </div>
            <h1
              {...up(100)}
              className="animate-s9-up mt-4 font-display text-[clamp(2.1rem,5vw,3.4rem)] leading-[1.06] font-extrabold tracking-[-.03em] text-tinta"
            >
              Esta página se ha desconectado.
            </h1>
            <p
              {...up(200)}
              className="animate-s9-up mt-[18px] max-w-[48ch] text-[clamp(1.02rem,1.4vw,1.15rem)] leading-[1.65] text-pizarra"
            >
              Puede que el enlace esté mal escrito o que la página ya no exista. Te dejamos los caminos principales para
              que sigas en orden.
            </p>
            <nav {...up(300)} aria-label="Caminos principales" className="animate-s9-up mt-[34px] grid max-w-[440px] gap-2.5">
              {paths.map((p) => (
                <Link
                  key={p.href}
                  href={p.href}
                  className="flex items-center gap-3.5 rounded-xl border border-niebla px-[18px] py-4 font-semibold !text-tinta transition-[border-color,transform] duration-[250ms] hover:translate-x-1 hover:border-senal"
                >
                  <span aria-hidden="true" className="size-[7px] rounded-full bg-senal" />
                  <span className="flex-1">{p.label}</span>
                  <span aria-hidden="true" className="text-senal">
                    →
                  </span>
                </Link>
              ))}
            </nav>
          </div>

          {/* Conexión perdida: línea trazada, hueco y nodo que parpadea */}
          <div aria-hidden="true">
            <svg viewBox="0 0 440 260" className="block h-auto w-full overflow-visible">
              <path
                d="M20 130 H170"
                stroke="#13294B"
                strokeWidth="1.6"
                fill="none"
                strokeLinecap="round"
                style={{ strokeDasharray: 300, animation: "s9draw 1.2s cubic-bezier(.22,.61,.36,1) .2s both" }}
              />
              <circle cx="20" cy="130" r="5" fill="#13294B" />
              <circle cx="170" cy="130" r="4" fill="#D9DEE5" />
              <path
                d="M270 130 H400"
                stroke="#D9DEE5"
                strokeWidth="1.6"
                fill="none"
                strokeLinecap="round"
                strokeDasharray="4 7"
              />
              <circle cx="270" cy="130" r="4" fill="#D9DEE5" />
              <circle
                cx="410"
                cy="130"
                r="9"
                fill="#FFFFFF"
                stroke="#2F6BFF"
                strokeWidth="1.6"
                style={{ animation: "s9blink 2.4s ease-in-out 1.4s infinite" }}
              />
              <text
                x="220"
                y="118"
                textAnchor="middle"
                fontSize="64"
                fontWeight="800"
                fill="#13294B"
                letterSpacing="-2"
                style={{ fontFamily: "var(--font-manrope), sans-serif" }}
              >
                404
              </text>
              <text
                x="220"
                y="160"
                textAnchor="middle"
                fontSize="12"
                fontWeight="600"
                letterSpacing="1.6"
                fill="#5B6675"
                style={{ fontFamily: "var(--font-inter), sans-serif" }}
              >
                CONEXIÓN PERDIDA
              </text>
            </svg>
          </div>
        </div>
      </main>

      <Footer variant="compact" cookieSettings={false} />
    </>
  );
}
