import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { SiteHeader } from "@/components/site/header";
import { Hero } from "@/components/site/hero";
import { Problema } from "@/components/site/problema";
import { Pilastri } from "@/components/site/pilastri";
import { ComeFunziona } from "@/components/site/come-funziona";
import { Risultato } from "@/components/site/risultato";
import { Prezzi } from "@/components/site/prezzi";
import { Faq } from "@/components/site/faq";
import { Team } from "@/components/site/team";
import { Investitori } from "@/components/site/investitori";
import { CtaFinale } from "@/components/site/cta-finale";
import { SiteFooter } from "@/components/site/footer";
import { JsonLd } from "@/components/site/json-ld";
import { alternatesFor, ensureLocale } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

// Title/description ereditati dal layout (keyword madre "gestionale imprese di
// pulizie"): qui servono solo canonical e hreflang, che Next non genera da solo.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = ensureLocale((await params).locale);
  return { alternates: alternatesFor(locale, "/") };
}

// Home v2 "Registro di controllo" (Brief/WIREFRAME.md v2): 9 sezioni, era 14.
// Trust-strip → riga nella hero · Svolta → lead dei pilastri · Moduli →
// dentro i pilastri · Pilot e Prezzo → FAQ. I pilastri linkano le pagine
// /funzioni/* per chi vuole approfondire (v2.1). VIETATO in pagina: report
// automatici, punteggi qualità, AI (vincolo founder 2026-07-02), sezione HQ.
//
// v2.5: Team + Investitori entrano DOPO le Domande e prima della CTA finale —
// il prodotto ha già convinto, le obiezioni sono cadute, l'ultima cosa che
// resta prima della richiesta è chi c'è dall'altra parte.
export default async function Home({ params }: Props) {
  const locale = ensureLocale((await params).locale);
  setRequestLocale(locale);

  return (
    <>
      <JsonLd />
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <Problema />
        <Pilastri />
        <ComeFunziona />
        <Risultato />
        <Prezzi />
        <Faq />
        <Team />
        <Investitori />
        <CtaFinale />
      </main>
      <SiteFooter />
    </>
  );
}
