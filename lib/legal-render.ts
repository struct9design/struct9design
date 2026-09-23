import { consentRequired, gaEnabled, metaEnabled, site } from "@/content/site";
import type { LegalCondition, LegalDoc, LegalPara } from "@/content/legal";

export type Segment = { text: string; bold?: boolean };
export type RenderedPara = { bullet: boolean; segments: Segment[] };
export type RenderedSection = { id: string; n: string; title: string; paras: RenderedPara[] };

const conditions: Record<LegalCondition, boolean> = {
  provisional: site.documentoProvisional,
  tracking: consentRequired,
  noTracking: !consentRequired,
  ga: gaEnabled,
  meta: metaEnabled,
  noMeta: consentRequired && !metaEnabled,
};

const fields: Record<string, string> = {
  titular: site.titular,
  dni: site.dni,
  domicilio: site.domicilio,
  email: site.email,
  telefono: site.telefono,
};

/**
 * Convierte el micro-formato de content/legal.ts en segmentos.
 * Devuelve null si el párrafo no aplica (condición falsa o dato vacío).
 */
function renderPara(para: LegalPara): RenderedPara | null {
  const { text, when } = typeof para === "string" ? { text: para, when: undefined } : para;
  if (when && !conditions[when]) return null;

  const bullet = text.startsWith("• ");
  const body = bullet ? text.slice(2) : text;
  const segments: Segment[] = [];

  for (const part of body.split(/(\{[a-z]+\}|\*[^*]+\*)/)) {
    if (!part) continue;
    const field = part.match(/^\{([a-z]+)\}$/);
    if (field) {
      const value = (fields[field[1]] ?? "").trim();
      if (!value) return null; // Dato vacío: la línea no se muestra
      segments.push({ text: value });
    } else if (/^\*[^*]+\*$/.test(part)) {
      segments.push({ text: part.slice(1, -1), bold: true });
    } else {
      segments.push({ text: part });
    }
  }
  return { bullet, segments };
}

export function renderLegalDoc(doc: LegalDoc): RenderedSection[] {
  return doc.sections
    .map((s) => ({ title: s.title, paras: s.paras.map(renderPara).filter((p): p is RenderedPara => p !== null) }))
    .filter((s) => s.paras.length > 0)
    .map((s, i) => ({ ...s, id: `${doc.slug}-${i + 1}`, n: String(i + 1).padStart(2, "0") }));
}
