/**
 * Consentimiento de cookies guardado en la cookie propia `s9-consent` durante 12 meses.
 * Una decisión por finalidad (criterio AEPD): análisis y publicidad por separado.
 */
export type Consent = { analytics: boolean; marketing: boolean; date: string };
export type ConsentChoice = Omit<Consent, "date">;

export const CONSENT_COOKIE = "s9-consent";
export const OPEN_COOKIES_EVENT = "s9-open-cookies";
export const CONSENT_CHANGE_EVENT = "s9-consent-change";

const MAX_AGE = 60 * 60 * 24 * 365;

export function readConsent(): Consent | null {
  if (typeof document === "undefined") return null;
  const raw = document.cookie
    .split("; ")
    .find((c) => c.startsWith(`${CONSENT_COOKIE}=`))
    ?.slice(CONSENT_COOKIE.length + 1);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(decodeURIComponent(raw));
    // Un consentimiento antiguo sin la categoría "marketing" no vale: se vuelve a preguntar
    if (typeof parsed?.analytics !== "boolean" || typeof parsed?.marketing !== "boolean") return null;
    return parsed;
  } catch {
    return null;
  }
}

export function writeConsent(choice: ConsentChoice): Consent {
  const consent: Consent = { ...choice, date: new Date().toISOString() };
  const secure = location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${CONSENT_COOKIE}=${encodeURIComponent(JSON.stringify(consent))}; Max-Age=${MAX_AGE}; Path=/; SameSite=Lax${secure}`;
  window.dispatchEvent(new CustomEvent<Consent>(CONSENT_CHANGE_EVENT, { detail: consent }));
  return consent;
}

export function openCookieSettings() {
  window.dispatchEvent(new Event(OPEN_COOKIES_EVENT));
}
