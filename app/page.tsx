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
// dentro i pilastri · Intelligenza → step 4 di Come funziona · Pilot e
// Prezzo → FAQ.
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
