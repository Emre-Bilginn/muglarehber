import prisma from '@/lib/db';
import ArticleCard from '@/components/article-card';

interface Article {
  id: string;
  title: string;
  slug: string;
  summary: string;
  imageUrl: string | null;
  createdAt: Date;
  category: { name: string; slug: string };
}

async function getRecentArticles(): Promise<Article[]> {
  const articles = await prisma?.article?.findMany?.({
    include: { category: { select: { name: true, slug: true } } },
    orderBy: { createdAt: 'desc' },
    take: 6,
  }) ?? [];
  return articles as Article[];
}

export default async function RecentArticles() {
  const recentArticles = await getRecentArticles();

  if ((recentArticles?.length ?? 0) === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-10 text-center text-sm text-slate-500">
        Henüz yayınlanmış bir içerik bulunmuyor.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {recentArticles?.map?.((article) => (
        <ArticleCard
          key={article?.id ?? ''}
          href={`/makale/${article?.slug ?? ''}`}
          title={article?.title ?? ''}
          summary={article?.summary ?? ''}
          imageUrl={article?.imageUrl ?? ''}
          category={article?.category ?? null}
          date={article?.createdAt ? article?.createdAt?.toISOString?.() : ''}
        />
      )) ?? null}
    </div>
  );
}
