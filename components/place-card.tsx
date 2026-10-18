import Link from "next/link";
import SafeImage from "@/components/ui/safe-image";
import type { Place } from "@/lib/places";
import { placeTypeLabels } from "@/lib/places";
import { getDestinationBySlug } from "@/lib/destinations";
import { formatDistance } from "@/lib/place-location";

export default function PlaceCard({ place, distanceKm }: { place: Place; distanceKm?: number | null }) {
  const distance = formatDistance(distanceKm ?? null);
  const destination = getDestinationBySlug(place.destinationSlug);

  return (
    <article className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm">
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <SafeImage src={place.heroImage} alt={`${place.name} görseli`} fill sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw" className="object-cover" debugLabel={`place-card:${place.slug}`} />
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-900">{placeTypeLabels[place.placeType]}</span>
      </div>
      <div className="p-5">
        {destination ? <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">{destination.name}</p> : null}
        <h3 className="text-xl font-semibold tracking-tight text-slate-950">{place.name}</h3>
        <p className="mt-3 text-sm leading-7 text-slate-600">{place.shortDescription}</p>
        {distance ? <p className="mt-4 text-sm font-medium text-slate-700">Kuş uçuşu mesafe: {distance}</p> : null}
        {place.visitDuration ? <p className="mt-4 text-sm font-medium text-slate-700">Önerilen süre: {place.visitDuration}</p> : null}
        <Link href={`/yer/${place.slug}`} className="mt-5 inline-flex text-sm font-semibold text-sky-700 hover:text-sky-800">Detayları gör</Link>
      </div>
    </article>
  );
}
