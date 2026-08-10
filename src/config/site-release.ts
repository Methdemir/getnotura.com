/**
 * Controls whether the public website is an indexed launch or a URL-only preview.
 *
 * W8 must deliberately change this to "public" (and review search readiness)
 * before Notura is made available for search indexing.
 */
export const siteReleaseStatus = "preview" as const;

export const defaultRobotsPolicy =
  siteReleaseStatus === "preview" ? "noindex,follow" : "index,follow";
