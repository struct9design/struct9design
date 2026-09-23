"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { NodeTick } from "@/components/motif/NodeLine";
import { consentRequired, gaEnabled, metaEnabled } from "@/content/site";
import { OPEN_COOKIES_EVENT, readConsent, writeConsent, type ConsentChoice } from "@/lib/consent";
import { cn } from "@/lib/utils";

const btn =
  "flex-auto rounded-[9px] border px-3.5 py-[11px] text-sm font-semibold transition-[background-color,border-color] duration-[250ms]";

/** Categorías opcionales: solo aparecen las de herramientas configuradas. */
const categories = [
  gaEnabled && {
    key: "analytics" as const,
    title: "Análisis",
    desc: "Estadísticas de uso de la web con Google Analytics.",
  },
  metaEnabled && {
    key: "marketing" as const,
    title: "Publicidad",
    desc: "Medir nuestros anuncios en Facebook e Instagram (píxel de Meta).",
  },
].filter(Boolean) as { key: keyof ConsentChoice; title: string; desc: string }[];

const purposes = [gaEnabled && "de análisis, para saber qué páginas resultan útiles", metaEnabled && "publicitarias, para medir nuestros anuncios en redes sociales"]
  .filter(Boolean)
  .join(", y ");

const NONE: ConsentChoice = { analytics: false, marketing: false };
const ALL: ConsentChoice = { analytics: gaEnabled, marketing: metaEnabled };

/**
 * Aviso de cookies (criterio AEPD: Rechazar, Configurar y Aceptar al mismo nivel, y
 * consentimiento separado por finalidad). Solo existe si hay alguna herramienta configurada.
 */
export function CookieBanner() {
  if (!consentRequired) return null;
  return <Banner />;
}

function Banner() {
  const [open, setOpen] = useState(false);
  const [config, setConfig] = useState(false);
  const [choice, setChoice] = useState<ConsentChoice>(NONE);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Primera visita: el aviso aparece tras un momento
    const t = readConsent() ? undefined : setTimeout(() => setOpen(true), 700);
    const onOpen = () => {
      const saved = readConsent();
      setChoice(saved ? { analytics: saved.analytics, marketing: saved.marketing } : NONE);
      setConfig(true);
      setOpen(true);
    };
    window.addEventListener(OPEN_COOKIES_EVENT, onOpen);
    return () => {
      clearTimeout(t);
      window.removeEventListener(OPEN_COOKIES_EVENT, onOpen);
    };
  }, []);

  useEffect(() => {
    const el = boxRef.current;
    if (!open || !el) return;
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.animate([{ opacity: 0, transform: "translateY(16px)" }, { opacity: 1, transform: "none" }], {
        duration: 500,
        easing: "cubic-bezier(.22,.61,.36,1)",
      });
    }
    // Si se ha abierto desde "Configurar cookies", llevamos el foco al panel
    if (config) el.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const save = (value: ConsentChoice) => {
    writeConsent(value);
    setChoice(value);
    setOpen(false);
    setConfig(false);
  };

  if (!open) return null;

  return (
    <div
      ref={boxRef}
      role="dialog"
      aria-modal="false"
      aria-labelledby="s9-ck-title"
      tabIndex={-1}
      className="fixed right-[clamp(12px,3vw,28px)] bottom-[clamp(12px,3vw,28px)] left-[clamp(12px,3vw,28px)] z-[90] max-h-[calc(100vh-24px)] max-w-[440px] overflow-y-auto rounded-2xl border border-niebla bg-white px-[22px] pt-[22px] pb-5 text-grafito shadow-[0_24px_60px_rgba(19,41,75,.18)] focus:outline-none"
    >
      <div className="flex items-center gap-2.5">
        <NodeTick />
        <p id="s9-ck-title" className="font-display text-[1.02rem] font-bold text-tinta">
          Tu privacidad, en orden
        </p>
      </div>
      <p className="mt-3 text-sm leading-[1.6] text-pizarra">
        Usamos cookies propias necesarias para que la web funcione y, solo si lo aceptas, cookies {purposes}. Puedes
        cambiar tu elección cuando quieras.{" "}
        <Link href="/cookies" className="font-semibold">
          Más información
        </Link>
      </p>

      {config && (
        <div className="mt-4 grid gap-2.5">
          <div className="flex items-center justify-between gap-3.5 rounded-[10px] border border-niebla bg-nieve px-3.5 py-3">
            <div>
              <p className="text-sm font-semibold text-tinta">Necesarias</p>
              <p className="mt-[3px] text-[12.5px] text-pizarra">Guardan tu elección. Siempre activas.</p>
            </div>
            <span className="text-[12.5px] font-semibold whitespace-nowrap text-pizarra">Siempre</span>
          </div>
          {categories.map((c) => {
            const on = choice[c.key];
            return (
              <div
                key={c.key}
                className="flex items-center justify-between gap-3.5 rounded-[10px] border border-niebla px-3.5 py-3"
              >
                <div>
                  <p className="text-sm font-semibold text-tinta">{c.title}</p>
                  <p className="mt-[3px] text-[12.5px] text-pizarra">{c.desc}</p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={on}
                  aria-label={`Cookies de ${c.title.toLowerCase()}`}
                  onClick={() => setChoice((prev) => ({ ...prev, [c.key]: !prev[c.key] }))}
                  className={cn(
                    "flex h-[26px] w-11 flex-none rounded-full border-0 p-[3px] transition-[background-color] duration-[250ms]",
                    on ? "justify-end bg-senal" : "justify-start bg-niebla",
                  )}
                >
                  <span className="size-5 rounded-full bg-white shadow-[0_1px_3px_rgba(19,41,75,.25)]" />
                </button>
              </div>
            );
          })}
        </div>
      )}

      <div className="mt-[18px] flex flex-wrap gap-2">
        {config ? (
          <button
            type="button"
            onClick={() => save(choice)}
            className="flex-[1_1_100%] rounded-[9px] border-0 bg-senal px-4 py-3 text-sm font-semibold text-white transition-[background-color] duration-[250ms] hover:bg-tinta"
          >
            Guardar preferencias
          </button>
        ) : (
          <>
            <button
              type="button"
              onClick={() => save(NONE)}
              className={cn(btn, "border-tinta bg-white text-tinta hover:bg-nieve")}
            >
              Rechazar
            </button>
            <button
              type="button"
              onClick={() => setConfig(true)}
              className={cn(btn, "border-niebla bg-white text-tinta hover:border-tinta")}
            >
              Configurar
            </button>
            <button
              type="button"
              onClick={() => save(ALL)}
              className={cn(btn, "border-tinta bg-tinta text-white hover:border-senal hover:bg-senal")}
            >
              Aceptar
            </button>
          </>
        )}
      </div>
    </div>
  );
}
