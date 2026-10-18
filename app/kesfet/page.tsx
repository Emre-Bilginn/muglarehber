import { Suspense } from "react";
import DiscoverPlaces from "@/components/discover-places";
import SiteBreadcrumbs from "@/components/site-breadcrumbs";
import { getPublishedPlaces } from "@/lib/places";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Muğla'daki Yerleri Keşfet | Keşfet Muğla",
  description: "Muğla'daki yayınlanmış yerleri destinasyon, yer türü ve metin aramasıyla keşfedin.",
  path: "/kesfet",
  keywords: ["Muğla gezilecek yerler", "Muğla keşfet", "Fethiye yerler", "Akyaka yerler"],
});

export default function DiscoverPage() {
  const placeCount = getPublishedPlaces().length;

  return (
    <div className="bg-white">
      <section className="border-b border-slate-200 bg-[radial-gradient(circle_at_top_left,_rgba(14,165,233,0.16),_transparent_35%),linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)]">
        <div className="mx-auto max-w-7xl px-4 py-12 md:py-16">
          <SiteBreadcrumbs items={[{ label: "Ana sayfa", href: "/" }, { label: "Keşfet" }]} />
          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">Yer keşfi</p>
          <h1 className="mt-3 max-w-4xl text-4xl font-semibold tracking-tight text-slate-950 md:text-5xl">Muğla’daki yerleri keşfedin</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">Destinasyon, yer türü ve arama ifadesine göre gezilecek yerleri tek bir listede karşılaştırın.</p>
          <p className="mt-6 inline-flex rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700">{placeCount} yayınlanmış yer</p>
        </div>
      </section>
      <Suspense fallback={<div className="mx-auto max-w-7xl px-4 py-10 text-sm text-slate-600">Yerler yükleniyor…</div>}>
        <DiscoverPlaces />
      </Suspense>
    </div>
  );
}
