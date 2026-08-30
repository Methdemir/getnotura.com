/**
 * The single place the website records where Notura can be obtained.
 *
 * Notura has no store listing yet. Nothing here may imply one: the site renders
 * these channels as plain text, never as a link or a button, until a channel is
 * marked `available` and carries a real `url`.
 *
 * Release day is two edits in this file — set the channel's `state` to
 * `"available"` and paste its listing URL. Every surface that mentions
 * availability reads from here, and `scripts/validate-build.mjs` reads it too:
 * store hostnames stay banned from the built output for as long as no channel
 * is available, so a half-finished flip cannot ship a dead badge.
 *
 * Platform names are proper nouns and are deliberately not translated. The
 * status words are, through the `statusKey` on each channel.
 */
import type { TranslationKey } from "../i18n/translations";

export type StoreState = "coming-soon" | "planned" | "available";

export interface StoreChannel {
  /** Stable identifier, used for list keys and for the build validator. */
  id: string;
  /** The store's own name. Never localized. */
  name: string;
  state: StoreState;
  /** The UI dictionary key carrying this channel's localized status word. */
  statusKey: TranslationKey;
  /** The listing URL. Null until the app is actually published there. */
  url: string | null;
}

/**
 * Order is deliberate: Android is the first release target, so Google Play
 * leads. iOS is a post-v1 item in the mobile roadmap and there is no `ios/`
 * directory in the app repository, so the App Store carries a weaker,
 * truthful status rather than an implied parallel launch.
 */
export const storeChannels: readonly StoreChannel[] = [
  {
    id: "google-play",
    name: "Google Play",
    state: "coming-soon",
    statusKey: "storeStateComingSoon",
    url: null,
  },
  {
    id: "app-store",
    name: "App Store",
    state: "planned",
    statusKey: "storeStatePlanned",
    url: null,
  },
];

/** True once any channel is genuinely published and linkable. */
export const hasPublishedStoreChannel = storeChannels.some(
  (channel) => channel.state === "available" && channel.url,
);

/**
 * Pricing is undecided. The mobile roadmap plans a free tier with a paid
 * subscription above it, but no amount, currency or billing period is fixed,
 * so the site publishes no price and no pricing table.
 *
 * When the amounts are confirmed, this becomes the one place they live and a
 * pricing surface can read from it. Until then it is deliberately empty, so
 * nothing on the site can quietly start implying a number.
 */
export const pricing = {
  status: "undecided",
} as const;
