'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight } from 'lucide-react';

interface ArticleCategory {
  name: string;
  slug: string;
}

interface ArticleCardProps {
  article: {
    id: string;
    title: string;
    slug: string;
    summary: string;
    imageUrl: string | null;
    createdAt: string;
    category?: ArticleCategory;
  };
  index?: number;
}

export default function ArticleCard({ article, index = 0 }: ArticleCardProps) {
  const safeArticle = article ?? {};
  const safeCategory: ArticleCategory = safeArticle?.category ?? { name: '', slug: '' };

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: (index ?? 0) * 0.1 }}
      className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
    >
      <Link href={`/makale/${safeArticle?.slug ?? ''}`}>
        <div className="relative aspect-[16/10] bg-gray-100">
          {safeArticle?.imageUrl && (
            <Image
              src={safeArticle?.imageUrl ?? ''}
              alt={safeArticle?.title ?? ''}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          )}
          {safeCategory?.name && (
            <div className="absolute top-3 left-3">
              <span className="px-3 py-1 bg-sky-500 text-white text-xs font-medium rounded-full">
                {safeCategory?.name ?? ''}
              </span>
            </div>
          )}
        </div>
        <div className="p-5">
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-sky-600 transition-colors line-clamp-2 mb-2">
            {safeArticle?.title ?? ''}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-2 mb-4">
            {safeArticle?.summary ?? ''}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <Calendar className="w-3 h-3" />
              <span>
                {safeArticle?.createdAt
                  ? new Date(safeArticle?.createdAt)?.toLocaleDateString?.('tr-TR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })
                  : ''}
              </span>
            </div>
            <span className="flex items-center gap-1 text-sky-600 text-sm font-medium group-hover:gap-2 transition-all">
              Devamını Oku <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
