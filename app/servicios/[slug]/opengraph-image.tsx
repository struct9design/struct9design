import { getService, services } from "@/content/services";
import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const alt = "Servicio de struct9";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const s = getService((await params).slug)!;
  return ogImage({ eyebrow: s.name, title: s.h1 });
}
