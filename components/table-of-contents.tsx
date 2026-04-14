import type { TableOfContentsItem } from "@/lib/content";

export default function TableOfContents({
  items,
}: {
  items: TableOfContentsItem[];
}) {
  if (items.length === 0) {
    return null;
  }

  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-5">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
        İçindekiler
      </p>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="text-sm leading-6 text-slate-700 hover:text-sky-700"
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
