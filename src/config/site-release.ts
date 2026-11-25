/**
 * Search visibility of each product surface on sarperstudios.com. Every
 * product owns one top-level path and is public on its own schedule: flip a
 * surface to "preview" to pull its pages out of search.
 */

/**
 * MomentBack at /momentback/: product page, privacy policy and terms, in
 * English and Turkish.
 */
export const momentBackReleaseStatus = "public" as const;

export const momentBackRobotsPolicy =
  momentBackReleaseStatus === "public" ? "index,follow" : "noindex,follow";

/**
 * Vergi Hesabım at /vergi-hesabim/. Its privacy policy must be readable by
 * store and ad-network reviewers.
 */
export const vergiHesabimReleaseStatus = "public" as const;

export const vergiHesabimRobotsPolicy =
  vergiHesabimReleaseStatus === "public" ? "index,follow" : "noindex,follow";

/**
 * Sarper Studios — the publisher page at `/` and the 999KB Arcade and Jutsu
 * product pages. Their privacy policies must be readable by store and
 * ad-network reviewers.
 */
export const studioReleaseStatus = "public" as const;

export const studioRobotsPolicy =
  studioReleaseStatus === "public" ? "index,follow" : "noindex,follow";

/**
 * MERGEKIN: Echo Defense (Sarper Studios) at /mergekin/: product page plus an
 * English and a Turkish privacy policy. The game is not in the store yet, but
 * store and ad-network reviewers must be able to read the policy, so it is
 * public on its own schedule. Flip to "preview" to pull the three pages out of
 * search.
 */
export const mergekinReleaseStatus = "public" as const;

export const mergekinRobotsPolicy =
  mergekinReleaseStatus === "public" ? "index,follow" : "noindex,follow";
