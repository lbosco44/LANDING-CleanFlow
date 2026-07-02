import { COMPANY } from "@/lib/site";
import { FAQS } from "@/components/site/faq-data";

const SITE_URL = "https://cleanflowapp.it";

// Structured data (schema.org) per la home: Organization + SoftwareApplication +
// FAQPage. NON LocalBusiness (CleanFlow è un software, non un negozio fisico).
// Niente `offers`: il prezzo è solo-in-demo, non esposto in pagina.
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
        email: COMPANY.email,
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
          "Gestionale per imprese di pulizie: clienti, calendario, operatori sul campo e report in un'unica schermata.",
        publisher: { "@id": `${SITE_URL}/#organization` },
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
