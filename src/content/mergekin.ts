/**
 * MERGEKIN: Echo Defense — Sarper Studios' merge + tower-defense game, a
 * sub-brand surface at /mergekin/ with its own look (src/styles/mergekin.css).
 *
 * Product facts are sourced from the game's working tree
 * (Mobile-Portfolio/apps/runelegion): lib/i18n/strings_en.dart (hero, rune,
 * region, map and keeper names; the guide cards for placing, merging, runes,
 * gold and waves; the Perfect rule "20/20 without a wave retry"),
 * lib/content/rune_availability.dart (runeChoiceOffered = true) and the
 * 16-map / 4-region / 12-wave campaign. When the game changes, this file
 * changes with it.
 *
 * The privacy policy is NOT written here. It is parsed, unchanged, from
 * docs/mergekin/PRIVACY_CONTENT.md, which the app-owner side maintains as the
 * source of truth. The parser only splits the file into structure (intro,
 * glance table, numbered sections, footnote); it never rewrites a sentence.
 * The "Notes for Claude" section is not rendered.
 */
import privacySource from "../../docs/mergekin/PRIVACY_CONTENT.md?raw";

export const mergekin = {
  name: "MERGEKIN: Echo Defense",
  shortName: "MERGEKIN",
  publisher: "Sarper Studios",
  email: "sarperstudiosapp@gmail.com",
  paths: {
    home: "/mergekin/",
    privacy: "/mergekin/privacy/",
    gizlilik: "/mergekin/gizlilik/",
  },
  ogImage: "/mergekin/og.jpg",
  icon: "/mergekin/icon-192.png",
} as const;

export type MergekinPage = "home" | "privacy" | "gizlilik";

/* ---------------------------------------------------------------- product */

export interface Hero {
  id: string;
  name: string;
  role: string;
  colour: string;
  /** Hex used for the hero's accent on the page; matches the in-game kit. */
  accent: string;
  line: string;
}

export const heroes: Hero[] = [
  {
    id: "aren",
    name: "Aren",
    role: "Cleave",
    colour: "Royal blue",
    accent: "#4f7fe0",
    line: "Swings at up to three foes at once. Best on the bends, at the road's edge.",
  },
  {
    id: "lumi",
    name: "Lumi",
    role: "Range",
    colour: "Forest green",
    accent: "#4fae6a",
    line: "Shoots one foe from afar. Her reach covers most of the road.",
  },
  {
    id: "vela",
    name: "Vela",
    role: "Area",
    colour: "Violet",
    accent: "#a070e8",
    line: "Blasts the thickest crowd. Slow, but wide.",
  },
  {
    id: "ket",
    name: "Ket",
    role: "Trap",
    colour: "Rust orange",
    accent: "#e07a3a",
    line: "Sets a trap on a road spot you pick. The first foe to step on it takes a heavy hit.",
  },
  {
    id: "neris",
    name: "Neris",
    role: "Support",
    colour: "Teal",
    accent: "#3fb8b0",
    line: "Links to one or two heroes nearby and makes them attack faster.",
  },
  {
    id: "sarper",
    name: "Sarper",
    role: "Ballistic",
    colour: "Crimson",
    accent: "#d0473f",
    line: "Lobs shells at far crowds. Up close, he has a blind spot.",
  },
];

export interface Rune {
  id: "ember" | "frost" | "storm";
  name: string;
  line: string;
}

export const runes: Rune[] = [
  { id: "ember", name: "Ember", line: "Hits harder, most of all on foes that are already hurt." },
  { id: "frost", name: "Frost", line: "Slows what it hits, and freezes what is already chilled." },
  { id: "storm", name: "Storm", line: "Carries the strike on to more foes nearby." },
];

export interface Region {
  id: "gate" | "marsh" | "forge" | "spire";
  order: number;
  name: string;
  blurb: string;
  keeper: string;
  maps: string[];
}

export const regions: Region[] = [
  {
    id: "gate",
    order: 1,
    name: "Gate Forest",
    blurb: "The first line behind the mist.",
    keeper: "Pack Caller",
    maps: ["Misty Pass", "Stream Mouth", "Old Causeway", "Wolf Ridge"],
  },
  {
    id: "marsh",
    order: 2,
    name: "Pale Marsh",
    blurb: "Rotting water, drowning roads.",
    keeper: "Lantern Echo",
    maps: ["Dead Lake", "Reed Strait", "Twin Cut", "Pale Lantern"],
  },
  {
    id: "forge",
    order: 3,
    name: "Ash Forge",
    blurb: "Furnaces that never cool, gates of iron.",
    keeper: "Hearth Colossus",
    maps: ["Twin Bellows", "Cinder Stair", "Iron Bridge", "Furnace Heart"],
  },
  {
    id: "spire",
    order: 4,
    name: "Echo Spire",
    blurb: "The source of the echo.",
    keeper: "Tower Echo",
    maps: ["Echo Ramp", "Overflowing Spring", "Twin Terraces", "Tower Summit"],
  },
];

export interface Screenshot {
  id: string;
  map: string;
  region: string;
  alt: string;
}

/** Real captures from an Android test phone (Turkish interface), status bar cropped. */
export const screenshots: Screenshot[] = [
  {
    id: "stream-mouth",
    map: "Stream Mouth",
    region: "Gate Forest",
    alt: "Stream Mouth: a winding road around a lake in a green valley, heroes on stone plinths beside it.",
  },
  {
    id: "dead-lake",
    map: "Dead Lake",
    region: "Pale Marsh",
    alt: "Dead Lake: the road circles a still marsh lake while shades walk towards the crystal gate.",
  },
  {
    id: "cinder-stair",
    map: "Cinder Stair",
    region: "Ash Forge",
    alt: "Cinder Stair: a looping road over scorched ground below volcanoes, heroes holding the bends.",
  },
  {
    id: "twin-terraces",
    map: "Twin Terraces",
    region: "Echo Spire",
    alt: "Twin Terraces: two road terraces under a violet sky with floating spires, archers on the plinths.",
  },
];

/* ---------------------------------------------------------------- privacy */

export type PrivacyLocale = "en" | "tr";

export interface PrivacyGlanceRow {
  what: string;
  where: string;
}

export interface PrivacySection {
  id: string;
  heading: string;
  paragraphs: string[];
}

export interface PrivacyDocument {
  locale: PrivacyLocale;
  effectiveDate: string;
  effectiveDateIso: string;
  intro: string[];
  glanceHeading: string;
  glanceColumns: [string, string];
  glance: PrivacyGlanceRow[];
  sections: PrivacySection[];
  footnote: string;
}

const source = privacySource.replace(/\r\n/g, "\n");

/** The text between `## <title>` and the next `---` rule or `## ` heading. */
const languageBlock = (title: string): string => {
  const start = source.indexOf(`\n## ${title}\n`);
  if (start < 0) throw new Error(`PRIVACY_CONTENT.md has no "## ${title}" block.`);
  const rest = source.slice(start + title.length + 5);
  const end = rest.search(/\n---\n|\n## /);
  return end < 0 ? rest : rest.slice(0, end);
};

/** Blank-line separated paragraphs; hard-wrapped lines join with one space. */
const paragraphsOf = (text: string): string[] =>
  text
    .split(/\n\s*\n/)
    .map((paragraph) =>
      paragraph
        .split("\n")
        .map((line) => line.trim())
        .join(" ")
        .trim(),
    )
    .filter(Boolean);

const sectionId = (heading: string, index: number) =>
  heading
    .toLocaleLowerCase("en")
    .replace(/^\d+\.\s*/, "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/ı/g, "i")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "") || `section-${index + 1}`;

const effective = source.match(/Effective date: \*\*(.+?)\*\* \/ \*\*(.+?)\*\*/);
if (!effective) throw new Error("PRIVACY_CONTENT.md has no effective date line.");
const months = {
  january: 1, february: 2, march: 3, april: 4, may: 5, june: 6,
  july: 7, august: 8, september: 9, october: 10, november: 11, december: 12,
} as const;
const isoFromEnglish = (date: string) => {
  const [day, month, year] = date.split(" ");
  const number = months[(month ?? "").toLowerCase() as keyof typeof months];
  if (!day || !number || !year) throw new Error(`Unreadable effective date: ${date}`);
  return `${year}-${String(number).padStart(2, "0")}-${day.padStart(2, "0")}`;
};

const parsePolicy = (locale: PrivacyLocale): PrivacyDocument => {
  const block = languageBlock(locale === "en" ? "English" : "Türkçe");
  const parts = block.split(/\n### /).slice(1);
  const [introPart, glancePart, ...numbered] = parts;
  if (!introPart || !glancePart || numbered.length === 0) {
    throw new Error(`PRIVACY_CONTENT.md (${locale}) is missing the intro, glance or sections.`);
  }

  const intro = paragraphsOf(introPart.slice(introPart.indexOf("\n")));

  const glanceHeading = glancePart.slice(0, glancePart.indexOf("\n")).trim();
  const tableRows = glancePart
    .split("\n")
    .filter((line) => line.trim().startsWith("|"))
    .map((line) =>
      line
        .trim()
        .replace(/^\||\|$/g, "")
        .split("|")
        .map((cell) => cell.trim()),
    );
  const [header, , ...body] = tableRows;
  if (!header || header.length !== 2 || body.length === 0) {
    throw new Error(`PRIVACY_CONTENT.md (${locale}) glance table is malformed.`);
  }

  const footnoteLabel = locale === "en" ? "Footnote:" : "Dipnot:";
  let footnote = "";
  const sections = numbered.map((part, index) => {
    const heading = part.slice(0, part.indexOf("\n")).trim();
    const paragraphs = paragraphsOf(part.slice(part.indexOf("\n"))).filter((paragraph) => {
      if (paragraph.startsWith(footnoteLabel)) {
        footnote = paragraph.slice(footnoteLabel.length).trim();
        return false;
      }
      return true;
    });
    return { id: sectionId(heading, index), heading, paragraphs };
  });
  if (!footnote) throw new Error(`PRIVACY_CONTENT.md (${locale}) has no footnote.`);

  return {
    locale,
    effectiveDate: locale === "en" ? effective[1]! : effective[2]!,
    effectiveDateIso: isoFromEnglish(effective[1]!),
    intro,
    glanceHeading,
    glanceColumns: [header[0]!, header[1]!],
    glance: body.map(([what = "", where = ""]) => ({ what, where })),
    sections,
    footnote,
  };
};

export const privacyPolicies: Record<PrivacyLocale, PrivacyDocument> = {
  en: parsePolicy("en"),
  tr: parsePolicy("tr"),
};

/** Splits a policy paragraph into text and link pieces without changing a character. */
export type Piece = { text: string; href?: string };
export const linkify = (paragraph: string): Piece[] => {
  const pattern = /https:\/\/[^\s)]+|[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g;
  const pieces: Piece[] = [];
  let last = 0;
  for (const match of paragraph.matchAll(pattern)) {
    const index = match.index ?? 0;
    if (index > last) pieces.push({ text: paragraph.slice(last, index) });
    const value = match[0];
    pieces.push({ text: value, href: value.includes("@") ? `mailto:${value}` : value });
    last = index + value.length;
  }
  if (last < paragraph.length) pieces.push({ text: paragraph.slice(last) });
  return pieces;
};
