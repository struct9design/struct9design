import { articles, getArticle } from "@/lib/blog";
import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const alt = "Artículo del blog de struct9";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const a = getArticle((await params).slug)!;
  return ogImage({ eyebrow: `Blog · ${a.category}`, title: a.title });
}
