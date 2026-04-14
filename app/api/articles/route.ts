import { NextRequest, NextResponse } from "next/server";
import { getAllArticles, getFeaturedArticles } from "@/lib/content";

export async function GET(request: NextRequest) {
  const category = request.nextUrl.searchParams.get("category");
  const featured = request.nextUrl.searchParams.get("featured");
  const limit = Number(request.nextUrl.searchParams.get("limit") ?? 10);

  let articles = featured === "true" ? getFeaturedArticles(limit) : getAllArticles();

  if (category) {
    articles = articles.filter((article) => article.category.slug === category);
  }

  return NextResponse.json({
    articles: articles.slice(0, limit).map((article) => ({
      slug: article.slug,
      title: article.title,
      excerpt: article.excerpt,
      description: article.description,
      image: article.image,
      imageAlt: article.imageAlt,
      publishedAt: article.publishedAt,
      readingTime: article.readingTime,
      category: {
        name: article.category.name,
        slug: article.category.slug,
      },
    })),
  });
}
