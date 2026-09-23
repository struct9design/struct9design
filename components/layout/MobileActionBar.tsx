"use client";

import { Phone } from "lucide-react";
import { useEffect, useRef } from "react";
import { buttonClasses } from "@/components/ui/Button";
import { site, telHref } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * Barra fija inferior solo en móvil: llamar o pedir presupuesto sin buscar el formulario.
 * Aparece tras pasar la primera pantalla y se oculta al llegar a la sección #contacto
 * (el formulario ya está a la vista y la barra taparía el pie).
 */
export function MobileActionBar({ href = "#contacto" }: { href?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const contact = document.getElementById("contacto");
      const reachedContact = contact ? contact.getBoundingClientRect().top < window.innerHeight * 0.85 : false;
      const show = window.scrollY > window.innerHeight * 0.6 && !reachedContact;
      el.dataset.show = String(show);
      // Oculta, fuera del orden de tabulación y de los lectores de pantalla
      el.inert = !show;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={ref}
      data-show="false"
      inert
      className="fixed inset-x-0 bottom-0 z-30 translate-y-full border-t border-niebla bg-white/95 px-4 pt-3 pb-[max(12px,env(safe-area-inset-bottom))] backdrop-blur-[10px] transition-transform duration-300 ease-s9 data-[show=true]:translate-y-0 nav:hidden"
    >
      <div className={cn("grid gap-2.5", site.telefono ? "grid-cols-[auto_1fr]" : "grid-cols-1")}>
        {site.telefono && (
          <a
            href={telHref(site.telefono)}
            className={cn(buttonClasses("secondary", "sm"), "gap-2 bg-white px-5")}
          >
            <Phone aria-hidden="true" className="size-4" strokeWidth={2.2} />
            Llamar
          </a>
        )}
        <a href={href} className={buttonClasses("primary", "sm")}>
          Pide tu presupuesto
        </a>
      </div>
    </div>
  );
}
