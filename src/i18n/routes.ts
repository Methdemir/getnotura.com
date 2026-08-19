import routeData from "./routes.json";
import { getLocale, getPublishedLocale, publishedLocales } from "./locales";

export type Destination = keyof typeof routeData;
export type RouteAvailabilityKey = `${string}:${Destination}`;

export const destinations = routeData;

export const publishedDestinations = [
  "home",
  "product",
  "howItWorks",
  "features",
  "privacy",
  "terms",
] as const;

export const routeAvailability = new Set<RouteAvailabilityKey>(
  publishedLocales.flatMap((locale) =>
    publishedDestinations.map(
      (destination) => `${locale.id}:${destination}` as RouteAvailabilityKey,
    ),
  ),
);

export function localizedPath(localeId: string, destination: Destination): string {
  const locale = getPublishedLocale(localeId);
  const suffix = destinations[destination].path;

  return suffix ? `/${locale.urlPrefix}/${suffix}/` : `/${locale.urlPrefix}/`;
}

export function reservedLocalizedPath(localeId: string, destination: Destination): string {
  const locale = getLocale(localeId);
  const suffix = destinations[destination].path;

  return suffix ? `/${locale.urlPrefix}/${suffix}/` : `/${locale.urlPrefix}/`;
}

export function localeSwitchPath(
  targetLocaleId: string,
  destination: Destination,
  availability: ReadonlySet<RouteAvailabilityKey> = routeAvailability,
): string {
  const locale = getPublishedLocale(targetLocaleId);
  let candidate: Destination = destination;
  const visited = new Set<Destination>();

  while (!availability.has(`${locale.id}:${candidate}`)) {
    if (visited.has(candidate)) {
      candidate = "home";
      break;
    }

    visited.add(candidate);
    candidate = destinations[candidate].sectionFallback as Destination;
  }

  return localizedPath(locale.id, candidate);
}

export interface AlternateLink {
  hreflang: string;
  href: string;
}

export function alternateLinks(
  destination: Destination,
  availability: ReadonlySet<RouteAvailabilityKey> = routeAvailability,
): AlternateLink[] {
  const equivalents = publishedLocales
    .filter((locale) => availability.has(`${locale.id}:${destination}`))
    .map((locale) => ({
      hreflang: locale.hreflang,
      href: localizedPath(locale.id, destination),
    }));

  if (destination === "home") {
    equivalents.push({ hreflang: "x-default", href: "/" });
  }

  return equivalents;
}
