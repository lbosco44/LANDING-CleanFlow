import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  Bricolage_Grotesque,
  Hanken_Grotesk,
  JetBrains_Mono,
} from "next/font/google";
import "../globals.css";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { routing, type Locale } from "@/i18n/routing";
import { LANG, SITE_URL } from "@/lib/seo";
import { CookieBanner } from "@/components/site/cookie-banner";
import { MobileCta } from "@/components/site/mobile-cta";

// Display "di marca" — titoli/hero
const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

// Corpo / UI — tecnico, leggibilissimo
const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  display: "swap",
});

// Micro-etichette (eyebrow) e dati tabulari nei widget — MAI testo corrente.
// Emendamento banlist v2 in Brief/DESIGN.md; stesso mono dell'app CleanFlow.
const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

// Title/description/OG della home vivono qui (template "%s | CleanFlow" per
// le altre pagine). Canonical e hreflang stanno in ogni pagina: vedi lib/seo.ts.
export async function generateMetadata({
  params,
}: Omit<Props, "children">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "Meta" });
  // L'immagine OG della lingua (logo + nome su navy), dichiarata anche come
  // `thumbnail`: i servizi di anteprima che non leggono og:image (o l'hanno in
  // cache rotta) altrimenti scelgono da soli l'immagine "più rappresentativa"
  // della pagina, e con quattro volti in Team scelgono un volto. NON si passa
  // `icons` qui: sovrascriverebbe le icone da file (icon.png, apple-icon.png).
  const ogImage = `${SITE_URL}/${locale}/opengraph-image`;

  return {
    metadataBase: new URL(SITE_URL),
    other: { thumbnail: ogImage },
    title: {
      default: t("title"),
      template: "%s | CleanFlow",
    },
    description: t("description"),
    applicationName: "CleanFlow",
    openGraph: {
      type: "website",
      locale: LANG[locale].og,
      siteName: "CleanFlow",
      title: t("title"),
      description: t("ogDescription"),
      // Radice della lingua: "/" in italiano (invariato), "/en" in inglese.
      url: locale === "it" ? SITE_URL : `${SITE_URL}/${locale}`,
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("ogDescription"),
    },
  };
}

// Entrambe le lingue si prerenderizzano staticamente.
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  // Abilita il rendering statico: da qui in giù le API di next-intl leggono
  // la locale senza passare dagli header (vedi i18n/request.ts).
  setRequestLocale(locale);

  return (
    <html
      lang={LANG[locale as Locale].html}
      className={`${bricolage.variable} ${hanken.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        {/* Senza props: i messaggi della locale corrente arrivano da
            i18n/request.ts anche ai componenti client (header, form, banner). */}
        <NextIntlClientProvider>
          {children}
          <MobileCta />
          <CookieBanner />
        </NextIntlClientProvider>
        {/* Misurazione: entrambi cookieless e senza dati personali, quindi
            attivi senza attendere il consenso del banner (misurano il 100%
            dei visitatori). Speed Insights riporta i Core Web Vitals REALI
            degli utenti: è il dato che conta per il ranking, non il Lighthouse
            di laboratorio. Baseline pre-redesign in Brief/SEO-LOCK.md §5. */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
