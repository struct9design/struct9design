import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Antetítulo en mayúsculas. Sobre fondo nieve usa `tone="tinta"`:
 * el azul señal no alcanza contraste AA en texto pequeño sobre nieve.
 */
export function Eyebrow({
  children,
  tone = "senal",
  className,
}: {
  children: ReactNode;
  tone?: "senal" | "tinta";
  className?: string;
}) {
  return (
    <p
      className={cn(
        "m-0 font-display text-[13px] font-bold tracking-[.12em] uppercase",
        tone === "senal" ? "text-senal" : "text-tinta",
        className,
      )}
    >
      {children}
    </p>
  );
}

/** Píldora con nodo, como "Del caos al sistema" en el hero. */
export function Pill({
  children,
  dark = false,
  pulse = false,
  className,
}: {
  children: ReactNode;
  dark?: boolean;
  pulse?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-[9px] rounded-full px-3.5 py-[7px] font-semibold whitespace-nowrap uppercase",
        dark
          ? "border border-white/[.22] text-[12.5px] tracking-[.06em] text-white"
          : "border border-niebla bg-nieve text-[13px] tracking-[.04em] text-tinta",
        className,
      )}
    >
      <span className={cn("size-[7px] rounded-full bg-senal", pulse && "animate-s9-node")} />
      {children}
    </div>
  );
}
