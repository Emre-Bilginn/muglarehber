'use client';

import { useState } from "react";
import Link from "next/link";
import { Compass, Mail, Menu, X } from "lucide-react";
import SearchModal from "@/components/search-modal";
import { getPublishedDestinations } from "@/lib/destinations";

const navigationCategories = [
  { slug: "gezilecek-yerler", name: "Gezilecek Yerler" },
  { slug: "plajlar", name: "Plajlar" },
  { slug: "kamp-alanlari", name: "Kamp Alanları" },
  { slug: "yeme-icme", name: "Yeme İçme" },
  { slug: "tarihi-yerler", name: "Tarihi Yerler" },
  { slug: "doga-rotalari", name: "Doğa Rotaları" },
  { slug: "ilceler", name: "İlçeler" },
];

const primaryNav = navigationCategories.slice(0, 6);
const navigationDestinations = getPublishedDestinations().filter((destination) =>
  ["fethiye", "bodrum", "marmaris", "datca", "akyaka", "dalyan"].includes(destination.slug),
);

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="border-b border-slate-100 bg-slate-50">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 text-xs text-slate-500">
          <p className="truncate">Muğla için güncellenen rota rehberleri, ilçe içerikleri ve gezi planları</p>
          <Link href="/iletisim" className="inline-flex flex-none items-center gap-2 font-medium text-slate-700 hover:text-sky-700">
            <Mail className="h-3.5 w-3.5" />
            Editörle iletişime geç
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-4">
        <div className="flex items-center justify-between gap-3">
          <Link href="/" className="inline-flex min-w-0 items-center gap-3" onClick={closeMenu}>
            <span className="flex h-12 w-12 flex-none items-center justify-center rounded-2xl bg-slate-900 text-white"><Compass className="h-6 w-6" /></span>
            <span className="min-w-0">
              <span className="block text-lg font-semibold tracking-tight text-slate-950">Keşfet Muğla</span>
              <span className="hidden text-sm text-slate-500 sm:block">Gerçek rota mantığıyla hazırlanmış Muğla rehberleri</span>
            </span>
          </Link>

          <div className="hidden md:block"><SearchModal /></div>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50 md:hidden"
            aria-label={isMenuOpen ? "Menüyü kapat" : "Menüyü aç"}
            aria-controls="mobile-navigation"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((current) => !current)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <nav aria-label="Ana navigasyon" className="mt-4 hidden md:block">
          <ul className="flex items-center gap-2 overflow-x-auto pb-1">
            <li><Link href="/kesfet" className="inline-flex rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800">Keşfet</Link></li>
            {primaryNav.map((category) => <li key={category.slug}><Link href={`/kategori/${category.slug}`} className="inline-flex rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950">{category.name}</Link></li>)}
            <li><Link href="/mugla/fethiye" className="inline-flex rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950">Bölgeler</Link></li>
            <li><Link href="/hakkimizda" className="inline-flex rounded-full border border-transparent px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-950">Hakkımızda</Link></li>
            <li><Link href="/iletisim" className="inline-flex rounded-full border border-transparent px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-950">İletişim</Link></li>
          </ul>
        </nav>

        {isMenuOpen ? (
          <nav id="mobile-navigation" aria-label="Mobil navigasyon" className="mt-4 rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-lg md:hidden">
            <div className="border-b border-slate-100 pb-5"><SearchModal /></div>
            <div className="grid gap-6 pt-5">
              <Link href="/kesfet" onClick={closeMenu} className="rounded-xl bg-slate-900 px-4 py-3 text-center text-sm font-semibold text-white hover:bg-slate-800">Muğla’daki yerleri keşfet</Link>
              <section>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Bölgeler</p>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {navigationDestinations.map((destination) => <Link key={destination.slug} href={`/mugla/${destination.slug}`} onClick={closeMenu} className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-medium text-slate-700 hover:border-sky-200 hover:bg-sky-50">{destination.name}</Link>)}
                </div>
              </section>
              <section>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Kategoriler</p>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {navigationCategories.map((category) => <Link key={category.slug} href={`/kategori/${category.slug}`} onClick={closeMenu} className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-medium text-slate-700 hover:border-sky-200 hover:bg-sky-50">{category.name}</Link>)}
                </div>
              </section>
              <div className="grid grid-cols-2 gap-2 border-t border-slate-100 pt-5">
                <Link href="/hakkimizda" onClick={closeMenu} className="rounded-xl border border-slate-200 px-3 py-3 text-center text-sm font-medium text-slate-700 hover:bg-slate-50">Hakkımızda</Link>
                <Link href="/iletisim" onClick={closeMenu} className="rounded-xl border border-slate-200 px-3 py-3 text-center text-sm font-medium text-slate-700 hover:bg-slate-50">İletişim</Link>
              </div>
            </div>
          </nav>
        ) : null}
      </div>
    </header>
  );
}
