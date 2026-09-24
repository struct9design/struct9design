"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import type { ServiceSlug } from "@/content/services";
import { cn } from "@/lib/utils";

type Tab = { slug: ServiceSlug; n: string; name: string };

/**
 * Pestañas de servicios bajo la cabecera. Cada pestaña es una ruta real.
 * Recibe solo número y nombre de cada servicio para no cargar sus textos en el navegador.
 */
export function ServiceTabs({ current, tabs }: { current: ServiceSlug; tabs: Tab[] }) {
  const navRef = useRef<HTMLElement>(null);
  const activeRef = useRef<HTMLAnchorElement>(null);

  // En móvil la barra se desplaza en horizontal: dejamos visible la pestaña activa
  useEffect(() => {
    activeRef.current?.scrollIntoView({ block: "nearest", inline: "center" });
    updateFade();
  }, [current]);

  /** Degradado en el borde por el que quedan pestañas ocultas, para que se vea que se puede deslizar. */
  function updateFade() {
    const el = navRef.current;
    if (!el) return;
    const start = el.scrollLeft > 4;
    const end = el.scrollLeft + el.clientWidth < el.scrollWidth - 4;
    const mask =
      start || end
        ? `linear-gradient(to right, ${start ? "transparent, #000 40px" : "#000"}, ${end ? "#000 calc(100% - 40px), transparent" : "#000"})`
        : "";
    el.style.maskImage = mask;
    el.style.webkitMaskImage = mask;
  }

  return (
    <div className="border-t border-nieve">
      <nav
        ref={navRef}
        onScroll={updateFade}
        aria-label="Servicios"
        className="wrap gutter flex gap-1.5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {tabs.map((s) => {
          const active = s.slug === current;
          return (
            <Link
              key={s.slug}
              ref={active ? activeRef : undefined}
              href={`/servicios/${s.slug}`}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex flex-none items-center gap-2 border-b-2 px-3.5 pt-[13px] pb-3 text-sm font-semibold whitespace-nowrap transition-[color,border-color] duration-[250ms] hover:!text-tinta",
                active ? "border-senal !text-tinta" : "border-transparent !text-pizarra",
              )}
            >
              <span className="font-display text-xs text-senal">{s.n}</span>
              {s.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
