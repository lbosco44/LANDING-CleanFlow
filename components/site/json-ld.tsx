import { useLocale, useTranslations } from "next-intl";

import { getPathname } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { FUNZIONI, funzioneHref, type FunzioneSlug } from "@/lib/funzioni";
import { CURRENCIES, CURRENCY_CODE, readPiani, type Currency } from "@/lib/piani";
import { LANG, SITE_URL } from "@/lib/seo";
import { COMPANY } from "@/lib/site";

// Paese servito per lingua: la versione italiana resta IT (SaaS nazionale,
// NON LocalBusiness — vedi Brief/SEO.md: niente areaServed di comuni, niente
// Google Business Profile); quella inglese dichiara i mercati a cui parla.
const AREA_SERVED: Record<Locale, string | string[]> = {
  it: "IT",
  en: ["GB", "IE", "US"],
};

// Radice degli URL della lingua: "https://cleanflowapp.it" in italiano (gli
// @id restano identici a prima), "https://cleanflowapp.it/en" in inglese.
const baseFor = (locale: Locale) =>
  locale === "it" ? SITE_URL : `${SITE_URL}/${locale}`;

// Structured data (schema.org) per la home: Organization + WebSite +
// SoftwareApplication + FAQPage. `offers`: i 3 piani esposti in sezione PREZZI
// (prezzi netti, IVA esclusa) letti dalla stessa sorgente della pagina;
// le FAQ sono le stesse stringhe visibili (requisito Google).
export function JsonLd() {
  const locale = useLocale();
  const t = useTranslations("JsonLd");
  const tq = useTranslations("Faq");
  const tp = useTranslations("Piani");
  const faqs = tq.raw("items") as { q: string; a: string }[];
  const { piani } = readPiani(tp.raw);
  const base = baseFor(locale);
  // Un'offerta per valuta sulla versione inglese (UK, Irlanda, USA pagano in
  // tre valute diverse). Quella italiana resta al solo euro: il suo structured
  // data è identico a prima (SEO-LOCK §1), il selettore in pagina non lo tocca.
  const offerCurrencies: readonly Currency[] = locale === "it" ? ["eur"] : CURRENCIES;

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: "CleanFlow",
        legalName: COMPANY.legalName,
        url: SITE_URL,
        logo: `${SITE_URL}/cleanflow-mark.png`,
        email: COMPANY.publicEmail,
        telephone: COMPANY.phoneHref.replace("tel:", ""),
        vatID: COMPANY.vat,
        address: {
          "@type": "PostalAddress",
          streetAddress: "Corso Vittorio Veneto 39",
          postalCode: "07026",
          addressLocality: "Olbia",
          addressRegion: "SS",
          addressCountry: "IT",
        },
        areaServed: AREA_SERVED[locale],
      },
      {
        "@type": "WebSite",
        "@id": `${base}/#website`,
        name: "CleanFlow",
        url: base,
        inLanguage: LANG[locale].schema,
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${base}/#software`,
        name: "CleanFlow",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web, iOS, Android (PWA)",
        url: base,
        inLanguage: LANG[locale].schema,
        description: t("softwareDescription"),
        publisher: { "@id": `${SITE_URL}/#organization` },
        offers: piani.flatMap((p) =>
          offerCurrencies.map((c) => ({
            "@type": "Offer",
            name: `CleanFlow ${p.name}`,
            price: p.prices[c],
            priceCurrency: CURRENCY_CODE[c],
            url: `${base}/#prezzi`,
            availability: "https://schema.org/InStock",
            description: p.for,
          }))
        ),
      },
      {
        "@type": "FAQPage",
        "@id": `${base}/#faq`,
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// Breadcrumb delle pagine /funzioni/*: dà a Google il percorso Home → funzione
// (in SERP sostituisce l'URL nudo). Due livelli soli: "Funzioni" non è una
// pagina reale ma un'ancora della home, e un breadcrumb deve puntare a URL veri.
export function FunzioneJsonLd({ slug }: { slug: FunzioneSlug }) {
  const locale = useLocale();
  const tf = useTranslations("Funzioni");
  const f = FUNZIONI.find((x) => x.slug === slug)!;
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "CleanFlow",
        item: baseFor(locale),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: tf(`items.${slug}.name`),
        item: `${SITE_URL}${getPathname({ locale, href: funzioneHref(f.slug) })}`,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
