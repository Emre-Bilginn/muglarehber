export type Destination = {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  heroImage: string;
  latitude: number;
  longitude: number;
  seoTitle: string;
  seoDescription: string;
  isPublished: boolean;
};

export const destinations: Destination[] = [
  {
    id: "fethiye",
    slug: "fethiye",
    name: "Fethiye",
    shortDescription: "Kıyı, tarih ve açık hava rotalarını bir araya getiren güçlü bir Muğla merkezi.",
    description: "Fethiye; Ölüdeniz, Kayaköy, Saklıkent ve çevre rotalarıyla farklı gezi tempolarını aynı plan içinde birleştirebilen bir destinasyondur.",
    heroImage: "/images/articles/fethiyede-mutlaka-gorulmesi-gereken-yerler.jpg",
    latitude: 36.621,
    longitude: 29.116,
    seoTitle: "Fethiye Gezi Rehberi | Rotalar, Plajlar ve Görülecek Yerler",
    seoDescription: "Fethiye gezi rehberi: Ölüdeniz, Saklıkent, sahil, tarih ve günlük rota planı için içerikler.",
    isPublished: true,
  },
  {
    id: "bodrum",
    slug: "bodrum",
    name: "Bodrum",
    shortDescription: "Sahil karakterleri, koyları ve farklı tatil tempolarıyla çok katmanlı bir yarımada.",
    description: "Bodrum'u yalnızca kalabalık merkezden ibaret görmeden; sakin plajları, koyları ve gün içi plan seçenekleriyle keşfedin.",
    heroImage: "/images/articles/bodrumda-sakin-plaj-onerileri.jpg",
    latitude: 37.034,
    longitude: 27.431,
    seoTitle: "Bodrum Gezi Rehberi | Sakin Plajlar, Koylar ve Rotalar",
    seoDescription: "Bodrum gezi rehberi: sakin plajlar, koylar, sahil rotaları ve tatil planlama içerikleri.",
    isPublished: true,
  },
  {
    id: "marmaris",
    slug: "marmaris",
    name: "Marmaris",
    shortDescription: "Tekne rotaları, koylar ve deniz odaklı gün planları için sahil merkezi.",
    description: "Marmaris'te deniz günü, tekne turu ve çevre koyları arasında beklentiye uygun bir gezi akışı kurun.",
    heroImage: "/images/articles/marmaris-tekne-turu-onerileri.jpg",
    latitude: 36.855,
    longitude: 28.274,
    seoTitle: "Marmaris Gezi Rehberi | Tekne Turları, Koylar ve Rotalar",
    seoDescription: "Marmaris gezi rehberi: tekne turları, koylar ve deniz odaklı rota önerileri.",
    isPublished: true,
  },
  {
    id: "datca",
    slug: "datca",
    name: "Datça",
    shortDescription: "Koy seçimi, yavaş tempo ve yarımada rotalarıyla öne çıkan sahil destinasyonu.",
    description: "Datça'nın koylarını, ulaşım kararlarını ve sakin bir sahil gününü doğru planlamak için bölgesel rehberleri keşfedin.",
    heroImage: "/images/articles/datca-koylari-rehberi.jpg",
    latitude: 36.728,
    longitude: 27.688,
    seoTitle: "Datça Gezi Rehberi | Koylar, Plajlar ve Yarımada Rotaları",
    seoDescription: "Datça gezi rehberi: koylar, plajlar, deniz planı ve yarımada rota içerikleri.",
    isPublished: true,
  },
  {
    id: "akyaka",
    slug: "akyaka",
    name: "Akyaka",
    shortDescription: "Azmak, Gökova ve sakin sahil temposunu birleştiren destinasyon hub'ı.",
    description: "Akyaka; nehir, sahil, kısa açık hava rotaları ve çevre duraklarıyla dengeli bir Muğla kaçamağı sunar.",
    heroImage: "/images/articles/akyaka-gezi-rehberi.jpg",
    latitude: 37.052,
    longitude: 28.327,
    seoTitle: "Akyaka Gezi Rehberi | Azmak, Gökova ve Sahil Rotaları",
    seoDescription: "Akyaka gezi rehberi: Azmak Nehri, Gökova, sahil ve günübirlik rota önerileri.",
    isPublished: true,
  },
  {
    id: "koycegiz",
    slug: "koycegiz",
    name: "Köyceğiz",
    shortDescription: "Göl, doğa ve sakin rota planları için iç kesim merkezi.",
    description: "Köyceğiz çevresindeki göl, doğa ve sakin tempo odaklı içerikler bu hub altında toplanacaktır.",
    heroImage: "/images/fallback-nature.jpg",
    latitude: 36.965,
    longitude: 28.686,
    seoTitle: "Köyceğiz Gezi Rehberi | Göl, Doğa ve Rota Önerileri",
    seoDescription: "Köyceğiz gezi rehberi: göl çevresi, doğa ve sakin rota içerikleri.",
    isPublished: true,
  },
  {
    id: "ortaca",
    slug: "ortaca",
    name: "Ortaca",
    shortDescription: "Dalyan ve Sarıgerme çevresine açılan bölgesel keşif noktası.",
    description: "Ortaca çevresinde sahil, doğa ve Dalyan bağlantılı gezi planları için içerikler hazırlanacaktır.",
    heroImage: "/images/fallback-mugla.jpg",
    latitude: 36.839,
    longitude: 28.765,
    seoTitle: "Ortaca Gezi Rehberi | Sahil, Doğa ve Bölge Rotaları",
    seoDescription: "Ortaca gezi rehberi: Dalyan, Sarıgerme ve çevre rota içerikleri.",
    isPublished: true,
  },
  {
    id: "dalyan",
    slug: "dalyan",
    name: "Dalyan",
    shortDescription: "Nehir, kıyı ve tarih ekseninde kullanıcı odaklı destinasyon hub'ı.",
    description: "Dalyan; nehir hattı, kıyı deneyimi ve tarih duraklarını aynı gün planlamak isteyen ziyaretçiler için ayrı bir keşif merkezidir.",
    heroImage: "/images/fallback-nature.jpg",
    latitude: 36.836,
    longitude: 28.644,
    seoTitle: "Dalyan Gezi Rehberi | Nehir, Sahil ve Tarih Rotaları",
    seoDescription: "Dalyan gezi rehberi: nehir, sahil, tarih ve çevre rota içerikleri.",
    isPublished: true,
  },
  {
    id: "milas",
    slug: "milas",
    name: "Milas",
    shortDescription: "Tarih, kırsal doku ve kıyı bağlantılarıyla geniş bir keşif alanı.",
    description: "Milas'ın tarih, köy ve kıyı bağlantılı içerikleri bu destinasyon hub'ında toplanacaktır.",
    heroImage: "/images/fallback-history.jpg",
    latitude: 37.316,
    longitude: 27.784,
    seoTitle: "Milas Gezi Rehberi | Tarih, Köyler ve Rotalar",
    seoDescription: "Milas gezi rehberi: tarih, kırsal doku ve çevre rota içerikleri.",
    isPublished: true,
  },
  {
    id: "ula",
    slug: "ula",
    name: "Ula",
    shortDescription: "Akyaka ve Gökova çevresini tamamlayan sakin iç bölge merkezi.",
    description: "Ula çevresinde Akyaka ve Gökova bağlantılı doğa, sahil ve yerel rota içerikleri hazırlanacaktır.",
    heroImage: "/images/fallback-mugla.jpg",
    latitude: 37.105,
    longitude: 28.417,
    seoTitle: "Ula Gezi Rehberi | Akyaka, Gökova ve Doğa Rotaları",
    seoDescription: "Ula gezi rehberi: Akyaka, Gökova ve doğa rota içerikleri.",
    isPublished: true,
  },
  {
    id: "mentese",
    slug: "mentese",
    name: "Menteşe",
    shortDescription: "Muğla merkez kültürü, tarih ve yerel yaşam için başlangıç noktası.",
    description: "Menteşe'de merkez yaşamı, tarih ve çevre rotalarıyla ilgili içerikler bu hub altında yayınlanacaktır.",
    heroImage: "/images/fallback-history.jpg",
    latitude: 37.215,
    longitude: 28.363,
    seoTitle: "Menteşe Gezi Rehberi | Muğla Merkez, Tarih ve Yaşam",
    seoDescription: "Menteşe gezi rehberi: Muğla merkez, tarih ve yerel yaşam içerikleri.",
    isPublished: true,
  },
];

export function getPublishedDestinations() {
  return destinations.filter((destination) => destination.isPublished);
}

export function getDestinationBySlug(slug: string) {
  return getPublishedDestinations().find((destination) => destination.slug === slug) ?? null;
}
