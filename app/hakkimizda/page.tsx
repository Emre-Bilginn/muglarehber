import { Compass, Heart, Target, Users } from 'lucide-react';
import AdPlaceholder from '@/components/ad-placeholder';

export const metadata = {
  title: 'Hakkımızda - Keşfet Muğla',
  description: 'Keşfet Muğla hakkında bilgi edinin. Biz kimiz, misyonumuz ve vizyonumuz.',
};

export default function AboutPage() {
  return (
    <div className="pt-16">
      {/* Header */}
      <section className="bg-gradient-hero text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/20 flex items-center justify-center">
            <Compass className="w-10 h-10" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Hakkımızda</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Keşfet Muğla, Muğla bölgesini keşfetmek isteyenler için kapsamlı bir gezi rehberidir.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <AdPlaceholder size="banner" className="mb-8" />

        {/* Content */}
        <div className="bg-white rounded-xl shadow-md p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Heart className="w-6 h-6 text-sky-500" />
              Biz Kimiz?
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Keşfet Muğla, Ege ve Akdeniz'in buluştuğu bu eşsiz bölgeyi tanıtmak ve ziyaretçilere en güncel, doğru bilgileri sunmak amacıyla kurulmuş bir turizm platformudur.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Bodrum'un tarihi sokaklarından Fethiye'nin turkuaz sularına, Marmaris'in canlı gece hayatından Dalyan'ın sakin doğasına kadar Muğla'nın tüm güzelliklerini sizlerle paylaşıyoruz.
            </p>
          </section>

          <AdPlaceholder size="inline" />

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Target className="w-6 h-6 text-sky-500" />
              Misyonumuz
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Ziyaretçilere en güncel ve güvenilir bilgileri sunarak, Muğla'daki tatil deneyimlerini en üst düzeye çıkarmak istiyoruz. Plajlar, restoranlar, oteller, aktiviteler ve daha fazlası hakkında detaylı bilgiler sağlayarak, tatilinizi planlamayı kolaylaştırıyoruz.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Users className="w-6 h-6 text-sky-500" />
              Neden Keşfet Muğla?
            </h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 mt-2 rounded-full bg-sky-500" />
                <span className="text-gray-700">Güncel ve doğru bilgiler için düzenli olarak güncellenen içerikler</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 mt-2 rounded-full bg-sky-500" />
                <span className="text-gray-700">Yerel uzmanlar tarafından hazırlanan detaylı rehberler</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 mt-2 rounded-full bg-sky-500" />
                <span className="text-gray-700">GPS koordinatları ve harita entegrasyonu ile kolay navigasyon</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 mt-2 rounded-full bg-sky-500" />
                <span className="text-gray-700">Kullanıcı yorumları ve gerçek deneyimler</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 mt-2 rounded-full bg-sky-500" />
                <span className="text-gray-700">Ücretsiz ve reklamsız içerik (reklamlar sadece siteyi desteklemek içindir)</span>
              </li>
            </ul>
          </section>
        </div>

        <AdPlaceholder size="footer" className="mt-8" />
      </div>
    </div>
  );
}
