import { defineRouting } from "next-intl/routing";

// IT resta la lingua di default su "/" (URL esistenti INVARIATI: la SEO
// italiana e i canonical di Brief/SEO-LOCK.md non si toccano). EN vive sotto
// "/en/…" con slug inglesi: Google legge l'URL, e "/en/funzioni/operatori"
// sarebbe una pagina inglese con l'indirizzo in italiano.
//
// I percorsi INTERNI (le chiavi) restano quelli delle cartelle in app/[locale]:
// next-intl riscrive "/en/features/staff" → "/en/funzioni/operatori" da solo.
// Ogni Link/redirect del sito deve passare da @/i18n/navigation, mai da
// next/link, altrimenti la mappatura non avviene.
export const routing = defineRouting({
  locales: ["it", "en"],
  defaultLocale: "it",
  localePrefix: "as-needed",
  pathnames: {
    "/": "/",
    "/demo": "/demo",
    "/grazie": { it: "/grazie", en: "/thank-you" },
    "/privacy": "/privacy",
    "/termini": { it: "/termini", en: "/terms" },
    "/cookie": { it: "/cookie", en: "/cookies" },
    "/funzioni/entrate": { it: "/funzioni/entrate", en: "/features/revenue" },
    "/funzioni/clienti": { it: "/funzioni/clienti", en: "/features/clients" },
    "/funzioni/strutture": { it: "/funzioni/strutture", en: "/features/sites" },
    "/funzioni/operatori": { it: "/funzioni/operatori", en: "/features/staff" },
    "/funzioni/calendario": {
      it: "/funzioni/calendario",
      en: "/features/schedule",
    },
  },
});

export type Locale = (typeof routing.locales)[number];
export type Pathname = keyof typeof routing.pathnames;
