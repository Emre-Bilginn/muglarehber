import StaticPageLayout from "@/components/static-page-layout";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Gizlilik Politikası | Keşfet Muğla",
  description:
    "Keşfet Muğla'nın kişisel verileri nasıl ele aldığı, iletişim formlarında hangi bilgileri topladığı ve kullanıcı mahremiyetini nasıl koruduğu hakkında bilgi alın.",
  path: "/gizlilik-politikasi",
});

export default function PrivacyPolicyPage() {
  return (
    <StaticPageLayout
      eyebrow="Yasal Bilgilendirme"
      title="Gizlilik Politikası"
      description="Bu sayfa, Keşfet Muğla üzerinde toplanan sınırlı verilerin hangi amaçlarla işlendiğini ve kullanıcı mahremiyetinin nasıl korunduğunu açıklar."
    >
      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-slate-950">Toplanan bilgiler</h2>
        <p className="mt-4 text-base leading-8 text-slate-600">
          İletişim formu üzerinden ad, e-posta, konu ve mesaj bilgileri alınabilir. Bu veriler yalnızca
          kullanıcı talebine dönüş yapmak, içerik düzeltme taleplerini değerlendirmek veya iş birliği
          başvurularını yanıtlamak amacıyla kullanılır.
        </p>
      </section>
      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-slate-950">Veri kullanım amacı</h2>
        <p className="mt-4 text-base leading-8 text-slate-600">
          Toplanan veriler, yayın kalitesini artırmak ve kullanıcı iletişimini yönetmek dışında farklı
          bir ticari amaçla kullanılmaz. Zorunlu yasal yükümlülükler haricinde üçüncü kişilerle paylaşılmaz.
        </p>
      </section>
      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-slate-950">Haklar ve talepler</h2>
        <p className="mt-4 text-base leading-8 text-slate-600">
          İletişim formu üzerinden ilettiğiniz verilerle ilgili erişim, düzeltme veya silme talebinizi
          iletisim@kesfetmugla.com adresine yazılı olarak gönderebilirsiniz.
        </p>
      </section>
    </StaticPageLayout>
  );
}
