import type { MetadataRoute } from "next";

import { routing, type Pathname } from "@/i18n/routing";
import { FUNZIONI, funzioneHref } from "@/lib/funzioni";
import { absoluteUrl } from "@/lib/seo";

type Freq = NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;

/**
 * Una voce per lingua, ognuna con gli hreflang dell'altra (Google legge le
 * alternate anche da qui). /grazie escluso: post-submit, nessun valore SEO
 * (coerente con robots.ts). Le /funzioni/* si aggiungono da sole dal registry.
 */
function entries(
  href: Pathname,
  changeFrequency: Freq,
  priority: number,
  now: Date
): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, absoluteUrl(l, href)])
  );
  return routing.locales.map((locale) => ({
    url: absoluteUrl(locale, href),
    lastModified: now,
    changeFrequency,
    priority,
    alternates: { languages },
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    ...entries("/", "weekly", 1, now),
    // Pagine di approfondimento funzioni (v2.1)
    ...FUNZIONI.flatMap((f) => entries(funzioneHref(f.slug), "monthly", 0.7, now)),
    ...entries("/demo", "monthly", 0.8, now),
    ...entries("/privacy", "yearly", 0.2, now),
    ...entries("/termini", "yearly", 0.2, now),
    ...entries("/cookie", "yearly", 0.2, now),
  ];
}
