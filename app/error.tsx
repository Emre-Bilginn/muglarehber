'use client';

import Link from 'next/link';

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  console.error('[app:error]', {
    name: error.name,
    message: error.message,
    digest: error.digest,
  });

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 md:py-24">
      <div className="rounded-[2rem] border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
          Gecici hata
        </p>
        <h1 className="mt-3 text-2xl font-semibold text-slate-900 md:text-3xl">
          Sayfa su anda yuklenemiyor
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-600">
          Gerekli veriye simdi ulasilamadi. Biraz sonra yeniden deneyebilir veya ana sayfaya donebilirsiniz.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white hover:bg-slate-800"
          >
            Tekrar dene
          </button>
          <Link
            href="/"
            className="inline-flex rounded-full border border-slate-200 px-5 py-3 text-sm font-medium text-slate-700 hover:border-slate-300 hover:bg-white"
          >
            Ana sayfaya don
          </Link>
        </div>
      </div>
    </div>
  );
}
