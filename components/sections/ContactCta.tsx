import type { ReactNode } from "react";
import { ContactForm } from "@/components/forms/ContactForm";
import { Pill } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import type { ContactArea } from "@/content/contact";

/** Sección final oscura (tinta) con el formulario: la única sección oscura del sitio. */
export function ContactCta({
  title,
  intro,
  children,
  defaultArea,
  placeholder,
  minCol = 300,
}: {
  title: string;
  intro: string;
  /** Contenido bajo la entradilla (datos de contacto o lista de garantías). */
  children?: ReactNode;
  defaultArea?: ContactArea;
  placeholder?: string;
  minCol?: number;
}) {
  return (
    <section
      id="contacto"
      aria-labelledby="contacto-titulo"
      className="gutter scroll-mt-[110px] bg-tinta py-[clamp(64px,9vw,112px)] text-white"
    >
      <div
        className="wrap grid items-start gap-[clamp(36px,5vw,72px)]"
        style={{ gridTemplateColumns: `repeat(auto-fit, minmax(min(100%, ${minCol}px), 1fr))` }}
      >
        <Reveal>
          <Pill dark>Presupuesto sin compromiso</Pill>
          <h2
            id="contacto-titulo"
            className="mt-5 font-display text-[clamp(1.9rem,3.6vw,2.8rem)] leading-[1.1] font-extrabold tracking-[-.025em] text-pretty"
          >
            {title}
          </h2>
          <p className="mt-[18px] max-w-[44ch] text-[1.05rem] leading-[1.68] text-niebla">{intro}</p>
          {children}
        </Reveal>
        <Reveal delay={120}>
          <ContactForm defaultArea={defaultArea} placeholder={placeholder} />
        </Reveal>
      </div>
    </section>
  );
}
