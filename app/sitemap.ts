import type { MetadataRoute } from "next";

import { FUNZIONI, funzioneHref } from "@/lib/funzioni";

const SITE_URL = "https://cleanflowapp.it";

/** /grazie escluso: post-submit, nessun valore SEO (coerente con robots.ts). */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: SITE_URL, lastModified: now, changeFrequency: "weekly", priority: 1 },
    // Pagine di approfondimento funzioni (v2.1)
    ...FUNZIONI.map((f) => ({
      url: `${SITE_URL}${funzioneHref(f.slug)}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    { url: `${SITE_URL}/demo`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/termini`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/cookie`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];
}
