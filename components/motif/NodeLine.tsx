import { cn } from "@/lib/utils";

/**
 * Motivo de marca: número + línea que termina en nodo ("01 ——— •").
 * `fill` estira la línea hasta el nodo; si no, la línea mide `lineWidth`.
 */
export function NodeLine({
  n,
  fill = false,
  lineWidth = 24,
  nodeSize = 8,
  gap = 12,
  className,
}: {
  n?: string;
  fill?: boolean;
  lineWidth?: number;
  nodeSize?: number;
  gap?: number;
  className?: string;
}) {
  return (
    <span aria-hidden="true" className={cn("flex items-center", className)} style={{ gap }}>
      {n && <span className="font-display text-[13px] font-bold tracking-[.08em] text-senal">{n}</span>}
      <span className={cn("h-px bg-niebla", fill && "flex-1")} style={fill ? undefined : { width: lineWidth }} />
      <span className="flex-none rounded-full bg-senal" style={{ width: nodeSize, height: nodeSize }} />
    </span>
  );
}

/** Línea azul corta que termina en nodo (cabeceras del banner de cookies y tarjetas). */
export function NodeTick({ className }: { className?: string }) {
  return (
    <span aria-hidden="true" className={cn("flex flex-none items-center", className)}>
      <span className="h-px w-[18px] bg-senal" />
      <span className="-ml-[3px] size-[7px] rounded-full bg-senal" />
    </span>
  );
}
