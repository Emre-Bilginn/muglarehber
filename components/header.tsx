import Link from "next/link";
import { Compass, Mail } from "lucide-react";
import SearchModal from "@/components/search-modal";
import { guideCategories } from "@/lib/content";

const primaryNav = guideCategories.slice(0, 6);

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="border-b border-slate-100 bg-slate-50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-xs text-slate-500">
          <p>Muğla için güncellenen rota rehberleri, ilçe içerikleri ve gezi planları</p>
          <Link
            href="/iletisim"
            className="inline-flex items-center gap-2 font-medium text-slate-700 hover:text-sky-700"
          >
            <Mail className="h-3.5 w-3.5" />
            Editörle iletişime geç
          </Link>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link href="/" className="inline-flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white">
              <Compass className="h-6 w-6" />
            </span>
            <span>
              <span className="block text-lg font-semibold tracking-tight text-slate-950">
                Keşfet Muğla
              </span>
              <span className="block text-sm text-slate-500">
                Gerçek rota mantığıyla hazırlanmış Muğla rehberleri
              </span>
            </span>
          </Link>

          <SearchModal />
        </div>

        <nav aria-label="Ana navigasyon" className="overflow-x-auto">
          <ul className="flex min-w-max items-center gap-2 pb-1">
            {primaryNav.map((category) => (
              <li key={category.slug}>
                <Link
                  href={`/kategori/${category.slug}`}
                  className="inline-flex rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950"
                >
                  {category.name}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/hakkimizda"
                className="inline-flex rounded-full border border-transparent px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-950"
              >
                Hakkımızda
              </Link>
            </li>
            <li>
              <Link
                href="/iletisim"
                className="inline-flex rounded-full border border-transparent px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-950"
              >
                İletişim
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
