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
