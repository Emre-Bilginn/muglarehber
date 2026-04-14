import StaticPageLayout from "@/components/static-page-layout";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Kullanım Şartları | Keşfet Muğla",
  description:
    "Keşfet Muğla içeriğinin kullanım koşulları, editöryel sorumluluk sınırları ve kullanıcı yükümlülükleri hakkında bilgi alın.",
  path: "/kullanim-sartlari",
});

export default function TermsPage() {
  return (
    <StaticPageLayout
      eyebrow="Yasal Bilgilendirme"
      title="Kullanım Şartları"
      description="Bu sayfa, Keşfet Muğla üzerindeki içeriklerin bilgi amaçlı kullanım çerçevesini ve kullanıcı sorumluluklarını açıklar."
    >
      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-slate-950">İçerik niteliği</h2>
        <p className="mt-4 text-base leading-8 text-slate-600">
          Keşfet Muğla'da yer alan tüm içerikler bilgi ve rehberlik amacıyla yayımlanır. Fiyat, açılış
          saati, yol durumu, rezervasyon politikası ve işletme uygulamaları zaman içinde değişebileceği
          için kullanıcıların nihai karar öncesinde güncel doğrulama yapması önerilir.
        </p>
      </section>
      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-slate-950">Fikri haklar</h2>
        <p className="mt-4 text-base leading-8 text-slate-600">
          Site üzerindeki özgün metinler, kurgu ve editöryel düzen Keşfet Muğla'ya aittir. Kaynak
          göstermeden kopyalama, toplu veri çekme veya yanıltıcı yeniden kullanım kabul edilmez.
        </p>
      </section>
      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-slate-950">Sorumluluk sınırı</h2>
        <p className="mt-4 text-base leading-8 text-slate-600">
          Kullanıcıların seyahat, rezervasyon veya satın alma kararları kendi sorumluluğundadır.
          Keşfet Muğla, rehber niteliğindeki bilgilerin kullanımından doğabilecek dolaylı sonuçlardan
          sorumlu tutulamaz.
        </p>
      </section>
    </StaticPageLayout>
  );
}
