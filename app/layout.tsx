import type { Metadata } from "next";
import {
  Bricolage_Grotesque,
  Hanken_Grotesk,
  JetBrains_Mono,
} from "next/font/google";
import "./globals.css";

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
    "Clienti, calendario, operatori sul campo e report in un'unica schermata. Basta WhatsApp ed Excel. Prenota una demo di 20 minuti, nessun impegno.",
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
      </body>
    </html>
  );
}
