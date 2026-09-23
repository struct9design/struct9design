import Link from "next/link";
import { CookieSettingsButton } from "@/components/cookies/CookieSettingsButton";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";

const legalLinks = [
  { href: "/aviso-legal", short: "Aviso legal", long: "Aviso legal" },
  { href: "/privacidad", short: "Privacidad", long: "Política de privacidad" },
  { href: "/cookies", short: "Cookies", long: "Política de cookies" },
];

const muted = "!text-pizarra hover:!text-tinta";
const colTitle = "mb-1 font-display text-[12.5px] font-bold tracking-[.1em] text-tinta uppercase";

type FooterProps = {
  /**
   * full: cuatro columnas (home y servicios) · legal: logo + enlaces en línea ·
   * compact: enlaces legales y © (contacto, gracias, 404)
   */
  variant?: "full" | "legal" | "compact";
  /** Enlaces de la columna "Agencia" (varían entre home y servicios). */
  agency?: { href: string; label: string }[];
  /** Muestra "Configurar cookies" en la variante compacta. */
  cookieSettings?: boolean;
};

export function Footer({ variant = "full", agency, cookieSettings = true }: FooterProps) {
  if (variant === "full") {
    return (
      <footer className="gutter bg-white pt-[clamp(36px,6vw,72px)] pb-[34px]">
        <div className="wrap">
          <div className="grid grid-cols-2 items-start gap-x-5 gap-y-8 nav:grid-cols-[repeat(auto-fit,minmax(min(100%,210px),1fr))] nav:gap-[34px]">
            <div className="col-span-2 nav:col-span-1">
              <Logo className="w-[88px]" />
              <p className="mt-3.5 max-w-[30ch] text-[14.5px] leading-[1.6] text-pizarra">{site.tagline}</p>
            </div>
            <nav aria-label="Servicios" className="grid content-start gap-2.5">
              <p className={colTitle}>Servicios</p>
              {services.map((s) => (
                <Link key={s.slug} href={`/servicios/${s.slug}`} className={cn("text-[14.5px]", muted)}>
                  {s.name}
                </Link>
              ))}
            </nav>
            <nav aria-label="Agencia" className="grid content-start gap-2.5">
              <p className={colTitle}>Agencia</p>
              {(agency ?? []).map((l) => (
                <Link key={l.href} href={l.href} className={cn("text-[14.5px]", muted)}>
                  {l.label}
                </Link>
              ))}
            </nav>
            <nav
              aria-label="Legal"
              className="col-span-2 flex flex-wrap content-start gap-x-5 gap-y-2.5 nav:col-span-1 nav:grid"
            >
              <p className={cn(colTitle, "w-full")}>Legal</p>
              {legalLinks.map((l) => (
                <Link key={l.href} href={l.href} className={cn("text-[14.5px]", muted)}>
                  {l.long}
                </Link>
              ))}
              <CookieSettingsButton className="text-left text-[14.5px]" />
            </nav>
          </div>
          <div className="mt-8 flex flex-wrap justify-between gap-3 border-t border-niebla pt-[22px] text-[13.5px] text-pizarra">
            <p>© 2026 struct9. Todos los derechos reservados.</p>
            <p>Hecho en España</p>
          </div>
        </div>
      </footer>
    );
  }

  const links = (
    <nav aria-label="Legal" className="flex flex-wrap gap-x-[22px] gap-y-2">
      {legalLinks.map((l) => (
        <Link key={l.href} href={l.href} className={cn("text-sm", muted)}>
          {l.short}
        </Link>
      ))}
      {cookieSettings && <CookieSettingsButton className="text-sm" />}
    </nav>
  );

  if (variant === "legal") {
    return (
      <footer className="gutter border-t border-niebla py-8">
        <div className="wrap flex flex-wrap items-center justify-between gap-x-8 gap-y-[18px]">
          <Logo className="w-[78px]" />
          {links}
          <p className="text-[13.5px] text-pizarra">© 2026 struct9</p>
        </div>
      </footer>
    );
  }

  return (
    <footer className="gutter border-t border-niebla py-7">
      <div className="wrap flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
        {links}
        <p className="text-[13.5px] text-pizarra">© 2026 struct9</p>
      </div>
    </footer>
  );
}
