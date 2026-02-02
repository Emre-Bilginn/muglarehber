import Link from 'next/link';
import Image from 'next/image';
import prisma from '@/lib/db';
import AdPlaceholder from '@/components/ad-placeholder';
import CategoryIcon from '@/components/category-icon';
import { ArrowRight, MapPin, Waves, Calendar } from 'lucide-react';

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

async function getRecentArticles(): Promise<Article[]> {
  const articles = await prisma?.article?.findMany?.({
    include: { category: { select: { name: true, slug: true } } },
    orderBy: { createdAt: 'desc' },
    take: 6,
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
  const [featuredArticles, recentArticles, categories] = await Promise.all([
    getFeaturedArticles(),
    getRecentArticles(),
    getCategories(),
  ]);

  const heroArticle = featuredArticles?.[0];
  const otherFeatured = featuredArticles?.slice?.(1, 4) ?? [];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-hero text-white py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Muğla'ı Keşfedin
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Bodrum, Fethiye, Marmaris ve daha fazlası... Ege ve Akdeniz'in buluştuğu bu eşsiz bölgede tatilinizi planlayın.
            </p>
          </div>
        </div>
      </section>

      {/* Ad Banner */}
      <div className="max-w-6xl mx-auto px-4 -mt-8 relative z-10">
        <AdPlaceholder size="banner" />
      </div>

      {/* Featured Articles */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Waves className="w-6 h-6 text-sky-500" />
            Öne Çıkan Yazılar
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {heroArticle && (
              <Link href={`/makale/${heroArticle?.slug ?? ''}`} className="group">
                <article className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden h-full">
                  <div className="relative aspect-[16/10] bg-gray-100">
                    {heroArticle?.imageUrl && (
                      <Image
                        src={heroArticle?.imageUrl ?? ''}
                        alt={heroArticle?.title ?? ''}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    )}
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 bg-sky-500 text-white text-sm font-medium rounded-full">
                        {heroArticle?.category?.name ?? ''}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-sky-600 transition-colors mb-2">
                      {heroArticle?.title ?? ''}
                    </h3>
                    <p className="text-gray-600 line-clamp-2">{heroArticle?.summary ?? ''}</p>
                  </div>
                </article>
              </Link>
            )}

            <div className="space-y-4">
              {otherFeatured?.map?.((article: Article) => (
                <Link key={article?.id ?? ''} href={`/makale/${article?.slug ?? ''}`} className="group">
                  <article className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all overflow-hidden flex">
                    <div className="relative w-32 md:w-40 flex-shrink-0 bg-gray-100">
                      {article?.imageUrl && (
                        <Image
                          src={article?.imageUrl ?? ''}
                          alt={article?.title ?? ''}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      )}
                    </div>
                    <div className="p-4 flex-1">
                      <span className="text-xs text-sky-600 font-medium">{article?.category?.name ?? ''}</span>
                      <h3 className="font-bold text-gray-900 group-hover:text-sky-600 transition-colors line-clamp-2 mt-1">
                        {article?.title ?? ''}
                      </h3>
                    </div>
                  </article>
                </Link>
              )) ?? null}
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <MapPin className="w-6 h-6 text-sky-500" />
            Kategoriler
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {categories?.map?.((category: Category) => (
              <Link
                key={category?.id ?? ''}
                href={`/kategori/${category?.slug ?? ''}`}
                className="group bg-white rounded-xl shadow-md hover:shadow-lg p-4 text-center transition-all hover:-translate-y-1"
              >
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-sky-50 flex items-center justify-center text-sky-500 group-hover:bg-sky-500 group-hover:text-white transition-colors">
                  <CategoryIcon icon={category?.icon ?? ''} className="w-6 h-6" />
                </div>
                <h3 className="font-medium text-gray-900 text-sm">{category?.name ?? ''}</h3>
                <p className="text-xs text-gray-400 mt-1">{category?._count?.articles ?? 0} yazı</p>
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
      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Calendar className="w-6 h-6 text-sky-500" />
              Son Eklenenler
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentArticles?.map?.((article: Article, index: number) => (
              <Link key={article?.id ?? ''} href={`/makale/${article?.slug ?? ''}`} className="group">
                <article className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden">
                  <div className="relative aspect-[16/10] bg-gray-100">
                    {article?.imageUrl && (
                      <Image
                        src={article?.imageUrl ?? ''}
                        alt={article?.title ?? ''}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    )}
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 bg-sky-500 text-white text-xs font-medium rounded-full">
                        {article?.category?.name ?? ''}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-gray-900 group-hover:text-sky-600 transition-colors line-clamp-2 mb-2">
                      {article?.title ?? ''}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2">{article?.summary ?? ''}</p>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-xs text-gray-400">
                        {article?.createdAt
                          ? new Date(article?.createdAt)?.toLocaleDateString?.('tr-TR', {
                              day: 'numeric',
                              month: 'long',
                            })
                          : ''}
                      </span>
                      <span className="flex items-center gap-1 text-sky-600 text-sm font-medium">
                        Oku <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            )) ?? null}
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
