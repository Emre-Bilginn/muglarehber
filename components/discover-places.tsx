'use client';

import { Map, Search, TableProperties } from "lucide-react";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PlaceCard from "@/components/place-card";
import { buildDiscoverHref, getDiscoverFilterOptions, parseDiscoverFilters } from "@/lib/discover-filters";
import { getFilteredPlaces, placeTypeLabels } from "@/lib/places";

const { availableDestinations, availableTypes } = getDiscoverFilterOptions();
const DiscoverMap = dynamic(() => import("@/components/discover-map"), { ssr: false, loading: () => <div className="rounded-[2rem] border border-slate-200 bg-slate-50 px-6 py-12 text-center text-sm text-slate-600">Harita yükleniyor…</div> });

export default function DiscoverPlaces() {
  const router = useRouter();
  const [view, setView] = useState<"list" | "map">("list");
  const searchParams = useSearchParams();
  const { destinationSlug, placeType, query } = parseDiscoverFilters(new URLSearchParams(searchParams.toString()));
  const places = getFilteredPlaces({ destinationSlug: destinationSlug || undefined, placeType, query });

  const updateFilters = (next: { destination?: string; type?: string; q?: string }, replace = false) => {
    const href = buildDiscoverHref(new URLSearchParams(searchParams.toString()), next);
    (replace ? router.replace : router.push)(href, { scroll: false });
  };

  const hasActiveFilters = Boolean(destinationSlug || placeType || query);

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 md:py-14">
      <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-5 md:p-7">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div>
            <label htmlFor="discover-search" className="text-sm font-semibold text-slate-900">Yerlerde ara</label>
            <div className="relative mt-2">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input id="discover-search" type="search" value={query} onChange={(event) => updateFilters({ q: event.target.value }, true)} placeholder="Yer, destinasyon veya tür ara" className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-12 pr-4 text-base text-slate-900 outline-none placeholder:text-slate-400 focus:border-sky-600 focus:ring-2 focus:ring-sky-100" />
            </div>
          </div>
          <p aria-live="polite" className="text-sm leading-7 text-slate-600">{places.length} yer bulundu</p>
        </div>

        <fieldset className="mt-6">
          <legend className="text-sm font-semibold text-slate-900">Destinasyon</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            <button type="button" onClick={() => updateFilters({ destination: "" })} aria-pressed={!destinationSlug} className={`rounded-full border px-4 py-2 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 ${!destinationSlug ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"}`}>Tümü</button>
            {availableDestinations.map((destination) => <button key={destination.slug} type="button" onClick={() => updateFilters({ destination: destination.slug })} aria-pressed={destinationSlug === destination.slug} className={`rounded-full border px-4 py-2 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 ${destinationSlug === destination.slug ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"}`}>{destination.name}</button>)}
          </div>
        </fieldset>

        <fieldset className="mt-6">
          <legend className="text-sm font-semibold text-slate-900">Yer türü</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            <button type="button" onClick={() => updateFilters({ type: "" })} aria-pressed={!placeType} className={`rounded-full border px-4 py-2 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 ${!placeType ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"}`}>Tümü</button>
            {availableTypes.map((type) => <button key={type} type="button" onClick={() => updateFilters({ type })} aria-pressed={placeType === type} className={`rounded-full border px-4 py-2 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 ${placeType === type ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"}`}>{placeTypeLabels[type]}</button>)}
          </div>
        </fieldset>
      </div>

      {places.length > 0 ? <><div className="mt-8 flex items-center justify-between gap-4"><h2 className="text-2xl font-semibold tracking-tight text-slate-950">Keşif görünümü</h2><div className="inline-flex rounded-xl border border-slate-200 bg-white p-1" role="group" aria-label="Keşif görünümü"><button type="button" onClick={() => setView("list")} aria-pressed={view === "list"} className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 ${view === "list" ? "bg-slate-900 text-white" : "text-slate-700 hover:bg-slate-50"}`}><TableProperties className="h-4 w-4" />Liste</button><button type="button" onClick={() => setView("map")} aria-pressed={view === "map"} className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 ${view === "map" ? "bg-slate-900 text-white" : "text-slate-700 hover:bg-slate-50"}`}><Map className="h-4 w-4" />Harita</button></div></div>{view === "list" ? <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">{places.map((place) => <PlaceCard key={place.slug} place={place} />)}</div> : <div className="mt-6"><DiscoverMap places={places} /></div>}</> : <div className="mt-8 rounded-[2rem] border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center"><h2 className="text-xl font-semibold text-slate-950">Bu filtrelerle henüz yer bulunmuyor</h2><p className="mt-3 text-sm leading-7 text-slate-600">Başka bir destinasyon, yer türü veya arama ifadesi deneyin.</p>{hasActiveFilters ? <button type="button" onClick={() => updateFilters({ destination: "", type: "", q: "" })} className="mt-5 rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500">Filtreleri temizle</button> : null}</div>}
    </section>
  );
}
