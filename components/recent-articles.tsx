import ArticleCard from "@/components/article-card";
import EmptyState from "@/components/empty-state";
import { getLatestArticles } from "@/lib/content";

export default function RecentArticles() {
  const articles = getLatestArticles(6);

  if (articles.length === 0) {
    return (
      <EmptyState
        title="Henüz yayınlanmış rehber bulunmuyor"
        description="İçerik editörlüğü tamamlandığında burada yeni yayınlar otomatik olarak listelenecek."
      />
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {articles.map((article) => (
        <ArticleCard key={article.slug} article={article} />
      ))}
    </div>
  );
}
