import Link from "next/link";
import { notFound } from "next/navigation";
import AdPlaceholder from "@/components/ad-placeholder";
import ArticleCard from "@/components/article-card";
import CategoryIcon from "@/components/category-icon";
import EmptyState from "@/components/empty-state";
import SiteBreadcrumbs from "@/components/site-breadcrumbs";
import SafeImage from "@/components/ui/safe-image";
import { breadcrumbSchema, buildMetadata } from "@/lib/seo";
import {
  getArticlesByCategory,
  getCategoriesWithCounts,
  getCategoryBySlug,
  guideCategories,
} from "@/lib/content";
import { getCategoryCoverAlt, getCategoryCoverImage } from "@/lib/image-utils";
import { absoluteUrl } from "@/lib/site-config";

type CategoryPageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return guideCategories.map((category) => ({
    slug: category.slug,
  }));
}

export function generateMetadata({ params }: CategoryPageProps) {
  const category = getCategoryBySlug(params.slug);

  if (!category) {
    return buildMetadata({
      title: "Kategori bulunamadı | Keşfet Muğla",
      description: "İstenen kategori sayfası bulunamadı.",
      path: `/kategori/${params.slug}`,
    });
  }

  return buildMetadata({
    title: `${category.name} | Keşfet Muğla`,
    description: category.seoDescription,
    path: `/kategori/${category.slug}`,
    image: getCategoryCoverImage(category.slug),
    keywords: [category.name, "Muğla", "rehber içerik", "kategori"],
  });
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = getCategoryBySlug(params.slug);

  if (!category) {
    notFound();
  }

  const articles = getArticlesByCategory(category.slug);
  const categories = getCategoriesWithCounts();
  const categoryCoverImage = getCategoryCoverImage(category.slug);
  const schema = breadcrumbSchema([
    { name: "Ana sayfa", url: absoluteUrl("/") },
    { name: category.name, url: absoluteUrl(`/kategori/${category.slug}`) },
  ]);

  return (
    <div className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-10 md:py-14">
          <SiteBreadcrumbs
            items={[
              { label: "Ana sayfa", href: "/" },
              { label: category.name },
            ]}
          />

          <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-end">
            <div className="max-w-4xl">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 text-white">
                <CategoryIcon icon={category.icon} className="h-6 w-6" />
              </div>
              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">
                Kategori arşivi
              </p>
              <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950 md:text-5xl">
                {category.name}
              </h1>
              <p className="mt-4 text-base leading-8 text-slate-600 md:text-lg">
                {category.intro}
              </p>
            </div>

            <div className="space-y-4">
              <div className="relative aspect-[16/10] overflow-hidden rounded-[2.25rem] border border-slate-200 bg-slate-100 shadow-sm">
                <SafeImage
                  src={categoryCoverImage}
                  alt={getCategoryCoverAlt(category.name)}
                  fill
                  priority
                  sizes="(min-width: 1024px) 380px, 100vw"
                  className="object-cover"
                  debugLabel={`category-hero:${category.slug}`}
                />
              </div>
              <div className="rounded-[2rem] border border-slate-200 bg-white px-6 py-5 shadow-sm">
                <p className="text-sm font-medium text-slate-500">Bu kategoride yayında olan içerik</p>
                <p className="mt-2 text-3xl font-semibold text-slate-950">{articles.length}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-8">
        <AdPlaceholder
          size="banner"
          label={`${category.name} kategori sayfası için planlanan üst reklam alanı. İçerik giriş metninin önüne geçmeyecek ölçüde tasarlanmıştır.`}
        />
      </div>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 pb-14 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div>
          {articles.length === 0 ? (
            <EmptyState
              title="Bu kategori için içerik hazırlık aşamasında"
              description={`${category.name} arşivi için kapsamlı rehberler editöryel sıraya alındı. Bu kategori, kısa içeriklerle doldurulmak yerine yeterli derinlik sağlandığında yayına alınır.`}
              ctaHref="/"
              ctaLabel="Ana sayfaya dön"
            />
          ) : (
            <div className="space-y-6">
              {articles.map((article, index) => (
                <div key={article.slug} className="space-y-6">
                  <ArticleCard article={article} variant="row" />
                  {index === 1 ? (
                    <AdPlaceholder
                      size="inline"
                      label="Kategori akışı içinde kullanılabilecek doğal reklam alanı."
                    />
                  ) : null}
                </div>
              ))}
            </div>
          )}
        </div>

        <aside className="space-y-6">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Bu kategori ne sunar?
            </p>
            <p className="mt-4 text-sm leading-7 text-slate-600">{category.description}</p>
          </div>

          <AdPlaceholder
            size="sidebar"
            label="Kategori yan alanı için ayrılan reklam yeri. İçeriğin okunabilirliğini bozmayacak seviyede tutulur."
          />

          <div className="rounded-[2rem] border border-slate-200 bg-white p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Diğer kategoriler
            </p>
            <div className="mt-4 space-y-3">
              {categories
                .filter((item) => item.slug !== category.slug)
                .map((item) => (
                  <Link
                    key={item.slug}
                    href={`/kategori/${item.slug}`}
                    className="flex items-center justify-between rounded-[1.25rem] border border-slate-200 px-4 py-3 text-sm text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                  >
                    <span className="inline-flex items-center gap-3">
                      <CategoryIcon icon={item.icon} className="h-4 w-4" />
                      {item.name}
                    </span>
                    <span className="text-slate-400">{item.articleCount}</span>
                  </Link>
                ))}
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}
