import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export type TimelineStep = { t: string; d: string; time?: string };

const node =
  "block size-[13px] flex-none rounded-full bg-senal shadow-[0_0_0_5px_var(--color-nieve),0_0_0_6px_var(--color-niebla)]";

/**
 * Horizontal (home): 4 columnas ≥1000px, 2 ≥600px y, en móvil, línea vertical a la izquierda.
 * La línea que une cada paso con el siguiente se dibuja al entrar en pantalla
 * y se oculta cuando el siguiente paso cae en otra fila.
 */
export function ProcessTimelineHorizontal({ steps }: { steps: TimelineStep[] }) {
  return (
    <div data-draw="" className="grid grid-cols-1 gap-7 min-[600px]:grid-cols-2 min-[600px]:gap-8 min-[1000px]:grid-cols-4">
      {steps.map((step, i) => {
        const last = i === steps.length - 1;
        // En 2 columnas, los pasos impares cierran fila
        const lineVisibility = i % 2 === 1 ? "hidden min-[1000px]:block" : "hidden min-[600px]:block";
        return (
          <Reveal key={step.t} delay={80 * (i + 1)} className="relative max-[599px]:pl-9">
            {/* Móvil: tramo vertical hasta el nodo del paso siguiente */}
            {!last && (
              <span
                aria-hidden="true"
                className="absolute top-[22px] -bottom-[26px] left-1.5 w-px bg-niebla min-[600px]:hidden"
              >
                <span
                  data-draw-y=""
                  className="absolute inset-x-0 top-0 bg-senal"
                  style={{ transitionDelay: `${220 + i * 180}ms` }}
                />
              </span>
            )}
            <div className="flex h-[38px] items-center max-[599px]:absolute max-[599px]:top-[3px] max-[599px]:left-0 max-[599px]:h-auto">
              <span className={node} />
              {!last && (
                <span
                  aria-hidden="true"
                  className={cn("relative -mr-8 ml-2.5 h-px flex-1 bg-niebla", lineVisibility)}
                >
                  <span
                    data-draw-x=""
                    className="absolute inset-y-0 left-0 bg-senal"
                    style={{ transitionDelay: `${220 + i * 180}ms` }}
                  />
                </span>
              )}
            </div>
            <p className="mt-[18px] font-display text-[12.5px] font-bold tracking-[.1em] text-pizarra max-[599px]:mt-0">
              PASO {String(i + 1).padStart(2, "0")}
            </p>
            <h3 className="mt-2 font-display text-[1.18rem] font-bold text-tinta max-[599px]:mt-1">{step.t}</h3>
            <p className="mt-2.5 text-[15px] leading-[1.65] text-pizarra max-[599px]:mt-1.5 max-[599px]:leading-[1.55]">
              {step.d}
            </p>
          </Reveal>
        );
      })}
    </div>
  );
}

/** Vertical (servicios): línea continua a la izquierda con un nodo por paso y su plazo. */
export function ProcessTimelineVertical({ steps }: { steps: TimelineStep[] }) {
  return (
    <div data-draw="" className="relative pl-10">
      <div aria-hidden="true" className="absolute top-2 bottom-2 left-1.5 w-px bg-niebla">
        <div data-draw-y="" className="w-px bg-senal" />
      </div>
      <ol className="grid gap-6 nav:gap-8">
        {steps.map((step, i) => (
          <Reveal as="li" key={step.t} delay={i * 90} className="relative">
            <span aria-hidden="true" className={cn(node, "absolute top-[3px] -left-10")} />
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="font-display text-[12.5px] font-bold tracking-[.1em] text-pizarra">
                PASO {String(i + 1).padStart(2, "0")}
              </span>
              {step.time && (
                <span className="rounded-full border border-niebla bg-white px-2.5 py-[3px] text-[12.5px] font-semibold text-tinta">
                  {step.time}
                </span>
              )}
            </div>
            <h3 className="mt-2 font-display text-[1.18rem] font-bold text-tinta nav:mt-2.5">{step.t}</h3>
            <p className="mt-1.5 max-w-[50ch] text-[15px] leading-[1.55] text-pizarra nav:mt-2 nav:leading-[1.65]">{step.d}</p>
          </Reveal>
        ))}
      </ol>
    </div>
  );
}
