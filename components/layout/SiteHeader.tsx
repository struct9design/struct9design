import { Header } from "./Header";

/** Cabecera estándar de páginas interiores (blog, legales): Inicio, Servicios, Blog, Contacto + CTA. */
export function SiteHeader() {
  const links = [
    { href: "/", label: "Inicio" },
    { href: "/servicios", label: "Servicios" },
    { href: "/blog", label: "Blog" },
    { href: "/contacto", label: "Contacto" },
  ];
  return <Header nav={links} cta={{ href: "/contacto", label: "Pide tu presupuesto", short: "Presupuesto" }} menu={links} />;
}
