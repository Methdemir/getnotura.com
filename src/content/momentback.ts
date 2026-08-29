/**
 * Every word on the MomentBack surface.
 *
 * MomentBack is a sub-brand with its own dark identity and its own two-locale
 * routing (`/momentback/` and `/momentback/tr/`); it deliberately does not use
 * Notura's `src/i18n` translation dictionaries, because those are keyed for a
 * different product and a different locale set. Adding a third MomentBack
 * locale is one entry in `momentbackCopy` plus three thin page files.
 *
 * Product claims here are load-bearing: the privacy and terms text is written
 * against what apps/ReplayCamera actually does, not against a template. When
 * the app changes, this file changes with it.
 */

export type MomentBackLocale = "en" | "tr";

export const momentBackLocales = ["en", "tr"] as const;

export interface MomentBackLocaleMeta {
  id: MomentBackLocale;
  htmlLang: string;
  hreflang: string;
  ogLocale: string;
  nativeName: string;
  /** Path of the landing page for this locale. */
  base: string;
}

export const momentBackLocaleMeta: Record<MomentBackLocale, MomentBackLocaleMeta> = {
  en: {
    id: "en",
    htmlLang: "en",
    hreflang: "en",
    ogLocale: "en_US",
    nativeName: "English",
    base: "/momentback/",
  },
  tr: {
    id: "tr",
    htmlLang: "tr",
    hreflang: "tr",
    ogLocale: "tr_TR",
    nativeName: "Türkçe",
    base: "/momentback/tr/",
  },
};

export type MomentBackPage = "home" | "privacy" | "terms";

export function momentBackPath(locale: MomentBackLocale, page: MomentBackPage): string {
  const base = momentBackLocaleMeta[locale].base;
  return page === "home" ? base : `${base}${page}/`;
}

export interface Meta {
  title: string;
  description: string;
}

interface Step {
  index: string;
  label: string;
  title: string;
  body: string;
}

interface Moment {
  title: string;
  body: string;
}

interface SpecRow {
  label: string;
  value: string;
}

interface Fact {
  title: string;
  body: string;
}

interface Faq {
  question: string;
  answer: string;
}

interface TimelineLabels {
  caption: string;
  held: string;
  event: string;
  save: string;
  stop: string;
  clip: string;
  now: string;
  past: string;
  alt: string;
}

interface DeviceLabels {
  state: string;
  buffered: string;
  save: string;
  durations: string[];
  note: string;
}

export interface LegalSection {
  id: string;
  heading: string;
  paragraphs: string[];
}

export interface LegalCopy {
  meta: Meta;
  heading: string;
  intro: string;
  updated: string;
  contentsLabel: string;
  sections: LegalSection[];
}

export interface MomentBackCopy {
  localeName: string;
  skipToContent: string;
  nav: {
    label: string;
    how: string;
    moments: string;
    privacy: string;
    faq: string;
    languageLabel: string;
  };
  home: {
    meta: Meta;
    eyebrow: string;
    heading: string;
    lede: string;
    beat: string;
    cta: string;
    ctaNote: string;
    secondary: string;
    platform: string;
    device: DeviceLabels;
    how: {
      label: string;
      heading: string;
      body: string;
      steps: Step[];
      timeline: TimelineLabels;
    };
    moments: {
      label: string;
      heading: string;
      body: string;
      items: Moment[];
    };
    trust: {
      label: string;
      heading: string;
      body: string;
      items: Fact[];
      link: string;
    };
    spec: {
      label: string;
      heading: string;
      body: string;
      rows: SpecRow[];
      note: string;
    };
    faq: {
      label: string;
      heading: string;
      items: Faq[];
    };
    close: {
      heading: string;
      body: string;
    };
  };
  privacy: LegalCopy;
  terms: LegalCopy;
  footer: {
    tagline: string;
    legalLabel: string;
    privacy: string;
    terms: string;
    contactLabel: string;
    contactNote: string;
    noturaLabel: string;
    noturaLink: string;
    rights: string;
  };
}

const contactEmail = "support@getnotura.com";

const en: MomentBackCopy = {
  localeName: "English",
  skipToContent: "Skip to main content",
  nav: {
    label: "MomentBack",
    how: "How it works",
    moments: "Moments",
    privacy: "Privacy",
    faq: "FAQ",
    languageLabel: "Language",
  },
  home: {
    meta: {
      title: "MomentBack — Replay Camera for Android",
      description:
        "MomentBack holds the last seconds your camera has already seen. Press SAVE after the moment happens and it becomes a clip in your Gallery. No account, no cloud, Android.",
    },
    eyebrow: "Replay Camera · Android",
    heading: "Save the moment. After it happens.",
    lede:
      "You are always late to the record button. MomentBack keeps the last seconds of what the camera is already seeing, so the clip can start before you reacted.",
    beat: "Camera open. Moment happens. Tap SAVE.",
    cta: "Coming soon on Google Play",
    ctaNote: "Not published yet. This page goes live before the app does.",
    secondary: "See how it works",
    platform: "Android 10 and later · No account · Works offline",
    device: {
      state: "READY",
      buffered: "30s held",
      save: "SAVE",
      durations: ["15s", "30s", "60s", "120s"],
      note: "Interface diagram — not a screenshot.",
    },
    how: {
      label: "How it works",
      heading: "Open. Ready. Save.",
      body:
        "There is no session to start and no red button to remember. The camera arms itself, and the only decision left is whether the last few seconds were worth keeping.",
      steps: [
        {
          index: "01",
          label: "Open",
          title: "The camera arms itself",
          body:
            "Open MomentBack and capture begins. No mode to pick, no recording to start — point the phone at whatever you were going to watch anyway.",
        },
        {
          index: "02",
          label: "Ready",
          title: "The last seconds are held",
          body:
            "Your chosen replay length is kept on the device and continuously overwritten by newer seconds. It is not a file, it is not in your Gallery, and it belongs to no one but the app.",
        },
        {
          index: "03",
          label: "Save",
          title: "Press SAVE after the fact",
          body:
            "SAVE keeps everything already held and carries on filming until you press STOP. The finished MP4 lands in your Gallery, starting before the thing you were reacting to.",
        },
      ],
      timeline: {
        caption: "One press, two directions in time.",
        held: "Held on device · overwritten continuously",
        event: "The thing happens",
        save: "You press SAVE",
        stop: "STOP",
        clip: "Saved clip",
        now: "now",
        past: "earlier",
        alt:
          "A time axis. A band marks the last seconds continuously held on the device. A marker after the event marks the SAVE press, and the saved clip spans backwards across the held seconds and forwards to STOP.",
      },
    },
    moments: {
      label: "Moments",
      heading: "The moments nobody records in time",
      body:
        "None of these announce themselves. They are over in the second it takes to find a button, which is the entire reason this app exists.",
      items: [
        {
          title: "Kids and pets",
          body:
            "The first step, the jump off the sofa, the face they will never make again on request. By the time you have the camera recording, you are filming the aftermath.",
        },
        {
          title: "Sport and speed",
          body:
            "Skateboarding, cycling, fishing, the one run that finally works. Keep the camera up through all of it and decide afterwards which seconds were the good ones.",
        },
        {
          title: "Outdoors and the unexpected",
          body:
            "Lightning, wildlife, a wave, something falling over. You cannot predict the instant, so stop trying — hold the camera and reach for SAVE when it is already over.",
        },
      ],
    },
    trust: {
      label: "Privacy",
      heading: "Nothing leaves the phone",
      body:
        "A camera that is always watching has to be honest about where the picture goes. Here is exactly what MomentBack does, taken from the app's own source and its Android manifest.",
      items: [
        {
          title: "Nothing is saved until you press SAVE",
          body:
            "The held seconds live in the app's private storage, are overwritten continuously, and are discarded when capture stops. They never appear in your Gallery and no other app can read them.",
        },
        {
          title: "Clips are files on your phone",
          body:
            "SAVE writes one MP4 into Movies/MomentBack in your Gallery. From there it is an ordinary video: yours to keep, share or delete.",
        },
        {
          title: "No account, ever",
          body:
            "There is no sign-in, no email address, no profile and no identifier. Settings are a handful of values in the app's private storage.",
        },
        {
          title: "No internet permission at all",
          body:
            "The released Android build does not declare INTERNET. It cannot open a connection — not to us, not to anyone. There is no analytics SDK, no crash reporter and no advertising code in the app.",
        },
      ],
      link: "Read the full privacy policy",
    },
    spec: {
      label: "The app",
      heading: "What is in the app",
      body:
        "A camera-first utility with the controls a viewfinder needs and nothing else. No feed, no editor, no AI, no cloud library.",
      rows: [
        { label: "Replay length", value: "15 s and 30 s, free" },
        { label: "Longer replays", value: "60 s and 120 s, marked Pro — not for sale yet" },
        { label: "Video", value: "1080p30 standard · 720p30 efficient" },
        { label: "Camera", value: "Front and back · tap to focus · pinch to zoom" },
        { label: "Clips", value: "Everything MomentBack saved, in the app" },
        { label: "Requires", value: "Android 10 or later, phone, portrait" },
        { label: "Interface languages", value: "12" },
      ],
      note:
        "60 s and 120 s appear in the app with a Pro mark. There is no price, no purchase screen and no subscription in MomentBack today; if that changes, it will be a one-time unlock and this page and the terms will say so first.",
    },
    faq: {
      label: "Questions",
      heading: "Straight answers",
      items: [
        {
          question: "Does MomentBack save to my Gallery all the time?",
          answer:
            "No. While capture runs, the last seconds are held inside the app's own private storage and are continuously overwritten. A file appears in your Gallery only when you press SAVE. Stop without saving and the held seconds are discarded.",
        },
        {
          question: "Do I need internet or an account?",
          answer:
            "Neither. There is no sign-in of any kind, and the released Android build does not even hold the internet permission, so it has no way to send anything anywhere. Everything works in airplane mode.",
        },
        {
          question: "Where are clips saved?",
          answer:
            "In your device Gallery, in a Movies/MomentBack album, as standard MP4 files. The Clips screen inside the app lists the same files. MomentBack can only see the videos it created itself — it never asks to read your photo library.",
        },
        {
          question: "Does keeping the camera open drain the battery?",
          answer:
            "Yes, and we would rather say so. Camera, microphone and a hardware video encoder run the whole time capture is armed, and the phone can get warm. Capture keeps running when you switch apps or lock the screen, with an ongoing notification that has a STOP action. When you are done, stop it.",
        },
        {
          question: "Which replay lengths are available?",
          answer:
            "15 seconds and 30 seconds are the free lengths. 60 and 120 seconds are shown with a Pro mark for a possible future one-time unlock; nothing is on sale in the app right now.",
        },
      ],
    },
    close: {
      heading: "The camera is already watching. You only have to notice.",
      body:
        "MomentBack is being prepared for Google Play. This page is the product's home; the store link will appear here the day it exists.",
    },
  },
  privacy: {
    meta: {
      title: "Privacy Policy — MomentBack",
      description:
        "How MomentBack handles the camera, the microphone, the seconds it holds and the clips you save. No account, no cloud, and no internet permission in the released Android app.",
    },
    heading: "Privacy Policy",
    intro:
      "MomentBack is a camera that holds the last seconds of what it sees so that you can save them afterwards. That is an unusual thing for an app to do, so this notice is specific about it rather than generic.",
    updated: "Last updated: 29 August 2026",
    contentsLabel: "On this page",
    sections: [
      {
        id: "summary",
        heading: "In short",
        paragraphs: [
          "MomentBack runs on your phone. There is no account to create and no server behind it. The released Android app does not hold the internet permission, so it has no technical means to send a clip, a log or a setting anywhere.",
          "The camera and microphone run while capture is armed, which is what makes a replay possible. Those seconds are held in the app's own private storage and are continuously overwritten. Nothing becomes a file you or anyone else can open until you press SAVE.",
        ],
      },
      {
        id: "camera-microphone",
        heading: "Camera and microphone",
        paragraphs: [
          "MomentBack asks for camera and microphone access before it can do anything. Both are required rather than optional: the product records video with sound, and a replay without the audio of the moment is not the moment.",
          "Opening the app starts capture. Capture deliberately keeps running when you switch to another app or lock the screen, because the moments this app exists for do not wait for the screen to be on. Whenever it is running, Android shows an ongoing notification carrying a STOP action, and Android's own camera and microphone indicators are visible in the status bar.",
          "Capture ends when you press STOP in the app, use STOP in the notification, swipe MomentBack out of Recents, or force-stop it in Android settings. Nothing starts it again on its own: the app installs no boot receiver and sets no restart alarm.",
          "The notification permission is requested as well but is not required. Refusing it costs you the STOP button in the notification shade; it does not change what the camera does.",
        ],
      },
      {
        id: "held-seconds",
        heading: "The seconds being held",
        paragraphs: [
          "While capture runs, video and audio are encoded and written into short segments inside MomentBack's private application storage — a directory that belongs to the app alone and that other apps, and your Gallery, cannot read.",
          "Segments older than your chosen replay length are deleted continuously, and a size cap applies on top of that, so what is held stays bounded to the last 15, 30, 60 or 120 seconds. There is no growing archive.",
          "This material is never published anywhere by itself. If capture stops and you did not press SAVE, the whole spool is discarded. If the app is force-stopped or the phone loses power mid-session, what remains is app-private working data.",
        ],
      },
      {
        id: "saved-clips",
        heading: "Clips you save",
        paragraphs: [
          "When you press SAVE, MomentBack seals the seconds it was holding and keeps filming until you press STOP; both halves are written into a single MP4. The finished file is copied into your device's own media library under Movies/MomentBack, verified, and only then is the private working copy deleted.",
          "From that point the clip is an ordinary video on your phone. It appears in your Gallery, it is covered by whatever photo backup you have set up with Google or your device maker, and you can share or delete it like any other file. MomentBack has no further control over it and no copy of it.",
          "The Clips screen inside the app lists only the files MomentBack itself wrote to Movies/MomentBack. Android's scoped storage gives an app access to media it created without a media permission, which is why MomentBack never asks to read your photo library and cannot see any of your other videos.",
        ],
      },
      {
        id: "not-collected",
        heading: "What MomentBack does not do",
        paragraphs: [
          "No account. There is no sign-in, no email address, no profile and no identifier issued to you or to your device.",
          "No analytics, no crash-reporting service, no advertising or attribution SDK. The app's entire third-party dependency list is Flutter and its localisation package, the intl library, an icon font, and a small key-value store used for local settings.",
          "No network. The released Android build does not declare the INTERNET permission, so the operating system will not let it open a connection at all. Development builds carry that permission because Flutter's developer tooling needs it; those builds are not what is published.",
          "Diagnostic messages from the capture engine are written to the device's own Android log. They stay on the phone, are visible only to someone using Android developer tools on that phone, and are not read, collected or transmitted by MomentBack.",
        ],
      },
      {
        id: "settings",
        heading: "Settings kept on the device",
        paragraphs: [
          "Your replay length, video quality and language choice are stored in a small file in the app's private storage. They are values you chose rather than information about you, and they are not attached to any identifier.",
          "Android's own backup system may include app-private data such as that settings file in the device backup tied to your Google account. That backup is operated by Android and Google under your account settings, not by MomentBack. The folder where clips are staged before they reach your Gallery is deliberately excluded from it.",
        ],
      },
      {
        id: "store",
        heading: "The app store",
        paragraphs: [
          "MomentBack is being prepared for distribution on Google Play. Where you install an app from a store, that store records the installation and may collect platform-level information such as crash reports under its own policies and your account settings. That happens outside MomentBack, and the app neither requests nor receives it.",
        ],
      },
      {
        id: "control",
        heading: "Retention and your control",
        paragraphs: [
          "There is nothing for us to retain. No copy of any clip, any held second, any setting or any log exists anywhere other than on your phone.",
          "You can revoke camera or microphone access in Android settings at any time, which stops capture. You can delete any clip from the Clips screen or from your Gallery. Uninstalling MomentBack removes the app and its private storage; clips already saved to Movies/MomentBack stay in your Gallery, because they are your files, not the app's.",
        ],
      },
      {
        id: "children",
        heading: "Children",
        paragraphs: [
          "MomentBack is a general-purpose camera utility and is not directed at children. It collects no personal information from anyone, and therefore none from children. Any minimum age applied by the app store you install from also applies.",
        ],
      },
      {
        id: "changes-contact",
        heading: "Changes and contact",
        paragraphs: [
          "If MomentBack's behaviour changes in a way that affects this notice — the most likely change being a one-time paid unlock, which would introduce a purchase handled by the app store — this page will be updated before that version ships, and the date at the top will change with it.",
          `Questions about this notice can be sent to ${contactEmail}.`,
        ],
      },
    ],
  },
  terms: {
    meta: {
      title: "Terms of Use — MomentBack",
      description:
        "The terms for using MomentBack, the replay camera for Android: your licence, your responsibilities when recording, device and battery realities, and what the app does not promise.",
    },
    heading: "Terms of Use",
    intro:
      "These terms cover MomentBack, an Android camera app that holds the last seconds it sees so you can save them after the fact. They are written to be read, not to be scrolled past.",
    updated: "Last updated: 29 August 2026",
    contentsLabel: "On this page",
    sections: [
      {
        id: "acceptance",
        heading: "Accepting these terms",
        paragraphs: [
          "By installing or using MomentBack you agree to these terms. If you do not agree with them, do not install or use the app.",
          "The rules of the app store you installed from apply alongside these terms. Where a store rule and a term here conflict for a purchase or a refund, the store's rule governs that purchase.",
        ],
      },
      {
        id: "licence",
        heading: "Your licence",
        paragraphs: [
          "You are granted a personal, non-exclusive, non-transferable and revocable licence to install and use MomentBack on devices you control, for your own use. This is a licence to use the app, not a sale of it.",
          "You may not redistribute, resell, sublicense or rent the app, or attempt to decompile, reverse engineer or derive its source code, except to the extent that applicable law expressly permits it despite this restriction.",
        ],
      },
      {
        id: "your-responsibility",
        heading: "Recording is your responsibility",
        paragraphs: [
          "MomentBack is a camera. What you point it at, when you record, and what you do with the resulting clip are entirely your decisions and your responsibility.",
          "Laws about filming people, recording audio and consent differ significantly between countries and even between regions of the same country, and they can differ again for private property, workplaces, schools and public transport. You are responsible for knowing and following the rules that apply where you are.",
          "Do not use MomentBack to record where recording is prohibited, to harass, stalk, intimidate or covertly monitor anyone, or in any other way that is unlawful or infringes another person's rights.",
        ],
      },
      {
        id: "permissions",
        heading: "Camera, microphone and device permissions",
        paragraphs: [
          "MomentBack needs camera and microphone access to work at all, and asks for notification access so it can show the ongoing capture notice and its STOP action. You grant these through Android and can withdraw them at any time in Android settings; withdrawing camera or microphone access stops capture.",
          "While capture is armed, it continues when the app is in the background and when the screen is locked, until you stop it. The ongoing notification and Android's own camera and microphone indicators exist so that this is never invisible to you.",
        ],
      },
      {
        id: "devices",
        heading: "Devices, Android versions and results",
        paragraphs: [
          "MomentBack requires Android 10 or later and is built for phones in portrait orientation. It is not offered for tablets, foldable large-screen layouts, televisions or desktop environments.",
          "What the app can actually deliver depends on your hardware. Video encoders differ between phones, and a device that cannot sustain the selected resolution or frame rate will be given a lower one; the app reports the setting you chose separately from what the hardware delivered rather than silently rewriting your choice.",
          "Some limits come from the video format itself rather than from the device. A single clip carries one orientation, so turning the phone during a session trims the replay back to the turn. Free storage is also a hard limit: capture can be ended automatically when the device is close to running out of space, so that the clip in progress can still be written.",
        ],
      },
      {
        id: "battery",
        heading: "Battery and heat",
        paragraphs: [
          "Holding a replay means the camera, the microphone and a hardware video encoder run continuously. That uses noticeably more battery than an idle phone and can make the device warm; Android's own thermal management may then reduce performance.",
          "This is inherent to what the app does, not a defect. Stop capture when you no longer need it.",
        ],
      },
      {
        id: "not-a-security-system",
        heading: "What MomentBack is not",
        paragraphs: [
          "MomentBack is a consumer camera utility for capturing moments you would otherwise miss. It is not a security system, a dashcam, a continuous surveillance recorder, a body camera or an evidence-grade recording system, and it is not sold, described or supported as any of those.",
          "No guarantee is made that any particular moment will be captured, that a session will not be interrupted by the operating system, another app, a permission change, a thermal event, low storage or a low battery, or that a given file will be produced or be free of defects. Do not rely on MomentBack in situations where failing to capture something would cause harm, loss or legal disadvantage.",
        ],
      },
      {
        id: "your-content",
        heading: "Your clips are yours",
        paragraphs: [
          "You keep every right in what you record. MomentBack claims no ownership of and no licence over your clips, and no copy of them reaches us: saved clips are written to your device's own media library and the app has no network access to send them anywhere.",
        ],
      },
      {
        id: "intellectual-property",
        heading: "Intellectual property",
        paragraphs: [
          "MomentBack — including the application, its name, its interface design and this website — is protected by intellectual property rights and remains the property of its developer and its licensors. Nothing in these terms transfers any of those rights to you.",
        ],
      },
      {
        id: "liability",
        heading: "Liability",
        paragraphs: [
          "MomentBack is provided “as is” and “as available”. To the fullest extent permitted by applicable law, no warranty is given that it will be uninterrupted, error-free or fit for a particular purpose.",
          "To the fullest extent permitted by applicable law, no liability is accepted for indirect or consequential loss, for footage that was not captured, was lost, was incomplete or was deleted, or for loss of data or storage on your device. Nothing in these terms limits liability that cannot lawfully be limited, and your mandatory consumer rights are unaffected.",
        ],
      },
      {
        id: "purchases",
        heading: "Future paid features",
        paragraphs: [
          "MomentBack currently sells nothing. There is no price, no subscription, no in-app purchase and no payment screen in the app, and no payment details are ever collected by it.",
          "The 60-second and 120-second replay lengths are marked as Pro in the interface for a possible future one-time unlock. If purchasing is ever introduced, the price and the payment terms will be shown before any purchase, the transaction will be handled by the app store and governed by that store's purchase and refund rules, and these terms will be updated to cover it before that version ships.",
        ],
      },
      {
        id: "changes-contact",
        heading: "Changes and contact",
        paragraphs: [
          "These terms may be updated as MomentBack changes. The current version and its date are always shown on this page. If you do not accept an updated version, stop using the app and uninstall it.",
          `Questions about these terms can be sent to ${contactEmail}.`,
        ],
      },
    ],
  },
  footer: {
    tagline: "A replay camera for Android. Save the moment after it happens.",
    legalLabel: "Legal",
    privacy: "Privacy Policy",
    terms: "Terms of Use",
    contactLabel: "Contact",
    contactNote: "Support and privacy questions",
    noturaLabel: "Also from us",
    noturaLink: "Notura",
    rights: "© 2026 MomentBack. All rights reserved.",
  },
};

const tr: MomentBackCopy = {
  localeName: "Türkçe",
  skipToContent: "Ana içeriğe geç",
  nav: {
    label: "MomentBack",
    how: "Nasıl çalışır",
    moments: "Anlar",
    privacy: "Gizlilik",
    faq: "SSS",
    languageLabel: "Dil",
  },
  home: {
    meta: {
      title: "MomentBack — Android için Replay Camera",
      description:
        "MomentBack, kameranın çoktan gördüğü son saniyeleri tutar. An yaşandıktan sonra SAVE'e basarsınız, klip Galeri'ye kaydedilir. Hesap yok, bulut yok, Android.",
    },
    // Already uppercase: these render through text-transform, and Turkish
    // casing would turn the English product names into ANDROİD / CLİPS.
    eyebrow: "REPLAY CAMERA · ANDROID",
    heading: "Anı kaydet. Yaşandıktan sonra.",
    lede:
      "Kayıt tuşuna hep geç kalırsınız. MomentBack, kameranın zaten gördüğü son saniyeleri tutar; böylece klip siz tepki vermeden önce başlayabilir.",
    beat: "Kamera açık. An yaşanır. SAVE'e dokun.",
    cta: "Yakında Google Play'de",
    ctaNote: "Henüz yayında değil. Bu sayfa uygulamadan önce açılıyor.",
    secondary: "Nasıl çalıştığına bak",
    platform: "Android 10 ve üzeri · Hesap yok · Çevrimdışı çalışır",
    device: {
      state: "HAZIR",
      buffered: "30 sn tutuluyor",
      save: "SAVE",
      durations: ["15 sn", "30 sn", "60 sn", "120 sn"],
      note: "Arayüz şeması — ekran görüntüsü değil.",
    },
    how: {
      label: "Nasıl çalışır",
      heading: "Aç. Hazır. Kaydet.",
      body:
        "Başlatılacak bir oturum, hatırlanması gereken kırmızı bir tuş yok. Kamera kendi kendine hazırlanır; geriye tek bir karar kalır: son birkaç saniye saklamaya değer miydi?",
      steps: [
        {
          index: "01",
          label: "Aç",
          title: "Kamera kendini hazırlar",
          body:
            "MomentBack'i açarsınız, capture başlar. Seçilecek mod, başlatılacak kayıt yok — telefonu zaten izleyeceğiniz şeye doğrultun.",
        },
        {
          index: "02",
          label: "Hazır",
          title: "Son saniyeler tutulur",
          body:
            "Seçtiğiniz replay süresi cihazda tutulur ve sürekli olarak yeni saniyelerle değiştirilir. Bu bir dosya değildir, Galeri'de görünmez, uygulamanın kendi özel alanının dışına çıkmaz.",
        },
        {
          index: "03",
          label: "Kaydet",
          title: "Olan bitenden sonra SAVE",
          body:
            "SAVE, o ana kadar tutulan her şeyi saklar ve siz STOP'a basana dek çekmeye devam eder. Biten MP4, tepki verdiğiniz olaydan önce başlayarak Galeri'ye düşer.",
        },
      ],
      timeline: {
        caption: "Tek bir dokunuş, zamanda iki yön.",
        held: "Cihazda tutulur · sürekli üzerine yazılır",
        event: "Olay yaşanır",
        save: "SAVE'e basarsınız",
        stop: "STOP",
        clip: "Kaydedilen klip",
        now: "şimdi",
        past: "önce",
        alt:
          "Bir zaman ekseni. Bir bant, cihazda sürekli tutulan son saniyeleri gösterir. Olaydan sonraki bir işaret SAVE anını gösterir; kaydedilen klip geriye doğru tutulan saniyeleri, ileriye doğru STOP'a kadarki bölümü kapsar.",
      },
    },
    moments: {
      label: "Anlar",
      heading: "Kimsenin zamanında kaydedemediği anlar",
      body:
        "Hiçbiri önceden haber vermez. Tuşu bulana kadar biter — bu uygulamanın var olma sebebi tam olarak budur.",
      items: [
        {
          title: "Çocuk ve evcil hayvan",
          body:
            "İlk adım, koltuktan atlayış, isteyince bir daha asla yapmayacağı o surat. Siz kaydı başlattığınızda artık sonrasını çekiyorsunuzdur.",
        },
        {
          title: "Spor ve hız",
          body:
            "Kaykay, bisiklet, balık tutma, sonunda tutan o tek deneme. Kamerayı boyunca açık tutun, hangi saniyelerin iyi olduğuna sonra karar verin.",
        },
        {
          title: "Dışarısı ve beklenmedik olan",
          body:
            "Yıldırım, vahşi yaşam, bir dalga, devrilen bir şey. Anı tahmin edemezsiniz; etmeyi bırakın — kamerayı tutun, iş bittikten sonra SAVE'e uzanın.",
        },
      ],
    },
    trust: {
      label: "Gizlilik",
      heading: "Hiçbir şey telefondan çıkmaz",
      body:
        "Sürekli izleyen bir kamera, görüntünün nereye gittiği konusunda dürüst olmak zorundadır. MomentBack'in tam olarak ne yaptığı aşağıda — uygulamanın kendi kaynak kodundan ve Android manifest'inden alındı.",
      items: [
        {
          title: "SAVE'e basmadan hiçbir şey kaydedilmez",
          body:
            "Tutulan saniyeler uygulamanın özel alanında durur, sürekli üzerine yazılır ve capture durduğunda atılır. Galeri'de hiç görünmezler, başka hiçbir uygulama okuyamaz.",
        },
        {
          title: "Klipler telefonunuzdaki dosyalardır",
          body:
            "SAVE, Galeri'nizdeki Movies/MomentBack klasörüne tek bir MP4 yazar. O andan itibaren sıradan bir videodur: saklamak, paylaşmak, silmek size kalmıştır.",
        },
        {
          title: "Hesap yok, hiç olmadı",
          body:
            "Giriş, e-posta, profil, size verilen bir kimlik yok. Ayarlar yalnızca uygulamanın özel alanındaki birkaç değerden ibarettir.",
        },
        {
          title: "İnternet izni hiç yok",
          body:
            "Yayınlanan Android sürümü INTERNET iznini hiç talep etmez. Bağlantı açamaz — ne bize, ne başkasına. Uygulamada analytics SDK'sı, çökme raporlayıcı veya reklam kodu bulunmaz.",
        },
      ],
      link: "Gizlilik politikasının tamamını oku",
    },
    spec: {
      label: "Uygulama",
      heading: "Uygulamada ne var",
      body:
        "Bir vizörün ihtiyaç duyduğu kontroller ve fazlası olmayan, kamera öncelikli bir araç. Akış yok, editör yok, yapay zekâ yok, bulut kitaplığı yok.",
      rows: [
        { label: "Replay süresi", value: "15 sn ve 30 sn, ücretsiz" },
        { label: "Uzun replay", value: "60 sn ve 120 sn, Pro işaretli — henüz satışta değil" },
        { label: "Video", value: "1080p30 standart · 720p30 verimli" },
        { label: "Kamera", value: "Ön ve arka · dokunarak odak · sıkıştırarak yakınlaştırma" },
        { label: "CLIPS", value: "MomentBack'in kaydettiği her şey, uygulamanın içinde" },
        { label: "Gereksinim", value: "Android 10 veya üzeri, telefon, dikey" },
        { label: "Arayüz dili", value: "12" },
      ],
      note:
        "60 sn ve 120 sn uygulamada Pro işaretiyle görünür. Bugün MomentBack'te fiyat, satın alma ekranı veya abonelik yoktur; bu değişirse tek seferlik bir açılım olacak ve önce bu sayfa ile kullanım koşulları bunu yazacak.",
    },
    faq: {
      label: "Sorular",
      heading: "Net cevaplar",
      items: [
        {
          question: "MomentBack sürekli Galeri'ye mi kaydeder?",
          answer:
            "Hayır. Capture çalışırken son saniyeler uygulamanın kendi özel alanında tutulur ve sürekli üzerine yazılır. Galeri'de bir dosya ancak siz SAVE'e bastığınızda oluşur. Kaydetmeden durdurursanız tutulan saniyeler atılır.",
        },
        {
          question: "İnternet veya hesap gerekiyor mu?",
          answer:
            "İkisi de gerekmiyor. Hiçbir giriş yöntemi yok; dahası yayınlanan Android sürümü internet iznine bile sahip değil, dolayısıyla hiçbir şeyi hiçbir yere gönderemez. Uçak modunda da her şey çalışır.",
        },
        {
          question: "Klipler nereye kaydedilir?",
          answer:
            "Cihazınızın Galeri'sine, Movies/MomentBack albümüne, standart MP4 dosyaları olarak. Uygulamadaki Clips ekranı aynı dosyaları listeler. MomentBack yalnızca kendi oluşturduğu videoları görebilir; fotoğraf kitaplığınızı okumak için izin istemez.",
        },
        {
          question: "Kamera açıkken batarya tüketir mi?",
          answer:
            "Evet, ve bunu söylemeyi tercih ederiz. Capture hazırken kamera, mikrofon ve donanımsal video kodlayıcı sürekli çalışır; telefon ısınabilir. Başka uygulamaya geçtiğinizde veya ekranı kilitlediğinizde capture devam eder ve bildirimde STOP eylemi bulunur. İşiniz bittiğinde durdurun.",
        },
        {
          question: "Hangi replay süreleri var?",
          answer:
            "15 saniye ve 30 saniye ücretsiz sürelerdir. 60 ve 120 saniye, ileride olası tek seferlik bir açılım için Pro işaretiyle görünür; şu anda uygulamada satışta olan hiçbir şey yok.",
        },
      ],
    },
    close: {
      heading: "Kamera zaten izliyor. Sizin yalnızca fark etmeniz gerekiyor.",
      body:
        "MomentBack, Google Play için hazırlanıyor. Bu sayfa ürünün evi; mağaza bağlantısı var olduğu gün burada belirecek.",
    },
  },
  privacy: {
    meta: {
      title: "Gizlilik Politikası — MomentBack",
      description:
        "MomentBack'in kamerayı, mikrofonu, tuttuğu saniyeleri ve kaydettiğiniz klipleri nasıl ele aldığı. Hesap yok, bulut yok ve yayınlanan Android uygulamasında internet izni yok.",
    },
    heading: "Gizlilik Politikası",
    intro:
      "MomentBack, gördüğü son saniyeleri tutan ve bunları sonradan kaydetmenizi sağlayan bir kameradır. Bir uygulama için alışılmadık bir davranış olduğundan, bu bildirim genel geçer değil, bu davranışa özgü yazılmıştır.",
    updated: "Son güncelleme: 29 Ağustos 2026",
    contentsLabel: "Bu sayfada",
    sections: [
      {
        id: "summary",
        heading: "Kısaca",
        paragraphs: [
          "MomentBack telefonunuzda çalışır. Oluşturulacak bir hesap ve arkasında bir sunucu yoktur. Yayınlanan Android uygulaması internet iznine sahip değildir; dolayısıyla bir klibi, bir günlüğü veya bir ayarı herhangi bir yere gönderecek teknik imkânı yoktur.",
          "Capture hazırken kamera ve mikrofon çalışır; replay'i mümkün kılan şey budur. Bu saniyeler uygulamanın kendi özel alanında tutulur ve sürekli olarak üzerine yazılır. Siz SAVE'e basana kadar hiçbir şey, sizin ya da bir başkasının açabileceği bir dosyaya dönüşmez.",
        ],
      },
      {
        id: "camera-microphone",
        heading: "Kamera ve mikrofon",
        paragraphs: [
          "MomentBack, herhangi bir şey yapabilmek için önce kamera ve mikrofon erişimi ister. İkisi de isteğe bağlı değil, zorunludur: ürün sesli video kaydeder ve anın sesi olmayan bir replay, o an değildir.",
          "Uygulamayı açmak capture'ı başlatır. Başka bir uygulamaya geçtiğinizde veya ekranı kilitlediğinizde capture bilerek çalışmaya devam eder; çünkü bu uygulamanın var olduğu anlar, ekranın açık olmasını beklemez. Çalıştığı sürece Android, STOP eylemi taşıyan kalıcı bir bildirim gösterir ve Android'in kendi kamera ile mikrofon göstergeleri durum çubuğunda görünür.",
          "Capture; uygulamada STOP'a bastığınızda, bildirimdeki STOP'u kullandığınızda, MomentBack'i son kullanılanlardan kaydırıp attığınızda veya Android ayarlarından zorla durdurduğunuzda sona erer. Hiçbir şey onu kendiliğinden yeniden başlatmaz: uygulama açılışta çalışan bir bileşen kurmaz ve yeniden başlatma alarmı kurmaz.",
          "Bildirim izni de istenir ama zorunlu değildir. Reddetmeniz size yalnızca bildirim panelindeki STOP düğmesine mal olur; kameranın davranışını değiştirmez.",
        ],
      },
      {
        id: "held-seconds",
        heading: "Tutulan saniyeler",
        paragraphs: [
          "Capture çalışırken video ve ses kodlanır ve MomentBack'in özel uygulama alanındaki kısa parçalara yazılır — yalnızca uygulamaya ait olan, diğer uygulamaların ve Galeri'nin okuyamadığı bir dizindir.",
          "Seçtiğiniz replay süresinden eski parçalar sürekli silinir, üstüne bir de boyut sınırı uygulanır; böylece tutulan şey son 15, 30, 60 veya 120 saniyeyle sınırlı kalır. Büyüyen bir arşiv yoktur.",
          "Bu malzeme kendi başına hiçbir yere kaydedilmez. Capture durduğunda SAVE'e basmamışsanız tutulan her şey atılır. Uygulama zorla durdurulursa veya telefonun gücü kesilirse geriye kalan, uygulamaya özel geçici çalışma verisidir.",
        ],
      },
      {
        id: "saved-clips",
        heading: "Kaydettiğiniz klipler",
        paragraphs: [
          "SAVE'e bastığınızda MomentBack tuttuğu saniyeleri mühürler ve siz STOP'a basana kadar çekmeye devam eder; iki yarı tek bir MP4 dosyasına yazılır. Biten dosya, cihazınızın kendi medya kitaplığına Movies/MomentBack altına kopyalanır, doğrulanır ve ancak ondan sonra özel çalışma kopyası silinir.",
          "O andan itibaren klip, telefonunuzdaki sıradan bir videodur. Galeri'nizde görünür; Google veya cihaz üreticinizle kurduğunuz fotoğraf yedeklemesi kapsamına girer; diğer dosyalar gibi paylaşabilir veya silebilirsiniz. MomentBack'in o dosya üzerinde başka bir denetimi ve bir kopyası yoktur.",
          "Uygulamadaki Clips ekranı yalnızca MomentBack'in kendi yazdığı Movies/MomentBack dosyalarını listeler. Android'in kapsamlı depolama modeli, bir uygulamaya kendi oluşturduğu medyaya izin gerekmeden erişim verir; MomentBack'in fotoğraf kitaplığınızı okumak için hiç izin istememesinin ve diğer videolarınızı görememesinin sebebi budur.",
        ],
      },
      {
        id: "not-collected",
        heading: "MomentBack'in yapmadıkları",
        paragraphs: [
          "Hesap yok. Giriş, e-posta adresi, profil ve size ya da cihazınıza verilmiş bir kimlik yoktur.",
          "Analytics yok, çökme raporlama hizmeti yok, reklam veya atıf SDK'sı yok. Uygulamanın üçüncü taraf bağımlılıklarının tamamı Flutter ve yerelleştirme paketi, intl kütüphanesi, bir simge yazı tipi ve yerel ayarlar için kullanılan küçük bir anahtar-değer deposundan ibarettir.",
          "Ağ yok. Yayınlanan Android sürümü INTERNET iznini bildirmez; bu yüzden işletim sistemi onun bağlantı açmasına izin vermez. Geliştirme sürümleri bu izni taşır çünkü Flutter'ın geliştirici araçları buna ihtiyaç duyar; yayınlanan sürüm o sürüm değildir.",
          "Capture motorunun tanılama mesajları cihazın kendi Android günlüğüne yazılır. Telefonda kalır, yalnızca o telefonda Android geliştirici araçlarını kullanan birine görünür ve MomentBack tarafından okunmaz, toplanmaz, iletilmez.",
        ],
      },
      {
        id: "settings",
        heading: "Cihazda tutulan ayarlar",
        paragraphs: [
          "Replay süresi, video kalitesi ve dil tercihiniz uygulamanın özel alanındaki küçük bir dosyada saklanır. Bunlar sizin hakkınızdaki bilgiler değil, sizin seçtiğiniz değerlerdir ve hiçbir kimlikle ilişkilendirilmez.",
          "Android'in kendi yedekleme sistemi, bu ayar dosyası gibi uygulamaya özel verileri Google hesabınıza bağlı cihaz yedeklemesine dahil edebilir. Bu yedekleme, MomentBack tarafından değil, hesap ayarlarınız kapsamında Android ve Google tarafından yürütülür. Kliplerin Galeri'ye ulaşmadan önce beklediği klasör bu yedeklemenin dışında bırakılmıştır.",
        ],
      },
      {
        id: "store",
        heading: "Uygulama mağazası",
        paragraphs: [
          "MomentBack, Google Play üzerinden dağıtım için hazırlanmaktadır. Bir uygulamayı mağazadan kurduğunuzda, o mağaza kurulumu kaydeder ve kendi politikaları ile hesap ayarlarınız kapsamında çökme raporu gibi platform düzeyinde bilgiler toplayabilir. Bu, MomentBack'in dışında gerçekleşir; uygulama bunu ne talep eder ne de alır.",
        ],
      },
      {
        id: "control",
        heading: "Saklama ve sizin denetiminiz",
        paragraphs: [
          "Bizim saklayacağımız bir şey yok. Hiçbir klibin, tutulan hiçbir saniyenin, hiçbir ayarın ve hiçbir günlüğün telefonunuz dışında bir kopyası bulunmuyor.",
          "Kamera veya mikrofon erişimini Android ayarlarından istediğiniz zaman geri alabilirsiniz; bu capture'ı durdurur. Her klibi Clips ekranından veya Galeri'den silebilirsiniz. MomentBack'i kaldırmak uygulamayı ve özel alanını siler; Movies/MomentBack içine kaydedilmiş klipler Galeri'nizde kalır, çünkü onlar uygulamanın değil sizin dosyalarınızdır.",
        ],
      },
      {
        id: "children",
        heading: "Çocuklar",
        paragraphs: [
          "MomentBack genel amaçlı bir kamera aracıdır ve çocuklara yönelik değildir. Hiç kimseden kişisel bilgi toplamaz, dolayısıyla çocuklardan da toplamaz. Uygulamayı kurduğunuz mağazanın uyguladığı yaş sınırı ayrıca geçerlidir.",
        ],
      },
      {
        id: "changes-contact",
        heading: "Değişiklikler ve iletişim",
        paragraphs: [
          "MomentBack'in davranışı bu bildirimi etkileyecek şekilde değişirse — en olası değişiklik, mağaza tarafından yürütülen tek seferlik ücretli bir açılım olurdu — bu sayfa o sürüm yayınlanmadan önce güncellenir ve üstteki tarih onunla birlikte değişir.",
          `Bu bildirimle ilgili sorularınızı ${contactEmail} adresine iletebilirsiniz.`,
        ],
      },
    ],
  },
  terms: {
    meta: {
      title: "Kullanım Koşulları — MomentBack",
      description:
        "Android için replay kamera MomentBack'in kullanım koşulları: lisansınız, kayıt sırasındaki sorumluluklarınız, cihaz ve batarya gerçekleri ve uygulamanın vaat etmedikleri.",
    },
    heading: "Kullanım Koşulları",
    intro:
      "Bu koşullar, gördüğü son saniyeleri tutarak onları sonradan kaydetmenizi sağlayan Android kamera uygulaması MomentBack için geçerlidir. Kaydırılıp geçilsin diye değil, okunsun diye yazıldı.",
    updated: "Son güncelleme: 29 Ağustos 2026",
    contentsLabel: "Bu sayfada",
    sections: [
      {
        id: "acceptance",
        heading: "Koşulların kabulü",
        paragraphs: [
          "MomentBack'i kurarak veya kullanarak bu koşulları kabul etmiş olursunuz. Kabul etmiyorsanız uygulamayı kurmayın ve kullanmayın.",
          "Uygulamayı kurduğunuz mağazanın kuralları bu koşullarla birlikte geçerlidir. Bir satın alma veya iade konusunda mağaza kuralı ile buradaki bir hüküm çelişirse, o işlem bakımından mağazanın kuralı geçerlidir.",
        ],
      },
      {
        id: "licence",
        heading: "Lisansınız",
        paragraphs: [
          "Size, denetiminizdeki cihazlara MomentBack'i kurmanız ve kendi kullanımınız için çalıştırmanız amacıyla kişisel, münhasır olmayan, devredilemez ve geri alınabilir bir lisans verilir. Bu, uygulamanın satışı değil kullanım lisansıdır.",
          "Uygulamayı yeniden dağıtamaz, satamaz, alt lisanslayamaz veya kiralayamaz; kaynak kodunu elde etmek için tersine mühendislik yapamaz veya derlemesini çözemezsiniz. Yürürlükteki hukukun bu kısıtlamaya rağmen açıkça izin verdiği hâller saklıdır.",
        ],
      },
      {
        id: "your-responsibility",
        heading: "Kayıt sizin sorumluluğunuzdadır",
        paragraphs: [
          "MomentBack bir kameradır. Onu neye doğrulttuğunuz, ne zaman kaydettiğiniz ve ortaya çıkan klibi ne yaptığınız tümüyle sizin kararınız ve sorumluluğunuzdur.",
          "İnsanların görüntülenmesi, ses kaydı ve rıza konusundaki kurallar ülkeden ülkeye, hatta aynı ülkenin bölgeleri arasında ciddi biçimde değişir; özel mülk, iş yeri, okul ve toplu taşımada yeniden farklılaşabilir. Bulunduğunuz yerde geçerli kuralları bilmek ve bunlara uymak size aittir.",
          "MomentBack'i kaydın yasak olduğu yerlerde kayıt yapmak; birini taciz etmek, takip etmek, korkutmak veya gizlice izlemek; ya da başka bir biçimde hukuka aykırı veya başkasının haklarını ihlal edecek şekilde kullanmayın.",
        ],
      },
      {
        id: "permissions",
        heading: "Kamera, mikrofon ve cihaz izinleri",
        paragraphs: [
          "MomentBack çalışabilmek için kamera ve mikrofon erişimine ihtiyaç duyar; kalıcı capture bildirimini ve STOP eylemini gösterebilmek için de bildirim izni ister. Bu izinleri Android üzerinden verirsiniz ve Android ayarlarından istediğiniz zaman geri alabilirsiniz; kamera veya mikrofon erişimini geri almak capture'ı durdurur.",
          "Capture hazır olduğu sürece, uygulama arka plandayken ve ekran kilitliyken de siz durdurana kadar devam eder. Kalıcı bildirim ve Android'in kendi kamera ile mikrofon göstergeleri, bunun sizden hiçbir zaman gizli kalmaması içindir.",
        ],
      },
      {
        id: "devices",
        heading: "Cihazlar, Android sürümleri ve sonuçlar",
        paragraphs: [
          "MomentBack Android 10 veya üzerini gerektirir ve dikey yönde telefonlar için geliştirilmiştir. Tabletler, katlanabilir geniş ekran düzenleri, televizyonlar veya masaüstü ortamları için sunulmaz.",
          "Uygulamanın gerçekte sunabildiği şey donanımınıza bağlıdır. Video kodlayıcılar telefondan telefona değişir; seçilen çözünürlüğü veya kare hızını sürdüremeyen bir cihaza daha düşüğü verilir. Uygulama, seçtiğiniz ayarı donanımın gerçekleştirdiği ayardan ayrı olarak bildirir; tercihinizi sessizce değiştirmez.",
          "Bazı sınırlar cihazdan değil, video biçiminin kendisinden gelir. Tek bir klip tek bir yön taşır; bu yüzden oturum sırasında telefonu çevirmek replay'i o ana kadar kırpar. Boş depolama alanı da kesin bir sınırdır: cihaz alanı tükenmeye yaklaştığında, o sırada işlenen klip yine de yazılabilsin diye capture otomatik olarak sonlandırılabilir.",
        ],
      },
      {
        id: "battery",
        heading: "Batarya ve ısı",
        paragraphs: [
          "Bir replay tutmak, kameranın, mikrofonun ve donanımsal video kodlayıcının sürekli çalışması demektir. Bu, boştaki bir telefona göre gözle görülür biçimde daha fazla batarya harcar ve cihazı ısıtabilir; Android'in kendi ısı yönetimi bu durumda performansı düşürebilir.",
          "Bu, uygulamanın yaptığı işin doğasında vardır; bir kusur değildir. İhtiyacınız kalmadığında capture'ı durdurun.",
        ],
      },
      {
        id: "not-a-security-system",
        heading: "MomentBack ne değildir",
        paragraphs: [
          "MomentBack, kaçıracağınız anları yakalamaya yarayan bir tüketici kamera aracıdır. Güvenlik sistemi, araç kamerası, sürekli gözetim kaydedicisi, yaka kamerası veya delil niteliğinde kayıt sistemi değildir; bunlardan biri olarak satılmaz, tanıtılmaz ve desteklenmez.",
          "Belirli bir anın yakalanacağına; oturumun işletim sistemi, başka bir uygulama, bir izin değişikliği, ısınma, düşük depolama veya düşük batarya nedeniyle kesilmeyeceğine; ya da belirli bir dosyanın oluşacağına veya kusursuz olacağına dair bir garanti verilmez. Bir şeyi kaydedememenin zarara, kayba veya hukuki dezavantaja yol açacağı durumlarda MomentBack'e güvenmeyin.",
        ],
      },
      {
        id: "your-content",
        heading: "Klipleriniz size aittir",
        paragraphs: [
          "Kaydettiğiniz şey üzerindeki bütün haklar sizde kalır. MomentBack klipleriniz üzerinde mülkiyet veya lisans iddia etmez ve bunların hiçbir kopyası bize ulaşmaz: kaydedilen klipler cihazınızın kendi medya kitaplığına yazılır ve uygulamanın onları herhangi bir yere gönderecek ağ erişimi yoktur.",
        ],
      },
      {
        id: "intellectual-property",
        heading: "Fikri mülkiyet",
        paragraphs: [
          "Uygulama, adı, arayüz tasarımı ve bu web sitesi dahil olmak üzere MomentBack fikri mülkiyet haklarıyla korunur ve geliştiricisi ile lisans verenlerinin mülkiyetinde kalır. Bu koşullardaki hiçbir hüküm bu hakları size devretmez.",
        ],
      },
      {
        id: "liability",
        heading: "Sorumluluk sınırı",
        paragraphs: [
          "MomentBack “olduğu gibi” ve “mevcut hâliyle” sunulur. Yürürlükteki hukukun izin verdiği azami ölçüde, kesintisiz veya hatasız çalışacağına ya da belirli bir amaca uygun olacağına dair garanti verilmez.",
          "Yürürlükteki hukukun izin verdiği azami ölçüde; dolaylı veya sonuç niteliğindeki zararlardan, yakalanamamış, kaybolmuş, eksik kalmış veya silinmiş görüntülerden ve cihazınızdaki veri ya da depolama kaybından sorumluluk kabul edilmez. Bu koşullardaki hiçbir hüküm, hukuken sınırlandırılamayacak sorumluluğu sınırlandırmaz ve emredici tüketici haklarınız saklıdır.",
        ],
      },
      {
        id: "purchases",
        heading: "İleride eklenebilecek ücretli özellikler",
        paragraphs: [
          "MomentBack şu anda hiçbir şey satmıyor. Uygulamada fiyat, abonelik, uygulama içi satın alma ve ödeme ekranı yoktur; uygulama hiçbir zaman ödeme bilgisi toplamaz.",
          "60 saniyelik ve 120 saniyelik replay süreleri, ileride olası tek seferlik bir açılım için arayüzde Pro olarak işaretlenmiştir. Satın alma bir gün eklenirse fiyat ve ödeme koşulları satın almadan önce gösterilecek, işlem uygulama mağazası tarafından yürütülecek ve o mağazanın satın alma ile iade kurallarına tabi olacaktır; bu koşullar da o sürüm yayınlanmadan önce bunu kapsayacak şekilde güncellenecektir.",
        ],
      },
      {
        id: "changes-contact",
        heading: "Değişiklikler ve iletişim",
        paragraphs: [
          "MomentBack değiştikçe bu koşullar güncellenebilir. Güncel sürüm ve tarihi her zaman bu sayfada gösterilir. Güncellenen bir sürümü kabul etmiyorsanız uygulamayı kullanmayı bırakın ve kaldırın.",
          `Bu koşullarla ilgili sorularınızı ${contactEmail} adresine iletebilirsiniz.`,
        ],
      },
    ],
  },
  footer: {
    tagline: "Android için replay kamera. Anı, yaşandıktan sonra kaydedin.",
    legalLabel: "Yasal",
    privacy: "Gizlilik Politikası",
    terms: "Kullanım Koşulları",
    contactLabel: "İletişim",
    contactNote: "Destek ve gizlilik soruları",
    noturaLabel: "Bizden ayrıca",
    noturaLink: "Notura",
    rights: "© 2026 MomentBack. Tüm hakları saklıdır.",
  },
};

export const momentBackCopy: Record<MomentBackLocale, MomentBackCopy> = { en, tr };

export const momentBackContactEmail = contactEmail;

export function getMomentBackCopy(locale: MomentBackLocale): MomentBackCopy {
  return momentBackCopy[locale];
}

/** Reciprocal `hreflang` set for one MomentBack page, plus `x-default`. */
export function momentBackAlternates(page: MomentBackPage): Array<{ hreflang: string; href: string }> {
  const links = momentBackLocales.map((locale) => ({
    hreflang: momentBackLocaleMeta[locale].hreflang,
    href: momentBackPath(locale, page),
  }));

  return [...links, { hreflang: "x-default", href: momentBackPath("en", page) }];
}
