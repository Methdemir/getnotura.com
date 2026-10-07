/**
 * Controls whether the public website is an indexed launch or a URL-only preview.
 *
 * W8 must deliberately change this to "public" (and review search readiness)
 * before Notura is made available for search indexing.
 */
export const siteReleaseStatus = "preview" as const;

export const defaultRobotsPolicy =
  siteReleaseStatus === "preview" ? "noindex,follow" : "index,follow";

/**
 * MomentBack is a separate product surface under the same domain, published on
 * its own schedule: the app is not in the store yet, but /momentback/ is a real
 * public product page and is meant to be findable. It therefore does not
 * inherit Notura's preview-wide noindex above. Flip this to "preview" to pull
 * the three MomentBack pages back out of search.
 */
export const momentBackReleaseStatus = "public" as const;

export const momentBackRobotsPolicy =
  momentBackReleaseStatus === "public" ? "index,follow" : "noindex,follow";

/**
 * Vergi Hesabım (Sarper Studios) is a third product surface under this domain,
 * at /vergi-hesabim/. Its privacy policy must be reachable and readable by
 * store and ad-network reviewers, so it is public on its own schedule and does
 * not inherit Notura's preview noindex. Flip to "preview" to pull both pages
 * out of search.
 */
export const vergiHesabimReleaseStatus = "public" as const;

export const vergiHesabimRobotsPolicy =
  vergiHesabimReleaseStatus === "public" ? "index,follow" : "noindex,follow";

/**
 * Sarper Studios — the publisher page at `/` and the 999KB Arcade and Jutsu
 * product pages. Their privacy policies must be readable by store and
 * ad-network reviewers, so they are public on their own schedule and do not
 * inherit Notura's preview noindex. Flip to "preview" to pull them out of
 * search.
 */
export const studioReleaseStatus = "public" as const;

export const studioRobotsPolicy =
  studioReleaseStatus === "public" ? "index,follow" : "noindex,follow";
