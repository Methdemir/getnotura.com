/**
 * Sarper Studios — the publisher. The domain root `/` is its page, and every
 * product owns one top-level path under it (`/notura/`, `/momentback/`,
 * `/vergi-hesabim/`, `/999kb/`, `/jutsu/`). When the studio moves to its own
 * domain, the paths move with it unchanged.
 *
 * 999KB and Jutsu copy is sourced from their working trees:
 * - 999KB: Mobile-Portfolio/apps/Games999KB — README.md (V2: 100 games, 12
 *   languages, one-time paid download, no ads, no in-app purchases, no account,
 *   no network permission), AndroidManifest.xml (VIBRATE is the only
 *   permission) and res/xml backup rules (only kb999_prefs.xml is backed up).
 * - Jutsu: Mobile-Portfolio/apps/NarutoJutsu — README.md, AndroidManifest.xml
 *   (CAMERA, RECORD_AUDIO for AudioPlaybackCapture only, media-projection
 *   foreground service), pubspec.yaml (hand_landmarker, ML Kit face detection
 *   and selfie segmentation, google_mobile_ads) and RELEASE_CHECKLIST.md.
 *   The public name is "Jutsu": the store name is not final, and the
 *   franchise name stays off this page.
 * When either app changes what it collects, this file changes with it.
 */

export const studio = {
  name: "Sarper Studios",
  email: "sarperstudiosapp@gmail.com",
  location: "Türkiye",
} as const;

export type AppStatus = "soon" | "preview";

export interface StudioApp {
  id: string;
  name: string;
  href: string;
  /** Absent while the app has only a placeholder page. */
  privacyHref?: string;
  /** One line, English, for the studio index. */
  line: string;
  kind: string;
  status: string;
  /** Mark shown in the index: an image path. */
  mark: string;
}

/** Every product the studio publishes, in the order the index lists them. */
export const studioApps: StudioApp[] = [
  {
    id: "notura",
    name: "Notura",
    href: "/notura/",
    privacyHref: "/notura/en/privacy/",
    line: "A nutrition tracker that shows what it could not determine.",
    kind: "Health · Android, iOS",
    status: "Coming soon",
    mark: "/favicon/notura-symbol.png",
  },
  {
    id: "momentback",
    name: "MomentBack",
    href: "/momentback/",
    privacyHref: "/momentback/privacy/",
    line: "A replay camera that keeps the last moments, so you save what already happened.",
    kind: "Camera · Android",
    status: "Coming soon",
    mark: "/momentback/mark.svg",
  },
  {
    id: "vergi-hesabim",
    name: "Vergi Hesabım",
    href: "/vergi-hesabim/",
    privacyHref: "/vergi-hesabim/privacy/",
    line: "Salary, VAT, vehicle tax and title-deed fees for Türkiye, worked out on your phone.",
    kind: "Finance · Android · Turkish",
    status: "Coming soon",
    mark: "/vergi-hesabim/icon-64.png",
  },
  {
    id: "999kb",
    name: "999KB Arcade",
    href: "/999kb/",
    privacyHref: "/999kb/privacy/",
    line: "One hundred games in an app smaller than one megabyte. Offline, no ads.",
    kind: "Games · Android",
    status: "Coming soon",
    mark: "/999kb/mark.svg",
  },
  {
    id: "jutsu",
    name: "Jutsu",
    href: "/jutsu/",
    privacyHref: "/jutsu/privacy/",
    line: "Make hand signs at the camera and watch the effect fire on screen.",
    kind: "Entertainment · Android",
    status: "Coming soon",
    mark: "/jutsu/icon-64.png",
  },
  {
    id: "mergekin",
    name: "MERGEKIN: Echo Defense",
    href: "/mergekin/",
    line: "A merge-and-defend strategy game. Page coming soon.",
    kind: "Games · Android",
    status: "In development",
    mark: "/studio/mergekin.svg",
  },
  {
    id: "kimo",
    name: "Kim O?",
    href: "/kimo/",
    line: "A guessing game about Turkish pop culture. Page coming soon.",
    kind: "Games · Android · Turkish",
    status: "In development",
    mark: "/studio/kimo.svg",
  },
];

export type AppLocale = "en" | "tr";

export interface PolicySection {
  id: string;
  heading: string;
  paragraphs: string[];
  list?: string[];
}

export interface GlanceRow {
  what: string;
  where: string;
  /** True when the information never leaves the device. */
  local: boolean;
}

export interface AppCopy {
  htmlLang: string;
  ogLocale: string;
  skip: string;
  nav: { features: string; privacy: string; contact: string; studio: string };
  languageSwitch: { label: string; href: string; hreflang: string; lang: string };
  home: {
    title: string;
    description: string;
    heading: string;
    lede: string;
    status: string;
    factsHeading: string;
    facts: { label: string; value: string }[];
    featuresHeading: string;
    features: { heading: string; body: string }[];
    privacyHeading: string;
    privacyBody: string[];
    privacyLink: string;
    developerHeading: string;
    developer: { publisher: string; platform: string; platformValue: string; contact: string; privacy: string };
  };
  privacy: {
    title: string;
    description: string;
    heading: string;
    effectiveLabel: string;
    effectiveDate: string;
    effectiveDateIso: string;
    intro: string;
    glanceHeading: string;
    glance: GlanceRow[];
    tocHeading: string;
    sections: PolicySection[];
    footnote: string;
  };
  footer: { line: string; studioLink: string; rights: string };
}

export interface AppPage {
  id: "999kb" | "jutsu";
  name: string;
  /** `/999kb/` style base; Turkish lives under `${base}tr/`. */
  base: string;
  icon: string;
  themeColor: string;
  copy: Record<AppLocale, AppCopy>;
}

export const appPath = (app: AppPage, locale: AppLocale, page: "home" | "privacy") =>
  `${app.base}${locale === "tr" ? "tr/" : ""}${page === "privacy" ? "privacy/" : ""}`;

/* ------------------------------------------------------------------ 999KB */

const kb999: AppPage = {
  id: "999kb",
  name: "999KB Arcade",
  base: "/999kb/",
  icon: "/999kb/mark.svg",
  themeColor: "#0A0C1E",
  copy: {
    en: {
      htmlLang: "en",
      ogLocale: "en_US",
      skip: "Skip to main content",
      nav: { features: "Games", privacy: "Privacy", contact: "Contact", studio: "Sarper Studios" },
      languageSwitch: { label: "Türkçe", href: "/999kb/tr/", hreflang: "tr", lang: "tr" },
      home: {
        title: "999KB Arcade — 100 games under one megabyte | Sarper Studios",
        description:
          "999KB Arcade is an Android collection of 100 offline mini games in an app smaller than one megabyte. No ads, no in-app purchases, no account, no internet permission.",
        heading: "One hundred games. Under one megabyte.",
        lede:
          "999KB Arcade is a collection of 100 mini games for Android, drawn in code with no image or sound files, in a release build that stays under 1,000,000 bytes. It works offline from the first launch.",
        status: "Not in the store yet. The Google Play link will appear here when the listing opens.",
        factsHeading: "At a glance",
        facts: [
          { label: "Games", value: "100" },
          { label: "Install size", value: "< 1 MB" },
          { label: "Languages", value: "12" },
          { label: "Ads", value: "None" },
          { label: "Internet", value: "Not used" },
        ],
        featuresHeading: "What is inside",
        features: [
          {
            heading: "Arcade, puzzle and board games",
            body:
              "Block Drop, Reversi, Connect Four, Parking Exit, Micro Drift, Pocket Defense, a 12-room dungeon crawler and many more, plus verified Sokoban, Nonogram, Sudoku and Hanoi puzzles.",
          },
          {
            heading: "Find, favourite, continue",
            body:
              "Discover, a full list with search and category filters, favourites, recently played, and continue where you left off in games that support saving.",
          },
          {
            heading: "Twelve languages",
            body:
              "English, Turkish, Spanish, Portuguese, German, French, Russian, Indonesian, Japanese, Korean, Hindi and Arabic, with right-to-left menus in Arabic. Every language works offline.",
          },
          {
            heading: "Paid once, nothing after",
            body:
              "A one-time paid download. No ads, no in-app purchases, no account and no network permission: the app cannot connect to the internet.",
          },
        ],
        privacyHeading: "Your games stay on your phone.",
        privacyBody: [
          "999KB Arcade does not ask for internet access, so it cannot send anything anywhere. High scores, saves, favourites and your language and sound settings are stored on the device.",
          "If Android backup is turned on, Android may include that one settings file in your Google account backup, so your progress survives a phone change.",
        ],
        privacyLink: "Read the full privacy policy",
        developerHeading: "Developer",
        developer: {
          publisher: "Publisher",
          platform: "Platform",
          platformValue: "Android · store listing not open yet",
          contact: "Contact",
          privacy: "Privacy",
        },
      },
      privacy: {
        title: "Privacy Policy — 999KB Arcade | Sarper Studios",
        description:
          "Privacy policy for the 999KB Arcade Android app: no internet permission, no ads, no account; game progress stays on the device.",
        heading: "Privacy Policy",
        effectiveLabel: "Effective",
        effectiveDate: "7 October 2026",
        effectiveDateIso: "2026-10-07",
        intro:
          "This policy explains how 999KB Arcade, an Android app published by Sarper Studios, handles information. The short version: the app has no internet permission, shows no ads, has no account and collects nothing about you.",
        glanceHeading: "At a glance: where is your information?",
        glance: [
          { what: "High scores, saves and favourites", where: "On your phone", local: true },
          { what: "Language and sound settings", where: "On your phone", local: true },
          { what: "Android backup of that settings file", where: "Your Google account, if backup is on", local: false },
          { what: "Purchase and download", where: "Google Play", local: false },
          { what: "Ads, analytics, tracking", where: "None", local: true },
        ],
        tocHeading: "Contents",
        sections: [
          {
            id: "collect",
            heading: "What we collect",
            paragraphs: [
              "Nothing. Sarper Studios does not receive any information from 999KB Arcade. The app does not request the Android internet permission, so it has no way to send data to us or to anyone else.",
              "The app contains no advertising SDK, no analytics, no crash reporting service and no account system.",
            ],
          },
          {
            id: "device",
            heading: "What stays on your device",
            paragraphs: [
              "To make the games work, the app stores the following in a single private settings file on your phone:",
            ],
            list: [
              "high scores and saved games in the games that support continuing",
              "your favourites and recently played games",
              "your language, sound and vibration preferences",
            ],
          },
          {
            id: "backup",
            heading: "Android backup",
            paragraphs: [
              "If you have turned on Android backup, Android can copy that one settings file to your Google account and restore it on a new phone. This is done by Android under your Google account settings, not by Sarper Studios, and we cannot see the backup. You can turn backup off in your phone's settings.",
            ],
          },
          {
            id: "permissions",
            heading: "Permissions",
            paragraphs: [
              "The only permission the app uses is vibration, for haptic feedback during play. It does not use the camera, microphone, location, contacts or storage.",
            ],
          },
          {
            id: "play",
            heading: "Google Play",
            paragraphs: [
              "999KB Arcade is sold as a one-time paid download through Google Play. Payment and download are handled by Google under Google's own privacy policy; Sarper Studios does not receive your payment details.",
            ],
          },
          {
            id: "delete",
            heading: "Deleting your data",
            paragraphs: [
              "Uninstalling the app, or clearing its storage in Android settings, deletes everything it stored on your phone. A copy in your Android backup is managed from your Google account.",
            ],
          },
          {
            id: "children",
            heading: "Children",
            paragraphs: [
              "Because the app collects no personal information from anyone, it collects none from children either.",
            ],
          },
          {
            id: "changes",
            heading: "Changes to this policy",
            paragraphs: [
              "If the app ever starts handling information differently, this page will be updated before that version is released, and the effective date above will change.",
            ],
          },
          {
            id: "contact",
            heading: "Contact",
            paragraphs: ["Questions about this policy can be sent to Sarper Studios:"],
          },
        ],
        footnote: "This policy applies to 999KB Arcade for Android, package com.kb999.game.",
      },
      footer: {
        line: "One hundred offline games in under one megabyte.",
        studioLink: "More from Sarper Studios",
        rights: "© 2026 Sarper Studios",
      },
    },
    tr: {
      htmlLang: "tr",
      ogLocale: "tr_TR",
      skip: "İçeriğe geç",
      nav: { features: "Oyunlar", privacy: "Gizlilik", contact: "İletişim", studio: "Sarper Studios" },
      languageSwitch: { label: "English", href: "/999kb/", hreflang: "en", lang: "en" },
      home: {
        title: "999KB Arcade — bir megabaytın altında 100 oyun | Sarper Studios",
        description:
          "999KB Arcade, bir megabayttan küçük bir uygulamada 100 çevrimdışı mini oyun sunan Android koleksiyonudur. Reklam, uygulama içi satın alma, hesap ve internet izni yok.",
        heading: "Yüz oyun. Bir megabaytın altında.",
        lede:
          "999KB Arcade, Android için 100 mini oyunluk bir koleksiyondur. Oyunlar görsel veya ses dosyası olmadan kodla çizilir; yayın sürümü 1.000.000 baytın altında kalır. İlk açılıştan itibaren internetsiz çalışır.",
        status: "Henüz mağazada değil. Google Play sayfası açıldığında bağlantısı burada yer alacak.",
        factsHeading: "Bir bakışta",
        facts: [
          { label: "Oyun", value: "100" },
          { label: "Kurulum boyutu", value: "< 1 MB" },
          { label: "Dil", value: "12" },
          { label: "Reklam", value: "Yok" },
          { label: "İnternet", value: "Kullanılmaz" },
        ],
        featuresHeading: "İçinde ne var",
        features: [
          {
            heading: "Arcade, bulmaca ve masa oyunları",
            body:
              "Block Drop, Reversi, Connect Four, Parking Exit, Micro Drift, Pocket Defense, 12 odalı bir zindan oyunu ve daha fazlası; ayrıca doğrulanmış Sokoban, Nonogram, Sudoku ve Hanoi bulmacaları.",
          },
          {
            heading: "Bul, favorile, devam et",
            body:
              "Keşfet, arama ve kategori filtreli tüm oyunlar listesi, favoriler, son oynananlar ve kayıt destekleyen oyunlarda kaldığın yerden devam.",
          },
          {
            heading: "On iki dil",
            body:
              "İngilizce, Türkçe, İspanyolca, Portekizce, Almanca, Fransızca, Rusça, Endonezce, Japonca, Korece, Hintçe ve Arapça; Arapçada menüler sağdan sola. Tüm diller internetsiz çalışır.",
          },
          {
            heading: "Bir kez öde, sonrası yok",
            body:
              "Tek seferlik ücretli indirme. Reklam, uygulama içi satın alma, hesap ve ağ izni yok: uygulama internete bağlanamaz.",
          },
        ],
        privacyHeading: "Oyunların telefonunda kalır.",
        privacyBody: [
          "999KB Arcade internet izni istemez; bu yüzden hiçbir yere bir şey gönderemez. Rekorlar, kayıtlar, favoriler, dil ve ses ayarların cihazda saklanır.",
          "Android yedeklemesi açıksa Android bu tek ayar dosyasını Google hesabındaki yedeğe ekleyebilir; böylece telefon değiştirince ilerlemen kaybolmaz.",
        ],
        privacyLink: "Gizlilik politikasının tamamını okuyun",
        developerHeading: "Geliştirici",
        developer: {
          publisher: "Yayıncı",
          platform: "Platform",
          platformValue: "Android · mağaza sayfası henüz yok",
          contact: "İletişim",
          privacy: "Gizlilik",
        },
      },
      privacy: {
        title: "Gizlilik Politikası — 999KB Arcade | Sarper Studios",
        description:
          "999KB Arcade Android uygulamasının gizlilik politikası: internet izni, reklam ve hesap yok; oyun ilerlemesi cihazda kalır.",
        heading: "Gizlilik Politikası",
        effectiveLabel: "Yürürlük tarihi",
        effectiveDate: "7 Ekim 2026",
        effectiveDateIso: "2026-10-07",
        intro:
          "Bu politika, Sarper Studios tarafından yayımlanan 999KB Arcade Android uygulamasının bilgileri nasıl ele aldığını açıklar. Kısaca: uygulamanın internet izni yoktur, reklam göstermez, hesap istemez ve sizinle ilgili hiçbir bilgi toplamaz.",
        glanceHeading: "Bir bakışta: bilgileriniz nerede?",
        glance: [
          { what: "Rekorlar, kayıtlar ve favoriler", where: "Telefonunuzda", local: true },
          { what: "Dil ve ses ayarları", where: "Telefonunuzda", local: true },
          { what: "Bu ayar dosyasının Android yedeği", where: "Yedekleme açıksa Google hesabınız", local: false },
          { what: "Satın alma ve indirme", where: "Google Play", local: false },
          { what: "Reklam, analiz, takip", where: "Yok", local: true },
        ],
        tocHeading: "İçindekiler",
        sections: [
          {
            id: "toplanan",
            heading: "Ne topluyoruz",
            paragraphs: [
              "Hiçbir şey. Sarper Studios, 999KB Arcade'den hiçbir bilgi almaz. Uygulama Android internet iznini istemez; bu nedenle bize veya başka birine veri gönderemez.",
              "Uygulamada reklam SDK'sı, analiz aracı, çökme raporlama servisi veya hesap sistemi yoktur.",
            ],
          },
          {
            id: "cihazda",
            heading: "Cihazınızda kalanlar",
            paragraphs: ["Oyunların çalışması için uygulama telefonunuzdaki tek bir özel ayar dosyasında şunları saklar:"],
            list: [
              "rekorlar ve devam etmeyi destekleyen oyunlardaki kayıtlar",
              "favorileriniz ve son oynadığınız oyunlar",
              "dil, ses ve titreşim tercihleriniz",
            ],
          },
          {
            id: "yedek",
            heading: "Android yedeklemesi",
            paragraphs: [
              "Android yedeklemesini açtıysanız Android bu tek ayar dosyasını Google hesabınıza kopyalayabilir ve yeni telefonda geri yükleyebilir. Bunu Sarper Studios değil, Google hesap ayarlarınıza göre Android yapar; yedeği göremeyiz. Yedeklemeyi telefon ayarlarından kapatabilirsiniz.",
            ],
          },
          {
            id: "izinler",
            heading: "İzinler",
            paragraphs: [
              "Uygulamanın kullandığı tek izin, oyun sırasında dokunsal geri bildirim için titreşimdir. Kamera, mikrofon, konum, rehber veya depolama kullanılmaz.",
            ],
          },
          {
            id: "play",
            heading: "Google Play",
            paragraphs: [
              "999KB Arcade, Google Play üzerinden tek seferlik ücretli indirme olarak satılır. Ödeme ve indirme Google tarafından, Google'ın kendi gizlilik politikasına göre yürütülür; Sarper Studios ödeme bilgilerinizi almaz.",
            ],
          },
          {
            id: "silme",
            heading: "Verilerinizi silmek",
            paragraphs: [
              "Uygulamayı kaldırmak veya Android ayarlarından depolamasını temizlemek, telefonunuzda sakladığı her şeyi siler. Android yedeğindeki kopya Google hesabınızdan yönetilir.",
            ],
          },
          {
            id: "cocuklar",
            heading: "Çocuklar",
            paragraphs: ["Uygulama kimseden kişisel bilgi toplamadığı için çocuklardan da toplamaz."],
          },
          {
            id: "degisiklik",
            heading: "Bu politikadaki değişiklikler",
            paragraphs: [
              "Uygulama bilgileri farklı ele almaya başlarsa bu sayfa o sürüm yayımlanmadan önce güncellenir ve yukarıdaki yürürlük tarihi değişir.",
            ],
          },
          {
            id: "iletisim",
            heading: "İletişim",
            paragraphs: ["Bu politikayla ilgili sorularınızı Sarper Studios'a gönderebilirsiniz:"],
          },
        ],
        footnote: "Bu politika, Android için 999KB Arcade uygulamasına (paket com.kb999.game) uygulanır.",
      },
      footer: {
        line: "Bir megabaytın altında yüz çevrimdışı oyun.",
        studioLink: "Sarper Studios'un diğer uygulamaları",
        rights: "© 2026 Sarper Studios",
      },
    },
  },
};

/* ------------------------------------------------------------------ Jutsu */

const jutsu: AppPage = {
  id: "jutsu",
  name: "Jutsu",
  base: "/jutsu/",
  icon: "/jutsu/icon-64.png",
  themeColor: "#0E0F13",
  copy: {
    en: {
      htmlLang: "en",
      ogLocale: "en_US",
      skip: "Skip to main content",
      nav: { features: "Features", privacy: "Privacy", contact: "Contact", studio: "Sarper Studios" },
      languageSwitch: { label: "Türkçe", href: "/jutsu/tr/", hreflang: "tr", lang: "tr" },
      home: {
        title: "Jutsu — hand signs in, effects out | Sarper Studios",
        description:
          "Jutsu is an Android app that recognises hand signs through the camera in real time and fires animated effects on screen. Camera images are processed on the device.",
        heading: "Make the hand signs. The camera does the rest.",
        lede:
          "Jutsu watches your hands through the front camera, recognises a sequence of hand signs in real time, and fires an animated effect on screen when the sequence is complete. Recognition runs on your phone.",
        status: "Not in the store yet. The Google Play link will appear here when the listing opens.",
        factsHeading: "At a glance",
        facts: [
          { label: "Techniques", value: "12" },
          { label: "Live effects", value: "11" },
          { label: "Recognition", value: "On device" },
          { label: "Price", value: "Free, with ads" },
        ],
        featuresHeading: "How it works",
        features: [
          {
            heading: "Sequences, not single poses",
            body:
              "Each technique is a short sequence of finger signs. The app tracks your hand landmarks frame by frame and follows the sequence step by step, so a technique fires only when the whole sequence is made.",
          },
          {
            heading: "Effects drawn live",
            body:
              "Fire, water, lightning, clones and more are drawn procedurally over the camera image as particles and light, reacting to where your hands and face are.",
          },
          {
            heading: "Record a clip",
            body:
              "Record a short clip of a technique, with the app's own sound, and save it to your gallery or share it. Recording only starts when you tap record and allow it.",
          },
          {
            heading: "Free, ad-supported",
            body:
              "The app is free and shows Google AdMob ads. Techniques are used within a daily allowance, and an optional rewarded ad gives you more.",
          },
        ],
        privacyHeading: "The camera image stays on your phone.",
        privacyBody: [
          "Hand, face and body recognition run on the device. Camera frames are not uploaded, stored or sent to Sarper Studios. Clips you record are saved to your phone and leave it only if you share them.",
          "Ads are provided by Google AdMob, which may use your device's advertising ID. No camera image or clip is ever part of an ad request.",
        ],
        privacyLink: "Read the full privacy policy",
        developerHeading: "Developer",
        developer: {
          publisher: "Publisher",
          platform: "Platform",
          platformValue: "Android · store listing not open yet",
          contact: "Contact",
          privacy: "Privacy",
        },
      },
      privacy: {
        title: "Privacy Policy — Jutsu | Sarper Studios",
        description:
          "Privacy policy for the Jutsu Android app: on-device camera recognition, clips saved on your phone, and Google AdMob ads.",
        heading: "Privacy Policy",
        effectiveLabel: "Effective",
        effectiveDate: "7 October 2026",
        effectiveDateIso: "2026-10-07",
        intro:
          "This policy explains how Jutsu, an Android app published by Sarper Studios, handles information. The app uses your camera to recognise hand signs; that recognition happens on your phone. The app has no account and does not ask you to sign in.",
        glanceHeading: "At a glance: where is your information?",
        glance: [
          { what: "Camera image and hand, face, body recognition", where: "On your phone, not stored", local: true },
          { what: "Recorded clips", where: "Your phone's gallery, until you share them", local: true },
          { what: "Settings and daily allowance", where: "On your phone", local: true },
          { what: "Ads", where: "Google AdMob · advertising ID", local: false },
          { what: "Camera images sent to us", where: "None", local: true },
        ],
        tocHeading: "Contents",
        sections: [
          {
            id: "camera",
            heading: "Camera",
            paragraphs: [
              "Jutsu needs the camera to see your hands. Each camera frame is analysed on your phone to find hand landmarks, and, for some effects, your face and the outline of your body. This uses on-device models (MediaPipe hand landmark detection, and Google ML Kit face detection and selfie segmentation running on the device).",
              "Camera frames are not uploaded, not stored and not sent to Sarper Studios or to anyone else. Once a frame has been analysed and drawn to the screen, it is discarded.",
            ],
          },
          {
            id: "clips",
            heading: "Recording clips",
            paragraphs: [
              "When you tap record, Android asks for your permission to capture the app's screen. The clip is recorded on your phone and saved to your device's video gallery. It leaves your phone only if you choose to share it, through the app you pick in the share sheet.",
              "The audio permission is used only to capture the app's own sound effects and music into the clip (Android's playback capture). The app does not record the microphone.",
            ],
          },
          {
            id: "device",
            heading: "What stays on your device",
            paragraphs: ["The app keeps the following on your phone so it works the way you left it:"],
            list: [
              "your settings and whether you have completed the introduction",
              "your sound, music, vibration and effect preferences",
              "your daily technique allowance",
            ],
          },
          {
            id: "ads",
            heading: "Advertising",
            paragraphs: [
              "Jutsu is free and shows ads provided by Google AdMob, including rewarded ads you can choose to watch. To show and measure ads, the Google Mobile Ads SDK may collect your device's advertising ID, IP address, device and app information, and ad interaction data. Google uses this under its own privacy policy, and may use it to personalise ads.",
              "No camera image, recognition result or recorded clip is ever part of an ad request. You can reset or delete your advertising ID, or opt out of ad personalisation, in your phone's Google or Privacy settings.",
            ],
          },
          {
            id: "share",
            heading: "What we do not do",
            paragraphs: [
              "Sarper Studios does not run its own servers for this app, does not collect your camera images or clips, does not create an account for you and does not sell information.",
            ],
          },
          {
            id: "delete",
            heading: "Deleting your data",
            paragraphs: [
              "Uninstalling the app, or clearing its storage in Android settings, deletes its settings and allowance. Clips you saved to your gallery stay there until you delete them, like any other video.",
            ],
          },
          {
            id: "children",
            heading: "Children",
            paragraphs: [
              "Jutsu is not directed at children under 13. If you believe a child has used the app in a way that concerns you, contact us at the address below.",
            ],
          },
          {
            id: "changes",
            heading: "Changes to this policy",
            paragraphs: [
              "If the app starts handling information differently, this page will be updated before that version is released, and the effective date above will change.",
            ],
          },
          {
            id: "contact",
            heading: "Contact",
            paragraphs: ["Questions about this policy can be sent to Sarper Studios:"],
          },
        ],
        footnote: "This policy applies to the Jutsu app for Android published by Sarper Studios.",
      },
      footer: {
        line: "Hand signs at the camera, effects on the screen.",
        studioLink: "More from Sarper Studios",
        rights: "© 2026 Sarper Studios",
      },
    },
    tr: {
      htmlLang: "tr",
      ogLocale: "tr_TR",
      skip: "İçeriğe geç",
      nav: { features: "Özellikler", privacy: "Gizlilik", contact: "İletişim", studio: "Sarper Studios" },
      languageSwitch: { label: "English", href: "/jutsu/", hreflang: "en", lang: "en" },
      home: {
        title: "Jutsu — el işaretini yap, efekti izle | Sarper Studios",
        description:
          "Jutsu, kamerayla el işaretlerini gerçek zamanlı tanıyıp ekranda animasyonlu efektler tetikleyen bir Android uygulamasıdır. Kamera görüntüsü cihazda işlenir.",
        heading: "El işaretlerini yap. Gerisini kamera halleder.",
        lede:
          "Jutsu, ön kamerayla ellerini izler, el işaretlerinden oluşan bir diziyi gerçek zamanlı tanır ve dizi tamamlanınca ekranda animasyonlu bir efekt tetikler. Tanıma telefonunda yapılır.",
        status: "Henüz mağazada değil. Google Play sayfası açıldığında bağlantısı burada yer alacak.",
        factsHeading: "Bir bakışta",
        facts: [
          { label: "Teknik", value: "12" },
          { label: "Canlı efekt", value: "11" },
          { label: "Tanıma", value: "Cihazda" },
          { label: "Fiyat", value: "Ücretsiz, reklamlı" },
        ],
        featuresHeading: "Nasıl çalışır",
        features: [
          {
            heading: "Tek poz değil, dizi",
            body:
              "Her teknik kısa bir parmak işaretleri dizisidir. Uygulama el noktalarını kare kare izler ve diziyi adım adım takip eder; teknik yalnızca dizinin tamamı yapıldığında tetiklenir.",
          },
          {
            heading: "Canlı çizilen efektler",
            body:
              "Ateş, su, yıldırım, klonlar ve daha fazlası, kamera görüntüsünün üzerine parçacık ve ışık olarak anlık çizilir; ellerinin ve yüzünün konumuna tepki verir.",
          },
          {
            heading: "Klip kaydet",
            body:
              "Bir tekniğin kısa klibini uygulamanın kendi sesiyle kaydet, galerine kaydet ya da paylaş. Kayıt yalnızca sen kayda basıp izin verdiğinde başlar.",
          },
          {
            heading: "Ücretsiz, reklamlı",
            body:
              "Uygulama ücretsizdir ve Google AdMob reklamları gösterir. Teknikler günlük hak içinde kullanılır; isteğe bağlı ödüllü reklam ek hak verir.",
          },
        ],
        privacyHeading: "Kamera görüntüsü telefonunda kalır.",
        privacyBody: [
          "El, yüz ve beden tanıma cihazda çalışır. Kamera kareleri yüklenmez, saklanmaz ve Sarper Studios'a gönderilmez. Kaydettiğin klipler telefonuna kaydedilir ve yalnızca sen paylaşırsan çıkar.",
          "Reklamlar Google AdMob tarafından sunulur ve cihazının reklam kimliğini kullanabilir. Hiçbir kamera görüntüsü veya klip reklam isteğine eklenmez.",
        ],
        privacyLink: "Gizlilik politikasının tamamını okuyun",
        developerHeading: "Geliştirici",
        developer: {
          publisher: "Yayıncı",
          platform: "Platform",
          platformValue: "Android · mağaza sayfası henüz yok",
          contact: "İletişim",
          privacy: "Gizlilik",
        },
      },
      privacy: {
        title: "Gizlilik Politikası — Jutsu | Sarper Studios",
        description:
          "Jutsu Android uygulamasının gizlilik politikası: cihazda kamera tanıma, telefonda saklanan klipler ve Google AdMob reklamları.",
        heading: "Gizlilik Politikası",
        effectiveLabel: "Yürürlük tarihi",
        effectiveDate: "7 Ekim 2026",
        effectiveDateIso: "2026-10-07",
        intro:
          "Bu politika, Sarper Studios tarafından yayımlanan Jutsu Android uygulamasının bilgileri nasıl ele aldığını açıklar. Uygulama el işaretlerini tanımak için kameranızı kullanır; bu tanıma telefonunuzda yapılır. Uygulama hesap açmanızı veya giriş yapmanızı istemez.",
        glanceHeading: "Bir bakışta: bilgileriniz nerede?",
        glance: [
          { what: "Kamera görüntüsü ve el, yüz, beden tanıma", where: "Telefonunuzda, saklanmaz", local: true },
          { what: "Kaydedilen klipler", where: "Paylaşana kadar telefon galeriniz", local: true },
          { what: "Ayarlar ve günlük hak", where: "Telefonunuzda", local: true },
          { what: "Reklamlar", where: "Google AdMob · reklam kimliği", local: false },
          { what: "Bize gönderilen kamera görüntüsü", where: "Yok", local: true },
        ],
        tocHeading: "İçindekiler",
        sections: [
          {
            id: "kamera",
            heading: "Kamera",
            paragraphs: [
              "Jutsu'nun ellerinizi görmesi için kamera gerekir. Her kamera karesi telefonunuzda analiz edilir: el noktaları ve bazı efektler için yüzünüz ile beden hattınız bulunur. Bunun için cihazda çalışan modeller kullanılır (MediaPipe el noktası algılama; cihazda çalışan Google ML Kit yüz algılama ve selfie segmentasyonu).",
              "Kamera kareleri yüklenmez, saklanmaz; Sarper Studios'a veya başka birine gönderilmez. Bir kare analiz edilip ekrana çizildikten sonra silinir.",
            ],
          },
          {
            id: "klipler",
            heading: "Klip kaydı",
            paragraphs: [
              "Kayda bastığınızda Android, uygulamanın ekranını kaydetmek için izninizi ister. Klip telefonunuzda kaydedilir ve cihazınızın video galerisine yazılır. Telefonunuzdan yalnızca siz paylaşmayı seçerseniz, paylaşım menüsünde seçtiğiniz uygulama üzerinden çıkar.",
              "Ses izni yalnızca uygulamanın kendi ses efektlerini ve müziğini klibe eklemek için kullanılır (Android oynatma yakalama). Uygulama mikrofonu kaydetmez.",
            ],
          },
          {
            id: "cihazda",
            heading: "Cihazınızda kalanlar",
            paragraphs: ["Uygulama, bıraktığınız gibi çalışması için şunları telefonunuzda tutar:"],
            list: [
              "ayarlarınız ve tanıtımı tamamlayıp tamamlamadığınız",
              "ses, müzik, titreşim ve efekt tercihleriniz",
              "günlük teknik hakkınız",
            ],
          },
          {
            id: "reklam",
            heading: "Reklam",
            paragraphs: [
              "Jutsu ücretsizdir ve izlemeyi seçebileceğiniz ödüllü reklamlar dahil Google AdMob reklamları gösterir. Reklamları göstermek ve ölçmek için Google Mobile Ads SDK'sı cihazınızın reklam kimliğini, IP adresini, cihaz ve uygulama bilgilerini ve reklam etkileşim verilerini toplayabilir. Google bunları kendi gizlilik politikasına göre kullanır ve reklamları kişiselleştirmek için kullanabilir.",
              "Hiçbir kamera görüntüsü, tanıma sonucu veya kaydedilen klip reklam isteğine eklenmez. Reklam kimliğinizi telefonunuzun Google veya Gizlilik ayarlarından sıfırlayabilir, silebilir ya da reklam kişiselleştirmesini kapatabilirsiniz.",
            ],
          },
          {
            id: "yapmadiklarimiz",
            heading: "Yapmadıklarımız",
            paragraphs: [
              "Sarper Studios bu uygulama için kendi sunucusunu çalıştırmaz, kamera görüntülerinizi veya kliplerinizi toplamaz, sizin için hesap açmaz ve bilgi satmaz.",
            ],
          },
          {
            id: "silme",
            heading: "Verilerinizi silmek",
            paragraphs: [
              "Uygulamayı kaldırmak veya Android ayarlarından depolamasını temizlemek ayarlarını ve günlük hakkını siler. Galerinize kaydettiğiniz klipler, diğer videolar gibi siz silene kadar orada kalır.",
            ],
          },
          {
            id: "cocuklar",
            heading: "Çocuklar",
            paragraphs: [
              "Jutsu 13 yaşın altındaki çocuklara yönelik değildir. Bir çocuğun uygulamayı sizi endişelendiren bir şekilde kullandığını düşünüyorsanız aşağıdaki adresten bize ulaşın.",
            ],
          },
          {
            id: "degisiklik",
            heading: "Bu politikadaki değişiklikler",
            paragraphs: [
              "Uygulama bilgileri farklı ele almaya başlarsa bu sayfa o sürüm yayımlanmadan önce güncellenir ve yukarıdaki yürürlük tarihi değişir.",
            ],
          },
          {
            id: "iletisim",
            heading: "İletişim",
            paragraphs: ["Bu politikayla ilgili sorularınızı Sarper Studios'a gönderebilirsiniz:"],
          },
        ],
        footnote: "Bu politika, Sarper Studios tarafından yayımlanan Android için Jutsu uygulamasına uygulanır.",
      },
      footer: {
        line: "Kameraya el işareti, ekrana efekt.",
        studioLink: "Sarper Studios'un diğer uygulamaları",
        rights: "© 2026 Sarper Studios",
      },
    },
  },
};

export const appPages = { "999kb": kb999, jutsu } as const;
