import Link from "next/link";
import { MapPin } from "lucide-react";
import { notFound } from "next/navigation";
import ArticleCard from "@/components/article-card";
import PlaceCard from "@/components/place-card";
import SiteBreadcrumbs from "@/components/site-breadcrumbs";
import SafeImage from "@/components/ui/safe-image";
import { getArticlesByPlace } from "@/lib/content";
import { getDestinationBySlug } from "@/lib/destinations";
import { getNearbyPlaces, getPlaceBySlug, getPlaceDirectionsUrl, getPublishedPlaces, placeTypeLabels } from "@/lib/places";
import { breadcrumbSchema, buildMetadata, placeSchema } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site-config";

type PlacePageProps = { params: { slug: string } };

export function generateStaticParams() {
  return getPublishedPlaces().map((place) => ({ slug: place.slug }));
}

export function generateMetadata({ params }: PlacePageProps) {
  const place = getPlaceBySlug(params.slug);
  if (!place) {
    return buildMetadata({ title: "Yer bulunamadı | Keşfet Muğla", description: "İstenen yer bulunamadı.", path: `/yer/${params.slug}` });
  }

  return buildMetadata({
    title: `${place.name} | Keşfet Muğla`,
    description: place.shortDescription,
    path: `/yer/${place.slug}`,
    image: place.heroImage ?? undefined,
    keywords: [place.name, placeTypeLabels[place.placeType], "Muğla", "gezi rehberi"],
  });
}

export default function PlacePage({ params }: PlacePageProps) {
  const place = getPlaceBySlug(params.slug);
  if (!place) notFound();

  const destination = getDestinationBySlug(place.destinationSlug);
  if (!destination) notFound();

  const articles = getArticlesByPlace(place.slug);
  const nearbyPlaces = getNearbyPlaces(place, 3);
  const pageUrl = absoluteUrl(`/yer/${place.slug}`);
  const directionsUrl = getPlaceDirectionsUrl(place);
  const breadcrumbJsonLd = breadcrumbSchema([
    { name: "Ana sayfa", url: absoluteUrl("/") },
    { name: destination.name, url: absoluteUrl(`/mugla/${destination.slug}`) },
    { name: place.name, url: pageUrl },
  ]);
  const placeJsonLd = placeSchema({
    name: place.name,
    description: place.description,
    url: pageUrl,
    image: place.heroImage ? absoluteUrl(place.heroImage) : undefined,
    destinationName: destination.name,
    isTown: place.placeType === "TOWN",
    latitude: place.latitude,
    longitude: place.longitude,
  });
  const details = [
    ["Önerilen süre", place.visitDuration],
    ["En uygun zaman", place.bestVisitTime],
    ["Ulaşım", place.accessInfo],
    ["Otopark", place.parkingInfo],
    ["Erişilebilirlik", place.accessibilityInfo],
  ].filter((item): item is [string, string] => Boolean(item[1]));

  return (
    <div className="bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(placeJsonLd) }} />
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:py-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <SiteBreadcrumbs items={[{ label: "Ana sayfa", href: "/" }, { label: destination.name, href: `/mugla/${destination.slug}` }, { label: place.name }]} />
            <Link href={`/mugla/${destination.slug}`} className="mt-8 inline-flex rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800">{destination.name} destinasyonu</Link>
            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">{placeTypeLabels[place.placeType]}</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950 md:text-5xl">{place.name}</h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">{place.shortDescription}</p>
            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600">{place.description}</p>
          </div>
          <div className="relative aspect-[16/10] overflow-hidden rounded-[2.25rem] border border-slate-200 bg-slate-100 shadow-sm"><SafeImage src={place.heroImage} alt={`${place.name} görseli`} fill priority sizes="(min-width: 1024px) 46vw, 100vw" className="object-cover" debugLabel={`place-hero:${place.slug}`} /></div>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-8">
          {details.length > 0 ? <div className="grid gap-4 md:grid-cols-2">{details.map(([label, value]) => <div key={label} className="rounded-[1.5rem] border border-slate-200 bg-white p-5"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{label}</p><p className="mt-3 text-sm leading-7 text-slate-700">{value}</p></div>)}</div> : null}
          {articles.length > 0 ? <section><p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">İlgili rehberler</p><h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">{place.name} için okuma önerileri</h2><div className="mt-6 grid gap-6 md:grid-cols-2">{articles.map((article) => <ArticleCard key={article.slug} article={article} />)}</div></section> : null}
          {nearbyPlaces.length > 0 ? <section><p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">Aynı destinasyonda</p><h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">Yakındaki yerleri keşfet</h2><p className="mt-3 text-sm leading-7 text-slate-600">Mesafeler kuş uçuşudur; karayolu ulaşım mesafesi değildir.</p><div className="mt-6 grid gap-6 md:grid-cols-2">{nearbyPlaces.map(({ place: nearbyPlace, distanceKm }) => <PlaceCard key={nearbyPlace.slug} place={nearbyPlace} distanceKm={distanceKm} />)}</div></section> : null}
        </div>
        <aside className="space-y-6">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Konum</p>{place.latitude != null && place.longitude != null ? <p className="mt-3 text-sm leading-7 text-slate-600">Koordinat bilgisi hazır.</p> : <p className="mt-3 text-sm leading-7 text-slate-600">Kesin koordinat bilgisi bu aşamada yayınlanmadı.</p>}<a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white hover:bg-slate-800"><MapPin className="h-4 w-4" />Yol tarifi al</a></div>
          <Link href={`/mugla/${destination.slug}`} className="block rounded-[1.5rem] border border-slate-200 bg-slate-50 px-5 py-5 text-sm font-medium text-slate-700 hover:border-slate-300">{destination.name} destinasyonuna dön</Link>
        </aside>
      </section>
    </div>
  );
}
