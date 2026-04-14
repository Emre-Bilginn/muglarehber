import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { cache } from "react";
import { absoluteUrl } from "@/lib/site-config";

export type CategorySlug =
  | "gezilecek-yerler"
  | "plajlar"
  | "kamp-alanlari"
  | "yeme-icme"
  | "tarihi-yerler"
  | "doga-rotalari"
  | "ilceler";

export interface GuideCategory {
  slug: CategorySlug;
  name: string;
  description: string;
  seoDescription: string;
  intro: string;
  icon: string;
}

export interface GuideAuthor {
  slug: string;
  name: string;
  title: string;
  bio: string;
}

type QuickFacts = {
  idealSeason: string;
  visitDuration: string;
  transport: string;
  suitableFor: string;
  caution: string;
};

type ArticleFrontmatter = {
  title: string;
  slug: string;
  description: string;
  excerpt: string;
  category: CategorySlug;
  district?: string;
  image: string;
  imageAlt: string;
  publishedAt: string;
  updatedAt: string;
  author: string;
  featured?: boolean;
  featuredOrder?: number;
  highlights?: string[];
  related?: string[];
  tags?: string[];
  quickFacts: QuickFacts;
};

export interface TableOfContentsItem {
  id: string;
  text: string;
  level: 2 | 3;
}

export interface GuideArticle {
  title: string;
  slug: string;
  description: string;
  excerpt: string;
  category: GuideCategory;
  district?: string;
  image: string;
  imageAlt: string;
  publishedAt: string;
  updatedAt: string;
  author: GuideAuthor;
  featured: boolean;
  featuredOrder: number;
  highlights: string[];
  related: string[];
  tags: string[];
  quickFacts: QuickFacts;
  body: string;
  wordCount: number;
  readingTime: number;
  tableOfContents: TableOfContentsItem[];
  url: string;
}

const contentDirectory = path.join(process.cwd(), "content", "articles");

export const guideCategories: GuideCategory[] = [
  {
    slug: "gezilecek-yerler",
    name: "Gezilecek Yerler",
    description:
      "Muğla'da ilk kez gezecekler için öne çıkan duraklar, planlı rota önerileri ve sahada işe yarayan ziyaret notları.",
    seoDescription:
      "Muğla'da gezilecek yerler rehberi: ilçelere göre görülecek noktalar, rota fikirleri, ziyaret zamanı ve pratik ipuçları.",
    intro:
      "Bu kategori, Muğla'yı ilk kez gezecek okurlara yalnızca popüler isimleri değil, o yerleri nasıl planlamak gerektiğini de anlatır. Kısa tanıtım yerine rota mantığı, gün planı ve çevredeki tamamlayıcı duraklara odaklanır.",
    icon: "Compass",
  },
  {
    slug: "plajlar",
    name: "Plajlar",
    description:
      "Kalabalık, sakin, çocuk dostu ya da erken saat isteyen plajlar için karşılaştırmalı Muğla sahil rehberleri.",
    seoDescription:
      "Muğla plaj rehberi: Datça, Bodrum, Fethiye ve çevresindeki koylar, plaj karakterleri, sezon önerileri ve dikkat edilmesi gerekenler.",
    intro:
      "Muğla kıyıları aynı başlık altında toplanamayacak kadar çeşitlidir. Bu bölümde plajların su yapısı, kalabalık seviyesi, ulaşım zorluğu ve hangi ziyaretçi profiline daha uygun olduğu net biçimde özetlenir.",
    icon: "Waves",
  },
  {
    slug: "kamp-alanlari",
    name: "Kamp Alanları",
    description:
      "Muğla'da kamp planlayanlar için altyapı, manzara, araç erişimi ve sezon risklerini birlikte değerlendiren içerikler.",
    seoDescription:
      "Muğla kamp alanları rehberi: çadır ve karavan için uygun bölgeler, altyapı durumu, ulaşım, sezon yoğunluğu ve güvenlik notları.",
    intro:
      "Kamp rehberlerinde en çok eksik kalan detay, yalnızca manzara anlatılıp saha koşullarının atlanmasıdır. Bu kategori; gölge, duş, market erişimi, yol durumu ve yoğunluk yönetimi gibi gerçek karar unsurlarını öne çıkarır.",
    icon: "TentTree",
  },
  {
    slug: "yeme-icme",
    name: "Yeme İçme",
    description:
      "Muğla mutfağını sadece mekan listesi olarak değil, yerel ürünler, bölgesel farklar ve sipariş önerileriyle anlatan rehberler.",
    seoDescription:
      "Muğla yeme içme rehberi: yerel lezzetler, hangi ilçede ne yenir, ne zaman tercih edilir ve sipariş ederken nelere dikkat edilir.",
    intro:
      "Bu bölümde yalnızca restoran adı sıralanmaz. Muğla mutfağının ot, zeytinyağı, deniz ürünü ve yöresel tatlı ekseninde nasıl şekillendiği; ziyaretçinin sofrada ne araması gerektiğiyle birlikte anlatılır.",
    icon: "UtensilsCrossed",
  },
  {
    slug: "tarihi-yerler",
    name: "Tarihi Yerler",
    description:
      "Antik kentler, kaya mezarları ve arkeolojik alanlar için tarih ile ziyaret deneyimini birlikte ele alan Muğla rehberleri.",
    seoDescription:
      "Muğla tarihi yerler rehberi: antik kentler, müzeler, kaya mezarları ve ziyaret öncesi bilinmesi gereken tarihsel bağlam.",
    intro:
      "Tarihi alanları gezerken yalnızca isim bilmek yetmez; bölgenin yerleşim mantığı, öne çıkan yapıların neden önemli olduğu ve ziyaret sırası deneyimi ciddi biçimde değiştirir. Bu kategori, tam olarak bu boşluğu doldurur.",
    icon: "Landmark",
  },
  {
    slug: "doga-rotalari",
    name: "Doğa Rotaları",
    description:
      "Kanyon, tekne, yürüyüş ve manzara odaklı açık hava rotaları için sahada uygulanabilir planlar.",
    seoDescription:
      "Muğla doğa rotaları rehberi: kanyonlar, tekne güzergahları, kısa yürüyüşler ve açık hava deneyimleri için planlama notları.",
    intro:
      "Doğa rotaları kategorisi, yalnızca 'güzel manzara' anlatmak yerine gün içi akışı, ekipman ihtiyacını, yoğun saatleri ve çocuklu ya da tempolu gezen ziyaretçilere uygunluğu açıklar.",
    icon: "Route",
  },
  {
    slug: "ilceler",
    name: "İlçeler",
    description:
      "Fethiye, Akyaka, Bodrum, Datça ve diğer Muğla ilçelerini karakterine göre okumanızı sağlayan kapsamlı bölge rehberleri.",
    seoDescription:
      "Muğla ilçeleri rehberi: Fethiye, Akyaka ve diğer bölgeler için gezi karakteri, konaklama yaklaşımı ve içerik planlama önerileri.",
    intro:
      "Her ilçe aynı ziyaret biçimini istemez. Bu kategori, Muğla ilçelerini kalabalık düzeyi, gezi temposu, ulaşım pratikliği ve beklenti uyumu açısından karşılaştırmalı biçimde ele alır.",
    icon: "MapPinned",
  },
];

export const guideAuthors: GuideAuthor[] = [
  {
    slug: "editor-ekibi",
    name: "Keşfet Muğla Editör Ekibi",
    title: "Yerel rota editörleri",
    bio: "İlçe bazlı saha notlarını, sezon değişimlerini ve okuyucu sorularından çıkan pratik ihtiyaçları derleyerek içerikleri düzenli aralıklarla günceller.",
  },
  {
    slug: "selin-yilmaz",
    name: "Selin Yılmaz",
    title: "Kıyı rotaları editörü",
    bio: "Sahil hattı, kısa kaçamak planları ve aile dostu rota akışları üzerine çalışan editör.",
  },
  {
    slug: "emre-demir",
    name: "Emre Demir",
    title: "Açık hava ve kamp editörü",
    bio: "Kamp, yürüyüş ve doğa odaklı planlamalarda saha koşullarını öne çıkaran içerikler hazırlar.",
  },
];

function slugifyHeading(value: string) {
  return value
    .toLocaleLowerCase("tr")
    .replace(/[^a-z0-9ğüşöçıİĞÜŞÖÇ\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function stripMarkdown(value: string) {
  return value
    .replace(/^#{2,3}\s+/gm, "")
    .replace(/^\-\s+/gm, "")
    .replace(/\*\*/g, "")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

function countWords(value: string) {
  const normalized = stripMarkdown(value);
  if (!normalized) {
    return 0;
  }

  return normalized.split(/\s+/).filter(Boolean).length;
}

function extractTableOfContents(content: string): TableOfContentsItem[] {
  return content
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("## "))
    .map((line) => ({
      id: slugifyHeading(line.replace(/^##\s+/, "")),
      text: line.replace(/^##\s+/, ""),
      level: 2 as const,
    }));
}

function getCategory(slug: CategorySlug) {
  const category = guideCategories.find((item) => item.slug === slug);

  if (!category) {
    throw new Error(`Unknown category slug: ${slug}`);
  }

  return category;
}

function getAuthor(slug: string) {
  const author = guideAuthors.find((item) => item.slug === slug);

  if (!author) {
    throw new Error(`Unknown author slug: ${slug}`);
  }

  return author;
}

function parseArticle(fileName: string): GuideArticle {
  const filePath = path.join(contentDirectory, fileName);
  const source = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(source);
  const frontmatter = data as ArticleFrontmatter;

  const category = getCategory(frontmatter.category);
  const author = getAuthor(frontmatter.author);
  const body = content.trim();
  const wordCount = countWords(body);

  return {
    title: frontmatter.title,
    slug: frontmatter.slug,
    description: frontmatter.description,
    excerpt: frontmatter.excerpt,
    category,
    district: frontmatter.district,
    image: frontmatter.image,
    imageAlt: frontmatter.imageAlt,
    publishedAt: frontmatter.publishedAt,
    updatedAt: frontmatter.updatedAt,
    author,
    featured: Boolean(frontmatter.featured),
    featuredOrder: frontmatter.featuredOrder ?? 99,
    highlights: frontmatter.highlights ?? [],
    related: frontmatter.related ?? [],
    tags: frontmatter.tags ?? [],
    quickFacts: frontmatter.quickFacts,
    body,
    wordCount,
    readingTime: Math.max(4, Math.ceil(wordCount / 220)),
    tableOfContents: extractTableOfContents(body),
    url: absoluteUrl(`/makale/${frontmatter.slug}`),
  };
}

export const getAllArticles = cache(() => {
  if (!fs.existsSync(contentDirectory)) {
    return [] as GuideArticle[];
  }

  return fs
    .readdirSync(contentDirectory)
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => parseArticle(fileName))
    .sort((left, right) =>
      new Date(right.publishedAt).getTime() - new Date(left.publishedAt).getTime(),
    );
});

export function getFeaturedArticles(limit = 4) {
  return getAllArticles()
    .filter((article) => article.featured)
    .sort((left, right) => left.featuredOrder - right.featuredOrder)
    .slice(0, limit);
}

export function getLatestArticles(limit = 6) {
  return getAllArticles().slice(0, limit);
}

export function getArticleBySlug(slug: string) {
  return getAllArticles().find((article) => article.slug === slug) ?? null;
}

export function getArticlesByCategory(slug: string) {
  return getAllArticles().filter((article) => article.category.slug === slug);
}

export function getCategoryBySlug(slug: string) {
  return guideCategories.find((category) => category.slug === slug) ?? null;
}

export function getCategoriesWithCounts() {
  return guideCategories.map((category) => ({
    ...category,
    articleCount: getArticlesByCategory(category.slug).length,
  }));
}

export function getRelatedArticles(article: GuideArticle, limit = 3) {
  const articles = getAllArticles().filter((candidate) => candidate.slug !== article.slug);
  const manual = article.related
    .map((slug) => articles.find((candidate) => candidate.slug === slug))
    .filter(Boolean) as GuideArticle[];

  const sameCategory = articles.filter(
    (candidate) =>
      candidate.category.slug === article.category.slug &&
      !manual.some((item) => item.slug === candidate.slug),
  );

  return [...manual, ...sameCategory].slice(0, limit);
}

export function getPrevNextArticles(article: GuideArticle) {
  const articles = [...getAllArticles()].sort(
    (left, right) =>
      new Date(left.publishedAt).getTime() - new Date(right.publishedAt).getTime(),
  );
  const currentIndex = articles.findIndex((item) => item.slug === article.slug);

  return {
    previous: currentIndex > 0 ? articles[currentIndex - 1] : null,
    next: currentIndex >= 0 && currentIndex < articles.length - 1 ? articles[currentIndex + 1] : null,
  };
}

export function searchArticles(query: string) {
  const normalizedQuery = query.trim().toLocaleLowerCase("tr");

  if (normalizedQuery.length < 2) {
    return [];
  }

  return getAllArticles()
    .filter((article) => {
      const haystack = [
        article.title,
        article.description,
        article.excerpt,
        article.category.name,
        article.body,
        article.tags.join(" "),
      ]
        .join(" ")
        .toLocaleLowerCase("tr");

      return haystack.includes(normalizedQuery);
    })
    .slice(0, 8);
}
