import { SiteHeader } from "@/components/site/header";
import { Hero } from "@/components/site/hero";
import { Problema } from "@/components/site/problema";
import { Pilastri } from "@/components/site/pilastri";
import { ComeFunziona } from "@/components/site/come-funziona";
import { Risultato } from "@/components/site/risultato";
import { Faq } from "@/components/site/faq";
import { CtaFinale } from "@/components/site/cta-finale";
import { SiteFooter } from "@/components/site/footer";
import { JsonLd } from "@/components/site/json-ld";

// Home v2 "Registro di controllo" (Brief/WIREFRAME.md v2): 9 sezioni, era 14.
// Trust-strip → riga nella hero · Svolta → lead dei pilastri · Moduli →
// dentro i pilastri · Pilot e Prezzo → FAQ. I pilastri linkano le pagine
// /funzioni/* per chi vuole approfondire (v2.1). VIETATO in pagina: report
// automatici, punteggi qualità, AI (vincolo founder 2026-07-02), sezione HQ.
export default function Home() {
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
        <Faq />
        <CtaFinale />
      </main>
      <SiteFooter />
    </>
  );
}
