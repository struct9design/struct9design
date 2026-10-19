/**
 * Carga de Google Tag Manager, Google Analytics 4 y el píxel de Meta.
 * Nada de esto se ejecuta sin el consentimiento de su categoría (ver components/cookies/Tracking.tsx).
 */
import { gaEnabled, gtmEnabled, metaEnabled, tracking } from "@/content/site";
import { readConsent, type Consent } from "./consent";

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

/** Comando de Consent Mode para GTM. Tiene que llegar al dataLayer como `arguments`, igual que gtag(). */
// eslint-disable-next-line @typescript-eslint/no-unused-vars -- la firma es solo para TypeScript; se usa `arguments`
function consentCommand(..._args: unknown[]) {
  window.dataLayer = window.dataLayer || [];
  // eslint-disable-next-line prefer-rest-params
  window.dataLayer.push(arguments);
}

function consentState(c: Consent | null) {
  const ads = c?.marketing ? "granted" : "denied";
  return {
    analytics_storage: c?.analytics ? "granted" : "denied",
    ad_storage: ads,
    ad_user_data: ads,
    ad_personalization: ads,
  };
}

let gtmLoaded = false;

/**
 * Google Tag Manager: se carga en cuanto la persona acepta alguna categoría y recibe el consentimiento
 * de cada una (Consent Mode v2). Las etiquetas del contenedor deben respetarlo: GA4 lo hace solo;
 * para el píxel de Meta, exigir "ad_storage" en la configuración de consentimiento de la etiqueta.
 */
export function applyGTM(c: Consent | null) {
  if (!gtmEnabled) return;
  if (gtmLoaded) {
    consentCommand("consent", "update", consentState(c));
    window.dataLayer!.push({ event: "s9_consent_update" });
    return;
  }
  if (!c?.analytics && !c?.marketing) return;
  gtmLoaded = true;
  consentCommand("consent", "default", consentState(c));
  window.dataLayer!.push({ "gtm.start": Date.now(), event: "gtm.js" });
  addScript(`https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(tracking.gtmId)}`);
}

/** Evento para GTM (activador "Evento personalizado"), solo si GTM se ha cargado con consentimiento. */
function gtmEvent(event: string, data: Record<string, unknown> = {}) {
  applyGTM(readConsent());
  if (gtmLoaded) window.dataLayer!.push({ event, ...data });
}

/** Google Analytics 4 directo (sin GTM) — categoría "Análisis". */
export function loadGA() {
  if (!tracking.gaId) return;
  if (window.gtag) {
    window.gtag("consent", "update", { analytics_storage: "granted" });
    return;
  }
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };
  // Mismo estado que GTM: si no, este "default" volvería a denegar la publicidad ya aceptada
  window.gtag("consent", "default", consentState(readConsent()));
  window.gtag("js", new Date());
  window.gtag("config", tracking.gaId);
  addScript(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(tracking.gaId)}`);
}

export function revokeGA() {
  window.gtag?.("consent", "update", { analytics_storage: "denied" });
  deleteCookies((name) => name.startsWith("_ga"));
}

/** Píxel de Meta directo (sin GTM) — categoría "Publicidad". Mismo arranque que el snippet oficial. */
export function loadMeta() {
  if (!tracking.metaPixelId) return;
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
  gtmEvent("generate_lead");
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

/** Clic en un botón de WhatsApp: cuenta como contacto, solo en las categorías aceptadas. */
export function trackWhatsApp() {
  gtmEvent("whatsapp_click");
  const consent = readConsent();
  if (consent?.analytics && gaEnabled) {
    loadGA();
    window.gtag?.("event", "contact", { method: "whatsapp" });
  }
  if (consent?.marketing && metaEnabled) {
    loadMeta();
    window.fbq?.("track", "Contact");
  }
}
