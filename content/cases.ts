import type { ServiceSlug } from "./services";

/**
 * Casos de éxito. La sección todavía no se muestra en la web:
 * cuando haya casos reales, se añaden aquí y se crea el componente que los pinta.
 */
export type CaseStudy = {
  slug: string;
  client: string;
  sector: string;
  services: ServiceSlug[];
  /** Situación de partida, en una o dos frases. */
  before: string;
  /** Qué se hizo. */
  work: string;
  /** Resultado medible, p. ej. "−6 h de gestión a la semana". */
  results: { value: string; label: string }[];
  quote?: { text: string; author: string; role: string };
  image?: { src: string; alt: string };
};

export const cases: CaseStudy[] = [];
