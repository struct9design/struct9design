"use client";

import { Children, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Fila de tarjetas: en escritorio se comporta como la rejilla de `className`;
 * por debajo de 760px pasa a carrusel horizontal a sangre (cada hijo, ~84 % del ancho) con puntos de posición.
 */
export function SwipeRow({ children, className, label }: { children: ReactNode; className?: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const count = Children.count(children);

  const onScroll = () => {
    const el = ref.current;
    if (!el || el.children.length < 2) return;
    const step = (el.children[1] as HTMLElement).offsetLeft - (el.children[0] as HTMLElement).offsetLeft;
    // Al llegar al final, el último punto (aunque la última tarjeta no quede alineada a la izquierda)
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
    setActive(atEnd ? count - 1 : Math.round(el.scrollLeft / step));
  };

  return (
    <>
      <div
        ref={ref}
        onScroll={onScroll}
        role="region"
        aria-label={label}
        className={cn(
          className,
          "max-nav:-mx-[clamp(20px,4vw,40px)] max-nav:flex max-nav:snap-x max-nav:snap-mandatory max-nav:scroll-px-[clamp(20px,4vw,40px)] max-nav:gap-3.5 max-nav:overflow-x-auto max-nav:px-[clamp(20px,4vw,40px)] max-nav:pb-2 max-nav:*:w-[84%] max-nav:*:flex-none max-nav:*:snap-start max-nav:[scrollbar-width:none] max-nav:[&::-webkit-scrollbar]:hidden",
        )}
      >
        {children}
      </div>
      {count > 1 && (
        <div aria-hidden="true" className="mt-4 flex justify-center gap-2 nav:hidden">
          {Array.from({ length: count }, (_, i) => (
            <span
              key={i}
              className={cn(
                "h-[7px] rounded-full transition-[width,background-color] duration-300",
                i === active ? "w-5 bg-senal" : "w-[7px] bg-niebla",
              )}
            />
          ))}
        </div>
      )}
    </>
  );
}
