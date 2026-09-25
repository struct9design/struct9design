import type { NextConfig } from "next";

const securityHeaders = [
  // Prevent clickjacking — disallow embedding in iframes
  { key: "X-Frame-Options", value: "DENY" },
  // Prevent MIME-type sniffing
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Limit referrer info on cross-origin requests
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Disable camera, mic, geolocation by default
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  // Force HTTPS for 2 years (only sent over HTTPS by browsers)
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  serverExternalPackages: ["pdfkit"],
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async redirects() {
    return [
      // Artículos retirados: sus visitas van a los que los sustituyen
      { source: "/blog/automatizacion-n8n-trabajo-repetitivo", destination: "/blog/reservas-whatsapp-restaurante", permanent: true },
      { source: "/blog/ia-rendimiento-trabajadores", destination: "/blog/videos-inmobiliaria-a-partir-de-fotos", permanent: true },
    ];
  },
};

export default nextConfig;
