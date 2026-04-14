import Link from "next/link";

type EmptyStateProps = {
  title: string;
  description: string;
  ctaHref?: string;
  ctaLabel?: string;
};

export default function EmptyState({
  title,
  description,
  ctaHref,
  ctaLabel,
}: EmptyStateProps) {
  return (
    <div className="rounded-[2rem] border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center">
      <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
      <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-600">
        {description}
      </p>
      {ctaHref && ctaLabel ? (
        <div className="mt-6">
          <Link
            href={ctaHref}
            className="inline-flex rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white hover:bg-slate-800"
          >
            {ctaLabel}
          </Link>
        </div>
      ) : null}
    </div>
  );
}
