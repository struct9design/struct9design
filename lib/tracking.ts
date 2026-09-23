/**
 * Carga de Google Analytics 4 y del píxel de Meta.
 * Nada de esto se ejecuta sin el consentimiento de su categoría (ver components/cookies/Tracking.tsx).
 */
import { gaEnabled, metaEnabled, tracking } from "@/content/site";
import { readConsent } from "./consent";

type Fn = (...args: unknown[]) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Fn;
    fbq?: Fn & { callMethod?: Fn; queue?: unknown[]; loaded?: boolean; version?: string; push?: Fn };
    _fbq?: Window["fbq"];
  }
}

function addScript(src: string) {
  const s = document.createElement("script");
  s.async = true;
  s.src = src;
  document.head.appendChild(s);
}

/** Google Analytics 4 — categoría "Análisis". */
export function loadGA() {
  if (!gaEnabled) return;
  if (window.gtag) {
    window.gtag("consent", "update", { analytics_storage: "granted" });
    return;
  }
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };
  window.gtag("consent", "default", {
    analytics_storage: "granted",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  window.gtag("js", new Date());
  window.gtag("config", tracking.gaId);
  addScript(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(tracking.gaId)}`);
}

export function revokeGA() {
  window.gtag?.("consent", "update", { analytics_storage: "denied" });
  deleteCookies((name) => name.startsWith("_ga"));
}

/** Píxel de Meta — categoría "Publicidad". Mismo arranque que el snippet oficial. */
export function loadMeta() {
  if (!metaEnabled) return;
  if (window.fbq) {
    window.fbq("consent", "grant");
    return;
  }
  const fbq: NonNullable<Window["fbq"]> = function (...args: unknown[]) {
    if (fbq.callMethod) fbq.callMethod(...args);
    else fbq.queue!.push(args);
  };
  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = "2.0";
  fbq.queue = [];
  window.fbq = fbq;
  window._fbq = fbq;
  addScript("https://connect.facebook.net/en_US/fbevents.js");
  fbq("consent", "grant");
  fbq("init", tracking.metaPixelId);
  fbq("track", "PageView");
}

export function revokeMeta() {
  window.fbq?.("consent", "revoke");
  deleteCookies((name) => name === "_fbp" || name === "_fbc");
}

/** Conversión tras enviar el formulario (/gracias), solo en las categorías aceptadas. */
export function trackLead() {
  const consent = readConsent();
  if (consent?.analytics && gaEnabled) {
    loadGA();
    window.gtag?.("event", "generate_lead");
  }
  if (consent?.marketing && metaEnabled) {
    loadMeta();
    window.fbq?.("track", "Lead");
  }
}

function deleteCookies(match: (name: string) => boolean) {
  const host = location.hostname.replace(/^www\./, "");
  for (const c of document.cookie.split("; ")) {
    const name = c.split("=")[0];
    if (!match(name)) continue;
    for (const domain of ["", `; Domain=${host}`, `; Domain=.${host}`]) {
      document.cookie = `${name}=; Max-Age=0; Path=/${domain}`;
    }
  }
}
