import Link from "next/link";
import { CalendarDays, Clock3, ArrowUpRight } from "lucide-react";
import SafeImage from "@/components/ui/safe-image";
import type { GuideArticle } from "@/lib/content";
import { isSvgImage } from "@/lib/image-utils";

type Variant = "hero" | "default" | "row" | "compact";

type ArticleCardProps = {
  article: GuideArticle;
  variant?: Variant;
};

const variants: Record<Variant, string> = {
  hero: "grid overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm lg:grid-cols-[1.15fr_0.85fr]",
  default: "overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm",
  row: "grid overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm md:grid-cols-[320px_1fr]",
  compact: "grid gap-4 rounded-[1.5rem] border border-slate-200 bg-white p-4 md:grid-cols-[120px_1fr]",
};

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function ArticleCard({
  article,
  variant = "default",
}: ArticleCardProps) {
  const isCompact = variant === "compact";
  const isRow = variant === "row";
  const isHero = variant === "hero";
  const isIllustration = isSvgImage(article.image);
  const imageClassName = isIllustration
    ? isCompact
      ? "object-contain p-2"
      : "object-contain p-4 md:p-6"
    : "object-cover";
  const imageWrapperClassName = isCompact
    ? "relative aspect-[4/3] overflow-hidden rounded-[1rem] bg-slate-100"
    : isHero
      ? "relative aspect-[16/10] overflow-hidden bg-slate-100 lg:min-h-[320px]"
      : isRow
        ? "relative aspect-[16/10] overflow-hidden bg-slate-100 md:min-h-[240px]"
        : "relative aspect-[16/10] overflow-hidden bg-slate-100";

  return (
    <article className={variants[variant]}>
      <div className={imageWrapperClassName}>
        <SafeImage
          src={article.image}
          alt={article.imageAlt}
          fill
          sizes={
            isHero
              ? "(min-width: 1024px) 52vw, 100vw"
              : isRow
                ? "(min-width: 768px) 320px, 100vw"
                : isCompact
                  ? "120px"
                : "(min-width: 1024px) 33vw, 100vw"
          }
          className={imageClassName}
          debugLabel={`article-card:${article.slug}`}
          priority={isHero}
        />
        {!isCompact && !isIllustration ? (
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/55 to-transparent" />
        ) : null}
        <div className="absolute left-4 top-4">
          <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-900">
            {article.category.name}
          </span>
        </div>
      </div>

      <div className={isCompact ? "min-w-0" : "flex flex-col justify-between p-6 md:p-7"}>
        {!isCompact ? (
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
              {article.district || article.category.name}
            </p>
            <h3
              className={`mt-3 font-semibold tracking-tight text-slate-950 ${
                isHero ? "text-3xl" : isRow ? "text-2xl" : "text-xl"
              }`}
            >
              <Link href={`/makale/${article.slug}`} className="hover:text-sky-700">
                {article.title}
              </Link>
            </h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">{article.excerpt}</p>
          </div>
        ) : (
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
              {article.category.name}
            </p>
            <h3 className="mt-2 line-clamp-2 text-base font-semibold tracking-tight text-slate-950">
              <Link href={`/makale/${article.slug}`} className="hover:text-sky-700">
                {article.title}
              </Link>
            </h3>
            <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">
              {article.excerpt}
            </p>
          </div>
        )}

        <div className={`mt-5 flex flex-wrap items-center gap-4 text-sm text-slate-500 ${isCompact ? "mt-3" : ""}`}>
          <span className="inline-flex items-center gap-2">
            <CalendarDays className="h-4 w-4" />
            {formatDate(article.publishedAt)}
          </span>
          <span className="inline-flex items-center gap-2">
            <Clock3 className="h-4 w-4" />
            {article.readingTime} dk okuma
          </span>
          <Link
            href={`/makale/${article.slug}`}
            className="inline-flex items-center gap-2 font-medium text-slate-900 hover:text-sky-700"
          >
            Rehberi aç
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
