import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import prisma from '@/lib/db';
import AdPlaceholder from '@/components/ad-placeholder';
import CommentSection from '@/components/comment-section';
import MapEmbed from '@/components/map-embed';
import { ArrowLeft, Calendar, Eye, CheckCircle } from 'lucide-react';

export const dynamic = "force-dynamic";

interface Article {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  imageUrl: string | null;
  gpsLat: number | null;
  gpsLng: number | null;
  highlights: string[];
  viewCount: number;
  categoryId: string;
  createdAt: Date;
  category: { name: string; slug: string };
}

interface RelatedArticle {
  id: string;
  title: string;
  slug: string;
  imageUrl: string | null;
}

interface ArticlePageProps {
  params: { slug: string };
}

async function getArticle(slug: string): Promise<Article | null> {
  const article = await prisma?.article?.findUnique?.({
    where: { slug: slug ?? '' },
    include: {
      category: true,
    },
  });

  if (article) {
    await prisma?.article?.update?.({
      where: { id: article?.id ?? '' },
      data: { viewCount: (article?.viewCount ?? 0) + 1 },
    })?.catch?.(() => {});
  }

  return article as Article | null;
}

async function getRelatedArticles(categoryId: string, currentId: string): Promise<RelatedArticle[]> {
  const articles = await prisma?.article?.findMany?.({
    where: {
      categoryId: categoryId ?? '',
      id: { not: currentId ?? '' },
    },
    take: 3,
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      title: true,
      slug: true,
      imageUrl: true,
    },
  }) ?? [];
  return articles as RelatedArticle[];
}

export async function generateMetadata({ params }: ArticlePageProps) {
  const article = await getArticle(params?.slug ?? '');
  if (!article) {
    return { title: 'Makale Bulunamadı - Muğla Rehber' };
  }
  return {
    title: `${article?.title ?? ''} - Muğla Rehber`,
    description: article?.summary ?? '',
    openGraph: {
      title: article?.title ?? '',
      description: article?.summary ?? '',
      images: article?.imageUrl ? [article?.imageUrl] : [],
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const article = await getArticle(params?.slug ?? '');

  if (!article) {
    notFound();
  }

  const relatedArticles = await getRelatedArticles(article?.categoryId ?? '', article?.id ?? '');
  const highlights = article?.highlights ?? [];
  const content = article?.content ?? '';
  const paragraphs = content?.split?.('\n\n')?.filter?.((p: string) => p?.trim?.()) ?? [];

  return (
    <div className="pt-16">
      {/* Header Image */}
      <section className="relative h-[40vh] md:h-[50vh] bg-gray-900">
        {article?.imageUrl && (
          <Image
            src={article?.imageUrl ?? ''}
            alt={article?.title ?? ''}
            fill
            className="object-cover opacity-70"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <div className="max-w-4xl mx-auto">
            <Link
              href={`/kategori/${article?.category?.slug ?? ''}`}
              className="inline-flex items-center gap-1 px-3 py-1 bg-sky-500 text-white text-sm font-medium rounded-full mb-3 hover:bg-sky-600 transition-colors"
            >
              {article?.category?.name ?? ''}
            </Link>
            <h1 className="text-2xl md:text-4xl font-bold text-white mb-3">
              {article?.title ?? ''}
            </h1>
            <div className="flex items-center gap-4 text-white/70 text-sm">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {article?.createdAt
                  ? new Date(article?.createdAt)?.toLocaleDateString?.('tr-TR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })
                  : ''}
              </span>
              <span className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                {article?.viewCount ?? 0} görüntülenme
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <Link
          href={`/kategori/${article?.category?.slug ?? ''}`}
          className="inline-flex items-center gap-2 text-sky-600 hover:text-sky-700 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          {article?.category?.name ?? ''} kategorisine dön
        </Link>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <article className="flex-1">
            <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
              <p className="text-lg text-gray-600 mb-6 border-l-4 border-sky-500 pl-4">
                {article?.summary ?? ''}
              </p>

              <AdPlaceholder size="inline" className="mb-6" />

              <div className="prose max-w-none">
                {paragraphs?.map?.((paragraph: string, index: number) => (
                  <div key={index ?? 0}>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      {paragraph?.split?.('**')?.map?.((part: string, i: number) => (
                        i % 2 === 1 ? <strong key={i}>{part ?? ''}</strong> : (part ?? '')
                      )) ?? paragraph}
                    </p>
                    {(index ?? 0) === Math.floor((paragraphs?.length ?? 0) / 2) && (
                      <AdPlaceholder size="inline" className="my-6" />
                    )}
                  </div>
                )) ?? null}
              </div>

              {(highlights?.length ?? 0) > 0 && (
                <div className="mt-8 p-6 bg-sky-50 rounded-xl">
                  <h3 className="font-bold text-gray-900 mb-4">Öne Çıkan Özellikler</h3>
                  <ul className="space-y-2">
                    {highlights?.map?.((highlight: string, index: number) => (
                      <li key={index ?? 0} className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-sky-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{highlight ?? ''}</span>
                      </li>
                    )) ?? null}
                  </ul>
                </div>
              )}
            </div>

            {(article?.gpsLat && article?.gpsLng) && (
              <div className="mt-6">
                <MapEmbed
                  lat={article?.gpsLat ?? null}
                  lng={article?.gpsLng ?? null}
                  title={article?.title ?? ''}
                />
              </div>
            )}

            <div className="mt-6">
              <CommentSection articleId={article?.id ?? ''} />
            </div>
          </article>

          {/* Sidebar */}
          <aside className="w-full lg:w-80 space-y-6">
            <AdPlaceholder size="sidebar" />

            {(relatedArticles?.length ?? 0) > 0 && (
              <div className="bg-white rounded-xl shadow-md p-5">
                <h3 className="font-bold text-gray-900 mb-4">Benzer Yazılar</h3>
                <div className="space-y-4">
                  {relatedArticles?.map?.((related: RelatedArticle) => (
                    <Link key={related?.id ?? ''} href={`/makale/${related?.slug ?? ''}`} className="group flex gap-3">
                      <div className="relative w-20 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                        {related?.imageUrl && (
                          <Image
                            src={related?.imageUrl ?? ''}
                            alt={related?.title ?? ''}
                            fill
                            className="object-cover"
                          />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 group-hover:text-sky-600 transition-colors line-clamp-2 text-sm">
                          {related?.title ?? ''}
                        </h4>
                      </div>
                    </Link>
                  )) ?? null}
                </div>
              </div>
            )}

            <AdPlaceholder size="sidebar" />
          </aside>
        </div>
      </div>
    </div>
  );
}
