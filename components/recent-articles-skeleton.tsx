const items = Array.from({ length: 6 });

export default function RecentArticlesSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items?.map?.((_, index) => (
        <div
          key={index}
          className="rounded-2xl overflow-hidden bg-white shadow-md"
          aria-hidden="true"
        >
          <div className="aspect-[16/10] bg-slate-100 animate-pulse" />
          <div className="p-5 space-y-3">
            <div className="h-4 w-24 rounded-full bg-slate-100 animate-pulse" />
            <div className="h-5 w-3/4 rounded-full bg-slate-100 animate-pulse" />
            <div className="h-4 w-full rounded-full bg-slate-100 animate-pulse" />
            <div className="h-4 w-2/3 rounded-full bg-slate-100 animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
}
