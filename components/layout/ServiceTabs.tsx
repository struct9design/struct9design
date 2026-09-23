"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { services, type ServiceSlug } from "@/content/services";
import { cn } from "@/lib/utils";

/** Pestañas de servicios bajo la cabecera. Cada pestaña es una ruta real. */
export function ServiceTabs({ current }: { current: ServiceSlug }) {
  const activeRef = useRef<HTMLAnchorElement>(null);

  // En móvil la barra se desplaza en horizontal: dejamos visible la pestaña activa
  useEffect(() => {
    activeRef.current?.scrollIntoView({ block: "nearest", inline: "center" });
  }, [current]);

  return (
    <div className="border-t border-nieve">
      <nav
        aria-label="Servicios"
        className="wrap gutter flex gap-1.5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {services.map((s) => {
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
