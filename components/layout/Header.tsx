"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { buttonClasses } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";

export type NavLink = { href: string; label: string };

type HeaderProps = {
  /** Enlaces de navegación en escritorio (≥760px). */
  nav?: NavLink[];
  /** Botón principal. `short` es el texto en móvil. */
  cta?: NavLink & { short?: string };
  /** Enlaces del menú desplegable en móvil. Sin él no hay botón de menú. */
  menu?: NavLink[];
  /** Enlace suelto junto al CTA en móvil (p. ej. "Inicio" en servicios). */
  mobileLink?: NavLink;
  /** Mantiene los enlaces de `nav` también en móvil (página de contacto). */
  navAlways?: boolean;
  /** Cabecera simple sin sticky (gracias y 404). */
  minimal?: boolean;
  /** Barra secundaria bajo la cabecera (pestañas de servicios). */
  children?: ReactNode;
};

export function Header({ nav = [], cta, menu, mobileLink, navAlways, minimal, children }: HeaderProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const mq = window.matchMedia("(min-width: 760px)");
    const onMq = () => mq.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    return () => {
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, [open]);

  // "Servicios" (/servicios) sigue activo en /servicios/[slug]
  const current = (href: string) =>
    href === pathname || (href !== "/" && !href.includes("#") && pathname.startsWith(`${href}/`)) ? "page" : undefined;
  const linkClass = (href: string) =>
    cn(
      "text-[14.5px] whitespace-nowrap",
      current(href) ? "font-semibold !text-tinta" : "font-medium !text-pizarra hover:!text-tinta",
    );

  return (
    <header
      className={cn(
        "border-b border-niebla",
        minimal ? "bg-white" : "sticky top-0 z-40 bg-white/90 backdrop-blur-[10px]",
      )}
    >
      <div className={cn("wrap gutter flex items-center gap-6", minimal ? "py-4" : "py-3.5")}>
        <Link href="/" aria-label="struct9, inicio" className="flex-none">
          <Logo className="w-[92px]" />
        </Link>

        {(nav.length > 0 || cta) && (
          <nav
            aria-label="Principal"
            className={cn(
              "ml-auto items-center gap-[clamp(14px,2.2vw,30px)]",
              navAlways ? "flex" : "hidden nav:flex",
            )}
          >
            {nav.map((l) => (
              <Link key={l.href} href={l.href} aria-current={current(l.href)} className={linkClass(l.href)}>
                {l.label}
              </Link>
            ))}
            {cta && (
              <Link href={cta.href} className={buttonClasses("primary", "nav")}>
                {cta.label}
              </Link>
            )}
          </nav>
        )}

        {!navAlways && (cta || menu || mobileLink) && (
          <div className="ml-auto flex items-center gap-2.5 nav:hidden">
            {cta && (
              <Link
                href={cta.href}
                className="rounded-lg bg-senal px-4 py-2.5 text-sm font-semibold whitespace-nowrap !text-white transition-colors duration-[250ms] hover:bg-tinta"
              >
                {cta.short ?? cta.label}
              </Link>
            )}
            {mobileLink && (
              <Link href={mobileLink.href} className="px-1 py-2.5 text-sm font-semibold !text-tinta">
                {mobileLink.label}
              </Link>
            )}
            {menu && (
              <button
                type="button"
                aria-expanded={open}
                aria-controls="menu-movil"
                aria-label={open ? "Cerrar menú" : "Abrir menú"}
                onClick={() => setOpen((o) => !o)}
                className="flex size-10 flex-col items-center justify-center gap-1 rounded-lg border border-niebla bg-white"
              >
                <span aria-hidden="true" className="block h-[1.5px] w-4 bg-tinta" />
                <span aria-hidden="true" className="block h-[1.5px] w-4 bg-tinta" />
                <span aria-hidden="true" className="block h-[1.5px] w-4 bg-tinta" />
              </button>
            )}
          </div>
        )}
      </div>

      {menu && open && (
        <nav
          id="menu-movil"
          aria-label="Principal móvil"
          className="gutter grid gap-0.5 border-t border-niebla bg-white pt-2.5 pb-[18px] nav:hidden"
        >
          {menu.map((l, i) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={cn(
                "py-3 text-base font-medium !text-tinta",
                i < menu.length - 1 && "border-b border-nieve",
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}

      {children}
    </header>
  );
}
