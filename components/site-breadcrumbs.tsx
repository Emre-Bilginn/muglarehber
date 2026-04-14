import Link from "next/link";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

export default function SiteBreadcrumbs({
  items,
}: {
  items: BreadcrumbItem[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-slate-500">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2">
              {item.href && !isLast ? (
                <Link href={item.href} className="hover:text-slate-900">
                  {item.label}
                </Link>
              ) : (
                <span className={isLast ? "font-medium text-slate-900" : ""}>
                  {item.label}
                </span>
              )}
              {!isLast ? <span>/</span> : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

