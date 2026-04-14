import StaticPageLayout from "@/components/static-page-layout";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Hakkımızda | Keşfet Muğla",
  description:
    "Keşfet Muğla'nın yayın yaklaşımı, içerik standartları ve neden kısa tanıtım yerine uzun rehber içerikler ürettiği hakkında bilgi alın.",
  path: "/hakkimizda",
});

export default function AboutPage() {
  return (
    <StaticPageLayout
      eyebrow="Kurumsal"
      title="Hakkımızda"
      description="Keşfet Muğla, Muğla'yı yalnızca tanıtan değil, gezmesi daha doğru planlanan bir bölge haline getirmeyi amaçlayan editöryel bir içerik platformudur."
    >
      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
          Neyi farklı yapıyoruz?
        </h2>
        <p className="mt-4 text-base leading-8 text-slate-600">
          Bu sitede kısa, tekrarlayan ve yüzeysel metinler yerine karar verdiren rehber içerikler
          üretmeye odaklanıyoruz. Bir plajı yalnızca “güzel” olduğu için önermiyor; hangi ziyaretçi
          profiline uygun olduğunu, günün hangi saatinde daha verimli kullanıldığını ve çevrede hangi
          duraklarla birleştiğini açıklıyoruz.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
          Editöryel yaklaşım
        </h2>
        <p className="mt-4 text-base leading-8 text-slate-600">
          İçerikler hazırlanırken ilçe karakteri, ziyaretçi beklentisi, sezon yoğunluğu, ulaşım
          gerçekliği ve saha deneyimini etkileyen pratik başlıklar birlikte değerlendirilir.
          Yayın politikamız, içeriği yalnızca arama motoru için değil, gerçekten rota kuran kullanıcı
          için anlamlı hale getirmektir.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
          İçerik güncelleme mantığı
        </h2>
        <p className="mt-4 text-base leading-8 text-slate-600">
          Bölgesel yoğunluk, sezon değişimleri, sahil kullanımı ve okuyucu geri bildirimleri
          doğrultusunda yayınlarımız düzenli olarak gözden geçirilir. Fiyat, resmi saat ve işletme
          politikaları değişebileceği için kullanıcıların gezi öncesinde güncel bilgiyi ayrıca
          doğrulaması önerilir.
        </p>
      </section>
    </StaticPageLayout>
  );
}
