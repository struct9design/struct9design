import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import { Tracking } from "@/components/cookies/Tracking";
import { CookieBanner } from "@/components/cookies/CookieBanner";
import { RevealObserver } from "@/components/ui/RevealObserver";
import { site } from "@/content/site";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const description =
  "Webs que se entienden, procesos que funcionan solos y decisiones con criterio. Nos encargamos de la parte digital para que tú te dediques a tu negocio.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Diseño web y automatización para negocios · struct9",
    template: "%s · struct9",
  },
  description,
  applicationName: site.name,
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: site.locale,
    title: "Diseño web y automatización para negocios · struct9",
    description,
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" data-scroll-behavior="smooth" className={`${manrope.variable} ${inter.variable}`}>
      <body>
        {/* Sin JavaScript no hay IntersectionObserver: se muestra todo */}
        <noscript>
          <style>{"[data-reveal]{opacity:1!important;transform:none!important}[data-draw-x]{width:100%!important}[data-draw-y]{height:100%!important}"}</style>
        </noscript>
        {children}
        <RevealObserver />
        <CookieBanner />
        <Tracking />
      </body>
    </html>
  );
}
