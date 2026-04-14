import { NextResponse } from "next/server";
import { getCategoriesWithCounts } from "@/lib/content";

export async function GET() {
  return NextResponse.json({
    categories: getCategoriesWithCounts().map((category) => ({
      slug: category.slug,
      name: category.name,
      description: category.description,
      icon: category.icon,
      articleCount: category.articleCount,
    })),
  });
}
