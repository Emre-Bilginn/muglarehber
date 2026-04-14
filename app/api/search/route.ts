import { NextRequest, NextResponse } from "next/server";
import { searchArticles } from "@/lib/content";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q") ?? "";
  const articles = searchArticles(query).map((article) => ({
    slug: article.slug,
    title: article.title,
    excerpt: article.excerpt,
    image: article.image,
    imageAlt: article.imageAlt,
    category: {
      name: article.category.name,
      slug: article.category.slug,
    },
  }));

  return NextResponse.json({ articles });
}
