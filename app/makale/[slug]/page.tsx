import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock3,
  User2,
} from "lucide-react";
import AdPlaceholder from "@/components/ad-placeholder";
import ArticleCard from "@/components/article-card";
import ImageWithFallback from "@/components/image-with-fallback";
import MarkdownContent from "@/components/markdown-content";
import ShareLinks from "@/components/share-links";
import SiteBreadcrumbs from "@/components/site-breadcrumbs";
import TableOfContents from "@/components/table-of-contents";
import { articleSchema, breadcrumbSchema, buildMetadata } from "@/lib/seo";
import {
  getAllArticles,
  getArticleBySlug,
  getPrevNextArticles,
  getRelatedArticles,
} from "@/lib/content";
import { absoluteUrl } from "@/lib/site-config";

type ArticlePageProps = {
  params: {
    slug: string;
  };
};

const quickFactLabels = {
  idealSeason: "En iyi dönem",
  visitDuration: "Önerilen süre",
  transport: "Ulaşım",
  suitableFor: "Kimler için uygun",
  caution: "Dikkat edilmesi gereken",
};

export function generateStaticParams() {
  return getAllArticles().map((article) => ({
    slug: article.slug,
  }));
}

export function generateMetadata({ params }: ArticlePageProps) {
  const article = getArticleBySlug(params.slug);

  if (!article) {
    return buildMetadata({
      title: "Makale bulunamadı | Keşfet Muğla",
      description: "İstenen rehber içeriği bulunamadı.",
      path: `/makale/${params.slug}`,
    });
  }

  return buildMetadata({
    title: `${article.title} | Keşfet Muğla`,
    description: article.description,
    path: `/makale/${article.slug}`,
    image: article.image,
    keywords: [article.title, article.category.name, "Muğla rehberi", ...article.tags],
    type: "article",
  });
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const article = getArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = getRelatedArticles(article, 3);
  const { previous, next } = getPrevNextArticles(article);
  const breadcrumbItems = [
    { label: "Ana sayfa", href: "/" },
    { label: article.category.name, href: `/kategori/${article.category.slug}` },
    { label: article.title },
  ];

  const breadcrumbJsonLd = breadcrumbSchema([
    { name: "Ana sayfa", url: absoluteUrl("/") },
    { name: article.category.name, url: absoluteUrl(`/kategori/${article.category.slug}`) },
    { name: article.title, url: article.url },
  ]);

  const articleJsonLd = articleSchema({
    title: article.title,
    description: article.description,
    url: article.url,
    image: article.image.startsWith("http") ? article.image : absoluteUrl(article.image),
    publishedAt: article.publishedAt,
    updatedAt: article.updatedAt,
    authorName: article.author.name,
    categoryName: article.category.name,
  });

  return (
    <div className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-10 md:py-14">
          <SiteBreadcrumbs items={breadcrumbItems} />

          <div className="mt-8 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <Link
                href={`/kategori/${article.category.slug}`}
                className="inline-flex rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
              >
                {article.category.name}
              </Link>
              <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight text-slate-950 md:text-5xl">
                {article.title}
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600 md:text-lg">
                {article.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-5 text-sm text-slate-500">
                <span className="inline-flex items-center gap-2">
                  <CalendarDays className="h-4 w-4" />
                  {formatDate(article.publishedAt)}
                </span>
                <span className="inline-flex items-center gap-2">
                  <User2 className="h-4 w-4" />
                  {article.author.name}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Clock3 className="h-4 w-4" />
                  {article.readingTime} dk okuma
                </span>
              </div>
            </div>

            <div className="relative min-h-[320px] overflow-hidden rounded-[2.25rem] border border-slate-200 bg-slate-100 shadow-sm">
              <ImageWithFallback
                src={article.image}
                alt={article.imageAlt}
                fill
                priority
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-8">
        <AdPlaceholder
          size="banner"
          label="Makale üstü reklam yerleşimi için ayrılmış alan. Yayın akışını bozmadan içerik başlangıcının üzerine konumlanabilir."
        />
      </div>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 pb-14 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-8">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {Object.entries(article.quickFacts).map(([key, value]) => (
              <div key={key} className="rounded-[1.75rem] border border-slate-200 bg-white p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  {quickFactLabels[key as keyof typeof quickFactLabels]}
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-700">{value}</p>
              </div>
            ))}
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 md:p-10">
            <div className="rounded-[1.75rem] border border-sky-200 bg-sky-50 px-5 py-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
                Hızlı özet
              </p>
              <p className="mt-3 text-base leading-8 text-slate-700">
                {article.excerpt}
              </p>
            </div>

            <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px]">
              <div className="space-y-8">
                <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 px-5 py-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Editör notları
                  </p>
                  <ul className="mt-4 space-y-3">
                    {article.highlights.map((item) => (
                      <li key={item} className="flex gap-3 text-sm leading-7 text-slate-700">
                        <span className="mt-2 h-2 w-2 rounded-full bg-sky-700" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <AdPlaceholder
                  size="inline"
                  label="Makale içi reklam için ayrılmış alan. Uzun rehber akışında yalnızca doğal kırılım noktalarında kullanılmalıdır."
                />

                <MarkdownContent content={article.body} />

                <div className="rounded-[1.75rem] border border-emerald-200 bg-emerald-50 px-5 py-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-800">
                    Son söz
                  </p>
                  <p className="mt-3 text-base leading-8 text-slate-700">
                    Bu rehber, ziyaret kararını kolaylaştırmak için hazırlanmıştır. Sahaya çıkmadan önce
                    resmi saatleri, ulaşım koşullarını ve sezon yoğunluğunu ayrıca doğrulamak gezi kalitesini artırır.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <TableOfContents items={article.tableOfContents} />
                <div className="rounded-[2rem] border border-slate-200 bg-white p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Yazar
                  </p>
                  <p className="mt-3 text-base font-semibold text-slate-950">{article.author.name}</p>
                  <p className="mt-1 text-sm text-slate-500">{article.author.title}</p>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{article.author.bio}</p>
                </div>
                <ShareLinks title={article.title} url={article.url} />
                <AdPlaceholder
                  size="sidebar"
                  label="Yan kolon reklam alanı. İçindekiler ve paylaşım modülleriyle rekabet etmeyecek ölçüde planlanmıştır."
                />
              </div>
            </div>
          </div>

          {(previous || next) ? (
            <div className="grid gap-4 md:grid-cols-2">
              {previous ? (
                <Link
                  href={`/makale/${previous.slug}`}
                  className="rounded-[2rem] border border-slate-200 bg-white p-5 hover:border-slate-300"
                >
                  <p className="inline-flex items-center gap-2 text-sm text-slate-500">
                    <ChevronLeft className="h-4 w-4" />
                    Önceki içerik
                  </p>
                  <p className="mt-3 text-lg font-semibold tracking-tight text-slate-950">
                    {previous.title}
                  </p>
                </Link>
              ) : (
                <div />
              )}

              {next ? (
                <Link
                  href={`/makale/${next.slug}`}
                  className="rounded-[2rem] border border-slate-200 bg-white p-5 text-right hover:border-slate-300"
                >
                  <p className="inline-flex items-center gap-2 text-sm text-slate-500">
                    Sonraki içerik
                    <ChevronRight className="h-4 w-4" />
                  </p>
                  <p className="mt-3 text-lg font-semibold tracking-tight text-slate-950">
                    {next.title}
                  </p>
                </Link>
              ) : null}
            </div>
          ) : null}

          {relatedArticles.length > 0 ? (
            <div>
              <div className="mb-6">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
                  İlgili yazılar
                </p>
                <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
                  Bu içeriği tamamlayan rehberler
                </h2>
              </div>
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {relatedArticles.map((item) => (
                  <ArticleCard key={item.slug} article={item} />
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
}
