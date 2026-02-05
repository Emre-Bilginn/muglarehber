'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar } from 'lucide-react';
import ImageWithFallback from './image-with-fallback';

interface ArticleCategory {
  name: string;
  slug?: string;
}

type ArticleCardVariant = 'hero' | 'compact' | 'row' | 'default';

interface ArticleCardProps {
  title: string;
  summary: string;
  category?: ArticleCategory | null;
  imageUrl?: string | null;
  href: string;
  date?: string | Date | null;
  variant?: ArticleCardVariant;
}

const variantStyles: Record<ArticleCardVariant, {
  wrapper: string;
  imageWrap: string;
  content: string;
  title: string;
  summary: string;
  meta: string;
  showSummary: boolean;
  showMeta: boolean;
  showBadge: boolean;
  sizes: string;
}> = {
  hero: {
    wrapper: 'group h-full rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-all',
    imageWrap: 'relative aspect-[16/10] bg-slate-100',
    content: 'p-6 md:p-7',
    title: 'text-2xl md:text-3xl font-semibold text-slate-900 group-hover:text-sky-600 transition-colors',
    summary: 'text-slate-600 mt-3 line-clamp-3',
    meta: 'mt-5 flex items-center justify-between text-sm text-slate-500',
    showSummary: true,
    showMeta: true,
    showBadge: true,
    sizes: '(min-width: 1024px) 60vw, 100vw',
  },
  compact: {
    wrapper: 'group flex items-center gap-4 rounded-xl border border-slate-100 bg-white/90 p-4 shadow-sm hover:shadow-md transition-all',
    imageWrap: 'relative h-20 w-28 flex-shrink-0 overflow-hidden rounded-lg bg-slate-100',
    content: 'flex-1 min-w-0',
    title: 'text-sm font-semibold text-slate-900 group-hover:text-sky-600 transition-colors line-clamp-2',
    summary: 'hidden',
    meta: 'hidden',
    showSummary: false,
    showMeta: false,
    showBadge: false,
    sizes: '(min-width: 1024px) 260px, 40vw',
  },
  row: {
    wrapper: 'group flex flex-col md:flex-row rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-all',
    imageWrap: 'relative w-full md:w-60 aspect-[16/9] md:aspect-[4/3] bg-slate-100 flex-shrink-0',
    content: 'p-5 flex-1',
    title: 'text-lg font-semibold text-slate-900 group-hover:text-sky-600 transition-colors line-clamp-2',
    summary: 'text-sm text-slate-600 mt-2 line-clamp-2',
    meta: 'mt-4 flex items-center justify-between text-sm text-slate-500',
    showSummary: true,
    showMeta: true,
    showBadge: false,
    sizes: '(min-width: 1024px) 260px, 100vw',
  },
  default: {
    wrapper: 'group rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-all',
    imageWrap: 'relative aspect-[16/10] bg-slate-100',
    content: 'p-5',
    title: 'text-lg font-semibold text-slate-900 group-hover:text-sky-600 transition-colors line-clamp-2',
    summary: 'text-sm text-slate-600 mt-2 line-clamp-2',
    meta: 'mt-4 flex items-center justify-between text-sm text-slate-500',
    showSummary: true,
    showMeta: true,
    showBadge: true,
    sizes: '(min-width: 1024px) 360px, 100vw',
  },
};

function formatDate(date?: string | Date | null) {
  if (!date) return '';
  const parsed = typeof date === 'string' ? new Date(date) : date;
  if (Number.isNaN(parsed?.getTime?.())) return '';
  return parsed.toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default function ArticleCard({
  title,
  summary,
  category,
  imageUrl,
  href,
  date,
  variant = 'default',
}: ArticleCardProps) {
  const styles = variantStyles[variant];
  const formattedDate = formatDate(date);
  const showBadge = styles.showBadge && !!category?.name;
  const isPriority = variant === 'hero';

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={styles.wrapper}
    >
      <Link href={href} className="block h-full">
        <div className={styles.imageWrap}>
          <ImageWithFallback
            src={imageUrl ?? undefined}
            alt={title ?? ''}
            fill
            sizes={styles.sizes}
            priority={isPriority}
            loading={isPriority ? 'eager' : 'lazy'}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {showBadge && (
            <div className="absolute top-3 left-3">
              <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-sky-700 shadow-sm">
                {category?.name ?? ''}
              </span>
            </div>
          )}
        </div>
        <div className={styles.content}>
          {category?.name && !showBadge && (
            <span className="text-xs font-semibold text-sky-600">{category?.name ?? ''}</span>
          )}
          <h3 className={styles.title}>{title ?? ''}</h3>
          {styles.showSummary && (
            <p className={styles.summary}>{summary ?? ''}</p>
          )}
          {styles.showMeta && (
            <div className={styles.meta}>
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4 text-slate-400" />
                {formattedDate}
              </span>
              <span className="flex items-center gap-1 text-sky-600 font-medium">
                Devamını Oku <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          )}
        </div>
      </Link>
    </motion.article>
  );
}
