'use client';

import * as maplibregl from "maplibre-gl";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Place } from "@/lib/places";
import { getDestinationBySlug } from "@/lib/destinations";
import { mapStyleUrl } from "@/lib/map-config";
import { placeTypeLabels } from "@/lib/places";

function createPopup(place: Place) {
  const destination = getDestinationBySlug(place.destinationSlug);
  const content = document.createElement("div");
  content.className = "max-w-[220px] p-1 text-slate-900";
  const type = document.createElement("p");
  type.className = "text-xs font-semibold uppercase tracking-[0.14em] text-sky-700";
  type.textContent = `${placeTypeLabels[place.placeType]}${destination ? ` · ${destination.name}` : ""}`;
  const title = document.createElement("h3");
  title.className = "mt-2 text-base font-semibold";
  title.textContent = place.name;
  const description = document.createElement("p");
  description.className = "mt-2 text-sm leading-6 text-slate-600";
  description.textContent = place.shortDescription;
  const link = document.createElement("a");
  link.className = "mt-3 inline-flex text-sm font-semibold text-sky-700";
  link.href = `/yer/${place.slug}`;
  link.textContent = "Detayları gör";
  content.append(type, title, description, link);
  return content;
}

export default function DiscoverMap({ places }: { places: Place[] }) {
  const mapElement = useRef<HTMLDivElement | null>(null);
  const [mapFailed, setMapFailed] = useState(false);
  const mappablePlaces = useMemo(
    () => places.filter((place) => place.latitude != null && place.longitude != null),
    [places],
  );

  useEffect(() => {
    if (!mapElement.current || mappablePlaces.length === 0) return;

    setMapFailed(false);
    const map = new maplibregl.Map({
      container: mapElement.current,
      style: mapStyleUrl,
      center: [28.4, 37.1],
      zoom: 8,
    });
    const onError = () => setMapFailed(true);
    map.on("error", onError);
    map.addControl(new maplibregl.NavigationControl({ showCompass: true }), "top-right");

    mappablePlaces.forEach((place) => {
      const coordinates: [number, number] = [place.longitude as number, place.latitude as number];
      const popup = new maplibregl.Popup({ offset: 18, maxWidth: "260px" }).setDOMContent(createPopup(place));
      new maplibregl.Marker({ color: "#0369a1" }).setLngLat(coordinates).setPopup(popup).addTo(map);
    });

    if (mappablePlaces.length === 1) {
      const place = mappablePlaces[0];
      map.setCenter([place.longitude as number, place.latitude as number]);
      map.setZoom(11);
    } else {
      const bounds = new maplibregl.LngLatBounds();
      mappablePlaces.forEach((place) => bounds.extend([place.longitude as number, place.latitude as number]));
      map.fitBounds(bounds, { padding: 56, maxZoom: 10, duration: 0 });
    }

    return () => {
      map.off("error", onError);
      map.remove();
    };
  }, [mappablePlaces]);

  if (mappablePlaces.length === 0) {
    return <div className="rounded-[2rem] border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center"><h2 className="text-xl font-semibold text-slate-950">Bu filtredeki yerlerin doğrulanmış harita konumları henüz eklenmedi.</h2><p className="mt-3 text-sm leading-7 text-slate-600">Liste görünümünde tüm yerleri incelemeye devam edebilirsiniz.</p></div>;
  }

  if (mapFailed) {
    return <div className="rounded-[2rem] border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center"><h2 className="text-xl font-semibold text-slate-950">Harita yüklenemedi</h2><p className="mt-3 text-sm leading-7 text-slate-600">Liste görünümünden tüm yerleri kullanmaya devam edebilirsiniz.</p></div>;
  }

  return <div><div ref={mapElement} className="h-[420px] overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-100 md:h-[560px]" aria-label="Filtrelenmiş yerler haritası" role="application" /><p className="mt-4 text-sm leading-7 text-slate-600">{mappablePlaces.length} yer doğrulanmış koordinatıyla haritada gösteriliyor.{mappablePlaces.length < places.length ? " Bazı yerlerin doğrulanmış konumu henüz eklenmemiştir." : ""}</p></div>;
}
