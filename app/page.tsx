import Link from "next/link";
import { ArrowRight, Compass, FolderKanban, ShieldCheck, Sparkles } from "lucide-react";
import AdPlaceholder from "@/components/ad-placeholder";
import ArticleCard from "@/components/article-card";
import CategoryIcon from "@/components/category-icon";
import { getCategoriesWithCounts, getFeaturedArticles, getLatestArticles } from "@/lib/content";

export default function HomePage() {
  const featuredArticles = getFeaturedArticles(4);
  const latestArticles = getLatestArticles(6);
  const categories = getCategoriesWithCounts();
  const heroArticle = featuredArticles[0];
  const secondaryFeatured = featuredArticles.slice(1);

  return (
    <div className="bg-white">
      <section className="border-b border-slate-200 bg-[radial-gradient(circle_at_top_left,_rgba(14,165,233,0.16),_transparent_35%),radial-gradient(circle_at_top_right,_rgba(15,118,110,0.14),_transparent_30%),linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)]">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-700">
              Muğla için içerik odaklı yayın
            </p>
            <h1 className="mt-4 max-w-4xl font-display text-4xl font-semibold tracking-tight text-slate-950 md:text-6xl">
              Muğla'yı kısa tanıtımlarla değil, karar verdiren gerçek rehber içeriklerle keşfedin.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
              Keşfet Muğla; ilçe, plaj, kamp, doğa, tarih ve yerel mutfak başlıklarında
              rota kurmayı kolaylaştıran uzun form içerikler yayınlar. Amaç, ziyaretçiyi
              yalnızca bir yere göndermek değil; o yeri nasıl deneyimlemesi gerektiğini de anlatmaktır.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/kategori/gezilecek-yerler"
                className="inline-flex items-center rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white hover:bg-slate-800"
              >
                Rehberleri keşfet
              </Link>
              <Link
                href="/kategori/ilceler"
                className="inline-flex items-center rounded-full border border-slate-200 px-5 py-3 text-sm font-medium text-slate-700 hover:border-slate-300 hover:bg-slate-50"
              >
                İlçe içeriklerine git
              </Link>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-[1.5rem] border border-slate-200 bg-white px-5 py-4">
                <p className="text-2xl font-semibold text-slate-950">{categories.length}</p>
                <p className="mt-1 text-sm text-slate-500">Ana kategori</p>
              </div>
              <div className="rounded-[1.5rem] border border-slate-200 bg-white px-5 py-4">
                <p className="text-2xl font-semibold text-slate-950">{latestArticles.length}+</p>
                <p className="mt-1 text-sm text-slate-500">Yayında rehber</p>
              </div>
              <div className="rounded-[1.5rem] border border-slate-200 bg-white px-5 py-4">
                <p className="text-2xl font-semibold text-slate-950">1200+</p>
                <p className="mt-1 text-sm text-slate-500">Kelime hedefi / makale</p>
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
                Muğla hakkında kısa giriş
              </p>
              <p className="mt-4 text-base leading-8 text-slate-600">
                Muğla; tek bir tatil karakteri sunmaz. Fethiye daha görsel ve açık hava odaklı
                bir ritim verirken, Akyaka daha sakin ve dengeli ilerler. Datça yarımadası seçilmiş
                koylarla yavaşlamayı, Bodrum ise farklı sahil profilleri arasında bilinçli seçim yapmayı ister.
                Bu site, tam olarak bu farkları görünür kılmak için kurgulandı.
              </p>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-slate-950 p-6 text-white shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                Neden bu site?
              </p>
              <ul className="mt-4 space-y-4 text-sm leading-7 text-slate-300">
                <li className="flex gap-3">
                  <ShieldCheck className="mt-1 h-5 w-5 flex-none text-emerald-400" />
                  Kısa, tekrar eden tanıtım metinleri yerine plan yaptıran uzun rehberler.
                </li>
                <li className="flex gap-3">
                  <FolderKanban className="mt-1 h-5 w-5 flex-none text-sky-400" />
                  Kategori ve iç link yapısı sayesinde içerikler birbirini tamamlar.
                </li>
                <li className="flex gap-3">
                  <Sparkles className="mt-1 h-5 w-5 flex-none text-amber-300" />
                  Reklamdan önce içerik, hacimden önce kalite yaklaşımı.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-8">
        <AdPlaceholder
          size="banner"
          label="Ana sayfa üstü reklam yerleşimi için ayrılmış dengeli alan. İçerik akışını bölmeden ileride AdSense entegrasyonuna uygun şekilde kullanılabilir."
        />
      </div>

      <section className="mx-auto max-w-7xl px-4 py-8 md:py-10">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">Öne çıkan içerikler</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
              Rehber niteliği yüksek seçilmiş yayınlar
            </h2>
          </div>
          <Link href="/kategori/gezilecek-yerler" className="hidden text-sm font-medium text-slate-700 hover:text-sky-700 md:inline-flex md:items-center md:gap-2">
            Tüm içerikleri incele
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          {heroArticle ? <ArticleCard article={heroArticle} variant="hero" /> : null}
          <div className="grid gap-4">
            {secondaryFeatured.map((article) => (
              <ArticleCard key={article.slug} article={article} variant="compact" />
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-12 md:py-14">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">Popüler kategoriler</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
              İçerik keşfini kolaylaştıran net kategori yapısı
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-600">
              Kategoriler yalnızca etiket işlevi görmez; her biri kendi giriş metni, içerik mantığı ve
              rehber dili ile ayrı bir yayın alanı gibi çalışır.
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/kategori/${category.slug}`}
                className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-900">
                    <CategoryIcon icon={category.icon} className="h-5 w-5" />
                  </span>
                  <span className="text-sm font-medium text-slate-500">
                    {category.articleCount} içerik
                  </span>
                </div>
                <h3 className="mt-5 text-xl font-semibold tracking-tight text-slate-950">
                  {category.name}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {category.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-5 md:grid-cols-3">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6">
            <Compass className="h-6 w-6 text-sky-700" />
            <h3 className="mt-4 text-xl font-semibold tracking-tight text-slate-950">
              Kopya değil, rehber mantığı
            </h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              İçeriklerde yalnızca “güzel yer” demiyoruz; ulaşım, uygun ziyaretçi profili,
              yoğun saatler ve rota akışı gibi karar verdiren bilgileri öne çıkarıyoruz.
            </p>
          </div>
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6">
            <ShieldCheck className="h-6 w-6 text-sky-700" />
            <h3 className="mt-4 text-xl font-semibold tracking-tight text-slate-950">
              Güven sinyalleri güçlü
            </h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Kurumsal sayfalar, net navigasyon, arama altyapısı, teknik SEO düzeni ve anlamlı
              içerik hiyerarşisi siteyi gerçek yayın mantığına yaklaştırır.
            </p>
          </div>
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6">
            <FolderKanban className="h-6 w-6 text-sky-700" />
            <h3 className="mt-4 text-xl font-semibold tracking-tight text-slate-950">
              İçerikler birbirine bağlı
            </h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Benzer yazılar, kategori bağlantıları ve bütünsel rota önerileri sayesinde kullanıcı
              tek bir sayfada kalmaz; sitede doğal biçimde ilerler.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 pb-6">
        <AdPlaceholder
          size="inline"
          label="İçerik akışı içinde kullanılabilecek doğal reklam alanı. Yalnızca ileride ve içerik yoğunluğu korunarak değerlendirilmelidir."
        />
      </div>

      <section className="mx-auto max-w-7xl px-4 py-8 md:py-12">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">Son eklenen yazılar</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
              Güncel editöryel içerikler
            </h2>
          </div>
          <Link href="/kategori/ilceler" className="hidden text-sm font-medium text-slate-700 hover:text-sky-700 md:inline-flex md:items-center md:gap-2">
            İlçe rehberlerine git
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {latestArticles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 pb-12">
        <AdPlaceholder
          size="footer"
          label="Sayfa sonu reklam alanı için ayrılmış bölüm. İçerik özetini ve ilgili yazıları gölgelemeyecek biçimde tasarlanmıştır."
        />
      </div>
    </div>
  );
}
