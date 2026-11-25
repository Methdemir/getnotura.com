/**
 * Sarper Studios apps that are live on Google Play, keyed by the app id used in
 * `src/content/studio.ts`. This is the only place a Play listing URL may come
 * from: `scripts/validate-build.mjs` fails the build if the output links to any
 * play.google.com URL that is not one of these. An app that is in development
 * or in review has no entry, so its pages cannot render a store link.
 */
export const playListings = {
  momentback: "https://play.google.com/store/apps/details?id=com.sarperstudios.momentback",
  "vergi-hesabim": "https://play.google.com/store/apps/details?id=com.taxai.vergi_hesabi",
  "999kb": "https://play.google.com/store/apps/details?id=com.kb999.game",
  mergekin: "https://play.google.com/store/apps/details?id=com.sarperstudios.mergekin.echodefense",
} as const;

export type PlayListedApp = keyof typeof playListings;

export function playListing(appId: string): string | undefined {
  return (playListings as Record<string, string>)[appId];
}
