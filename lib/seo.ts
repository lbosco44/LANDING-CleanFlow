import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";

import { getPathname } from "@/i18n/navigation";
import { routing, type Locale, type Pathname } from "@/i18n/routing";

export const SITE_URL = "https://cleanflowapp.it";

/** Valida il segmento [locale]: una lingua sconosciuta è un 404, non un 500. */
export function ensureLocale(locale: string): Locale {
  if (!hasLocale(routing.locales, locale)) notFound();
  return locale;
}

/** URL assoluto di una pagina nella lingua data (slug già localizzato). */
export function absoluteUrl(locale: Locale, href: Pathname) {
  const path = getPathname({ locale, href });
  // La home italiana resta "https://cleanflowapp.it" senza slash finale,
  // come in sitemap e canonical prima della doppia lingua.
  return path === "/" ? SITE_URL : `${SITE_URL}${path}`;
}

/**
 * Canonical + hreflang di una pagina, nella forma che Next mette in <head>.
 * Ogni pagina ha un canonical nella propria lingua e dichiara l'altra come
 * alternate; x-default punta all'italiano, che è la lingua di "/" (vedi
 * Brief/SEO-LOCK.md §1: gli URL italiani non cambiano).
 */
export function alternatesFor(
  locale: Locale,
  href: Pathname
): NonNullable<Metadata["alternates"]> {
  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, getPathname({ locale: l, href })])
  ) as Record<Locale, string>;
  return {
    canonical: getPathname({ locale, href }),
    languages: {
      ...languages,
      "x-default": languages[routing.defaultLocale],
    },
  };
}

/** Codici lingua per <html lang>, og:locale e schema.org inLanguage. */
export const LANG = {
  it: { html: "it", og: "it_IT", schema: "it-IT" },
  en: { html: "en", og: "en_GB", schema: "en" },
} as const satisfies Record<Locale, { html: string; og: string; schema: string }>;
