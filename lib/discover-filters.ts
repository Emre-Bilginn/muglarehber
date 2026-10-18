import { getPublishedDestinations } from "@/lib/destinations";
import { getPublishedPlaces, type PlaceType } from "@/lib/places";

const publishedPlaces = getPublishedPlaces();
const availableDestinationSlugs = [...new Set(publishedPlaces.map((place) => place.destinationSlug))];
const availableDestinations = getPublishedDestinations().filter((destination) => availableDestinationSlugs.includes(destination.slug));
const availableTypes = [...new Set(publishedPlaces.map((place) => place.placeType))] as PlaceType[];

export function getDiscoverFilterOptions() {
  return { availableDestinationSlugs, availableDestinations, availableTypes };
}

export function parseDiscoverFilters(searchParams: URLSearchParams) {
  const rawDestination = searchParams.get("destination") ?? "";
  const rawType = searchParams.get("type") ?? "";

  return {
    destinationSlug: availableDestinationSlugs.includes(rawDestination) ? rawDestination : "",
    placeType: availableTypes.includes(rawType as PlaceType) ? (rawType as PlaceType) : undefined,
    query: searchParams.get("q") ?? "",
  };
}

export function buildDiscoverHref(
  currentParams: URLSearchParams,
  next: { destination?: string; type?: string; q?: string },
) {
  const params = new URLSearchParams(currentParams.toString());

  Object.entries(next).forEach(([key, value]) => {
    if (value) params.set(key, value);
    else params.delete(key);
  });

  const queryString = params.toString();
  return queryString ? `/kesfet?${queryString}` : "/kesfet";
}
