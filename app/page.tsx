import Link from 'next/link';
import { Suspense } from 'react';
import prisma from '@/lib/db';
import AdPlaceholder from '@/components/ad-placeholder';
import CategoryIcon from '@/components/category-icon';
import ArticleCard from '@/components/article-card';
import RecentArticles from '@/components/recent-articles';
import RecentArticlesSkeleton from '@/components/recent-articles-skeleton';
import NewsletterForm from '@/components/newsletter-form';
import { ArrowRight, Calendar, MapPin, Sparkles, Waves } from 'lucide-react';

export const dynamic = "force-dynamic";

interface Article {
  id: string;
  title: string;
  slug: string;
  summary: string;
  imageUrl: string | null;
  createdAt: Date;
  category: { name: string; slug: string };
}

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  _count: { articles: number };
}

async function getFeaturedArticles(): Promise<Article[]> {
  const articles = await prisma?.article?.findMany?.({
    where: { isFeatured: true },
    include: { category: { select: { name: true, slug: true } } },
    orderBy: { createdAt: 'desc' },
    take: 4,
  }) ?? [];
  return articles as Article[];
}

async function getCategories(): Promise<Category[]> {
  const categories = await prisma?.category?.findMany?.({
    orderBy: { order: 'asc' },
    include: { _count: { select: { articles: true } } },
  }) ?? [];
  return categories as Category[];
}

export default async function HomePage() {
  const [featuredArticles, categories] = await Promise.all([
    getFeaturedArticles(),
    getCategories(),
  ]);

  const heroArticle = featuredArticles?.[0];
  const otherFeatured = featuredArticles?.slice?.(1, 4) ?? [];
  const totalArticles = categories?.reduce?.(
    (sum, category) => sum + (category?._count?.articles ?? 0),
    0
  ) ?? 0;
  const popularCategories = [...(categories ?? [])]
    .sort((a, b) => (b?._count?.articles ?? 0) - (a?._count?.articles ?? 0))
    .slice(0, 4);

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero text-white">
        <div className="absolute -top-32 right-[-10%] h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-[-20%] left-[-10%] h-80 w-80 rounded-full bg-white/10 blur-3xl" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 py-16 md:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
                <Sparkles className="h-4 w-4" />
                Ege & Akdeniz Rehberi
              </span>
              <h1 className="mt-4 text-4xl md:text-5xl font-display font-semibold leading-tight">
                Muğla'yı yerel lezzetler, saklı koylar ve güçlü rotalarla keşfedin.
              </h1>
              <p className="mt-4 text-lg text-white/90">
                Bodrum, Fethiye, Marmaris ve daha fazlası... Tatilinizi planlarken ihtiyacınız olan tüm öneriler tek yerde.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/kategori/gezilecek-yerler"
                  className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-sky-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-white/90"
                >
                  Gezilecek Yerler
                </Link>
                <Link
                  href="/kategori/plajlar"
                  className="rounded-full border border-white/40 px-5 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/10"
                >
                  Plajlar
                </Link>
                <Link
                  href="#populer-kategoriler"
                  className="rounded-full border border-white/40 px-5 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/10"
                >
                  Haritada Keşfet
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap gap-6 text-sm text-white/80">
                <span className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  {categories?.length ?? 0} kategori
                </span>
                <span className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {totalArticles} içerik
                </span>
                <span className="flex items-center gap-2">
                  <Waves className="h-4 w-4" />
                  Güncel sezon önerileri
                </span>
              </div>
            </div>

            <div className="rounded-2xl border border-white/20 bg-white/10 p-6 shadow-xl backdrop-blur-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">Hızlı Rotalar</p>
              <div className="mt-4 space-y-3">
                {popularCategories?.map?.((category) => (
                  <Link
                    key={category?.id ?? ''}
                    href={`/kategori/${category?.slug ?? ''}`}
                    className="flex items-center justify-between rounded-xl bg-white/10 px-4 py-3 transition hover:bg-white/20"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/15 text-white">
                        <CategoryIcon icon={category?.icon ?? ''} className="h-4 w-4" />
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-white">{category?.name ?? ''}</p>
                        <p className="text-xs text-white/70">{category?._count?.articles ?? 0} içerik</p>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-white/70" />
                  </Link>
                )) ?? null}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ad Banner */}
      <div className="max-w-6xl mx-auto px-4 -mt-8 relative z-10">
        <AdPlaceholder size="banner" />
      </div>

      {/* Featured Articles */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-slate-900 flex items-center gap-2">
              <Waves className="w-6 h-6 text-sky-500" />
              Öne Çıkan Yazılar
            </h2>
            <Link
              href="/kategori/gezilecek-yerler"
              className="text-sm font-semibold text-sky-600 hover:text-sky-700 inline-flex items-center gap-1"
            >
              Tümünü Gör
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-6">
            {heroArticle && (
              <ArticleCard
                variant="hero"
                href={`/makale/${heroArticle?.slug ?? ''}`}
                title={heroArticle?.title ?? ''}
                summary={heroArticle?.summary ?? ''}
                imageUrl={heroArticle?.imageUrl ?? ''}
                category={heroArticle?.category ?? null}
                date={heroArticle?.createdAt ? heroArticle?.createdAt?.toISOString?.() : ''}
              />
            )}

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {otherFeatured?.map?.((article: Article) => (
                <ArticleCard
                  key={article?.id ?? ''}
                  variant="compact"
                  href={`/makale/${article?.slug ?? ''}`}
                  title={article?.title ?? ''}
                  summary={article?.summary ?? ''}
                  imageUrl={article?.imageUrl ?? ''}
                  category={article?.category ?? null}
                  date={article?.createdAt ? article?.createdAt?.toISOString?.() : ''}
                />
              )) ?? null}
            </div>
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section id="populer-kategoriler" className="py-12 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-semibold text-slate-900 mb-6 flex items-center gap-2">
            <MapPin className="w-6 h-6 text-sky-500" />
            Popüler Kategoriler
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories?.map?.((category: Category) => (
              <Link
                key={category?.id ?? ''}
                href={`/kategori/${category?.slug ?? ''}`}
                className="group rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-50 text-sky-500 transition group-hover:bg-sky-600 group-hover:text-white">
                    <CategoryIcon icon={category?.icon ?? ''} className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-semibold text-slate-400">{category?._count?.articles ?? 0} içerik</span>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">{category?.name ?? ''}</h3>
                <p className="mt-2 text-sm text-slate-500 line-clamp-2">{category?.description ?? ''}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-sky-600">
                  Keşfet <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            )) ?? null}
          </div>
        </div>
      </section>

      {/* Inline Ad */}
      <div className="max-w-6xl mx-auto px-4">
        <AdPlaceholder size="inline" />
      </div>

      {/* Recent Articles */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-slate-900 flex items-center gap-2">
              <Calendar className="w-6 h-6 text-sky-500" />
              Son Eklenenler
            </h2>
            <Link
              href="/kategori/gezilecek-yerler"
              className="text-sm font-semibold text-sky-600 hover:text-sky-700 inline-flex items-center gap-1"
            >
              Tüm Yazılar
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <Suspense fallback={<RecentArticlesSkeleton />}>
            <RecentArticles />
          </Suspense>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="relative overflow-hidden rounded-3xl bg-slate-900 text-white shadow-xl">
            <div className="absolute -top-24 right-[-10%] h-48 w-48 rounded-full bg-sky-500/30 blur-3xl" />
            <div className="absolute bottom-[-20%] left-[-10%] h-56 w-56 rounded-full bg-emerald-400/30 blur-3xl" />
            <div className="relative z-10 grid gap-8 p-8 md:p-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">Bülten</p>
                <h3 className="mt-3 text-2xl md:text-3xl font-display font-semibold">
                  En iyi rotalar, en iyi zamanlar ve özel öneriler.
                </h3>
                <p className="mt-3 text-sm text-white/80">
                  Haftalık Muğla rehberi ile yeni eklenen içerikleri, sezon tavsiyelerini ve fırsatları kaçırmayın.
                </p>
              </div>
              <NewsletterForm />
            </div>
          </div>
        </div>
      </section>

      {/* Footer Ad */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <AdPlaceholder size="footer" />
      </div>
    </div>
  );
}
