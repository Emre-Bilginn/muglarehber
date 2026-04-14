import Link from "next/link";
import EmptyState from "@/components/empty-state";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 md:py-24">
      <EmptyState
        title="Aradığınız sayfa bulunamadı"
        description="Bağlantı eski olabilir ya da içerik taşınmış olabilir. Ana sayfaya dönerek kategori yapısı içinden ilerlemek daha sağlıklı olacaktır."
        ctaHref="/"
        ctaLabel="Ana sayfaya dön"
      />
      <div className="mt-8 flex justify-center">
        <Link
          href="/kategori/gezilecek-yerler"
          className="text-sm font-medium text-slate-700 underline underline-offset-4 hover:text-sky-700"
        >
          Gezilecek yerler kategorisini aç
        </Link>
      </div>
    </div>
  );
}
