import { NextRequest, NextResponse } from "next/server";
import { searchArticles } from "@/lib/content";
import { getDestinationBySlug } from "@/lib/destinations";
import { placeTypeLabels, searchPlaces } from "@/lib/places";

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
  const places = searchPlaces(query).map((place) => {
    const destination = getDestinationBySlug(place.destinationSlug);

    return {
      slug: place.slug,
      name: place.name,
      shortDescription: place.shortDescription,
      heroImage: place.heroImage,
      placeType: place.placeType,
      placeTypeLabel: placeTypeLabels[place.placeType],
      destination: destination
        ? { name: destination.name, slug: destination.slug }
        : null,
    };
  });

  return NextResponse.json({ articles, places });
}
