import { COMPANY } from "@/lib/site";
import { FAQS } from "@/components/site/faq-data";
import { FUNZIONI, funzioneHref, type FunzioneSlug } from "@/lib/funzioni";

const SITE_URL = "https://cleanflowapp.it";

// Structured data (schema.org) per la home: Organization + SoftwareApplication +
// FAQPage. NON LocalBusiness (CleanFlow è un software, non un negozio fisico).
// `offers`: i 3 piani esposti in sezione PREZZI (prezzi netti, IVA esclusa) —
// tenere allineati a components/site/prezzi.tsx e alla FAQ "Quanto costa?".
export function JsonLd() {
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
        // Paese servito: CleanFlow è un SaaS nazionale, NON una LocalBusiness
        // (vedi Brief/SEO.md — niente areaServed di comuni, niente GBP).
        areaServed: "IT",
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: "CleanFlow",
        url: SITE_URL,
        inLanguage: "it-IT",
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${SITE_URL}/#software`,
        name: "CleanFlow",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web, iOS, Android (PWA)",
        url: SITE_URL,
        inLanguage: "it-IT",
        description:
          "Gestionale per imprese di pulizie: entrate, clienti, strutture e operatori in un'unica schermata.",
        publisher: { "@id": `${SITE_URL}/#organization` },
        offers: [
          { name: "CleanFlow Base", price: "99" },
          { name: "CleanFlow Pro", price: "129" },
          { name: "CleanFlow Business", price: "199" },
        ].map((o) => ({
          "@type": "Offer",
          name: o.name,
          price: o.price,
          priceCurrency: "EUR",
          url: `${SITE_URL}/#prezzi`,
          availability: "https://schema.org/InStock",
        })),
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/#faq`,
        mainEntity: FAQS.map((f) => ({
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
  const f = FUNZIONI.find((x) => x.slug === slug)!;
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "CleanFlow",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: f.nome,
        item: `${SITE_URL}${funzioneHref(f.slug)}`,
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
