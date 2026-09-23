"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { consentRequired } from "@/content/site";
import { CONSENT_CHANGE_EVENT, readConsent, type Consent } from "@/lib/consent";
import { loadGA, loadMeta, revokeGA, revokeMeta } from "@/lib/tracking";

/** Aplica el consentimiento: carga o retira GA (análisis) y el píxel de Meta (publicidad). */
export function Tracking() {
  const pathname = usePathname();
  const first = useRef(true);

  useEffect(() => {
    if (!consentRequired) return;
    const apply = (c: Consent | null) => {
      if (c?.analytics) loadGA();
      else revokeGA();
      if (c?.marketing) loadMeta();
      else revokeMeta();
    };
    apply(readConsent());
    const onChange = (e: Event) => apply((e as CustomEvent<Consent>).detail);
    window.addEventListener(CONSENT_CHANGE_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_CHANGE_EVENT, onChange);
  }, []);

  // Navegación sin recarga: Meta no cuenta la página nueva por sí solo (GA4 sí)
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (readConsent()?.marketing) window.fbq?.("track", "PageView");
  }, [pathname]);

  return null;
}
