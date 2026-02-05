'use client';

import { useState, useEffect } from 'react';
import { Search, X, Loader2 } from 'lucide-react';
import Link from 'next/link';
import ImageWithFallback from './image-with-fallback';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchResult {
  id: string;
  title: string;
  slug: string;
  summary: string;
  imageUrl: string | null;
  category: { name: string; slug: string };
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const searchArticles = async () => {
      if ((query?.length ?? 0) < 2) {
        setResults([]);
        return;
      }
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query ?? '')}`);
        const data = await res?.json?.();
        setResults(data?.articles ?? []);
      } catch (error) {
        console.error('Search error:', error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(searchArticles, 300);
    return () => clearTimeout(debounce);
  }, [query]);

  useEffect(() => {
    if (isOpen) {
      document?.body?.classList?.add?.('overflow-hidden');
    } else {
      document?.body?.classList?.remove?.('overflow-hidden');
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="max-w-2xl mx-auto mt-20 mx-4"
          onClick={(e) => e?.stopPropagation?.()}
        >
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
            <div className="flex items-center gap-3 p-4 border-b">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Makale, yer veya aktivite ara..."
                value={query ?? ''}
                onChange={(e) => setQuery(e?.target?.value ?? '')}
                className="flex-1 outline-none text-lg"
                autoFocus
              />
              <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto">
              {loading && (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-6 h-6 text-sky-500 animate-spin" />
                </div>
              )}

              {!loading && (results?.length ?? 0) > 0 && (
                <div className="p-2">
                  {results?.map?.((result) => (
                    <Link
                      key={result?.id ?? ''}
                      href={`/makale/${result?.slug ?? ''}`}
                      onClick={onClose}
                      className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                        <ImageWithFallback
                          src={result?.imageUrl ?? undefined}
                          alt={result?.title ?? ''}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate">{result?.title ?? ''}</p>
                        <p className="text-sm text-sky-600">{result?.category?.name ?? ''}</p>
                      </div>
                    </Link>
                  )) ?? null}
                </div>
              )}

              {!loading && (query?.length ?? 0) >= 2 && (results?.length ?? 0) === 0 && (
                <div className="py-8 text-center text-gray-500">
                  Sonuç bulunamadı
                </div>
              )}

              {!loading && (query?.length ?? 0) < 2 && (
                <div className="py-8 text-center text-gray-400">
                  Aramak için en az 2 karakter girin
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
