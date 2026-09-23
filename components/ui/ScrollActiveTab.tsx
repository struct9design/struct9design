"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** Barra de pestañas con scroll horizontal que deja visible la pestaña `aria-current`. */
export function ScrollActiveTab({ children, className, label }: { children: ReactNode; className?: string; label: string }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    ref.current?.querySelector('[aria-current="page"]')?.scrollIntoView({ block: "nearest", inline: "center" });
  }, []);
  return (
    <nav ref={ref} aria-label={label} className={className}>
      {children}
    </nav>
  );
}
