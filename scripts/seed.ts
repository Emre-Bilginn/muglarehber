import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const categories = [
  { name: 'Gezilecek Yerler', slug: 'gezilecek-yerler', description: 'Muğla\'nın tarihi ve doğal güzellikleri', icon: 'Landmark', order: 1 },
  { name: 'Plajlar', slug: 'plajlar', description: 'Muğla\'nın en güzel plajları ve koyları', icon: 'Waves', order: 2 },
  { name: 'Restoranlar & Kafeler', slug: 'restoranlar-kafeler', description: 'Muğla\'da yeme-içme rehberi', icon: 'Utensils', order: 3 },
  { name: 'Oteller & Konaklama', slug: 'oteller-konaklama', description: 'Her bütçeye uygun konaklama seçenekleri', icon: 'Hotel', order: 4 },
  { name: 'Aktiviteler', slug: 'aktiviteler', description: 'Su sporları, doğa yürüyüşleri ve macera', icon: 'Mountain', order: 5 },
  { name: 'Gece Hayatı', slug: 'gece-hayati', description: 'Eğlence mekanları ve gece kulüpleri', icon: 'Music', order: 6 },
  { name: 'Ulaşım Rehberi', slug: 'ulasim-rehberi', description: 'Muğla\'ya nasıl gidilir?', icon: 'Plane', order: 7 },
];

const articles = [
  // Gezilecek Yerler
  {
    title: 'Bodrum Kalesi ve Sualtı Arkeoloji Müzesi',
    slug: 'bodrum-kalesi-sualti-arkeoloji-muzesi',
    summary: "Bodrum'un simgesi olan bu görkemli kaleyi ve dünyanın en önemli sualtı arkeoloji müzelerinden birini keşfedin.",
    content: `Bodrum'un kalbinde, iki limanı ayıran kayalık bir yarımada üzerinde tüm heybetiyle yükselen Bodrum Kalesi, sadece bir Orta Çağ yapısı değil, aynı zamanda Ege'nin zengin tarihini suyun altından gün yüzüne çıkaran eşsiz bir müzeye de ev sahipliği yapmaktadır. 1406-1523 yılları arasında St. Jean Şövalyeleri tarafından inşa edilen kale, yapımında dünyanın yedi harikasından biri olan Mausoleum'un taşlarının kullanılmasıyla da ayrı bir tarihi öneme sahiptir.\n\nKale, Fransız, İtalyan, Alman, İspanyol ve İngiliz kuleleri gibi farklı ulusların izlerini taşıyan bölümlerden oluşur. Surlarında yürürken, bir yanda Bodrum'un masmavi sularını ve hareketli marinalarını, diğer yanda ise tarihin fısıltılarını taşıyan avluları seyredebilirsiniz. Ancak kaleyi gerçekten özel kılan, içinde barındırdığı Bodrum Sualtı Arkeoloji Müzesi'dir.\n\n1964'te kurulan ve 1995'te Avrupa'da Yılın Müzesi yarışmasında 'Özel Övgü' alan bu müze, sizi Ege ve Akdeniz'in binlerce yıllık batık hikayelerine götürür. Müzenin en etkileyici bölümlerinden biri, M.Ö. 14. yüzyıla tarihlenen Uluburun Batığı'dır. Bu batıktan çıkarılan eserler arasında Mısır Kraliçesi Nefertiti'nin altın mührü, cam külçeler, fildişi eşyalar ve bakır levhalar gibi o dönemin uluslararası ticaretinin ne kadar gelişmiş olduğunu gösteren paha biçilmez hazineler bulunur.\n\nKaryalı Prenses Salonu'nda ise M.Ö. 4. yüzyılda yaşamış bir prensese ait iskelet ve paha biçilmez altın takılar sergilenir. Bu buluntu, antik çağlardaki defin gelenekleri ve soylu yaşamı hakkında büyüleyici ipuçları sunar. Kaleyi gezerken sadece batıkları değil, aynı zamanda şövalyelerin yaşam alanlarını, şapeli, hamamı ve zindanları da görebilir, kendinizi adeta bir zaman yolculuğunda hissedebilirsiniz.`,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Bodrum_Castle.JPG',
    gpsLat: 37.0325,
    gpsLng: 27.4292,
    highlights: ['St. Jean Şövalyeleri tarafından inşa edilmiştir', 'Dünyanın en önemli sualtı arkeoloji müzelerinden biridir', 'Uluburun Batığı ve Serçe Limanı Cam Batığı sergileri', 'Karyalı Prenses\'in hazineleri', 'UNESCO Dünya Mirası Geçici Listesi\'ndedir'],
    categorySlug: 'gezilecek-yerler',
    isFeatured: true,
  },
  {
    title: 'Fethiye Kayaköy: Taş Duvarların Ardındaki Hüzünlü Melodi',
    slug: 'fethiye-kayakoy-hayalet-koy',
    summary: "Bir zamanlar canlı bir Rum köyü olan, şimdiyse terk edilmiş taş evleriyle bir 'hayalet köy'.",
    content: `Fethiye'nin hareketli turistik atmosferinden sadece birkaç kilometre uzakta, bir tepenin yamacına yaslanmış Kayaköy, zamanın durduğu, taş duvarların binlerce hikaye anlattığı büyülü bir yerdir. Eski adıyla Levissi, 1923'teki nüfus mübadelesine kadar yaklaşık 25.000 Rum'un yaşadığı, kiliseleri, okulları, dükkanları ve evleriyle capcanlı bir kasabaydı.\n\nMübadele ile sakinlerinin Yunanistan'a göç etmesi ve yerine gelenlerin köyün coğrafi yapısına uyum sağlayamaması sonucu yavaş yavaş terk edilen bu yer, bugün bir 'hayalet köy' olarak anılmaktadır.\n\nKayaköy'ün dar ve taş döşeli sokaklarında yürürken, her biri diğerinin manzarasını kesmeyecek şekilde inşa edilmiş yüzlerce terk edilmiş taş ev ve şapel sizi karşılar. Çatısız duvarlar, boş pencere oyukları ve doğanın yavaş yavaş geri aldığı yapılar, insana hem hüzün hem de derin bir hayranlık hissi verir.\n\nKöyün en dikkat çekici yapılarından ikisi, tepenin yamacındaki Panagia Pirgiotissa (Aşağı Kilise) ve Taksiyarhis (Yukarı Kilise)'dir. Özellikle Aşağı Kilise, solmuş da olsa duvarlarındaki freskleri ve etkileyici mimarisiyle hala ayaktadır.\n\nKayaköy, sadece tarihi bir gezi alanı değil, aynı zamanda fotoğrafçılar için de eşsiz bir platodur. Işığın taş binalar üzerinde yarattığı gölge oyunları, özellikle gün batımında manzarayı adeta bir kartpostala çevirir. Louis de Bernières'in 'Kanatsız Kuşlar' romanına da ilham veren Kayaköy, taş duvarlarının ardında sakladığı hüzünlü melodiyle, ziyaretçilerine sadece bir gezi değil, aynı zamanda geçmişle yüzleşme ve empati kurma deneyimi sunar.`,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Fethiye_Kayak%C3%B6y_in_1995_4.jpg/1280px-Fethiye_Kayak%C3%B6y_in_1995_4.jpg',
    gpsLat: 36.5791,
    gpsLng: 29.0881,
    highlights: ['1923 Nüfus Mübadelesi ile terk edilmiş eski bir Rum köyü', 'Yüzlerce taş ev, şapel ve iki büyük kilise', 'Atmosferik ve hüzünlü bir Hayalet Köy', 'Fotoğrafçılık ve doğa yürüyüşleri için ideal', 'Kanatsız Kuşlar romanına ilham vermiştir'],
    categorySlug: 'gezilecek-yerler',
    isFeatured: true,
  },
  {
    title: 'Dalyan ve Kaunos Antik Kenti',
    slug: 'dalyan-kaunos-antik-kenti',
    summary: 'Sazlıklar arasında tekneyle süzülürken kayalara oyulmuş kral mezarlarını selamlayın ve antik liman kenti Kaunos\'u keşfedin.',
    content: `Muğla'nın cennet köşelerinden Dalyan, sadece doğal güzellikleriyle değil, aynı zamanda binlerce yıllık bir tarihi barındıran Kaunos Antik Kenti ile de ziyaretçilerini büyüler. Köyceğiz Gölü'nü Akdeniz'e bağlayan ve sazlık labirentleri arasından kıvrılarak akan Dalyan Nehri, bu eşsiz coğrafyanın can damarıdır.\n\nBu yolculuğun en unutulmaz anı, nehrin karşı kıyısındaki sarp kayalıklara oyulmuş görkemli Kaunos Kral Mezarları'nı gördüğünüz andır. M.Ö. 4. yüzyılda, Helenistik dönemde tapınak cephesi şeklinde oyulan bu anıt mezarlar, antik Kaunos kentinin soyluları için yapılmıştır.\n\nTekneyle nehrin karşısına geçip kısa bir yürüyüş yaptığınızda ise Kaunos Antik Kenti'nin kalıntılarına ulaşırsınız. Bir zamanların önemli bir liman kenti olan Kaunos, nehrin getirdiği alüvyonlar nedeniyle bugün denizden içeride kalmıştır. Kentin en iyi korunmuş yapılarından biri, 5000 kişilik tiyatrosudur.\n\nAntik kentte gezinirken agora (pazar yeri), Roma hamamı, tapınaklar ve stoa (sütunlu galeri) gibi yapıların kalıntılarını görebilirsiniz. Kentin akropolüne tırmanarak hem antik kentin genel planını daha iyi anlayabilir hem de çevrenin 360 derecelik panoramik manzarasının tadını çıkarabilirsiniz.`,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/cd/Lycian_rock-cut_tombs_in_Hellenistic_style_-_Dalyan%2C_Turkey.jpg',
    gpsLat: 36.8250,
    gpsLng: 28.6431,
    highlights: ['Dalyan Nehri üzerinde tekne turu', 'Kayalara oyulmuş görkemli Kral Mezarları', '5000 kişilik antik tiyatro', 'Antik bir liman kentinin kalıntıları', 'Dalyan Deltası\'nın panoramik manzaraları'],
    categorySlug: 'gezilecek-yerler',
    isFeatured: false,
  },
  // Plajlar
  {
    title: 'Ölüdeniz Mavi Lagün',
    slug: 'oludeniz-mavi-lagun',
    summary: "Türkiye'nin dünyaya armağanı, adeta bir kartpostal güzelliğindeki Ölüdeniz... Durgun, turkuaz suları ve bembeyaz kumsalıyla Mavi Lagün sizi çağırıyor.",
    content: `Fethiye'nin ve belki de tüm Türkiye'nin en çok fotoğraflanan, en ikonik doğal güzelliği olan Ölüdeniz, adını hak eden durgun ve berrak sularıyla yeryüzündeki bir cenneti andırır. Özellikle Kumburnu olarak bilinen ve denize doğru uzanan bembeyaz kumsalın oluşturduğu Mavi Lagün (Blue Lagoon), bu cennetin kalbidir.\n\nÖlüdeniz'in suyu, içindeki yoğun mineraller ve yosunlar sayesinde inanılmaz bir turkuaz renge sahiptir. Güneşin farklı açılarında bu renk, açık maviden zümrüt yeşiline kadar farklı tonlara bürünür. Bu renk cümbüşü, bembeyaz kumsal ve arkasındaki yemyeşil çam ormanlarıyla birleştiğinde, ortaya çıkan manzara kelimenin tam anlamıyla büyüleyicidir.\n\nLagünün sakin suları, yüzmenin yanı sıra kano ve deniz bisikleti gibi aktiviteler için de mükemmel bir ortam sunar. Suyun sığ ve sıcak olması, saatlerce keyifli vakit geçirmenize olanak tanır. Plaj, bir milli park statüsünde olduğu için korunmaktadır ve giriş ücretlidir.\n\nÖlüdeniz'i bu kadar özel kılan bir diğer unsur ise hemen arkasında yükselen Babadağ'dır. Dünyanın en iyi yamaç paraşütü merkezlerinden biri olan Babadağ'dan havalanan rengarenk paraşütler, gün boyunca gökyüzünü süsler.`,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Oludeniz.jpg/1280px-Oludeniz.jpg',
    gpsLat: 36.5513,
    gpsLng: 29.1201,
    highlights: ['Dünyaca ünlü, ikonik bir plaj ve doğal lagün', 'Durgun, sığ ve turkuaz rengi sular', 'Kumburnu adı verilen bembeyaz kumsal', 'Yamaç paraşütü için dünyanın en iyi noktalarından biri', 'Milli park statüsünde koruma altındadır'],
    categorySlug: 'plajlar',
    isFeatured: true,
  },
  {
    title: 'İztuzu Plajı: Caretta Caretta\'ların Kutsal Yuvası',
    slug: 'iztuzu-plaji-caretta-caretta',
    summary: 'Bir tarafı tatlı, bir tarafı tuzlu su olan, 4.5 km uzunluğundaki bu altın sarısı kumsalda, Caretta Caretta\'larla aynı sahili paylaşın.',
    content: `Dalyan deltasının Akdeniz'le buluştuğu noktada yer alan İztuzu Plajı, sadece güzelliğiyle değil, ekolojik önemiyle de Türkiye'nin en özel yerlerinden biridir. 4.5 kilometre boyunca uzanan bu altın sarısı kumsal, bir tarafında Akdeniz'in tuzlu sularını, diğer tarafında ise Dalyan deltasının tatlı suyunu barındırır.\n\nAncak İztuzu'nu gerçekten dünya çapında bir üne kavuşturan, nesli tükenme tehlikesi altında olan deniz kaplumbağaları Caretta Caretta'ların en önemli yumurtlama alanlarından biri olmasıdır. Her yıl mayıs ve eylül ayları arasında binlerce dişi kaplumbağa, geceleri bu kumsala çıkarak yumurtalarını bırakır.\n\nBu nedenle plaj, kaplumbağaların rahatsız olmaması için akşam 20:00 ile sabah 08:00 saatleri arasında insan ziyaretine kapatılır. Kumsalda şemsiye ve şezlongların bulunduğu alanlar, yumurtlama bölgelerini korumak amacıyla dikkatle belirlenmiştir.\n\nPlajda, yaralı kaplumbağaların tedavi edildiği ve koruma altına alındığı bir DEKAMER (Deniz Kaplumbağaları Araştırma, Kurtarma ve Rehabilitasyon Merkezi) de bulunmaktadır. Ziyaretçiler bu merkezi gezerek hem Caretta Caretta'lar hakkında bilgi alabilir hem de bu önemli koruma çabalarına tanıklık edebilirler.`,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Turkey%2C_Mugla_-_Iztuzu.jpg/1280px-Turkey%2C_Mugla_-_Iztuzu.jpg',
    gpsLat: 36.7901,
    gpsLng: 28.6232,
    highlights: ['Caretta Caretta deniz kaplumbağalarının önemli bir üreme alanı', 'Bir tarafı tatlı su, bir tarafı tuzlu su', '4.5 km uzunluğunda altın sarısı ince kumlu plaj', 'Doğa koruma bilincinin en güzel örneklerinden biri', 'DEKAMER Kaplumbağa Hastanesi ziyaret imkanı'],
    categorySlug: 'plajlar',
    isFeatured: true,
  },
  {
    title: 'Bodrum\'un En Güzel Plajları',
    slug: 'bodrum-en-guzel-plajlari',
    summary: 'Hareketli beach club\'lardan sakin ve bakir koylara... Bodrum yarımadasının her zevke uygun, en güzel plajlarını keşfedin.',
    content: `Bodrum denince akla sadece beyaz evler ve gece hayatı değil, aynı zamanda Ege'nin en güzel sularına ev sahipliği yapan birbirinden çeşitli plajlar gelir. Yarımadanın her köşesi, farklı bir karakterde, farklı bir güzellikte plaj ve koyla çevrilidir.\n\n**Yalıkavak ve Göltürkbükü:** Lüks ve popülerliğin adresleri olan bu bölgeler, ünlü beach club'lara ev sahipliği yapar. Gündüzleri şık şezlonglarda güneşlenip, ünlü DJ'lerin müzikleriyle eğlenmek isterseniz, bu bölgeler tam size göredir.\n\n**Gümüşlük:** Antik Myndos kentinin kalıntıları üzerinde yer alan Gümüşlük, bohem ve sakin atmosferiyle öne çıkar. Sahildeki balık restoranları ve Tavşan Adası'na denizin içinden yürüyerek geçilebilen 'Kral Yolu' ile ünlüdür.\n\n**Bitez ve Ortakent:** Rüzgar sörfü ve yelken gibi su sporları için en uygun plajlardan bazıları burada bulunur. Uzun kumsalları ve sahil boyunca sıralanan kafe ve restoranları ile özellikle aileler için popülerdir.\n\n**Cennet Koyu ve Akvaryum Koyu:** Adlarının hakkını veren bu koylar, tekne turlarının vazgeçilmez duraklarıdır. Karadan ulaşımı zor olduğu için bakir kalmayı başarmışlardır.`,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Yalikavak-Bodrum-Turkey_%287551656790%29.jpg/1280px-Yalikavak-Bodrum-Turkey_%287551656790%29.jpg',
    gpsLat: 37.0542,
    gpsLng: 27.2397,
    highlights: ['Her zevke uygun plaj çeşitliliği', 'Yalıkavak ve Türkbükü\'nde popüler beach club\'lar', 'Gümüşlük\'ün tarihi ve bohem atmosferi', 'Bitez ve Ortakent\'te su sporları imkanı', 'Tekne turlarıyla keşfedilen bakir koylar'],
    categorySlug: 'plajlar',
    isFeatured: false,
  },
  // Restoranlar & Kafeler
  {
    title: 'Bodrum\'da Yemek Kültürü ve Öneriler',
    slug: 'bodrum-yemek-kulturu',
    summary: 'Taze deniz ürünleri, zeytinyağlı otlar, yerel şaraplar ve gurme lezzetler... Bodrum\'un zengin mutfak kültürünü keşfedin.',
    content: `Bodrum, sadece doğal güzellikleri ve eğlence hayatıyla değil, aynı zamanda Ege mutfağının en taze ve en lezzetli örneklerini sunan zengin bir gastronomi kültürüyle de öne çıkar.\n\n**Deniz Mahsulleri ve Balık Restoranları:** Bodrum mutfağının kalbinde, Ege'nin cömertçe sunduğu taze balıklar ve deniz ürünleri yer alır. Özellikle Gümüşlük, balık restoranlarıyla ünlüdür. Sahilde, denize sıfır masalarda, gün batımını izlerken taptaze balığınızı yemek unutulmaz bir deneyimdir.\n\n**Ege Mezeleri ve Zeytinyağlılar:** Bodrum sofralarının olmazsa olmazı, yöresel otlarla ve sızma zeytinyağıyla hazırlanan mezelerdir. Deniz börülcesi, kabak çiçeği dolması, turp otu salatası, Girit ezmesi ve fava gibi lezzetler damaklarda bir şölen yaratır.\n\n**Bodrum'un Yerel Tatları:** Bodrum'a özgü lezzetler arasında Çökertme Kebabı başı çeker. Kibrit patates üzerine konulan bonfile et ve yoğurtla servis edilen bu kebap, oldukça doyurucu ve lezzetlidir.\n\n**Gurme Deneyimler:** Son yıllarda Bodrum, dünyaca ünlü şeflerin açtığı restoranlarla bir gurme merkezine dönüşmüştür.`,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Bodrum_marina_04.jpg/1280px-Bodrum_marina_04.jpg',
    gpsLat: 37.0335,
    gpsLng: 27.4350,
    highlights: ['Taze balık ve deniz ürünleri cenneti', 'Yöresel otlarla hazırlanan zengin meze kültürü', 'Bodrum\'a özgü Çökertme Kebabı', 'Lüks ve gurme restoranlarda dünya mutfağı', 'Bodrum mandalinası ile yapılan yerel ürünler'],
    categorySlug: 'restoranlar-kafeler',
    isFeatured: false,
  },
  {
    title: 'Fethiye ve Ölüdeniz\'de Nerede Yenir?',
    slug: 'fethiye-oludeniz-nerede-yenir',
    summary: 'Balık pazarının taze lezzetlerinden, Ölüdeniz\'in manzaralı restoranlarına... Fethiye ve çevresindeki en iyi yeme-içme rehberi.',
    content: `Fethiye ve çevresi, sunduğu doğal ve tarihi güzellikler kadar, zengin ve çeşitli yeme-içme olanaklarıyla da tatilcileri cezbeder.\n\n**Fethiye Merkez ve Balık Pazarı:** Fethiye'nin kalbinde yer alan balık pazarı, eşsiz bir gastronomi deneyimi sunar. Pazarın ortasındaki tezgahlardan dilediğiniz taze balığı seçip, çevresindeki restoranlardan birinde pişirtebilirsiniz.\n\n**Ölüdeniz Sahili:** Dünyaca ünlü Ölüdeniz manzarasına karşı yemek yemek, tatilin en keyifli anlarından biridir. Sahil boyunca sıralanan restoranlar, genellikle Türk ve dünya mutfağından geniş bir menü sunar.\n\n**Hisarönü ve Ovacık:** Dünya mutfağı konusunda oldukça zengindir. Hint, Çin, Meksika ve İtalyan restoranlarının yanı sıra, geleneksel pub'lar da bulabilirsiniz.\n\n**Kayaköy'ün Otantik Mekanları:** Özellikle 'kendin pişir kendin ye' konseptli et restoranları oldukça popülerdir. Tarihi taş binaların arasında, asma yapraklarının altında keyifli bir yemek deneyimi yaşayabilirsiniz.`,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/G%C3%B6cek_Marina_T%C3%BCrkei.jpg/1280px-G%C3%B6cek_Marina_T%C3%BCrkei.jpg',
    gpsLat: 36.6235,
    gpsLng: 29.1130,
    highlights: ['Fethiye Balık Pazarı\'nda seç ve pişirt deneyimi', 'Ölüdeniz\'de muhteşem manzaralı restoranlar', 'Hisarönü\'nde zengin dünya mutfağı seçenekleri', 'Kayaköy\'de otantik kendin pişir kendin ye mekanları', 'Çalış Plajı\'nda uygun fiyatlı akşam yemekleri'],
    categorySlug: 'restoranlar-kafeler',
    isFeatured: false,
  },
  // Oteller & Konaklama
  {
    title: 'Bodrum\'da Konaklama Rehberi',
    slug: 'bodrum-konaklama-rehberi',
    summary: 'Lüks resort\'lardan, begonvillerle süslü butik otellere, aileler için tatil köylerinden, bütçe dostu pansiyonlara...',
    content: `Türkiye'nin tatil cenneti Bodrum, konaklama seçenekleri konusunda sunduğu inanılmaz çeşitlilikle her türlü beklentiye ve bütçeye cevap verir.\n\n**Lüks Resort'lar:** Bodrum, özellikle Yalıkavak, Göltürkbükü ve Torba gibi koylarda, dünya standartlarında hizmet veren lüks resort otellere ev sahipliği yapar. Bu oteller genellikle kendilerine ait özel plajları, birden fazla havuzları, SPA merkezleri ve gurme restoranları sunar.\n\n**Butik Oteller:** Bodrum'un kimliğini en iyi yansıtan konaklama tipi şüphesiz butik otellerdir. Genellikle Bodrum'un meşhur beyaz badanalı mimarisine sahip, begonviller ve sardunyalarla süslenmiş bu oteller, kişiye özel hizmet anlayışları ve samimi atmosferleriyle öne çıkar.\n\n**Tatil Köyleri:** Özellikle çocuklu aileler için tasarlanmış olan tatil köyleri, su kaydırakları, çocuk kulüpleri, animasyon ekipleri ve gün boyu süren aktivitelerle aile boyu eğlence sunar.\n\n**Pansiyonlar ve Apart Oteller:** Daha bütçe dostu bir konaklama arayan gezginler için Gümbet ve Bodrum merkezdeki pansiyonlar harika bir seçenektir.`,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Yalikavak-Bodrum-Turkey_%287551656790%29.jpg/1280px-Yalikavak-Bodrum-Turkey_%287551656790%29.jpg',
    gpsLat: 37.0344,
    gpsLng: 27.4303,
    highlights: ['Yalıkavak ve Göltürkbükü\'nde dünya standartlarında lüks resort\'lar', 'Bodrum\'un ruhunu yansıtan begonvilli butik oteller', 'Çocuklu aileler için su parklı tatil köyleri', 'Gümbet ve merkezde bütçe dostu pansiyonlar', 'Kendi yemeğini yapmak isteyenler için apart otel seçenekleri'],
    categorySlug: 'oteller-konaklama',
    isFeatured: false,
  },
  {
    title: 'Fethiye ve Çevresinde Konaklama',
    slug: 'fethiye-cevresinde-konaklama',
    summary: 'Ölüdeniz\'in lüks otellerinden, Faralya\'nın bohem bungalovlarına, Göcek\'in şık marinalı otellerine...',
    content: `Fethiye ve çevresi, Ölüdeniz'in dünyaca ünlü mavisinden, Kelebekler Vadisi'nin el değmemiş doğasına, Saklıkent'in serin sularından, Göcek'in lüks marinalarına kadar inanılmaz bir coğrafi çeşitlilik sunar.\n\n**Ölüdeniz ve Ovacık:** Ölüdeniz, özellikle Belcekız Plajı'na ve Mavi Lagün'e yakın konumdaki otelleriyle popülerdir. Otellerin birçoğu, Babadağ'dan süzülen yamaç paraşütlerinin ve muhteşem denizin manzarasına sahiptir.\n\n**Faralya ve Kabak Koyu:** Fethiye'den biraz uzaklaşıp ulaşılan Faralya, Kelebekler Vadisi'ne tepeden bakan konumuyla adeta bir huzur cennetidir. Burada konaklama genellikle yoga merkezleri, glamping, ahşap bungalovlar şeklindedir.\n\n**Fethiye Merkez ve Çalış Plajı:** Çalış Plajı, uzun kumsalı, sakin denizi ve uygun fiyatlı otelleriyle özellikle çocuklu aileler tarafından tercih edilir.\n\n**Göcek:** Dünyaca ünlü marinaları, lüks butik otelleri ve şık restoranlarıyla daha sofistike bir tatil arayanların adresidir.`,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/G%C3%B6cek_Marina_T%C3%BCrkei.jpg/1280px-G%C3%B6cek_Marina_T%C3%BCrkei.jpg',
    gpsLat: 36.5583,
    gpsLng: 29.1369,
    highlights: ['Ölüdeniz\'de deniz ve yamaç paraşütü manzaralı lüks oteller', 'Faralya ve Kabak Koyu\'nda yoga merkezleri ve bungalovlar', 'Fethiye merkez ve Çalış Plajı\'nda ailelere uygun seçenekler', 'Göcek\'te marinalara yakın lüks ve butik oteller', 'Hisarönü ve Ovacık\'ta kiralık villalar ve apart oteller'],
    categorySlug: 'oteller-konaklama',
    isFeatured: false,
  },
  // Aktiviteler
  {
    title: 'Muğla\'da Su Sporları ve Tekne Turları',
    slug: 'mugla-su-sporlari-tekne-turlari',
    summary: 'Bodrum\'un hareketli koylarından, Dalyan\'ın sazlık labirentlerine, Fethiye\'nin bakir adalarına... Tekne turları ve su sporları sizi bekliyor.',
    content: `Muğla'nın Ege ve Akdeniz'i kucaklayan uzun sahil şeridi, onu tekne turları ve su sporları için bir cennet haline getirir.\n\n**Bodrum Tekne Turları:** Bodrum limanından her gün kalkan günübirlik tekneler, sizi yarımadanın en güzel koylarına götürür. Genellikle rotada Karaada'nın sıcak su mağarası, Camel Beach ve Akvaryum Koyu gibi duraklar yer alır.\n\n**Fethiye ve Ölüdeniz Tekne Turları:** Fethiye, tekne turları konusunda en zengin seçenekleri sunan yerdir. En popüler tur, 12 Adalar turudur. Bu turda Göcek çevresindeki Yassıca Adaları, Tersane Adası ve Kleopatra Hamamı Koyu gibi noktalarda yüzme molası verilir.\n\n**Dalyan Nehir Turu:** Muğla'daki en farklı tekne turu deneyimlerinden biri Dalyan'da yaşanır. 'Piyade' adı verilen teknelerle sazlık labirentleri arasında yapılan bu yolculuk, sizi İztuzu Plajı'na ulaştırır.\n\n**Akyaka ve Gökova Körfezi:** 'Azmak' adı verilen buz gibi tatlı su nehrinde yapılan kısa tekne turları, Akyaka'nın simgesidir.`,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/G%C3%B6cek_Marina_T%C3%BCrkei.jpg/1280px-G%C3%B6cek_Marina_T%C3%BCrkei.jpg',
    gpsLat: 36.8333,
    gpsLng: 28.6222,
    highlights: ['Bodrum\'dan günübirlik turlarla Akvaryum Koyu ve Karaada', 'Fethiye\'den 12 Adalar ve Kelebekler Vadisi turları', 'Dalyan\'da sazlıklar arasında Kral Mezarları nehir turu', 'Akyaka\'da Azmak Nehri\'nde buz gibi sularında tekne gezisi', 'Bitez\'de rüzgar sörfü, Ölüdeniz\'de kano ve SUP'],
    categorySlug: 'aktiviteler',
    isFeatured: true,
  },
  {
    title: 'Yamaç Paraşütü ve Doğa Aktiviteleri',
    slug: 'yamac-parasutu-doga-aktiviteleri',
    summary: 'Ölüdeniz\'in mavisinin üzerinde kuşlar gibi süzülün, Saklıkent Kanyonu\'nda yürüyün veya Likya Yolu\'nda tarihin izlerini takip edin.',
    content: `Muğla, sadece deniz, kum ve güneş üçlüsünden ibaret değildir. Sahip olduğu coğrafi çeşitlilik, onu adrenalin tutkunları ve doğa severler için de bir cazibe merkezi haline getirir.\n\n**Yamaç Paraşütü:** Muğla'daki en ikonik macera aktivitesi şüphesiz Ölüdeniz'de yapılan yamaç paraşütüdür. Yaklaşık 2000 metre yüksekliğindeki Babadağ'ın zirvesinden, deneyimli pilotlar eşliğinde (tandem uçuş) yapılan bu atlayış, size hayatınızın en unutulmaz anlarından birini yaşatır.\n\n**Saklıkent Kanyonu:** Fethiye yakınlarındaki Saklıkent Kanyonu, binlerce yılda suyun kayaları aşındırmasıyla oluşmuş, 18 km uzunluğunda muhteşem bir doğa harikasıdır. Kanyonun içine doğru yapılan yürüyüşle macera başlar.\n\n**Likya Yolu:** Fethiye'den başlayıp Antalya'ya kadar uzanan ve dünyanın en iyi 10 uzun mesafe yürüyüş rotasından biri olarak gösterilen Likya Yolu'nun önemli bir bölümü Muğla sınırları içindedir.\n\n**Jeep Safari:** Muğla'nın iç kesimlerinde, dağ köyleri ve orman yolları arasında yapılan jeep safari turları da popüler bir aktivitedir.`,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Paragliding_from_Babadag_Mountain_over_the_Blue_Lagoon_in_%C3%96l%C3%BCdeniz%2C_Turkey_%2849070938897%29.jpg/1280px-Paragliding_from_Babadag_Mountain_over_the_Blue_Lagoon_in_%C3%96l%C3%BCdeniz%2C_Turkey_%2849070938897%29.jpg',
    gpsLat: 36.5489,
    gpsLng: 29.1190,
    highlights: ['Babadağ\'dan tandem yamaç paraşütü uçuşu', 'Saklıkent Kanyonu\'nda kanyoning ve yürüyüş', 'Likya Yolu\'nda uzun mesafe trekking', 'Jeep safari turları ile iç kesimleri keşfetme', 'Tlos ve Pinara antik kentlerine doğa yürüyüşleri'],
    categorySlug: 'aktiviteler',
    isFeatured: false,
  },
  // Gece Hayatı
  {
    title: 'Bodrum Gece Hayatı Rehberi',
    slug: 'bodrum-gece-hayati-rehberi',
    summary: 'Türkiye\'nin eğlence başkenti Bodrum, gece hayatıyla ünlüdür. Dünyaca ünlü kulüplerden, balıkçı barlarına kadar her zevke uygun mekanlar sizi bekliyor.',
    content: `Bodrum, yaz aylarında Türkiye'nin ve hatta dünyanın en hareketli eğlence merkezlerinden birine dönüşür. Güneş battıktan sonra Bodrum'un sokaklarında ve sahillerinde bambaşka bir enerji yükselmeye başlar.\n\n**Bodrum Bar Sokak:** Bodrum'un gece hayatının en canlı noktası, merkezdeki Bar Sokak'tır (Dr. Alim Bey Caddesi). Birbirine bitişik düzinelerce bar ve küçük kulüp, her türden müzik ve ortam sunar. Canlı müzik, DJ performansları ve açık hava dansları burada alışılagelmiş bir manzaradır.\n\n**Dünyaca Ünlü Kulüpler:** Bodrum, dünyanın önde gelen eğlence markalarına da ev sahipliği yapmaktadır. Özellikle Yalıkavak Marina çevresinde ve Torba'da yer alan bu mekanlar, ünlü isimleri ve VIP hizmetleriyle jetset kalabalığını çeker.\n\n**Marina ve Sahil Barları:** Daha sakin ve sofistike bir akşam geçirmek isteyenler için Bodrum ve Yalıkavak marinalarındaki barlar ve restoranlar ideal seçeneklerdir. Yatlara ve denize karşı bir kokteyl yudumlayarak geceye başlamak harika bir seçenektir.\n\n**Canlı Müzik Mekanları:** Türk sanat müziğinden caz'a, rock'tan pop'a kadar pek çok farklı müzik türünde canlı performanslar sunan mekanlar Bodrum'un her köşesinde mevcuttur.`,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Bodrum_marina_04.jpg/1280px-Bodrum_marina_04.jpg',
    gpsLat: 37.0335,
    gpsLng: 27.4250,
    highlights: ['Bar Sokak\'ta düzinelerce bar ve canlı müzik', 'Dünyaca ünlü kulüpler ve plaj partileri', 'Marina ve sahil barlarında sofistike akşamlar', 'Türk müziğinden caz\'a canlı performanslar', 'Yalıkavak Marina\'da lüks gece hayatı'],
    categorySlug: 'gece-hayati',
    isFeatured: false,
  },
  {
    title: 'Marmaris ve Fethiye Gece Hayatı',
    slug: 'marmaris-fethiye-gece-hayati',
    summary: 'Marmaris\'in hareketli bar sokağından, Fethiye\'nin daha sakin ve bohem atmosferine... Muğla\'nın diğer eğlence merkezlerini keşfedin.',
    content: `Bodrum kadar ünlü olmasa da, Muğla'nın diğer tatil beldeleri de kendi karakterlerinde eğlenceli gece hayatı seçenekleri sunar.\n\n**Marmaris Bar Sokak:** Marmaris, özellikle genç turistler ve İngiliz tatilciler arasında oldukça popüler bir gece hayatı merkezidir. Kaleiçi bölgesinde bulunan ve 'Bar Street' olarak bilinen cadde, sabaha kadar süren partilere sahne olur. Düzinelerce bar, kulüp ve disko, yüksek sesli müzik ve köpük partileriyle tanınır.\n\n**İçmeler ve Turunç:** Marmaris'e yakın olan bu küçük beldelerin gece hayatı çok daha sakindir. Burada genellikle sahil boyundaki restoranlar ve barlar, canlı müzik eşliğinde keyifli bir akşam geçirmek isteyenlere hitap eder.\n\n**Fethiye Gece Hayatı:** Fethiye'nin gece hayatı, Bodrum veya Marmaris kadar gürültülü değildir ama kendine özgü bir cazibesi vardır. Paspatur eski şehir bölgesinde bulunan atmosferik barlar, canlı müzik mekanları ve küçük kulüpler popülerdir.\n\n**Hisarönü:** Fethiye yakınlarındaki Hisarönü, özellikle İngiliz turistler arasında popülerdir. Buradaki bar ve kulüpler, gece geç saatlere kadar açık kalır ve canlı bir atmosfer sunar.`,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Bar_street_in_Marmaris.JPG/1280px-Bar_street_in_Marmaris.JPG',
    gpsLat: 36.8508,
    gpsLng: 28.2706,
    highlights: ['Marmaris Bar Sokak\'ta canlı partiler', 'İçmeler ve Turunç\'ta sakin sahil barları', 'Fethiye Paspatur\'da atmosferik barlar', 'Hisarönü\'nde İngiliz tarzı pub ve kulüpler', 'Gece geç saatlere kadar süren eğlence'],
    categorySlug: 'gece-hayati',
    isFeatured: false,
  },
  // Ulaşım Rehberi
  {
    title: 'Muğla\'ya Nasıl Gidilir? Ulaşım Rehberi',
    slug: 'muglaya-nasil-gidilir-ulasim-rehberi',
    summary: 'Uçak, otobüs, araba veya feribot... Muğla\'ya ve beldelerine ulaşmanın tüm yollarını bu kapsamlı rehberde bulabilirsiniz.',
    content: `Muğla, Türkiye'nin güneybatısında, Ege ve Akdeniz'in birleştiği noktada yer alan, ulaşım açısından oldukça erişilebilir bir ildir.\n\n**Havayolu ile Ulaşım:** Muğla'ya havayolu ile ulaşmanın en pratik yolu, bölgedeki iki havalimanından birini kullanmaktır. Milas-Bodrum Havalimanı (BJV), Bodrum ve çevresine gidecekler için idealdir. Dalaman Havalimanı (DLM) ise Fethiye, Ölüdeniz, Dalyan, Marmaris ve Köyceğiz gibi yerlere gitmek isteyenler için en uygun seçenektir.\n\n**Karayolu ile Ulaşım:** Türkiye'nin dört bir yanından Muğla'ya otobüsle ulaşmak mümkündür. İstanbul, Ankara, İzmir gibi büyük şehirlerden düzenli otobüs seferleri bulunmaktadır. Kendi aracınızla geliyorsanız, İzmir üzerinden D330 karayolu ile Muğla'ya rahatça ulaşabilirsiniz.\n\n**Denizyolu ile Ulaşım:** Özellikle Yunan adalarından (Kos, Rodos, Symi gibi) gelenler için feribot seçenekleri mevcuttur. Bodrum-Kos ve Marmaris-Rodos arasında düzenli feribot seferleri yapılmaktadır.\n\n**Bölge İçi Ulaşım:** Muğla'nın farklı beldeleri arasında minibüs (dolmuş) seferleri oldukça sık ve ekonomiktir. Ayrıca araç kiralama seçenekleri de yaygındır.`,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Dalaman_airport1.jpg/1280px-Dalaman_airport1.jpg',
    gpsLat: 37.0594,
    gpsLng: 28.9841,
    highlights: ['Milas-Bodrum ve Dalaman havalimanları', 'Türkiye genelinden düzenli otobüs seferleri', 'Yunan adalarından feribot bağlantıları', 'Bölge içi minibüs ve dolmuş ağı', 'Araç kiralama seçenekleri'],
    categorySlug: 'ulasim-rehberi',
    isFeatured: false,
  },
  {
    title: 'Datça Yarımadası ve Knidos Antik Kenti',
    slug: 'datca-yarimadasi-knidos-antik-kenti',
    summary: 'Eski Datça sokaklarından Knidos’un rüzgarlı tepesine uzanan bu rota, sakinlik arayanlar için Muğla’nın en özel yüzlerinden birini gösterir.',
    content: `Datça Yarımadası, Muğla’nın en karakterli rotalarından biridir. Yol boyunca karşılaştığınız virajlı manzaralar, badem ağaçları, taş evler ve bir anda açılan derin mavi koylar, daha ilçeye varmadan tatilin temposunu düşürür. Datça’yı özel yapan şey, büyük tatil merkezlerinin gürültüsünden uzak kalıp sade bir Ege ritmini koruyabilmesidir.\n\nİlçe merkezinde deniz kenarında yürüyüş yapabilir, küçük butikleri ve kahve duraklarını keşfedebilir, ardından Eski Datça’ya geçerek taş sokaklarda sakin bir rota izleyebilirsiniz. Eski Datça’da begonvillerle çevrili avlular, sanat atölyeleri ve yerel ürünler satan küçük dükkanlar öne çıkar.\n\nYarımadanın en etkileyici durağı ise hiç kuşkusuz Knidos Antik Kenti’dir. Datça’nın en ucunda, Ege ile Akdeniz’in kesiştiği noktada yer alan Knidos; iki limanı, tiyatrosu, teraslı yerleşimi ve gün batımı manzarasıyla benzersizdir. Özellikle akşamüstü saatlerinde antik kentin taşları arasında dolaşmak, bu bölgenin tarih ve manzara gücünü aynı anda hissettirir.\n\nKnidos’a giderken yolu bir gezi deneyiminin parçası gibi düşünmek gerekir. Palamutbükü, Mesudiye ve Ovabükü gibi duraklarla günü parçalayıp deniz molaları verebilir, dönüşte Datça merkezde yavaş bir akşam yemeğiyle rotayı tamamlayabilirsiniz.`,
    imageUrl: null,
    gpsLat: 36.6926,
    gpsLng: 27.3763,
    highlights: ['Eski Datça’da taş sokaklar ve butik duraklar', 'Ege ile Akdeniz’in birleştiği uç noktada Knidos', 'Antik tiyatro ve çift liman kalıntıları', 'Yol boyunca koy koy ilerleyen manzaralı rota', 'Gün batımı için Muğla’daki en güçlü noktalardan biri'],
    categorySlug: 'gezilecek-yerler',
    isFeatured: false,
  },
  {
    title: 'Datça\'nın En Güzel Koyları',
    slug: 'datcanin-en-guzel-koylari',
    summary: 'Uzun kumsallar, cam gibi su ve kalabalıktan uzak yüzme molaları arıyorsanız Datça koyları Muğla’nın en güçlü alternatiflerinden biridir.',
    content: `Datça kıyıları, büyük beach club kalabalıklarından çok daha sakin ve doğal bir deniz deneyimi sunar. Buradaki koyların çoğunda su oldukça berraktır; kıyı yapısı ise bir yerde uzun kumsal, başka bir yerde çakıllı ve sessiz bir cep şeklinde karşınıza çıkar. Bu çeşitlilik, Datça’yı aynı gün içinde farklı deniz karakterleri yaşamak isteyenler için ideal hale getirir.\n\n**Palamutbükü**, Datça denince ilk akla gelen duraklardan biridir. Uzun sahil şeridi, temiz suyu ve sahil boyunca dizilen işletmeleriyle gün boyu konforlu vakit geçirmek isteyenler için uygundur. Daha sakin bir alternatif arayanlar ise **Ovabükü** ve **Hayıtbükü** tarafında daha küçük ölçekte, daha yerel bir atmosfer bulabilir.\n\nMerkeze daha yakın bir deniz molası için **Kargı Koyu** öne çıkar. Kısa sürüşle ulaşılması kolaydır ve özellikle sabah saatlerinde oldukça huzurludur. Şnorkelle yüzmeyi sevenler için berrak su yapısı önemli bir avantajdır. Tekne turuyla keşfedilen daha küçük koylar ise Datça’nın en bakir yüzünü gösterir.\n\nBu bölgede en iyi deneyim için tek bir plaja kapanmak yerine koy koy ilerleyen yarım günlük veya tam günlük rota yapmak daha doğru olur. Yanınıza deniz ayakkabısı almak, sabah erken çıkmak ve gün batımına yakın daha sakin bir koyda mola vermek Datça sahillerinden alacağınız keyfi belirgin şekilde artırır.`,
    imageUrl: null,
    gpsLat: 36.7197,
    gpsLng: 27.6842,
    highlights: ['Palamutbükü’nde uzun ve konforlu sahil hattı', 'Ovabükü ve Hayıtbükü’nde daha sakin atmosfer', 'Kargı Koyu’nda merkeze yakın deniz molası', 'Şnorkel için uygun berrak su yapısı', 'Aynı gün içinde birkaç koy gezmeye uygun yarımada rotası'],
    categorySlug: 'plajlar',
    isFeatured: false,
  },
  {
    title: 'Akyaka ve Datça\'da Yerel Lezzet Durakları',
    slug: 'akyaka-datca-yerel-lezzet-duraklari',
    summary: 'Azmak kıyısında kahvaltıdan Datça bademine uzanan bu rota, Muğla mutfağını sadece manzarayla değil yerel malzemeyle de tanımak isteyenler için iyi bir başlangıçtır.',
    content: `Akyaka ve Datça, yeme içme konusunda gösterişli değil ama karakterli seçenekler sunan iki farklı rota gibidir. Akyaka’da su kenarına yayılan sakin masa düzeni, Datça’da ise küçük üreticilerin ve yerel malzemenin öne çıktığı daha yavaş bir mutfak kültürü dikkat çeker.\n\nAkyaka tarafında sabah saatleri özellikle keyiflidir. Azmak Nehri çevresindeki kahvaltı mekanları, serin su manzarası eşliğinde uzun oturmaya uygundur. Günün ilerleyen saatlerinde nehir kenarı veya sahil tarafındaki balık restoranları öne çıkar. Izgara levrek, kalamar, otlu mezeler ve zeytinyağlı başlangıçlar bölgenin standart ama güçlü seçenekleridir.\n\nDatça’da ise badem, zeytinyağı, bal ve yöresel reçeller yalnızca hediyelik değil, menülerin de karakterini belirler. Eski Datça çevresindeki küçük kafelerde bademli tatlılar, ev yapımı limonatalar ve üçüncü nesil kahve durakları öne çıkar. Akşam saatlerinde sahil hattındaki restoranlarda taze balık ve Ege mezeleri daha baskın hale gelir.\n\nBu iki bölgeyi birlikte düşünenler için en iyi yaklaşım, Akyaka’da manzaralı bir kahvaltı ya da hafif öğle yemeği planlayıp Datça tarafında daha uzun bir akşam yemeği deneyimi yaşamaktır. Böylece hem Gökova’nın sakin su kenarı atmosferini hem de Datça’nın daha yerel ve üretim odaklı mutfağını aynı tatilde görmüş olursunuz.`,
    imageUrl: null,
    gpsLat: 37.0541,
    gpsLng: 28.3242,
    highlights: ['Azmak kıyısında sakin kahvaltı durakları', 'Akyaka’da balık ve zeytinyağlı ağırlıklı menüler', 'Datça’da badem, bal ve yerel üretici ürünleri', 'Eski Datça çevresinde küçük kafe ve tatlı durakları', 'Manzara ve malzeme kalitesini birleştiren yavaş yemek deneyimi'],
    categorySlug: 'restoranlar-kafeler',
    isFeatured: false,
  },
  {
    title: 'Akyaka ve Gökova\'da Nerede Kalınır?',
    slug: 'akyaka-gokovada-nerede-kalinir',
    summary: 'Sakin merkez otelleri, kite odaklı sahil konaklamaları ve doğaya yakın küçük tesisler arasında seçim yaparken Akyaka ile Gökova’nın farklı karakterlerini iyi ayırmak gerekir.',
    content: `Akyaka ve Gökova çevresi, Bodrum ya da Fethiye kadar büyük ölçekli konaklama çeşitliliğine sahip olmasa da daha seçilmiş ve dingin alternatifler sunar. Buraya gelenlerin çoğu yüksek tempolu tatilden çok yavaşlamak, doğaya yakın olmak ve denizle günlük hayat arasında kısa mesafeler bırakmak ister.\n\nAkyaka merkezde konaklamak isteyenler için butik oteller ve apartlar öne çıkar. Restoranlara, sahile ve Azmak çevresine yürüyerek ulaşabilmek büyük avantajdır. Özellikle arabayı mümkün olduğunca az kullanmak isteyen çiftler ve kısa hafta sonu kaçamakları için merkez hattı mantıklı bir tercihtir.\n\nRüzgar sporlarıyla ilgilenenler ise Akçapınar tarafındaki konaklamalara daha yakındır. Buradaki tesisler genellikle daha sade ama aktivite odaklıdır. Sabah erkenden kite veya rüzgar sörfüne çıkmak isteyenler için lokasyon farkı belirgin şekilde hissedilir.\n\nDaha sessiz ve doğa içinde bir tatil arayanlar, Gökova Körfezi çevresindeki küçük pansiyonlar, taş evler ya da bungalov konseptli tesislere yönelebilir. Bu tarz konaklamalarda manzara ve sakinlik artar; ancak akşam yemekleri ve market erişimi için araç avantaj haline gelir. Rezervasyon yaparken manzara kadar ulaşım kolaylığını da mutlaka hesaba katmak gerekir.`,
    imageUrl: null,
    gpsLat: 37.0553,
    gpsLng: 28.3227,
    highlights: ['Akyaka merkezde yürünebilir butik otel seçenekleri', 'Akçapınar tarafında spor odaklı konaklamalar', 'Gökova çevresinde daha sessiz pansiyon ve bungalovlar', 'Kısa kaçamaklar için merkez hattı avantajı', 'Rezervasyonda manzara kadar ulaşım kolaylığı da önemli'],
    categorySlug: 'oteller-konaklama',
    isFeatured: false,
  },
  {
    title: 'Akyaka Azmak Nehri ve Gökova Doğa Rotaları',
    slug: 'akyaka-azmak-gokova-doga-rotalari',
    summary: 'Serin nehir gezileri, kıyı yürüyüşleri ve rüzgar sporlarıyla Akyaka çevresi, deniz tatilini aktif bir rota ile birleştirmek isteyenler için çok güçlüdür.',
    content: `Akyaka’nın en ayırt edici noktası, kısa mesafelerde birbirinden çok farklı doğa deneyimleri sunabilmesidir. Sabah buz gibi Azmak Nehri kıyısında yürüyebilir, öğleden sonra kite surf yapanları izleyebilir ya da doğrudan sahaya çıkabilir, akşamüstü ise tepeden körfezi gören sakin bir manzara noktasına geçebilirsiniz.\n\n**Azmak Nehri** çevresi, bölgenin en kolay ama en etkileyici deneyimlerinden birini sunar. Kısa tekne turları, kano ve nehir kenarı yürüyüşleri özellikle yaz sıcağında çok keyiflidir. Su o kadar berraktır ki nehir yatağını izlemek bile başlı başına bir aktiviteye dönüşür.\n\nAktif tarafı güçlendirmek isteyenler için **Akçapınar** rüzgar sporlarının merkezidir. Uygun hava koşullarında kite surf ve benzeri su sporları için son derece hareketli bir sahne oluşur. Daha sakin rota arayanlar ise çevredeki patikaları, bisiklet yollarını ve Sakartepe gibi seyir noktalarını değerlendirebilir.\n\nGünü tekne turuyla tamamlamak isteyenler için Gökova Körfezi çevresindeki kısa mavi yolculuk rotaları da güçlü bir alternatiftir. Böylece nehir, körfez ve kıyı doğasını tek bir seyahat içinde farklı tempolarda deneyimlemek mümkün olur.`,
    imageUrl: null,
    gpsLat: 37.0547,
    gpsLng: 28.3240,
    highlights: ['Azmak Nehri’nde tekne, kano ve yürüyüş', 'Akçapınar’da rüzgar sporları için uygun alanlar', 'Sakartepe ve çevresinde manzaralı kısa rotalar', 'Bisiklet ve sahil yürüyüşü için dengeli parkurlar', 'Gökova Körfezi’nde günübirlik tekne rotalarıyla birleşen program'],
    categorySlug: 'aktiviteler',
    isFeatured: false,
  },
  {
    title: 'Selimiye ve Bozburun\'da Sakin Akşamlar',
    slug: 'selimiye-bozburunda-sakin-aksamlar',
    summary: 'Yüksek sesli kulüpler yerine deniz kenarında uzun sofralar ve loş sahil yürüyüşleri arıyorsanız Selimiye ile Bozburun gece hayatına daha dingin bir alternatif sunar.',
    content: `Muğla gece hayatı dendiğinde çoğu kişinin aklına önce Bodrum ya da Marmaris gelir; ancak her tatil eğlenceyi yüksek ses ve kalabalıkla eşitlemek zorunda değildir. Selimiye ve Bozburun, akşam saatlerini daha yavaş ve manzaraya dönük yaşamak isteyenler için çok daha uygun bir çizgi sunar.\n\nSelimiye’de gün batımıyla birlikte sahil hattı hareketlenir ama tempo hiçbir zaman aceleci değildir. Küçük restoranlarda uzun meze sofraları kurulur, denize sıfır masalarda hafif müzik eşlik eder ve akşam genellikle yürüyüşle devam eder. Burası daha çok sohbet, gün batımı ve sakin servis kalitesiyle öne çıkar.\n\nBozburun ise biraz daha dağınık ama bir o kadar da karakterli bir akşam atmosferine sahiptir. Tekne turundan dönenler liman çevresinde toplanır, küçük balık restoranları dolmaya başlar ve gece ilerledikçe kalabalık yerine sessizlik baskın hale gelir. Özellikle çiftler ve kafa dinlemek isteyenler için bu büyük avantajdır.\n\nEğer tatilde tek beklentiniz kulüp değil de iyi yemek, güçlü manzara ve sakin bir ritimse Selimiye ile Bozburun, Muğla’nın en rafine akşam rotalarından biri haline gelir.`,
    imageUrl: null,
    gpsLat: 36.7161,
    gpsLng: 28.0918,
    highlights: ['Kulüp yerine uzun akşam yemeği odaklı atmosfer', 'Selimiye’de deniz kenarında sakin meze sofraları', 'Bozburun’da liman çevresinde düşük tempolu akşamlar', 'Çiftler ve kafa dinlemek isteyenler için güçlü alternatif', 'Gün batımı manzarasıyla öne çıkan sessiz sahil rotaları'],
    categorySlug: 'gece-hayati',
    isFeatured: false,
  },
  {
    title: 'Dalaman ve Milas-Bodrum Havalimanı Transfer Rehberi',
    slug: 'dalaman-milas-bodrum-havalimani-transfer-rehberi',
    summary: 'Muğla tatilinde doğru havalimanını seçmek ve son transfer ayağını iyi planlamak, seyahatin konforunu doğrudan etkiler.',
    content: `Muğla geniş bir coğrafyaya yayıldığı için uçak biletini almadan önce nereye gideceğinizi netleştirmek gerekir. Genel kural basittir: Bodrum ve çevresi için Milas-Bodrum Havalimanı, Fethiye, Ölüdeniz, Dalyan, Marmaris ve Göcek hattı için ise Dalaman Havalimanı daha pratik bir başlangıç noktasıdır.\n\nHavalimanından sonra en sık kullanılan seçenekler shuttle servisler, özel transfer araçları, araç kiralama ve sezon dönemlerinde artan paylaşımlı ulaşım çözümleridir. Eğer konaklama yeriniz merkezdeyse servisler bütçe açısından avantajlı olabilir. Gece geç saatte iniş yapıyorsanız veya doğrudan küçük bir koya geçecekseniz özel transfer daha az yorucu bir seçenek haline gelir.\n\nAraç kiralama, özellikle aynı tatilde birden fazla belde gezmeyi planlayanlar için en esnek yöntemdir. Bodrum yarımadasında farklı koylar arasında, Fethiye çevresinde ise Saklıkent, Kayaköy, Faralya gibi noktalara geçerken ciddi rahatlık sağlar. Buna karşılık yalnızca tek bir merkezde kalacaksanız araç her zaman şart değildir.\n\nTransfer planını yaparken yalnızca fiyat değil, varış saati, bagaj durumu, çocuklu seyahat ve konaklama noktasının yol yapısı da düşünülmelidir. Doğru kombinasyon seçildiğinde Muğla’da ilk gününüz yolda geçmek yerine doğrudan tatil ritmine girebilir.`,
    imageUrl: null,
    gpsLat: 36.7131,
    gpsLng: 28.7925,
    highlights: ['Bodrum hattı için Milas-Bodrum, güney hat için Dalaman daha pratik', 'Shuttle, özel transfer ve araç kiralama arasında net tercih yapma', 'Gece inişi ve küçük koy konaklamalarında özel transfer avantajı', 'Birden fazla belde gezilecekse araç kiralama esneklik sağlar', 'Transfer planında sadece fiyat değil varış koşulları da önemli'],
    categorySlug: 'ulasim-rehberi',
    isFeatured: false,
  },
];

async function main() {
  console.log('Starting seed...');

  // Clear existing data
  await prisma.comment.deleteMany();
  await prisma.article.deleteMany();
  await prisma.category.deleteMany();
  await prisma.contactMessage.deleteMany();

  console.log('Cleared existing data');

  // Create categories
  const createdCategories: { [key: string]: string } = {};
  for (const cat of categories) {
    const created = await prisma.category.create({
      data: cat,
    });
    createdCategories[cat.slug] = created.id;
    console.log(`Created category: ${cat.name}`);
  }

  // Create articles
  for (const article of articles) {
    const { categorySlug, ...articleData } = article;
    await prisma.article.create({
      data: {
        ...articleData,
        categoryId: createdCategories[categorySlug],
      },
    });
    console.log(`Created article: ${article.title}`);
  }

  // Add some sample comments
  const sampleComments = [
    {
      articleSlug: 'bodrum-kalesi-sualti-arkeoloji-muzesi',
      name: 'Ahmet Yilmaz',
      email: 'ahmet@example.com',
      content: 'Harika bir rehber olmus, ozellikle muze bolumu gezi plani yaparken cok isime yaradi.',
    },
    {
      articleSlug: 'oludeniz-mavi-lagun',
      name: 'Zeynep Kaya',
      email: 'zeynep@example.com',
      content: 'Gecen yaz Oludeniz\'e gitmistik, lagun kismi tam anlatildigi gibiydi.',
    },
    {
      articleSlug: 'mugla-su-sporlari-tekne-turlari',
      name: 'Mehmet Demir',
      email: 'mehmet@example.com',
      content: 'Tekne turu seceneklerini tek yerde gormek plan yapmayi baya kolaylastirdi.',
    },
    {
      articleSlug: 'datca-yarimadasi-knidos-antik-kenti',
      name: 'Elif Acar',
      email: 'elif@example.com',
      content: 'Knidos icin gun batimi onerisi cok dogru; biz de o saatte gidip en keyifli halini gorduk.',
    },
    {
      articleSlug: 'akyaka-azmak-gokova-doga-rotalari',
      name: 'Burak Sen',
      email: 'burak@example.com',
      content: 'Akyaka tarafina ilk kez gidecegiz, ozellikle Azmak ve Sakartepe kismini not aldim.',
    },
    {
      articleSlug: 'dalaman-milas-bodrum-havalimani-transfer-rehberi',
      name: 'Seda Turkmen',
      email: 'seda@example.com',
      content: 'Havalimani secimi konusunda kafam cok karisikti, ozet net olmus.',
    },
  ];

  const commentTargetSlugs = sampleComments.map((comment) => comment.articleSlug);
  const commentArticles = await prisma.article.findMany({
    where: {
      slug: {
        in: commentTargetSlugs,
      },
    },
    select: {
      id: true,
      title: true,
      slug: true,
    },
  });
  const commentArticleMap = new Map(
    commentArticles.map((article) => [article.slug, article]),
  );

  for (const comment of sampleComments) {
    const targetArticle = commentArticleMap.get(comment.articleSlug);
    if (!targetArticle) {
      console.warn(`Skipped comment, article not found: ${comment.articleSlug}`);
      continue;
    }

    const { articleSlug, ...commentData } = comment;
    await prisma.comment.create({
      data: {
        ...commentData,
        articleId: targetArticle.id,
      },
    });
    console.log(`Created comment for: ${targetArticle.title}`);
  }

  const sampleContactMessages = [
    {
      name: 'Can Yildirim',
      email: 'can@example.com',
      subject: 'Dalaman transferi',
      message: 'Gece inisli Dalaman ucusundan sonra Oludeniz tarafina en rahat ulasim secenegi hangisi olur?',
      isRead: false,
    },
    {
      name: 'Derya Koc',
      email: 'derya@example.com',
      subject: 'Datca aile tatili',
      message: 'Haziran sonunda cocuklu aile icin Datca merkez mi yoksa Palamutbuku tarafi mi daha uygun olur diye arastiriyorum.',
      isRead: false,
    },
    {
      name: 'Mert Ozkan',
      email: 'mert@example.com',
      subject: 'Gokova tekne rotalari',
      message: 'Kalabalik olmayan Gokova tekne turlari ve kisa mavi yolculuk onerileri hakkinda da icerik bekliyorum.',
      isRead: true,
    },
  ];

  for (const message of sampleContactMessages) {
    const createdMessage = await prisma.contactMessage.create({
      data: message,
    });
    console.log(`Created contact message: ${createdMessage.subject}`);
  }

  console.log('Seed completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
