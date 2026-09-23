"use client";

import { useEffect, useRef } from "react";
import { trackLead } from "@/lib/tracking";

/** Registra la conversión al llegar a /gracias (solo con consentimiento y una sola vez). */
export function TrackLead() {
  const sent = useRef(false);
  useEffect(() => {
    if (sent.current) return;
    sent.current = true;
    trackLead();
  }, []);
  return null;
}
