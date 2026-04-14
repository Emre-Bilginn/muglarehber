import Link from "next/link";
import { Compass } from "lucide-react";
import { guideCategories, getAllArticles } from "@/lib/content";

export default function Footer() {
  const articleCount = getAllArticles().length;

  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 lg:grid-cols-[1.2fr_0.9fr_0.9fr_1fr]">
        <div>
          <Link href="/" className="inline-flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-slate-950">
              <Compass className="h-5 w-5" />
            </span>
            <span className="text-lg font-semibold text-white">Keşfet Muğla</span>
          </Link>
          <p className="mt-4 max-w-md text-sm leading-7 text-slate-400">
            Keşfet Muğla; kısa özet içerikler yerine, rota kurmaya yardımcı olan
            kapsamlı ilçe, plaj, kamp, doğa ve tarih rehberleri yayınlar.
          </p>
          <p className="mt-4 text-sm text-slate-400">
            Yayındaki rehber sayısı: <span className="font-semibold text-white">{articleCount}</span>
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-white">
            Kategoriler
          </h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-400">
            {guideCategories.map((category) => (
              <li key={category.slug}>
                <Link
                  href={`/kategori/${category.slug}`}
                  className="hover:text-white"
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-white">
            Kurumsal
          </h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-400">
            <li><Link href="/hakkimizda" className="hover:text-white">Hakkımızda</Link></li>
            <li><Link href="/iletisim" className="hover:text-white">İletişim</Link></li>
            <li><Link href="/gizlilik-politikasi" className="hover:text-white">Gizlilik Politikası</Link></li>
            <li><Link href="/cerez-politikasi" className="hover:text-white">Çerez Politikası</Link></li>
            <li><Link href="/kullanim-sartlari" className="hover:text-white">Kullanım Şartları</Link></li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-white">
            Editör Notu
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-400">
            İçerikler saha notları, sezon farkları ve okuyucu ihtiyaçları dikkate alınarak
            güncellenir. Plan yaparken fiyat, açılış saati ve resmi düzenlemeleri ayrıca
            doğrulamanız önerilir.
          </p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Keşfet Muğla. Tüm hakları saklıdır.</p>
          <p>İçerik odaklı yayın yapısı, reklamdan önce faydayı öne çıkarır.</p>
        </div>
      </div>
    </footer>
  );
}
