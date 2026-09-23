"use client";

import { consentRequired } from "@/content/site";
import { openCookieSettings } from "@/lib/consent";
import { cn } from "@/lib/utils";

/** Reabre el panel de cookies. Sin herramientas de medición no hay nada que configurar y no se muestra. */
export function CookieSettingsButton({
  className,
  variant = "link",
}: {
  className?: string;
  variant?: "link" | "button";
}) {
  if (!consentRequired) return null;
  return (
    <button
      type="button"
      onClick={openCookieSettings}
      className={cn(
        variant === "link"
          ? "border-0 bg-transparent p-0 text-pizarra hover:text-tinta"
          : "rounded-[10px] border-0 bg-senal px-[22px] py-3.5 text-[15px] font-semibold text-white transition-[background-color,transform] duration-[250ms] hover:-translate-y-0.5 hover:bg-tinta",
        className,
      )}
    >
      Configurar cookies
    </button>
  );
}
