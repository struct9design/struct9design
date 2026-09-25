import Link from "next/link";
import { NodeLine } from "@/components/motif/NodeLine";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { SwipeRow } from "@/components/ui/SwipeRow";
import { services } from "@/content/services";

/**
 * Tarjetas de las cuatro áreas (home y /servicios).
 * `heading` ajusta el nivel del título a la página: h3 bajo el H2 de la home, h2 bajo el H1 de /servicios.
 */
export function ServiceCards({ heading: Heading = "h3", className }: { heading?: "h2" | "h3"; className?: string }) {
  return (
    <SwipeRow
      label="Nuestras cuatro áreas"
      className={`grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] gap-5 ${className ?? ""}`}
    >
      {services.map((s, i) => (
        <Reveal key={s.slug} delay={[60, 130, 200, 270][i]} className="flex">
          <Card
            as="article"
            hover="lift"
            className="flex flex-1 flex-col rounded-2xl p-[clamp(22px,2.6vw,32px)]"
          >
            <NodeLine n={s.n} fill />
            <Heading className="mt-5 font-display text-[1.32rem] font-bold tracking-[-.01em] text-tinta">
              {s.name}
            </Heading>
            <p className="mt-3 text-[15.5px] leading-[1.65] text-pizarra max-nav:text-[15px] max-nav:leading-[1.55]">
              {s.home.summary}
            </p>
            <ul className="mt-5 grid gap-[9px] max-nav:hidden">
              {s.home.bullets.map((b) => (
                <li key={b} className="flex gap-2.5 text-[14.5px] text-grafito">
                  <span aria-hidden="true" className="text-senal">
                    ·
                  </span>
                  {b}
                </li>
              ))}
            </ul>
            <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-[22px] max-nav:pt-5">
              <p className="text-[13.5px] text-pizarra">
                <span className="font-semibold text-tinta">Beneficio: {s.home.homeBenefit}</span>
                <br />
                Precio: {s.price}
              </p>
              <Link
                href={`/servicios/${s.slug}`}
                aria-label={`Ver servicio: ${s.name}`}
                className="text-sm font-semibold"
              >
                Ver servicio →
              </Link>
            </div>
          </Card>
        </Reveal>
      ))}
    </SwipeRow>
  );
}
