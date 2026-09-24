import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const alt = "struct9 · Del caos al sistema";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({ eyebrow: "Del caos al sistema", title: "Webs, automatización y vídeo para negocios que quieren crecer." });
}
