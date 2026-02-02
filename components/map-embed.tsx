'use client';

import { MapPin } from 'lucide-react';

interface MapEmbedProps {
  lat?: number | null;
  lng?: number | null;
  title?: string;
}

export default function MapEmbed({ lat, lng, title = '' }: MapEmbedProps) {
  if (!lat || !lng) {
    return null;
  }

  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${lat},${lng}&zoom=14`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-4 border-b bg-gray-50">
        <h3 className="font-semibold text-gray-900 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-sky-500" />
          Konum
        </h3>
      </div>
      <div className="aspect-video relative">
        <iframe
          src={mapUrl ?? ''}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={title ?? 'Harita'}
          className="absolute inset-0"
        />
      </div>
      <div className="p-4">
        <a
          href={directionsUrl ?? '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white text-sm font-medium rounded-lg transition-colors"
        >
          <MapPin className="w-4 h-4" />
          Yol Tarifi Al
        </a>
      </div>
    </div>
  );
}
