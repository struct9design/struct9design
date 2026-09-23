import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Eyebrow } from "./Eyebrow";

type Size = "lg" | "md" | "sm";

const titleSizes: Record<Size, string> = {
  lg: "text-[clamp(1.8rem,3.4vw,2.6rem)]",
  md: "text-[clamp(1.7rem,3.2vw,2.45rem)]",
  sm: "text-[clamp(1.6rem,3vw,2.2rem)]",
};

/** Antetítulo + h2 + entradilla opcional. */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  size = "lg",
  tone = "senal",
  titleClassName,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  size?: Size;
  /** Usa "tinta" en secciones de fondo nieve. */
  tone?: "senal" | "tinta";
  titleClassName?: string;
}) {
  return (
    <>
      <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
      <h2
        className={cn(
          // Interlineado como propiedad arbitraria: tailwind-merge descarta `leading-*` si después va un `text-[…]`
          "mt-3.5 font-display [line-height:1.12] font-extrabold tracking-[-.02em] text-pretty text-tinta",
          titleSizes[size],
          titleClassName,
        )}
      >
        {title}
      </h2>
      {intro && (
        <p className="mt-4 text-[1.02rem] leading-[1.68] text-pizarra max-nav:mt-3 max-nav:text-base max-nav:leading-[1.55]">
          {intro}
        </p>
      )}
    </>
  );
}
