import type { MetadataRoute } from "next";
import { getAllArticles, guideCategories } from "@/lib/content";
import { absoluteUrl } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "/",
    "/hakkimizda",
    "/iletisim",
    "/gizlilik-politikasi",
    "/cerez-politikasi",
    "/kullanim-sartlari",
  ];

  return [
    ...staticPages.map((path) => ({
      url: absoluteUrl(path),
      changeFrequency: "weekly" as const,
      priority: path === "/" ? 1 : 0.7,
    })),
    ...guideCategories.map((category) => ({
      url: absoluteUrl(`/kategori/${category.slug}`),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...getAllArticles().map((article) => ({
      url: absoluteUrl(`/makale/${article.slug}`),
      lastModified: new Date(article.updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
  ];
}
