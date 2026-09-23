"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Añade `.is-in` a los elementos `[data-reveal]` y `[data-draw]` cuando entran en pantalla.
 * Una sola vez por elemento. Con `prefers-reduced-motion` el CSS ya los muestra en su estado final.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const reveal = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add("is-in");
          reveal.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 },
    );
    const draw = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add("is-in");
          draw.unobserve(e.target);
        }
      },
      { threshold: 0.25 },
    );

    const scan = () => {
      document.querySelectorAll("[data-reveal]:not(.is-in)").forEach((el) => reveal.observe(el));
      document.querySelectorAll("[data-draw]:not(.is-in)").forEach((el) => draw.observe(el));
    };
    scan();

    // Contenido que aparece después (p. ej. al cambiar de servicio sin recargar)
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      reveal.disconnect();
      draw.disconnect();
      mo.disconnect();
    };
  }, [pathname]);

  return null;
}
