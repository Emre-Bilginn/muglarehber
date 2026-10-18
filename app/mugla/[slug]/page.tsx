import Link from "next/link";
import { notFound } from "next/navigation";
import ArticleCard from "@/components/article-card";
import CategoryIcon from "@/components/category-icon";
import EmptyState from "@/components/empty-state";
import SiteBreadcrumbs from "@/components/site-breadcrumbs";
import SafeImage from "@/components/ui/safe-image";
import { getArticlesByDestination, guideCategories } from "@/lib/content";
import { getDestinationBySlug, getPublishedDestinations } from "@/lib/destinations";
import { getPlacesByDestination } from "@/lib/places";
import PlaceCard from "@/components/place-card";
import { breadcrumbSchema, buildMetadata, destinationSchema } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site-config";

type DestinationPageProps = { params: { slug: string } };

export function generateStaticParams() {
  return getPublishedDestinations().map((destination) => ({ slug: destination.slug }));
}

export function generateMetadata({ params }: DestinationPageProps) {
  const destination = getDestinationBySlug(params.slug);

  if (!destination) {
    return buildMetadata({
      title: "Destinasyon bulunamadı | Keşfet Muğla",
      description: "İstenen Muğla destinasyonu bulunamadı.",
      path: `/mugla/${params.slug}`,
    });
  }

  return buildMetadata({
    title: destination.seoTitle,
    description: destination.seoDescription,
    path: `/mugla/${destination.slug}`,
    image: destination.heroImage,
    keywords: [destination.name, "Muğla", "gezi rehberi", "rota önerileri"],
  });
}

export default function DestinationPage({ params }: DestinationPageProps) {
  const destination = getDestinationBySlug(params.slug);

  if (!destination) {
    notFound();
  }

  const articles = getArticlesByDestination(destination.slug);
  const places = getPlacesByDestination(destination.slug);
  const categoryDiscovery = guideCategories
    .map((category) => ({
      category,
      count: articles.filter((article) => article.category.slug === category.slug).length,
    }))
    .filter((item) => item.count > 0);
  const pageUrl = absoluteUrl(`/mugla/${destination.slug}`);
  const breadcrumbJsonLd = breadcrumbSchema([
    { name: "Ana sayfa", url: absoluteUrl("/") },
    { name: "Muğla bölgeleri", url: absoluteUrl("/") },
    { name: destination.name, url: pageUrl },
  ]);
  const destinationJsonLd = destinationSchema({
    name: destination.name,
    description: destination.description,
    url: pageUrl,
    image: absoluteUrl(destination.heroImage),
    latitude: destination.latitude,
    longitude: destination.longitude,
  });

  return (
    <div className="bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(destinationJsonLd) }} />

      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:py-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <SiteBreadcrumbs items={[{ label: "Ana sayfa", href: "/" }, { label: "Muğla bölgeleri" }, { label: destination.name }]} />
            <p className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">Muğla destinasyon rehberi</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950 md:text-5xl">{destination.name}</h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">{destination.shortDescription}</p>
            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600">{destination.description}</p>
          </div>
          <div className="relative aspect-[16/10] overflow-hidden rounded-[2.25rem] border border-slate-200 bg-slate-100 shadow-sm">
            <SafeImage src={destination.heroImage} alt={`${destination.name} destinasyon görseli`} fill priority sizes="(min-width: 1024px) 46vw, 100vw" className="object-cover" debugLabel={`destination-hero:${destination.slug}`} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">Bölge rehberleri</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">{destination.name} için mevcut içerikler</h2>
        </div>
        {articles.length > 0 ? (
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {articles.map((article) => <ArticleCard key={article.slug} article={article} />)}
          </div>
        ) : (
          <div className="mt-8"><EmptyState title={`${destination.name} rehberleri hazırlanıyor`} description="Bu destinasyon için yer, rota ve kategori içerikleri yayınlandıkça burada toplanacak." ctaHref="/" ctaLabel="Ana sayfaya dön" /></div>
        )}
      </section>

      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">İçerik türlerine göre keşfet</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">{destination.name} içinde ne arıyorsunuz?</h2>
          {categoryDiscovery.length > 0 ? (
            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {categoryDiscovery.map(({ category, count }) => (
                <Link key={category.slug} href={`/kategori/${category.slug}`} className="flex items-center justify-between rounded-[1.5rem] border border-slate-200 bg-white px-5 py-5 hover:border-slate-300">
                  <span className="inline-flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100"><CategoryIcon icon={category.icon} className="h-5 w-5" /></span><span className="font-medium text-slate-900">{category.name}</span></span>
                  <span className="text-sm text-slate-500">{count} rehber</span>
                </Link>
              ))}
            </div>
          ) : <p className="mt-5 text-base leading-8 text-slate-600">Kategori bazlı içerik keşfi, bu bölgeye yeni rehberler eklendikçe burada genişleyecek.</p>}
        </div>
      </section>

      {places.length > 0 ? <section className="mx-auto max-w-7xl px-4 py-12"><div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">Öne çıkan yerler</p><h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">{destination.name} içinde keşfedilecek yerler</h2></div><Link href={`/kesfet?destination=${destination.slug}`} className="inline-flex rounded-full border border-slate-200 px-5 py-3 text-sm font-medium text-slate-700 hover:border-slate-300 hover:bg-slate-50">{destination.name}’deki tüm yerleri keşfet</Link></div><div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">{places.map((place) => <PlaceCard key={place.slug} place={place} />)}</div></section> : null}
    </div>
  );
}
