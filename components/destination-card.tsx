import Link from "next/link";
import SafeImage from "@/components/ui/safe-image";
import type { Destination } from "@/lib/destinations";

export default function DestinationCard({ destination }: { destination: Destination }) {
  return (
    <Link
      href={`/mugla/${destination.slug}`}
      className="group overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <SafeImage
          src={destination.heroImage}
          alt={`${destination.name} destinasyon görseli`}
          fill
          sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
          debugLabel={`destination-card:${destination.slug}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
        <p className="absolute bottom-4 left-5 text-2xl font-semibold tracking-tight text-white">
          {destination.name}
        </p>
      </div>
      <p className="px-5 py-4 text-sm leading-7 text-slate-600">{destination.shortDescription}</p>
    </Link>
  );
}
