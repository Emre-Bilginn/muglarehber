import ContactForm from "@/components/contact-form";
import StaticPageLayout from "@/components/static-page-layout";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "İletişim | Keşfet Muğla",
  description:
    "Keşfet Muğla editör ekibine içerik önerileri, düzeltme talepleri, iş birliği ve genel sorularınız için ulaşın.",
  path: "/iletisim",
});

export default function ContactPage() {
  return (
    <StaticPageLayout
      eyebrow="İletişim"
      title="İletişim"
      description="İçerik önerileri, düzeltme talepleri, iş birlikleri veya genel sorular için editör ekibine bu sayfa üzerinden ulaşabilirsiniz."
    >
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-6 rounded-[2rem] border border-slate-200 bg-slate-50 p-6">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-slate-950">
              İletişim bilgileri
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Editöryel notlar, içerik düzeltmeleri ve ticari talepler ayrı ayrı değerlendirilir.
              Mesajınızın daha hızlı yanıtlanması için konu seçimini mümkün olduğunca net yapın.
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-slate-800">E-posta</p>
            <p className="mt-1 text-sm text-slate-600">iletisim@kesfetmugla.com</p>
          </div>
          <div>
            <p className="text-sm font-medium text-slate-800">Yanıt süresi</p>
            <p className="mt-1 text-sm text-slate-600">Genellikle 2 iş günü içinde dönüş yapılır.</p>
          </div>
          <div>
            <p className="text-sm font-medium text-slate-800">Açıklama</p>
            <p className="mt-1 text-sm leading-7 text-slate-600">
              Turistik işletmeler, resmi kurumlar veya fiyat politikalarıyla ilgili tüm bilgiler
              editöryel amaçlı değerlendirilir; kesin rezervasyon bilgisi yerine rehber niteliğinde sunulur.
            </p>
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 md:p-8">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
            Mesaj gönderin
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Eksik veya hatalı gördüğünüz bilgileri belirtirseniz, ilgili içeriğin güncelleme sürecine
            hızla dahil edebiliriz.
          </p>
          <div className="mt-6">
            <ContactForm />
          </div>
        </div>
      </div>
    </StaticPageLayout>
  );
}
