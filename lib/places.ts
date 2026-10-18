import { getDestinationBySlug } from "@/lib/destinations";
import { calculateDistanceKm } from "@/lib/place-location";

export const placeTypeLabels = {
  BEACH: "Plaj",
  BAY: "Koy",
  NATURE: "Doğa Alanı",
  HISTORICAL: "Tarihi Yer",
  VIEWPOINT: "Manzara Noktası",
  TOWN: "Yerleşim",
  ACTIVITY: "Aktivite Alanı",
  OTHER: "Gezilecek Yer",
} as const;

export type PlaceType = keyof typeof placeTypeLabels;

export type Place = {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  heroImage: string | null;
  latitude: number | null;
  longitude: number | null;
  address: string | null;
  destinationSlug: string;
  placeType: PlaceType;
  visitDuration: string | null;
  bestVisitTime: string | null;
  parkingInfo: string | null;
  accessInfo: string | null;
  accessibilityInfo: string | null;
  googleMapsUrl: string | null;
  isFeatured: boolean;
  isPublished: boolean;
};

export const places: Place[] = [
  {
    id: "oludeniz",
    slug: "oludeniz",
    name: "Ölüdeniz",
    shortDescription: "Lagün, açık plaj ve çevre planını birlikte düşünmeyi gerektiren güçlü bir kıyı durağı.",
    description: "Ölüdeniz rehberi; kalabalık, giriş düzeni, su karakteri, çocuklu aile kullanımı ve çevreyle birlikte planlama başlıklarını ele alır.",
    heroImage: "/images/articles/oludeniz-hakkinda-detayli-bilgiler.jpg",
    latitude: 36.5497,
    longitude: 29.1153,
    address: "Ölüdeniz, Fethiye, Muğla",
    destinationSlug: "fethiye",
    placeType: "BEACH",
    visitDuration: "Yarım günlük ziyaret mümkün olsa da çevresiyle birlikte 1 tam gün ayırmak daha doğru olur.",
    bestVisitTime: "Haziran başı ve eylül ayı, Ölüdeniz'i daha dengeli yaşamak için en uygun dönemlerdir.",
    parkingInfo: "Öğle saatlerinde otopark ve sahil kalabalığı belirgin şekilde artar.",
    accessInfo: "Fethiye merkezden araç, dolmuş veya transferle ulaşılabilir; erken çıkış büyük avantaj sağlar.",
    accessibilityInfo: null,
    googleMapsUrl: null,
    isFeatured: true,
    isPublished: true,
  },
  {
    id: "saklikent-kanyonu",
    slug: "saklikent-kanyonu",
    name: "Saklıkent Kanyonu",
    shortDescription: "Ekipman, zemin ve ziyaret saatinin deneyimi doğrudan değiştirdiği bir doğa rotası.",
    description: "Saklıkent rehberi; zemin, su seviyesi, ekipman, aile kullanımı ve gün planı için mevcut editoryal notları bir araya getirir.",
    heroImage: "/images/articles/saklikent-kanyonu-gezi-rehberi.jpg",
    latitude: 36.4735,
    longitude: 29.4041,
    address: "Saklıkent Milli Parkı tesisleri, Seydikemer, Muğla",
    destinationSlug: "fethiye",
    placeType: "NATURE",
    visitDuration: "Yarım gün kısa ziyaret mümkün olsa da çevresiyle birlikte 1 tam gün ayırmak daha rahattır.",
    bestVisitTime: "Mayıs sonu-Eylül sonu arası, su seviyesi ve erişim açısından en pratik dönemdir.",
    parkingInfo: null,
    accessInfo: "Araçla ulaşım en rahat yöntemdir; yaz aylarında erken saat avantaj sağlar.",
    accessibilityInfo: "Zemin kaygan olabilir; uygun ayakkabı ve hazırlık önemlidir.",
    googleMapsUrl: null,
    isFeatured: true,
    isPublished: true,
  },
  {
    id: "akyaka",
    slug: "akyaka",
    name: "Akyaka",
    shortDescription: "Azmak, merkez sahil ve Gökova çevresini birleştiren sakin sahil yerleşimi.",
    description: "Akyaka rehberi; serin nehir, sahil, manzara ve çevre rotalarıyla bölgeyi kısa bir mola yerine tam bir gezi deneyimi olarak ele alır.",
    heroImage: "/images/articles/akyaka-gezi-rehberi.jpg",
    latitude: 37.0557,
    longitude: 28.3242,
    address: "Akyaka Mahallesi, Ula, Muğla",
    destinationSlug: "akyaka",
    placeType: "TOWN",
    visitDuration: "Merkez ve yakın çevre için 2 gün; doğa ve kıyı planlarıyla birlikte 3 gün idealdir.",
    bestVisitTime: "Nisan sonu-Haziran ve Eylül başı-Ekim ortası arası en rahat dönemdir.",
    parkingInfo: "Hafta sonu ve yaz akşamlarında merkez park alanı hızlı dolabilir.",
    accessInfo: "Merkez yürünebilir; çevredeki koylar ve Akçapınar hattı için araç ya da kısa taksi transferi faydalıdır.",
    accessibilityInfo: null,
    googleMapsUrl: null,
    isFeatured: true,
    isPublished: true,
  },
  {
    id: "azmak-nehri",
    slug: "azmak-nehri",
    name: "Azmak Nehri",
    shortDescription: "Akyaka deneyiminin serin nehir ve merkez ritmini oluşturan temel durak.",
    description: "Azmak Nehri, mevcut Akyaka rehberinde merkez sahil ve çevre rotalarıyla birlikte günü dengeleyen ana duraklardan biri olarak ele alınır.",
    heroImage: "/images/articles/akyaka-gezi-rehberi.jpg",
    latitude: 37.0531,
    longitude: 28.33,
    address: "Kadın Azmağı, Akyaka Mahallesi, Ula, Muğla",
    destinationSlug: "akyaka",
    placeType: "NATURE",
    visitDuration: null,
    bestVisitTime: null,
    parkingInfo: null,
    accessInfo: "Akyaka merkezindeki gezi akışı içinde değerlendirilebilir.",
    accessibilityInfo: null,
    googleMapsUrl: null,
    isFeatured: true,
    isPublished: true,
  },
  {
    id: "kayakoy-orenyeri",
    slug: "kayakoy-orenyeri",
    name: "Kayaköy Örenyeri",
    shortDescription: "Fethiye yakınındaki taş yapı dokusuyla öne çıkan tarihî ören yeri.",
    description: "Kayaköy Örenyeri, Fethiye merkezinin güneyindeki tarihî yerleşim alanıdır. Ziyaret planı için ayrı zaman ayırmak daha uygundur.",
    heroImage: null,
    latitude: null,
    longitude: null,
    address: "Kayaköy, Fethiye, Muğla",
    destinationSlug: "fethiye",
    placeType: "HISTORICAL",
    visitDuration: null,
    bestVisitTime: null,
    parkingInfo: null,
    accessInfo: "Fethiye merkezden özel araçla ulaşılabilir.",
    accessibilityInfo: null,
    googleMapsUrl: null,
    isFeatured: false,
    isPublished: true,
  },
  {
    id: "amintas-kaya-mezari",
    slug: "amintas-kaya-mezari",
    name: "Amintas Kaya Mezarı",
    shortDescription: "Fethiye merkezindeki Likya kaya mezarı ve kısa tarih durağı.",
    description: "Amintas Kaya Mezarı, Fethiye merkezinde kayalık yamaçta yer alan Likya dönemine ait anıt mezardır.",
    heroImage: null,
    latitude: 36.6187,
    longitude: 29.1179,
    address: "Kesikkapı Mahallesi, 122. Sokak, Fethiye, Muğla",
    destinationSlug: "fethiye",
    placeType: "HISTORICAL",
    visitDuration: null,
    bestVisitTime: null,
    parkingInfo: null,
    accessInfo: "Fethiye merkezinden basamaklı bir erişimle ulaşılır.",
    accessibilityInfo: "Erişim basamaklıdır; hareket kısıtlılığı olan ziyaretçiler için zorlayıcı olabilir.",
    googleMapsUrl: null,
    isFeatured: false,
    isPublished: true,
  },
  {
    id: "akyaka-orman-kampi",
    slug: "akyaka-orman-kampi",
    name: "Akyaka Orman Kampı",
    shortDescription: "Akyaka ve Gökova çevresindeki kamp planlarının merkezle bağ kuran durağı.",
    description: "Akyaka Orman Kampı, Akyaka ve Gökova çevresini kamp odağında planlayan mevcut rehber içeriğiyle ilişkilendirilen bir doğa durağıdır.",
    heroImage: null,
    latitude: null,
    longitude: null,
    address: null,
    destinationSlug: "akyaka",
    placeType: "NATURE",
    visitDuration: null,
    bestVisitTime: null,
    parkingInfo: null,
    accessInfo: null,
    accessibilityInfo: null,
    googleMapsUrl: null,
    isFeatured: false,
    isPublished: true,
  },
  {
    id: "kelebekler-vadisi",
    slug: "kelebekler-vadisi",
    name: "Kelebekler Vadisi",
    shortDescription: "Fethiye kıyısında, deniz ve dik kayalıklarla çevrili korunan vadi.",
    description: "Kelebekler Vadisi, GoTürkiye tarafından Fethiye'nin öne çıkan doğal alanlarından biri olarak tanımlanan; deniz ve dik kayalıklarla çevrili bir vadidir.",
    heroImage: null,
    latitude: 36.4954,
    longitude: 29.1244,
    address: "Faralya Mahallesi, Fethiye, Muğla",
    destinationSlug: "fethiye",
    placeType: "NATURE",
    visitDuration: null,
    bestVisitTime: null,
    parkingInfo: null,
    accessInfo: null,
    accessibilityInfo: null,
    googleMapsUrl: null,
    isFeatured: true,
    isPublished: true,
  },
  {
    id: "babadag",
    slug: "babadag",
    name: "Babadağ",
    shortDescription: "Ölüdeniz yakınında, manzara ve açık hava etkinlikleriyle öne çıkan dağ.",
    description: "Babadağ, GoTürkiye'nin Fethiye destinasyonları arasında yer alan ve Ölüdeniz yakınındaki konumuyla tanıtılan yüksek dağ alanıdır.",
    heroImage: null,
    latitude: 36.5372,
    longitude: 29.1796,
    address: "Ölüdeniz Mahallesi, Fethiye, Muğla",
    destinationSlug: "fethiye",
    placeType: "VIEWPOINT",
    visitDuration: null,
    bestVisitTime: null,
    parkingInfo: null,
    accessInfo: null,
    accessibilityInfo: null,
    googleMapsUrl: null,
    isFeatured: false,
    isPublished: true,
  },
  {
    id: "akyaka-plaji",
    slug: "akyaka-plaji",
    name: "Akyaka Plajı",
    shortDescription: "Gökova Körfezi kıyısında, Akyaka merkezine yakın sığ sahil alanı.",
    description: "Muğla İl Kültür ve Turizm Müdürlüğü, Akyaka kıyısında denizin sığ ve dalgalı karakterde olduğunu belirtir.",
    heroImage: null,
    latitude: 37.0519,
    longitude: 28.3226,
    address: "Akyaka Mahallesi, Ula, Muğla",
    destinationSlug: "akyaka",
    placeType: "BEACH",
    visitDuration: null,
    bestVisitTime: null,
    parkingInfo: null,
    accessInfo: null,
    accessibilityInfo: null,
    googleMapsUrl: null,
    isFeatured: false,
    isPublished: true,
  },
  {
    id: "sakar-gecidi",
    slug: "sakar-gecidi",
    name: "Sakar Geçidi",
    shortDescription: "Gökova Körfezi ve ovasına bakan yol üstü manzara noktası.",
    description: "Muğla İl Kültür ve Turizm Müdürlüğü, Sakar Geçidi'nden Gökova Körfezi ve ovasının izlenebildiğini; yol kenarında park alanları bulunduğunu aktarır.",
    heroImage: null,
    latitude: 37.0794,
    longitude: 28.3591,
    address: "Sakar Geçidi, Ula, Muğla",
    destinationSlug: "akyaka",
    placeType: "VIEWPOINT",
    visitDuration: null,
    bestVisitTime: null,
    parkingInfo: null,
    accessInfo: null,
    accessibilityInfo: null,
    googleMapsUrl: null,
    isFeatured: false,
    isPublished: true,
  },
  {
    id: "bodrum-kalesi",
    slug: "bodrum-kalesi",
    name: "Bodrum Kalesi",
    shortDescription: "İki liman arasındaki yarımadada yer alan, Bodrum'un çok katmanlı tarihî simgesi.",
    description: "Bodrum Kalesi, Muğla İl Kültür ve Turizm Müdürlüğüne göre 1406-1522 arasında St. Jean Şövalyeleri tarafından inşa edildi; bugün Bodrum Sualtı Arkeoloji Müzesi'ne de ev sahipliği yapar.",
    heroImage: null,
    latitude: 37.0303,
    longitude: 27.4306,
    address: "Çarşı Mahallesi, Bodrum, Muğla",
    destinationSlug: "bodrum",
    placeType: "HISTORICAL",
    visitDuration: null,
    bestVisitTime: null,
    parkingInfo: null,
    accessInfo: null,
    accessibilityInfo: null,
    googleMapsUrl: null,
    isFeatured: true,
    isPublished: true,
  },
  {
    id: "halikarnas-mozolesi",
    slug: "halikarnas-mozolesi",
    name: "Halikarnas Mozolesi",
    shortDescription: "Antik Halikarnassos'taki Mausolos anıt mezarının arkeolojik alanı.",
    description: "GoTürkiye, Halikarnas Mozolesi'ni Kral Mausolos için yaptırılan ve antik dünyanın yedi harikasından biri olarak anılan anıtın kalıntıları olarak tanıtır.",
    heroImage: null,
    latitude: 37.0379,
    longitude: 27.4241,
    address: "Tepecik Mahallesi, Bodrum, Muğla",
    destinationSlug: "bodrum",
    placeType: "HISTORICAL",
    visitDuration: null,
    bestVisitTime: null,
    parkingInfo: null,
    accessInfo: null,
    accessibilityInfo: null,
    googleMapsUrl: null,
    isFeatured: true,
    isPublished: true,
  },
  {
    id: "bodrum-antik-tiyatrosu",
    slug: "bodrum-antik-tiyatrosu",
    name: "Bodrum Antik Tiyatrosu",
    shortDescription: "Göktepe'nin güney yamacındaki, antik Halikarnassos'tan kalan tiyatro.",
    description: "Kültür ve Turizm Bakanlığı, Bodrum Antik Tiyatrosu'nu MÖ 4. yüzyıla tarihlenen; kent ve deniz manzarasına hakim bir yapı olarak tanımlar.",
    heroImage: null,
    latitude: 37.0471,
    longitude: 27.4195,
    address: "Yeniköy Mahallesi, Çevre Yolu Kıbrıs Şehitleri Caddesi, Bodrum, Muğla",
    destinationSlug: "bodrum",
    placeType: "HISTORICAL",
    visitDuration: null,
    bestVisitTime: null,
    parkingInfo: null,
    accessInfo: null,
    accessibilityInfo: null,
    googleMapsUrl: null,
    isFeatured: true,
    isPublished: true,
  },
  {
    id: "myndos-kapisi",
    slug: "myndos-kapisi",
    name: "Myndos Kapısı",
    shortDescription: "Antik Halikarnassos'un kent surlarından günümüze ulaşan kapı kalıntısı.",
    description: "Myndos Kapısı, Bodrum'daki antik Halikarnassos kent dokusunun görülebilen tarihî kalıntılarından biridir.",
    heroImage: null,
    latitude: 37.034,
    longitude: 27.405,
    address: "Bodrum, Muğla",
    destinationSlug: "bodrum",
    placeType: "HISTORICAL",
    visitDuration: null,
    bestVisitTime: null,
    parkingInfo: null,
    accessInfo: null,
    accessibilityInfo: null,
    googleMapsUrl: null,
    isFeatured: false,
    isPublished: true,
  },
  {
    id: "gumusluk",
    slug: "gumusluk",
    name: "Gümüşlük",
    shortDescription: "Antik Myndos ile ilişkilendirilen, Bodrum yarımadasının kıyı yerleşimi.",
    description: "GoTürkiye, günümüz Gümüşlük yerleşimini antik Myndos ile ilişkilendirir ve bölgenin mandalina bahçeleriyle bilindiğini aktarır.",
    heroImage: null,
    latitude: 37.0572,
    longitude: 27.2317,
    address: "Gümüşlük Mahallesi, Bodrum, Muğla",
    destinationSlug: "bodrum",
    placeType: "TOWN",
    visitDuration: null,
    bestVisitTime: null,
    parkingInfo: null,
    accessInfo: null,
    accessibilityInfo: null,
    googleMapsUrl: null,
    isFeatured: false,
    isPublished: true,
  },
  {
    id: "bitez-plaji",
    slug: "bitez-plaji",
    name: "Bitez Plajı",
    shortDescription: "Bodrum yarımadasındaki Bitez kıyısında yer alan plaj alanı.",
    description: "Bitez, Muğla İl Kültür ve Turizm Müdürlüğünün Bodrum kıyı yerleşimleri listesinde yer alır.",
    heroImage: null,
    latitude: 37.0234,
    longitude: 27.3762,
    address: "Bitez Mahallesi, Bodrum, Muğla",
    destinationSlug: "bodrum",
    placeType: "BEACH",
    visitDuration: null,
    bestVisitTime: null,
    parkingInfo: null,
    accessInfo: null,
    accessibilityInfo: null,
    googleMapsUrl: null,
    isFeatured: false,
    isPublished: true,
  },
  {
    id: "marmaris-kalesi-ve-muzesi",
    slug: "marmaris-kalesi-ve-muzesi",
    name: "Marmaris Kalesi ve Müzesi",
    shortDescription: "Marmaris eski kent dokusu içinde yer alan kale ve arkeoloji müzesi.",
    description: "Kültür ve Turizm Bakanlığının Marmaris Müzesi sayfası, koleksiyonların tarihî kale içinde sergilendiğini belirtir.",
    heroImage: null,
    latitude: 36.8539,
    longitude: 28.2736,
    address: "Tepe Mahallesi, Marmaris, Muğla",
    destinationSlug: "marmaris",
    placeType: "HISTORICAL",
    visitDuration: null,
    bestVisitTime: null,
    parkingInfo: null,
    accessInfo: null,
    accessibilityInfo: null,
    googleMapsUrl: null,
    isFeatured: true,
    isPublished: true,
  },
  {
    id: "marmaris-milli-parki",
    slug: "marmaris-milli-parki",
    name: "Marmaris Milli Parkı",
    shortDescription: "Marmaris ilçe sınırlarındaki korunan doğal alan ve açık hava rotaları bütünü.",
    description: "Tarım ve Orman Bakanlığı, Marmaris Milli Parkı'nın Marmaris ilçe sınırlarında yer aldığını; park içinde yürüyüş rotaları ve seyir noktaları bulunduğunu belirtir.",
    heroImage: null,
    latitude: null,
    longitude: null,
    address: "Marmaris, Muğla",
    destinationSlug: "marmaris",
    placeType: "NATURE",
    visitDuration: null,
    bestVisitTime: null,
    parkingInfo: null,
    accessInfo: null,
    accessibilityInfo: null,
    googleMapsUrl: null,
    isFeatured: true,
    isPublished: true,
  },
  {
    id: "amos-antik-kenti",
    slug: "amos-antik-kenti",
    name: "Amos Antik Kenti",
    shortDescription: "Turunç ve Kumlubük arasındaki Amos Koyu yakınında bulunan antik kent kalıntıları.",
    description: "GoTürkiye, Amos Koyu'nda Amos Antik Kenti kalıntılarının görülebildiğini belirtir.",
    heroImage: null,
    latitude: 36.7689,
    longitude: 28.2404,
    address: "Turunç Mahallesi, Marmaris, Muğla",
    destinationSlug: "marmaris",
    placeType: "HISTORICAL",
    visitDuration: null,
    bestVisitTime: null,
    parkingInfo: null,
    accessInfo: null,
    accessibilityInfo: null,
    googleMapsUrl: null,
    isFeatured: true,
    isPublished: true,
  },
  {
    id: "icmeler-plaji",
    slug: "icmeler-plaji",
    name: "İçmeler Plajı",
    shortDescription: "Marmaris'in İçmeler kıyısındaki plaj alanı.",
    description: "İçmeler, Muğla İl Kültür ve Turizm Müdürlüğünün Marmaris kıyı yerleşimleri arasında yer alır.",
    heroImage: null,
    latitude: 36.8007,
    longitude: 28.2312,
    address: "İçmeler Mahallesi, Marmaris, Muğla",
    destinationSlug: "marmaris",
    placeType: "BEACH",
    visitDuration: null,
    bestVisitTime: null,
    parkingInfo: null,
    accessInfo: null,
    accessibilityInfo: null,
    googleMapsUrl: null,
    isFeatured: false,
    isPublished: true,
  },
  {
    id: "turunc-koyu",
    slug: "turunc-koyu",
    name: "Turunç Koyu",
    shortDescription: "Marmaris kıyısında, Turunç yerleşimi önündeki koy ve plaj alanı.",
    description: "GoTürkiye, Turunç'u Marmaris çevresindeki Amos Koyu ile bağlantılı kıyı yerleşimlerinden biri olarak tanıtır.",
    heroImage: null,
    latitude: 36.7604,
    longitude: 28.2393,
    address: "Turunç Mahallesi, Marmaris, Muğla",
    destinationSlug: "marmaris",
    placeType: "BAY",
    visitDuration: null,
    bestVisitTime: null,
    parkingInfo: null,
    accessInfo: null,
    accessibilityInfo: null,
    googleMapsUrl: null,
    isFeatured: false,
    isPublished: true,
  },
  {
    id: "kizkumu",
    slug: "kizkumu",
    name: "Kızkumu",
    shortDescription: "Orhaniye'de, Hisarönü Körfezi kıyısında yer alan sahil alanı.",
    description: "GoTürkiye, Kızkumu'nun Marmaris'in Orhaniye köyünde yer aldığını belirtir.",
    heroImage: null,
    latitude: 36.7488,
    longitude: 28.1267,
    address: "Orhaniye Mahallesi, Marmaris, Muğla",
    destinationSlug: "marmaris",
    placeType: "BEACH",
    visitDuration: null,
    bestVisitTime: null,
    parkingInfo: null,
    accessInfo: null,
    accessibilityInfo: null,
    googleMapsUrl: null,
    isFeatured: false,
    isPublished: true,
  },
  {
    id: "knidos-orenyeri",
    slug: "knidos-orenyeri",
    name: "Knidos Örenyeri",
    shortDescription: "Datça Yarımadası'nın ucunda, iki limanlı antik kent alanı.",
    description: "Kültür ve Turizm Bakanlığı, Knidos'un Datça'da Tekir Burnu üzerinde; anakara ve Kap Krio bölümlerinden oluşan önemli bir antik kıyı kenti olduğunu belirtir.",
    heroImage: null,
    latitude: 36.6856,
    longitude: 27.3779,
    address: "Yazı Mahallesi, Tekirburun Mevkii, Datça, Muğla",
    destinationSlug: "datca",
    placeType: "HISTORICAL",
    visitDuration: null,
    bestVisitTime: null,
    parkingInfo: null,
    accessInfo: null,
    accessibilityInfo: null,
    googleMapsUrl: null,
    isFeatured: true,
    isPublished: true,
  },
  {
    id: "eski-datca",
    slug: "eski-datca",
    name: "Eski Datça",
    shortDescription: "Taş evleriyle tanınan, Datça merkezine yakın tarihî yerleşim dokusu.",
    description: "GoTürkiye, Eski Datça'yı taş evleriyle öne çıkan ziyaret noktalarından biri olarak önerir.",
    heroImage: null,
    latitude: 36.7288,
    longitude: 27.6757,
    address: "Datça, Muğla",
    destinationSlug: "datca",
    placeType: "TOWN",
    visitDuration: null,
    bestVisitTime: null,
    parkingInfo: null,
    accessInfo: null,
    accessibilityInfo: null,
    googleMapsUrl: null,
    isFeatured: true,
    isPublished: true,
  },
  {
    id: "palamutbuku",
    slug: "palamutbuku",
    name: "Palamutbükü",
    shortDescription: "Datça Yarımadası'nın güney kıyısındaki koy ve plaj alanı.",
    description: "GoTürkiye ve Muğla İl Kültür ve Turizm Müdürlüğü, Palamutbükü'nü Datça'nın kıyı durakları arasında sayar.",
    heroImage: null,
    latitude: 36.7073,
    longitude: 27.5739,
    address: "Yaka Mahallesi, Datça, Muğla",
    destinationSlug: "datca",
    placeType: "BAY",
    visitDuration: null,
    bestVisitTime: null,
    parkingInfo: null,
    accessInfo: null,
    accessibilityInfo: null,
    googleMapsUrl: null,
    isFeatured: true,
    isPublished: true,
  },
  {
    id: "ovabuku",
    slug: "ovabuku",
    name: "Ovabükü",
    shortDescription: "Mesudiye kıyısındaki Datça koy ve plaj durağı.",
    description: "GoTürkiye rotalarında yer alan Ovabükü, Muğla İl Kültür ve Turizm Müdürlüğüne göre Mesudiye Mahallesi'nin koylarındandır.",
    heroImage: null,
    latitude: 36.7025,
    longitude: 27.6923,
    address: "Mesudiye Mahallesi, Datça, Muğla",
    destinationSlug: "datca",
    placeType: "BAY",
    visitDuration: null,
    bestVisitTime: null,
    parkingInfo: null,
    accessInfo: null,
    accessibilityInfo: null,
    googleMapsUrl: null,
    isFeatured: false,
    isPublished: true,
  },
  {
    id: "hayitbuku",
    slug: "hayitbuku",
    name: "Hayıtbükü",
    shortDescription: "Mesudiye kıyısındaki Datça koy ve plaj durağı.",
    description: "GoTürkiye rotalarında yer alan Hayıtbükü, Muğla İl Kültür ve Turizm Müdürlüğüne göre Mesudiye Mahallesi'nin koylarındandır.",
    heroImage: null,
    latitude: 36.7044,
    longitude: 27.7075,
    address: "Mesudiye Mahallesi, Datça, Muğla",
    destinationSlug: "datca",
    placeType: "BAY",
    visitDuration: null,
    bestVisitTime: null,
    parkingInfo: null,
    accessInfo: null,
    accessibilityInfo: null,
    googleMapsUrl: null,
    isFeatured: false,
    isPublished: true,
  },
  {
    id: "kovanlik-tabiat-parki",
    slug: "kovanlik-tabiat-parki",
    name: "Kovanlık Tabiat Parkı",
    shortDescription: "Datça'da GoTürkiye rotalarında yer alan korunan doğa alanı.",
    description: "Kovanlık Tabiat Parkı, GoTürkiye'nin Datça rotaları içinde listelenen doğa durağıdır.",
    heroImage: null,
    latitude: null,
    longitude: null,
    address: "Datça, Muğla",
    destinationSlug: "datca",
    placeType: "NATURE",
    visitDuration: null,
    bestVisitTime: null,
    parkingInfo: null,
    accessInfo: null,
    accessibilityInfo: null,
    googleMapsUrl: null,
    isFeatured: false,
    isPublished: true,
  },
];

export type NearbyPlace = {
  place: Place;
  distanceKm: number | null;
};

export type PlaceFilters = {
  destinationSlug?: string;
  placeType?: PlaceType;
  query?: string;
  includeDescription?: boolean;
};

export function getPublishedPlaces() {
  return places.filter((place) => place.isPublished);
}

export function getPlaceBySlug(slug: string) {
  return getPublishedPlaces().find((place) => place.slug === slug) ?? null;
}

export function getPlacesByDestination(slug: string) {
  return getPublishedPlaces().filter((place) => place.destinationSlug === slug);
}

export function getFilteredPlaces({ destinationSlug, placeType, query = "", includeDescription = false }: PlaceFilters = {}) {
  const normalizedQuery = query.trim().toLocaleLowerCase("tr");

  return getPublishedPlaces()
    .filter((place) => {
      const destination = getDestinationBySlug(place.destinationSlug);
      const haystack = [place.name, place.shortDescription, ...(includeDescription ? [place.description] : []), destination?.name, placeTypeLabels[place.placeType]]
        .filter(Boolean)
        .join(" ")
        .toLocaleLowerCase("tr");

      return (
        (!destinationSlug || place.destinationSlug === destinationSlug) &&
        (!placeType || place.placeType === placeType) &&
        (!normalizedQuery || haystack.includes(normalizedQuery))
      );
    })
    .sort((left, right) => {
      if (left.isFeatured !== right.isFeatured) {
        return Number(right.isFeatured) - Number(left.isFeatured);
      }

      const leftDestination = getDestinationBySlug(left.destinationSlug)?.name ?? left.destinationSlug;
      const rightDestination = getDestinationBySlug(right.destinationSlug)?.name ?? right.destinationSlug;
      const destinationOrder = leftDestination.localeCompare(rightDestination, "tr");

      return destinationOrder || left.name.localeCompare(right.name, "tr");
    });
}

export function getNearbyPlaces(place: Place, limit = 3): NearbyPlace[] {
  const normalizedLimit = Math.max(0, Math.floor(limit));

  return getPlacesByDestination(place.destinationSlug)
    .filter((candidate) => candidate.slug !== place.slug)
    .map((candidate) => ({
      place: candidate,
      distanceKm: calculateDistanceKm(place, candidate),
    }))
    .sort((left, right) => {
      if (left.distanceKm != null && right.distanceKm != null) {
        return left.distanceKm - right.distanceKm;
      }

      if (left.distanceKm != null) return -1;
      if (right.distanceKm != null) return 1;
      return left.place.name.localeCompare(right.place.name, "tr");
    })
    .slice(0, normalizedLimit);
}

export function getPlacesBySlugs(slugs: string[]) {
  return slugs.map((slug) => getPlaceBySlug(slug)).filter((place): place is Place => Boolean(place));
}

export function searchPlaces(query: string) {
  if (query.trim().length < 2) {
    return [];
  }

  return getFilteredPlaces({ query, includeDescription: true });
}

export function getPlaceDirectionsUrl(place: Place) {
  if (place.googleMapsUrl) {
    return place.googleMapsUrl;
  }

  const destination = getDestinationBySlug(place.destinationSlug);
  const destinationValue = place.latitude != null && place.longitude != null
    ? `${place.latitude},${place.longitude}`
    : [place.name, destination?.name, "Muğla"].filter(Boolean).join(", ");

  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destinationValue)}`;
}
