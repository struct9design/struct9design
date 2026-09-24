/**
 * Imagen de vista previa al compartir un enlace (WhatsApp, LinkedIn, redes…).
 * La usan los archivos `opengraph-image.tsx` de la home, los servicios y el blog.
 */
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const fonts = Promise.all([
  readFile(join(process.cwd(), "assets/Manrope-ExtraBold.ttf")),
  readFile(join(process.cwd(), "assets/Manrope-Medium.ttf")),
  readFile(join(process.cwd(), "public/isotipo.svg"), "utf8"),
]);

export async function ogImage({ eyebrow, title }: { eyebrow: string; title: string }) {
  const [extraBold, medium, isotipo] = await fonts;
  const logo = `data:image/svg+xml;base64,${Buffer.from(isotipo).toString("base64")}`;
  const long = title.length > 70;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 80px",
        background: "#FFFFFF",
        backgroundImage: "radial-gradient(#D9DEE5 1.6px, transparent 1.6px)",
        backgroundSize: "24px 24px",
        fontFamily: "Manrope",
        color: "#13294B",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logo} width={72} height={72} alt="" />
        <div style={{ fontSize: 40, fontWeight: 800, letterSpacing: -1 }}>struct9</div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
        <div
          style={{
            display: "flex",
            fontSize: 26,
            fontWeight: 500,
            color: "#2A62F0",
            textTransform: "uppercase",
            letterSpacing: 3,
          }}
        >
          {eyebrow}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: long ? 56 : 68,
            fontWeight: 800,
            lineHeight: 1.08,
            letterSpacing: -2,
            maxWidth: 1000,
          }}
        >
          {title}
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 26, fontWeight: 500, color: "#5B6675" }}>
        <div style={{ width: 12, height: 12, borderRadius: 6, background: "#2A62F0" }} />
        struct9design.com
      </div>
    </div>,
    {
      ...ogSize,
      fonts: [
        { name: "Manrope", data: extraBold, weight: 800, style: "normal" },
        { name: "Manrope", data: medium, weight: 500, style: "normal" },
      ],
    },
  );
}
