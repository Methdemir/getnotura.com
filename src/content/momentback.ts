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

/** One verb of the HOLD → SAVE → SHARE rail. `tone` picks the accent by role. */
interface RailStep {
  index: string;
  verb: string;
  title: string;
  body: string;
  tone: "held" | "save" | "plain";
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

interface Figure {
  /** The number the counter lands on. Rendered as text for assistive tech. */
  value: number;
  unit: string;
  label: string;
}

/** One stop of the app tour: a real, cropped screenshot and what it shows. */
export interface TourStop {
  id: string;
  index: string;
  title: string;
  body: string;
  /** Basename under /momentback/screens/, without width or extension. */
  screen: string;
  alt: string;
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

/**
 * The hero viewfinder. Every word on it is the app's own string in that
 * locale (lib/l10n/app_en.arb, app_tr.arb), so the drawing never invents UI.
 */
interface HudLabels {
  /** "READY · 30s" — the chip once the window is full. */
  ready: string;
  /** Suffix after the live counter while the window fills: "/30s". */
  fillSuffix: string;
  save: string;
  hint: string;
  durations: string[];
  /** Spoken name of the lock on 60 s / 120 s. */
  locked: string;
  /** Instrument readouts along the bottom edge. */
  readouts: string[];
  zoom: string;
  /** Honest tag that this is a drawing, linking to the real screens. */
  tag: string;
  alt: string;
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
    tour: string;
    privacy: string;
    faq: string;
    languageLabel: string;
    /** Instrument readout beside the brand: "HOLD". */
    readout: string;
  };
  home: {
    meta: Meta;
    eyebrow: string;
    heading: {
      /** Set in the grotesk. */
      plain: string;
      /** Set in the italic serif. */
      serif: string;
    };
    lede: string;
    cta: string;
    ctaNote: string;
    secondary: string;
    platform: string[];
    hud: HudLabels;
    rail: {
      label: string;
      heading: string;
      steps: RailStep[];
    };
    how: {
      label: string;
      heading: string;
      body: string;
      timeline: TimelineLabels;
    };
    tour: {
      label: string;
      heading: string;
      body: string;
      legend: string;
      note: string;
      stops: TourStop[];
    };
    figures: {
      label: string;
      heading: string;
      items: Figure[];
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
    };
    pricing: {
      label: string;
      headline: {
        plain: string;
        serif: string;
      };
      line: string;
      note: string;
    };
    faq: {
      label: string;
      heading: string;
      items: Faq[];
    };
    close: {
      heading: {
        plain: string;
        serif: string;
      };
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
    tour: "Inside the app",
    privacy: "Privacy",
    faq: "FAQ",
    languageLabel: "Language",
    readout: "Hold",
  },
  home: {
    meta: {
      title: "MomentBack — Replay Camera for Android",
      description:
        "MomentBack holds the last seconds your camera has already seen. Press SAVE after the moment happens and it becomes a clip on your phone. No account, no cloud, Android.",
    },
    eyebrow: "Replay Camera · Android",
    heading: {
      plain: "Save the moment.",
      serif: "After it happens.",
    },
    lede:
      "You are always late to the record button. MomentBack keeps the last seconds the camera has already seen, so the clip starts before you reacted.",
    cta: "Coming soon on Google Play",
    ctaNote: "Not published yet. This page goes live before the app does.",
    secondary: "See the real screens",
    platform: ["Android 10+", "No account", "Works offline"],
    hud: {
      ready: "READY · 30s",
      fillSuffix: "/30s",
      save: "SAVE",
      hint: "Press SAVE after it happens; STOP finishes the clip.",
      durations: ["15s", "30s", "60s", "120s"],
      locked: "Pro",
      readouts: ["1080p · 30 fps", "H.264 · AAC", "Audio on"],
      zoom: "1.0×",
      tag: "Drawn for this page · real screens below",
      alt:
        "Illustration of MomentBack's camera screen. A chip at the top counts the seconds being held up to 30, then reads READY · 30s. At the bottom, the replay lengths 15s and 30s, then 60s and 120s with a Pro lock, above the large orange SAVE button.",
    },
    rail: {
      label: "The whole app, in three verbs",
      heading: "Hold, save, share",
      steps: [
        {
          index: "01",
          verb: "Hold",
          title: "Open it. It is already holding.",
          body:
            "Opening MomentBack arms the camera. The last 15 or 30 seconds are kept on the device and continuously replaced by newer ones — not a file, not in your Gallery.",
          tone: "held",
        },
        {
          index: "02",
          verb: "Save",
          title: "Press SAVE after the fact.",
          body:
            "SAVE keeps everything already held and keeps filming until you press STOP. The clip starts before the thing you reacted to.",
          tone: "save",
        },
        {
          index: "03",
          verb: "Share",
          title: "It is a normal video now.",
          body:
            "One MP4 in Movies/MomentBack on your phone. Share it from Clips through Android's share sheet, or delete it there.",
          tone: "plain",
        },
      ],
    },
    how: {
      label: "How it works",
      heading: "One press, two directions in time.",
      body:
        "There is no session to start and no red button to remember. The camera arms itself, and the only decision left is whether the last few seconds were worth keeping.",
      timeline: {
        caption: "SAVE reaches back across the held seconds and forward to STOP.",
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
    tour: {
      label: "Inside the app",
      heading: "Six screens, exactly as they ship.",
      body:
        "Pick a label to switch the screen. These are real captures, not mockups.",
      legend: "Choose a screen",
      note:
        "Captured on a Samsung Galaxy M21 (Android 12) from the 2–3 October 2026 test builds, in the app's Turkish interface — MomentBack ships in 11 languages. The phone's status and navigation bars are cropped out; nothing inside the app was altered. The viewfinder is dark in these frames — what they document is the interface.",
      stops: [
        {
          id: "ready",
          index: "01",
          title: "READY",
          body:
            "The chip — READY · 30s, shown here in Turkish — means the last 30 seconds are held. 15s and 30s are free; 60s and 120s carry a Pro lock.",
          screen: "camera-ready",
          alt:
            "MomentBack's camera screen in Turkish: a teal HAZIR · 30 sn chip at the top, the 15, 30, 60 and 120 second rail with locks on 60 and 120, and the orange KAYDET button.",
        },
        {
          id: "filling",
          index: "02",
          title: "Filling",
          body:
            "Right after opening, the chip counts what is really held — 2/30 here. SAVE keeps whatever is already there; it never promises seconds it does not have.",
          screen: "camera-filling",
          alt:
            "The camera screen moments after opening, with the chip reading 2/30 sn while the replay window fills.",
        },
        {
          id: "recording",
          index: "03",
          title: "SAVE → STOP",
          body:
            "SAVE kept the last 30 seconds and recording carries on. The chip turns orange and counts the clip; the round STOP button finishes it.",
          screen: "clip-recording",
          alt:
            "The camera screen after SAVE: an orange KLİP 0:31 chip, a confirmation reading that the last 30 seconds were kept and recording continues, and the round STOP button.",
        },
        {
          id: "clips",
          index: "04",
          title: "Clips",
          body:
            "Everything MomentBack saved, with length, date and size. Share straight to another app, or delete.",
          screen: "clips",
          alt:
            "The Klipler sheet listing saved clips with their date, size and length, each with share and delete buttons.",
        },
        {
          id: "settings",
          index: "05",
          title: "Settings",
          body:
            "Replay length, sound on or off, video quality, Pro and restore — and one control that turns the camera and microphone off.",
          screen: "settings",
          alt:
            "The Ayarlar sheet: replay length, a Record audio switch, video quality, MomentBack Pro marked locked, restore purchases, and turn off camera and microphone.",
        },
        {
          id: "quality",
          index: "06",
          title: "Quality",
          body:
            "720p and 1080p at 30 fps for everyone. 1080p60 and 4K30 are Pro, and only where the active camera supports them — this one has no 60 fps, and the row says so.",
          screen: "quality",
          alt:
            "The video quality sheet: Efficient 720p 30 fps selected, Standard 1080p 30 fps, Smooth 1080p 60 fps marked not supported by this camera, and High resolution 4K 30 fps, the last two with a Pro star.",
        },
      ],
    },
    figures: {
      label: "By the numbers",
      heading: "What the app keeps, and what it never asks for",
      items: [
        { value: 30, unit: "s", label: "held before you press, free" },
        { value: 120, unit: "s", label: "longest replay, with Pro" },
        { value: 0, unit: "", label: "accounts, analytics or ads" },
        { value: 11, unit: "", label: "interface languages" },
      ],
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
        "A camera that is always watching has to be honest about where the picture goes. This is what MomentBack does, taken from the app's own source.",
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
          title: "No account, no server",
          body:
            "No sign-in, no profile, no identifier, and no MomentBack server to send anything to. There is no analytics SDK, no crash reporter and no advertising code. The one outside service is Google Play's billing, used only for the optional Pro purchase.",
        },
        {
          title: "The microphone only when sound is on",
          body:
            "Record audio is a switch in Settings. Turn it off and MomentBack uses the camera alone: the microphone is never opened and saved clips carry no audio track.",
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
        { label: "Replay length", value: "15 s and 30 s free · 60 s and 120 s with Pro" },
        { label: "Video", value: "720p30 Efficient · 1080p30 Standard" },
        { label: "Pro quality", value: "1080p60 and 4K30, only on cameras that support them" },
        { label: "Sound", value: "On or off · off means no microphone at all" },
        { label: "Camera", value: "Front and back · tap to focus · pinch to zoom" },
        { label: "Clips", value: "Length, date and size · share · delete" },
        { label: "Quick Save", value: "From the notification, without opening the app" },
        { label: "Requires", value: "Android 10 or later, phone, portrait" },
        { label: "Interface languages", value: "11" },
      ],
    },
    pricing: {
      label: "Price",
      headline: {
        plain: "Free to start.",
        serif: "Pro once. No subscription.",
      },
      line:
        "15 s and 30 s replays at 720p or 1080p are free; Pro is a one-time purchase, no subscription, that adds 60 s and 120 s replays and 1080p60 / 4K30 on supported cameras.",
      note: "The price will be shown by Google Play when MomentBack launches there.",
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
            "No account, ever. Holding, saving, Clips and sharing all work offline, in airplane mode too. The only thing that needs a connection is buying or restoring Pro, which Google Play handles.",
        },
        {
          question: "Where are clips saved?",
          answer:
            "In your device Gallery, in a Movies/MomentBack album, as standard MP4 files. The Clips screen inside the app lists the same files. MomentBack can only see the videos it created itself — it never asks to read your photo library.",
        },
        {
          question: "Can I record without sound?",
          answer:
            "Yes. Turn off Record audio in Settings. MomentBack then never opens the microphone, does not need microphone permission, and saved clips have no audio track.",
        },
        {
          question: "Does keeping the camera open drain the battery?",
          answer:
            "Yes, and we would rather say so. The camera and a hardware video encoder run the whole time capture is armed, and the phone can get warm; 1080p60 and 4K use more than 720p. Capture keeps running when you switch apps or lock the screen, with an ongoing notification that has STOP and QUICK SAVE actions. When you are done, stop it.",
        },
        {
          question: "What does Pro cost, and what does it unlock?",
          answer:
            "Pro is a one-time purchase with no subscription. It unlocks 60 s and 120 s replays, and 1080p60 and 4K30 on cameras that support them. Its price will be shown by Google Play; MomentBack is not on sale anywhere yet.",
        },
      ],
    },
    close: {
      heading: {
        plain: "The camera is already watching.",
        serif: "You only have to notice.",
      },
      body:
        "MomentBack is being prepared for Google Play. This page is the product's home; the store link will appear here the day it exists.",
    },
  },
  privacy: {
    meta: {
      title: "Privacy Policy — MomentBack",
      description:
        "How MomentBack handles the camera, the optional microphone, the seconds it holds, the clips you save and the one-time Pro purchase. No account, no cloud, no analytics.",
    },
    heading: "Privacy Policy",
    intro:
      "MomentBack is a camera that holds the last seconds of what it sees so that you can save them afterwards. That is an unusual thing for an app to do, so this notice is specific about it rather than generic.",
    updated: "Last updated: 13 October 2026",
    contentsLabel: "On this page",
    sections: [
      {
        id: "summary",
        heading: "In short",
        paragraphs: [
          "MomentBack runs on your phone. There is no account to create and no MomentBack server behind it. The app's own code makes no network connections and has no way to send a clip, a held second, a log or a setting anywhere. The only network traffic the app is involved in is Google Play's, when you buy or restore the optional Pro unlock.",
          "The camera — and the microphone, if sound recording is on — run while capture is armed, which is what makes a replay possible. Those seconds are held in the app's own private storage and are continuously overwritten. Nothing becomes a file you or anyone else can open until you press SAVE.",
        ],
      },
      {
        id: "camera-microphone",
        heading: "Camera and microphone",
        paragraphs: [
          "MomentBack needs camera access before it can do anything. Microphone access is optional: it is used only while \"Record sound\" is on in Settings. With sound off, the microphone is never opened, saved clips carry no audio track, and capture works even if microphone access has been refused.",
          "Opening the app starts capture. Capture deliberately keeps running when you switch to another app or lock the screen, because the moments this app exists for do not wait for the screen to be on. Whenever it is running, Android shows an ongoing notification carrying a STOP action, and Android's own camera indicator — and the microphone indicator when sound is on — is visible in the status bar.",
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
          "No analytics, no crash-reporting service, no advertising or attribution SDK. The app's entire third-party dependency list is Flutter and its localisation package, the intl library, an icon font, a small key-value store used for local settings, and Flutter's official in-app purchase plugin, which connects to Google Play Billing.",
          "No network of its own. The released Android app declares the INTERNET and network-state permissions because Google's Play Billing Library requires them for purchases. MomentBack's own code never opens a connection: no clip, held second, setting or log leaves the phone. Links to this website and the support email open in your browser or mail app, outside MomentBack.",
          "Diagnostic messages from the capture engine are written to the device's own Android log. They stay on the phone, are visible only to someone using Android developer tools on that phone, and are not read, collected or transmitted by MomentBack.",
        ],
      },
      {
        id: "settings",
        heading: "Settings kept on the device",
        paragraphs: [
          "Your replay length, video quality, sound setting and language choice are stored in a small file in the app's private storage. Next to them the app keeps one more value: whether Google Play last reported Pro as owned (\"pro\" or \"free\") and when that was recorded, so Pro stays unlocked while you are offline. No purchase token, order number, price or account identifier is stored. These are values, not information about you, and they are not attached to any identifier.",
          "Android's own backup system may include app-private data such as that settings file in the device backup tied to your Google account. That backup is operated by Android and Google under your account settings, not by MomentBack. The folder where clips are staged before they reach your Gallery is deliberately excluded from it.",
        ],
      },
      {
        id: "store",
        heading: "Google Play and the Pro purchase",
        paragraphs: [
          "MomentBack is free to use with 15-second and 30-second replays and the standard video qualities. Pro is an optional one-time purchase, with no subscription, that unlocks the 60-second and 120-second replays and, on cameras that support them, the 1080p 60 fps and 4K video qualities.",
          "The purchase is handled entirely by Google Play. MomentBack never sees or stores your payment details, your Google account or your order. When you buy or restore Pro, and when the app checks at startup whether Pro is owned, the Play Billing Library talks to Google Play; the only answer MomentBack keeps is whether Pro is owned. Google processes that transaction under its own privacy policy and your Google account settings.",
          "MomentBack is being prepared for distribution on Google Play. Where you install an app from a store, that store records the installation and may collect platform-level information such as crash reports under its own policies and your account settings. That happens outside MomentBack, and the app neither requests nor receives it.",
        ],
      },
      {
        id: "control",
        heading: "Retention and your control",
        paragraphs: [
          "There is nothing for us to retain. No copy of any clip, any held second, any setting or any log exists anywhere other than on your phone. The record of a Pro purchase is kept by Google Play, not by MomentBack.",
          "You can revoke camera access in Android settings at any time, which stops capture. You can turn sound off in Settings or revoke microphone access; capture then continues without audio. You can delete any clip from the Clips screen or from your Gallery. Uninstalling MomentBack removes the app and its private storage; clips already saved to Movies/MomentBack stay in your Gallery, because they are your files, not the app's. A Pro purchase stays with your Google account and can be restored after reinstalling.",
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
          "If MomentBack's behaviour changes in a way that affects this notice, this page will be updated before that version ships, and the date at the top will change with it.",
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
    updated: "Last updated: 13 October 2026",
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
          "MomentBack needs camera access to work at all. Microphone access is needed only while sound recording is on, and notification access lets it show the ongoing capture notice and its STOP action. You grant these through Android and can withdraw them at any time in Android settings; withdrawing camera access stops capture, and without microphone access clips are recorded without sound.",
          "While capture is armed, it continues when the app is in the background and when the screen is locked, until you stop it. The ongoing notification and Android's own camera indicator — and microphone indicator when sound is on — exist so that this is never invisible to you.",
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
          "Holding a replay means the camera, the microphone when sound is on, and a hardware video encoder run continuously. That uses noticeably more battery than an idle phone and can make the device warm; Android's own thermal management may then reduce performance.",
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
          "You keep every right in what you record. MomentBack claims no ownership of and no licence over your clips, and no copy of them reaches us: saved clips are written to your device's own media library, and the app's own code makes no network connections that could send them anywhere.",
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
        heading: "MomentBack Pro",
        paragraphs: [
          "MomentBack is free to use with 15-second and 30-second replays and the standard video qualities. MomentBack Pro is an optional one-time in-app purchase — not a subscription — that unlocks the 60-second and 120-second replays and, on cameras whose hardware supports them, the 1080p 60 fps and 4K video qualities. Which advanced qualities are available depends on your device and is shown in the app before you choose; a camera that does not support a quality does not gain it through Pro.",
          "The price is shown in the app before you buy. The purchase is processed by Google Play under its terms and refund policy; MomentBack never receives your payment details. Pro is tied to the Google account you bought it with and can be restored on a reinstall or another device signed in to that account.",
          "If Google Play reports a purchase as refunded or no longer owned, Pro features are locked again. While the store cannot be reached, the app keeps the last result Google Play confirmed.",
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
    tour: "Uygulamanın içi",
    privacy: "Gizlilik",
    faq: "SSS",
    languageLabel: "Dil",
    readout: "Tut",
  },
  home: {
    meta: {
      title: "MomentBack — Android için Replay Camera",
      description:
        "MomentBack, kameranın çoktan gördüğü son saniyeleri tutar. An yaşandıktan sonra KAYDET'e basarsınız, klip telefonunuza kaydedilir. Hesap yok, bulut yok, Android.",
    },
    // Already uppercase: these render through text-transform, and Turkish
    // casing would turn the English product names into ANDROİD / CLİPS.
    eyebrow: "REPLAY CAMERA · ANDROID",
    heading: {
      plain: "Anı kaydet.",
      serif: "Yaşandıktan sonra.",
    },
    lede:
      "Kayıt tuşuna hep geç kalırsınız. MomentBack, kameranın zaten gördüğü son saniyeleri tutar; klip, siz tepki vermeden önce başlar.",
    cta: "Yakında Google Play'de",
    ctaNote: "Henüz yayında değil. Bu sayfa uygulamadan önce açılıyor.",
    secondary: "Gerçek ekranlara bak",
    platform: ["Android 10+", "Hesap yok", "Çevrimdışı çalışır"],
    hud: {
      ready: "HAZIR · 30 sn",
      fillSuffix: "/30 sn",
      save: "KAYDET",
      hint: "Olaydan sonra KAYDET; klibi bitirmek için DURDUR.",
      durations: ["15 sn", "30 sn", "60 sn", "120 sn"],
      locked: "Pro",
      readouts: ["1080p · 30 fps", "H.264 · AAC", "Ses açık"],
      zoom: "1,0×",
      tag: "Bu sayfa için çizildi · gerçek ekranlar aşağıda",
      alt:
        "MomentBack kamera ekranının çizimi. Üstteki çip tutulan saniyeleri 30'a kadar sayar, ardından HAZIR · 30 sn yazar. Altta 15 ve 30 saniyelik süreler, Pro kilitli 60 ve 120 saniye ve büyük turuncu KAYDET düğmesi var.",
    },
    rail: {
      label: "Tüm uygulama, üç fiilde",
      heading: "Tut, kaydet, paylaş",
      steps: [
        {
          index: "01",
          verb: "Tut",
          title: "Açın. Zaten tutuyor.",
          body:
            "MomentBack'i açmak kamerayı hazırlar. Son 15 ya da 30 saniye cihazda tutulur ve sürekli yenileriyle değişir — dosya değildir, Galeri'de görünmez.",
          tone: "held",
        },
        {
          index: "02",
          verb: "Kaydet",
          title: "Olan bittikten sonra KAYDET.",
          body:
            "KAYDET, o ana kadar tutulan her şeyi saklar ve siz DURDUR'a basana dek çekmeye devam eder. Klip, tepki verdiğiniz olaydan önce başlar.",
          tone: "save",
        },
        {
          index: "03",
          verb: "Paylaş",
          title: "Artık sıradan bir video.",
          body:
            "Telefonunuzda Movies/MomentBack içinde tek bir MP4. Klipler ekranından Android'in paylaşım menüsüyle gönderin ya da oradan silin.",
          tone: "plain",
        },
      ],
    },
    how: {
      label: "Nasıl çalışır",
      heading: "Tek dokunuş, zamanda iki yön.",
      body:
        "Başlatılacak bir oturum, hatırlanması gereken kırmızı bir tuş yok. Kamera kendi kendine hazırlanır; geriye tek bir karar kalır: son birkaç saniye saklamaya değer miydi?",
      timeline: {
        caption: "KAYDET, tutulan saniyelere geriye ve DURDUR'a kadar ileriye uzanır.",
        held: "Cihazda tutulur · sürekli üzerine yazılır",
        event: "Olay yaşanır",
        save: "KAYDET'e basarsınız",
        stop: "DURDUR",
        clip: "Kaydedilen klip",
        now: "şimdi",
        past: "önce",
        alt:
          "Bir zaman ekseni. Bir bant, cihazda sürekli tutulan son saniyeleri gösterir. Olaydan sonraki bir işaret KAYDET anını gösterir; kaydedilen klip geriye doğru tutulan saniyeleri, ileriye doğru DURDUR'a kadarki bölümü kapsar.",
      },
    },
    tour: {
      label: "Uygulamanın içi",
      heading: "Altı ekran, olduğu gibi.",
      body: "Ekranı değiştirmek için bir etiket seçin. Bunlar gerçek ekran görüntüleri, maket değil.",
      legend: "Bir ekran seçin",
      note:
        "Samsung Galaxy M21'de (Android 12), 2–3 Ekim 2026 test sürümlerinden, uygulamanın Türkçe arayüzüyle alındı — MomentBack 11 dilde. Telefonun durum ve gezinme çubukları kırpıldı; uygulamanın içindeki hiçbir şey değiştirilmedi. Bu karelerde vizör karanlık — belgelenen şey arayüz.",
      stops: [
        {
          id: "ready",
          index: "01",
          title: "HAZIR",
          body:
            "Çip HAZIR · 30 sn diyor: son 30 saniye tutuluyor. 15 sn ve 30 sn ücretsiz; 60 sn ve 120 sn Pro kilidi taşıyor.",
          screen: "camera-ready",
          alt:
            "MomentBack kamera ekranı: üstte turkuaz HAZIR · 30 sn çipi, 60 ve 120'de kilit bulunan 15, 30, 60, 120 saniye seçimi ve turuncu KAYDET düğmesi.",
        },
        {
          id: "filling",
          index: "02",
          title: "Doluyor",
          body:
            "Açtıktan hemen sonra çip gerçekten tutulanı sayar — burada 2/30. KAYDET o an ne varsa saklar; olmayan saniyeleri vaat etmez.",
          screen: "camera-filling",
          alt: "Açıldıktan birkaç an sonra kamera ekranı; replay penceresi dolarken çip 2/30 sn gösteriyor.",
        },
        {
          id: "recording",
          index: "03",
          title: "KAYDET → DURDUR",
          body:
            "KAYDET son 30 saniyeyi korudu, çekim sürüyor. Çip turuncuya döner ve klibi sayar; yuvarlak DURDUR düğmesi klibi bitirir.",
          screen: "clip-recording",
          alt:
            "KAYDET'ten sonra kamera ekranı: turuncu KLİP 0:31 çipi, son 30 saniyenin korunduğunu ve çekimin sürdüğünü söyleyen onay ve yuvarlak DURDUR düğmesi.",
        },
        {
          id: "clips",
          index: "04",
          title: "Klipler",
          body:
            "MomentBack'in kaydettiği her şey; süre, tarih ve boyutla. Doğrudan başka bir uygulamaya paylaşın ya da silin.",
          screen: "clips",
          alt:
            "Kaydedilen klipleri tarih, boyut ve süreyle listeleyen Klipler sayfası; her birinde paylaş ve sil düğmeleri.",
        },
        {
          id: "settings",
          index: "05",
          title: "Ayarlar",
          body:
            "Geri kayıt süresi, ses açık ya da kapalı, video kalitesi, Pro ve geri yükleme — bir de kamerayı ve mikrofonu kapatan tek bir kontrol.",
          screen: "settings",
          alt:
            "Ayarlar sayfası: geri kayıt süresi, Sesi kaydet anahtarı, video kalitesi, kilitli MomentBack Pro, satın alımları geri yükle ve kamera ile mikrofonu kapat.",
        },
        {
          id: "quality",
          index: "06",
          title: "Kalite",
          body:
            "30 fps'de 720p ve 1080p herkese açık. 1080p60 ve 4K30 Pro'dur ve yalnızca etkin kamera destekliyorsa açılır — bu kamerada 60 fps yok, satır da bunu söylüyor.",
          screen: "quality",
          alt:
            "Video kalitesi sayfası: seçili Verimli 720p 30 fps, Standart 1080p 30 fps, bu kamerada desteklenmiyor yazan Akıcı 1080p 60 fps ve Yüksek çözünürlük 4K 30 fps; son ikisinde Pro yıldızı.",
        },
      ],
    },
    figures: {
      label: "Rakamlarla",
      heading: "Uygulamanın tuttuğu ve hiç istemediği",
      items: [
        { value: 30, unit: "sn", label: "siz basmadan önce tutulur, ücretsiz" },
        { value: 120, unit: "sn", label: "en uzun replay, Pro ile" },
        { value: 0, unit: "", label: "hesap, analytics ya da reklam" },
        { value: 11, unit: "", label: "arayüz dili" },
      ],
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
            "Yıldırım, vahşi yaşam, bir dalga, devrilen bir şey. Anı tahmin edemezsiniz; etmeyi bırakın — kamerayı tutun, iş bittikten sonra KAYDET'e uzanın.",
        },
      ],
    },
    trust: {
      label: "Gizlilik",
      heading: "Hiçbir şey telefondan çıkmaz",
      body:
        "Sürekli izleyen bir kamera, görüntünün nereye gittiği konusunda dürüst olmak zorundadır. MomentBack'in yaptığı aşağıda — uygulamanın kendi kaynak kodundan alındı.",
      items: [
        {
          title: "KAYDET'e basmadan hiçbir şey kaydedilmez",
          body:
            "Tutulan saniyeler uygulamanın özel alanında durur, sürekli üzerine yazılır ve capture durduğunda atılır. Galeri'de hiç görünmezler, başka hiçbir uygulama okuyamaz.",
        },
        {
          title: "Klipler telefonunuzdaki dosyalardır",
          body:
            "KAYDET, Galeri'nizdeki Movies/MomentBack klasörüne tek bir MP4 yazar. O andan itibaren sıradan bir videodur: saklamak, paylaşmak, silmek size kalmıştır.",
        },
        {
          title: "Hesap yok, sunucu yok",
          body:
            "Giriş, profil, kimlik ve bir şey gönderilecek MomentBack sunucusu yok. Analytics SDK'sı, çökme raporlayıcı veya reklam kodu bulunmaz. Kullanılan tek dış hizmet, yalnızca isteğe bağlı Pro satın alımı için Google Play'in ödeme sistemidir.",
        },
        {
          title: "Mikrofon yalnızca ses açıkken",
          body:
            "Sesi kaydet, Ayarlar'da bir anahtardır. Kapatırsanız MomentBack yalnızca kamerayı kullanır: mikrofon hiç açılmaz, kaydedilen kliplerde ses izi olmaz.",
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
        { label: "Replay süresi", value: "15 sn ve 30 sn ücretsiz · 60 sn ve 120 sn Pro ile" },
        { label: "Video", value: "720p30 Verimli · 1080p30 Standart" },
        { label: "Pro kalite", value: "1080p60 ve 4K30, yalnızca destekleyen kameralarda" },
        { label: "Ses", value: "Açık ya da kapalı · kapalıyken mikrofon hiç kullanılmaz" },
        { label: "Kamera", value: "Ön ve arka · dokunarak odak · sıkıştırarak yakınlaştırma" },
        { label: "Klipler", value: "Süre, tarih ve boyut · paylaş · sil" },
        { label: "Hızlı Kaydet", value: "Bildirimden, uygulamayı açmadan" },
        { label: "Gereksinim", value: "Android 10 veya üzeri, telefon, dikey" },
        { label: "Arayüz dili", value: "11" },
      ],
    },
    pricing: {
      label: "Fiyat",
      headline: {
        plain: "Ücretsiz başla.",
        serif: "Pro tek sefer. Abonelik yok.",
      },
      line:
        "720p veya 1080p'de 15 sn ve 30 sn replay ücretsiz; Pro tek seferlik bir satın almadır, abonelik yoktur ve 60 sn, 120 sn replay ile destekleyen kameralarda 1080p60 / 4K30 ekler.",
      note: "Fiyatı, MomentBack orada yayınlandığında Google Play gösterecek.",
    },
    faq: {
      label: "Sorular",
      heading: "Net cevaplar",
      items: [
        {
          question: "MomentBack sürekli Galeri'ye mi kaydeder?",
          answer:
            "Hayır. Capture çalışırken son saniyeler uygulamanın kendi özel alanında tutulur ve sürekli üzerine yazılır. Galeri'de bir dosya ancak siz KAYDET'e bastığınızda oluşur. Kaydetmeden durdurursanız tutulan saniyeler atılır.",
        },
        {
          question: "İnternet veya hesap gerekiyor mu?",
          answer:
            "Hesap hiçbir zaman gerekmez. Tutma, kaydetme, Klipler ve paylaşım çevrimdışı, uçak modunda da çalışır. Bağlantı yalnızca Pro'yu satın alırken ya da geri yüklerken gerekir; bunu Google Play yürütür.",
        },
        {
          question: "Klipler nereye kaydedilir?",
          answer:
            "Cihazınızın Galeri'sine, Movies/MomentBack albümüne, standart MP4 dosyaları olarak. Uygulamadaki Klipler ekranı aynı dosyaları listeler. MomentBack yalnızca kendi oluşturduğu videoları görebilir; fotoğraf kitaplığınızı okumak için izin istemez.",
        },
        {
          question: "Sessiz kayıt yapabilir miyim?",
          answer:
            "Evet. Ayarlar'da Sesi kaydet'i kapatın. MomentBack bu durumda mikrofonu hiç açmaz, mikrofon izni gerekmez ve kaydedilen kliplerde ses izi olmaz.",
        },
        {
          question: "Kamera açıkken batarya tüketir mi?",
          answer:
            "Evet, ve bunu söylemeyi tercih ederiz. Kayıt hazırken kamera ve donanımsal video kodlayıcı sürekli çalışır, telefon ısınabilir; 1080p60 ve 4K, 720p'den fazla tüketir. Başka uygulamaya geçtiğinizde veya ekranı kilitlediğinizde kayıt devam eder; kalıcı bildirimde DURDUR ve HIZLI KAYDET eylemleri bulunur. İşiniz bittiğinde durdurun.",
        },
        {
          question: "Pro ne kadar, neyi açıyor?",
          answer:
            "Pro tek seferlik bir satın almadır, abonelik yoktur. 60 sn ve 120 sn replay'i, destekleyen kameralarda da 1080p60 ve 4K30'u açar. Fiyatını Google Play gösterecek; MomentBack henüz hiçbir yerde satışta değil.",
        },
      ],
    },
    close: {
      heading: {
        plain: "Kamera zaten izliyor.",
        serif: "Sizin yalnızca fark etmeniz gerekiyor.",
      },
      body:
        "MomentBack, Google Play için hazırlanıyor. Bu sayfa ürünün evi; mağaza bağlantısı var olduğu gün burada belirecek.",
    },
  },
  privacy: {
    meta: {
      title: "Gizlilik Politikası — MomentBack",
      description:
        "MomentBack'in kamerayı, isteğe bağlı mikrofonu, tuttuğu saniyeleri, kaydettiğiniz klipleri ve tek seferlik Pro satın alımını nasıl ele aldığı. Hesap yok, bulut yok, analitik yok.",
    },
    heading: "Gizlilik Politikası",
    intro:
      "MomentBack, gördüğü son saniyeleri tutan ve bunları sonradan kaydetmenizi sağlayan bir kameradır. Bir uygulama için alışılmadık bir davranış olduğundan, bu bildirim genel geçer değil, bu davranışa özgü yazılmıştır.",
    updated: "Son güncelleme: 13 Ekim 2026",
    contentsLabel: "Bu sayfada",
    sections: [
      {
        id: "summary",
        heading: "Kısaca",
        paragraphs: [
          "MomentBack telefonunuzda çalışır. Oluşturulacak bir hesap ve arkasında bir MomentBack sunucusu yoktur. Uygulamanın kendi kodu hiçbir ağ bağlantısı açmaz; bir klibi, tutulan bir saniyeyi, bir günlüğü veya bir ayarı herhangi bir yere gönderemez. Uygulamanın dahil olduğu tek ağ trafiği, isteğe bağlı Pro'yu satın aldığınızda veya geri yüklediğinizde Google Play'in trafiğidir.",
          "Kayıt hazırken kamera — ses kaydı açıksa mikrofon da — çalışır; geriye dönük kaydı mümkün kılan şey budur. Bu saniyeler uygulamanın kendi özel alanında tutulur ve sürekli olarak üzerine yazılır. Siz KAYDET'e basana kadar hiçbir şey, sizin ya da bir başkasının açabileceği bir dosyaya dönüşmez.",
        ],
      },
      {
        id: "camera-microphone",
        heading: "Kamera ve mikrofon",
        paragraphs: [
          "MomentBack'in çalışması için kamera erişimi gerekir. Mikrofon erişimi isteğe bağlıdır ve yalnızca Ayarlar'da \"Sesi kaydet\" açıkken kullanılır. Ses kapalıyken mikrofon hiç açılmaz, kaydedilen kliplerde ses kanalı bulunmaz ve mikrofon izni reddedilmiş olsa da kayıt çalışır.",
          "Uygulamayı açmak kaydı başlatır. Başka bir uygulamaya geçtiğinizde veya ekranı kilitlediğinizde kayıt bilerek çalışmaya devam eder; çünkü bu uygulamanın var olduğu anlar, ekranın açık olmasını beklemez. Çalıştığı sürece Android, DURDUR eylemi taşıyan kalıcı bir bildirim gösterir; Android'in kendi kamera göstergesi — ses açıksa mikrofon göstergesi de — durum çubuğunda görünür.",
          "Kayıt; uygulamada DURDUR'a bastığınızda, bildirimdeki DURDUR'u kullandığınızda, MomentBack'i son kullanılanlardan kaydırıp attığınızda veya Android ayarlarından zorla durdurduğunuzda sona erer. Hiçbir şey onu kendiliğinden yeniden başlatmaz: uygulama açılışta çalışan bir bileşen kurmaz ve yeniden başlatma alarmı kurmaz.",
          "Bildirim izni de istenir ama zorunlu değildir. Reddetmeniz size yalnızca bildirim panelindeki DURDUR düğmesine mal olur; kameranın davranışını değiştirmez.",
        ],
      },
      {
        id: "held-seconds",
        heading: "Tutulan saniyeler",
        paragraphs: [
          "Kayıt çalışırken video (ses açıksa ses de) kodlanır ve MomentBack'in özel uygulama alanındaki kısa parçalara yazılır — yalnızca uygulamaya ait olan, diğer uygulamaların ve Galeri'nin okuyamadığı bir dizindir.",
          "Seçtiğiniz geri kayıt süresinden eski parçalar sürekli silinir, üstüne bir de boyut sınırı uygulanır; böylece tutulan şey son 15, 30, 60 veya 120 saniyeyle sınırlı kalır. Büyüyen bir arşiv yoktur.",
          "Bu malzeme kendi başına hiçbir yere kaydedilmez. Kayıt durduğunda KAYDET'e basmamışsanız tutulan her şey atılır. Uygulama zorla durdurulursa veya telefonun gücü kesilirse geriye kalan, uygulamaya özel geçici çalışma verisidir.",
        ],
      },
      {
        id: "saved-clips",
        heading: "Kaydettiğiniz klipler",
        paragraphs: [
          "KAYDET'e bastığınızda MomentBack tuttuğu saniyeleri mühürler ve siz DURDUR'a basana kadar çekmeye devam eder; iki yarı tek bir MP4 dosyasına yazılır. Biten dosya, cihazınızın kendi medya kitaplığına Movies/MomentBack altına kopyalanır, doğrulanır ve ancak ondan sonra özel çalışma kopyası silinir.",
          "O andan itibaren klip, telefonunuzdaki sıradan bir videodur. Galeri'nizde görünür; Google veya cihaz üreticinizle kurduğunuz fotoğraf yedeklemesi kapsamına girer; diğer dosyalar gibi paylaşabilir veya silebilirsiniz. MomentBack'in o dosya üzerinde başka bir denetimi ve bir kopyası yoktur.",
          "Uygulamadaki Klipler ekranı yalnızca MomentBack'in kendi yazdığı Movies/MomentBack dosyalarını listeler. Android'in kapsamlı depolama modeli, bir uygulamaya kendi oluşturduğu medyaya izin gerekmeden erişim verir; MomentBack'in fotoğraf kitaplığınızı okumak için hiç izin istememesinin ve diğer videolarınızı görememesinin sebebi budur.",
        ],
      },
      {
        id: "not-collected",
        heading: "MomentBack'in yapmadıkları",
        paragraphs: [
          "Hesap yok. Giriş, e-posta adresi, profil ve size ya da cihazınıza verilmiş bir kimlik yoktur.",
          "Analitik yok, çökme raporlama hizmeti yok, reklam veya atıf SDK'sı yok. Uygulamanın üçüncü taraf bağımlılıklarının tamamı Flutter ve yerelleştirme paketi, intl kütüphanesi, bir simge yazı tipi, yerel ayarlar için kullanılan küçük bir anahtar-değer deposu ve Google Play Billing'e bağlanan, Flutter'ın resmî uygulama içi satın alma eklentisinden ibarettir.",
          "Kendi ağ trafiği yok. Yayınlanan Android uygulaması INTERNET ve ağ durumu izinlerini bildirir, çünkü Google'ın Play Billing kütüphanesi satın alma için bunları gerektirir. MomentBack'in kendi kodu hiçbir bağlantı açmaz: hiçbir klip, tutulan saniye, ayar veya günlük telefondan çıkmaz. Bu web sitesine ve destek e-postasına giden bağlantılar MomentBack'in dışında, tarayıcınızda veya e-posta uygulamanızda açılır.",
          "Kayıt motorunun tanılama mesajları cihazın kendi Android günlüğüne yazılır. Telefonda kalır, yalnızca o telefonda Android geliştirici araçlarını kullanan birine görünür ve MomentBack tarafından okunmaz, toplanmaz, iletilmez.",
        ],
      },
      {
        id: "settings",
        heading: "Cihazda tutulan ayarlar",
        paragraphs: [
          "Geri kayıt süresi, video kalitesi, ses ayarı ve dil tercihiniz uygulamanın özel alanındaki küçük bir dosyada saklanır. Bunların yanında uygulama tek bir değer daha tutar: Google Play'in Pro'yu en son sahip olunan olarak bildirip bildirmediği (\"pro\" ya da \"free\") ve bunun ne zaman kaydedildiği; böylece Pro çevrimdışıyken de açık kalır. Satın alma jetonu, sipariş numarası, fiyat veya hesap kimliği saklanmaz. Bunlar sizin hakkınızdaki bilgiler değil, değerlerdir ve hiçbir kimlikle ilişkilendirilmez.",
          "Android'in kendi yedekleme sistemi, bu ayar dosyası gibi uygulamaya özel verileri Google hesabınıza bağlı cihaz yedeklemesine dahil edebilir. Bu yedekleme, MomentBack tarafından değil, hesap ayarlarınız kapsamında Android ve Google tarafından yürütülür. Kliplerin Galeri'ye ulaşmadan önce beklediği klasör bu yedeklemenin dışında bırakılmıştır.",
        ],
      },
      {
        id: "store",
        heading: "Google Play ve Pro satın alımı",
        paragraphs: [
          "MomentBack; 15 ve 30 saniyelik geri kayıt ile standart video kaliteleriyle ücretsiz kullanılır. Pro, abonelik olmayan, isteğe bağlı tek seferlik bir satın almadır; 60 ve 120 saniyelik geri kaydı ve destekleyen kameralarda 1080p 60 fps ile 4K video kalitelerini açar.",
          "Satın alma tümüyle Google Play tarafından yürütülür. MomentBack ödeme bilgilerinizi, Google hesabınızı veya siparişinizi hiçbir zaman görmez ve saklamaz. Pro'yu satın aldığınızda veya geri yüklediğinizde ve uygulama açılışta Pro'ya sahip olup olmadığınızı kontrol ettiğinde Play Billing kütüphanesi Google Play ile iletişim kurar; MomentBack'in sakladığı tek sonuç Pro'ya sahip olunup olunmadığıdır. Google bu işlemi kendi gizlilik politikası ve Google hesap ayarlarınız kapsamında işler.",
          "MomentBack, Google Play üzerinden dağıtım için hazırlanmaktadır. Bir uygulamayı mağazadan kurduğunuzda, o mağaza kurulumu kaydeder ve kendi politikaları ile hesap ayarlarınız kapsamında çökme raporu gibi platform düzeyinde bilgiler toplayabilir. Bu, MomentBack'in dışında gerçekleşir; uygulama bunu ne talep eder ne de alır.",
        ],
      },
      {
        id: "control",
        heading: "Saklama ve sizin denetiminiz",
        paragraphs: [
          "Bizim saklayacağımız bir şey yok. Hiçbir klibin, tutulan hiçbir saniyenin, hiçbir ayarın ve hiçbir günlüğün telefonunuz dışında bir kopyası bulunmuyor. Pro satın alımının kaydı MomentBack'te değil, Google Play'de tutulur.",
          "Kamera erişimini Android ayarlarından istediğiniz zaman geri alabilirsiniz; bu kaydı durdurur. Sesi Ayarlar'dan kapatabilir veya mikrofon erişimini geri alabilirsiniz; kayıt bu durumda sessiz devam eder. Her klibi Klipler ekranından veya Galeri'den silebilirsiniz. MomentBack'i kaldırmak uygulamayı ve özel alanını siler; Movies/MomentBack içine kaydedilmiş klipler Galeri'nizde kalır, çünkü onlar uygulamanın değil sizin dosyalarınızdır. Pro satın alımı Google hesabınızda kalır ve yeniden kurulumdan sonra geri yüklenebilir.",
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
          "MomentBack'in davranışı bu bildirimi etkileyecek şekilde değişirse bu sayfa o sürüm yayınlanmadan önce güncellenir ve üstteki tarih onunla birlikte değişir.",
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
    updated: "Son güncelleme: 13 Ekim 2026",
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
          "MomentBack'in çalışması için kamera erişimi gerekir. Mikrofon erişimi yalnızca ses kaydı açıkken gerekir; bildirim izni ise kalıcı kayıt bildirimini ve DURDUR eylemini gösterebilmek içindir. Bu izinleri Android üzerinden verirsiniz ve Android ayarlarından istediğiniz zaman geri alabilirsiniz; kamera erişimini geri almak kaydı durdurur, mikrofon erişimi yoksa klipler sessiz kaydedilir.",
          "Kayıt hazır olduğu sürece, uygulama arka plandayken ve ekran kilitliyken de siz durdurana kadar devam eder. Kalıcı bildirim ve Android'in kendi kamera göstergesi — ses açıksa mikrofon göstergesi de — bunun sizden hiçbir zaman gizli kalmaması içindir.",
        ],
      },
      {
        id: "devices",
        heading: "Cihazlar, Android sürümleri ve sonuçlar",
        paragraphs: [
          "MomentBack Android 10 veya üzerini gerektirir ve dikey yönde telefonlar için geliştirilmiştir. Tabletler, katlanabilir geniş ekran düzenleri, televizyonlar veya masaüstü ortamları için sunulmaz.",
          "Uygulamanın gerçekte sunabildiği şey donanımınıza bağlıdır. Video kodlayıcılar telefondan telefona değişir; seçilen çözünürlüğü veya kare hızını sürdüremeyen bir cihaza daha düşüğü verilir. Uygulama, seçtiğiniz ayarı donanımın gerçekleştirdiği ayardan ayrı olarak bildirir; tercihinizi sessizce değiştirmez.",
          "Bazı sınırlar cihazdan değil, video biçiminin kendisinden gelir. Tek bir klip tek bir yön taşır; bu yüzden oturum sırasında telefonu çevirmek geri kaydı o ana kadar kırpar. Boş depolama alanı da kesin bir sınırdır: cihaz alanı tükenmeye yaklaştığında, o sırada işlenen klip yine de yazılabilsin diye kayıt otomatik olarak sonlandırılabilir.",
        ],
      },
      {
        id: "battery",
        heading: "Batarya ve ısı",
        paragraphs: [
          "Geri kayıt tutmak, kameranın, ses açıksa mikrofonun ve donanımsal video kodlayıcının sürekli çalışması demektir. Bu, boştaki bir telefona göre gözle görülür biçimde daha fazla batarya harcar ve cihazı ısıtabilir; Android'in kendi ısı yönetimi bu durumda performansı düşürebilir.",
          "Bu, uygulamanın yaptığı işin doğasında vardır; bir kusur değildir. İhtiyacınız kalmadığında kaydı durdurun.",
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
          "Kaydettiğiniz şey üzerindeki bütün haklar sizde kalır. MomentBack klipleriniz üzerinde mülkiyet veya lisans iddia etmez ve bunların hiçbir kopyası bize ulaşmaz: kaydedilen klipler cihazınızın kendi medya kitaplığına yazılır ve uygulamanın kendi kodu onları herhangi bir yere gönderebilecek bir ağ bağlantısı açmaz.",
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
        heading: "MomentBack Pro",
        paragraphs: [
          "MomentBack; 15 ve 30 saniyelik geri kayıt ile standart video kaliteleriyle ücretsiz kullanılır. MomentBack Pro, abonelik değil, isteğe bağlı tek seferlik bir uygulama içi satın almadır; 60 ve 120 saniyelik geri kaydı ve donanımı destekleyen kameralarda 1080p 60 fps ile 4K video kalitelerini açar. Hangi ileri kalitelerin kullanılabildiği cihazınıza bağlıdır ve seçimden önce uygulamada gösterilir; bir kaliteyi desteklemeyen kamera Pro ile o kaliteyi kazanmaz.",
          "Fiyat, satın almadan önce uygulamada gösterilir. Satın alma, Google Play tarafından kendi koşulları ve iade politikası kapsamında işlenir; MomentBack ödeme bilgilerinizi hiçbir zaman almaz. Pro, satın aldığınız Google hesabına bağlıdır ve yeniden kurulumda ya da aynı hesapla oturum açılmış başka bir cihazda geri yüklenebilir.",
          "Google Play bir satın almayı iade edilmiş veya artık sahip olunmayan olarak bildirirse Pro özellikleri yeniden kilitlenir. Mağazaya ulaşılamadığı sürece uygulama, Google Play'in en son onayladığı sonucu korur.",
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
