/**
 * Vergi Hesabım — Sarper Studios' Turkish tax calculator, published under this
 * domain at /vergi-hesabim/ on its own schedule, the same way MomentBack is.
 *
 * Single source for the privacy copy: PRIVACY.md in the Vergi Hesabım working
 * tree (effective 6 October 2026), cross-checked against the in-app screen
 * lib/ui/screens/privacy_screen.dart. The speech-input and tapu location
 * paragraphs come from that screen, which describes them in more detail than
 * PRIVACY.md does. When either source changes, this file changes with it.
 *
 * Everything product-specific lives here so the pages can move to another
 * domain (for example sarperstudios.com) by moving one content file and two
 * page files.
 */

export const vergiHesabim = {
  name: "Vergi Hesabım",
  publisher: "Sarper Studios",
  supportEmail: "sarperstudiosapp@gmail.com",
  androidPackage: "com.taxai.vergi_hesabi",
  effectiveDate: "6 Ekim 2026",
  effectiveDateIso: "2026-10-06",
  paths: {
    home: "/vergi-hesabim/",
    privacy: "/vergi-hesabim/privacy/",
  },
} as const;

export type VergiPage = keyof typeof vergiHesabim.paths;

export const vergiPath = (page: VergiPage) => vergiHesabim.paths[page];

/** The six calculators, in the app's own order and wording (module_registry.dart). */
export const vergiModules = [
  { title: "Maaş", question: "Brüt maaşım net ne kadar?" },
  { title: "KDV", question: "Fiyata KDV ekle veya çıkar" },
  { title: "Araç vergisi (MTV)", question: "Arabamın yıllık vergisi" },
  { title: "Tapu harcı", question: "Ev alıp satarken ödenecek harç" },
  { title: "Kira geliri (GMSİ)", question: "Yıllık gelir vergisi" },
  { title: "Gecikme zammı", question: "Geç ödenen vergi borcu" },
] as const;

export interface PolicyLink {
  href: string;
  label: string;
}

export interface PolicySection {
  id: string;
  heading: string;
  paragraphs: string[];
  list?: string[];
  after?: string[];
  links?: PolicyLink[];
}

/** "Bir bakışta": where each kind of information goes. */
export const privacyGlance = [
  { what: "Hesaplarınız ve son 10 hesap", where: "Telefonunuzda", local: true },
  { what: "Tema ve reklam aralığı kayıtları", where: "Telefonunuzda", local: true },
  {
    what: "Yazarak veya sesle yardım metni",
    where: "İsteğe bağlı · Supabase üzerinden OpenAI",
    local: false,
  },
  { what: "Sesi metne çevirme", where: "Telefonunuzun ses tanıma servisi", local: false },
  {
    what: "Tapu için il/ilçe önerisi",
    where: "İsteğe bağlı · Android konum hizmeti",
    local: false,
  },
  { what: "Reklamlar", where: "Google AdMob · vergi bilgisi gitmez", local: false },
] as const;

export const privacyIntro =
  "Bu politika, Sarper Studios tarafından yayımlanan Vergi Hesabım Android uygulamasının bilgilerinizi nasıl ele aldığını açıklar. Uygulama telefon odaklı çalışır: vergi hesapları telefonunuzda yapılır, hesap geçmişiniz telefonunuzda saklanır. Uygulama hesap açmanızı veya giriş yapmanızı istemez.";

export const privacySections: PolicySection[] = [
  {
    id: "telefonda",
    heading: "Telefonunuzda saklanan bilgiler",
    paragraphs: [
      "Aşağıdaki bilgiler yalnızca telefonunuzda, uygulamanın yerel deposunda tutulur. Tarafımızdan toplanmaz, sunucuya gönderilmez ve bizimle paylaşılmaz:",
    ],
    list: [
      "Hesaplama geçmişi: girdileriniz ve sonuçlar, en fazla son 10 kayıt.",
      "Görünüm tercihi: sistem, açık veya koyu tema.",
      "Reklam gösterimleri arasındaki bekleme süresi ve gösterim sınırına ilişkin kayıtlar.",
    ],
    after: [
      "Hesap geçmişini uygulamadaki Geçmiş ekranından silebilirsiniz. Tapu hesabında geçmişe yalnızca seçtiğiniz tapu müdürlüğü, hesabı yeniden açabilmeniz için yazılır.",
      "Yardım konuşmaları kalıcı olarak kaydedilmez; yeni bir hesap başlattığınızda konuşmadaki bilgiler temizlenir. Uygulamayı telefonunuzdan kaldırdığınızda yerel veriler de silinir.",
    ],
  },
  {
    id: "yardim",
    heading: "Yazarak ve sesle yardım (isteğe bağlı)",
    paragraphs: [
      "Durumunuzu yazarak veya sesle anlatma özelliğini kullanırsanız, yazdığınız metin ve konuşmadaki bilgiler yalnızca ilgili vergi alanlarını çıkarmak için sunucumuz (Supabase Edge Function) üzerinden OpenAI servisine iletilir ve orada işlenir. OpenAI'nin sunucuları yurt dışında, örneğin ABD'de bulunabilir.",
      "Sunucumuz metni kaydetmez. Kötüye kullanımı önlemek için yalnızca telefonunuza verilen anonim bir kimlikle günlük istek sayısını tutar. Adınız, e-postanız veya telefon numaranız istenmez.",
      "Hesabı her zaman telefonunuzdaki kod yapar; yapay zekâ yalnızca form alanlarını doldurmaya yardım eder. Bu alana T.C. kimlik numarası, tam ad, adres veya banka hesap numarası gibi bilgileri yazmamanızı öneririz; yalnızca hesabın gerektirdiği tutar ve tarihler yeterlidir.",
      "Bu özelliği hiç kullanmazsanız hiçbir metniniz telefonunuzdan çıkmaz.",
    ],
    links: [
      {
        href: "https://openai.com/policies/privacy-policy",
        label: "OpenAI gizlilik politikası",
      },
    ],
  },
  {
    id: "ses",
    heading: "Sesle yazma",
    paragraphs: [
      "Sesle yazarken konuşmanızı telefonunuzun kendi ses tanıma servisi (çoğunlukla Google) metne çevirir. Vergi Hesabım ses kaydetmez ve mikrofon izni istemez; yalnızca ortaya çıkan metni alır. Bu metin, yazdığınız metin gibi yukarıdaki yardım akışında kullanılır.",
      "Ses tanıma servisini sağlayan şirket, konuşmanızı kendi koşullarına göre işler.",
    ],
  },
  {
    id: "konum",
    heading: "Tapu için il/ilçe önerisi (isteğe bağlı)",
    paragraphs: [
      "Tapu döner sermaye hesabında “Konumumu kullan” düğmesine dokunursanız Android'in yaklaşık konum izni istenir. Telefonun sistem konum ve adres hizmeti yalnızca il ve ilçe önermek için kullanılır.",
      "Koordinatlar uygulamada kaydedilmez; sunucumuza, metni anlayan hizmete veya reklam isteklerine gönderilmez. Öneriyi kabul edip işlem yerini sizin onaylamanız gerekir. İzin vermeden il ve ilçeyi elle seçebilirsiniz.",
    ],
  },
  {
    id: "reklam",
    heading: "Reklamlar (Google AdMob)",
    paragraphs: [
      "Uygulama, Google AdMob aracılığıyla reklam gösterir. Android'de sonuç ekranlarında uyarlanabilir banner reklam, bazı hesaplardan sonra uygulama içindeki doğal geçişlerde tam ekran reklam gösterilir. Hesap sonuçlarına erişim, paylaşım, elle hesaplama ve yardım konuşması reklama bağlı değildir; reklam yüklenmese de hesaplar çalışır.",
      "Google; reklamları sunmak, ölçmek ve kötüye kullanımı önlemek için cihaz tanımlayıcıları, IP üzerinden yaklaşık konum, reklam etkileşimleri ve tanılama verileri gibi bilgileri işleyebilir.",
    ],
    list: [
      "Vergi girdileri; maaş, kira ve borç tutarları; sonuçlar; yardım konuşmasındaki metinler ve konum önerisindeki koordinatlar reklam isteğine eklenmez. Bu bilgilerden reklam hedefleme profili oluşturulmaz.",
      "Avrupa Ekonomik Alanı, Birleşik Krallık ve İsviçre gibi gereken bölgelerde Google'ın UMP gizlilik mesajı gösterilir. Seçimlerinizi uygulamada Ayarlar > Reklam gizlilik tercihleri bölümünden değiştirebilirsiniz. Reklam isteği, UMP'deki güncel izin durumunuza bağlıdır.",
      "Kişiselleştirilmemiş reklamlar da cihaz verilerini işleyebilir; örneğin gösterim sıklığını sınırlamak, toplu raporlama yapmak ve sahtekârlığı önlemek için. Kişiselleştirilmemiş reklam, verisiz reklam anlamına gelmez.",
    ],
    after: [
      "Uygulamada şu an ücretli, reklamsız bir seçenek yoktur. Böyle bir seçenek sunulursa bu politika güncellenir. Bu politika, uygulamanın Android sürümünü anlatır.",
    ],
    links: [
      {
        href: "https://policies.google.com/technologies/partner-sites",
        label: "Google, iş ortaklarının uygulamalarından gelen verileri nasıl kullanır",
      },
    ],
  },
  {
    id: "internet",
    heading: "İnternet bağlantısı",
    paragraphs: [
      "Uygulamanın hesaplama işlevleri internet gerektirmez. Uygulama interneti yalnızca isteğe bağlı yazarak veya sesle yardım özelliği ve reklamların yüklenmesi için kullanır. İnternet yoksa hesaplar reklamsız ve yardımsız olarak tam çalışır.",
    ],
  },
  {
    id: "ucuncu-taraflar",
    heading: "Üçüncü taraf hizmetleri",
    paragraphs: [],
    list: [
      "Supabase: yardım isteklerini ileten sunucu ve anonim günlük kullanım sayacı.",
      "OpenAI: yazarak veya sesle anlatılan metinden vergi alanlarını çıkarma.",
      "Google AdMob ve Google UMP: reklamlar ve gereken bölgelerde reklam izni.",
      "Telefonunuzun sistem hizmetleri: ses tanıma ile konum ve adres önerisi. Bunlar uygulama tarafından değil, telefonunuzun işletim sistemi ve sağlayıcısı tarafından sunulur.",
    ],
  },
  {
    id: "cocuklar",
    heading: "Çocukların gizliliği",
    paragraphs: [
      "Uygulama 13 yaşın altındaki kullanıcılara yönelik değildir ve bilerek 13 yaş altındaki kişilerden veri toplamaz.",
    ],
  },
  {
    id: "haklar",
    heading: "Haklarınız ve verilerin silinmesi",
    paragraphs: [
      "Hesap geçmişinizi Geçmiş ekranından silebilir ya da uygulamayı kaldırarak telefonunuzdaki tüm yerel verileri silebilirsiniz. Yardım ve reklam hizmetlerinin işlediği veriler için OpenAI ve Google'ın gizlilik politikalarındaki haklara ve silme yollarına başvurabilirsiniz. Sorularınız ve talepleriniz için bize e-posta ile yazabilirsiniz.",
    ],
  },
  {
    id: "degisiklikler",
    heading: "Değişiklikler",
    paragraphs: [
      "Bu politika zaman zaman güncellenebilir. Güncel sürüm her zaman bu sayfada ve uygulamadaki Gizlilik ekranında yer alır. Önemli bir değişiklikte yürürlük tarihi de güncellenir.",
    ],
  },
  {
    id: "iletisim",
    heading: "İletişim",
    paragraphs: [
      "Gizlilik ve verilerinizle ilgili sorularınız için bize yazın. Yayıncı: Sarper Studios.",
    ],
  },
];

export const privacyFootnote =
  "Bu belge bilgilendirme amaçlıdır ve hukuki danışmanlık yerine geçmez.";
