'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { Loader2, Search, X } from "lucide-react";
import SafeImage from "@/components/ui/safe-image";
import { getCategoryFallbackImage, isSvgImage } from "@/lib/image-utils";

type SearchResult = {
  slug: string;
  title: string;
  excerpt: string;
  image?: string | null;
  imageAlt?: string | null;
  category: { name: string; slug: string };
};

export default function SearchModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      document.body.classList.remove("overflow-hidden");
      setQuery("");
      setResults([]);
      return;
    }

    document.body.classList.add("overflow-hidden");
    return () => document.body.classList.remove("overflow-hidden");
  }, [isOpen]);

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }

    const timeout = window.setTimeout(async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await response.json();
        setResults(data.articles ?? []);
      } finally {
        setLoading(false);
      }
    }, 250);

    return () => window.clearTimeout(timeout);
  }, [query]);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 hover:border-slate-300 hover:text-slate-900"
        aria-label="Sitede arama yap"
      >
        <Search className="h-4 w-4" />
        <span className="hidden sm:inline">Muğla içinde ara</span>
      </button>

      {isOpen ? (
        <div className="fixed inset-0 z-[80] bg-slate-950/55 px-4 py-12 backdrop-blur-sm">
          <div className="mx-auto max-w-3xl overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-2xl">
            <div className="flex items-center gap-3 border-b border-slate-200 px-5 py-4">
              <Search className="h-5 w-5 text-slate-400" />
              <input
                type="search"
                autoFocus
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Makale, ilçe, plaj veya rota ara"
                className="flex-1 border-0 bg-transparent text-base text-slate-900 outline-none placeholder:text-slate-400"
              />
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-full p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                aria-label="Aramayı kapat"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="max-h-[70vh] overflow-y-auto p-4">
              {loading ? (
                <div className="flex min-h-[180px] items-center justify-center">
                  <Loader2 className="h-6 w-6 animate-spin text-sky-700" />
                </div>
              ) : query.trim().length < 2 ? (
                <div className="rounded-[1.5rem] bg-slate-50 px-6 py-10 text-center text-sm leading-7 text-slate-500">
                  En az 2 karakter yazarak rehberler içinde arama yapabilirsiniz.
                </div>
              ) : results.length === 0 ? (
                <div className="rounded-[1.5rem] bg-slate-50 px-6 py-10 text-center text-sm leading-7 text-slate-500">
                  Aramanızla eşleşen bir içerik bulunamadı.
                </div>
              ) : (
                <div className="space-y-3">
                  {results.map((result) => {
                    const isIllustration = isSvgImage(result.image);
                    const fallbackSrc = getCategoryFallbackImage(result.category.slug);

                    return (
                      <Link
                        key={result.slug}
                        href={`/makale/${result.slug}`}
                        onClick={() => setIsOpen(false)}
                        className="grid gap-4 rounded-[1.5rem] border border-slate-200 p-4 hover:border-sky-200 hover:bg-sky-50/40 md:grid-cols-[140px_1fr]"
                      >
                        <div className="relative aspect-[4/3] overflow-hidden rounded-[1rem] bg-slate-100">
                          <SafeImage
                            src={result.image}
                            fallbackSrc={fallbackSrc}
                            alt={result.imageAlt ?? `${result.title} kapak görseli`}
                            fill
                            sizes="140px"
                            className={isIllustration ? "object-contain p-2" : "object-cover"}
                            debugLabel={`search-modal:${result.slug}`}
                          />
                        </div>
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
                            {result.category.name}
                          </p>
                          <h3 className="mt-2 text-lg font-semibold tracking-tight text-slate-950">
                            {result.title}
                          </h3>
                          <p className="mt-2 text-sm leading-7 text-slate-600">
                            {result.excerpt}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
