import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/site-config";

type MetadataInput = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  keywords?: string[];
  type?: "website" | "article";
};

export function buildMetadata({
  title,
  description,
  path = "/",
  image = siteConfig.ogImage,
  keywords = [],
  type = "website",
}: MetadataInput): Metadata {
  const canonical = absoluteUrl(path);
  const resolvedImage = image.startsWith("http") ? image : absoluteUrl(image);

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: siteConfig.name,
      type,
      locale: siteConfig.locale,
      images: [
        {
          url: resolvedImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [resolvedImage],
    },
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: absoluteUrl("/"),
    logo: absoluteUrl("/icon.png"),
    sameAs: [],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: siteConfig.contactEmail,
        areaServed: "TR",
        availableLanguage: ["tr-TR"],
      },
    ],
  };
}

export function breadcrumbSchema(
  items: Array<{ name: string; url: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

type ArticleSchemaInput = {
  title: string;
  description: string;
  url: string;
  image: string;
  publishedAt: string;
  updatedAt: string;
  authorName: string;
  categoryName: string;
};

export function articleSchema(input: ArticleSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    mainEntityOfPage: input.url,
    image: [input.image],
    datePublished: input.publishedAt,
    dateModified: input.updatedAt,
    articleSection: input.categoryName,
    inLanguage: "tr-TR",
    author: {
      "@type": "Person",
      name: input.authorName,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/icon.png"),
      },
    },
  };
}
