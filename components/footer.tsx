import Link from 'next/link';
import { Compass, Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2 text-xl font-bold text-white mb-4">
              <Compass className="w-6 h-6 text-sky-400" />
              <span>Keşfet Muğla</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Muğla bölgesinin en kapsamlı gezi rehberi. Bodrum, Fethiye, Marmaris ve daha fazlası hakkında her şey.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Kategoriler</h3>
            <div className="flex flex-col gap-2">
              <Link href="/kategori/gezilecek-yerler" className="text-sm hover:text-sky-400 transition-colors">Gezilecek Yerler</Link>
              <Link href="/kategori/plajlar" className="text-sm hover:text-sky-400 transition-colors">Plajlar</Link>
              <Link href="/kategori/aktiviteler" className="text-sm hover:text-sky-400 transition-colors">Aktiviteler</Link>
              <Link href="/kategori/restoranlar-kafeler" className="text-sm hover:text-sky-400 transition-colors">Restoranlar</Link>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">İletişim</h3>
            <div className="flex flex-col gap-3 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-sky-400" />
                <span>info@kesfetmugla.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-sky-400" />
                <span>Şu an yalnızca e-posta üzerinden iletişim sağlanmaktadır.</span>
              </div>
              <Link href="/iletisim" className="text-sky-400 hover:text-sky-300 transition-colors mt-2">
                Bize Ulaşın →
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-sm text-gray-500">
          <p>© 2026 Keşfet Muğla. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
}
