import Link from 'next/link';
import { notFound } from 'next/navigation';
import prisma from '@/lib/db';
import { fallbackCategories, getFallbackCategory, type FallbackCategory } from '@/lib/category-fallbacks';
import { logServerDebug, logServerError } from '@/lib/server-log';
import AdPlaceholder from '@/components/ad-placeholder';
import CategoryIcon from '@/components/category-icon';
import ArticleCard from '@/components/article-card';

export const dynamic = 'force-dynamic';

interface Article {
  id: string;
  title: string;
  slug: string;
  summary: string;
  imageUrl: string | null;
  createdAt: Date;
}

interface CategoryWithArticles {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  order?: number;
  articles: Article[];
}

interface CategoryWithCount {
  id: string;
  name: string;
  slug: string;
  icon: string | null;
  order?: number;
  _count: { articles: number };
}

interface CategoryPageProps {
  params: { slug: string };
}

function toFallbackCategoryWithArticles(category: FallbackCategory): CategoryWithArticles {
  return {
    id: category.slug,
    name: category.name,
    slug: category.slug,
    description: category.description,
    icon: category.icon,
    order: category.order,
    articles: [],
  };
}

function toFallbackCategoryWithCount(category: FallbackCategory): CategoryWithCount {
  return {
    id: category.slug,
    name: category.name,
    slug: category.slug,
    icon: category.icon,
    order: category.order,
    _count: { articles: 0 },
  };
}

export function generateStaticParams() {
  return fallbackCategories.map((category) => ({
    slug: category.slug,
  }));
}

async function getCategory(slug: string): Promise<CategoryWithArticles | null> {
  try {
    const category = await prisma.category.findUnique({
      where: { slug: slug ?? '' },
      include: {
        articles: {
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    logServerDebug('app/category', 'Fetched category detail', {
      slug,
      found: Boolean(category),
      articleCount: category?.articles?.length ?? 0,
    });

    if (category) {
      return category as CategoryWithArticles;
    }
  } catch (error) {
    logServerError('app/category', 'Failed to fetch category detail', error, {
      slug,
    });
  }

  const fallbackCategory = getFallbackCategory(slug);
  return fallbackCategory ? toFallbackCategoryWithArticles(fallbackCategory) : null;
}

async function getCategories(): Promise<CategoryWithCount[]> {
  try {
    const categories = (await prisma.category.findMany({
      orderBy: { order: 'asc' },
      include: { _count: { select: { articles: true } } },
    })) as CategoryWithCount[];

    const mergedCategories = new Map<string, CategoryWithCount>();

    for (const category of fallbackCategories) {
      mergedCategories.set(category.slug, toFallbackCategoryWithCount(category));
    }

    for (const category of categories) {
      mergedCategories.set(category.slug, category);
    }

    const resolvedCategories = [...mergedCategories.values()].sort(
      (left, right) => (left.order ?? 999) - (right.order ?? 999),
    );

    logServerDebug('app/category', 'Fetched category sidebar list', {
      count: resolvedCategories.length,
    });

    return resolvedCategories;
  } catch (error) {
    logServerError('app/category', 'Failed to fetch category sidebar list', error);
    return fallbackCategories.map(toFallbackCategoryWithCount);
  }
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const category = await getCategory(params?.slug ?? '');
  if (!category) {
    return { title: 'Kategori Bulunamadı - Keşfet Muğla' };
  }
  return {
    title: `${category?.name ?? ''} - Keşfet Muğla`,
    description: category?.description ?? `Muğla bölgesinde ${category?.name ?? ''} hakkında bilgiler.`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const [category, allCategories] = await Promise.all([
    getCategory(params?.slug ?? ''),
    getCategories(),
  ]);

  if (!category) {
    notFound();
  }

  const articles = category?.articles ?? [];

  return (
    <div className="pt-16">
      <section className="bg-gradient-hero text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
              <CategoryIcon icon={category?.icon ?? ''} className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-1">{category?.name ?? ''}</h1>
              <p className="text-white/80">{category?.description ?? ''}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <AdPlaceholder size="banner" className="mb-6" />

            {(articles?.length ?? 0) === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-xl">
                <p className="text-gray-500">
                  Bu kategori için henüz içerik bulunmuyor. İlgili sayfa artık 404 vermiyor; veri eklendiğinde
                  içerikler burada listelenecek.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {articles?.map?.((article: Article, index: number) => (
                  <div key={article?.id ?? index}>
                    <ArticleCard
                      variant="row"
                      href={`/makale/${article?.slug ?? ''}`}
                      title={article?.title ?? ''}
                      summary={article?.summary ?? ''}
                      imageUrl={article?.imageUrl ?? ''}
                      date={article?.createdAt ? article?.createdAt?.toISOString?.() : ''}
                    />
                    {(index ?? 0) === 1 && <AdPlaceholder size="inline" className="mt-6" />}
                  </div>
                )) ?? null}
              </div>
            )}
          </div>

          <aside className="w-full lg:w-72 space-y-6">
            <AdPlaceholder size="sidebar" />

            <div className="bg-white rounded-xl shadow-md p-5">
              <h3 className="font-bold text-gray-900 mb-4">Diğer Kategoriler</h3>
              <div className="space-y-2">
                {allCategories
                  ?.filter?.((categoryItem: CategoryWithCount) => categoryItem?.slug !== params?.slug)
                  ?.map?.((cat: CategoryWithCount) => (
                    <Link
                      key={cat?.id ?? ''}
                      href={`/kategori/${cat?.slug ?? ''}`}
                      className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <CategoryIcon icon={cat?.icon ?? ''} className="w-4 h-4 text-sky-500" />
                        <span className="text-sm text-gray-700">{cat?.name ?? ''}</span>
                      </div>
                      <span className="text-xs text-gray-400">{cat?._count?.articles ?? 0}</span>
                    </Link>
                  )) ?? null}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
