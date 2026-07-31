import type { Metadata } from "next";
import {
  Bricolage_Grotesque,
  Hanken_Grotesk,
  JetBrains_Mono,
} from "next/font/google";
import "./globals.css";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

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

const SITE_URL = "https://cleanflowapp.it";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Gestionale per imprese di pulizie | CleanFlow",
    template: "%s | CleanFlow",
  },
  description:
    "Entrate, clienti, strutture e operatori: tutto in un'unica schermata. Basta WhatsApp ed Excel. Prenota una demo di 20 minuti, nessun impegno.",
  applicationName: "CleanFlow",
  openGraph: {
    type: "website",
    locale: "it_IT",
    siteName: "CleanFlow",
    title: "Gestionale per imprese di pulizie | CleanFlow",
    description:
      "La tua impresa di pulizie, finalmente sotto controllo. Prenota una demo di 20 minuti.",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "Gestionale per imprese di pulizie | CleanFlow",
    description:
      "La tua impresa di pulizie, finalmente sotto controllo. Prenota una demo di 20 minuti.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="it"
      className={`${bricolage.variable} ${hanken.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        {children}
        <MobileCta />
        <CookieBanner />
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
