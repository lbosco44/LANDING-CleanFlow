import { SiteHeader } from "@/components/site/header";
import { Hero } from "@/components/site/hero";
import { TrustStrip } from "@/components/site/trust-strip";
import { Problema } from "@/components/site/problema";
import { Svolta } from "@/components/site/svolta";
import { ComeFunziona } from "@/components/site/come-funziona";
import { Moduli } from "@/components/site/moduli";
import { Intelligenza } from "@/components/site/intelligenza";
import { Risultato } from "@/components/site/risultato";
import { Faq } from "@/components/site/faq";
import { Pilot } from "@/components/site/pilot";
import { Prezzo } from "@/components/site/prezzo";
import { CtaFinale } from "@/components/site/cta-finale";
import { SiteFooter } from "@/components/site/footer";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <TrustStrip />
        <Problema />
        <Svolta />
        <ComeFunziona />
        <Moduli />
        <Intelligenza />
        <Risultato />
        <Faq />
        <Pilot />
        <Prezzo />
        <CtaFinale />
      </main>
      <SiteFooter />
    </>
  );
}
