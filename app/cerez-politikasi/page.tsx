import StaticPageLayout from "@/components/static-page-layout";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Çerez Politikası | Keşfet Muğla",
  description:
    "Keşfet Muğla üzerinde kullanılan temel çerez yaklaşımı, performans ölçümü ve gelecekteki reklam altyapısı hakkında bilgi alın.",
  path: "/cerez-politikasi",
});

export default function CookiePolicyPage() {
  return (
    <StaticPageLayout
      eyebrow="Yasal Bilgilendirme"
      title="Çerez Politikası"
      description="Keşfet Muğla, kullanıcı deneyimini iyileştirmek ve temel performans ölçümleri yapmak için sınırlı çerez kullanımını benimser."
    >
      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-slate-950">Çerezlerin kapsamı</h2>
        <p className="mt-4 text-base leading-8 text-slate-600">
          Site üzerinde oturum yönetimi, temel kullanım analizi ve sayfa performansını anlamaya yönelik
          sınırlı teknik çerezler kullanılabilir. Çerezler, kullanıcı deneyimini iyileştirmek ve siteyi
          teknik olarak güvenilir biçimde çalıştırmak amacıyla değerlendirilir.
        </p>
      </section>
      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-slate-950">Reklam ve ölçüm notu</h2>
        <p className="mt-4 text-base leading-8 text-slate-600">
          Site mimarisi ileride reklam entegrasyonuna uygun biçimde hazırlanmış olsa da, reklam
          teknolojileri devreye alındığında bu politika ayrıca güncellenir ve gerekli kullanıcı bildirimleri sağlanır.
        </p>
      </section>
      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-slate-950">Tarayıcı tercihleri</h2>
        <p className="mt-4 text-base leading-8 text-slate-600">
          Çerezleri tarayıcı ayarlarınızdan silebilir veya engelleyebilirsiniz. Ancak bazı işlevsel
          alanların bu durumda beklenen şekilde çalışmama ihtimali bulunur.
        </p>
      </section>
    </StaticPageLayout>
  );
}
