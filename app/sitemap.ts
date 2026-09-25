import type { MetadataRoute } from "next";
import { legalDocs } from "@/content/legal";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { articles } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => `${site.url}${path}`;
  return [
    { url: url("/"), changeFrequency: "monthly", priority: 1 },
    { url: url("/servicios"), changeFrequency: "monthly", priority: 0.9 },
    ...services.map((s) => ({ url: url(`/servicios/${s.slug}`), changeFrequency: "monthly" as const, priority: 0.9 })),
    { url: url("/contacto"), changeFrequency: "yearly", priority: 0.8 },
    { url: url("/blog"), changeFrequency: "weekly", priority: 0.7 },
    ...articles.map((a) => ({ url: url(`/blog/${a.slug}`), lastModified: a.date, changeFrequency: "yearly" as const, priority: 0.6 })),
    ...legalDocs.map((d) => ({ url: url(`/${d.slug}`), changeFrequency: "yearly" as const, priority: 0.2 })),
  ];
}
